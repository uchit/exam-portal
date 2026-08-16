#!/usr/bin/env node
// Generates static HTML shells for every real (non-hash) route so each page
// has its own crawlable URL, unique <title>/<meta description>, and — for
// content pages — real prose baked directly into the HTML (no JS required).
// Run manually: `node scripts/build-pages.mjs`. Not part of the Vercel build
// (the site stays a zero-build static deploy); this just authors files.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { CERTS } from "../js/certs.js";
import { ICONS } from "../js/icons.js";
import { LESSONS as LESSONS_1 } from "../content/lessons-1.mjs";
import { LESSONS as LESSONS_2 } from "../content/lessons-2.mjs";
import { LESSONS as LESSONS_3 } from "../content/lessons-3.mjs";
import { LESSONS as LESSONS_4 } from "../content/lessons-4.mjs";
import { LESSONS as LESSONS_5 } from "../content/lessons-5.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://thatclaude.com";
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const BUILD_DATE_DISPLAY = new Date(`${BUILD_DATE}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const LESSONS_BY_DOMAIN = { 1: LESSONS_1, 2: LESSONS_2, 3: LESSONS_3, 4: LESSONS_4, 5: LESSONS_5 };

// ---------------------------------------------------------------- chrome ---
const HEAD_ICON = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%235B4FE0'/%3E%3Ctext x='50' y='69' font-size='56' text-anchor='middle' fill='white' font-family='-apple-system,sans-serif' font-weight='700'%3EC%3C/text%3E%3C/svg%3E" />`;
const SITE_NAME = "Claude Cert Prep";
const OG_IMAGE = `${SITE}/og-image.svg`;
const AUTHOR = { "@type": "Person", name: "Uchit Vyas", url: "https://hellouchit.com" };

const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Emits one <script type="application/ld+json"> per call; pass an array to
// combine multiple schema.org types on one page via @graph.
function ldJson(items) {
  const arr = Array.isArray(items) ? items : [items];
  if (!arr.length) return "";
  const body = arr.length === 1
    ? { "@context": "https://schema.org", ...arr[0] }
    : { "@context": "https://schema.org", "@graph": arr };
  return `<script type="application/ld+json">${JSON.stringify(body)}</script>`;
}
// Standard breadcrumb trail for nested pages — name/path pairs, home implied.
function breadcrumbLd(trail) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE}${it.path === "/" ? "" : it.path}`
    }))
  };
}

function head(title, description, path, { ogType = "website", jsonLd = null } = {}) {
  const canonical = `${SITE}${path === "/" ? "" : path}`;
  const t = escAttr(title), d = escAttr(description);
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="Uchit Vyas" />
  <meta name="theme-color" content="#121214" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/app.css" />
  ${HEAD_ICON}
  <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} Blog" href="/blog/feed.xml" />
  ${jsonLd ? ldJson(jsonLd) : ""}
</head>`;
}

function header(active) {
  const items = [
    ["/", "home", "Home"],
    ["/practice", "practice", "Practice"],
    ["/exam", "exam", "Mock Exam"],
    ["/browse", "browse", "Bank"],
    ["/prep", "prep", "How to Pass"],
    ["/progress", "progress", "Progress"]
  ];
  return `  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="/" aria-label="Home">
        <span class="brand-mark">C</span>
        <span class="brand-text">
          <strong>Claude Cert Prep</strong>
          <span class="brand-sub">CCA-F · Architect</span>
        </span>
      </a>
      <nav class="topnav" aria-label="Primary">
        ${items.map(([href, key, label]) => `<a href="${href}" data-nav="${key}"${key === active ? ' class="active"' : ""}>${label}</a>`).join("\n        ")}
      </nav>
      <div class="topbar-actions">
        <span class="bank-chip" id="bankChip" title="Total questions in the bank">…</span>
        <button class="icon-btn" id="themeToggle" aria-label="Toggle theme" title="Toggle light/dark">
          <span class="theme-icon"></span>
        </button>
      </div>
    </div>
  </header>`;
}

const FOOTER = `  <footer class="footer">
    <div class="footer-inner">
      <span>Unofficial study aid · Not affiliated with Anthropic.</span>
      <nav class="footer-nav" aria-label="More">
        <a href="/learn">Curriculum</a>
        <a href="/glossary">Glossary</a>
        <a href="/reference">Quick Reference</a>
        <a href="/blog">Blog</a>
        <a href="/certifications">Certifications</a>
        <a href="/resources">Resources</a>
        <a href="/about">About</a>
        <a href="/changelog">Changelog</a>
      </nav>
      <span>Blueprint mirrors the Claude Certified Architect — Foundations (CCA-F).</span>
      <span>Developed by <a href="https://hellouchit.com" target="_blank" rel="noopener noreferrer">Uchit Vyas</a></span>
    </div>
  </footer>

  <nav class="bottomnav" aria-label="Primary mobile">
    <a href="/" data-nav="home"><span class="bn-ico">${ICONS.home(20)}</span><span>Home</span></a>
    <a href="/practice" data-nav="practice"><span class="bn-ico">${ICONS.bolt(20)}</span><span>Practice</span></a>
    <a href="/exam" data-nav="exam"><span class="bn-ico">${ICONS.timer(20)}</span><span>Exam</span></a>
    <a href="/browse" data-nav="browse"><span class="bn-ico">${ICONS.book(20)}</span><span>Bank</span></a>
    <a href="/prep" data-nav="prep"><span class="bn-ico">${ICONS.cap(20)}</span><span>Pass</span></a>
    <a href="/progress" data-nav="progress"><span class="bn-ico">${ICONS.chart(20)}</span><span>Stats</span></a>
  </nav>

  <script type="module" src="/js/app.js"></script>
</body>
</html>
`;

// A "static" page: real content lives in #app; app.js's router leaves it
// alone because the path isn't a registered SPA route.
function staticPage({ title, description, path, active, bodyHtml, ogType, jsonLd }) {
  return `${head(title, description, path, { ogType, jsonLd })}
<body>
  <a class="skip-link" href="#app">Skip to content</a>
${header(active)}
  <main id="app" class="app" tabindex="-1">
${bodyHtml}
  </main>
${FOOTER}`;
}

// An "app" page: JS renders the real view on load; ships a real static <h1>
// (matching what JS renders once mounted) plus intro text for crawlers/no-js,
// then the same boot placeholder as index.html.
function appPage({ h1, title, description, path, active, intro, jsonLd }) {
  return staticPage({
    title, description, path, active, jsonLd,
    bodyHtml: `    <div class="page-head" style="margin-bottom:0"><h1>${h1}</h1></div>
    <noscript><p class="lead" style="padding:12px 0 24px">${intro}</p></noscript>
    <div class="boot">${intro}<br />Loading…</div>`
  });
}

function write(relPath, html) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  console.log("wrote", relPath);
}

// Interactive "Try it" exercises — real client-side tools, not just a text
// prompt. Attached to exactly one flagship lesson per pattern (not every
// lesson, to avoid clutter). Reuse existing .qcard/.options/.card styles so
// they read as part of the site, not a bolted-on widget.
const STOP_REASON_WIDGET = `
    <div class="qcard" id="srTrainer" style="margin-top:24px">
      <div class="q-tags"><span class="tag tag-src">Interactive</span></div>
      <div class="q-scenario" id="srResponse"></div>
      <div class="q-stem" style="font-size:17px">What should the client do next?</div>
      <div class="options" id="srOptions"></div>
      <div id="srExtra"></div>
      <div class="q-actions"><span class="spacer"></span><button class="btn btn-solid" id="srNext">Next scenario →</button></div>
    </div>
    <script>
    (function(){
      var SCENARIOS = [
        {sr:"tool_use", note:"Claude requests a tool call.", correct:0, exp:"stop_reason is tool_use, so the client must execute the requested tool(s) and send tool_result blocks back as the next turn \\u2014 the loop is not done."},
        {sr:"end_turn", note:"Claude has no more tool calls pending.", correct:1, exp:"end_turn means the model considers its response complete. Hand control back to the user \\u2014 there is nothing left to execute."},
        {sr:"max_tokens", note:"Generation was cut off mid-thought by the token limit.", correct:2, exp:"max_tokens means the response was truncated, not finished. The fix is to raise the token budget and continue, not to treat the partial output as done."},
        {sr:"stop_sequence", note:"Generation hit a configured custom stop string.", correct:3, exp:"stop_sequence means a stop string you configured was matched on purpose \\u2014 the output up to that point is the final, complete response."}
      ];
      var ACTIONS = [
        "Execute the requested tool(s), then send the results back as the next turn",
        "Loop is done \\u2014 hand control back to the user",
        "Raise max_tokens and re-send to get the complete response",
        "The stop sequence matched on purpose \\u2014 treat this output as final"
      ];
      var last = -1, LETTERS = ["A","B","C","D"];
      var respEl = document.getElementById("srResponse"), optsEl = document.getElementById("srOptions");
      var extraEl = document.getElementById("srExtra"), nextBtn = document.getElementById("srNext");
      function render(){
        var idx;
        do { idx = Math.floor(Math.random()*SCENARIOS.length); } while (idx===last && SCENARIOS.length>1);
        last = idx;
        var s = SCENARIOS[idx];
        respEl.innerHTML = "<code>stop_reason: \\"" + s.sr + "\\"</code> \\u2014 " + s.note;
        extraEl.innerHTML = "";
        nextBtn.disabled = true;
        optsEl.innerHTML = ACTIONS.map(function(a,i){
          return "<button class=\\"option\\" data-i=\\"" + i + "\\"><span class=\\"letter\\">" + LETTERS[i] + "</span><span>" + a + "</span></button>";
        }).join("");
        var answered = false;
        Array.prototype.forEach.call(optsEl.querySelectorAll(".option"), function(btn){
          btn.addEventListener("click", function(){
            if (answered) return;
            answered = true;
            var chosen = Number(btn.dataset.i);
            Array.prototype.forEach.call(optsEl.querySelectorAll(".option"), function(b2,i2){
              b2.classList.add("locked");
              if (i2===s.correct) b2.classList.add("correct");
              else if (i2===chosen) b2.classList.add("wrong");
            });
            var ok = chosen === s.correct;
            extraEl.innerHTML = "<div class=\\"explanation\\"><b>" + (ok?"Correct \\u2713":"Not quite \\u2715") + " \\u00b7 why</b>" + s.exp + "</div>";
            nextBtn.disabled = false;
          });
        });
      }
      nextBtn.addEventListener("click", render);
      render();
    })();
    </script>`;

