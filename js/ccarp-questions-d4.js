// CCAR-P Domain 4 — Evaluation, Testing & Optimisation (16% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D4 = [
  {
    domain: 4,
    difficulty: 4,
    scenario: "A legal-tech company's contract-review assistant passes all of its existing evaluation suite (200 hand-labeled contract clauses) at 96% accuracy, but customer complaints about missed liability clauses have increased since the last model upgrade.",
    question: "What does this combination of signals most likely indicate, and what should the team do?",
    options: [
      "The evaluation suite is fine — customers are simply misusing the tool, so the team should focus on user education",
      "The eval suite's 200 clauses no longer represent the distribution of contracts customers are actually submitting; the team should audit real failure cases and expand the eval set to cover them before trusting the 96% number again",
      "Roll back the model upgrade immediately without further investigation, since the complaints started afterward",
      "Increase the passing threshold on the existing eval suite to 99% to force better performance"
    ],
    correct: 1,
    explanation: "A static eval suite passing at a high rate while real-world complaints rise is the classic sign of eval/production drift — the suite stopped covering the cases that matter. The fix is to go look at actual failures and grow the eval set to represent them, not raise a threshold on a suite that isn't measuring the right thing (D), assume users are at fault without evidence (A), or roll back on correlation alone before understanding whether the model or the eval is the actual problem (C)."
  }
];
