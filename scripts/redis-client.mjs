// Shared Upstash Redis client for Node build/content scripts (seed-content.mjs,
// export-content.mjs). Not used by the browser or by api/telemetry.js, which
// each construct their own client — this just avoids repeating the env-var
// wiring across scripts that touch the content store.
import { Redis } from "@upstash/redis";

export function getRedis() {
  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error(
      "KV_REST_API_URL / KV_REST_API_TOKEN not set. Run `vercel env pull .env.local` " +
      "and load it (e.g. `node --env-file=.env.local scripts/seed-content.mjs`)."
    );
  }
  return new Redis({ url: KV_REST_API_URL, token: KV_REST_API_TOKEN });
}

// content:* keys hold the site's editorial content — glossary, reference,
// domains, certs registry, FAQ, blog posts, lessons, handbook. Distinct from
// the stats:* keys api/telemetry.js owns (anonymous usage counters).
export const CONTENT_KEYS = {
  domains: "content:domains",
  certs: "content:certs",
  mechanics: "content:certs:mechanics",
  faq: "content:faq",
  glossary: "content:glossary",
  reference: "content:reference",
  blog: "content:blog",
  lessons: (domainId) => `content:lessons:${domainId}`,
  handbook: (domainId) => `content:handbook:${domainId}`
};

export const DOMAIN_IDS = [1, 2, 3, 4, 5];