const SCHEMA_LINTER_WIDGET = `
    <div class="card" id="schemaLinter" style="margin-top:24px">
      <h3>Try it: Tool Schema Linter</h3>
      <p style="color:var(--text-2);font-size:14px;margin-bottom:12px">Edit the schema and check it against the same criteria the exam tests. Nothing leaves your browser.</p>
      <textarea id="schemaInput" spellcheck="false" style="width:100%;min-height:220px;font-family:'JetBrains Mono',monospace;font-size:13px;padding:14px;border-radius:12px;border:1px solid var(--border);background:var(--code-bg);color:var(--text);resize:vertical"></textarea>
      <div style="margin-top:12px"><button class="btn btn-solid" id="schemaCheck">Check schema</button></div>
      <div id="schemaResults" style="margin-top:16px"></div>
    </div>
    <script>
    (function(){
      var SAMPLE = { name: "doStuff", description: "does stuff", input_schema: { type: "object", properties: { input: { type: "string" } } } };
      var ta = document.getElementById("schemaInput");
      ta.value = JSON.stringify(SAMPLE, null, 2);
      var out = document.getElementById("schemaResults");
      function check(){
        var checks = [], schema;
        try { schema = JSON.parse(ta.value); }
        catch(e){ out.innerHTML = "<div class=\\"hint\\"><b>Invalid JSON</b>" + e.message + "</div>"; return; }
        function push(ok, label){ checks.push({ok:ok, label:label}); }
        push(!!schema.name && /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/.test(schema.name), "name is present and matches a valid tool-name pattern");
        push(!!schema.description && schema.description.trim().length >= 20, "description is at least 20 characters \\u2014 vague one-liners are a common exam trap");
        var inputSchema = schema.input_schema || schema.parameters;
        push(!!inputSchema && inputSchema.type === "object", "input_schema.type is \\"object\\"");
        var props = inputSchema && inputSchema.properties;
        var propKeys = props ? Object.keys(props) : [];
        push(propKeys.length > 0, "input_schema.properties has at least one parameter");
        var allDescribed = propKeys.length > 0 && propKeys.every(function(k){ return props[k] && typeof props[k].description === "string" && props[k].description.length > 0; });
        push(allDescribed, "every property has its own description");
        var req = inputSchema && inputSchema.required;
        push(!req || (Array.isArray(req) && req.every(function(r){ return propKeys.indexOf(r) !== -1; })), "required (if present) only lists real properties");
        var passed = checks.filter(function(c){return c.ok;}).length;
        out.innerHTML = "<p style=\\"font-weight:700;margin-bottom:8px\\">" + passed + " / " + checks.length + " checks passed</p>" + checks.map(function(c){
          return "<div style=\\"display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border)\\"><span style=\\"color:" + (c.ok?"var(--success)":"var(--error)") + ";font-weight:800;flex:none\\">" + (c.ok?"\\u2713":"\\u2715") + "</span><span style=\\"font-size:14px;color:var(--text-2)\\">" + c.label + "</span></div>";
        }).join("");
      }
      document.getElementById("schemaCheck").addEventListener("click", check);
      check();
    })();
    </script>`;

// FAQ — used for /prep's FAQPage structured data. Keep in sync with the
// matching visible FAQ block rendered by viewPrep() in js/app.js.
const FAQ_ITEMS = [
  ["Is Claude Cert Prep free?", "Yes. Every practice mode, the full mock exam, the diagnostic, drill, curriculum, glossary, and quick reference are free with no account or sign-up required."],
  ["How long does it take to prepare for the CCA-F exam?", "Most people need about two to three weeks at roughly one hour a day, mostly spent on practice questions rather than reading — assuming around six months of hands-on Claude API or Claude Code experience going in."],
  ["Is this an official Anthropic study resource?", "No. Claude Cert Prep is an independent, unofficial study aid. It is not affiliated with, endorsed by, or sponsored by Anthropic."],
  ["What's the CCA-F exam format?", "60 scenario-based questions in 120 minutes, scored on a scaled 100-1000 range with a pass mark of 720, weighted across five domains."],
  ["Do I need an account to track my progress?", "No. Progress, flags, and mock-exam history are saved locally in your browser — nothing is sent to a server, and there's no login."]
];

// ============================================================================
// DOMAIN CONTENT — mirrors js/blueprint.js
// ============================================================================
const DOMAINS = [
  { id: 1, slug: "1-agentic-architecture", name: "Agentic Architecture & Orchestration", short: "Agentic Architecture", weight: 27, color: "#6C5CE0" },
  { id: 2, slug: "2-tool-design-mcp", name: "Tool Design & MCP Integration", short: "Tools & MCP", weight: 18, color: "#1AA6B7" },
  { id: 3, slug: "3-claude-code-config", name: "Claude Code Configuration & Workflows", short: "Claude Code", weight: 20, color: "#1F9D6B" },
  { id: 4, slug: "4-prompt-engineering", name: "Prompt Engineering & Structured Output", short: "Prompt Engineering", weight: 20, color: "#C6841E" },
  { id: 5, slug: "5-context-management", name: "Context Management & Reliability", short: "Context & Reliability", weight: 15, color: "#C4453B" }
];

