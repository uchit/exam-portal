// ============================================================================
// Claude Cert Prep — SPA controller (vanilla ES modules, no build step).
// ============================================================================
import { DOMAINS, DIFFICULTY, EXAM_LENGTH, EXAM_MINUTES, PASS_PERCENT, EXAM_NAME, EXAM_CODE } from "./blueprint.js";
import { ALL_QUESTIONS, STATS, buildExam, buildPractice, buildDiagnostic, search, getById } from "./bank.js";
import { ICONS } from "./icons.js";
import { drawBadge, downloadBadge } from "./badge.js";

const app = document.getElementById("app");
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const fmt = (n) => n.toLocaleString("en-US");
const flagLabel = (flagged) => `${flagged ? ICONS.flagFilled(14) : ICONS.flag(14)}<span>${flagged ? "Flagged" : "Flag"}</span>`;
const hintLabel = `${ICONS.bulb(14)}<span>Hint</span>`;
// Keep in sync with FAQ_ITEMS in scripts/build-pages.mjs (drives /prep's FAQPage structured data).
const FAQ_ITEMS = [
  ["Is Claude Cert Prep free?", "Yes. Every practice mode, the full mock exam, the diagnostic, drill, curriculum, glossary, and quick reference are free with no account or sign-up required."],
  ["How long does it take to prepare for the CCA-F exam?", "Most people need about two to three weeks at roughly one hour a day, mostly spent on practice questions rather than reading — assuming around six months of hands-on Claude API or Claude Code experience going in."],
  ["Is this an official Anthropic study resource?", "No. Claude Cert Prep is an independent, unofficial study aid. It is not affiliated with, endorsed by, or sponsored by Anthropic."],
  ["What's the CCA-F exam format?", "60 scenario-based questions in 120 minutes, scored on a scaled 100-1000 range with a pass mark of 720, weighted across five domains."],
  ["Do I need an account to track my progress?", "No. Progress, flags, and mock-exam history are saved locally in your browser — nothing is sent to a server, and there's no login."]
];
// Map a percentage to the real exam's 100–1000 scaled range, anchored so the
// pass point lines up exactly: 0%→100, PASS_PERCENT→720, 100%→1000.
function scaledScore(pct) {
  const s = pct >= PASS_PERCENT
    ? 720 + ((pct - PASS_PERCENT) / (100 - PASS_PERCENT)) * (1000 - 720)
    : 100 + (pct / PASS_PERCENT) * (720 - 100);
  return Math.round(Math.max(100, Math.min(1000, s)));
}

// ---------- progress (localStorage) ----------
const PKEY = "claudecert.progress.v1";
const defaultProgress = () => ({ answered: {}, flags: {}, exams: [], streak: 0, bestStreak: 0, attempts: 0, correct: 0, recent: [], srs: {}, completedLessons: {} });
const TOTAL_LESSONS = 30;
const RECENT_CAP = 300; // remember the last N served questions to avoid repeats
let progress = loadProgress();
function loadProgress() {
  try { return Object.assign(defaultProgress(), JSON.parse(localStorage.getItem(PKEY) || "{}")); }
  catch { return defaultProgress(); }
}
function saveProgress() { try { localStorage.setItem(PKEY, JSON.stringify(progress)); } catch {} }
// Spaced-repetition scheduling (SM-2-lite): a correct answer advances the
// item to the next interval step; a miss resets it to step 0 (due tomorrow).
// Every recorded answer — practice, exam, diagnostic — feeds this, so Drill
// mode's queue reflects real performance across the whole site, not just
// questions answered inside Drill itself.
const SRS_STEP_DAYS = [1, 3, 7, 16, 35, 75];
function updateSRS(id, ok) {
  const s = progress.srs[id] || { step: -1, reps: 0, lapses: 0, due: 0 };
  if (ok) { s.step = Math.min(s.step + 1, SRS_STEP_DAYS.length - 1); s.reps++; }
  else { s.step = 0; s.lapses++; }
  s.due = Date.now() + SRS_STEP_DAYS[s.step] * 86400000;
  progress.srs[id] = s;
}
function recordAnswer(q, ok) {
  progress.answered[q.id] = { ok, ts: Date.now() };
  progress.attempts++; if (ok) progress.correct++;
  progress.streak = ok ? progress.streak + 1 : 0;
  progress.bestStreak = Math.max(progress.bestStreak, progress.streak);
  updateSRS(q.id, ok);
  saveProgress();
}
// Remember which questions were just served so the next set prefers fresh ones.
function noteServed(qs) {
  const ids = qs.map((q) => q.id);
  progress.recent = [...ids, ...(progress.recent || []).filter((id) => !ids.includes(id))].slice(0, RECENT_CAP);
  saveProgress();
}
// Spaced repetition: questions answered incorrectly, oldest-miss first, with
// items missed ≥48h ago prioritized (re-attempt after 48h internalizes the pattern).
function buildMistakes(count = 20) {
  const DAY2 = 48 * 3600 * 1000;
  const now = Date.now();
  const misses = Object.entries(progress.answered)
    .filter(([, a]) => a.ok === false)
    .map(([id, a]) => ({ q: getById(id), ts: a.ts || 0 }))
    .filter((x) => x.q);
  // due (≥48h) first, then the rest; within each, oldest first
  misses.sort((a, b) => {
    const ad = now - a.ts >= DAY2, bd = now - b.ts >= DAY2;
    if (ad !== bd) return ad ? -1 : 1;
    return a.ts - b.ts;
  });
  return misses.slice(0, count).map((x) => x.q);
}
function mistakeCount() {
  return Object.values(progress.answered).filter((a) => a.ok === false).length;
}
// Drill queue: SRS items due now (most-overdue first), optionally filtered to
// a set of domains. Only draws from questions you've already answered at
// least once — Drill reviews, it doesn't introduce new material.
function buildDrillQueue(domains = null, limit = 30) {
  const now = Date.now();
  const due = Object.entries(progress.srs)
    .map(([id, s]) => ({ q: getById(id), s }))
    .filter((x) => x.q && x.s.due <= now)
    .filter((x) => !domains || !domains.length || domains.includes(x.q.domain));
  due.sort((a, b) => a.s.due - b.s.due);
  return due.slice(0, limit).map((x) => x.q);
}
function drillDueCount(domains = null) { return buildDrillQueue(domains, Infinity).length; }
function nextDrillDue(domains = null) {
  const upcoming = Object.entries(progress.srs)
    .map(([id, s]) => ({ q: getById(id), s }))
    .filter((x) => x.q && (!domains || !domains.length || domains.includes(x.q.domain)));
  if (!upcoming.length) return null;
  return Math.min(...upcoming.map((x) => x.s.due));
}
function domainMastery(d) {
  const qs = ALL_QUESTIONS.filter((q) => q.domain === d);
  let seen = 0, ok = 0;
  for (const q of qs) { const a = progress.answered[q.id]; if (a) { seen++; if (a.ok) ok++; } }
  return { total: qs.length, seen, ok, acc: seen ? Math.round((ok / seen) * 100) : 0 };
}

// ---------- theme ----------
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("claudecert.theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("claudecert.theme", next);
});
document.getElementById("bankChip").textContent = `${fmt(STATS.total)} questions`;

// ---------- toast ----------
let toastTimer;
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = el(`<div class="toast"></div>`); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

