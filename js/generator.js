// ============================================================================
// Parametric question generator.
// Produces thousands of genuinely-distinct, provably-correct questions.
// Two strategies:
//   (a) COMPUTED — the question states all its givens, so the answer is exact
//       regardless of real-world pricing/limits drift (token budgeting, cost,
//       throughput, backoff, fan-out, context growth, few-shot overhead).
//       Distractors model common mistakes.
//   (b) MATCHING — combinatorial concept<->definition pairings over curated
//       knowledge tables (API params, MCP, Claude Code, prompt techniques).
// Deterministic: a seeded PRNG makes the bank identical on every load, so
// question IDs are stable for progress tracking.
// ============================================================================

// --- deterministic PRNG (mulberry32) ---------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeHelpers(rng) {
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const int = (lo, hi, step = 1) => lo + Math.floor(rng() * ((hi - lo) / step + 1)) * step;
  const shuffle = (opts) => {
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  };
  // Guarantees exactly 4 unique options. `wrongs` are candidate distractors;
  // `mint` produces extra unique distractors if candidates collide/run out.
  const buildOptions = (correctText, wrongs, mint) => {
    const set = new Set([correctText]);
    for (const w of wrongs) {
      if (set.size >= 4) break;
      if (w != null && w !== "") set.add(String(w));
    }
    let guard = 0;
    while (set.size < 4 && guard++ < 200) {
      const m = mint ? mint() : correctText + " " + guard;
      if (m != null && m !== "") set.add(String(m));
    }
    const opts = shuffle([...set]);
    return { options: opts, correct: opts.indexOf(correctText) };
  };
  return { pick, int, shuffle, buildOptions };
}

const fmt = (n) => n.toLocaleString("en-US");
const usd = (n) => "$" + n.toFixed(n < 1 ? 4 : 2);

// ============================================================================
// KNOWLEDGE TABLES
// ============================================================================

const MODELS = [
  { name: "Claude Haiku", tier: "fastest & cheapest", best: ["high-volume classification", "request routing", "simple field extraction", "latency-critical user paths", "cost-sensitive batch jobs", "lightweight summarization", "spam/intent detection"] },
  { name: "Claude Sonnet", tier: "balanced price-performance", best: ["production coding agents", "everyday agentic workflows", "RAG answer synthesis", "balanced cost-vs-quality apps", "mid-complexity tool use", "customer-facing chat at scale"] },
  { name: "Claude Opus", tier: "most capable", best: ["the hardest multi-step reasoning", "deep research over many sources", "complex multi-file refactors", "novel problem solving where quality dominates cost", "high-stakes analysis", "ambiguous open-ended planning"] }
];

const API_PARAMS = [
  ["max_tokens", "Caps the maximum number of tokens Claude may generate in the response."],
  ["temperature", "Controls randomness of sampling; lower is more deterministic, higher more varied."],
  ["top_p", "Nucleus sampling — restricts sampling to the smallest set of tokens whose cumulative probability exceeds p."],
  ["top_k", "Limits sampling to the k most-likely next tokens."],
  ["stop_sequences", "A list of strings that, when generated, cause Claude to stop producing output."],
  ["system", "The system prompt — sets role, rules and context, separate from the conversation turns."],
  ["stream", "When true, streams the response incrementally as server-sent events."],
  ["tools", "Declares the tools (with name, description and input_schema) Claude is allowed to call."],
  ["tool_choice", "Controls whether/which tool Claude must use (auto, any, or a specific tool)."],
  ["messages", "The ordered list of user/assistant turns that make up the conversation."],
  ["model", "Selects which Claude model serves the request."],
  ["metadata", "Optional request metadata (e.g. an end-user id) for tracking and abuse prevention."],
  ["thinking", "Enables extended thinking, giving Claude a budget of reasoning tokens before the final answer."],
  ["stop_reason", "A response field stating why generation stopped (end_turn, max_tokens, stop_sequence, tool_use)."],
  ["usage", "A response field reporting input_tokens and output_tokens for the request."],
  ["cache_control", "Marks a content block as a prompt-cache breakpoint for reuse across calls."]
];

const STOP_REASONS = [
  ["end_turn", "Claude finished its reply naturally and is yielding the turn."],
  ["max_tokens", "Generation was cut off because it hit the max_tokens limit."],
  ["stop_sequence", "One of your configured stop_sequences was produced."],
  ["tool_use", "Claude is requesting a tool call and is pausing for the tool_result."]
];

const MCP = [
  ["MCP server", "A process that exposes tools, resources and prompts to MCP clients over a transport."],
  ["MCP client", "The component inside a host application that maintains a 1:1 connection to a server."],
  ["MCP host", "The application (e.g. Claude Desktop or Claude Code) that runs clients and uses their capabilities."],
  ["stdio transport", "Runs the server as a local subprocess and exchanges JSON-RPC over stdin/stdout."],
  ["streamable HTTP transport", "Connects to a remote server over HTTP, suitable for hosted/networked MCP servers."],
  ["Tools (MCP primitive)", "Model-controlled functions the LLM can invoke to take actions."],
  ["Resources (MCP primitive)", "Application-controlled data/context the host can read and supply to the model."],
  ["Prompts (MCP primitive)", "User-controlled reusable prompt templates the server offers."],
  ["JSON-RPC 2.0", "The wire format MCP uses for requests, responses and notifications."],
  ["Capability negotiation", "The initialization handshake where client and server declare what they support."],
  [".mcp.json", "The project file where Claude Code records MCP server definitions to share with a team."],
  ["Roots", "A mechanism by which the client tells the server which directories/URIs are in scope."],
  ["Sampling", "A server capability to request an LLM completion back through the client/host."],
  ["input_schema", "The JSON Schema that defines a tool's parameters so the model calls it correctly."]
];

const CLAUDE_CODE = [
  ["CLAUDE.md", "A project memory file auto-loaded into context with conventions and instructions."],
  ["settings.json", "The file holding Claude Code configuration such as permissions, env and hooks."],
  ["Permission rules (allow/deny/ask)", "Govern which tool calls run automatically, are blocked, or prompt you."],
  ["Custom slash commands", "Reusable prompts stored as Markdown in .claude/commands/."],
  ["PreToolUse hook", "A shell hook that runs before a tool call and can block or modify it."],
  ["PostToolUse hook", "A shell hook that runs after a tool call completes."],
  ["/clear", "Resets the conversation context to start fresh."],
  ["/compact", "Summarizes and shrinks the current context to free up the window."],
  ["Plan mode", "A read-only mode where Claude proposes a plan before making any edits."],
  ["Subagents", "Specialized agents with their own context and tools, spawned for focused subtasks."],
  ["Headless mode (-p)", "Runs Claude Code non-interactively for scripting and CI pipelines."],
  ["/init", "Bootstraps a CLAUDE.md by analyzing the current repository."],
  ["MCP config (.mcp.json)", "Registers external MCP servers so their tools appear inside Claude Code."],
  ["Output styles", "Adjust Claude Code's response persona/format for a session."],
  ["@-mentions", "Pull a specific file's contents into the prompt by referencing its path."],
  ["Thinking keywords", "Phrases like 'think hard' that allocate more extended-thinking budget."]
];