const GLOSSARY = {
  1: [
    ["Agentic loop", "The model calls a tool, the client executes it and returns the result, and the cycle repeats until the model stops requesting tools.", "The only correct termination signal is <code>stop_reason</code> — not parsing the assistant's text for phrases like \"I'm done.\""],
    ["stop_reason", "The Messages API field explaining why generation stopped: <code>end_turn</code>, <code>tool_use</code>, <code>max_tokens</code>, or <code>stop_sequence</code>.", "Exam questions test whether you branch loop control on this field or on something fragile like text content."],
    ["Orchestrator-workers", "A lead agent decomposes a task, dispatches subtasks to worker subagents, then synthesizes their results into one output.", "Pick this pattern when subtasks aren't fully predictable in advance and need dynamic decomposition."],
    ["Hub-and-spoke topology", "Subagents report only to the orchestrator and never communicate with each other directly.", "A distractor answer that has subagents messaging each other peer-to-peer is always wrong for this exam's model."],
    ["Prompt chaining", "A fixed sequence of LLM calls where each step's output feeds directly into the next step's input.", "Correct when a task decomposes cleanly into ordered subtasks — not when subtasks are independent (that's parallelization)."],
    ["Routing", "Classify the input first, then send it down one of several specialized prompt or model paths.", "Use when inputs fall into distinct categories that genuinely need different handling, not just different phrasing."],
    ["Parallelization", "Run independent subtasks concurrently (sectioning) or run the same task multiple times for consensus (voting).", "Sectioning splits work; voting improves confidence on a single judgment call — know which the scenario calls for."],
    ["Evaluator-optimizer", "One call generates a response, a second evaluates it against explicit criteria and returns feedback for revision, looped until it passes.", "Exam scenarios use this when quality criteria are clear but generation quality alone isn't reliable enough."],
    ["Context isolation", "Giving each subagent only the context it needs for its scoped task, not the orchestrator's full history.", "Protects both token cost and focus — a subagent drowning in irrelevant context is a common exam anti-pattern."],
    ["Subagent invocation", "The parent spins up a subagent with a scoped prompt and toolset; it returns a final result, not a full transcript.", "Watch for options that have the orchestrator forwarding raw subagent transcripts back into its own context — usually wrong."]
  ],
  2: [
    ["Tool schema", "The JSON Schema describing a tool's name, description, and input parameters that the model uses to decide when and how to call it.", "A vague tool description is a bigger source of exam-tested failures than a vague tool name."],
    ["tool_use block", "The content block the model emits when it wants to call a tool: includes the tool name, a unique id, and structured input.", "Distinguish from <code>tool_result</code>, which is what the client sends back, not what the model sends."],
    ["tool_result block", "The message the client returns containing a tool's output, matched to a <code>tool_use</code> id, optionally flagged <code>is_error</code>.", "Returning raw stack traces instead of a structured, actionable error is a textbook wrong answer."],
    ["Model Context Protocol (MCP)", "An open protocol standardizing how AI applications connect to external tools, data sources, and prompt templates.", "Know the vocabulary precisely — MCP is tested on terminology, not just concept recognition."],
    ["MCP server / client / host", "A server exposes tools, resources, and prompts; a client keeps a 1:1 connection to one server; a host is the application coordinating multiple clients.", "Claude Code is a host; each MCP server it connects to gets its own client connection."],
    ["MCP primitives", "Tools (model-invoked actions), Resources (contextual data the app can read), and Prompts (reusable templates) exposed by a server.", "The exam distinguishes these by who invokes them: the model invokes tools; the user or app invokes resources and prompts."],
    ["Transport", "How an MCP client and server communicate — stdio for a local subprocess, or Streamable HTTP for a remote server.", "Local, trusted integrations lean stdio; remote or shared servers need HTTP with its own auth story."],
    ["Structured error responses", "Returning <code>is_error: true</code> with a clear, actionable message in a tool result so the model can self-correct.", "The exam rewards designs where a failed tool call gives the model enough signal to retry correctly, not just fail."],
    ["Tool distribution choice", "Deciding whether a capability should be a built-in tool, an MCP server, or a slash command/skill — driven by who needs it and how often it changes.", "A capability only one project needs rarely justifies a standalone MCP server over a project-local skill."],
    ["Built-in tools", "First-party tools like Bash, the text editor, and web search/fetch, usable without standing up an MCP server.", "Reach for a built-in tool before building custom infrastructure that duplicates one."]
  ],
  3: [
    ["CLAUDE.md", "A memory file automatically pulled into context documenting project conventions, commands, and constraints.", "Multiple CLAUDE.md files can exist at different scopes and are all included — none of them get silently dropped."],
    ["CLAUDE.md hierarchy", "Enterprise, user, project, and local CLAUDE.md files are merged together, with more specific scopes layered on top of general ones.", "A common wrong answer assumes the most specific file replaces the others — it's additive, not a full override."],
    ["settings.json", "Project- or user-level configuration for permissions, hooks, environment variables, and other Claude Code behavior.", "Know which settings are safe to check into a repo (project-shared) versus which belong in a local, git-ignored file."],
    ["Permissions", "Allow / deny / ask rules controlling which tools and commands Claude Code can run without prompting the user.", "Scenario questions test picking the narrowest permission that still lets the workflow function."],
    ["Slash command", "A reusable, user-invoked prompt template stored as a Markdown file and triggered explicitly with <code>/name</code>.", "The user has to type it — contrast with a skill, which Claude can invoke on its own judgment."],
    ["Skill", "A packaged, discoverable capability — instructions plus optional scripts — that Claude can invoke autonomously when it judges it relevant.", "If a scenario needs Claude to decide when to use it, that rules out a slash command as the right mechanism."],
    ["Hook", "A shell command that fires automatically on a lifecycle event (e.g. PreToolUse, PostToolUse, Stop) to enforce policy deterministically.", "Hooks exist specifically because prompted instructions ('please always run tests first') aren't reliably deterministic."],
    ["Plan mode", "A read-only mode where Claude researches and proposes an approach before any file is edited, requiring explicit approval to proceed.", "Correct answer for scenarios needing human sign-off before risky or hard-to-reverse changes."],
    ["Subagents (Claude Code)", "Separately configured agents with their own system prompt and tool access, delegated a scoped piece of work by the main agent.", "Distinguish product-level Claude Code subagents from the general agentic-architecture subagent pattern in Domain 1 — related, not identical."],
    ["CI/CD integration", "Running Claude Code non-interactively (headless mode) inside a pipeline, e.g. for automated review or fix-and-PR workflows.", "Headless runs still need explicit permission configuration — they don't get an interactive prompt to fall back on."]
  ],
  4: [
    ["System prompt", "The top-level instruction set establishing role, constraints, and behavior for the whole conversation.", "Distinct from a per-turn user message — the exam tests knowing which behaviors belong in which layer."],
    ["XML structuring", "Wrapping distinct prompt components — instructions, context, examples — in XML-like tags so the model reliably tells them apart.", "Especially valuable for long prompts mixing several kinds of content in one request."],
    ["Few-shot prompting", "Including 2–5 worked examples in the prompt to show the exact input/output pattern wanted.", "More reliable than instructions alone when the desired output format is precise and easy to demonstrate but hard to describe."],
    ["Chain-of-thought", "Asking the model to reason step by step before answering, improving accuracy on multi-step problems at the cost of latency and tokens.", "Not free — the exam expects you to reserve it for genuinely multi-step reasoning, not simple lookups."],
    ["Prefill", "Seeding the start of the assistant's response to force a format — e.g. starting with <code>{</code> to guarantee JSON — or skip preamble.", "A fast, cheap way to eliminate an entire class of formatting failures without extra validation logic."],
    ["Structured output", "Constraining the model's response to a defined schema so downstream code can parse it reliably.", "The exam distinguishes 'ask nicely for JSON' from actually constraining and validating the output."],
    ["Validation/retry loop", "Programmatically validating a structured response against its schema and re-prompting with the specific error on failure.", "The retry prompt must include what specifically failed — a bare 'try again' rarely fixes the same mistake twice."],
    ["Batch processing", "Using an asynchronous batch API to process many independent prompts at lower cost when latency isn't critical.", "Correct choice for large, non-interactive workloads; wrong choice whenever a user is waiting on the response."],
    ["Multi-pass review", "Splitting generation and review into separate calls so the reviewing pass isn't anchored by the generation pass's own reasoning.", "A single call asked to 'write and then check your own work' tends to rubber-stamp itself — the exam flags this."],
    ["Prompt anti-pattern", "Common mistakes like negative-only instructions ('don't do X') with no positive alternative, or one prompt overloaded with unrelated tasks.", "When an option only tells the model what not to do, look for a sibling option that also states the desired behavior."]
  ],
  5: [
    ["Context window", "The finite token budget available for a request — input history and output share this same budget.", "Budgeting questions expect you to account for tool definitions and retrieved data, not just the conversation text."],
    ["Prompt caching", "Marking a stable prefix of a prompt as cacheable so repeated requests reuse it server-side, cutting latency and cost.", "Only the portion before the first change is reusable — appending new content after a cached prefix keeps the cache hit."],
    ["Token budgeting", "Deliberately allocating context space between system prompt, tool definitions, retrieved data, and history so nothing critical is crowded out.", "The exam rewards proactively trimming low-value context over reactively hitting the limit and truncating blindly."],
    ["Compaction / summarization", "Condensing older conversation history into a summary to free context space.", "The 'summarization trap': over-compacting drops details the model still needs, producing vague, ungrounded later responses."],
    ["Escalation on ambiguity", "Surfacing uncertainty to a human rather than silently guessing when a decision is high-stakes or underspecified.", "Correct answers favor escalation exactly when reversibility is low and confidence is uncertain — not for every judgment call."],
    ["Error propagation", "Deciding whether a subagent's error should halt the parent process, trigger a retry, or surface as a degraded-but-continuing result.", "Silently swallowing every subagent error is as wrong as halting on every one — the right call depends on the task's criticality."],
    ["Idempotency", "Designing a tool call so running it twice has the same effect as running it once.", "Essential for anything that might get automatically retried — non-idempotent actions (like sending an email) need a guard."],
    ["Codebase exploration", "An agent's strategy for building situational context — grep/search first vs. reading whole files — before making changes.", "Exam scenarios reward targeted exploration over reflexively reading every file in a large repo."],
    ["Evals", "A structured test suite scoring agent or prompt outputs against expected behavior, used to catch regressions before shipping.", "Treat evals as the mechanism that turns 'it seemed to work when I tried it' into something you can actually trust."],
    ["Information provenance", "Tracking where a piece of context came from — which tool call, file, or turn — so it can be trusted appropriately.", "Matters most when a model must reconcile conflicting information from two different sources in the same context."]
  ]
};