// ---------- shared render bits ----------
function domainTag(d) {
  const dom = DOMAINS[d];
  return `<span class="tag tag-domain" style="--tag-c:${dom.color}">${esc(dom.short)}</span>`;
}
function renderOptions(q, { answered = false, selected = null, locked = false } = {}) {
  return q.options.map((opt, i) => {
    let cls = "option";
    if (locked) cls += " locked";
    if (answered) {
      if (i === q.correct) cls += " correct";
      else if (i === selected) cls += " wrong";
    } else if (i === selected) cls += " selected";
    const mark = answered ? (i === q.correct ? `<span class="mark">✓</span>` : (i === selected ? `<span class="mark">✕</span>` : "")) : "";
    return `<button class="${cls}" data-opt="${i}"><span class="letter">${LETTERS[i]}</span><span>${esc(opt)}</span>${mark}</button>`;
  }).join("");
}

// ============================================================================
// ROUTER
// ============================================================================
// Real paths (History API), not hash routes — every page below has its own
// crawlable URL and static HTML shell (see scripts/build-pages.mjs). Only the
// stateful "app" routes are rendered client-side; content pages (about,
// glossary, blog…) ship their content baked into the shell HTML and are never
// re-rendered here, so plain <a href> full navigations to them work as-is.
const routes = {
  "/": viewHome,
  "/practice": viewPracticeConfig,
  "/exam": viewExamConfig,
  "/browse": viewBrowse,
  "/progress": viewProgress,
  "/prep": viewPrep,
  "/diagnostic": viewDiagnosticConfig,
  "/drill": viewDrillConfig
};
function currentPath() {
  return location.pathname.replace(/\/+$/, "") || "/";
}
function navKey(path) {
  return path === "/" ? "home" : path.slice(1).split("/")[0];
}
function router() {
  const path = currentPath();
  const params = new URLSearchParams(location.search);
  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === navKey(path));
  });
  const fn = routes[path];
  if (!fn) return; // a static content page — its HTML is already in #app
  app.innerHTML = "";
  fn(params);
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}
function navigate(path) {
  if (path !== location.pathname + location.search) history.pushState({}, "", path);
  router();
}
// Intercept clicks only for known SPA routes; everything else (content pages,
// external links) gets a normal browser navigation.
document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest("a[href]");
  if (!a || (a.target && a.target !== "_self")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (!(path in routes)) return;
  e.preventDefault();
  navigate(path + url.search);
});
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
router();

// ============================================================================
// HOME
// ============================================================================
function viewHome() {
  const acc = progress.attempts ? Math.round((progress.correct / progress.attempts) * 100) : 0;
  const v = el(`<div class="view"></div>`);
  v.innerHTML = `
    <section class="hero">
      <span class="hero-badge">● ${esc(EXAM_CODE)} · ${esc(EXAM_NAME)}</span>
      <h1>Pass the Claude Certified Architect exam with confidence.</h1>
      <p>A free, open practice portal built on the official 5-domain blueprint. Mock exams use ${fmt(STATS.byStyle.scenario + STATS.byStyle.recall)} architecture-decision scenarios — the real exam's shape — backed by a ${fmt(STATS.total)}-question bank for unlimited drilling, with hints and an explanation on every answer.</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="n">${fmt(STATS.total)}</div><div class="l">Questions</div></div>
        <div class="hero-stat"><div class="n">5</div><div class="l">Domains</div></div>
        <div class="hero-stat"><div class="n">${EXAM_LENGTH}</div><div class="l">Q / mock exam</div></div>
        <div class="hero-stat"><div class="n">${PASS_PERCENT}%</div><div class="l">Pass mark</div></div>
      </div>
      <div class="hero-cta">
        <a class="btn btn-primary" href="/exam">Start a mock exam →</a>
        <a class="btn btn-ghost" href="/practice">Quick practice</a>
        <a class="btn btn-ghost" href="/prep">How to pass</a>
      </div>
      <p class="hero-note">New here? <a href="/diagnostic">Take the 15-minute diagnostic →</a> to see which domain to study first.</p>
    </section>

    <p class="section-title">Choose how you want to study</p>
    <div class="grid grid-3" style="margin-bottom:34px">
      ${modeTile("Quick Practice", "Mixed questions with instant feedback, hints and explanations. Learn as you go.", "/practice", "var(--primary)", ICONS.bolt(20))}
      ${modeTile("Full Mock Exam", `${EXAM_LENGTH} domain-weighted questions, ${EXAM_MINUTES}-minute timer, scored like the real CCA-F.`, "/exam", "var(--accent)", ICONS.timer(20))}
      ${modeTile("Question Bank", `Browse and search all ${fmt(STATS.total)} questions with answers and explanations.`, "/browse", "var(--success)", ICONS.book(20))}
    </div>

    <p class="section-title">The five exam domains</p>
    <div class="grid grid-auto">${Object.values(DOMAINS).map(domainCard).join("")}</div>

    <div class="statline" style="margin-top:34px">
      <div class="stat-card"><div class="n">${fmt(Object.keys(progress.answered).length)}</div><div class="l">Questions attempted</div></div>
      <div class="stat-card"><div class="n">${acc}%</div><div class="l">Lifetime accuracy</div></div>
      <div class="stat-card"><div class="n">${progress.bestStreak}</div><div class="l">Best streak</div></div>
      <div class="stat-card"><div class="n">${progress.exams.length}</div><div class="l">Mock exams taken</div></div>
    </div>`;
  app.appendChild(v);
}
function modeTile(title, desc, href, color, icon) {
  return `<a class="card interactive mode-tile" href="${href}">
    <span class="mt-icon" style="--icon-fg:${color};--icon-bg:color-mix(in srgb, ${color} 13%, transparent)">${icon}</span>
    <h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="mt-go">Open →</span></a>`;
}
function domainCard(d) {
  const m = domainMastery(d.id);
  return `<div class="card domain-card"><span class="card-accent" style="background:${d.color}"></span>
    <div class="domain-head">
      <span class="domain-dot" style="background:${d.color}"></span>
      <h3>${esc(d.name)}</h3>
      <span class="domain-weight">${d.weight}%</span>
    </div>
    <p>${esc(d.blurb)}</p>
    <div class="progress-track"><div class="progress-fill" style="width:${m.seen ? Math.max(4, Math.round(m.seen / m.total * 100)) : 0}%;background:${d.color}"></div></div>
    <div class="domain-meta"><span>${fmt(m.total)} questions</span><span>${m.seen ? m.acc + "% correct · " + m.seen + " seen" : "Not started"}</span></div>
    <a class="btn btn-outline btn-sm" href="/practice?d=${d.id}">Practice this domain</a>
  </div>`;
}

