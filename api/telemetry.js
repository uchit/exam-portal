// Anonymous, aggregate exam telemetry — no user identifiers stored, just
// incremented counters. Powers the honest pass-rate stats on /about (no
// vanity "150,000 learners" claims — real numbers, or none shown at all).
//
// GET  -> current aggregate stats (attempts, pass rate, avg score, per-domain accuracy)
// POST -> record one completed mock exam { pass, scaledScore, perDomain: { [domainId]: { total, ok } } }
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, "1 h"), prefix: "ratelimit:telemetry" });
const DOMAIN_IDS = [1, 2, 3, 4, 5];

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
    const { pass, scaledScore, perDomain } = body;
    if (typeof pass !== "boolean" || !Number.isFinite(scaledScore) || !perDomain || typeof perDomain !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const pipeline = redis.pipeline();
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
