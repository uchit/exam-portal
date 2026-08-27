// AI-graded free-response feedback for CCAR-P practice — the one feature on
// this site with a real per-call cost, so it's gated behind sign-in (reuses
// the same Clerk-JWT check as api/progress.js) and rate-limited per user.
// Uses Groq's free tier (Llama 3.3 70B) rather than the Claude API itself —
// this site doesn't charge users anything, so grading needs to cost nothing
// to run at the volumes a free rate limit allows.
//
// POST body: { scenario, question, options: string[4], correctIndex: 0-3,
//              userAnswer: string } -> { verdict: "strong"|"partial"|"missed",
//              feedback: string }
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { verifyToken } from "@clerk/backend";

const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 d"), prefix: "ratelimit:grade" });
// Groq's free-tier catalog no longer includes a Llama chat model (checked
// live against /openai/v1/models) — gpt-oss-120b is the strongest
// general-purpose instruct model actually available on this key.
const GROQ_MODEL = "openai/gpt-oss-120b";
const MAX_LEN = 2000;

async function authenticate(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token || !process.env.CLERK_SECRET_KEY) return null;
  try {
    const claims = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    return claims.sub || null;
  } catch {
    return null;
  }
}

const LETTERS = ["A", "B", "C", "D"];

const SYSTEM_PROMPT = `You are grading a practice answer for the Claude Certified Architect — Professional (CCAR-P) exam, a certification that tests professional judgment on Claude-deployment scenarios rather than technical trivia. You'll be given a scenario, a question, four options with the correct one marked, the official explanation, and the user's own free-text reasoning for why they'd pick their answer.

Grade ONLY their reasoning — whether it identifies the same underlying judgment or tradeoff as the official explanation, not whether they happened to pick the right letter. A correct letter with weak reasoning should not score "strong"; a wrong letter with reasoning that's on the right track can score "partial".

Respond with ONLY a JSON object, no other text: {"verdict": "strong"|"partial"|"missed", "feedback": "<2-3 sentences, second person, specific to what they wrote — cite what they captured and what the official explanation emphasizes that they missed, if anything>"}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN || !process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Grading not configured" });
  }

  const userId = await authenticate(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { success } = await ratelimit.limit(userId);
  if (!success) return res.status(429).json({ error: "Daily grading limit reached — try again tomorrow" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { scenario, question, options, correctIndex, userAnswer } = body;
  const valid = typeof question === "string" && question.length > 0 && question.length <= MAX_LEN
    && Array.isArray(options) && options.length === 4 && options.every((o) => typeof o === "string")
    && Number.isInteger(correctIndex) && correctIndex >= 0 && correctIndex <= 3
    && typeof userAnswer === "string" && userAnswer.trim().length > 0 && userAnswer.length <= MAX_LEN
    && (scenario === undefined || (typeof scenario === "string" && scenario.length <= MAX_LEN));
  if (!valid) return res.status(400).json({ error: "Invalid payload" });

  const userPrompt = `${scenario ? `Scenario: ${scenario}\n\n` : ""}Question: ${question}\n\nOptions:\n${options.map((o, i) => `${LETTERS[i]}. ${o}${i === correctIndex ? "  [CORRECT]" : ""}`).join("\n")}\n\nUser's reasoning: ${userAnswer}`;

  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userPrompt }],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 300
      })
    });
    if (!resp.ok) return res.status(502).json({ error: "Grading service unavailable" });
    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(raw);
    if (!["strong", "partial", "missed"].includes(parsed.verdict) || typeof parsed.feedback !== "string") {
      return res.status(502).json({ error: "Grading service returned an unexpected response" });
    }
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({ verdict: parsed.verdict, feedback: parsed.feedback });
  } catch {
    return res.status(502).json({ error: "Could not grade that answer — try again" });
  }
}
