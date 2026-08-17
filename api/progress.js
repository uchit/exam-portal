// Per-user progress storage for signed-in accounts (optional — anonymous use
// stays entirely localStorage-only, this route is never called for visitors
// who haven't created an account). Auth: Clerk session JWT in the
// Authorization header, verified server-side; no cookies/session state here.
//
// GET  -> { progress } for the authenticated user, or { progress: null } if
//         they've never synced before
// PUT  -> body { progress }, stores it as that user's current progress
import { Redis } from "@upstash/redis";
import { verifyToken } from "@clerk/backend";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const PROGRESS_FIELDS = ["answered", "flags", "exams", "streak", "bestStreak", "attempts", "correct", "recent", "srs", "completedLessons"];

async function authenticate(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token || !process.env.CLERK_SECRET_KEY) return null;
  try {
    const claims = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    return claims.sub || null;
  } catch {
    return null;
  }
}

function isValidProgress(p) {
  if (!p || typeof p !== "object") return false;
  return PROGRESS_FIELDS.every((f) => f in p);
}

export default async function handler(req, res) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Storage not configured" });
  }

  const userId = await authenticate(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const key = `progress:${userId}`;

  if (req.method === "GET") {
    try {
      const progress = await redis.get(key);
      return res.status(200).json({ progress: progress || null });
    } catch {
      return res.status(502).json({ error: "Could not read progress" });
    }
  }

  if (req.method === "PUT") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!isValidProgress(body.progress)) return res.status(400).json({ error: "Invalid payload" });
    try {
      await redis.set(key, body.progress);
      return res.status(204).end();
    } catch {
      return res.status(502).json({ error: "Could not save progress" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