const REFERENCE = {
  1: {
    rules: [
      ["Loop control signal", "Branch only on <code>stop_reason</code> (<code>tool_use</code> vs <code>end_turn</code>). Never parse assistant text for intent, and never use an iteration counter as the primary termination mechanism — it's a safety cap, not the control flow."],
      ["Choosing an orchestration pattern", "Ordered, predictable subtasks → <b>prompt chaining</b>. Distinct input categories → <b>routing</b>. Independent subtasks or need for consensus → <b>parallelization</b>. Unpredictable decomposition → <b>orchestrator-workers</b>. Clear quality bar, generation alone unreliable → <b>evaluator-optimizer</b>."],
      ["Subagent communication", "Hub-and-spoke only. Subagents talk to the orchestrator, never to each other. A subagent returns a final result, not its full transcript."],
      ["Context to give a subagent", "The minimum needed for its scoped task — not the orchestrator's full history. Isolation protects focus and token cost."],
      ["Default failure mode to avoid", "Treating premature termination (stopping before <code>tool_use</code> resolves) and infinite fallback loops (never respecting a real <code>end_turn</code>) as equally likely exam traps — both come from not trusting <code>stop_reason</code> alone."]
    ]
  },
  2: {
    rules: [
      ["What makes a good tool", "A precise, example-rich description matters more than a clever name. The model chooses tools based on the description text."],
      ["tool_use vs tool_result", "<code>tool_use</code> is emitted by the model (request to call). <code>tool_result</code> is sent by the client (the outcome), matched by id."],
      ["MCP vocabulary", "Server = exposes capabilities. Client = 1:1 connection to a server. Host = the application (e.g. Claude Code) managing multiple clients. Primitives = Tools (model-invoked), Resources (contextual data), Prompts (templates)."],
      ["Transport choice", "Local/trusted process → stdio. Remote or shared → Streamable HTTP."],
      ["Error handling", "Always return structured, actionable errors (<code>is_error:true</code> + clear message) — never a raw stack trace — so the model can self-correct on retry."],
      ["Built-in tool vs MCP vs skill", "One-off local capability → built-in tool if one exists. Shared/external system integration → MCP server. Team workflow, no external system → skill or slash command."]
    ]
  },
  3: {
    rules: [
      ["CLAUDE.md hierarchy", "Enterprise → user → project → local. All applicable levels are merged into context — a more specific file adds to the others, it does not replace them."],
      ["Slash command vs skill", "Slash command: user types it explicitly. Skill: Claude decides on its own to invoke it based on relevance. If the scenario needs autonomous judgment, it's a skill."],
      ["Hooks vs prompted instructions", "Use a hook when behavior must be deterministic and non-negotiable (e.g. always run linter before commit). A prompted instruction alone is not reliable enough for hard requirements."],
      ["Plan mode", "Use when changes are risky, hard to reverse, or need human sign-off before execution. It is read-only until explicitly approved."],
      ["Permissions design", "Grant the narrowest permission set that still lets the workflow complete — not blanket allow, not blanket ask."],
      ["Headless / CI use", "Non-interactive runs need permissions configured up front; there's no interactive prompt to fall back on mid-run."]
    ]
  },
  4: {
    rules: [
      ["Where instructions live", "System prompt: role, constraints, behavior for the whole conversation. User message: per-turn task/content. Don't put per-turn specifics in the system prompt."],
      ["When to use few-shot", "Desired output format is precise but hard to describe in words — show, don't just tell."],
      ["When to use chain-of-thought", "Genuinely multi-step reasoning tasks. Skip it for simple lookups or classification — it adds latency/cost without benefit."],
      ["Guaranteeing format", "Prefill the start of the response (e.g. with <code>{</code>) to force structure at the source, then validate the full output against a schema."],
      ["Handling invalid structured output", "Re-prompt with the specific validation error, not a generic 'try again.' A bare retry tends to repeat the same mistake."],
      ["Batch vs real-time", "Large non-interactive workload, latency not critical → Batches API. Anything a user is waiting on → standard synchronous call."],
      ["Self-review anti-pattern", "A single call asked to generate and then check its own work tends to rubber-stamp itself. Use a separate call/pass for review."]
    ]
  },
  5: {
    rules: [
      ["What counts against the context budget", "System prompt + tool definitions + retrieved data + conversation history — all of it, not just the visible chat text."],
      ["Prompt caching mechanics", "Only the stable prefix before the first change is reused. Append new content after the cached prefix to keep hitting cache."],
      ["Compaction trade-off", "Summarize to free space, but don't over-compact — the 'summarization trap' drops details the model still needs, producing vague later answers."],
      ["Escalate vs proceed", "Escalate to a human when the decision is high-stakes AND hard to reverse AND confidence is low. Routine, reversible calls don't need escalation."],
      ["Error propagation choice", "Match the response to criticality: halt on errors that invalidate the task, retry on transient ones, degrade-and-continue on non-critical ones. Never a single blanket policy."],
      ["Idempotency", "Required for any tool call that might be automatically retried — guard non-idempotent actions (sending a message, charging a card) explicitly."],
      ["Codebase exploration strategy", "Targeted grep/search before reading whole files. Reflexively reading an entire large repo wastes context budget the exam expects you to protect."]
    ]
  }
};

// ============================================================================
// GENERATE: glossary
// ============================================================================
write("glossary/index.html", staticPage({
  title: "Glossary — Claude Cert Prep",
  description: "Exam-focused glossary for the Claude Certified Architect (CCA-F) exam: precise definitions and exam-context notes across all five domains.",
  path: "/glossary", active: "glossary",
  jsonLd: [breadcrumbLd([{ name: "Glossary", path: "/glossary" }])],
  bodyHtml: `    <div class="page-head prose"><h1>Glossary</h1><p class="prose-dek">Short, exam-focused definitions — not full docs. Each term also notes what the CCA-F actually tests about it. Jump to a domain:</p></div>
    <div class="domain-pills">${DOMAINS.map((d) => `<a href="/glossary/${d.id}">${escAttr(d.short)}</a>`).join("")}</div>
    ${DOMAINS.map((d) => `<div class="card" style="margin-top:14px"><span class="card-accent" style="background:${d.color}"></span><h3 style="font-weight:800;font-size:16px;margin-bottom:6px">${escAttr(d.name)}</h3><p style="color:var(--text-2);font-size:14px;margin-bottom:10px">${GLOSSARY[d.id].length} terms · ${d.weight}% of the exam</p><a class="btn btn-outline btn-sm" href="/glossary/${d.id}">View terms →</a></div>`).join("")}`
}));

for (const d of DOMAINS) {
  write(`glossary/${d.id}.html`, staticPage({
    title: `${d.short} Glossary — Claude Cert Prep`,
    description: `${d.name}: exam-focused glossary terms with definitions and exam-context notes for the Claude Certified Architect (CCA-F) exam.`,
    path: `/glossary/${d.id}`, active: "glossary",
    jsonLd: [
      breadcrumbLd([{ name: "Glossary", path: "/glossary" }, { name: d.short, path: `/glossary/${d.id}` }]),
      {
        "@type": "DefinedTermSet",
        name: `${d.short} Glossary`,
        description: `Exam-focused glossary terms for ${d.name} (Claude Certified Architect — Foundations).`,
        url: `${SITE}/glossary/${d.id}`,
        hasDefinedTerm: GLOSSARY[d.id].map(([term, def]) => ({
          "@type": "DefinedTerm", name: term, description: def.replace(/<\/?[^>]+>/g, "")
        }))
      }
    ],
    bodyHtml: `    <div class="page-head prose"><h1>${escAttr(d.short)} — Glossary</h1><p class="prose-dek">${escAttr(d.name)} · ${d.weight}% of the exam. ${GLOSSARY[d.id].length} terms.</p></div>
    <div class="domain-pills">${DOMAINS.map((x) => `<a href="/glossary/${x.id}"${x.id === d.id ? ' class="on"' : ""}>${escAttr(x.short)}</a>`).join("")}</div>
    <div style="margin-top:18px">${GLOSSARY[d.id].map(([term, def, note]) => `<div class="term-card"><h3>${term}</h3><p>${def}</p><p class="exam-note">Exam context: ${note}</p></div>`).join("")}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
      <a class="btn btn-solid" href="/reference/${d.id}">Quick reference for this domain →</a>
      <a class="btn btn-outline" href="/practice?d=${d.id}">Practice this domain</a>
    </div>`
  }));
}

// ============================================================================
// GENERATE: quick reference
// ============================================================================
write("reference/index.html", staticPage({
  title: "Quick Reference — Claude Cert Prep",
  description: "Condensed cheat sheets and decision rules for every CCA-F domain — the discriminative patterns that separate the best answer from a merely plausible one.",
  path: "/reference", active: "reference",
  jsonLd: [breadcrumbLd([{ name: "Quick Reference", path: "/reference" }])],
  bodyHtml: `    <div class="page-head prose"><h1>Quick Reference</h1><p class="prose-dek">Decision rules, not prose — for reviewing right before practice or the real exam. Pick a domain:</p></div>
    <div class="domain-pills">${DOMAINS.map((d) => `<a href="/reference/${d.id}">${escAttr(d.short)}</a>`).join("")}</div>
    ${DOMAINS.map((d) => `<div class="card" style="margin-top:14px"><span class="card-accent" style="background:${d.color}"></span><h3 style="font-weight:800;font-size:16px;margin-bottom:6px">${escAttr(d.name)}</h3><p style="color:var(--text-2);font-size:14px;margin-bottom:10px">${REFERENCE[d.id].rules.length} decision rules · ${d.weight}% of the exam</p><a class="btn btn-outline btn-sm" href="/reference/${d.id}">Open cheat sheet →</a></div>`).join("")}`
}));

for (const d of DOMAINS) {
  write(`reference/${d.id}.html`, staticPage({
    title: `${d.short} Quick Reference — Claude Cert Prep`,
    description: `${d.name}: condensed decision rules and exam cheat sheet for the Claude Certified Architect (CCA-F) exam.`,
    path: `/reference/${d.id}`, active: "reference",
    jsonLd: [breadcrumbLd([{ name: "Quick Reference", path: "/reference" }, { name: d.short, path: `/reference/${d.id}` }])],
    bodyHtml: `    <div class="page-head prose"><h1>${escAttr(d.short)} — Quick Reference</h1><p class="prose-dek">${escAttr(d.name)} · ${d.weight}% of the exam. Density over narrative — this is for review, not first-pass learning.</p></div>
    <div class="domain-pills">${DOMAINS.map((x) => `<a href="/reference/${x.id}"${x.id === d.id ? ' class="on"' : ""}>${escAttr(x.short)}</a>`).join("")}</div>
    <div class="card" style="margin-top:18px">${REFERENCE[d.id].rules.map(([title, body]) => `<div style="margin-bottom:18px"><h3 style="font-weight:800;font-size:15px;margin-bottom:6px">${title}</h3><p style="color:var(--text-2);font-size:14.5px;line-height:1.65;margin:0">${body}</p></div>`).join("")}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
      <a class="btn btn-solid" href="/glossary/${d.id}">Full glossary for this domain →</a>
      <a class="btn btn-outline" href="/practice?d=${d.id}">Practice this domain</a>
    </div>`
  }));
}

