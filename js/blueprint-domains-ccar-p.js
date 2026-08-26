// The 7 CCAR-P (Claude Certified Architect — Professional) domains, mirroring
// js/blueprint-domains.js's shape for CCA-F. Weights/names sourced from the
// same CERTS registry entry (js/certs.js) — kept as a separate literal here
// (not derived from certs.js) so this file stays a flat, book-keepable list
// like its CCA-F counterpart; update both if the official weights change.
export const DOMAINS_LIST_CCAR_P = [
  { id: 1, slug: "1-solution-design-architecture", name: "Solution Design & Architecture", short: "Solution Design", weight: 17, color: "#5B67CA", blurb: "End-to-end system design for production Claude deployments: architecture patterns, scalability trade-offs, and technology selection at the solution level." },
  { id: 2, slug: "2-models-prompting-context", name: "Claude Models, Prompting & Context Engineering", short: "Prompting & Context", weight: 13, color: "#1AA6B7", blurb: "Model selection across the Claude family, advanced prompting strategy, and context engineering for complex, long-running systems." },
  { id: 3, slug: "3-integration", name: "Integration", short: "Integration", weight: 19, color: "#C6841E", blurb: "Connecting Claude into existing enterprise systems, data pipelines, and third-party platforms without breaking what's already there." },
  { id: 4, slug: "4-evaluation-testing-optimisation", name: "Evaluation, Testing & Optimisation", short: "Eval & Optimisation", weight: 16, color: "#1F9D6B", blurb: "Evaluation frameworks, testing strategy, and performance/cost optimization for systems already in production." },
  { id: 5, slug: "5-governance-safety-risk", name: "Governance, Safety & Risk Management", short: "Governance & Safety", weight: 14, color: "#C4453B", blurb: "Risk assessment, safety controls, compliance, and governance structures for Claude systems operating at organizational scale." },
  { id: 6, slug: "6-stakeholder-lifecycle", name: "Stakeholder Communication & Lifecycle Management", short: "Stakeholder & Lifecycle", weight: 14, color: "#8E5CD9", blurb: "Communicating architecture decisions to technical and non-technical stakeholders, and managing a system's lifecycle from pilot to deprecation." },
  { id: 7, slug: "7-developer-productivity-operational", name: "Developer Productivity & Operational Enablement", short: "Dev Productivity", weight: 7, color: "#3B82C4", blurb: "Enabling engineering teams to build and operate Claude systems effectively — tooling, workflows, and operational excellence." }
];