// ============================================================================
// PRACTICE — config then runner
// ============================================================================
function viewPracticeConfig(params) {
  const preD = params.get("d");
  const state = { domains: preD ? [Number(preD)] : [], diff: "any", count: 20, style: "exam" };
  const v = el(`<div class="view"></div>`);
  const misses = mistakeCount();
  v.innerHTML = `
    <div class="page-head"><h1>Quick Practice</h1><p class="lead">Pick your domains and difficulty. You'll get instant feedback, a hint button, and a full explanation on every question. Every question is a <strong>scenario</strong> — just like the real exam. Brushing up first? See the <a href="/learn" style="color:var(--primary);font-weight:700">curriculum</a>, <a href="/glossary" style="color:var(--primary);font-weight:700">glossary</a>, or <a href="/reference" style="color:var(--primary);font-weight:700">quick reference</a>.</p></div>
    ${misses ? `<div class="card interactive review-card" id="reviewMistakes"><span class="card-accent" style="background:var(--warning)"></span>
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <span class="mt-icon" style="--icon-fg:var(--warning);--icon-bg:color-mix(in srgb, var(--warning) 13%, transparent);width:38px;height:38px">${ICONS.refresh(18)}</span>
        <div style="flex:1;min-width:180px"><h3>Review my mistakes (${misses})</h3>
        <p style="color:var(--text-2);font-size:14px;margin-top:2px">Re-attempt the questions you got wrong — those missed 48h+ ago come first, so the reasoning sticks.</p></div>
        <span class="btn btn-outline btn-sm">Start review →</span>
      </div></div>` : ""}
    <div class="card config">
      <div class="field"><label>Domains <span style="color:var(--text-3);font-weight:500">(none = all)</span></label>
        <div class="chips" id="domChips">
          ${Object.values(DOMAINS).map((d) => `<button class="chip" data-d="${d.id}"><span class="dot" style="background:${d.color}"></span>${esc(d.short)}</button>`).join("")}
        </div>
      </div>
      <div class="field"><label>Question style</label>
        <div class="chips" id="styleChips">
          ${[["exam", "Exam-style scenarios"], ["any", "Everything"], ["calc", "Calculations"]].map(([k, l]) => `<button class="chip ${k === "exam" ? "on" : ""}" data-style="${k}">${l}</button>`).join("")}
        </div>
      </div>
      <div class="field"><label>Difficulty</label>
        <div class="chips" id="diffChips">
          ${[["any", "Any"], ["easy", "Foundational (1–2)"], ["medium", "Applied (2–3)"], ["hard", "Advanced (3–5)"], ["adaptive", "Adaptive"]].map(([k, l], i) => `<button class="chip ${i === 0 ? "on" : ""}" data-diff="${k}">${l}</button>`).join("")}
        </div>
        <p id="adaptiveNote" style="display:none;color:var(--text-3);font-size:13px;margin-top:8px">Starts at medium difficulty (level 3/5). Two correct in a row bumps the level up; one wrong drops it — so the set tracks where you're actually struggling instead of a fixed range.</p>
      </div>
      <div class="field"><label>How many questions: <b id="cntLabel">20</b></label>
        <div class="range-row"><span style="color:var(--text-3)">5</span><input type="range" id="cnt" min="5" max="50" step="5" value="20"><span style="color:var(--text-3)">50</span></div>
      </div>
      <div><button class="btn btn-solid" id="startPractice">Start practice →</button></div>
    </div>`;
  app.appendChild(v);

  v.querySelector("#reviewMistakes")?.addEventListener("click", () => {
    const set = buildMistakes(25);
    if (!set.length) { toast("No mistakes to review yet."); return; }
    runPractice(set);
  });
  const domChips = v.querySelector("#domChips");
  state.domains.forEach((d) => domChips.querySelector(`[data-d="${d}"]`)?.classList.add("on"));
  domChips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-d]"); if (!b) return;
    const id = Number(b.dataset.d); b.classList.toggle("on");
    state.domains = state.domains.includes(id) ? state.domains.filter((x) => x !== id) : [...state.domains, id];
  });
  const diffChips = v.querySelector("#diffChips"), adaptiveNote = v.querySelector("#adaptiveNote");
  diffChips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-diff]"); if (!b) return;
    diffChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
    b.classList.add("on"); state.diff = b.dataset.diff;
    adaptiveNote.style.display = state.diff === "adaptive" ? "block" : "none";
  });
  const styleChips = v.querySelector("#styleChips");
  styleChips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-style]"); if (!b) return;
    styleChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
    b.classList.add("on"); state.style = b.dataset.style;
  });
  const cnt = v.querySelector("#cnt"), cntLabel = v.querySelector("#cntLabel");
  cnt.addEventListener("input", () => { state.count = Number(cnt.value); cntLabel.textContent = cnt.value; });
  v.querySelector("#startPractice").addEventListener("click", () => {
    const styles = { exam: ["scenario", "recall"], any: null, calc: ["computational"] }[state.style];
    const domains = state.domains.length ? state.domains : null;
    if (state.diff === "adaptive") {
      runAdaptivePractice({ domains, styles, count: state.count });
      return;
    }
    const range = { any: [1, 5], easy: [1, 2], medium: [2, 3], hard: [3, 5] }[state.diff];
    const set = buildPractice({ domains, minDiff: range[0], maxDiff: range[1], count: state.count, styles, avoid: progress.recent, seed: Date.now() });
    if (!set.length) { toast("No questions match — widen your filters."); return; }
    noteServed(set);
    runPractice(set);
  });
}

function runPractice(questions) {
  let i = 0, answered = false, selected = null, hinted = false;
  let correctCount = 0;
  const v = el(`<div class="view"></div>`);
  app.innerHTML = ""; app.appendChild(v);

  function render() {
    const q = questions[i]; answered = false; selected = null; hinted = false;
    const dom = DOMAINS[q.domain];
    v.innerHTML = `
      <div class="runner-top">
        <span class="crumb">Practice</span>
        <div class="runner-meta">
          <span class="pill">Score ${correctCount}/${i}</span>
          <span class="pill">${i + 1} / ${questions.length}</span>
          <button class="btn btn-outline btn-sm" id="quit">End session</button>
        </div>
      </div>
      <div class="bigbar"><div style="width:${(i / questions.length) * 100}%"></div></div>
      <div class="qcard">
        <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">${DIFFICULTY[q.difficulty]}</span><span class="tag tag-src">${q.src}</span></div>
        ${q.scenario ? `<div class="q-scenario">${esc(q.scenario)}</div>` : ""}
        <div class="q-stem">${esc(q.question)}</div>
        <div class="options">${renderOptions(q, { selected })}</div>
        <div id="extra"></div>
        <div class="q-actions">
          <button class="linkbtn" id="hintBtn">${hintLabel}</button>
          <button class="linkbtn ${progress.flags[q.id] ? "flagged" : ""}" id="flagBtn">${flagLabel(progress.flags[q.id])}</button>
          <span class="spacer"></span>
          <button class="btn btn-solid" id="nextBtn" disabled>${i === questions.length - 1 ? "Finish" : "Next →"}</button>
        </div>
      </div>`;

    const opts = v.querySelector(".options");
    opts.addEventListener("click", (e) => {
      const b = e.target.closest("[data-opt]"); if (!b || answered) return;
      selected = Number(b.dataset.opt); answered = true;
      const ok = selected === q.correct; if (ok) correctCount++;
      recordAnswer(q, ok);
      opts.innerHTML = renderOptions(q, { answered: true, selected, locked: true });
      const coach = ok ? "" : `<div class="coach"><b>Think like the exam</b>What production concern did the right answer protect that yours didn't? — <em>latency · cost · observability · reliability · human-in-the-loop</em>. When two options seem defensible, pick the more production-grade one.</div>`;
      v.querySelector("#extra").innerHTML = `<div class="explanation"><b>${ok ? "Correct ✓" : "Not quite ✕"} · why</b>${esc(q.explanation)}</div>${coach}`;
      v.querySelector("#nextBtn").disabled = false;
      v.querySelector("#hintBtn").disabled = true;
    });
    v.querySelector("#hintBtn").addEventListener("click", () => {
      if (hinted || answered) return; hinted = true;
      // eliminate one wrong option as a hint + conceptual nudge
      const wrongs = q.options.map((_, idx) => idx).filter((idx) => idx !== q.correct);
      const drop = wrongs[Math.floor(Math.random() * wrongs.length)];
      v.querySelector("#extra").innerHTML = `<div class="hint"><b>Hint</b>Option <b style="display:inline">${LETTERS[drop]}</b> is not correct — rule it out. Focus on the ${esc(DOMAINS[q.domain].short)} principle the scenario is testing.</div>`;
    });
    v.querySelector("#flagBtn").addEventListener("click", (e) => {
      if (progress.flags[q.id]) delete progress.flags[q.id]; else progress.flags[q.id] = true;
      saveProgress();
      e.currentTarget.classList.toggle("flagged");
      e.currentTarget.innerHTML = flagLabel(progress.flags[q.id]);
    });
    v.querySelector("#nextBtn").addEventListener("click", () => {
      if (i === questions.length - 1) return finish();
      i++; render();
    });
    v.querySelector("#quit").addEventListener("click", finish);
  }
  function finish() {
    const acc = i ? Math.round((correctCount / Math.max(1, answered ? i + 1 : i)) * 100) : 0;
    const done = answered ? i + 1 : i;
    v.innerHTML = `
      <div class="page-head"><h1>Practice complete</h1></div>
      <div class="result-hero">
        <div class="gauge" style="--gc:var(--primary);--val:${acc}"><div class="gauge-inner"><div class="pct">${acc}%</div><div class="lbl">${correctCount}/${done} correct</div></div></div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:10px">
        <a class="btn btn-solid" href="/practice">New practice set</a>
        <a class="btn btn-outline" href="/progress">View progress</a>
        <a class="btn btn-outline" href="/">Home</a>
      </div>`;
    window.scrollTo({ top: 0 });
  }
  render();
}

