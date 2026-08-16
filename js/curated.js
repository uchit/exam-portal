// Hand-authored, exam-realistic questions in the CCA-F scenario style:
// architectural decisions and "what's wrong with this approach", not trivia.
// These complement the extracted seed questions and the generated drill bank.
export const CURATED_QUESTIONS = [
  // ---- Domain 1: Agentic Architecture & Orchestration ----
  {
    domain: 1, difficulty: 3, cat: "curated",
    scenario: "A support agent confidently answers a billing dispute that actually requires access to a payment system it cannot reach.",
    question: "What is the core architectural failure?",
    options: [
      "The agent should be given direct write access to the payment system",
      "There is no escalation/handoff path defined for tasks outside the agent's tool boundary",
      "The agent needs more few-shot examples of billing disputes",
      "The agent should reason longer before answering instead of escalating"
    ],
    correct: 1,
    explanation: "Agents must know when to escalate to a human or another system. Define explicit boundaries and a handoff path for tasks the agent cannot complete with its available tools."
  },
  {
    domain: 1, difficulty: 4, cat: "curated",
    scenario: "Your multi-agent system runs five subagents sequentially, but three of them only read independent documents and never depend on each other's output.",
    question: "What is the best optimization?",
    options: [
      "Run all five subagents in parallel, including the two that depend on each other's output",
      "Run the three independent subagents in parallel and keep the dependent ones sequential",
      "Merge all five into one giant prompt to avoid orchestration overhead",
      "Cache each subagent's prompt so the sequential steps run faster"
    ],
    correct: 1,
    explanation: "Parallelize genuinely independent subtasks to cut latency; keep dependent steps sequential. Fan-out trades token cost for speed and only helps when work is independent."
  },
  {
    domain: 1, difficulty: 3, cat: "curated",
    scenario: "An orchestrator passes only a one-line summary of a research subagent's findings to the writing subagent, which then hallucinates specifics.",
    question: "What should change?",
    options: [
      "Pass the complete structured findings (with sources) the writer needs, not a lossy summary",
      "Lower the writer's temperature to 0",
      "Have the writer infer the missing specifics from its general knowledge of the topic",
      "Use a larger model for the writer only"
    ],
    correct: 0,
    explanation: "Context handoffs between agents must carry the structured information downstream steps actually need. Lossy summaries force the next agent to invent missing detail."
  },
  {
    domain: 1, difficulty: 4, cat: "curated",
    scenario: "A hub-and-spoke coordinator always invokes all subagents, even for a trivial query like 'what time is it'.",
    question: "What is the right design?",
    options: [
      "Have the coordinator run every subagent in parallel instead of sequentially",
      "Have the coordinator assess query complexity and route only to the subagents that are needed",
      "Route every query to a single general-purpose subagent instead of specialized ones",
      "Cache the full pipeline's output so repeated queries skip the subagents"
    ],
    correct: 1,
    explanation: "A coordinator should dynamically route based on the request, invoking only relevant spokes. Always running the full pipeline wastes tokens and latency."
  },
  {
    domain: 1, difficulty: 2, cat: "curated",
    scenario: "An agent loop decides it is done when the response text contains the word 'finished'.",
    question: "What is the reliable signal to use instead?",
    options: [
      "Check whether the response text ends with a period",
      "Check the stop_reason field (end_turn vs tool_use)",
      "Look for keywords like 'done' or 'finished' anywhere in the text",
      "Count the number of tool calls made so far"
    ],
    correct: 1,
    explanation: "Drive loop control off the structured stop_reason field, never by string-matching natural language, which is brittle and easily fooled."
  },

  // ---- Domain 2: Tool Design & MCP Integration ----
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "You expose 40 narrowly-overlapping tools; Claude frequently picks the wrong one.",
    question: "What is the most effective fix?",
    options: [
      "Add more tools to cover edge cases",
      "Consolidate overlapping tools and write clear, distinct descriptions and input_schemas",
      "Set tool_choice to 'any'",
      "Write more usage examples in each tool's description without reducing the tool count"
    ],
    correct: 1,
    explanation: "Tool overload causes selection errors. Fewer, well-bounded tools with precise descriptions and schemas reduce reasoning overload and improve correct selection."
  },
  {
    domain: 2, difficulty: 4, cat: "curated",
    scenario: "A tool returns a 30,000-token raw API dump on every call, and after a few calls the agent degrades.",
    question: "What is the best tool-design change?",
    options: [
      "Return only the fields the agent needs, or a summarized/paginated result",
      "Increase the context window",
      "Call the tool fewer times",
      "Switch to a bigger model"
    ],
    correct: 0,
    explanation: "Tools should return focused, relevant output. Dumping huge raw payloads bloats context and degrades reasoning; shape the tool result to what's needed."
  },
  {
    domain: 2, difficulty: 2, cat: "curated",
    scenario: "You are deciding how Claude Code should connect to a local MCP server you wrote in Python.",
    question: "Which transport is appropriate?",
    options: [
      "stdio (run it as a local subprocess)",
      "Streamable HTTP, since it works for both local and remote servers",
      "SSE, since it's simpler to set up than stdio",
      "WebSockets, since they support bidirectional streaming"
    ],
    correct: 0,
    explanation: "Local MCP servers typically use the stdio transport, exchanging JSON-RPC over stdin/stdout. Remote/hosted servers use streamable HTTP."
  },
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "Your MCP server wants to offer reusable, user-triggered prompt templates (e.g. '/summarize-incident').",
    question: "Which MCP primitive should it expose?",
    options: ["Tools", "Resources", "Prompts", "Roots"],
    correct: 2,
    explanation: "Prompts are the user-controlled, reusable template primitive. Tools are model-invoked actions; Resources are application-controlled data."
  },
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "A tool's input_schema marks every field optional, and Claude often omits a field the backend requires.",
    question: "What is the fix?",
    options: [
      "Mark required fields as required in the JSON Schema and describe them clearly",
      "Add a retry loop only",
      "Add a detailed explanation of the required field in the system prompt instead of the schema",
      "Set a default value for the field so it is never actually missing"
    ],
    correct: 0,
    explanation: "A precise input_schema with correct required fields and good descriptions is how you make tool calls reliable — the schema is part of the prompt."
  },

  // ---- Domain 3: Claude Code Configuration & Workflows ----
  {
    domain: 3, difficulty: 2, cat: "curated",
    scenario: "Every engineer keeps re-explaining the same build/test commands and code style to Claude Code.",
    question: "Where should this live so it loads automatically?",
    options: ["A pinned Slack message", "CLAUDE.md in the repo", "Each engineer's shell profile", "A comment in package.json"],
    correct: 1,
    explanation: "CLAUDE.md is project memory auto-loaded into context. Put conventions, commands and constraints there so they apply in every session."
  },
  {
    domain: 3, difficulty: 3, cat: "curated",
    scenario: "You want `npm test` and `git status` to run without prompting, but `rm` to always be blocked.",
    question: "What is the right mechanism?",
    options: [
      "Permission rules in settings.json (allow/deny)",
      "A long instruction in CLAUDE.md hoping the model complies",
      "A PreToolUse hook that logs risky commands but does not block them",
      "A PostToolUse hook"
    ],
    correct: 0,
    explanation: "Permission allow/deny rules in settings.json deterministically govern which tool calls auto-run or are blocked — far more reliable than asking the model nicely."
  },
  {
    domain: 3, difficulty: 3, cat: "curated",
    scenario: "Your team wants Claude Code to run a security secret-scan and reject the change if a secret is detected, before any file is written.",
    question: "Which feature enforces this?",
    options: ["A PreToolUse hook that can block the tool call", "A custom slash command", "A PostToolUse hook that reverts the write if a secret is found", "Plan mode"],
    correct: 0,
    explanation: "PreToolUse hooks run before a tool executes and can block or modify it — the right place for deterministic pre-write gates like secret scanning."
  },
  {
    domain: 3, difficulty: 2, cat: "curated",
    scenario: "Before letting Claude touch a fragile legacy module, you want it to lay out exactly what it will change and make no edits until you approve.",
    question: "What should you use?",
    options: ["Plan mode", "Headless mode", "Permission deny rules for the Edit and Write tools", "A subagent"],
    correct: 0,
    explanation: "Plan mode is read-only: Claude proposes a plan and makes no edits until you approve — ideal for high-risk changes."
  },
  {
    domain: 3, difficulty: 3, cat: "curated",
    scenario: "You want Claude Code to run inside a nightly CI job and write a summary to a file, with no human at the keyboard.",
    question: "Which mode fits?",
    options: ["Headless mode (claude -p ...)", "Plan mode", "Interactive REPL", "A PreToolUse hook"],
    correct: 0,
    explanation: "Headless mode (-p) runs Claude Code non-interactively, making it scriptable for CI/CD pipelines."
  },

  // ---- Domain 4: Prompt Engineering & Structured Output ----
  {
    domain: 4, difficulty: 3, cat: "curated",
    scenario: "Your service parses Claude's output as JSON, but ~5% of responses include a friendly sentence before the JSON and crash the parser.",
    question: "What is the most reliable fix?",
    options: [
      "Prefill the assistant turn with '{' and specify 'output only valid JSON'",
      "Lower temperature to 0 to reduce randomness in the output",
      "Add a strongly worded instruction such as 'You must only output JSON'",
      "Retry up to 50 times"
    ],
    correct: 0,
    explanation: "Prefilling the assistant response with '{' plus an explicit 'JSON only' instruction forces structured output and removes the preamble that breaks parsers."
  },
  {
    domain: 4, difficulty: 3, cat: "curated",
    scenario: "A classification prompt gives inconsistent label formats across runs.",
    question: "Which technique most improves format consistency?",
    options: [
      "Few-shot examples showing the exact label format",
      "Writing a longer, more detailed instruction describing the desired format",
      "Asking the model to double-check its own formatting before responding",
      "Increasing the temperature to encourage varied phrasing"
    ],
    correct: 0,
    explanation: "Few-shot examples demonstrate the precise output pattern, dramatically improving format consistency over an instruction alone."
  },
  {
    domain: 4, difficulty: 2, cat: "curated",
    scenario: "You feed Claude a long contract and a question, but it sometimes confuses the instructions with the contract text.",
    question: "What structuring technique helps most?",
    options: [
      "Wrap the contract in <document> tags and the ask in <question> tags",
      "Put the contract and the question in plain text with a blank line between them",
      "Repeat the question again at the very end of the contract text",
      "Summarize the contract before including it"
    ],
    correct: 0,
    explanation: "XML tags delimit distinct sections so the model reliably separates source material from instructions."
  },
  {
    domain: 4, difficulty: 4, cat: "curated",
    scenario: "A JSON output must conform to a strict schema, and occasionally a field is missing or mistyped in production.",
    question: "What is the robust production pattern?",
    options: [
      "Validate against the schema and, on failure, retry with the validation error fed back to the model",
      "Wrap the field in a try/catch and substitute a default value on failure",
      "Manually fix outputs after the fact",
      "Ask the model to double-check its own JSON before finalizing, without external validation"
    ],
    correct: 0,
    explanation: "A validation + retry loop (schema-validate, then re-prompt with the specific error) is the reliable way to enforce structured output at scale."
  },
  {
    domain: 4, difficulty: 3, cat: "curated",
    scenario: "On a hard multi-step math/logic task, Claude jumps straight to an answer and is often wrong.",
    question: "Which technique most improves accuracy?",
    options: [
      "Ask it to reason step by step before the final answer (chain-of-thought)",
      "Forbid any explanation",
      "Provide five few-shot examples of correctly-worked problems, but without showing their reasoning steps",
      "Ask the same question twice"
    ],
    correct: 0,
    explanation: "Chain-of-thought — letting the model reason step by step before committing to an answer — measurably improves accuracy on complex reasoning."
  },

  // ---- Domain 5: Context Management & Reliability ----
  {
    domain: 5, difficulty: 3, cat: "curated",
    scenario: "A long-running agent's context keeps growing until it nears the window limit and quality drops.",
    question: "What is the right reliability technique?",
    options: [
      "Compact/summarize older turns while preserving key state",
      "Always start over with /clear and lose all state",
      "Truncate the oldest turns and discard them entirely",
      "Keep sending the full history and rely on prompt caching to offset the cost"
    ],
    correct: 0,
    explanation: "Compaction summarizes earlier context while preserving essential state, keeping the agent within the window without losing the thread."
  },
  {
    domain: 5, difficulty: 4, cat: "curated",
    scenario: "You repeatedly send the same 80,000-token policy document as a prefix on thousands of requests.",
    question: "Which feature cuts cost and latency the most?",
    options: [
      "Prompt caching the stable prefix",
      "Shortening the document to reduce input tokens on every request",
      "Splitting the document across multiple requests to parallelize",
      "Switching to a smaller, faster model for these requests"
    ],
    correct: 0,
    explanation: "Prompt caching a large, stable prefix reused across many calls cuts both cost (reads at a fraction of base) and latency substantially."
  },
  {
    domain: 5, difficulty: 3, cat: "curated",
    scenario: "A network blip causes a request to fail, your code retries, and the user is charged/acted-on twice.",
    question: "What prevents the duplicate side effect?",
    options: [
      "An idempotency key on the mutation so retries are deduplicated",
      "Retrying only once instead of multiple times",
      "Never retrying",
      "Logging the error only"
    ],
    correct: 0,
    explanation: "Attach an idempotency key to retryable mutations so a retried request is recognized and not double-applied."
  },
  {
    domain: 5, difficulty: 4, cat: "curated",
    scenario: "Your agent must decide whether to act autonomously or escalate, but currently acts even when it is unsure.",
    question: "What reliability practice addresses this?",
    options: [
      "Confidence calibration with an escalation threshold to a human",
      "Always act to seem helpful",
      "Add more few-shot examples of confident responses",
      "Require the agent to double-check its answer once before acting"
    ],
    correct: 0,
    explanation: "Calibrate confidence and define a threshold below which the agent escalates to a human, rather than acting on low-confidence decisions."
  },
  {
    domain: 5, difficulty: 2, cat: "curated",
    scenario: "You want to know how many input and output tokens a request actually used for cost tracking.",
    question: "Where do you find this?",
    options: [
      "The usage field on the API response",
      "The stop_reason field",
      "The X-RateLimit-* response headers",
      "You must estimate it manually"
    ],
    correct: 0,
    explanation: "The response's usage field reports input_tokens and output_tokens — the source of truth for per-request cost accounting."
  },

  // ---- Domain 1: more architecture-decision scenarios ----
  {
    domain: 1, difficulty: 4, cat: "curated",
    scenario: "A customer-service agent confidently issues a $4,000 refund that exceeds the policy limit it was given, because the request was phrased very persuasively.",
    question: "What guardrail was missing?",
    options: [
      "A deterministic policy check (tool/code) that enforces the refund limit regardless of how the request is phrased",
      "A confirmation step where the agent restates the policy before acting",
      "A longer system prompt",
      "More few-shot examples of refunds"
    ],
    correct: 0,
    explanation: "High-stakes actions need deterministic enforcement in code/tools, not reliance on the model resisting persuasion. The model proposes; a hard check authorizes."
  },
  {
    domain: 1, difficulty: 3, cat: "curated",
    scenario: "Your agent retries a failed step by restarting the entire multi-step task from scratch, repeating expensive work that already succeeded.",
    question: "What is the better design?",
    options: [
      "Checkpoint completed steps and resume from the last good state",
      "Never retry",
      "Always restart — it is simpler",
      "Retry the failed step alone but re-validate every prior step's output too"
    ],
    correct: 0,
    explanation: "Durable agents checkpoint progress so a retry resumes from the last successful step rather than redoing completed, costly work."
  },
  {
    domain: 1, difficulty: 4, cat: "curated",
    scenario: "Two subagents both write to the same shared 'scratchpad' document concurrently and overwrite each other's results.",
    question: "What is the core issue?",
    options: [
      "Shared mutable state without clear ownership — give each subagent its own output and let the coordinator merge",
      "The subagents should take turns writing with a fixed delay between them",
      "The subagents need a shared lock file to coordinate write order",
      "The scratchpad file needs to be larger to fit both outputs"
    ],
    correct: 0,
    explanation: "Concurrent agents need clear data ownership. Have each produce its own structured output and let the coordinator merge, rather than racing on shared mutable state."
  },
  {
    domain: 1, difficulty: 3, cat: "curated",
    scenario: "An agent calls the same search tool 12 times in a loop with nearly identical queries and never converges.",
    question: "What should you add?",
    options: [
      "A loop/iteration budget and a check for progress so the agent stops or changes strategy",
      "A more detailed prompt telling it to try harder",
      "Automatic retries of the exact same query with no changes",
      "Higher temperature"
    ],
    correct: 0,
    explanation: "Agent loops need termination safeguards: a max-iteration budget and a progress check so the agent escalates or changes approach instead of spinning."
  },
  {
    domain: 1, difficulty: 3, cat: "curated",
    scenario: "A task is simple and self-contained, but the team built a 4-agent hub-and-spoke system for it.",
    question: "What is the right call?",
    options: [
      "Use a single agent — multi-agent orchestration adds cost and failure modes without benefit here",
      "Add a fifth agent for redundancy",
      "Keep it, since multi-agent systems are inherently more accurate than single agents",
      "Keep the four agents but reduce their max_tokens to cut cost"
    ],
    correct: 0,
    explanation: "Match architecture to task complexity. Multi-agent systems add latency, cost and coordination failure modes; a single agent is best when the task is simple."
  },

  // ---- Domain 2: more tool/MCP scenarios ----
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "Your 'send_email' tool silently succeeds even when the address is invalid, so Claude believes the email was sent.",
    question: "What tool-design principle is violated?",
    options: [
      "Tools must return clear, truthful success/error results so the model can react correctly",
      "Tools should only report errors for critical failures, not validation issues",
      "The model should assume success unless explicitly told otherwise",
      "Validation should happen only on the client side before the tool is called"
    ],
    correct: 0,
    explanation: "Tool results must accurately report outcomes, including errors. Silent false-success makes the agent act on a wrong world model."
  },
  {
    domain: 2, difficulty: 4, cat: "curated",
    scenario: "An MCP server exposes a single 'do_everything' tool with a free-text 'action' string and 20 optional params.",
    question: "Why is this a poor design?",
    options: [
      "It overloads one tool's reasoning; split it into focused tools with precise schemas",
      "The tool's JSON Schema exceeds MCP's maximum parameter count",
      "Free-text action strings are inherently invalid JSON",
      "MCP servers are limited to a single tool definition each"
    ],
    correct: 0,
    explanation: "Overloaded catch-all tools make selection and argument-filling unreliable. Prefer several focused tools with clear, typed input_schemas."
  },
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "You need to expose read-only company policy documents that the host app should supply as context, not actions the model invokes.",
    question: "Which MCP primitive fits?",
    options: ["Resources", "Tools", "Prompts", "Sampling"],
    correct: 0,
    explanation: "Resources are application-controlled data the host reads and supplies as context. Tools are model-invoked actions."
  },
  {
    domain: 2, difficulty: 3, cat: "curated",
    scenario: "A tool that charges a credit card is sometimes retried by your agent after a timeout, causing double charges.",
    question: "What makes the tool safe to retry?",
    options: [
      "Accept an idempotency key so repeated calls with the same key act once",
      "Make the tool faster",
      "Add a longer timeout so retries happen less often",
      "Charge only on the second attempt"
    ],
    correct: 0,
    explanation: "Side-effecting tools should be idempotent via an idempotency key so retries don't duplicate the effect."
  },

  // ---- Domain 3: more Claude Code workflow scenarios ----
  {
    domain: 3, difficulty: 3, cat: "curated",
    scenario: "A monorepo has shared conventions plus a backend folder with its own stricter rules.",
    question: "How should CLAUDE.md be structured?",
    options: [
      "A root CLAUDE.md for shared conventions plus a nested CLAUDE.md in the backend folder for its specifics",
      "One giant root CLAUDE.md with everything",
      "No CLAUDE.md; explain rules each session",
      "Put all rules in settings.json"
    ],
    correct: 0,
    explanation: "CLAUDE.md is hierarchical: a root file for shared conventions and nested files for directory-specific rules that layer on top."
  },
  {
    domain: 3, difficulty: 3, cat: "curated",
    scenario: "Your CI should run Claude Code to triage new issues, but it must never be able to push to main or delete files.",
    question: "What is the right setup?",
    options: [
      "Headless mode with deny permission rules blocking write/destructive tools",
      "Interactive mode with all permissions allowed",
      "Headless mode with only a CLAUDE.md instruction not to push or delete",
      "Disable Claude Code in CI"
    ],
    correct: 0,
    explanation: "Combine headless (-p) execution with deny rules so the automated run can read and comment but cannot perform destructive or write operations."
  },
  {
    domain: 3, difficulty: 2, cat: "curated",
    scenario: "After every edit, your team wants Prettier to run automatically so formatting is always consistent.",
    question: "Which mechanism fits?",
    options: [
      "A PostToolUse hook that runs the formatter after edits",
      "A custom slash command run manually",
      "CLAUDE.md asking the model to format",
      "A PreToolUse hook that runs the formatter before the edit is made"
    ],
    correct: 0,
    explanation: "PostToolUse hooks run automatically after a tool completes — the deterministic place to auto-format edited files."
  },

  // ---- Domain 4: more prompt-engineering scenarios ----
  {
    domain: 4, difficulty: 3, cat: "curated",
    scenario: "A summarization prompt sometimes invents statistics not present in the source document.",
    question: "Which instruction most reduces this?",
    options: [
      "Add a grounding guardrail: 'Only use facts from the <document>; if absent, say so' and cite the source",
      "Raise temperature",
      "Ask for a longer summary",
      "Ask the model to cross-reference its general knowledge for additional context"
    ],
    correct: 0,
    explanation: "Explicit grounding guardrails that forbid using outside facts and require citing the source materially reduce hallucinated detail."
  },
  {
    domain: 4, difficulty: 4, cat: "curated",
    scenario: "You need Claude to return one of exactly five category labels, but it occasionally invents a sixth.",
    question: "What is the most reliable enforcement?",
    options: [
      "Enumerate the allowed labels, instruct it to choose only from them, and validate the output against the set",
      "Hope it complies",
      "Give one example each of the five allowed labels in the prompt",
      "Ask the model to pick the best label without listing the options explicitly"
    ],
    correct: 0,
    explanation: "Constrain the output space explicitly (enumerated allowed values) and validate against it; reject/retry on out-of-set answers."
  },
  {
    domain: 4, difficulty: 3, cat: "curated",
    scenario: "A multi-part instruction buried in one dense paragraph causes Claude to skip the last requirement.",
    question: "What is the fix?",
    options: [
      "Break the instruction into a numbered list of explicit, ordered steps",
      "Move the last requirement to the very beginning of the paragraph",
      "Repeat the entire paragraph twice in the prompt",
      "Lower temperature"
    ],
    correct: 0,
    explanation: "Decompose dense instructions into a numbered list so each requirement is explicit and harder to skip."
  },

  // ---- Domain 5: more context/reliability scenarios ----
  {
    domain: 5, difficulty: 3, cat: "curated",
    scenario: "A long agent session must hand off to a fresh session tomorrow without losing what was decided.",
    question: "What is the right handoff pattern?",
    options: [
      "Write a compact structured summary of decisions/state and seed the new session with it",
      "Replay every raw message verbatim",
      "Start over with no context",
      "Keep the same session open indefinitely across days"
    ],
    correct: 0,
    explanation: "Handoffs use a compact structured summary of key decisions and state — preserving what matters without replaying the entire transcript."
  },
  {
    domain: 5, difficulty: 4, cat: "curated",
    scenario: "Under bursty load you get frequent 429s and your fixed 1-second retry makes them worse.",
    question: "What is the correct strategy?",
    options: [
      "Exponential backoff with jitter, honoring Retry-After",
      "Retry every 100ms until it works",
      "Never retry",
      "Retry immediately but only from a single client to avoid a thundering herd"
    ],
    correct: 0,
    explanation: "Use exponential backoff with jitter and honor Retry-After to avoid synchronized retry storms that worsen rate limiting."
  },
  {
    domain: 5, difficulty: 3, cat: "curated",
    scenario: "Your RAG answer quality drops when you stuff 50 retrieved chunks into the prompt 'just in case'.",
    question: "What is the better approach?",
    options: [
      "Retrieve fewer, higher-relevance chunks — more context is not always better",
      "Increase the chunk size so fewer, larger chunks are retrieved",
      "Rerank all 50 chunks but still include all of them in order",
      "Raise temperature"
    ],
    correct: 0,
    explanation: "Excess low-relevance context dilutes attention and can hurt quality. Curate for relevance rather than volume."
  }
];
