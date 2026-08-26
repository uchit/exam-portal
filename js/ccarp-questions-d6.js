// CCAR-P Domain 6 — Stakeholder Communication & Lifecycle Management (14% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D6 = [
  {
    domain: 6,
    difficulty: 3,
    scenario: "Six months after launch, a Claude-powered customer support triage system's escalation rate to human agents has crept from 12% to 34%. The engineering team believes model behavior hasn't changed, but the product organization is under pressure to explain the regression to leadership before the next planning cycle.",
    question: "What is the most useful next step for the architecture lead to take?",
    options: [
      "Immediately roll back to the previous prompt version to be safe, since the regression coincides with a recent release",
      "Present leadership with a hypothesis-and-evidence breakdown — likely causes (query mix shift, tool changes, upstream data drift), each paired with what data would confirm or rule it out — rather than a single explanation",
      "Reassure leadership that escalation rate isn't a reliable metric and shouldn't be the basis for a planning discussion",
      "Wait for the next quarterly review cycle so there's more data before presenting anything"
    ],
    correct: 1,
    explanation: "The team doesn't actually know the cause yet — presenting one theory (A) risks committing to the wrong fix, and both dismissing the metric (C) and stalling (D) fail leadership's real need: a credible, falsifiable plan for finding the cause. A hypothesis-and-evidence framing is the professional-communication move — honest about uncertainty while still giving leadership something concrete to act on now."
  }
];