// Adaptive practice: fetches one question at a time instead of a fixed set.
// A CAT-lite loop — two correct in a row raises the difficulty level, one
// wrong drops it — so the session converges on the level you're actually
// struggling at instead of a range you picked blind before starting.
function runAdaptivePractice({ domains, styles, count }) {
  let level = 3, streak = 0, i = 0, correctCount = 0;
  const served = new Set(progress.recent);
  const v = el(`<div class="view"></div>`);
  app.innerHTML = ""; app.appendChild(v);

  function pickNext() {
    for (let band = 0; band <= 2; band++) {
      const lo = Math.max(1, level - band), hi = Math.min(5, level + band);
      const pool = buildPractice({ domains, minDiff: lo, maxDiff: hi, count: 1, styles, avoid: [...served], seed: Date.now() + i * 97 });
      if (pool.length) return pool[0];
    }
    return null;
  }
  function render() {
    const q = pickNext();
    if (!q) return finish();
    served.add(q.id);
    let answered = false, selected = null, hinted = false;
    v.innerHTML = `
      <div class="runner-top">
        <span class="crumb">Adaptive Practice</span>
        <div class="runner-meta">
          <span class="pill">Level ${level}/5</span>
          <span class="pill">Score ${correctCount}/${i}</span>
          <span class="pill">${i + 1} / ${count}</span>
          <button class="btn btn-outline btn-sm" id="quit">End session</button>
        </div>
      </div>
      <div class="bigbar"><div style="width:${(i / count) * 100}%"></div></div>
      <div class="qcard">
        <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">${DIFFICULTY[q.difficulty]}</span></div>
        ${q.scenario ? `<div class="q-scenario">${esc(q.scenario)}</div>` : ""}
        <div class="q-stem">${esc(q.question)}</div>
        <div class="options">${renderOptions(q, { selected })}</div>
        <div id="extra"></div>
        <div class="q-actions">
          <button class="linkbtn" id="hintBtn">${hintLabel}</button>
          <span class="spacer"></span>
          <button class="btn btn-solid" id="nextBtn" disabled>${i === count - 1 ? "Finish" : "Next →"}</button>
        </div>
      </div>`;
    const opts = v.querySelector(".options");
    opts.addEventListener("click", (e) => {
      const b = e.target.closest("[data-opt]"); if (!b || answered) return;
      selected = Number(b.dataset.opt); answered = true;
      const ok = selected === q.correct; if (ok) correctCount++;
      recordAnswer(q, ok);
      opts.innerHTML = renderOptions(q, { answered: true, selected, locked: true });
      v.querySelector("#extra").innerHTML = `<div class="explanation"><b>${ok ? "Correct ✓" : "Not quite ✕"} · why</b>${esc(q.explanation)}</div>`;
      v.querySelector("#nextBtn").disabled = false;
      v.querySelector("#hintBtn").disabled = true;
      if (ok) { streak++; if (streak >= 2) { level = Math.min(5, level + 1); streak = 0; } }
      else { streak = 0; level = Math.max(1, level - 1); }
    });
    v.querySelector("#hintBtn").addEventListener("click", () => {
      if (hinted || answered) return; hinted = true;
      const wrongs = q.options.map((_, idx) => idx).filter((idx) => idx !== q.correct);
      const drop = wrongs[Math.floor(Math.random() * wrongs.length)];
      v.querySelector("#extra").innerHTML = `<div class="hint"><b>Hint</b>Option <b style="display:inline">${LETTERS[drop]}</b> is not correct — rule it out.</div>`;
    });
    v.querySelector("#nextBtn").addEventListener("click", () => { i++; if (i >= count) finish(); else render(); });
    v.querySelector("#quit").addEventListener("click", finish);
  }
  function finish() {
    noteServed([...served].map((id) => ({ id })));
    const pct = i ? Math.round((correctCount / i) * 100) : 0;
    v.innerHTML = `
      <div class="page-head"><h1>Adaptive practice complete</h1></div>
      <div class="result-hero">
        <div class="gauge" style="--gc:var(--primary);--val:${pct}"><div class="gauge-inner"><div class="pct">${pct}%</div><div class="lbl">${correctCount}/${i} correct</div></div></div>
      </div>
      <p style="text-align:center;color:var(--text-2)">You finished at difficulty level <b>${level}/5</b>.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:10px">
        <a class="btn btn-solid" href="/practice">New practice set</a>
        <a class="btn btn-outline" href="/progress">View progress</a>
        <a class="btn btn-outline" href="/">Home</a>
      </div>`;
    window.scrollTo({ top: 0 });
  }
  render();
}

// ============================================================================
// EXAM — config, timed runner, results
// ============================================================================
function viewExamConfig() {
  const v = el(`<div class="view"></div>`);
  const best = progress.exams.length ? Math.max(...progress.exams.map((e) => e.pct)) : null;
  const bestScaled = best === null ? null : scaledScore(best);
  v.innerHTML = `
    <div class="page-head"><h1>Mock Exam</h1><p class="lead">A full simulation of the ${esc(EXAM_NAME)} (${esc(EXAM_CODE)}): ${EXAM_LENGTH} questions weighted by the official domain percentages, a ${EXAM_MINUTES}-minute timer, and no feedback until you submit. Pass mark ${PASS_PERCENT}%. Tip: read each scenario twice, and between two defensible options pick the more production-grade one. <a href="/prep" style="color:var(--primary);font-weight:700">Full game plan →</a></p></div>
    <div class="grid grid-2">
      <div class="card">
        <h3>Exam rules</h3>
        <ul style="color:var(--text-2);font-size:14.5px;line-height:1.9;padding-left:18px">
          <li>${EXAM_LENGTH} questions · ${EXAM_MINUTES} minutes</li>
          <li>Domain-weighted: ${Object.values(DOMAINS).map((d) => d.weight + "%").join(" / ")}</li>
          <li>Flag questions and jump around with the navigator</li>
          <li>Auto-submits when the timer hits zero</li>
          <li>Full review with explanations afterward</li>
        </ul>
      </div>
      <div class="card">
        <h3>Your record</h3>
        <div class="statline" style="margin-bottom:18px">
          <div class="stat-card"><div class="n">${progress.exams.length}</div><div class="l">Exams taken</div></div>
          <div class="stat-card"><div class="n">${bestScaled === null ? "—" : bestScaled}</div><div class="l">Best score / 1000</div></div>
        </div>
        <button class="btn btn-solid" id="startExam">Begin ${EXAM_LENGTH}-question exam →</button>
        <button class="btn btn-outline btn-sm" id="quickExam" style="margin-left:8px">Quick 20-Q exam</button>
      </div>
    </div>`;
  app.appendChild(v);
  const startExam = (len, mins) => {
    const exam = buildExam(Date.now(), len, progress.recent);
    noteServed(exam);
    runExam(exam, mins);
  };
  v.querySelector("#startExam").addEventListener("click", () => startExam(EXAM_LENGTH, EXAM_MINUTES));
  v.querySelector("#quickExam").addEventListener("click", () => startExam(20, Math.round(EXAM_MINUTES * 20 / EXAM_LENGTH)));
}