// ============================================================================
// GENERATE: curriculum (/learn) — the CCA-F lesson track
// ============================================================================
const FLAT_LESSONS = DOMAINS.flatMap((d) => LESSONS_BY_DOMAIN[d.id].map((l) => ({ ...l, domain: d })));

write("learn/index.html", staticPage({
  title: "Curriculum — Claude Cert Prep",
  description: "The full CCA-F curriculum: 30 lessons across all five exam domains, each with an exam-trap callout, a worked scenario, and a hands-on exercise.",
  path: "/learn", active: "learn",
  jsonLd: [
    breadcrumbLd([{ name: "Curriculum", path: "/learn" }]),
    {
      "@type": "Course",
      name: "Claude Certified Architect (CCA-F) Curriculum",
      description: "A 30-lesson curriculum covering all five CCA-F exam domains, free and unofficial.",
      url: `${SITE}/learn`,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE },
      isAccessibleForFree: true,
      hasCourseInstance: {
        "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT4H"
      }
    }
  ],
  bodyHtml: `    <div class="page-head prose"><h1>Curriculum</h1><p class="prose-dek">${FLAT_LESSONS.length} lessons across the 5 CCA-F domains. Each one ends with a hands-on "Try it" exercise — this is meant to be done, not just read. This is the first of Anthropic's certification tracks we cover in full; see the <a href="/certifications">certification roadmap</a> for what's next.</p></div>
    ${DOMAINS.map((d) => `<div class="card" style="margin-top:14px"><span class="card-accent" style="background:${d.color}"></span><h3 style="font-weight:800;font-size:16px;margin-bottom:6px">${escAttr(d.name)}</h3><p style="color:var(--text-2);font-size:14px;margin-bottom:10px">${LESSONS_BY_DOMAIN[d.id].length} lessons · ${d.weight}% of the exam</p><a class="btn btn-outline btn-sm" href="/learn/${d.id}">Start this domain →</a></div>`).join("")}`
}));

for (const d of DOMAINS) {
  const lessons = LESSONS_BY_DOMAIN[d.id];
  write(`learn/${d.id}.html`, staticPage({
    title: `${d.short} Curriculum — Claude Cert Prep`,
    description: `${d.name}: the full lesson track for this CCA-F domain, with exam-trap callouts, worked scenarios, and hands-on exercises.`,
    path: `/learn/${d.id}`, active: "learn",
    jsonLd: [
      breadcrumbLd([{ name: "Curriculum", path: "/learn" }, { name: d.short, path: `/learn/${d.id}` }]),
      {
        "@type": "ItemList",
        name: `${d.short} Curriculum`,
        itemListElement: lessons.map((l, i) => ({
          "@type": "ListItem", position: i + 1, name: l.title, url: `${SITE}/learn/${d.id}/${l.slug}`
        }))
      }
    ],
    bodyHtml: `    <div class="page-head prose"><h1>${escAttr(d.short)} — Curriculum</h1><p class="prose-dek">${escAttr(d.name)} · ${d.weight}% of the exam. ${lessons.length} lessons.</p></div>
    <div class="domain-pills">${DOMAINS.map((x) => `<a href="/learn/${x.id}"${x.id === d.id ? ' class="on"' : ""}>${escAttr(x.short)}</a>`).join("")}</div>
    <div style="margin-top:18px">${lessons.map((l, i) => `<a class="blog-item" href="/learn/${d.id}/${l.slug}"><h3>${i + 1}. ${l.title}</h3><p>${l.dek}</p><div class="bi-meta">${l.minutes} min</div></a>`).join("")}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
      <a class="btn btn-solid" href="/glossary/${d.id}">Glossary for this domain →</a>
      <a class="btn btn-outline" href="/reference/${d.id}">Quick reference</a>
      <a class="btn btn-outline" href="/practice?d=${d.id}">Practice this domain</a>
    </div>`
  }));
}

for (const d of DOMAINS) {
  const lessons = LESSONS_BY_DOMAIN[d.id];
  lessons.forEach((l, i) => {
    const flatIdx = FLAT_LESSONS.findIndex((x) => x.slug === l.slug);
    const prev = FLAT_LESSONS[flatIdx - 1];
    const next = FLAT_LESSONS[flatIdx + 1];
    write(`learn/${d.id}/${l.slug}.html`, staticPage({
      title: `${l.title} — Claude Cert Prep`,
      description: l.dek,
      path: `/learn/${d.id}/${l.slug}`, active: "learn",
      ogType: "article",
      jsonLd: [
        breadcrumbLd([
          { name: "Curriculum", path: "/learn" }, { name: d.short, path: `/learn/${d.id}` }, { name: l.title, path: `/learn/${d.id}/${l.slug}` }
        ]),
        {
          "@type": "LearningResource",
          name: l.title,
          description: l.dek,
          learningResourceType: "Lesson",
          educationalLevel: "Intermediate",
          timeRequired: `PT${l.minutes}M`,
          isAccessibleForFree: true,
          inLanguage: "en",
          author: AUTHOR,
          isPartOf: { "@type": "Course", name: "Claude Certified Architect (CCA-F) Curriculum", url: `${SITE}/learn` }
        }
      ],
      bodyHtml: `    <article class="prose page-head">
      <h1>${l.title}</h1>
      <p class="prose-dek">${l.dek}</p>
      <div class="prose-meta"><span style="color:${d.color};font-weight:700">${escAttr(d.short)}</span><span>·</span><span>Lesson ${i + 1} of ${lessons.length}</span><span>·</span><span>${l.minutes} min</span></div>
      ${l.bodyHtml}
      ${l.slug === "1-1-agentic-loop" ? STOP_REASON_WIDGET : l.slug === "2-1-tool-schemas" ? SCHEMA_LINTER_WIDGET : ""}
    </article>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px">
      ${prev ? `<a class="btn btn-outline" href="/learn/${prev.domain.id}/${prev.slug}">← ${prev.title}</a>` : ""}
      ${next ? `<a class="btn btn-solid" href="/learn/${next.domain.id}/${next.slug}">${next.title} →</a>` : `<a class="btn btn-solid" href="/practice?d=${d.id}">Practice ${escAttr(d.short)} →</a>`}
    </div>`
    }));
  });
}

// ============================================================================
// GENERATE: certifications roadmap
// ============================================================================
write("certifications.html", staticPage({
  title: "Claude Certifications — Roadmap",
  description: "The full Claude certification program from Anthropic — which tracks exist, which one this site covers today, and what's coming next.",
  path: "/certifications", active: "certifications",
  jsonLd: [
    breadcrumbLd([{ name: "Certifications", path: "/certifications" }]),
    {
      "@type": "EducationalOccupationalCredential",
      name: "Claude Certified Architect — Foundations (CCA-F)",
      description: "Anthropic certification for solution architects designing Claude-powered agentic systems. Free unofficial practice available on this site.",
      credentialCategory: "certificate",
      url: `${SITE}/certifications`
    }
  ],
  bodyHtml: `    <div class="prose page-head">
      <h1>Claude Certifications</h1>
      <p class="prose-dek">Anthropic's certification program has four tracks. This site started with one — CCA-F is fully built out, with a 10,000+ question bank, full curriculum, diagnostic, and spaced-repetition drill. The other three are on the roadmap; we build one track at a time, fully, rather than shipping thin placeholders across all four.</p>
    </div>
    ${CERTS.map((c) => `<div class="card" style="margin-top:14px">
      <span class="card-accent" style="background:${c.status === "live" ? "var(--success)" : "var(--warning)"}"></span>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">
        <h3 style="font-weight:800;font-size:17px">${c.code} — ${escAttr(c.name)}</h3>
        <span class="tag" style="background:${c.status === "live" ? "color-mix(in srgb,var(--success) 16%,transparent)" : "color-mix(in srgb,var(--warning) 16%,transparent)"};color:${c.status === "live" ? "var(--success)" : "var(--warning)"}">${c.status === "live" ? "Live on this site" : "In development"}</span>
      </div>
      <p style="color:var(--text-2);font-size:14.5px;margin-bottom:8px">${escAttr(c.audience)}</p>
      <p style="color:var(--text-3);font-size:13px;margin-bottom:12px">${c.examLength} items · ${c.examMinutes} minutes · ${c.domainCount} domains</p>
      <p style="color:var(--text-2);font-size:14px;margin-bottom:14px">${escAttr(c.blurb)}</p>
      ${c.status === "live" ? `<a class="btn btn-outline btn-sm" href="/exam">Start CCA-F mock exam →</a><div style="color:var(--text-3);font-size:12px;margin-top:10px">Last verified against the Claude API and exam guide: ${BUILD_DATE_DISPLAY}</div>` : `<span style="color:var(--text-3);font-size:13px;font-weight:600">Question bank and curriculum not yet published — domain breakdown will follow Anthropic's exam guide as it's released.</span>`}
    </div>`).join("")}
    <p style="color:var(--text-3);font-size:12.5px;margin-top:20px">Track names, item counts, and domain counts mirror publicly described Anthropic certification program information. This is an unofficial resource — not affiliated with, endorsed by, or sponsored by Anthropic.</p>`
}));