const PROMPT_TECH = [
  ["XML tags", "Wrap distinct sections (e.g. <context>, <example>, <instructions>) so the model can parse structure reliably.", [
    "You separate the document, the question and the rules into <document>, <question> and <rules> blocks.",
    "You enclose the source text in <transcript> tags and your ask in <task> tags.",
    "You put the user's email in <email> and the policy in <policy> so the model never mixes them.",
    "You delimit each of three reference articles with <doc id='1'>…</doc> tags.",
    "You wrap the few-shot examples in <examples> and the live input in <input> so they don't blur together.",
    "You place the rubric inside <criteria> tags separate from the essay in <essay> tags."
  ]],
  ["Few-shot examples", "Show several input→output examples so the model infers the pattern.", [
    "You include three worked examples of the exact format you want before asking for the real one.",
    "You paste five labeled samples so the model copies the labeling scheme.",
    "You show two before/after rewrites so the model matches your editing style.",
    "You give four question→SQL pairs before the new question.",
    "You demonstrate the desired tone with three sample replies, then ask for a fourth.",
    "You provide a handful of input/output pairs instead of describing the rules in prose."
  ]],
  ["Chain-of-thought", "Ask the model to reason step by step before giving the final answer.", [
    "You instruct 'think through this step by step before answering' on a hard reasoning task.",
    "You ask the model to show its working in <scratchpad> before the final line.",
    "You tell it to first list the constraints, then reason, then state the answer.",
    "You request the intermediate steps of a multi-hop calculation before the result.",
    "You ask it to 'reason about edge cases first' on a tricky logic problem.",
    "You have it explain its reasoning before committing to a diagnosis."
  ]],
  ["Prefilling the assistant turn", "Seed the start of Claude's response to force a format or skip preamble.", [
    "You start the assistant message with '{' to force a JSON-only response.",
    "You prefill '```python' to force the answer to begin with a code block.",
    "You seed the assistant turn with '- ' to force a bulleted list with no intro.",
    "You begin the assistant message with the opening '<answer>' tag to enforce the wrapper.",
    "You prefill the first table row header to force tabular output."
  ]],
  ["Role / system prompt", "Assign an expert persona and rules in the system field.", [
    "You set the system prompt to 'You are a meticulous tax auditor' to shape tone and rigor.",
    "You put 'You are a senior SRE' in the system field to steer expertise.",
    "You instruct via the system prompt that the assistant is a patient kindergarten teacher.",
    "You define the assistant as a 'strict JSON API that never apologizes' in the system field.",
    "You set a persona of 'a careful legal editor' to raise precision."
  ]],
  ["Explicit output format spec", "State the exact schema/shape the output must follow.", [
    "You specify 'Return only valid JSON matching this schema: {...}' with no prose.",
    "You define the exact column order for a CSV the model must emit.",
    "You require the answer as a markdown table with three named columns.",
    "You state that the response must be exactly one of: APPROVE, DENY, ESCALATE.",
    "You give a typed schema and say 'do not add any fields not in the schema'."
  ]],
  ["Task decomposition", "Break a complex request into ordered sub-steps.", [
    "You list the 4 sub-steps to perform in order rather than one vague instruction.",
    "You number the stages: first extract entities, then classify, then summarize.",
    "You split 'analyze this contract' into find-parties, find-dates, then flag-risks.",
    "You spell out: step 1 parse, step 2 validate, step 3 transform, step 4 output.",
    "You break the migration into ordered phases the model must complete in sequence."
  ]],
  ["Guardrail instructions", "Tell the model what to do when it lacks information or hits an edge case.", [
    "You add \"If the answer is not in the context, reply EXACTLY: I don't know.\"",
    "You instruct the model to refuse and ask for clarification when inputs are ambiguous.",
    "You say 'never invent a citation; only quote text present in <docs>'.",
    "You add 'if the request violates policy, decline and explain briefly'.",
    "You tell it to return null for any field it cannot find rather than guessing."
  ]],
  ["Prompt chaining", "Split a complex task across multiple sequential calls, passing each output into the next.", [
    "You run one call to extract entities, then feed those into a second call that classifies them.",
    "You generate an outline in call 1, then expand each section in separate follow-up calls.",
    "You first summarize each document, then make a final call that synthesizes the summaries.",
    "You validate and clean data in one step, then analyze it in a second prompt.",
    "You draft in one call and critique-then-revise in subsequent calls."
  ]],
  ["Long-context document placement", "Put long documents near the top of the prompt and the question at the end for best recall.", [
    "You place a 50-page contract first and put the actual question at the very end of the prompt.",
    "You move the long reference material above the instructions so the query comes last.",
    "You order the prompt as: big document, then a short focused question at the bottom.",
    "You keep the lengthy transcript at the top and ask the question after it."
  ]],
  ["Output length control", "Bound the response length via instruction and/or max_tokens.", [
    "You instruct 'answer in at most two sentences' to keep responses terse.",
    "You cap output with max_tokens and ask for a concise summary.",
    "You say 'limit the list to the top 3 items' to control verbosity.",
    "You request 'a one-paragraph executive summary, no more than 80 words'."
  ]]
];

// ============================================================================
// GENERATOR FAMILIES
// ============================================================================

function genModelRecommendation(rng) {
  const { buildOptions } = makeHelpers(rng);
  const out = [];
  // One question per distinct use-case (no org-name padding) so questions are
  // genuinely different rather than the same prompt with a different company.
  for (const m of MODELS) {
    const wrongModels = MODELS.filter((x) => x.name !== m.name);
    for (const use of m.best) {
      const { options, correct } = buildOptions(m.name, [
        wrongModels[0].name, wrongModels[1].name, "It does not matter — all Claude models behave identically"
      ]);
      out.push({
        domain: 1, difficulty: 2, cat: "model-selection", gen: true,
        scenario: `A team needs a model for ${use}, where that is the dominant requirement.`,
        question: "Which Claude model is the most appropriate default choice?",
        options, correct,
        explanation: `${m.name} is the ${m.tier} tier and the best fit for ${use}. Match the model tier to the dominant constraint — cost, latency, or reasoning depth — rather than always reaching for the largest model.`
      });
    }
  }
  return out;
}

function genContextBudget(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  const W = 200000;
  for (let i = 0; i < count; i++) {
    const sys = int(500, 8000, 250);
    const hist = int(1000, 60000, 500);
    const reserve = int(1000, 16000, 500);
    const ans = W - sys - hist - reserve;
    const wrongs = [W - sys - hist, W - hist - reserve, ans - reserve];
    const { options, correct } = buildOptions(
      `${fmt(ans)} tokens`,
      wrongs.map((v) => `${fmt(v)} tokens`),
      () => `${fmt(ans + int(500, 9000, 500))} tokens`
    );
    out.push({
      domain: 5, difficulty: 3, cat: "context-budget", gen: true,
      scenario: `You target a ${fmt(W)}-token context window. Your system prompt is ${fmt(sys)} tokens, the conversation so far is ${fmt(hist)} tokens, and you must reserve ${fmt(reserve)} tokens for the response.`,
      question: "What is the largest document (in tokens) you can add and still fit the window?",
      options, correct,
      explanation: `Available = window − system − history − output reserve = ${fmt(W)} − ${fmt(sys)} − ${fmt(hist)} − ${fmt(reserve)} = ${fmt(ans)} tokens. The most common mistake is forgetting to reserve room for the output.`
    });
  }
  return out;
}

function genCost(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const inTok = int(2000, 200000, 1000);
    const outTok = int(500, 16000, 500);
    const inRate = int(25, 1500, 25) / 100;
    const outRate = inRate * (3 + Math.floor(rng() * 3));
    const cost = (inTok / 1e6) * inRate + (outTok / 1e6) * outRate;
    const swap = (inTok / 1e6) * outRate + (outTok / 1e6) * inRate;
    const inOnly = (inTok / 1e6) * inRate;
    const { options, correct } = buildOptions(
      usd(cost),
      [usd(swap), usd(inOnly), usd(cost * 1.1)],
      () => usd(cost * (1 + (int(5, 40, 1) / 100)))
    );
    out.push({
      domain: 5, difficulty: 3, cat: "cost", gen: true,
      scenario: `A request sends ${fmt(inTok)} input tokens and generates ${fmt(outTok)} output tokens. Assume rates of ${usd(inRate)} per million input tokens and ${usd(outRate)} per million output tokens.`,
      question: "What is the approximate cost of this single request?",
      options, correct,
      explanation: `Cost = (input/1e6 × in-rate) + (output/1e6 × out-rate) = (${fmt(inTok)}/1e6 × ${usd(inRate)}) + (${fmt(outTok)}/1e6 × ${usd(outRate)}) = ${usd(cost)}. Output tokens are billed at a higher rate than input, so they often dominate cost.`
    });
  }
  return out;
}

function genCaching(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const prefix = int(5000, 120000, 1000);
    const reuses = int(3, 200, 1);
    const base = int(25, 800, 25) / 100;
    const uncached = (prefix / 1e6) * base * (reuses + 1);
    const cached = (prefix / 1e6) * base * 1.25 + (prefix / 1e6) * base * 0.1 * reuses;
    const pct = Math.max(1, Math.min(99, Math.round(((uncached - cached) / uncached) * 100)));
    const { options, correct } = buildOptions(
      `~${pct}% cheaper`,
      [`~${Math.min(99, pct + int(5, 20, 1))}% cheaper`, `~${Math.max(1, pct - int(5, 20, 1))}% cheaper`, "~50% cheaper"],
      () => `~${int(2, 98, 1)}% cheaper`
    );
    out.push({
      domain: 5, difficulty: 4, cat: "prompt-caching", gen: true,
      scenario: `A ${fmt(prefix)}-token prompt prefix is reused across ${reuses + 1} calls. Cache writes cost 1.25× base input rate; cache reads cost 0.1× base.`,
      question: "Roughly how much cheaper is the cached approach versus paying full price every call?",
      options, correct,
      explanation: `Uncached pays full input on all ${reuses + 1} calls. Cached pays one 1.25× write plus ${reuses} reads at 0.1×, saving about ${pct}%. Prompt caching pays off fast when a large prefix is reused many times.`
    });
  }
  return out;
}

