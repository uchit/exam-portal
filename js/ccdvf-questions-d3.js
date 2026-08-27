export const QUESTIONS_D3 = [
  // ===== 1. stop_reason checking/branching (8) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer builds a coding assistant agent. The loop calls the API, and the code does `if response.content[0].type == 'tool_use': execute_tool(...)` without ever inspecting `response.stop_reason`.",
    question: "What is the most likely bug this introduces?",
    options: [
      "The agent will crash immediately on the first request",
      "If the first content block happens to be text followed by a tool_use block, or stop_reason is 'max_tokens' with a partial tool_use block, the code may execute a malformed or unintended tool call instead of correctly branching on why the turn ended",
      "The API will reject the request because stop_reason must be read before content",
      "Tool calls will silently be ignored and the agent will only ever return text"
    ],
    correct: 1,
    explanation: "stop_reason is the authoritative signal for why the turn ended (end_turn, tool_use, max_tokens, stop_sequence) and must be checked before deciding how to interpret content blocks (B). Indexing content[0] directly is fragile — a preamble text block often precedes a tool_use block, and a max_tokens cutoff can leave a tool_use block with truncated, invalid JSON input. The API doesn't enforce read order (C), and tool calls aren't silently dropped (D) — they just get mishandled by naive code."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "In a customer-support triage agent's loop, a developer writes: `if response.stop_reason == 'tool_use': ... elif response.stop_reason == 'end_turn': return response.text`. There is no branch for any other stop_reason value.",
    question: "What happens when the model hits its max_tokens limit mid-response during a long tool-planning turn?",
    options: [
      "The loop falls through with no matching branch, silently doing nothing or raising an unhandled case, and the truncated response is lost without the caller knowing the answer was incomplete",
      "The API automatically retries the request with a higher max_tokens value",
      "stop_reason will still read 'end_turn' so the existing branch handles it correctly",
      "The SDK raises an exception before the loop code runs, so this case is already handled"
    ],
    correct: 0,
    explanation: "stop_reason == 'max_tokens' is a distinct, real value the loop must handle explicitly — treating it as unhandled means truncated output is silently mishandled (A). The API never auto-retries with adjusted parameters (B), stop_reason correctly reflects 'max_tokens', not 'end_turn' (C), and the SDK returns the response normally without raising (D) — max_tokens is not an error condition at the transport level."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A DevOps automation agent uses server-side tools (web search) inside its loop. After 10 internal search iterations, the response comes back with `stop_reason: 'pause_turn'`. The developer's loop only handles 'tool_use' and 'end_turn', so it treats 'pause_turn' as a terminal state and returns the partial answer to the user.",
    question: "What is the correct way to handle 'pause_turn'?",
    options: [
      "Append the assistant response content to the message history and send a new user message saying 'Continue' to resume the search",
      "Append the assistant response content unchanged to messages and re-send the request as-is; the API detects the trailing server_tool_use block and resumes automatically",
      "Treat it identically to 'end_turn' since the response already contains useful content",
      "Discard the response and retry the original request from scratch with a higher max_tokens"
    ],
    correct: 1,
    explanation: "pause_turn means the server-side tool loop hit its internal iteration cap and can be resumed by re-sending the conversation with the paused assistant turn appended — the API detects the trailing server_tool_use block and continues automatically (B). Adding an explicit 'Continue' user message is unnecessary and not how this mechanism works (A). Treating it as terminal loses remaining work (C), and retrying from scratch wastes the tokens already spent (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A research agent's loop is: `while True: response = call_api(...); if response.stop_reason == 'tool_use': handle_tools(); else: break`. A user reports that occasionally the agent returns an empty final answer with no error.",
    question: "Which stop_reason value, if unhandled by this catch-all `else: break`, best explains an empty-looking final answer?",
    options: [
      "'stop_sequence', which means a custom stop sequence was hit and the response before it should still be shown to the user, but the loop breaks without extracting any text",
      "'tool_use', because the loop already handles it correctly",
      "'end_turn', since that always means the response is empty",
      "There is no other possible stop_reason value besides these three"
    ],
    correct: 0,
    explanation: "'stop_sequence' is a distinct, valid stop_reason meaning the model stopped because it emitted a configured stop sequence; the content generated before that point is still valid and should be returned to the user, but a bare `else: break` that doesn't extract text before exiting can produce an apparently empty answer (A). tool_use is already handled (B), end_turn does not always mean empty (C), and 'refusal' and other reasons also exist, so D is false."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer migrating a data-processing pipeline agent to a newer Claude model adds this branch: `if response.stop_reason == 'refusal': raise Exception('Tool call failed')`.",
    question: "What is wrong with this handling?",
    options: [
      "Nothing — 'refusal' always indicates a failed tool call and should be treated as an error",
      "'refusal' means the model's safety classifiers declined to continue the response for policy reasons — it has nothing to do with tool execution failing, and content may be empty or partial rather than representing a tool error",
      "'refusal' is not a real stop_reason value and this code will never execute",
      "'refusal' should be treated identically to 'end_turn' since the response is still usable"
    ],
    correct: 1,
    explanation: "stop_reason 'refusal' means the model itself (or safety classifiers) declined to continue generating for policy reasons — it is unrelated to tool execution outcomes, and content may be empty (declined before output) or partial (declined mid-stream) (B). It is a real, documented value (C is false), mislabeling it as a 'tool call failure' misleads debugging (A is wrong), and treating it like a normal completion (D) ignores that the response may not represent a complete or safe answer."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A multi-agent research system's orchestrator checks `stop_reason` on every subagent response to decide whether to loop again. A reviewer notices the orchestrator uses `if response.stop_reason:` (a truthiness check) rather than comparing against specific string values.",
    question: "Why is this problematic?",
    options: [
      "stop_reason is always truthy when the response object exists, so this check can't distinguish between end_turn, tool_use, max_tokens, or any other reason — the branch logic collapses into always executing the same path",
      "stop_reason is sometimes an integer and sometimes a string, so truthiness checks are the only reliable option",
      "It's not problematic; truthy checks are the idiomatic way to check stop_reason in the Anthropic SDKs",
      "stop_reason is only set when the response failed, so a truthy check correctly identifies errors"
    ],
    correct: 0,
    explanation: "stop_reason is a non-empty string on every completed response, so a bare truthiness check is always true and provides no actual branching — the code needs to compare against specific values like 'tool_use', 'end_turn', 'max_tokens', etc. (A). It's always a string (B is wrong), this is not idiomatic (C), and stop_reason is populated on successful responses too, not just failures (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An agent's loop correctly branches on stop_reason for 'tool_use' and 'end_turn'. A developer wants to add handling for when the model's response exceeds the configured context window during a very long agentic session.",
    question: "Which stop_reason (on supporting models) should this new branch check for, and what does it signify?",
    options: [
      "'model_context_window_exceeded' — the model hit the context window limit, distinct from 'max_tokens' which is the requested output cap being hit",
      "'max_tokens' — this is the only reason associated with any length limit, context or output",
      "'context_overflow' — a value returned whenever cache_control breakpoints exceed 4 per request",
      "There is no way to distinguish a context window overflow from a normal max_tokens cutoff"
    ],
    correct: 0,
    explanation: "'model_context_window_exceeded' is a distinct stop_reason (on supporting models) that specifically indicates the total context window was exhausted, separate from 'max_tokens' which means the requested output token cap was hit (A). Conflating the two (B) loses important diagnostic information — the fix differs (compact/trim history vs. raise max_tokens or stream). C is a fabricated value unrelated to cache breakpoints, and D is false since the API does distinguish them."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A support-triage agent handles both 'tool_use' and 'end_turn', but its unit tests never simulate a response where multiple content blocks are returned: one 'text' block explaining the plan, followed by two 'tool_use' blocks.",
    question: "What is the risk in production if the loop's tool-execution code only scans for the *first* tool_use block instead of iterating over all content blocks?",
    options: [
      "No risk — Claude never returns more than one tool_use block per response",
      "Only one of potentially several requested tool calls will be executed, and the missing tool_result for the other tool_use block(s) will cause the next API request to fail validation or leave Claude waiting on results it will never receive",
      "The API automatically executes any tool_use blocks the client doesn't handle",
      "This only matters if 'disable_parallel_tool_use' is explicitly set to false"
    ],
    correct: 1,
    explanation: "When stop_reason is 'tool_use', a single response may contain multiple tool_use blocks (parallel tool calls) that must all be executed and answered with a tool_result each; scanning only the first misses the rest, and the next request will be malformed because every tool_use block requires a matching tool_result (B). Parallel tool calls are the default behavior unless explicitly disabled (A and D are wrong), and the API never executes tools on the client's behalf (C)."
  },

  // ===== 2. sending tool_result (7) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer builds a simple weather-lookup agent. After receiving a tool_use block for `get_weather`, they call their weather API and then send a brand-new user message containing only the weather data as plain text, in a fresh `messages` array that excludes the prior assistant turn.",
    question: "What will go wrong?",
    options: [
      "Nothing — Claude can associate any subsequent user message with the earlier tool call automatically",
      "The API will likely reject the request or Claude will be confused, because the assistant's tool_use turn was dropped from history and the tool's output was never sent back as a properly formatted tool_result block tied to the original tool_use_id",
      "The weather data will be treated as a new tool definition",
      "This works correctly as long as the text mentions the word 'weather'"
    ],
    correct: 1,
    explanation: "The correct protocol requires appending the assistant's tool_use response to conversation history, then sending the tool's output back as a tool_result content block referencing the same tool_use_id, in a user message (B). Dropping the assistant turn breaks the alternating conversation structure and severs the link between the call and its result — the API can reject malformed history or Claude can become incoherent. Claude cannot infer this association from freeform text (A, D), and tool outputs are never treated as tool definitions (C)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "In an agentic loop, a developer executes a requested tool and appends the result like this: `messages.append({'role': 'user', 'content': [{'type': 'tool_result', 'content': result}]})` — omitting the `tool_use_id` field.",
    question: "What is the consequence?",
    options: [
      "The request will likely fail validation or Claude won't be able to reliably match the result to the tool call that produced it, especially if multiple tools were called in the same turn",
      "The SDK automatically infers the tool_use_id from message order",
      "tool_use_id is optional and purely cosmetic; the request works identically without it",
      "Claude will treat the missing tool_use_id as a signal to retry the tool call"
    ],
    correct: 0,
    explanation: "tool_use_id is required to associate a tool_result with its originating tool_use block — without it, the request is malformed and, even if it were accepted, correlation would be ambiguous whenever more than one tool was called in a turn (A). The SDK does not infer this from ordering (B), it isn't optional (C), and a missing ID doesn't trigger any special retry behavior (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A coding-assistant agent's loop calls the file-read tool, gets the file contents, and sends the tool_result back in a message with role 'assistant' rather than role 'user'.",
    question: "What is the bug?",
    options: [
      "tool_result blocks must be sent in a message with role 'user', not 'assistant' — the assistant is the one making tool calls, and the user turn is where tool outputs are returned to keep the user/assistant alternation valid",
      "There is no bug — tool_result blocks can go in either role interchangeably",
      "tool_result blocks require role 'system', not 'user' or 'assistant'",
      "The role field is ignored entirely for tool_result content blocks"
    ],
    correct: 0,
    explanation: "The standard agentic loop pattern requires the assistant's tool_use turn to be followed by a user-role turn containing the tool_result block(s) — this preserves the alternating role structure the API expects and correctly signals that the tool's output is being 'handed back' to Claude (A). The role is meaningful, not interchangeable or ignored (B, D), and there is no 'system' role convention for tool results (C)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer's loop successfully sends a tool_result after executing a database query tool, but the query itself returned no rows. They set `content` to an empty string `''` in the tool_result block.",
    question: "What is the better practice here?",
    options: [
      "Send an explicit, informative message like 'No rows matched the query' rather than an empty string, so Claude has enough signal to reason about the (lack of) results rather than possibly misinterpreting an empty response",
      "Omit the tool_result block entirely since there's nothing to report",
      "Set is_error to true, since no rows is effectively a failure",
      "Empty string content is the documented convention for 'no results' and needs no special handling"
    ],
    correct: 0,
    explanation: "A tool_result should always carry clear, informative content — an empty string is ambiguous and gives Claude little to work with; explicitly stating that no rows matched is more useful and less likely to cause confused follow-up behavior (A). Omitting the block entirely leaves the tool_use unanswered, which breaks the loop's required contract (B). Zero results is not an error condition and shouldn't be flagged with is_error (C), and there is no such 'empty string' convention (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An agent calls two tools in parallel in a single turn (two tool_use blocks). The developer's code executes both tools, then sends back two separate user messages, each containing a single tool_result block, back-to-back.",
    question: "What is wrong with this approach, and what should happen instead?",
    options: [
      "Nothing is wrong — sending each tool_result in its own message is functionally identical to combining them",
      "All tool_result blocks for tool calls made in the same assistant turn must be returned together in a single user message; splitting them across multiple messages breaks the expected format and can degrade or eliminate future parallel tool use",
      "Only the first tool_result should ever be sent; the second tool call should be silently dropped",
      "The two tool_result blocks must be sent as two separate assistant-role messages, not user-role"
    ],
    correct: 1,
    explanation: "When Claude issues multiple tool_use blocks in one turn, all corresponding tool_result blocks must be returned together in a single subsequent user message — splitting them across multiple messages violates the expected turn structure and can train the model away from making parallel tool calls in the future (B). This is not functionally equivalent (A), both tool calls need a result, not just the first (C), and tool_result blocks always go in a user-role message, never assistant (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer builds a subagent-delegation pattern where a 'manager' loop calls a tool named `delegate_to_subagent`, and the subagent's entire final text response is used directly as the tool_result content sent back to the manager.",
    question: "Is this an appropriate way to relay a subagent's output back into the manager loop?",
    options: [
      "No — subagent outputs cannot be used as tool_result content under any circumstances",
      "Yes — this is a standard and reasonable pattern: the subagent's final answer becomes the content of the tool_result block for the delegation tool_use, letting the manager's loop continue seamlessly",
      "No — the subagent's full message history, including its own tool calls and thinking, must be embedded verbatim in the tool_result",
      "Yes, but only if the subagent used exactly zero tools internally"
    ],
    correct: 1,
    explanation: "A common and valid delegation pattern treats the subagent invocation as a tool call from the manager's perspective: the manager sends a tool_use for 'delegate_to_subagent', the orchestration code runs the subagent's own loop to completion, and the subagent's final answer is returned as the tool_result content (B). There's no such prohibition (A), embedding the subagent's full internal trace is unnecessary and often undesirable since it bloats the manager's context (C), and this works regardless of how many tools the subagent used internally (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "In a loop for an e-commerce inventory agent, the developer executes a tool, then before appending the tool_result to the conversation, mutates the original `response.content` list in place — removing the tool_use block that had already been executed — before appending `response.content` as the assistant turn to message history.",
    question: "Why is this a mistake?",
    options: [
      "The assistant turn appended to history should be the full, unmodified content Claude returned; removing blocks creates a mismatch where the tool_result references a tool_use_id that no longer appears anywhere in the assistant's turn in history",
      "It's fine, since only the tool_result content matters for future turns",
      "Mutating response.content is required to prevent duplicate tool calls",
      "The tool_use block must be removed to avoid double-billing for the same tool call"
    ],
    correct: 0,
    explanation: "The assistant's turn appended to conversation history must exactly match what the model returned, including all tool_use blocks — the model needs to see its own prior tool_use blocks in history to correctly interpret the tool_result that follows; removing one creates a dangling, unmatched tool_use_id (A). This is not fine to skip (B), mutation isn't required to prevent duplicate calls (C), and billing is based on token usage per request, not on which blocks are kept in local history (D)."
  },

  // ===== 3. parallel tool calls (7) =====
  {
    domain: 3,
    difficulty: 3,
    scenario: "A data-processing pipeline agent receives a response with three tool_use blocks: `read_file`, `validate_schema`, and `write_output`. The developer's loop executes them sequentially with a plain `for` loop and `await`s each one before starting the next, even though they are logically independent.",
    question: "What is the main practical issue with this implementation, given that all three were requested in parallel?",
    options: [
      "It is functionally broken — sequential execution of parallel tool calls always produces incorrect results",
      "It works correctly but forfeits the latency benefit of executing independent tool calls concurrently; the tool_result blocks can still be assembled correctly regardless of execution order as long as they're returned together in one message",
      "The API will reject the response because parallel tool_use blocks must be executed in parallel",
      "Sequential execution silently corrupts the tool_use_id values"
    ],
    correct: 1,
    explanation: "Sequential execution of logically independent tool calls is correct but suboptimal — it doesn't violate the protocol as long as all resulting tool_result blocks are eventually collected and sent back together in a single user message, but it does needlessly add latency (B). It's not 'broken' (A), the API has no execution-order requirement (C), and tool_use_id values are unaffected by execution order (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "In a DevOps automation agent, Claude requests three parallel tool calls in one turn: `restart_service`, `check_disk_space`, and `restart_service` again with different arguments. The developer's harness executes all tool calls concurrently without any coordination.",
    question: "What is the risk specific to running these particular parallel calls concurrently without coordination?",
    options: [
      "None — parallel tool calls are always safe to run concurrently with no coordination needed",
      "Two restart_service calls executed concurrently against a stateful, order-sensitive operation (like a service restart) can race, potentially restarting in the wrong order or interleaving in a way a sequential design wouldn't, even though check_disk_space is safely parallelizable",
      "The API guarantees any two identical tool names in one turn are automatically deduplicated",
      "Parallel tool calls can never include the same tool name twice, so this scenario is impossible"
    ],
    correct: 1,
    explanation: "Not every tool call is safe to parallelize — read-only or independent operations (like check_disk_space) are, but calls with side effects that depend on ordering or shared state (like two restarts) can race if executed concurrently without coordination; a well-designed harness should serialize or gate operations known to be unsafe in parallel (B). This is a real risk, not a non-issue (A), the API does not deduplicate tool calls (C), and Claude can legitimately request the same tool name multiple times with different arguments in one turn (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A research agent's system prompt says nothing about tool call concurrency. During testing, the developer notices Claude sometimes issues two `web_search` tool_use blocks in the same response.",
    question: "Is this expected behavior?",
    options: [
      "No — a single turn can only ever contain one tool_use block; two indicates a bug in the API",
      "Yes — parallel tool use, where a single assistant turn contains multiple tool_use blocks, is the default behavior unless explicitly disabled via tool_choice's disable_parallel_tool_use flag",
      "No — parallel tool calls only occur when using the Tool Runner, never with a manual loop",
      "Yes, but only for server-side tools like web_search, never for custom client-defined tools"
    ],
    correct: 1,
    explanation: "Parallel tool use is enabled by default — Claude can request multiple tool_use blocks (of the same or different tools) in a single response, and this behavior can be turned off by setting disable_parallel_tool_use: true on tool_choice (B). It's not a bug (A), parallel calls occur regardless of whether you use the Tool Runner or a manual loop (C), and custom client-defined tools can be called in parallel just as well as server-side ones (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A support-triage agent wants to guarantee Claude only ever calls one tool per turn, to simplify the harness's execution logic.",
    question: "What is the correct way to enforce this?",
    options: [
      "Set tool_choice to {'type': 'any', 'disable_parallel_tool_use': true}, or use disable_parallel_tool_use alongside whichever tool_choice type is in use",
      "There is no supported way to disable parallel tool calls; the harness must always be built to handle multiple tool_use blocks per turn",
      "Rename all tools to have unique prefixes so Claude can only reference one at a time",
      "Set max_tokens to a very low value so there isn't room for more than one tool call"
    ],
    correct: 0,
    explanation: "disable_parallel_tool_use is a documented flag that can be set alongside any tool_choice value to force Claude to use at most one tool per response (A). It is a supported, first-class option (B is wrong), tool naming has no bearing on parallelism (C), and throttling max_tokens is an unreliable, indirect hack that could also truncate legitimate single tool calls (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An agent's harness executes parallel tool calls using `asyncio.gather()` on all tool_use blocks in a turn. One of the three tools throws an exception. The developer's code lets the exception propagate uncaught out of the gather call, crashing the whole loop before any tool_result is sent back.",
    question: "What should happen instead?",
    options: [
      "The whole agentic session should terminate immediately whenever any single parallel tool call fails — this is expected and correct behavior",
      "Each tool execution should be wrapped so that a failure produces a tool_result with is_error: true for that specific call, while the other tool_result blocks are still returned normally — letting Claude see the failure and decide how to proceed rather than crashing the loop",
      "Only the failing tool's tool_use block should be dropped from the next request; the other two tool_results can be sent without needing to account for the third",
      "The harness should retry all three tool calls from scratch, discarding any successful results, whenever one fails"
    ],
    correct: 1,
    explanation: "Each tool call's execution should be individually error-handled so that one failure doesn't crash the entire batch — the failing call gets a tool_result with is_error: true and an informative message, while successful calls' results are still returned normally in the same message, letting Claude decide how to recover (B). Crashing the whole session on any single failure is needlessly fragile (A), dropping the failed tool_use block without any corresponding tool_result leaves the request malformed since every tool_use still needs an answer (C), and discarding successful results to retry everything wastes work and tokens (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A multi-agent research system's coordinator dispatches three independent research subagents in parallel by spawning three separate API loops. Each subagent maintains its own message history and only reports back its final summary to the coordinator.",
    question: "Does this pattern require the coordinator's own tool_use/tool_result mechanics to look any different from a single-tool parallel call?",
    options: [
      "Yes, subagent results can never be represented as tool_result blocks and require a completely separate protocol",
      "No — from the coordinator's perspective, each subagent dispatch is just a tool call (e.g., 'delegate_task'), and if three were requested in parallel, the coordinator still executes them concurrently and returns three tool_result blocks together in one message once all subagents finish",
      "Yes, because subagents must always run strictly sequentially, never in parallel with each other",
      "No, but only if all three subagents share the exact same conversation history object"
    ],
    correct: 1,
    explanation: "Subagent delegation is typically implemented as an ordinary tool call from the coordinator's point of view — parallel delegation tool_use blocks are handled exactly like any other parallel tool calls: run them concurrently, collect each subagent's final output as that call's tool_result content, and return all results together (B). There's no separate protocol needed (A), subagents can absolutely run in parallel (C), and sharing conversation history across subagents would defeat the purpose of giving each one an isolated context (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer implementing parallel tool execution logs each tool_result being appended to the next request's message content, in the order each tool finished executing (not the order Claude originally requested them).",
    question: "Does the order in which tool_result blocks appear in the returned message need to match the order of the original tool_use blocks?",
    options: [
      "Yes, the ordering of tool_result blocks must exactly mirror the order of the tool_use blocks in the assistant's turn, and returning them in a different order (e.g., completion order) can cause the request to be rejected or misinterpreted",
      "No, ordering never matters as long as the correct tool_use_id is attached to each tool_result",
      "Yes, but only when there are more than five parallel tool calls",
      "No, but only because the developer is using Python; other languages' SDKs require strict ordering"
    ],
    correct: 0,
    explanation: "Each tool_result block is explicitly matched to its tool_use via tool_use_id, but Anthropic's documented guidance is that tool_result blocks should be returned in the same order as the corresponding tool_use blocks were issued — returning them in an arbitrary completion order is a known source of subtle bugs (A). Some implementations are lenient, but relying on tool_use_id alone while ignoring ordering isn't the safe, correct approach (B), there's no size threshold exemption (C), and this isn't a language-specific quirk (D)."
  },

  // ===== 4. error handling on tool failure (8) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A coding-assistant agent calls a `run_tests` tool. The test runner crashes with a stack trace. The developer's harness catches the exception and sends back a tool_result with `content: 'Error: Traceback (most recent call last): ... [200 lines] ...'` and forgets to set `is_error`.",
    question: "What is the main problem with omitting `is_error: true`?",
    options: [
      "Nothing — Claude can tell from the word 'Error' in the content that something failed",
      "Without is_error set, Claude may not reliably recognize the tool_result as representing a failure versus a successful (if oddly formatted) result, which can lead to it proceeding as though the tests passed",
      "The API will reject any tool_result whose content contains the word 'Traceback'",
      "is_error is a purely cosmetic UI flag with no effect on how Claude interprets the result"
    ],
    correct: 1,
    explanation: "The is_error flag is the structured signal Claude uses to recognize a tool execution failure — while Claude often can infer failure from content, relying on that instead of the explicit flag is unreliable and can cause Claude to misinterpret a failed tool call as a valid, if strange, result (B). It's not purely cosmetic (D), the API doesn't reject specific error-related substrings (C), and depending on inferred parsing rather than the flag (A) is exactly the anti-pattern being tested."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A research agent's `fetch_url` tool times out after 30 seconds. The developer's harness catches the timeout and returns a tool_result with `is_error: true` and `content: 'Error'`.",
    question: "What is the recommended improvement to this error message?",
    options: [
      "Nothing needs to change — a minimal error flag and generic message are sufficient for Claude to recover",
      "The error message should be more specific and actionable, e.g., 'The request to https://example.com timed out after 30 seconds; the site may be slow or unreachable — consider retrying, using a different source, or reporting the issue to the user', giving Claude enough context to decide how to proceed",
      "Errors should never include the original URL, for security reasons",
      "The tool_result should include the full network stack trace so Claude can debug the underlying socket issue itself"
    ],
    correct: 1,
    explanation: "A good tool error result gives Claude enough specific, actionable context to decide how to recover — retry, try an alternative, or surface the issue to the user — rather than a bare, uninformative 'Error' string (B). Vague messages hinder recovery, so A is wrong. There's no general security prohibition on including the URL that caused a timeout (C), and dumping a raw stack trace is unhelpful noise compared to a clear, human-readable explanation (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A customer-support triage agent calls a `lookup_order` tool. The order ID Claude provided doesn't exist in the system. The developer's harness raises an uncaught KeyError, which crashes the Python process running the agent loop.",
    question: "What is the correct way to handle this 'not found' case?",
    options: [
      "Let it crash — a nonexistent order ID represents a fatal error that the agent cannot reasonably continue past",
      "Catch the lookup failure in the tool implementation itself and return a tool_result with is_error: true and a message like 'No order found with ID X — please verify the order ID with the customer', allowing the loop to continue gracefully",
      "Silently return an empty successful tool_result so Claude assumes the order simply has no data",
      "Restart the entire conversation from the first message whenever any tool lookup fails"
    ],
    correct: 1,
    explanation: "A 'not found' condition is an expected, recoverable outcome that should be handled inside the tool implementation and reported back as a clear error tool_result, letting Claude adapt (e.g., ask the user to double check the order ID) without crashing the process (B). Letting the whole harness crash for a routine not-found condition is far too fragile (A), returning a fake success would mislead Claude into treating missing data as valid (C), and restarting the entire conversation destroys context and is unnecessary for a recoverable error (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An agent's `execute_sql` tool occasionally hits a transient database connection error. The developer's harness treats every tool failure — transient or permanent — identically: it sends back `is_error: true` with the raw exception message and lets Claude decide what to do next, with no retry logic anywhere in the harness.",
    question: "What is a reasonable critique of this design?",
    options: [
      "None — pushing all retry decisions to Claude via the tool_result is always the best design regardless of error type",
      "For known-transient errors (e.g., connection drops, rate limits), the harness itself could implement a bounded retry with backoff before ever reporting failure to Claude, reserving the tool_result error path for errors that are unlikely to succeed on immediate retry or that need Claude/user judgment to resolve",
      "Retries should never be implemented in the harness; only Claude should ever decide when a tool should be retried",
      "The harness should always retry every tool failure exactly three times automatically before doing anything else, regardless of error type"
    ],
    correct: 1,
    explanation: "A well-designed harness distinguishes between errors worth retrying automatically (transient, likely-to-succeed-on-retry conditions like connection drops) and errors that need to surface to Claude's reasoning (permanent failures, invalid input, conditions requiring a different approach) — blindly delegating every failure to Claude wastes a loop iteration and tokens on errors code could resolve directly (B). A is too absolute, C wrongly claims the harness should never retry anything, and D's blanket fixed-retry-count-for-everything approach ignores that not all errors are worth retrying (e.g., a permanent 'permission denied' shouldn't be retried three times)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A DevOps automation agent's `delete_resource` tool fails because the resource doesn't exist (it was already deleted by a previous run). The harness returns `is_error: true, content: 'Resource not found'`. Claude then, in the next turn, calls `delete_resource` again with the exact same arguments.",
    question: "What does this repeated identical call most likely indicate, and what's the appropriate fix?",
    options: [
      "This is normal, healthy agent behavior and requires no changes — Claude is expected to retry every failed tool call indefinitely",
      "The error message is ambiguous about whether the overall goal ('resource should not exist') was actually achieved; making the tool_result content clearer — e.g., 'Resource not found (it may already be deleted, which may be the desired end state)' — helps Claude reason about whether retrying makes sense",
      "The harness should immediately terminate the session, since any repeated tool call is proof of an infinite loop",
      "This is a sign the tool_use_id was reused incorrectly, not a content/error-messaging issue"
    ],
    correct: 1,
    explanation: "A tool error message should help Claude reason about the actual state of the world, not just report failure — clarifying that 'not found' might mean the deletion goal is already satisfied gives Claude the context to stop retrying (B). Retrying indefinitely on any error is not expected or healthy behavior (A), a single repeated call isn't sufficient evidence of an infinite loop to justify outright termination (C), and this scenario is about message clarity, not a tool_use_id bug (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A pipeline agent's `parse_csv` tool receives malformed CSV data and raises a `pandas.errors.ParserError`. The developer wraps the tool call in a try/except and sends back the error as a tool_result with `is_error: true`.",
    question: "Is this the correct general pattern for handling a tool execution failure inside the agentic loop?",
    options: [
      "No — any tool exception should always propagate up and terminate the loop immediately",
      "Yes — catching the exception at the tool-execution boundary and translating it into an informative tool_result with is_error: true is the standard way to let Claude see the failure and attempt a recovery (e.g., asking for cleaner input, trying a different parsing approach) instead of crashing the whole agent",
      "No — errors from tool execution should be logged only, and a fabricated successful tool_result should always be sent instead",
      "Yes, but only if the tool is a client-side custom tool; server-side tools handle their own errors and this pattern doesn't apply to them"
    ],
    correct: 1,
    explanation: "Catching exceptions at the tool-execution boundary and reporting them as is_error tool_results is exactly the standard, correct pattern — it keeps the loop alive and gives Claude the chance to recover intelligently (B). Always propagating and crashing (A) is too fragile for routine, expected failure modes. Fabricating success (C) actively misleads the model. And while server-side tools (web search, code execution) do report their own errors via structured result blocks, the same is_error-style pattern conceptually applies; it's not exclusive to custom tools (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "In a multi-agent research system, a subagent's tool call fails repeatedly (3 times) with the same error. The subagent's harness has no cap on retries and no mechanism to escalate — it just keeps calling the same tool with the same arguments each time Claude decides to retry.",
    question: "What is the biggest risk here, and what should the harness add?",
    options: [
      "There's no risk; Claude will eventually stop retrying on its own without any harness-level limits",
      "The subagent can get stuck in an unproductive retry loop, burning tokens and time; the harness should track consecutive identical-tool-call failures and, after a threshold, inject a stronger message (or stop and escalate to the coordinator/user) rather than relying purely on the model to self-correct",
      "The fix is to remove is_error from all tool_results so Claude doesn't notice the repeated failures and moves on",
      "The fix is to always change the tool's name after each failure so Claude is forced to try something new"
    ],
    correct: 1,
    explanation: "Relying solely on the model to notice and break out of a retry loop is not a safe design — harnesses should track repeated identical failures and intervene (clearer guidance, a hint to try a different approach, or halting and escalating) rather than trusting the model to self-correct indefinitely (B). Claude does not reliably self-limit retries without help (A is wrong), hiding the error (C) is actively harmful and dishonest to the model, and renaming the tool (D) breaks the tool's contract and doesn't address the underlying problem in a principled way."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An agent's `send_email` tool fails because the recipient address is invalid. The harness returns a tool_result with `is_error: true` and message `'Invalid recipient address: user@@bad..domain'`. Claude then apologizes to the user in its next text response and asks for a corrected email address instead of retrying the same tool call with the same bad address.",
    question: "What does this outcome demonstrate about well-designed error tool_results?",
    options: [
      "That is_error tool_results are useless because they only ever cause repeated identical retries",
      "That a clear, specific error message lets Claude correctly diagnose an unrecoverable-without-new-input situation and take the appropriate action — asking a human for corrected information — rather than blindly retrying",
      "That Claude ignores is_error and content and always retries regardless of what the message says",
      "That this behavior only happens when the tool is marked with strict: true in its schema"
    ],
    correct: 1,
    explanation: "This is the ideal outcome of good error tool_result design: Claude reads the specific, actionable error content, correctly determines that retrying the same tool call won't help (the address is fundamentally malformed), and instead surfaces the issue to the user for correction (B). This directly contradicts A and C, which claim error tool_results have no effect on behavior. The strict flag governs tool input schema validation, not this kind of adaptive recovery behavior (D)."
  },

  // ===== 5. preventing infinite loops / runaway behavior (7) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer writes an agentic loop as `while True: response = call_api(...); if response.stop_reason != 'tool_use': break; execute_tools_and_continue()`. There is no iteration counter anywhere in the loop.",
    question: "What is the most significant risk with this design?",
    options: [
      "None — the loop will always terminate naturally because Claude never calls the same tool twice",
      "If Claude gets stuck in a pattern of repeatedly calling tools without reaching end_turn (e.g., due to a confusing tool result or a subtly broken tool), the loop can run indefinitely, consuming unbounded API calls, tokens, and cost with no safety net",
      "The loop will terminate automatically after 24 hours regardless of stop_reason",
      "while True loops are forbidden by the Anthropic API and the request will be rejected"
    ],
    correct: 1,
    explanation: "A loop with no maximum iteration count and no other termination condition has no safety net against runaway behavior — if Claude keeps calling tools without producing end_turn, the loop runs unbounded, incurring unbounded cost and risk (B). Claude can and does sometimes repeat or cycle through tool calls (A is false), there's no such automatic 24-hour timeout built into the loop itself (C), and the API has no concept of forbidding while True in client code (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer adds `MAX_ITERATIONS = 25` to their agent loop and breaks out when exceeded, but the break statement just silently exits the loop and returns whatever the last partial state was, with no distinct handling or message to the caller.",
    question: "What improvement should be made to this max-iteration safeguard?",
    options: [
      "Nothing — silently returning the last state on hitting the cap is standard practice and needs no special handling",
      "When the iteration cap is hit, the loop should clearly signal this distinct outcome (e.g., a specific return value, log entry, or message to the user/caller indicating the task was not completed and why) rather than silently returning as if it succeeded normally",
      "The iteration cap should be removed entirely since it can cause legitimate long tasks to fail",
      "MAX_ITERATIONS should always be set to 1 to guarantee no runaway behavior is ever possible"
    ],
    correct: 1,
    explanation: "Hitting a safety cap is meaningfully different from a normal, successful completion — the caller (a user, monitoring system, or calling code) needs to be able to distinguish 'agent finished the task' from 'agent was cut off mid-task by a safety limit' so they can react appropriately (retry, adjust the limit, investigate why it looped) (B). Silently treating it the same as success is misleading (A), removing the cap defeats its purpose (C), and MAX_ITERATIONS=1 would break virtually all legitimate multi-step agentic work (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A pipeline agent has a max-iteration cap of 20 loop turns. During testing, a developer finds the agent calls the exact same tool with the exact same arguments 15 times in a row before finally succeeding on the 16th call for unrelated reasons, wasting most of its iteration budget.",
    question: "Beyond a raw iteration cap, what additional safeguard would specifically help this case?",
    options: [
      "A loop-detection mechanism that tracks recent tool call signatures (tool name + arguments) and, upon detecting N consecutive identical calls, either short-circuits with an informative message to Claude or halts and escalates, rather than relying only on the total iteration count",
      "Lowering max_tokens on every request, since that is the only way to prevent repeated tool calls",
      "Switching the model to a smaller one, since only large models are capable of looping like this",
      "Disabling parallel tool calls, since parallel execution is what causes repeated identical calls"
    ],
    correct: 0,
    explanation: "A raw iteration counter alone doesn't catch a specific, common failure mode: the agent stuck repeating the identical call. A more targeted safeguard tracks recent tool-call signatures and intervenes on detecting repetition — either injecting a corrective message ('this exact call has failed 3 times; try a different approach') or halting for escalation (A). Lowering max_tokens (B) doesn't address repeated tool calls and can cause unrelated truncation issues. Model size isn't the root cause of loop-prone behavior (C), and parallel vs. sequential tool calls is unrelated to this particular repetition pattern (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A customer-support agent's harness enforces a max of 15 loop iterations per conversation turn but has no cap on how many total tokens (across all iterations) the loop can consume before hitting that cap.",
    question: "What gap does this leave open?",
    options: [
      "None — capping iterations is always equivalent to capping token/cost consumption",
      "Each individual iteration could still involve very large tool_result payloads or verbose model responses, so 15 iterations could still consume an enormous and costly number of tokens even though the iteration count stayed bounded — a token or cost budget is a complementary safeguard, not a redundant one",
      "Tokens are irrelevant to loop safety since only wall-clock time matters for runaway agents",
      "This gap only matters for agents using extended thinking, not standard responses"
    ],
    correct: 1,
    explanation: "Iteration count and token/cost consumption are not the same axis — a small number of iterations can still rack up enormous cost if individual tool_results or responses are large (e.g., dumping huge file contents), so a complete safety design tracks both bounded iterations and bounded cumulative token/cost spend (B). A conflates the two incorrectly. Token usage is a first-class cost and safety concern regardless of wall-clock time (C is wrong), and this concern applies to any agent loop, not just ones using extended thinking (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "An agent's harness sets a hard cap of `max_iterations = 10`, but when the cap is exceeded, the code does `raise RuntimeError('Too many iterations')`, crashing the entire host process, including any unrelated concurrently-running agent sessions in the same server.",
    question: "What is the better design here?",
    options: [
      "This is correct behavior; any agent hitting its iteration cap should crash the whole server as a hard safety measure",
      "The exceeded-cap condition should be handled locally to that single session/request (e.g., caught and converted into a clean error response or a distinct terminal state) rather than propagating as an uncaught exception that takes down unrelated work in the same process",
      "max_iterations should simply be removed to avoid ever triggering this code path",
      "The RuntimeError is fine as long as it's logged to a file before the crash"
    ],
    correct: 1,
    explanation: "A loop-runaway safeguard tripping should be an isolated, handled event for that specific session — not an uncaught exception that crashes the whole host process and takes down unrelated concurrent work (B). Crashing the entire server on a per-session cap being hit is an overreaction with a large blast radius (A), removing the cap reintroduces the original runaway-loop risk (C), and logging before crashing doesn't fix the fact that unrelated sessions are being killed (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A research agent's harness caps iterations at 30, but a reviewer notices the cap is applied per-user-message rather than per-conversation — meaning a user who sends 50 follow-up messages in one long chat session could collectively trigger 1,500 loop iterations across the whole conversation with no cumulative limit.",
    question: "What should the developer consider adding?",
    options: [
      "Nothing further is needed; per-message caps are always sufficient regardless of conversation length",
      "A cumulative, session-level or conversation-level budget (iterations, tokens, or cost) in addition to the per-message cap, so that long-running conversations with many turns still have an overall ceiling on total agent work and spend",
      "The per-message cap should be removed since it's redundant with unlimited conversation length",
      "The fix is to prevent users from sending more than one message per conversation"
    ],
    correct: 1,
    explanation: "A per-message iteration cap bounds a single turn's runaway risk but doesn't bound the conversation as a whole — a session-level or conversation-level cumulative budget (iterations, tokens, or dollar cost) is a necessary complementary safeguard for long-running, multi-turn agentic sessions (B). Assuming per-message caps alone are sufficient (A) ignores this gap. Removing the per-message cap (C) would make things worse, not better. And restricting users to one message per conversation (D) breaks the product rather than solving the underlying safety gap."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A DevOps automation agent has both a max_iterations cap and loop-detection for repeated identical tool calls. A reviewer points out that neither safeguard would catch a scenario where Claude calls three *different* destructive tools (`scale_down`, `scale_up`, `scale_down`) in an oscillating pattern that never repeats the exact same call twice but never converges on a stable end state either.",
    question: "What is the best characterization of this gap?",
    options: [
      "This is not a real risk; identical-call detection always catches oscillating behavior too",
      "Exact-match loop detection can miss semantically-oscillating or thrashing behavior that isn't literally repeating the same call; a more robust safeguard might track higher-level signals (e.g., a resource's state flapping back and forth, or a human-defined 'progress' heuristic) alongside the iteration cap as the ultimate backstop",
      "The max_iterations cap is unnecessary once identical-call detection exists, since they cover the same cases",
      "Oscillating tool calls can never happen because Claude always converges on a stable plan within a few turns"
    ],
    correct: 1,
    explanation: "Exact-match repeated-call detection is a narrower safeguard than general non-convergence detection — an agent can thrash between different-but-related destructive actions without ever repeating the literal same call, which would slip past identical-call detection; recognizing this requires either domain-specific 'progress' signals or leaning on the iteration cap as a final backstop (B). This is a genuine, distinct risk (A is wrong), the iteration cap remains valuable precisely because it catches cases identical-call detection misses (C is wrong), and Claude does not reliably avoid oscillation on its own without appropriate constraints or safeguards (D is an unsafe assumption)."
  },

  // ===== 6. subagent/delegation patterns (8) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer builds a 'research lead' agent that delegates sub-questions to 'research worker' subagents. The lead's system prompt says to use subagents 'for absolutely everything, no matter how small the sub-task.'",
    question: "What is the issue with this delegation guidance?",
    options: [
      "There is no issue; maximizing delegation always improves agent quality and speed",
      "Over-delegating small, single-step tasks that the lead could do directly (e.g., a single file read) adds unnecessary round-trip latency and token overhead re-establishing context for each subagent, without a corresponding benefit — delegation should be reserved for genuinely independent or parallelizable work",
      "Subagents cannot be used for small tasks at all; the API enforces a minimum task-complexity threshold",
      "This is only a problem if the subagents share the same model as the lead agent"
    ],
    correct: 1,
    explanation: "Delegation has real overhead — a spawned subagent must re-establish context and report back, which costs latency and tokens; reserving delegation for genuinely independent, parallelizable, or otherwise beneficial work (rather than every trivial sub-task) is the recommended approach (B). Blanket over-delegation is a documented anti-pattern, not a universal improvement (A). There is no such API-enforced complexity threshold (C), and the overhead concern applies regardless of whether the subagent shares the lead's model (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A coordinator agent delegates a code-review sub-task to a subagent by simply calling `subagent.run(task_description)` and passing only a one-line string like 'review the PR' — the subagent has no access to the coordinator's conversation history or any file paths.",
    question: "What is the most likely consequence?",
    options: [
      "None — subagents automatically inherit the full conversation history and context of their coordinator",
      "The subagent, lacking any of the coordinator's context (which PR, which files, what to look for), will likely produce an unhelpful or irrelevant response, since delegated tasks must carry all the information the subagent needs — it starts with a fresh, isolated context",
      "The API will automatically reject a subagent call missing conversation history",
      "This only matters if the subagent is running on a smaller model than the coordinator"
    ],
    correct: 1,
    explanation: "Subagents typically start with a fresh, isolated context and see none of the coordinator's conversation — so a delegated task must explicitly carry every piece of information the subagent needs (paths, constraints, what to focus on) or the subagent has no way to do useful work (B). Subagents do not automatically inherit history (A is false), there's no such API-level rejection mechanism (C), and this need for explicit context applies regardless of model size pairing (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "In a multi-agent research system, the coordinator spawns 20 parallel research subagents for a task that only really has 3 independent sub-questions, hoping more subagents means faster, more thorough research.",
    question: "What is the flaw in this reasoning?",
    options: [
      "There is no flaw; spawning as many subagents as possible always improves both speed and thoroughness with no downside",
      "Spawning far more subagents than there are genuinely independent workstreams doesn't add real parallelism benefit — it multiplies overhead (context re-establishment, coordination, cost) without a matching gain, and many of those 20 subagents will end up doing redundant or overlapping work",
      "Subagent count must always exactly equal the number of tools available to the coordinator",
      "The API enforces a hard limit of exactly 3 subagents per coordinator, so this configuration is impossible"
    ],
    correct: 1,
    explanation: "Delegation should map to genuine, independent units of work — spawning many more subagents than there are real independent sub-questions leads to redundant work and multiplies the fixed overhead of delegation (context re-establishment, coordination, cost) without a corresponding quality or speed benefit (B). This is a real, well-documented anti-pattern (A is wrong), there's no rule tying subagent count to tool count (C), and while some platforms impose roster or concurrency limits, they are not fixed at exactly 3 in general and this isn't the core issue being tested (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A coordinator agent's delegation tool `delegate_task` is implemented so that after spawning a subagent, the coordinator's loop blocks synchronously waiting for that single subagent to fully complete before it can do anything else — including before it can spawn a second, independent subagent for a different sub-question.",
    question: "What is the architectural limitation here?",
    options: [
      "None — subagents must always be run one at a time in strict sequence for correctness",
      "This spawn-and-block pattern prevents true parallel delegation: if the coordinator has multiple independent sub-tasks, it should be able to dispatch multiple subagents concurrently (e.g., via parallel tool calls) rather than being forced to wait for each one sequentially before starting the next",
      "This is required because the Anthropic API does not support any form of concurrent tool execution",
      "This only matters if the subagents are calling the same tools as each other"
    ],
    correct: 1,
    explanation: "When a coordinator has multiple genuinely independent sub-tasks, blocking synchronously on each subagent one at a time forfeits the benefit of parallelism — a better design lets the coordinator issue multiple delegation tool calls in one turn (parallel tool_use blocks) and run the subagents concurrently, collecting all their reports together (B). Sequential blocking is not required for correctness (A), the API does support concurrent/parallel tool execution from the client's perspective (C), and whether subagents overlap in which tools they use internally is unrelated to this coordination bottleneck (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer's subagent-delegation harness silently swallows any exception raised inside a subagent's own loop, returning a generic tool_result of `'Subagent completed'` to the coordinator regardless of whether the subagent actually succeeded, partially failed, or crashed.",
    question: "What is wrong with this design?",
    options: [
      "Nothing — coordinators should never see details about subagent-level failures",
      "The coordinator has no way to distinguish a genuinely successful subagent run from one that crashed or failed partway through, which can cause it to proceed as though a sub-task was completed when it wasn't, propagating a silent failure upward through the whole system",
      "Subagent exceptions can never be caught by the harness in the first place, so this scenario is impossible",
      "This is fine as long as the coordinator's system prompt tells it to 'always assume subagents succeed'"
    ],
    correct: 1,
    explanation: "Masking subagent failures behind a generic success-sounding message hides critical information from the coordinator, which needs an honest signal (success, partial success, or failure with details) to reason correctly about whether the overall task is actually progressing — otherwise failures propagate silently and invisibly (B). Coordinators absolutely benefit from knowing about subagent-level failures (A is wrong), such exceptions are catchable by the harness (C is wrong), and instructing the model to 'always assume success' doesn't fix an underlying architecture that lies about outcomes (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer wants their coordinator agent to delegate a narrowly-scoped, read-only research task to a subagent running a cheaper, faster model, while the coordinator itself stays on a more capable model for planning and synthesis.",
    question: "Is this a reasonable delegation design?",
    options: [
      "No — all subagents in a delegation pattern must use the exact same model as their coordinator",
      "Yes — using a smaller/cheaper model for reading-heavy, less reasoning-intensive delegated work while reserving the more capable model for the coordinator's planning, verification, and synthesis is a standard and sensible cost/quality tradeoff in multi-agent designs",
      "No — subagents can only ever be implemented as calls to the exact same model with the exact same system prompt as the coordinator",
      "Yes, but only if the subagent is given zero tools of its own"
    ],
    correct: 1,
    explanation: "Assigning a cheaper, faster model to reading/extraction-heavy delegated work while keeping the coordinator on a stronger model for judgment-heavy planning and synthesis is a well-established, sensible pattern for balancing cost and quality across a multi-agent system (B). There is no requirement that subagents match the coordinator's model (A, C are false), and subagents commonly do need their own tools (e.g., search, read) to do their delegated work, so D's restriction is incorrect."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A coordinator agent's `delegate_task` tool allows the coordinator to spawn subagents, and one of those subagents' own system prompt also grants it a `delegate_task` tool, allowing it to spawn further subagents of its own.",
    question: "What consideration is most important to evaluate before allowing this nested delegation?",
    options: [
      "None — unlimited depth of recursive delegation is always safe and has no meaningful downsides",
      "Unbounded delegation depth can lead to runaway fan-out (exponential growth in spawned agents), unpredictable cost, and difficulty tracing/debugging the resulting execution tree — many designs deliberately cap delegation to a single level (subagents cannot themselves delegate further) specifically to avoid this",
      "Nested delegation is impossible to implement technically, so this scenario could never occur",
      "This is only a concern if the subagents are using extended thinking"
    ],
    correct: 1,
    explanation: "Allowing subagents to further delegate creates the potential for uncontrolled fan-out — each level of delegation can spawn multiple more agents, leading to exponential growth in cost, latency, and debugging complexity; many real-world multi-agent systems deliberately restrict delegation to one level deep (subagents get tools but not a delegation tool) specifically to bound this risk (B). This is a genuine risk, not a non-issue (A). Nested delegation is technically straightforward to implement (C is false), and the runaway-fanout risk is unrelated to whether extended thinking is enabled (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A coordinator delegates a task to a subagent and, upon getting the subagent's final report back as a tool_result, the coordinator's next turn includes that entire report verbatim, plus the subagent's full internal tool-call trace (every tool_use and tool_result the subagent generated internally) inline in the coordinator's own context.",
    question: "What is the concern with including the subagent's full internal trace in the coordinator's context, rather than just its final report?",
    options: [
      "There is no concern; the coordinator should always see every detail of every subagent's internal process for full transparency",
      "It defeats a core benefit of delegation — keeping the coordinator's own context small and focused — by re-inflating the coordinator's context with all the intermediate exploration the subagent already condensed into its final answer; typically only the subagent's final, synthesized report should be returned",
      "This is technically impossible since subagent tool calls cannot be serialized into a tool_result",
      "This concern only applies when the coordinator and subagent share the same conversation history object"
    ],
    correct: 1,
    explanation: "One of the primary motivations for delegation is to let a subagent do a lot of exploratory work (many tool calls, large intermediate reads) in its own isolated context, and report back only a concise, synthesized summary — feeding the coordinator the subagent's entire internal trace defeats that benefit by bloating the coordinator's context with detail it doesn't need (B). Full transparency at that level is not typically desirable or necessary (A), it is technically possible to serialize such a trace (C is false), and this issue is about context design choices, not about whether they literally share the same history object (D)."
  },

  // ===== 7. persisting/resuming agent state (7) =====
  {
    domain: 3,
    difficulty: 3,
    scenario: "A long-running data-processing agent that migrates a large database runs for hours across many loop iterations. The developer keeps the entire message history only in an in-memory Python list, with no persistence to disk or a database.",
    question: "What is the risk of this design?",
    options: [
      "None — in-memory state is always sufficient for any agentic workload regardless of duration",
      "If the process crashes, is restarted, or the host machine fails partway through the long-running task, all conversation history and progress is lost, forcing the entire migration to restart from scratch with no way to resume from where it left off",
      "In-memory storage is technically impossible for conversations longer than 10 messages",
      "This is only a concern if the agent uses extended thinking, since only thinking blocks need persistence"
    ],
    correct: 1,
    explanation: "For any long-running or otherwise valuable agentic task, in-memory-only state is fragile — a crash, restart, or host failure loses all progress with no way to resume, which is especially costly for a task that runs for hours (B). This is a real and common failure mode, not a non-issue (A). There's no such message-count limitation on in-memory storage (C), and the need for persistence applies to the full conversation state, not specifically or exclusively to thinking blocks (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer adds checkpointing to a long-running research agent: after every loop iteration, the full message history is serialized to a database. However, the checkpoint write happens *before* the tool_result for that iteration's tool_use has been generated and appended.",
    question: "What problem could this introduce on resume?",
    options: [
      "None — checkpointing before or after appending the tool_result makes no difference to correctness",
      "If the process crashes after the checkpoint write but before the tool_result is appended and a second checkpoint is made, resuming from the stale checkpoint would restore a conversation ending in an unanswered tool_use block, which is an invalid state to resume an agentic loop from without first completing or discarding that pending tool call",
      "This only matters if the agent is using server-side tools instead of client-side ones",
      "Checkpointing must always happen exactly once per conversation, never per iteration, so this timing question doesn't apply"
    ],
    correct: 1,
    explanation: "Checkpoint timing matters — if a checkpoint is captured right after an assistant turn with an unanswered tool_use but before that tool's result is generated and appended, resuming from it leaves the conversation in an invalid, incomplete state (an assistant turn ending in tool_use with no corresponding tool_result) that must be specially handled (e.g., re-executing the pending tool call) before the loop can safely continue (B). Timing genuinely matters here, so A is wrong. This concern applies to both client- and server-side tools (C is wrong), and per-iteration checkpointing is a completely valid and common strategy for long-running agents, contradicting D."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A DevOps automation agent's state-persistence layer saves conversation history to a database but does not persist which tool calls have already had real-world side effects executed (e.g., a server was already restarted). On resume after a crash, the harness simply re-sends the last unanswered tool_use to be executed again.",
    question: "What is the danger of this resume strategy for tools with side effects?",
    options: [
      "None — it is always safe to re-execute any tool call after a crash, regardless of what the tool does",
      "Blindly re-executing a tool call on resume can cause duplicate, potentially harmful side effects (e.g., restarting a server twice, sending a duplicate payment, provisioning a resource twice) if the original call had actually already succeeded before the crash — persisted state should track execution/completion status for side-effecting calls, not just conversation text",
      "This is only a problem for read-only tools, never for tools with side effects",
      "The Anthropic API automatically deduplicates tool executions across process restarts"
    ],
    correct: 1,
    explanation: "For tools with real-world side effects, simply replaying an unanswered tool_use on resume is dangerous if the original execution actually completed before the crash but the result was never recorded — this can cause duplicate or harmful re-execution (e.g., double restart, double charge); robust persistence should track execution status (attempted/completed/failed) separately from just the conversational text, and ideally use idempotency keys (B). This is a real risk, not a non-issue (A). The danger is specifically about side-effecting tools, the opposite of what C claims. And the Anthropic API has no built-in tool-execution deduplication across client restarts (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A research agent persists conversation state to a JSON file after every turn, storing only the text content of each message (stripping out tool_use and tool_result block structure, cache_control markers, and other metadata) to 'simplify' the format.",
    question: "What issue does this simplification cause when trying to resume the conversation later?",
    options: [
      "None — plain text is always a fully faithful representation of any prior conversation and can be resumed without any loss of information",
      "Stripping structured content down to plain text loses the exact tool_use/tool_result pairing, tool_use_ids, and other structural information the API requires to correctly continue the conversation — resuming from this lossy format risks producing an invalid or incoherent request",
      "This is fine as long as the text includes the word 'tool' somewhere in each stripped message",
      "JSON files cannot store structured message content, so some stripping is technically unavoidable"
    ],
    correct: 1,
    explanation: "The Messages API needs the full structured content — including tool_use blocks, their IDs, and matching tool_result blocks — to correctly interpret and continue a conversation; discarding that structure in favor of flattened text loses information required for a valid resume and risks the next request being malformed or Claude misunderstanding prior context (B). Plain text is not equivalent to the full structured representation (A). A superficial keyword like 'tool' in the text doesn't preserve real structure (C), and JSON is fully capable of representing arbitrarily nested structured content, so stripping wasn't necessary (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A long-running pipeline agent uses server-side compaction to manage a growing conversation as it approaches the context window limit. After receiving a response containing a compaction block, the developer's persistence code saves only `response.content[-1].text` (assuming the last block is always text) to the database, rather than the full `response.content`.",
    question: "What will break on the next turn?",
    options: [
      "Nothing — compaction blocks are purely informational and don't need to be preserved for the conversation to continue correctly",
      "Compaction blocks must be preserved and passed back unchanged on subsequent requests, since the API uses them to replace the compacted history; saving only the trailing text block silently discards the compaction block, so the benefit of compaction (and possibly the ability to continue coherently) is lost",
      "This only matters if the agent is also using extended thinking at the same time",
      "The API automatically reconstructs any missing compaction blocks from the database on the next request"
    ],
    correct: 1,
    explanation: "When using compaction, the full response.content — including the compaction block itself — must be appended back to the message history and preserved across persistence; the API relies on that block being present on future requests to correctly represent the compacted history. Saving only a trailing text snippet silently drops this critical block (B). This is not merely informational (A). The requirement to preserve it is independent of whether extended thinking is also used (C), and the API has no mechanism to reconstruct a discarded compaction block on your behalf from a database it doesn't have access to (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A customer-support agent persists state per conversation ID, but two different customer messages arriving concurrently for the same conversation ID both read the current state, append their own turn, and write it back — with no locking or transaction around the read-modify-write sequence.",
    question: "What bug pattern does this create?",
    options: [
      "None — reading and writing conversation state concurrently is always safe by default",
      "A classic race condition: the second write can overwrite the first, silently losing one of the two messages' updates (a lost update), leaving the persisted conversation state inconsistent with what actually happened",
      "This is only a problem if the two messages use different tool names",
      "The Anthropic API itself detects and rejects concurrent writes to the same conversation automatically"
    ],
    correct: 1,
    explanation: "Concurrent, unlocked read-modify-write sequences on shared state are a textbook race condition — whichever write happens last silently overwrites the other, resulting in a lost update and an inconsistent persisted state (B). This is a real and common bug pattern in agent-state persistence, not something that's automatically safe (A). It's unrelated to which tool names are involved (C), and there is no such automatic concurrency protection built into the Anthropic API — conversation state persistence and its concurrency control are entirely the developer's responsibility (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A developer building a resumable coding-assistant agent decides to persist only the final assistant text responses (not the full tool_use/tool_result history) between sessions, reasoning that 'the user only cares about the final answers anyway.'",
    question: "What capability does this design sacrifice?",
    options: [
      "Nothing is sacrificed, since final answers are indeed the only thing that matters for any agent",
      "The ability to truly resume mid-task: without the full tool call history, a new session can't pick back up where a previous, incomplete task left off — it can only start fresh with prior final answers as loose context, losing the specific state (which files were read, what changes were made, what's left to do) needed to continue an interrupted multi-step task",
      "This only matters for agents that never use tools at all",
      "Final-text-only persistence is technically prohibited by the Anthropic API's terms of service"
    ],
    correct: 1,
    explanation: "True resumability for an interrupted, multi-step task depends on the full record of what actions were already taken (tool calls and their results) — without it, a new session can reference prior final answers as general context but cannot precisely resume mid-task, because it doesn't know exactly what state the world was left in (which files were touched, what remains to do) (B). This is a real, meaningful loss of capability (A is wrong). It matters specifically *because* tools were used, the opposite of what C claims. And this is a design/architecture choice with no bearing on API terms of service (D)."
  },

  // ===== 8. human-in-the-loop checkpoints (7) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A DevOps automation agent has a `delete_database` tool. The developer wants to require explicit human approval before this specific tool ever executes, while other read-only tools like `list_databases` should run automatically without interruption.",
    question: "What is a standard way to implement this selectively?",
    options: [
      "Remove delete_database from the tools array entirely so Claude can never call it under any circumstances",
      "In the harness, when a tool_use block for delete_database (or any tool flagged as requiring approval) is received, pause the loop, present the proposed call to a human for approval/denial before executing, and only proceed to execute (and send back a tool_result) once a decision is made — while other, non-flagged tools execute immediately without pausing",
      "Set temperature to 0 on any request that might call delete_database, which forces Claude to always ask for permission in plain text instead of calling the tool",
      "Human-in-the-loop approval can only be implemented by disabling tool use entirely for the whole conversation"
    ],
    correct: 1,
    explanation: "A standard human-in-the-loop pattern is to gate specific, consequential tools (identified by name or a policy the harness checks) behind a pause-for-approval step in the harness itself — the tool_use is received but not executed until a human approves, while other tools continue to execute automatically (B). Removing the tool entirely (A) prevents the agent from ever proposing the action at all, which isn't the same as approve/deny. Sampling parameters like temperature have no defined effect on Claude models and don't create approval gates (C). And gating specific tools doesn't require disabling tool use altogether (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer implements an approval checkpoint by having the harness, upon seeing a tool_use for a sensitive tool, immediately execute the tool and *then* ask a human 'do you approve of this action that was already taken?' after the fact.",
    question: "What is fundamentally wrong with this implementation of 'human-in-the-loop'?",
    options: [
      "Nothing — approval after execution is functionally identical to approval before execution",
      "This defeats the entire purpose of a pre-execution approval gate: the consequential (and possibly irreversible) action has already happened by the time the human is asked, so their 'approval' can no longer actually prevent anything — the checkpoint must pause and wait for a decision before the tool actually executes",
      "This is fine as long as the human is asked within 5 seconds of execution",
      "Post-hoc approval is the only technically possible implementation, since tool_use blocks can't be intercepted before execution"
    ],
    correct: 1,
    explanation: "The entire value of a human-in-the-loop checkpoint before a consequential action is that it can actually prevent the action from happening if denied — asking for approval only after the tool has already run provides no real safeguard, since the effects (e.g., data deleted, email sent, payment made) have already occurred (B). This is not equivalent to true pre-execution approval (A). Speed of the after-the-fact question is irrelevant to the core problem (C). And tool_use blocks are absolutely interceptable before execution — that's exactly how the harness controls whether and when a tool runs (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An agent's harness pauses for human approval before executing a `refund_customer` tool call. The human denies the action. The developer's code, upon denial, simply drops the tool_use block without sending any tool_result back to the API.",
    question: "What is wrong with this handling of a denial?",
    options: [
      "Nothing — a denied tool call doesn't need any tool_result since it was never executed",
      "Every tool_use block issued by the model still requires a corresponding tool_result, even when a human denies the action — the harness should send back a tool_result (often with is_error: true or a clear denial message) explaining that the action was not approved, so Claude can adapt (e.g., ask the user for more information, try an alternative, or report the denial)",
      "Denials should always be communicated by silently ending the conversation with no further response",
      "The correct fix is to retry the same tool call automatically until a human eventually approves it"
    ],
    correct: 1,
    explanation: "Regardless of whether a tool call proceeds, executes successfully, fails, or is denied by a human, the model still expects a tool_result for every tool_use it issued — a denial should be communicated back as a tool_result (commonly with is_error: true and an explanatory message) so Claude can appropriately adapt, rather than leaving the tool_use unanswered, which breaks the conversation's structure (B). Dropping it silently (A) leaves the request malformed on the next turn. Silently ending the conversation (C) is an unnecessarily abrupt and unhelpful response to a denial. And auto-retrying until approval (D) defeats the entire purpose of a human veto."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A coding-assistant agent's harness implements approval gates by inspecting each tool_use's `name` field against a hardcoded list of 'dangerous' tool names (e.g., 'delete_file', 'run_shell_command'). A new tool called `execute_migration_script` is added later, which is highly consequential but was never added to the dangerous-tools list.",
    question: "What does this scenario illustrate about maintaining approval-gate logic?",
    options: [
      "Nothing — once an approval-gate list is created, it never needs to be revisited as new tools are added",
      "A hardcoded, manually-maintained list of gated tool names is fragile: it's easy to add a new consequential tool and forget to register it for approval, silently leaving a dangerous action unprotected — a more robust design might default to 'require approval' for any newly added tool unless explicitly allowlisted as safe, or tag tools with a risk/consequence attribute checked at gate time",
      "This can never happen because the API automatically flags consequential tools as requiring approval",
      "The fix is to require approval for every single tool call, with no exceptions, forever"
    ],
    correct: 1,
    explanation: "Hardcoded allow/deny lists for approval gating are a maintenance liability — as new tools are added over time, it's easy to forget to register a new consequential one, silently leaving a dangerous action unguarded; a more robust design defaults new/unrecognized tools to requiring approval (fail-safe/deny-by-default) or attaches an explicit risk classification to each tool definition that the gating logic checks (B). This is a real, common failure mode that does need attention (A is wrong). The Anthropic API has no built-in notion of 'consequential' tools or automatic approval requirements (C). And requiring approval for literally every tool call forever (D) is an overcorrection that defeats the purpose of selectively gating only what's genuinely risky."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A financial operations agent pauses for approval before a `transfer_funds` tool call. While waiting for a human to respond (which could take minutes or hours), the developer's harness leaves the process blocked on a synchronous input() call, unable to do anything else, including handling other unrelated concurrent user sessions on the same server.",
    question: "What is the architectural issue here?",
    options: [
      "None — blocking synchronously on human approval is the only way to implement this pattern correctly",
      "Blocking the entire process (rather than just that specific session/request) on a potentially long-running human approval wait means the server can't handle any other concurrent work in the meantime; approval waits should be implemented asynchronously (e.g., persisting the pending-approval state and resuming via a webhook, queue, or polling mechanism) so other sessions aren't starved",
      "This is only a problem for agents that never use tools requiring approval",
      "Human approval must always be granted within 100 milliseconds or the request automatically fails"
    ],
    correct: 1,
    explanation: "A human approval step can take an unpredictable and potentially long amount of time, so architecturally it should be handled asynchronously — persist the pending-approval state, free up the process/thread to handle other work, and resume the specific session once a decision arrives (via webhook, queue, or poll) — rather than blocking the entire server on one synchronous wait (B). Synchronous blocking is not the only, or even a good, way to implement this (A). This concern is inherent to any approval-gated tool, not a scenario-specific edge case (C). And there's no such fixed millisecond timeout requirement in the API or standard practice (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A research agent's harness implements an approval checkpoint before any `send_email` tool call. When presenting the pending action to the human reviewer, it shows only the tool name 'send_email' with no other detail (no recipient, subject, or body preview).",
    question: "What is the deficiency in this approval UI/UX design?",
    options: [
      "None — the tool name alone is always sufficient information for a human to make an informed approval decision",
      "A meaningful human-in-the-loop checkpoint requires showing the actual proposed action's details (e.g., recipient, subject, body) so the human can make an informed decision — approving or denying based on the tool name alone provides no real oversight, since the human has no idea what they're actually approving",
      "Showing the tool's arguments to the human is a security risk and should always be avoided",
      "This is fine as long as the tool's description field contains the word 'important'"
    ],
    correct: 1,
    explanation: "For a human approval gate to provide meaningful oversight, the human needs to see the actual content of the proposed action (recipient, subject, body, or equivalent details for other tools) — approving blind based on just a tool name defeats the purpose of the checkpoint, since the human can't actually evaluate what they're signing off on (B). This is a real deficiency, not a non-issue (A). Showing tool arguments to a human reviewer for their own approval decision is not inherently a security risk — quite the opposite, it's necessary for informed consent (C). And a description field containing a particular word has no bearing on whether the approval UI shows the actual call's arguments (D)."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A support-triage agent needs human approval before issuing account credits over $500, but credits under $500 should be applied automatically without interruption. The developer implements this by checking the `amount` parameter inside the tool_use block's input before deciding whether to pause for approval.",
    question: "Is this a sound way to implement a conditional (threshold-based) approval checkpoint?",
    options: [
      "No — approval checkpoints can only ever be applied uniformly to an entire tool, never conditionally based on the specific arguments of a given call",
      "Yes — inspecting the actual arguments of a proposed tool call (not just its name) to decide whether that specific invocation crosses a risk threshold requiring human sign-off is a standard and appropriate pattern for proportionate human-in-the-loop design",
      "No — the amount parameter cannot be reliably read from a tool_use block before execution",
      "Yes, but only if the tool is a server-side tool rather than a client-defined one"
    ],
    correct: 1,
    explanation: "Conditional approval gating — inspecting the specific arguments of a proposed call (like a dollar amount) to decide whether that particular invocation needs human sign-off — is a sound, proportionate design that avoids over-gating low-risk actions while still protecting against high-risk ones (B). Approval logic is commonly and appropriately applied per-call based on arguments, not just uniformly per-tool (A is wrong). The tool_use block's input parameters are fully readable by the harness before execution (C is false). And this pattern applies to client-defined custom tools like a credit-issuing tool just as well as (or more commonly than) server-side tools (D is wrong)."
  },

  // ===== 9. mixing deterministic code + Claude-driven decision steps (7) =====
  {
    domain: 3,
    difficulty: 2,
    scenario: "A developer builds a data-processing pipeline: step 1 deterministically parses a CSV file into rows using pandas, step 2 asks Claude to classify each row's sentiment via a tool call, and step 3 deterministically aggregates the classifications into a summary chart using matplotlib.",
    question: "Is this a well-designed workflow?",
    options: [
      "No — every step of an agentic workflow must be delegated to Claude for the system to count as 'agentic'",
      "Yes — this is a sound mix: deterministic code handles parsing and aggregation (tasks with fully predictable, mechanical logic), while Claude is reserved for the one genuinely judgment-requiring step (sentiment classification), which is the appropriate division of labor",
      "No — Claude must never be used for classification tasks; those should always be handled by a dedicated ML model",
      "Yes, but only if steps 1 and 3 are also reimplemented as tool calls that Claude explicitly decides to invoke"
    ],
    correct: 1,
    explanation: "A well-designed hybrid workflow uses deterministic code for steps with fully predictable, mechanical logic (parsing, aggregation, formatting) and reserves the model for the step that actually requires judgment or natural-language understanding (sentiment classification here) — this is the recommended division of labor, not an anti-pattern (B). Not every step needs to be 'agentic' for a system to have genuine value from agentic decision-making (A is wrong). Claude can reasonably be used for classification tasks; there's no rule against it (C). And there's no requirement that the deterministic steps also be wrapped as Claude-invoked tool calls if the sequencing itself doesn't need Claude's judgment (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer builds a workflow where every single step — including trivial ones like 'convert this string to uppercase' and 'compute the sum of this list of numbers' — is implemented as a tool that Claude must decide to call, rather than being handled directly in code.",
    question: "What is the main critique of this design?",
    options: [
      "None — routing every possible operation, however trivial, through a Claude tool call is always the ideal design for maximum flexibility",
      "Routing purely deterministic, mechanical operations through Claude tool calls adds unnecessary latency, cost, and potential for error (e.g., Claude could theoretically miscall the tool or reason incorrectly about when to invoke it) for logic that has no real decision-making component — such steps should just be plain code, executed directly by the harness without needing Claude's involvement at all",
      "This is required because the Anthropic API mandates that all application logic be exposed as tools",
      "This is only a problem if the tools are executed in parallel rather than sequentially"
    ],
    correct: 1,
    explanation: "Operations with no genuine judgment or ambiguity — pure computation or string manipulation — don't benefit from being routed through Claude's decision-making; doing so only adds latency, token cost, and an unnecessary point of potential model error for logic that a plain function handles perfectly and cheaply every time (B). This is a recognized anti-pattern, not an ideal (A). The API has no such requirement to expose all logic as tools (C). And the critique applies regardless of whether tool execution happens in parallel or sequentially (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A DevOps automation agent's workflow has a deterministic step that queries a monitoring API for current CPU usage, followed by a Claude-driven decision step where Claude is given the raw metric and asked to decide whether to scale up, scale down, or do nothing. The 'scale' actions are then executed via more deterministic code.",
    question: "What principle does this workflow correctly demonstrate?",
    options: [
      "That Claude should never be given raw numeric data and should always receive pre-summarized text instead",
      "That deterministic code should handle reliably mechanical work (fetching a metric, executing a scaling API call) while Claude is used specifically for the step that requires judgment under ambiguity (deciding what scaling action, if any, is appropriate given current conditions) — a clean separation between fetch/act (code) and decide (model)",
      "That every decision an agent makes must always be preceded by exactly one deterministic step and followed by exactly one deterministic step",
      "That Claude cannot be trusted to make any decisions about infrastructure and this workflow is fundamentally unsafe"
    ],
    correct: 1,
    explanation: "This workflow cleanly separates fetch (deterministic: query the monitoring API), decide (Claude: judge whether scaling is warranted given the metric and any other context), and act (deterministic: execute the scaling call) — using the model specifically for the judgment step while keeping the surrounding mechanical work in code (B). There's no general rule against giving Claude raw numeric data (A). Workflows aren't required to have exactly one deterministic step on each side of a decision — the right shape depends on the task (C). And the described pattern, especially if paired with reasonable safeguards (e.g., approval gates for large actions), is a standard, sound way to use Claude in infrastructure workflows, not inherently unsafe (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A customer-support triage workflow deterministically fetches a customer's account history from a database, then asks Claude to draft a response. Afterward, the workflow deterministically checks the drafted response against a blocklist of banned phrases before sending it, and if a banned phrase is found, discards the draft and asks Claude to try again with feedback about which phrase was problematic.",
    question: "What does the deterministic blocklist check represent in this workflow design?",
    options: [
      "An unnecessary redundant step, since Claude never generates text containing banned phrases",
      "A deterministic guardrail layered around a Claude-driven generative step — using cheap, reliable, mechanical validation to catch a specific known failure mode before output reaches the customer, rather than relying solely on Claude's judgment to avoid banned phrases every time",
      "Proof that Claude cannot be trusted to write any customer-facing text and human review should replace this step entirely",
      "A step that should be removed because deterministic validation of language model output is technically impossible"
    ],
    correct: 1,
    explanation: "This is a good example of using cheap, deterministic code as a guardrail around a probabilistic, Claude-generated step — rather than hoping the model never produces a banned phrase, the workflow mechanically checks for known bad patterns and loops back with feedback if one is found, combining the strengths of both approaches (B). It's not redundant — models can and do occasionally produce undesired phrasing (A is wrong). This pattern doesn't imply Claude can't be trusted for any text generation, just that a cheap safety check is worthwhile (C). And deterministic string/pattern matching against generated output is straightforward and commonly done — not technically impossible (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A pipeline agent processes 10,000 records. For each record, the developer routes the entire record through a full Claude API call — including records that are already perfectly well-formed and require no transformation or judgment at all, just a pass-through.",
    question: "What improvement to this workflow would best reflect good deterministic/agentic mixing?",
    options: [
      "Add a cheap, deterministic pre-check (e.g., a validation function) that identifies already-well-formed records and passes them through directly, reserving Claude calls only for records that are genuinely malformed, ambiguous, or require judgment to fix — reducing cost and latency without sacrificing correctness",
      "Nothing should change; sending every record through Claude regardless of whether it needs judgment ensures maximum consistency",
      "Replace the entire pipeline with a fully deterministic system, since any use of Claude for data processing is inappropriate",
      "Batch all 10,000 records into a single oversized Claude request to reduce the total number of API calls"
    ],
    correct: 0,
    explanation: "A cheap deterministic filter that routes only the records genuinely needing judgment through Claude — while passing already-well-formed records through directly — is the classic efficient hybrid design: it avoids paying for model calls on work that a simple validation function can already handle with full confidence (A). Sending every record through Claude regardless of need (B) wastes cost and latency for no benefit. Eliminating Claude entirely (C) throws away its value for the genuinely ambiguous cases it's suited for. And cramming all 10,000 records into one oversized request (D) doesn't address the underlying issue and risks exceeding context/output limits and losing per-record error isolation."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A multi-step research agent workflow asks Claude, at each step, both to perform the research reasoning *and* to decide the exact JSON schema and formatting of its own intermediate outputs, which are then passed directly into strict, schema-dependent deterministic code downstream (e.g., inserting into a SQL table with fixed columns).",
    question: "What is the risk in letting Claude freely decide output formatting for a value consumed by strict downstream deterministic code?",
    options: [
      "There is no risk; Claude always produces perfectly consistent formatting across every call with no configuration needed",
      "Since the downstream code requires an exact, fixed schema, leaving formatting entirely up to Claude's free-form judgment invites inconsistency and parsing failures; the workflow should instead constrain Claude's output to the required schema explicitly (e.g., via structured outputs or a strictly defined tool schema) rather than hoping free-form formatting happens to match",
      "This is only a risk if Claude is using extended thinking during that step",
      "SQL insertion can never be automated and must always be done manually by a human regardless of the agent's output"
    ],
    correct: 1,
    explanation: "When deterministic downstream code depends on an exact schema, leaving the model free to choose its own output formatting is risky — small variations in structure, field names, or types can break strict parsing; the fix is to explicitly constrain the model's output to the required schema (e.g., structured outputs, a strict tool input_schema) rather than relying on free-form consistency (B). Model output formatting is not guaranteed to be perfectly consistent without such constraints (A is wrong). This risk exists independent of whether extended thinking is used (C). And SQL insertion driven by validated, schema-constrained model output can absolutely be automated — it doesn't require manual human entry (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A workflow for a coding-assistant agent deterministically runs a linter on the codebase, then feeds only the lint errors (not the entire codebase) to Claude, asking it to propose fixes. The fixes are applied via a deterministic patch-application step, followed by a deterministic re-run of the linter to verify.",
    question: "What is the benefit of feeding Claude only the lint errors rather than the entire codebase at this step?",
    options: [
      "There is no benefit; Claude performs identically whether given the entire codebase or just the relevant errors",
      "It reduces the amount of irrelevant context Claude has to process, keeping the judgment-requiring step focused on exactly the information needed to do the job (which specific issues need fixing) — this is an example of using deterministic pre-processing to scope and prepare the input for the model's decision-making step efficiently",
      "Feeding partial context to Claude is against best practice; the full codebase must always be included in every request for correctness",
      "This only matters when using the code_execution server-side tool"
    ],
    correct: 1,
    explanation: "Using deterministic pre-processing (running the linter) to scope down what's sent to Claude — providing just the errors that need judgment-based fixes rather than the entire codebase — keeps the model's context focused, reduces token cost, and lets Claude concentrate on the part of the task that actually needs its reasoning (B). This is a real, meaningful benefit, not a non-issue (A). There's no general rule that full context must always be included — scoping context appropriately is itself good practice (C). And this benefit of pre-processing to scope context applies broadly, not specifically or only to the code_execution tool (D)."
  },

  // ===== 10. debugging unexpected agent behavior (8) =====
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer notices their coding-assistant agent keeps calling the same `read_file` tool with the exact same path over and over, seemingly never satisfied with the result, until it hits the iteration cap. Inspecting the harness code, they find the tool_result content for `read_file` is always sent back as the literal string `'[object Object]'` instead of the actual file contents.",
    question: "What is the most likely root cause of the looping behavior?",
    options: [
      "Claude has a bug that causes it to always call read_file exactly this many times regardless of the tool_result content",
      "The tool_result content is a broken, uninformative placeholder rather than the actual file contents (likely from failing to serialize a JS object to a string properly) — Claude, receiving no usable information from repeated calls, keeps retrying the same call hoping for a different, useful result",
      "This is expected default behavior for the read_file tool and no fix is needed",
      "The loop is caused by max_tokens being set too high, not by the tool_result content"
    ],
    correct: 1,
    explanation: "'[object Object]' is a classic symptom of a JavaScript object being implicitly stringified (e.g., forgetting JSON.stringify() or otherwise not extracting the real payload) — Claude receives no actual file content on any attempt, and since it has no way to know the read genuinely failed to serialize, it reasonably keeps retrying, hoping for a usable result (B). This isn't an inherent Claude bug tied to a specific call count (A). This is clearly broken, not expected behavior (C). And an overly high max_tokens doesn't explain why the tool_result content itself is garbage — the root cause is the serialization bug (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A research agent behaves correctly for single-tool-call turns but seems to 'forget' about the second of two parallel web_search calls it made — its next response only ever references results from one of the two searches. The developer confirms both searches execute successfully and both produce tool_result blocks with unique, correct tool_use_ids.",
    question: "Given both tool_result blocks are individually correct, what is the next most likely place to look for the bug?",
    options: [
      "The model itself, since Claude cannot process more than one tool_result in the same context under any circumstances",
      "Whether both tool_result blocks are actually being placed in the same single user message (as required) rather than being split across two separate messages, or being deduplicated/overwritten in an intermediate content-array before the request is sent",
      "The API key being used, since a single API key can only process one tool_result per billing cycle",
      "The system prompt's word count, since prompts over a certain length silently drop tool results"
    ],
    correct: 1,
    explanation: "Given both individual tool_result blocks are confirmed correct, the most likely culprit is in how they're assembled into the request — e.g., accidentally sending them in two separate messages instead of one, or a bug in building the content array (like using a dict keyed by something that collides and overwrites one of the two results) before the request goes out (B). Claude can absolutely process multiple tool_results in one message (A is false — that's the normal parallel tool use pattern). There's no such API-key-based limitation (C), and system prompt length has no documented mechanism for silently dropping tool_result blocks (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A customer-support agent, after a tool call to `check_order_status` returns `is_error: true` with a clear message, immediately calls `check_order_status` again with the identical arguments — Claude appears to be ignoring the error content entirely and behaving as if the call could simply be retried into success.",
    question: "What should the developer check first when debugging this apparent 'ignoring of error information'?",
    options: [
      "Whether the error tool_result's content field actually contains a clear, specific, and actionable message — vague or generic error text (e.g., just 'Error') gives Claude little useful signal to change its approach, which can look like Claude is 'ignoring' the error when really it just wasn't given enough information to act differently",
      "Whether Claude has a hardware fault, since repeated identical tool calls always indicate a hardware-level issue",
      "Whether the API key has exceeded its rate limit, since rate limiting causes Claude to repeat tool calls",
      "Whether the conversation has more than 50 total messages, since conversations that long always cause Claude to ignore recent tool_results"
    ],
    correct: 0,
    explanation: "When Claude appears to 'ignore' an error and retry identically, the first thing to check is the quality and specificity of the error message itself — vague content gives the model nothing new to reason with, so it may reasonably retry the same call, which just looks like ignoring the error (A). There's no such thing as 'Claude has a hardware fault' as a debugging concept (B). Rate limiting produces distinct 429 errors at the transport level, not behavioral tool-call repetition by the model (C). And there's no fixed message-count threshold that causes Claude to categorically ignore recent tool_results (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A DevOps automation agent's harness logs show that Claude issued a `scale_up` tool_use, the harness executed it, appended the tool_result correctly, and sent the next request — but Claude's very next response calls `scale_up` again with the same arguments, seemingly unaware the first call already succeeded.",
    question: "Besides a vague tool_result message, what is another plausible root cause worth investigating?",
    options: [
      "That the assistant's turn containing the original scale_up tool_use block was never actually appended to the messages array sent in the follow-up request — meaning Claude's context for that request doesn't include any record that it made the call in the first place",
      "That Claude is deliberately trying to scale up twice as a security feature",
      "That the tool's name field was misspelled as 'scale_upp' in the second request, which is unrelated to whether history was preserved",
      "That web_search was included in the tools array alongside scale_up, which always causes duplicate calls"
    ],
    correct: 0,
    explanation: "If the assistant's own prior tool_use turn is missing from the message history sent in the follow-up request (a common bug: appending only the tool_result but forgetting to also append the preceding assistant turn, or reconstructing history incorrectly), Claude has no memory in that request that it already made the call — from its perspective, it's being asked fresh and reasonably decides to call it again (A). This isn't a deliberate 'security feature' (B) — that's not a real behavior of the model. A tool name typo would likely cause a schema/validation error rather than this symptom, and isn't described as occurring here (C). And having web_search as an additional available tool has no established causal link to duplicate calls of an unrelated tool (D)."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A pipeline agent that used to terminate cleanly after 3-4 loop iterations now runs until it hits the max_iterations cap on every single request, ever since the developer added a new `log_progress` tool that Claude can call to write status updates, with no other changes to the harness.",
    question: "What is a reasonable hypothesis to investigate first?",
    options: [
      "That log_progress's tool description doesn't clearly convey that it's a lightweight, non-terminal status update and Claude is now treating logging progress as a necessary but never-quite-satisfying step in its plan, or is calling it repeatedly instead of concluding — worth reviewing the tool's description and testing whether removing it restores normal termination",
      "That adding any new tool to an agent always doubles its iteration count deterministically",
      "That the max_iterations cap itself has a hidden bug unrelated to the new tool and should be rewritten from scratch",
      "That the API silently requires at least one call to every declared tool before allowing end_turn"
    ],
    correct: 0,
    explanation: "Since the only change was adding a new tool, the most direct hypothesis is that the new tool itself — likely due to an ambiguous or poorly scoped description — is influencing Claude's behavior (e.g., calling it repeatedly, or treating an in-progress task as never fully resolved); testing with the tool removed and reviewing/tightening its description is the natural first debugging step (A). There's no deterministic 'doubling' behavior tied to adding tools (B). Jumping to rewriting the iteration cap from scratch (C) skips investigating the actual correlated change. And there is no such API requirement that every declared tool must be called before end_turn is permitted (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A multi-agent research system's coordinator occasionally, and seemingly at random, delegates to the wrong subagent — sending a legal-review sub-task to a subagent whose system prompt and tools are specifically about financial modeling. Both subagents' names and descriptions in the coordinator's roster/tool list are distinct.",
    question: "What is a good next debugging step, given the two subagents' identifiers appear distinct on inspection?",
    options: [
      "Assume this is unfixable random model noise and add a manual human review step after every single delegation, forever",
      "Examine whether the delegation tool's description or each subagent's description in the coordinator's context is actually distinctive and prescriptive enough about what each subagent is suited for — vague or overlapping descriptions (e.g., both simply saying 'helps with tasks') can cause misrouting even when the names themselves look different",
      "Conclude the bug must be in the tool_result serialization, since that's the only possible cause of any agent misbehavior",
      "Switch both subagents to use the exact same system prompt, which will resolve the routing ambiguity"
    ],
    correct: 1,
    explanation: "Delegation routing quality depends heavily on how well each subagent's role and specialty are described to the coordinator — even distinct names can be paired with vague or overlapping descriptions that don't clearly convey what each subagent is good at, leading to misrouting; auditing and sharpening those descriptions is a sensible next step (B). Treating this as unfixable and only patching it with permanent human review (A) skips investigating a very plausible, correctable cause. Assuming tool_result serialization is the only possible cause of any agent bug (C) is an unsupported overgeneralization. And making both subagents share the same system prompt (D) would make them functionally identical and wouldn't fix — it would guarantee — routing being meaningless."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A developer's agent works correctly in local testing but in production frequently returns responses that look like Claude is responding to an entirely different, earlier conversation than the one the current user is having. Requests are handled by a pool of worker threads.",
    question: "What is a likely root cause given the described symptom and architecture?",
    options: [
      "The Anthropic API is stateful and remembers previous unrelated users' conversations across requests by default",
      "A shared, mutable messages list or conversation-state object is being reused across worker threads without proper per-conversation isolation, causing one user's request to be built from or mixed with another user's history",
      "This symptom always indicates the model itself has a memory leak that must be fixed by Anthropic",
      "The max_tokens parameter is being set too low, which causes conversations to blend together"
    ],
    correct: 1,
    explanation: "The Anthropic API is stateless — each request stands alone based only on what's included in that request's messages array — so a symptom like responses mixing up different users' conversations under multi-threaded load strongly points to a client-side bug: shared mutable state (e.g., a global or improperly-scoped messages list) being concurrently read/written by multiple worker threads without proper per-conversation isolation (B). The API is not stateful in this way and does not remember prior unrelated conversations (A is false). This is not a model-side 'memory leak' — the model has no persistent memory between separate API calls (C). And max_tokens controls response length, not conversation isolation, so it has no bearing on this symptom (D)."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "An agent debugging session reveals that Claude is calling a tool named `get_user_data` when the developer intended it to call a very similarly-named but functionally different tool, `get_user_metadata`, which is also present in the same `tools` array with an almost identical description differing only in one sentence.",
    question: "What is the best fix for this kind of tool-selection confusion?",
    options: [
      "Give the two tools more clearly differentiated names and descriptions that make their distinct purposes and appropriate use cases unambiguous, since near-identical names and descriptions make it genuinely hard — for a model or a human — to reliably pick the right one",
      "Remove get_user_metadata entirely, since having two tools that do different things is inherently a bug",
      "Set tool_choice to force get_user_metadata on every single request regardless of context, permanently",
      "This cannot be fixed through tool design; the only solution is to fine-tune a custom model"
    ],
    correct: 0,
    explanation: "When two tools are named and described almost identically but behave differently, tool selection confusion is expected — the fix is to make the tools' names and descriptions clearly, unambiguously differentiated so the distinction (and when to use each) is obvious (A). Having two related-but-distinct tools is not inherently a bug — the confusion stems from poor differentiation, not from having two tools (B). Forcing one specific tool via tool_choice on every request (C) would break all the cases where the other tool is genuinely needed. And this class of problem is routinely fixable through better tool design/prompting without requiring model fine-tuning (D)."
  }
];
