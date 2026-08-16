// Assembles the full question bank: extracted seeds + hand-authored curated +
// the parametric generated set. Exposes sampling/search helpers used by the UI.
import { SEED_QUESTIONS } from "./seeds.js";
import { CURATED_QUESTIONS } from "./curated.js";
import { generateQuestions } from "./generator.js";
import { DOMAINS, EXAM_LENGTH } from "./blueprint.js";

// Deterministic per-question hash so option shuffling is stable across
// reloads/sessions (same id always shuffles the same way) without needing to
// store a shuffled order anywhere — it's just recomputed from the id.
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
function shuffleOptions(options, correctIdx, seed) {
  const r = rng(seed);
  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { options: order.map((i) => options[i]), correct: order.indexOf(correctIdx) };
}

function normalize(q, idx, prefix) {
  const id = q.id || `${prefix}-${idx}`;
  // curated.js and seeds.js are hand-authored with the correct answer almost
  // always at the same position (A/B) — an exploitable bias. generator.js
  // already shuffles its own options, so only fix it here for these two.
  const needsShuffle = prefix === "seed" || prefix === "curated";
  const { options, correct } = needsShuffle
    ? shuffleOptions(q.options, q.correct, hashStr(id))
    : { options: q.options, correct: q.correct };
  return {
    id,
    domain: q.domain,
    difficulty: q.difficulty || 2,
    scenario: q.scenario || "",
    question: q.question,
    options,
    correct,
    explanation: q.explanation || "",
    cat: q.cat || prefix,
    src: q.src || prefix,
    // hand-authored seeds and curated items are scenario-style by construction
    style: q.style || (prefix === "generated" ? "computational" : "scenario")
  };
}

const seeds = SEED_QUESTIONS.map((q, i) => normalize(q, i, "seed"));
const curated = CURATED_QUESTIONS.map((q, i) => normalize(q, i, "curated"));
const generated = generateQuestions().map((q, i) => normalize(q, i, "generated"));

export const ALL_QUESTIONS = [...seeds, ...curated, ...generated];

// Stable index by id and by domain.
const BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
const BY_DOMAIN = {};
for (const d of Object.keys(DOMAINS)) BY_DOMAIN[d] = [];
for (const q of ALL_QUESTIONS) (BY_DOMAIN[q.domain] || (BY_DOMAIN[q.domain] = [])).push(q);

const styleCount = (s) => ALL_QUESTIONS.filter((q) => q.style === s).length;
export const STATS = {
  total: ALL_QUESTIONS.length,
  seeds: seeds.length,
  curated: curated.length,
  generated: generated.length,
  byDomain: Object.fromEntries(Object.keys(DOMAINS).map((d) => [d, (BY_DOMAIN[d] || []).length])),
  byStyle: { scenario: styleCount("scenario"), recall: styleCount("recall"), computational: styleCount("computational") }
};

export function getById(id) { return BY_ID.get(id); }

// Mulberry32 + seedable shuffle so "random" sets are reproducible per session seed.
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function sampleN(arr, n, r) {
  const pool = arr.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

// Draw n items, preferring those NOT recently served (avoid set of ids), only
// falling back to recently-seen items once the fresh pool is exhausted.
function drawFresh(arr, n, r, avoid) {
  if (!avoid || !avoid.size) return sampleN(arr, n, r);
  const fresh = arr.filter((q) => !avoid.has(q.id));
  const out = sampleN(fresh, n, r);
  if (out.length < n) {
    const stale = arr.filter((q) => avoid.has(q.id));
    out.push(...sampleN(stale, n - out.length, r));
  }
  return out;
}

// Build a full mock exam weighted by the official domain percentages.
// Within each domain we prefer scenario-style questions (the real CCA-F shape),
// then recall, then computational — so a mock exam feels like the real exam.
export function buildExam(seed = Date.now(), length = EXAM_LENGTH, avoid = []) {
  const r = rng(seed);
  const avoidSet = new Set(avoid);
  const picks = [];
  const domains = Object.values(DOMAINS);
  let allocated = 0;
  domains.forEach((d, i) => {
    let n = Math.round((d.weight / 100) * length);
    if (i === domains.length - 1) n = length - allocated;
    allocated += n;
    const pool = BY_DOMAIN[d.id] || [];
    const scen = pool.filter((q) => q.style === "scenario");
    const recall = pool.filter((q) => q.style === "recall");
    const comp = pool.filter((q) => q.style === "computational");
    // fill from scenario first, then recall, then a small computational tail,
    // preferring questions not served recently
    const chosen = [];
    for (const tier of [scen, recall, comp]) {
      if (chosen.length >= n) break;
      chosen.push(...drawFresh(tier, n - chosen.length, r, avoidSet));
    }
    picks.push(...chosen);
  });
  return sampleN(picks, picks.length, r);
}

// Practice set: filter by domains + difficulty range + style, then sample.
export function buildPractice({ domains = null, minDiff = 1, maxDiff = 5, count = 20, styles = null, avoid = [], seed = Date.now() } = {}) {
  const r = rng(seed);
  let pool = ALL_QUESTIONS.filter((q) => q.difficulty >= minDiff && q.difficulty <= maxDiff);
  if (domains && domains.length) pool = pool.filter((q) => domains.includes(q.domain));
  if (styles && styles.length) pool = pool.filter((q) => styles.includes(q.style));
  return drawFresh(pool, count, r, new Set(avoid));
}

// Diagnostic: a fixed-shape placement test — n questions per domain, mixed
// difficulty, no domain weighting (unlike a mock exam) so every domain gets
// equal signal regardless of its exam weight.
export function buildDiagnostic(seed = Date.now(), perDomain = 5) {
  const r = rng(seed);
  const picks = [];
  for (const d of Object.keys(DOMAINS)) {
    const pool = BY_DOMAIN[d] || [];
    const scen = pool.filter((q) => q.style === "scenario");
    const rest = pool.filter((q) => q.style !== "scenario");
    const chosen = sampleN(scen, Math.min(perDomain, scen.length), r);
    if (chosen.length < perDomain) chosen.push(...sampleN(rest, perDomain - chosen.length, r));
    picks.push(...chosen);
  }
  return sampleN(picks, picks.length, r);
}

// Lightweight search over scenario + question + options.
export function search(term, { domain = null, limit = 100 } = {}) {
  const t = term.trim().toLowerCase();
  let pool = ALL_QUESTIONS;
  if (domain) pool = pool.filter((q) => q.domain === domain);
  if (!t) return pool.slice(0, limit);
  const res = [];
  for (const q of pool) {
    const hay = (q.scenario + " " + q.question + " " + q.options.join(" ")).toLowerCase();
    if (hay.includes(t)) { res.push(q); if (res.length >= limit) break; }
  }
  return res;
}
