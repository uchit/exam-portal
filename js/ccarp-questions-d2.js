// CCAR-P Domain 2 — Claude Models, Prompting & Context Engineering (13% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D2 = [
  {
    domain: 2,
    difficulty: 3,
    scenario: "A media company runs a Claude-based content moderation system that must classify user-submitted video descriptions in real time, at a cost budget of $0.001 per request, while a separate internal editorial tool uses Claude for long-form article drafting with no comparable cost pressure.",
    question: "What is the most defensible model-selection strategy across these two workloads?",
    options: [
      "Standardize on the most capable model in the Claude family for both, since consistency simplifies operations",
      "Use a smaller, faster model tuned for classification-style output on moderation, and reserve the most capable model for the drafting tool where output quality matters more than per-request cost",
      "Use the smallest available model everywhere and compensate for quality gaps with more aggressive prompting",
      "Alternate between models on a schedule to average out cost and quality across both systems"
    ],
    correct: 1,
    explanation: "Model selection should follow the actual shape of the workload: moderation is high-volume, latency- and cost-sensitive, and asks for a narrow, classification-like judgment — a smaller, faster model fits. Drafting is low-volume and quality-sensitive, where the strongest available model earns its cost. Standardizing on one model for both (A) overpays on one side or underdelivers on the other; C treats a real capability gap as something prompting alone can close; D optimizes nothing."
  }
];
