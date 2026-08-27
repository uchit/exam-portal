// Admin-only: usage stats across the site — registered-account sync counts,
// anonymous exam telemetry, and real-exam outcome self-reports. Same
// allowlist gate as api/admin/users.js. Read-only; never writes.
import { Redis } from "@upstash/redis";
import { requireAdmin } from "../../lib/admin-auth.mjs";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const DOMAIN_IDS = [1, 2, 3, 4, 5];
const OUTCOME_BUCKETS = ["lt70", "70-79", "80-89", "90plus"].flatMap((a) => ["0", "1-2", "3plus"].map((e) => `${a}_${e}`));

// Counts progress:* keys (one per account that has ever synced progress —
// distinct from Clerk's total signup count, since creating an account and
// actually saving progress are two different actions). Capped so a very
// large keyspace can't turn one admin page load into an expensive scan.
async function countSyncedAccounts() {
  let cursor = "0", count = 0, iterations = 0;
  do {
    const [next, keys] = await redis.scan(cursor, { match: "progress:*", count: 200 });
    count += keys.length;
    cursor = next;
    iterations++;
  } while (cursor !== "0" && iterations < 25);
  return { count, truncated: cursor !== "0" };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Storage not configured" });
  }
  const admin = await requireAdmin(req);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  try {
    const [
      examAttempts, examPasses, examScoreSum,
      outcomeReports, outcomePasses,
      qShownCount, qCorrectCount,
      synced
    ] = await Promise.all([
      redis.get("stats:exam:attempts"),
      redis.get("stats:exam:passes"),
      redis.get("stats:exam:scoreSum"),
      redis.get("outcomes:total:reports"),
      redis.get("outcomes:total:passes"),
      redis.hlen("stats:q:shown"),
      redis.hlen("stats:q:correct"),
      countSyncedAccounts()
    ]);

    const perDomain = {};
    await Promise.all(DOMAIN_IDS.map(async (d) => {
      const [a, c] = await Promise.all([redis.get(`stats:domain:${d}:attempts`), redis.get(`stats:domain:${d}:correct`)]);
      perDomain[d] = { attempts: Number(a) || 0, correct: Number(c) || 0 };
    }));

    const outcomeBuckets = {};
    await Promise.all(OUTCOME_BUCKETS.map(async (b) => {
      const [r, p] = await Promise.all([redis.get(`outcomes:bucket:${b}:reports`), redis.get(`outcomes:bucket:${b}:passes`)]);
      const reports = Number(r) || 0;
      if (reports > 0) outcomeBuckets[b] = { reports, passes: Number(p) || 0 };
    }));

    const attempts = Number(examAttempts) || 0;
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({
      ccaf: {
        examAttempts: attempts,
        examPasses: Number(examPasses) || 0,
        passRate: attempts ? Math.round(((Number(examPasses) || 0) / attempts) * 100) : null,
        avgScore: attempts ? Math.round((Number(examScoreSum) || 0) / attempts) : null,
        perDomain
      },
      itemStats: {
        distinctQuestionsShown: qShownCount || 0,
        distinctQuestionsWithCorrectData: qCorrectCount || 0
      },
      outcomes: {
        reports: Number(outcomeReports) || 0,
        passes: Number(outcomePasses) || 0,
        buckets: outcomeBuckets
      },
      accounts: {
        syncedCount: synced.count,
        syncedCountTruncated: synced.truncated
      }
    });
  } catch {
    return res.status(502).json({ error: "Could not load stats" });
  }
}
