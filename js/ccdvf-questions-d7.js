export const QUESTIONS_D7 = [
  {
    domain: 7,
    difficulty: 3,
    scenario: "A team ships a Claude-powered support-ticket triage feature. Before launch, the only validation was the developer trying five tickets by hand and confirming the labels looked reasonable.",
    question: "What is the main risk of this approach compared to building an eval set?",
    options: [
      "It uses too many API calls, driving up cost",
      "Manual spot-checking cannot detect systematic failures on ticket types the developer didn't happen to try, and provides no repeatable way to measure quality over time",
      "Claude cannot be evaluated on classification tasks at all",
      "It requires the developer to write code instead of using the API console"
    ],
    correct: 1,
    explanation: "A handful of manually inspected examples only covers what the developer thought to try; it gives no statistical confidence about the many ticket types not sampled and can't be re-run consistently as the prompt evolves (B). Cost (A) is not the core issue with five calls. Claude is routinely evaluated on classification (C) is false. Coding vs console (D) is irrelevant to the quality-measurement problem."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A developer is building an eval set for a feature that extracts structured order details (item, quantity, price) from free-text customer emails.",
    question: "Which eval set design would best measure whether the feature is working well?",
    options: [
      "A single long email with many edge cases combined into one test, checked by reading the output once",
      "A set of diverse real and synthetic emails, each paired with the expected correct extraction, checked automatically or with a grading rubric",
      "A set of emails with no expected outputs, since correctness is subjective and can only be judged by eye each time",
      "The same five emails re-used every time a change is tested, since more examples add unnecessary complexity"
    ],
    correct: 1,
    explanation: "A good eval set pairs diverse representative inputs with expected/graded outputs so results can be scored automatically or consistently and compared over time (B). One combined mega-example (A) can't isolate which case fails. Skipping expected outputs (C) removes the ability to grade objectively. A tiny fixed set of five (D) under-represents the input space and won't catch regressions on cases outside it."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A RAG-based documentation assistant starts giving factually wrong answers to a question it used to answer correctly last week. The prompt template has not changed.",
    question: "What is the most effective first debugging step to isolate the cause?",
    options: [
      "Immediately rewrite the system prompt with more detailed instructions",
      "Switch to a larger, more expensive model without further investigation",
      "Check what context (retrieved documents) was actually passed to Claude for that query, since a retrieval failure would explain wrong answers without any prompt change",
      "Assume it is inherent model randomness and ignore the regression"
    ],
    correct: 2,
    explanation: "Since the prompt is unchanged, the next most likely culprit is a change in what was retrieved and passed as context (e.g., a reindex, a doc removal, ranking drift) — inspecting the actual context sent is the direct way to isolate that (C). Rewriting the prompt (A) or upgrading the model (B) address symptoms without diagnosis and could mask the real bug. Dismissing it as randomness (D) skips debugging a reproducible regression."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A developer's coding assistant sometimes gives a subtly wrong answer to a specific class of algorithm question. The prompt looks fine and the relevant context is present and correct.",
    question: "How should the developer determine whether this is a prompt/context problem versus a genuine task-difficulty problem?",
    options: [
      "Conclude it must be a prompt issue, since any wrong answer implies the instructions were insufficient",
      "Test whether providing more explicit guidance, examples, or reasoning steps for that class of question reliably improves accuracy across similar cases; if it doesn't help, the task may be near the model's current capability limit",
      "Switch to a different unrelated prompt entirely and see if the wrong answers happen to stop",
      "Add a disclaimer to the output telling users the answer might be wrong, without further investigation"
    ],
    correct: 1,
    explanation: "Systematically varying the prompt (more guidance, few-shot examples, chain-of-thought) and re-running across multiple similar cases distinguishes a fixable prompting gap from a task that's genuinely hard for the model (B). Assuming it's always a prompt issue (A) skips the diagnostic step. Random unrelated changes (C) aren't a controlled test. Adding a disclaimer (D) avoids diagnosing the root cause entirely."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "An agentic research assistant calls multiple tools (web search, calculator, file reader) across several turns before producing a final answer. A user reports getting a wrong final answer, but the developer has no way to see which tool call or reasoning step went astray.",
    question: "What logging practice would have prevented this blind spot?",
    options: [
      "Logging only the final user-facing answer, since intermediate steps are implementation detail",
      "Logging each step of the agentic loop — the model's intermediate messages, which tools were called with what inputs, and what each tool returned — tagged with a shared request/trace ID",
      "Logging only error messages, since successful-looking steps don't need to be recorded",
      "Logging the full conversation as one unstructured text blob with no per-step boundaries or identifiers"
    ],
    correct: 1,
    explanation: "Tracing an agentic loop requires recording each step (model turns, tool calls with inputs/outputs) under a shared trace ID so a developer can replay exactly what happened for a given request (B). Logging only the final answer (A) or only errors (C) discards the intermediate steps needed to find where things went wrong. An unstructured blob (D) makes it hard to isolate a specific step even if the data is technically present."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A developer wants to add observability to a Claude-powered agent so that when a user reports a bad response, the team can reconstruct exactly what happened.",
    question: "Besides the prompts and responses themselves, which additional piece of information is most important to log for effective debugging?",
    options: [
      "The user's IP address and browser user-agent string only",
      "Metadata such as model version/ID used, token counts, latency, tool calls and their results, and a request ID that ties all of this to the specific user interaction",
      "Nothing else is needed; the final response text is sufficient to debug any issue",
      "A screenshot of the UI at the moment the response was displayed, with no backend data"
    ],
    correct: 1,
    explanation: "Model version, tool call details, timing, and a correlating request ID let a developer reconstruct the exact conditions of a specific interaction, which is essential since prompts/model versions can change over time (B). Browser metadata (A) doesn't help debug model behavior. Logging only the response text (C) loses the inputs and intermediate steps needed to diagnose why it happened. A UI screenshot alone (D) shows the symptom, not the cause."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A developer wants to improve a product-description generator by rewording the system prompt. They plan to eyeball a few new outputs, and if they look good, deploy directly to production.",
    question: "What is the biggest risk with skipping regression testing before this deploy?",
    options: [
      "The new prompt will definitely use more input tokens than the old one",
      "The change might improve the cases the developer checked while silently breaking other previously-working cases that weren't re-tested",
      "Claude does not allow system prompt changes without a version bump",
      "Eyeballing new outputs is invalid, since only automated grading can ever be trusted"
    ],
    correct: 1,
    explanation: "Without running the change against a broader set of known-good cases, there's no way to know whether the reworded prompt breaks behavior elsewhere even if the spot-checked examples look better (B). Token usage (A) isn't guaranteed to increase and isn't the central risk. There's no such versioning restriction (C). Manual review has real value for judgment calls (D is an overstatement) — the issue is scope of testing, not the review method itself."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A team wants to upgrade their summarization feature from one Claude model version to a newer one to reduce latency. They are confident the newer model is 'strictly better' based on published benchmarks.",
    question: "What should they do before switching the production feature to the new model?",
    options: [
      "Switch immediately, since published benchmark improvements guarantee equal or better performance on any specific application",
      "Run their own eval set of representative summarization cases against both model versions and compare results, since aggregate benchmarks don't guarantee behavior on their specific task and prompt",
      "Skip evaluation, since faster models are always an unambiguous improvement regardless of output quality",
      "Only test the new model on cases where the old model previously failed, ignoring cases it previously handled well"
    ],
    correct: 1,
    explanation: "General benchmarks don't guarantee identical behavior on a specific prompt and domain, so running the team's own eval set against both versions is the way to catch task-specific regressions before switching (B). Trusting benchmarks alone (A) or prioritizing speed over quality (C) both skip this verification. Testing only previously-failing cases (D) ignores the risk of the new model regressing on previously-passing cases, similar to skipping regression testing on a prompt change."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A developer wants to compare two versions of a system prompt for a sales-email drafting feature: one emphasizing brevity, one emphasizing detail. They want data on which one actually performs better with real users before fully committing to either.",
    question: "Which approach best supports this decision?",
    options: [
      "Pick whichever prompt the developer personally prefers after reading a couple of example outputs",
      "Run an A/B test: serve each prompt variant to comparable user segments (or replay both against the same inputs), measure a consistent success metric (e.g., reply rate, edit rate, or grader score), and compare results before fully rolling out one version",
      "Deploy the brevity prompt to 100% of users first, then deploy the detail prompt to 100% of users a month later and compare that month's overall revenue",
      "Ask Claude which of the two prompts it thinks is better and use that as the deciding factor"
    ],
    correct: 1,
    explanation: "A proper A/B test compares both variants under similar conditions with a defined metric, isolating the effect of the prompt change from other variables (B). Personal preference on a couple of examples (A) isn't representative data. Sequential full rollouts a month apart (C) confound the comparison with time-based factors like seasonality. Asking Claude to judge its own prompts (D) isn't a substitute for measuring real outcomes."
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A developer is setting up an A/B test comparing two prompt variants for a chatbot's tone (formal vs. casual), planning to measure user satisfaction ratings for each.",
    question: "What is a key requirement for the test to produce a valid comparison?",
    options: [
      "Both variants should be run in different weeks so users don't notice the change",
      "Users should be randomly and consistently assigned to one variant for the duration of the test, and the two groups should be comparable, so any difference in outcomes can be attributed to the prompt rather than to other factors",
      "Only the developer's own test queries should be used, since real user data introduces too much noise",
      "The variant with the higher satisfaction score after only two responses should be declared the winner immediately"
    ],
    correct: 1,
    explanation: "Random, consistent assignment to comparable groups isolates the prompt as the variable being tested, which is what makes the resulting metric differences attributable to the prompt change (B). Running variants in separate weeks (A) reintroduces time-based confounds. Excluding real user data (C) defeats the purpose of measuring real-world performance. Declaring a winner from two responses (D) is far too small a sample to be statistically meaningful."
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "In a multi-step agent that plans a trip (searches flights, then hotels, then builds an itinerary), the final itinerary sometimes recommends a hotel that's nowhere near the selected flight's destination city.",
    question: "What is the most effective way to trace where this goes wrong?",
    options: [
      "Re-run the entire agent from scratch several times and hope the bug becomes obvious from the final outputs alone",
      "Inspect the per-step trace: the flight search result, what destination city was extracted from it, what was passed into the hotel search call, and the hotel search results, to find the exact step where the wrong city entered the pipeline",
      "Assume the model's hotel-recommendation reasoning is untrustworthy in general and remove the hotel-search step from the agent entirely",
      "Only look at the final prompt sent to generate the itinerary, since that is the last step before output"
    ],
    correct: 1,
    explanation: "Tracing the intermediate inputs/outputs of each tool call reveals exactly where the destination city information was dropped or mis-extracted before it reached the hotel search (B). Blind re-runs on final output alone (A) don't localize the fault to a step. Removing the hotel step (C) is a drastic non-fix that loses functionality without diagnosis. Looking only at the final prompt (D) would miss an error introduced earlier, such as during city extraction from the flight results."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A CI pipeline runs an automated eval suite against a Claude-powered content moderation feature on every pull request that touches the prompt. A PR changes prompt wording, and the eval suite reports two previously-passing test cases now failing.",
    question: "What is the correct interpretation and next step?",
    options: [
      "The eval suite is broken, since a wording change to fix a phrasing issue could not affect moderation decisions",
      "The failing cases should be ignored if the PR's original target case now passes",
      "This is a regression: the two newly-failing cases should be investigated before merging, since the eval suite exists specifically to catch this kind of unintended side effect of a prompt change",
      "The eval suite should be deleted for this PR only, since it's blocking a otherwise-good change"
    ],
    correct: 2,
    explanation: "This is exactly the scenario automated regression evals are designed to catch — a prompt edit that fixes one thing while breaking others — so the two new failures need investigation before merging (C). Assuming the suite itself is wrong (A) dismisses a real signal without evidence. Ignoring failures because the target case passes (B) is the same mistake regression testing exists to prevent. Deleting the suite for this PR (D) removes the safety net at the exact moment it's needed."
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A developer is building an eval for a feature that writes free-form customer-service replies, where there's no single 'correct' string to match against but replies can still be judged for tone, accuracy, and helpfulness.",
    question: "What is a reasonable way to automate grading for this kind of open-ended output?",
    options: [
      "Skip automated grading entirely, since open-ended text can only ever be judged by a human reading every single output",
      "Require an exact string match against one reference reply, and mark anything else as failing",
      "Use a rubric-based grader, such as a separate Claude call prompted to score each reply against defined criteria (e.g., tone, factual accuracy, resolved the issue), producing a consistent score across runs",
      "Measure only the length of the reply, on the assumption that longer replies are always higher quality"
    ],
    correct: 2,
    explanation: "For open-ended outputs, an LLM-as-judge or rubric-based grader scoring against explicit criteria gives a consistent, repeatable signal without requiring exact-match text (C). Requiring a human to read every output (A) doesn't scale and isn't repeatable across runs. Exact string matching (B) is inappropriate for free-form text where many valid phrasings exist. Reply length (D) has no reliable relationship to reply quality."
  }
];