function genThroughput(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const rpm = int(50, 4000, 50);
    const n = int(5000, 500000, 1000);
    const mins = Math.ceil(n / rpm);
    const { options, correct } = buildOptions(
      `${fmt(mins)} minutes`,
      [`${fmt(Math.floor(n / rpm))} minutes`, `${fmt(Math.ceil(n / (rpm * 60)))} minutes`, `${fmt(mins * 2)} minutes`],
      () => `${fmt(mins + int(1, 60, 1))} minutes`
    );
    out.push({
      domain: 5, difficulty: 3, cat: "throughput", gen: true,
      scenario: `Your account allows ${fmt(rpm)} requests per minute and you must process ${fmt(n)} independent requests.`,
      question: "At the rate limit, what is the minimum wall-clock time to finish (ignoring per-request latency)?",
      options, correct,
      explanation: `Minutes = ceil(requests ÷ RPM) = ceil(${fmt(n)} ÷ ${fmt(rpm)}) = ${fmt(mins)} minutes. For very large jobs the Message Batches API is usually a better tool than the synchronous endpoint.`
    });
  }
  return out;
}

function genBackoff(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const base = int(1, 5, 1);
    const k = int(2, 8, 1);
    const delay = base * Math.pow(2, k);
    const { options, correct } = buildOptions(
      `${delay} seconds`,
      [`${base * 2 * k} seconds`, `${base * Math.pow(2, k - 1)} seconds`, `${base * Math.pow(2, k + 1)} seconds`],
      () => `${delay + int(1, 30, 1)} seconds`
    );
    out.push({
      domain: 5, difficulty: 3, cat: "retry-backoff", gen: true,
      scenario: `You hit a 429 and retry with exponential backoff: delay = base × 2^attempt, with base = ${base}s (attempts counted from 0).`,
      question: `What is the delay before retry attempt #${k}?`,
      options, correct,
      explanation: `delay = ${base} × 2^${k} = ${delay}s. Always honor Retry-After when present and add jitter to avoid thundering-herd retries.`
    });
  }
  return out;
}

function genAgentFanout(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const subs = int(2, 12, 1);
    const per = int(500, 8000, 250);
    const overhead = int(1000, 20000, 500);
    const total = subs * per + overhead;
    const { options, correct } = buildOptions(
      `~${fmt(total)} tokens`,
      [`~${fmt(subs * per)} tokens`, `~${fmt((subs - 1) * per + overhead)} tokens`, `~${fmt(subs * per + overhead * 2)} tokens`],
      () => `~${fmt(total + int(500, 12000, 500))} tokens`
    );
    out.push({
      domain: 1, difficulty: 3, cat: "agent-fanout", gen: true,
      scenario: `A coordinator agent fans out to ${subs} subagents. Each subagent consumes about ${fmt(per)} tokens, and coordination/synthesis adds about ${fmt(overhead)} tokens of overhead.`,
      question: "Roughly how many tokens does the whole run consume?",
      options, correct,
      explanation: `Total ≈ (subagents × per-agent tokens) + coordinator overhead = (${subs} × ${fmt(per)}) + ${fmt(overhead)} = ${fmt(total)} tokens. Parallel fan-out trades token cost for latency — only fan out when subtasks are genuinely independent.`
    });
  }
  return out;
}

function genToolGrowth(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const startCtx = int(1000, 40000, 500);
    const calls = int(2, 15, 1);
    const result = int(200, 5000, 100);
    const total = startCtx + calls * result;
    const { options, correct } = buildOptions(
      `~${fmt(total)} tokens`,
      [`~${fmt(startCtx + result)} tokens`, `~${fmt(calls * result)} tokens`, `~${fmt(startCtx + (calls + 1) * result)} tokens`],
      () => `~${fmt(total + int(200, 8000, 200))} tokens`
    );
    out.push({
      domain: 2, difficulty: 3, cat: "tool-context-growth", gen: true,
      scenario: `An agent starts with ${fmt(startCtx)} tokens of context and makes ${calls} sequential tool calls. Each tool_result appends about ${fmt(result)} tokens that stay in the conversation.`,
      question: "Roughly how large is the context after all the tool calls?",
      options, correct,
      explanation: `Context ≈ starting tokens + (calls × result size) = ${fmt(startCtx)} + (${calls} × ${fmt(result)}) = ${fmt(total)} tokens. Tool results accumulate, so trim or summarize large results to keep the window healthy.`
    });
  }
  return out;
}

function genFewShot(rng, count) {
  const { int, buildOptions } = makeHelpers(rng);
  const out = [];
  for (let i = 0; i < count; i++) {
    const base = int(200, 3000, 50);
    const k = int(1, 12, 1);
    const each = int(50, 1200, 50);
    const total = base + k * each;
    const { options, correct } = buildOptions(
      `~${fmt(total)} tokens`,
      [`~${fmt(k * each)} tokens`, `~${fmt(base + each)} tokens`, `~${fmt(base + (k + 1) * each)} tokens`],
      () => `~${fmt(total + int(100, 4000, 100))} tokens`
    );
    out.push({
      domain: 4, difficulty: 2, cat: "fewshot-overhead", gen: true,
      scenario: `Your prompt has a ${fmt(base)}-token instruction plus ${k} few-shot example(s) averaging ${fmt(each)} tokens each.`,
      question: "Roughly how many tokens is the full prompt?",
      options, correct,
      explanation: `Prompt ≈ instruction + (examples × per-example size) = ${fmt(base)} + (${k} × ${fmt(each)}) = ${fmt(total)} tokens. Few-shot examples improve reliability but cost tokens on every call — cache them if they are stable.`
    });
  }
  return out;
}

// Claude Code "which feature solves this need" — scenario style (domain 3).
const CC_NEEDS = [
  ["You want the team to share coding conventions that Claude follows automatically in every session.", "CLAUDE.md"],
  ["A new contributor should get a CLAUDE.md generated from the existing repo with one command.", "/init"],
  ["You want certain shell commands to run without a permission prompt, and others always blocked.", "Permission rules (allow/deny/ask)"],
  ["You want to package a frequently-used multi-step prompt so anyone can invoke it as /deploy-check.", "Custom slash commands"],
  ["You must run a linter and reject the edit if it fails, before any file write is applied.", "PreToolUse hook"],
  ["You want to auto-format a file every time Claude finishes editing it.", "PostToolUse hook"],
  ["The context is bloated with old turns and you want to keep going without losing the thread.", "/compact"],
  ["You are switching to a brand-new task and want a totally fresh context.", "/clear"],
  ["You want Claude to propose a step-by-step plan and make zero edits until you approve.", "Plan mode"],
  ["A large task should be split so a focused helper handles research in its own context window.", "Subagents"],
  ["You want to run Claude Code inside a CI job non-interactively and capture its output.", "Headless mode (-p)"],
  ["You want your GitHub MCP server's tools available inside Claude Code, shared with the team.", "MCP config (.mcp.json)"],
  ["You want to pull one specific file's contents directly into your prompt.", "@-mentions"],
  ["You want Claude to spend noticeably more reasoning effort on a hard architectural decision.", "Thinking keywords"],
  ["You want concise, terminal-friendly responses for this session only.", "Output styles"],
  ["You want to block any attempt to edit files under a protected /secrets directory.", "Permission rules (allow/deny/ask)"],
  ["You want a one-command way to scaffold a project-memory file from the current repo.", "/init"],
  ["A complex feature needs research, implementation and review handled in separate focused contexts.", "Subagents"],
  ["You want a 'release-notes' workflow any teammate can trigger consistently.", "Custom slash commands"],
  ["You want to validate a commit message against a convention before the commit tool runs.", "PreToolUse hook"],
  ["The current chat has drifted across three unrelated tasks and feels sluggish.", "/compact"],
  ["You want documented build/lint/test commands to be in context every session automatically.", "CLAUDE.md"],
  ["You want Claude to think harder before a risky database migration decision.", "Thinking keywords"],
  ["You want your team's Postgres MCP server available to everyone who opens the repo.", "MCP config (.mcp.json)"],
  ["You want to feed the exact contents of config/webpack.js into your question.", "@-mentions"],
  ["You want a repeatable '/triage-bug' workflow with steps the whole team uses.", "Custom slash commands"],
  ["You want to forbid the agent from ever running 'git push --force'.", "Permission rules (allow/deny/ask)"],
  ["You want to run a typecheck and block the edit if it fails, before writing.", "PreToolUse hook"],
  ["You want tests to run automatically right after each code edit.", "PostToolUse hook"],
  ["You want a read-only proposal for a risky schema change before any edits.", "Plan mode"],
  ["You want a research-heavy subtask handled in its own isolated context.", "Subagents"],
  ["You want Claude Code to label PRs in a GitHub Action without prompts.", "Headless mode (-p)"],
  ["You want repo coding standards available automatically in every session.", "CLAUDE.md"],
  ["You want to bootstrap project memory by analyzing the current codebase.", "/init"],
  ["You want your team's internal MCP tools available when anyone opens the repo.", "MCP config (.mcp.json)"]
];