// ============================================================================
// GENERATE: about / resources / changelog
// ============================================================================
write("about.html", staticPage({
  title: "About — Claude Cert Prep",
  description: "Who built this free Claude certification practice portal, why, and how the question bank stays accurate.",
  path: "/about", active: "about",
  jsonLd: [breadcrumbLd([{ name: "About", path: "/about" }]), { "@type": "AboutPage", name: "About Claude Cert Prep", url: `${SITE}/about`, author: AUTHOR }],
  bodyHtml: `    <div class="prose page-head">
      <h1>About Claude Cert Prep</h1>
      <p class="prose-dek">An independent, free study portal for Anthropic's Claude certification program. Not affiliated with, endorsed by, or sponsored by Anthropic.</p>
      <h2>Why this exists</h2>
      <p>The CCA-F tests architectural judgment on Claude-powered agentic systems — scenario questions about production trade-offs, not API trivia. Official prep material explains concepts; it doesn't drill the scenario-analysis muscle the actual exam exercises. This portal exists to close that specific gap: unlimited, honest practice at the exam's real format.</p>
      <p>The certification program has four tracks; we build one at a time, fully — see the <a href="/certifications">certification roadmap</a> for what's live and what's next.</p>
      <h2>How the question bank is built</h2>
      <p>Three sources are merged: hand-authored scenario questions matching the exam's architecture-decision style, seed questions extracted from official study-guide practice patterns, and a deterministic parametric generator that produces thousands of provably-correct computed and matching questions — token budgeting, caching savings, retry backoff, and more, each stating its own givens so the answer is exact and never goes stale.</p>
      <p>That last part matters: most of this bank can be regenerated against the current Claude API and exam guide on demand, rather than drifting out of date the way a fixed, hand-written bank does.</p>
      <div class="callout"><b>Freshness</b>Content on this site was last verified against the Claude API and the CCA-F exam guide on ${BUILD_DATE_DISPLAY}. When Anthropic changes the exam guide, we aim to publish a changelog entry within 24-48 hours — see the <a href="/changelog">changelog</a> for the update history.</div>
      <h2>What "free" means here</h2>
      <p>Every practice mode, the full mock exam, the diagnostic, the glossary, and the quick reference are free with no account or sign-up. Progress is saved in your browser only — nothing is sent to a server.</p>
      <h2>Disclaimer</h2>
      <p>This is an unofficial study aid. The domain blueprint mirrors publicly described CCA-F exam information; all questions are original practice material, not reproductions of real exam items.</p>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:10px">
      <a class="btn btn-solid" href="/exam">Take a mock exam →</a>
      <a class="btn btn-outline" href="/resources">Official resources</a>
    </div>`
}));

write("resources.html", staticPage({
  title: "Resources — Claude Cert Prep",
  description: "Curated official Anthropic documentation, SDKs, and courses relevant to the Claude Certified Architect (CCA-F) exam.",
  path: "/resources", active: "resources",
  jsonLd: [breadcrumbLd([{ name: "Resources", path: "/resources" }])],
  bodyHtml: `    <div class="prose page-head">
      <h1>Resources</h1>
      <p class="prose-dek">Official material, used sparingly, as reference — practice questions are still where most CCA-F prep should happen.</p>
    </div>
    <p class="section-title">Use it inside Claude Code</p>
    <div class="card">
      <p style="color:var(--text-2);font-size:14.5px;margin-bottom:10px">The glossary and quick reference are also available as a Claude Code plugin — ask it to explain a concept or quiz you, without leaving your terminal.</p>
      <pre style="background:var(--code-bg);border-radius:10px;padding:12px 14px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.6"><code>/plugin marketplace add uchit/exam-portal
/plugin install claude-cert-prep@claude-cert-prep-marketplace</code></pre>
      <p style="color:var(--text-3);font-size:12.5px;margin-top:10px">Source: <a href="https://github.com/uchit/exam-portal" target="_blank" rel="noopener noreferrer">github.com/uchit/exam-portal</a></p>
    </div>
    <p class="section-title" style="margin-top:26px">Official documentation</p>
    <div class="card">
      <ul class="prep-list">
        <li><a href="https://docs.claude.com" target="_blank" rel="noopener noreferrer">Claude API documentation ↗</a> — full API reference, guides, and tutorials</li>
        <li><a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer">Claude Code documentation ↗</a> — CLAUDE.md, hooks, permissions, MCP configuration</li>
        <li><a href="https://docs.claude.com/en/api/agent-sdk/overview" target="_blank" rel="noopener noreferrer">Agent SDK overview ↗</a> — building production agents on the Claude Agent SDK</li>
        <li><a href="https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview" target="_blank" rel="noopener noreferrer">Prompt engineering guide ↗</a> — Anthropic's own prompting methodology</li>
      </ul>
    </div>
    <p class="section-title" style="margin-top:26px">Specs &amp; repositories</p>
    <div class="card">
      <ul class="prep-list">
        <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol ↗</a> — the MCP spec, short enough to read end to end</li>
        <li><a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer">"Building effective agents" ↗</a> — the source for the orchestration patterns Domain 1 tests</li>
      </ul>
    </div>
    <p class="section-title" style="margin-top:26px">Courses (Anthropic Academy / Skilljar)</p>
    <div class="card">
      <ul class="prep-list">
        <li><a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer">Anthropic Academy ↗</a> — Building with the Claude API · Intro to MCP · Claude Code in Action</li>
        <li><a href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request" target="_blank" rel="noopener noreferrer">CCA-F exam access request ↗</a></li>
      </ul>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
      <a class="btn btn-solid" href="/prep">Full "how to pass" game plan →</a>
      <a class="btn btn-outline" href="/glossary">Glossary</a>
    </div>`
}));

write("changelog.html", staticPage({
  title: "Changelog — Claude Cert Prep",
  description: "What's changed on Claude Cert Prep: new practice modes, question-bank updates, and site improvements.",
  path: "/changelog", active: "changelog",
  jsonLd: [breadcrumbLd([{ name: "Changelog", path: "/changelog" }])],
  bodyHtml: `    <div class="prose page-head"><h1>Changelog</h1><p class="prose-dek">Dated log of real changes — no marketing copy, no vanity metrics.</p></div>
    <div class="prose">
      <h2>2026-08-16</h2>
      <ul>
        <li>Moved off hash routing (<code>#/practice</code>) to real, crawlable URLs (<code>/practice</code>) for every page.</li>
        <li>Added a 25-question Diagnostic mode (5 per domain, untimed) with a per-domain score and a recommended study order.</li>
        <li>Added a full Glossary and Quick Reference cheat sheet for all five domains.</li>
        <li>Added About, Resources, and this Changelog page.</li>
        <li>Launched the blog with the first study-strategy posts.</li>
        <li>Added the full 30-lesson curriculum (<code>/learn</code>) across all five domains, each with an exam-trap callout, a worked scenario, and a hands-on exercise.</li>
        <li>Added Drill — spaced-repetition review over every question you've answered anywhere on the site, not just missed ones.</li>
        <li>Published the certification roadmap (<code>/certifications</code>): CCA-F is fully built; the other three Anthropic certification tracks are next, one at a time.</li>
      </ul>
      <h2>2026-05-27</h2>
      <ul>
        <li>Initial launch: mock exam, quick practice, question bank browse/search, progress tracking, and the "How to Pass" game plan.</li>
      </ul>
    </div>`
}));