function runExam(questions, minutes) {
  const answers = new Array(questions.length).fill(null);
  let i = 0;
  let remaining = minutes * 60;
  const v = el(`<div class="view"></div>`);
  app.innerHTML = ""; app.appendChild(v);

  const timer = setInterval(() => {
    remaining--;
    const t = v.querySelector("#timer");
    if (t) {
      t.textContent = mmss(remaining);
      t.classList.toggle("warn", remaining <= 600 && remaining > 120);
      t.classList.toggle("danger", remaining <= 120);
    }
    if (remaining <= 0) { clearInterval(timer); submit(); }
  }, 1000);
  const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function render() {
    const q = questions[i];
    v.innerHTML = `
      <div class="runner-top">
        <span class="crumb">Mock Exam · ${esc(EXAM_CODE)}</span>
        <div class="runner-meta">
          <span class="pill timer" id="timer">${mmss(remaining)}</span>
          <span class="pill">${answers.filter((a) => a !== null).length}/${questions.length} answered</span>
        </div>
      </div>
      <div class="exam-grid">
        <div class="exam-main">
          <div class="bigbar"><div style="width:${((i + 1) / questions.length) * 100}%"></div></div>
          <div class="qcard">
            <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">Q${i + 1}</span></div>
            ${q.scenario ? `<div class="q-scenario">${esc(q.scenario)}</div>` : ""}
            <div class="q-stem">${esc(q.question)}</div>
            <div class="options">${renderOptions(q, { selected: answers[i] })}</div>
            <div class="q-actions">
              <button class="btn btn-outline btn-sm" id="prev" ${i === 0 ? "disabled" : ""}>← Prev</button>
              <button class="linkbtn ${progress.flags[q.id] ? "flagged" : ""}" id="flag">${flagLabel(progress.flags[q.id])}</button>
              <span class="spacer"></span>
              <button class="btn btn-solid btn-sm" id="next">${i === questions.length - 1 ? "Review" : "Next →"}</button>
            </div>
          </div>
        </div>
        <aside class="navigator card">
          <div style="font-weight:800;font-size:14px">Navigator</div>
          <div class="nav-grid">${questions.map((_, idx) => `<button class="nav-cell ${answers[idx] !== null ? "answered" : ""} ${idx === i ? "current" : ""} ${progress.flags[questions[idx].id] ? "flagged" : ""}" data-go="${idx}">${idx + 1}</button>`).join("")}</div>
          <button class="btn btn-solid btn-sm" id="submit" style="width:100%">Submit exam</button>
          <button class="btn btn-outline btn-sm" id="abort" style="width:100%;margin-top:8px">Abandon</button>
        </aside>
      </div>`;

    v.querySelector(".options").addEventListener("click", (e) => {
      const b = e.target.closest("[data-opt]"); if (!b) return;
      answers[i] = Number(b.dataset.opt);
      v.querySelectorAll(".options .option").forEach((o, idx) => o.classList.toggle("selected", idx === answers[i]));
      v.querySelector(`[data-go="${i}"]`)?.classList.add("answered");
      v.querySelector(".runner-meta .pill:last-child").textContent = `${answers.filter((a) => a !== null).length}/${questions.length} answered`;
    });
    v.querySelector("#prev").addEventListener("click", () => { if (i > 0) { i--; render(); } });
    v.querySelector("#next").addEventListener("click", () => { if (i < questions.length - 1) { i++; render(); } else confirmSubmit(); });
    v.querySelector("#flag").addEventListener("click", (e) => {
      const id = q.id; if (progress.flags[id]) delete progress.flags[id]; else progress.flags[id] = true; saveProgress();
      e.currentTarget.classList.toggle("flagged"); e.currentTarget.innerHTML = flagLabel(progress.flags[id]);
      v.querySelector(`[data-go="${i}"]`)?.classList.toggle("flagged", !!progress.flags[id]);
    });
    v.querySelector(".nav-grid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]"); if (!b) return; i = Number(b.dataset.go); render();
    });
    v.querySelector("#submit").addEventListener("click", confirmSubmit);
    v.querySelector("#abort").addEventListener("click", () => { clearInterval(timer); navigate("/exam"); });
  }
  function confirmSubmit() {
    const unanswered = answers.filter((a) => a === null).length;
    if (unanswered && !confirm(`${unanswered} question(s) are unanswered. Submit anyway?`)) return;
    clearInterval(timer); submit();
  }
  function submit() {
    let correct = 0;
    const perDomain = {};
    Object.keys(DOMAINS).forEach((d) => (perDomain[d] = { total: 0, ok: 0 }));
    questions.forEach((q, idx) => {
      const ok = answers[idx] === q.correct;
      if (ok) correct++;
      perDomain[q.domain].total++; if (ok) perDomain[q.domain].ok++;
      // record into long-term progress too
      if (answers[idx] !== null) recordAnswer(q, ok);
    });
    const pct = Math.round((correct / questions.length) * 100);
    const pass = pct >= PASS_PERCENT;
    progress.exams.push({ date: Date.now(), pct, correct, total: questions.length, pass });
    saveProgress();
    showResults({ questions, answers, correct, pct, pass, perDomain });
  }
  render();
}

function showResults({ questions, answers, correct, pct, pass, perDomain }) {
  const v = el(`<div class="view"></div>`);
  app.innerHTML = ""; app.appendChild(v);
  const scaled = scaledScore((correct / questions.length) * 100);
  v.innerHTML = `
    <div class="result-hero">
      <div class="gauge" style="--gc:${pass ? "var(--success)" : "var(--error)"};--val:${pct}">
        <div class="gauge-inner"><div class="pct">${scaled}</div><div class="lbl">out of 1000</div></div>
      </div>
      <div class="verdict ${pass ? "pass" : "fail"}">${pass ? "PASS ✓" : "Keep studying"}</div>
      <p style="color:var(--text-2);margin-top:6px">Scaled 100–1000 · pass mark <b>720</b> · you scored <b>${scaled}</b> (${correct}/${questions.length}, ${pct}%). ${pass ? "You'd clear the CCA-F at this level." : `${720 - scaled} scaled points short of passing.`}</p>
    </div>
    <p class="section-title" style="margin-top:30px">Domain breakdown</p>
    <div class="breakdown card">
      ${Object.values(DOMAINS).map((d) => {
        const s = perDomain[d.id]; const p = s.total ? Math.round((s.ok / s.total) * 100) : 0;
        return `<div class="bd-row"><div class="bd-name">${esc(d.short)}</div>
          <div class="bd-bar progress-track"><div class="progress-fill" style="width:${p}%;background:${d.color}"></div></div>
          <div class="bd-val">${s.ok}/${s.total}</div></div>`;
      }).join("")}
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin:22px 0 30px">
      <a class="btn btn-solid" href="/exam">Take another exam</a>
      <button class="btn btn-outline" id="reviewToggle">Review all answers</button>
      <a class="btn btn-outline" href="/">Home</a>
    </div>
    <div id="review"></div>`;
  v.querySelector("#reviewToggle").addEventListener("click", () => {
    const r = v.querySelector("#review");
    if (r.innerHTML) { r.innerHTML = ""; return; }
    r.innerHTML = `<p class="section-title">Full review</p>` + questions.map((q, idx) => {
      const ok = answers[idx] === q.correct;
      return `<div class="browse-item">
        <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">${ok ? "✓ correct" : (answers[idx] === null ? "skipped" : "✕ wrong")}</span></div>
        ${q.scenario ? `<div class="q-scenario" style="margin-bottom:8px">${esc(q.scenario)}</div>` : ""}
        <div class="bq">${idx + 1}. ${esc(q.question)}</div>
        <div class="options">${renderOptions(q, { answered: true, selected: answers[idx], locked: true })}</div>
        <div class="expl">${esc(q.explanation)}</div>
      </div>`;
    }).join("");
  });
  window.scrollTo({ top: 0 });
}

