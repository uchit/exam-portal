// The 8 CCDV-F (Claude Certified Developer — Foundations) domains, mirroring
// js/blueprint-domains-ccar-p.js's shape. Weights/names sourced from the
// same CERTS registry entry (js/certs.js) — kept as a separate literal here
// so this file stays a flat, book-keepable list; update both if the
// official weights change. This is the hands-on implementation track: real
// API mechanics, code-level decisions, and debugging — closer to the code
// than CCA-F's architecture-decision focus.
export const DOMAINS_LIST_CCDV_F = [
  { id: 1, slug: "1-applications-integration", name: "Applications and Integration", short: "Apps & Integration", weight: 33.1, color: "#4C6FDE", blurb: "The largest domain by far: building real applications on the Claude API — request/response handling, streaming, auth, multi-turn state, file handling, and production integration patterns." },
  { id: 2, slug: "2-model-selection-optimisation", name: "Model Selection and Optimisation", short: "Model & Optimisation", weight: 16.8, color: "#E0A72A", blurb: "Choosing the right model tier for cost/latency/quality trade-offs, prompt caching, batching, and token-budget optimization at the implementation level." },
  { id: 3, slug: "3-agents-workflows", name: "Agents and Workflows", short: "Agents & Workflows", weight: 14.7, color: "#2FA8A0", blurb: "Implementing agentic loops in code: stop_reason handling, tool-use orchestration, multi-step workflows, and error handling in agent execution." },
  { id: 4, slug: "4-prompt-context-engineering", name: "Prompt and Context Engineering", short: "Prompt & Context", weight: 11, color: "#C15FD0", blurb: "Implementing system prompts, few-shot examples, structured output, and context management as real code, not just prompt theory." },
  { id: 5, slug: "5-tools-mcps", name: "Tools and MCPs", short: "Tools & MCPs", weight: 10.6, color: "#3F9B5C", blurb: "Defining tool schemas, implementing tool execution handlers, and building/consuming MCP servers." },
  { id: 6, slug: "6-security-safety", name: "Security and Safety", short: "Security & Safety", weight: 8.1, color: "#D9534F", blurb: "Prompt injection defense, input/output validation, secrets management, and secure tool execution in production code." },
  { id: 7, slug: "7-eval-testing-debugging", name: "Eval, Testing, and Debugging", short: "Eval & Testing", weight: 2.6, color: "#C77D34", blurb: "Writing evals, debugging unexpected model output, logging/observability, and regression-testing prompt changes." },
  { id: 8, slug: "8-claude-code", name: "Claude Code", short: "Claude Code", weight: 3.1, color: "#7C6FE8", blurb: "Using Claude Code as a development tool: CLAUDE.md, hooks, settings/permissions, and headless/CI usage." }
];