function genClaudeCodeScenario(rng, count) {
  const { pick, buildOptions } = makeHelpers(rng);
  const features = CLAUDE_CODE.map((x) => x[0]);
  const defOf = Object.fromEntries(CLAUDE_CODE);
  const out = [];
  for (let i = 0; i < count; i++) {
    const [need, feat] = pick(CC_NEEDS);
    const wrongs = [];
    while (wrongs.length < 3) { const c = pick(features); if (c !== feat && !wrongs.includes(c)) wrongs.push(c); }
    const { options, correct } = buildOptions(feat, wrongs);
    out.push({
      domain: 3, difficulty: 2, cat: "claude-code-scenario", gen: true,
      scenario: need,
      question: "Which Claude Code capability fits this need best?",
      options, correct,
      explanation: `Use ${feat}. ${defOf[feat]}`
    });
  }
  return out;
}

// Generic forward+reverse matching over a [term, definition] table.
function genMatching(rng, table, domain, label, count) {
  const { pick, buildOptions } = makeHelpers(rng);
  const out = [];
  const ctxName = label === "claude-code" ? "Claude Code" : label === "mcp" ? "MCP" : "the Claude API";
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(rng() * table.length);
    const [term, def] = table[idx];
    const others = table.filter((_, j) => j !== idx);
    const forward = rng() < 0.5;
    if (forward) {
      const wrongs = [];
      while (wrongs.length < 3 && wrongs.length < others.length) {
        const cand = pick(others)[1];
        if (!wrongs.includes(cand)) wrongs.push(cand);
      }
      const { options, correct } = buildOptions(def, wrongs);
      out.push({
        domain, difficulty: 2, cat: label, gen: true,
        question: `In the context of ${ctxName}, what does "${term}" do?`,
        options, correct, explanation: `${term}: ${def}`
      });
    } else {
      const wrongs = [];
      while (wrongs.length < 3 && wrongs.length < others.length) {
        const cand = pick(others)[0];
        if (!wrongs.includes(cand)) wrongs.push(cand);
      }
      const { options, correct } = buildOptions(term, wrongs);
      out.push({
        domain, difficulty: 2, cat: label, gen: true,
        question: `Which ${ctxName} term is described by: "${def}"?`,
        options, correct, explanation: `${term}: ${def}`
      });
    }
  }
  return out;
}

function genStopReason(rng, count) {
  const { pick, buildOptions } = makeHelpers(rng);
  const out = [];
  const scen = {
    end_turn: "Claude produced a complete answer and the response contains only text blocks.",
    max_tokens: "The response was cut off mid-sentence and you had set a low token cap.",
    stop_sequence: "You configured stop_sequences and the model emitted one of them.",
    tool_use: "The response contains a tool_use block requesting that you run a function."
  };
  for (let i = 0; i < count; i++) {
    const [val, meaning] = pick(STOP_REASONS);
    const reverse = rng() < 0.5;
    const others = STOP_REASONS.filter((x) => x[0] !== val);
    if (reverse) {
      const { options, correct } = buildOptions(val, others.map((o) => o[0]));
      out.push({
        domain: 1, difficulty: 2, cat: "stop-reason", gen: true,
        scenario: scen[val],
        question: "What stop_reason should you expect on this response?",
        options, correct,
        explanation: `stop_reason = "${val}" — ${meaning} Drive agent loops off stop_reason, never by string-matching the text.`
      });
    } else {
      const { options, correct } = buildOptions(meaning, others.map((o) => o[1]));
      out.push({
        domain: 1, difficulty: 2, cat: "stop-reason", gen: true,
        question: `What does stop_reason "${val}" mean?`,
        options, correct, explanation: `${val}: ${meaning}`
      });
    }
  }
  return out;
}

function genPromptTechnique(rng) {
  const { pick, buildOptions } = makeHelpers(rng);
  const out = [];
  // One question per authored (technique, scenario) pair → full coverage.
  PROMPT_TECH.forEach(([tech, desc, scenarios], idx) => {
    const others = PROMPT_TECH.filter((_, j) => j !== idx);
    for (const scenario of scenarios) {
      const wrongs = [];
      while (wrongs.length < 3) { const c = pick(others)[0]; if (!wrongs.includes(c)) wrongs.push(c); }
      const { options, correct } = buildOptions(tech, wrongs);
      out.push({
        domain: 4, difficulty: 2, cat: "prompt-technique", gen: true,
        scenario,
        question: "Which prompt-engineering technique is being applied?",
        options, correct,
        explanation: `This is "${tech}". ${desc}`
      });
    }
  });
  return out;
}

// ---------------------------------------------------------------------------
// SCENARIO families — architecture-decision style, matching the real exam.
// Each table entry is [scenario, correctAnswer, explanation]; distractors are
// drawn from a fixed answer pool. Yield is capped at the number of distinct
// scenarios authored (deduped), so these are curated-quality, not padding.
// ---------------------------------------------------------------------------
const ORCHESTRATION_POOL = ["A single agent in one context", "A sequential pipeline of subagents", "Parallel fan-out of independent subagents", "A hub-and-spoke coordinator that routes dynamically"];
const ORCHESTRATION = [
  ["The task is simple, self-contained, and finishes in one or two tool calls.", "A single agent in one context", "Match architecture to complexity — a single agent avoids needless coordination cost and failure modes."],
  ["Each step strictly depends on the previous step's output (extract → transform → load).", "A sequential pipeline of subagents", "Hard data dependencies call for an ordered pipeline; parallelism can't help when each step needs the last."],
  ["You must summarize 8 unrelated documents that don't depend on one another.", "Parallel fan-out of independent subagents", "Independent subtasks are the case where fan-out trades token cost for real latency wins."],
  ["Queries vary widely; some are trivial and some need several specialist tools.", "A hub-and-spoke coordinator that routes dynamically", "A coordinator that assesses each query and routes to only the needed specialists handles mixed workloads efficiently."],
  ["A research task needs web search, code analysis, and writing — each best handled by a focused specialist, with results combined at the end.", "A hub-and-spoke coordinator that routes dynamically", "A coordinator delegates to specialists and synthesizes — the canonical hub-and-spoke use case."],
  ["Three scrapers must each fetch a different site, then one writer combines them.", "Parallel fan-out of independent subagents", "The fetches are independent, so fan out in parallel and merge; only the final merge is sequential."],
  ["A single clear question like 'what is our refund window?' answerable from one document.", "A single agent in one context", "Don't orchestrate trivial questions — one agent answering directly is correct."],
  ["Stage 2 needs Stage 1's parsed entities, and Stage 3 needs Stage 2's classifications.", "A sequential pipeline of subagents", "A chain of dependent stages is a sequential pipeline."],
  ["You must compare 10 vendors against the same rubric, independently, then rank them.", "Parallel fan-out of independent subagents", "Each vendor evaluation is independent — fan out, then rank in a final step."],
  ["A FAQ bot answers one well-scoped question from a single knowledge source.", "A single agent in one context", "A single, well-scoped Q&A needs no orchestration."],
  ["A request may need billing, shipping, or technical specialists depending on its content.", "A hub-and-spoke coordinator that routes dynamically", "Content-dependent routing to specialists is the coordinator pattern."],
  ["Each translation must be reviewed by an editor whose feedback feeds a final reviser.", "A sequential pipeline of subagents", "Draft → edit → revise is an ordered dependency chain."],
  ["Five independent unit-test suites must run and their failures aggregated.", "Parallel fan-out of independent subagents", "Independent suites run in parallel; only aggregation is shared."],
  ["A quick arithmetic question the model can answer directly.", "A single agent in one context", "Trivial direct answers need a single agent, no tools or sub-agents."],
  ["Incoming tickets vary from password resets to deep API debugging.", "A hub-and-spoke coordinator that routes dynamically", "Mixed difficulty workloads benefit from a router that sends each ticket to the right handler."],
  ["A legal brief must be drafted, then fact-checked against sources, then formatted.", "A sequential pipeline of subagents", "Draft → fact-check → format is a dependent pipeline."],
  ["Sentiment must be scored for 1,000 reviews with no inter-dependency.", "Parallel fan-out of independent subagents", "Per-review scoring is embarrassingly parallel."]
];

