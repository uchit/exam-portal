#!/usr/bin/env node
// Zero-dependency MCP stdio server bundled with the claude-cert-prep plugin.
// Serves real questions from thatclaude.com's own CCA-F and CCAR-P question
// banks (data/cca-f.json, data/ccar-p.json — snapshotted from the live site
// on every deploy by scripts/build-pages.mjs, so this never drifts from what
// the website itself serves) and grades answers against them, entirely
// locally — no network calls, no account, nothing written back anywhere.
// Read-only, stateless drilling: get_question, then submit_answer.
//
// Hand-rolled rather than built on @modelcontextprotocol/sdk to keep this
// plugin a true zero-dependency Node script, matching the rest of this
// repo's "no build step" philosophy — the MCP stdio wire protocol (one
// JSON-RPC 2.0 message per line, over stdin/stdout) is small enough that a
// full SDK isn't needed for two tools.
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";

const HERE = new URL(".", import.meta.url);
const ccafQuestions = JSON.parse(readFileSync(new URL("data/cca-f.json", HERE), "utf8"));
const ccarpQuestions = JSON.parse(readFileSync(new URL("data/ccar-p.json", HERE), "utf8"));
const ALL = [...ccafQuestions, ...ccarpQuestions];
const LETTERS = ["A", "B", "C", "D"];

const TOOLS = [
  {
    name: "get_question",
    description: "Get a random Claude certification practice question from thatclaude.com's real question bank (CCA-F or CCAR-P), to quiz the user with. Does not reveal the correct answer — present it, get the user's letter answer, then call submit_answer.",
    inputSchema: {
      type: "object",
      properties: {
        track: { type: "string", enum: ["cca-f", "ccar-p"], description: "cca-f = Claude Certified Architect — Foundations (technical: agentic architecture, tool use, prompt engineering). ccar-p = — Professional (non-technical judgment scenarios). Defaults to cca-f." },
        domain: { type: "string", description: "Optional: filter to a domain by its short name, e.g. \"Agentic Architecture\"." },
        difficulty: { type: "number", description: "Optional: filter to difficulty 1 (easiest) to 5 (hardest)." }
      }
    }
  },
  {
    name: "submit_answer",
    description: "Grade the user's answer to a question previously returned by get_question. Returns whether it was correct, the right answer, and the full explanation.",
    inputSchema: {
      type: "object",
      properties: {
        questionId: { type: "string", description: "The id field from the get_question response." },
        answer: { type: "string", enum: ["A", "B", "C", "D"], description: "The letter the user chose." }
      },
      required: ["questionId", "answer"]
    }
  }
];

function getQuestion({ track = "cca-f", domain, difficulty } = {}) {
  const pool = track === "ccar-p" ? ccarpQuestions : ccafQuestions;
  let filtered = pool;
  if (domain) filtered = filtered.filter((q) => q.domain.toLowerCase() === String(domain).toLowerCase());
  if (difficulty != null) filtered = filtered.filter((q) => q.difficulty === Number(difficulty));
  if (!filtered.length) filtered = pool;
  const q = filtered[Math.floor(Math.random() * filtered.length)];
  return {
    id: q.id,
    track: q.track,
    domain: q.domain,
    difficulty: q.difficulty,
    scenario: q.scenario || undefined,
    question: q.question,
    options: Object.fromEntries(q.options.map((opt, i) => [LETTERS[i], opt]))
  };
}

function submitAnswer({ questionId, answer }) {
  const q = ALL.find((x) => x.id === questionId);
  if (!q) return { error: `Unknown questionId "${questionId}" — call get_question first.` };
  const idx = LETTERS.indexOf(String(answer || "").toUpperCase());
  if (idx === -1) return { error: `answer must be one of A, B, C, D — got "${answer}".` };
  const correct = idx === q.correct;
  return { correct, correctAnswer: LETTERS[q.correct], explanation: q.explanation };
}

function callTool(name, args) {
  if (name === "get_question") return getQuestion(args || {});
  if (name === "submit_answer") return submitAnswer(args || {});
  return { error: `Unknown tool "${name}".` };
}

// ---- MCP stdio wire protocol: one JSON-RPC 2.0 message per line ----------
function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}
function reply(id, result) {
  send({ jsonrpc: "2.0", id, result });
}
function replyError(id, message) {
  send({ jsonrpc: "2.0", id, error: { code: -32000, message } });
}

const rl = createInterface({ input: process.stdin, terminal: false });
rl.on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return; }
  const { id, method, params } = msg;
  if (method === "initialize") {
    reply(id, {
      protocolVersion: params?.protocolVersion || "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "claude-cert-prep-quiz", version: "1.0.0" }
    });
    return;
  }
  if (method === "notifications/initialized" || method === "notifications/cancelled") return; // no reply for notifications
  if (method === "tools/list") {
    reply(id, { tools: TOOLS });
    return;
  }
  if (method === "tools/call") {
    try {
      const result = callTool(params?.name, params?.arguments);
      reply(id, { content: [{ type: "text", text: JSON.stringify(result) }], isError: !!result?.error });
    } catch (e) {
      reply(id, { content: [{ type: "text", text: `Error: ${e.message}` }], isError: true });
    }
    return;
  }
  if (id !== undefined) replyError(id, `Unknown method "${method}"`);
});
