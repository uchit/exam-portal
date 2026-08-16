// Official Claude Certification exam blueprint — 5 weighted domains.
// Mirrors the Claude Certified Architect – Foundations (CCA-F), launched
// 2026-03-17: 60 questions, 120 minutes, pass mark 720/1000 (72%).
export const EXAM_NAME = "Claude Certified Architect — Foundations";
export const EXAM_CODE = "CCA-F";

export const DOMAINS = {
  1: {
    id: 1,
    name: "Agentic Architecture & Orchestration",
    short: "Agentic Architecture",
    weight: 27,
    color: "#6C5CE0",
    blurb: "Agent loops, stop_reason control, coordinator/subagent patterns, context passing, parallel vs sequential orchestration, and multi-agent system design."
  },
  2: {
    id: 2,
    name: "Tool Design & MCP Integration",
    short: "Tools & MCP",
    weight: 18,
    color: "#1AA6B7",
    blurb: "Tool schemas, tool_use / tool_result blocks, the Model Context Protocol (servers, clients, transports), MCP primitives, and robust tool design."
  },
  3: {
    id: 3,
    name: "Claude Code Configuration & Workflows",
    short: "Claude Code",
    weight: 20,
    color: "#1F9D6B",
    blurb: "CLAUDE.md, settings.json, permissions, slash commands, hooks, subagents, plan mode, MCP config, and day-to-day Claude Code workflows."
  },
  4: {
    id: 4,
    name: "Prompt Engineering & Structured Output",
    short: "Prompt Engineering",
    weight: 20,
    color: "#C6841E",
    blurb: "XML structuring, few-shot, chain-of-thought, prefill, role prompts, JSON/structured output, and prompt anti-patterns."
  },
  5: {
    id: 5,
    name: "Context Management & Reliability",
    short: "Context & Reliability",
    weight: 15,
    color: "#C4453B",
    blurb: "Context windows, prompt caching, token budgeting, compaction, retries/idempotency, evals, and production reliability."
  }
};

export const DIFFICULTY = {
  1: "Recall",
  2: "Apply",
  3: "Analyze",
  4: "Evaluate",
  5: "Expert"
};

// Domain weights drive the mock-exam question distribution.
export const EXAM_LENGTH = 60;      // questions per full mock exam (matches CCA-F)
export const EXAM_MINUTES = 120;    // timed mock exam length (matches CCA-F)
export const PASS_PERCENT = 72;     // pass threshold (720/1000)