// Domain 1 — Anthropic's named orchestration patterns ("Building effective
// agents"). The exam tests these by name, so use the exact vocabulary.
const ORCH_PATTERN_POOL = ["Prompt chaining", "Routing", "Parallelization", "Orchestrator-workers", "Evaluator-optimizer"];
const ORCH_PATTERN = [
  ["A task splits into a fixed, known sequence where each step's output feeds the next: outline → draft → polish.", "Prompt chaining", "Prompt chaining runs a fixed ordered sequence of calls, each building on the last — use when the steps are known in advance."],
  ["A translation is drafted, then improved over a few rounds against a quality rubric until it passes.", "Evaluator-optimizer", "Evaluator-optimizer loops a generator against an evaluator until criteria are met — use when you have clear eval criteria and iteration helps."],
  ["Incoming tickets are clearly billing, technical, or sales, each needing different handling.", "Routing", "Routing classifies the input and dispatches it to a specialized path — use for distinct, separable input categories."],
  ["The same sentiment analysis must run over 500 independent reviews and be aggregated.", "Parallelization", "Parallelization runs independent calls concurrently (sectioning/voting) and aggregates — use for independent subtasks."],
  ["An open-ended coding task must be decomposed at runtime into subtasks the system can't predict in advance, then delegated.", "Orchestrator-workers", "Orchestrator-workers: a central LLM dynamically decomposes the task and delegates to workers — use when subtasks aren't known up front."],
  ["A pipeline generates code, then a separate reviewer critiques it and sends it back for revision until tests pass.", "Evaluator-optimizer", "Generate → evaluate → revise loops are the evaluator-optimizer pattern."],
  ["A query is first classified as 'simple' or 'complex' and sent to a cheap or a strong model accordingly.", "Routing", "Sending inputs down different paths by classification is Routing."],
  ["A document is summarized, then the summary is translated, then the translation is formatted — fixed order.", "Prompt chaining", "A known, fixed sequence of dependent steps is Prompt chaining."],
  ["Ten independent sub-questions are answered at once and their answers combined into a report.", "Parallelization", "Independent calls run concurrently then aggregated = Parallelization."],
  ["A research task where the lead model decides on the fly which specialists to spawn and how many.", "Orchestrator-workers", "Runtime, dynamic decomposition and delegation = Orchestrator-workers."],
  ["A guardrail check runs in parallel with the main response so unsafe outputs are caught.", "Parallelization", "Running a check concurrently with generation is parallelization (sectioning)."],
  ["Each stage validates the previous stage's output before the next fixed stage runs.", "Prompt chaining", "Fixed sequential stages with gate checks between them is Prompt chaining."],
  ["Customer messages are sorted into refund / complaint / question and handled by tailored prompts.", "Routing", "Category-based dispatch is Routing."],
  ["A draft essay is scored by a critic LLM that returns specific fixes, repeated until the score clears a bar.", "Evaluator-optimizer", "Critic-in-the-loop refinement is the Evaluator-optimizer pattern."],
  ["The coordinator can't know in advance how many files need editing, so it decides and dispatches as it discovers them.", "Orchestrator-workers", "Unknown-until-runtime fan-out with a central coordinator = Orchestrator-workers."]
];

// Domain 1 — diagnose the agent-design flaw / what to add.
const AGENT_DESIGN_POOL = [
  "Use stop_reason for loop control, not text parsing",
  "Add a max-iteration budget with a progress check",
  "Checkpoint completed steps and resume on retry",
  "Pass complete structured findings between agents",
  "Enforce high-stakes limits in code, not the prompt",
  "Give each subagent isolated state and merge at the coordinator",
  "Route dynamically instead of always running every subagent",
  "Use a single agent — the task is too simple for multi-agent"
];
const AGENT_DESIGN = [
  ["The loop ends when the response text contains the word 'done'.", "Use stop_reason for loop control, not text parsing", "Drive loops off stop_reason (end_turn vs tool_use), never natural-language text."],
  ["The agent has called the same tool 15 times with tiny variations and won't stop.", "Add a max-iteration budget with a progress check", "Loops need an iteration cap and a progress check to break out or change strategy."],
  ["On any failure the agent restarts the whole 9-step task from scratch.", "Checkpoint completed steps and resume on retry", "Checkpoint progress so retries resume rather than redo costly completed work."],
  ["The writer agent hallucinates because it only got a one-line summary of research.", "Pass complete structured findings between agents", "Hand off the full structured findings downstream steps actually need."],
  ["A persuasive user talks the agent into a refund above its policy limit.", "Enforce high-stakes limits in code, not the prompt", "High-stakes limits must be enforced deterministically in code/tools, not by prompt compliance."],
  ["Two subagents overwrite each other on a shared scratchpad.", "Give each subagent isolated state and merge at the coordinator", "Avoid shared mutable state; isolate outputs and merge centrally."],
  ["A coordinator runs all five specialists even for a trivial query.", "Route dynamically instead of always running every subagent", "Coordinators should select only the specialists a query needs."],
  ["A team built a 4-agent system for a one-step lookup.", "Use a single agent — the task is too simple for multi-agent", "Don't over-orchestrate; match architecture to task complexity."],
  ["The agent treats a 429 as a permanent failure and aborts the whole run.", "Add a max-iteration budget with a progress check", "Transient errors need retry/backoff within a bounded loop, not an abort — but bounded so it can't spin forever."],
  ["The orchestrator forwards only 'see notes' to the next agent, losing the actual data.", "Pass complete structured findings between agents", "Context handoffs must carry the real structured data, not a pointer the next agent can't resolve."]
];

const ESCALATION_POOL = ["Handle it autonomously", "Escalate to a human", "Ask the user a clarifying question first", "Refuse and log the request for review"];
const ESCALATION = [
  ["A support agent is asked to process a routine password-reset it has a tool for.", "Handle it autonomously", "Within its tools and policy and low-stakes — the agent should just do it."],
  ["The agent is asked to approve a $50,000 contract exception outside any policy it was given.", "Escalate to a human", "High-stakes actions beyond defined policy must escalate to a human."],
  ["The user's request is ambiguous — 'cancel it' but there are three active orders.", "Ask the user a clarifying question first", "When intent is ambiguous, clarify before acting to avoid the wrong irreversible action."],
  ["A user asks the agent to email all customers' private data to an external address.", "Refuse and log the request for review", "Clear policy/safety violations should be refused and logged, not performed or escalated as routine."],
  ["The agent's confidence in its diagnosis is low and the action is irreversible.", "Escalate to a human", "Low confidence + irreversible impact is the textbook escalation trigger."],
  ["A within-limits refund the agent is explicitly authorized to issue.", "Handle it autonomously", "Authorized, in-policy, reversible — handle it without bothering a human."],
  ["The request could mean two very different things and the cost of guessing wrong is high.", "Ask the user a clarifying question first", "Disambiguate first when a wrong guess is costly."],
  ["A request to bypass authentication 'just this once'.", "Refuse and log the request for review", "Security-bypass requests are refused and logged regardless of phrasing."],
  ["A user asks to update their shipping address on an unshipped order; the agent has the tool.", "Handle it autonomously", "Low-stakes, in-policy, reversible — just do it."],
  ["A medical-advice question beyond the agent's scope and safety policy.", "Escalate to a human", "Out-of-scope, high-risk domains escalate to a qualified human."],
  ["The user says 'upgrade my plan' but there are two eligible plans.", "Ask the user a clarifying question first", "Pick-one ambiguity should be clarified before charging."],
  ["A request to generate content that violates the usage policy.", "Refuse and log the request for review", "Policy-violating content is refused and logged."],
  ["A routine FAQ lookup fully covered by the knowledge base.", "Handle it autonomously", "Covered, low-stakes questions are answered directly."],
  ["A bulk-delete of production records requested via chat.", "Escalate to a human", "Mass-destructive, irreversible operations require human authorization."],
  ["'Refund me' but the account has three eligible transactions.", "Ask the user a clarifying question first", "Disambiguate which transaction before issuing a refund."],
  ["Repeated attempts to extract another customer's personal data.", "Refuse and log the request for review", "Privacy-violating data access is refused and logged."],
  ["A within-SLA status update the agent can fetch with a tool.", "Handle it autonomously", "In-scope status fetches need no escalation."],
  ["A novel exception with legal implications and no matching policy.", "Escalate to a human", "Unprecedented, legally-sensitive cases go to a human."]
];

