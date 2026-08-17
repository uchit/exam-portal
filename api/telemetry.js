// Anonymous, aggregate exam telemetry — no user identifiers stored, just
// incremented counters. Powers the honest pass-rate stats on /about (no
// vanity "150,000 learners" claims — real numbers, or none shown at all).
//
// Also the item-level half of the site's data moat: every completed
// practice/diagnostic/exam question anonymously increments a per-question
// shown/correct counter (stats:q:shown / stats:q:correct hashes, keyed by
// question id). At scale this is a real-world difficulty calibration signal
// no competitor can replicate without the same volume of usage — which
// question ids are actually harder than their assigned difficulty suggests,
// which ones nobody misses (weak distractors), etc. Not exposed publicly
// yet; read directly from Redis for internal calibration.
//
// GET  -> current aggregate stats (attempts, pass rate, avg score, per-domain accuracy)
// POST -> record a completed exam and/or a batch of per-question results:
//   { pass, scaledScore, perDomain: { [domainId]: { total, ok } } }  — mock-exam completion (unchanged)
//   { perQuestion: { [questionId]: 0 | 1 } }                         — item-level results (any mode)
//   Either half may be present alone; at least one must be valid.
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, "1 h"), prefix: "ratelimit:telemetry" });
const DOMAIN_IDS = [1, 2, 3, 4, 5];
const MAX_PER_QUESTION_ENTRIES = 100; // a full mock exam is 60 — generous headroom, hard cap against abuse

export default async function handler(req, res) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Telemetry not configured" });
  }

  if (req.method === "GET") {
    try {
      const [attempts, passes, scoreSum] = await Promise.all([
        redis.get("stats:exam:attempts"),
        redis.get("stats:exam:passes"),
        redis.get("stats:exam:scoreSum")
      ]);
      const perDomain = {};
      await Promise.all(DOMAIN_IDS.map(async (d) => {
        const [a, c] = await Promise.all([
          redis.get(`stats:domain:${d}:attempts`),
          redis.get(`stats:domain:${d}:correct`)
        ]);
        perDomain[d] = { attempts: Number(a) || 0, correct: Number(c) || 0 };
      }));
      const totalAttempts = Number(attempts) || 0;
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res.status(200).json({
        attempts: totalAttempts,
        passRate: totalAttempts ? Math.round(((Number(passes) || 0) / totalAttempts) * 100) : null,
        avgScore: totalAttempts ? Math.round((Number(scoreSum) || 0) / totalAttempts) : null,
        perDomain
      });
    } catch {
      return res.status(502).json({ error: "Could not read telemetry" });
    }
  }

  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] || "unknown").toString().split(",")[0].trim();
    const { success } = await ratelimit.limit(ip);
    if (!success) return res.status(429).json({ error: "Too many requests" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { pass, scaledScore, perDomain, perQuestion } = body;
    const hasExamCompletion = typeof pass === "boolean" && Number.isFinite(scaledScore) && perDomain && typeof perDomain === "object";
    const questionEntries = perQuestion && typeof perQuestion === "object" ? Object.entries(perQuestion) : [];
    const hasItemStats = questionEntries.length > 0 && questionEntries.length <= MAX_PER_QUESTION_ENTRIES
      && questionEntries.every(([id, ok]) => typeof id === "string" && id.length < 100 && (ok === 0 || ok === 1));
    if (!hasExamCompletion && !hasItemStats) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const pipeline = redis.pipeline();
    if (hasExamCompletion) {
      pipeline.incr("stats:exam:attempts");
      pipeline.incrby("stats:exam:scoreSum", Math.round(scaledScore));
      if (pass) pipeline.incr("stats:exam:passes");
      for (const d of DOMAIN_IDS) {
        const dp = perDomain[d];
        if (dp && Number.isFinite(dp.total) && Number.isFinite(dp.ok) && dp.total >= 0 && dp.ok >= 0 && dp.ok <= dp.total) {
          pipeline.incrby(`stats:domain:${d}:attempts`, dp.total);
          pipeline.incrby(`stats:domain:${d}:correct`, dp.ok);
        }
      }
    }
    if (hasItemStats) {
      for (const [id, ok] of questionEntries) {
        pipeline.hincrby("stats:q:shown", id, 1);
        if (ok === 1) pipeline.hincrby("stats:q:correct", id, 1);
      }
    }
    try {
      await pipeline.exec();
      return res.status(204).end();
    } catch {
      return res.status(502).json({ error: "Could not record telemetry" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
