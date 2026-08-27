export const QUESTIONS_D3 = [
  {
    domain: 3,
    difficulty: 2,
    scenario: "A retail operations manager needs a quick one-off rewrite of a single internal memo to sound more concise. It's a simple task with no follow-up work planned.",
    question: "Which approach is the most appropriate fit?",
    options: [
      "Set up a dedicated Project with the memo as reference material before starting",
      "Use a plain chat conversation with the most capable (slowest, most thorough) model available",
      "Use a plain chat conversation with the fast, lightweight model — the task is simple and doesn't need deep reasoning",
      "Wait and batch this memo together with several other unrelated documents before doing anything"
    ],
    correct: 2,
    explanation: "A simple one-off rewrite doesn't require deep multi-step reasoning, so the fast/lightweight model is both sufficient and quicker (C). Setting up a full Project (A) is overhead for a single unrelated task with no reuse planned. Reaching for the most capable model (B) doesn't hurt the outcome much here but is unnecessary. Batching unrelated documents (D) just delays a two-minute task for no benefit."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An HR generalist is designing a new company-wide parental leave policy. The task involves weighing legal considerations, budget limits, and precedent from similar companies across several interacting factors.",
    question: "What is the best way to approach this in claude.ai?",
    options: [
      "Ask a quick, direct question and accept the first answer to save time",
      "Use extended/deep thinking mode so the reasoning behind trade-offs is worked through carefully before drafting the policy",
      "Switch to the fastest model so the draft comes back instantly",
      "Skip Claude entirely and write the policy from scratch by hand"
    ],
    correct: 1,
    explanation: "A policy that requires weighing multiple interacting constraints (legal, budget, precedent) is exactly the kind of genuinely hard, multi-step problem where extended thinking improves quality by reasoning carefully before answering (B). A quick direct question (A) risks a shallow first pass on a decision with real consequences. The fastest model (C) trades away the careful reasoning this task needs. Avoiding Claude entirely (D) discards a tool well suited to this kind of structured drafting."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A marketing coordinator will be writing weekly social media captions for the next six months, always following the same brand voice guidelines and hashtag rules.",
    question: "What is the most efficient long-term setup?",
    options: [
      "Create a Project with the brand voice guidelines and hashtag rules saved so every weekly session starts with that context already in place",
      "Re-explain the brand voice and hashtag rules from scratch in a new chat every single week",
      "Use extended thinking mode each week since captions require careful multi-step reasoning",
      "Ask a colleague to compile the guidelines into a slide deck instead of using Claude at all"
    ],
    correct: 0,
    explanation: "A recurring task with stable, reusable instructions is the textbook case for a Project — the guidelines are saved once and apply automatically to every future session (A). Re-explaining the same context weekly (B) wastes time and invites inconsistency. Captions are a lightweight task that doesn't need extended thinking (C). Option D removes Claude from a task it handles well."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A project manager wants to build a simple visual tracker showing project milestones, owners, and due dates that the team will keep referring back to and updating over the coming weeks.",
    question: "Which feature is best suited to this need?",
    options: [
      "A one-off chat answer that lists the milestones in plain text, generated fresh each time someone asks",
      "An Artifact, such as a table-style tracker, that can be viewed, referenced, and iterated on over time",
      "The most capable model with extended thinking enabled, since due dates require deep reasoning",
      "A brand-new chat conversation started every time the tracker needs to be viewed"
    ],
    correct: 1,
    explanation: "Content meant to be referenced and updated repeatedly — like a visual tracker — is exactly what Artifacts are for (B), giving a persistent, editable view instead of scrolling through chat history. A plain-text answer regenerated each time (A) or a fresh chat every time (D) loses the ability to iterate in place. Extended thinking (C) doesn't address the actual need here, which is a reusable visual format, not deeper reasoning."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "A customer support agent needs a quick, one-time paraphrase of a single canned response to sound friendlier before sending it to a customer right now.",
    question: "What model choice fits best?",
    options: [
      "The most capable model, to guarantee the best possible tone",
      "The fast, lightweight model, since this is a simple rewording task with no complex reasoning involved",
      "Extended thinking mode, to carefully consider all possible tones",
      "No model — escalate to a supervisor for wording help"
    ],
    correct: 1,
    explanation: "Simple rewording is low-complexity and benefits from speed without meaningfully losing quality, so the fast model is the right fit (B). The most capable model (A) and extended thinking (C) add time without a meaningful quality gain for such a simple task. Escalating to a supervisor (D) is unnecessary for a one-line tone adjustment."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A company has both claude.ai and an internal Claude-powered tool that is pre-loaded with the company's proprietary product catalog and pricing rules. A salesperson needs to draft a quote referencing exact current pricing tiers.",
    question: "Which should the salesperson use?",
    options: [
      "claude.ai, and manually type in all the pricing tiers from memory",
      "The internal Claude-powered tool, since it already has the proprietary catalog and pricing rules built in, reducing the chance of errors",
      "claude.ai with extended thinking mode enabled to guess at likely pricing",
      "Neither — pricing quotes should never involve Claude"
    ],
    correct: 1,
    explanation: "When an internal tool is already configured with the exact proprietary data needed, it's the safer and more accurate choice over general-purpose chat where the data would have to be manually re-entered or guessed (B). Typing pricing from memory into claude.ai (A) or letting extended thinking mode guess (C) both risk inaccurate figures. Avoiding Claude entirely (D) discards a tool well matched to this task when used correctly."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "An event planner defaults to opening a brand-new Project for absolutely everything — including a single quick question about what time a venue's loading dock typically opens.",
    question: "What is the issue with this habit?",
    options: [
      "Nothing — Projects should always be used regardless of task size",
      "It applies a heavier, reuse-oriented setup to a trivial one-off question that doesn't need saved context, adding unnecessary overhead",
      "Projects are only for coding tasks and should never be used by non-technical staff",
      "Projects make responses less accurate than a plain chat"
    ],
    correct: 1,
    explanation: "Defaulting to the same heavyweight setup for every task, regardless of fit, is the core mistake being tested — a trivial one-off question doesn't need saved context or reusable structure (B). Option A defends the one-size-fits-all habit rather than identifying the problem. Option C is false; Projects work fine for non-technical business use. Option D is also false — Projects don't reduce accuracy, they just aren't needed here."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A finance analyst must reconcile three months of expense reports against budget forecasts, identify every discrepancy, and explain the likely cause of each one in a way that will hold up under audit review.",
    question: "Which approach best fits this task?",
    options: [
      "A quick chat with the fast, lightweight model to save time before the audit deadline",
      "The most capable model with extended thinking enabled, since this involves careful multi-step analysis where accuracy matters a great deal",
      "A single one-line question with no supporting detail provided",
      "Skipping analysis and just forwarding the raw reports to the auditor"
    ],
    correct: 1,
    explanation: "Reconciling numbers across multiple months, finding discrepancies, and building defensible explanations is a genuinely hard, multi-step task where careful reasoning matters — a strong case for the most capable model with extended thinking (B). The fast model (A) trades away needed rigor to save time on a high-stakes task. A single unsupported question (C) won't surface the necessary detail. Skipping analysis (D) defeats the purpose of doing the reconciliation at all."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A nonprofit program coordinator needs to draft a one-time thank-you email to a single donor after an event. There is no plan to reuse this content.",
    question: "What is the most sensible choice?",
    options: [
      "A plain one-off chat conversation, since this is a simple, non-recurring task",
      "A dedicated Project preloaded with donor history and messaging guidelines",
      "The most capable model with extended thinking mode for maximum quality",
      "An Artifact set up as an editable, ongoing donor-tracking document"
    ],
    correct: 0,
    explanation: "A single non-recurring email is a good match for a plain one-off chat — no reuse or saved context is needed (A). Setting up a Project (B) is worthwhile only if this kind of donor communication recurs regularly. Extended thinking (C) is overkill for a friendly thank-you note. An Artifact (D) is meant for content you'll iterate on or reference again, not a single sent email."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A teacher wants to create a simple one-page lesson plan outline that she will tweak and reuse across several class sections this week, adjusting timing and activities each time she teaches it.",
    question: "Which is the best product fit?",
    options: [
      "A plain chat answer that must be scrolled to and copied manually each time it's needed",
      "An Artifact containing the lesson plan, since it's a document she'll reference and edit repeatedly",
      "Extended thinking mode, because lesson plans require deep multi-step reasoning",
      "The most capable model only, with no particular feature needed"
    ],
    correct: 1,
    explanation: "A document meant to be revisited and lightly edited across multiple sessions fits the Artifact use case well (B) — it stays visible and editable in place rather than living inside scrollback. A plain chat answer (A) is harder to reuse and edit cleanly. Lesson plan outlines are generally not complex enough to require extended thinking (C). Model choice alone (D) doesn't address the reuse and iteration need."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A real estate agent needs a fast, simple answer: what's a typical range for closing costs as a percentage of home price? No follow-up analysis is planned.",
    question: "What's the appropriate way to handle this?",
    options: [
      "A quick chat with the fast, lightweight model, since it's a simple factual-style question",
      "A full Project with saved real estate transaction history",
      "Extended thinking mode to carefully reason through the answer step by step",
      "The most capable model, just in case the question turns out to be complicated later"
    ],
    correct: 0,
    explanation: "A quick, simple, informational question is best handled with speed rather than heavier tooling — the fast model gives a sufficient answer quickly (A). A Project (B) adds setup with no reuse benefit for a single quick question. Extended thinking (C) isn't needed for a straightforward informational ask. Defaulting to the most capable model \"just in case\" (D) is unnecessary caution that slows down a simple task."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A hospital administrative office is deciding between three different vendor contracts for scheduling software, each with different pricing structures, termination clauses, and compliance implications that need to be weighed against each other.",
    question: "Which approach best matches the complexity of this decision?",
    options: [
      "A single quick chat message asking Claude to just \"pick the best one\"",
      "The most capable model with extended thinking enabled, to carefully work through the trade-offs across contracts before summarizing recommendations",
      "The fast, lightweight model, since contracts are just documents",
      "Avoid using Claude and have the office manager decide instantly without analysis"
    ],
    correct: 1,
    explanation: "Comparing multiple contracts across pricing, legal terms, and compliance is a genuinely complex, multi-step evaluation — the kind of task extended thinking with the most capable model is suited for (B). A single vague prompt (A) won't produce a rigorous comparison. The fast model (C) sacrifices the careful reasoning this decision needs. Skipping analysis entirely (D) removes a helpful step in a high-stakes decision, though the final call remains a human one."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A company's internal Claude-powered tool is restricted to only handling questions about the employee handbook and cannot browse general topics. An employee wants advice about wording a personal LinkedIn post.",
    question: "What should the employee do?",
    options: [
      "Use claude.ai directly for this general request, since it's outside the scope of the internal handbook tool",
      "Force the question into the internal tool anyway even though it's unrelated to its purpose",
      "Wait until the internal tool is expanded to cover this topic before doing anything",
      "Use extended thinking mode inside the internal tool to work around its scope limits"
    ],
    correct: 0,
    explanation: "When a task falls outside the internal tool's designed scope, general-purpose claude.ai chat is the appropriate surface (A). Forcing an unrelated request into a narrowly scoped tool (B) is a poor fit and likely won't work well. Waiting indefinitely (C) is unnecessary when another suitable option already exists. Extended thinking (D) doesn't expand what topics a tool is scoped to cover."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "An operations manager needs to summarize a single short internal email thread into two bullet points for a colleague. This happens once and is not part of any recurring workflow.",
    question: "What's the best fit?",
    options: [
      "A one-off chat message with the fast, lightweight model",
      "A new Project configured specifically for email summarization",
      "The most capable model with extended thinking mode",
      "A shared Artifact tracker for ongoing email summaries"
    ],
    correct: 0,
    explanation: "A single short, simple summarization task with no recurrence is well suited to a quick chat with the fast model (A). Setting up a Project (B) or a persistent Artifact tracker (D) is overhead unjustified by a one-time task. Extended thinking with the most capable model (C) is unnecessary for summarizing two sentences into two bullets."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A small business owner wants to use Claude to help lightly automate a recurring weekly task: pulling numbers from a sales spreadsheet and generating a formatted summary report every Monday, following the same steps each time.",
    question: "Which surface is best suited to this kind of repeatable, structured task?",
    options: [
      "Claude Code, which is suited to setting up light, repeatable automation, even for non-developers dabbling in it",
      "A brand new claude.ai chat every Monday morning with no saved setup",
      "The fast, lightweight model exclusively, regardless of what the task involves",
      "A one-time Artifact that isn't updated or reused after the first week"
    ],
    correct: 0,
    explanation: "A recurring, structured, step-by-step task like a weekly automated report is the kind of light automation Claude Code is suited for, even for a non-developer willing to set it up once (A). Starting fresh every Monday (B) throws away the chance to build a repeatable process. Model choice alone (C) doesn't address the automation need. A one-time Artifact (D) doesn't fit a task meant to repeat indefinitely."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A legal administrative assistant is asked to compare two dense insurance policy documents clause by clause and identify every material difference between them, with the results needing to be defensible if questioned later.",
    question: "What is the best fit for this task?",
    options: [
      "The fast, lightweight model, to get through the lengthy documents quickly",
      "The most capable model, ideally with extended thinking enabled, given the careful, high-stakes, multi-step comparison required",
      "A single quick chat message asking for a one-word summary of which policy is 'better'",
      "Skip using Claude since legal documents can never be reviewed this way"
    ],
    correct: 1,
    explanation: "Careful clause-by-clause comparison with real consequences if wrong is a strong match for the most capable model and extended thinking, which are built for exactly this kind of demanding, multi-step reasoning (B). Prioritizing speed with the fast model (A) risks missing subtle differences. A one-word summary (C) discards the nuance the task actually requires. Avoiding Claude altogether (D) is an overcorrection — with appropriate human review, this kind of comparison is a reasonable use case."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A marketing manager is testing five different tagline options for an upcoming campaign and wants to see them side by side in a clean, editable format that the team can comment on and revise together over the next few days.",
    question: "What's the best fit here?",
    options: [
      "A plain chat response with the taglines listed as plain text, regenerated whenever needed",
      "An Artifact laid out as a simple table so the taglines can be viewed, compared, and revised as a shared reference over the next few days",
      "Extended thinking mode, since taglines require deep, multi-step reasoning",
      "A new Project built solely around evaluating this one batch of five taglines"
    ],
    correct: 1,
    explanation: "Content meant to be viewed side by side and revised repeatedly over several days is a clear fit for an Artifact (B), which stays as a persistent, editable reference. A plain chat response (A) makes ongoing comparison and revision clunkier. Taglines are creative, not deeply analytical, so extended thinking (C) doesn't add much value. A full Project (D) is more setup than a short-lived, single-batch task warrants."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "An accounts payable clerk processes vendor invoices the same way every week: extracting the vendor name, amount, and due date into a simple list. This has been going on for months and will continue.",
    question: "What is the smartest setup given how repeatable this task is?",
    options: [
      "A Project with the extraction instructions and format saved, so each week's session doesn't require re-explaining the process",
      "A completely new, unguided chat every week explaining the task from scratch",
      "Extended thinking mode every time, since invoices are complex documents",
      "The most capable model exclusively, regardless of task complexity"
    ],
    correct: 0,
    explanation: "A months-long recurring task with a consistent process is exactly what a Project is designed to streamline — instructions and format are saved once and reused (A). Re-explaining the process weekly (B) wastes time and risks inconsistency. Invoice extraction is usually straightforward enough not to require extended thinking (C). Defaulting to the most capable model regardless of complexity (D) ignores the actual fit between task and model tier."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A sales rep needs to generate a highly specific, up-to-the-minute inventory count from the company's live warehouse system before quoting a large order to a client.",
    question: "What is the most accurate way to get this information?",
    options: [
      "A general claude.ai chat, since Claude can look up live company inventory data directly",
      "The company's internal Claude-powered tool that is actually connected to the live warehouse system, if one is available",
      "Extended thinking mode in claude.ai, which will estimate current inventory carefully",
      "The most capable model in claude.ai, which has real-time access to any company's internal systems by default"
    ],
    correct: 1,
    explanation: "Live, company-specific data like real-time inventory requires a tool actually connected to that system — general claude.ai chat does not have access to a company's private live systems (A, C, D all incorrectly assume it does). The internal tool connected to the warehouse system is the only option that can reliably provide current figures (B). Extended thinking (C) improves reasoning, not data access, and no version of general claude.ai has default access to a company's internal systems (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A university research coordinator is trying to design a multi-phase study methodology, including sampling strategy, controlling for confounding variables, and anticipating statistical pitfalls before the study begins.",
    question: "Which approach is best matched to this task's difficulty?",
    options: [
      "The fast, lightweight model, since study design is just planning and doesn't require deep analysis",
      "The most capable model with extended thinking enabled, since designing a rigorous multi-phase methodology involves careful, interdependent reasoning",
      "A single short chat prompt with no details about the study provided",
      "Skipping Claude and relying purely on a generic template found online"
    ],
    correct: 1,
    explanation: "Designing a multi-phase methodology with interdependent considerations (sampling, confounders, statistical pitfalls) is a genuinely hard reasoning task, which is what extended thinking with the most capable model is built for (B). Treating study design as simple (A) understates its complexity. A vague, detail-free prompt (C) won't surface a defensible methodology. Relying only on a generic online template (D) ignores a tool well-suited to reasoning through the study's specific constraints."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A nonprofit's development director runs the same grant-report drafting process every quarter: same funder templates, same tone guidelines, same required sections, reused again and again over the year.",
    question: "Given how repeatable this workflow is, what's the best long-term approach?",
    options: [
      "A Project preloaded with the funder templates, tone guidelines, and required sections so each quarter's drafting starts with that context already available",
      "Starting a completely blank chat each quarter and re-uploading all the reference materials from scratch every time",
      "Using extended thinking mode purely because grant reports involve writing",
      "Switching between claude.ai and various generic templates found online each quarter instead of using saved context"
    ],
    correct: 0,
    explanation: "A workflow that repeats every quarter with the same materials is a strong candidate for a Project, which keeps that context saved and ready rather than rebuilt each time (A). Re-uploading everything from scratch quarterly (B) wastes time solving the same setup problem repeatedly. Extended thinking (C) isn't warranted just because a task involves writing — it depends on reasoning complexity, not format. Bouncing between online templates instead of using saved context (D) forfeits the main benefit a Project offers for recurring work."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "An office administrator wants to know the standard business hours format convention (e.g., '9 AM–5 PM' vs '9:00–17:00') to use in an email signature. It's a simple stylistic question.",
    question: "What's the appropriate approach?",
    options: [
      "A quick chat with the fast, lightweight model",
      "The most capable model with extended thinking enabled",
      "A dedicated Project built around email signature formatting",
      "An Artifact set up for ongoing signature version tracking"
    ],
    correct: 0,
    explanation: "This is a trivial stylistic question best answered quickly with the fast, lightweight model (A). Extended thinking with the most capable model (B) is disproportionate effort for the task. A Project (C) or a tracked Artifact (D) both imply ongoing reuse this single quick question doesn't need."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A logistics coordinator wants to build a simple, visual shipment-status board — shipment ID, destination, and current status — that dispatch staff will glance at and update multiple times a day.",
    question: "What best fits this need?",
    options: [
      "A new chat message every time someone needs to see the current shipment statuses",
      "An Artifact formatted as a table, since it's a living reference that will be viewed and updated frequently throughout the day",
      "Extended thinking mode, since shipment tracking involves complex logistics reasoning",
      "The most capable model exclusively, with no particular feature enabled"
    ],
    correct: 1,
    explanation: "A living reference viewed and updated many times a day is a strong Artifact use case — a table-style layout that persists and can be edited in place (B). Regenerating a fresh chat message each time (A) is inefficient for something meant to be a running board. Basic status tracking doesn't require the deep reasoning extended thinking is meant for (C). Model choice alone (D) doesn't solve the need for a persistent, visual, editable format."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A compliance officer at a mid-size company must draft a detailed risk assessment covering multiple overlapping regulations, weighing which risks are most material and how mitigation steps interact with each other.",
    question: "Which setup fits this task best?",
    options: [
      "The most capable model with extended thinking, since this requires carefully reasoning through interacting regulatory risks before drafting conclusions",
      "The fast, lightweight model, to produce a first draft in seconds",
      "A single, quick chat question with no supporting regulatory detail",
      "No Claude involvement at all — compliance work should never use any AI assistance"
    ],
    correct: 0,
    explanation: "A risk assessment spanning overlapping regulations, where mitigation steps interact, is genuinely complex multi-step reasoning — a good fit for the most capable model with extended thinking (A). The fast model (B) prioritizes speed over the depth this task needs. A single vague question (C) can't surface the necessary nuance. Ruling out Claude entirely (D) is an overcorrection; used with appropriate human review, this kind of drafting support is reasonable."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A customer support supervisor wants to draft a single reusable macro reply for a common complaint type, but is unsure whether this counts as a one-off task or something worth setting up more formally.",
    question: "Since this macro will be used repeatedly by the whole team going forward, what's the better approach?",
    options: [
      "Treat it as reusable: save the finished macro someplace the team can access, or if further iteration is expected, keep it in a Project the team can reference for other repeated tasks",
      "Treat it purely as one-off since it's just a short paragraph of text",
      "Use extended thinking mode simply because it's going to be used more than once",
      "Discard it after this session and rewrite it fresh from scratch the next time a similar macro is needed"
    ],
    correct: 0,
    explanation: "Even short content is worth setting up for reuse when it will genuinely be used repeatedly — the deciding factor is recurrence, not length (A). Treating it as one-off purely because it's short (B) ignores the actual reuse pattern. Repeat usage alone doesn't require extended thinking; that depends on reasoning complexity, not frequency of reuse (C). Discarding and rewriting from scratch each time (D) wastes the benefit of having built a good macro once."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A company gives employees access to both claude.ai and an internal Claude-powered tool that has been fine-tuned with the company's specific style guide and pre-approved messaging for external communications. An employee is drafting a press release.",
    question: "Which is the more appropriate choice, all else equal?",
    options: [
      "claude.ai, since general-purpose chat is always the better choice for writing tasks",
      "The internal tool, since it already reflects the company's approved style guide and messaging, reducing rework and compliance risk",
      "Neither — press releases should always be written entirely without any assistance",
      "claude.ai, but only if extended thinking mode is turned on first"
    ],
    correct: 1,
    explanation: "When an internal tool is purpose-built with the company's exact approved style guide and messaging, it reduces the risk of drafts needing rework or violating brand/compliance standards, making it the better fit here (B). Claiming general-purpose chat is 'always' better (A) ignores cases where a tailored internal tool serves the task more precisely. Avoiding any assistance (C) discards a legitimate use case. Turning on extended thinking in claude.ai (D) doesn't address the actual gap, which is company-specific style and approval alignment."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A product manager needs to work through a genuinely tricky prioritization problem: ranking ten competing feature requests against limited engineering time, customer impact, and technical dependencies that affect each other.",
    question: "What is the best fit for this task?",
    options: [
      "The fast, lightweight model, to get a ranked list back as quickly as possible",
      "Extended thinking mode with the most capable model, since the ranking depends on multiple interacting factors that benefit from careful reasoning",
      "A one-line chat message with no details about the features, impact, or dependencies",
      "Skipping analysis and just ranking the features alphabetically"
    ],
    correct: 1,
    explanation: "Ranking items against multiple interacting constraints (time, impact, dependencies) is a genuinely hard multi-step problem, which is what extended thinking with the most capable model is designed to help with (B). The fast model (A) sacrifices the careful weighing this decision needs for speed. A detail-free prompt (C) can't produce a meaningful ranking. Ranking alphabetically (D) ignores the actual prioritization criteria entirely."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A hotel front-desk manager wants to quickly check the standard formula for calculating a nightly room rate after a percentage discount, for a single quick calculation right now.",
    question: "What's the best way to get this?",
    options: [
      "A quick chat using the fast, lightweight model",
      "A dedicated Project built around discount calculations",
      "Extended thinking mode with the most capable model",
      "An Artifact set up as an ongoing pricing calculator"
    ],
    correct: 0,
    explanation: "A single quick calculation question is well suited to the fast model in a plain chat (A). Building a Project (B) is unnecessary setup for a one-off question. Extended thinking (C) adds no value to a simple formula lookup. An ongoing Artifact calculator (D) would make sense if this were a recurring need, but the scenario specifies a single quick check."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A training coordinator needs to build a one-page onboarding checklist that new hires will use, and the coordinator expects to tweak the wording and add new steps over the coming months as the onboarding process evolves.",
    question: "What is the best fit for this need?",
    options: [
      "A plain chat answer regenerated in full every time a change is needed",
      "An Artifact containing the checklist, since it's a document that will be revisited and edited repeatedly over time",
      "Extended thinking mode, because checklists require complex multi-step reasoning",
      "The fastest model available with no particular feature enabled"
    ],
    correct: 1,
    explanation: "A document expected to be tweaked and expanded repeatedly over months fits the Artifact use case well — it can be edited in place rather than recreated from scratch each time (B). Regenerating the whole answer for every small change (A) is inefficient. Checklists are generally simple content, not the kind of hard reasoning problem extended thinking is meant for (C). Model choice alone (D) doesn't address the need for an editable, persistent format."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An HR business partner is investigating a complicated, multi-employee workplace conflict involving conflicting accounts, prior incidents, and potential policy violations, and needs to think through how the pieces fit together before drafting recommendations.",
    question: "What is the most appropriate approach?",
    options: [
      "A quick chat with the fast, lightweight model to save time on a sensitive matter",
      "Extended thinking mode with the most capable model, to carefully reason through the conflicting details before drafting conclusions",
      "A single short prompt summarizing the conflict in one sentence",
      "Skip using Claude and make a decision based on gut feeling alone"
    ],
    correct: 1,
    explanation: "Untangling conflicting accounts and multiple interacting factors before drafting recommendations is a genuinely hard reasoning task, which is exactly where extended thinking with the most capable model helps (B). The fast model (A) trades away depth on a sensitive, high-stakes matter. A one-sentence summary (C) loses the nuance needed to reason through the situation. Relying purely on gut feeling with no structured support (D) discards a tool that could help organize complex, conflicting information — though the final decision remains a human judgment call."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A construction project manager keeps having to re-explain the same site safety protocol and reporting format every time she asks Claude for help drafting a weekly site report, since she starts a new chat each time.",
    question: "What change would most improve this recurring workflow?",
    options: [
      "Keep starting new chats each week, since that's the standard approach for all tasks",
      "Set up a Project with the safety protocol and reporting format saved, so it doesn't need to be re-explained every week",
      "Switch to extended thinking mode each week to make up for the missing context",
      "Abandon using Claude for site reports since the repetition is unavoidable"
    ],
    correct: 1,
    explanation: "The actual problem is repeatedly re-explaining stable, reusable context — a Project solves exactly that by saving it once for every future session (B). Continuing to start fresh chats each week (A) preserves the inefficiency rather than fixing it. Extended thinking (C) doesn't restore missing context; it only affects reasoning depth. Abandoning Claude (D) is unnecessary since a Project resolves the actual issue."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "A retail cashier trainee asks a single quick question about how to phrase a receipt-return greeting to a customer, needed immediately.",
    question: "What's the right fit?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A full Project built around customer greetings",
      "Extended thinking mode with the most capable model",
      "An Artifact set up for tracking greeting variations over time"
    ],
    correct: 0,
    explanation: "A simple, immediate wording question is best served by the fast model in a quick chat, with no extra setup needed (A). A full Project (B) is unnecessary for a single quick question. Extended thinking (C) adds no benefit to such a simple request. A tracking Artifact (D) implies ongoing reference that this one-off question doesn't call for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A regional sales director needs to build a one-page competitive positioning summary comparing five competitors that the whole sales team will refer back to and update as market conditions shift over the coming quarter.",
    question: "What's the best way to deliver this?",
    options: [
      "A plain one-off chat answer, regenerated fully from scratch anytime an update is needed",
      "An Artifact structured as a document or table, since it's meant to be referenced and updated by the team over an extended period",
      "Extended thinking mode alone, with no particular delivery format specified",
      "A brand-new chat conversation every time someone on the team wants to view it"
    ],
    correct: 1,
    explanation: "A document meant to be referenced and updated by a team over an entire quarter is a strong Artifact use case — a persistent, editable format beats scrollback (B). A plain chat answer (A) or repeatedly starting new chats (D) make ongoing team reference and updates clunky. Extended thinking (C) addresses reasoning depth, not the actual need here, which is a shareable, editable format."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A supply chain analyst needs to model how a potential supplier disruption in one region would cascade through multiple downstream product lines, considering lead times, inventory buffers, and alternate sourcing options together.",
    question: "What is the best-suited approach?",
    options: [
      "The most capable model with extended thinking enabled, given the need to reason through multiple interacting downstream effects",
      "The fast, lightweight model, since supply chains are simple linear systems",
      "A single chat message with no supporting detail about lead times, buffers, or sourcing",
      "Handling this purely with a coin flip between two obvious options"
    ],
    correct: 0,
    explanation: "Modeling cascading effects across interacting variables (lead times, buffers, sourcing options) is genuinely complex, multi-step reasoning — well suited to the most capable model with extended thinking (A). Supply chains are not simple linear systems, so the fast model (B) risks an oversimplified analysis. A detail-free prompt (C) can't support meaningful modeling. A random choice (D) ignores the actual analytical work needed."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A property manager needs to draft the same type of lease-renewal letter for dozens of tenants each year, with only the tenant name, unit number, and new rent amount changing each time.",
    question: "What's the smartest way to handle this recurring task?",
    options: [
      "Set up a Project with the lease-renewal letter template and tone saved, so producing each tenant's version doesn't require rebuilding the letter from scratch",
      "Write a fully new, differently worded letter from scratch every single time with no saved template",
      "Use extended thinking mode for every single tenant letter",
      "Avoid using Claude since lease letters must always be handwritten individually"
    ],
    correct: 0,
    explanation: "A template-style task repeated across many tenants is a clear case for a Project, which saves the reusable structure so only the variable details change each time (A). Rebuilding the letter from scratch every time (B) wastes effort on a task built for reuse. Extended thinking (C) isn't needed for filling in a template with three variables. Refusing to use Claude at all (D) is an unnecessary overcorrection for a routine administrative task."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A customer success manager wants a single quick check on whether a sentence in an email sounds too formal. It's a small, one-time question.",
    question: "What's the appropriate fit?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project with saved email tone guidelines",
      "Extended thinking mode with the most capable model",
      "An Artifact tracking tone consistency across all company emails"
    ],
    correct: 0,
    explanation: "A small, one-time tone check is well matched to the fast model in a plain chat (A). A Project (B) makes sense for recurring tone-checking needs, not a single sentence check. Extended thinking (C) adds unneeded depth for such a small ask. A company-wide tracking Artifact (D) is a much larger undertaking than this simple question calls for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An office manager consistently uses extended thinking mode and the most capable model for every task, including simple ones like fixing typos in a one-line notice, because she assumes 'more powerful is always better.'",
    question: "What's the issue with this habit?",
    options: [
      "There is no issue — always using the most capable settings guarantees the best outcome for every task",
      "It applies unnecessary time and effort to simple tasks that the fast, lightweight model could handle just as well, without meaningfully improving quality",
      "Extended thinking mode is only available for coding-related tasks",
      "The most capable model produces lower-quality writing than the fast model"
    ],
    correct: 1,
    explanation: "Matching effort to task complexity is the actual skill — using heavier settings for simple tasks wastes time without a meaningful quality benefit (B). Option A defends the always-maximum-power habit rather than identifying its downside. Option C is false — extended thinking applies to many kinds of complex reasoning, not just coding. Option D is also false; the most capable model doesn't produce worse writing, it's simply unnecessary overhead for trivial tasks."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A nonprofit executive director needs to develop a three-year strategic fundraising plan that accounts for donor fatigue, shifting grant landscapes, and multiple funding scenarios that all interact with each other.",
    question: "What's the best-suited approach?",
    options: [
      "The most capable model with extended thinking enabled, given the need to reason through multiple interacting long-term factors",
      "The fast, lightweight model, since strategic plans are just formatted documents",
      "A single quick chat question with no supporting detail about donor trends or funding scenarios",
      "Skip planning entirely and reuse last year's plan unchanged"
    ],
    correct: 0,
    explanation: "A multi-year plan balancing several interacting uncertain factors (donor fatigue, grant trends, funding scenarios) is genuinely complex reasoning, which extended thinking with the most capable model is designed to support (A). Treating it as 'just a document' undervalues the analysis needed (B). A detail-free prompt (C) can't produce a grounded plan. Reusing last year's plan unchanged (D) ignores the changed circumstances the plan is meant to address."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A company offers both claude.ai and an internal Claude-powered scheduling assistant that's directly wired into the company's booking calendar system. An employee needs to check real-time room availability for next Tuesday.",
    question: "Which is the appropriate choice?",
    options: [
      "The internal scheduling assistant, since it's actually connected to the live booking calendar and can check real availability",
      "claude.ai, since general chat can access any company's calendar system automatically",
      "claude.ai with extended thinking mode, to carefully reason out likely room availability",
      "Neither — room availability should always be checked by calling the front desk"
    ],
    correct: 0,
    explanation: "Real-time, company-specific data like room availability requires a tool actually wired into that system — the internal scheduling assistant is built for exactly this (A). General claude.ai chat has no default access to a company's private calendar system (B). Extended thinking (C) doesn't create access to live data it doesn't have; it only affects reasoning depth. Calling the front desk (D) is a fine fallback but ignores that a better-suited tool is already available."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A landscaping company owner wants a single quick estimate template idea for a small residential job, needed once for a same-day quote.",
    question: "What's the appropriate approach?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project with years of past estimate history preloaded",
      "Extended thinking mode with the most capable model",
      "An Artifact designed for tracking estimates across the whole season"
    ],
    correct: 0,
    explanation: "A single same-day estimate idea is a simple task well matched to the fast model in a plain chat (A). Preloading years of history into a Project (B) is disproportionate setup for one quick estimate. Extended thinking (C) adds unnecessary depth. A season-long tracking Artifact (D) would make sense for ongoing estimate management, but not for this single one-off need."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A restaurant chain's operations team needs to build a recurring weekly inventory-ordering checklist template that every location manager will use every week, following the same structure indefinitely.",
    question: "What's the best long-term setup?",
    options: [
      "A Project with the checklist structure and ordering guidelines saved, so it's ready to apply consistently across locations every week",
      "A new, differently structured checklist invented from scratch each week at each location",
      "Extended thinking mode used individually by each location manager every week",
      "A one-time Artifact that's created once and never referenced again"
    ],
    correct: 0,
    explanation: "A structure meant to be reused consistently, indefinitely, across multiple locations is a strong case for a Project that keeps the checklist format and guidelines saved and consistent (A). Reinventing the checklist weekly at each location (B) undermines the consistency the company wants. Extended thinking (C) isn't needed for filling out a routine checklist. An Artifact created once and never referenced again (D) contradicts the described ongoing weekly use."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A benefits administrator must reconcile conflicting information from three different sources about how a new tax law affects employee health savings account contribution limits, and needs a defensible, carefully reasoned explanation before communicating changes company-wide.",
    question: "What is the best-suited approach?",
    options: [
      "The fast, lightweight model, to get an answer out to employees as soon as possible",
      "The most capable model with extended thinking enabled, to carefully work through the conflicting sources before drafting a company-wide explanation",
      "A single one-line question with no mention of the conflicting sources",
      "Skip verifying the details and just guess at the new limits"
    ],
    correct: 1,
    explanation: "Reconciling conflicting information from multiple sources before a high-stakes, company-wide communication is a genuinely hard, multi-step reasoning task — a strong fit for the most capable model with extended thinking (B). Prioritizing speed with the fast model (A) risks an inaccurate company-wide message. A one-line question with no supporting detail (C) can't resolve the conflict. Guessing (D) is clearly inappropriate for a compliance-sensitive topic like HSA limits."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A financial advisor's assistant needs to build a simple, visual one-page client-meeting prep sheet — talking points, portfolio highlights, and follow-up items — that will be reused and lightly adjusted before every client meeting from now on.",
    question: "What's the best combination of features for this?",
    options: [
      "A Project with the standard prep-sheet format saved, and an Artifact used each time to produce the actual editable prep sheet for a given client meeting",
      "A single one-off chat answer generated completely fresh, with no saved structure, before every single meeting",
      "Extended thinking mode alone, with no particular document format specified",
      "The fast, lightweight model exclusively, with no saved context and no editable document format"
    ],
    correct: 0,
    explanation: "This scenario combines two needs: a reusable format (best saved in a Project) and a visual, editable document produced each time (best delivered as an Artifact) — using them together is the strongest fit (A). Rebuilding everything from scratch every meeting (B) discards the benefit of the process being repeatable. Extended thinking alone (C) doesn't address the format or reuse need. Using only the fast model with no saved context or editable format (D) misses both the reuse and visual-document aspects of the request."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A call center trainer wants a single, quick clarification on the difference between two similar customer service terms, needed right now for a training session that starts in five minutes.",
    question: "What's the appropriate fit?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project with the entire training curriculum preloaded",
      "Extended thinking mode with the most capable model",
      "An Artifact designed for long-term curriculum development"
    ],
    correct: 0,
    explanation: "A quick clarification needed in five minutes is best served by the fast model's speed (A). Preloading an entire curriculum into a Project (B) is far more setup than a single quick clarification warrants, especially under time pressure. Extended thinking (C) would add delay without meaningfully improving such a simple answer. A long-term curriculum Artifact (D) addresses a different, bigger need than this single urgent question."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A retail chain's pricing team needs to figure out an optimal markdown schedule for end-of-season inventory across multiple product categories, balancing sell-through targets, margin protection, and competitor pricing patterns that all influence each other.",
    question: "Which approach fits this task's complexity?",
    options: [
      "The most capable model with extended thinking enabled, since the markdown schedule depends on multiple interacting variables that benefit from careful reasoning",
      "The fast, lightweight model, since markdown schedules are simple percentage calculations",
      "A single chat message with no details about sell-through targets, margins, or competitor pricing",
      "Set markdowns randomly and adjust reactively without any upfront analysis"
    ],
    correct: 0,
    explanation: "Balancing several interacting business variables (sell-through, margin, competitor pricing) to build an optimal schedule is genuinely complex reasoning, well suited to the most capable model with extended thinking (A). Reducing it to 'simple percentage calculations' (B) understates the interacting trade-offs involved. A detail-free prompt (C) can't produce a grounded schedule. Random markdowns with no analysis (D) ignores the value of planning ahead of a costly season-end decision."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A city parks department volunteer coordinator wants to draft a simple one-time flyer announcing a single upcoming cleanup event, with no plans to reuse this specific flyer content.",
    question: "What's the best fit?",
    options: [
      "A plain one-off chat conversation to draft the flyer text",
      "A Project set up permanently for all future flyers, cleanups, and volunteer events",
      "Extended thinking mode, since flyers require deep multi-step reasoning",
      "An Artifact meant for years of ongoing edits to this one specific flyer"
    ],
    correct: 0,
    explanation: "A single flyer with no stated plan for reuse is well matched to a plain one-off chat (A). Setting up a permanent Project (B) would make sense only if future flyers and events were part of the plan, which isn't described here. Flyer text is simple content, not the kind of hard reasoning problem extended thinking addresses (C). Treating this single flyer as something needing years of ongoing edits (D) mismatches the described one-time use."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An insurance claims manager needs to investigate a complex claim involving multiple parties, conflicting witness statements, and policy exclusions that interact in non-obvious ways, before recommending how the claim should be handled.",
    question: "What's the best-suited approach?",
    options: [
      "The fast, lightweight model, to move through the claim quickly and close it out",
      "The most capable model with extended thinking enabled, to carefully reason through the conflicting statements and interacting exclusions before making a recommendation",
      "A single short prompt with no case details provided",
      "Skip investigation and approve the claim automatically"
    ],
    correct: 1,
    explanation: "Untangling conflicting statements and interacting policy exclusions before a consequential recommendation is a genuinely hard, multi-step reasoning task suited to the most capable model with extended thinking (B). The fast model (A) trades away the careful analysis this claim needs. A detail-free prompt (C) can't support a grounded recommendation. Automatically approving without investigation (D) skips the analysis the task actually requires."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A boutique owner needs one quick idea for a window display theme for this weekend. It's a single creative suggestion needed today, with no follow-up planned.",
    question: "What's the appropriate fit?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project for seasonal display planning",
      "Extended thinking mode with the most capable model",
      "An Artifact tracking every display theme used over the years"
    ],
    correct: 0,
    explanation: "A single quick creative suggestion needed today is well matched to the fast model in a plain chat (A). A Project for seasonal planning (B) would make sense if this were part of an ongoing seasonal display strategy, but that isn't described here. Extended thinking (C) adds no meaningful value to a quick creative idea. A multi-year tracking Artifact (D) is far more than this single request calls for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A company's internal Claude-powered tool is specifically built and approved for handling sensitive employee medical accommodation requests in compliance with privacy regulations. An HR coordinator needs to discuss such a request.",
    question: "Which should the coordinator use?",
    options: [
      "The internal, compliance-approved tool, since it's specifically built to handle this sensitive, regulated category of information appropriately",
      "General claude.ai chat, since all Claude products handle sensitive medical information identically",
      "claude.ai with extended thinking mode, to compensate for the lack of compliance approval",
      "Neither — sensitive requests should never be discussed using any digital tool of any kind"
    ],
    correct: 0,
    explanation: "When an internal tool has been specifically built and approved to handle a sensitive, regulated category of information, it's the appropriate choice over general-purpose chat that lacks that specific approval (A). Assuming all Claude products handle sensitive data identically (B) ignores the real differences in how tools are configured and approved for compliance. Turning on extended thinking (C) doesn't grant compliance approval a general tool doesn't have. Refusing any digital tool (D) is an overcorrection when an appropriately approved option already exists."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A talent acquisition specialist runs the same structured process for every open role: screening resumes against a fixed rubric, then drafting interview questions using the same format each time, for dozens of roles a year.",
    question: "Given how repeatable and structured this process is, what's the best setup?",
    options: [
      "A Project with the screening rubric and interview-question format saved, so it's ready to apply consistently to each new role",
      "A completely different, freshly invented process for each individual role with nothing saved or reused",
      "Extended thinking mode used for every single resume screened",
      "An Artifact recreated entirely from scratch for each new role with no shared template"
    ],
    correct: 0,
    explanation: "A structured process repeated across dozens of roles a year, using the same rubric and format, is a clear case for a Project that saves and reuses that structure (A). Inventing a new process for every role (B) discards the benefit of having a proven, repeatable rubric. Extended thinking (C) isn't necessary for routine resume screening against a fixed rubric. Recreating an Artifact from scratch each time with no shared template (D) forfeits the reuse this recurring task calls for."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A manufacturing plant manager needs to diagnose the likely root cause of a recurring quality defect that could stem from several possible interacting factors across the production line — equipment calibration, raw material variability, and operator procedure differences.",
    question: "What is the best-suited approach?",
    options: [
      "The most capable model with extended thinking enabled, to carefully reason through the several interacting possible causes before narrowing down a likely root cause",
      "The fast, lightweight model, since defect diagnosis is usually a single obvious cause",
      "A single short prompt with no details about the equipment, materials, or procedures involved",
      "Guess at a cause and shut down the affected line without further analysis"
    ],
    correct: 0,
    explanation: "Diagnosing a defect with several plausible interacting causes is a genuinely hard, multi-step reasoning problem well suited to the most capable model with extended thinking (A). Assuming defects are usually a single obvious cause (B) understates the complexity described. A detail-free prompt (C) can't support meaningful root-cause analysis. Guessing and shutting down a line without analysis (D) is a costly overreaction that skips the diagnostic step entirely."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A daycare center director needs one quick reminder message worded for parents about tomorrow's early closing. It's a single message needed today.",
    question: "What's the appropriate approach?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project for parent communications",
      "Extended thinking mode with the most capable model",
      "An Artifact tracking every parent message sent all year"
    ],
    correct: 0,
    explanation: "A single quick reminder message needed today is well matched to the fast model in a plain chat (A). A dedicated Project (B) would suit an ongoing parent-communication workflow, not this single message. Extended thinking (C) adds no meaningful value to a simple reminder. A year-long tracking Artifact (D) is far more infrastructure than this one message calls for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A museum's visitor experience manager wants a simple, editable table comparing five potential new exhibit themes across cost, expected attendance, and setup time, something the planning committee will revisit and adjust over the next two weeks of discussions.",
    question: "What's the best format for this?",
    options: [
      "A plain chat response listing the comparison in text form, regenerated whenever changes are needed",
      "An Artifact structured as a table, since the committee will revisit and adjust the comparison repeatedly over two weeks",
      "Extended thinking mode, since exhibit themes require deep multi-step reasoning",
      "A brand-new chat conversation started each time the committee wants to review it"
    ],
    correct: 1,
    explanation: "Content that a committee will revisit and adjust repeatedly over an extended period is a strong Artifact use case — a table format that persists and can be edited in place (B). A plain chat response regenerated each time (A) or repeatedly starting new chats (D) both make ongoing group revision more cumbersome. Comparing five themes on straightforward criteria doesn't require the deep reasoning extended thinking is meant for (C)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A public policy researcher must synthesize findings from a dozen conflicting academic studies on a contested economic question and produce a defensible, nuanced summary of where the evidence actually points.",
    question: "What's the best-suited approach?",
    options: [
      "The fast, lightweight model, to summarize the studies as quickly as possible",
      "The most capable model with extended thinking enabled, given the need to carefully weigh conflicting evidence across many sources before reaching defensible conclusions",
      "A single short prompt naming the topic with no mention of the studies or their conflicting findings",
      "Pick whichever single study seems most convincing and ignore the rest"
    ],
    correct: 1,
    explanation: "Weighing conflicting findings across a dozen sources to reach a defensible, nuanced conclusion is genuinely hard, multi-step reasoning — well suited to the most capable model with extended thinking (B). The fast model (A) prioritizes speed over the depth this synthesis needs. A vague, detail-free prompt (C) can't support meaningful synthesis. Cherry-picking one convincing study while ignoring the rest (D) undermines the entire point of a nuanced literature synthesis."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A car dealership salesperson needs a single quick talking point for describing a car's fuel efficiency to a customer standing at the desk right now.",
    question: "What's the appropriate fit?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project with the dealership's entire vehicle inventory preloaded",
      "Extended thinking mode with the most capable model",
      "An Artifact tracking every sales conversation over the year"
    ],
    correct: 0,
    explanation: "A single quick talking point needed immediately is well matched to the fast model in a plain chat (A). Preloading the entire dealership inventory into a Project (B) is disproportionate setup for one quick talking point, though it could make sense for a broader ongoing sales-support workflow. Extended thinking (C) adds no value to such a simple request. A year-long conversation-tracking Artifact (D) is far more than this immediate need calls for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A wedding planning business owner handles dozens of clients per year and drafts a similar day-of timeline document for each one, with the same overall structure but different specific details each time.",
    question: "Given how repeatable this is across many clients, what's the best setup?",
    options: [
      "A Project with the standard day-of timeline structure and formatting saved, ready to adapt for each new client",
      "A completely unique structure invented from scratch for each of the dozens of clients per year",
      "Extended thinking mode used for every single client timeline",
      "Refusing to use any saved structure and re-explaining the format verbally to Claude every time"
    ],
    correct: 0,
    explanation: "A recurring document with the same overall structure across many clients is a strong case for a Project that saves the reusable format once (A). Inventing a new structure for each of dozens of clients (B) wastes the benefit of a proven, repeatable format. Extended thinking (C) isn't needed for routine timeline drafting. Re-explaining the format every time instead of saving it (D) forfeits the main advantage a Project offers for this kind of repeatable work."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A small manufacturing company wants to automatically generate a formatted weekly production summary by pulling numbers from the same spreadsheet every Friday, following identical steps each time, and is willing to invest a bit of setup time to make this hands-off going forward.",
    question: "Which option best matches this need for repeatable, lightly automated work?",
    options: [
      "Claude Code, since it's suited to setting up this kind of light, repeatable automation, even for someone without a technical background who is willing to learn the setup once",
      "A brand-new claude.ai chat every Friday with the spreadsheet re-explained from scratch",
      "The most capable model exclusively, with no attention to whether the task is automated or repeated manually",
      "An Artifact recreated by hand from scratch every single Friday"
    ],
    correct: 0,
    explanation: "A task with identical repeatable steps that the company wants to make hands-off is a good candidate for Claude Code's light automation capabilities, which can be learned by a non-developer willing to invest some setup time (A). Starting a new chat and re-explaining everything weekly (B) keeps the process manual, which is exactly what they want to avoid. Model choice alone (C) doesn't address the automation goal. Recreating an Artifact by hand every week (D) also stays manual rather than becoming hands-off."
  },
  {
    domain: 3,
    difficulty: 5,
    scenario: "A biotech operations coordinator wants Claude to independently monitor live lab sensor data streams around the clock and automatically shut down equipment if a fault is detected, without any human ever reviewing the decision.",
    question: "How should this request be evaluated?",
    options: [
      "This is a good fit for extended thinking mode in claude.ai, which can monitor live sensor data continuously",
      "This is a poor fit for current Claude products as described — safety-critical, fully autonomous equipment control without human review goes beyond what these tools are meant to be used for, and a specialized industrial control system with human oversight is more appropriate",
      "This is a good fit for the internal company tool, since internal tools can always safely control physical equipment",
      "This is a good fit for a Project, since saved instructions would make the automatic shutdown reliable"
    ],
    correct: 1,
    explanation: "Recognizing when a task is a poor fit for any current Claude product is part of good judgment — fully autonomous, safety-critical control of physical equipment with zero human review calls for specialized industrial control systems with proper safeguards, not a general chat assistant (B). Extended thinking mode (A) affects reasoning depth, not the ability to continuously monitor live equipment or safely control it. Internal tools (C) aren't automatically safe for physical equipment control just because they're internal — that claim is false. A Project (D) only saves instructions and context; it doesn't provide the real-time monitoring, control integration, or safety oversight this task actually requires."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A yoga studio owner needs a single quick idea for a class name for tomorrow's new session, needed right now with no plan for reuse.",
    question: "What's the sensible choice?",
    options: [
      "A quick chat with the fast, lightweight model",
      "A dedicated Project for class scheduling",
      "Extended thinking mode with the most capable model",
      "An Artifact tracking every class name used all year"
    ],
    correct: 0,
    explanation: "A single quick creative suggestion is a simple task well matched to the fast model in a plain chat (A). A dedicated Project (B) would suit an ongoing class-scheduling workflow, not a single name idea. Extended thinking (C) adds no meaningful value to such a small creative request. A year-long tracking Artifact (D) is far more than this one-off need calls for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A software training vendor's customer education lead is deciding how to handle live, real-time troubleshooting questions from customers during a webinar happening right now, versus preparing detailed reference materials for after the session.",
    question: "Which pairing best matches tool to task?",
    options: [
      "Use the fast, lightweight model in quick chat for live in-the-moment questions during the webinar, and build an Artifact afterward for the detailed reference guide customers will keep and consult later",
      "Use extended thinking mode for every live question during the webinar to maximize thoroughness in the moment",
      "Use a single one-off chat for both the live questions and the detailed reference guide, treating them identically",
      "Use a Project during the live webinar itself instead of a quick chat, since Projects respond fastest"
    ],
    correct: 0,
    explanation: "This scenario has two different needs: quick real-time answers (fast model, quick chat) and a durable reference document to be kept and consulted later (Artifact) — pairing each need to the right tool is the correct approach (A). Extended thinking during a live webinar (B) would slow down responses when speed matters most. Treating both needs identically with a single one-off chat (C) ignores that the reference guide benefits from a persistent, editable format. Claiming Projects respond fastest (D) is inaccurate — Projects are about saved context and reuse, not response speed."
  }
];
