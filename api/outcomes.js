// Self-reported real-exam outcomes — anonymous, opt-in, and the core of the
// site's data moat: correlating in-app practice performance against actual
// CCA-F pass/fail. Content and design can be copied by a competitor in a
// month; this can't — it only exists once enough real users have taken the
// real exam and told us how it went, so it compounds with usage over time
// in a way a fresh competitor can't shortcut.
//
// No identity of any kind is stored — not even a Clerk user id. Each report
// is a single anonymous data point bucketed by the reporter's own app
// performance at the time (accuracy tier x mock-exams-taken tier), so we can
// answer "of people who practiced to roughly this level, how many passed?"
// without ever being able to trace a report back to a person.
//
// GET  -> aggregate pass-rate stats, overall and per performance bucket
//         (a bucket only appears once it has enough reports to be meaningful)
// POST -> record one self-report:
//   { pass: boolean, scaledScore?: number|null, appAccuracy: number (0-100),
//     appExamsTaken: number, appBestScore?: number|null, appAttempts: number }
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
// Real-exam outcomes are a rare, deliberate action (not a fire-and-forget
// event) — a much tighter limit than telemetry is appropriate and still
// generous for a genuine user.
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 d"), prefix: "ratelimit:outcomes" });

const MIN_SAMPLE = 10; // don't surface a bucket's rate until it means something

// Coarse buckets, chosen so each is plausible-sized rather than maximally
// granular — 4 accuracy tiers x 3 exams-taken tiers = 12 buckets total.
function accuracyBucket(pct) {
  if (pct < 70) return "lt70";
  if (pct < 80) return "70-79";
  if (pct < 90) return "80-89";
  return "90plus";
}
function examsBucket(n) {
  if (n <= 0) return "0";
  if (n <= 2) return "1-2";
  return "3plus";
}
function bucketId(accPct, examsTaken) { return `${accuracyBucket(accPct)}_${examsBucket(examsTaken)}`; }
const ALL_BUCKETS = ["lt70", "70-79", "80-89", "90plus"].flatMap((a) => ["0", "1-2", "3plus"].map((e) => `${a}_${e}`));

export default async function handler(req, res) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Storage not configured" });
  }

  if (req.method === "GET") {
    try {
      const [totalReports, totalPasses, ...bucketCounts] = await Promise.all([
        redis.get("outcomes:total:reports"),
        redis.get("outcomes:total:passes"),
        ...ALL_BUCKETS.flatMap((b) => [redis.get(`outcomes:bucket:${b}:reports`), redis.get(`outcomes:bucket:${b}:passes`)])
      ]);
      const reports = Number(totalReports) || 0;
      const buckets = {};
      ALL_BUCKETS.forEach((b, i) => {
        const r = Number(bucketCounts[i * 2]) || 0;
        const p = Number(bucketCounts[i * 2 + 1]) || 0;
        if (r >= MIN_SAMPLE) buckets[b] = { reports: r, passRate: Math.round((p / r) * 100) };
      });
      res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=900");
      return res.status(200).json({
        reports,
        passRate: reports >= MIN_SAMPLE ? Math.round(((Number(totalPasses) || 0) / reports) * 100) : null,
        buckets
      });
    } catch {
      return res.status(502).json({ error: "Could not read outcomes" });
    }
  }

  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] || "unknown").toString().split(",")[0].trim();
    const { success } = await ratelimit.limit(ip);
    if (!success) return res.status(429).json({ error: "Too many requests" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { pass, appAccuracy, appExamsTaken, appAttempts } = body;
    const scaledScore = Number.isFinite(body.scaledScore) ? Math.round(body.scaledScore) : null;
    const appBestScore = Number.isFinite(body.appBestScore) ? Math.round(body.appBestScore) : null;
    const valid = typeof pass === "boolean"
      && Number.isFinite(appAccuracy) && appAccuracy >= 0 && appAccuracy <= 100
      && Number.isFinite(appExamsTaken) && appExamsTaken >= 0 && appExamsTaken <= 1000
      && Number.isFinite(appAttempts) && appAttempts >= 0 && appAttempts <= 1000000
      && (scaledScore === null || (scaledScore >= 100 && scaledScore <= 1000))
      && (appBestScore === null || (appBestScore >= 0 && appBestScore <= 1000));
    if (!valid) return res.status(400).json({ error: "Invalid payload" });

    const bucket = bucketId(appAccuracy, appExamsTaken);
    const pipeline = redis.pipeline();
    pipeline.incr("outcomes:total:reports");
    if (pass) pipeline.incr("outcomes:total:passes");
    pipeline.incr(`outcomes:bucket:${bucket}:reports`);
    if (pass) pipeline.incr(`outcomes:bucket:${bucket}:passes`);
    if (scaledScore !== null) pipeline.incrby("outcomes:scoreSum", scaledScore);
    // A capped, anonymous raw log (no ip/user id) — separate from the O(1)
    // aggregate counters above, kept for future recalibration (finer
    // buckets, different correlations) without needing to re-collect data.
    pipeline.lpush("outcomes:log", JSON.stringify({ pass, scaledScore, appAccuracy, appExamsTaken, appBestScore, appAttempts, ts: Date.now() }));
    pipeline.ltrim("outcomes:log", 0, 4999);
    try {
      await pipeline.exec();
      return res.status(204).end();
    } catch {
      return res.status(502).json({ error: "Could not record outcome" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
