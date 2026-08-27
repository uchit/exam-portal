// Automates the "we verify against the Claude API" promise on the About
// page: fetches Anthropic's public API release-notes page and compares its
// most recent entry date against data/build-meta.json (written by
// scripts/build-pages.mjs on every deploy — the date this site's content was
// last reviewed). If Anthropic has shipped something since, that becomes a
// visible fact instead of something someone has to remember to check.
//
// Triggered by the cron schedule in vercel.json. Gated by CRON_SECRET (set
// in Vercel env) when present, matching Vercel's own recommended pattern for
// protecting cron routes from public invocation.
import { Redis } from "@upstash/redis";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const RELEASE_NOTES_URL = "https://platform.claude.com/docs/en/release-notes/api";

function readBuildMeta() {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), "data/build-meta.json"), "utf8"));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (process.env.CRON_SECRET) {
    const auth = req.headers.authorization || "";
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "Unauthorized" });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ error: "Storage not configured" });
  }
  const meta = readBuildMeta();
  if (!meta?.buildDate) return res.status(500).json({ error: "Missing build metadata" });

  try {
    const resp = await fetch(RELEASE_NOTES_URL, { headers: { "User-Agent": "thatclaude.com-freshness-check/1.0" } });
    const text = await resp.text();
    // The page is real server-rendered HTML, not markdown — strip tags first
    // so this doesn't depend on whether dates land in an <h2>, <h3>, or any
    // other element.
    const stripped = text.replace(/<[^>]+>/g, " ");
    const match = stripped.match(/([A-Z][a-z]+ \d{1,2},\s*\d{4})/);
    const latestEntryIso = match ? new Date(match[1]).toISOString().slice(0, 10) : null;
    const needsReview = !!(latestEntryIso && latestEntryIso > meta.buildDate);

    await redis.hset("freshness:status", {
      lastCheckedAt: Date.now(),
      anthropicLatestEntryDate: latestEntryIso,
      contentVerifiedDate: meta.buildDate,
      needsReview
    });
    return res.status(200).json({ ok: true, latestEntryIso, contentVerifiedDate: meta.buildDate, needsReview });
  } catch {
    return res.status(502).json({ error: "Could not check Anthropic release notes" });
  }
}
