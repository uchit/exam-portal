// Assembles the CCDV-F question bank from per-domain source files. Deliberately
// self-contained (duplicates the small amount of pure RNG/shuffle logic from
// js/bank.js rather than importing it) so this new track can never regress
// the live CCA-F/CCAR-P/CCAO-F banks — mirrors js/bank-ccao-f.js's shape exactly.
import { DOMAINS_CCDV_F, EXAM_LENGTH_CCDV_F } from "./blueprint-ccdv-f.js";
import { QUESTIONS_D1 } from "./ccdvf-questions-d1.js";
import { QUESTIONS_D2 } from "./ccdvf-questions-d2.js";
import { QUESTIONS_D3 } from "./ccdvf-questions-d3.js";
import { QUESTIONS_D4 } from "./ccdvf-questions-d4.js";
import { QUESTIONS_D5 } from "./ccdvf-questions-d5.js";
import { QUESTIONS_D6 } from "./ccdvf-questions-d6.js";
import { QUESTIONS_D7 } from "./ccdvf-questions-d7.js";
import { QUESTIONS_D8 } from "./ccdvf-questions-d8.js";

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
  return { options: order.map((i) => options[i]), correct: order.indexOf(correctIdx), order };
}

// Same letter-remapping need as CCAR-P/CCAO-F — see js/bank-ccar-p.js's
// comment for why: agent-authored explanations cite options by their
// original letter, which shuffleOptions() invalidates unless remapped
// through the permutation.
const OPT_LETTERS = ["A", "B", "C", "D"];
function remapExplanationLetters(text, order) {
  return text.replace(/\(([ABCD](?:,\s*[ABCD])*)\)/g, (whole, letters) => {
    const remapped = letters.split(/,\s*/).map((letter) => {
      const newIdx = order.indexOf(OPT_LETTERS.indexOf(letter));
      return newIdx === -1 ? letter : OPT_LETTERS[newIdx];
    }).sort();
    return `(${remapped.join(", ")})`;
  });
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

// All CCDV-F questions are hand/agent-authored scenario items (no parametric
// generator for this track), so every one gets the position-debiasing shuffle.
function normalize(q, idx) {
  const id = `ccdvf-d${q.domain}-${String(idx).padStart(4, "0")}`;
  const { options, correct, order } = shuffleOptions(q.options, q.correct, hashStr(id));
  return {
    id, domain: q.domain, difficulty: q.difficulty || 3,
    scenario: q.scenario || "", question: q.question,
    options, correct, explanation: remapExplanationLetters(q.explanation || "", order),
    style: "scenario"
  };
}

const RAW = [...QUESTIONS_D1, ...QUESTIONS_D2, ...QUESTIONS_D3, ...QUESTIONS_D4, ...QUESTIONS_D5, ...QUESTIONS_D6, ...QUESTIONS_D7, ...QUESTIONS_D8];
export const ALL_QUESTIONS_CCDV_F = RAW.map((q, i) => normalize(q, i));

const BY_ID = new Map(ALL_QUESTIONS_CCDV_F.map((q) => [q.id, q]));
const BY_DOMAIN = {};
for (const d of Object.keys(DOMAINS_CCDV_F)) BY_DOMAIN[d] = [];
for (const q of ALL_QUESTIONS_CCDV_F) (BY_DOMAIN[q.domain] || (BY_DOMAIN[q.domain] = [])).push(q);

export const STATS_CCDV_F = {
  total: ALL_QUESTIONS_CCDV_F.length,
  byDomain: Object.fromEntries(Object.keys(DOMAINS_CCDV_F).map((d) => [d, (BY_DOMAIN[d] || []).length]))
};

export function getByIdCcdvF(id) { return BY_ID.get(id); }

export function buildExamCcdvF(seed = Date.now(), length = EXAM_LENGTH_CCDV_F, avoid = []) {
  const r = rng(seed);
  const avoidSet = new Set(avoid);
  const picks = [];
  const domains = Object.values(DOMAINS_CCDV_F);
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

export function buildPracticeCcdvF({ domains = null, minDiff = 1, maxDiff = 5, count = 20, avoid = [], seed = Date.now() } = {}) {
  const r = rng(seed);
  let pool = ALL_QUESTIONS_CCDV_F.filter((q) => q.difficulty >= minDiff && q.difficulty <= maxDiff);
  if (domains && domains.length) pool = pool.filter((q) => domains.includes(q.domain));
  return drawFresh(pool, count, r, new Set(avoid));
}
