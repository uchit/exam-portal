// Registry of the Claude certification program. Anthropic's program covers
// four tracks; today only CCA-F has a live question bank and study tools on
// this site (js/blueprint.js + js/bank.js drive it). The other three are
// tracked here so the roadmap is visible and each new track slots into the
// same shape once its content ships — no rearchitecture needed later.
export const CERTS = [
  {
    slug: "cca-f",
    code: "CCA-F",
    name: "Claude Certified Architect — Foundations",
    status: "live",
    audience: "Solution architects designing Claude-powered agentic systems.",
    examLength: 60,
    examMinutes: 120,
    domainCount: 5,
    blurb: "Agentic architecture, tool design & MCP, Claude Code configuration, prompt engineering, and context management. The only track with a full question bank, curriculum, and mock exams live today."
  },
  {
    slug: "ccar-p",
    code: "CCAR-P",
    name: "Claude Certified Architect — Professional",
    status: "in-development",
    audience: "Senior architects and AI/ML engineers designing production-scale Claude systems.",
    examLength: 63,
    examMinutes: 120,
    domainCount: 7,
    blurb: "The advanced companion to CCA-F, for architects operating past foundational agentic design into production-scale system decisions."
  },
  {
    slug: "ccao-f",
    code: "CCAO-F",
    name: "Claude Certified Associate — Foundations",
    status: "in-development",
    audience: "Business professionals — operations, marketing, education, and similar roles — working with Claude day to day.",
    examLength: 60,
    examMinutes: 120,
    domainCount: 7,
    blurb: "A non-engineering track for people who use Claude to get work done, not build with the API."
  },
  {
    slug: "ccdv-f",
    code: "CCDV-F",
    name: "Claude Certified Developer — Foundations",
    status: "in-development",
    audience: "AI engineers and developers building applications on the Claude API.",
    examLength: 53,
    examMinutes: 120,
    domainCount: 8,
    blurb: "Hands-on API implementation — closer to the code than CCA-F's architecture-decision focus."
  }
];