// ============================================================================
// GENERATE: blog
// ============================================================================
const POSTS = [
  {
    slug: "how-to-pass-claude-certified-architect-exam",
    title: "How to Pass the Claude Certified Architect (CCA-F) Exam",
    dek: "A field-tested game plan: where the exam actually tests you, where to spend limited study time, and the habit that moves your score more than anything else.",
    date: "2026-08-16",
    minutes: 9,
    bodyHtml: `
      <p>The CCA-F is not a trivia test about API parameters. Every question is a scenario: given a set of production constraints, pick the architectural decision that best protects them. That single fact should change how you study.</p>
      <h2>The exam at a glance</h2>
      <ul>
        <li>60 questions, 120 minutes, Skilljar-proctored</li>
        <li>Scaled score 100–1,000; pass mark 720</li>
        <li>~301-level — assumes roughly six months of hands-on work with the Claude API and Claude Code</li>
        <li>Domain-weighted: Agentic Architecture 27%, Claude Code Config 20%, Prompt Engineering 20%, Tool Design &amp; MCP 18%, Context Management 15%</li>
      </ul>
      <h2>Where to spend your time</h2>
      <p>Domain weighting matters more than breadth. Agentic Architecture alone is worth more than Tool Design &amp; MCP and Context Management combined. If you're time-constrained, over-invest in the top two domains — Agentic Architecture and Claude Code Configuration — and you'll clear the pass mark comfortably even with weaker coverage elsewhere.</p>
      <h2>The habit that matters most: interrogate every wrong answer</h2>
      <p>For every question you get wrong, don't just read the explanation and move on. Ask: <em>what production concern did the right answer protect that mine didn't?</em> The answer is almost always one of five things — latency, cost, observability, reliability, or human-in-the-loop safety. Once you can name which concern a scenario is testing, the "best" answer usually becomes obvious even among several defensible options.</p>
      <h2>Three-week structure</h2>
      <p>Week one: <a href="/diagnostic">take the diagnostic</a> to find your weakest domain, then work through that domain's <a href="/glossary">glossary</a> and <a href="/reference">quick reference</a> while doing daily practice sets filtered to it. Week two: rotate through the remaining domains in weight order, re-attempting missed questions after 48 hours so the reasoning actually sticks — <a href="/practice">practice mode</a> surfaces these automatically. Week three: full-length timed mock exams under real conditions, reviewing every explanation, even on questions you got right.</p>
      <h2>Common mistakes that cost points</h2>
      <ul>
        <li><strong>Treating stop_reason as optional.</strong> Any loop-control design that parses assistant text instead of branching on <code>stop_reason</code> is wrong, no matter how reasonable it sounds.</li>
        <li><strong>Ignoring the CLAUDE.md hierarchy.</strong> A specific-scope file adds to more general ones — it doesn't replace them. Options built on "override" logic are traps.</li>
        <li><strong>Picking the more powerful option over the more appropriate one.</strong> The exam consistently rewards the narrowest tool/permission/pattern that solves the actual scenario, not the most capable one available.</li>
      </ul>
      <h2>Exam-day tactic</h2>
      <p>Read the scenario twice before looking at the options — the correct answer usually pivots on one specific constraint mentioned in passing. When two options both seem defensible, pick the more production-grade one: the one that degrades more gracefully under failure, not just the one that works on the happy path.</p>
      <p>Realistic timeline: two to three weeks at about an hour a day, almost all of it spent on practice questions rather than reading. <a href="/exam">Start a full mock exam</a> once you've cleared the diagnostic to see exactly where you stand.</p>`
  },
  {
    slug: "agentic-loops-stop-reason-explained",
    title: "Agentic Loops and stop_reason: What CCA-F Actually Tests",
    dek: "The single most-weighted concept on the exam, and the three anti-patterns that show up disguised as reasonable-sounding wrong answers.",
    date: "2026-08-16",
    minutes: 7,
    bodyHtml: `
      <p>Agentic Architecture &amp; Orchestration is 27% of the CCA-F — more than any other domain — and the agentic loop is its foundation. Get this concept solid and a large share of Domain 1's scenario questions become straightforward.</p>
      <h2>The lifecycle</h2>
      <p>An agentic loop has four steps: send a request, inspect <code>stop_reason</code> on the response, execute any requested tools if <code>stop_reason</code> is <code>tool_use</code>, and return the tool results as the next message — repeating until <code>stop_reason</code> is <code>end_turn</code>. That's the entire mechanism. Everything else is orchestration built on top of it.</p>
      <h2>Why stop_reason and nothing else</h2>
      <p><code>stop_reason</code> is the only reliable, structured signal the API gives you for loop control. It's deterministic, documented, and doesn't depend on how the model happens to phrase its output this time.</p>
      <h2>Three anti-patterns the exam tests</h2>
      <ol>
        <li><strong>Parsing natural-language signals.</strong> Looking for phrases like "I'm finished" or "no further action needed" in assistant text to decide whether to keep looping. This breaks the moment phrasing varies even slightly.</li>
        <li><strong>Arbitrary iteration caps as the primary mechanism.</strong> A max-iteration count is a legitimate safety net, but it is not loop control — using it as the main way a loop terminates means the agent either stops too early on legitimate multi-step work or spins uselessly until the cap hits.</li>
        <li><strong>Checking for assistant text content instead of stop_reason.</strong> A response can include commentary text alongside a <code>tool_use</code> block — checking "did it say anything" instead of checking <code>stop_reason</code> produces false terminations.</li>
      </ol>
      <h2>A worked exam trap</h2>
      <p>A scenario describes an agent that stops after its first tool call returns a result, even though the task clearly needs a follow-up action. The "premature termination" bug here is almost always a design that treats "received a tool_result" as equivalent to "the model is satisfied" — instead of sending the result back to the model and letting it decide, via its next <code>stop_reason</code>, whether more work is needed.</p>
      <p>Once <code>stop_reason</code>-driven control is second nature, move to orchestration patterns: <a href="/glossary/1">the Domain 1 glossary</a> covers prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer with the exam-context notes that matter for picking between them. Then drill it with <a href="/practice?d=1">Domain 1 practice questions</a>.</p>`
  },
  {
    slug: "mcp-vs-built-in-tools-when-to-use-which",
    title: "MCP Server, Built-in Tool, or Skill? A Decision Framework for the Exam",
    dek: "Tool Design & MCP Integration is 18% of the CCA-F, and most of it comes down to one recurring decision: which distribution mechanism fits a given capability.",
    date: "2026-08-16",
    minutes: 6,
    bodyHtml: `
      <p>A large share of Domain 2 and Domain 3 scenario questions boil down to the same underlying decision, phrased differently each time: given a capability an agent needs, should it be a built-in tool, a custom MCP server, or a Claude Code skill/slash command? The exam rewards picking the narrowest fit, not the most powerful option available.</p>
      <h2>Start with what already exists</h2>
      <p>If a first-party built-in tool already covers the need — Bash, the text editor, web search/fetch — that beats building custom infrastructure that duplicates it. This is the most commonly missed "obvious" answer: test-takers reach for MCP servers reflexively when a built-in tool would already work.</p>
      <h2>MCP server: for external systems, shared across contexts</h2>
      <p>Reach for an MCP server when the capability integrates with an external system — a database, a SaaS API, an internal service — and multiple hosts or projects need that same integration. MCP standardizes the connection so it isn't rebuilt per project. Remember the vocabulary precisely: a <em>server</em> exposes tools/resources/prompts, a <em>client</em> holds a 1:1 connection to one server, and a <em>host</em> (like Claude Code) coordinates multiple clients.</p>
      <h2>Skill or slash command: for workflow, not external systems</h2>
      <p>When the "capability" is really a packaged way of doing something within the project — no external system involved — a skill or slash command fits better than standing up a server. The distinguishing question the exam asks: does invocation need to be autonomous (Claude decides when it's relevant → skill) or explicit (the user types it → slash command)?</p>
      <h2>A worked scenario</h2>
      <p>"A team wants Claude Code to automatically follow a specific deployment checklist whenever it's about to run a deploy command, without the user needing to remember to invoke anything." That's autonomous invocation tied to workflow, no external system — a skill, not an MCP server, and not a slash command (the user isn't the one triggering it).</p>
      <p>Full decision rules, including transport choice (stdio vs. Streamable HTTP) and structured-error-response design, are in the <a href="/reference/2">Domain 2 quick reference</a>. Drill it with <a href="/practice?d=2">Tools &amp; MCP practice questions</a>.</p>`
  }
];

write("blog/index.html", staticPage({
  title: "Blog — Claude Cert Prep",
  description: "Study strategy, domain deep dives, and exam-guide updates for the Claude Certified Architect (CCA-F) exam.",
  path: "/blog", active: "blog",
  jsonLd: [
    breadcrumbLd([{ name: "Blog", path: "/blog" }]),
    { "@type": "Blog", name: "Claude Cert Prep Blog", url: `${SITE}/blog`, author: AUTHOR,
      blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.date })) }
  ],
  bodyHtml: `    <div class="page-head prose"><h1>Blog</h1><p class="prose-dek">Study strategy and domain deep dives. Updated as the exam guide changes.</p></div>
    ${POSTS.map((p) => `<a class="blog-item" href="/blog/${p.slug}"><h3>${p.title}</h3><p>${p.dek}</p><div class="bi-meta">${p.date} · ${p.minutes} min read</div></a>`).join("")}`
}));