const MCP_PRIMITIVE_POOL = ["Tools", "Resources", "Prompts", "Roots"];
const MCP_PRIMITIVE = [
  ["The model needs to invoke an action that creates a Jira ticket.", "Tools", "Model-invoked actions are Tools."],
  ["The host should supply read-only product docs as background context.", "Resources", "Application-controlled context data is a Resource."],
  ["You want a reusable, user-triggered '/incident-review' template the server offers.", "Prompts", "User-controlled reusable templates are Prompts."],
  ["The client must tell the server which project directories are in scope.", "Roots", "Scoping the server to specific directories/URIs is done via Roots."],
  ["Claude should be able to call a function that runs a database query.", "Tools", "Invokable functions are Tools."],
  ["A read-only file the app exposes for the model to reference.", "Resources", "Exposed reference data the app controls is a Resource."],
  ["A canned, parameterized prompt the user picks from a menu.", "Prompts", "Menu-selectable parameterized prompts are the Prompts primitive."],
  ["The model must be able to trigger a deployment.", "Tools", "An action the model performs is a Tool."],
  ["Expose the current sprint's backlog as readable context for the host.", "Resources", "Host-readable context data is a Resource."],
  ["A '/code-review' template users invoke with a file argument.", "Prompts", "User-invoked argumented templates are Prompts."],
  ["Constrain the server to only the /workspace/project directory.", "Roots", "Directory scoping is configured via Roots."],
  ["The model needs to update a CRM record.", "Tools", "Record mutations are Tools."],
  ["Provide the org's style guide for the model to consult.", "Resources", "Reference material the app supplies is a Resource."],
  ["Limit the file server to two specific repo paths the client declares.", "Roots", "Client-declared in-scope paths are Roots."],
  ["The model should be able to run a SQL query against analytics.", "Tools", "Executable queries are Tools."],
  ["Surface the latest incident runbook as readable context.", "Resources", "App-supplied reference docs are Resources."],
  ["Offer a '/summarize-thread' template users pick and fill in.", "Prompts", "Fill-in user templates are Prompts."],
  ["Restrict the server's file access to the /docs folder only.", "Roots", "Folder scoping uses Roots."],
  ["Let the model create a calendar event.", "Tools", "Creating an event is a Tool action."],
  ["Expose the product catalog JSON for the host to read.", "Resources", "Readable host data is a Resource."]
];

// Domain 2 — MCP / tool architecture decisions.
const MCP_ARCH_POOL = [
  "Use the stdio transport (local subprocess)",
  "Use the streamable HTTP transport (remote server)",
  "Define a precise input_schema with required fields",
  "Negotiate capabilities during initialization",
  "Split the overloaded tool into focused tools",
  "Return a focused result instead of a raw dump",
  "Make the tool idempotent with a key"
];
const MCP_ARCH = [
  ["You ship a Python MCP server that runs locally alongside the client.", "Use the stdio transport (local subprocess)", "Local servers use stdio (JSON-RPC over stdin/stdout)."],
  ["Your MCP server is hosted and reached over the network by many clients.", "Use the streamable HTTP transport (remote server)", "Remote/hosted servers use streamable HTTP."],
  ["Claude keeps omitting a parameter your backend needs.", "Define a precise input_schema with required fields", "Required fields and clear descriptions in the schema make calls reliable."],
  ["A client connects and must learn which features the server supports.", "Negotiate capabilities during initialization", "The init handshake negotiates client/server capabilities."],
  ["One mega-tool with a free-text action is picked incorrectly.", "Split the overloaded tool into focused tools", "Focused tools with clear schemas beat one catch-all."],
  ["A tool returns 25k tokens of raw JSON each call and degrades the agent.", "Return a focused result instead of a raw dump", "Shape tool output to what's needed to protect context."],
  ["A booking tool double-books when the agent retries.", "Make the tool idempotent with a key", "Idempotency keys make side-effecting tools retry-safe."]
];

const TOOL_FIX_POOL = ["Split the overloaded tool into focused, well-described tools", "Return only the fields needed (or paginate) instead of a huge dump", "Add the required fields to the tool's input_schema", "Make the tool return truthful success/error results", "Accept an idempotency key so retries act once", "Write a clear description of when to use the tool"];
const TOOL_FIX = [
  ["One catch-all tool with a free-text action and 20 optional params is chosen incorrectly.", "Split the overloaded tool into focused, well-described tools", "Overloaded tools defeat selection; split into focused tools."],
  ["A tool dumps 30k tokens of raw JSON each call and the agent degrades.", "Return only the fields needed (or paginate) instead of a huge dump", "Shape tool output to what's needed to protect the context window."],
  ["Claude keeps omitting a field the backend requires.", "Add the required fields to the tool's input_schema", "Mark required fields in the schema so the model fills them."],
  ["A 'send_email' tool reports success even on invalid addresses.", "Make the tool return truthful success/error results", "Tools must report real outcomes so the agent's world model is correct."],
  ["A payment tool double-charges when the agent retries after a timeout.", "Accept an idempotency key so retries act once", "Idempotency keys make side-effecting tools safe to retry."],
  ["Two similar tools exist and the model can't tell which to use.", "Write a clear description of when to use the tool", "Disambiguating descriptions guide correct selection."],
  ["A 'search' tool returns 500 results in one blob and the agent loses the thread.", "Return only the fields needed (or paginate) instead of a huge dump", "Paginate or trim large result sets."],
  ["An 'update_user' tool ignores a missing required email and corrupts records.", "Add the required fields to the tool's input_schema", "Schema-enforced required fields prevent malformed calls."],
  ["A 'delete' tool reports success even when nothing was deleted.", "Make the tool return truthful success/error results", "Truthful results keep the agent's world model correct."],
  ["A 'charge_card' tool is retried on timeout and double-charges.", "Accept an idempotency key so retries act once", "Idempotency keys dedupe retried mutations."],
  ["You have 30 near-duplicate CRUD tools and selection accuracy is poor.", "Split the overloaded tool into focused, well-described tools", "Consolidate and clearly differentiate; fewer, sharper tools select better."],
  ["A tool's name is 'do_thing' with no description.", "Write a clear description of when to use the tool", "Names and descriptions are part of the prompt; make them precise."],
  ["A weather tool returns the entire raw API envelope including headers.", "Return only the fields needed (or paginate) instead of a huge dump", "Return just the relevant fields."],
  ["Claude calls a tool without the 'amount' the backend requires.", "Add the required fields to the tool's input_schema", "Mark amount required in the schema."]
];

const STRUCT_FIX_POOL = ["Prefill the assistant turn to force the format", "Provide few-shot examples of the exact format", "Specify the exact schema and require output-only", "Validate against the schema and retry with the error", "Wrap inputs in XML tags to separate them", "Enumerate allowed values and validate against them"];
const STRUCT_FIX = [
  ["Responses sometimes include a friendly sentence before the JSON, breaking the parser.", "Prefill the assistant turn to force the format", "Prefilling with '{' removes preamble and forces JSON."],
  ["Label formats vary run to run.", "Provide few-shot examples of the exact format", "Few-shot examples lock in the output pattern."],
  ["You need strict JSON conforming to a known schema.", "Specify the exact schema and require output-only", "State the schema and require JSON-only output."],
  ["In production a field is occasionally missing or mistyped.", "Validate against the schema and retry with the error", "Schema-validate then re-prompt with the specific error."],
  ["The model confuses the instructions with the source document.", "Wrap inputs in XML tags to separate them", "XML tags delimit source vs instructions."],
  ["The model occasionally returns a category outside the allowed set.", "Enumerate allowed values and validate against them", "Constrain the output space and validate against it."],
  ["JSON output sometimes has a trailing markdown ``` fence that breaks parsing.", "Prefill the assistant turn to force the format", "Prefill the opening token to suppress fences/preamble."],
  ["You need consistent date formatting (YYYY-MM-DD) but get mixed formats.", "Provide few-shot examples of the exact format", "Examples lock in the exact format."],
  ["You want a strict object with five named keys, no extras.", "Specify the exact schema and require output-only", "Define the schema and forbid extra prose/keys."],
  ["A nightly job occasionally crashes on a malformed field from the model.", "Validate against the schema and retry with the error", "Validate-then-retry-with-error is the production-grade loop."],
  ["The model mixes the user's instructions into the extracted data.", "Wrap inputs in XML tags to separate them", "Tagging separates source data from instructions."],
  ["Status must be exactly one of OPEN/CLOSED/PENDING but the model invents 'IN_PROGRESS'.", "Enumerate allowed values and validate against them", "Enumerate the allowed set and validate."],
  ["Responses begin with 'Sure! Here is your JSON:' and break the parser.", "Prefill the assistant turn to force the format", "Prefilling removes conversational preamble."]
];

