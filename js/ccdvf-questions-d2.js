export const QUESTIONS_D2 = [
  {
    domain: 2,
    difficulty: 2,
    scenario: "A support-ticket triage system sends the same ~3,000-token internal knowledge base as context on every single API call, along with a short, unique customer message each time.",
    question: "What is the most effective optimization for this pattern?",
    options: [
      "Switch to the fastest, cheapest model tier to offset the repeated context cost",
      "Apply prompt caching to the repeated knowledge-base portion of the context, since it's identical across calls and only the short customer message changes",
      "Reduce the knowledge base to under 100 tokens so the repeated cost becomes negligible",
      "Batch all incoming tickets together into a single daily API call"
    ],
    correct: 1,
    explanation: "This is exactly the pattern prompt caching is designed for: large, unchanged context reused across many calls, with only a small varying portion (B). Downgrading model tier (A) doesn't address the redundant-context cost itself and may hurt quality. Shrinking the knowledge base (C) sacrifices the information the system needs to function well. Batching (D) is for latency-insensitive bulk workloads — a support triage system handling individual tickets in near-real-time isn't a good fit for batch delay."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A startup is building a feature that classifies incoming emails as 'urgent' or 'not urgent' using a single short prompt with no reasoning required. They currently route every email through the most capable model tier available.",
    question: "What should they most likely do to reduce cost without hurting quality on this task?",
    options: [
      "Keep the most capable model, since email classification could contain edge cases",
      "Switch to the fastest, cheapest model tier and validate accuracy on a labeled sample of real emails",
      "Add extended thinking so the model reasons more carefully about urgency",
      "Increase max_tokens to give the model more room to consider the classification"
    ],
    correct: 1,
    explanation: "Binary classification on short text is a textbook case for the fastest/cheapest tier — the task doesn't demand deep reasoning, so paying for the most capable model is wasted spend (A). Validating on real data (B) confirms the downgrade doesn't hurt quality rather than assuming it. Extended thinking (C) adds latency and cost for a task that doesn't need multi-step reasoning. More max_tokens (D) doesn't improve classification accuracy — it only raises the output ceiling."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An engineering team is building an agent that plans and executes multi-file code refactors autonomously over many tool-call turns, often running for 10+ minutes per task.",
    question: "Which model/configuration choice best fits this workload?",
    options: [
      "The fastest, cheapest model tier with thinking disabled, to keep the many tool-call round trips cheap",
      "The most capable model tier with adaptive thinking and effort tuned high for the difficulty of the task",
      "The most capable model tier, but only for the final code review step, with all other steps handled by the cheapest tier",
      "Any model tier, since tool use quality doesn't vary meaningfully by model"
    ],
    correct: 1,
    explanation: "Long-horizon autonomous agentic work with real judgment calls (what to refactor, how to sequence changes) benefits from the most capable model's planning and coherence, and higher effort/thinking pays for itself by reducing wasted or incorrect tool calls (B). The cheapest tier (A) risks compounding errors across many turns, which is expensive to unwind. Splitting steps (C) undervalues the planning quality needed throughout the run, not just at review time. Model choice materially affects tool-use reliability (D is false)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A data engineering team needs to classify 2 million historical support tickets by category as a one-time backfill job. The results aren't needed until tomorrow morning, and no user is waiting on the output.",
    question: "What is the most cost-effective way to run this job?",
    options: [
      "Submit all 2 million requests through the Batch API, which offers a lower cost in exchange for asynchronous, non-guaranteed-immediate turnaround",
      "Send all 2 million requests synchronously as fast as the rate limits allow, using the most capable model",
      "Use streaming responses so partial output can be processed as it arrives",
      "Split the job across ten different API keys to send all requests in parallel synchronously"
    ],
    correct: 0,
    explanation: "This is precisely what batch processing is for: high-volume, latency-insensitive work that can tolerate turnaround measured in hours, at a meaningful cost discount (A). Sending 2 million synchronous requests (B) fights rate limits and pays full price for no latency benefit since nothing is time-sensitive. Streaming (C) helps interactive UX, not bulk batch throughput. Splitting across API keys (D) doesn't reduce cost and is an operational workaround, not an optimization."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a customer-facing chatbot wants the UI to show the assistant's reply appearing progressively, word by word, as it's generated, rather than the user staring at a blank screen for several seconds.",
    question: "What implementation choice directly addresses this UX requirement?",
    options: [
      "Increase max_tokens so the response has room to complete",
      "Use the streaming API so response content arrives incrementally as it's generated, rather than waiting for the full completion",
      "Switch to a faster model tier so the full response returns before the user notices any delay",
      "Reduce the system prompt length to shorten total generation time"
    ],
    correct: 1,
    explanation: "Streaming is specifically designed to reduce perceived latency by delivering content incrementally instead of waiting for the full response (B). A faster model tier (C) can help overall latency but still returns as a single blocking response unless streaming is also used, so it doesn't create the progressive text effect. max_tokens (A) affects output length limits, not delivery timing. A shorter system prompt (D) may reduce total time slightly but doesn't produce incremental delivery."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team runs an internal batch job every night that sends 50,000 documents to Claude for summarization, each with a unique 200-token document body, but every request also includes a fixed 4,000-token set of formatting instructions and examples.",
    question: "Which optimization strategy will yield the largest combined savings for this workload?",
    options: [
      "Use the Batch API alone, since the discount applies uniformly regardless of caching",
      "Use prompt caching alone, since caching applies uniformly regardless of batching",
      "Combine the Batch API's discounted per-token pricing with prompt caching on the shared 4,000-token instruction block to cut costs on both dimensions",
      "Skip both and instead trim the document bodies to reduce token count, since the documents are the larger cost driver"
    ],
    correct: 2,
    explanation: "The batch job is latency-insensitive (good fit for the Batch API's discount) and has a large repeated prefix across 50,000 requests (good fit for prompt caching) — combining both addresses cost from two independent angles (C). Using only one (A, B) leaves savings on the table. Trimming document bodies (D) misidentifies the biggest cost driver — the 4,000-token shared instructions dwarf each 200-token document, so that's where the leverage is, not the variable content."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building a legal document analysis tool that must extract obligations, flag ambiguous clauses, and reason about potential conflicts between sections of a 40-page contract. Early testing on the fastest, cheapest model tier produces frequent extraction errors and missed conflicts.",
    question: "What is the most appropriate response to these results?",
    options: [
      "Keep the cheap model but increase max_tokens, since the errors are likely due to truncated output",
      "Move to a more capable model tier and consider extended/adaptive thinking, since this task requires deep multi-step reasoning that the task complexity justifies",
      "Reduce the contract length sent per request so the cheap model has less to process",
      "Add more few-shot examples to the cheap model's prompt instead of changing model tier, since prompting can fully substitute for model capability"
    ],
    correct: 1,
    explanation: "Legal reasoning over long documents with cross-section conflict detection is genuinely hard and benefits from a more capable model plus reasoning support — this is a case where over-optimizing for cost actively harms outcomes (B). Increasing max_tokens (A) doesn't fix reasoning errors, only truncation. Shortening the contract (C) risks losing information needed to detect cross-section conflicts. Prompting improvements (D) can help but rarely fully close a genuine capability gap on hard reasoning tasks."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a real-time voice assistant needs responses to begin within a few hundred milliseconds of the user finishing speaking, or the interaction feels broken.",
    question: "Which combination of choices best supports this latency requirement?",
    options: [
      "The most capable model tier with extended thinking enabled, since users will tolerate a few extra seconds for a smarter answer",
      "A faster, lower-latency model tier, streaming responses, and thinking disabled or minimized to avoid added latency before the first token",
      "The Batch API, since it processes requests efficiently at scale",
      "A larger max_tokens value to ensure the response is never cut off mid-thought"
    ],
    correct: 1,
    explanation: "Real-time voice interaction is a hard latency constraint, so a faster model tier plus streaming (to get audio/text flowing immediately) and minimal thinking overhead (which adds time before the first token) directly serves the requirement (B). Extended thinking on the most capable model (A) trades away exactly the latency budget this use case can't spare. The Batch API (C) is asynchronous and fundamentally incompatible with real-time interaction. max_tokens (D) doesn't address time-to-first-token."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer notices their agentic coding assistant re-sends the entire prior conversation, including every past tool call and its full output, on every single turn of a long debugging session.",
    question: "What is the most direct token-usage optimization for this situation?",
    options: [
      "Trim or summarize stale tool outputs from earlier turns that are no longer relevant to the current step, instead of resending the full history unmodified every turn",
      "Switch to the most capable model tier so it can process the growing context more efficiently",
      "Disable streaming to reduce the number of API calls",
      "Increase the context window size so the growing history fits without truncation"
    ],
    correct: 0,
    explanation: "Since the API is stateless and the full conversation must be resent each turn, actively pruning or summarizing stale, no-longer-relevant content is the direct lever for reducing redundant token spend (A). A more capable model (B) doesn't reduce the token volume being resent. Streaming (C) affects delivery, not the size of the resent context. Simply expanding the context window (D) accommodates the bloat rather than eliminating the underlying waste, and still costs money for every token sent."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A company runs a nightly job to categorize 500,000 product listings and only needs the results by 8am the next day. The job currently issues one synchronous API request per listing in a tight loop, frequently hitting rate limits and taking hours.",
    question: "What change would most directly resolve both the rate-limiting issue and reduce cost?",
    options: [
      "Add exponential backoff retry logic to the synchronous loop and keep everything else the same",
      "Move the workload to the Batch API, which is designed for exactly this kind of high-volume, non-time-sensitive processing and avoids standard synchronous rate limits while reducing per-token cost",
      "Split the requests across multiple synchronous threads to parallelize past the rate limit",
      "Increase max_tokens on each request so fewer retries are needed"
    ],
    correct: 1,
    explanation: "Bulk, latency-insensitive categorization work is the canonical Batch API use case — it sidesteps standard rate-limit pressure from many rapid synchronous calls and comes at a reduced price point (B). Backoff retries (A) address symptoms but keep paying full synchronous price and remain slow. Parallel threads (C) can make rate-limit collisions worse, not better. max_tokens (D) is unrelated to rate limiting or retry frequency."
  },
  {
    domain: 2,
    difficulty: 1,
    scenario: "A developer is choosing a model tier for a new internal tool that rewrites Slack messages to be more concise. The task is simple, high-volume, and not customer-facing.",
    question: "Which factor should most influence the model tier decision here?",
    options: [
      "The task's complexity and quality bar relative to cost — a simple, forgiving task like this doesn't need the most capable (and most expensive) tier",
      "Whichever model tier the company already uses for its flagship customer-facing product, for consistency",
      "The model with the largest context window, regardless of the task's actual context needs",
      "The model tier that supports the most tool integrations, since more tools are always better"
    ],
    correct: 0,
    explanation: "Matching model tier to task complexity and quality requirements relative to cost is the core model-selection principle (A) — a low-stakes, simple rewriting task doesn't warrant top-tier spend. Consistency with an unrelated flagship product (B) isn't a sound selection criterion. Context window size (C) is irrelevant if the messages are short. Tool integration count (D) has nothing to do with a task that doesn't use tools at all."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team maintains a coding agent that reasons about complex multi-file changes. They notice that when they lower the reasoning effort setting to reduce cost, the agent starts making more tool calls and produces longer, less consolidated responses, partially offsetting the intended savings.",
    question: "What does this observation suggest about the effort parameter?",
    options: [
      "The effort parameter is broken and should not be used for coding agents",
      "Lower effort settings generally cause fewer, more consolidated tool calls, so this result is backwards from documented behavior and worth re-checking the configuration",
      "Effort settings have no measurable effect on tool-use patterns or verbosity",
      "This is expected — higher effort always reduces tool calls and lower effort always increases them, so no further action is needed"
    ],
    correct: 1,
    explanation: "Lower effort is generally associated with fewer, more consolidated tool calls and terser output — so seeing the opposite (more calls, more verbosity) after lowering effort is a signal something else in the configuration or prompt may be off, not expected behavior (B). Concluding the parameter is simply broken (A) skips diagnosis. Claiming no effect (C) contradicts documented behavior. Treating the observed (backwards) result as simply expected (D) accepts an anomaly without investigating it."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is deciding whether to enable extended/adaptive thinking for a customer FAQ chatbot that answers simple, templated questions from a fixed knowledge base.",
    question: "What is the best guidance for this decision?",
    options: [
      "Always enable extended thinking on every request, since more reasoning can only improve answer quality",
      "Extended thinking is unnecessary here — the task is straightforward lookup/response generation, and the added latency and cost aren't justified by the complexity",
      "Extended thinking is required whenever a chatbot handles customer-facing traffic, regardless of task difficulty",
      "Extended thinking should be enabled only during off-peak hours to reduce its performance impact"
    ],
    correct: 1,
    explanation: "Extended thinking trades latency and cost for deeper reasoning; a templated FAQ task doesn't need multi-step reasoning, so enabling it would add cost and delay without a meaningful quality benefit (B). Always enabling it (A) ignores that reasoning depth should match task difficulty. Customer-facing status alone (C) doesn't determine reasoning need — task complexity does. Time-of-day gating (D) is an odd, irrelevant lever for a reasoning-depth decision."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A team building an internal analytics dashboard needs to generate a written summary of quarterly numbers once, after the numbers are finalized. The summary is displayed the next business day, and the generation is triggered by a manual button click.",
    question: "Is streaming an important choice for this use case?",
    options: [
      "Yes — streaming should always be used regardless of use case, since it's strictly better than non-streaming",
      "No — since there's no interactive UI waiting on token-by-token output and no long-running request timeout risk, a standard non-streaming request is simpler and sufficient",
      "Yes — streaming is required any time an LLM API is called, per API constraints",
      "No — streaming should never be used for internal tools regardless of latency profile"
    ],
    correct: 1,
    explanation: "Streaming's main benefit is reducing perceived latency for an interactive, waiting user or avoiding request timeouts on very large outputs — neither applies to a next-day, click-triggered summary, so plain non-streaming is simpler and equally effective (B). Streaming isn't universally 'strictly better' (A) — it adds implementation complexity for no benefit here. It's not an API-wide requirement (C). And 'never for internal tools' (D) is too broad a rule; the right test is the latency/timeout profile of the specific use case, not internal-vs-external status."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An enterprise SaaS company has highly predictable daily traffic: they know from historical data that requests spike sharply at 9am local time across their customer base and taper off by 6pm.",
    question: "How should this predictability inform their model and infrastructure strategy?",
    options: [
      "Predictable traffic patterns aren't useful for optimization since API costs are fixed regardless of timing",
      "They can proactively pre-warm caches, provision for known peak load, and potentially shift latency-insensitive batch workloads to off-peak hours, which flat, unpredictable traffic wouldn't allow",
      "They should switch to the Batch API entirely, since it's better for any traffic that isn't perfectly uniform",
      "Predictable traffic means they no longer need to think about cost/latency trade-offs at all"
    ],
    correct: 1,
    explanation: "Predictable traffic patterns let a team plan capacity and shift what can be delayed (e.g. batch jobs) to off-peak windows, and pre-warm caches ahead of known spikes — an advantage unpredictable traffic doesn't offer (B). Costs aren't fixed regardless of timing when caching and batch discounts are in play (A is wrong). Moving all traffic to the Batch API (C) would break interactive, real-time customer requests. Predictability doesn't eliminate the need for cost/latency reasoning (D) — it enables better-informed decisions, not none at all."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer implements prompt caching for a system with a 5,000-token static system prompt, but after switching in a new experimental model version for A/B testing, they notice cache hit rates drop to zero for all traffic on the new model variant, even though the system prompt text is identical.",
    question: "What most likely explains this?",
    options: [
      "Prompt caches are scoped per model, so switching to a different model version creates a new, empty cache rather than reusing the old one",
      "The cache is broken and needs to be manually cleared and rebuilt",
      "Prompt caching only works with a single fixed model forever and cannot be used during any model transition",
      "The 5,000-token prompt exceeds a hidden cache size limit that only applies to experimental models"
    ],
    correct: 0,
    explanation: "Prompt caches are keyed in part by model, so traffic routed to a different model version naturally starts with a cold cache — this is expected behavior during a model switch, not a malfunction (A). There's nothing to 'clear and rebuild' (B) — this isn't a broken-cache scenario. Caching does work across model transitions, it just doesn't carry over cache state between models (C overstates the limitation). There's no evidence of a size-limit issue — 5,000 tokens is a normal cacheable size and the described symptom (zero hits only after a model switch) points specifically to model-scoping (D is a distractor)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a content moderation pipeline that flags potentially harmful text at high volume (millions of posts/day, sub-second latency required per post) is currently sending each post through the most capable, most expensive model tier.",
    question: "What is the most likely issue with this setup?",
    options: [
      "There is no issue — content moderation should always use the most capable model regardless of volume or latency needs",
      "This is likely over-optimized for quality at the expense of cost and latency; a faster, cheaper tier is probably sufficient for this classification-style task at this scale",
      "The issue is that moderation should use the Batch API instead, since it's high volume",
      "The issue is that streaming should be enabled to reduce classification latency"
    ],
    correct: 1,
    explanation: "High-volume, latency-sensitive binary/multi-class classification is generally well served by a faster, cheaper model tier; reflexively reaching for the most capable tier here is a classic sign of under-optimization — using the most expensive option out of habit rather than fit (B). Claiming no issue at all (A) ignores that cost and latency matter at this scale. The Batch API (C) is wrong for sub-second-latency, real-time moderation, since it's designed for latency-insensitive workloads. Streaming (D) doesn't reduce the cost or model-selection mismatch — it only changes how output is delivered."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building a system that processes uploaded PDFs (up to 50 pages) and needs to extract structured data. Some PDFs are simple invoices; others are dense multi-column technical reports.",
    question: "What is the most sound model-selection strategy?",
    options: [
      "Always use the fastest, cheapest tier for all documents to keep costs predictable and low",
      "Always use the most capable tier for all documents, since the task involves PDFs which are inherently complex",
      "Consider routing based on document complexity — e.g. a lightweight classification or heuristic step to route simple invoices to a cheaper tier and complex technical reports to a more capable one",
      "Use extended thinking on every request to guarantee no data is missed, regardless of document type"
    ],
    correct: 2,
    explanation: "Since document difficulty genuinely varies in this system, a complexity-aware routing strategy captures cost savings on the easy cases while preserving quality on the hard ones — the right trade-off decision depends on the actual task, not a blanket rule (C). Always using the cheap tier (A) risks poor extraction on dense technical reports. Always using the top tier (B) overpays for simple invoices just because the input format is a PDF, which isn't itself a proxy for difficulty. Extended thinking on every request (D) adds latency/cost uniformly rather than where it's actually needed."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is comparing two implementations of the same feature: one re-sends the full 20-message conversation history on every turn, and another periodically summarizes older turns into a condensed form once the conversation exceeds a certain length.",
    question: "What is the primary token-usage benefit of the summarization approach?",
    options: [
      "It eliminates the need for the model to ever reference earlier context",
      "It reduces the number of tokens resent on each subsequent turn by replacing verbose history with a condensed representation, lowering per-request cost as the conversation grows",
      "It allows the conversation to skip the context window limit entirely with no trade-offs",
      "It has no meaningful benefit over sending full history, since input tokens are cheap regardless of volume"
    ],
    correct: 1,
    explanation: "Summarizing older turns shrinks what must be resent on every subsequent turn, directly cutting per-request input token cost as a long conversation grows (B). It doesn't eliminate the model's ability to reference earlier context (A) — it preserves a condensed version of it, which is the whole point. It helps manage the context window but isn't a trade-off-free solution (C) — some detail is inevitably lost in summarization. Input tokens are not free, and at scale or with long conversations the savings are meaningful (D is wrong)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team runs an agentic research assistant that, for each user question, first calls a search tool, then processes the raw search results (often 15,000+ tokens of raw HTML/text) by feeding them entirely back into the model to extract relevant facts before answering.",
    question: "What is the most effective token-optimization opportunity here?",
    options: [
      "Nothing can be done — all search results must be sent to the model in full to avoid losing information",
      "Pre-process/filter the raw search results (e.g., strip boilerplate, extract only relevant sections) before sending them to the model, rather than passing the full raw payload as context",
      "Switch to a cheaper model tier so the 15,000 extra tokens cost less per call",
      "Enable prompt caching on the search results, since they're likely to repeat across different user questions"
    ],
    correct: 1,
    explanation: "Filtering and trimming noisy raw content down to what's actually relevant before it enters the model's context is a direct token-usage optimization that avoids paying to process and reason over boilerplate (B). Claiming nothing can be done (A) ignores this available lever. A cheaper model (C) reduces per-token cost but doesn't address the root inefficiency of feeding 15,000 tokens of mostly irrelevant content on every query. Caching (D) doesn't apply well here since search results for different queries are typically unique, not repeated identical context."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a customer support chat widget wants to display Claude's response as it's generated, but their backend framework only supports returning a single complete HTTP response per request and cannot forward Server-Sent Events to the frontend.",
    question: "Given this constraint, what is a reasonable approach?",
    options: [
      "Use the streaming API on the backend to accumulate the full response internally, then return it as one complete response to the frontend — this improves backend responsiveness for long-running requests even without exposing token-by-token UX to the user",
      "Streaming is impossible without frontend SSE support, so the feature must be abandoned entirely",
      "Switch to the Batch API to work around the framework limitation",
      "There's no reason to ever use the streaming API on the backend if the frontend won't display incremental tokens"
    ],
    correct: 0,
    explanation: "Even without exposing incremental delivery to the end user, using streaming on the backend can still help avoid long-request timeouts and let the backend start processing content as it arrives, accumulating a full response server-side before returning it (A). Declaring the feature impossible (B) overstates the constraint — backend-only streaming is a legitimate middle ground. The Batch API (C) is for asynchronous bulk workloads, not a workaround for a synchronous chat feature. Dismissing backend streaming entirely (D) ignores its timeout-avoidance benefit even without user-visible increments."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is unsure whether to use prompt caching for a one-off script that sends a single API request with a 6,000-token prompt and then exits.",
    question: "Should they implement prompt caching for this script?",
    options: [
      "Yes, caching should always be applied to any prompt over 1,000 tokens regardless of reuse pattern",
      "No — prompt caching provides no benefit unless the same prefix is reused across multiple requests, and this script only makes one request",
      "Yes, because caching guarantees lower latency even on a single request with no reuse",
      "It depends on whether the script uses streaming or not"
    ],
    correct: 1,
    explanation: "Prompt caching's benefit comes from reusing a cached prefix across repeated calls; a single one-off request never gets to read from a cache it just wrote, so there's no cost or latency benefit here (B). Applying caching purely based on token count (A) ignores the reuse requirement that makes caching pay off. A single request doesn't benefit from caching in the way described (C) — the first request always pays the (slightly higher) cache-write cost with no compensating read. Streaming usage (D) is unrelated to whether caching is worthwhile."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A financial services company wants to summarize daily transaction logs (several million rows) into a single report, generated once per day and reviewed by a compliance team the following morning. No user is waiting for immediate results.",
    question: "Which combination of choices best fits this workload's constraints?",
    options: [
      "The most capable model tier via synchronous streaming requests, prioritizing the lowest possible latency",
      "The Batch API with a cost-effective model tier appropriate to the summarization task's actual complexity, since latency is not a constraint and cost efficiency at scale matters more",
      "The fastest, cheapest model tier via synchronous requests sent one at a time in a loop",
      "Extended thinking enabled on every row-level computation to maximize accuracy of the numeric aggregation"
    ],
    correct: 1,
    explanation: "With no latency pressure and a clear need for cost efficiency at scale, the Batch API paired with a model tier sized to the task's actual reasoning demands is the strongest fit (B). Streaming for lowest latency (A) optimizes for something this workload doesn't need and ignores the batch discount. Synchronous one-at-a-time requests (C) forfeit both the batch discount and any efficiency of scale. Numeric aggregation over millions of rows is generally better handled by deterministic code than by asking a model to reason token-by-token about arithmetic, so extended thinking on every computation (D) misapplies the tool."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team's cost dashboard shows that their prompt caching implementation has a cache_read_input_tokens value of zero across thousands of requests that all use the same system prompt text.",
    question: "What is the most likely root cause to investigate first?",
    options: [
      "The prompt is too short to ever benefit from caching, so this is expected and not worth investigating",
      "A silent invalidator somewhere in the prompt-building path — such as a timestamp, non-deterministic serialization, or varying tool set — that changes the prefix bytes on every request even though the visible prompt text looks identical",
      "Prompt caching requires the Batch API to function, and they aren't using it",
      "The model tier they're using doesn't support prompt caching at all, so this is expected"
    ],
    correct: 1,
    explanation: "Zero cache reads despite an apparently identical repeated prompt is the classic signature of a silent invalidator — some byte-level difference in the rendered prefix (a timestamp, unsorted JSON, a varying tool list) that isn't visible from eyeballing the prompt text but breaks the exact-prefix match caching requires (B). If the prompt were simply too short (A), that's a distinct and checkable condition, not the default assumption for 'identical-looking prompt, thousands of requests, zero reads.' Caching doesn't require the Batch API (C) — they're independent features. Most current model tiers support caching, so ruling it out first (D) skips the more likely and directly diagnosable cause."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is building a translation feature that converts short product descriptions (under 50 words) from English to Spanish. The feature runs synchronously when a merchant clicks 'Translate' in an admin dashboard.",
    question: "Which model tier and configuration best fits this task?",
    options: [
      "The most capable model tier with adaptive thinking enabled, since translation quality is paramount",
      "The fastest, cheapest model tier without extended thinking, since translating a short, well-defined piece of text is not a deep-reasoning task and the merchant is waiting synchronously",
      "The Batch API, since translation tasks are always well suited to batch processing",
      "Any model tier is fine as long as streaming is enabled"
    ],
    correct: 1,
    explanation: "Short, well-bounded translation is a good fit for a fast, cheap tier without added reasoning overhead — it's not a task that benefits meaningfully from deep multi-step reasoning, and the merchant is waiting synchronously, so low latency also matters (B). The most capable tier with thinking (A) adds cost and latency disproportionate to the task's difficulty. The Batch API (C) is wrong here specifically because the merchant is waiting in real time, not submitting bulk translations for later pickup. Streaming (D) doesn't address the core cost/quality/latency trade-off and isn't the deciding factor for a task this short."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a document Q&A tool for a 300-page manual notices the tool always sends the entire manual as context on every single question, even when the question is about one small section.",
    question: "What is the best approach to manage the context window here?",
    options: [
      "Always send the full manual, since retrieving only relevant sections risks missing information",
      "Implement retrieval so only the most relevant sections of the manual (based on the question) are included in context, rather than sending the entire document on every call",
      "Switch to a model with the largest available context window and keep sending the full document, since window size solves the problem",
      "Reduce the manual to a short abstract and always send just that, regardless of the question"
    ],
    correct: 1,
    explanation: "Retrieving and including only the contextually relevant sections keeps token usage and cost proportional to what's actually needed for each question, which is the practical way to manage context for large reference documents (B). Always sending the full manual (A) is expensive and slow for narrow questions, even if it feels safest. A bigger context window (C) accommodates the waste rather than eliminating it — it doesn't reduce cost or improve relevance. Reducing to a fixed abstract (D) would lose the detail needed to answer specific questions accurately."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a code review bot wants each pull request review to run as fast as possible since developers are waiting on it before merging, but the review also requires genuinely careful reasoning about subtle bugs across multiple files.",
    question: "How should they resolve this tension between latency and reasoning depth?",
    options: [
      "Sacrifice reasoning depth entirely and use the fastest tier with minimal thinking, since developer wait time is the only thing that matters",
      "Accept that some latency is a necessary trade-off for a task that genuinely needs careful multi-file reasoning, and use a capable model with tuned effort/thinking rather than defaulting to the fastest tier",
      "Use the Batch API so the review can complete without any latency concern",
      "Avoid the trade-off by using extended thinking at maximum depth regardless of PR size or complexity"
    ],
    correct: 1,
    explanation: "This scenario is a genuine cost/latency/quality trade-off with no free lunch: code review that must catch subtle multi-file bugs justifies some added latency for a more capable model and appropriately tuned reasoning, rather than defaulting purely to speed (B). Going fastest-only (A) risks missing the subtle bugs the task exists to catch. The Batch API (C) doesn't fit — developers are waiting synchronously before merging, which is exactly the latency-sensitive case batch processing isn't designed for. Maxing out thinking depth regardless of PR size (D) over-applies reasoning uniformly rather than scaling it to actual complexity, adding unnecessary latency on simple PRs."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer notices their application re-uploads and re-sends a 10-page reference PDF as part of the prompt on every single API call within the same user session, even though the PDF never changes during that session.",
    question: "What is the clearest fix for this redundant token usage?",
    options: [
      "Nothing needs to change, since PDFs are processed efficiently regardless of how often they're resent",
      "Apply prompt caching to the PDF content so it's only fully processed and charged at full price once per cache window, with subsequent calls in the session reading from cache",
      "Compress the PDF file size before uploading, which reduces the token cost of processing it",
      "Convert the PDF into a video file, which uses a more efficient encoding for repeated context"
    ],
    correct: 1,
    explanation: "A static document resent unchanged across many calls within a session is a direct fit for prompt caching — the content is written to cache once and subsequent calls read from it at a fraction of the cost (B). Assuming no optimization is needed (A) ignores real, avoidable repeated-processing cost. Reducing file size (C) doesn't address the fact that it's being resent and reprocessed on every call — the redundancy is the issue, not the file's raw size. Converting to video (D) is nonsensical and does not reduce token cost or improve caching behavior."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team is deciding between two designs for their customer service agent: Design A calls the most capable model on every single turn of a conversation, including simple confirmations like 'yes' or 'thanks'. Design B routes simple acknowledgments to a lightweight model and reserves the capable model for turns that require real problem-solving.",
    question: "From a cost/latency/quality trade-off perspective, which design is better and why?",
    options: [
      "Design A, because using one consistent model throughout a conversation is always the safest and most reliable choice",
      "Design B, because routing by per-turn complexity avoids paying capable-model prices and latency for trivial turns, while reserving that capability for turns that actually need it",
      "Design A, because switching models mid-conversation is not technically possible with the API",
      "Neither design matters, since cost and latency are identical across model tiers"
    ],
    correct: 1,
    explanation: "Per-turn complexity-based routing captures savings on trivial exchanges without sacrificing quality where it matters — this is a sound cost/latency/quality optimization or the conversation's actual needs (B). Design A's blanket use of the capable model (A) burns cost and latency on turns like 'thanks' that don't need it. It is technically possible to switch models between turns in a conversation (C is false — there's no such API restriction, though it does affect prompt cache reuse, which is a legitimate but different consideration). Cost and latency do vary meaningfully across model tiers (D is false)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building an internal tool for generating meeting summaries from transcripts wants to know whether to enable extended/adaptive thinking. The transcripts are typically short (under 2,000 words) and the summaries are simple bullet-point recaps.",
    question: "What's the right call here?",
    options: [
      "Enable extended thinking, since any summarization task benefits from deeper reasoning",
      "Skip extended thinking — bullet-point summarization of a short transcript is a relatively straightforward generation task that doesn't need multi-step reasoning, and enabling it would add unnecessary latency and cost",
      "Extended thinking must always be enabled for any task involving natural language transcripts",
      "The decision should be based solely on which model tier is cheapest, ignoring the task itself"
    ],
    correct: 1,
    explanation: "Simple bullet-point summarization of short, well-structured input doesn't require the kind of multi-step deliberation that extended thinking is built for, so skipping it avoids unnecessary latency and cost (B). Assuming all summarization needs deep reasoning (A) overgeneralizes — task-specific judgment matters. There's no blanket transcript-based requirement (C). And ignoring task difficulty entirely and picking purely by price (D) is the mirror-image mistake of always picking the most expensive option — it substitutes a cost-only heuristic for actual task-fit judgment."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building an e-commerce search-query interpreter (turning 'cheap running shoes under $50' into structured filters) is deciding on a model tier. The task is narrow, well-defined, and runs on every search query a user types, at high volume.",
    question: "What model tier is most appropriate?",
    options: [
      "The most capable tier, because search relevance is core to the business and shouldn't be compromised",
      "The fastest, cheapest tier, since this is a narrow, well-defined structured-extraction task running at high volume where both cost and latency matter, and doesn't require deep reasoning",
      "Whichever tier has the largest context window, since that's the most important factor for search",
      "The Batch API, since search queries happen at high volume"
    ],
    correct: 1,
    explanation: "A narrow, well-scoped extraction task running at high volume with real-time latency needs is a strong fit for the fastest/cheapest tier — the task's actual complexity doesn't justify the most capable tier's cost and latency (B). Defaulting to the most capable tier because the business cares about the outcome (A) conflates business importance with task complexity, which are different axes. Context window size (C) is irrelevant for parsing a short search query. The Batch API (D) misapplies volume as the sole criterion — this task is latency-sensitive (users are waiting for search results), which rules out batch processing regardless of volume."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team's agent occasionally hits the model's context window limit mid-conversation during long, multi-hour user sessions, causing errors. They want a fix that doesn't require the user to start a new conversation.",
    question: "What is the most appropriate implementation-level fix?",
    options: [
      "Silently truncate the oldest messages from the conversation with no logic about what's safe to drop",
      "Implement a context management strategy — such as summarizing or pruning older, less relevant turns — before the context window is exceeded, preserving the information still needed for the conversation to continue coherently",
      "Switch to a model with unlimited context, since only context window size caused the issue",
      "Increase max_tokens on every request, since that determines how much conversation history fits"
    ],
    correct: 1,
    explanation: "Proactively managing what's kept versus summarized/pruned as the conversation grows is the correct way to stay under the context limit while preserving coherence, rather than reacting to hard failures (B). Blind truncation with no logic (A) risks dropping information still needed for the conversation to make sense. No model has literally unlimited context, and reaching for the largest available window without addressing growth (C) just delays the same problem. max_tokens (D) controls the output length cap per response, not how much conversation history is included as input — conflating the two won't fix a context-window overflow."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team is building a system where an internal orchestrator model decides, per user request, whether to answer directly (cheap/fast) or delegate to a more capable model for harder sub-tasks. During testing, they find the orchestrator delegates almost every request to the expensive model, even simple ones.",
    question: "What is the most likely problem, and what's a reasonable fix?",
    options: [
      "This is optimal behavior and shouldn't be changed, since delegating more often can only improve quality",
      "The orchestrator's routing logic is probably miscalibrated (too eager to escalate) and needs tuning or clearer criteria for what counts as a 'hard' task, since over-delegating defeats the cost-saving purpose of the routing design in the first place",
      "The fix is to remove the cheap model option entirely and always use the expensive model, since the orchestrator's behavior suggests the cheap model is never useful",
      "This is caused by the context window being too small and has nothing to do with routing logic"
    ],
    correct: 1,
    explanation: "If the whole point of the routing design was cost/latency savings on simple requests, an orchestrator that escalates almost everything has failed to do the one job it exists for — the fix is to diagnose and tighten the escalation criteria, not accept the behavior (B). Calling it optimal (A) ignores that the point of the architecture was selective delegation, not blanket escalation. Removing the cheap tier entirely (C) gives up on the cost optimization rather than fixing the broken routing logic that caused it. Context window size (D) is an unrelated concern — this is a routing/decision-logic problem, not a token-limit problem."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A mobile app's AI writing assistant streams suggestions to the user as they type, but the team notices that on flaky mobile connections, dropped streaming connections leave users with partial, cut-off suggestions and no way to recover gracefully.",
    question: "Which of these is the most reasonable design response?",
    options: [
      "Abandon streaming entirely and always use non-streaming requests, since flaky connections make streaming inherently worse in every case",
      "Keep streaming for the latency benefit but add client-side handling for dropped connections — such as retry logic or falling back to requesting the full response non-streaming when a stream fails",
      "Ignore the issue, since dropped connections are the user's ISP problem and out of the team's control",
      "Switch to the Batch API so responses are guaranteed to complete regardless of the user's connection"
    ],
    correct: 1,
    explanation: "Streaming still offers real latency benefits on stable connections; the right fix is robust client-side handling for the failure case (retry, or fallback to a full non-streaming re-request) rather than discarding the technique altogether (B). Abandoning streaming entirely (A) throws away its benefit for the majority of users with stable connections to fix an edge case that has a more targeted solution. Treating it as purely an ISP problem with no app-level mitigation (C) ignores a reasonable engineering fix that's well within the team's control. The Batch API (D) is for asynchronous bulk workloads and has nothing to do with fixing a real-time mobile UX reliability issue."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A team is building an internal tool that generates unit tests for existing code. The tool runs once when a developer requests it, and the developer reviews the output before committing.",
    question: "Is this task latency-sensitive enough to require streaming?",
    options: [
      "Yes, streaming is always required for any developer-facing tool",
      "Not necessarily — since the developer explicitly triggers the request and then reviews the complete output before acting, a short wait for a complete non-streaming response is likely acceptable, though streaming could still improve perceived responsiveness",
      "No, streaming should never be used for code-generation tasks under any circumstances",
      "Streaming is irrelevant because unit test generation always uses the Batch API"
    ],
    correct: 1,
    explanation: "This is a judgment call rather than a hard rule: a developer who explicitly triggers a one-off action and then reviews the full output can typically tolerate a short wait for a complete response, though streaming remains a reasonable UX enhancement rather than a strict requirement (B). Claiming streaming is always required (A) or never appropriate (C) are both absolute rules that don't hold up — the right choice depends on the specific latency tolerance and UX goals. The Batch API (D) is for bulk, asynchronous workloads and doesn't fit a single on-demand developer request."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a multi-turn coding assistant caches a large system prompt describing coding conventions using a 5-minute cache TTL. They notice that during periods of low usage (a request every 8-10 minutes), cache hit rates are consistently zero.",
    question: "What is the most direct explanation and fix?",
    options: [
      "The requests are arriving less frequently than the cache TTL, so each request finds an expired cache and writes a fresh one; extending the TTL to a longer duration (e.g. 1 hour) would let it survive these gaps",
      "The system prompt is too large to ever be cached, regardless of TTL",
      "Cache TTLs are fixed at 5 minutes and cannot be changed for any workload",
      "This is unrelated to timing and is instead caused by the coding assistant using tool calls"
    ],
    correct: 0,
    explanation: "If requests arrive further apart than the cache's TTL, each one finds the previous cache entry has already expired and pays the write cost again — extending the TTL to a duration that comfortably spans the actual request gaps (or using an available longer-TTL option) directly fixes this (A). Prompt size isn't the described issue — large system prompts are commonly cached successfully (B). TTL is a configurable parameter, not a fixed universal constant (C). Given the described pattern — an interval close to the TTL and consistently zero hits — timing is the clear driver, not tool call usage (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team building a fraud-detection agent for financial transactions is under pressure to cut costs and considers moving from a capable model with careful reasoning to the fastest, cheapest tier with minimal prompting, since 95% of transactions are 'obviously fine' and don't need deep analysis.",
    question: "What's the key risk in this proposed cost optimization?",
    options: [
      "There is no risk — since most transactions are easy, using the cheap tier for everything is a safe blanket optimization",
      "The risk is that the hard 5% of cases — the ones actually worth catching — are exactly where a cheaper, less capable model is most likely to miss subtle fraud patterns, so a blanket downgrade could meaningfully increase false negatives on the cases that matter most",
      "The risk is purely a latency issue, since the cheap tier responds faster than needed",
      "There is no risk as long as caching is enabled, since caching compensates for any quality loss"
    ],
    correct: 1,
    explanation: "This flags a genuine over-optimization risk: a blanket downgrade based on the easy majority ignores that the value of a fraud detector is concentrated in catching the hard, subtle cases, exactly where model capability matters most (B). Claiming no risk because most cases are easy (A) misses that the whole point of the system is catching the minority that isn't easy. This isn't primarily a latency concern (C) — it's a quality/detection-risk concern. Caching addresses cost and latency, not detection accuracy, so it cannot compensate for a capability shortfall (D is a non sequitur)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is building a tool that generates a short, one-sentence product tagline from a product description. It's called once when a merchant clicks a button, and merchants report they don't mind waiting a couple of seconds.",
    question: "Given the low latency sensitivity and simple task, what model and configuration choice fits best?",
    options: [
      "The fastest, cheapest model tier without extended thinking — the task is simple, low-stakes, and doesn't need deep reasoning, and while latency tolerance is a bit higher here, there's still no benefit to paying for more capability than the task requires",
      "The most capable model with maximum reasoning effort, since taglines are marketing-critical and quality is the only thing that matters",
      "The Batch API, since the merchant isn't in a hurry",
      "Any tier is fine as long as streaming is used, since streaming is what determines cost efficiency"
    ],
    correct: 0,
    explanation: "Even with some latency tolerance, a short creative one-liner from a clear input is not a task that benefits from top-tier reasoning depth — matching tier to task complexity keeps cost low without sacrificing quality (A). Maxing out capability and reasoning effort (B) overpays for a task this simple, regardless of how 'important' taglines feel to marketing. The Batch API (C) is for high-volume, asynchronous workloads, not a single interactive click-triggered request. Streaming (D) affects delivery timing, not the cost-per-request driven by model tier and token usage."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a chat application wants to reduce cost. They currently send the full 50-turn conversation history on every request, including the original system prompt and several long tool results from early in the conversation that are no longer relevant to the current question.",
    question: "What is the best combination of optimizations for this specific situation?",
    options: [
      "Apply prompt caching to the stable system prompt and prune/summarize the now-irrelevant early tool results, rather than resending everything verbatim every time",
      "Switch to a cheaper model tier and leave the conversation history exactly as is",
      "Delete the entire conversation history and start fresh every time a new question is asked",
      "Enable streaming, since that reduces the total token count sent per request"
    ],
    correct: 0,
    explanation: "This combines two complementary, targeted fixes: caching the unchanging system-prompt prefix (which benefits from being reused across every turn) and pruning stale, irrelevant tool output (which reduces the volume of tokens resent at all) — addressing both the repeated-cost and the unnecessary-content problems described (A). A cheaper model alone (B) doesn't address the redundant/irrelevant token volume itself. Deleting all history (C) would break the conversation's continuity and the ability to reference earlier context the user still needs. Streaming (D) changes delivery timing, not the number of tokens sent as input — it has no effect on input token cost."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building an automated code migration tool (rewriting an old codebase to a new framework, file by file) currently processes each file as an independent one-shot request to the most capable model, taking several seconds per file across thousands of files, with no user waiting synchronously.",
    question: "What change would most likely reduce cost without changing which model is used?",
    options: [
      "Route the entire migration job through the Batch API, since it's a high-volume, non-interactive workload with no synchronous user waiting on individual file results",
      "Nothing can be optimized without changing the model tier",
      "Reduce the number of files processed to save cost",
      "Enable extended thinking on every file to make sure the migration is correct"
    ],
    correct: 0,
    explanation: "This describes a textbook Batch API fit — high volume, no synchronous latency requirement, independent per-file requests — and moving it to batch processing captures a real cost reduction without touching model tier or quality (A). Claiming nothing can be optimized without a model change (B) misses the batch discount that's available at the infrastructure/API-usage level. Reducing the number of files processed (C) isn't a valid optimization — it would leave the migration incomplete. Extended thinking on every file (D) would likely increase cost and doesn't address the described cost problem — it's oriented toward reasoning depth, not throughput cost."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer notices that adding extended/adaptive thinking to their document-summarization pipeline increased both cost and latency, but internal quality evaluations show no measurable improvement in summary quality over the non-thinking baseline.",
    question: "What is the correct interpretation and next step?",
    options: [
      "Keep extended thinking enabled regardless of the evaluation results, since reasoning is always beneficial even if it doesn't show up in metrics",
      "This is a sign the task doesn't benefit from extended thinking — summarization of well-structured documents may not require the kind of multi-step deliberation thinking is designed for — so it should likely be disabled to recover the latency and cost, guided by the evaluation data rather than assumption",
      "The evaluation must be flawed, since thinking always improves quality by definition",
      "Extended thinking should be kept on, but only during business hours, to average out the cost impact"
    ],
    correct: 1,
    explanation: "This is exactly the kind of empirical, task-specific check that should drive the decision: if evaluations show no quality gain from a feature that adds real cost and latency, the evidence-based move is to turn it off for that task rather than pay for it on faith (B). Keeping it on regardless of measured results (A) ignores the actual evidence in favor of an unfounded assumption. Assuming the evaluation itself must be wrong (C) presumes thinking is always beneficial, which isn't true — it helps most on genuinely multi-step reasoning tasks, and well-structured summarization may not be one of them. Time-of-day gating (D) is an arbitrary lever unrelated to the actual quality/cost question being investigated."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is trying to decide whether their internal script that runs occasional one-off data cleanup tasks (a few requests per week, not on any critical path) needs prompt caching optimization.",
    question: "What's the right call?",
    options: [
      "Yes, always implement caching first regardless of usage pattern, since it's a best practice",
      "Probably not worth the engineering effort — caching's benefit scales with repeated, frequent reuse of the same prefix, and a few infrequent one-off requests per week won't accumulate meaningful savings",
      "Yes, because caching is required by the API and requests will fail without it",
      "No, because prompt caching only works with the Batch API"
    ],
    correct: 1,
    explanation: "Caching pays off through repeated, frequent reuse of the same prefix; a handful of infrequent, low-stakes requests per week won't generate enough reuse to justify the added complexity, so this is a reasonable case to skip it (B). Treating caching as a universal best practice regardless of usage pattern (A) ignores that engineering effort should be spent where it has a measurable payoff. Caching is optional, not required for requests to succeed (C). And caching works independently of the Batch API — they're separate, complementary features (D is false)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a customer-facing product recommendation chatbot is deciding between Claude's fastest tier and its most capable tier. Early testing shows the fastest tier gives reasonable recommendations 85% of the time, but sometimes recommends clearly irrelevant products in ways that damage user trust.",
    question: "What does this data suggest about the model tier decision?",
    options: [
      "The fastest tier is fine since 85% is a passing grade in most contexts",
      "The quality gap, even if it's a minority of cases, may be significant enough to justify the more capable tier given that customer trust and conversion are directly at stake — this is a case where the cost savings may not be worth the risk",
      "The team should ignore this evaluation data and pick based on API pricing alone",
      "The team should use extended thinking with the fastest tier instead of considering the more capable tier at all"
    ],
    correct: 1,
    explanation: "This is a genuine cost/quality trade-off that needs business judgment, not a formula: for a customer-facing feature where bad recommendations actively damage trust, the failure cases may carry outsized cost even at a low rate, which can justify paying for the more capable tier despite the raw pass-rate looking decent (B). An 85% pass rate 'sounds fine' in the abstract (A), but ignores that the failures are qualitatively damaging, not just occasionally suboptimal. Ignoring evaluation data and picking on price alone (C) is exactly the under-optimization trap of choosing by habit or cost rather than fit. Reflexively pairing the fastest tier with extended thinking (D) papers over a capability gap rather than addressing it directly, and doesn't guarantee closing the observed quality gap."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A company processes customer feedback surveys nightly (about 20,000 responses) to extract sentiment and key themes. They currently use synchronous requests one at a time with the most capable model tier, and the job takes 6+ hours to finish, well past their internal SLA.",
    question: "Which changes would most effectively address both the timing and cost concerns?",
    options: [
      "Keep the current model and request pattern but simply run the job earlier in the evening",
      "Move to the Batch API for the high-volume, non-time-sensitive processing, and evaluate whether a lighter-weight model tier is sufficient for sentiment/theme extraction, which is typically a less demanding task than the most capable tier is suited for",
      "Switch to extended thinking on the most capable model to improve theme extraction accuracy, without changing anything else",
      "Increase max_tokens per request, since that's what's causing the slow processing time"
    ],
    correct: 1,
    explanation: "This combines two real levers: batch processing removes the synchronous rate-limit/latency bottleneck for a workload that can tolerate delayed results, and sentiment/theme extraction is generally well within reach of a lighter model tier, so re-evaluating tier choice can cut cost too (B). Simply shifting the same slow job earlier (A) doesn't fix the underlying throughput or cost issue. Adding extended thinking (C) would make the job slower and more expensive, working against the stated goals. max_tokens (D) controls output length per response and isn't what's driving a 6-hour synchronous processing time for 20,000 requests — the per-request rate-limited loop is the bottleneck."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is building a moderation feature that must classify user-uploaded images as safe/unsafe. They currently call the API with a text-only prompt describing the image's filename and metadata, and are considering whether to also send the raw image content directly.",
    question: "From a token/cost-optimization standpoint, is skipping the actual image content a reasonable optimization?",
    options: [
      "Yes, this is a good optimization since it clearly reduces token usage",
      "No — this isn't really an optimization at all, since filename/metadata alone is unlikely to reliably determine whether image content is unsafe, so the token savings come at the cost of the system not actually working correctly for its purpose",
      "Yes, because vision capabilities always cost more regardless of what's being classified",
      "It depends only on which model tier is used, not on what content is sent"
    ],
    correct: 1,
    explanation: "This is a case of a 'savings' that isn't a real optimization because it undermines the task itself: classifying image safety from filename/metadata alone is unlikely to be reliable, so the token reduction doesn't actually preserve the system's core function (B). Framing it as a good cost optimization purely because tokens are lower (A) ignores whether the system still works — a cheaper system that doesn't do its job isn't cheaper in any useful sense. Vision costing more in general (C) doesn't change whether omitting image content is the right call for a task that depends on visual content. And it's not just about model tier (D) — what content is actually sent to the model is a separate and equally important decision from which tier processes it."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team's agent-based system spawns a fresh sub-agent conversation for each of 30 independent research sub-tasks per user query, and each sub-agent conversation re-includes the same 8,000-token set of tool definitions and instructions at the start.",
    question: "What token-optimization technique is most directly applicable here?",
    options: [
      "Reduce the number of sub-agents to 1, since parallelism itself is the source of the cost",
      "Apply prompt caching to the shared 8,000-token tool/instruction prefix that's identical across all 30 sub-agent conversations, so it's written once and read cheaply across the rest",
      "Switch every sub-agent to use extended thinking, since sub-agents benefit more from reasoning than single-agent systems",
      "There is no applicable optimization since each sub-agent conversation is independent"
    ],
    correct: 1,
    explanation: "Even though each sub-agent conversation is logically independent, they share an identical fixed prefix (tool definitions and instructions), which is exactly the pattern prompt caching is built to exploit — cache once, read cheaply across the other 29 (B). Reducing sub-agent count to 1 (A) would fix the cost symptom by eliminating the parallelism that likely gives the system its value in the first place, rather than fixing the actual inefficiency. Switching to extended thinking universally (C) doesn't address the redundant-prefix cost and would add cost on top of it. Claiming no optimization applies because the conversations are 'independent' (D) misses that independence of conversation state doesn't preclude a shared, cacheable prefix."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building an internal tool to answer employee HR questions from a static employee handbook. Usage is moderate (maybe 200 requests/day) but steady throughout business hours, and each query needs the full handbook as context since questions can touch any section.",
    question: "What are the two most relevant optimizations to apply here?",
    options: [
      "Batch API and extended thinking",
      "Prompt caching for the static handbook content (reused across every query) and choosing a model tier appropriate to straightforward Q&A rather than defaulting to the most capable tier",
      "Streaming and the Batch API",
      "The most capable model tier and maximum reasoning effort, since HR accuracy is important"
    ],
    correct: 1,
    explanation: "A static reference document reused as context across many steady requests is a strong caching fit, and straightforward handbook Q&A typically doesn't require the most capable tier's reasoning depth, so a more modest tier keeps cost proportional to the task (B). The Batch API (A, C) doesn't fit — employees are asking questions interactively during business hours and expect a timely answer, not next-day batch turnaround. Defaulting to the most capable tier and maximum effort purely because the topic is 'important' (D) conflates the sensitivity of the subject matter with the actual reasoning complexity of retrieving and stating handbook facts, which is a more modest task."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a live sports-score chat assistant wants users to see the assistant 'typing' its response in real time as they ask about ongoing games.",
    question: "Which feature most directly supports this user experience goal?",
    options: [
      "The Batch API, since batch processing is optimized for real-time feel",
      "Streaming, since it delivers the response incrementally as it's generated rather than only after the full response completes",
      "Extended thinking, since it makes the model generate faster",
      "A larger context window, since that's what enables real-time delivery"
    ],
    correct: 1,
    explanation: "Streaming exists specifically to deliver output incrementally, producing the 'typing' effect users expect from a live assistant (B). The Batch API (A) is the opposite of real-time — it's built for asynchronous, delayed-turnaround bulk processing, not live chat. Extended thinking (C) does not make generation faster; if anything, it adds latency before the response is produced. Context window size (D) determines how much input/history fits, not how output is delivered to the client."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a multi-step research agent notices that each research query results in the agent calling a search tool 8-10 times, and after each call the full accumulated search history (including all prior raw results) is resent as context, causing the token count to balloon toward the end of a research session.",
    question: "What is the best context-management fix for this specific pattern?",
    options: [
      "Prevent the agent from making more than 2 tool calls per query, regardless of research complexity",
      "After each search, extract and retain only the relevant facts/findings rather than the full raw search result, discarding or summarizing the raw content once it's been processed — so the accumulated context grows with distilled findings, not raw data",
      "Switch to the cheapest model tier, since that reduces the per-token cost of the ballooning context",
      "There's no way to manage this — tool-heavy agentic workflows will always have linearly growing context"
    ],
    correct: 1,
    explanation: "The real problem is that raw, already-processed tool output keeps accumulating verbatim; distilling each result down to what's actually useful before it's added to ongoing context keeps growth proportional to genuinely new information rather than raw data volume (B). Arbitrarily capping tool calls (A) would limit the research quality regardless of whether more calls are actually warranted, rather than fixing the redundant-context problem. A cheaper model tier (C) reduces per-token price but doesn't address the growing token volume itself, so cost still balloons, just at a lower rate. Claiming this is unmanageable (D) ignores a standard and effective mitigation — distillation/summarization of stale tool results — that directly targets this exact pattern."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer benchmarking effort levels for a coding agent finds that 'medium' effort completes a representative task in 40 seconds at $0.08, while 'high' effort completes the same task in 65 seconds at $0.15, with no measurable difference in whether the generated code passes the test suite.",
    question: "Based on this evidence, what's the most defensible choice for this specific task?",
    options: [
      "Always use 'high' effort, since more effort can never hurt outcomes even if it doesn't help",
      "Use 'medium' effort for this task, since the benchmark shows no measurable quality benefit from 'high' effort here, only added latency and cost — while remaining open to re-testing if the task population changes",
      "Use the lowest possible effort setting available, since the benchmark shows effort doesn't matter at all for any task",
      "Alternate between effort levels randomly to average out cost over time"
    ],
    correct: 1,
    explanation: "This is a direct empirical result on a representative task: 'high' effort costs and takes more with no measured quality gain, so 'medium' is the evidence-based choice for this task, while acknowledging effort levels should be re-evaluated if the task mix changes (B). Assuming more effort 'can never hurt' and always maximizing it (A) ignores the concrete cost/latency data just gathered. Concluding effort 'doesn't matter at all' and going to the lowest setting (C) over-generalizes from one benchmark result — 'medium' showed no measured harm here, but that doesn't establish the lowest tier is equally safe without further testing. Randomizing effort levels (D) is not a principled response to this kind of evidence and just adds unpredictable cost/quality variance."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A solo developer is building a hobby project — a bot that occasionally (a few times a day) answers trivia questions in a small Discord server — and wants to keep costs near zero without much engineering effort.",
    question: "What's the most pragmatic model choice?",
    options: [
      "The fastest, cheapest tier, since trivia Q&A is a simple task and the extremely low volume doesn't justify investing in caching, batching, or other optimization infrastructure",
      "The most capable tier with extended thinking, since a hobby project should always use the best available option",
      "The Batch API, since any cost-conscious project should use batch processing",
      "A complex multi-tier routing system to dynamically pick between multiple models per question"
    ],
    correct: 0,
    explanation: "For a simple task at very low volume, picking the cheapest, fastest tier and stopping there is the pragmatic choice — the engineering cost of adding caching, batching, or routing infrastructure wouldn't be justified by the tiny scale involved (A). The most capable tier with thinking (B) is unnecessary for trivia questions and costs more for no real benefit. The Batch API (C) doesn't fit — the bot presumably needs to respond promptly to a live Discord conversation, not on a delayed batch schedule. Building a dynamic multi-tier routing system (D) is over-engineering relative to a few requests a day — the optimization effort should scale with the actual cost/complexity at stake."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building an API endpoint that generates a short product description (2-3 sentences) from structured input fields (name, category, key features). It's called from an internal content-generation pipeline, not directly by end users, and there's no user staring at a loading spinner.",
    question: "Should this endpoint use streaming?",
    options: [
      "Yes, streaming should always be enabled by default for every endpoint",
      "Probably not necessary — since there's no interactive UI consuming token-by-token output and the response is short, a standard non-streaming call is simpler to implement and sufficient here",
      "Yes, because non-streaming requests are deprecated and no longer supported",
      "It depends entirely on which model tier is used"
    ],
    correct: 1,
    explanation: "Streaming's benefit is largely about perceived latency for an interactively waiting user or avoiding timeouts on very long outputs; a short, backend-only generation with no UI consuming partial tokens doesn't need it, so simpler non-streaming code is the pragmatic choice (B). Defaulting to streaming everywhere (A) adds implementation complexity without a corresponding benefit in this backend context. Non-streaming requests remain a fully supported, standard mode of API use (C is false). And the streaming decision is about UX/latency needs, not which model tier is used (D) — it applies independently of tier choice."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team supporting a customer-facing chatbot wants to reduce their monthly API bill. They propose reducing max_tokens from 4096 to 512 across all requests as their primary cost-cutting measure, reasoning that lower max_tokens directly lowers cost.",
    question: "What's the flaw in this proposed optimization?",
    options: [
      "There is no flaw — reducing max_tokens is always a safe way to cut cost with no downside",
      "max_tokens caps the maximum output length but doesn't reduce cost for responses that were already shorter than the cap; it can also cause premature truncation of legitimately longer responses, which would be a quality regression, not a genuine optimization",
      "max_tokens only affects input token cost, not output token cost, so this change wouldn't save any money",
      "This change would have no effect at all on either cost or output quality"
    ],
    correct: 1,
    explanation: "max_tokens is a ceiling, not a target — you're billed for tokens actually generated, so lowering the cap doesn't save money on responses that were already shorter than 512 tokens, and it risks cutting off responses that genuinely need more length, which is a quality problem, not a real savings (B). Calling it a safe, no-downside change (A) ignores the truncation risk. It's actually output tokens that max_tokens bounds, not input tokens, so C has the mechanism backwards. And it does have an effect — just not a reliably positive one, so D understates the risk."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A company operates a global customer support platform with sharply different traffic by region: North America peaks 9am-5pm ET, while their APAC customer base peaks during APAC business hours, roughly 12 hours offset.",
    question: "How can this traffic pattern be used for cost/latency optimization?",
    options: [
      "This pattern is not useful for optimization since global traffic is effectively constant across a 24-hour cycle when viewed in aggregate",
      "Latency-insensitive maintenance or batch workloads (e.g. nightly aggregate reporting) can be scheduled for whichever region's off-peak window is currently occurring, since at any given hour, at least one region is likely in a low-traffic period",
      "The company should use only the Batch API for all customer support responses, since traffic is predictable",
      "The company should ignore regional patterns entirely and provision for the highest possible simultaneous global peak at all times"
    ],
    correct: 1,
    explanation: "With offset regional peaks, there's very likely always a region in a quieter window, which is a genuine opportunity to schedule latency-insensitive batch/maintenance work during a rolling off-peak period rather than treating global traffic as one undifferentiated peak (B). Claiming the pattern doesn't matter because global aggregate traffic looks constant (A) misses that the aggregate obscures a real, schedulable pattern at the regional level. Routing all customer support responses through the Batch API (C) breaks live, interactive customer support, which needs real-time responses regardless of traffic predictability. Provisioning for worst-case simultaneous global peak at all times (D) ignores the cost savings available from the fact that peaks are offset, not simultaneous."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a code-completion feature (suggesting the next few lines as a developer types) needs suggestions to appear within a few hundred milliseconds or the feature feels laggy and gets disabled by users.",
    question: "Which model/configuration choice best supports this requirement?",
    options: [
      "The most capable model tier with adaptive thinking enabled at maximum effort",
      "A fast, low-latency model tier, likely with thinking disabled or minimal, since the latency budget is extremely tight and code completion doesn't typically require deep multi-step reasoning",
      "The Batch API, since code completion happens very frequently",
      "Any model tier works equally well as long as the context window is large"
    ],
    correct: 1,
    explanation: "An extremely tight latency budget rules out anything that adds meaningful delay, and code-completion suggestions are typically a pattern-completion task that doesn't need deep reasoning, so a fast tier with minimal thinking overhead is the right fit (B). The most capable tier with maximum thinking effort (A) directly works against the hard latency constraint described. The Batch API (C) is fundamentally incompatible with sub-second interactive latency, regardless of how frequently the feature is invoked. Context window size (D) doesn't determine response latency for a task like this and isn't the deciding factor here."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer implements prompt caching by placing the cache_control marker on the very first block of their system prompt, but their system prompt also includes a dynamically interpolated 'current date: 2026-08-27' string near the end of the same system prompt block, after the marker's position in the rendered text.",
    question: "What will most likely happen to cache hit rates in this setup?",
    options: [
      "Cache hits will be high, since the marker is placed early in the prompt",
      "Cache hits will be effectively broken because caching is a prefix match — content after the marker's position that changes daily (the date string) still sits within the same cached block and invalidates the match once the date changes, even though the marker itself is positioned early",
      "This has no effect on caching, since dynamic content anywhere in the prompt is automatically excluded from the cache key",
      "Cache hits will only be affected if the date string appears in the user message, not the system prompt"
    ],
    correct: 1,
    explanation: "Caching keys on exact prefix bytes; if the volatile date string sits within the same block/prefix that's being cached (even if the marker is positioned early in the overall prompt), any change to that string invalidates the cached prefix from that point onward once the date changes (B). Assuming the marker's early position alone guarantees good hit rates (A) misunderstands that everything up to and including the marked block must be byte-identical, and a changing date breaks that. There's no automatic exclusion of dynamic content from the cache key (C) — the system doesn't know which substrings are 'meant' to be dynamic. And the location of the marker/date is what matters, not whether a similar string happens to appear elsewhere in the user message (D) — the system prompt's own volatility is the actual driver here."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building an automated invoice-processing pipeline (extracting line items, totals, and vendor info from PDF invoices) currently uses the most capable model tier for every invoice, regardless of whether it's a simple single-page invoice or a complex 15-page multi-vendor purchase order.",
    question: "What optimization would likely reduce cost while preserving accuracy on the harder documents?",
    options: [
      "Route documents to different tiers based on a cheap upfront complexity signal (e.g. page count, or a lightweight classification pass) — simple invoices to a cheaper tier, complex multi-page documents to the more capable tier",
      "Use the cheapest tier uniformly across all invoices to minimize cost, accepting whatever accuracy results",
      "Keep everything on the most capable tier, since invoice data is financial and therefore always requires maximum capability regardless of document complexity",
      "Switch entirely to the Batch API, since that alone would resolve any accuracy or cost concerns"
    ],
    correct: 0,
    explanation: "A cheap complexity signal used to route simple documents to a lower-cost tier while reserving the capable tier for genuinely complex multi-page documents captures savings on the easy majority without risking accuracy on the hard cases — this is the core cost/quality trade-off principle applied concretely (A). Uniformly using the cheapest tier (B) risks meaningful accuracy loss on the complex documents that actually need more capability. Always using the most capable tier regardless of complexity (C) overpays on simple invoices just because the domain is 'financial,' conflating stakes with task difficulty. Switching to the Batch API (D) addresses latency/throughput economics, not the tier-selection/accuracy trade-off described in the question."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer wants to know when it's appropriate to use the Batch API versus standard synchronous requests for a new feature they're building: a weekly digest email summarizing a user's activity, generated and sent automatically every Sunday night.",
    question: "Is the Batch API a good fit here?",
    options: [
      "No, because the Batch API can only process a single request at a time",
      "Yes — this is exactly the kind of scheduled, latency-insensitive, potentially high-volume (many users' digests generated together) workload the Batch API is designed for",
      "No, because weekly digests require the most capable model tier, which isn't compatible with the Batch API",
      "Yes, but only if the digest emails are sent to fewer than 10 users total"
    ],
    correct: 1,
    explanation: "A scheduled, non-interactive job generating many users' summaries at once with no one waiting synchronously is a strong match for the Batch API's design point — high-volume, latency-insensitive processing at a lower price (B). The Batch API is designed for high-volume parallel processing of many requests, not single requests (A is false). Model tier and Batch API compatibility are independent — batch processing isn't restricted to a subset of tiers by capability (C is false). And there's no minimum-scale requirement that caps batch use to under 10 users (D is an arbitrary and incorrect constraint) — if anything, batch value tends to increase with volume, not decrease."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team's cost report shows that 70% of their monthly API spend comes from a single feature: a 'explain this code' tooltip in their IDE plugin that sends the entire open file (sometimes 2,000+ lines) as context every time a developer hovers over a single line of code.",
    question: "What is the most effective optimization for this specific spend driver?",
    options: [
      "Switch the entire IDE plugin to the Batch API, since that reduces cost for any high-spend feature",
      "Send only the relevant surrounding code (e.g. the function or a bounded window of lines around the hovered line) instead of the entire file on every hover, since most of the file's content is likely irrelevant to explaining one specific line",
      "Disable the tooltip feature entirely, since there is no way to reduce its cost",
      "Increase max_tokens on each request so fewer hover events are needed"
    ],
    correct: 1,
    explanation: "Sending the full file on every single hover when only a small local window is typically relevant to explaining one line is a clear case of unnecessary context — trimming to a bounded, relevant window directly cuts the dominant cost driver while very likely preserving explanation quality (B). The Batch API (A) is wrong here — hover-triggered tooltips are inherently interactive and latency-sensitive, incompatible with batch's asynchronous model. Disabling the feature (C) is an overreaction when a much more targeted context-trimming fix is available. max_tokens (D) bounds output length, not the input context volume that's driving this specific cost problem, so it wouldn't reduce hover-event frequency or spend."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team is deciding whether to enable task_budget-style pacing (letting the model self-moderate token spend within a bounded agentic loop) for their long-running research agent, versus relying solely on a hard max_tokens ceiling per individual response.",
    question: "What's the key distinction between these two mechanisms that should inform the decision?",
    options: [
      "They are functionally identical, so the choice doesn't matter",
      "A hard max_tokens ceiling caps a single response's length and the model has no awareness of it, while a budget-style pacing mechanism gives the model visibility into its overall spend across a multi-step loop so it can pace itself and wrap up gracefully rather than being abruptly cut off",
      "max_tokens is only relevant for streaming requests, while budget pacing is only relevant for non-streaming requests",
      "Budget pacing eliminates the need for max_tokens entirely in all cases"
    ],
    correct: 1,
    explanation: "The core distinction is awareness and scope: max_tokens is an enforced, per-response ceiling the model isn't told about, so hitting it can cut off output abruptly, whereas a budget-style mechanism surfaces a running allowance to the model across an agentic loop so it can prioritize and finish gracefully as the budget is consumed (B). They are not functionally identical (A) — one is a hard enforced cap, the other is a self-moderation signal. Neither is tied exclusively to streaming or non-streaming (C) — that's not the distinguishing factor. And max_tokens remains relevant as a hard per-response ceiling even when a budget mechanism is also in use (D) — they serve different, complementary purposes rather than one replacing the other."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building a system that answers questions about a company's 200-page policy document. They're deciding between (a) sending the full document as context on every question, with prompt caching applied, versus (b) implementing retrieval to only send relevant excerpts, without caching.",
    question: "Which factors should most influence this decision?",
    options: [
      "Query volume and repetition pattern — if there are many questions against the same static document, cached full-document context can be simpler to implement and still cost-effective; if questions are infrequent or the document is huge relative to typical questions, targeted retrieval may be more efficient regardless of caching",
      "The decision should be based solely on which approach uses fewer total lines of code to implement",
      "Caching always beats retrieval regardless of document size or query pattern, so option (a) is strictly superior",
      "Retrieval always beats caching regardless of query pattern, so option (b) is strictly superior"
    ],
    correct: 0,
    explanation: "This is a genuine trade-off with no universally correct answer — it depends on real factors like query volume, repetition, and how document size compares to what's typically relevant per question, and reasoning through those factors is the right approach rather than picking one technique as always superior (A). Choosing based on implementation simplicity alone (B) ignores the actual cost/latency implications at scale. Neither caching (C) nor retrieval (D) is strictly better in all cases — each has scenarios where it's the stronger fit, which is exactly why this is presented as a trade-off analysis rather than a fixed rule."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is building a feature that summarizes a single uploaded resume (typically 1-2 pages) when a recruiter clicks 'Summarize.' The recruiter is actively watching and waiting for the result.",
    question: "Which approach best fits this use case's latency needs?",
    options: [
      "The Batch API, since it's generally the most cost-effective option available",
      "A standard synchronous request (streaming or non-streaming), since the recruiter is actively waiting in real time and the Batch API's delayed, asynchronous turnaround wouldn't meet that expectation",
      "There's no meaningful difference between the Batch API and synchronous requests for this use case",
      "The Batch API, but only if the resume is under one page"
    ],
    correct: 1,
    explanation: "A recruiter actively clicking a button and waiting is the definition of a latency-sensitive, synchronous interaction — the Batch API's asynchronous, potentially hours-long turnaround doesn't match that expectation regardless of its cost advantage (B). Choosing the Batch API purely because it's usually cheaper (A) ignores that cost efficiency doesn't matter if the feature becomes unusably slow for its actual use case. There is a meaningful difference here (C is false) — the interaction pattern is exactly what separates good batch candidates from poor ones. And page count (D) isn't the deciding factor — it's whether someone is waiting synchronously for the result, which is true regardless of resume length."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team notices their prompt-cached agentic system's cache hit rate dropped significantly after they added a new capability that lets the agent dynamically select from a growing tool library (adding or removing tools from the request based on the task) mid-conversation.",
    question: "Why does this likely explain the drop, and what's a targeted fix?",
    options: [
      "Tool definitions typically render early in the prompt, so changing the tool set on a request invalidates the cached prefix built on the old tool list; a fix is to use a tool-discovery approach that appends newly relevant tool schemas rather than swapping the tool list, preserving the earlier cached prefix",
      "This is unrelated to caching and is instead a sign the model itself has degraded",
      "Tool selection has no effect on caching whatsoever, so something else must be the cause",
      "The fix is to disable caching entirely whenever tools are used, since tools and caching are fundamentally incompatible"
    ],
    correct: 0,
    explanation: "Tool definitions typically sit at the front of the rendered prompt, so any change to the active tool set changes that prefix and invalidates the cache built on the prior list — a tool-discovery mechanism that appends newly relevant schemas instead of swapping the full list keeps the earlier prefix intact and preserves cache hits (A). Model degradation (B) is an unrelated and unsupported explanation for a caching-specific metric drop tied to a tool-set change. Tool selection absolutely can affect caching (C is false) given how prompts are rendered. And caching and tool use aren't fundamentally incompatible (D) — the actual fix is a smarter tool-management approach, not abandoning caching altogether."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a legal-contract redlining tool wants to minimize cost per contract reviewed, since they process thousands of contracts monthly, but the task involves genuinely subtle judgment about risky clauses that a simpler model tier tends to miss.",
    question: "What is the most balanced approach to reduce cost without compromising the quality bar this task requires?",
    options: [
      "Accept the cost of the most capable tier for the substantive risk-analysis step, but look for cost savings elsewhere in the pipeline — e.g. caching the shared contract-review guidelines/instructions across requests, and using a cheaper tier for simpler mechanical sub-tasks like formatting or extracting boilerplate metadata",
      "Switch the entire pipeline to the cheapest tier to hit the cost target, accepting the quality trade-off as unavoidable",
      "Refuse to optimize cost at all, since any change risks missing a risky clause",
      "Move contract review to the Batch API exclusively, since that alone solves both the cost and quality concerns"
    ],
    correct: 0,
    explanation: "This decomposes the pipeline into its genuinely hard part (subtle risk judgment, which justifies the capable tier) and its mechanical parts (formatting, metadata extraction, which don't), while also applying caching to shared static instructions — capturing real savings without touching the step where quality actually matters (A). Switching everything to the cheapest tier (B) directly undermines the task's core requirement, which the scenario states is a genuine risk. Refusing to optimize at all (C) is an overcorrection — targeted optimizations exist that don't touch the risk-sensitive step. And the Batch API (D) addresses throughput/latency economics, not the tier-selection quality trade-off that's the actual issue here — it doesn't inherently improve or preserve analysis quality."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is building a tool that converts a spoken voicemail transcript into a one-line subject tag for an inbox UI. It runs automatically the instant a new voicemail is transcribed, with no user watching.",
    question: "What model tier best fits this workload?",
    options: [
      "The fastest, cheapest tier, since generating a short tag from a short transcript is a simple task with no real-time human observer and no need for deep reasoning",
      "The most capable tier, since voicemail content could theoretically be about anything",
      "A tier chosen at random each time to spread load evenly across capacity",
      "The most capable tier with extended thinking, since audio-derived content is inherently harder to process than text"
    ],
    correct: 0,
    explanation: "A short, low-stakes tagging task with no one waiting synchronously and no deep-reasoning requirement is a clear fit for the cheapest, fastest tier (A). 'Could be about anything' (B) describes topic variety, not task difficulty — the tagging operation itself remains simple regardless of subject matter. Random tier selection (C) has nothing to do with cost/quality/latency fit and would produce inconsistent cost and quality. By the time the transcript is text, the task is ordinary short-text summarization — the fact that it originated as audio doesn't make the tagging step itself harder (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a customer-facing chat product initially used non-streaming responses, but users complained the assistant felt unresponsive on longer answers (10+ seconds before anything appeared). After switching to streaming, complaints dropped sharply even though total response time didn't change.",
    question: "What does this outcome illustrate about streaming?",
    options: [
      "Streaming reduces the actual total generation time compared to non-streaming",
      "Streaming primarily improves perceived latency and responsiveness by showing progress early, even when the total time to complete the full response is unchanged",
      "The complaints must have been caused by something unrelated to response delivery, since total time didn't change",
      "Streaming only helps when total response time is also reduced"
    ],
    correct: 1,
    explanation: "This is the core value proposition of streaming: showing incremental output early changes the user's perceived experience even when total wall-clock generation time is the same, which matches exactly what's described (B). Streaming doesn't inherently reduce total generation time (A) — the scenario explicitly states total time didn't change. Dismissing the connection to response delivery (C) ignores the direct causal link the scenario describes (complaints dropped right after the streaming change). And claiming streaming only helps when total time also drops (D) contradicts the scenario itself, where perceived responsiveness improved with no change in total time."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team runs a nightly batch job classifying 100,000 news articles into topic categories, with results needed by the next business day. They're also engineering the job so that a static 1,500-token taxonomy description is included in every request.",
    question: "Given they're already using the Batch API, is applying prompt caching to the taxonomy description also worthwhile?",
    options: [
      "No, because prompt caching cannot be combined with the Batch API under any circumstances",
      "It depends on the request/discount interaction for the specific implementation, but the underlying opportunity is real: the taxonomy is a repeated, static prefix across 100,000 requests, so wherever caching is available, applying it addresses the redundant-context cost independently of the batch discount, which addresses per-token pricing",
      "No, because once you're using the Batch API, prompt caching is automatically applied to every request with no code changes needed",
      "Caching is irrelevant here because the 1,500-token taxonomy is too short to ever be cached"
    ],
    correct: 1,
    explanation: "Batching addresses one axis of cost (discounted per-token pricing for latency-insensitive work) while caching addresses a different axis (avoiding paying full price to reprocess an identical repeated prefix) — these are complementary levers, and a large repeated static block across 100,000 requests is exactly the pattern worth evaluating for caching regardless of batch usage (B). Assuming the two are mutually exclusive by default (A) overstates a constraint without evidence. Caching isn't automatically applied for free with no setup (C) — it generally requires explicit configuration. And 1,500 tokens is well above typical minimum cacheable prefix sizes, so dismissing it as 'too short' (D) is incorrect for a block of this size."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is deciding on a model tier for an internal script that renames files in a batch export based on a simple pattern-matching rule described in the prompt (e.g., 'rename each file to include today's date'). It runs unattended as a cron job.",
    question: "What's the appropriate model tier?",
    options: [
      "The fastest, cheapest tier, since this is simple pattern-based text transformation with no ambiguity or deep reasoning involved",
      "The most capable tier, since any automation task should default to maximum reliability regardless of complexity",
      "The Batch API is mandatory here since it's a cron job",
      "Whichever tier has vision support, since file operations might involve images"
    ],
    correct: 0,
    explanation: "A simple, well-specified pattern-based transformation with no ambiguity is squarely in the territory the fastest/cheapest tier handles well, and running unattended doesn't itself imply higher complexity (A). Defaulting to the most capable tier 'for reliability' regardless of actual task complexity (B) is the over-spending mistake the trade-off framework warns against — reliability on a simple, unambiguous task doesn't require the top tier. Being a cron job doesn't mandate the Batch API (C) — that's a separate axis (latency tolerance and volume), not something implied by 'runs on a schedule' alone. Vision support (D) is irrelevant unless the task actually involves processing image content, which this scenario doesn't describe."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team's agentic coding assistant runs at 'xhigh' effort for every single request by default, including trivial ones like fixing a typo in a comment. They observe high latency and cost across the board, including on tasks that should be nearly instant.",
    question: "What does this scenario best illustrate?",
    options: [
      "Under-optimization: reaching for a high-cost setting out of habit or default configuration rather than tuning it to the actual complexity of each request",
      "Over-optimization: the team has cut too many corners on cost at the expense of quality",
      "This is unavoidable, since effort settings cannot be varied per request",
      "This is correct behavior, since coding tasks always warrant maximum effort regardless of triviality"
    ],
    correct: 0,
    explanation: "Applying a uniformly high, expensive effort setting to every request regardless of actual difficulty — including trivial fixes — is the classic under-optimization pattern: using the most expensive option out of default/habit rather than matching configuration to task fit (A). This is not an example of over-optimization (B), which would mean cutting corners on quality — here the opposite is happening, everything is over-provisioned. Effort settings are configurable per request in most designs, so 'unavoidable' (C) misdiagnoses the problem as a hard constraint rather than a tuning gap. And claiming maximum effort is always warranted for coding regardless of task triviality (D) is exactly the assumption the scenario is designed to challenge — a typo fix doesn't need the same reasoning depth as a complex refactor."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building an internal analytics chatbot for a data team is deciding whether to enable extended/adaptive thinking. The chatbot answers questions that sometimes require multi-step reasoning (e.g., 'which of these three metrics best explains the Q2 dip, and why') and sometimes require simple lookups (e.g., 'what was total revenue last month').",
    question: "Given this mixed workload, what's the best approach?",
    options: [
      "Enable adaptive thinking, which lets the model itself decide how much reasoning depth a given request needs, rather than forcing a single fixed policy across a workload with genuinely mixed complexity",
      "Never enable thinking, since some questions are simple lookups",
      "Always enable extended thinking at maximum depth, since some questions require multi-step reasoning",
      "Split the chatbot into two completely separate products based on question type"
    ],
    correct: 0,
    explanation: "Adaptive thinking is specifically designed for exactly this situation — a mixed workload where some requests need deep reasoning and others don't — letting the model scale its own reasoning depth per request rather than the developer having to pick one fixed policy for everything (A). Disabling thinking entirely (B) would hurt the harder analytical questions that genuinely benefit from multi-step reasoning. Always maxing out reasoning depth (C) adds unnecessary latency and cost to the simple lookup questions that don't need it. Splitting into two products (D) is a disproportionate architectural response to what adaptive reasoning-depth handling already solves within a single system."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a search-relevance re-ranking feature (given a query and 20 candidate documents, order them by relevance) is deciding between calling the model once with all 20 documents in context versus calling it 20 separate times, once per document, to score each independently.",
    question: "From a cost and latency perspective, what's the most relevant consideration?",
    options: [
      "There's no cost difference between the two approaches since total token volume is roughly similar either way",
      "The single-call approach likely reduces overhead from 20 separate round trips (each carrying its own fixed request overhead and, if applicable, repeated shared context like the query) and could be meaningfully faster and cheaper than 20 independent calls, assuming quality holds up when documents are considered jointly",
      "The 20-separate-calls approach is always better because smaller individual requests are inherently cheaper regardless of call count",
      "This decision should be based only on which approach is easier to implement, with no consideration of cost or latency"
    ],
    correct: 1,
    explanation: "Batching the 20 documents into one call avoids 20x the fixed per-request overhead and repeated shared context (like the query), which can add up to real latency and cost savings compared to firing 20 independent round trips — assuming ranking quality doesn't suffer from considering documents jointly rather than independently, which is worth validating (B). Claiming no cost difference (A) ignores the real overhead of many separate round trips. 'Smaller requests are inherently cheaper regardless of count' (C) misses that total cost is driven by the number of round trips and repeated context, not just individual request size. And ignoring cost/latency in favor of implementation ease alone (D) skips the actual trade-off analysis this kind of design decision calls for."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building an internal tool to draft first-pass responses to routine vendor emails (e.g., 'please confirm receipt of invoice #4521') wants a model choice that keeps cost low, since the tool runs on every incoming vendor email, of which there are thousands per month, and a human always reviews before sending.",
    question: "What is the most sound model tier choice given human review is always in the loop?",
    options: [
      "The fastest, cheapest tier — the task is routine, high-volume, low-stakes per instance (since a human reviews before anything is sent), and doesn't need deep reasoning",
      "The most capable tier, since any outbound business communication should use maximum quality regardless of review safeguards",
      "The Batch API is required since email volume is high",
      "Whichever tier is currently trending as 'most advanced' regardless of task fit"
    ],
    correct: 0,
    explanation: "Routine, templated email drafting at high volume with a human review safety net is a strong fit for the cheapest, fastest tier — the task doesn't need deep reasoning, and the review step further reduces the cost of an occasional imperfect draft (A). Defaulting to maximum quality 'because it's outbound business communication' regardless of the review safeguard (B) ignores that the human-in-the-loop step is precisely the kind of context that should lower the quality bar needed from the model itself. High volume alone doesn't force the Batch API (C) — that decision depends on whether responses are needed promptly (drafts for review generally are, to keep the workflow moving), not purely on volume. And picking based on trend/hype rather than actual task fit (D) is not a sound selection criterion."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer notices that a request to their Q&A endpoint that used to complete in 2 seconds now takes 6 seconds after they added a large static reference document with prompt caching enabled, even though this is the tenth identical request in the last minute and should be reading from cache.",
    question: "What is the most likely explanation worth investigating?",
    options: [
      "Prompt caching always adds latency regardless of hit/miss status, so this is expected and no investigation is needed",
      "Something is preventing the cache from being read on this request — worth checking usage.cache_read_input_tokens in the response to confirm whether it's actually a cache hit, since a genuine hit should be faster than processing the full document fresh, not slower",
      "The 6-second latency is unrelated to caching and must be a network issue with no connection to the recent code change",
      "Caching only reduces cost, never latency, so a slowdown after adding caching is completely normal and expected"
    ],
    correct: 1,
    explanation: "A genuine cache hit should be faster, not slower, than processing the full document from scratch — so an unexpected slowdown on what should be a repeat, cached request is a signal to check the usage fields (specifically cache_read_input_tokens) to confirm whether the cache is actually being hit rather than assuming it is (B). Claiming caching 'always adds latency' regardless of hit/miss (A) contradicts the basic mechanism of caching, which exists to speed up repeated processing. Blaming an unrelated network issue with no further investigation (C) skips the more directly relevant explanation tied to the very feature that was just added. And claiming caching never affects latency, only cost (D) is inaccurate — cached reads are also typically faster, which is exactly why this scenario is worth investigating as a probable caching malfunction rather than dismissing it."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a customer-facing chatbot for a mid-size e-commerce site currently uses the most capable model tier for every single message in a conversation, including simple greetings and closing pleasantries, resulting in a much higher bill than their traffic volume alone would suggest is necessary.",
    question: "Which of the following best characterizes the core issue and a reasonable fix?",
    options: [
      "This is optimal, since consistent model quality throughout a conversation avoids jarring quality shifts a user might notice",
      "This is a sign of under-optimization — paying top-tier cost for exchanges (greetings, pleasantries) that don't need top-tier reasoning — and per-turn complexity-based routing or a lighter default tier with escalation only for substantive requests would likely reduce cost without a noticeable quality hit",
      "The fix is to switch entirely to the Batch API, since that would reduce cost regardless of per-message complexity",
      "There is no fix available short of reducing the number of conversations handled"
    ],
    correct: 1,
    explanation: "Paying the most capable tier's price for every turn — including ones that plainly don't need deep reasoning — is a textbook under-optimization pattern, and routing simple exchanges to a lighter tier (or defaulting to a cheaper tier with escalation for harder requests) is the direct fix (B). Calling uniform top-tier usage 'optimal' for consistency (A) overstates the risk of quality shifts on trivial exchanges, where a lighter model is unlikely to produce a noticeably worse greeting. The Batch API (C) doesn't fit a live, interactive chatbot conversation where customers are waiting for real-time replies. And claiming no fix exists short of reducing conversation volume (D) ignores the much more direct lever of per-turn model-tier routing."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a nightly job that regenerates thumbnail alt-text descriptions for a media library (200,000 images, purely for accessibility metadata, not shown live to any waiting user) is deciding on request handling.",
    question: "Which approach best fits this specific workload?",
    options: [
      "Streaming synchronous requests, since streaming is the standard best practice for all workloads",
      "The Batch API, since this is high-volume, non-interactive, and can tolerate delayed turnaround, which is exactly the kind of workload that benefits most from batch discounted pricing",
      "A single very large request containing all 200,000 images at once to minimize the number of API calls",
      "The most capable model tier with extended thinking, since accessibility is important and shouldn't be compromised"
    ],
    correct: 1,
    explanation: "High volume, no synchronous waiting, and tolerance for delayed turnaround are exactly the conditions the Batch API is built for, and using it here captures a real, appropriate cost reduction (B). Streaming (A) is meant to address perceived latency for an actively waiting consumer, which doesn't apply to a background nightly job — treating it as a universal best practice ignores use-case fit. Cramming all 200,000 images into a single request (C) isn't how requests are structured or sized in practice and isn't a meaningful optimization strategy. And equating 'accessibility is important' with a need for the most capable tier and maximum reasoning (D) conflates the social importance of the outcome with the actual difficulty of generating a short alt-text description, which is a comparatively simple task."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer is building an internal Slack bot that answers questions about a 15,000-token engineering runbook. The bot is used by on-call engineers during incidents, where every second of delay matters, but questions are infrequent — maybe 5-10 per week across the whole team.",
    question: "Given the low query volume but high per-query latency sensitivity, what's the most reasonable configuration?",
    options: [
      "Skip prompt caching given the low volume (it won't accumulate much savings), but still prioritize a fast model tier and streaming, since latency matters a great deal during an active incident regardless of how infrequently the bot is used overall",
      "Use the Batch API, since infrequent usage means latency doesn't matter",
      "Apply heavy prompt caching optimization as the top priority, since that's always the most important lever regardless of query volume",
      "Ignore latency entirely since only 5-10 people per week are affected"
    ],
    correct: 0,
    explanation: "This scenario has two somewhat independent variables: low volume (which limits how much caching would realistically save, given the cost/benefit math depends on frequent reuse within the cache TTL) and high per-query latency sensitivity (which is about the stakes of an individual query during an active incident, not about how often the bot is queried) — a fast tier and streaming address the latency stakes directly, while caching is reasonably deprioritized given the low reuse volume (A). The Batch API (B) is wrong for exactly the opposite reason stated — low volume doesn't mean low latency sensitivity; during an incident, an on-call engineer needs an answer immediately, which rules out asynchronous batch processing entirely. Prioritizing caching as 'always most important' (C) ignores that its benefit is volume-dependent and may not pay off well at 5-10 queries a week. And dismissing latency because few people are affected (D) confuses the number of users with the stakes of each individual interaction — during an incident, speed matters a great deal even for a single user."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A team is comparing two agent designs for an automated code-review pipeline that runs on every pull request: Design A always uses maximum effort and the most capable model on every PR, regardless of size. Design B uses a lightweight first pass to flag PRs likely to contain risky changes (large diffs, changes to security-sensitive files) and only escalates those to the capable, high-effort configuration; simple PRs get a lighter pass.",
    question: "Which design better reflects sound cost/quality trade-off reasoning, and why?",
    options: [
      "Design A, because consistent tooling behavior across all PRs is more valuable than any potential cost savings",
      "Design B, because it concentrates the more expensive, higher-quality analysis on the PRs where it's most likely to matter (large diffs, security-sensitive changes) while avoiding that cost on straightforward, low-risk PRs — this is complexity-aware routing rather than a blanket policy",
      "Design A, because escalation logic in Design B introduces a risk that some risky PRs get routed to the lightweight pass by mistake, which makes it strictly worse regardless of cost savings",
      "Neither design matters, since code review quality is unaffected by model tier or effort level"
    ],
    correct: 1,
    explanation: "Design B applies the core cost/quality trade-off principle correctly: route based on actual risk signals so the expensive, careful analysis is spent where it's most likely to catch something important, while simple, low-risk changes don't carry that same cost (B). Design A's blanket top-tier policy (A) spends the same premium on a one-line documentation fix as on a security-sensitive change, which is disproportionate to the actual risk. Option C raises a real engineering concern (misrouting risk) but treats it as an absolute disqualifier rather than a design detail to tune (e.g., conservative escalation criteria, sampling checks) — it doesn't make Design B 'strictly worse,' just something to implement carefully. And model tier and effort level do meaningfully affect review quality on genuinely hard cases, so claiming no effect at all (D) is incorrect."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a personal finance app wants to generate a monthly spending insights report for each user, computed once at the start of each month for all users at once, with no individual user waiting on their specific report at generation time (reports appear in-app whenever the user next opens it).",
    question: "Which infrastructure choice fits this pattern best?",
    options: [
      "Real-time streaming synchronous requests fired the moment each user opens the app, since that's the only way to guarantee freshness",
      "The Batch API, generating all users' reports together at the start of the month, since this is bulk, non-time-critical work with no one waiting synchronously for their individual result at generation time",
      "A single API call containing every user's transaction data merged into one giant prompt to save on request overhead",
      "The most capable model tier with maximum effort for every user's report regardless of the complexity of their spending patterns"
    ],
    correct: 1,
    explanation: "Bulk generation with no synchronous per-user waiting is exactly the Batch API's design point, and doing this once at the start of the month for the full user base is a natural fit for its discounted, asynchronous processing model (B). Real-time streaming at open-time (A) adds unnecessary latency and cost pressure for something that doesn't need to be computed on demand, given reports are pre-generated monthly. Merging every user's data into a single giant prompt (C) conflates two unrelated users' financial data in one request and isn't how per-user report generation would reasonably be structured — separate requests per user, submitted as a batch, is the sound approach. And using maximum effort and the most capable tier uniformly (D) ignores that most users' monthly spending patterns are probably straightforward to summarize, making that a case of over-spending relative to typical task complexity."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer is comparing the cost implications of two designs for a chat feature: Design A resends the full conversation history (growing over time) on every turn with prompt caching enabled on the stable portions. Design B resends the full conversation history with no caching applied at all.",
    question: "All else equal, which design is more cost-effective as the conversation grows longer?",
    options: [
      "Design B, since caching adds overhead that outweighs any benefit",
      "Design A, since caching lets the stable, already-seen portion of the growing history be billed at a reduced cache-read rate on each subsequent turn instead of full price every time",
      "They are equally cost-effective, since total token count sent is the same either way",
      "Design B, since caching only works for system prompts, not conversation history"
    ],
    correct: 1,
    explanation: "Caching the stable, already-processed portion of a growing conversation means that content is billed at the much cheaper cache-read rate on subsequent turns instead of full input price every time, which becomes increasingly valuable as the conversation — and the amount of stable prior history — grows (B). Assuming caching's overhead outweighs its benefit (A) gets the economics backwards — the write premium is paid once, then reads are cheap on every subsequent turn. Total token count sent may be similar, but the price paid per token differs substantially between cached and uncached tokens, so the two designs are not equally cost-effective (C is wrong). And caching is not limited to system prompts — message content, including growing conversation history, can be cached too (D is false)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A developer building a meeting-transcription summarizer for a video conferencing product wants transcripts summarized and available to users within about 10 seconds of a meeting ending — not instantaneous, but users do expect it reasonably promptly, and won't tolerate an hours-long wait.",
    question: "Given this loose-but-real latency requirement, is the Batch API a good fit?",
    options: [
      "Yes, since the request happens automatically without a human clicking a button in real time",
      "No — the Batch API's typical turnaround (potentially up to hours) doesn't reliably meet a roughly 10-second expectation, even though nobody is watching a live streaming response; a standard synchronous (or streaming) request is the better fit for this latency bound",
      "Yes, since the Batch API guarantees results within any specified time window if you request it",
      "It doesn't matter which is used, since cost is identical either way"
    ],
    correct: 1,
    explanation: "The deciding factor for batch suitability is whether the latency tolerance matches the Batch API's typical (often much longer, non-guaranteed) turnaround — a roughly 10-second user expectation is far tighter than that, even though the trigger is automatic rather than a live button click, so a standard synchronous or streaming request is the better-fitting choice (B). 'No human clicking a button' (A) isn't the deciding factor — what matters is the actual latency tolerance of the use case, not whether a human explicitly initiated the request. The Batch API does not guarantee a specific turnaround window on request (C) — its economics are built around flexible, typically longer processing time, not adjustable per-job SLAs. And cost is not identical between the two approaches (D) — batch processing offers a real discount specifically in exchange for accepting looser timing, which this use case can't accept."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A developer building a churn-risk flagging tool runs a nightly job that reads each customer's account notes (a few hundred words) and outputs a single risk category: low, medium, or high. Results feed into a dashboard reviewed the next morning.",
    question: "What model tier is most appropriate for this task?",
    options: [
      "The fastest, cheapest tier — this is a bounded classification task over short text with a fixed output vocabulary, well within the capability of a lightweight model",
      "The most capable tier, since churn prediction is a business-critical metric and should never use a lower tier regardless of task structure",
      "Extended thinking at maximum depth, since classification accuracy should always be maximized regardless of cost",
      "Whichever tier has the largest context window, since that's the primary driver of classification accuracy"
    ],
    correct: 0,
    explanation: "A three-way classification over a few hundred words of text is a bounded, well-defined task that a fast, cheap tier handles well — the task's structure, not the business importance of the outcome, should drive tier selection (A). Defaulting to the most capable tier purely because the metric is 'business-critical' (B) conflates stakes with task difficulty, a recurring over-optimization trap. Maximizing reasoning depth regardless of cost (C) adds latency and expense without addressing what actually limits classification quality here (likely prompt clarity and category definitions, not reasoning depth). And context window size (D) is irrelevant when the input is only a few hundred words — it isn't the bottleneck for this task."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building a research-paper analysis tool for scientists needs to answer nuanced questions that sometimes require cross-referencing claims across a 40-page paper and its cited references, and sometimes are simple factual lookups like 'what year was this published.'",
    question: "Which approach best balances cost and quality for this genuinely mixed-difficulty workload?",
    options: [
      "Route requests dynamically based on their actual complexity — simple factual lookups to a lighter, faster configuration, and cross-referencing/synthesis questions to a more capable configuration with appropriate reasoning support — rather than applying one fixed policy to every question",
      "Always use the most capable model with maximum effort for every question, since some questions are genuinely hard",
      "Always use the fastest, cheapest tier for every question, since most individual lookups are simple",
      "Alternate between tiers on a fixed schedule unrelated to the actual question asked"
    ],
    correct: 0,
    explanation: "Since the workload has genuinely mixed complexity — simple lookups and hard cross-referencing questions both occur — the sound approach is matching configuration to each request's actual difficulty rather than picking one fixed policy for the whole workload (A). Always using the most capable, max-effort configuration (B) overpays substantially on the simple factual questions, which are common. Always using the cheapest tier (C) risks real quality loss on the genuinely hard cross-referencing questions that need deeper reasoning. And scheduling tier choice on a fixed, question-unaware rotation (D) has no relationship to actual per-question difficulty and would misallocate capability essentially at random."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A developer builds a system prompt caching setup where the system prompt includes a call to a function that inserts a randomly generated request-tracking ID at the very start of the system prompt text, before the main instructions, for internal logging purposes.",
    question: "What will this most likely do to prompt cache performance, and what's the fix?",
    options: [
      "It will have no effect, since tracking IDs are automatically stripped from the cache key by the API",
      "Since caching is a prefix match and the tracking ID sits at the very start of the cached content, every request will have a different prefix from the first byte onward, breaking the cache on effectively every single request; the fix is to move the tracking ID out of the cached prefix — e.g., into a separate uncached location, such as a header or a later, uncached portion of the request",
      "It will only affect caching if the tracking ID is longer than 100 characters",
      "It will improve caching, since unique IDs make each request easier for the system to distinguish"
    ],
    correct: 1,
    explanation: "Because caching keys on exact prefix bytes and the random ID is placed at the very beginning of the cached content, essentially every request produces a different prefix from byte one, guaranteeing cache misses; relocating the volatile ID outside the cached prefix (e.g., a request header, or after the cache breakpoint) preserves the stable instructions as a genuinely reusable cache (B). There's no automatic stripping of arbitrary dynamic content from the cache key (A) — the system has no way to know the ID is 'meant' to be excluded. Length of the ID (C) isn't the relevant factor — even a short ID that changes every request breaks prefix matching from its position onward. And uniqueness making requests 'easier to distinguish' (D) misunderstands caching entirely — caching benefits from sameness across requests, not per-request uniqueness."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A team building an automated meeting-notes-to-action-items extractor is deciding whether their feature (triggered automatically right after a meeting ends, with results appearing in a shared doc a few minutes later — no one watching live) needs streaming.",
    question: "Is streaming likely to add meaningful value here?",
    options: [
      "Yes, streaming must always be used for any user-facing feature regardless of how results are consumed",
      "Probably not for UX purposes, since no one is watching the response arrive token-by-token in real time and a few minutes' delay is already an accepted part of the workflow — though backend streaming could still help avoid request timeouts on a long transcript if that's a practical concern",
      "Yes, because non-streaming requests cannot process meeting transcripts of any length",
      "No, streaming would actually make the feature slower to implement and should never be considered regardless of the timeout situation"
    ],
    correct: 1,
    explanation: "The relevant question is whether anyone is consuming output incrementally in real time — here, results land in a shared doc a few minutes later with no live viewer, so streaming's core UX benefit doesn't apply; the one legitimate reason to still consider it is avoiding request timeouts on a long transcript, which is a separate, practical concern from user-perceived responsiveness (B). Treating streaming as mandatory for any user-facing feature regardless of consumption pattern (A) ignores that its benefit is tied specifically to real-time perceived latency. Non-streaming requests can absolutely handle long transcripts up to normal request limits (C is false). And dismissing streaming outright with no consideration of the timeout angle (D) throws away a potentially valid reason to use it even when the UX benefit doesn't apply."
  }
];
