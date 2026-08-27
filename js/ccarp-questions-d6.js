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
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A regional bank is three weeks into a 90-day pilot of a Claude-powered loan document summarization tool used by a small group of underwriters. The Chief Risk Officer, who sponsored the pilot, asks the architecture lead for a status update ahead of a board meeting.",
    question: "Which update best matches what a 90-day pilot at this stage should be able to report?",
    options: [
      "A confirmed go-live date for full rollout across all underwriting teams",
      "Early usage patterns, underwriter feedback so far, and the specific accuracy and edge-case data still being collected before a go/no-go recommendation can be made",
      "A statement that the pilot is going well and no issues have been found",
      "A request to end the pilot early since three weeks of data is inconclusive"
    ],
    correct: 1,
    explanation: "At the three-week mark of a 90-day pilot, the honest and useful update is a progress snapshot plus a clear description of what evidence is still being gathered — this sets accurate expectations. Committing to a rollout date (A) overpromises before evidence exists, a vague reassurance (C) isn't board-credible, and ending the pilot early (D) discards the plan without cause."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A hospital network's clinical documentation assistant, built on Claude, has been in production for a year and is well-liked by physicians. The VP of Clinical Informatics who championed the project has just left the organization, and no successor has been named to own the relationship with the vendor and engineering teams.",
    question: "What should the architecture lead prioritize in response?",
    options: [
      "Continue operating the system as-is, since the technical architecture doesn't depend on any one person",
      "Pause the system until a new executive sponsor is named",
      "Proactively identify and brief a new accountable owner, documenting the system's current health, known risks, and upcoming decisions so continuity isn't lost during the transition",
      "Escalate directly to the CEO to request an emergency sponsor appointment"
    ],
    correct: 2,
    explanation: "Losing a system's champion is a lifecycle risk even when the technology itself is stable — decisions about budget, scope, and future investment still need an accountable owner. Proactively briefing a successor preserves institutional knowledge and continuity. Assuming nothing needs to change (A) ignores real organizational risk, pausing production (B) is disruptive and unnecessary, and escalating straight to the CEO (D) skips appropriate channels for what is usually a resolvable staffing gap."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "An e-commerce company's merchandising team wants to ship a Claude-powered product description generator to all 40,000 SKUs next week to hit a marketing deadline. The architecture lead's team has only validated the system against a sample of 500 SKUs from two categories, and quality on long-tail categories is untested.",
    question: "How should the architecture lead handle this pressure?",
    options: [
      "Agree to the full rollout to meet the deadline, since most SKUs are likely similar enough to the tested sample",
      "Refuse to discuss timelines until testing is complete",
      "Propose a phased rollout that hits the marketing deadline for the validated categories while giving a specific, evidence-based timeline for extending coverage to untested categories",
      "Escalate to the merchandising team's leadership that the deadline is unrealistic and should be dropped entirely"
    ],
    correct: 2,
    explanation: "A phased approach lets the business hit part of its goal now while being transparent about what hasn't been validated yet — this is the professional way to manage scope pressure without either capitulating to unfounded risk or stonewalling the business. Assuming untested categories will be fine (A) risks a quality incident, refusing to engage (B) damages trust and stalls progress, and unilaterally declaring the deadline unrealistic (D) forecloses a workable middle path."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A SaaS company's customer success team has started fielding questions from enterprise clients about whether the company's new Claude-powered contract analysis feature can be trusted to catch every non-standard clause in a contract.",
    question: "What is the most appropriate way to communicate the feature's capabilities to clients?",
    options: [
      "State clearly that the tool is a first-pass reviewer designed to flag likely areas of concern for human legal review, not a guarantee of complete clause detection",
      "Avoid the topic since discussing limitations could reduce client confidence in the product",
      "Tell clients the tool has near-perfect accuracy to build confidence in the new feature",
      "Refer all client questions to the engineering team so customer success doesn't have to answer them"
    ],
    correct: 0,
    explanation: "Setting an accurate, specific expectation about what the tool does and doesn't guarantee protects both the client and the company from downstream harm and liability. Avoiding the topic (B) or overstating accuracy (C) both risk clients relying on the tool in ways it wasn't designed for, and deflecting every question to engineering (D) is not scalable and doesn't actually answer the client's concern."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A logistics company's Claude-powered dispatch recommendation system has been running in production for two years. A newer optimization engine now outperforms it on every measured metric, and the architecture lead needs to plan the sunset of the original system without disrupting the regional operations teams who rely on it daily.",
    question: "What should the sunset plan include first?",
    options: [
      "An announcement that the old system will be turned off in two weeks to force adoption of the new one",
      "A parallel-run period, a clear cutover date communicated well in advance, and a documented fallback path in case the new system underperforms in any region",
      "Silently rerouting traffic to the new system without informing the operations teams, since the new system is objectively better",
      "Leaving both systems running indefinitely to avoid the risk of a disruptive transition"
    ],
    correct: 1,
    explanation: "A responsible deprecation plan gives affected users transition time, evidence the replacement is safe in their specific context, and a way to recover if something goes wrong. Ambushing users with an accelerated timeline (A) or a silent switch (C) breaks trust and risks operational disruption, while indefinitely running both systems (D) avoids the lifecycle decision rather than managing it."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "During a quarterly business review, a manufacturing company's COO asks why the Claude-powered predictive maintenance advisory system costs more per month than originally budgeted, while also asking why response quality hasn't improved further since launch.",
    question: "How should the architecture lead frame the trade-off discussion?",
    options: [
      "Explain that cost, quality, and speed are interconnected, then present the specific levers available (e.g., model tier, context size, caching) and what changing each would do to cost and quality",
      "Commit to reducing costs next quarter while also improving quality, without specifying how",
      "Explain that the budget was underestimated and ask for a larger allocation with no further detail",
      "Suggest switching to a cheaper model across the board without discussing the quality impact"
    ],
    correct: 0,
    explanation: "Executives often want cost, quality, and speed simultaneously improved without understanding they trade off against each other; the architecture lead's job is to make those trade-offs concrete and let leadership make an informed choice. Promising all three without a mechanism (B) sets up a future credibility problem, asking for more budget with no justification (C) doesn't build trust, and silently cutting cost (D) risks a quality regression nobody agreed to."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A state government agency is piloting a Claude-powered assistant to help caseworkers navigate benefits eligibility rules. A caseworker who has used the tool for a week tells the project lead it should be able to make final eligibility determinations on its own.",
    question: "How should the architecture lead respond to this misunderstanding?",
    options: [
      "Let the caseworker continue using it that way since the tool is highly accurate",
      "Clarify the tool's intended role as a decision-support aid, explain why final determinations require human accountability under agency policy, and offer to walk through examples of where the tool's guidance should be verified",
      "Disable the caseworker's access until they complete a lengthy retraining program",
      "Tell the caseworker their concern is out of scope and to direct questions to IT"
    ],
    correct: 1,
    explanation: "A stakeholder misunderstanding the system's role is a common and correctable communication gap — the right response is a direct, respectful clarification paired with concrete examples, not punitive access removal or deflection. Allowing the misuse to continue (A) creates real compliance and accountability risk in a government benefits context."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "Two weeks before a scheduled production launch, a media company's legal team raises a last-minute concern that a Claude-powered content moderation assistant might not adequately handle a specific category of regulated content in one market. Product leadership wants to launch on schedule everywhere.",
    question: "What is the best path for the architecture lead to propose?",
    options: [
      "Delay the entire global launch until the concern is fully resolved in every market",
      "Launch on schedule in markets without the regulatory concern, and hold the launch in the affected market until legal's concern is specifically addressed and verified",
      "Launch everywhere as planned and address the legal concern reactively if it becomes a problem",
      "Ask legal to formally withdraw their objection so the launch can proceed as scheduled"
    ],
    correct: 1,
    explanation: "Segmenting the launch by market lets the business capture value where there's no unresolved risk while treating the flagged regulatory concern with the seriousness it deserves. A blanket delay (A) punishes markets with no issue, launching everywhere and hoping (C) is an unacceptable risk in a regulated content category, and pressuring legal to withdraw its objection (D) is not a legitimate way to manage a real compliance concern."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A telecom provider's Claude-powered billing dispute assistant experienced a four-hour outage during a high-traffic period. The incident is resolved, and the VP of Customer Operations has asked for a retrospective summary to share with her leadership team.",
    question: "What should the retrospective communication emphasize?",
    options: [
      "A detailed technical log of every system call made during the incident",
      "A brief note that the issue is fixed and won't happen again",
      "A clear timeline of what happened, customer impact, the root cause once confirmed, and concrete follow-up actions with owners and dates",
      "An explanation of why the outage wasn't the architecture team's fault"
    ],
    correct: 2,
    explanation: "A retrospective aimed at a non-technical leadership audience should be structured around impact, cause, and accountable next steps rather than raw technical detail — this builds confidence that the issue is understood and being addressed. A bare technical log (A) isn't consumable by this audience, a vague reassurance (B) lacks credibility, and framing the update around blame avoidance (D) undermines trust rather than building it."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "An insurance company's claims processing team and its product management team disagree about whether a Claude-powered claims summarizer is 'ready.' Engineering believes accuracy metrics meet the agreed bar; product argues that adjusters' subjective trust in the tool is still too low to proceed to full rollout.",
    question: "What is the most constructive way for the architecture lead to resolve this disagreement?",
    options: [
      "Side with engineering since the quantitative metrics were met and metrics should govern the decision",
      "Side with product since user trust ultimately determines adoption regardless of metrics",
      "Facilitate a joint review that separates the two concerns — verify whether the accuracy metrics are actually the right proxy for adjuster trust, and if not, define what additional signal or exposure would close that gap",
      "Delay the rollout decision indefinitely until both teams independently agree"
    ],
    correct: 2,
    explanation: "This disagreement often reflects that the agreed metric and the real success criterion (adjuster trust) have quietly diverged — the architecture lead's role is to make that visible and define what evidence would resolve it, not to arbitrate by authority. Picking a side outright (A or B) skips the diagnostic step, and indefinite delay (D) avoids the decision rather than making progress on it."
  },
  {
    domain: 6,
    difficulty: 1,
    scenario: "A non-profit organization's program staff, who have no technical background, will begin using a new Claude-powered grant-writing assistant next month. The architecture lead is preparing an onboarding session.",
    question: "What should the onboarding session primarily focus on?",
    options: [
      "The model architecture and API integration details behind the tool",
      "What the tool is for, how to use it effectively, its known limitations, and where to get help",
      "A comparison of Claude to other AI models the organization considered",
      "The full technical incident response runbook"
    ],
    correct: 1,
    explanation: "Onboarding a non-technical stakeholder group should center on practical usage, purpose, and limitations — the information they actually need to use the tool well and know when to be cautious. Architecture internals, model comparisons, and incident runbooks are not relevant to this audience and would distract from effective adoption."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A gaming studio's live-ops team wants to expand a Claude-powered in-game player support chatbot from one title to five titles simultaneously, citing strong pilot results on the first title. The architecture lead knows the pilot only tested a narrow set of support scenarios common to that one game's genre.",
    question: "What should the architecture lead communicate to live-ops leadership?",
    options: [
      "Approve the five-title expansion as requested, since the pilot results were strong",
      "Explain that the pilot validated a narrow scenario set, recommend expanding to titles with similar support patterns first, and define what evidence is needed before extending to more divergent titles",
      "Reject the expansion outright until every title has been individually piloted from scratch",
      "Approve the expansion but quietly monitor for problems without telling leadership about the scope gap"
    ],
    correct: 1,
    explanation: "Generalizing a pilot's success to contexts it didn't test is a common overreach; the right move is to be explicit about what was and wasn't validated and propose a risk-ordered expansion path. Blanket approval (A) risks quality issues on dissimilar titles, requiring a from-scratch pilot on every title (C) is overly conservative given genuinely similar titles exist, and silently monitoring without disclosure (D) withholds information leadership needs to make the call themselves."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A utility company's outage-prediction system, powered by Claude, correctly flagged an unusual pattern that engineers initially dismissed as noise; a transformer failure occurred six hours later. Leadership wants a report on the incident, and some engineers feel defensive about having dismissed the flag.",
    question: "What tone and content should the architecture lead's incident report take?",
    options: [
      "Focus on documenting individual engineers' decisions so accountability is clear",
      "Focus on what the system detected, what decision process led to it being dismissed, and what process change would prevent a similar miss — without singling out individuals",
      "Omit the fact that the system had actually flagged the issue, to avoid raising process questions",
      "Recommend removing human review from the alert pipeline entirely so this can't happen again"
    ],
    correct: 1,
    explanation: "A blameless, process-focused retrospective produces honest information and durable fixes, while naming individuals (A) discourages future teams from surfacing similar judgment calls. Hiding that the system had actually flagged the issue (C) is a serious integrity failure, and removing human review entirely (D) is an overcorrection that ignores the value of human oversight in most other cases."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A real estate brokerage is rolling out a Claude-powered listing description generator to agents nationwide after a successful three-market pilot. Several regional managers ask what ongoing support will look like once the pilot team moves on to other work.",
    question: "What should the transition-to-production plan communicate to regional managers?",
    options: [
      "That the pilot team will remain the sole point of contact indefinitely",
      "That support will be figured out informally once issues arise",
      "A defined ongoing support model — clear ownership, escalation paths, and a feedback channel — that takes effect at the production handoff",
      "That agents should contact the underlying AI provider's public support channel directly"
    ],
    correct: 2,
    explanation: "A pilot-to-production transition should include an explicit, sustainable support model, since the informal, high-touch support common during a pilot usually isn't scalable to nationwide production use. Leaving the pilot team as permanent support (A) doesn't scale, figuring it out reactively (B) creates gaps stakeholders will notice immediately, and routing internal users to a third-party public support channel (D) is inappropriate for an internally deployed business tool."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A B2B software company's largest customer, representing 15% of ARR, is pressuring the account team to get early access to a Claude-powered analytics summarization feature still in internal beta with known reliability issues on large datasets.",
    question: "What should the architecture lead recommend to the account team?",
    options: [
      "Grant early access without restriction, since the customer's size justifies the risk",
      "Deny the request outright and offer no alternative",
      "Offer early access scoped to the customer's smaller datasets where reliability has been validated, with explicit disclosure of the current limitations on large datasets",
      "Tell the customer the feature isn't ready and give no further information"
    ],
    correct: 2,
    explanation: "A scoped early-access offer paired with honest disclosure lets a high-value customer get real value now without exposing them to a known failure mode, which is more sustainable than either an unrestricted rollout or a flat refusal. Granting unrestricted access (A) risks a visible failure with the company's most important customer, and both blunt refusals (B and D) forgo a reasonable middle path and risk damaging the relationship."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A law firm's internal Claude-powered legal research assistant has been used successfully by the litigation practice group for six months. The corporate transactions practice group now wants access but has very different document types and research patterns than litigation.",
    question: "What should happen before granting the corporate transactions group full access?",
    options: [
      "Grant immediate full access since the underlying tool has already proven reliable",
      "Deny access since the tool was built for litigation's use case only",
      "Run a scoped evaluation against representative corporate transactions work to confirm performance holds, then onboard with expectations calibrated to that group's specific document types and workflows",
      "Require the corporate transactions group to independently validate the tool without support from the architecture team"
    ],
    correct: 2,
    explanation: "Proven reliability in one domain doesn't automatically transfer to a group with different document types and workflows, so a scoped validation plus tailored onboarding is the responsible path before expanding access. Assuming the prior success generalizes (A) risks a poor first experience for the new group, an outright denial (B) unnecessarily blocks a plausible expansion, and leaving the new group to validate alone (D) abandons them without the support a cross-functional rollout needs."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national retailer's CFO asks the architecture lead to justify the ROI of a Claude-powered inventory forecasting assistant ahead of the next budget cycle. Early results are promising but the sample size is still small and seasonal effects haven't been observed yet.",
    question: "What is the most credible way to report ROI at this stage?",
    options: [
      "Extrapolate the early results to a full-year ROI projection to give the CFO a clean number",
      "Report the honest current results, clearly label them as preliminary and pre-seasonal, and specify the additional data collection timeline needed for a defensible full-year estimate",
      "Decline to provide any numbers until a full year of data is available",
      "Report only qualitative feedback from the inventory team and avoid quantitative claims altogether"
    ],
    correct: 1,
    explanation: "Credible ROI reporting distinguishes between what's been observed and what's projected, and is explicit about the limits of the current sample — this is what a CFO needs to make a sound budget decision. Extrapolating a small, pre-seasonal sample to a full year (A) risks a misleading number, refusing to report anything (C) is unhelpfully evasive, and dropping quantitative data entirely (D) omits information the CFO specifically needs."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A university's student services department has deployed a Claude-powered academic advising chatbot for course registration questions. A faculty senate member, unfamiliar with the system, publicly states in a meeting that the tool is 'making academic decisions for students.'",
    question: "What is the best response for the architecture lead to prepare for the department head to deliver?",
    options: [
      "A public correction that dismisses the faculty member's concern as uninformed",
      "A factual clarification of the tool's actual scope (answering informational questions, not making advising decisions), paired with an offer to walk the faculty senate through how it works",
      "No response, to avoid drawing further attention to the tool",
      "An announcement that the tool will be discontinued to avoid controversy"
    ],
    correct: 1,
    explanation: "A public misunderstanding about system scope should be met with a factual, non-defensive clarification and an invitation to build shared understanding, which protects both the tool's credibility and the relationship with faculty governance. Dismissing the concern (A) is likely to escalate tension, staying silent (C) lets the mischaracterization stand uncorrected, and discontinuing the tool (D) is a drastic overreaction to a communication gap."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "An energy company's field technicians rely on a Claude-powered equipment troubleshooting assistant. A new safety regulation now requires that any AI-assisted diagnostic recommendation affecting high-voltage equipment be logged with a human sign-off. Technicians are frustrated that this slows down their workflow.",
    question: "How should the architecture lead communicate this change to the field technician stakeholder group?",
    options: [
      "Implement the sign-off requirement silently in the next software update without explanation",
      "Explain the regulatory driver behind the change, acknowledge the added workflow step honestly, and highlight any way the sign-off process has been streamlined to minimize burden",
      "Tell technicians the slowdown is temporary and will be removed once the regulation is no longer being enforced",
      "Delay implementing the requirement until technicians stop complaining"
    ],
    correct: 1,
    explanation: "Explaining the regulatory 'why' and being honest about the trade-off, while showing what's been done to minimize friction, is the respectful way to manage a mandatory but unpopular change. Rolling it out silently (A) breeds confusion and resentment, promising the requirement is temporary when it's regulatory (C) is dishonest and will backfire, and delaying a safety-driven regulatory requirement (D) creates compliance risk."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A supply chain company's Claude-powered shipment exception handler has been performing well, but a routine audit reveals it occasionally mislabels the severity of exceptions in a way that hasn't caused harm yet but plausibly could. No customer or leadership has raised a concern.",
    question: "What should the architecture lead do?",
    options: [
      "Say nothing until an actual incident occurs, to avoid raising unnecessary alarm",
      "Proactively report the finding to relevant stakeholders with severity context, a risk assessment, and a remediation timeline, even though no incident has occurred",
      "Quietly fix the issue in the background without documenting or reporting it",
      "Immediately halt the system in production until the issue is fully resolved"
    ],
    correct: 1,
    explanation: "Proactively surfacing a latent risk with context and a remediation plan builds long-term trust and allows stakeholders to make informed decisions, even absent a triggering incident. Staying silent (A) or fixing it quietly without disclosure (C) both withhold material information stakeholders should have, while a full production halt (D) is disproportionate to a not-yet-realized risk and should be a stakeholder-informed decision, not a unilateral one."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A pharmaceutical company's regulatory affairs team is preparing a submission that references a Claude-powered document classification system used in trial data management. An external auditor asks the architecture lead to explain, in plain terms, how the system's outputs are validated before being trusted.",
    question: "What should the explanation emphasize?",
    options: [
      "The number of parameters in the underlying model and its training methodology",
      "The specific validation process — sampling methodology, accuracy thresholds, human review checkpoints, and how errors are caught before affecting the submission",
      "A general assurance that the vendor is reputable and trustworthy",
      "A comparison to how other pharmaceutical companies use similar tools"
    ],
    correct: 1,
    explanation: "An auditor needs to understand the concrete quality-assurance process — sampling, thresholds, and human checkpoints — because that is what actually establishes trust in the outputs for a regulatory submission. Model internals (A) aren't relevant to validation practice, vendor reputation alone (C) isn't sufficient evidence for an audit, and industry comparisons (D) don't answer the specific question asked."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A consumer electronics retailer's marketing team wants to publicly announce that its new Claude-powered shopping assistant 'understands exactly what you want.' The architecture lead knows the system performs well on common queries but degrades noticeably on ambiguous or multi-step requests.",
    question: "What should the architecture lead advise regarding this marketing claim?",
    options: [
      "Approve the claim as written since it will drive engagement with the new feature",
      "Block the announcement entirely until the assistant handles all query types equally well",
      "Recommend more accurate language describing the assistant's actual strengths, and flag the specific risk that overpromising will create disappointing first experiences and public complaints on the harder query types",
      "Let marketing publish the claim but privately prepare a statement in case of backlash"
    ],
    correct: 2,
    explanation: "The architecture lead's role includes protecting the company from claims the system can't reliably back up — proposing accurate alternative language addresses the marketing goal without the reputational risk. Approving the overstated claim (A) invites public disappointment, blocking the launch entirely (B) is an overcorrection when the assistant does perform well on common cases, and quietly preparing a defensive statement (D) accepts foreseeable harm rather than preventing it."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A property management company's maintenance request triage system, powered by Claude, is being expanded from residential properties to commercial properties. The facilities team, the tenant relations team, and the finance team all depend on different aspects of its output and have not yet been brought into a shared planning conversation.",
    question: "What should the architecture lead do before the expansion proceeds?",
    options: [
      "Proceed with the expansion and let each team raise concerns individually as they arise",
      "Convene a joint working session with all three stakeholder groups to align on shared requirements, surface conflicting needs early, and agree on success criteria before implementation begins",
      "Let the facilities team, as the primary requester, define requirements alone since they requested the expansion",
      "Delay the expansion until each team has independently signed off in writing, without a shared discussion"
    ],
    correct: 1,
    explanation: "When multiple stakeholder groups depend on the same system output for different purposes, a joint session surfaces conflicting requirements before they become costly rework, which is more effective than sequential or siloed sign-off. Proceeding without alignment (A) risks building something that satisfies only the loudest team, letting one team unilaterally define requirements (C) ignores the others' needs, and independent sign-offs without discussion (D) can still leave hidden conflicts unresolved."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A multinational bank's Claude-powered anti-money-laundering alert triage system is used across twelve country offices, each with different regulatory requirements and risk tolerances. Global compliance leadership wants one unified rollout of a major system upgrade, while several country offices want to delay pending their own local regulatory review.",
    question: "What is the most defensible approach for the architecture lead to recommend?",
    options: [
      "Insist on a single unified rollout date for all twelve offices to maintain consistency and avoid the complexity of a staggered approach",
      "Let each country office decide independently and unilaterally, with no central coordination",
      "Propose a staged rollout sequenced by regulatory readiness, with a shared upgrade design and a clear governance process for offices needing local review, while keeping global compliance informed of both the common core and the local variances",
      "Delay the entire global rollout until all twelve offices have completed local regulatory review"
    ],
    correct: 2,
    explanation: "In a multi-jurisdiction regulated environment, forcing uniform timing (A) ignores genuine local compliance obligations, while fully decentralized decision-making (B) sacrifices the consistency and central visibility global compliance legitimately needs. A staged rollout with a shared design and clear governance respects both local regulatory timelines and the need for coordinated oversight; waiting for all twelve to clear review before any progress (D) unnecessarily blocks offices that are ready."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A subscription meal-kit company's customer service Claude assistant handles refund requests. Leadership wants a weekly dashboard metric that shows the system is 'performing well,' but the architecture lead is concerned that a single top-line satisfaction score could mask category-specific problems.",
    question: "What should the architecture lead propose for the weekly reporting format?",
    options: [
      "Report only the top-line satisfaction score leadership asked for, since simplicity is valued",
      "Report the top-line score alongside a small set of leading indicators (e.g., escalation rate by issue category, resolution time distribution) that would surface emerging problems before they affect the top-line number",
      "Replace the single score with a dense technical dashboard covering every available metric",
      "Report the top-line score only when it is favorable, and hold back unfavorable weeks pending investigation"
    ],
    correct: 1,
    explanation: "A credible health report gives leadership the simple number they want while adding a small number of leading indicators that would catch a developing problem early — this balances simplicity with genuine visibility. Reporting only the top-line score (A) risks masking category-specific issues, a dense all-metrics dashboard (C) overwhelms a leadership audience, and selectively withholding unfavorable data (D) is a serious integrity failure."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A public transit agency is preparing to end its pilot of a Claude-powered rider question-answering chatbot on its website, after a competing internally-built tool outperformed it. Several employees who supported the original pilot are attached to the project.",
    question: "What is the most professional way to communicate the sunset decision internally?",
    options: [
      "Announce the decision in an all-staff email with no context, to move on quickly",
      "Explain the comparative evaluation results that drove the decision, acknowledge the team's work on the pilot, and give a clear timeline for wind-down and any data or lessons being carried forward",
      "Let the pilot quietly lapse without a formal announcement so no one has to have an uncomfortable conversation",
      "Delay the decision indefinitely to avoid disappointing the team that built it"
    ],
    correct: 1,
    explanation: "A respectful sunset communication explains the evidence behind the decision, acknowledges the contributors' work, and gives a concrete transition plan — this maintains trust even when the news is unwelcome. An email with no context (A) feels dismissive, letting it lapse silently (C) creates confusion, and indefinite delay (D) avoids a decision the evidence already supports."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national grocery chain's Claude-powered demand forecasting assistant has driven measurable waste reduction in pilot stores. The CEO wants to announce the results publicly at an investor call in three days, but the architecture lead knows the current sample excludes stores in extreme climates, where performance is untested.",
    question: "What should the architecture lead recommend to whoever is preparing the CEO's talking points?",
    options: [
      "Let the CEO present the full results as representative of expected chain-wide performance",
      "Recommend the CEO present the validated results scoped explicitly to the tested store conditions, and describe extreme-climate stores as a next validation phase rather than an already-proven outcome",
      "Ask the CEO to avoid mentioning the pilot at all in the investor call",
      "Recommend delaying the investor call until extreme-climate testing is complete"
    ],
    correct: 1,
    explanation: "Scoping the public claim to what was actually tested avoids setting up a credibility problem if extreme-climate performance turns out differently, while still letting the company share a genuinely strong result. Presenting the results as universally representative (A) risks investor and market expectations that outstrip the evidence, omitting the results entirely (C) forgoes real positive news, and delaying an investor call over one untested segment (D) is disproportionate given the pilot has clear, presentable results."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A telehealth company's clinical triage assistant, powered by Claude, is functioning correctly, but a widely shared social media post falsely claims it gave a dangerous recommendation to a patient. Internal logs show no such interaction occurred. Leadership is anxious about reputational damage.",
    question: "What is the most responsible public communication approach?",
    options: [
      "Issue a swift public statement disputing the claim, provide the factual clarification the logs support, and note that patient privacy prevents sharing case-specific details, without dismissing the underlying concern about AI safety",
      "Say nothing publicly and wait for the story to fade on its own",
      "Publicly threaten legal action against the person who made the claim",
      "Publicly release the patient's interaction logs to prove the claim is false"
    ],
    correct: 0,
    explanation: "A prompt, factual correction that respects patient privacy while still acknowledging the legitimate underlying concern about AI safety in healthcare is the responsible path — it protects the company's credibility without either escalating conflict or appearing evasive. Silence (B) allows a false claim to stand uncontested, threatening legal action (C) is disproportionate and reputationally risky, and releasing private patient data (D) would itself be a serious privacy violation."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A construction firm's project estimation assistant, built on Claude, is used by regional offices with varying levels of technical sophistication. One region's office manager has stopped using the tool after a single bad output, telling colleagues it 'can't be trusted.'",
    question: "What is the best way for the architecture lead to address this specific stakeholder's disengagement?",
    options: [
      "Mandate that the office manager use the tool regardless of their concerns",
      "Ignore the individual case since one user's experience isn't statistically significant",
      "Follow up directly to understand what happened, review the specific output with them, explain whether it reflects a known limitation or an anomaly, and rebuild confidence with a concrete plan for how similar cases should be handled going forward",
      "Send a general reminder email to all regions about the tool's benefits without addressing the specific incident"
    ],
    correct: 2,
    explanation: "A disengaged stakeholder after a bad experience needs a direct, specific follow-up that treats their concern seriously and either explains the anomaly or acknowledges a real limitation with a plan to handle it — this is how trust gets rebuilt. Mandating continued use without addressing the concern (A) breeds resentment, ignoring an individual case (B) risks losing a user's cooperation and future adoption of the tool, and a generic email (D) doesn't address what actually happened."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A financial advisory firm's compliance officer, new to working with AI systems, asks the architecture lead to explain in a one-page memo how the firm's Claude-powered client communication drafting tool ensures messages stay compliant with financial disclosure regulations.",
    question: "What should the memo prioritize?",
    options: [
      "A description of the model's training data and architecture",
      "A clear explanation of the compliance controls around the tool — required disclosures embedded in templates, human review checkpoints, and audit logging — rather than claims about the model's inherent understanding of regulations",
      "An assurance that the model has read and memorized all relevant regulations",
      "A comparison of Claude's compliance capabilities to competing AI vendors"
    ],
    correct: 1,
    explanation: "A compliance officer needs to understand the actual control structure surrounding the tool — the process guarantees, not model internals or unverifiable claims about the model's knowledge. Describing training data (A) doesn't answer the compliance question, claiming the model has 'memorized' regulations (C) is an overstatement that would mislead the compliance officer, and a vendor comparison (D) is not what was asked for."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national pharmacy chain is six months into scaling a Claude-powered prescription interaction checker from three pilot stores to eight hundred stores nationwide. Two weeks into the rollout, a handful of pharmacists report the assistant's warnings feel less relevant to their specific patient population than they did in the pilot stores.",
    question: "What should the architecture lead do first?",
    options: [
      "Dismiss the feedback since it comes from a small number of the eight hundred stores",
      "Pause the entire national rollout immediately based on the early reports",
      "Investigate whether the pilot stores' patient population and prescribing patterns were representative of the broader rollout, using the specific pharmacist reports as a starting point, before deciding whether to adjust the rollout pace",
      "Tell the reporting pharmacists to continue using the tool as-is since it was already validated in the pilot"
    ],
    correct: 2,
    explanation: "Early operational feedback during a scale-up is exactly the kind of signal that should trigger investigation into whether the pilot's validation generalizes to the broader population — this is a core pilot-to-production risk. Dismissing the feedback (A) risks missing a real generalization gap, an immediate full pause (B) is a disproportionate reaction to a handful of reports before investigation, and telling pharmacists to disregard their own clinical judgment (D) is inappropriate in a patient-safety context."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A staffing agency's resume screening assistant, powered by Claude, is being scaled from one internal recruiting team to the entire company. The head of talent acquisition wants to skip a bias audit to hit an aggressive scaling timeline, arguing the pilot team never flagged any issues.",
    question: "How should the architecture lead respond?",
    options: [
      "Agree to skip the audit since the pilot team's experience is a reasonable proxy for the whole company",
      "Explain that a single team's pilot experience is not sufficient evidence of fairness across a broader and more diverse applicant pool, and propose a scoped audit timeline that fits as tightly as possible into the scaling plan without skipping it",
      "Refuse to discuss the timeline at all until a comprehensive multi-month audit is complete",
      "Escalate the head of talent acquisition's request as a compliance violation to legal without first having the conversation directly"
    ],
    correct: 1,
    explanation: "One pilot team not flagging issues is weak evidence of fairness at company-wide scale, especially for a system with real hiring impact; the professional response engages with the timeline pressure while still insisting the audit happen, proposing the fastest responsible path. Simply agreeing to skip it (A) accepts unacceptable risk, an unbounded multi-month delay (C) may be more caution than necessary, and escalating to legal before even having the direct conversation (D) skips a reasonable first step in stakeholder management."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A wealth management firm's Claude-powered portfolio commentary generator produced a factually incorrect market statistic in a report that was sent to twelve clients before the error was caught. The firm's compliance team wants to know how the architecture lead will explain this to affected clients.",
    question: "What is the most appropriate communication approach with the affected clients?",
    options: [
      "Send no correction, since the error is minor and unlikely to be noticed",
      "Send a prompt, direct correction acknowledging the specific error, providing the accurate information, and briefly noting what process change is being made to catch this earlier",
      "Wait until the next scheduled report to quietly include the correct figure without acknowledging the earlier error",
      "Send a broad apology without specifying what was wrong or what the correct figure is"
    ],
    correct: 1,
    explanation: "In a regulated financial context, a direct, specific correction with a stated process improvement is both the ethical and professionally expected response to a factual error reaching clients. Staying silent (A) or quietly correcting it later (C) both risk clients acting on wrong information and discovering the omission, and a vague apology without specifics (D) doesn't actually give clients what they need to correct their own records."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A logistics software vendor's largest enterprise client is threatening to churn unless the vendor commits, in writing, to a specific accuracy percentage for its Claude-powered route optimization explanations — a number the architecture lead knows fluctuates by route complexity and cannot be guaranteed as a fixed figure.",
    question: "What should the architecture lead advise the account team to propose instead?",
    options: [
      "Agree to the fixed accuracy commitment to retain the client, and address any shortfall internally later",
      "Refuse to offer any commitment at all and let the client walk if they're not satisfied",
      "Propose a commitment structured around measurable service-level ranges tied to route complexity categories, with transparent ongoing reporting, rather than a single fixed number that can't be honestly guaranteed",
      "Offer a fixed accuracy number that is comfortably low so it's easy to meet"
    ],
    correct: 2,
    explanation: "Committing to a number that isn't honestly achievable across all conditions (A) sets up a future breach of trust or contract, while refusing any commitment (B) may needlessly lose the client when a defensible alternative exists. A tiered, transparent commitment structure gives the client real accountability without promising something that can't be guaranteed; deliberately lowballing a target to make it trivially achievable (D) is a form of the same dishonesty as overpromising."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A city government's Claude-powered permit application assistant has been running for eighteen months. A newly elected city council member publicly questions why taxpayer money continues to fund the system and asks for a public accounting of its value.",
    question: "What should the architecture lead's response emphasize?",
    options: [
      "Technical details about the system's architecture and how it was built",
      "Concrete, verifiable outcomes — processing time reduction, cost per application, resident satisfaction data — presented in terms a public, non-technical audience can evaluate",
      "An assurance that the system is state-of-the-art AI technology",
      "A comparison of the system to what other cities are doing, without addressing this city's own results"
    ],
    correct: 1,
    explanation: "Public accountability for taxpayer-funded systems requires concrete, verifiable outcome data presented in terms the public and elected officials can independently evaluate — this is the credible basis for continued funding. Technical architecture detail (A) doesn't answer a value question, vague claims about being 'state-of-the-art' (C) aren't evidence, and deflecting to what other cities do (D) avoids answering for this system's own performance."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A cybersecurity firm's Claude-powered alert summarization tool for its SOC analysts has been in production for a year. A newly hired CISO wants a full re-justification of the system's continued use, having inherited it without context, and is skeptical of AI tools in a security context by default.",
    question: "What is the best way for the architecture lead to approach this stakeholder?",
    options: [
      "Assume the system's track record speaks for itself and provide only summary statistics without further discussion",
      "Treat this as a fresh onboarding: walk through the system's purpose, safeguards, track record, and known limitations in detail, and invite direct scrutiny rather than treating the prior approval as settled",
      "Push back on the CISO's skepticism as unfounded given the system's tenure",
      "Avoid the conversation and let the system continue running without formal re-justification"
    ],
    correct: 1,
    explanation: "A new stakeholder inheriting a system they didn't choose deserves a full, patient onboarding rather than an assumption that prior approval should carry weight with them — this is especially true for a naturally skeptical security leader. Providing only summary stats (A) doesn't build the deeper understanding a skeptical new stakeholder needs, dismissing their skepticism (C) damages the relationship, and avoiding the conversation (D) risks the system losing its sponsor entirely."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A hotel chain's Claude-powered guest request routing assistant is being piloted at three properties. The pilot's defined success metric was response routing accuracy, but general managers at the pilot properties keep asking about guest satisfaction scores instead.",
    question: "What should the architecture lead do about this mismatch?",
    options: [
      "Insist the general managers only look at the metric the pilot was designed around",
      "Quietly start tracking guest satisfaction without telling anyone, to have the data ready if asked",
      "Acknowledge that guest satisfaction is a reasonable business concern, clarify how it relates to (but differs from) the pilot's routing accuracy metric, and add it as a secondary tracked measure if feasible",
      "Change the pilot's primary success metric to guest satisfaction immediately without further discussion"
    ],
    correct: 2,
    explanation: "When stakeholders gravitate toward a different metric than the one originally defined, the right move is to understand their underlying concern, explain the relationship between the two measures, and incorporate the stakeholder's priority where reasonable, rather than dismissing it or silently pivoting. Insisting they only track the original metric (A) ignores a legitimate business concern, hiding a new data effort (B) lacks transparency, and abruptly changing the primary metric without discussion (D) undermines the pilot's original design rigor."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A biotech company's research documentation assistant, powered by Claude, is being considered for expansion into a use case involving patient trial data. The head of research wants to move fast, but the architecture lead knows this expansion would introduce new regulatory obligations that haven't been scoped.",
    question: "What should the architecture lead communicate before agreeing to a timeline?",
    options: [
      "Agree to the head of research's preferred timeline and address regulatory scoping in parallel",
      "Clearly explain that the new use case introduces regulatory obligations that must be scoped first, and that any timeline commitment before that scoping is complete would be unreliable",
      "Tell the head of research the expansion isn't possible without further explanation",
      "Proceed with a proof of concept using real trial data to demonstrate feasibility before addressing regulatory questions"
    ],
    correct: 1,
    explanation: "Committing to a timeline before understanding new regulatory obligations risks making a promise that can't be kept and exposes the organization to compliance risk; being upfront about this dependency is the professional move, even if it's not what the stakeholder wants to hear. Agreeing to a timeline and scoping regulations in parallel (A) risks discovering a blocking requirement after commitments are made, a bare refusal without explanation (C) doesn't help the stakeholder understand the real constraint, and using real patient trial data before regulatory scoping (D) is a compliance risk in itself."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A food delivery platform's Claude-powered customer chat assistant is performing within target metrics, but the head of customer experience wants to publicly claim in a press release that the assistant 'resolves 95% of issues without human involvement,' a figure the architecture lead knows blends simple and complex issue types in a way that could mislead.",
    question: "What should the architecture lead do?",
    options: [
      "Approve the figure since it is technically accurate as an aggregate number",
      "Explain how the blended figure could mislead the public about performance on complex issues, and propose either a more precise framing or a supporting breakdown by issue complexity",
      "Refuse to discuss the press release and let the head of customer experience proceed without input",
      "Insist the figure be removed entirely with no alternative offered"
    ],
    correct: 1,
    explanation: "A technically accurate but misleading blended statistic is a classic public-communication risk; the constructive response explains the specific way it could mislead and offers workable alternative framing rather than simply blocking or ignoring the request. Approving it as-is (A) risks a credibility problem if customers with complex issues have a different experience than advertised, disengaging entirely (C) abdicates a responsibility the architecture lead is positioned to catch, and blocking it with no alternative (D) is less constructive than proposing a fix."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "An auto insurance company's claims adjusters are about to start using a new Claude-powered claims summarization tool. Several adjusters have expressed anxiety in a pre-launch survey that the tool might be intended to eventually replace their jobs.",
    question: "What should be addressed directly in the rollout communication to adjusters?",
    options: [
      "Avoid discussing job security since it isn't officially part of the tool's technical scope",
      "Directly and honestly address the tool's intended role relative to adjuster jobs, whatever that role actually is, rather than letting the concern go unaddressed",
      "Reassure adjusters that no jobs will ever be affected by AI tools at the company, regardless of future plans",
      "Redirect all questions about job impact to HR without providing any direct answer in the rollout communication itself"
    ],
    correct: 1,
    explanation: "An unaddressed, high-stakes concern like job security will undermine adoption and trust regardless of the tool's actual technical purpose, so it needs a direct and honest answer as part of rollout communication. Avoiding the topic (A) leaves anxiety to fester, an absolute and potentially false guarantee (C) risks a serious credibility breach later, and deflecting entirely to HR with no direct answer in the communication itself (D) fails to address a concern central to adoption."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national law enforcement agency's records summarization assistant, powered by Claude, is up for a mandatory annual review before its authorization to operate is renewed. A senior oversight board member asks the architecture lead to demonstrate that the system's behavior has not drifted since the initial authorization.",
    question: "What evidence should the architecture lead present?",
    options: [
      "A statement that the underlying model hasn't been changed, which should be sufficient assurance",
      "A comparison of current output quality and behavior against the original authorization-time baseline, using the same evaluation methodology, plus a summary of any changes made to prompts, tools, or data sources in the interim",
      "A general description of the system's ongoing popularity among users as evidence of continued reliability",
      "A commitment to investigate drift only if the oversight board specifically identifies a problem"
    ],
    correct: 1,
    explanation: "Demonstrating no material drift requires an apples-to-apples comparison against the original baseline using consistent methodology, plus disclosure of any changes to the system's components since authorization — this is the rigorous evidence an oversight review needs. Asserting the model hasn't changed (A) ignores that prompts, tools, and data can drift independently of the model, popularity (C) is not evidence of behavioral stability, and waiting for the board to find a problem (D) reverses the burden of proof that should sit with the system owner in this context."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A shipping and freight company's Claude-powered customs documentation assistant made an error that caused a minor but visible delay for one client's shipment. The client's account manager wants to know what to tell the client, and is worried that admitting an AI tool was involved will damage confidence.",
    question: "What should the architecture lead advise?",
    options: [
      "Advise the account manager to attribute the delay to a generic 'processing issue' without mentioning the AI tool",
      "Advise transparency about what happened, including the AI tool's role, paired with the specific fix being put in place, framing it as a normal part of a system that is monitored and improved",
      "Advise the account manager to avoid the conversation and hope the client doesn't ask",
      "Advise offering the client a large service credit immediately, without explaining what happened, to smooth things over"
    ],
    correct: 1,
    explanation: "Transparent, specific communication about what happened and what's being fixed is more credible and sustainable than concealment, and most clients respond better to an honest account paired with a concrete remedy than to a vague excuse. Obscuring the AI tool's role (A) risks a worse trust breach if the client later learns the full story, avoiding the conversation (C) is not viable for a visible service failure, and an unexplained credit (D) doesn't address the client's need to understand what happened and whether it will recur."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A large agricultural cooperative's crop advisory assistant, built on Claude, is being rolled out to member farmers across several states with widely varying literacy levels and internet access. The rollout plan currently assumes a single communication and training approach for all members.",
    question: "What should the architecture lead recommend before finalizing the rollout communication plan?",
    options: [
      "Proceed with the single unified approach to keep the rollout simple and on schedule",
      "Segment the communication and training approach based on the different needs of member subgroups (e.g., low-connectivity regions, varying literacy levels), even if it adds complexity to the plan",
      "Limit the rollout only to members who already have strong technical literacy and internet access, and exclude the rest",
      "Delegate all communication planning to each state cooperative office without any shared guidance or resources"
    ],
    correct: 1,
    explanation: "A single one-size-fits-all communication approach is likely to underserve a genuinely diverse stakeholder population; segmenting the plan by real differences in access and literacy is the responsible way to make the rollout actually effective for everyone it's meant to reach. Keeping the unified plan for simplicity (A) risks failing the members who need the most support, excluding less-connected members (C) undermines the cooperative's purpose, and delegating without shared guidance (D) risks inconsistent quality across states."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national parks agency's visitor information assistant, powered by Claude, is being considered for full nationwide rollout after a successful two-park pilot. The budget office asks the architecture lead to state definitively what full-scale operating costs will be, but usage patterns at nationwide scale are inherently uncertain.",
    question: "What is the best way to respond to the budget office's request?",
    options: [
      "Provide a single confident cost figure to satisfy the request, even though it rests on significant extrapolation",
      "Decline to provide any estimate, citing the uncertainty involved",
      "Provide a cost range grounded in the pilot's per-interaction cost, clearly stating the assumptions and scaling factors behind the range, and note what early rollout data would sharpen the estimate",
      "Provide the pilot's exact total cost as the expected nationwide cost, without adjusting for scale"
    ],
    correct: 2,
    explanation: "A defensible cost estimate at this stage is a transparent range built on stated assumptions, not a false-precision single number — this gives the budget office something usable while being honest about the uncertainty. A single confident figure (A) risks a credibility gap if actuals diverge, refusing to estimate at all (B) doesn't serve the budget office's legitimate planning need, and using the pilot's raw total cost unadjusted for scale (D) would badly misrepresent nationwide costs."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A regional airline's baggage claim inquiry assistant, powered by Claude, has been stable in production for a year. The customer experience director wants to add a new capability that would let the assistant proactively contact customers about delayed bags, a significant scope expansion that the current architecture wasn't designed for.",
    question: "How should the architecture lead frame this request to the director?",
    options: [
      "Agree to add the capability quickly since it reuses much of the existing assistant",
      "Explain that this is a meaningfully different capability with its own risks (e.g., false proactive contact, notification timing) and propose treating it as a new initiative with its own scoping, testing, and rollout plan rather than a quick extension",
      "Decline the request outright as out of scope for the existing system",
      "Add the capability directly to production without a distinct evaluation, since the underlying model is the same"
    ],
    correct: 1,
    explanation: "A capability that changes the system from reactive to proactive introduces new failure modes and stakes that deserve their own scoping and evaluation, even though it shares underlying infrastructure — treating it as a lightweight extension risks under-testing a materially different risk profile. Agreeing to a quick add (A) or shipping it without distinct evaluation (D) both underestimate the new risks, while an outright refusal (C) forecloses a legitimate and potentially valuable capability without exploring how to do it safely."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A dental insurance company's prior authorization assistant, powered by Claude, is being evaluated by a new Chief Medical Officer who wants a plain-language explanation of what happens when the system is uncertain about a case, ahead of approving continued use.",
    question: "What should the explanation focus on?",
    options: [
      "The specific confidence-scoring algorithm and its mathematical basis",
      "The escalation path: what triggers a case being routed to a human reviewer instead of an automated determination, and how often that happens",
      "A statement that the system rarely encounters uncertain cases and this scenario is not worth detailing",
      "A comparison of the system's uncertainty handling to competitor products"
    ],
    correct: 1,
    explanation: "A CMO evaluating clinical risk needs to understand the operational safeguard — when and how uncertain cases get human review — far more than the underlying scoring mechanics. Explaining the algorithm's mathematics (A) doesn't answer the practical safety question, dismissing the scenario as rare and undetailed (C) is evasive on exactly the point being asked about, and a competitor comparison (D) doesn't address this system's own safeguards."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A mid-market software vendor's onboarding team wants to introduce existing customers to a new Claude-powered setup assistant. Some customers are long-tenured and skeptical of AI-driven changes to a process they're used to doing manually.",
    question: "What is the best approach for introducing the new assistant to this stakeholder group?",
    options: [
      "Make the AI assistant the default and only onboarding path immediately for all customers",
      "Introduce it as an optional enhancement initially, clearly explain what it does differently from the manual process, and gather feedback from early adopters before considering a broader default change",
      "Avoid promoting it to long-tenured customers at all, assuming they won't be interested",
      "Require long-tenured customers to switch to the new process without warning at their next renewal"
    ],
    correct: 1,
    explanation: "Introducing a new tool as an optional, well-explained enhancement respects an established stakeholder group's comfort with the current process while still creating a path to broader adoption based on real feedback. Making it mandatory immediately (A) or without warning (D) risks alienating a skeptical, long-tenured customer base, and simply not promoting it to them (C) assumes disinterest without evidence and forfeits a chance to build buy-in."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A commercial real estate firm's lease abstraction assistant, powered by Claude, is being sunset in favor of a more capable in-house system. Several brokers built informal workflows and spreadsheets around the outgoing tool's specific output format.",
    question: "What should the deprecation communication address that is easy to overlook?",
    options: [
      "Only the high-level fact that the old system is being retired on a certain date",
      "The impact on the brokers' downstream workflows built around the old tool's output format, with guidance or tooling to help them adapt to the new system's format",
      "A technical comparison of the two systems' underlying architectures",
      "A general statement that the new system is better, without addressing format differences"
    ],
    correct: 1,
    explanation: "Deprecation communication often focuses only on the system being retired and misses the downstream dependencies stakeholders have quietly built around its specific behavior — surfacing and addressing that impact directly is what separates a smooth transition from a disruptive one. A bare retirement announcement (A), an architecture comparison (C), or a vague 'better' claim (D) all fail to address the concrete, practical problem the brokers will actually experience."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A global apparel brand's Claude-powered product copy generator for its e-commerce site is performing well in English-language markets, but the localization team is under pressure to extend it to twelve additional languages within a quarter, a timeline the architecture lead considers unrealistic given the validation work required per language.",
    question: "What should the architecture lead do?",
    options: [
      "Accept the quarter-long timeline for all twelve languages to avoid conflict with the localization team",
      "Propose a realistic, evidence-based sequencing plan — prioritizing languages by market size and validation complexity — and clearly explain why validating all twelve within the quarter isn't achievable without compromising quality",
      "Tell the localization team the expansion isn't possible without offering a plan for how it could be done differently",
      "Silently deliver fewer languages than requested at the end of the quarter without having flagged the concern earlier"
    ],
    correct: 1,
    explanation: "Pushing back on an unrealistic timeline with a concrete, prioritized alternative gives the localization team a workable path forward while being honest about the constraint — this is more useful than either capitulating or refusing outright. Accepting the full scope silently (A) sets up an inevitable quality or timeline failure, a bare refusal with no alternative (C) doesn't help the team plan, and delivering less than promised without earlier warning (D) is the most damaging outcome of all, since it removes the team's ability to adjust their own plans in time."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A telecommunications provider's network operations team uses a Claude-powered incident summarization tool during outages. During a major regional outage, executives repeatedly interrupt the operations team for verbal updates, disrupting the team's ability to work the incident.",
    question: "What should the architecture lead recommend to manage this stakeholder pressure during live incidents?",
    options: [
      "Instruct the operations team to stop responding to executives until the incident is resolved",
      "Set up a designated, regularly updated incident status channel or summary that executives can check independently, reducing the need for direct interruptions while keeping them informed",
      "Assign a senior engineer to stop working the incident and instead handle executive questions full-time",
      "Ask executives to simply wait for a final report after the incident is fully resolved"
    ],
    correct: 1,
    explanation: "A shared, regularly updated status channel satisfies executives' legitimate need for visibility during a live incident without pulling responders away from the work itself — this is standard, effective incident communication practice. Telling executives to stop asking (A) is likely to be ignored and damages the relationship, pulling a senior engineer off the incident (C) reduces response capacity right when it's most needed, and asking executives to wait until full resolution (D) doesn't meet their reasonable need for interim visibility during a major outage."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national veterinary hospital chain's Claude-powered client communication assistant has been running for six months. The chain's founder, who personally championed and funded the project, has announced retirement, and the incoming CEO has expressed general skepticism toward AI investments made under the previous leadership.",
    question: "What should the architecture lead prioritize in this transition?",
    options: [
      "Wait for the incoming CEO to raise questions before providing any information, to avoid seeming defensive",
      "Proactively prepare an objective, outcomes-based briefing for the incoming CEO that lets the system's track record speak for itself, independent of its association with the outgoing founder",
      "Lean on the outgoing founder to convince the incoming CEO to continue the project before they leave",
      "Assume the system will likely be discontinued and begin winding it down preemptively"
    ],
    correct: 1,
    explanation: "When a system's fate becomes tied to leadership turnover and a new leader's general skepticism, the best defense is an objective, evidence-based briefing that stands on the system's own merits rather than its association with the departing champion. Waiting passively (A) cedes the narrative to the new CEO's existing skepticism, relying on the outgoing founder's influence (C) doesn't build the new CEO's own understanding, and preemptively winding down the system (D) discards a working investment before the new CEO has even had a chance to evaluate it."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A power utility's outage communication assistant, powered by Claude, drafts customer-facing outage updates during storm events. During a major storm, the assistant's drafts are technically accurate but the crisis communications team finds them too clinical in tone for anxious customers without power.",
    question: "What is the best way to address this stakeholder feedback?",
    options: [
      "Dismiss the feedback since the drafts are factually accurate, which is the primary requirement",
      "Treat tone as a legitimate part of the requirements, work with the crisis communications team to define the desired tone concretely, and adjust the system's guidance accordingly",
      "Have the crisis communications team manually rewrite every draft from scratch going forward, bypassing the assistant entirely",
      "Tell the crisis communications team that tone adjustments aren't technically feasible"
    ],
    correct: 1,
    explanation: "Tone is a legitimate, often underspecified requirement for customer-facing communication during a crisis, and the appropriate response is to collaborate with the stakeholder who owns that expertise to define it concretely and incorporate it. Dismissing the concern because accuracy was met (A) ignores a real and valid gap, abandoning the tool entirely (C) discards its value over a fixable issue, and claiming tone adjustment is infeasible (D) is inaccurate — tone is a addressable, common refinement."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A multinational consumer goods company's internal knowledge assistant, powered by Claude, is used by regional marketing teams worldwide. The North America team wants a major workflow change that would benefit their team but would degrade the experience for the other four regions sharing the same system.",
    question: "What should the architecture lead do?",
    options: [
      "Approve the North America team's request since they are the most vocal and largest stakeholder group",
      "Deny the request outright without further discussion to protect the other regions",
      "Bring all affected regional stakeholders into a shared conversation to evaluate the trade-off transparently, and look for a design that serves North America's need without degrading the others, or make the trade-off explicit if no such design exists",
      "Implement the change only for North America's instance of the system, creating a fully separate configuration without informing the other regions"
    ],
    correct: 2,
    explanation: "A shared system serving multiple stakeholder groups requires trade-offs to be made transparently and collectively, ideally by finding a design that avoids the trade-off entirely, or by making an informed collective decision if it can't be avoided. Approving based on the most vocal group's size (A) or denying without discussion (B) both bypass the other stakeholders' legitimate interest, and silently forking the configuration (D) creates hidden divergence and maintenance risk without anyone but North America knowing."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A regional airline is under budget pressure and asks the architecture lead whether its Claude-powered flight rebooking assistant's scope can be cut in half to reduce costs, without a clear sense of which capabilities matter most to customers.",
    question: "How should the architecture lead approach this scope negotiation?",
    options: [
      "Cut the scope roughly in half by removing whichever capabilities were built most recently",
      "Present usage and impact data for each capability so the cost-cutting decision is grounded in which features actually drive value, rather than an arbitrary or convenience-based cut",
      "Refuse to reduce scope at all, citing the risk of degrading the customer experience",
      "Agree to the budget target without pushing back, and let engineering decide informally what to cut as work proceeds"
    ],
    correct: 1,
    explanation: "Budget pressure that demands a scope cut should be met with data about which capabilities actually deliver value, so the trade-off is made deliberately rather than arbitrarily. Cutting based on build recency (A) has no connection to actual value, refusing to engage with the budget constraint at all (C) ignores a legitimate business pressure, and letting engineering informally decide without stakeholder visibility (D) removes the business from a decision that should be theirs to make with good information."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A global reinsurance firm's Claude-powered risk report drafting tool is being evaluated for expansion into a new line of business. The underwriting leadership for that line insists their risk factors are 'too specialized' for the tool to handle and refuses to engage in a pilot at all.",
    question: "What is the most effective way for the architecture lead to move this forward?",
    options: [
      "Force a pilot without underwriting leadership's buy-in, using data access already available",
      "Accept the refusal and abandon expansion into this line of business entirely",
      "Engage directly with underwriting leadership to understand the specific basis for their skepticism, and propose a low-commitment, narrowly scoped trial on a small set of their own cases so they can evaluate the evidence themselves",
      "Escalate the refusal to executive leadership to override underwriting's objection"
    ],
    correct: 2,
    explanation: "Skeptical stakeholders who refuse to engage often respond better to a low-risk, concrete trial they control and can evaluate on their own terms than to being overridden or having the initiative dropped. Proceeding without their buy-in (A) undermines trust and adoption even if technically possible, abandoning the effort entirely (B) forecloses a potentially valuable expansion based on unexamined assumptions, and escalating over their heads (D) risks a lasting relationship problem with a stakeholder group whose cooperation will be needed long after any executive mandate."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A regional credit union is preparing member-facing FAQ language about a new Claude-powered loan pre-qualification chat tool. A board member asks whether the FAQ should mention that AI is involved at all.",
    question: "What should the architecture lead recommend?",
    options: [
      "Omit any mention of AI to avoid member concern",
      "Disclose that the tool uses AI, in plain language, along with what it does and does not do, since transparency supports member trust and is increasingly expected in financial services",
      "Mention AI only if a member specifically asks about it during an interaction",
      "Use technical language describing the underlying model to demonstrate the credit union's technological sophistication"
    ],
    correct: 1,
    explanation: "Clear, plain-language disclosure of AI involvement, paired with an honest description of the tool's scope, supports member trust and aligns with the transparency increasingly expected in regulated financial services. Omitting the disclosure (A) risks a trust breach if members learn about it another way, disclosing only on request (C) is a weaker standard than proactive transparency, and technical jargon (D) doesn't serve a member-facing FAQ's purpose."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A global pharmaceutical distributor's Claude-powered order anomaly detection system, deployed across four business units with different reporting structures, flagged a significant compliance-relevant anomaly. Two business unit heads want to handle it quietly at the local level; corporate compliance wants it escalated immediately and disclosed broadly across all four units to assess similar exposure.",
    question: "What should the architecture lead, who has visibility into the technical facts, recommend?",
    options: [
      "Defer entirely to the local business unit heads' preference to keep the matter contained, since they are closest to the situation",
      "Defer entirely to corporate compliance's request for immediate broad disclosure without further input from the business units",
      "Provide corporate compliance and the business unit heads with the same complete, factual technical findings simultaneously, and let the appropriate compliance and legal governance process — not the architecture lead — determine the disclosure scope and handling",
      "Withhold the technical findings from both parties until they reach agreement on how to handle it"
    ],
    correct: 2,
    explanation: "The architecture lead's responsibility here is to ensure all legitimate stakeholders have the same accurate technical facts and to route the disclosure decision to the appropriate compliance and legal governance process, not to unilaterally pick a side or sit on findings. Favoring the local units' preference for containment (A) risks suppressing a compliance-relevant issue, deferring entirely to compliance without business unit input (B) skips a legitimate stakeholder conversation, and withholding findings from either party (D) is a serious integrity failure in a compliance-relevant matter."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A ride-sharing company's driver support chatbot, powered by Claude, is being scaled from one metro market to fifty markets. The driver operations team wants a single go/no-go review at the very end of the rollout rather than incremental checkpoints, to minimize meetings.",
    question: "What should the architecture lead recommend instead, and why?",
    options: [
      "Agree to a single end-of-rollout review, since incremental checkpoints add overhead",
      "Recommend a small number of checkpoint reviews at defined rollout milestones, so problems in early markets can be caught and addressed before they propagate to all fifty markets",
      "Recommend daily status meetings throughout the entire rollout to maximize visibility",
      "Recommend no formal review process at all, relying on ad hoc escalation if something goes wrong"
    ],
    correct: 1,
    explanation: "A large-scale rollout benefits from a small number of milestone checkpoints that catch market-specific problems early, before they've propagated to all fifty markets — this balances meeting overhead against the real risk of an undetected issue scaling broadly. A single end-of-rollout review (A) means problems are only caught after full exposure, daily meetings (C) is excessive overhead for this need, and relying purely on ad hoc escalation (D) has no structured mechanism to catch issues that aren't yet visibly urgent."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A national pharmacy benefit manager's Claude-powered formulary question assistant for member services reps has been well received. The compliance team, however, has just flagged that some rep-facing outputs may need to be retained for a longer period than the current system supports, based on a new internal policy.",
    question: "How should the architecture lead communicate this constraint to the member services leadership team, who are eager to keep the rollout on schedule?",
    options: [
      "Delay disclosing the retention issue until after the rollout is complete, to avoid disrupting the timeline",
      "Clearly explain the new compliance requirement, its impact on the current system design, and a realistic timeline for addressing it, even though it may affect the rollout schedule",
      "Tell member services leadership that compliance is overreacting and the requirement can likely be skipped",
      "Implement a workaround without informing anyone, so the schedule stays intact"
    ],
    correct: 1,
    explanation: "A newly identified compliance requirement that affects system design needs to be communicated honestly and promptly, even if it disrupts a schedule stakeholders care about — withholding or downplaying it creates greater risk later. Delaying disclosure (A) or silently working around it (D) both hide a compliance-relevant issue from stakeholders who need to know, and dismissing compliance's concern as overreach (C) is not the architecture lead's call to make unilaterally."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A boutique investment bank's Claude-powered pitch deck drafting assistant for junior analysts has driven strong productivity gains. A managing director insists on publicly attributing 100% of a recent deal's fast turnaround to the tool, when the architecture lead knows several other factors also contributed.",
    question: "What should the architecture lead advise?",
    options: [
      "Let the managing director's claim stand as stated, since it's good publicity for the tool",
      "Suggest more accurate, still-positive language that credits the tool as a meaningful contributor to the fast turnaround, without claiming sole responsibility for a multi-factor outcome",
      "Publicly contradict the managing director's claim in front of others to ensure accuracy",
      "Avoid the conversation, since attribution language is not the architecture lead's concern"
    ],
    correct: 1,
    explanation: "Correcting the record with accurate, still-favorable language protects the tool's long-term credibility, since an overstated attribution risks a credibility problem the next time results are more mixed. Letting the overstatement stand (A) sets an unsustainable precedent, publicly contradicting the managing director (C) is an unnecessarily confrontational way to raise a reasonable accuracy concern, and staying silent (D) misses a chance to protect the tool's reputation for honest reporting."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A mid-size hotel booking platform's customer support director asks the architecture lead for a simple way to explain to new support agents why the Claude-powered response drafting tool sometimes needs to be overridden by the agent.",
    question: "What is the clearest way to frame this for new agents?",
    options: [
      "Explain that the tool is right most of the time, so overrides should be rare and are usually a sign of agent error",
      "Explain that the tool is a drafting aid meant to speed up responses, and that the agent's judgment about the specific customer situation should always take precedence when the two conflict",
      "Avoid the topic in training so new agents build confidence in the tool from day one",
      "Tell agents to always use the tool's draft as written to maintain consistency across responses"
    ],
    correct: 1,
    explanation: "Framing the tool clearly as a drafting aid subordinate to agent judgment sets the correct expectation from day one and empowers agents to use it appropriately. Suggesting overrides indicate agent error (A) discourages appropriate judgment calls, avoiding the topic in training (C) leaves new agents unprepared for real situations, and instructing agents to always use the draft unmodified (D) removes necessary human judgment from customer interactions."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national moving and storage company is sunsetting its original Claude-powered quote estimation tool in favor of a redesigned version with a different underlying pricing methodology. Franchise owners, who are independent business operators rather than direct employees, have built their own local pricing adjustments on top of the old tool's outputs.",
    question: "What does this stakeholder structure require the sunset plan to account for?",
    options: [
      "Nothing different from a typical internal deprecation, since franchise owners use the same corporate system",
      "That franchise owners, as independent operators with their own business customizations, need earlier notice, clear guidance on adapting their local pricing adjustments, and a channel to raise concerns before mandatory cutover, given they can't simply be issued a directive the way employees could",
      "A mandatory, non-negotiable cutover date communicated the same way it would be to internal employees",
      "Leaving the decision of when to cut over entirely to each franchise owner indefinitely"
    ],
    correct: 1,
    explanation: "Franchise owners are independent business operators, not employees, so a deprecation communication needs to account for their autonomy and their own business customizations built on the old system — this means more lead time, concrete migration guidance, and a real channel for concerns, not a one-way directive. Treating them identically to internal employees (A or C) ignores this structural difference, and leaving cutover timing entirely open-ended (D) creates an unmanageable, indefinitely fragmented rollout."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A national retail bank's Claude-powered fraud alert drafting tool for the fraud operations team performed well in testing but, three weeks after full rollout, fraud analysts report a rising number of alerts they consider low-value, though overall fraud catch rate hasn't changed. Leadership asks whether this is a serious problem.",
    question: "What should the architecture lead's answer to leadership emphasize?",
    options: [
      "That analyst-perceived alert value is a subjective concern that shouldn't influence a system that is meeting its primary catch-rate metric",
      "That the catch-rate metric alone doesn't capture analyst workload and trust, and that this feedback needs its own investigation to determine whether it reflects a real precision problem or a perception issue, before concluding the system is fine",
      "That the system should be immediately reconfigured to reduce alert volume, without further investigation",
      "That analysts should be retrained to better recognize the value of the alerts being generated"
    ],
    correct: 1,
    explanation: "A stable top-line metric doesn't necessarily mean there's no problem — analyst-perceived low-value alerts could reflect a real precision issue affecting workload and trust that the catch-rate metric doesn't capture, and this deserves investigation before either dismissing it or reacting without evidence. Dismissing the feedback outright (A) risks missing a real problem, reconfiguring immediately without investigation (C) risks an uninformed fix, and assuming the analysts simply need retraining (D) presumes the system is correct without evidence."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A children's toy manufacturer's Claude-powered product safety documentation assistant is being introduced to the quality assurance team, some of whom have decades of manual review experience and view the tool as implicitly questioning their expertise.",
    question: "What is the most effective way to introduce the tool to this team?",
    options: [
      "Frame the tool explicitly as a check on the QA team's work, since that is its intended function",
      "Frame the tool as augmenting the QA team's expertise — surfacing items for their review faster — and involve senior QA reviewers early in refining how it's used, rather than presenting it as a finished mandate",
      "Avoid framing the tool's purpose at all and let the QA team draw their own conclusions",
      "Mandate its use without any discussion, since adoption concerns will resolve once the team sees it works"
    ],
    correct: 1,
    explanation: "Involving experienced stakeholders early and framing a new tool as augmenting rather than auditing their expertise addresses the underlying concern directly and builds genuine buy-in, which matters especially with a team whose expertise is central to their professional identity. Framing it explicitly as a check on their work (A) confirms their worst assumption, no framing at all (C) leaves the concern to fester, and mandating use without discussion (D) risks resentment and passive resistance even if the tool is later proven useful."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A national home warranty company's claims intake assistant, powered by Claude, has been running successfully for eighteen months. Following a merger, the acquiring company's leadership wants a report on all AI systems in the combined organization, including this one, ahead of a portfolio rationalization decision that could result in consolidation or shutdown.",
    question: "What should the architecture lead's report emphasize to support a sound rationalization decision?",
    options: [
      "A case for why this particular system should be preserved over any overlapping systems from the acquiring company",
      "An objective summary of the system's function, performance, cost, dependencies, and risks, presented in a comparable format to whatever information is being gathered on the acquiring company's overlapping systems",
      "A recommendation to keep all AI systems from both companies running in parallel to avoid disruption",
      "A minimal report, since the rationalization decision will be made by leadership regardless of the details provided"
    ],
    correct: 1,
    explanation: "In a portfolio rationalization following a merger, the most useful input is an objective, comparable summary of each system's function and cost profile, so leadership can make a sound consolidation decision across the whole portfolio — advocacy for one's own system undermines that objectivity. Arguing for preservation (A) introduces bias into a decision that should be evidence-based, keeping everything running in parallel (C) avoids the rationalization question entirely, and providing only a minimal report (D) withholds information leadership needs regardless of who ultimately decides."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A software company's IT security team wants a plain-language explanation from the architecture lead of what data a new Claude-powered internal documentation search tool can access, before approving it for company-wide use.",
    question: "What should this explanation prioritize?",
    options: [
      "A description of the model's general capabilities and reasoning abilities",
      "A precise, specific account of what data sources and permissions the tool has access to, and how that access is scoped and controlled",
      "An assurance that the tool is safe because it is built on a well-known AI model",
      "A list of other companies that use similar tools successfully"
    ],
    correct: 1,
    explanation: "IT security's approval decision hinges on the specific, concrete data access and permission scope, not general claims about model capability, external validation, or vague safety assurances. General capability descriptions (A), reputational assurances (C), and peer comparisons (D) all fail to answer the precise access-control question a security review actually needs answered."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A regional airline's Claude-powered irregular operations rebooking assistant performed well during normal disruptions but failed to handle a rare multi-airport simultaneous weather event correctly, causing significant customer confusion. The board wants a full account of what went wrong and whether the system should continue operating.",
    question: "What should the architecture lead's board presentation include to support a sound continuation decision?",
    options: [
      "A recommendation to continue operating the system unchanged, since the failure was a rare edge case unlikely to recur",
      "A clear account of what happened, why the specific scenario exceeded the system's tested scope, what changes are planned to handle similar events, and an honest assessment of residual risk during the interim before those changes are complete",
      "A recommendation to discontinue the system entirely, since it failed under real-world conditions",
      "A technical explanation focused solely on the internal mechanics of why the failure occurred, without addressing next steps or residual risk"
    ],
    correct: 1,
    explanation: "A board deciding whether to continue operating the system needs the full picture: what happened, why it exceeded tested scope, what's being done about it, and what risk remains in the meantime — this is what supports an informed continuation decision. Recommending continuation unchanged (A) glosses over a real gap, recommending outright discontinuation (C) may discard a system that performs well outside this rare scenario, and a purely technical explanation without next steps or residual risk (D) doesn't give the board what it needs to decide."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A specialty coffee retailer's supply chain team has been using a Claude-powered vendor communication drafting tool for a year. A new sustainability officer joins and asks whether the tool's drafts reflect the company's recently updated sustainability sourcing commitments, which postdate the tool's original design.",
    question: "What should the architecture lead do in response?",
    options: [
      "Assume the drafts already reflect the new commitments, since the tool is generally well-regarded",
      "Review whether the tool's guidance and reference materials have actually been updated to reflect the new sourcing commitments, and close any gap found before assuring the sustainability officer it's covered",
      "Tell the sustainability officer this is outside the scope of what the tool was built to do and no update is planned",
      "Direct the sustainability officer to manually review every draft going forward instead of updating the tool"
    ],
    correct: 1,
    explanation: "A reasonable question about whether a tool reflects an organizational policy change made after the tool's original design deserves actual verification, not an assumption of correctness — this is a common way systems silently drift out of alignment with current policy. Assuming it's already covered (A) risks an inaccurate assurance, refusing to consider an update (C) ignores a legitimate and current business need, and shifting the burden to manual review indefinitely (D) doesn't fix the underlying gap in the tool itself."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A national auto parts retailer's store associate assistant, powered by Claude, is performing to spec, but a regional vice president wants it decommissioned in their region because they personally distrust AI tools, despite no data-driven concern being raised.",
    question: "What is the most effective way for the architecture lead to engage with this stakeholder?",
    options: [
      "Comply immediately with the decommission request to avoid conflict with a regional VP",
      "Escalate the VP's request to corporate leadership as an overreach, without first engaging the VP directly",
      "Engage the VP directly to understand the specific basis for their distrust, share the performance data and safeguards in place, and work toward either resolving the concern or identifying what evidence would change their view",
      "Ignore the decommission request since it isn't backed by data"
    ],
    correct: 2,
    explanation: "A stakeholder's general distrust, even without a specific data-driven complaint, deserves direct engagement to understand its basis and address it with evidence — this respects their authority over their region while giving the system a fair chance to be evaluated on its merits. Immediate compliance (A) sets a precedent for decisions made without evidence, escalating over the VP's head without first engaging them (B) damages the relationship, and simply ignoring the request (D) disregards the VP's legitimate authority over their own region."
  }
];
