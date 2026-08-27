// Client helper for AI-graded free-response feedback on CCAR-P practice —
// see api/grade-response.js for the actual grading (Groq/Llama, rate-limited
// per signed-in account).
import { getToken } from "./auth.js";

export async function gradeResponse(payload) {
  const token = await getToken();
  if (!token) return { status: 401, data: null };
  try {
    const res = await fetch("/api/grade-response", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  } catch {
    return { status: 0, data: null };
  }
}
