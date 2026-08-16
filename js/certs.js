// Registry of the Claude certification program. Anthropic's program covers
// four tracks; today only CCA-F has a live question bank and study tools on
// this site (js/blueprint.js + js/bank.js drive it). The other three are
// tracked here so the roadmap is visible and each new track slots into the
// same shape once its content ships — no rearchitecture needed later.
//
// Domain blueprints for CCAR-P / CCAO-F / CCDV-F are sourced from Anthropic's
// publicly described "Exam Guide v1.0" (effective July 2026) as relayed by a
// third-party prep site — not independently confirmed against an
// Anthropic-owned page. Treat as "best publicly available," not "official,"
// and say so on-page. Update if/when Anthropic publishes these directly.
export const CERTS = [
  {
    slug: "cca-f",
    code: "CCA-F",
    name: "Claude Certified Architect — Foundations",
    status: "live",
    audience: "Solution architects designing Claude-powered agentic systems.",
    examLength: 60,
    examMinutes: 120,
    passScore: 720,
    domainCount: 5,
    blurb: "Agentic architecture, tool design & MCP, Claude Code configuration, prompt engineering, and context management. The only track with a full question bank, curriculum, and mock exams live today."
  },
  {
    slug: "ccar-p",
    code: "CCAR-P",
    name: "Claude Certified Architect — Professional",
    status: "in-development",
    audience: "Senior architects, AI/ML engineers, and technical leads designing production-scale Claude systems.",
    prereq: "Recommended, not required: 3+ years in architecture/platform roles and 6+ months hands-on with Claude or LLM systems.",
    examLength: 63,
    examMinutes: 120,
    passScore: 720,
    fee: "$175 per attempt",
    domainCount: 7,
    domains: [
      { name: "Solution Design & Architecture", weight: 17 },
      { name: "Claude Models, Prompting & Context Engineering", weight: 13 },
      { name: "Integration", weight: 19 },
      { name: "Evaluation, Testing & Optimisation", weight: 16 },
      { name: "Governance, Safety & Risk Management", weight: 14 },
      { name: "Stakeholder Communication & Lifecycle Management", weight: 14 },
      { name: "Developer Productivity & Operational Enablement", weight: 7 }
    ],
    blurb: "The advanced companion to CCA-F, for architects operating past foundational agentic design into production-scale system decisions, governance, and cross-team enablement."
  },
  {
    slug: "ccao-f",
    code: "CCAO-F",
    name: "Claude Certified Associate — Foundations",
    status: "in-development",
    audience: "Business professionals — operations, marketing, project management, education, and similar roles. No development or API experience required.",
    prereq: "None stated.",
    examLength: 60,
    examMinutes: 120,
    passScore: 720,
    fee: "$99 per attempt",
    domainCount: 7,
    domains: [
      { name: "Prompting and Task Execution", weight: 14 },
      { name: "Output Evaluation and Validation", weight: 21 },
      { name: "Product and Model Selection", weight: 12 },
      { name: "Workflow Integration and Solution Design", weight: 16 },
      { name: "Configuration and Knowledge Management", weight: 12 },
      { name: "Governance, Risk, and Responsible Use", weight: 15 },
      { name: "Troubleshooting and Optimisation", weight: 10 }
    ],
    blurb: "A non-engineering track for people who use Claude to get work done day to day, not build with the API — the highest-weighted domain is judging whether Claude's output is actually right."
  },
  {
    slug: "ccdv-f",
    code: "CCDV-F",
    name: "Claude Certified Developer — Foundations",
    status: "in-development",
    audience: "AI engineers and developers building applications on the Claude API, roughly 1-5 years of experience.",
    prereq: "Recommended, not required: 6+ months hands-on with Claude or LLM systems; comfort with Python or TypeScript and REST/CLI tooling.",
    examLength: 53,
    examMinutes: 120,
    passScore: 720,
    fee: "$125 per attempt",
    domainCount: 8,
    domains: [
      { name: "Applications and Integration", weight: 33.1 },
      { name: "Model Selection and Optimisation", weight: 16.8 },
      { name: "Agents and Workflows", weight: 14.7 },
      { name: "Prompt and Context Engineering", weight: 11 },
      { name: "Tools and MCPs", weight: 10.6 },
      { name: "Security and Safety", weight: 8.1 },
      { name: "Eval, Testing, and Debugging", weight: 2.6 },
      { name: "Claude Code", weight: 3.1 }
    ],
    blurb: "Hands-on API implementation — closer to the code than CCA-F's architecture-decision focus, weighted heavily toward actually building and integrating Claude applications."
  }
];

// Shared mechanics across the three not-yet-live tracks, per Anthropic's
// Exam Guide v1.0 (effective July 2026): Pearson VUE delivery, credential
// valid 12 months, retake waits of 14/30/90 days (max 4 attempts per year),
// free non-proctored renewal while current — full retake required if lapsed.
export const UPCOMING_TRACK_MECHANICS = "Pearson VUE delivery · credential valid 12 months · retake waits of 14/30/90 days (max 4 attempts/year) · free non-proctored renewal while current";
