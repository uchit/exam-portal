// Client helpers for the anonymous real-exam self-report + item-level
// telemetry described in api/outcomes.js and api/telemetry.js.
export function sendItemStats(perQuestion) {
  if (!perQuestion || !Object.keys(perQuestion).length) return;
  try {
    fetch("/api/telemetry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ perQuestion }), keepalive: true }).catch(() => {});
  } catch {}
}

export async function submitOutcome(payload) {
  try {
    const res = await fetch("/api/outcomes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchOutcomeStats() {
  try {
    const res = await fetch("/api/outcomes");
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}
