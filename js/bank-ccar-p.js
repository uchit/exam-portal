// Assembles the CCAR-P question bank from per-domain source files. Deliberately
// self-contained (duplicates the small amount of pure RNG/shuffle logic from
// js/bank.js rather than importing it) so this new track can never regress the
// live, already-debugged CCA-F bank — see js/bank.js's own history: a real
// answer-position-bias bug was found and fixed there once already.
import { DOMAINS_CCAR_P, EXAM_LENGTH_CCAR_P } from "./blueprint-ccar-p.js";
import { QUESTIONS_D1 } from "./ccarp-questions-d1.js";
import { QUESTIONS_D2 } from "./ccarp-questions-d2.js";
import { QUESTIONS_D3 } from "./ccarp-questions-d3.js";
import { QUESTIONS_D4 } from "./ccarp-questions-d4.js";
import { QUESTIONS_D5 } from "./ccarp-questions-d5.js";
import { QUESTIONS_D6 } from "./ccarp-questions-d6.js";
import { QUESTIONS_D7 } from "./ccarp-questions-d7.js";

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
function sampleN(arr, n, r) {
  const pool = arr.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}
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

// All CCAR-P questions are hand/agent-authored scenario items (no parametric
// generator for this track — professional-tier judgment calls aren't the kind
// of thing you compute), so every one gets the position-debiasing shuffle.
function normalize(q, idx) {
  const id = `ccarp-d${q.domain}-${String(idx).padStart(4, "0")}`;
  const { options, correct } = shuffleOptions(q.options, q.correct, hashStr(id));
  return {
    id, domain: q.domain, difficulty: q.difficulty || 3,
    scenario: q.scenario || "", question: q.question,
    options, correct, explanation: q.explanation || "",
    style: "scenario"
  };
}

const RAW = [...QUESTIONS_D1, ...QUESTIONS_D2, ...QUESTIONS_D3, ...QUESTIONS_D4, ...QUESTIONS_D5, ...QUESTIONS_D6, ...QUESTIONS_D7];
export const ALL_QUESTIONS_CCAR_P = RAW.map((q, i) => normalize(q, i));

const BY_ID = new Map(ALL_QUESTIONS_CCAR_P.map((q) => [q.id, q]));
const BY_DOMAIN = {};
for (const d of Object.keys(DOMAINS_CCAR_P)) BY_DOMAIN[d] = [];
for (const q of ALL_QUESTIONS_CCAR_P) (BY_DOMAIN[q.domain] || (BY_DOMAIN[q.domain] = [])).push(q);

export const STATS_CCAR_P = {
  total: ALL_QUESTIONS_CCAR_P.length,
  byDomain: Object.fromEntries(Object.keys(DOMAINS_CCAR_P).map((d) => [d, (BY_DOMAIN[d] || []).length]))
};

export function getByIdCcarP(id) { return BY_ID.get(id); }

export function buildExamCcarP(seed = Date.now(), length = EXAM_LENGTH_CCAR_P, avoid = []) {
  const r = rng(seed);
  const avoidSet = new Set(avoid);
  const picks = [];
  const domains = Object.values(DOMAINS_CCAR_P);
  let allocated = 0;
  domains.forEach((d, i) => {
    let n = Math.round((d.weight / 100) * length);
    if (i === domains.length - 1) n = length - allocated;
    allocated += n;
    const pool = BY_DOMAIN[d.id] || [];
    picks.push(...drawFresh(pool, n, r, avoidSet));
  });
  return sampleN(picks, picks.length, r);
}

export function buildPracticeCcarP({ domains = null, minDiff = 1, maxDiff = 5, count = 20, avoid = [], seed = Date.now() } = {}) {
  const r = rng(seed);
  let pool = ALL_QUESTIONS_CCAR_P.filter((q) => q.difficulty >= minDiff && q.difficulty <= maxDiff);
  if (domains && domains.length) pool = pool.filter((q) => domains.includes(q.domain));
  return drawFresh(pool, count, r, new Set(avoid));
}
