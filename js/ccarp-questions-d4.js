// CCAR-P Domain 4 — Evaluation, Testing & Optimisation (16% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D4 = [
  {
    domain: 4,
    difficulty: 4,
    scenario: "A legal-tech company's contract-review assistant passes all of its existing evaluation suite (200 hand-labeled contract clauses) at 96% accuracy, but customer complaints about missed liability clauses have increased since the last model upgrade.",
    question: "What does this combination of signals most likely indicate, and what should the team do?",
    options: [
      "The evaluation suite is fine — customers are simply misusing the tool, so the team should focus on user education",
      "The eval suite's 200 clauses no longer represent the distribution of contracts customers are actually submitting; the team should audit real failure cases and expand the eval set to cover them before trusting the 96% number again",
      "Roll back the model upgrade immediately without further investigation, since the complaints started afterward",
      "Increase the passing threshold on the existing eval suite to 99% to force better performance"
    ],
    correct: 1,
    explanation: "A static eval suite passing at a high rate while real-world complaints rise is the classic sign of eval/production drift — the suite stopped covering the cases that matter. The fix is to go look at actual failures and grow the eval set to represent them, not raise a threshold on a suite that isn't measuring the right thing (D), assume users are at fault without evidence (A), or roll back on correlation alone before understanding whether the model or the eval is the actual problem (C)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional bank is building an eval suite for a new Claude-based loan-summarization tool used by underwriters. The initial suite was assembled by two engineers who wrote 40 test cases based on documentation they read, without consulting underwriters.",
    question: "What is the most important gap to address before this eval suite is considered adequate for a production launch decision?",
    options: [
      "The suite needs more test cases in absolute number, regardless of who wrote them",
      "The suite should be reviewed and supplemented by actual underwriters using real (or realistic, de-identified) loan files, since engineer-authored cases likely miss domain-specific edge cases that matter to the business",
      "The suite should be translated into multiple languages to test robustness",
      "The suite should be run through an automated grammar checker to ensure clean phrasing"
    ],
    correct: 1,
    explanation: "Eval coverage is only as good as the domain expertise behind it; engineers guessing at edge cases from documentation will systematically miss the scenarios underwriters actually encounter, such as ambiguous income documentation or unusual collateral structures. Simply adding more engineer-written cases (A) doesn't fix the coverage gap, and language translation or grammar checking are irrelevant to whether the suite reflects real underwriting judgment."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "An e-commerce company wants to A/B test a new prompt version for its product-description generator against the current version. Traffic is 500,000 product pages per day.",
    question: "What is the most sound way to structure this test?",
    options: [
      "Run the new prompt on all traffic for one day, then compare that day's metrics to the previous day's metrics for the old prompt",
      "Randomly split incoming traffic between the two prompt versions concurrently, holding the time window constant, and compare outcome metrics over that same period",
      "Ask the marketing team to manually review 20 outputs from each version and vote on which they prefer",
      "Deploy the new prompt only to the highest-traffic product category to get faster results"
    ],
    correct: 1,
    explanation: "Concurrent randomized assignment controls for time-based confounds (seasonality, traffic mix, inventory changes) that would contaminate a before/after comparison across different days. Comparing sequential days (A) confounds prompt version with time, a small manual vote (C) is not statistically meaningful at this scale, and testing only on one category (D) doesn't generalize and still lacks a proper control group."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A hospital system's clinical documentation assistant uses a multi-step agentic workflow: it pulls patient history, drafts a note, checks it against a medication-interaction list, and flags discrepancies for physician review. The team wants to add regression tests before their next release.",
    question: "What should the regression test suite primarily validate?",
    options: [
      "Only the final output text, since that is what physicians actually read",
      "The correctness of each intermediate step in isolation, plus the behavior of the full pipeline end-to-end, including cases where an earlier step's output should change downstream behavior",
      "Only the medication-interaction check, since that is the highest-risk component",
      "The system's response latency under load"
    ],
    correct: 1,
    explanation: "Agentic workflows fail in ways single-turn systems don't: an error can originate in one step and silently propagate or get masked by a later step. Testing only the final output (A) or only one component (C) can miss failures where a bad intermediate result happens to produce a plausible-looking final note, and latency (D) is a performance concern, not a correctness regression concern, so it belongs in a different test category."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A SaaS company's customer-support copilot shows a 3-point drop in its internal helpfulness eval score after a prompt change, but the support team reports that ticket resolution time has improved and escalation rates have dropped since the change went live.",
    question: "How should the team interpret this conflict between the eval score and the operational metrics?",
    options: [
      "Trust the eval score exclusively and revert the prompt change, since evals are more rigorous than anecdotal team feedback",
      "Trust the operational metrics exclusively and ignore the eval score, since real business outcomes always outrank synthetic evaluation",
      "Investigate whether the eval rubric is actually measuring what matters to customers — it may be penalizing a stylistic change (e.g., shorter, more direct answers) that customers and agents actually prefer",
      "Assume the operational metrics are noisy and wait a full quarter before drawing any conclusion"
    ],
    correct: 2,
    explanation: "When a leading indicator (the eval) and a lagging, real-world indicator (ticket resolution, escalations) disagree, the right move is to investigate the eval rubric itself rather than blindly trusting either signal. It's plausible the rubric rewards verbosity or a particular tone that no longer matches what's actually driving better outcomes. Reverting on eval score alone (A) or dismissing it outright (B) both skip the diagnostic step, and waiting a quarter (D) delays a decision that can be informed by evidence already in hand."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A logistics company is migrating its shipment-routing assistant from one Claude model version to a newer one. The current eval suite has 150 cases and was last updated eight months ago, before the company expanded into three new countries with different customs rules.",
    question: "What should the team do before relying on eval results to approve the migration?",
    options: [
      "Run the migration eval as-is, since 150 cases is a statistically adequate sample size",
      "Add representative test cases covering the new countries' customs and routing rules before evaluating the migration, since the current suite cannot speak to behavior it was never designed to test",
      "Skip evaluation and rely on a short manual smoke test by one engineer",
      "Postpone the migration indefinitely until a full year of production data exists for the new countries"
    ],
    correct: 1,
    explanation: "An eval suite can only tell you about the distribution it covers; if a third of the business now involves scenarios the suite predates, a passing score is uninformative about that portion of production traffic. Sample size (A) is not the binding constraint here — coverage is. A single engineer's smoke test (C) is not rigorous enough for a model migration, and waiting a full year (D) is an overreaction when the suite can be reasonably updated in a much shorter timeframe."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A telecom provider's billing-inquiry chatbot currently costs $0.08 per conversation using a larger Claude model. Finance wants to cut this cost by 40% without materially harming customer satisfaction, which is currently at 4.3/5.",
    question: "What is the most defensible first step toward this cost target?",
    options: [
      "Switch immediately to a smaller, cheaper model for all traffic to hit the cost target as fast as possible",
      "Segment conversations by complexity, route simple/high-volume inquiry types (like balance checks) to a smaller model, and evaluate whether satisfaction holds before expanding the change to more complex inquiry types",
      "Reduce the context window size to cut token costs, regardless of impact on answer quality",
      "Keep the current model but simply ask customers to write shorter messages"
    ],
    correct: 1,
    explanation: "Cost optimization should be paired with segmentation and measurement: simple, high-volume queries are often the best candidates for a cheaper model with minimal quality risk, and validating satisfaction before broadening the rollout limits downside exposure. Switching everything at once (A) risks satisfaction on complex cases without any evidence, indiscriminately shrinking context (C) can degrade accuracy regardless of cost savings achieved, and asking customers to change behavior (D) is not a controllable lever for the business."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A government benefits agency's Claude-based eligibility-screening assistant has two error types: false approvals (costly and hard to claw back) and false denials (harmful to applicants but correctable on appeal). The agency is deciding on the quality bar to require before launch.",
    question: "How should the acceptable error threshold be set for this system?",
    options: [
      "Use a single blended accuracy threshold that treats both error types as equally costly, since that is simplest to communicate",
      "Set asymmetric thresholds that are stricter on false approvals than false denials, reflecting that the two error types carry different real-world costs and remediation paths",
      "Set the same strict threshold used for a low-stakes internal tool, since consistency across the organization is valuable",
      "Defer any threshold decision until the system has been in production for a year and error costs can be measured empirically"
    ],
    correct: 1,
    explanation: "Quality bars should reflect the actual cost and reversibility of each error type, not just overall accuracy; here, an incorrectly granted benefit is harder to reverse than an incorrect denial, which has an appeals path. A single blended metric (A) can mask a dangerous imbalance between error types, applying an unrelated tool's threshold (C) ignores this system's specific risk profile, and deferring the decision (D) leaves the agency launching with no defined bar at all, which is not acceptable for a high-stakes public benefits system."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An insurance company's claims-triage assistant has been in production for six months. The engineering team wants to build a stronger eval set but currently only has the original 80 cases used at launch.",
    question: "What is the most effective source for expanding this eval set now?",
    options: [
      "Generate additional synthetic cases using Claude itself, without any grounding in real production data",
      "Mine six months of production logs for cases where human reviewers overrode the assistant's triage decision, and convert representative examples of those overrides into labeled eval cases",
      "Duplicate the existing 80 cases with minor wording changes to inflate the count",
      "Survey a different team in the company that doesn't use the tool for their opinion on likely edge cases"
    ],
    correct: 1,
    explanation: "Production failure cases — specifically where a human corrected the system — are the highest-value source of new eval cases because they are guaranteed to be real, relevant, and diagnostic of an actual gap. Pure synthetic generation without grounding (A) risks testing invented scenarios that don't reflect reality, duplicating existing cases with cosmetic changes (C) doesn't add real coverage, and soliciting opinions from an uninvolved team (D) is a weaker signal than empirical override data that already exists."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A media streaming company runs a canary rollout of a new recommendation-summary prompt to 5% of users for one week before a full rollout. At the end of the week, click-through rate is up 2% (not statistically significant at their sample size) and there are zero user complaints.",
    question: "What should the team conclude and do next?",
    options: [
      "Since there were zero complaints, immediately roll out to 100% of users — silence is sufficient evidence of success",
      "Since the click-through improvement isn't statistically significant, treat the result as inconclusive rather than as a win, and either extend the canary to gather a larger sample or accept a longer decision timeline before expanding exposure",
      "Since the result isn't significant, conclude the change is harmful and revert it immediately",
      "Abandon statistical testing for this metric since it's too slow to reach significance, and use complaint volume as the sole rollout gate going forward"
    ],
    correct: 1,
    explanation: "A non-significant result is neither a confirmed win nor a confirmed loss — it means the current sample doesn't yet allow a confident conclusion, so the responsible move is to gather more data before scaling exposure, not to declare victory or failure prematurely. Absence of complaints (A) is a weak, low-sensitivity signal that most users experiencing a mild change will never surface, and concluding harm (C) misreads statistical non-significance as evidence of a negative effect, which it is not. Abandoning significance testing (D) removes a safeguard rather than fixing the underlying sample-size problem."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A manufacturing company's maintenance-troubleshooting assistant needs a faster response time; technicians on the factory floor are reporting that 6-8 second response times interrupt their workflow. The current setup calls Claude with a large fixed context of the full equipment manual embedded in every request.",
    question: "What is the most effective first lever to reduce latency without sacrificing troubleshooting quality?",
    options: [
      "Switch to a faster but much less capable model across the board",
      "Retrieve only the manual sections relevant to the specific equipment and fault code in each request instead of embedding the entire manual every time, reducing input size while preserving relevant context",
      "Ask technicians to submit shorter questions",
      "Cache nothing and simply upgrade the network connection on the factory floor"
    ],
    correct: 1,
    explanation: "Trimming the input to only relevant context (retrieval instead of full-document stuffing) is usually the highest-leverage latency fix because processing time scales with input size, and it preserves quality since the relevant material is still present. Downgrading the model uniformly (A) risks harming quality on genuinely complex faults, shortening technician questions (C) doesn't address the actual bottleneck of a bloated fixed context, and a network upgrade (D) doesn't address model processing time at all, which is the dominant factor here."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A non-profit running a Claude-based grant-writing assistant for small community organizations has a five-question eval rubric scored by one program officer. The rubric scores have shown very low variance for months — nearly every output scores 4 or 5 out of 5.",
    question: "What should this pattern of low variance most likely prompt the team to investigate?",
    options: [
      "Nothing — consistently high scores indicate the system is performing excellently and stable",
      "Whether the rubric is too coarse or lenient to discriminate between genuinely good and mediocre outputs, and whether a second, independent rater would produce different scores (inter-rater reliability)",
      "Whether the program officer should be replaced with an automated grader entirely, without further analysis",
      "Whether the organization should stop using evals altogether since they aren't producing actionable information"
    ],
    correct: 1,
    explanation: "An eval that never discriminates between outputs — nearly always scoring at the ceiling — is a red flag for rubric insensitivity or rater leniency rather than proof of genuine quality; checking rubric granularity and inter-rater reliability with a second scorer is the standard diagnostic. Assuming excellence without investigation (A) ignores a clear warning sign, jumping straight to full automation (C) is a premature solution that doesn't address whether the underlying rubric is even sound, and abandoning evaluation entirely (D) discards a process that likely just needs recalibration."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A multinational bank operates five business units, each independently calling Claude for different use cases (fraud narrative generation, customer chat, internal research, code review, and report drafting), billed to a shared central budget that has grown 300% year over year. Finance wants cost attribution before approving next year's budget.",
    question: "What is the most useful first step toward responsible cost attribution and optimization across these teams?",
    options: [
      "Freeze all Claude usage company-wide until a new budget process is designed",
      "Instrument per-team, per-use-case usage tracking (tokens, requests, model tier) so spend can be attributed to business units and use cases, then evaluate each use case's cost-to-value ratio individually rather than optimizing the aggregate budget as one undifferentiated number",
      "Apply a uniform 20% budget cut across all five teams to force efficiency",
      "Migrate every team to the cheapest available model tier to guarantee cost savings"
    ],
    correct: 1,
    explanation: "Meaningful cost optimization requires attribution granularity — without knowing which use case is driving spend and what value it delivers, decisions become guesswork; per-team, per-use-case instrumentation enables targeted trade-offs (e.g., a lower-value internal research use case is a better cost-cutting candidate than fraud narrative generation, which may carry compliance stakes). A blanket freeze (A) halts legitimate high-value work, an even percentage cut (C) treats a high-value use case the same as a low-value one, and forcing everyone to the cheapest tier (D) ignores that some use cases (e.g., fraud detection) may require higher-capability models to remain safe and accurate."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An online gaming platform's in-game assistant chatbot passed all pre-launch evals, but two weeks after launch, the data science team notices the model is receiving a growing share of queries in a slang-heavy dialect that was underrepresented in the original eval set.",
    question: "What is the appropriate response to this observation?",
    options: [
      "Ignore it, since the eval suite already passed and re-testing would be redundant",
      "Sample a batch of the dialect-heavy production queries, have them reviewed for quality, and if performance is materially weaker, add representative cases to the eval suite and consider targeted prompt or fine-tuning adjustments",
      "Immediately disable the assistant for all users speaking in that dialect",
      "Wait for user complaints before taking any action, since no complaints have been received yet"
    ],
    correct: 1,
    explanation: "A shift in the traffic distribution toward an underrepresented segment is a leading indicator worth proactively investigating before it becomes a complaint pattern; sampling and reviewing real queries turns a hypothesis into evidence and, if warranted, directly strengthens the eval suite's coverage. Ignoring it (A) squanders an early warning, disabling the assistant for an entire dialect-speaking population (C) is a disproportionate reaction without confirmed evidence of harm, and waiting passively for complaints (D) is reactive when proactive drift detection is both possible and cheaper here."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A pharmaceutical company's Claude-based adverse-event report summarizer for regulatory submissions shows 99.2% agreement with human medical reviewers on a 500-case eval set. The remaining 0.8% (4 cases) involve under-reporting of severity for rare but serious reactions.",
    question: "Is a 99.2% aggregate accuracy an adequate quality bar to rely on for production use in this context?",
    options: [
      "Yes, 99.2% is an excellent score by industry standards and should be accepted as sufficient on its own",
      "No — for a regulatory safety application, the composition of the errors matters more than the aggregate score; systematic under-reporting of severe rare events is disproportionately dangerous and warrants targeted mitigation (e.g., a stricter severity-classification review step) even at high overall accuracy",
      "No, because 500 cases is too small a sample to trust any accuracy figure regardless of what the errors contain",
      "Yes, but only if the four failing cases are removed from the eval set to raise the reported score above 99.5%"
    ],
    correct: 1,
    explanation: "In safety-critical regulatory contexts, aggregate accuracy is an insufficient bar on its own — what matters is whether the error distribution concentrates in high-consequence categories. Here it does: under-reporting severity on rare serious adverse events is exactly the failure mode regulators and patients care most about, so it warrants a dedicated mitigation regardless of the strong overall number. Accepting the aggregate score at face value (A) ignores this concentration of harm, dismissing the whole result on sample size alone (C) sidesteps engaging with the qualitative finding that is already actionable, and removing inconvenient cases from the eval set (D) is a form of evaluation manipulation that would hide a genuine safety gap."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A real estate brokerage wants to test whether a new property-description prompt increases listing engagement. They have only 400 active listings, and typical engagement metrics are noisy (high variance day to day).",
    question: "Given this small scale, what testing approach best balances rigor with practicality?",
    options: [
      "Run a full statistically powered A/B test anyway, accepting that it may take several months to reach significance, and clearly communicate that timeline to stakeholders rather than skip evaluation altogether",
      "Skip formal testing since the sample is too small to ever produce meaningful results",
      "Launch the new prompt to all 400 listings at once and judge success by gut feel from the marketing team after one week",
      "Test on only the 10 highest-value listings and generalize the result to the full portfolio"
    ],
    correct: 0,
    explanation: "With a small, noisy population, rigor doesn't disappear — the honest response is to size the test appropriately and be transparent that reaching significance will take longer, rather than abandoning measurement or fabricating false confidence from an underpowered look. Skipping testing entirely (B) throws away decision-relevant information that can still be gathered, judging by gut feel after a single noisy week (C) is exactly the kind of decision a proper test is meant to replace, and generalizing from an unrepresentative subset of only high-value listings (D) risks a biased conclusion that doesn't hold for the broader portfolio."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A B2B SaaS company's API-documentation assistant is evaluated using an automated LLM-judge that scores answers for accuracy against a reference document. The judge has been giving very high scores, but a spot-check by an engineer found the judge sometimes rates responses as correct even when they cite the wrong section of the documentation.",
    question: "What is the most appropriate way to address this weakness in the evaluation pipeline?",
    options: [
      "Discontinue automated evaluation entirely and switch to 100% manual human review going forward",
      "Add citation/grounding accuracy as an explicit, separately scored criterion in the judge's rubric, and validate the judge's revised scoring against a human-labeled sample to confirm it now catches this failure mode",
      "Ignore the spot-check finding since it was based on only a few examples",
      "Increase the frequency of automated evaluation runs without changing what is being measured"
    ],
    correct: 1,
    explanation: "The root problem is that the judge's rubric doesn't explicitly check for citation accuracy, so the fix is to add that as a scored dimension and then validate the revised judge against human labels to confirm the gap is actually closed — this keeps the efficiency of automated evaluation while correcting its blind spot. Abandoning automation entirely (A) is a costly overcorrection when the underlying issue is fixable, dismissing a real finding because the sample was small (C) ignores actionable evidence of a rubric flaw, and simply running the same flawed judge more often (D) would only produce more of the same unreliable signal."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A public school district's Claude-based tutoring assistant for middle schoolers is about to have its underlying model upgraded. The current version has an extensive academic-content eval suite but nothing testing age-appropriate tone or handling of sensitive personal topics students sometimes bring up.",
    question: "Before approving the migration, what should the district prioritize adding to its testing strategy?",
    options: [
      "Nothing additional — academic accuracy is the only dimension that matters for an educational tool",
      "A dedicated set of eval cases covering tone appropriateness and safe handling of sensitive disclosures, reviewed by staff with child-safety and pedagogical expertise, in addition to the existing academic-content suite",
      "A larger academic-content suite covering more subjects, since breadth of subject coverage is the priority",
      "A pure latency and cost benchmark, since the current version is already considered safe"
    ],
    correct: 1,
    explanation: "For a tool serving minors, tone and safe handling of sensitive disclosures are not optional extras — they are core to the product's risk profile and were never tested despite being live in production, which is a coverage gap a model migration makes urgent to close. Treating academic accuracy as the only relevant dimension (A) ignores a documented and serious gap, expanding subject breadth (C) doesn't address the untested risk area at all, and a pure performance benchmark (D) wrongly assumes safety has already been validated when it explicitly has not."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "An energy utility's outage-prediction assistant summarizes sensor data for grid operators. After a prompt update intended to make summaries more concise, the eval suite score improved slightly, but a grid operator reports that a summary omitted a borderline-but-relevant sensor reading that would have been useful context, though it did not cause an actual incident.",
    question: "How seriously should this single anecdotal report be weighed against the improved aggregate eval score?",
    options: [
      "Very seriously — one near-miss report in a safety-relevant system justifies immediate rollback of the prompt change regardless of what caused it",
      "Not at all — a single anecdote should never outweigh a quantitative eval result",
      "Seriously enough to investigate: determine whether the conciseness change systematically drops borderline-relevant details, and if so, add eval cases targeting that failure mode before deciding whether to keep, adjust, or revert the change",
      "Seriously enough to pause the entire outage-prediction system in all its capacities until a full audit is completed"
    ],
    correct: 2,
    explanation: "In a safety-adjacent domain, a single well-documented near-miss deserves genuine investigation even against a favorable aggregate score, because conciseness optimizations are a known way to systematically trim exactly the kind of borderline detail an expert user later needed — but investigation, not instant reflexive action, is the proportionate response. Immediate rollback without diagnosis (A) may be premature if this turns out to be a one-off, dismissing the anecdote outright (B) ignores a legitimate expert signal in a high-stakes domain, and a full system-wide pause (D) is a disproportionate response to one reported near-miss with no confirmed incident."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A supply-chain company built a Claude-based purchase-order anomaly detector. Before launch, the vendor manager ran the assistant on 30 historical purchase orders and it correctly flagged all known anomalies.",
    question: "Is this sufficient evidence to proceed to a full production launch?",
    options: [
      "Yes, 100% accuracy on any sample size is sufficient to prove the system works",
      "No — 30 cases, likely hand-picked or already-known anomalies, is too small and possibly non-representative a sample; a larger, more diverse eval set including normal (non-anomalous) orders is needed to also assess the false-positive rate",
      "Yes, because the vendor manager is a domain expert and their judgment alone is sufficient validation",
      "No, because purchase-order anomaly detection cannot be meaningfully evaluated before deployment"
    ],
    correct: 1,
    explanation: "Thirty cases that were selected specifically because they contain known anomalies tell you almost nothing about the false-positive rate on normal orders, which matters just as much for a usable anomaly detector — a system that flags everything would also pass this narrow test. Treating any accuracy figure at any sample size as sufficient (A) misunderstands statistical reliability, relying purely on one manager's judgment without broader testing (C) doesn't substitute for structured evaluation, and claiming the system category can't be evaluated at all (D) is simply false — it just needs a properly constructed eval set."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A telehealth company's symptom-triage assistant is being tested with two competing prompt versions in an A/B test. Halfway through the planned two-week test, version B is showing meaningfully better triage-accuracy numbers on the interim data.",
    question: "What should the team do with this interim result?",
    options: [
      "Immediately stop the test and roll out version B to all patients, since the interim numbers already favor it",
      "Continue the test to its pre-registered endpoint (or use a formal sequential-testing method designed for early stopping) rather than making a rollout decision based on an unplanned interim look, since peeking at data before the planned analysis inflates the risk of a false positive",
      "Discard the interim result entirely and restart the test from scratch",
      "Average the interim result with a guess about what the final result will be to make an early decision"
    ],
    correct: 1,
    explanation: "Stopping early based on an unplanned look at interim data is a well-known way to produce false positives, because effect estimates fluctuate before a study reaches its planned sample size; the disciplined response is to either let the test run to its pre-specified endpoint or use a formal sequential/group-sequential method built for valid early stopping. Rolling out immediately (A) risks locking in a result that regresses to the mean, discarding valid interim data (C) wastes information that a proper method could still use, and averaging with a guess (D) is not a statistically meaningful procedure at all."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A large agricultural cooperative uses a Claude-based crop-advisory assistant across 12 regional offices. Each office has slightly customized prompts for local crop types and regulations. A company-wide base model upgrade is planned.",
    question: "What is the most sound testing strategy for this migration?",
    options: [
      "Test the upgrade against one office's eval suite and assume results generalize to all 12, since the underlying model is the same everywhere",
      "Skip regional testing since local prompt customizations are minor tweaks unlikely to interact with a model upgrade",
      "Evaluate the upgrade against each region's own eval suite (or at minimum a representative sample of regions covering the range of crop types and regulatory contexts), since local prompt customizations can interact differently with a new model version",
      "Delay the upgrade until all 12 offices agree to consolidate onto a single shared prompt"
    ],
    correct: 2,
    explanation: "Because each region has customized prompts addressing different crop types and regulations, a model upgrade can interact with those customizations in region-specific ways that a single office's eval suite would never surface; testing across a representative range of regions is necessary to catch this. Assuming one region's results generalize (A) ignores exactly the customization risk described, skipping regional testing altogether (B) dismisses a real interaction risk without evidence, and forcing prompt consolidation before any testing (D) is an unnecessary and disruptive precondition when regional testing alone can validate the migration."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A retail company is designing an eval suite from scratch for a new product-recommendation assistant.",
    question: "Which of the following is the most fundamental first step in designing a useful eval suite?",
    options: [
      "Write as many test cases as possible before defining what 'good' output looks like",
      "Clearly define the task, the target user, and success criteria (what distinguishes a good response from a bad one) before writing test cases",
      "Choose the eval framework or tooling to use before deciding what to measure",
      "Start by benchmarking against a competitor's product to define scope"
    ],
    correct: 1,
    explanation: "Defining the task, audience, and concrete success criteria is the necessary foundation for any eval suite — without it, test cases and grading criteria have nothing coherent to be built against. Writing volumes of test cases first (A) risks producing an unfocused set that doesn't map to real success criteria, choosing tooling before deciding what to measure (C) puts implementation before design, and benchmarking against a competitor (D) may inform scope later but isn't the foundational first step."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national law firm's contract-drafting assistant is evaluated monthly by a panel of three senior associates who independently score 50 sample outputs. This month, the three associates' scores disagree substantially on 15 of the 50 cases.",
    question: "What does this level of disagreement most likely indicate, and what should the firm do?",
    options: [
      "The associates are not qualified to evaluate the tool and should be replaced with an automated grader",
      "The scoring rubric may be ambiguous or the criteria for 'good' output may be genuinely contested among experts; the firm should review the disputed cases together, clarify or refine the rubric, and consider whether some tasks have legitimately multiple acceptable answers",
      "The disagreement is unimportant noise and the average of the three scores should simply be used going forward without further review",
      "The eval should be discontinued since expert evaluators disagreeing proves the exercise is unreliable"
    ],
    correct: 1,
    explanation: "Substantial disagreement across a meaningful fraction of cases (30% here) is a sign that either the rubric under-specifies what counts as good, or the task has genuinely ambiguous acceptable answers — both are worth surfacing and resolving through calibration discussion rather than papering over. Replacing the associates (A) assumes the raters are the problem without investigating the rubric, silently averaging disagreement away (C) hides a real signal that could improve the eval, and discontinuing evaluation altogether (D) discards a valuable process over a fixable calibration issue."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A gaming company's automated content-moderation assistant flags player chat messages for review. The current eval suite measures overall precision and recall but does not break results down by language. The company just expanded to Latin America and Southeast Asia.",
    question: "What testing gap is most urgent to close given this expansion?",
    options: [
      "None — overall precision and recall are sufficient regardless of language mix, since aggregate performance is what matters to the business",
      "Segmenting the eval by language/locale to check whether performance is materially weaker in the newly added languages, since an aggregate metric can mask poor performance in underrepresented segments if they're a small share of total volume",
      "Rewriting the entire eval suite in English only, since English is the most common language on the platform overall",
      "Increasing the overall size of the eval suite in English without regard to language coverage"
    ],
    correct: 1,
    explanation: "Aggregate metrics can hide subgroup underperformance, especially when a new segment is initially a small share of total volume — a moderation tool performing poorly in Portuguese or Thai chat could look fine in the blended number while causing real harm (missed abuse or wrongful flags) in those specific communities. Assuming the aggregate is sufficient (A) is exactly the failure mode being probed here, restricting testing to English only (C) actively excludes the populations most at risk of an untested gap, and simply growing the English-only suite (D) doesn't address the actual coverage gap introduced by the expansion."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A logistics company's route-optimization assistant currently uses a large model for every request, including simple ones like 'what's the ETA for order 4471.' Cost per request averages $0.06, and the finance team has flagged this as high relative to the value of simple lookups.",
    question: "What optimization is most likely to reduce cost meaningfully without harming quality on complex routing requests?",
    options: [
      "Classify incoming requests by complexity and route simple lookups to a cheaper, faster model or a non-LLM lookup path, reserving the larger model for genuinely complex multi-constraint routing problems",
      "Reduce the large model's usage across all request types uniformly by a fixed percentage",
      "Cache nothing and simply negotiate a lower per-token rate with the model provider",
      "Batch all requests together once per day to reduce the number of API calls"
    ],
    correct: 0,
    explanation: "Complexity-based routing directs spend where it's actually needed — simple factual lookups like an ETA rarely require a large model's reasoning capability and may not need an LLM at all, while genuinely complex multi-constraint routing problems still get the capability they require. A uniform percentage cut across all request types (B) risks degrading quality on complex requests while under-optimizing simple ones, pursuing a better rate (C) doesn't address the architectural inefficiency of using an oversized model for trivial lookups, and batching (D) addresses request volume timing, not the fundamental cost-per-request mismatch."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A healthcare payer's Claude-based prior-authorization assistant has been running in production for a year on Model Version A. The vendor is deprecating Version A in three months. The payer's compliance team requires that any new model demonstrate equivalent or better performance before it can be adopted for this use case.",
    question: "What testing approach best satisfies this compliance requirement before migrating?",
    options: [
      "Run the new model on the existing eval suite once, and if the aggregate score is within 1 point of the old model's score, approve the migration",
      "Run a structured comparison between the old and new model using the existing eval suite plus new cases derived from recent production edge cases, examine both aggregate scores and per-category breakdowns (especially high-risk categories like denials), and require sign-off from compliance and clinical stakeholders on the results before migrating",
      "Assume the new model is better by default because it's newer, and migrate without additional testing",
      "Have compliance approve the migration based on the vendor's own marketing benchmarks for the new model"
    ],
    correct: 1,
    explanation: "A rigorous equivalence determination for a compliance-sensitive use case requires both broad and category-specific comparison — an aggregate score alone can mask a regression concentrated in high-risk categories like authorization denials, which is exactly where errors are most consequential. A single aggregate-score check with a loose tolerance (A) is too coarse for this stakes level, assuming newer means better without evidence (C) is an unjustified leap, and relying on vendor marketing benchmarks (D) is not independent or specific to this payer's actual use case and data."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A financial services firm's investment-research summarizer has an eval suite that tests summarization accuracy against source documents. The firm now wants to also test for a subtler property: that the assistant doesn't inadvertently imply investment advice or recommendations, which the firm is legally barred from providing.",
    question: "How should this new requirement best be incorporated into the testing strategy?",
    options: [
      "Fold it into the existing accuracy rubric as a minor deduction, since it's a stylistic concern",
      "Create a separate, explicitly scored compliance dimension (distinct from summarization accuracy) with its own test cases specifically designed to probe boundary cases where advice-like language could creep in, since this is a distinct risk category with legal consequences, not a quality nuance",
      "Rely on the model's default training to avoid this issue without adding any explicit testing",
      "Address it only through a disclaimer appended to every output, without further evaluation"
    ],
    correct: 1,
    explanation: "Legal/compliance risks like inadvertent investment advice are categorically different from summarization quality and carry different consequences (regulatory exposure vs. a subpar summary), so they warrant their own explicit, separately scored test dimension with targeted boundary-case scenarios rather than being buried inside an unrelated rubric. Treating it as a minor deduction within the accuracy rubric (A) risks it being averaged away by otherwise-good summaries, trusting default model behavior without verification (C) is not an acceptable risk posture for a legal exposure, and a disclaimer alone (D) doesn't prevent the underlying problem or provide any evidence the risk has been tested."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A telecom's network-troubleshooting agent performs a sequence of steps: diagnose the issue, query internal systems, propose a fix, and in some cases automatically execute low-risk fixes (like resetting a specific service). After a recent update, the eval suite (which tests each step's output independently) shows no regression, but field technicians report an increase in cases where the agent executed a fix that was technically correct for the diagnosis given, but the diagnosis itself was subtly wrong.",
    question: "What does this reveal about the eval suite's design, and what should be fixed?",
    options: [
      "Nothing needs to change; per-step accuracy is the correct way to evaluate a multi-step agent",
      "The eval suite tests each step in isolation using presumably correct inputs to each step, which can miss compounding errors where an upstream mistake (bad diagnosis) leads to a technically valid but ultimately wrong downstream action; the suite should add end-to-end test cases that trace a full task from start to finish",
      "The field technicians are misreporting normal system behavior and their reports should be discounted",
      "The suite should stop testing individual steps altogether and rely only on technician feedback going forward"
    ],
    correct: 1,
    explanation: "Testing each step in isolation typically feeds each step a presumed-correct input, which hides exactly the failure mode described here: a diagnosis error that a downstream step handles 'correctly' given that flawed input, producing a wrong real-world outcome despite every step passing its individual test. The fix is to add end-to-end traces that let errors compound the way they do in production, not to abandon per-step testing (D) or discount the field evidence (C), which is a legitimate real-world signal pointing at a genuine blind spot."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A local government's citizen-services chatbot handles routine questions about permits and services. The team is deciding how much human-in-the-loop review is needed before responses are sent to citizens.",
    question: "What is the most reasonable human-in-the-loop design for this use case?",
    options: [
      "No human review at all, to maximize response speed for citizens",
      "100% human review of every response before it is sent, regardless of topic or risk",
      "Risk-based review: allow low-stakes, well-covered topics (like office hours or standard document checklists) to go out automatically, but route higher-stakes or lower-confidence topics (like eligibility for a specific benefit or legal deadlines) to human review before sending",
      "Human review only for negative feedback received after the fact, with no proactive review"
    ],
    correct: 2,
    explanation: "Risk-based, tiered human review focuses limited reviewer time where it has the most value — high-stakes or uncertain topics — while allowing routine, well-tested responses to flow without unnecessary friction, which is the standard human-in-the-loop design pattern for public-facing systems with mixed risk levels. No review at all (A) leaves higher-stakes topics unchecked, reviewing literally everything (B) doesn't scale and wastes reviewer effort on low-risk routine answers, and only reviewing after negative feedback (D) is purely reactive and lets harmful responses reach citizens before anyone catches them."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An online education platform's essay-feedback assistant is being A/B tested with two prompt variants across 10,000 students. Variant A shows higher scores on a rubric-fidelity eval; Variant B shows higher student engagement (measured by whether students revise and resubmit after receiving feedback).",
    question: "How should the team reconcile these two different metrics pointing in different directions?",
    options: [
      "Always prioritize the eval metric, since it was designed and validated by the pedagogy team ahead of time",
      "Always prioritize the engagement metric, since real behavior is more meaningful than a proxy metric",
      "Clarify what the business actually cares about (e.g., whether the ultimate goal is rubric-precise feedback or improved student revision behavior, or ideally both), and if the two are in genuine tension, consider whether a hybrid approach or further investigation (e.g., does Variant B's feedback quality hold up despite lower rubric fidelity?) can resolve the conflict rather than picking one metric by default",
      "Run the test for a longer period without changing the analysis approach, assuming the metrics will eventually converge on their own"
    ],
    correct: 2,
    explanation: "When two meaningful metrics diverge, the right move is to clarify the actual business/pedagogical objective and investigate why they diverge — it's possible Variant B's feedback is just as pedagogically sound but phrased in a way that better motivates revision, which would make it the better choice on both counts once understood. Defaulting to either metric automatically (A or B) skips this investigation and risks optimizing for the wrong thing, and simply running longer without changing the analysis (D) assumes the tension is a data artifact rather than a real trade-off, which isn't established here."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A property-management company deployed a tenant-communication assistant to 3 of its 40 regional offices as a pilot six weeks ago. Results have been positive: fewer escalations and faster response times in all three pilot offices.",
    question: "What should the company do before expanding to all 40 offices?",
    options: [
      "Expand immediately to all 40 offices, since three offices of positive results is proof the system works everywhere",
      "Expand gradually in phases (e.g., 10 offices, then 20, then all 40), monitoring key metrics at each phase, since the three pilot offices may not represent the full diversity of markets, tenant demographics, and regional regulations across the portfolio",
      "Cancel the rollout, since a 3-office pilot cannot be trusted",
      "Skip further rollout planning and let each of the remaining 37 offices decide independently and informally whether to adopt the tool"
    ],
    correct: 1,
    explanation: "A gradual, monitored rollout is the appropriate way to scale from a small, possibly unrepresentative pilot to a large and diverse portfolio — it lets the team catch problems that only appear in different regional markets, tenant mixes, or regulatory environments before they affect the whole company. Expanding immediately to all 40 offices (A) assumes the pilot generalizes without evidence, canceling outright (C) discards genuinely positive results without justification, and letting adoption happen informally and independently (D) forfeits the systematic monitoring needed to catch issues early."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A cybersecurity firm's incident-summary assistant is evaluated using a fixed set of 60 historical incidents. Over the past year, the security team has quietly stopped updating the eval set because 'it's been stable and reliable.' A new engineer proposes refreshing it with recent incidents.",
    question: "What is the strongest argument for the new engineer's proposal?",
    options: [
      "A stable eval score over time proves the system and the eval are both still accurate, so refreshing isn't necessary",
      "An eval suite that hasn't changed while the threat landscape and incident types have evolved risks becoming stale and unable to detect emerging failure modes, even if its score looks consistently good — stability of the metric is not the same as continued relevance of the suite",
      "Refreshing the eval set is primarily useful for team morale and process hygiene, not for detecting real issues",
      "The current 60 cases should simply be re-labeled by a different team member to refresh the suite without adding new content"
    ],
    correct: 1,
    explanation: "A consistently good score on an unchanged eval suite in a fast-evolving domain like cybersecurity incidents is not reassuring on its own — it may simply mean the suite is no longer testing anything hard or representative of current threats, which is a stale-eval risk distinct from genuine system reliability. Treating score stability as proof of continued accuracy (A) conflates two different things, framing the refresh as merely a morale exercise (C) understates its real diagnostic value, and simply re-labeling the same 60 cases (D) doesn't add any new coverage of emerging incident types at all."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A mid-sized e-commerce company is deciding between running its returns-processing assistant on a smaller, cheaper Claude model versus a larger, more expensive one. Internal testing shows the smaller model performs comparably on 90% of return requests but noticeably worse on complex multi-item, multi-reason return cases, which make up about 12% of volume.",
    question: "What is the most sound model-selection strategy given this data?",
    options: [
      "Use the smaller model for all requests, since it performs well on the large majority of cases",
      "Use the larger model for all requests, to avoid any risk of quality variance",
      "Route based on request complexity: use the smaller model for standard single-item returns and the larger model for complex multi-item, multi-reason cases, since this captures most of the cost savings while preserving quality where it matters most",
      "Alternate between the two models randomly to average out the cost and quality differences"
    ],
    correct: 2,
    explanation: "Complexity-based routing directly targets the finding: since the smaller model is comparable on the 88% of simple cases but weaker specifically on the 12% of complex cases, routing by complexity captures nearly all the available cost savings while protecting quality exactly where the data shows it's needed. Using the smaller model everywhere (A) accepts avoidable quality loss on a meaningful complex-case share, using the larger model everywhere (B) forgoes real, low-risk savings on the majority of volume, and random alternation (D) is arbitrary and provides no better outcome than either extreme applied uniformly."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national parcel-delivery company's route-planning agent runs multi-step tool calls (check traffic, check driver availability, optimize sequence, confirm with dispatcher). After adding a new capability (dynamic re-routing mid-day), the team wants to test for regressions without re-testing everything from scratch every time, since the full regression suite takes 14 hours to run.",
    question: "What is a sound way to structure testing to catch regressions efficiently going forward?",
    options: [
      "Only test the new dynamic re-routing capability, since that's what changed and the rest of the system is unlikely to be affected",
      "Maintain a fast-running 'smoke test' subset covering core critical paths for quick sign-off on every change, and reserve the full 14-hour regression suite for pre-release gates, running it before major releases rather than on every minor change",
      "Run the full 14-hour suite manually before every single code change, regardless of how minor",
      "Stop running the regression suite altogether since it takes too long to be practical"
    ],
    correct: 1,
    explanation: "A tiered testing strategy — a fast smoke-test subset for frequent, quick sign-off and a comprehensive suite reserved for pre-release gates — is the standard way to balance regression coverage against practical velocity constraints, especially in agentic systems where a new capability like dynamic re-routing can plausibly interact with existing tool-call sequences in non-obvious ways. Testing only the new capability in isolation (A) risks missing exactly those interaction effects, running the full 14-hour suite on every minor change (C) doesn't scale and will be abandoned in practice, and dropping regression testing altogether (D) removes a necessary safety net for a multi-step agentic system."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A car-insurance company's claims-intake assistant has a target of resolving 80% of claims without human escalation. After a prompt tweak intended to reduce unnecessary escalations, the escalation rate dropped from 22% to 14%, appearing to hit the target. A closer audit finds that some previously-escalated ambiguous claims are now being auto-resolved incorrectly.",
    question: "What does this scenario illustrate about optimizing toward a single target metric?",
    options: [
      "The 80% target was too ambitious and should simply be lowered to make it achievable without further changes",
      "Optimizing narrowly for the escalation-rate metric without a paired quality/accuracy safeguard can produce a superficially improved number while masking a real regression in outcome quality; the team should track escalation rate alongside an accuracy or correctness metric to catch this kind of trade-off",
      "The audit finding is unimportant since the primary target (escalation rate) was achieved",
      "The company should aim for 0% escalation to fully automate the process, since that is the ultimate cost-saving goal"
    ],
    correct: 1,
    explanation: "This is a textbook case of Goodhart's-law-style metric gaming: a single optimization target (escalation rate) was hit by pushing ambiguous cases toward auto-resolution rather than genuinely improving triage, producing worse outcomes that the target metric alone couldn't detect. The fix is to pair the efficiency metric with a quality/accuracy safeguard so a drop in one can't be traded away silently for the other. Lowering the target (A) doesn't address the underlying measurement gap, dismissing the audit finding (C) ignores direct evidence of harm, and pushing toward 0% escalation (D) would make the underlying problem dramatically worse, not better."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A multinational apparel retailer runs the same customer-service assistant across North America, Europe, and Southeast Asia, each with different consumer-protection regulations and return policies embedded via region-specific system prompts. The company is planning a base model upgrade and has a single global eval suite of 300 cases, roughly evenly split across the three regions.",
    question: "Is 300 cases split evenly across three regions an adequate basis for approving a global model upgrade?",
    options: [
      "Yes, since 100 cases per region is generally considered a large sample regardless of context",
      "It depends on whether those 100 cases per region adequately cover each region's distinct regulatory and policy edge cases; raw case count alone doesn't establish coverage, so the team should audit whether each region's highest-risk and most distinct scenarios (e.g., EU consumer-protection nuances) are actually represented before relying on the aggregate result",
      "No, because a global eval suite should never be split by region and should instead test only generic, region-agnostic scenarios",
      "Yes, but only if the same 100 cases are reused identically across all three regions for consistency"
    ],
    correct: 1,
    explanation: "Case count alone is a poor proxy for coverage adequacy — what matters is whether the cases in each region's subset actually probe that region's distinct regulatory and policy edge cases, since a model upgrade could regress in a way specific to, say, EU return-right nuances without showing up in North American or Southeast Asian cases. Assuming 100 is inherently enough (A) skips this qualitative check, avoiding regional splits altogether (C) would miss regionally distinct risks entirely, and reusing identical cases across regions (D) defeats the purpose of testing region-specific policy differences."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A subscription-box company's product-recommendation assistant needs a quick pre-launch quality check. The product manager wants results within two days, and there is no existing eval infrastructure.",
    question: "Given the tight timeline, what is a reasonable minimum viable testing approach?",
    options: [
      "Skip evaluation and launch directly, planning to fix issues based on customer complaints after launch",
      "Hand-write a modest set (e.g., 30-50) of realistic test cases covering the most common and highest-risk recommendation scenarios, have 1-2 domain-knowledgeable reviewers score outputs against clear pass/fail criteria, and treat this as a baseline to expand later rather than a final state",
      "Wait and delay the launch by several weeks until a full 500-case eval suite with automated grading infrastructure can be built",
      "Rely entirely on the model provider's general-purpose benchmark scores as a substitute for use-case-specific testing"
    ],
    correct: 1,
    explanation: "A right-sized, rapidly assembled eval set focused on common and high-risk scenarios is a reasonable minimum viable approach under a tight timeline, and framing it explicitly as a baseline to expand keeps expectations honest without blocking launch entirely. Skipping evaluation altogether (A) accepts unnecessary risk when even a small structured check is achievable in two days, delaying launch for a full mature suite (C) is disproportionate to the stated timeline constraint, and relying on generic provider benchmarks (D) doesn't tell you anything about this specific product-recommendation use case."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional airline's baggage-claim chatbot has been stable in production for a year. The team is about to roll out a new prompt intended to make responses more empathetic for delayed/lost baggage cases. Leadership asks whether a full A/B test is necessary for what seems like a minor tone change.",
    question: "What is the best justification for still running a structured test rather than deploying the tone change directly?",
    options: [
      "A structured test is unnecessary busywork for a purely cosmetic wording change and should be skipped",
      "Even tone and empathy changes can measurably affect outcomes like customer satisfaction, complaint escalation, or perceived resolution — these are testable and consequential effects, not purely cosmetic, so a structured test (even a lightweight one) is warranted to confirm the change helps rather than inadvertently reads as insincere or delays perceived resolution",
      "A structured test is required by regulation for any airline customer-facing system change",
      "A structured test is warranted only if the tone change also alters factual content, which it does not in this case"
    ],
    correct: 1,
    explanation: "Tone and empathy changes are not merely cosmetic — they can shift real outcomes like satisfaction, complaint rates, or whether customers feel their issue was taken seriously, and there's a genuine risk an empathy-focused rewrite reads as insincere or padded in a way that frustrates customers wanting a fast, concrete answer about their bag. That makes it a legitimate candidate for at least a lightweight structured test, not something to skip as a formality. It isn't about a regulatory mandate (C, not established in the scenario) and the presence or absence of factual content change (D) isn't the relevant bar — behavioral and satisfaction impact is."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A wealth-management firm's client-facing portfolio-summary assistant was evaluated pre-launch with a 95% pass rate on a rubric scored by financial advisors. Six months later, the compliance team asks how confident the firm can be that current production quality still matches that number, given no re-evaluation has occurred since launch and market conditions have changed significantly.",
    question: "What is the appropriate answer to the compliance team's question?",
    options: [
      "Full confidence — the 95% score is a durable measure of the system's quality regardless of time elapsed or changing conditions",
      "Low confidence in the current relevance of that number — a launch-time eval score is a snapshot, not a durable guarantee, especially when market conditions (which affect the substance of what the assistant is summarizing) have shifted; a fresh evaluation using current market scenarios and recent production samples is warranted",
      "The eval score is irrelevant to compliance concerns since compliance only cares about legal disclaimers, not output quality",
      "Full confidence, but only if the firm re-runs the exact same eval cases from launch without modification"
    ],
    correct: 1,
    explanation: "An eval score reflects performance against the conditions and data available at the time it was measured; when the underlying subject matter (market conditions) has materially shifted and no re-evaluation has occurred, the launch-time number provides limited assurance about current performance, making a fresh evaluation with current scenarios and production samples the responsible answer to give compliance. Claiming durable full confidence (A) misrepresents what a point-in-time eval score can promise, dismissing eval quality as irrelevant to compliance (C) misunderstands that output quality is very much a compliance concern for a financial advisory tool, and re-running the identical stale cases (D) wouldn't capture the new market conditions that are the actual concern here."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A national retail bank's fraud-alert-explanation assistant (which explains to fraud analysts why a transaction was flagged) is due for a quarterly model refresh. Historically, refreshes have been approved based on eval suite performance alone. This quarter, an analyst points out that the eval suite has no cases involving newer fraud patterns like synthetic identity schemes that emerged in the last two quarters.",
    question: "How should this gap change the bank's approach to approving this quarter's refresh?",
    options: [
      "It shouldn't change anything, since the eval suite has historically been a reliable gate and the analyst's concern is speculative",
      "The bank should add representative synthetic-identity-fraud cases to the eval suite before relying on it to gate this refresh, since approving a model change against a suite with a known, named coverage gap in an active and growing fraud pattern creates unassessed risk",
      "The bank should abandon eval-suite-based gating entirely and switch to gating purely on analyst intuition going forward",
      "The bank should delay indefinitely until a comprehensive eval suite covering all possible future fraud patterns can be built"
    ],
    correct: 1,
    explanation: "A known, specific, and named coverage gap — not a vague worry — in an eval suite used as a hard release gate is a concrete risk that should be closed before that gate is trusted again, especially for an actively growing fraud pattern with real financial stakes; adding representative cases is a proportionate and achievable fix. Ignoring the analyst's specific and well-grounded concern (A) accepts avoidable risk, abandoning structured evaluation for pure intuition (C) throws away a generally reliable process over one identified gap, and demanding comprehensive coverage of all conceivable future fraud patterns (D) sets an impossible and unnecessary bar when the immediate, known gap is what needs addressing."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A furniture e-commerce company's product-Q&A assistant needs a decision on acceptable latency. Current median response time is 2.1 seconds; a proposed larger-context-window feature (letting the assistant reference full product spec sheets) would raise median latency to about 4.5 seconds but improve answer completeness.",
    question: "What is the most sound way to decide whether this trade-off is acceptable?",
    options: [
      "Automatically reject the change, since any latency increase is unacceptable regardless of the accuracy benefit",
      "Automatically accept the change, since more complete answers are always worth any latency cost",
      "Evaluate the trade-off against user-facing impact: test whether the completeness improvement measurably affects business outcomes (e.g., conversion, satisfaction) and whether 4.5 seconds is within an acceptable range for this specific interaction context, rather than treating either metric as an absolute rule",
      "Split the difference by implementing the feature for half of all product categories arbitrarily, without further testing"
    ],
    correct: 2,
    explanation: "Latency and quality trade-offs should be evaluated against actual user-facing and business impact rather than treated as absolute, context-free rules — 4.5 seconds might be entirely acceptable for a considered furniture purchase decision where completeness matters, in a way it would not be for a quick chat-widget lookup, so the decision should be grounded in measured outcomes for this specific context. Rejecting any latency increase outright (A) ignores potential real value, accepting any quality gain regardless of latency cost (B) ignores a real user-experience cost, and an arbitrary category split with no evaluation (D) doesn't actually answer whether the trade-off is worthwhile."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A commercial real estate firm's lease-abstraction assistant extracts key terms (rent escalation clauses, renewal options, termination rights) from lease documents. The eval suite currently only checks whether the extracted values match ground truth, not whether the assistant flagged its own uncertainty when a clause was ambiguous or poorly scanned.",
    question: "What is the most important gap to add to this eval suite?",
    options: [
      "Whether the assistant's summary uses professional, formal language",
      "Whether the assistant appropriately signals low confidence or requests human review on ambiguous or poor-quality source documents, rather than confidently outputting a guess as if it were certain — since silent overconfidence on unclear inputs is a distinct and important failure mode from simple extraction accuracy",
      "Whether the assistant processes documents faster than a human paralegal",
      "Whether the assistant's formatting matches the firm's document template exactly"
    ],
    correct: 1,
    explanation: "For an extraction task on real-world scanned/ambiguous documents, calibrated uncertainty is a distinct and critical property from raw accuracy: a system that guesses confidently on unclear source material is more dangerous than one that flags uncertainty, because silent errors are far harder to catch downstream in a legal/financial context like lease terms. Formal language (A), processing speed (C), and template formatting (D) are all secondary concerns that don't address the core risk of confidently wrong output going unflagged."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A video-game studio's live-ops assistant generates daily patch-note summaries for players. The studio recently switched to a cheaper model to cut costs, relying on the fact that the eval suite score dropped by only 1.5 points (from 91 to 89.5) as evidence the switch was safe.",
    question: "What additional check would most strengthen confidence in this cost-saving decision?",
    options: [
      "None — a 1.5-point drop on a 100-point scale is self-evidently negligible in any context",
      "A qualitative review of what changed within that 1.5-point gap (are the failures spread evenly and minor, or concentrated in specific categories like accuracy of numeric balance changes, which players are highly sensitive to?), since aggregate point differences can obscure whether the specific failures matter disproportionately to players",
      "Switching to an even cheaper model, since a small aggregate drop suggests there is room for further cost-cutting",
      "Re-running the exact same eval suite a second time to see if the score is reproducible"
    ],
    correct: 1,
    explanation: "A small aggregate point drop can still hide a concentrated regression in a category that matters disproportionately — for a patch-note summarizer, players are especially sensitive to numeric balance-change accuracy, and a model that got slightly worse specifically there could cause real community backlash even though the overall score barely moved. Treating the aggregate drop as automatically negligible (A) skips this qualitative check, pushing to an even cheaper model based on the same shallow read (C) compounds the risk, and simple reproducibility re-testing (D) checks measurement stability but doesn't address what's actually driving the score difference."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A national pharmacy chain's medication-interaction-check assistant is scheduled for a prompt update meant to reduce false-positive interaction warnings, which pharmacists have complained cause alert fatigue. Historical data shows the assistant currently flags interactions at a rate that produces roughly 1 true positive for every 9 false positives.",
    question: "What is the central risk the team must guard against when tuning down the false-positive rate for this system?",
    options: [
      "That pharmacists will become less experienced over time as the system does more of the work",
      "That reducing false positives too aggressively could also suppress true positives (missed real interactions), so any threshold change must be evaluated specifically on its true-positive/recall impact, not just on how much it reduces false alarms, and validated against a rigorous set of known true-interaction cases",
      "That the change will increase the assistant's response latency",
      "That pharmacists will stop using the tool altogether regardless of the false-positive rate"
    ],
    correct: 1,
    explanation: "Precision and recall typically trade off against each other, so any change explicitly aimed at cutting false positives carries real risk of also suppressing true positives (missed genuine drug interactions) unless it's specifically validated on recall using a solid set of known true-interaction cases — in a medication-safety context, a missed true interaction is far more dangerous than an extra false alarm. Pharmacist skill erosion (A) and latency (C) are not the central risk this specific change introduces, and assuming pharmacists will abandon the tool regardless of outcome (D) isn't the direct safety concern raised by this particular tuning decision."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A mid-size SaaS company is setting up its very first structured evaluation process for a Claude-based internal tool.",
    question: "Which of these is a basic best practice for maintaining eval suite integrity over time?",
    options: [
      "Never update the eval suite once created, to preserve consistent historical comparison",
      "Periodically review and refresh the eval suite to reflect changes in usage patterns, known failure modes, and product scope, while preserving version history so comparisons across time remain meaningful",
      "Let each individual engineer maintain a private, personal copy of the eval suite for their own use",
      "Delete old eval cases as soon as the system passes them, to keep the suite lean"
    ],
    correct: 1,
    explanation: "Eval suites need periodic refresh to stay representative of evolving usage and known failure modes, while keeping versioned history so teams can still make meaningful before/after comparisons rather than losing all historical context. Never updating the suite (A) leads directly to the eval/production drift problem, letting engineers maintain private forks (C) fragments the source of truth and undermines consistent measurement, and deleting cases once passed (D) removes exactly the regression protection a suite is meant to provide."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional utility's outage-chatbot for customers reports being 'evaluated weekly' by the team, but on inspection, the same 25 test questions have been reused verbatim every week for the past year, and the team has begun to unconsciously tune prompts to specifically improve performance on those exact 25 questions.",
    question: "What problem has emerged in this team's evaluation practice, and what should they do?",
    options: [
      "None — weekly cadence is what matters, and the specific content of the test set is a secondary concern",
      "The eval set has effectively become a target the prompts are being over-optimized for rather than an independent measure of general quality (a form of overfitting to the eval); the team should introduce a held-out set of cases never used for prompt tuning, reserved purely for unbiased measurement",
      "The team should increase the frequency of evaluation to daily, using the same 25 questions, to catch problems faster",
      "The team should discard structured evaluation and rely on the support team's general impression of quality"
    ],
    correct: 1,
    explanation: "When the same fixed test set is repeatedly used both to guide tuning decisions and to measure success, the measurement stops being independent — the team is effectively fitting to the test, which is the eval equivalent of overfitting, and scores can look great while general quality does not actually improve. The fix is a held-out set never used for tuning, reserved purely for unbiased measurement. Cadence alone (A, C) doesn't address the independence problem, and abandoning structured evaluation (D) discards a fixable process for something far less rigorous."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A specialty food e-commerce brand's chat assistant handles both simple order-status questions and complex custom-order modification requests. Leadership wants a single quality score to report to the board each month.",
    question: "What is the main risk of reducing evaluation to a single blended quality score for board reporting?",
    options: [
      "There is no risk; a single number is always clearer and more actionable for leadership than any breakdown",
      "A single blended score, dominated by the high volume of simple order-status questions, could mask poor performance on the lower-volume but higher-stakes custom-order modification requests, giving leadership false confidence; a supplementary breakdown by request type should accompany the headline number",
      "Board members are generally unable to interpret quality metrics of any kind, so a detailed breakdown would be wasted effort",
      "The main risk is that a single score takes too long to compute compared to a full breakdown"
    ],
    correct: 1,
    explanation: "When request types have very different volumes and stakes, a blended score is dominated by whichever type is most common — here, simple order-status questions — and can look reassuring even while a smaller, higher-consequence segment like custom-order modifications is quietly underperforming. Providing a supplementary breakdown alongside the headline number preserves clarity for leadership while surfacing the risk a single number would hide. Assuming no risk exists (A) misses this masking effect, assuming board members can't handle any detail (C) is an unfounded generalization, and computation time (D) is not the substantive issue with this approach."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A national auto-insurance carrier is preparing to migrate its claims-adjuster assistant to a new model version. Legal requires documented evidence of a testing process before sign-off. The engineering team proposes running the new model against the existing eval suite and providing the aggregate score as the sole piece of documentation.",
    question: "What is missing from this proposed documentation that legal is likely to require?",
    options: [
      "Nothing is missing; an aggregate score with a passing threshold is universally sufficient documentation for any regulated migration",
      "A record of what was tested (suite composition and coverage), how the decision threshold was set and why, category-level results (especially for high-risk categories), who reviewed and approved the results, and how any identified gaps were handled — a bare aggregate number without this context provides little audit trail",
      "A signed statement from the model provider guaranteeing zero errors going forward",
      "Proof that the new model is cheaper than the old one, since cost is the primary consideration for legal sign-off"
    ],
    correct: 1,
    explanation: "Legal and audit-grade documentation for a regulated migration needs traceability: what was actually tested and why it's considered adequate coverage, category-level breakdowns for high-risk areas, an explicit and justified threshold, reviewer sign-off, and how any gaps were resolved — a lone aggregate number provides essentially no audit trail if something goes wrong later. Expecting a vendor guarantee of zero errors (C) is neither realistic nor something any vendor would provide, and cost (D) is not the basis for a legal/compliance sign-off on a claims-processing system's accuracy and risk profile."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A B2B logistics software company wants to compare Claude model versions for its shipment-document-parsing feature. They plan to run 15 test documents through each model version and pick whichever scores higher.",
    question: "What is the primary weakness of this testing plan?",
    options: [
      "Fifteen documents is likely too small a sample to draw a statistically confident conclusion about which model version is genuinely better, especially if the score difference between them is modest",
      "There is no weakness; any sample size is adequate as long as both models are tested on the identical documents",
      "The plan's weakness is that it doesn't test on documents in multiple languages",
      "The plan's weakness is that it doesn't measure response latency alongside accuracy"
    ],
    correct: 0,
    explanation: "With only 15 documents, a modest score difference between two model versions could easily be noise rather than a genuine capability difference; without an adequately sized sample (or a explicit acknowledgment of the resulting uncertainty), picking 'whichever scores higher' risks a decision that doesn't generalize. Using identical documents across both models (B) is actually a reasonable practice, not a flaw, and language coverage (C) or latency measurement (D) may be reasonable additions but are not the primary structural weakness of a 15-document comparison."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national nonprofit hotline uses a Claude-based intake assistant to triage caller messages (submitted via chat) by urgency level before routing to human counselors. The eval suite currently tests urgency classification accuracy on transcripts of past calls, but a board member asks whether the eval reflects how the system performs in real time during a live conversation, where context builds progressively.",
    question: "What legitimate concern is the board member raising about the eval methodology?",
    options: [
      "None — testing on complete past transcripts is equivalent to testing on live, in-progress conversations, since the underlying assistant logic is the same",
      "Testing exclusively on complete transcripts may not capture how the system performs on incomplete, in-progress conversations, where urgency signals may be ambiguous or only partially revealed early on — which is precisely the moment triage decisions often need to be made in a live hotline setting",
      "The board member's concern is about system latency, which is unrelated to urgency classification accuracy",
      "The board member is really asking whether the system has been tested in multiple languages"
    ],
    correct: 1,
    explanation: "Evaluating only on complete, finished transcripts tests a fundamentally different scenario from live triage, where the system may need to assess urgency from a partial, evolving conversation — exactly the situation this hotline actually operates in, and where signals can be more ambiguous. This is a legitimate and specific coverage gap distinct from a general 'more testing is always better' concern. It is not about latency (C) or language coverage (D), which are different issues than the one the board member actually raised, and dismissing the concern as equivalent to full-transcript testing (A) misses the real distinction between complete and in-progress context."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A commercial airline's crew-scheduling assistant automates parts of a previously manual scheduling workflow. The rollout plan calls for a two-week parallel run where the assistant's recommendations are generated but not acted on, while human schedulers continue working as before and a comparison is made afterward.",
    question: "What is the main benefit of this parallel-run testing approach compared to a direct cutover?",
    options: [
      "It eliminates the need for any eval suite prior to the parallel run",
      "It allows the team to observe how the assistant performs against real, current operational conditions and compare its recommendations directly to what experienced human schedulers actually did, surfacing gaps before any real schedule is affected by the assistant's decisions",
      "It guarantees the assistant will outperform human schedulers by the end of the two weeks",
      "It removes the need for any human scheduler involvement going forward, since the parallel run substitutes for their ongoing role"
    ],
    correct: 1,
    explanation: "A parallel/shadow run lets the team validate the assistant against real, current conditions and directly benchmark its recommendations against what experienced humans actually chose, all without any operational risk since human decisions are still the ones acted on — this surfaces gaps safely before real schedules are ever affected. It doesn't replace the need for an eval suite beforehand (A), doesn't guarantee an outcome (C), and doesn't imply humans should be removed from the loop going forward (D), which isn't a decision this testing phase alone can support."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A multinational consumer goods manufacturer's Claude-based quality-control-report assistant summarizes factory inspection data across 22 plants worldwide. Each plant reports different defect taxonomies. After a global prompt update, the aggregate eval score across all plants combined improved by 4 points, but a plant manager in Vietnam reports the summaries have become noticeably less useful for that plant's specific defect categories.",
    question: "What is the most likely explanation, and what should the team investigate?",
    options: [
      "The plant manager is simply unfamiliar with the new prompt format and needs training, not further investigation",
      "The aggregate improvement may be driven by gains concentrated in plants with taxonomies well-represented in the eval suite, while masking a regression for plants (like Vietnam) whose specific defect categories are underrepresented; the team should break down eval results by plant/taxonomy rather than relying on the single aggregate figure",
      "The 4-point aggregate improvement should be treated as conclusive proof that all 22 plants improved equally",
      "The prompt update should be reverted globally immediately based on this one plant's report, without further analysis"
    ],
    correct: 1,
    explanation: "An aggregate score across 22 plants with different defect taxonomies can easily be pulled upward by disproportionate gains in well-represented plants while concealing a regression in an underrepresented one like Vietnam — this is the same masking risk that affects any blended metric over a heterogeneous population, and the fix is to break results down by plant/taxonomy rather than trust the single number. Assuming the manager just needs training (A) dismisses a specific, plausible technical complaint without checking, treating the aggregate as proof of uniform improvement (C) is precisely the error being illustrated, and reverting globally on one report without analysis (D) is a disproportionate reaction that could sacrifice real gains at the other 21 plants."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A ride-hailing company's driver-support chatbot handles disputes about fare calculations. The team is deciding what counts as an acceptable resolution-accuracy threshold before expanding the chatbot's autonomy to approve refunds up to $15 without human review.",
    question: "What is the most appropriate way to set this threshold?",
    options: [
      "Set the threshold based on what other companies in unrelated industries use for unrelated products",
      "Base the threshold on the specific financial and trust impact of an error at this autonomy level (a wrong $15 refund decision, multiplied across expected volume) and require it be validated against a representative eval set of real fare disputes before granting autonomous approval authority",
      "Set no threshold at all, and allow the chatbot autonomy immediately, since $15 is a small amount per case",
      "Set the threshold arbitrarily at 100% accuracy, since any error at all is unacceptable when money is involved"
    ],
    correct: 1,
    explanation: "The right threshold is grounded in the specific stakes of this exact decision — a bounded per-case dollar amount multiplied by expected volume — validated against a representative eval set of real disputes, since that ties the bar to actual business risk rather than an arbitrary number. Borrowing a threshold from unrelated products (A) ignores this system's specific risk profile, granting autonomy without any threshold (C) ignores that errors compound at volume even at low per-case amounts, and demanding 100% accuracy (D) is an unrealistic bar for any LLM-based system and would block automation that could still be net-beneficial at a well-chosen threshold below perfection."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A digital publishing company uses Claude to auto-generate article summaries for its homepage. After switching to a new, faster model to cut latency, homepage engagement metrics dropped 6% over the following two weeks, but the eval suite (which scores summary accuracy and readability) showed no change.",
    question: "What should the team investigate as a likely explanation for this discrepancy?",
    options: [
      "Whether the eval suite is measuring dimensions (accuracy, readability) that don't capture what actually drives homepage engagement, such as how compelling or attention-grabbing the summary phrasing is — a dimension the current suite may not assess at all",
      "Assume the engagement drop is unrelated to the model switch and investigate unrelated marketing factors exclusively",
      "Conclude the eval suite is broken and discard it without further analysis",
      "Increase the model's speed further, assuming faster is always better for engagement"
    ],
    correct: 0,
    explanation: "The eval suite tests accuracy and readability, but homepage engagement is likely driven by a different quality — how compelling or attention-grabbing a summary is — which the current rubric may not measure at all; a summary can be accurate and readable while still being flat and unlikely to draw a click. This is a coverage gap in what's being evaluated, not evidence the suite is broken (C) or that the cause is unrelated to the model change (B), which would be premature given the clear timing correlation. Increasing speed further without diagnosing the actual cause (D) doesn't address the identified problem at all."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national telehealth pharmacy's medication-reminder message generator is inexpensive to run and has performed reliably for two years. The vendor now offers a substantially more capable (and more expensive) model. A product manager proposes upgrading 'to stay current with the latest technology.'",
    question: "What should the team do before approving this upgrade?",
    options: [
      "Approve the upgrade immediately, since staying on the newest available model is inherently good practice",
      "Determine whether the current system has any documented quality gaps or unmet needs that a more capable model would actually address, since upgrading a well-performing, low-stakes system purely for its own sake adds cost without a demonstrated benefit",
      "Reject the upgrade permanently, since the current model has worked for two years and should never be changed",
      "Approve the upgrade only if it is offered at no additional cost"
    ],
    correct: 1,
    explanation: "Model upgrades should be justified by a demonstrated gap or unmet need, not adopted reflexively for being newer — for a low-complexity, well-performing use case like medication reminders, a more expensive model is unlikely to deliver benefit proportional to its cost unless a specific problem is identified that it would solve. Approving reflexively (A) treats novelty as sufficient justification, permanently rejecting any future change (C) is an overcorrection that ignores that circumstances or needs could change, and conditioning approval solely on price (D) ignores whether the capability is needed at all, regardless of cost."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A defense-adjacent logistics contractor's Claude-based shipment-manifest-review assistant operates in a classified environment where production traffic cannot be logged or exported for eval purposes due to security restrictions. The team has been unable to build an eval suite from real production cases as a result.",
    question: "Given this constraint, what is the most sound path to building a credible eval suite?",
    options: [
      "Give up on structured evaluation entirely, since production data access is impossible",
      "Work with cleared subject-matter experts to construct realistic synthetic or declassified/redacted test cases that represent the actual task distribution as closely as possible within the security constraints, and pair this with in-environment human review processes that can operate under the same restrictions as production",
      "Use an unrelated public dataset of shipment manifests as a full substitute, regardless of how well it matches the actual task",
      "Request an exception to remove all security restrictions specifically for the purpose of building the eval suite"
    ],
    correct: 1,
    explanation: "When direct production data access is blocked by legitimate security constraints, the sound path is to work within those constraints — using cleared experts to build representative synthetic or properly sanitized cases, and supplementing with in-environment human review that respects the same restrictions — rather than abandoning evaluation or working around security controls. Giving up entirely (A) leaves a safety-critical system with no quality assurance process, substituting an unrelated public dataset (C) doesn't represent the actual task distribution and provides false confidence, and requesting a blanket exception to remove security restrictions (D) is neither realistic nor appropriate given the stated constraints."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A large agritech company's crop-disease-diagnosis assistant (used by field agronomists via photo + text description) shows a 12% higher accuracy on evaluation when tested with the same well-lit, well-composed sample images used during development, compared to a random sample of real photos submitted by agronomists in the field (which include blurry, poorly lit, or partially obscured images).",
    question: "What should this accuracy gap prompt the team to do?",
    options: [
      "Nothing — the development sample images represent the intended standard for photo submission and are the correct basis for the eval score",
      "Recognize that the eval score based on curated images is likely overstating real-world performance, and rebuild the primary eval benchmark using a representative sample of actual field-submitted photos (including lower-quality ones), since that is the true operating distribution",
      "Instruct agronomists to only submit well-lit, well-composed photos going forward, and treat any other submissions as user error",
      "Report only the higher accuracy figure (from curated images) to leadership, since it reflects the system's best-case capability"
    ],
    correct: 1,
    explanation: "An eval benchmark built on curated, best-case images doesn't represent the actual operating distribution field agronomists produce, so it systematically overstates real-world performance; the fix is to rebuild the primary benchmark using a representative sample of real field submissions, including the lower-quality ones that are clearly common in practice. Treating the curated sample as the correct standard (A) ignores that real users can't reliably produce studio-quality photos in the field, instructing agronomists to change their behavior (C) is unrealistic given field conditions and doesn't fix the eval's representativeness, and reporting only the flattering figure to leadership (D) is a misleading characterization of true system performance."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A hotel booking platform's cancellation-policy explainer chatbot is being tested with two prompt variants. The team plans to declare a winner as soon as one variant is numerically ahead, checking the results every few hours.",
    question: "What is the risk with this 'check frequently and stop as soon as ahead' approach?",
    options: [
      "There is no risk, since checking more frequently only provides more information and can only improve decision quality",
      "Frequent, informal peeking at results and stopping as soon as one variant appears ahead substantially increases the chance of declaring a winner based on random early fluctuation rather than a genuine, stable difference, unless a formal method designed for repeated looks (like sequential testing) is used",
      "The risk is entirely about increased computing cost from running the test longer, not about statistical validity",
      "The risk only applies to tests with fewer than 100 total participants, so it doesn't matter at this platform's scale"
    ],
    correct: 1,
    explanation: "Repeatedly checking results and stopping the moment one variant looks ahead is a classic way to inflate the false-positive rate, because early data is noisier and a lead can easily reverse with more data; this requires either a pre-committed sample size and fixed check point, or a formal sequential-testing method designed to control error rates under repeated looks. Framing more information as strictly beneficial (A) misses that the informal stopping rule itself introduces bias, describing the issue purely as a cost concern (C) misidentifies the real risk as statistical rather than financial, and claiming the issue only matters below a certain scale (D) is not correct — the bias from informal peeking exists regardless of overall test size."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A workers'-compensation insurer's claims-narrative assistant is due for its annual model refresh. The evaluation team wants to also account for the fact that claim-type mix has shifted over the past year (a 15% increase in remote-work-related injury claims, a new and legally complex category). The current eval suite has only 3 out of 120 cases covering remote-work injury claims.",
    question: "What should the eval suite update prioritize given this shift?",
    options: [
      "Leave the proportion unchanged, since 3 cases were sufficient last year and the suite has otherwise been reliable",
      "Rebalance the eval suite so that the proportion of remote-work-injury cases better reflects their new share of actual claim volume and legal complexity, adding enough cases to meaningfully assess performance on this now-significant and legally complex category",
      "Remove remote-work-injury cases from the eval suite entirely, since they are a newer and less-established category with less historical precedent",
      "Add exactly one additional remote-work-injury case, since that doubles the previous coverage and is proportionally significant"
    ],
    correct: 1,
    explanation: "Eval suite composition should track the real distribution and stakes of production traffic; a claim type that has grown to 15% of volume and carries elevated legal complexity is underrepresented at roughly 2.5% of the eval suite, and that gap should be closed with enough cases to give a meaningful read on this now-significant category. Leaving it unchanged (A) ignores a documented shift in the underlying task distribution, removing the category (C) is the opposite of what's needed and would eliminate visibility into a growing risk area, and adding just one more case (D) is a token gesture that still leaves the category badly underrepresented relative to its actual share and complexity."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A gaming company's anti-cheat-report assistant reviews player-submitted reports and drafts recommended actions (warning, suspension, ban) for a human moderator to approve. The team is deciding whether human review should be required for every recommendation or only for the more severe actions (suspension, ban).",
    question: "What is the most defensible design, assuming warnings are easily reversible and bans are not?",
    options: [
      "Require human review for every single recommendation regardless of severity, since consistency of process is more important than efficiency",
      "Require human review scaled to the severity and reversibility of the action: allow low-severity, easily reversible actions (like warnings) to proceed with lighter or sampled review, while requiring full human review before any hard-to-reverse action like a suspension or ban is finalized",
      "Require no human review at all for any action, to maximize moderation throughput",
      "Require human review only for warnings, since bans are rare and therefore lower overall risk in aggregate"
    ],
    correct: 1,
    explanation: "Scaling review rigor to the severity and reversibility of the action is the standard, defensible design: low-stakes, reversible actions can tolerate lighter review to preserve efficiency, while irreversible or high-consequence actions like a ban warrant full human sign-off before being finalized, since a wrongful ban can cause significant harm and be hard to undo. Requiring full review on every action regardless of stakes (A) sacrifices efficiency without a proportional safety benefit on low-risk actions, no review at all (C) removes safeguards precisely where they matter most, and reviewing only the low-stakes warnings while leaving high-stakes bans unreviewed (D) inverts the correct risk-based logic entirely."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national moving-and-storage company's customer-quote assistant generates preliminary cost estimates. The company wants to test a new prompt version but has strong regional seasonality (much higher volume and different job types in summer than winter), and it is currently mid-winter.",
    question: "What is the most important consideration for interpreting an A/B test run only during this winter period?",
    options: [
      "The results can be assumed to generalize equally well to summer conditions, since the underlying prompt logic doesn't reference the season explicitly",
      "The results should be understood as representative primarily of winter-season job types and volumes, and the team should treat generalization to summer conditions with caution, potentially planning a follow-up validation closer to or during peak season before fully committing to the change year-round",
      "The test should be discarded entirely and postponed until summer, since no useful information can come from an off-peak test",
      "The test's seasonal timing is irrelevant as long as the statistical significance threshold is met"
    ],
    correct: 1,
    explanation: "Strong seasonality in job type and volume means a winter-only test primarily validates winter conditions, and it would be a mistake to assume that automatically generalizes to a summer mix of jobs and volume without at least flagging the limitation and planning a follow-up check before full year-round commitment. Assuming full generalization by default (A) ignores a known confound, discarding the test entirely (C) throws away real, still-useful information about winter performance, and treating statistical significance as sufficient regardless of seasonal context (D) conflates statistical validity within the tested period with generalizability across a materially different one."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A systemically important bank's Claude-based anti-money-laundering (AML) alert-narrative assistant has a regulator-mandated requirement that any model change undergo independent validation before deployment. The internal ML team, which built and tuned the new model version, also wants to conduct the independent validation to save time, arguing they know the system best and can move faster than an external or separate internal team.",
    question: "What is the most significant flaw in the internal ML team's proposal, and what should the bank do instead?",
    options: [
      "There is no flaw; the team that built the system is always best positioned to validate it, and speed is the primary consideration under regulatory deadlines",
      "The proposal undermines the independence requirement itself — a team validating its own work has inherent incentive and confirmation-bias risk (consciously or not) to find the model acceptable, which is precisely what independent validation is designed to guard against; the bank should use a genuinely separate team or function (e.g., model risk management or an external validator) even if it is somewhat slower",
      "The proposal is acceptable as long as the internal ML team documents their conflict of interest in the final report",
      "The proposal should be rejected outright and no validation should occur until a full three-year audit cycle is completed"
    ],
    correct: 1,
    explanation: "Independent validation exists specifically to counteract the incentive and confirmation-bias risks inherent when a team assesses its own work — even well-intentioned engineers can unconsciously favor conclusions that validate their effort, which is exactly the scenario the regulatory requirement is designed to prevent; genuine independence (a separate model risk function or external validator) is not optional even under time pressure. Accepting the team's self-assessment as sufficient (A) defeats the purpose of the requirement entirely, merely disclosing the conflict of interest without addressing it (C) doesn't restore actual independence, and demanding an unrelated multi-year audit cycle (D) is a disproportionate and impractical response that doesn't match the specific, addressable problem identified."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A ski resort chain's guest-services chatbot handles weather-dependent questions (lift status, trail conditions, closures). The eval suite was built and validated entirely during the summer off-season using synthetic scenarios written by the product team, since no real winter conversation data existed yet at build time.",
    question: "What should the team do once the first winter season of real usage data becomes available?",
    options: [
      "Nothing — the synthetic eval suite was carefully built and should remain the permanent basis for ongoing evaluation",
      "Use the first season's real winter conversation data to validate and refine the synthetic eval suite, checking whether real guest questions and failure patterns match what the synthetic scenarios anticipated, and update the suite to close any gaps that emerge",
      "Discard the synthetic eval suite immediately as worthless, since it wasn't built from real data",
      "Wait for three full winter seasons of data before making any changes to the eval suite, to ensure a large enough sample"
    ],
    correct: 1,
    explanation: "A synthetic eval suite built without real usage data is a reasonable starting point but an untested hypothesis about what real conversations look like; the first season of actual data is exactly the evidence needed to check that hypothesis and refine the suite where real patterns diverge from what was anticipated. Treating the synthetic suite as permanently sufficient (A) ignores now-available real evidence, discarding it as worthless (C) throws away a suite that may still be largely valid and simply needs refinement, and waiting three full seasons (D) unnecessarily delays an improvement that can begin immediately with the first season's data."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A used-car marketplace's vehicle-description generator is being A/B tested. Test A ran for 3 days with 12,000 impressions per variant; the marketing lead wants to end the test now and declare a winner because 'the sample is already in the thousands, which sounds like plenty.'",
    question: "What additional factor, beyond raw impression count, should determine whether it's appropriate to end the test now?",
    options: [
      "Whether the observed effect size and variance produce adequate statistical power at the current sample size for the minimum meaningful difference the business cares about — raw impression count alone doesn't guarantee this",
      "Whether the marketing lead personally feels confident in the result",
      "Whether 12,000 is a round enough number to report cleanly to stakeholders",
      "Whether the test has run for at least 3 calendar days, regardless of impression count or effect size"
    ],
    correct: 0,
    explanation: "Adequate sample size for statistical confidence depends on the actual effect size, outcome variance, and the minimum difference that matters to the business, not on whether the raw impression count sounds large; two tests with identical impression counts can have very different statistical power depending on how noisy the outcome metric is and how small the effect is. Personal confidence (B), how round the number looks (C), and elapsed calendar time alone (D) are not valid substitutes for a proper power calculation."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national pest-control franchise's service-scheduling assistant was evaluated and approved using test cases written entirely in formal, grammatically standard English. Six months into production, the team discovers that a significant share of real customer messages contain typos, abbreviations, and informal phrasing typical of quick mobile texting.",
    question: "What should the team conclude about the original evaluation, and what should they do?",
    options: [
      "The original evaluation remains fully valid, since correct grammar is not something the assistant should be expected to compensate for",
      "The original evaluation likely overestimated real-world robustness by testing on cleaner input than production actually contains; the team should add test cases reflecting realistic informal, typo-laden input to assess and improve robustness to this common real-world pattern",
      "The team should require customers to write in formal English before their messages are processed",
      "The team should discard the case entirely, since typo-laden input is unpredictable and therefore not testable"
    ],
    correct: 1,
    explanation: "Testing exclusively on clean, formal input measures a best-case scenario that doesn't reflect how real customers actually text, especially in a mobile scheduling context — this is a representativeness gap in the eval, not a reason to expect customers to change their behavior. Adding realistic informal test cases lets the team both measure and improve actual robustness. Declaring the original eval still fully valid (A) ignores the mismatch with real usage, requiring formal English from customers (C) is impractical and shifts a system limitation onto users, and treating informal input as untestable (D) is incorrect — realistic informal cases can absolutely be constructed and scored."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national title-insurance company's document-review assistant flags potential title defects for attorney review. The team is choosing between two candidate prompt versions: Version X has higher overall accuracy but occasionally produces a defect explanation that is technically correct but confusingly worded, sometimes requiring the reviewing attorney to re-read source documents to confirm. Version Y has slightly lower accuracy but consistently clear, well-structured explanations.",
    question: "What is the most important additional factor to weigh before choosing between these two versions?",
    options: [
      "Accuracy is the only relevant factor, so Version X should be chosen without further analysis",
      "The downstream cost of Version X's occasional confusing explanations — specifically, the added attorney review time and risk of misinterpretation — should be weighed against its accuracy advantage, since a technically correct but poorly communicated flag can still lead to a wrong or delayed real-world decision",
      "Clarity is inherently more important than accuracy in any evaluation context, so Version Y should be chosen without further analysis",
      "The choice should be made by whichever version was cheaper to develop"
    ],
    correct: 1,
    explanation: "Raw accuracy doesn't capture the full picture when a correct-but-confusing explanation can itself cause downstream errors (an attorney misreading or misprioritizing a flag) or added cost (extra review time); the right comparison weighs the accuracy delta against this realistic downstream impact, not either dimension in isolation. Defaulting to whichever factor sounds more important in the abstract (A or C) skips the actual trade-off analysis, and development cost (D) is irrelevant to which version produces better real-world outcomes now."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A national grocery chain's supply-forecasting assistant is used by regional buyers to adjust orders. After a cost-driven switch to a smaller model, the eval suite (testing forecast accuracy against historical demand data) showed only a 0.5% accuracy drop, well within the team's pre-agreed tolerance. Three months later, several regional buyers report a pattern of the assistant being noticeably worse at anticipating demand spikes around local events (fairs, festivals) not present in the historical training window used to build the eval set.",
    question: "What does this reveal about the eval suite's design, and what is the appropriate response?",
    options: [
      "The 0.5% accuracy result should be treated as fully conclusive, and the regional buyers' reports should be dismissed as anecdotal noise",
      "The eval suite's historical demand data likely underrepresented irregular, event-driven demand spikes relative to their real operational importance, so a small aggregate accuracy drop could still coincide with a meaningful regression specifically on these harder, high-impact cases; the team should build a dedicated eval subset for event-driven demand scenarios and assess the smaller model there specifically",
      "The switch to a smaller model should be reversed immediately without any further category-specific analysis, based on the volume of buyer complaints alone",
      "The team should stop forecasting for any event-driven periods going forward, since they are inherently unpredictable"
    ],
    correct: 1,
    explanation: "A small aggregate accuracy change can still coincide with a real, concentrated regression in a harder subcategory if that subcategory was underrepresented in the eval data relative to its real operational stakes — event-driven demand spikes are exactly this kind of high-impact, likely underrepresented case in typical historical training/eval windows. The right move is a dedicated eval subset to directly test and quantify this, not dismissing the reports (A), reverting immediately without diagnosis (C), or giving up on forecasting these periods altogether (D), which would abandon a solvable measurement problem."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A boutique fitness-apparel e-commerce brand runs a small operation and wants to evaluate its size-recommendation chatbot but has limited engineering resources and only about 200 orders per week.",
    question: "Given these resource constraints, what is a reasonable, right-sized evaluation approach?",
    options: [
      "Forgo evaluation because the company is too small to justify the effort",
      "Attempt to replicate a large enterprise's full evaluation infrastructure regardless of the mismatch in scale and resources",
      "Track a small number of concrete, easy-to-measure proxy signals (e.g., return rate attributed to sizing issues, customer-reported sizing complaints) alongside periodic manual review of a sample of chatbot conversations, scaled to what the team can realistically sustain",
      "Rely solely on the chatbot's own self-reported confidence scores as the complete evaluation method"
    ],
    correct: 2,
    explanation: "For a small operation, the right approach is proportionate: a few concrete, low-effort proxy signals (like sizing-related returns) combined with periodic manual spot review gives real, actionable signal without requiring infrastructure the team can't sustain. Skipping evaluation entirely (A) leaves the business blind to a metric (sizing accuracy) that directly affects returns and revenue, copying enterprise-scale infrastructure (B) is a poor resource fit, and relying solely on the system's own self-reported confidence (D) is not an independent or reliable measure of actual accuracy."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A metropolitan transit authority's rider-assistance chatbot answers questions about routes, delays, and accessibility accommodations. The eval suite currently weighs all question categories equally when computing the overall pass rate, even though accessibility-related questions represent only 4% of volume but serve riders with disabilities who have few alternative ways to get this information quickly.",
    question: "What is the strongest argument for giving accessibility-related questions more weight in the evaluation, despite their low volume?",
    options: [
      "Equal weighting by category is always the fairest and most defensible statistical approach, regardless of context, so no change is needed",
      "Volume alone doesn't capture the real-world stakes of a category; for riders with disabilities who may have limited alternative means of getting accurate accessibility information, an error is disproportionately consequential relative to its share of overall traffic, which justifies weighting the eval to reflect that elevated importance rather than raw frequency alone",
      "Accessibility questions should be weighted more heavily purely to improve the assistant's aggregate score for public relations purposes",
      "Low-volume categories should generally be excluded from evaluation entirely to focus resources on higher-traffic categories"
    ],
    correct: 1,
    explanation: "Weighting decisions in an eval suite should reflect real-world stakes and consequence of failure, not just traffic share — a low-volume category serving a population with fewer alternative resources and higher dependency on accurate answers can justify disproportionate weight precisely because failures there are more consequential, not because of raw frequency. Insisting on equal weighting regardless of context (A) ignores this legitimate stakes-based argument, treating it as a PR consideration (C) mischaracterizes the actual justification, and excluding low-volume categories from evaluation altogether (D) is the opposite of what's warranted here."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A large pension-fund administrator's beneficiary-inquiry assistant is being migrated to a new model. The QA team ran the full eval suite and it passed, but noticed that response times for the new model are highly variable: most responses return in under 2 seconds, but roughly 3% take over 15 seconds, occasionally triggering a timeout in the front-end chat widget.",
    question: "How should this latency variability affect the migration decision?",
    options: [
      "Ignore it, since the eval suite's accuracy results passed and eval scores are the only relevant migration criterion",
      "Treat it as a real deployment blocker or at minimum a required fix: investigate the cause of the tail latency (e.g., specific query types or a retry/timeout misconfiguration), and resolve or mitigate it before full rollout, since a 3% timeout rate directly degrades the user experience regardless of underlying answer quality",
      "Accept the variability as an unavoidable cost of a more capable model, with no further investigation needed",
      "Roll out anyway, and plan to address the latency issue only if it later shows up as a formal complaint pattern from users"
    ],
    correct: 1,
    explanation: "A 3% timeout rate is a concrete, measurable degradation of the user experience that exists independent of answer-quality eval scores, and it's worth investigating now (it may point to a fixable cause like a specific query type or misconfigured retry/timeout setting) rather than deploying with a known, avoidable failure mode. Treating eval accuracy as the sole migration criterion (A) ignores a separate but equally real dimension of quality, accepting the variability as simply unavoidable (C) skips a diagnostic step that could easily resolve it, and waiting for user complaints before acting (D) is unnecessarily reactive when the problem is already measured and known."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A specialty coffee subscription company's flavor-recommendation assistant is evaluated by an internal panel that consists entirely of employees who are also coffee enthusiasts and frequent subscribers themselves.",
    question: "What is a potential validity concern with using this panel as the primary evaluation source?",
    options: [
      "There is no concern; enthusiast employees are, by definition, the most qualified possible evaluators for any coffee-related product",
      "Enthusiast employees may have systematically different preferences, vocabulary, and tolerance for nuance than the broader, more casual customer base the product actually serves, so their judgments of 'good' recommendations may not generalize to typical subscribers; the panel's judgments should be validated against actual customer behavior or a broader, more representative customer sample",
      "The concern is solely that employees might be evaluating for free rather than being paid, which introduces bias",
      "The concern only applies if the panel includes fewer than five people, and is irrelevant above that threshold"
    ],
    correct: 1,
    explanation: "A panel of enthusiast employees is likely to have systematically different taste sophistication, vocabulary, and expectations than the average subscriber, so their approval of a recommendation doesn't necessarily predict what a typical, more casual customer would find satisfying — this is a classic representativeness gap between evaluators and the actual user base, best addressed by validating against real customer behavior or a broader sample. Claiming no concern exists because they're highly knowledgeable (A) misses that expertise can actually diverge from typical-user needs, framing the issue as being about compensation (C) misidentifies the actual bias mechanism, and treating panel size as the deciding factor (D) doesn't address the representativeness problem regardless of how many people are on the panel."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional water utility's customer-billing-inquiry assistant is being tested before a public-facing launch. The utility's engineering director suggests skipping a dedicated adversarial/red-team testing phase, reasoning that 'billing questions are low-risk, so we don't need to worry about people trying to break it.'",
    question: "What is the strongest counterargument to skipping adversarial testing for this system?",
    options: [
      "Adversarial testing is only necessary for systems that process highly sensitive personal health or financial identity data, which billing-inquiry content does not qualify as",
      "Even a seemingly low-risk billing assistant can be probed for issues like leaking other customers' account details, being manipulated into approving incorrect refunds or credits, or being used to extract information beyond its intended scope; the low apparent stakes of ordinary use don't rule out the existence of such failure modes, so some level of adversarial testing remains warranted",
      "Adversarial testing should be skipped whenever the engineering director judges a system to be low-risk, since technical leadership's risk assessment is sufficient on its own without further analysis",
      "Adversarial testing is redundant with the standard accuracy eval suite and provides no additional information for any system"
    ],
    correct: 1,
    explanation: "Even a system perceived as low-stakes for its intended use can have real failure modes worth probing — data leakage across customer accounts, manipulation into approving unauthorized credits, or scope-creep in what information it will divulge — none of which show up in a standard accuracy-focused eval suite and all of which carry real financial or privacy consequences. Restricting adversarial testing only to health/financial-identity systems (A) draws an arbitrary line that misses these plausible risks, deferring entirely to one director's informal risk read without further analysis (C) skips a structured risk assessment, and claiming adversarial testing is redundant with accuracy evals (D) conflates two different testing objectives that address different failure modes."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A mid-market law firm's internal legal-research assistant currently runs on a mix of model calls costing roughly $40,000/month, and usage has been growing steadily. The managing partner asks for options to control this cost trajectory without simply capping usage, which associates rely on heavily.",
    question: "What is a reasonable set of options to present, in order of typical first-choice preference?",
    options: [
      "Immediately impose a hard monthly query cap per associate, without exploring any technical optimization options first",
      "First explore technical cost levers — prompt/context optimization to reduce token usage, caching of frequently repeated reference lookups, and complexity-based model routing — before considering usage restrictions, since these can reduce cost without directly limiting associates' access to the tool",
      "Switch the firm entirely to a free, non-Claude alternative regardless of quality differences, since cost is the only stated concern",
      "Take no action, since rising usage is itself proof of adoption success and cost should not be a factor in a professional services firm"
    ],
    correct: 1,
    explanation: "Technical optimization levers — reducing unnecessary context/token usage, caching repeated lookups, and routing simpler queries to cheaper models — can meaningfully reduce cost while preserving associates' full access to the tool, which is exactly the constraint the partner specified (control cost without capping usage). Jumping straight to a hard usage cap (A) violates that explicit constraint before cheaper alternatives are explored, switching providers purely on cost with no regard for quality (C) risks degrading a tool associates rely on heavily, and ignoring the cost question entirely (D) doesn't respond to a legitimate business request for options."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A multinational shipping-container leasing company's contract-negotiation-support assistant is used across teams in different countries, each operating under different local contract law. A cost-optimization initiative proposes standardizing all teams onto a single shared prompt and eval suite to reduce maintenance overhead, even though the current setup has jurisdiction-specific prompts and eval suites.",
    question: "What is the central risk this standardization proposal introduces?",
    options: [
      "There is no meaningful risk, since contract negotiation principles are essentially universal across jurisdictions",
      "A single shared prompt and eval suite risks losing jurisdiction-specific legal nuance that the current localized setup was specifically built to capture, potentially producing legally inappropriate guidance in some jurisdictions even if the standardized system scores well on a generic, jurisdiction-agnostic eval",
      "The risk is purely about increased short-term migration cost, with no ongoing risk once the migration is complete",
      "The risk only affects the smallest-volume jurisdiction and can be safely ignored given its low share of total usage"
    ],
    correct: 1,
    explanation: "Contract law varies meaningfully by jurisdiction, which is presumably why jurisdiction-specific prompts and eval suites existed in the first place; collapsing them into one generic setup risks producing guidance that is legally inappropriate or non-compliant in some jurisdictions, and a jurisdiction-agnostic eval suite would be poorly positioned to even catch this since it wouldn't test jurisdiction-specific correctness. Claiming no meaningful risk exists (A) ignores the real reason localization existed, framing the risk as purely a one-time migration cost (C) understates the ongoing risk of systematically wrong guidance post-migration, and dismissing the risk because it affects a smaller jurisdiction (D) ignores that legal risk in even a lower-volume jurisdiction can be serious and shouldn't be minimized by volume alone."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A national pet-insurance company's claims-adjudication-support assistant recently underwent a prompt change intended to improve consistency. Post-change, the eval suite (200 historical claims) shows adjudication recommendations are now more consistent with each other, but a compliance audit finds the recommendations are now consistently biased toward denial on a specific claim subtype (pre-existing-condition disputes) compared to what a panel of human adjudicators would decide.",
    question: "What does this scenario illustrate, and what is the appropriate response?",
    options: [
      "Consistency and correctness are the same thing, so an improvement in consistency should be considered sufficient evidence of improvement on its own",
      "Consistency is a necessary but not sufficient quality property — a system can be highly consistent while being consistently wrong in a particular direction on a specific subtype; the eval suite should add cases specifically comparing the assistant's recommendations against human-adjudicator ground truth on pre-existing-condition disputes, and the prompt change should be revisited if the bias is confirmed",
      "The compliance audit's finding should be disregarded since it conflicts with the eval suite's positive consistency result",
      "The company should abandon efforts to improve consistency altogether, since this attempt introduced a new problem"
    ],
    correct: 1,
    explanation: "Consistency and correctness are distinct properties — a system can become highly consistent while being consistently biased in the wrong direction on a specific subtype, and the eval suite's improved consistency score didn't catch this because it wasn't specifically comparing against human-adjudicator ground truth on that subtype. The right response is to add exactly that targeted comparison and revisit the prompt change if bias is confirmed, not to treat consistency as proof of correctness (A), dismiss a legitimate compliance finding that surfaced a real gap (C), or abandon the broader goal of consistency because this particular attempt had a flaw (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A large university's financial-aid-inquiry chatbot serves both prospective and current students. The evaluation team built its eval suite entirely from questions submitted by prospective students during the admissions cycle, since that is when the project was scoped and funded.",
    question: "What coverage gap should the team address before the chatbot is expanded to serve current students year-round?",
    options: [
      "None — questions from prospective and current students are functionally identical, since both relate to financial aid",
      "The eval suite likely lacks coverage of questions specific to current students (e.g., renewal requirements, satisfactory academic progress standards, mid-year aid adjustments, disbursement timing) that differ substantially from prospective-student questions about eligibility and initial award estimates; the team should build a supplementary eval set specifically for current-student scenarios before that expansion",
      "The eval suite should be discarded entirely and rebuilt from scratch, since the original scoping was fundamentally flawed",
      "The gap is only relevant for graduate students and can be ignored for undergraduates"
    ],
    correct: 1,
    explanation: "Prospective and current students ask meaningfully different categories of financial-aid questions — initial eligibility and award estimation versus renewal, academic-progress standards, and disbursement timing — so an eval suite built exclusively around one population is a real, specific coverage gap for the other, not an equivalent proxy. Claiming the two populations are functionally identical (A) misses this real distinction, discarding the entire existing suite (C) is an overcorrection since the prospective-student coverage remains valid for its original purpose, and limiting the concern to graduate students only (D) is an arbitrary and unsupported narrowing of the actual gap."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A startup's founder asks the technical team to explain, in simple terms, why they can't just trust a single high-level 'accuracy' percentage as the complete picture of an AI system's readiness for production.",
    question: "What is the most accurate simple explanation for the team to give?",
    options: [
      "A single aggregate accuracy number can hide important variation — such as which types of cases the errors are concentrated in, how severe the consequences of those specific errors are, and whether the eval set itself represents real-world usage — so the full picture requires breaking the number down and checking these underlying factors",
      "Accuracy percentages are always misleading and should never be used or reported for any AI system",
      "A single accuracy number is sufficient as long as it is above 90%, regardless of context or use case",
      "Accuracy is only meaningful for systems that have been in production for over a year"
    ],
    correct: 0,
    explanation: "An aggregate accuracy figure necessarily collapses a lot of important detail — where errors concentrate, how severe they are, and whether the underlying eval set even reflects real usage — so responsible readiness assessment requires looking past the single number into these components, not treating the number as either meaningless or automatically sufficient. Claiming accuracy numbers are always misleading (B) overstates the case against a genuinely useful metric, treating any number above an arbitrary threshold as automatically sufficient (C) ignores context and stakes entirely, and requiring a year of production history before accuracy is meaningful (D) is an arbitrary and unnecessary restriction."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional electric cooperative's outage-restoration-time-estimate assistant is evaluated using a rubric that scores estimates as 'correct' if they fall within a 4-hour window of the actual restoration time. During a major storm event, several estimates were technically within that window but were consistently on the optimistic side (underestimating time), which the utility's call center says caused a spike in frustrated repeat calls.",
    question: "What does this suggest about the eval rubric, and what refinement should be considered?",
    options: [
      "The rubric is working as intended, since all mentioned estimates technically fell within the defined accuracy window",
      "The rubric currently treats early and late estimates within the window as equally acceptable, but the real-world cost of these two error directions is asymmetric here (underestimates directly drive repeat calls and frustration in a way overestimates may not), so the rubric should be refined to weigh or flag directional bias, not just whether the estimate falls within a symmetric window",
      "The rubric should be made stricter by narrowing the window to 1 hour, without addressing the directional bias issue at all",
      "The rubric should be discarded because a single storm event is not representative of typical operating conditions"
    ],
    correct: 1,
    explanation: "A symmetric window rubric ('within 4 hours, either direction') can mask a real operational problem when the actual cost of the two error directions is asymmetric — here, systematically optimistic (early) estimates directly drive frustrated repeat calls in a way pessimistic estimates likely wouldn't to the same degree, and the rubric should be refined to catch that directional pattern rather than just check window membership. Declaring the rubric adequate as-is (A) misses this real operational signal, narrowing the window without addressing directionality (C) doesn't fix the actual problem identified, and dismissing a single storm event as unrepresentative (D) ignores that storm conditions are precisely when accurate restoration estimates matter most and should be well-tested."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A large staffing agency's resume-screening-assistance tool (which surfaces candidates for recruiter review, not automated rejection) shows strong eval scores on relevance and accuracy. A fairness audit, run separately from the main eval suite, finds the tool surfaces candidates from certain universities at a rate that doesn't match the qualification distribution in the applicant pool, raising concern about a subtle proxy bias.",
    question: "How should this fairness-audit finding be incorporated into the ongoing evaluation and testing strategy?",
    options: [
      "It shouldn't be, since the fairness audit is a separate function from the core eval suite and the two should remain entirely independent",
      "Fairness and bias metrics should be integrated as an ongoing, standing part of the evaluation process (not a one-time audit), with defined thresholds and monitoring cadence, since relevance/accuracy scores alone did not surface this issue and a similar bias could silently persist or reemerge after future prompt or model changes",
      "The finding should be treated as disqualifying evidence that the tool must be discontinued entirely, without further investigation into the cause",
      "The finding should be deprioritized because the tool only surfaces candidates rather than automatically rejecting them, so any bias is inherently low-stakes"
    ],
    correct: 1,
    explanation: "The fact that strong relevance/accuracy scores didn't surface this bias demonstrates that fairness properties require their own dedicated, ongoing measurement — folded into standard evaluation practice with defined thresholds and monitoring — rather than being treated as a one-off audit disconnected from regular testing, since future prompt or model changes could reintroduce or worsen the same issue undetected. Treating fairness as fully separate from core evaluation (A) is exactly the gap that let this issue go unnoticed, discontinuing the tool outright without investigating the cause (C) is a disproportionate response before root-causing the proxy bias, and dismissing the finding as low-stakes because a human reviews the output (D) ignores that biased surfacing still shapes which candidates a recruiter even sees, which is a real and consequential effect."
  }
];
