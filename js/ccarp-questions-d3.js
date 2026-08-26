// CCAR-P Domain 3 — Integration (19% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D3 = [
  {
    domain: 3,
    difficulty: 3,
    scenario: "An enterprise architecture team is integrating Claude into a 15-year-old inventory management system that exposes only a brittle SOAP API with no sandbox environment, alongside a modern internal REST service the same team fully controls.",
    question: "What integration approach best manages risk from the legacy system while still enabling the new capability?",
    options: [
      "Have Claude call the legacy SOAP API directly for every inventory lookup and write, matching how it calls the modern REST service",
      "Build a thin internal adapter service that wraps the legacy SOAP API, exposing a small, well-tested interface Claude calls instead — isolating Claude's tool surface from the legacy system's fragility",
      "Avoid integrating with the legacy system at all until it can be replaced",
      "Give Claude broader, unscoped access to the legacy system so it can work around whatever the SOAP API doesn't support"
    ],
    correct: 1,
    explanation: "A brittle, sandbox-less legacy API is exactly the case for an adapter layer: it lets the team control blast radius (validate inputs, add retries/timeouts, test the adapter itself) without depending on the legacy system's own reliability. Direct calls (A) or broad access (D) put Claude's tool-calling behavior at the mercy of a system nobody fully trusts; refusing to integrate (C) blocks the capability entirely when a bounded, lower-risk path exists."
  }
];
