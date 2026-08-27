// The 7 CCAO-F (Claude Certified Associate — Foundations) domains, mirroring
// js/blueprint-domains-ccar-p.js's shape. Weights/names sourced from the
// same CERTS registry entry (js/certs.js) — kept as a separate literal here
// so this file stays a flat, book-keepable list; update both if the
// official weights change. This is the non-engineering track: no API/code
// content, all domains are about using Claude products effectively and
// judging its output, not building with it.
export const DOMAINS_LIST_CCAO_F = [
  { id: 1, slug: "1-prompting-task-execution", name: "Prompting and Task Execution", short: "Prompting & Tasks", weight: 14, color: "#4C6FDE", blurb: "Writing effective prompts and structuring requests to Claude so it actually does the task you meant, on the first try." },
  { id: 2, slug: "2-output-evaluation-validation", name: "Output Evaluation and Validation", short: "Output Evaluation", weight: 21, color: "#E0A72A", blurb: "The highest-weighted domain: judging whether Claude's output is actually correct, complete, and safe to use before acting on it." },
  { id: 3, slug: "3-product-model-selection", name: "Product and Model Selection", short: "Product & Model", weight: 12, color: "#2FA8A0", blurb: "Choosing the right Claude product (claude.ai, Claude Code, an integration) and model for a given task and budget." },
  { id: 4, slug: "4-workflow-integration-solution-design", name: "Workflow Integration and Solution Design", short: "Workflow Integration", weight: 16, color: "#C15FD0", blurb: "Fitting Claude into an existing team workflow — where it helps, where it doesn't, and how to hand off between human and AI steps." },
  { id: 5, slug: "5-configuration-knowledge-management", name: "Configuration and Knowledge Management", short: "Configuration", weight: 12, color: "#3F9B5C", blurb: "Setting up Projects, custom instructions, and knowledge sources so Claude has the right context without being told every time." },
  { id: 6, slug: "6-governance-risk-responsible-use", name: "Governance, Risk, and Responsible Use", short: "Governance & Risk", weight: 15, color: "#D9534F", blurb: "Using Claude responsibly at work: data handling, appropriate use, and knowing what not to hand to an AI system." },
  { id: 7, slug: "7-troubleshooting-optimisation", name: "Troubleshooting and Optimisation", short: "Troubleshooting", weight: 10, color: "#C77D34", blurb: "Diagnosing why an interaction with Claude went wrong and fixing the prompt, context, or setup rather than giving up on it." }
];
