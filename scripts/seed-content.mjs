#!/usr/bin/env node
// One-time (and re-runnable) migration: pushes the site's editorial content
// — currently authored as plain JS/data modules in js/ and content/ — into
// Redis, making it the canonical, editable source of truth. After this runs,
// scripts/build-pages.mjs reads content FROM Redis; these local files remain
// as the last-known-good copy and as what `export-content.mjs` regenerates.
//
// Run: node --env-file=.env.local scripts/seed-content.mjs
import { getRedis, CONTENT_KEYS, DOMAIN_IDS } from "./redis-client.mjs";
import { DOMAINS_LIST } from "../js/blueprint-domains.js";
import { CERTS, UPCOMING_TRACK_MECHANICS } from "../js/certs.js";
import { FAQ_ITEMS } from "../js/faq.js";
import { GLOSSARY } from "../content/glossary.mjs";
import { REFERENCE } from "../content/reference.mjs";
import { POSTS } from "../content/blog-posts.mjs";
import { LESSONS as LESSONS_1 } from "../content/lessons-1.mjs";
import { LESSONS as LESSONS_2 } from "../content/lessons-2.mjs";
import { LESSONS as LESSONS_3 } from "../content/lessons-3.mjs";
import { LESSONS as LESSONS_4 } from "../content/lessons-4.mjs";
import { LESSONS as LESSONS_5 } from "../content/lessons-5.mjs";
import { HANDBOOK as HANDBOOK_1 } from "../content/handbook-1.mjs";
import { HANDBOOK as HANDBOOK_2 } from "../content/handbook-2.mjs";
import { HANDBOOK as HANDBOOK_3 } from "../content/handbook-3.mjs";
import { HANDBOOK as HANDBOOK_4 } from "../content/handbook-4.mjs";
import { HANDBOOK as HANDBOOK_5 } from "../content/handbook-5.mjs";

const LESSONS_BY_DOMAIN = { 1: LESSONS_1, 2: LESSONS_2, 3: LESSONS_3, 4: LESSONS_4, 5: LESSONS_5 };
const HANDBOOK_BY_DOMAIN = { 1: HANDBOOK_1, 2: HANDBOOK_2, 3: HANDBOOK_3, 4: HANDBOOK_4, 5: HANDBOOK_5 };

const redis = getRedis();

async function main() {
  const pipeline = redis.pipeline();
  pipeline.set(CONTENT_KEYS.domains, DOMAINS_LIST);
  pipeline.set(CONTENT_KEYS.certs, CERTS);
  pipeline.set(CONTENT_KEYS.mechanics, UPCOMING_TRACK_MECHANICS);
  pipeline.set(CONTENT_KEYS.faq, FAQ_ITEMS);
  pipeline.set(CONTENT_KEYS.glossary, GLOSSARY);
  pipeline.set(CONTENT_KEYS.reference, REFERENCE);
  pipeline.set(CONTENT_KEYS.blog, POSTS);
  for (const id of DOMAIN_IDS) {
    pipeline.set(CONTENT_KEYS.lessons(id), LESSONS_BY_DOMAIN[id]);
    pipeline.set(CONTENT_KEYS.handbook(id), HANDBOOK_BY_DOMAIN[id]);
  }
  await pipeline.exec();

  console.log("Seeded content into Redis:");
  console.log(`  domains: ${DOMAINS_LIST.length}`);
  console.log(`  certs: ${CERTS.length}`);
  console.log(`  faq: ${FAQ_ITEMS.length}`);
  console.log(`  glossary domains: ${Object.keys(GLOSSARY).length}`);
  console.log(`  reference domains: ${Object.keys(REFERENCE).length}`);
  console.log(`  blog posts: ${POSTS.length}`);
  for (const id of DOMAIN_IDS) {
    console.log(`  lessons[${id}]: ${LESSONS_BY_DOMAIN[id].length}, handbook[${id}]: present=${!!HANDBOOK_BY_DOMAIN[id]}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