// ============================================================================
// BROWSE / SEARCH
// ============================================================================
function viewBrowse(params) {
  const v = el(`<div class="view"></div>`);
  let domainFilter = params.get("d") ? Number(params.get("d")) : null;
  const qParam = params.get("q") || "";
  v.innerHTML = `
    <div class="page-head"><h1>Question Bank</h1><p class="lead">Search and browse all ${fmt(STATS.total)} questions. Every entry shows the correct answer and a full explanation — great for targeted revision.</p></div>
    <div class="searchbar">
      <input class="search-input" id="q" placeholder="Search scenarios, questions, keywords (e.g. stop_reason, MCP, caching)…" value="${esc(qParam)}" />
      <select class="search-input" id="domSel" style="flex:0 0 220px">
        <option value="">All domains</option>
        ${Object.values(DOMAINS).map((d) => `<option value="${d.id}" ${domainFilter === d.id ? "selected" : ""}>${esc(d.short)}</option>`).join("")}
      </select>
    </div>
    <div id="results"></div>`;
  app.appendChild(v);
  const input = v.querySelector("#q"), domSel = v.querySelector("#domSel"), results = v.querySelector("#results");
  function run() {
    const res = search(input.value, { domain: domSel.value ? Number(domSel.value) : null, limit: 80 });
    results.innerHTML = `<p class="section-title">${res.length >= 80 ? "Top 80" : res.length} result(s)</p>` + (res.length ? res.map(browseItem).join("") : `<div class="empty">No matches. Try a different keyword.</div>`);
  }
  let deb;
  input.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(run, 160); });
  domSel.addEventListener("change", run);
  run();
}
function browseItem(q) {
  return `<div class="browse-item">
    <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">${DIFFICULTY[q.difficulty]}</span><span class="tag tag-src">${q.src}</span></div>
    ${q.scenario ? `<div class="q-scenario" style="margin:6px 0 4px">${esc(q.scenario)}</div>` : ""}
    <div class="bq">${esc(q.question)}</div>
    <div class="ans">✓ ${esc(q.options[q.correct])}</div>
    <details><summary>Show explanation</summary><div class="expl">${esc(q.explanation)}</div></details>
  </div>`;
}

// ============================================================================
// PROGRESS
// ============================================================================
function viewProgress() {
  const v = el(`<div class="view"></div>`);
  const acc = progress.attempts ? Math.round((progress.correct / progress.attempts) * 100) : 0;
  const flagged = Object.keys(progress.flags);
  const due = drillDueCount();
  v.innerHTML = `
    <div class="page-head"><h1>Your Progress</h1><p class="lead">Saved in your browser. Track mastery per domain, revisit flagged questions, and watch your mock-exam scores climb.</p></div>
    ${due > 0 ? `<div class="card interactive review-card" id="goDrill"><span class="card-accent" style="background:var(--accent)"></span>
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <span class="mt-icon" style="--icon-fg:var(--accent);--icon-bg:color-mix(in srgb, var(--accent) 13%, transparent);width:38px;height:38px">${ICONS.refresh(18)}</span>
        <div style="flex:1;min-width:180px"><h3>${due} question${due === 1 ? "" : "s"} due for review</h3>
        <p style="color:var(--text-2);font-size:14px;margin-top:2px">Spaced-repetition Drill — timed to when you're about to forget them.</p></div>
        <span class="btn btn-outline btn-sm">Drill now →</span>
      </div></div>` : ""}
    <div class="statline">
      <div class="stat-card"><div class="n">${fmt(Object.keys(progress.answered).length)}</div><div class="l">Questions attempted</div></div>
      <div class="stat-card"><div class="n">${acc}%</div><div class="l">Lifetime accuracy</div></div>
      <div class="stat-card"><div class="n">${progress.bestStreak}</div><div class="l">Best streak</div></div>
      <div class="stat-card"><div class="n">${flagged.length}</div><div class="l">Flagged</div></div>
    </div>

    <p class="section-title" style="margin-top:32px">Domain mastery</p>
    <div class="breakdown card">
      ${Object.values(DOMAINS).map((d) => {
        const m = domainMastery(d.id);
        return `<div class="bd-row"><div class="bd-name">${esc(d.short)}</div>
          <div class="bd-bar progress-track"><div class="progress-fill" style="width:${m.seen ? Math.round(m.seen / m.total * 100) : 0}%;background:${d.color}"></div></div>
          <div class="bd-val">${m.seen ? m.acc + "%" : "—"}</div></div>`;
      }).join("")}
    </div>

    <p class="section-title" style="margin-top:32px">Mock-exam history</p>
    ${progress.exams.length ? `<div class="card">${progress.exams.slice().reverse().slice(0, 12).map((e) => `
      <div class="bd-row" style="padding:4px 0">
        <div class="bd-name">${new Date(e.date).toLocaleDateString()} · ${e.correct}/${e.total}</div>
        <div class="bd-bar progress-track"><div class="progress-fill" style="width:${e.pct}%;background:${e.pass ? "var(--success)" : "var(--error)"}"></div></div>
        <div class="bd-val" style="color:${e.pass ? "var(--success)" : "var(--error)"}">${scaledScore(e.pct)}</div>
      </div>`).join("")}</div>` : `<div class="empty">No mock exams yet. <a href="/exam" style="color:var(--primary);font-weight:700">Take one →</a></div>`}

    <p class="section-title" style="margin-top:32px">Badges</p>
    <div class="grid grid-2" id="badgeGrid"></div>

    ${flagged.length ? `<p class="section-title" style="margin-top:32px">Flagged for review (${flagged.length})</p>
      <div>${flagged.map(getById).filter(Boolean).slice(0, 50).map(browseItem).join("")}</div>` : ""}

    <div style="margin-top:30px"><button class="btn btn-outline btn-sm" id="reset">Reset all progress</button></div>`;
  app.appendChild(v);
  v.querySelector("#goDrill")?.addEventListener("click", () => navigate("/drill"));
  v.querySelector("#reset").addEventListener("click", () => {
    if (confirm("Erase all saved progress, flags and exam history?")) {
      progress = defaultProgress(); saveProgress(); toast("Progress reset"); router();
    }
  });
  renderBadges(v.querySelector("#badgeGrid"));
}

