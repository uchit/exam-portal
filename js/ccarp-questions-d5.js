// CCAR-P Domain 5 — Governance, Safety & Risk Management (14% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D5 = [
  {
    domain: 5,
    difficulty: 4,
    scenario: "An architecture review board is evaluating a Claude-based system that will autonomously approve or deny small business loan applications up to $25,000, with human review only for larger amounts. Internal audit has flagged that the system's decision rationale is not currently logged in a form regulators could review.",
    question: "What should the architecture team prioritize before this system can go to production?",
    options: [
      "Add a post-hoc summary report generated weekly, since real-time logging would slow down decision throughput",
      "Require the system to emit a structured, auditable rationale alongside every decision, capturing which inputs drove the outcome, before any autonomous approval is enabled in production",
      "Keep the current design but add a disclaimer in the loan terms noting decisions are AI-assisted",
      "Lower the autonomous approval threshold to $5,000 so fewer decisions need justification"
    ],
    correct: 1,
    explanation: "For a system making real financial decisions, auditability has to be built into the decision path itself, not summarized after the fact — a weekly report or a disclaimer gives regulators nothing to actually review. Lowering the threshold (D) reduces exposure but doesn't fix the underlying governance gap: the system remains unauditable at whatever threshold it operates."
  }
];