for (const p of POSTS) {
  write(`blog/${p.slug}.html`, staticPage({
    title: `${p.title} — Claude Cert Prep`,
    description: p.dek,
    path: `/blog/${p.slug}`, active: "blog",
    ogType: "article",
    jsonLd: [
      breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]),
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.dek,
        url: `${SITE}/blog/${p.slug}`,
        datePublished: p.date,
        dateModified: p.date,
        author: AUTHOR,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${p.slug}` },
        image: OG_IMAGE
      }
    ],
    bodyHtml: `    <article class="prose page-head">
      <h1>${p.title}</h1>
      <p class="prose-dek">${p.dek}</p>
      <div class="prose-meta"><span>${p.date}</span><span>·</span><span>${p.minutes} min read</span></div>
      ${p.bodyHtml}
    </article>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px">
      <a class="btn btn-solid" href="/exam">Take a mock exam →</a>
      <a class="btn btn-outline" href="/blog">More posts</a>
    </div>`
  }));
}

// ============================================================================
// GENERATE: shells for the existing SPA app routes (so direct URLs 200, not 404)
// ============================================================================
write("practice.html", appPage({
  h1: "Quick Practice",
  title: "Quick Practice — Claude Cert Prep",
  description: "Practice Claude Certified Architect (CCA-F) exam scenarios by domain and difficulty, with hints and a full explanation on every question.",
  path: "/practice", active: "practice",
  intro: "Quick Practice: pick your domains and difficulty, get instant feedback with hints and full explanations on every question.",
  jsonLd: [breadcrumbLd([{ name: "Practice", path: "/practice" }])]
}));
write("exam.html", appPage({
  h1: "Mock Exam",
  title: "Mock Exam — Claude Cert Prep",
  description: "A full timed simulation of the Claude Certified Architect (CCA-F) exam: 60 domain-weighted questions, 120-minute timer, scored 100–1000.",
  path: "/exam", active: "exam",
  intro: "Mock Exam: 60 domain-weighted questions, a 120-minute timer, and a scaled 100–1000 score — the same shape as the real CCA-F.",
  jsonLd: [breadcrumbLd([{ name: "Mock Exam", path: "/exam" }])]
}));
write("diagnostic.html", appPage({
  h1: "Diagnostic",
  title: "Diagnostic — Claude Cert Prep",
  description: "A 25-question, untimed placement test for the Claude Certified Architect (CCA-F) exam — 5 per domain, with a per-domain score and study order.",
  path: "/diagnostic", active: "diagnostic",
  intro: "Diagnostic: a 25-question, untimed placement test — 5 per domain — that ends with a per-domain score and a recommended study order.",
  jsonLd: [breadcrumbLd([{ name: "Diagnostic", path: "/diagnostic" }])]
}));
write("drill.html", appPage({
  h1: "Drill",
  title: "Drill — Claude Cert Prep",
  description: "Spaced-repetition review for the Claude Certified Architect (CCA-F) exam: questions you've already answered, resurfaced right before you'd forget them.",
  path: "/drill", active: "drill",
  intro: "Drill: spaced-repetition review of questions you've already answered, timed to when you're about to forget them.",
  jsonLd: [breadcrumbLd([{ name: "Drill", path: "/drill" }])]
}));
write("browse.html", appPage({
  h1: "Question Bank",
  title: "Question Bank — Claude Cert Prep",
  description: "Search and browse the full Claude Certified Architect (CCA-F) practice question bank, with answers and explanations.",
  path: "/browse", active: "browse",
  intro: "Question Bank: search and browse every practice question, each with its correct answer and a full explanation.",
  jsonLd: [breadcrumbLd([{ name: "Question Bank", path: "/browse" }])]
}));
write("prep.html", appPage({
  h1: "How to pass the CCA-F",
  title: "How to Pass the CCA-F — Claude Cert Prep",
  description: "A field-tested game plan for passing the Claude Certified Architect (CCA-F) exam: where to spend study time, mental models, and exam-day tactics.",
  path: "/prep", active: "prep",
  intro: "How to Pass the CCA-F: a field-tested game plan covering domain weighting, mental models, and exam-day tactics.",
  jsonLd: [
    breadcrumbLd([{ name: "How to Pass", path: "/prep" }]),
    { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ]
}));
write("progress.html", appPage({
  h1: "Your Progress",
  title: "Your Progress — Claude Cert Prep",
  description: "Track your Claude Certified Architect (CCA-F) practice progress: domain mastery, flagged questions, and mock-exam history — saved in your browser.",
  path: "/progress", active: "progress",
  intro: "Your Progress: domain mastery, flagged questions, and mock-exam history, saved locally in your browser.",
  jsonLd: [breadcrumbLd([{ name: "Progress", path: "/progress" }])]
}));

// ============================================================================
// GENERATE: sitemap.xml + robots.txt
// ============================================================================
const staticRoutes = [
  "/", "/practice", "/exam", "/diagnostic", "/drill", "/browse", "/prep", "/progress",
  "/about", "/resources", "/changelog", "/glossary", "/reference", "/blog", "/learn", "/certifications"
];
const domainRoutes = DOMAINS.flatMap((d) => [`/glossary/${d.id}`, `/reference/${d.id}`, `/learn/${d.id}`]);
const blogRoutes = POSTS.map((p) => `/blog/${p.slug}`);
const lessonRoutes = FLAT_LESSONS.map((l) => `/learn/${l.domain.id}/${l.slug}`);
const allRoutes = [...staticRoutes, ...domainRoutes, ...blogRoutes, ...lessonRoutes];

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join("\n")}
</urlset>
`);

write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

// llms.txt — emerging convention (llmstxt.org) giving LLM-based answer
// engines a concise, structured map of the site instead of making them
// infer it from crawled HTML. Kept short: what the site is, and the
// highest-signal pages, grouped by section.
write("llms.txt", `# ${SITE_NAME}

> Free, unofficial practice portal for Anthropic's Claude certification program. The Claude Certified Architect — Foundations (CCA-F) track is fully built: a 10,000+ question bank, a 30-lesson curriculum, mock exams, a diagnostic placement test, and spaced-repetition drill — no account or sign-up required. Not affiliated with, endorsed by, or sponsored by Anthropic.

## Study tools
- [Mock Exam](${SITE}/exam): 60 domain-weighted questions, 120-minute timer, scaled 100-1000 score, pass mark 720.
- [Diagnostic](${SITE}/diagnostic): 25-question untimed placement test with a per-domain study order.
- [Quick Practice](${SITE}/practice): configurable practice sets by domain and difficulty.
- [Drill](${SITE}/drill): spaced-repetition review of previously-answered questions.
- [Question Bank](${SITE}/browse): search all questions with answers and explanations.

## Curriculum and reference
- [Curriculum](${SITE}/learn): 30 lessons across the 5 CCA-F domains.
- [Glossary](${SITE}/glossary): exam-focused term definitions per domain.
- [Quick Reference](${SITE}/reference): condensed decision-rule cheat sheets per domain.
- [How to Pass](${SITE}/prep): study strategy, mental models, and an FAQ.
- [Blog](${SITE}/blog): study-strategy and domain deep-dive posts.

## Program
- [Certifications](${SITE}/certifications): status of all four Anthropic certification tracks (CCA-F is live; CCAR-P, CCAO-F, CCDV-F are in development).
- [About](${SITE}/about): who built this and why, and how the question bank is generated.

## Exam blueprint (CCA-F)
${DOMAINS.map((d) => `- ${d.short} — ${d.weight}%`).join("\n")}
`);

// RSS feed for the blog — standard discoverability signal, linked from <head>.
write("blog/feed.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${SITE_NAME} Blog</title>
  <link>${SITE}/blog</link>
  <description>Study strategy and domain deep dives for the Claude Certified Architect (CCA-F) exam.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${POSTS.map((p) => `  <item>
    <title>${escAttr(p.title)}</title>
    <link>${SITE}/blog/${p.slug}</link>
    <guid>${SITE}/blog/${p.slug}</guid>
    <description>${escAttr(p.dek)}</description>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  </item>`).join("\n")}
</channel></rss>
`);

// ============================================================================
// GENERATE: Claude Code plugin data (plugin/claude-cert-prep/skills/…/data)
// Sourced from the exact same GLOSSARY/REFERENCE/DOMAINS constants as the
// website — the skill can never drift out of sync with what's published.
// ============================================================================
{
  const PLUGIN_DATA = "plugin/claude-cert-prep/skills/cca-f-reference/data";
  write(`${PLUGIN_DATA}/blueprint.json`, JSON.stringify({
    exam: "Claude Certified Architect — Foundations (CCA-F)",
    length: 60, minutes: 120, passScore: 720, scaleMax: 1000,
    domains: DOMAINS.map((d) => ({ id: d.id, name: d.name, short: d.short, weight: d.weight })),
    lastVerified: BUILD_DATE,
    source: SITE
  }, null, 2));

  write(`${PLUGIN_DATA}/glossary.json`, JSON.stringify(
    DOMAINS.map((d) => ({
      domain: d.short, domainId: d.id,
      terms: GLOSSARY[d.id].map(([term, definition, examContext]) => ({
        term, definition: definition.replace(/<\/?[^>]+>/g, ""), examContext: examContext.replace(/<\/?[^>]+>/g, "")
      }))
    })), null, 2));

  write(`${PLUGIN_DATA}/reference.json`, JSON.stringify(
    DOMAINS.map((d) => ({
      domain: d.short, domainId: d.id,
      rules: REFERENCE[d.id].rules.map(([title, body]) => ({ title, body: body.replace(/<\/?[^>]+>/g, "") }))
    })), null, 2));
}

// ============================================================================
// SYNC index.html's <head> and chrome (header/nav/footer/bottomnav/script)
// from the same head()/header()/FOOTER templates every other page uses, so
// the homepage — the one hand-authored file — can never drift out of sync
// (missing OG tags, stale palette, etc.) with the generated pages. Only the
// hero markup inside <main> is left untouched.
// ============================================================================
{
  const HOME_TITLE = "Claude Certified Architect — Exam Prep Portal";
  const HOME_DESC = "Free practice portal for the Claude Certified Architect (CCA-F) exam: 10,000+ questions, timed mock exams, hints, and full answer explanations across all five domains.";
  const HOME_JSONLD = [
    {
      "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: SITE_NAME, description: HOME_DESC,
      publisher: AUTHOR,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE}/browse?q={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    { "@type": "Person", "@id": "https://hellouchit.com/#person", name: AUTHOR.name, url: AUTHOR.url }
  ];
  const indexPath = join(ROOT, "index.html");
  let html = readFileSync(indexPath, "utf8");
  html = html.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/, head(HOME_TITLE, HOME_DESC, "/", { jsonLd: HOME_JSONLD }));
  html = html.replace(/ {2}<header class="topbar">[\s\S]*?<\/header>/, header("home").trimEnd());
  html = html.replace(/ {2}<footer class="footer">[\s\S]*$/, FOOTER);
  writeFileSync(indexPath, html);
  console.log("synced index.html head + chrome");
}

console.log(`\nGenerated ${allRoutes.length} routes.`);
