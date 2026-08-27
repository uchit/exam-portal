// Public, read-only status written by api/cron/freshness-check.js — powers
// the automated-check line under the "Freshness" callout on the About page.
import { Redis } from "@upstash/redis";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Storage not configured" });
  }
  try {
    const status = await redis.hgetall("freshness:status");
    res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
    return res.status(200).json(status && Object.keys(status).length ? status : null);
  } catch {
    return res.status(502).json({ error: "Could not read freshness status" });
  }
}
