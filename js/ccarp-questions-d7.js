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
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A regional health insurer runs a Claude-powered prior-authorization assistant that has been live for four months. During a recent incident, the on-call engineer took 45 minutes to determine whether elevated latency was caused by an upstream model provider issue, a downstream claims-database slowdown, or a change in prompt length from a recent deployment, because logs from each layer lived in separate systems with no shared correlation ID.",
    question: "What should the platform team prioritize to reduce future incident diagnosis time?",
    options: [
      "Require the on-call engineer to memorize the architecture diagram in more detail before their next shift",
      "Instrument the request pipeline with a shared trace/correlation ID propagated across the prompt layer, model calls, and downstream services, unified in one observability view",
      "Increase the on-call rotation size so more people are available to investigate simultaneously",
      "Ask engineers to write a post-incident summary explaining what took so long"
    ],
    correct: 1,
    explanation: "End-to-end tracing with a shared correlation ID lets an on-call engineer see exactly where time was spent across layers in one place, which is the actual root cause of the slow diagnosis. Adding more people (C) or better memorization (A) doesn't fix fragmented telemetry — it just throws more effort at the same blind spot. A retrospective write-up (D) documents the pain after the fact but does nothing to prevent it recurring."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A mid-size e-commerce company is onboarding a new cohort of 12 engineers who will build features using the company's internal Claude integration. Historically, new hires took 3-4 weeks to become productive because they had to reverse-engineer conventions from existing codebases and ask senior engineers repeated one-off questions.",
    question: "Which investment would most directly shorten ramp-up time for the new cohort?",
    options: [
      "A curated onboarding path combining a working starter template, a short internal guide on house conventions, and a sandbox environment for safe experimentation",
      "A mandatory two-week classroom training taught by the platform team before any new hire touches production code",
      "Assigning each new hire a senior engineer as a full-time pair-programming partner for their first month",
      "Publishing the platform team's internal architecture decision records with no additional onboarding materials"
    ],
    correct: 0,
    explanation: "A working starter template plus a concise conventions guide and a safe sandbox lets new engineers learn by doing, which is consistently faster than lecture-based training or raw documentation dumps. Full-time pairing (C) is effective but consumes a senior engineer's entire capacity per hire and doesn't scale to a cohort of 12. Classroom training (B) delays hands-on productivity and often teaches material that's forgotten before it's used. Architecture decision records alone (D) assume a level of self-directed synthesis new hires typically don't yet have."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "At a logistics company, five different teams each built their own dashboard to track Claude API token usage and cost per feature, pulling from the same underlying billing export but using inconsistent groupings, refresh intervals, and definitions of 'cost per request.' Finance has started questioning why numbers don't reconcile across teams.",
    question: "What is the best way for the platform team to resolve this?",
    options: [
      "Ask each team to document how their dashboard calculates cost so finance can manually reconcile the differences",
      "Ban teams from building their own dashboards and require all cost questions to go through the platform team",
      "Build and maintain a single canonical usage/cost visibility service with agreed-upon definitions, which teams can query or embed rather than re-deriving their own numbers",
      "Tell finance to average the numbers across the five dashboards as a reasonable estimate"
    ],
    correct: 2,
    explanation: "A single canonical source of truth for cost and usage definitions eliminates the inconsistency at the root, and letting teams consume it (rather than rebuild it) prevents the duplicated effort from recurring. Manual reconciliation (A) is a permanent tax that never actually fixes the divergence. Centralizing all cost questions through the platform team (B) creates an unnecessary bottleneck for routine visibility needs. Averaging inconsistent numbers (D) produces a figure with no real meaning and would mislead finance further."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A SaaS company's platform team has built a highly capable internal orchestration framework for Claude-based agents, but adoption across product teams has stalled at 30% eighteen months after launch. Interviews reveal that feature teams find the framework powerful but overly opinionated, forcing them to fight its abstractions for use cases it wasn't designed around.",
    question: "What is the most effective response for the platform team?",
    options: [
      "Mandate framework adoption company-wide via an engineering leadership directive",
      "Sunset the framework and let every team build independently again",
      "Engage a handful of holdout teams directly, identify the specific abstractions causing friction, and evolve the framework's extension points based on real usage rather than assumptions made at launch",
      "Rewrite the framework's marketing materials and internal documentation to better explain its existing design"
    ],
    correct: 2,
    explanation: "Low adoption after 18 months signals a genuine design-fit problem, not merely an awareness problem, so the platform team needs direct signal from the teams hitting friction and needs to adapt the framework's extension points accordingly. A top-down mandate (A) forces compliance without fixing the underlying rigidity and breeds resentment. Sunsetting the framework (B) throws away real investment without first testing whether it's fixable. Better documentation (D) only helps if the problem is understanding, but the interviews already show the problem is the framework's opinionated design itself."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A telecom provider's customer support team recently shipped a Claude-based ticket triage feature. Two weeks after launch, a subtle prompt regression caused a class of tickets to be mis-categorized for three days before anyone noticed, because there was no automated check comparing model output quality across deployments.",
    question: "What operational capability would most directly have prevented this from going unnoticed for three days?",
    options: [
      "A larger QA team manually spot-checking tickets once per week",
      "A requirement that all prompt changes be approved by a senior engineer before merging",
      "An automated evaluation suite that runs against a labeled test set on every deployment and flags quality regressions before or immediately after release",
      "A policy requiring engineers to re-read the prompt template line by line before every deployment"
    ],
    correct: 2,
    explanation: "Automated evaluation against a labeled test set catches quality regressions at deployment time, which is exactly the gap that let this issue persist for three days undetected. Weekly manual spot-checks (A) are too infrequent and too small a sample to reliably catch subtle drift. Senior engineer approval (B) reviews the change intent but doesn't verify actual output quality against real cases. Manual line-by-line review (D) is unreliable for catching behavioral regressions that aren't obvious from reading the prompt text alone."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A government agency modernizing its citizen services portal has a small platform team of 3 engineers supporting 8 delivery teams building Claude-powered case-processing tools. The platform team is now the bottleneck: every new integration request queues for weeks because the platform team insists on building and delivering each integration itself to guarantee consistency.",
    question: "What should the platform team change to relieve the bottleneck while preserving reasonable consistency?",
    options: [
      "Hire enough additional platform engineers to keep building every integration in-house at the current pace",
      "Abandon consistency goals entirely and let delivery teams build integrations however they choose",
      "Publish self-service tooling, templates, and guardrails that let delivery teams build their own integrations within approved patterns, reserving direct platform-team involvement for genuinely novel cases",
      "Require delivery teams to submit formal change requests and wait for prioritization in the platform team's backlog"
    ],
    correct: 2,
    explanation: "Self-service tooling with guardrails shifts the platform team from being an execution bottleneck to being an enabler, letting delivery teams move independently for standard cases while still preserving consistency through the approved patterns. Hiring more engineers (A) treats the symptom rather than the structural issue and doesn't scale as well as self-service. Abandoning consistency (B) trades one problem for a worse one — fragmentation. Formal change requests with prioritization (D) is just a more bureaucratic version of the same bottleneck."
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "An engineering director at a media company asks the platform team to explain, in one sentence, why they are investing in shared internal libraries for Claude integrations instead of letting each team build from scratch.",
    question: "Which explanation best captures the primary rationale for platform investment in shared tooling?",
    options: [
      "It reduces duplicated effort and inconsistent quality across teams, letting engineers focus on product logic instead of re-solving the same integration problems",
      "It allows the platform team to control which vendors each product team is allowed to use",
      "It is required by the model provider's terms of service",
      "It makes it easier for the platform team to justify its own headcount"
    ],
    correct: 0,
    explanation: "The core justification for shared tooling investment is eliminating redundant work and quality variance so teams can spend their effort on differentiated product value. Vendor control (B) is not the purpose of internal shared libraries. There is no such terms-of-service requirement (C). Headcount justification (D) is a cynical framing that doesn't reflect the actual engineering rationale and would be a poor answer on a certification exam."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A gaming studio's central platform team owns the shared Claude integration layer used by all game teams for in-game NPC dialogue generation. A new game team needs a capability — streaming partial responses with custom interrupt handling — that no other team currently needs and that would take the platform team six weeks to build properly into the shared layer, versus two days for the game team to build it themselves as a one-off.",
    question: "What is the most sound approach for the platform team to take?",
    options: [
      "Insist the game team wait six weeks for the properly integrated shared version to avoid any one-off code",
      "Let the game team build it as a one-off, and treat it as a candidate for future generalization into the shared layer only if other teams later express the same need",
      "Refuse the request outright since it does not fit the existing shared abstraction",
      "Have the platform team drop other priorities immediately to rush the shared version in under two days"
    ],
    correct: 1,
    explanation: "Building a one-off for a genuinely novel, single-team need avoids over-investing platform effort in generalizing something that may never be needed elsewhere, while leaving the door open to fold it into the shared layer later if demand emerges. Forcing a six-week wait for a niche capability (A) blocks delivery for no proportionate benefit. Outright refusal (C) ignores a legitimate need. Rushing a shared implementation in two days (D) risks a poorly designed abstraction built under time pressure for a requirement that isn't yet proven to be common."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A non-profit organization's small engineering team (5 people) built a Claude-powered grant-matching tool for caseworkers. The original author left the organization, and the remaining engineers discover there is no documentation on why certain prompt design decisions were made, making them hesitant to modify the system for fear of breaking undocumented behavior.",
    question: "What practice would have best prevented this situation?",
    options: [
      "Requiring the original author to have stayed at the organization longer",
      "Maintaining lightweight design-decision records (what was tried, what worked, what didn't, and why) alongside the code, updated as part of normal development rather than as a separate afterthought",
      "Avoiding any changes to AI-related systems unless the original author personally approves them",
      "Rewriting the entire system from scratch with the remaining team"
    ],
    correct: 1,
    explanation: "Lightweight, continuously maintained design-decision records preserve institutional knowledge independent of any one person, which is exactly what's missing here. Depending on one engineer staying indefinitely (A) is not a scalable or realistic mitigation. Requiring a departed author's approval (C) is not even possible and reflects poor operational planning. A full rewrite (D) is a costly, risky overreaction when the actual problem is a documentation gap, not a flawed system."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A retail chain's engineering organization has 15 teams building various Claude-powered features, from inventory forecasting explanations to customer chat support. Each team currently writes its own ad hoc evaluation scripts to check output quality before shipping, using different metrics and different sample sizes, making it hard to compare reliability across teams or set organization-wide quality bars.",
    question: "What should the platform team introduce to address this?",
    options: [
      "A standardized evaluation framework and shared tooling that teams use with their own domain-specific test cases, producing comparable, consistent quality signals across the organization",
      "A rule that only the platform team is allowed to write or run evaluations for any team",
      "A recommendation that teams increase their sample sizes without changing anything else about their process",
      "No action, since each team's use case is different enough that shared evaluation tooling wouldn't be meaningful"
    ],
    correct: 0,
    explanation: "A shared evaluation framework standardizes the mechanics (metrics, reporting, comparability) while still letting each team supply domain-specific test cases, which resolves the inconsistency without ignoring genuine differences between use cases. Centralizing all evaluation writing in the platform team (B) doesn't scale and removes domain expertise from the process. Just increasing sample sizes (C) doesn't fix the lack of comparable metrics. Declaring shared tooling meaningless (D) discards the real benefit of consistent quality bars across the organization."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "An insurance company's platform team is deciding how to handle an internal capability: automatically summarizing claim adjuster notes for supervisor review. Two teams have already built nearly identical versions independently, and three more teams have expressed interest in similar summarization needs for different document types.",
    question: "What is the strongest signal that this capability should become a platform-owned service rather than remain team-owned?",
    options: [
      "The fact that it involves Claude at all, since anything using the model should be centrally owned",
      "Multiple teams have independently built or requested near-identical functionality, indicating a recurring, generalizable need rather than a one-off requirement",
      "The capability is complex to implement, regardless of how many teams need it",
      "A senior executive personally prefers centralized ownership as a matter of principle"
    ],
    correct: 1,
    explanation: "Recurring demand for near-identical functionality across multiple teams is the classic signal that a capability has crossed the threshold from team-specific need to platform service — it's the exact pattern (duplicated effort, generalizable need) that justifies centralization. Using Claude alone (A) is not sufficient justification since plenty of legitimate use cases are appropriately team-owned. Implementation complexity alone (C) doesn't indicate demand breadth — a complex but genuinely single-team need shouldn't necessarily be centralized. Executive preference without demand evidence (D) is not a sound architectural basis for the decision."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A B2B software company's on-call rotation for its Claude-powered contract-review assistant has no documented escalation path. During a recent incident, the on-call engineer did not know whether the appropriate response to a spike in model error rates was to page the platform team, contact the model provider's status channel, or roll back the last deployment, and lost 20 minutes figuring out who to involve.",
    question: "What artifact would most directly address this gap?",
    options: [
      "A runbook that maps common failure signatures (e.g., elevated error rates, latency spikes, quality degradation) to specific diagnostic steps and escalation paths",
      "A company-wide email announcing that on-call engineers should use better judgment during incidents",
      "A requirement that only the most senior engineer on the team is ever allowed to be on-call",
      "An increase in the on-call engineer's base pay to compensate for the stress of ambiguous incidents"
    ],
    correct: 0,
    explanation: "A runbook that ties observable failure signatures to concrete diagnostic steps and escalation paths directly closes the decision-making gap the on-call engineer experienced. A general call for better judgment (B) provides no actionable guidance. Restricting on-call to the most senior engineer only (C) doesn't scale and doesn't fix the missing documentation, it just relies on one person's tacit knowledge. Compensation changes (D) address morale, not the operational gap that caused the delay."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A streaming media company's platform team wants to reduce the time it takes feature teams to go from a working prototype (built in a notebook) to a production-ready Claude-powered feature. Currently this transition takes 6-8 weeks per feature because engineers must manually rebuild prototype logic to meet production standards for logging, retries, rate limiting, and testing.",
    question: "What would most effectively shrink this prototype-to-production gap?",
    options: [
      "Require all prototyping to happen directly in the production codebase from day one",
      "Provide a production-ready scaffold or template that already implements logging, retries, rate limiting, and test harnesses, so prototypes can be built on top of production-grade foundations from the start",
      "Extend the standard timeline expectation to 10-12 weeks so teams have more comfortable buffer",
      "Assign a dedicated 'productionization' engineer to rewrite every prototype after the fact"
    ],
    correct: 1,
    explanation: "A scaffold that bakes in production-grade concerns from the start means prototypes don't need a separate, effort-intensive rebuild phase, which directly collapses the 6-8 week gap. Forcing prototyping directly into the production codebase (A) conflates two different workflows and would likely slow down early experimentation. Extending the timeline (C) accepts the inefficiency rather than solving it. A dedicated rewrite engineer (D) still requires a full rebuild step per feature and doesn't scale as feature volume grows."
  },
  {
    domain: 7,
    difficulty: 5,
    scenario: "A large financial institution's platform team is evaluating two competing proposals for its next-generation internal developer platform supporting 200+ engineers across 25 teams building Claude-powered systems. Proposal A centralizes nearly all decisions (model configuration, evaluation thresholds, deployment cadence) in the platform team to maximize consistency. Proposal B gives teams full autonomy with only a lightweight set of non-negotiable guardrails (data handling, security, incident escalation), leaving everything else to team discretion.",
    question: "What is the most defensible architectural stance for the platform team to take?",
    options: [
      "Adopt Proposal A fully, since consistency at this scale is worth the loss of team autonomy",
      "Adopt Proposal B fully, since 25 teams cannot be expected to move at the platform team's pace",
      "Adopt neither extreme: enforce a small set of non-negotiable guardrails where organizational risk is high (data handling, security, incident response) while leaving implementation choices with lower blast radius to team discretion, paired with strong self-service tooling to make the compliant path also the easy path",
      "Let each of the 25 teams independently choose between Proposal A and Proposal B for their own domain"
    ],
    correct: 2,
    explanation: "The most defensible stance ties the degree of centralization to actual organizational risk: hard guardrails where mistakes are costly (data handling, security, incident response), autonomy elsewhere, reinforced by tooling that makes compliance the path of least resistance. Full centralization (A) doesn't scale to 200+ engineers and creates the exact platform-team bottleneck described in similar scenarios. Full autonomy (B) abandons the necessary guardrails for genuinely high-risk areas like data handling. Letting each team pick its own governance model (D) produces exactly the fragmentation and inconsistency the platform team exists to prevent."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A supply-chain software vendor's engineering leadership wants to introduce an internal certification program to verify that engineers building Claude-powered features understand the organization's standards for prompt safety, cost awareness, and evaluation practices before they can deploy to production unsupervised.",
    question: "What design for this program would most effectively raise the engineering floor without becoming a hollow formality?",
    options: [
      "A one-time multiple-choice quiz with no practical component, completed once at hiring",
      "A certification that includes a practical exercise (e.g., building and evaluating a small feature against real standards) reviewed by an experienced engineer, refreshed periodically as standards evolve",
      "No formal program at all, since certifications tend to become box-checking exercises",
      "A certification granted automatically to anyone who has been at the company for six months, regardless of demonstrated skill"
    ],
    correct: 1,
    explanation: "A practical, reviewed exercise actually tests applied competence rather than rote memorization, and periodic refreshes keep it aligned with evolving standards instead of going stale. A one-time multiple-choice quiz (A) tests recall, not applied judgment, and a certification tied purely to tenure (D) measures nothing about actual competence. Rejecting any formal program (C) is a reasonable concern about hollow formality in general, but the fix is designing the program well, not abandoning the goal of a verifiable competence bar."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A healthcare SaaS company's platform team notices that engineers across teams keep independently rediscovering the same subtle issue: a particular way of structuring long context windows causes intermittent truncation that's hard to detect in testing. Each team that hits it spends 1-2 days debugging before finding the same root cause someone else already found months earlier.",
    question: "What is the most effective way to prevent this recurring loss of engineering time?",
    options: [
      "Wait for enough teams to hit the issue that it becomes obvious and gets fixed upstream eventually",
      "Maintain a living internal knowledge base of known gotchas and their solutions, actively surfaced to engineers (e.g., linked from the shared library or onboarding materials) rather than left undiscoverable",
      "Assign one engineer to personally answer questions about this issue whenever asked",
      "Tell teams to search old Slack threads before starting any new project"
    ],
    correct: 1,
    explanation: "An actively surfaced, living knowledge base (integrated where engineers already look, like shared libraries or onboarding docs) ensures known issues are discoverable before teams waste time rediscovering them. Waiting passively (A) does nothing to stop the recurring cost. Routing all questions through one person (C) doesn't scale and creates a single point of failure. Relying on manual Slack archaeology (D) is unreliable and puts the burden of discovery entirely on the engineer, which is exactly what's failing today."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A telecom company's platform team supports both a fast-moving consumer app team that ships weekly and a highly regulated enterprise billing team that ships quarterly after extensive review. The platform team currently applies the same CI/CD pipeline and testing requirements to both, and the consumer team complains it's being slowed down unnecessarily while the billing team complains the pipeline doesn't go far enough for their risk profile.",
    question: "What should the platform team do?",
    options: [
      "Keep a single uniform pipeline for both teams to simplify platform-team maintenance",
      "Let each team build and maintain its own pipeline independently with no shared foundation",
      "Build a configurable pipeline with a shared foundation (build, deploy, core evaluation) but tunable gates and depth of review appropriate to each team's risk profile and release cadence",
      "Force the billing team to adopt the consumer team's faster, lighter pipeline to reduce delivery friction"
    ],
    correct: 2,
    explanation: "A shared foundation with tunable, risk-appropriate gates lets both teams benefit from common infrastructure investment while getting a review depth that actually matches their risk profile and cadence, addressing both complaints simultaneously. A single uniform pipeline (A) is what's already failing both teams. Fully independent pipelines (B) sacrifices the efficiency and consistency benefits of shared infrastructure. Forcing the billing team onto the lighter pipeline (D) would create real regulatory and quality risk for a highly regulated function."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A large e-commerce marketplace's platform team is measuring the success of its developer-productivity initiatives. So far it has only tracked adoption rate of its shared libraries (currently 85%) and reports this number in every leadership update as evidence of success, even though incident frequency and time-to-resolution for Claude-powered features have not improved over the same period.",
    question: "What is the most significant flaw in how the platform team is measuring its own impact?",
    options: [
      "The adoption rate itself is being miscalculated and should be recomputed",
      "It is tracking an input metric (adoption) as if it were an outcome metric, without evidence that adoption is actually translating into the operational outcomes (fewer/faster-resolved incidents) the initiative was meant to improve",
      "85% adoption is too low a number to report to leadership",
      "The platform team should stop measuring anything and rely on qualitative feedback only"
    ],
    correct: 1,
    explanation: "Adoption is a leading/input indicator; the actual goal was operational improvement, and reporting adoption alone while ignoring stagnant incident metrics risks declaring success prematurely and hiding a real problem — perhaps the libraries are being adopted but aren't well-designed, or aren't the actual bottleneck. Recomputing the adoption number (A) doesn't address the deeper measurement flaw. The number itself being 'too low' (C) is irrelevant to the actual issue. Abandoning measurement entirely (D) throws out useful signal instead of fixing what's being measured."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A mid-size insurance company's engineers building Claude-powered underwriting tools report that getting a new Claude API credential provisioned for a new project takes 5 business days because it requires manually filing a ticket with the security team, who processes requests in weekly batches.",
    question: "What is the best way for the platform team to address this friction without compromising security oversight?",
    options: [
      "Give every engineer permanent, unrestricted access to a shared credential to avoid provisioning delays entirely",
      "Leave the process as-is, since security review delays are an acceptable cost of doing business",
      "Build a self-service provisioning workflow with automated policy checks (e.g., scoped permissions, budget caps, logging) that can approve standard requests immediately while still flagging unusual requests for manual security review",
      "Ask the security team to hire more staff to process the weekly batch faster"
    ],
    correct: 2,
    explanation: "Automating standard, low-risk provisioning requests while still routing genuinely unusual requests to manual review preserves security oversight where it matters and removes unnecessary delay for the common case. Shared unrestricted credentials (A) eliminates the delay but creates serious security and cost-attribution risk. Accepting the status quo (B) leaves a real productivity drag unaddressed. Simply adding headcount to the batch process (D) scales linearly with request volume and doesn't fix the fundamentally slow batch-based workflow."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A national grocery retailer's platform team is designing monitoring for a new Claude-powered demand-forecasting assistant used internally by category managers. The team is debating whether to alert only on hard failures (API errors, timeouts) or to also monitor for softer signals like a rising rate of category managers manually overriding the assistant's recommendations.",
    question: "What is the strongest argument for including the override-rate signal in the monitoring strategy?",
    options: [
      "Hard failure monitoring is unnecessary once softer signals are being tracked",
      "A rising override rate can surface a real degradation in output usefulness or trust that hard-failure monitoring would completely miss, since the system can be technically 'up' while quietly becoming less useful",
      "Category managers should never be allowed to override the assistant's recommendations in the first place",
      "Soft signals like override rate are too subjective to ever be useful operationally"
    ],
    correct: 1,
    explanation: "A system can be fully operational from an infrastructure standpoint (no errors, normal latency) while its actual output quality degrades in ways only visible through behavioral signals like rising overrides — this is exactly the kind of operational blind spot that operational excellence for agentic systems needs to cover. Hard failure monitoring is still necessary (A is wrong to dismiss it). Preventing overrides entirely (C) removes a valuable human check and a valuable signal source. Dismissing behavioral signals as too subjective (D) ignores that override rate is a concrete, trackable metric, not a vague qualitative judgment."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A pharmaceutical company's platform team must decide how to structure incident response for a Claude-powered clinical-documentation summarization tool. Engineering leadership initially proposed treating all incidents with the same severity classification and response process used for the company's internal HR chatbot, arguing this keeps the incident process simple and consistent.",
    question: "What is the strongest critique of this proposal?",
    options: [
      "Incident processes should always be as simple as possible regardless of what the system does",
      "A clinical-documentation tool carries materially higher risk to patient care and regulatory compliance than an HR chatbot, so treating them identically under-prioritizes incidents in the higher-risk system and could delay response to issues with real clinical consequences",
      "The HR chatbot should be shut down since it doesn't deserve equal treatment",
      "Consistency across incident processes is never valuable and each system should have a completely bespoke process"
    ],
    correct: 1,
    explanation: "Severity classification should reflect actual blast radius and risk; a clinical-documentation tool touching patient care and regulatory compliance warrants materially different response urgency than an internal HR chatbot, and collapsing them into one undifferentiated process risks under-responding to the higher-stakes system. Simplicity for its own sake (A) ignores that the whole point of severity classification is to match response to risk. Shutting down the HR chatbot (C) doesn't address the actual issue. Rejecting all consistency (D) overcorrects — some shared process structure (e.g., common escalation tooling) is still valuable; what needs to differ is severity thresholds and response depth."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A logistics company's platform team wants developers to get feedback on whether a Claude prompt change degrades output quality before it reaches code review, rather than discovering problems days later when a reviewer manually spot-checks outputs.",
    question: "What tooling investment would best achieve this goal?",
    options: [
      "A pre-commit or CI-integrated check that automatically runs the changed prompt against a regression test set and reports quality deltas before the pull request is opened for review",
      "A requirement that reviewers manually test every prompt change themselves before approving",
      "A quarterly audit of all prompt changes made in the previous three months",
      "A rule that prompt changes can only be made by a small, designated group of 'prompt engineers'"
    ],
    correct: 0,
    explanation: "Automated regression testing integrated into the commit/CI workflow gives developers quality feedback immediately, before human review time is spent, which is exactly the shift-left goal described. Manual reviewer testing (B) still delays feedback to review time and consumes reviewer effort on something that could be automated. A quarterly audit (C) is far too infrequent to catch issues before they cause harm. Restricting prompt changes to a small group (D) doesn't address the feedback-loop problem and creates an unnecessary bottleneck."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A regional bank's platform team supports 10 teams, each of which independently decided how to handle a common scenario: what to do when a Claude API call returns a low-confidence or ambiguous response for a customer-facing use case. Approaches range from silently proceeding, to always escalating to a human, to retrying with a different prompt. Customers have received inconsistent experiences depending on which team's feature they interact with.",
    question: "What should the platform team do?",
    options: [
      "Publish an organization-wide policy defining acceptable handling patterns for low-confidence responses in customer-facing contexts, paired with a shared utility implementing the approved patterns, while allowing teams latitude within that policy for context-specific tuning",
      "Let the inconsistency continue since each team understands its own use case best",
      "Force all teams to adopt the exact same specific numeric confidence threshold and fallback behavior with zero variation",
      "Remove confidence-based handling entirely and always let responses pass through unmodified"
    ],
    correct: 0,
    explanation: "A policy defining acceptable patterns, backed by a shared implementable utility, resolves the customer-facing inconsistency while still leaving room for teams to tune behavior to their specific context — striking the right balance between organizational consistency and team autonomy. Leaving it fully inconsistent (B) directly perpetuates the customer experience problem described. Forcing one rigid numeric threshold with zero variation (C) ignores legitimate differences between use cases (e.g., risk tolerance varies by feature). Removing confidence handling entirely (D) would make the customer experience worse, not better."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A large enterprise software vendor's platform team must decide how much engineering capacity to allocate between building new internal Claude tooling for feature teams versus operating and hardening the existing tooling already in production, given a fixed headcount of 8 platform engineers supporting 30 feature teams.",
    question: "What allocation principle would best serve the organization long-term?",
    options: [
      "Allocate all capacity to new tooling, since feature teams are always asking for more capabilities",
      "Allocate all capacity to operating existing tooling, since stability should always come first regardless of unmet needs",
      "Set a deliberate, explicit split between new capability development and operational hardening (e.g., informed by current incident load, technical debt, and unmet team needs), and revisit the split periodically as conditions change rather than defaulting to whichever demand is loudest",
      "Let individual platform engineers each decide day-to-day whether to build new features or fix existing issues with no coordinated allocation"
    ],
    correct: 2,
    explanation: "A deliberate, periodically revisited allocation informed by actual signals (incident load, technical debt, unmet needs) avoids the trap of reactively chasing whichever pressure is loudest at a given moment, and keeps the platform team's limited capacity aligned with real organizational priorities over time. Allocating everything to new tooling (A) risks the existing system accumulating operational debt and instability. Allocating everything to operations (B) ignores real unmet needs and can stall organizational progress. Uncoordinated individual decisions (D) leads to inconsistent prioritization and duplicated or conflicting effort across a small team."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A consumer electronics company's platform team introduced a mandatory internal 'Claude feature checklist' that engineers must complete before any production deployment, covering evaluation coverage, cost estimation, and rollback plan. Six months later, engineers report they now complete the checklist as a rote formality, often filling in generic answers, without it changing how they actually build or catching real issues.",
    question: "What is the most likely explanation and appropriate fix?",
    options: [
      "The checklist should be made longer and more detailed to close every possible loophole",
      "The checklist has become a compliance ritual disconnected from real engineering value; the platform team should investigate whether the checklist items are actually the right ones, integrate the meaningful checks into tooling/automation where possible, and remove or rework items that aren't catching real issues",
      "Engineers should be penalized for filling in generic answers on the checklist",
      "The checklist should be removed entirely with no replacement process"
    ],
    correct: 1,
    explanation: "When a governance artifact becomes rote and stops catching real issues, the right response is to investigate whether it's still measuring the right things and to automate what can be automated (since automated checks can't be filled in with generic non-answers), rather than assuming more checklist items or punishment will fix engagement. Making it longer (A) is likely to worsen the rote-completion problem, not fix it. Penalizing engineers (C) treats a process-design failure as a discipline problem. Removing it with nothing to replace it (D) throws away whatever genuine value the checks did provide instead of fixing the disconnect."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A multinational apparel retailer's platform team supports engineering hubs in three time zones. A recent production incident with a Claude-powered sizing-recommendation feature was handled entirely by the on-call engineer in one region, but the incident write-up was never shared with the other two regions, and a similar issue recurred in a different region's deployment two months later.",
    question: "What process gap most directly explains the recurrence?",
    options: [
      "The on-call engineer in the first region should have prevented the incident from happening at all",
      "There is no mechanism ensuring incident learnings are systematically shared and applied across all regions, not just documented locally",
      "The two regions should be merged into a single engineering team to avoid this problem",
      "Incidents should not be written up at all since write-ups take engineering time away from feature work"
    ],
    correct: 1,
    explanation: "The recurrence happened because knowledge from the first incident stayed siloed in one region instead of being systematically propagated — the fix is a cross-region mechanism (e.g., a shared incident review process or knowledge base) ensuring lessons reach everyone who could hit the same issue. Blaming the first engineer for not preventing the incident (A) misses that incidents are sometimes genuinely first-time surprises; the failure here is in propagation, not prevention. Merging regions (C) is a drastic organizational change disproportionate to a knowledge-sharing gap. Eliminating write-ups (D) would make the underlying problem worse, not better."
  },
  {
    domain: 7,
    difficulty: 5,
    scenario: "A global airline's platform team is three years into operating Claude-powered systems across customer service, crew scheduling assistance, and maintenance documentation. Leadership asks the platform team to propose a long-term operating model that balances continued innovation velocity with the operational maturity now expected of systems that have become business-critical, given that early-stage 'move fast' norms are increasingly colliding with reliability expectations from operations teams who now depend on these systems daily.",
    question: "Which proposal best reflects a mature, evolved operating model appropriate to this stage?",
    options: [
      "Continue exactly the early-stage 'move fast' norms indefinitely, since they got the organization to this point successfully",
      "Introduce a maturity-tiered model: classify systems by business criticality and blast radius, apply proportionally stricter reliability, testing, and change-management practices to higher-tier systems while preserving faster iteration for lower-tier or experimental systems, and revisit tier assignments as systems' real-world usage evolves",
      "Apply the strictest possible reliability and change-management process uniformly to every system, including experimental ones, to eliminate any future risk",
      "Transfer full ownership and operational responsibility for all three systems to a traditional IT operations team unfamiliar with Claude-specific tooling"
    ],
    correct: 1,
    explanation: "A maturity-tiered model that ties process rigor to actual business criticality and blast radius lets business-critical systems get the reliability rigor they now need while still preserving room for genuine experimentation elsewhere — and revisiting tiers as usage evolves keeps the model responsive rather than static. Continuing early-stage norms unchanged (A) ignores that reliability expectations have genuinely shifted as systems became business-critical. Applying maximum rigor everywhere (C) would strangle legitimate experimentation and is disproportionate for lower-stakes systems. Transferring ownership to a team unfamiliar with the specific tooling and failure modes (D) would likely degrade operational quality rather than improve it, discarding hard-won platform expertise."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A workers'-compensation insurance carrier's platform team is rolling out a new shared prompt-versioning system that all teams will be required to migrate to over the next quarter. Several teams have raised concerns that migration will consume sprint capacity they need for a major upcoming feature launch.",
    question: "What is the most effective way for the platform team to handle this rollout?",
    options: [
      "Enforce a single hard migration deadline for all teams regardless of their individual release schedules",
      "Cancel the migration effort entirely in response to the pushback",
      "Offer a flexible migration window with hands-on platform-team support for teams under near-term delivery pressure, and provide a clear, low-effort migration path (e.g., tooling/scripts) that minimizes the burden on any individual team",
      "Require teams under delivery pressure to migrate first, before teams with more available capacity"
    ],
    correct: 2,
    explanation: "A flexible window paired with concrete tooling to lower migration effort respects real, competing priorities across teams while still moving the organization toward the shared system, which is the balance a platform team needs to strike between organizational goals and team-level delivery pressure. A single hard deadline for everyone (A) ignores legitimate scheduling conflicts and risks either rushed, low-quality migrations or missed feature launches. Cancelling the effort (B) discards a legitimate organizational improvement over temporary friction. Forcing the most time-constrained teams to go first (D) is the opposite of what their situation calls for."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A university's internal IT engineering group is building its first Claude-powered student-advising chatbot. The two engineers assigned have no prior experience with agentic systems, and the platform team wants to help them avoid common early mistakes without slowing them down with heavyweight process.",
    question: "What is the most proportionate support the platform team can offer at this early stage?",
    options: [
      "Assign a platform engineer to co-review their design and initial implementation informally, point them to the relevant sections of existing shared libraries and documentation, and check in periodically rather than imposing a formal governance process",
      "Require them to complete the same certification and governance process used for large, business-critical production systems before writing any code",
      "Let them build entirely independently with no platform involvement until they hit a major problem",
      "Assign a platform engineer to build the chatbot for them so the two engineers can focus on other work"
    ],
    correct: 0,
    explanation: "Lightweight, informal support — design review, pointers to existing resources, periodic check-ins — matches the actual risk and scale of an early-stage project while still preventing avoidable mistakes, without the overhead a small early effort doesn't yet warrant. Full formal governance (B) is disproportionate for a small early-stage effort and would slow the team down unnecessarily. No involvement at all (C) risks avoidable, costly mistakes that light-touch support could easily prevent. Having a platform engineer build it for them (D) doesn't build the requesting team's own capability, which undermines the broader goal of raising the engineering floor."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A cybersecurity vendor's platform team discovers that a widely used internal Claude helper library, adopted by 18 of 20 teams, has an edge-case bug that under specific conditions silently drops part of a multi-turn conversation history, occasionally producing subtly incorrect responses. Because the library is so widely adopted, a fix requires careful coordination to avoid breaking existing integrations.",
    question: "What is the most responsible way for the platform team to handle the rollout of the fix?",
    options: [
      "Silently patch the library and let the version update happen automatically for all 18 teams without notice",
      "Delay any fix indefinitely because coordinating with 18 teams seems too disruptive",
      "Communicate the issue and its impact clearly to all affected teams, provide a tested fix with a migration/verification guide, and support a coordinated rollout with a way for teams to verify their own usage wasn't silently affected",
      "Ask each of the 18 teams to independently investigate whether they were affected and fix it themselves"
    ],
    correct: 2,
    explanation: "Given the correctness bug is silent and could have already produced subtly wrong outputs, transparent communication plus a verified fix and migration guidance lets each team assess and remediate real impact, while a coordinated rollout avoids uncoordinated breakage across widely adopted shared infrastructure. Silently patching with no notice (A) denies teams the chance to check whether they were already affected by past incorrect outputs. Delaying indefinitely (B) leaves a known correctness bug live indefinitely, which is not acceptable given the potential impact. Pushing investigation and fixes to each team independently (D) duplicates effort 18 times over for a shared-library bug the platform team is best positioned to fix once, centrally."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A car-sharing platform's engineering team recently automated their evaluation pipeline for a Claude-powered trip-support assistant, cutting evaluation time before each release from 2 days to 20 minutes. Three months later, the team notices genuine, user-visible quality issues are reaching production more often than before automation was introduced.",
    question: "What is the most likely cause the platform team should investigate first?",
    options: [
      "The automated evaluation set has not been kept up to date with new use cases and edge cases the feature now handles, so it no longer represents current real-world usage",
      "Automation is inherently less reliable than manual review and should be reverted",
      "The engineers are deploying too frequently now that evaluation is faster",
      "The model itself has become less capable over time"
    ],
    correct: 0,
    explanation: "A stale evaluation set is the most common and most directly checkable cause of automation missing real quality regressions — as the feature's real-world usage evolves, a fixed test set can drift out of alignment with what actually matters, silently eroding coverage. Automation isn't inherently less reliable (B) — the issue is almost always test set quality/coverage, not the concept of automation itself, and reverting would sacrifice a real productivity gain without addressing the root cause. Faster deployment cadence (C) isn't inherently a problem if the evaluation gate is actually catching regressions; the question states real issues are reaching production, meaning the gate itself is under-catching. Attributing this to the model becoming less capable (D) is speculative and not the first, most checkable explanation."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A national pharmacy chain's platform team is designing its incident postmortem process for Claude-powered systems. A recent postmortem draft for an incident where a prescription-refill reminder feature sent incorrect dosage information focused entirely on identifying which individual engineer wrote the flawed prompt and recommending they receive additional training.",
    question: "What is the most important critique of this postmortem's framing?",
    options: [
      "The postmortem is correct to focus on individual accountability, since someone did write the flawed prompt",
      "A blame-focused postmortem discourages future incident transparency and misses systemic contributing factors (e.g., missing evaluation coverage for dosage-related edge cases, absence of a review gate for high-risk content) that would recur regardless of which individual wrote the prompt",
      "Postmortems should never be written for incidents involving individual engineer errors",
      "The postmortem should instead focus on firing the engineer responsible"
    ],
    correct: 1,
    explanation: "Blame-focused postmortems discourage the psychological safety needed for future incident reporting and transparency, and they miss the systemic question that actually prevents recurrence: what process or tooling gap (like missing evaluation coverage for high-risk content) allowed this individual mistake to reach production undetected. Endorsing the individual-blame framing (A) repeats the flaw the question is asking to critique. Refusing to write postmortems for individual-error incidents (C) throws out a valuable improvement process. Recommending termination (D) is a punitive, non-systemic response disproportionate to what's known and doesn't address the actual gap that let the error ship."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A hotel booking platform's platform team is choosing how to structure its internal Slack support channel for Claude-related engineering questions, which has grown to over 500 messages a week as adoption has spread across the company. Currently it's a single undifferentiated channel where urgent production issues, casual how-to questions, and feature requests for the shared library are all mixed together.",
    question: "What restructuring would most improve both response quality and developer experience?",
    options: [
      "Shut the channel down and require all questions to be submitted via a ticketing system with a one-week SLA",
      "Leave it as a single channel but ask people to use more descriptive message titles",
      "Split into purpose-specific channels (e.g., production incidents/urgent, general how-to questions, library feature requests) so each stream can be triaged, staffed, and prioritized appropriately, with clear guidance on which channel to use when",
      "Require every question to be approved by a moderator before being posted"
    ],
    correct: 2,
    explanation: "Splitting by purpose lets urgent production issues get the fast triage they need without being buried under casual questions, while how-to questions and feature requests can be handled on appropriate timelines by appropriate people — this directly addresses the mixed-priority problem. Shutting down real-time support for a one-week-SLA ticketing system (A) would badly hurt response time for genuinely urgent issues. Just improving message titles (B) doesn't fix the structural mixing of urgent and non-urgent traffic. Requiring moderator pre-approval for every message (D) adds friction and delay to a support channel that is supposed to be fast."
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "A junior engineer on a hospital network's IT team asks their platform-team lead why the organization bothers running a dedicated on-call rotation for its Claude-powered clinical-intake assistant instead of just having engineers check on it occasionally during business hours.",
    question: "What is the best explanation of why dedicated on-call matters for this kind of system?",
    options: [
      "On-call exists mainly so engineers can be paid overtime",
      "On-call ensures that issues affecting a system people depend on are detected and responded to promptly, regardless of when they occur, rather than sitting unnoticed until someone happens to check",
      "On-call is only needed for systems that have never had an incident before",
      "On-call is a purely symbolic practice with no real operational benefit"
    ],
    correct: 1,
    explanation: "Dedicated on-call exists because production issues don't wait for business hours, and for a system people actively depend on, prompt detection and response meaningfully reduces the duration and impact of incidents compared to ad hoc, occasional checking. Overtime pay (A) may be a side effect in some organizations but is not the operational rationale for having on-call. On-call is arguably most valuable for systems that haven't yet had an incident, since untested failure modes are the ones most likely to go unnoticed without active monitoring (C reverses the logic). Calling it purely symbolic (D) ignores its real, measurable effect on incident detection and response time."
  }
];
