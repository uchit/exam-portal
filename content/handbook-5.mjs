export const HANDBOOK = {
  slug: "context-reliability",
  title: "Context and Reliability in Production",
  dek: "How to budget context, cache prompts, compact history, and design retries so agents stay fast, cheap, and correct.",
  minutes: 12,
  bodyHtml: `
    <p>Every request you send to Claude draws from one finite pool of tokens: the context window. That pool covers the system prompt, every registered tool definition, any documents or search results you inject, the conversation history, and the model's own output. Treating this as a single shared budget, rather than "however much chat text fits," is the difference between a system that degrades gracefully under load and one that fails in ways nobody predicted. This piece covers what counts against your context budget, how prompt caching works well enough to be worth using, why summarization silently breaks agents, how to make tool calls safe to retry, and how to catch regressions before users do.</p>

    <h2>What actually counts against your context budget</h2>
    <p>The ranking of token consumers in a real agentic system is often the opposite of what people expect. A system prompt with embedded few-shot examples can run several thousand tokens before a user has typed anything. Tool definitions compound this: the name, description, and schema for every registered tool cost tokens on <strong>every single request</strong>, not once at setup. An agent with fifteen tools, each with a moderately detailed schema, can spend a meaningful fraction of a small context window before the model reads a word of input.</p>
    <p>Retrieved data is usually the largest line item of all. A pipeline that stuffs five full documents into context because a search returned five hits exhausts budget fast, and fails silently — no error, just worse answers or a hard context-limit failure. Treat budgeting as a design exercise: line up system prompt, tool schema, retrieval, history, and reserved output tokens as separate items that sum comfortably under the window, with margin for the conversation to grow.</p>
    <p>Output tokens draw from the same pool as input. A request that fills 95% of the window with input leaves almost no room to respond, which is especially painful for long-output tasks like a large diff or a detailed report. Reserve output budget explicitly rather than discovering the shortfall when a response cuts off mid-sentence.</p>
    <h3>Search narrow, read narrow</h3>
    <p>This discipline matters most in codebase-exploration agents. An agent that needs one function signature should not reflexively read whole files, let alone whole directories, "to be safe." A targeted grep costs a fraction of a full-file read, and the safety benefit of reading more is mostly illusory — it rarely changes the correctness of a one-line edit, it just crowds out budget for everything else. As a working number: if your system prompt plus tool definitions already consume more than 10-15% of the window before any conversation happens, trim descriptions, make some tools conditional, or split a monolithic toolset into task-specific subsets.</p>

    <h2>How prompt caching works in practice</h2>
    <p>Prompt caching lets you mark a portion of a request as a reusable prefix, so later requests can skip reprocessing it and read it from a server-side cache instead. This cuts latency and cost on the cached portion, which matters a lot for agentic loops that resend a large, mostly-static system prompt and tool set on every turn.</p>
    <p>The mechanic that governs everything else: caching works on a prefix basis. Everything up to your cache breakpoint is a candidate for reuse, but only if it's byte-for-byte identical to a previous request. The moment anything before that boundary changes, the cache is invalidated from that point forward — even if 95% of the prefix is unchanged. Content ordering is therefore a functional decision, not a stylistic one: stable content first, variable content last.</p>
    <p>A request structure that caches well puts the system prompt and tool definitions first, marks a cache breakpoint after them, and appends new conversation turns after that breakpoint:</p>
    <pre><code>{
  "system": [
    {
      "type": "text",
      "text": "You are a support agent. Follow these policies: ...",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "tools": [
    { "name": "lookup_account", "description": "...", "input_schema": { "...": "..." } }
  ],
  "messages": [
    { "role": "user", "content": "My order hasn't arrived." },
    { "role": "assistant", "content": "Let me look that up for you." },
    { "role": "user", "content": "Order number is 48213." }
  ]
}</code></pre>
    <p>After the call, check <code>usage.cache_read_input_tokens</code> and <code>usage.cache_creation_input_tokens</code>. A healthy setup shows a large <code>cache_read_input_tokens</code> value from turn two onward — the prefix was reused, not rebuilt.</p>
    <p>The most common way to break this: putting something trivially dynamic inside the cached region — a "today's date is ..." line, a live token count, a request ID. Any of these changes the prefix on every call and defeats caching entirely, even though the rest of the prompt is identical every time. Move dynamic fields to after the cache breakpoint, or accept they can't be cached and isolate their cost. The same failure shows up when a framework reinserts a summary of earlier turns near the top of the message list "to keep things tidy" — that invalidates the cache downstream. Nothing should be inserted before the breakpoint once a conversation is underway.</p>

    <h2>The summarization trap</h2>
    <p>As a session runs long, history fills the context window — prior turns, tool calls, tool results, reasoning. Compaction condenses older history, typically by summarizing it, to free room to keep going instead of hitting a hard context-limit wall. It's necessary for any long-running agent, and it's also one of the most common sources of silent, hard-to-diagnose failure in production.</p>
    <p>The failure doesn't look like a failure. The agent doesn't crash. It keeps producing responses, but they get progressively vaguer or subtly wrong, because the specific facts that grounded them — a file path, an exact error message, a threshold a user specified thirty turns ago — got folded into a high-level gist and lost. This is worse than a hard failure in some ways: it's easy to miss in review and easy to misattribute to "the model getting worse" rather than a context-management decision. For example, an agent given an exact stack trace and line number in turn 3 may, by turn 40, have that folded into "investigated an error in the payment module" — reasoning about the module in the abstract instead of the specific function, and turning generic instead of targeted.</p>
    <p>Good compaction is selective, not uniform. Details with high reuse value — file paths, exact error text, IDs, numeric parameters, explicit constraints — should survive verbatim or get extracted into a structured note, not folded into prose. Conversational scaffolding — pleasantries, dead-end exploration, redundant restatement — is safe to compress hard. A mechanism that works well: maintain a persistent "active constraints" note alongside the rolling summary, exempt from every compaction pass. If a user says "do not touch anything under /legacy, it's frozen for a migration" in turn 5, that belongs in the persistent note, not at the mercy of whatever summarization does at turn 60.</p>

    <h2>Designing for safe retries</h2>
    <p>Two properties determine how a system behaves when something goes wrong or gets repeated: idempotency, what happens when an action runs more than once, and error propagation, how a failure in one step should affect the rest of a workflow.</p>
    <h3>Idempotency: running twice should equal running once</h3>
    <p>A tool call is idempotent if executing it multiple times produces the same end state as executing it once. This is required for any action that might get retried — by your own orchestration after a timeout, by a network layer resending a request, or by an agent re-attempting a step it isn't sure succeeded. Without it, a routine retry can cause real damage: a duplicate notification, a customer charged twice, two identical support tickets.</p>
    <p>The fix isn't avoiding retries — they're essential for surviving transient failures — it's making actions safe to retry. The standard technique is an idempotency key: an identifier attached to a logical operation, not each individual HTTP attempt, so the receiving system recognizes "I've already done this" and returns the prior result. Reads are naturally idempotent. "Set to value X" writes usually are too. "Increment by X" or "send a message" writes are not, and need an explicit guard before a retry-capable agent gets access to them.</p>
    <p>A minimal pattern for a retried tool call, generating the key once per logical operation and reusing it across attempts:</p>
    <pre><code>function chargeCustomer(orderId, amount) {
  // Derived from the operation itself, not the attempt --
  // retrying this call reuses the same key.
  const idempotencyKey = "charge_" + orderId;
  return paymentApi.post("/charges", {
    amount: amount,
    currency: "usd",
    idempotency_key: idempotencyKey
  });
}

// Receiving end checks the key against a dedup table
// before charging:
//   if (seen(key)) return storedResult(key);
//   result = performCharge(...);
//   store(key, result);
//   return result;</code></pre>
    <p>Not every tool call needs this treatment — the judgment call is identifying which actions are both non-idempotent and consequential enough to guard: sending an email, charging a payment method, posting a public message. A read-only lookup needs no guard, since repeating it changes nothing.</p>
    <h3>Error propagation: match the response to the failure</h3>
    <p>When a step fails, the right response depends on what kind of failure it is. A single blanket policy — always retry, always halt, always swallow and continue — produces infinite loops on unrecoverable errors, unnecessary stops on minor hiccups, or silent degraded output with no signal anything went wrong. Three categories are worth distinguishing:</p>
    <ul>
      <li><strong>Invalidating errors</strong> — a required input is malformed in a way that makes the rest of the plan meaningless. Halt rather than continue on a broken premise.</li>
      <li><strong>Transient errors</strong> — a rate limit, a timeout, a momentary network blip. Retry with backoff, since the same call is likely to succeed shortly after.</li>
      <li><strong>Non-critical errors</strong> — a supplementary lookup fails but the core task can still complete with slightly reduced quality. Degrade and continue, logging the failure.</li>
    </ul>
    <p>These properties interact. A three-step workflow — look up an account, validate a discount code, apply the discount and email a confirmation — should retry step 2 on a timeout (transient), halt immediately if step 1 fails because the account doesn't exist (invalidating), and if the confirmation email in step 3 fails after the discount applied, log it and continue (non-critical). The email step still needs an idempotency key so a retry doesn't send two confirmations. Getting the category right without also making the action safe is only half the fix: a payment call that times out but actually succeeded, retried under a naive "retry three times" policy with no key, charges the customer three times.</p>

    <h2>Escalation, evals, and knowing where a fact came from</h2>
    <p>An autonomous agent will regularly hit situations where it isn't fully sure what the right action is. The useful question isn't whether it should ever ask for help, but when. Escalating makes sense only when three conditions hold together: high-stakes, hard to reverse, and genuinely low confidence. A decision can be irreversible and still not warrant escalation if the agent is confident based on clear instructions; it can involve real uncertainty and still not warrant it if the stakes are low or the action is trivially undone. Escalating on every uncertain call produces "escalation fatigue," where people stop reading requests carefully; never escalating means an agent eventually takes an irreversible action on a low-confidence guess. Most ambiguity is routine — make the best call, state the assumption explicitly, and let review catch it if wrong.</p>
    <p>An eval is a structured test suite that scores outputs against expected behavior across representative inputs — a unit test suite for a component whose behavior is defined by a prompt and a model rather than deterministic code. Without one, changes to a prompt, tool definition, or model version get validated by spot-checking a handful of examples, which reliably misses regressions on inputs nobody tried. A useful suite covers known-hard and edge cases, not just the happy path, and scores against defined behavior — often checking that a tool-call sequence matches an expected set or that specific facts appear in the output, rather than exact-string matching — and runs automatically on every meaningful change, not once at launch.</p>
    <p>A minimal eval case needs an input, an expectation, and a programmatic scoring rule — the scoring rule is the part most people skip, and the part that actually makes the suite catch regressions without a human eyeballing every run:</p>
    <pre><code>{
  "id": "discount-invalid-code",
  "input": {
    "messages": [
      { "role": "user", "content": "Apply code SAVE20XX to order 48213." }
    ]
  },
  "expected": {
    "tool_calls": ["lookup_account", "validate_discount_code"],
    "must_not_call": ["apply_discount"],
    "output_contains_any": ["invalid", "not recognized"]
  },
  "score": function(actual) {
    const gotCalls = expected.tool_calls.every(t => actual.tool_calls.includes(t));
    const noForbidden = !actual.tool_calls.includes("apply_discount");
    const flagged = expected.output_contains_any.some(s => actual.output.toLowerCase().includes(s));
    return gotCalls && noForbidden && flagged;
  }
}</code></pre>
    <p>Write at least three cases per behavior you maintain: a happy path with a specific expected output or tool-call sequence, an edge case you know is tricky, and an adversarial or malformed input. If a prompt change ships and a regression only surfaces from user complaints, the gap is almost always "no eval ran before shipping," not "the reviewer wasn't careful enough."</p>
    <p>Worth tracking alongside evals: information provenance, knowing which tool call, file, or turn produced a fact. A live API response showing a feature flag is off should outweigh a two-week-old support ticket saying "we turned this on for them," since it's a direct, current read of the system of record. When sources genuinely conflict, surface both rather than silently picking the more specific-sounding one.</p>

    <h2>Common mistakes</h2>
    <ul>
      <li><strong>Reading whole files or directories "to be safe" for a small, targeted change.</strong> It rarely improves correctness and crowds out budget you'll need later.</li>
      <li><strong>Putting dynamic content (dates, request IDs, live counters) ahead of your cache breakpoint.</strong> This invalidates the cached prefix on every request, even when the rest of the prompt is identical.</li>
      <li><strong>Reordering or reinserting summarized history near the top of the message list.</strong> Anything before the cache boundary that changes between requests defeats caching downstream.</li>
      <li><strong>Applying compaction uniformly to all history past a certain age.</strong> Explicit constraints, exact error text, and IDs need to survive in a persistent note, not get folded into a lossy gist with routine turns.</li>
      <li><strong>Wrapping every tool call in "retry up to three times" without checking idempotency first.</strong> A payment call that times out but actually succeeded gets charged again on a retry with no idempotency key.</li>
      <li><strong>Applying one error policy to every failure.</strong> Halt on invalidating errors, retry with backoff on transient ones, degrade and continue on non-critical ones.</li>
      <li><strong>Escalating on every low-confidence call, or never escalating.</strong> Reserve it for decisions that are high-stakes, hard to reverse, and low-confidence together — escalating on trivial choices trains people to stop reading requests carefully.</li>
      <li><strong>Shipping prompt or tool changes validated only by spot-checking a few examples.</strong> Regressions on inputs nobody tried during manual review are exactly what an automated eval suite catches before users do.</li>
    </ul>
  `
};