// Domain 4 — prompt anti-pattern: what's the best improvement?
const PROMPT_AP_POOL = [
  "Wrap inputs in XML tags to separate sections",
  "Add few-shot examples of the exact output",
  "Ask it to reason step by step first",
  "Assign an expert role in the system prompt",
  "Decompose into numbered ordered steps",
  "Add a grounding guardrail for missing info",
  "Enumerate allowed values and validate",
  "Specify the exact output schema"
];
const PROMPT_AP = [
  ["The model confuses a long contract with the question asked about it.", "Wrap inputs in XML tags to separate sections", "XML tags delimit source vs instruction reliably."],
  ["Output format drifts between runs of a classifier.", "Add few-shot examples of the exact output", "Examples stabilize formatting."],
  ["A hard logic puzzle is answered too fast and often wrong.", "Ask it to reason step by step first", "Chain-of-thought improves complex reasoning accuracy."],
  ["Responses lack the rigor of a domain expert.", "Assign an expert role in the system prompt", "A role prompt shapes expertise and tone."],
  ["A dense one-paragraph instruction causes the last requirement to be skipped.", "Decompose into numbered ordered steps", "Numbered steps make each requirement explicit."],
  ["A summarizer invents facts not in the document.", "Add a grounding guardrail for missing info", "Forbid outside facts and require 'not found' when absent."],
  ["The model returns labels outside the permitted set.", "Enumerate allowed values and validate", "Constrain and validate the output space."],
  ["Downstream code needs a precise JSON shape but gets varied output.", "Specify the exact output schema", "State the schema explicitly and require it."],
  ["A translation task needs consistent tone defined up front.", "Assign an expert role in the system prompt", "Set persona/rules in the system prompt."],
  ["A multi-stage extraction skips stages when asked all at once.", "Decompose into numbered ordered steps", "Order the stages explicitly."],
  ["The model mixes example data into the real answer.", "Wrap inputs in XML tags to separate sections", "Tag examples vs the live task."],
  ["A code-review prompt gives shallow feedback.", "Assign an expert role in the system prompt", "A senior-reviewer persona raises rigor."],
  ["Extraction confuses the question with the passage.", "Wrap inputs in XML tags to separate sections", "Delimit passage and question with tags."],
  ["A reasoning task is wrong when answered immediately.", "Ask it to reason step by step first", "Let it reason before answering."],
  ["The output omits a required disclaimer sometimes.", "Decompose into numbered ordered steps", "List the disclaimer as an explicit step."],
  ["A Q&A bot answers from general knowledge instead of the provided docs.", "Add a grounding guardrail for missing info", "Require answers grounded only in provided context."]
];

const RELIABILITY_POOL = ["Add an idempotency key to retries", "Prompt-cache the stable prefix", "Compact/summarize older context", "Calibrate confidence and escalate below a threshold", "Exponential backoff with jitter on 429s", "Reserve output tokens in the budget", "Use the Message Batches API"];
const RELIABILITY = [
  ["A retried request causes a duplicate side effect.", "Add an idempotency key to retries", "Idempotency keys dedupe retried mutations."],
  ["You resend the same 80k-token document prefix on thousands of calls.", "Prompt-cache the stable prefix", "Cache the large stable prefix to cut cost and latency."],
  ["A long session's context approaches the window limit and quality drops.", "Compact/summarize older context", "Compaction preserves key state while freeing the window."],
  ["The agent acts even when it is clearly unsure on an irreversible step.", "Calibrate confidence and escalate below a threshold", "Set a confidence threshold below which it escalates."],
  ["Bursty load triggers frequent 429s and your fixed 1s retry worsens it.", "Exponential backoff with jitter on 429s", "Backoff with jitter avoids synchronized retry storms."],
  ["Generation gets cut off because the prompt left no room for the answer.", "Reserve output tokens in the budget", "Always budget output tokens within the window."],
  ["You must process 200k independent requests overnight, not in real time.", "Use the Message Batches API", "Large async jobs belong on the Batches API, not the sync endpoint."],
  ["A webhook may deliver the same event twice and your handler acts twice.", "Add an idempotency key to retries", "Dedupe by idempotency key so repeated events act once."],
  ["The same 60k-token policy is prepended to every call in a busy endpoint.", "Prompt-cache the stable prefix", "Cache the large stable prefix for cost/latency wins."],
  ["A multi-hour agent run keeps accreting turns until quality falls.", "Compact/summarize older context", "Compaction frees the window while preserving state."],
  ["The agent proceeds on a 40%-confidence irreversible action.", "Calibrate confidence and escalate below a threshold", "Escalate below a confidence threshold."],
  ["Spiky traffic causes repeated 429s and your tight retry loop amplifies them.", "Exponential backoff with jitter on 429s", "Backoff with jitter prevents retry storms."],
  ["Long prompts leave too little room and answers get truncated.", "Reserve output tokens in the budget", "Always budget output tokens within the window."],
  ["A reporting job needs 1M completions by morning, cost-sensitive.", "Use the Message Batches API", "Bulk, non-real-time work suits the Batches API."],
  ["A flaky network occasionally double-submits an order via retry.", "Add an idempotency key to retries", "Idempotency keys make submissions safe to retry."],
  ["A 100k-token system prompt is identical on every request to a chat endpoint.", "Prompt-cache the stable prefix", "Cache the identical large prefix."],
  ["An agent's window fills and it loses track of the original goal.", "Compact/summarize older context", "Summarize to retain the goal and key state."],
  ["The model takes irreversible action despite being only 30% sure.", "Calibrate confidence and escalate below a threshold", "Escalate low-confidence irreversible actions."],
  ["A burst of 503s and your no-delay retry hammers the API.", "Exponential backoff with jitter on 429s", "Back off with jitter on transient errors."],
  ["You queued 750k summaries to run by tomorrow morning.", "Use the Message Batches API", "Bulk async work belongs on Batches."]
];

// Domain 5 — context-management decisions.
const CONTEXT_MGMT_POOL = [
  "Compact/summarize older turns",
  "Prompt-cache the stable prefix",
  "Reserve output tokens in the budget",
  "Write a structured handoff summary",
  "Retrieve fewer, higher-relevance chunks",
  "Trim or paginate large tool results",
  "Use the Message Batches API for bulk"
];
const CONTEXT_MGMT = [
  ["A session must continue tomorrow in a fresh context without losing decisions.", "Write a structured handoff summary", "Seed the next session with a compact decisions/state summary."],
  ["RAG quality drops when you stuff 50 loosely-related chunks in.", "Retrieve fewer, higher-relevance chunks", "Curate for relevance; more context isn't always better."],
  ["Tool results pile up and crowd out room for reasoning.", "Trim or paginate large tool results", "Keep tool results lean so the window stays healthy."],
  ["A constant instruction block is re-sent on thousands of calls.", "Prompt-cache the stable prefix", "Cache the stable prefix to save tokens and latency."],
  ["The conversation is long and the model starts forgetting earlier state.", "Compact/summarize older turns", "Summarize older turns to preserve key state within the window."],
  ["Answers get cut off because the prompt consumed nearly the whole window.", "Reserve output tokens in the budget", "Leave headroom for the output."],
  ["You need 500k classifications by tomorrow, not interactively.", "Use the Message Batches API for bulk", "Bulk non-interactive work belongs on Batches."]
];

