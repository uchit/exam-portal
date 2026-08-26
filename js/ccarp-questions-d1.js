// CCAR-P Domain 1 — Solution Design & Architecture (17% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
// No `id` — assigned by js/bank-ccar-p.js from array position. No `style` —
// every CCAR-P question is scenario-style (no parametric/computational track).
export const QUESTIONS_D1 = [
  {
    domain: 1,
    difficulty: 3,
    scenario: "A financial services company is designing a Claude-powered claims-processing system expected to handle 50,000 claims per day across three regional data centers, each with independent regulatory requirements around data residency. The architecture team must decide how to structure the agentic system before implementation begins.",
    question: "Which architectural approach best satisfies both the throughput requirement and the regulatory constraint?",
    options: [
      "A single centralized orchestrator in one region that routes all claims through it, with regional data anonymized before transmission",
      "Independent regional deployments, each with its own orchestrator and tool access scoped to that region's data, coordinated only through aggregate, non-identifying reporting",
      "One shared orchestrator per region, but all three writing claim decisions to a single global database for consistency",
      "A single global orchestrator with region selected dynamically per request based on load, not data origin"
    ],
    correct: 1,
    explanation: "Data residency requirements mean claim data generally cannot leave its region of origin, ruling out any design that centralizes raw data processing in one place (A, C, D). Independent regional deployments that only surface aggregate, non-identifying signals upward satisfy both compliance and throughput — each region scales independently and the compliance boundary is architectural, not a policy applied after the fact."
  }
];