function renderBadges(grid) {
  const completedLessons = progress.completedLessons || {};
  const completedCount = Object.keys(completedLessons).length;
  const passes = progress.exams.filter((e) => e.pass);
  const bestPass = passes.length ? passes.reduce((a, b) => (scaledScore(b.pct) > scaledScore(a.pct) ? b : a)) : null;
  const curriculumDone = completedCount >= TOTAL_LESSONS;
  const curriculumDate = curriculumDone ? Math.max(...Object.values(completedLessons)) : null;

  const specs = [
    {
      id: "exam", earned: !!bestPass,
      unlockedNote: bestPass ? `Best passing score: ${scaledScore(bestPass.pct)}/1000` : "",
      lockedNote: "Pass a full mock exam (720+) to earn this",
      filename: "cca-f-mock-exam-badge.png",
      draw: bestPass && { theme: "violet", title: "CCA-F Mock Exam", subtitle: "Practice Certified", ribbon: `Passed · ${scaledScore(bestPass.pct)}/1000`, meta: `Earned ${new Date(bestPass.date).toLocaleDateString()}` }
    },
    {
      id: "curriculum", earned: curriculumDone,
      unlockedNote: `All ${TOTAL_LESSONS} lessons complete`,
      lockedNote: `${completedCount} / ${TOTAL_LESSONS} lessons complete`,
      filename: "cca-f-curriculum-badge.png",
      draw: curriculumDone && { theme: "emerald", title: "CCA-F Curriculum", subtitle: `${TOTAL_LESSONS} Lessons Complete`, ribbon: "Complete", meta: `Earned ${new Date(curriculumDate).toLocaleDateString()}` }
    }
  ];

  grid.innerHTML = specs.map((s) => `
    <div class="card badge-card ${s.earned ? "" : "locked"}">
      ${s.earned ? `<canvas id="badge-${s.id}"></canvas>` : `<div class="badge-placeholder">${ICONS.target(28)}</div>`}
      <p style="font-size:13.5px;color:var(--text-2);margin-top:4px">${s.earned ? s.unlockedNote : s.lockedNote}</p>
      ${s.earned ? `<button class="btn btn-outline btn-sm" data-dl="${s.id}">Download badge</button>` : ""}
    </div>`).join("");

  specs.filter((s) => s.earned).forEach((s) => {
    const canvas = grid.querySelector(`#badge-${s.id}`);
    drawBadge(canvas, s.draw);
  });
  grid.querySelectorAll("[data-dl]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = specs.find((x) => x.id === btn.dataset.dl);
      downloadBadge(grid.querySelector(`#badge-${s.id}`), s.filename);
    });
  });
}

// ============================================================================
// PREP — exam facts, strategy, mental models, resources (field-tested)
// ============================================================================
function link(href, label, note) {
  return `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>${note ? ` <span style="color:var(--text-3)">— ${esc(note)}</span>` : ""}</li>`;
}
function viewPrep() {
  const v = el(`<div class="view"></div>`);
  v.innerHTML = `
    <div class="page-head"><h1>How to pass the CCA-F</h1><p class="lead">A field-tested game plan. Short version: <strong>do as many scenario practice questions as you can</strong> — that's where the real prep happens. Treat docs as a reference for gaps a question exposes.</p></div>

    <div class="grid grid-2">
      <div class="card"><span class="card-accent" style="background:var(--primary)"></span>
        <h3>The exam at a glance</h3>
        <ul class="prep-list">
          <li><b>60 questions · 120 minutes</b>, Skilljar-proctored</li>
          <li>Scaled score <b>100–1,000</b>; pass mark <b>720</b></li>
          <li>~<b>301-level</b> — assumes ~6 months hands-on with the Claude API and Claude Code</li>
          <li>Every question is a <b>scenario</b>: you choose the best architectural call given the constraints, not recall API parameters</li>
        </ul>
      </div>
      <div class="card"><span class="card-accent" style="background:var(--accent)"></span>
        <h3>Where to spend your time</h3>
        <p style="color:var(--text-2);font-size:14.5px;margin-bottom:10px">Domain weighting matters more than breadth. If time-constrained, over-invest in the top two and you'll clear comfortably.</p>
        ${Object.values(DOMAINS).sort((a, b) => b.weight - a.weight).map((d) => `<div class="bd-row" style="padding:3px 0"><div class="bd-name" style="width:auto;flex:1">${esc(d.short)}</div><div class="bd-bar progress-track" style="max-width:120px"><div class="progress-fill" style="width:${d.weight * 3.7}%;background:${d.color}"></div></div><div class="bd-val">${d.weight}%</div></div>`).join("")}
      </div>
    </div>

    <p class="section-title" style="margin-top:30px">How to attack practice questions</p>
    <div class="card">
      <ul class="prep-list">
        <li>For every <b>wrong answer</b>, ask: <em>what production concern did the right answer protect that the wrong one didn't?</em> — latency · cost · observability · reliability · human-in-the-loop.</li>
        <li>Drill the ones you struggle with; <b>re-attempt after 48 hours</b> to internalize the reasoning pattern. (Use <a href="/practice">Review my mistakes</a>.)</li>
        <li>Watch for <b>“best” vs “correct.”</b> Several options are usually defensible; one is the cleanest fit.</li>
      </ul>
    </div>

    <p class="section-title" style="margin-top:30px">Mental models worth internalizing</p>
    <div class="grid grid-2">
      ${prepCard("The agentic loop", "Send request → inspect <code>stop_reason</code> (tool_use vs end_turn) → execute tools → return results for the next iteration.")}
      ${prepCard("Orchestration patterns", "Know when to pick each: <b>prompt chaining</b>, <b>routing</b>, <b>parallelization</b>, <b>orchestrator-workers</b>, <b>evaluator-optimizer</b>. (From Anthropic's “Building effective agents.”)")}
      ${prepCard("Tool design quality", "Parameter design, structured output, confirmation flows, and error handling — transient vs permanent vs uncertain state.")}
      ${prepCard("Context vs prompt engineering", "The exam treats these as distinct disciplines: managing what's in the window vs how you ask.")}
      ${prepCard("Human-in-the-loop", "When to escalate to a human vs let the agent continue — confidence, reversibility, and policy scope.")}
      ${prepCard("Exam-day tactics", "Read the scenario twice before the options — the answer usually pivots on one constraint. Stuck between two? Pick the more production-grade one.")}
    </div>

    <p class="section-title" style="margin-top:30px">Resources (community-sourced, in priority order)</p>
    <div class="card">
      <ul class="prep-list">
        ${link("https://www.udemy.com/course/claude-certified-architect-foundations-cca-f-practice-exams/", "Udemy — CCA-F Practice Exams", "paid; field-tested as genuinely good")}
        ${link("https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request", "Claude itself — feed it the official Exam Guide and have it drill you", "highest-leverage on-the-go prep")}
        ${link("https://www.certsafari.com/anthropic/claude-certified-architect", "CertSafari — 625 free questions", "free; runs easier than the real exam — use for coverage, not as a readiness signal")}
        ${link("https://claudecertifications.com", "claudecertifications.com — 25 scenarios + 12-week plan", "free")}
      </ul>
      <p class="section-title" style="margin:18px 0 8px">Official material (use sparingly, as reference)</p>
      <ul class="prep-list">
        ${link("https://anthropic.skilljar.com", "Anthropic Academy", "Building with the Claude API · Intro to MCP · MCP Advanced · Subagents · Claude Code in Action · Agent Skills")}
        ${link("https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request", "Exam access request (Skilljar)")}
        ${link("https://modelcontextprotocol.io", "MCP specification", "short — read end to end")}
        ${link("https://www.anthropic.com/research/building-effective-agents", "“Building effective agents” (Anthropic)", "source for the orchestration patterns the exam tests")}
      </ul>
      <p style="color:var(--text-3);font-size:12.5px;margin-top:14px">Realistic timeline: ~2–3 weeks at ~1 hr/day, mostly on practice questions (4 weeks to feel comfortable rather than just pass). Links are community-sourced and not endorsements; this portal is an unofficial study aid.</p>
    </div>

    <p class="section-title" style="margin-top:30px">Frequently asked questions</p>
    <div class="card">${FAQ_ITEMS.map(([q, a]) => `<div style="margin-bottom:16px"><h3 style="font-size:15px">${esc(q)}</h3><p style="color:var(--text-2);font-size:14px;line-height:1.6;margin-top:4px">${esc(a)}</p></div>`).join("")}</div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px">
      <a class="btn btn-solid" href="/exam">Take a mock exam →</a>
      <a class="btn btn-outline" href="/diagnostic">Take the diagnostic first</a>
      <a class="btn btn-outline" href="/practice">Practice scenarios</a>
    </div>`;
  app.appendChild(v);
}
function prepCard(title, body) {
  return `<div class="card"><h3>${esc(title)}</h3><p style="color:var(--text-2);font-size:14px;line-height:1.6">${body}</p></div>`;
}