// Domain 5 — evals / measuring reliability.
const EVALS_POOL = [
  "Build an eval set of graded test cases",
  "A/B compare the change against the current version on the eval set",
  "Add regression tests for known failure cases",
  "Use an LLM-as-judge rubric to score outputs",
  "Log and sample production outputs for review",
  "Define a clear pass/fail metric before changing the prompt"
];
const EVALS = [
  ["You want to know whether a prompt tweak actually improved quality.", "A/B compare the change against the current version on the eval set", "Compare old vs new on a fixed eval set, not by vibe."],
  ["A specific bad output keeps recurring after each 'fix'.", "Add regression tests for known failure cases", "Capture known failures as regression tests so they can't silently return."],
  ["You're about to tune a classification prompt but have no way to judge it.", "Build an eval set of graded test cases", "Create a graded eval set first; you can't improve what you don't measure."],
  ["You need to score thousands of open-ended answers consistently.", "Use an LLM-as-judge rubric to score outputs", "An LLM-as-judge with a clear rubric scales subjective grading."],
  ["Quality seems to drift in production but you have no visibility.", "Log and sample production outputs for review", "Log and sample real outputs to catch drift."],
  ["The team argues about whether the new prompt is 'better'.", "Define a clear pass/fail metric before changing the prompt", "Agree on the metric up front so results are objective."],
  ["A model upgrade might regress some edge cases.", "Add regression tests for known failure cases", "Guard known edge cases with regression tests across model versions."],
  ["You changed the system prompt and want evidence it helped.", "A/B compare the change against the current version on the eval set", "Evidence comes from a controlled comparison on the eval set."]
];

// Domain 3 — Claude Code configuration approach.
const CC_CONFIG_POOL = [
  "Root CLAUDE.md plus a nested CLAUDE.md per package",
  "Permission deny rules in settings.json",
  "A PreToolUse hook that can block the call",
  "A PostToolUse hook that runs after edits",
  "Headless mode (-p) for CI",
  "Plan mode for a read-only proposal",
  "A custom slash command",
  "A shared project .mcp.json"
];
const CC_CONFIG = [
  ["A monorepo has shared rules and a backend folder with stricter ones.", "Root CLAUDE.md plus a nested CLAUDE.md per package", "CLAUDE.md is hierarchical: root + nested overrides."],
  ["An automated run must never delete files or push to main.", "Permission deny rules in settings.json", "Deny rules deterministically block destructive tools."],
  ["Reject any edit that would commit a secret, before the write happens.", "A PreToolUse hook that can block the call", "PreToolUse hooks gate tool calls before they run."],
  ["Auto-run Prettier on every file the agent edits.", "A PostToolUse hook that runs after edits", "PostToolUse hooks run after a tool completes."],
  ["Triage new issues nightly with no human present.", "Headless mode (-p) for CI", "Headless mode makes Claude Code scriptable for CI."],
  ["Have Claude lay out changes to a fragile module before editing anything.", "Plan mode for a read-only proposal", "Plan mode proposes with zero edits until approved."],
  ["Package a repeatable 'prepare-release' workflow for the whole team.", "A custom slash command", "Slash commands store reusable prompts in .claude/commands/."],
  ["Make the team's GitHub MCP server available to everyone who opens the repo.", "A shared project .mcp.json", "Project .mcp.json shares MCP servers with the team."],
  ["Conventions must load into context automatically every session.", "Root CLAUDE.md plus a nested CLAUDE.md per package", "CLAUDE.md is auto-loaded project memory."],
  ["Block edits to a protected /secrets directory entirely.", "Permission deny rules in settings.json", "Deny rules block tool calls by path."]
];

// Emits exactly one question per authored table row (deterministic), so every
// scenario we write reliably appears. Distractors are drawn from the answer pool.
function genScenarioPool(rng, table, pool, { domain, question, cat, difficulty = 3 }) {
  const { pick, buildOptions } = makeHelpers(rng);
  const out = [];
  for (const [scenario, correct, expl] of table) {
    const wrongs = [];
    let guard = 0;
    while (wrongs.length < 3 && guard++ < 50) { const c = pick(pool); if (c !== correct && !wrongs.includes(c)) wrongs.push(c); }
    const { options, correct: ci } = buildOptions(correct, wrongs);
    out.push({ domain, difficulty, cat, gen: true, scenario, question, options, correct: ci, explanation: expl });
  }
  return out;
}

// Map each generator category to an exam-style tag so the mock exam can
// prefer scenario/recall questions (the real exam's shape) over computation.
const STYLE_BY_CAT = {
  "context-budget": "computational", "cost": "computational", "prompt-caching": "computational",
  "throughput": "computational", "retry-backoff": "computational", "agent-fanout": "computational",
  "tool-context-growth": "computational", "fewshot-overhead": "computational",
  "api-param": "recall", "mcp": "recall", "claude-code": "recall", "stop-reason": "recall",
  "model-selection": "scenario", "prompt-technique": "scenario", "claude-code-scenario": "scenario",
  "orchestration": "scenario", "escalation": "scenario", "mcp-primitive": "scenario",
  "tool-fix": "scenario", "struct-output": "scenario", "reliability-practice": "scenario",
  "agent-design": "scenario", "mcp-arch": "scenario", "prompt-antipattern": "scenario",
  "context-mgmt": "scenario", "cc-config": "scenario", "evals": "scenario",
  "orch-pattern": "scenario"
};

// ============================================================================
// PUBLIC: build the full generated set
// ============================================================================
export function generateQuestions(seed = 1337) {
  // Computational drill families (trimmed) — kept for the question bank and
  // targeted practice, but de-emphasized in the mock exam via the style tag.
  const computed = [
    [genModelRecommendation, 300],
    [genContextBudget, 1500],
    [genCost, 1500],
    [genCaching, 900],
    [genThroughput, 800],
    [genBackoff, 60],
    [genAgentFanout, 2200],
    [genToolGrowth, 1800],
    [genFewShot, 1700],
    [genStopReason, 16],
    [genPromptTechnique, 400],
    [genClaudeCodeScenario, 500],
  ];
  let all = [];
  let s = seed;
  for (const [fn, n] of computed) {
    all = all.concat(fn(mulberry32(s), n));
    s += 9999;
  }
  // recall (matching) families
  all = all.concat(genMatching(mulberry32(s + 1), API_PARAMS, 4, "api-param", 200));
  all = all.concat(genMatching(mulberry32(s + 2), MCP, 2, "mcp", 220));
  all = all.concat(genMatching(mulberry32(s + 3), CLAUDE_CODE, 3, "claude-code", 240));

  // NEW scenario families (architecture-decision style — the real exam's shape)
  all = all.concat(genScenarioPool(mulberry32(s + 11), ORCHESTRATION, ORCHESTRATION_POOL, { domain: 1, question: "What is the most appropriate orchestration choice?", cat: "orchestration", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 12), ESCALATION, ESCALATION_POOL, { domain: 1, question: "What should the agent do?", cat: "escalation", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 17), AGENT_DESIGN, AGENT_DESIGN_POOL, { domain: 1, question: "What is the core fix?", cat: "agent-design", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 23), ORCH_PATTERN, ORCH_PATTERN_POOL, { domain: 1, question: "Which orchestration pattern best fits?", cat: "orch-pattern", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 13), MCP_PRIMITIVE, MCP_PRIMITIVE_POOL, { domain: 2, question: "Which MCP primitive fits this need?", cat: "mcp-primitive", difficulty: 2 }));
  all = all.concat(genScenarioPool(mulberry32(s + 14), TOOL_FIX, TOOL_FIX_POOL, { domain: 2, question: "What is the best fix?", cat: "tool-fix", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 18), MCP_ARCH, MCP_ARCH_POOL, { domain: 2, question: "What is the right approach?", cat: "mcp-arch", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 19), CC_CONFIG, CC_CONFIG_POOL, { domain: 3, question: "Which configuration approach fits?", cat: "cc-config", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 15), STRUCT_FIX, STRUCT_FIX_POOL, { domain: 4, question: "What is the most reliable fix?", cat: "struct-output", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 20), PROMPT_AP, PROMPT_AP_POOL, { domain: 4, question: "What is the best improvement?", cat: "prompt-antipattern", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 16), RELIABILITY, RELIABILITY_POOL, { domain: 5, question: "Which reliability practice applies?", cat: "reliability-practice", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 21), CONTEXT_MGMT, CONTEXT_MGMT_POOL, { domain: 5, question: "What is the right context-management move?", cat: "context-mgmt", difficulty: 3 }));
  all = all.concat(genScenarioPool(mulberry32(s + 22), EVALS, EVALS_POOL, { domain: 5, question: "What is the right way to measure this?", cat: "evals", difficulty: 3 }));

  // de-dup by stem, assign stable ids + exam-style tag
  const seen = new Set();
  const result = [];
  let n = 0;
  for (const q of all) {
    const key = (q.scenario || "") + "||" + q.question + "||" + q.options[q.correct];
    if (seen.has(key)) continue;
    seen.add(key);
    q.id = "gen-" + (n++).toString(36);
    q.src = "generated";
    q.style = STYLE_BY_CAT[q.cat] || "scenario";
    result.push(q);
  }
  return result;
}
