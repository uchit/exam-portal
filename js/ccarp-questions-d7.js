// CCAR-P Domain 7 — Developer Productivity & Operational Enablement (7% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D7 = [
  {
    domain: 7,
    difficulty: 2,
    scenario: "A platform team supporting 40 engineers across 6 product squads notices that each squad has independently built its own Claude API retry logic, prompt templates, and error-handling patterns, with noticeably different quality and bug rates.",
    question: "What is the most effective way for the platform team to raise the floor across all squads?",
    options: [
      "Mandate a single team-wide code review process requiring platform-team sign-off on every Claude-related pull request",
      "Extract the common patterns into a shared, well-documented internal library (retry/backoff, error handling, prompt template conventions) that squads can adopt without being forced to",
      "Let each squad continue independently, since standardization would slow down feature delivery",
      "Write a lengthy internal wiki page describing best practices and rely on squads to read and follow it"
    ],
    correct: 1,
    explanation: "A shared library turns hard-won lessons into something squads can just use — it lowers the bar for doing the right thing without adding process friction. A mandatory sign-off gate (A) creates a bottleneck without fixing the underlying duplication; leaving squads alone (C) guarantees the quality gap persists; documentation with no concrete artifact to adopt (D) is the weakest lever — it depends entirely on discipline the team has already shown it doesn't consistently have."
  }
];