// ============================================================================
// DIAGNOSTIC — 25-question placement test (5/domain, untimed) → study order
// ============================================================================
function viewDiagnosticConfig() {
  const v = el(`<div class="view"></div>`);
  v.innerHTML = `
    <div class="page-head"><h1>Diagnostic</h1><p class="lead">A 25-question placement test — 5 per domain, no timer — before you start studying. Answer honestly, not fast; the point is to find your weak domains, not to score well. You'll get a per-domain breakdown and a recommended study order, weakest first.</p></div>
    <div class="card">
      <ul class="prep-list">
        <li><b>25 questions</b> — 5 from each of the 5 domains, mixed recall / apply / scenario</li>
        <li><b>No timer.</b> No hints during the test — this is a baseline read, not practice.</li>
        <li>Results also count toward your saved progress and domain mastery.</li>
        <li>Retake it anytime to check how your weak spots have moved.</li>
      </ul>
      <div style="margin-top:18px"><button class="btn btn-solid" id="startDiag">Start diagnostic →</button></div>
    </div>`;
  app.appendChild(v);
  v.querySelector("#startDiag").addEventListener("click", () => runDiagnostic(buildDiagnostic(Date.now())));
}
function runDiagnostic(questions) {
  let i = 0, answered = false, selected = null;
  const answers = new Array(questions.length).fill(null);
  const v = el(`<div class="view"></div>`);
  app.innerHTML = ""; app.appendChild(v);

  function render() {
    const q = questions[i]; answered = false; selected = null;
    v.innerHTML = `
      <div class="runner-top">
        <span class="crumb">Diagnostic</span>
        <div class="runner-meta"><span class="pill">${i + 1} / ${questions.length}</span></div>
      </div>
      <div class="bigbar"><div style="width:${(i / questions.length) * 100}%"></div></div>
      <div class="qcard">
        <div class="q-tags">${domainTag(q.domain)}<span class="tag tag-diff">${DIFFICULTY[q.difficulty]}</span></div>
        ${q.scenario ? `<div class="q-scenario">${esc(q.scenario)}</div>` : ""}
        <div class="q-stem">${esc(q.question)}</div>
        <div class="options">${renderOptions(q, { selected })}</div>
        <div class="q-actions"><span class="spacer"></span>
          <button class="btn btn-solid" id="nextBtn" disabled>${i === questions.length - 1 ? "See results" : "Next →"}</button>
        </div>
      </div>`;
    v.querySelector(".options").addEventListener("click", (e) => {
      const b = e.target.closest("[data-opt]"); if (!b || answered) return;
      selected = Number(b.dataset.opt); answered = true; answers[i] = selected;
      recordAnswer(q, selected === q.correct);
      v.querySelector(".options").innerHTML = renderOptions(q, { answered: true, selected, locked: true });
      v.querySelector("#nextBtn").disabled = false;
    });
    v.querySelector("#nextBtn").addEventListener("click", () => { if (i < questions.length - 1) { i++; render(); } else finish(); });
  }
  function finish() {
    const perDomain = {};
    Object.keys(DOMAINS).forEach((d) => (perDomain[d] = { total: 0, ok: 0 }));
    questions.forEach((q, idx) => { perDomain[q.domain].total++; if (answers[idx] === q.correct) perDomain[q.domain].ok++; });
    const order = Object.values(DOMAINS)
      .map((d) => ({ d, pct: perDomain[d.id].total ? Math.round((perDomain[d.id].ok / perDomain[d.id].total) * 100) : 0 }))
      .sort((a, b) => a.pct - b.pct || b.d.weight - a.d.weight);
    const overall = Math.round((Object.values(perDomain).reduce((s, x) => s + x.ok, 0) / questions.length) * 100);
    v.innerHTML = `
      <div class="page-head"><h1>Your diagnostic results</h1><p class="lead">${overall}% overall on this baseline read. Study order below is weakest domain first, ties broken toward the higher-weighted domain — that's where fixing gaps pays off most on exam day.</p></div>
      <p class="section-title">Recommended study order</p>
      <div class="breakdown card">
        ${order.map(({ d, pct }, idx) => `<div class="bd-row">
          <div class="bd-name">${idx + 1}. ${esc(d.short)} <span style="color:var(--text-3);font-weight:600">(${d.weight}% of exam)</span></div>
          <div class="bd-bar progress-track"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
          <div class="bd-val">${pct}%</div></div>`).join("")}
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
        <a class="btn btn-solid" href="/practice?d=${order[0].d.id}">Study ${esc(order[0].d.short)} first →</a>
        <a class="btn btn-outline" href="/diagnostic">Retake diagnostic</a>
        <a class="btn btn-outline" href="/progress">View full progress</a>
      </div>`;
    window.scrollTo({ top: 0 });
  }
  render();
}

// ============================================================================
// DRILL — spaced-repetition review of questions you've already answered
// ============================================================================
function fmtWhen(ts) {
  const days = Math.ceil((ts - Date.now()) / 86400000);
  if (days <= 0) return "now";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  return new Date(ts).toLocaleDateString();
}
function viewDrillConfig() {
  const state = { domains: [] };
  const v = el(`<div class="view"></div>`);
  const total = Object.keys(progress.srs).length;

  function render() {
    const due = drillDueCount(state.domains);
    const next = nextDrillDue(state.domains);
    v.innerHTML = `
      <div class="page-head"><h1>Drill</h1><p class="lead">Spaced repetition over questions you've already answered — practice, exam, and diagnostic all feed this queue. Answer right and an item comes back in longer gaps; miss it and it resets to due tomorrow, so your review time goes where you're actually forgetting.</p></div>
      <div class="card">
        <div class="field"><label>Domains <span style="color:var(--text-3);font-weight:500">(none = all)</span></label>
          <div class="chips" id="domChips">
            ${Object.values(DOMAINS).map((d) => `<button class="chip ${state.domains.includes(d.id) ? "on" : ""}" data-d="${d.id}"><span class="dot" style="background:${d.color}"></span>${esc(d.short)}</button>`).join("")}
          </div>
        </div>
        ${total === 0
          ? `<div class="empty" style="padding:30px 0">You haven't answered any questions yet — Drill reviews questions you've already seen. <a href="/practice" style="color:var(--primary);font-weight:700">Practice a set first →</a></div>`
          : due > 0
            ? `<div style="margin-top:18px"><button class="btn btn-solid" id="startDrill">Drill ${due} due question${due === 1 ? "" : "s"} →</button></div>`
            : `<div class="empty" style="padding:30px 0">Nothing due right now — you're caught up.${next ? ` Next review ${fmtWhen(next)}.` : ""} <a href="/practice" style="color:var(--primary);font-weight:700">Practice more →</a></div>`}
      </div>`;
    v.querySelector("#domChips").addEventListener("click", (e) => {
      const b = e.target.closest("[data-d]"); if (!b) return;
      const id = Number(b.dataset.d);
      state.domains = state.domains.includes(id) ? state.domains.filter((x) => x !== id) : [...state.domains, id];
      render();
    });
    v.querySelector("#startDrill")?.addEventListener("click", () => runPractice(buildDrillQueue(state.domains.length ? state.domains : null, 30)));
  }
  render();
  app.appendChild(v);
}
