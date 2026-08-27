export const QUESTIONS_D5 = [
  // ---- Topic 1: Writing clear, specific tool names and descriptions ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer building a customer-support agent defines a tool named 'handle' with description 'Handles requests.' Claude frequently calls it for unrelated tasks like calculating refunds, searching orders, and sending emails.",
    question: "What is the most likely root cause of this misuse?",
    options: [
      "Claude cannot reliably use more than one tool per conversation",
      "The tool's name and description give Claude no information about its actual scope, so Claude guesses based on the name alone",
      "The tool needs a longer input_schema with more required fields",
      "The API key does not have permission to restrict tool usage"
    ],
    correct: 1,
    explanation: "A vague name like 'handle' and a content-free description like 'Handles requests.' give Claude nothing to reason about when deciding whether the tool fits a given task, so it over-applies the tool (B). Claude can use many tools in one conversation (A is false). Schema length doesn't fix a scoping problem (C), and permissions are unrelated to call selection (D).",
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A weather-lookup tool is named 'get_weather' with description 'Get current weather for a location'. A developer wants to add a second tool for 5-day forecasts and is deciding how to name and describe it.",
    question: "Which approach best reduces the chance Claude confuses the two tools?",
    options: [
      "Name it 'get_weather_2' since it is similar to the first tool",
      "Name it 'get_forecast' with a description that explicitly distinguishes it from current-conditions lookups, e.g. 'Get the 5-day weather forecast for a location. Use this instead of get_weather when the user asks about future days, not current conditions.'",
      "Reuse the name 'get_weather' but add a 'mode' parameter, since Claude infers intent from parameter names alone",
      "Omit the description entirely so Claude relies purely on the tool name"
    ],
    correct: 1,
    explanation: "A distinct, descriptive name plus a description that explicitly contrasts the two tools' use cases (B) gives Claude the clearest signal for disambiguation. 'get_weather_2' (A) is uninformative. Reusing a name for two different tools isn't possible/clear via a mode param alone without documentation (C). Omitting descriptions (D) removes the very signal needed to disambiguate."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A tool named 'search_database' has the description 'Searches the database.' It is one of 40 tools available to Claude in a large internal admin agent, several of which also involve searching different data sources.",
    question: "What is the best fix for this tool description given the crowded tool list?",
    options: [
      "Shorten the description further so it loads faster in context",
      "Rename the tool to something shorter like 'search' since Claude can infer the rest from context",
      "Expand the description to state which database it searches, what fields are searchable, when to use it versus the other search tools, and what it returns",
      "Remove the description and instead explain all tools in the system prompt"
    ],
    correct: 2,
    explanation: "With many similar tools available, precision matters most: stating which data source, what's searchable, when to prefer it over siblings, and the return shape (C) is what lets Claude pick correctly. Shortening (A) or renaming shorter (B) removes disambiguating detail. Moving tool documentation into the system prompt (D) duplicates information Claude already gets per-tool and is harder to keep in sync as tools change."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A code-execution tool description reads: 'Runs Python code in a secure sandbox and returns stdout, stderr, and any files written to /output. Use this for calculations, data analysis, or generating charts — not for tasks that only require a text answer.'",
    question: "Why is this description considered well-written?",
    options: [
      "It uses forceful language like 'CRITICAL' and 'MUST' to ensure Claude always calls it",
      "It states what the tool does, what it returns, and gives clear guidance on when to use it versus when not to, without being ambiguous or overly aggressive",
      "It is short enough to fit in a single line of the input_schema",
      "It avoids mentioning what the tool returns, since Claude can infer that at call time"
    ],
    correct: 1,
    explanation: "Good tool descriptions state the mechanism, the return shape, and both positive and negative triggering guidance (B) — this description does all three plainly. It has no forceful capitalized language (A is false — and such language tends to cause overtriggering). Length alone isn't the criterion (C), and omitting the return shape (D) would make it harder for Claude to know how to use the result."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer writes a tool description with the sentence: 'ALWAYS call this tool before answering ANY question, even if you already know the answer, to be safe.' After deployment, the agent calls this tool constantly, even for greetings and small talk, adding latency and cost.",
    question: "What change would most directly fix the overtriggering?",
    options: [
      "Remove the tool from the tools array entirely so it can never be misused",
      "Replace the blanket instruction with specific guidance on the situations where the tool is actually needed, e.g. 'Use this tool when the user asks about information that may have changed since your training, such as current prices or recent events.'",
      "Increase max_tokens so Claude has more room to decide whether to call the tool",
      "Rename the tool so it sounds less appealing to call"
    ],
    correct: 1,
    explanation: "Blanket, forceful triggering language ('ALWAYS', 'even if you already know') causes exactly this overtriggering; replacing it with scoped, condition-based guidance (B) tells Claude when the tool is genuinely needed. Removing the tool (A) eliminates a capability the agent still needs sometimes. max_tokens (C) doesn't affect tool-selection judgment. Renaming (D) doesn't address the described trigger condition."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "Two tools exist in an internal agent: 'create_ticket' (description: 'Creates a support ticket') and 'log_issue' (description: 'Logs an issue'). Both actually write to the same ticketing system with nearly identical parameters, and Claude sometimes calls both for the same user complaint, creating duplicate tickets.",
    question: "What is the best way to resolve this?",
    options: [
      "Add a note to each tool's description saying 'do not call the other tool for the same request'",
      "Consolidate the two tools into one well-named, well-described tool, since they perform the same underlying action and their separate existence is the actual source of ambiguity",
      "Increase the required fields on both tools so Claude has to think harder before calling either",
      "Set tool_choice to 'any' so Claude is forced to pick only one"
    ],
    correct: 1,
    explanation: "When two tools do the same thing under different names, the fix is to remove the redundancy at the source by merging them (B) rather than patching around it with cross-referencing instructions (A), which is fragile and easy to violate. More required fields (C) doesn't address the duplication. Forcing exactly one tool call via tool_choice: 'any' (D) actually requires at least one tool call every turn and doesn't resolve which of the two duplicate tools gets picked."
  },

  // ---- Topic 2: Designing input_schema properties ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A 'book_flight' tool has an input_schema with a 'date' property typed as a plain string with no description. In testing, Claude sometimes sends '03/15/2026', sometimes 'March 15', and sometimes '2026-03-15', breaking the downstream booking API which expects ISO 8601.",
    question: "What is the most effective fix?",
    options: [
      "Add a description to the 'date' property specifying the exact expected format, e.g. 'Date in ISO 8601 format (YYYY-MM-DD), e.g. 2026-03-15', and optionally use a string format constraint",
      "Change the tool's name to 'book_flight_iso' to hint at the format",
      "Remove the date field and have Claude describe the date in the free-text 'notes' field instead",
      "Tell Claude in the system prompt, once, that all dates everywhere must be ISO 8601"
    ],
    correct: 0,
    explanation: "Property-level descriptions with an explicit example (A) are the direct, scoped fix — schema descriptions are exactly where format constraints belong, and JSON Schema's string 'format' can reinforce it. Renaming the tool (B) doesn't communicate a format. Moving the date into free text (C) reintroduces the ambiguity rather than solving it. A global system-prompt rule (D) is indirect and easy to miss compared to describing the constraint at the point of use."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A 'set_priority' tool has a 'priority' parameter typed as a plain string with description 'The priority level.' In practice Claude sends values like 'high', 'High', 'urgent', and 'P1' interchangeably, and the backend only recognizes 'low', 'medium', 'high'.",
    question: "What schema change best prevents this inconsistency?",
    options: [
      "Make 'priority' an integer instead of a string so there is no ambiguity",
      "Constrain 'priority' with an enum listing exactly the accepted values, e.g. [\"low\", \"medium\", \"high\"]",
      "Add a second parameter 'priority_confirmed' that Claude must set to true",
      "Leave the schema as-is and instead validate and reject bad values at execution time, without a fix in the schema"
    ],
    correct: 1,
    explanation: "An enum constraint (B) tells Claude exactly which values are valid up front, preventing most bad values from being generated at all — this is the canonical use of enum in input_schema. Switching to integer (A) just moves the ambiguity to which number means what. A confirmation flag (C) doesn't constrain the actual value. Relying solely on runtime validation (D) catches errors after the fact instead of preventing them."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'create_calendar_event' tool has required fields: title, start_time, end_time, and attendees. A developer notices Claude frequently omits 'attendees' even for meetings that clearly need invitees, and sometimes passes an empty array when no attendees were mentioned.",
    question: "Assuming attendees should be optional but clearly documented, what is the best schema-level fix?",
    options: [
      "Keep attendees in 'required' but allow it to default to an empty array",
      "Move 'attendees' out of the 'required' array and add a description clarifying it should be omitted (not an empty array) when no attendees are specified",
      "Rename 'attendees' to 'invitees_optional' so Claude knows it's optional",
      "Remove the attendees parameter entirely and have Claude create a separate tool call to add attendees afterward"
    ],
    correct: 1,
    explanation: "If a field is genuinely optional, it shouldn't be in 'required' — and a clear description of the omit-vs-empty-array convention (B) removes ambiguity about how to represent 'no attendees'. Keeping it required (A) forces Claude to invent a value every time, which is the wrong signal for an optional field. Renaming (C) is a weaker signal than the required array and a description. Splitting into a second tool call (D) adds unnecessary round trips for what is a simple optional field."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A 'search_orders' tool's input_schema has a property 'limit' with no description and no bounds, typed as integer. Under load, Claude occasionally requests limit values like 50000, causing the backend query to time out.",
    question: "What schema change most directly reduces this failure mode?",
    options: [
      "Remove 'limit' from the schema so Claude cannot specify it",
      "Add a description explaining what 'limit' controls, along with minimum/maximum constraints (e.g. minimum: 1, maximum: 100) so out-of-range values are documented and can be validated",
      "Change 'limit' to a string type so large numbers are harder to type",
      "Add a separate tool 'search_orders_small' that hardcodes a small limit"
    ],
    correct: 1,
    explanation: "Documenting the parameter's purpose and constraining it with min/max bounds (B) is exactly what JSON Schema numeric constraints are for, and gives both Claude and any schema-validating client a clear contract. Removing the field (A) removes useful functionality. Changing type to string (C) doesn't prevent large numeric strings and complicates parsing. A duplicate tool (D) is an unnecessary workaround for a one-line schema fix."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'transfer_funds' tool has parameters 'from_account', 'to_account', and 'amount', all plain strings with minimal descriptions. Claude occasionally passes 'amount' as '$500.00' or '500 dollars' instead of a numeric value, causing parsing failures downstream.",
    question: "What is the most robust input_schema fix?",
    options: [
      "Type 'amount' as a number (not string) with a description specifying the unit (e.g. 'Amount in USD, as a decimal number, e.g. 500.00 — do not include currency symbols'), and keep 'from_account'/'to_account' as clearly described strings",
      "Keep 'amount' as a string but add a note in the tool description asking Claude to be careful with formatting",
      "Add a fourth parameter 'currency_symbol_included' as a boolean flag",
      "Remove 'amount' from input_schema and have Claude describe the whole transfer in natural language in a single 'request' string"
    ],
    correct: 0,
    explanation: "Using the correct JSON Schema type (number) plus an explicit unit and format note (A) constrains the value at the schema level, which is far more reliable than relying on a note to be careful (B). Adding a flag to detect malformed input after the fact (C) treats a symptom rather than preventing it. Collapsing structured parameters into free text (D) throws away the type safety that structured input_schema exists to provide, especially risky for a financial operation."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'query_database' tool accepts a single string parameter 'sql' with description 'The SQL query to run.' Claude sometimes generates multi-statement queries (e.g. a SELECT followed by a DROP TABLE) because nothing in the schema constrains what kind of query is expected.",
    question: "Beyond execution-time safeguards, what input_schema-level change best reduces the chance of this happening?",
    options: [
      "Nothing — input_schema can only describe types, not query semantics, so this must be handled entirely at execution time",
      "Replace the freeform 'sql' string with a more structured, purpose-specific schema (e.g. separate 'table', 'filters', and 'columns' fields for a defined query pattern) so the tool cannot express arbitrary SQL in the first place",
      "Add a 'max_statements' integer field that Claude must set to 1",
      "Keep the freeform SQL string but add an enum of allowed SQL keywords to the description as prose"
    ],
    correct: 1,
    explanation: "The most robust schema-level fix is to narrow the shape of what can be expressed at all — structured fields for a defined query pattern (B) make destructive or multi-statement queries impossible to represent, not just discouraged. Claiming input_schema can't help (A) ignores that schema design controls the space of expressible inputs. A self-reported 'max_statements' field (C) is trivially inconsistent with the actual string content. Prose-only keyword lists in a description (D) are not enforced and are easy for the model to disregard under pressure."
  },

  // ---- Topic 3: Handling tool execution errors ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A 'get_stock_price' tool call fails because the ticker symbol Claude provided doesn't exist. The developer's code catches the exception and returns a tool_result with content 'Error' and is_error omitted.",
    question: "What should be changed to help Claude recover gracefully?",
    options: [
      "Nothing — as long as some string is returned, Claude will figure out what happened",
      "Set is_error: true on the tool_result and include a specific, actionable message such as 'Ticker \"XYZQ\" not found. Verify the symbol or ask the user to confirm the company name.'",
      "Silently retry the same tool call up to 5 times before giving up",
      "Terminate the conversation and ask the user to restart, since tool errors cannot be recovered from mid-conversation"
    ],
    correct: 1,
    explanation: "Marking the result is_error: true and giving a specific, actionable explanation (B) lets Claude understand what went wrong and decide how to proceed (e.g., ask for clarification or try a corrected symbol). A bare 'Error' string without is_error (A) under-informs Claude about both the failure and its cause. Blind retries of an inherently invalid input (C) waste calls since the ticker will never resolve. Terminating the conversation (D) is a drastic overreaction to a recoverable input error."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A file-reading tool encounters a permissions error when Claude tries to read a protected system file. The developer's error-handling code returns is_error: true with content: 'Traceback (most recent call last): ... PermissionError: [Errno 13] Permission denied: \\'/etc/shadow\\'' — the raw Python traceback.",
    question: "What is the main problem with this tool_result, and what is a better fix?",
    options: [
      "There is no problem — Claude is capable of parsing raw stack traces and extracting the useful part itself",
      "The raw traceback is unnecessarily verbose and implementation-specific; a better result would be a concise, model-facing message like 'Permission denied: cannot read /etc/shadow. This file is outside the allowed directory.'",
      "The fix is to stop setting is_error and just return an empty string instead",
      "The fix is to raise the exception again so it crashes the calling application, which is more informative"
    ],
    correct: 1,
    explanation: "Tool results should communicate the failure in terms useful to the model's next decision, not leak internal implementation details like stack traces (B). While Claude can often parse tracebacks, a purpose-written, concise message is more reliable and avoids leaking internal paths/implementation details. Returning nothing (C) discards the error signal. Crashing the app (D) is a harness-level failure, not error communication to the model."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'send_email' tool occasionally fails due to a transient SMTP timeout. The current implementation returns is_error: true with 'SMTP connection failed' and stops there, requiring the user to manually ask Claude to try again every time this happens.",
    question: "What is the best way to improve resilience for this kind of transient failure?",
    options: [
      "Implement retry-with-backoff inside the tool execution code for transient failures, and only surface a tool_result to Claude after retries are exhausted (or immediately, with a message indicating it's transient and retryable)",
      "Set is_error: false so Claude thinks the email sent successfully",
      "Remove the send_email tool since email delivery cannot be made reliable",
      "Ask the user to manually retry after every transient failure, since automatic retries could send duplicate emails"
    ],
    correct: 0,
    explanation: "Transient infrastructure failures are best absorbed by retry logic in the harness itself (A), so Claude and the user aren't burdened with routine retries; if retries are exhausted, an honest is_error result lets Claude explain and offer to retry. Lying about success (B) is actively harmful. Removing the tool (C) discards a needed capability. Requiring manual retries for every transient blip (D) is poor UX when idempotency (e.g., via a request ID) can often make automatic retry safe."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'run_query' database tool has two failure modes: (1) the SQL syntax is invalid, and (2) the query is syntactically valid but returns zero rows. Currently both cases return the same tool_result: {is_error: true, content: 'No results.'}",
    question: "What is wrong with this error-handling approach?",
    options: [
      "Nothing is wrong — both cases mean the query didn't produce usable data, so treating them the same is correct",
      "Zero rows is not an error condition — it's a valid, successful query result — while invalid syntax is a genuine error; conflating them prevents Claude from distinguishing 'fix my query' from 'the data just isn't there'",
      "The fix is to always set is_error: true for any query, successful or not, so Claude double-checks its work",
      "The fix is to stop returning any content when there are zero rows"
    ],
    correct: 1,
    explanation: "A syntactically valid query that legitimately returns no rows is a successful execution, not an error — Claude needs to be able to tell 'your query was malformed, try again' apart from 'the query ran fine, there's simply no matching data' (B). Treating them identically (A) removes information Claude needs to choose the right next action. Always marking success as an error (C) would make the tool_result signal meaningless. Returning no content on empty results (D) removes useful confirmation that the query ran."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An agent has a 'charge_credit_card' tool. When the card is declined, the developer's code throws an unhandled exception that propagates up and crashes the whole request, meaning Claude never receives a tool_result and the conversation silently fails.",
    question: "What is the correct way to handle this in the tool-execution code?",
    options: [
      "Catch the decline as an exception in the harness, and return a tool_result with is_error: true and a clear message (e.g. 'Card declined: insufficient funds') so Claude can inform the user and suggest next steps, rather than letting it crash the request",
      "Let it crash — payment failures should always halt the entire application for safety",
      "Catch the exception but return is_error: false with an empty content string so the conversation can continue without confusing Claude",
      "Retry the exact same charge automatically without limit until it succeeds"
    ],
    correct: 0,
    explanation: "Every tool invocation — including failures — should resolve to a tool_result Claude can act on; catching the error and reporting it clearly with is_error: true (A) keeps the conversation alive and lets Claude respond appropriately. Crashing the whole request (B) is an availability failure caused by unhandled errors, not a safety feature. Masking the failure as a non-error with empty content (C) misleads Claude. Unlimited automatic retries of a declined charge (D) is both unsafe and likely to keep failing for the same reason."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer wants Claude to be able to distinguish between 'the tool itself is broken' (e.g. network unreachable) and 'the input was invalid' (e.g. malformed date) when a tool call fails, so it can choose to retry versus ask the user for clarification.",
    question: "What is the best practice for supporting this distinction?",
    options: [
      "It's not possible — Claude cannot make this distinction from a tool_result at all",
      "Include is_error: true along with a message that specifies the error category and cause plainly (e.g. distinguishing 'invalid input: date must be in the future' from 'service temporarily unavailable, please retry'), so Claude has enough information to choose the appropriate next step",
      "Always tell Claude to retry exactly three times regardless of error type",
      "Return the raw HTTP status code with no explanatory text, since Claude already knows what every status code means in every domain"
    ],
    correct: 1,
    explanation: "A specific, descriptive error message that names the category of failure (B) gives Claude what it needs to decide between retrying, adjusting input, or asking the user. Claiming this is impossible (A) is false — this is a standard practice. A blanket fixed retry count regardless of cause (C) is wasteful for non-retryable input errors. A bare status code with no context (D) forces Claude to guess at domain-specific meaning it may not have."
  },

  // ---- Topic 4: Parallel tool call handling ----
  {
    domain: 5,
    difficulty: 3,
    scenario: "In a single assistant turn, Claude returns two tool_use blocks: one calling 'get_weather' for Paris and one calling 'get_weather' for Tokyo. The developer's harness executes them sequentially and returns each result as its own separate user-role message, one right after the other.",
    question: "What is wrong with this implementation?",
    options: [
      "Nothing is wrong — as long as both tool_result blocks eventually reach Claude, the message structure doesn't matter",
      "All tool_result blocks for a given assistant turn's tool_use blocks must be returned together in a single user message; splitting them across multiple messages breaks the expected structure and can degrade future parallel tool use",
      "The two calls should have been rejected outright since Claude is not allowed to call the same tool twice in one turn",
      "The harness should have executed them in reverse order to match some required ordering"
    ],
    correct: 1,
    explanation: "When an assistant turn contains multiple tool_use blocks, all corresponding tool_result blocks must be returned in a single subsequent user message (B) — splitting them across separate messages violates the expected shape and can train the model away from making parallel calls in the future. Message structure does matter (A is false). Calling the same tool multiple times in one turn is explicitly supported (C is false). There's no required reversed ordering (D); results should just correspond to the right tool_use_id."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer's harness receives an assistant message with three tool_use blocks: a read-only 'get_inventory' call, a 'get_shipping_rate' call, and a 'charge_customer' call, all in the same turn. The harness currently executes all three concurrently using the same generic execution path.",
    question: "What is the main risk with executing all three concurrently in this way, and what should change?",
    options: [
      "There is no risk; concurrent execution is always safe for any set of tool calls in the same turn",
      "Read-only calls like get_inventory and get_shipping_rate are safe to run concurrently, but a side-effecting, hard-to-reverse action like charge_customer should be treated differently — e.g. gated behind confirmation or executed only after read-only calls resolve — rather than blindly parallelized alongside the rest",
      "All three should be rejected because Claude is never allowed to request a side-effecting tool alongside read-only tools in the same turn",
      "The harness should randomly pick only one of the three tool calls to execute and drop the others"
    ],
    correct: 1,
    explanation: "Parallel execution is a scheduling optimization best applied to calls known to be safe to run concurrently; a destructive/irreversible action like charging a customer deserves different handling (e.g. gating, sequencing, or confirmation) regardless of whether it happened to arrive alongside read-only calls in the same model turn (B). Blanket concurrency for all tool types (A) ignores this distinction. The API doesn't forbid mixing tool types in one turn (C). Silently dropping tool calls (D) breaks the tool_use/tool_result contract and will leave Claude waiting on results that never arrive."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer implements parallel tool execution using a thread pool, but the shared 'orders' list that several tools read and write is not protected by any lock, and tool handlers mutate it directly. Under concurrent execution, results are occasionally inconsistent or corrupted.",
    question: "What is the most direct fix for this specific problem?",
    options: [
      "Disable parallel tool use entirely and force every tool call to run sequentially forever, even for tools with no shared state",
      "Add appropriate synchronization (e.g. a lock, or a thread-safe data structure) around the shared 'orders' state so concurrent tool executions don't race on it, while still allowing independent tool calls to run in parallel",
      "Ignore it — race conditions in tool execution code are the API provider's responsibility, not the harness developer's",
      "Increase max_tokens so Claude has time to serialize the calls itself"
    ],
    correct: 1,
    explanation: "The root cause is unsynchronized shared mutable state accessed from concurrent handlers; the fix is standard concurrency-safety practice — locking or thread-safe structures around the shared resource (B) — while still getting the latency benefit of parallelism for calls that don't touch it. Disabling all parallelism (A) is a blunter fix that sacrifices legitimate performance gains unnecessarily. This is squarely the harness developer's responsibility, not the API's (C is false). max_tokens (D) has nothing to do with execution-side concurrency."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer notices that when Claude issues three tool_use blocks in one turn, their harness's manual loop only implements handling for a single tool_use block per response and silently ignores the second and third.",
    question: "What is the correct fix?",
    options: [
      "Nothing needs to change — Claude never issues more than one tool_use block per turn by default",
      "Update the loop to iterate over all tool_use blocks in the response content, execute each one, and include a tool_result for every one of them in the single reply message",
      "Configure tool_choice: 'none' so Claude is forced to only ever request one tool at a time",
      "Only execute the first tool_use block and tell Claude to ask again for the others in a follow-up turn"
    ],
    correct: 1,
    explanation: "Parallel tool use is the default: Claude may include multiple tool_use blocks in one message, and the harness must handle every one of them, returning a matching tool_result for each (B). Assuming only one call per turn (A) is false and is exactly the bug described. tool_choice: 'none' (C) would disable tool use entirely, not limit it to one tool. Silently executing only the first (D) leaves the other tool_use blocks unresolved, which will produce an invalid conversation state."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer wants to prevent Claude from issuing multiple tool calls in a single turn because their downstream system cannot safely process concurrent requests at all, even sequentially within their own code.",
    question: "What is the most appropriate way to achieve this?",
    options: [
      "Manually strip all but the first tool_use block from every response before processing, silently discarding the rest",
      "Set disable_parallel_tool_use: true on the tool_choice parameter so Claude is constrained to at most one tool call per response",
      "Tell Claude in the system prompt never to call more than one tool per turn and hope it complies consistently",
      "Reduce the number of tools available to exactly one"
    ],
    correct: 1,
    explanation: "The API provides disable_parallel_tool_use on tool_choice specifically to constrain Claude to at most one tool call per response (B) — this is the documented, reliable mechanism. Silently discarding extra tool_use blocks (A) leaves them without a tool_result, corrupting conversation state. A system-prompt instruction alone (C) is far less reliable than an actual API-level constraint. Reducing to one tool (D) eliminates functionality unnecessarily when the actual goal is just capping concurrency."
  },

  // ---- Topic 5: Building an MCP server ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer is building an internal MCP server that should let any MCP-compatible client browse a company's product catalog, run predefined searches, and use canned prompt templates for common merchandising tasks.",
    question: "Which MCP primitives should the developer map these three capabilities to, respectively?",
    options: [
      "Tools for all three, since MCP only exposes one kind of primitive",
      "Resources for browsing the catalog, Tools for running searches, and Prompts for the canned templates",
      "Prompts for browsing, Resources for searches, and Tools for templates",
      "A single Tool called 'do_everything' that accepts a mode parameter"
    ],
    correct: 1,
    explanation: "MCP defines three primitives with distinct roles: Resources expose readable data/context (like browsing a catalog), Tools expose invocable actions (like running a parameterized search), and Prompts expose reusable prompt templates (like merchandising templates) — mapping each capability to the primitive it's designed for (B) is the correct architecture. MCP has more than one primitive type (A is false). The mapping in (C) mismatches primitive to capability. Collapsing everything into one generic tool (D) discards the structure MCP provides and produces exactly the kind of overloaded, ambiguous tool that's hard for a model to use correctly."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer is building an MCP server that exposes a 'delete_file' tool to any client that connects, with no way for the server operator to restrict which directories can be touched — the tool accepts an arbitrary absolute path and deletes whatever is there.",
    question: "What is the primary security concern with this MCP server design?",
    options: [
      "There is no concern, since MCP servers are only ever used by trusted internal clients",
      "The tool is far more powerful than most legitimate use cases require, and any client (or any model being driven by a client) can use it to delete arbitrary files on the host, with no scoping to a safe directory or any confirmation step",
      "MCP tools cannot accept path parameters at all, so this tool would fail schema validation",
      "The concern is only that the tool's description is too short, and lengthening it would fix the security issue"
    ],
    correct: 1,
    explanation: "An MCP server should scope powerful, destructive tools to the minimum capability needed — restricting deletable paths to a safe root, requiring confirmation, or avoiding arbitrary-path deletion entirely (B is the concern) — because any connected client (and by extension, any model driving it, including via prompt injection) can invoke it. MCP servers are regularly exposed beyond a single trusted client, so assuming inherent trust (A) is unsafe. There's no such schema restriction in MCP (C is false). A longer description (D) doesn't constrain what the tool is actually capable of doing — that's a description problem, not a permissions problem."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer is writing an MCP server in Python. They want to expose a read-only 'list_recent_orders' capability that any connected client can fetch without needing to invoke an action with side effects, similar to a GET endpoint.",
    question: "Which MCP primitive is the best fit for this capability?",
    options: [
      "A Tool, since Tools are the only primitive that supports parameters",
      "A Resource, since Resources are designed to expose readable, addressable data/context rather than invocable actions",
      "A Prompt, since Prompts are meant for any data the server wants to share",
      "None of the primitives fit; this requires a custom HTTP endpoint outside of MCP"
    ],
    correct: 1,
    explanation: "Resources are MCP's primitive for exposing read-oriented, addressable content to clients — a natural fit for 'list recent orders' (B). Tools can also accept parameters, but that's not the deciding factor here — the read-only, non-invocable nature of the capability is what points to Resources (A's reasoning is wrong even though Tools do support parameters). Prompts are for reusable prompt templates, not general data (C). MCP explicitly supports this use case via Resources, so a custom endpoint isn't necessary (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A team is building an MCP server for their internal ticketing system. They expose one enormous tool called 'ticketing_action' that takes a 'action_type' string (one of 15 possible values) and a generic 'payload' object whose shape depends entirely on which action_type was chosen.",
    question: "What is the main problem with this MCP server design, from the perspective of a client model calling it?",
    options: [
      "MCP servers are limited to exposing exactly one tool per server, so this design is actually required",
      "Collapsing 15 distinct operations into one tool with a generic payload hides the real input_schema for each operation from the model, making it much harder for the model to construct correct calls compared to exposing 15 well-scoped, clearly described tools (or fewer, logically grouped ones)",
      "The 'payload' field should be renamed to 'data' since 'payload' is a reserved MCP keyword",
      "This design is optimal because it minimizes the number of tool definitions sent to the model, which is the only thing that matters for tool-calling accuracy"
    ],
    correct: 1,
    explanation: "A single tool whose behavior and required parameters vary opaquely by an internal action_type string forces the model to guess at the correct payload shape per action, since JSON Schema can't easily express 'shape depends on this string value' — well-scoped, individually described tools (or a handful of logically grouped ones) give the model an explicit, checkable contract per operation (B). MCP servers can expose many tools (A is false). There's no reserved keyword issue (C). Minimizing tool count isn't the only or primary goal — clarity and correctness of each tool's contract matters more (D is false)."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer building an MCP server for a calendar integration wants clients to be able to discover, at connection time, what tools, resources, and prompts the server offers without hardcoding that information into every client.",
    question: "How does MCP support this kind of discovery?",
    options: [
      "It doesn't — every MCP client must be manually configured in advance with a hardcoded list of the server's tools, resources, and prompts",
      "The MCP server responds to standard discovery/listing requests (e.g. for tools, resources, and prompts) as part of the protocol, so any compliant client can enumerate the server's capabilities dynamically at connection time",
      "Discovery is only possible for Tools, never for Resources or Prompts",
      "Discovery requires a separate, non-MCP REST API to be built alongside the MCP server"
    ],
    correct: 1,
    explanation: "A core design goal of MCP is that clients can dynamically discover a server's available tools, resources, and prompts via the protocol's standard listing mechanisms, rather than needing prior hardcoded knowledge (B). This is a defining feature of MCP, so (A) is false. Discovery applies to all three primitive types, not just Tools (C is false). No separate REST API is needed for this — it's part of MCP itself (D is false)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A company is building an MCP server that exposes internal HR data. They want different users to see different subsets of resources depending on their role, but their current implementation exposes the exact same tools and resources to every connected client regardless of who authenticated.",
    question: "What is the best way to address this within an MCP server implementation?",
    options: [
      "MCP has no concept of authentication or per-user context, so this cannot be solved at the server level and must be handled entirely by the model refusing certain requests",
      "The server should use the connection's authentication/session context to determine what tools and resources are advertised and what data is returned, rather than exposing a single fixed capability set to every client",
      "Expose all data to all clients and rely on the tool descriptions to politely ask the model not to share sensitive information",
      "Split into 50 separate MCP servers, one per employee, and have each client connect to their own dedicated server"
    ],
    correct: 1,
    explanation: "An MCP server should scope what it exposes and returns based on the authenticated session/context of the connecting client, enforcing access control server-side (B) — this is standard practice for any multi-tenant server, MCP included. Claiming MCP can't support this and pushing enforcement onto the model (A) is both false and unsafe, since prompts are not a security boundary. Exposing everything and hoping descriptions self-police (C) is not a real security control. Per-user servers (D) is an absurd, unscalable non-solution to what is an authorization problem."
  },

  // ---- Topic 6: Building an MCP client ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer is writing an MCP client that connects to a third-party MCP server, retrieves its list of available tools at startup, and needs to make those tools callable by Claude via the Messages API.",
    question: "What does the client need to do to bridge the MCP server's tools into a Claude tool-use request?",
    options: [
      "Nothing — Claude can connect to arbitrary MCP servers directly with no client-side code involved",
      "Convert each MCP tool's schema into the tools array format the Messages API expects, include them in the request, and route any resulting tool_use calls back to the MCP server, returning its response as a tool_result",
      "Hardcode the MCP server's tool list once into the model's system prompt and never call the server again",
      "MCP tools cannot be used with the Claude API at all; MCP is a fully separate, incompatible protocol"
    ],
    correct: 1,
    explanation: "An MCP client acts as the bridge: it discovers the server's tools, translates their schemas into the Messages API's tools format, forwards Claude's tool_use requests to the MCP server, and returns the server's results as tool_result blocks (B). Claude itself doesn't speak MCP directly over the wire in this pattern — the client mediates (A is false, unless using a hosted MCP connector, which is a different mechanism). Hardcoding a snapshot into the system prompt (C) both loses structured tool-calling and goes stale. MCP tools are explicitly designed to be usable with the Claude API via this client-mediation pattern (D is false)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An MCP client connects to a remote server and lists its tools once at application startup. The server's tool definitions change over time (new tools added, some removed) as the backend team iterates, but the client's cached list is never refreshed.",
    question: "What problem does this design create, and what should change?",
    options: [
      "There's no problem, since MCP server tool definitions never change once a server is deployed",
      "The client's stale cache can cause it to offer tools that no longer exist (causing failed calls) or omit newly available ones; the client should periodically refresh its tool list or handle the server's change notifications, if supported, rather than caching indefinitely",
      "The fix is to have Claude re-implement the MCP server's tools itself from memory whenever the cache is stale",
      "The client should stop listing tools at all and instead let every tool call fail until the developer manually restarts the application"
    ],
    correct: 1,
    explanation: "Since server-side tool definitions can evolve, a client that caches the tool list once and never revisits it will drift out of sync — the fix is periodic refresh or listening for change notifications where the transport/protocol supports them (B). Assuming server tool sets are static (A) is false and is the root misconception behind the bug. Claude cannot fabricate a remote server's actual tool behavior from memory (C). Deliberately breaking all tool calls until a manual restart (D) is not a real fix, just a worse failure mode."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer building an MCP client wants to connect to a remote, third-party MCP server that requires authentication before exposing any tools or resources.",
    question: "What is a reasonable approach for handling this in the client?",
    options: [
      "MCP has no support for authenticated connections, so the client must bypass authentication entirely",
      "The client should support the transport-appropriate authentication mechanism (e.g. an auth token or OAuth flow for an HTTP-based server) and only proceed with capability discovery once authenticated",
      "The client should always assume the server is trusted and skip any authentication step to simplify the integration",
      "Authentication should be handled by embedding a plaintext password inside every tool call's input_schema"
    ],
    correct: 1,
    explanation: "For remote MCP servers, the client is expected to authenticate using the mechanism appropriate to the transport (e.g., bearer tokens or OAuth over HTTP) before capabilities are exposed (B). MCP servers, especially remote ones, commonly require authentication, so (A) is false. Skipping authentication (C) is an unsafe shortcut for any server holding real data or capabilities. Embedding credentials inside tool call parameters (D) exposes secrets to the model and is not how authentication should be structured — it belongs in the transport/connection layer, not in tool inputs."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An MCP client is built to connect to several different MCP servers simultaneously — one for a CRM, one for an internal wiki, and one for a ticketing system. Two of these servers happen to expose a tool with the identical name 'search'.",
    question: "What should a well-designed MCP client do to avoid ambiguity when presenting these tools to Claude?",
    options: [
      "Silently drop one of the two 'search' tools at random so there's no naming conflict",
      "Namespace or prefix tool names by their originating server (e.g. 'crm_search' and 'wiki_search') when aggregating tools from multiple servers, so Claude and the client can unambiguously route calls to the right server",
      "Merge both 'search' tools into a single tool definition automatically, assuming they behave identically",
      "Refuse to connect to more than one MCP server at a time to sidestep the issue entirely"
    ],
    correct: 1,
    explanation: "When aggregating tools from multiple MCP servers, a client should disambiguate identically-named tools (commonly via a server-derived namespace/prefix) so both Claude and the client's routing logic can tell them apart and dispatch calls correctly (B). Randomly dropping one (A) silently removes functionality. Assuming two same-named tools from different servers behave identically and merging them (C) is unsafe since their actual behavior may differ completely. Refusing multi-server connections (D) unnecessarily limits the client's usefulness for a solvable naming problem."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer's MCP client successfully calls a tool on a remote MCP server, but the server takes 45 seconds to respond due to a slow backend query, and the client has no timeout configured, so the whole agent loop hangs indefinitely if the server never responds.",
    question: "What should the client implementation include to handle this properly?",
    options: [
      "A reasonable request timeout with a resulting tool_result marking is_error: true and a message indicating the operation timed out, so Claude can decide how to proceed rather than the harness hanging forever",
      "Nothing — MCP guarantees all server responses arrive within 5 seconds, so timeouts are unnecessary",
      "The client should crash the entire application process the moment any tool call exceeds 1 second",
      "The client should silently return an empty success result if the server takes too long, without informing Claude of the delay"
    ],
    correct: 0,
    explanation: "Any client calling a remote server should apply a sensible timeout and, on expiry, surface a clear is_error tool_result so Claude can decide whether to retry, wait, or inform the user (A) — this mirrors general tool-error-handling best practice applied to the MCP client layer. MCP makes no such response-time guarantee (B is false). Crashing the whole process on any slow call (C) is far too aggressive and breaks unrelated work. Silently returning a fake success result (D) misleads Claude about what actually happened."
  },

  // ---- Topic 7: Choosing MCP transport ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer is building an MCP server that runs entirely on the same machine as the client, providing local filesystem access for a coding assistant that never needs to be reached over a network.",
    question: "Which transport is most appropriate for this scenario?",
    options: [
      "stdio, since the server and client are co-located as local processes and can communicate directly over standard input/output without any network layer",
      "HTTP/SSE, since all MCP servers should be reachable over HTTP for consistency",
      "A custom raw TCP socket protocol built from scratch, since MCP does not define any standard transports",
      "Neither transport applies; local filesystem access cannot be exposed via MCP"
    ],
    correct: 0,
    explanation: "stdio is the standard transport for local MCP servers running as a subprocess of the client — it avoids network overhead and is well suited to local, same-machine integrations like filesystem or local tool access (A). Forcing HTTP for a purely local integration (B) adds unnecessary complexity and a network dependency. MCP does define standard transports, so building a custom one from scratch is unnecessary (C). MCP explicitly supports local filesystem-style servers via stdio (D is false)."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A team is building an MCP server that exposes a shared internal knowledge base to many different users across the company, each connecting from their own machine over the internet, and the server needs to run continuously as a hosted service.",
    question: "Which transport is most appropriate here, and why?",
    options: [
      "stdio, because it is the fastest transport and speed is the only consideration",
      "HTTP/SSE, because the server needs to be reachable remotely by many independent clients over a network, which stdio (designed for a local parent/child process relationship) cannot support",
      "Either transport is equally suitable since MCP abstracts transport details away from the deployment model entirely",
      "No transport supports multiple remote clients; each user would need their own dedicated local server instance"
    ],
    correct: 1,
    explanation: "HTTP/SSE (or comparable remote transports) is designed for exactly this case: a server that must be reachable over a network by many independent, remote clients (B). stdio assumes a local parent/child process relationship and isn't designed for many remote users (A is wrong for this scenario). Transport choice does depend on deployment topology, so 'equally suitable' (C) is incorrect here. MCP does support multi-client remote access via network transports, so (D) is false."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer initially built their MCP server using stdio because it was a quick local prototype. The product has now grown to require the server to be accessed by multiple client applications running on different machines in different offices.",
    question: "What should the developer do as part of this transition?",
    options: [
      "Nothing — stdio can be exposed over the public internet with no changes as long as firewall rules are configured",
      "Migrate the server to a network-capable transport such as HTTP/SSE, since stdio is inherently tied to a local process relationship between client and server and cannot serve multiple remote clients as-is",
      "Keep stdio but have each remote office run a local copy of the client with no server behind it at all",
      "Switch entirely away from MCP, since no protocol supports both local and remote transports"
    ],
    correct: 1,
    explanation: "As requirements shift from local, single-process access to multi-office, multi-client remote access, the transport needs to change to something network-capable like HTTP/SSE — stdio isn't designed to be exposed this way (B). stdio is not simply 'exposable' over the internet by firewall configuration alone; it fundamentally assumes a local pipe between a parent and child process (A is false). Running clients with no real server (C) doesn't provide the shared backend functionality needed. MCP explicitly supports both local and remote transports, so switching away from MCP entirely (D) is an overreaction to what is a straightforward transport migration."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A solo developer is building a personal coding assistant on their own laptop. The MCP server they're writing only ever needs to talk to a client running in the same terminal session, with no other users and no remote access requirement, ever.",
    question: "Which transport choice best fits this use case, and why?",
    options: [
      "HTTP/SSE, because it is always the more 'production-grade' choice regardless of actual deployment needs",
      "stdio, because it is the simplest option for a purely local, single-user, same-machine integration and avoids the operational overhead of running and securing a network server",
      "Both are equally complex to set up, so the choice doesn't matter at all",
      "Neither — a purely local tool should not use MCP and should instead be a hardcoded function"
    ],
    correct: 1,
    explanation: "For a strictly local, single-user integration, stdio is simpler to set up and avoids the extra operational surface area (ports, auth, TLS) that a network transport introduces (B) — matching transport complexity to actual deployment needs is good practice. Defaulting to HTTP/SSE 'because it's more production-grade' regardless of fit (A) adds needless complexity. The two transports do differ meaningfully in setup and operational overhead (C is false). Using MCP even for a local integration is reasonable if the developer wants a standard, swappable tool-calling interface (D overstates the case)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer configured their MCP client to connect to a remote HTTP/SSE-based server, but forgot to add any authentication headers or TLS. In contrast, their other MCP integration uses stdio for a local subprocess and has no auth configured either.",
    question: "Which of the two setups poses the greater immediate security concern, and why?",
    options: [
      "The stdio integration, because local processes are always more dangerous than network servers",
      "The HTTP/SSE integration, because an unauthenticated, unencrypted endpoint reachable over a network can potentially be accessed or intercepted by parties other than the intended client, whereas the stdio server is only reachable by a co-located local process by design",
      "Both pose exactly the same level of risk in all circumstances, since transport choice has no bearing on security exposure",
      "Neither poses any risk, since MCP encrypts all traffic automatically regardless of transport"
    ],
    correct: 1,
    explanation: "A network-reachable HTTP/SSE server with no authentication or transport encryption is exposed to anyone who can reach that network path — a materially larger attack surface — while a stdio server's reachability is inherently constrained to the local process relationship that spawned it (B). Local processes being 'always more dangerous' (A) inverts the actual concern here. Transport choice clearly does affect exposure, so 'no bearing' (C) is false. MCP does not automatically provide encryption — that depends on how the transport is deployed (e.g., TLS for HTTP), so (D) is false."
  },

  // ---- Topic 8: Security considerations when exposing tools ----
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer exposes a 'run_shell_command' tool to Claude that executes any string it's given directly in a root shell on the production server, with no restrictions on what commands can be run.",
    question: "What is the primary security risk here, and what should be done?",
    options: [
      "There is no risk as long as the tool's description says 'use responsibly'",
      "The tool grants unrestricted, root-level command execution to whatever the model generates, which could be manipulated (e.g. via prompt injection from untrusted content) into running destructive or data-exfiltrating commands; the tool should be scoped down (e.g. an allowlist of safe commands, a non-root sandboxed environment, no destructive operations) rather than granting unrestricted shell access",
      "The risk only exists if the tool's name contains the word 'shell', so renaming it fixes the issue",
      "The risk is acceptable because Claude will never generate a harmful command on its own"
    ],
    correct: 1,
    explanation: "An unrestricted, root-level shell tool is one of the most dangerous tool designs possible — it should be scoped to the minimum necessary capability (sandboxing, allowlisting, non-root execution, blocking destructive operations) (B), especially given that tool inputs can be influenced by untrusted content the model processes (prompt injection). A description caveat (A) is not an enforcement mechanism. Renaming the tool (C) doesn't change its actual capabilities. Assuming the model will never be steered into harmful output (D) ignores the realistic threat model for tool-using agents."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer builds a customer-facing support agent with a 'refund_order' tool that can issue refunds of any amount up to $1,000,000 with a single tool call and no human review step, triggered purely by the agent's own judgment during a chat conversation.",
    question: "What security/scoping principle is being violated here?",
    options: [
      "None — giving tools maximum capability is always preferable since it makes the agent more useful",
      "The principle of least privilege: a customer support agent should only be granted the minimum capability needed for its legitimate use cases (e.g. a much lower per-refund cap, and human approval for large or unusual refunds), not open-ended authority to move large amounts of money autonomously",
      "The tool should be renamed to 'process_refund' to reduce the perceived risk",
      "The issue is only that the input_schema lacks a description for the amount field"
    ],
    correct: 1,
    explanation: "Tools with real-world financial impact should be scoped to least privilege — reasonable caps, tiered approval for large or unusual actions, and human-in-the-loop review where stakes are high (B) — rather than granting an agent unbounded autonomous authority. Maximizing capability regardless of risk (A) is the opposite of sound tool design. A rename (C) doesn't change the actual authority granted. This is a scope/authority problem, not merely a missing description (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An agent has a 'fetch_url' tool that fetches and returns the contents of any URL Claude provides, including internal-only URLs like 'http://169.254.169.254/latest/meta-data/' (a cloud metadata endpoint) and internal admin panels on the private network.",
    question: "What security concern does this tool raise, and what is a reasonable mitigation?",
    options: [
      "None — since only the model decides what URL to fetch, and the model is trustworthy, this is safe by construction",
      "This is a server-side request forgery (SSRF) risk: the tool could be used (potentially via content the model was tricked into acting on) to reach internal-only endpoints like cloud metadata services or internal admin panels; a mitigation is to block requests to internal/private IP ranges and known sensitive endpoints at the tool-execution layer",
      "The fix is simply to lengthen the tool's description to mention that internal URLs should not be fetched",
      "This is not a real risk because HTTP requests from a tool always originate from the model's own infrastructure, never the server running the tool"
    ],
    correct: 1,
    explanation: "A URL-fetching tool with no restriction on destination is a classic SSRF vector — untrusted content the model processes (e.g., a webpage instructing it to 'also fetch this internal URL') could steer it into reaching internal services; the correct mitigation is enforcing an allowlist/denylist at the execution layer, not relying on model judgment alone (B). Trusting the model to always choose safely (A) ignores the realistic threat model. A description-only fix (C) is not an enforced control. Requests actually originate from wherever the tool executes — typically the server's own network — which is exactly why SSRF is a risk (D is false)."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer building an MCP server for an internal wiki debates whether to give the 'edit_page' tool the same broad write access as a wiki administrator account, versus a scoped service account that can only edit pages in a specific namespace reserved for agent-generated content.",
    question: "Which approach better reflects sound security practice for exposing tools, and why?",
    options: [
      "The broad administrator account, because it simplifies the implementation and avoids maintaining a separate namespace",
      "The scoped service account limited to a specific namespace, because it limits the blast radius if the tool is misused or the model is manipulated into making unintended edits, without over-provisioning capability the tool doesn't need",
      "It doesn't matter, since the tool's description alone determines what pages get edited regardless of the underlying account's actual permissions",
      "The broad administrator account, because Claude will always double-check before editing sensitive pages"
    ],
    correct: 1,
    explanation: "Scoping the underlying credentials/service account to the minimum required capability (a specific namespace) limits the damage from misuse, bugs, or adversarial manipulation, independent of what the tool's description says (B) — this is a straightforward least-privilege application. Simplicity (A) is not a valid reason to over-provision a tool with write access it doesn't need. A tool's actual authorization is enforced by the underlying account's permissions, not the description text (C is false — description doesn't enforce anything). Relying on the model's own judgment as the security boundary (D) is not a reliable control."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer exposes a 'read_file' tool to Claude for a document-summarization agent, intending it to only read files within a specific '/uploads' directory. However, the implementation takes the path Claude provides and passes it directly to the filesystem read call with no validation, allowing paths like '../../etc/passwd' to succeed.",
    question: "What is the vulnerability here, and how should it be fixed?",
    options: [
      "This is a path traversal vulnerability; the tool implementation should resolve the given path to its canonical absolute form and verify it remains within the intended '/uploads' directory before reading, rejecting anything that escapes it",
      "There is no vulnerability, since the tool's description says it should only read files in /uploads and Claude will respect that",
      "The fix is to remove the path parameter from the input_schema entirely and instead have Claude describe which file it wants in a free-text field",
      "The fix is to base64-encode the path before passing it to the filesystem call, which prevents traversal"
    ],
    correct: 0,
    explanation: "Passing an untrusted, model-supplied path directly to a filesystem call without confining it to an intended root directory is a classic path traversal vulnerability; the standard fix is to canonicalize the resolved path and verify it's still within the allowed root before performing the read, rejecting anything that escapes (A). A description-only restriction (B) is not enforced and doesn't prevent the underlying code from reading arbitrary files. Removing structured input in favor of free text (C) doesn't fix the enforcement gap and makes validation harder. Base64-encoding the path (D) doesn't change what the decoded path resolves to and does not prevent traversal."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer exposes an MCP server with a 'search_internal_docs' tool over HTTP/SSE to a partner company's AI agent, and this tool has full read access to every internal document in the company, including HR records and unreleased financial results, regardless of what the partner's use case actually requires.",
    question: "What should the developer change about this tool exposure?",
    options: [
      "Nothing, since the partner company's agent is presumably well-behaved and won't ask for sensitive documents",
      "Scope the tool's access to only the subset of documents relevant to the partnership (e.g. a specific product's documentation), rather than granting blanket access to the entire internal document corpus, since any connected client can attempt to retrieve anything the tool is capable of returning",
      "Keep full access but add a description warning the model not to look at HR or financial documents",
      "Switch the transport from HTTP/SSE to stdio, since that alone would prevent access to sensitive documents"
    ],
    correct: 1,
    explanation: "When exposing a tool to an external party, its actual data access should be scoped to what that integration legitimately needs (e.g. specific document sets), because any connected client — and anything driving it, including a manipulated or buggy agent — can attempt to use whatever the tool is capable of returning (B). Trusting good behavior instead of enforcing scope (A) is not a real control. A description-level warning (C) doesn't restrict actual data access. Transport choice (D) governs how the server is reached, not what data a successfully-authenticated call can retrieve — switching transports does not fix an authorization/scoping problem."
  },

  // ---- Topic 9: Versioning and evolving tool schemas ----
  {
    domain: 5,
    difficulty: 3,
    scenario: "A 'create_invoice' tool currently has one required field, 'customer_id'. The team wants to add a new optional field, 'due_date', to support a new feature, while ensuring existing integrations that don't know about 'due_date' continue to work without changes.",
    question: "What is the safest way to make this schema change?",
    options: [
      "Add 'due_date' as an optional property (not in 'required') with a sensible default behavior when omitted, so existing callers that don't supply it are unaffected",
      "Add 'due_date' as a required property immediately, since optional fields are not supported by JSON Schema",
      "Replace 'customer_id' with 'due_date' since only one field can be required at a time",
      "Create a completely new tool schema version but keep the exact same tool name with no way to distinguish old from new behavior"
    ],
    correct: 0,
    explanation: "Adding a new field as optional, with reasonable default behavior when it's absent, is the standard non-breaking way to evolve a schema (A) — existing callers/integrations that don't know about the new field keep working. JSON Schema fully supports optional properties, so (B)'s premise is false, and making the new field required immediately would break every existing caller. There's no reason to remove the existing required field (C). Silently changing behavior under the same tool name/version with no way to distinguish old from new (D) is a versioning anti-pattern that risks confusing both integrators and the model."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A team wants to change the 'status' parameter of an existing 'update_ticket' tool from accepting free-form strings to a strict enum of exactly four values. Several existing automated integrations currently send values outside those four (e.g. legacy status strings) and would break immediately if the enum were enforced without warning.",
    question: "What is the best approach to introduce this breaking change safely?",
    options: [
      "Deploy the strict enum immediately with no communication, since breaking changes are the caller's problem to handle",
      "Introduce the change as a new tool version (e.g. a new tool name, or a clearly communicated schema version), give existing integrations a migration path and a deprecation window on the old behavior, and only retire the old behavior once callers have migrated",
      "Keep accepting any string silently forever and just ignore invalid values without telling the caller",
      "Change the enum without versioning, but rename the parameter from 'status' to 'status_v2' so it's technically a different field"
    ],
    correct: 1,
    explanation: "A breaking change like tightening an accepted-value set should go through a proper versioning/deprecation process — new tool version, migration guidance, and a window before the old behavior is retired (B) — so existing integrations aren't broken without warning. Deploying it silently (A) breaks callers with no recourse. Silently ignoring invalid values (C) hides failures rather than surfacing them, which is worse for debuggability. Renaming a parameter without any real versioning or communication (D) is a superficial change that still breaks every caller sending the old parameter name."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer removes a field called 'legacy_id' from a tool's input_schema because it's no longer used internally, without checking whether any existing prompts, few-shot examples, or client integrations still reference it.",
    question: "What risk does this removal create, and what should have been checked first?",
    options: [
      "No risk — removing unused fields from a schema is always perfectly safe with no side effects",
      "Any caller, prompt, or few-shot example that still references 'legacy_id' could now send a request that no longer matches the schema (or Claude could still attempt to include it based on stale context), so the team should have audited existing integrations and prompts before removing it, and communicated the change",
      "The only risk is a longer JSON payload, which is a performance concern, not a compatibility concern",
      "This can only be a problem if the field was of type 'array'; scalar fields can always be removed freely"
    ],
    correct: 1,
    explanation: "Removing a field is a breaking schema change: any downstream caller, cached prompt, or few-shot example that still references it can behave incorrectly, and the model may attempt to keep using it based on training/context that predates the removal — the team should audit usage and communicate/deprecate before removing (B). Assuming zero risk (A) ignores this. The concern is compatibility, not payload size (C). Field type (D) is irrelevant to whether removing it is a breaking change."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer wants to rename the 'input_schema' property 'user_email' to 'email_address' across a widely-used 'send_notification' tool because the new name is clearer, but many existing automated pipelines call this tool programmatically with the old field name.",
    question: "What is the safest way to make this rename without breaking existing callers?",
    options: [
      "Rename it immediately in a single deploy, since a rename is a cosmetic change with no real compatibility impact",
      "Support both field names temporarily (e.g. accept either 'user_email' or 'email_address', treating them as equivalent), publicize the new preferred name, and remove the old one only after a deprecation period once usage has migrated",
      "Keep the field name 'user_email' forever and never improve it, since renames are never acceptable in any tool schema",
      "Change the field name but keep the exact same tool version identifier, so callers won't notice the difference"
    ],
    correct: 1,
    explanation: "A rename is a breaking change for any caller that supplies the old key by name; the safe path is a transition period where both names are accepted and treated as equivalent, with clear communication and a deprecation timeline for the old name (B). Treating a rename as purely cosmetic (A) ignores that JSON keys are part of the contract. Never improving names (C) is overly rigid — controlled deprecation is the standard tool. Changing behavior silently under an unchanged version identifier (D) hides the change from callers who might otherwise test against it, which is the opposite of safe versioning."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A team is planning a major redesign of their 'process_order' tool that changes several required parameters, changes return formats, and is not compatible with the current version's callers in any way.",
    question: "What versioning approach best supports both old and new integrations during the transition?",
    options: [
      "Expose the new behavior under a new, distinctly named tool (e.g. 'process_order_v2' or a differently-named tool entirely) while keeping the original 'process_order' tool available and functioning as before, until callers migrate and the old tool can be deprecated",
      "Modify 'process_order' in place with the breaking changes and assume every caller will update immediately in lockstep",
      "Never make breaking changes to any tool, ever, even when the redesign is a clear improvement",
      "Silently redirect all calls to 'process_order' to the new logic without telling anyone, since the tool name staying the same means nothing changed from the caller's perspective"
    ],
    correct: 0,
    explanation: "For genuinely incompatible changes, exposing the new behavior under a distinctly identified tool while keeping the old one operational gives existing callers a stable target and new callers an explicit opt-in, with an orderly deprecation path (A). Modifying in place and assuming synchronized caller updates (B) is unrealistic and will break integrations. Refusing all breaking changes forever (C) is impractical for genuine redesigns. Silently changing behavior under the same name (D) is deceptive versioning that breaks the contract callers rely on, even though the name is unchanged."
  },

  // ---- Topic 10: Recognizing too broad/ambiguous vs well-scoped ----
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer defines a single tool called 'manage_user' with an 'operation' string parameter that can be 'create', 'update', 'delete', 'suspend', 'reset_password', or 'grant_admin', each requiring a different subset of the remaining generic parameters.",
    question: "What is the main problem with this tool's design, and what is a better alternative?",
    options: [
      "There is no problem; combining many operations into one tool with an operation switch is always preferable to having many separate tools",
      "The tool conflates several operations with very different risk profiles (e.g. 'delete' and 'grant_admin' are far more consequential than 'update') under one generic interface with parameters whose meaning shifts depending on 'operation', making both the schema harder to validate and the risk harder to gate; splitting into separate, appropriately scoped tools (possibly with different permission levels) is clearer and safer",
      "The only fix needed is to rename 'operation' to 'action_type'",
      "The tool is fine as long as its description lists all six operations in a single sentence"
    ],
    correct: 1,
    explanation: "A single mega-tool whose parameter meaning depends on an internal mode string, spanning wildly different risk levels (routine update vs. granting admin access), is a textbook example of an overly broad, ambiguous tool — schema validation can't enforce per-operation requirements well, and it's hard to apply different security gating per operation; splitting into separate, well-scoped tools fixes both problems (B). Treating this pattern as always preferable (A) is false — it's a common anti-pattern, especially for high-risk actions. A rename alone (C) doesn't address the structural issue. Listing operations in the description (D) doesn't solve the schema-validation or risk-differentiation problem."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A developer is choosing between one tool called 'get_customer_data' that returns a customer's orders, support tickets, billing history, and account settings all at once, versus four separate tools: 'get_orders', 'get_support_tickets', 'get_billing_history', and 'get_account_settings'.",
    question: "In general, when is splitting into separate, narrower tools preferable to one broad tool?",
    options: [
      "Splitting is preferable when the different data types have distinct access patterns, sensitivity levels, or are typically needed independently, since it lets Claude request only what's relevant and lets the developer apply different permissions or auditing per data type",
      "Splitting is never preferable; consolidating everything into the fewest possible tools is always the better design regardless of the data involved",
      "The choice makes no difference to Claude's ability to call the tools correctly",
      "Splitting is only useful to reduce the number of characters in the tool description"
    ],
    correct: 0,
    explanation: "Separate tools make sense when the underlying data has different sensitivity (e.g. billing vs. account settings), different access patterns, or is usually needed independently — narrower tools let the model request precisely what's relevant and let the developer apply differentiated permissions/auditing (A). Always preferring maximal consolidation regardless of these factors (B) ignores real tradeoffs; a single broad tool can also be reasonable when the data is small, always needed together, and uniformly sensitive. The choice does affect call correctness — narrower, well-scoped tools are generally easier for the model to use precisely (C is false). Character count (D) is a minor, incidental factor, not the driving concern."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A developer reviews their agent's existing 'lookup_info' tool, which has the description: 'Looks up information the user might need.' It's implemented to query five different unrelated backend systems depending on subtle cues in the free-text 'query' parameter that Claude provides.",
    question: "Which of the following best diagnoses this tool and prescribes a fix?",
    options: [
      "The tool is well-scoped because it only exposes one entry point to Claude, which minimizes the total number of tools in the tools array",
      "The tool is too broad and ambiguous: its name and description give no indication of what kinds of information it can retrieve or from where, and its behavior depends on the model correctly inferring intent from free text routed to five different systems; splitting it into separate, clearly named and described tools — one per backend system, each with its own explicit schema — would make correct usage far more likely",
      "The fix is simply to add more examples of valid queries to the free-text description, while keeping the single-tool, five-system design otherwise unchanged",
      "This is not a tool design issue at all, but purely a prompt engineering issue that should be solved entirely in the system prompt"
    ],
    correct: 1,
    explanation: "A single tool whose actual routing to five unrelated backends is inferred from vague free text is a classic overly broad, ambiguous tool — the fix is decomposing it into clearly scoped, individually described tools per backend so both the schema and the description make correct usage far more likely (B). Minimizing the tools-array count is not itself a sign of good scoping — it's outweighed here by the ambiguity it creates (A is a weak, incorrect justification). Adding more free-text examples without changing the underlying one-tool-many-systems structure (C) is a partial patch that doesn't fix the structural ambiguity. This is fundamentally a tool/schema design issue, not something a system prompt alone can reliably fix (D)."
  },
];
