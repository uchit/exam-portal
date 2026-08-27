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
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A regional bank is building an internal assistant that answers loan officers' policy questions by retrieving from a 400-page underwriting manual. Officers report that answers are frequently accurate on the paragraph they cite but miss related exceptions stated three sections earlier in the same manual.",
    question: "What is the most likely root cause and appropriate fix?",
    options: [
      "The model is too small for the task; switch to the largest available model without changing anything else",
      "The retrieval chunking is too narrow, severing exceptions from the rules they modify; widen or restructure chunks so related clauses stay together, or add cross-references into each chunk",
      "The temperature setting is too high, causing inconsistent recall of manual content",
      "The manual should be summarized into a single short document to avoid retrieval entirely"
    ],
    correct: 1,
    explanation: "When answers are locally accurate but miss context that lives just outside the retrieved chunk, the problem is almost always chunk boundaries cutting apart logically linked content, not raw model capability. Widening chunks or embedding cross-references fixes the actual failure mode. Swapping models (A) doesn't address a retrieval-completeness problem. Temperature (C) affects phrasing variability, not what content was retrieved. Collapsing a 400-page manual into one summary (D) would lose the granularity officers need."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A telecom provider's customer support system sends the same 6,000-token system prompt (product catalog, policy rules, tone guidelines) on every single request, and the team has noticed both high latency and a large recurring cost line in their monthly Claude usage report.",
    question: "What is the most effective first step to address this without changing the assistant's behavior?",
    options: [
      "Shrink the system prompt by deleting policy rules that are used infrequently",
      "Enable prompt caching for the stable, repeated portion of the system prompt so it isn't reprocessed at full cost on every call",
      "Switch to a smaller model to offset the token cost",
      "Move the policy content into the user message so it only loads when needed"
    ],
    correct: 1,
    explanation: "A large, static prefix repeated across many requests is the textbook case for prompt caching: it preserves full behavior while sharply cutting cost and latency on cache hits. Deleting rules (A) changes behavior and risks breaking edge-case handling. Downsizing the model (C) trades away quality to solve a cost problem caching would solve directly. Moving stable content into the user message (D) doesn't reduce token volume and forfeits the chance to cache it as a stable prefix."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An insurance carrier has twelve product squads independently writing system prompts for their own Claude-powered features (claims intake, quote generation, fraud triage). A recent audit found three different phrasings of the company's regulatory disclaimer, two conflicting definitions of 'high-risk applicant,' and no shared source of truth.",
    question: "What organizational change most directly addresses this problem?",
    options: [
      "Mandate that all squads use identical system prompts word-for-word regardless of feature differences",
      "Establish a shared prompt component library and governance process — versioned, centrally reviewed building blocks for disclaimers, definitions, and compliance language that squads compose into their feature-specific prompts",
      "Let each squad continue independently since Claude's model quality will resolve inconsistencies automatically",
      "Replace all squad-specific prompts with a single company-wide assistant"
    ],
    correct: 1,
    explanation: "Divergent phrasing of compliance-critical language across teams is a governance failure, not a model-capability issue; the fix is centralized ownership of shared, versioned prompt components that squads assemble into their own prompts, preserving feature-specific flexibility while eliminating drift on shared facts. Forcing identical prompts (A) ignores real functional differences between features. Assuming the model self-corrects factual inconsistency (C) is false — the model reproduces whatever the prompt says. Merging everything into one assistant (D) is a much larger, riskier change than the problem calls for."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A logistics company runs a multi-agent system where a planning agent decomposes shipping route optimization requests and hands sub-tasks to worker agents. Over a long-running optimization session, the planning agent's context window is filling with the full output of every worker agent, including verbose intermediate calculations.",
    question: "What context engineering approach best sustains this system as sessions grow longer?",
    options: [
      "Increase the context window ceiling and let raw outputs accumulate indefinitely",
      "Have worker agents return only structured, condensed results, and have the planning agent maintain a running summary of completed sub-tasks rather than retaining every raw output",
      "Restart the entire session from scratch whenever the context approaches its limit",
      "Instruct worker agents to stop producing intermediate calculations entirely"
    ],
    correct: 1,
    explanation: "The sustainable pattern is deliberate compaction: worker agents return condensed, structured results instead of verbose raw output, and the orchestrating agent keeps a running summary rather than a full transcript, preserving what matters for planning while controlling growth. Simply raising the ceiling (A) delays but doesn't solve the problem and increases cost and latency as context grows. Restarting from scratch (C) discards useful state and disrupts the workflow. Eliminating intermediate calculations (D) may remove information workers legitimately need to reason correctly, not just information that's redundant downstream."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A healthcare SaaS company offers an AI-assisted clinical note summarizer used by physicians during patient visits. Response time must stay under two seconds, and the task is narrowly scoped: condense structured visit data into a standard note format.",
    question: "Which model-selection principle applies most directly here?",
    options: [
      "Always default to the most capable model available for anything touching healthcare data, regardless of task shape",
      "Match model capability to task complexity: a well-scoped, format-constrained summarization task with a hard latency requirement is a strong candidate for a faster, lighter model rather than the most capable one",
      "Use the most capable model for the first draft and a lighter model only for final formatting",
      "Model choice is irrelevant as long as the prompt is well-engineered"
    ],
    correct: 1,
    explanation: "The task is narrow, well-defined, and latency-constrained — exactly the profile where a faster, lighter model typically delivers sufficient quality at much better speed and cost, rather than reflexively over-provisioning for a healthcare-adjacent label. Defaulting to the most capable model everywhere in a regulated domain (A) conflates data sensitivity with task complexity — they're different axes. Reversing the pipeline order (C) doesn't match how capability trade-offs actually work. Claiming model choice is irrelevant (D) ignores real, measurable differences in latency and behavior across the model family."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A legal services firm uses Claude to draft first-pass contract clauses. Associates report that when they paste in a 150-page master services agreement for context, clause quality on unrelated, short amendments degrades compared to when they paste only the relevant three pages.",
    question: "What is the best explanation and corrective strategy?",
    options: [
      "The model has a hard token limit that was silently exceeded, causing truncation; the firm should switch to a model with a larger context window",
      "Irrelevant context dilutes the model's attention and increases the chance of drawing on unrelated boilerplate; the firm should adopt a retrieval or extraction step that surfaces only the clauses relevant to the current amendment before drafting",
      "The model performs worse on longer documents categorically, so document length should always be minimized regardless of relevance",
      "Associates should lower the temperature setting to counteract the effect of extra context"
    ],
    correct: 1,
    explanation: "This is a signal-to-noise problem: including a large volume of irrelevant material makes it more likely the model anchors on tangential boilerplate rather than the specific clause being drafted, and the fix is targeted retrieval/extraction of the relevant sections rather than dumping the whole document. Assuming a silent truncation failure (A) misdiagnoses a quality problem as a hard limit problem without evidence. Claiming all long documents categorically degrade quality (C) overgeneralizes — relevant long context can still help. Temperature (D) governs output variability, not context relevance."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A government benefits agency is deploying a citizen-facing chatbot to answer questions about eligibility rules that change quarterly through legislative updates. Engineering wants to hard-code the current rules directly into the system prompt to keep the architecture simple.",
    question: "What context engineering concern should most influence this decision?",
    options: [
      "Hard-coding is fine indefinitely since system prompts can be edited freely at any time",
      "Hard-coded rules will drift out of date between updates and require a prompt redeploy each quarter with no audit trail of what changed when; a versioned, externally sourced rules reference (updated independently of the prompt) reduces staleness risk and supports compliance auditing",
      "The chatbot should be rebuilt from scratch each quarter to guarantee freshness",
      "Rules should be left out of the prompt entirely and the model should rely on its training knowledge of benefits law"
    ],
    correct: 1,
    explanation: "For content that changes on a predictable cycle and carries compliance weight, embedding it directly in the prompt creates staleness risk and poor auditability; externalizing it into a versioned reference that's updated on its own cadence — with the prompt pulling from it — is the standard pattern for legally sensitive content freshness. Saying hard-coding is 'fine indefinitely' (A) ignores the update cadence stated in the scenario. Full rebuilds each quarter (C) is far more costly than necessary. Relying on training knowledge (D) is unreliable and unauditable for legislated rules that change over time."
  },
  {
    domain: 2,
    difficulty: 1,
    scenario: "A small nonprofit is evaluating whether to use Claude's most capable model or a faster, cheaper model for a volunteer-facing FAQ bot that answers simple questions about event logistics from a short, fixed document.",
    question: "Which factor should weigh most heavily in this decision?",
    options: [
      "The task's complexity and quality requirements relative to what a lighter, faster model can already deliver",
      "Brand perception of using the 'best' model regardless of fit",
      "Whichever model has the longest name recognition in the market",
      "The number of volunteers on staff"
    ],
    correct: 0,
    explanation: "Model selection should always be driven by whether the task's complexity and required output quality actually need the extra capability, not by branding or unrelated organizational factors. A simple FAQ task over a short, fixed document is well within reach of a lighter, cheaper model. Brand perception (B) and name recognition (C) are not engineering criteria. Staffing size (D) has no bearing on model capability requirements."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A financial services firm's research desk uses a Claude-based assistant that must reason over quarterly filings, analyst notes, and historical price data for a single company — collectively around 250,000 tokens per session. Analysts want the assistant to maintain full recall of every document across a multi-hour research session.",
    question: "What is the most sound context engineering approach for sustaining accuracy over the session?",
    options: [
      "Load all 250,000 tokens into a single context window at session start and never revisit the strategy, regardless of session length",
      "Use prompt caching for the stable document set to control cost, and pair it with periodic summarization or a retrieval layer for older exchange history so the model isn't forced to re-reason over the entire raw transcript as the session grows",
      "Cap the session at 20 minutes to avoid context growth entirely",
      "Discard the original documents after the first response and rely only on the model's summary of them"
    ],
    correct: 1,
    explanation: "Long, document-heavy sessions call for combining prompt caching on the large stable material (controlling repeat-processing cost) with compaction or retrieval over the growing conversational history, so the model isn't forced to reprocess an ever-expanding raw transcript while still retaining access to source documents. Loading everything once with no ongoing strategy (A) ignores that the conversation itself keeps growing. An arbitrary time cap (C) serves no architectural purpose and frustrates legitimate long sessions. Discarding source documents (D) risks losing fidelity the analysts explicitly need."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An e-commerce platform's product-description generator produces excellent results in testing but the team wants to guard against future prompt edits silently degrading quality once the feature is live and multiple engineers start touching the prompt.",
    question: "What practice most directly protects against this risk?",
    options: [
      "Freeze the prompt file permissions so only one engineer can ever edit it",
      "Treat the prompt as a versioned artifact with change review and a regression test suite of representative inputs/expected qualities run before any prompt change ships",
      "Avoid documenting the prompt's design intent so it can be freely reinterpreted",
      "Rewrite the prompt from scratch every time a new engineer joins the team"
    ],
    correct: 1,
    explanation: "Prompts in production are effectively code and should go through the same change-management discipline: versioning, review, and a regression suite that catches quality regressions before deployment. Restricting edits to one person (A) doesn't scale and creates a bottleneck without adding a safety mechanism. Withholding design intent (C) makes future edits more error-prone, not less. Rewriting from scratch on every hire (D) discards accumulated tuning for no benefit."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A manufacturing company's predictive maintenance assistant ingests sensor logs and technician notes, and must flag anomalies within a five-second SLA. A separate root-cause investigation tool, used after an anomaly is confirmed, has no such time constraint and must synthesize months of maintenance history.",
    question: "How should the team approach model selection across these two tools?",
    options: [
      "Use the same model for both since they're part of the same overall maintenance system",
      "Use a fast, lightweight model for the real-time anomaly flagging and reserve a more capable model with a larger effective context budget for the deeper root-cause synthesis",
      "Use the most capable model for anomaly flagging since safety is at stake, and a lightweight model for root-cause analysis to save cost",
      "Avoid using Claude for the time-constrained tool entirely and only use it for root-cause analysis"
    ],
    correct: 1,
    explanation: "The two tools have opposite constraint profiles: anomaly flagging is latency-critical and pattern-matching in nature, well suited to a fast lightweight model, while root-cause synthesis over months of history benefits from deeper reasoning capacity and can tolerate more processing time. Treating both identically (A) ignores those different shapes. Reversing the assignment (C) applies the heavier model where speed is critical and the lighter one where depth is needed — backwards. Excluding Claude from the real-time tool (D) is an overcorrection not supported by the scenario; latency-sensitive use is exactly where a lightweight model choice solves the problem."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A telecom's internal DevOps assistant answers questions about infrastructure runbooks. The team notices that when they add explicit worked examples of well-formatted runbook answers to the system prompt, output consistency improves noticeably compared to describing the desired format in prose alone.",
    question: "What does this observation illustrate about prompting strategy?",
    options: [
      "Worked examples are a distraction that should be removed to keep the prompt concise",
      "Concrete examples often communicate desired structure and tone more reliably than abstract prose instructions, especially for consistent formatting across many queries",
      "This effect only applies to code generation tasks, not runbook answers",
      "The improvement is coincidental and unrelated to the examples added"
    ],
    correct: 1,
    explanation: "This is a well-established prompting pattern: demonstrating the target format with concrete examples typically yields more consistent output than describing it abstractly, because it removes ambiguity about exactly what 'well-formatted' means. Calling examples a distraction (A) contradicts the team's own observed result. Restricting the effect to code tasks (C) is an unsupported and arbitrary limitation. Dismissing the improvement as coincidental (D) ignores a direct, attributable causal change the team made."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A multinational insurance underwriter operates a fleet of specialized Claude-based agents (risk scoring, document extraction, policy drafting, compliance review) that pass structured outputs to one another in a pipeline processing 40,000 applications per day. Latency budgets are tight, costs must stay predictable at scale, and a recent incident showed that a single vague field in the risk-scoring agent's output caused cascading misinterpretation three stages downstream.",
    question: "What is the most robust architectural response to prevent recurrence while preserving throughput and cost targets?",
    options: [
      "Merge all four agents into a single mega-prompt so there is no inter-agent handoff to misinterpret",
      "Define and enforce a strict, versioned schema for inter-agent handoff data with explicit field semantics, add lightweight validation between stages, and keep each agent's model sized to its individual task rather than uniformly upgrading all four",
      "Upgrade every agent in the pipeline to the most capable available model so ambiguity is less likely to occur at any stage",
      "Add a human reviewer between every pair of agents to catch ambiguous fields before they propagate"
    ],
    correct: 1,
    explanation: "The root cause is a contract problem between agents, not a raw capability shortfall — a versioned, explicit handoff schema with field-level semantics and validation prevents ambiguous data from propagating, while keeping each agent's model matched to its own task shape preserves both cost and latency targets. Collapsing the pipeline into one prompt (A) sacrifices the specialization and modularity that made the pipeline maintainable, and doesn't scale to 40,000/day within latency budgets. Uniformly upgrading every model (C) raises cost and latency without addressing the actual failure mode, which was ambiguity, not weak reasoning. Inserting human review at every stage (D) destroys the throughput the system depends on."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A real estate brokerage's listing-description assistant currently receives the full property database schema and 30 example listings in every prompt, even though only one property is being described per request. The team is exploring prompt caching to reduce cost.",
    question: "Which part of the current setup is the best candidate for caching, and why?",
    options: [
      "The single property's data, since it's the most important part of each request",
      "The stable schema and example listings, since they repeat identically across requests while only the target property data changes per call",
      "Nothing should be cached since every request is technically unique",
      "The final generated description, so it can be reused for future unrelated properties"
    ],
    correct: 1,
    explanation: "Prompt caching delivers value on content that stays identical across many calls; the schema and example listings fit that profile perfectly since only the per-request property data varies. Caching the variable target-property data (A) provides no benefit since it changes every call. Claiming nothing is cacheable (C) ignores the large repeated static portion actually present. Reusing a generated description for unrelated properties (D) would produce incorrect, non-unique output and misunderstands what caching is for."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A university's advising chatbot must remember a student's degree progress, prior conversations about course conflicts, and stated career goals across a semester-long series of chat sessions, but each session today starts with a blank context.",
    question: "What is the most appropriate context engineering approach to support continuity across sessions?",
    options: [
      "Ask students to re-paste their full advising history at the start of every session",
      "Maintain a persistent, structured student profile/summary that is retrieved and injected at the start of each new session, updated incrementally as new relevant facts emerge",
      "Keep every session's full raw transcript permanently in context for all future sessions regardless of length",
      "Give up on cross-session memory since chat sessions are inherently isolated"
    ],
    correct: 1,
    explanation: "Cross-session continuity is best achieved with a persistent, structured summary/profile that captures the durable facts (progress, prior issues, goals) and is loaded at session start, updated incrementally — this avoids re-deriving history each time while keeping context lean. Manually re-pasting history (A) is a poor user experience and error-prone. Retaining every full raw transcript indefinitely (C) grows context unsustainably and reintroduces irrelevant detail. Declaring cross-session memory impossible (D) is false — external state management solves exactly this problem."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A gaming studio's live-ops team uses Claude to generate flavor text for in-game items at high volume (tens of thousands per week) with tight per-item cost targets, while a separate narrative design team uses Claude to draft branching story arcs requiring nuanced character consistency across long story documents.",
    question: "Which staffing-independent factor should primarily drive the choice of model for each team?",
    options: [
      "The seniority of the team members using the tool",
      "The nature of each task: high-volume, low-complexity generation favors a faster/cheaper model, while nuanced, long-form narrative consistency favors a more capable model",
      "Whichever model is newest, applied uniformly to both teams",
      "The genre of the game being developed"
    ],
    correct: 1,
    explanation: "Task shape — volume, complexity, and the cost of a wrong or low-quality output — is the correct driver of model selection, independent of who is using the tool. Flavor text generation is high-volume and tolerant of a lighter model; branching narrative consistency benefits from stronger reasoning. Team seniority (A) and game genre (D) are irrelevant to model capability needs. Defaulting to whichever model is newest for everything (C) ignores the workload differences entirely."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An energy utility's grid operations assistant synthesizes real-time sensor telemetry with a static 80-page regulatory compliance handbook on every query, even though most queries only touch telemetry and never reference the handbook.",
    question: "What is the most effective way to reduce unnecessary cost and latency without losing compliance-aware answers when they are actually needed?",
    options: [
      "Remove the handbook from the system entirely since most queries don't use it",
      "Cache the static handbook content so repeated inclusion is cheap, and additionally consider routing: only pull in handbook-derived content when the query is classified as compliance-relevant",
      "Summarize the handbook down to one paragraph and always include only that",
      "Increase the model's context window size to absorb the extra cost"
    ],
    correct: 1,
    explanation: "Caching the static handbook addresses the repeated-cost problem when it is needed, and a lightweight routing/classification step avoids paying for its inclusion on queries that never touch compliance topics at all — combining both gives the best cost/latency outcome without sacrificing correctness. Removing the handbook (A) creates real compliance risk for the queries that do need it. Collapsing 80 pages to one paragraph (C) would strip detail needed for accurate compliance answers. A larger context window (D) doesn't address the fact that most of that content is often unnecessary in the first place."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A SaaS company's customer success org has both a tier-1 support chatbot handling high-volume, templated troubleshooting questions and a tier-2 escalation assistant that helps human agents reason through complex, multi-system outages with ambiguous root causes.",
    question: "What is the most appropriate model-selection pattern for this two-tier structure?",
    options: [
      "Use the same lightweight model for both tiers to keep support costs uniformly low",
      "Use a fast, cost-efficient model for tier-1's templated volume and a more capable model for tier-2's ambiguous, high-stakes reasoning, accepting the higher per-query cost where it's justified",
      "Use the most capable model for tier-1 since first impressions with customers matter most",
      "Randomly assign models per ticket to gather comparative performance data in production"
    ],
    correct: 1,
    explanation: "This is a textbook volume-versus-complexity trade-off: tier-1 is high-volume and templated, well served by a fast, cheap model, while tier-2 deals with ambiguous, high-stakes reasoning where the cost of a wrong answer is much higher, justifying a more capable model. Using the same lightweight model everywhere (A) risks poor outcomes on the hardest, highest-stakes cases. Over-provisioning tier-1 (C) spends budget where it isn't needed. Random per-ticket assignment (D) is not a deliberate architecture and introduces inconsistent customer experience for no engineering benefit."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A national pharmacy chain's clinical decision-support tool must never fabricate drug interaction information. Engineering is debating whether to rely on the model's training knowledge of drug interactions or to build a retrieval layer over an authoritative, regularly updated interaction database.",
    question: "What is the correct architectural choice and why?",
    options: [
      "Rely on training knowledge since retraining considerations are irrelevant at inference time and the model's knowledge is generally reliable",
      "Build the retrieval layer over the authoritative, regularly updated database, since drug interaction data changes over time and grounding responses in a verifiable, current source materially reduces the risk of outdated or fabricated interaction claims",
      "Ask the model to state a confidence score alongside training-knowledge answers and treat that as sufficient safeguard",
      "Avoid using Claude for this use case altogether regardless of architecture"
    ],
    correct: 1,
    explanation: "For safety-critical, time-sensitive factual domains like drug interactions, grounding answers in a retrieval layer over a current, authoritative source is the correct pattern — it reduces reliance on static training knowledge that can become outdated and lowers the risk of unverified claims. Relying purely on training knowledge (A) ignores that interaction data changes as new drugs and studies emerge. A self-reported confidence score without external grounding (C) doesn't verify against ground truth and isn't a reliable safeguard by itself. Avoiding Claude entirely (D) discards a viable, well-architected solution in favor of an unstated alternative."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A logistics company's dispatch assistant must summarize a driver's incident report (roughly 200 words) into a structured form. The engineering lead proposes using the largest available model by default 'to be safe.'",
    question: "What is the main risk of this default-to-largest approach for this specific task?",
    options: [
      "There is no risk; using the largest model is always the safest choice",
      "Unnecessary cost and latency for a task well within the reach of a smaller, faster model, without a corresponding quality benefit that matters for this narrow use case",
      "The largest model cannot handle short inputs",
      "The largest model will refuse to summarize incident reports"
    ],
    correct: 1,
    explanation: "For a short, well-scoped, narrow-format task, the largest model provides little marginal quality benefit while adding unnecessary cost and latency at scale — 'defaulting to largest' is not automatically the safe choice, it's often an inefficient one. Claiming there's no risk (A) ignores real operational cost trade-offs. The largest model has no difficulty with short inputs (C), and there's no reason it would refuse a routine, legitimate summarization task (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A cross-border payments company runs Claude-based fraud review agents in five country teams, each of which independently maintains its own prompt for the same fraud-flag classification task. A compliance review found accuracy on the same synthetic test set varied by up to 18 percentage points between country teams, despite an identical task.",
    question: "What is the most likely explanation and the best remediation?",
    options: [
      "The variation is expected and acceptable since fraud patterns differ by country",
      "Uncontrolled prompt drift across teams doing the identical task is the likely cause; establish a shared baseline prompt maintained centrally, with a documented, reviewed process for any country-specific adjustments layered on top",
      "Each country should switch to a different model family entirely to fix the discrepancy",
      "The synthetic test set is flawed and should be discarded rather than investigating the prompts"
    ],
    correct: 1,
    explanation: "Since the task and test set are identical across teams, independently evolved prompts for the same classification task are the most likely source of an 18-point accuracy spread, and the fix is a centrally maintained shared baseline with a controlled process for legitimate regional customization, rather than fully independent prompts. Calling the variation 'expected' (A) is unsupported when the test set holds the task constant. Changing model families (C) doesn't address inconsistent prompt engineering, the actual variable in question. Discarding the test set (D) removes the tool that surfaced the problem instead of using it to diagnose the cause."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An agri-tech company's crop-advisory assistant for smallholder farmers runs on low-bandwidth mobile connections in rural areas, where each additional round-trip and larger payload meaningfully hurts user experience. The advisory task itself is moderately complex, weighing several environmental factors.",
    question: "What model-selection trade-off is most relevant here?",
    options: [
      "Bandwidth constraints are irrelevant to model choice since model selection only affects server-side processing",
      "A faster, lighter model reduces response latency and payload overhead, which may be worth a modest quality trade-off given the connectivity constraint — but only if it still meets the advisory task's accuracy bar",
      "Always choose the most capable model since agricultural advice quality is too important to compromise, regardless of connectivity",
      "Switch the product to a text-message-only interface to avoid the model question altogether"
    ],
    correct: 1,
    explanation: "Connectivity constraints are a legitimate input to model selection because they affect real-world responsiveness, but the trade-off must be weighed against whether a lighter model still clears the accuracy bar for advice that affects farmers' livelihoods — it's a balance, not an automatic override in either direction. Dismissing bandwidth as irrelevant (A) ignores the stated user-experience constraint. Insisting on the most capable model regardless of context (C) ignores a real, stated operational constraint. Changing the interface entirely (D) sidesteps the model-selection question rather than answering it."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A media streaming company's recommendation-explanation feature ('why we picked this for you') was originally built with a single hand-tuned prompt. As the catalog grew from 5,000 to 200,000 titles, the team started injecting large batches of metadata into the prompt per request to keep explanations accurate, and now sees rising latency complaints.",
    question: "What is the most sustainable long-term fix?",
    options: [
      "Keep injecting full metadata batches but switch to a faster model to offset the added latency",
      "Introduce a retrieval step that selects only the small set of metadata fields relevant to the specific recommendation being explained, rather than passing large undifferentiated batches",
      "Revert to the original 5,000-title-era prompt unchanged",
      "Remove metadata from the prompt entirely and let the model generate generic explanations"
    ],
    correct: 1,
    explanation: "As the underlying data scales, the sustainable pattern is to retrieve only the relevant slice of metadata per request rather than pushing ever-larger undifferentiated batches into the prompt — this keeps explanations accurate while controlling context size and latency independent of catalog growth. Just swapping to a faster model (A) treats a symptom while leaving an inefficient, unscalable pattern in place. Reverting to an outdated prompt (C) ignores that the catalog and its metadata needs have genuinely grown. Removing metadata entirely (D) sacrifices the accuracy the feature exists to provide."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A global asset manager runs a Claude-based research synthesis system where a top-level orchestrator agent coordinates twelve specialist sub-agents (sector analysis, macro trends, ESG screening, etc.), each producing a report that feeds into a final investment memo. Sessions can run for hours, sub-agent outputs are lengthy, and the firm has both hard cost ceilings per research session and a compliance requirement that every claim in the final memo be traceable to a specific sub-agent finding.",
    question: "What context and prompt architecture best satisfies both the cost ceiling and the traceability requirement over long sessions?",
    options: [
      "Have the orchestrator retain every sub-agent's full raw output in its context for the entire session so nothing is ever lost",
      "Have each sub-agent emit a structured, condensed finding with an explicit source citation/identifier; have the orchestrator maintain a compact running index of these structured findings rather than raw text, using caching on stable inputs and summarization for anything not actively referenced, so cost stays bounded while every claim remains traceable to its structured source",
      "Have the orchestrator discard sub-agent outputs once its own synthesis is written, keeping only the final memo",
      "Give every sub-agent an unlimited context budget so none of them has to compromise on depth"
    ],
    correct: 1,
    explanation: "Satisfying both constraints simultaneously requires structured, citable outputs from each sub-agent (solving traceability) combined with compaction — condensed findings, caching of stable inputs, and summarization of inactive material — to keep the orchestrator's context and the session's cost bounded even as the session runs for hours. Retaining every raw output forever (A) blows the cost ceiling and doesn't improve traceability, since traceability comes from structure, not volume. Discarding sub-agent outputs after synthesis (C) directly breaks the compliance requirement to trace claims back to their source. Giving every sub-agent unlimited budget (D) has no cost ceiling at all and doesn't address traceability either."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A retail chain's inventory forecasting assistant answers questions like 'what will store #482 need to reorder next week' by combining a moderately complex reasoning task (seasonal trend plus current stock plus promotions) with a need for fast responses during business hours.",
    question: "How should the team weigh model capability against latency for this workload?",
    options: [
      "Latency always outweighs quality, so the fastest model should be chosen regardless of whether it can handle the multi-factor reasoning correctly",
      "Quality always outweighs latency, so the most capable model should be used even if response times become impractical for business-hours use",
      "Both matter: the team should test whether a mid-tier or faster model can still reliably handle the multi-factor reasoning at acceptable accuracy before defaulting to a slower, more capable model purely for headroom",
      "Neither matters since inventory forecasting is a deterministic calculation the model shouldn't be involved in at all"
    ],
    correct: 2,
    explanation: "Real model selection requires testing whether a faster model still clears the accuracy bar for the actual reasoning involved before assuming more capability is required — treating either latency or quality as an absolute trumping the other skips that evaluation step. Option A risks wrong reorder recommendations if the fast model can't actually do the multi-factor reasoning. Option B risks making the tool impractical during business hours it's meant to serve. Declaring the task purely deterministic and excluding the model entirely (D) mischaracterizes a task the scenario explicitly frames as requiring reasoning over multiple factors."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A public transit authority's rider-facing chatbot answers questions about routes and schedules. A new engineer proposes fine-tuning-style behavior by writing an extremely long system prompt containing hundreds of example Q&A pairs covering every possible route combination, arguing this will 'lock in' correct behavior.",
    question: "What is the more defensible strategic approach at this scale?",
    options: [
      "Proceed with the exhaustive example list, since more examples always strictly improve reliability",
      "Use a smaller, well-chosen set of representative few-shot examples to establish format and tone, paired with a retrieval mechanism over the actual live schedule/route data, since route data changes and can't be reliably hard-coded as static examples anyway",
      "Skip examples entirely and rely purely on abstract instructions with no demonstrations",
      "Use hundreds of examples but refresh all of them manually every time a single route changes"
    ],
    correct: 1,
    explanation: "Attempting to hard-code 'every possible route combination' as static examples is both impractical and fragile against real-world schedule changes; a small set of representative examples for format/tone combined with retrieval over live, current route data is more scalable and stays accurate as schedules change. Exhaustive example lists (A) don't strictly improve reliability once they become large enough to dilute the prompt and go stale against changing data. Skipping examples entirely (C) forfeits a proven tool for establishing consistent format. Manually refreshing hundreds of examples on every route change (D) is an operationally unsustainable burden that a retrieval layer avoids."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A B2B software vendor's platform team is deciding how to expose model choice to its customers, who build custom workflows on top of Claude via the vendor's orchestration layer. Some customers want the cheapest possible model always; others want guaranteed high quality regardless of cost.",
    question: "What platform-level design best serves both customer segments responsibly?",
    options: [
      "Force every customer onto a single default model chosen by the vendor to simplify support",
      "Expose model tier as a configurable parameter per workflow step, with sensible task-appropriate defaults and clear documentation of the cost/quality/latency trade-offs, rather than a single fixed choice",
      "Let customers pick any model but provide no guidance on trade-offs, since that is the customer's responsibility entirely",
      "Automatically pick the cheapest model for all customers to minimize the vendor's own infrastructure costs"
    ],
    correct: 1,
    explanation: "Different customers have genuinely different constraints, so the platform should expose model selection as a configurable, well-documented choice with sensible defaults — this respects customer autonomy without abandoning them to guesswork. Forcing one default (A) fails the segment with different needs. Offering choice with zero guidance (C) sets customers up to make poorly informed trade-offs the vendor could easily prevent with documentation. Silently optimizing for the vendor's own cost (D) misaligns incentives and would harm the quality-sensitive segment without their knowledge."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A hospital system's clinical documentation assistant listens to a 20-minute patient visit and must produce a structured note. Compliance requires that the system never carry information from one patient's visit into another's session, even inadvertently.",
    question: "What context engineering safeguard is most critical here?",
    options: [
      "Rely on the model's general training to avoid mixing up patients without any explicit session isolation",
      "Ensure hard session/context isolation between patient encounters — no shared context, cache, or state carries over between sessions — combined with explicit session-start resets rather than incremental context reuse across patients",
      "Summarize each patient's note and prepend it to the next patient's session for continuity of care",
      "Use the largest available context window so all patient visits for the day can be handled in one continuous session"
    ],
    correct: 1,
    explanation: "Given a hard compliance requirement against cross-patient information leakage, the system must guarantee strict context/session isolation with explicit resets between encounters — this is an architectural guarantee, not something to leave to model behavior alone. Relying on general model training without isolation controls (A) provides no hard guarantee against leakage. Carrying a prior patient's note into the next session (C) is precisely the leakage the requirement forbids. Running all of a day's visits in one continuous session (D) actively increases cross-patient contamination risk rather than reducing it."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "An online education platform's essay-feedback tool gives students detailed, nuanced feedback on writing structure, argumentation, and style for college-level essays. The product team is deciding between a fast, lightweight model and the most capable model in the family.",
    question: "Given the nature of the task, which consideration should be decisive?",
    options: [
      "Since feedback quality on nuanced writing (argument structure, style, subtlety) is the product's core value proposition, the more capable model is likely justified despite higher per-request cost",
      "Speed should be decisive regardless of feedback quality, since students are used to waiting for grades",
      "Cost should be decisive regardless of quality, since education products must always minimize spend",
      "Model choice makes no difference for writing feedback tasks"
    ],
    correct: 0,
    explanation: "When the core value proposition of a product depends on nuanced, high-quality judgment — exactly the profile of essay feedback on argumentation and style — that quality need typically justifies the added cost of a more capable model. Prioritizing speed over the product's central value (B) undermines what students are paying for. Treating cost minimization as always decisive (C) ignores that quality is the product here. Claiming model choice is irrelevant (D) contradicts the real, observable differences in reasoning depth across the model family."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A supply chain analytics firm's multi-turn planning assistant lets analysts iteratively refine a shipment plan over 30-40 conversational turns. The team observes that by turn 25, response latency has grown noticeably and the model occasionally references an earlier, now-superseded version of the plan.",
    question: "What does this pattern most likely indicate, and what is the appropriate fix?",
    options: [
      "The model has a bug that causes it to randomly reference old data; report it and wait for a fix",
      "The full, uncompacted turn history is growing and diluting the current state; introduce periodic compaction that consolidates the plan's current state into a concise, updated summary rather than relying on the model to correctly weigh 25+ turns of raw history",
      "The analysts are making too many revisions and should be limited to five turns per session",
      "Switching to a lower temperature will prevent the model from referencing outdated plan versions"
    ],
    correct: 1,
    explanation: "Growing latency plus references to superseded state across many turns is a classic sign that raw, uncompacted history is accumulating and the model is having to disambiguate current versus outdated information without help; periodic compaction into an updated current-state summary directly addresses both the latency and the version-confusion issues. Attributing this to a random bug (A) misdiagnoses a predictable context-growth pattern as an anomaly. Arbitrarily limiting analysts to five turns (C) restricts legitimate iterative work rather than fixing the underlying context management. Lowering temperature (D) affects output randomness, not which facts the model treats as current."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A defense-adjacent government contractor is building a document analysis tool over classified-adjacent but unclassified technical reports. Leadership wants to combine two goals: cost efficiency at scale (millions of pages annually) and very high extraction accuracy on structured technical fields (part numbers, tolerances, specifications).",
    question: "What architecture best balances these goals rather than treating them as mutually exclusive?",
    options: [
      "Use the most capable model on every page uniformly to guarantee accuracy, accepting whatever the resulting cost is",
      "Use a lightweight model as a first pass to classify or pre-extract straightforward fields, and route only ambiguous or low-confidence pages/fields to a more capable model for deeper extraction",
      "Use the cheapest model on every page to hit the cost target and accept the resulting accuracy",
      "Process documents in random order and average accuracy across runs to meet a statistical target"
    ],
    correct: 1,
    explanation: "A tiered routing architecture — lightweight model for the bulk of straightforward cases, escalation to a more capable model only for ambiguous or low-confidence cases — is the standard way to reconcile high accuracy requirements with cost efficiency at large scale, since most pages don't need maximum capability but a meaningful minority do. Uniformly using the most capable model (A) ignores the explicit cost-efficiency goal at millions-of-pages scale. Uniformly using the cheapest model (C) ignores the explicit high-accuracy requirement on structured fields. Randomizing processing order and averaging accuracy (D) is not a coherent architecture and doesn't address either stated goal."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A subscription box e-commerce company's customer email responder was tuned on a small hand-picked set of 15 example emails. Since launch, it performs well on typical questions but produces oddly generic responses to seasonal/holiday-themed customer messages, a case type absent from the original examples.",
    question: "What is the most likely cause and the appropriate remediation?",
    options: [
      "The model cannot understand holiday-related topics at all",
      "The few-shot example set doesn't represent the full range of real input variety the system now encounters; expand or refresh the example set (or add relevant context) to cover underrepresented but real categories like seasonal messages",
      "Holiday messages should be filtered out and routed to a human exclusively, since the model can never handle them",
      "The system prompt's instructions are too long and should be shortened to fix the issue"
    ],
    correct: 1,
    explanation: "Generic responses on a case type absent from the example set is a classic coverage gap: the demonstrated examples shaped behavior well for represented cases but gave no guidance for the unrepresented category, and the fix is to expand example coverage or provide relevant context for that category. Claiming the model categorically cannot understand holiday topics (A) is an unsupported capability claim not indicated by the symptoms described. Permanently routing all such messages to humans (C) is a bigger operational cost than necessary when the actual fix is straightforward. Shortening the system prompt (D) doesn't address the specific coverage gap identified."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A boutique law firm wants to use Claude to triage large volumes of routine, low-value document requests (standard NDAs, simple certificates of good standing) while its senior partners continue to draft complex, novel cross-border M&A agreements manually with AI assistance only for research.",
    question: "What model-selection pattern fits this firm's workload?",
    options: [
      "A lighter, faster model for the high-volume routine triage, and the most capable model available when partners do use AI assistance for the complex M&A research work",
      "The most capable model for routine triage since NDAs are legally binding documents",
      "The same mid-tier model for everything to avoid the complexity of managing multiple configurations",
      "No model at all for triage, since legal work should never involve AI regardless of complexity"
    ],
    correct: 0,
    explanation: "The workload clearly separates into high-volume/low-complexity (routine triage) and low-volume/high-complexity (cross-border M&A) categories, which maps naturally onto a lighter model for the former and the most capable model for the latter. Using the most capable model on routine triage (B) conflates legal bindingness with task complexity — they aren't the same axis. A single mid-tier model for everything (C) under-serves the complex work and over-spends on the routine work. Excluding AI from triage entirely (D) discards a legitimate efficiency gain the firm is explicitly trying to capture."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A multinational consumer goods company centralizes prompt engineering for its various regional marketing copy assistants under one platform team, but regional marketers complain that a recent mandatory prompt update broke tone consistency with region-specific brand guidelines that were previously baked into their local prompts.",
    question: "What governance structure would have prevented this regression?",
    options: [
      "Full centralization with no regional input at all, changed as infrequently as possible",
      "A layered prompt architecture — a centrally governed core (shared brand voice, compliance) plus a clearly scoped regional customization layer — with change review that explicitly checks impact on regional layers before a core update ships",
      "Full decentralization, letting each region maintain entirely separate, unrelated prompts with no shared core",
      "No formal process; rely on marketers to notice and report breakage after each update"
    ],
    correct: 1,
    explanation: "The failure here is that a shared, centrally-owned update overwrote or conflicted with region-specific customization that wasn't accounted for; a layered architecture — shared core plus a defined regional extension point — combined with change review that checks impact on those regional layers prevents exactly this kind of regression while preserving the benefits of central governance. Full centralization with no regional input (A) is what caused the problem in the first place. Full decentralization (C) would reintroduce the consistency problems centralization was meant to solve. Relying on after-the-fact reporting (D) is reactive rather than preventive and is what actually happened here."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A ride-hailing company's driver support chatbot must handle two very different query types in the same conversation: quick factual lookups ('what's the current surge zone boundary') and complex dispute resolution ('a rider claims I canceled but I didn't, here's what happened'). Currently a single model handles both uniformly within the session.",
    question: "What architectural refinement would likely improve both cost efficiency and dispute-resolution quality?",
    options: [
      "Split the conversation into two separate models via classification of the query type, routing simple factual lookups to a fast/cheap model and complex dispute reasoning to a more capable model, while maintaining shared conversational context across the routing boundary",
      "Keep a single model for the whole conversation since splitting would break conversational continuity entirely",
      "Use the most capable model for the entire conversation to avoid the complexity of routing logic",
      "Use the fastest, cheapest model for the entire conversation since driver support is a cost center"
    ],
    correct: 0,
    explanation: "Query-type routing within a single conversation — cheap/fast handling for simple lookups, escalation to a more capable model for complex reasoning — captures cost savings on the frequent simple case while preserving quality on the harder case, and shared context across the routing boundary avoids breaking continuity. Assuming any split necessarily breaks continuity (B) isn't true if context is deliberately carried across the routing boundary. Using the most capable model throughout (C) overpays for the frequent simple lookups. Using the cheapest model throughout (D) risks poor outcomes on genuinely complex disputes that matter for driver trust and retention."
  },
  {
    domain: 2,
    difficulty: 1,
    scenario: "A city parks department wants a simple internal tool that answers staff questions about seasonal maintenance schedules from a two-page reference sheet, with no significant volume or latency constraints.",
    question: "What is the most appropriate model-selection approach for this scenario?",
    options: [
      "A lightweight, cost-efficient model, since the task is simple, low-volume, and low-stakes, matching the model to actual requirements",
      "The most capable model in the family regardless of cost, as a default best practice for every use case",
      "A randomly chosen model since low-stakes use cases don't warrant deliberate selection",
      "Multiple models running in parallel and voting on every answer"
    ],
    correct: 0,
    explanation: "For a simple, low-volume, low-stakes internal reference tool, a lightweight, cost-efficient model is entirely sufficient and appropriately matched to requirements. Defaulting to the most capable model regardless of fit (B) wastes budget on a task that doesn't need it. Random selection (C) abandons any deliberate engineering judgment. Running multiple models in parallel to vote (D) adds unwarranted cost and complexity for a low-stakes, simple task."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A wealth management firm's client-facing portfolio assistant must incorporate a client's full transaction history when explaining performance, but transaction histories vary wildly in size — from a few dozen entries for new clients to tens of thousands for decades-long clients. Using a single fixed-context approach for all clients has caused both quality problems for large accounts and unnecessary cost for small accounts.",
    question: "What is the most appropriate context engineering strategy given this variability?",
    options: [
      "Adopt a dynamic approach: for small histories, include the full transaction detail directly; for large histories, use retrieval or pre-aggregation to surface only the transactions and summary statistics relevant to the specific question asked",
      "Cap every client's included history at a fixed number of most-recent transactions regardless of account size or the nature of the question",
      "Always include the full history for every client since completeness is the top priority in financial services",
      "Never include transaction detail and rely solely on the model's general knowledge of portfolio performance principles"
    ],
    correct: 0,
    explanation: "Given genuinely variable data volume per client, the appropriate strategy adapts to that variability rather than using one fixed policy — full detail where it's cheap and complete, retrieval/aggregation where the raw volume would otherwise overwhelm the useful signal. A fixed recent-transaction cap (B) could miss the relevant transaction entirely if the client's question concerns older activity. Always including full history regardless of size (C) reintroduces the exact quality and cost problems described for large accounts. Excluding transaction detail entirely (D) makes the tool unable to answer client-specific performance questions at all."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A large hospital network's clinical assistant pipeline uses one agent to extract structured data from physician dictation and a second agent to generate a billing code suggestion from that structured data. An audit found billing code errors traced back to a subtle extraction agent bug that had been silently producing slightly malformed structured output for weeks, which the second agent then 'gracefully' worked around by guessing, masking the underlying problem.",
    question: "What context/prompt architecture change would have surfaced this failure earlier?",
    options: [
      "Merge the two agents into one so there's no handoff point where errors can hide",
      "Add explicit schema validation at the handoff boundary between agents, with the second agent configured to fail loudly or flag low-confidence input rather than silently compensating for malformed upstream output",
      "Remove the second agent and have billing staff manually code everything from the raw dictation",
      "Increase the first agent's model size, assuming a more capable model would never produce malformed output"
    ],
    correct: 1,
    explanation: "The core problem is that the second agent's resilience masked an upstream defect instead of surfacing it; explicit schema validation at the handoff point, paired with a policy of failing loudly or flagging low-confidence/malformed input rather than silently working around it, would have caught the extraction bug promptly instead of letting it run for weeks. Merging the agents (A) removes the modularity that made this a two-stage, auditable pipeline and doesn't guarantee errors would surface any faster. Reverting to fully manual billing coding (C) discards the automation benefit entirely rather than fixing the specific failure mode. Assuming a larger model would 'never' produce malformed output (D) is an unfounded guarantee — validation catches the failure mode regardless of model size."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A used-car marketplace's vehicle description generator ingests a structured listing (make, model, mileage, condition notes) and produces marketing copy. The team wants to A/B test two very different prompt strategies but is currently editing the live production prompt directly to test variations, occasionally causing brief quality regressions visible to sellers.",
    question: "What process change would eliminate this risk while still enabling experimentation?",
    options: [
      "Stop experimenting with prompts altogether to avoid any risk of regression",
      "Maintain versioned, named prompt variants (not direct edits to the live prompt) tested in a staging environment or via controlled rollout, promoting a variant to production only after it passes evaluation against a benchmark set",
      "Continue editing the live prompt directly but do it late at night when fewer sellers are active",
      "Let each individual engineer maintain their own personal copy of the prompt and merge them ad hoc when convenient"
    ],
    correct: 1,
    explanation: "The standard fix for this exact failure mode is proper prompt version management: named variants tested in staging or via controlled rollout, promoted to production only after clearing a benchmark, so live production is never subject to direct, unvalidated edits. Halting experimentation entirely (A) sacrifices legitimate improvement work to avoid a process problem that has a real solution. Timing direct edits to low-traffic hours (C) reduces visibility of regressions without eliminating the risk of shipping them. Ad hoc individual copies merged informally (D) is not a controlled process and is likely to reintroduce conflicts and regressions."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A print-on-demand company's design-brief-to-description tool works well for straightforward products (t-shirts, mugs) but underperforms on complex custom orders (multi-panel wall art with layered symbolism) where the current prompt gives only generic style guidance.",
    question: "What is the most targeted improvement to try before considering a more expensive model?",
    options: [
      "Switch immediately to the most capable model for all products, including the straightforward ones",
      "Add task-specific guidance and possibly a few worked examples of well-handled complex, layered-symbolism briefs to the prompt, since the current instructions may simply be underspecified for that harder case",
      "Remove complex custom orders from the product catalog to avoid the problem",
      "Lower the temperature setting across the board to make outputs more consistent"
    ],
    correct: 1,
    explanation: "Underperformance on a specific, harder sub-case while the simple cases work fine often points to underspecified guidance for that case rather than a fundamental capability shortfall — adding targeted instructions and examples for the complex case is the appropriately scoped first fix before assuming a costlier model is required. Switching the entire product line to a costlier model (A) pays for capability increases on the straightforward cases that don't need it. Removing the product category (C) discards revenue to avoid a fixable prompting gap. Lowering temperature globally (D) affects randomness, not the specificity of guidance the model receives for a hard case."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A commercial property management firm's lease-abstraction tool must extract key terms (rent escalation clauses, renewal options, termination rights) from leases ranging from 10 to 200 pages. The team currently sends the entire lease as-is in every request regardless of length.",
    question: "What context engineering improvement would most improve consistency across this size range?",
    options: [
      "Continue sending full leases unmodified, since consistency should come from the model, not from restructuring the input",
      "For longer leases, apply a pre-processing step (section identification/extraction focused on clauses relevant to the abstraction task) so the model consistently works from a right-sized, relevant input rather than being handed wildly varying raw document lengths",
      "Truncate every lease to its first 10 pages regardless of length to standardize input size",
      "Only support leases 10 pages or shorter and reject longer documents"
    ],
    correct: 1,
    explanation: "When input size varies this widely, consistent quality is better achieved by pre-processing longer documents down to the clauses actually relevant to the extraction task, rather than expecting uniform behavior from wildly different raw input sizes. Continuing to send full documents unmodified (A) leaves the model to do the same filtering work inconsistently on every call. Truncating to a fixed page count (C) risks cutting off relevant clauses that appear later in longer leases. Rejecting longer documents outright (D) abandons a large share of real leases the tool needs to support rather than solving the underlying problem."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A pharmaceutical company's regulatory submission assistant helps writers draft sections of FDA submissions by referencing a large corpus of prior approved submissions as style/precedent examples. Legal has flagged that including full prior submissions in context creates a risk of the assistant inadvertently reproducing confidential formulation details from an unrelated product's submission into the current draft.",
    question: "What context engineering approach addresses this specific risk?",
    options: [
      "Stop using prior submissions as reference material entirely, sacrificing consistency with precedent",
      "Curate and extract only the structural/stylistic elements (section framing, regulatory language patterns) from prior submissions rather than including full text with proprietary formulation details, so the assistant has style guidance without exposure to unrelated confidential content",
      "Include full prior submissions but instruct the model in the prompt to 'ignore confidential details,' relying on that instruction alone as the safeguard",
      "Increase the context window size so more prior submissions can be included for better style matching"
    ],
    correct: 1,
    explanation: "The right fix addresses the actual risk directly: curating out the confidential formulation content and retaining only the structural/stylistic patterns removes the exposure at the data layer rather than hoping the model correctly self-censors. Abandoning precedent material entirely (A) is a bigger sacrifice than necessary when targeted curation solves the specific risk. Relying solely on an in-prompt instruction to 'ignore confidential details' (C) is not a reliable safeguard against sensitive information already sitting in context — the content is still present and accessible. Enlarging the context window (D) increases exposure to more confidential material, worsening rather than fixing the identified risk."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A ski resort chain's guest chatbot handles simple weather/lift status questions during the day but the team wants to add a trip-planning feature that reasons across multi-day weather forecasts, guest preferences, and resort amenities to build a personalized itinerary — a much more complex task than current usage.",
    question: "What is the appropriate approach to introducing this new, more complex feature?",
    options: [
      "Upgrade the existing lift-status chatbot's model for all queries, including simple ones, since the new feature needs more capability",
      "Build the trip-planning feature as a distinct capability using a more capable model suited to its multi-factor reasoning, while keeping the existing simple-query path on its current lightweight model",
      "Build the trip-planning feature using the same lightweight model as lift status, since maintaining one model keeps the system simpler",
      "Decline to build the trip-planning feature since it doesn't fit the existing chatbot's architecture"
    ],
    correct: 1,
    explanation: "The two features have genuinely different complexity profiles, so the sound approach is to give the new, more complex reasoning task a model suited to it while leaving the existing simple-query path untouched and appropriately lightweight — avoiding both under- and over-provisioning. Upgrading the model for all queries (A) pays capability costs on simple lookups that don't need it. Forcing the new complex feature onto the existing lightweight model (C) risks poor itinerary quality on a task explicitly described as more complex. Declining to build the feature (D) treats a solvable architecture question as a blocker."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A global reinsurance firm operates a claims-analysis system spanning eight business units, each with its own historical claims data, regulatory environment, and prompt conventions. Leadership wants a single 'claims copilot' experience for adjusters worldwide, but a pilot single-prompt implementation produced inconsistent quality: strong on units with abundant historical examples, weak on units with sparse data, and occasionally applied one unit's regulatory assumptions to another unit's claim.",
    question: "What architecture should replace the single-prompt pilot to scale globally while containing these failure modes?",
    options: [
      "Keep a single global prompt but make it much longer, appending every business unit's regulatory rules and examples so the model has access to everything at once",
      "Build a modular architecture: a shared core prompt for common claims-analysis reasoning, with business-unit-specific context (regulatory rules, relevant examples) injected per request based on which unit the claim belongs to, plus retrieval to supplement units with sparse historical examples rather than relying on uniform few-shot coverage",
      "Give each business unit a completely separate, independently built copilot with no shared components at all",
      "Restrict the copilot to only the business units with abundant historical data and exclude the rest until more data accumulates"
    ],
    correct: 1,
    explanation: "This scenario shows both a data-sparsity problem and a cross-contamination problem — the fix for both is a modular architecture that keeps a shared reasoning core but injects only the correct business unit's regulatory context per request, with retrieval filling the gap for units that lack rich few-shot examples, rather than one undifferentiated global prompt or fully siloed independent builds. Appending every unit's rules into one giant prompt (A) is exactly the pattern that caused rules from one unit to bleed into another unit's claim. Fully independent copilots per unit (C) discards valuable shared reasoning logic and multiplies maintenance burden across eight units. Excluding sparse-data units entirely (D) abandons those adjusters rather than solving the sparsity problem with retrieval, which is a viable and more inclusive fix."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A home security company's alert-triage assistant must decide, within one second, whether a triggered sensor event warrants an urgent customer notification, based on a compact set of sensor metadata (no images, no long text).",
    question: "What model characteristic should be prioritized for this specific workload?",
    options: [
      "Maximum reasoning depth on long, ambiguous documents, since customer safety is at stake",
      "Low latency and reliable performance on compact, structured classification-style input, since the task is narrow and speed is operationally critical",
      "Maximum creative writing capability, since urgent notifications should be persuasive",
      "The ability to browse the web for external context on each event"
    ],
    correct: 1,
    explanation: "The task is explicitly narrow (compact structured metadata), latency-critical (one-second budget), and classification-like in nature, which is precisely the profile that should prioritize speed and reliable narrow-task performance over unrelated capabilities. Prioritizing deep reasoning over long ambiguous documents (A) doesn't match a task with no long text input at all. Creative writing capability (C) is irrelevant to a binary/urgency classification decision. Web browsing capability (D) adds latency and isn't indicated as necessary by the task description."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A construction firm's project-risk assistant reasons over site inspection reports, weather data, and vendor contracts to flag schedule risks. The team debated between a single very long prompt containing everything relevant to a project versus a structure where the model can request specific documents on demand.",
    question: "What consideration most favors the on-demand retrieval structure over the single long-prompt approach for this use case?",
    options: [
      "On-demand retrieval is always cheaper in every conceivable scenario, with no exceptions",
      "Not every risk assessment needs every document; retrieval lets the model pull only what's relevant to the specific risk question at hand, avoiding the cost and dilution of always loading the full project archive regardless of relevance",
      "Long prompts are technically impossible for this use case regardless of project size",
      "On-demand retrieval eliminates the need for any prompt engineering at all"
    ],
    correct: 1,
    explanation: "The relevant advantage is that different risk questions typically need different subsets of the full project archive, so retrieval lets the system load only what's pertinent per query, avoiding both the cost and the diluting effect of always including everything regardless of relevance. Claiming retrieval is 'always cheaper in every scenario' (A) overstates the case as a universal rule rather than a workload-dependent trade-off. Long prompts aren't technically impossible here (C) — it's a design trade-off, not a hard limit for this scenario. Retrieval doesn't eliminate the need for prompt engineering (D); the model still needs well-designed instructions for how to use and reason over retrieved content."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A film studio's script coverage tool (summarizing and evaluating submitted screenplays for producers) was originally tuned on feature-length scripts (90-120 pages). The studio now wants to extend it to TV pilot scripts (30-45 pages) and mini-series bibles (10-15 pages of dense worldbuilding), and coverage quality has been inconsistent on the new formats.",
    question: "What is the most likely gap and the best remediation?",
    options: [
      "The prompt's guidance and examples are tuned to feature-length script conventions and don't reflect the different structural expectations of pilots and bibles; add format-specific guidance/examples for each new document type rather than reusing the feature-film prompt unchanged",
      "The model is incapable of evaluating any document shorter than 90 pages",
      "Switch to the largest available model, since bigger models handle all document types equally well without format-specific tuning",
      "Reject all new formats and require submissions be reformatted as full-length feature scripts before analysis"
    ],
    correct: 0,
    explanation: "Coverage quality expectations and structural conventions differ meaningfully between feature scripts, TV pilots, and series bibles, so a prompt tuned only on feature-length conventions will likely miss what 'good coverage' looks like for the new formats — targeted, format-specific guidance and examples address this directly. Claiming the model is incapable of evaluating shorter documents (B) is an unfounded capability claim not supported by the symptoms described (inconsistency, not total failure). Assuming a bigger model removes the need for format-specific tuning (C) ignores that the gap is about missing guidance, not raw capability. Forcing all submissions into the feature-length format (D) is impractical and defeats the purpose of expanding to new formats."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A national grocery chain's supply forecasting assistant currently runs one call per SKU per store (roughly 2 million calls daily) using a mid-tier model, and finance has flagged the aggregate cost as the single largest AI line item in the company. A proposal suggests batching multiple SKUs from the same store into a single call with shared context (store profile, local trends) to reduce redundant token spend.",
    question: "What is the most important factor to validate before adopting the batching proposal at this scale?",
    options: [
      "Whether batching multiple SKUs per call preserves per-SKU forecast accuracy and doesn't cause the model to conflate patterns across unrelated products, alongside the expected token/cost savings from sharing store-level context",
      "Whether the batched prompt is shorter in character count than the sum of individual prompts, regardless of any accuracy effects",
      "Whether finance will approve the migration timeline, since that is the only real constraint",
      "Whether switching to the most capable model instead of batching would be simpler to explain in a memo"
    ],
    correct: 0,
    explanation: "At this scale, the batching proposal's value depends on two things holding simultaneously: real token/cost savings from sharing store-level context, and preserved per-SKU accuracy — if batching causes cross-SKU pattern conflation, the cost savings would come at an unacceptable quality cost, so both must be validated together. Character-count comparison alone (B) ignores the accuracy risk entirely. Framing the approval timeline as 'the only real constraint' (C) skips the technical validation the decision actually depends on. Comparing to a full model upgrade instead of evaluating the batching proposal on its own merits (D) answers a different question than the one posed."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A telehealth platform's intake assistant asks patients a series of triage questions before a virtual visit, then hands a structured summary to the physician. The current prompt includes an enormous list of every possible symptom category the platform has ever supported, most of which are irrelevant to any given patient's chief complaint.",
    question: "What context engineering change would likely improve both efficiency and relevance of the triage flow?",
    options: [
      "Keep the exhaustive symptom list in every prompt since removing categories risks missing something",
      "Use an initial lightweight classification step on the patient's chief complaint to narrow which symptom category branch is relevant, then load only that branch's detailed follow-up questions into context rather than the full exhaustive list every time",
      "Remove all symptom categories and let patients type free-form text with no structure at all",
      "Increase the model's context window so the full exhaustive list stops being a concern"
    ],
    correct: 1,
    explanation: "A two-stage approach — cheap initial classification to identify the relevant branch, then loading only that branch's detail — avoids paying the cost and dilution of an exhaustive list on every intake while still ensuring the right follow-up questions are asked once the relevant category is identified. Keeping the full exhaustive list every time (A) is the inefficient pattern the question is asking to improve on. Removing structure entirely (C) would make it harder to produce the consistent, structured summary physicians rely on. Simply enlarging the context window (D) doesn't address the relevance/dilution problem, only the raw size limit."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A podcast network wants to use Claude to generate first-draft episode show notes from a transcript. This is a moderate-length, moderate-complexity task with no strict latency requirement and infrequent runs (a few per day per show).",
    question: "Given the low volume and relaxed latency, what should primarily guide model selection?",
    options: [
      "Output quality, since at this low volume the cost difference between model tiers is unlikely to be a major factor, and there's no latency pressure forcing a faster/cheaper choice",
      "Cost above all else, since any nonzero spend should be minimized regardless of task volume",
      "Whichever model responds fastest, since speed always matters most",
      "Model choice is irrelevant when volume is low"
    ],
    correct: 0,
    explanation: "When volume is low and there's no latency constraint, the cost differential between model tiers becomes a minor factor relative to the value of good output quality, so quality should be the primary driver. Prioritizing cost minimization above all else regardless of context (B) ignores that the scenario explicitly removes cost pressure as a binding constraint. Prioritizing speed (C) contradicts the stated 'no strict latency requirement.' Declaring model choice irrelevant at low volume (D) still ignores that quality differences between models remain real and relevant to a quality-sensitive task like drafting show notes."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A metropolitan water utility's engineering assistant helps staff interpret decades of infrastructure maintenance records when diagnosing a new pipe failure. Records for any given pipe segment can range from a handful of entries to hundreds spanning 40 years, and staff report the assistant sometimes gives excellent diagnoses and sometimes gives shallow, generic ones with no clear pattern as to which.",
    question: "What is the most likely explanation for this inconsistency, and how should it be investigated?",
    options: [
      "The model has inherently unstable quality that varies randomly call to call, and nothing can be done about it",
      "The inconsistency likely correlates with how much relevant historical context is actually being surfaced per pipe segment; investigate whether retrieval/inclusion of full maintenance history is being applied consistently, since segments with sparse or poorly retrieved records would naturally get shallower diagnoses",
      "The team should switch to a different model provider entirely without further diagnosis",
      "Staff should stop using the assistant for any pipe segment with more than 100 historical entries"
    ],
    correct: 1,
    explanation: "An inconsistency pattern like this is a strong signal to check whether the amount and relevance of context actually reaching the model varies across cases — segments with rich, well-retrieved history would support deeper diagnosis, while sparse or poorly surfaced records would naturally yield shallower output, and this should be investigated with data before any bigger architectural change. Attributing it to inherent random instability with no further investigation (A) skips a plausible, checkable explanation. Switching providers without diagnosis (C) is a drastic, unjustified step given a more likely and directly investigable cause. Banning use above 100 entries (D) would exclude exactly the well-documented cases most likely to produce good diagnoses, backwards from the likely cause."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A talent recruiting agency's resume-screening assistant currently loads a candidate's full resume plus the full job description plus five example 'good match' write-ups into every single screening call, even though the job description and examples are identical across hundreds of candidates being screened for the same role.",
    question: "What change would most reduce cost without changing screening logic?",
    options: [
      "Remove the example write-ups since they're the largest contributor to token count",
      "Enable prompt caching for the job description and example write-ups, which are identical across all candidates for a given role, while only the per-candidate resume varies between calls",
      "Screen fewer candidates per role to reduce total call volume",
      "Switch to a lighter model without changing anything about what's included in each call"
    ],
    correct: 1,
    explanation: "The job description and example write-ups are the same on every call for a given role while only the resume changes — exactly the stable-content pattern prompt caching is designed for, cutting repeated-processing cost without touching the screening logic itself. Removing the example write-ups (A) would likely reduce screening quality since those examples presumably calibrate what 'good match' looks like. Reducing the candidate pool screened (C) doesn't reduce per-candidate cost and undermines the hiring process's coverage. Switching models without changing what's sent (D) is a valid separate lever but doesn't address the specific redundant-content inefficiency identified."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A national health insurer's prior-authorization review system uses Claude to assess whether a submitted procedure request meets medical necessity criteria, referencing a criteria library that is updated monthly, clinician-submitted notes of wildly varying length and quality, and a patient's multi-year claims history. The system must produce a decision with cited justification in under 15 seconds, at a volume of 500,000 reviews per month, and every denial is subject to external audit requiring the exact criteria version used to be reconstructable after the fact.",
    question: "Which combination of context engineering and model-selection decisions best satisfies all of these constraints together?",
    options: [
      "Use the most capable model uniformly, load the entire claims history and full criteria library into every call for maximum thoroughness, and regenerate the criteria reference fresh from the latest source each time to guarantee currency",
      "Use a model matched to the review task's complexity (validated against a benchmark, not simply the largest available), cache the versioned monthly criteria library with an explicit version tag included in each output, apply retrieval/summarization to compress the claims history to what's relevant to the current request, and log which criteria version was active at decision time to satisfy the audit requirement",
      "Use the fastest, cheapest model available to guarantee the 15-second SLA is always met, and skip including claims history to keep latency low",
      "Batch multiple patients' reviews into a single call sharing one static criteria snapshot to save cost, updating the snapshot only once per quarter to reduce operational overhead"
    ],
    correct: 1,
    explanation: "This scenario stacks four real constraints — latency, volume/cost, variable-length clinical input, and auditability of the exact criteria version — and only a combined approach addresses all of them: a benchmark-validated (not just largest) model for cost/latency at volume, cached versioned criteria with the version explicitly tagged in output for audit reconstruction, and retrieval/summarization to keep variable-length claims history within budget without losing relevant signal. Loading everything raw with no versioning (A) fails the audit requirement, since criteria regenerated 'fresh' each time has no stable version to reconstruct, and also likely blows the 15-second SLA at this volume. Skipping claims history entirely (C) would degrade decision quality on a task with real patient impact and audit exposure, and using the cheapest model without validation risks failing accuracy requirements. Batching patients under a quarterly-stale criteria snapshot (D) directly violates the requirement that the exact criteria version used be reconstructable and current, since monthly updates would be missed for up to a quarter."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A biotech company's lab notebook assistant helps researchers query past experiment logs. Researchers increasingly paste entire quarterly notebook exports (tens of thousands of words) into the chat to 'give it everything' before asking a narrow question like 'what buffer concentration did we use in the March calcium assay.'",
    question: "What guidance or system change would most improve both cost and accuracy here?",
    options: [
      "Encourage a search/retrieval-first pattern where the system finds and surfaces only the specific experiment log entries relevant to the question, rather than relying on researchers pasting entire quarterly exports for narrow queries",
      "Tell researchers to keep pasting full exports since more context can never hurt accuracy",
      "Ban pasting any experimental data into the tool entirely",
      "Only allow one question per quarterly export to discourage large pastes"
    ],
    correct: 0,
    explanation: "Narrow questions against a large corpus are a canonical case for retrieval: surfacing only the relevant entries improves both cost (far fewer tokens per query) and accuracy (less irrelevant material to dilute the answer) compared to pasting entire quarterly exports for every narrow question. Claiming more context can never hurt accuracy (B) contradicts the well-documented dilution effect of irrelevant content in context. Banning experimental data entirely (C) removes the tool's core value. Limiting to one question per export (D) doesn't address the underlying inefficiency and unnecessarily restricts legitimate follow-up queries."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A global HR software vendor's onboarding assistant is deployed identically across all customer accounts, but larger enterprise customers have started requesting custom policy language (PTO rules, benefits explanations specific to their company) injected into responses, while smaller customers are happy with the generic default.",
    question: "What prompt architecture best supports this divergence without maintaining a fully separate prompt per customer?",
    options: [
      "Maintain one shared base prompt with a clearly defined customer-specific override/injection point for policy content, defaulting to generic content when no customer-specific override is provided",
      "Build and maintain a fully independent, complete prompt for every customer account regardless of size",
      "Force all customers, including enterprise ones, onto the generic default to avoid any customization complexity",
      "Let enterprise customers directly edit the production prompt themselves"
    ],
    correct: 0,
    explanation: "A shared base prompt with a defined customization/injection point for the parts that legitimately vary by customer (policy content) scales far better than either full duplication or no customization at all, defaulting sensibly when no override exists. Fully independent prompts per customer (B) creates a maintenance burden that grows linearly with customer count and loses shared-improvement benefits. Forcing everyone onto the generic default (C) fails the stated enterprise customer need. Letting customers directly edit the production prompt (D) removes necessary review and risks quality or safety regressions from unreviewed changes."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A satellite imagery analytics firm's report-generation assistant currently receives raw analyst notes (unstructured, variable quality) plus structured detection outputs from an upstream computer vision system, and must produce a client-ready report. Report quality is highly dependent on the raw analyst notes, which are sometimes terse and sometimes rambling, and there is no consistency requirement enforced upstream.",
    question: "What is the most effective prompt/context engineering lever available to the report-generation team, given they don't control the upstream note-taking process?",
    options: [
      "Add explicit instructions and a structured template within the prompt that guides the model on how to extract and normalize signal from notes of varying quality and length, rather than assuming uniform input quality",
      "Wait for the analyst note-taking process to be standardized before making any changes to the report-generation prompt",
      "Discard analyst notes entirely and generate reports from the structured detection output alone",
      "Reject any request where the analyst notes are below a certain word count"
    ],
    correct: 0,
    explanation: "Since the team doesn't control the upstream note quality, the effective lever they do control is prompt design that explicitly handles input variability — guiding the model on how to extract and normalize signal from notes regardless of terseness or ramble, rather than assuming clean, consistent input. Waiting for upstream standardization (B) cedes control over a fixable problem to a process outside the team's authority, with no guaranteed timeline. Discarding analyst notes entirely (C) throws away exactly the source the scenario says quality 'is highly dependent' on. Rejecting short notes outright (D) blocks legitimate terse-but-informative notes rather than teaching the system to handle them well."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A vacation rental marketplace's dynamic pricing explanation tool tells hosts why a suggested nightly rate changed. The team is deciding whether the explanation-generation call should share the same context window as the upstream pricing-calculation call, or be a separate call that receives only the calculated inputs and final price.",
    question: "What is the better architectural choice and why?",
    options: [
      "A single shared context window combining calculation and explanation, since fewer calls is inherently more efficient regardless of task coupling",
      "A separate call for explanation generation that receives the calculated inputs and final price as structured data, since the explanation task doesn't need the full calculation process context, only its relevant outputs — keeping each call's context scoped to what that task actually needs",
      "The explanation call should have no access to any pricing data and should generate a generic explanation not tied to the actual calculation",
      "Both calls should always use the largest available model to avoid worrying about the distinction"
    ],
    correct: 1,
    explanation: "The explanation task's actual dependency is on the calculated inputs and resulting price, not on the internal process of the pricing calculation itself — scoping the explanation call's context to just what it needs keeps both calls efficient and avoids coupling them unnecessarily. Assuming fewer calls is inherently better regardless of what each call actually needs (A) ignores that a merged, overloaded context can be less efficient and harder to reason about than two well-scoped calls. A generic explanation disconnected from the actual price (C) would be inaccurate and unhelpful to hosts. Defaulting both calls to the largest model to sidestep the architecture question (D) doesn't address the actual context-scoping decision being asked about."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A public library system's research-assistance chatbot for patrons handles a wide range of question difficulty, from simple ('what are your Saturday hours') to complex, multi-source research questions. The team currently routes every query to the same model tier.",
    question: "What change would likely improve overall cost-efficiency without harming complex-question quality?",
    options: [
      "Introduce query complexity classification to route simple factual questions to a faster/cheaper model while sending complex, multi-source research questions to a more capable model",
      "Route every question, including simple hours lookups, to the most capable model to guarantee no complex question is ever mishandled",
      "Route every question to the fastest, cheapest model to keep the public system's costs minimal, accepting weaker performance on complex questions",
      "Remove support for complex research questions and only handle simple factual lookups"
    ],
    correct: 0,
    explanation: "Complexity-based routing captures the efficiency gain available on the many simple questions while preserving capability where it's actually needed for complex, multi-source research — this is the standard pattern for workloads with a wide difficulty spread. Routing everything to the most capable model (B) overpays on the volume of simple lookups. Routing everything to the cheapest model (C) accepts avoidable quality loss on complex questions the system is meant to handle well. Dropping complex question support entirely (D) removes a core part of the service rather than architecting around the cost concern."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A cybersecurity firm's incident-response assistant helps analysts triage alerts by reasoning over live system logs, a threat intelligence feed updated hourly, and an internal playbook document that changes rarely. During a live incident, analysts need answers in under 10 seconds, but the team's current implementation re-sends the entire playbook and a full pull of the threat intelligence feed on every single query within the same incident session.",
    question: "What restructuring would best fit the differing volatility of these three inputs while meeting the latency requirement?",
    options: [
      "Cache the rarely-changing playbook, refresh and include only the delta or most relevant recent portion of the hourly threat intel feed rather than a full pull each time, and keep live system logs as the freshest, per-query input — matching each input's caching/refresh treatment to its actual volatility",
      "Cache all three inputs identically on the same schedule for architectural simplicity",
      "Avoid caching entirely during live incidents since incident response is too high-stakes for cached content of any kind",
      "Only refresh the playbook and threat intel feed once per incident at the very start, then never update either again regardless of incident duration"
    ],
    correct: 0,
    explanation: "The three inputs have distinctly different volatility profiles — rarely-changing playbook, hourly-updated threat intel, and live logs — and the efficient, correct design treats each accordingly: cache the stable playbook, pull only relevant deltas from the hourly feed instead of a full re-pull, and keep logs live per query, which also directly reduces the redundant token processing driving up latency. Treating all three identically (B) either overcaches volatile data or undercaches stable data. Avoiding caching entirely during incidents (C) unnecessarily discards a real latency win on the stable playbook precisely when speed matters most. Freezing the threat intel feed at incident start for the whole duration (D) risks analysts working from stale threat data during a longer-running incident, which is a genuine safety risk in incident response."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A national appliance retailer's warranty-claims assistant was recently upgraded from a lightweight model to a more capable one after complaints about inconsistent claim eligibility determinations. Post-upgrade, eligibility consistency improved, but response latency roughly tripled, and the operations team is now getting complaints about slow claim processing instead.",
    question: "What is the most balanced next step to investigate before reverting the model change?",
    options: [
      "Immediately revert to the lightweight model since the latency complaints outweigh the earlier consistency complaints",
      "Investigate whether prompt or context optimizations (trimming unnecessary context, caching stable content, or narrowing what's sent per claim) can recover latency while keeping the more capable model's consistency gains, before concluding a model downgrade is the only option",
      "Ignore the latency complaints since consistency is inherently more important than speed in all cases",
      "Switch to an entirely different, unrelated AI vendor to solve both problems simultaneously"
    ],
    correct: 1,
    explanation: "Before trading away a real accuracy/consistency gain, it's worth checking whether the latency regression is partly attributable to inefficient context (unnecessary content, no caching) rather than the model change alone — optimizing those factors could recover much of the latency while preserving the consistency improvement. Immediately reverting the model (A) discards a real quality gain without first checking for a cheaper fix. Declaring speed unimportant in all cases (C) ignores that the operations team has raised a legitimate, business-relevant latency complaint. Switching vendors entirely (D) is a drastic, unjustified step for what may be a solvable prompt/context efficiency issue."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A children's education app wants an AI tutor that gives simple, encouraging feedback on basic arithmetic practice problems for young students, with responses needed almost instantly to keep the app feeling responsive during practice sessions.",
    question: "Which model characteristic is most important for this use case?",
    options: [
      "Deep multi-step expert reasoning capability, since even basic arithmetic requires the most advanced reasoning available",
      "Fast response time paired with reliable performance on a narrow, well-defined task, since the task is simple and responsiveness directly affects the app's feel",
      "The ability to generate long, complex explanations regardless of the student's age or the simplicity of the problem",
      "Support for the widest possible range of unrelated subject areas beyond arithmetic"
    ],
    correct: 1,
    explanation: "Basic arithmetic feedback for young students is a narrow, low-complexity task where responsiveness meaningfully affects the product experience — favoring a fast, reliable model over one optimized for deep expert reasoning that isn't needed here. Claiming basic arithmetic requires the most advanced reasoning available (A) overstates the task's actual complexity. Long, complex explanations (C) would likely be inappropriate and unhelpful for young students working on simple problems. Broad unrelated subject support (D) is irrelevant to the specific, narrow use case described."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A specialty coffee roaster's B2B ordering assistant helps wholesale buyers place recurring orders through chat. Buyers often reference 'the usual' or 'same as last time,' requiring the assistant to recall each buyer's order history across sessions that may be weeks apart.",
    question: "What is the most appropriate way to support this kind of reference across sessions?",
    options: [
      "Require buyers to fully re-specify their order every time, avoiding the need to store or retrieve any history",
      "Maintain a per-buyer order history record that is queried and injected into context when needed (e.g., when the buyer references a prior order), rather than keeping every buyer's full chat history loaded at all times",
      "Keep every buyer's complete chat transcript for all time loaded into every new session's context, regardless of order relevance",
      "Guess at the buyer's likely order based on general trends across all buyers rather than their specific history"
    ],
    correct: 1,
    explanation: "The right pattern is a queryable per-buyer order history that's pulled in when actually referenced ('the usual'), rather than either ignoring history entirely or permanently loading every buyer's full transcript regardless of relevance. Requiring full re-specification every time (A) defeats the convenience the feature is meant to provide and frustrates buyers. Always loading a buyer's complete chat history in every session (C) is unnecessarily costly and doesn't scale as history accumulates over years. Guessing based on general cross-buyer trends instead of the specific buyer's own history (D) would likely produce inaccurate orders and misses the point of personalized recall."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A shipping container leasing company's contract-negotiation support tool drafts counter-proposal language during live negotiations with lessees. Legal wants every generated counter-proposal to be traceable to specific contract clauses and prior negotiation turns it was based on, for later dispute resolution.",
    question: "What prompting/context design best supports this traceability requirement during a multi-turn negotiation?",
    options: [
      "Instruct the model to write persuasively without needing to reference specific clauses or turns, since traceability can be reconstructed manually later if a dispute arises",
      "Structure the prompt so each generated counter-proposal is required to explicitly cite the specific clause(s) and/or prior turn(s) it draws from, and log these structured outputs alongside the conversation rather than relying on the free-form negotiation text alone",
      "Limit negotiations to a single turn to avoid the complexity of tracking multiple turns",
      "Summarize the entire negotiation into a single paragraph at the end and treat that as the traceability record"
    ],
    correct: 1,
    explanation: "Meeting an explicit traceability requirement calls for structuring the output itself to include citations to specific clauses and turns, logged in a structured way alongside the conversation — this creates a direct, reconstructable link rather than hoping it can be pieced together after the fact. Skipping citation requirements and relying on manual reconstruction later (A) is unreliable and defeats the purpose of a proactive traceability design. Limiting negotiations to a single turn (C) is an unnecessary and impractical restriction on real negotiation dynamics. A single end-of-negotiation summary paragraph (D) loses the turn-by-turn and clause-level granularity legal specifically needs for dispute resolution."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A commercial airline's flight operations planning tool uses Claude to help dispatchers evaluate alternate routing options during weather disruptions. The tool must integrate current weather radar summaries, fuel calculations, crew duty-time limits, and airport slot constraints — all sourced from different, frequently-updating internal systems — and produce a recommendation within 30 seconds during active disruptions when dispatchers are handling multiple flights at once.",
    question: "What context engineering priority matters most for keeping this tool reliable under live operational pressure?",
    options: [
      "Ensuring each data source is pulled fresh at request time (not stale-cached) given how frequently all of them change, while still caching only the genuinely static parts of the prompt (task instructions, output format) to keep latency within budget",
      "Caching all four data sources aggressively on a fixed daily schedule to maximize speed, accepting that some data may be a few hours stale",
      "Reducing the number of data sources included to just weather and fuel, dropping crew duty-time and slot constraints to simplify the prompt",
      "Increasing the context window so all historical disruption data for the past year can be included in every recommendation"
    ],
    correct: 0,
    explanation: "All four inputs are described as frequently-updating and operationally critical during active disruptions, so they should be pulled fresh per request rather than cached on any fixed schedule; the caching that does make sense is on the genuinely static instructional portion of the prompt, which still helps latency without risking stale operational data. Aggressively caching all four data sources daily (B) risks dispatchers acting on stale weather, fuel, crew, or slot data during a live disruption — a real safety and compliance concern. Dropping crew duty-time and slot constraints (C) removes legally and operationally essential factors from the recommendation. Loading a year of historical disruption data into every call (D) adds cost and latency without addressing the actual freshness requirement of the current disruption's data."
  }
];
