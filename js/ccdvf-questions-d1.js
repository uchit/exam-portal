export const QUESTIONS_D1 = [
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is building a customer support chatbot with the Anthropic Python SDK. They call client.messages.create() with a long system prompt and a single user message, then print response.content[0].text.",
    "question": "Which field on the response object tells the developer why generation stopped?",
    "options": [
      "response.finish_reason",
      "response.stop_reason",
      "response.content[0].stop",
      "response.usage.stop_reason"
    ],
    "correct": 1,
    "explanation": "The Messages API returns a top-level stop_reason field (values like end_turn, max_tokens, tool_use, stop_sequence) that explains why the model stopped generating (B). finish_reason (A) is OpenAI's naming, not Anthropic's; there is no per-block stop flag (C); and stop_reason is not nested under usage (D), which only holds token counts."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A coding assistant app streams responses so code suggestions appear incrementally in the editor. A developer wants to know when a full text content block has finished streaming so they can run syntax highlighting on it.",
    "question": "Which streaming event signals that a content block is complete?",
    "options": [
      "message_stop",
      "content_block_delta with an empty delta",
      "content_block_stop",
      "message_delta with stop_reason set"
    ],
    "correct": 2,
    "explanation": "content_block_stop (C) is emitted once a given content block (text, tool_use, etc.) has finished streaming, which is the right moment to run per-block post-processing like syntax highlighting. message_stop (A) signals the end of the entire message, not one block. There is no such thing as a content_block_delta with an empty delta as a completion signal (B). message_delta (D) carries message-level metadata like stop_reason but arrives after all content blocks are already done, so it's too late for per-block work."
  },
  {
    "domain": 1,
    "difficulty": 1,
    "scenario": "A junior developer is setting up their first script that calls the Claude API from a local machine.",
    "question": "What is the recommended way to supply the API key to the Anthropic SDK?",
    "options": [
      "Hardcode the key as a string literal directly in the Python file",
      "Set the ANTHROPIC_API_KEY environment variable and let the SDK pick it up automatically",
      "Paste the key into a public GitHub gist for easy access from any machine",
      "Embed the key in the URL query string of every request"
    ],
    "correct": 1,
    "explanation": "Setting ANTHROPIC_API_KEY as an environment variable (B) lets the SDK's default client constructor pick it up automatically without the key ever appearing in source code. Hardcoding (A) risks the key being committed to version control, posting it publicly (C) is an obvious credential leak, and API keys are sent via a header, not a URL query string (D), which would also leak the key into logs."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A team building an internal document Q&A tool notices their .env file containing ANTHROPIC_API_KEY was accidentally committed to a public repository six months ago before anyone noticed.",
    "question": "What is the correct immediate response?",
    "options": [
      "Delete the .env file from the latest commit only, since the key is no longer visible on the main branch",
      "Rotate (revoke and reissue) the API key immediately, since it must be treated as compromised regardless of git history cleanup",
      "Change the key's associated billing email to receive alerts instead",
      "Rename the environment variable to a different name so old references stop working"
    ],
    "correct": 1,
    "explanation": "Once a secret has been pushed to a public repo, it must be treated as permanently compromised — anyone could have already scraped it via the commit history, forks, or caches, so the only safe fix is to revoke and reissue the key (B). Deleting the file from the latest commit (A) doesn't remove it from git history. Changing the billing email (C) doesn't address the leaked credential. Renaming the env var (D) has no effect on the exposed key itself, which remains valid until revoked."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A backend engineer is building the messages array for a multi-turn support conversation. So far the conversation has: user asks a question, assistant answers, user asks a follow-up. The engineer is about to send this to the API.",
    "question": "What is a hard requirement for the messages array structure?",
    "options": [
      "The array must contain an even number of messages",
      "Messages must alternate between user and assistant roles, and the array must start with a user message",
      "Every message must include a system field",
      "The assistant's messages must always be longer than the user's"
    ],
    "correct": 1,
    "explanation": "The Messages API requires roles to alternate between user and assistant, starting with a user message (B) — sending two consecutive user or assistant messages, or starting with assistant, returns a 400 error. There's no requirement for an even total count (A), since a conversation can end on either role. The system prompt is a separate top-level parameter, not a per-message field (C). There's no length constraint on assistant replies relative to user messages (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a document Q&A tool wants Claude to read a scanned PDF report and answer questions about it in the same request.",
    "question": "What is the correct way to include the PDF in the request?",
    "options": [
      "Convert the PDF to plain text using a separate OCR tool before sending anything to Claude",
      "Include a document content block with a base64-encoded PDF source in the user message, alongside the text question",
      "Paste the raw PDF file path into the text prompt and let Claude open it",
      "Split the PDF into individual page images and send only the first page"
    ],
    "correct": 1,
    "explanation": "The Messages API supports PDF input directly via a document content block containing base64-encoded PDF data placed in the user message content array alongside the question text (B). Manual OCR (A) is unnecessary extra work the API handles natively, and generally loses layout/visual information. Claude cannot open a local file path (C) — it only has access to what's included in the request payload. Sending only the first page (D) would omit content needed to answer questions about the rest of the document."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "An e-commerce assistant extracts structured product data (name, price, in_stock) from a user's free-text description and needs to feed it into a downstream inventory system as JSON.",
    "question": "What is the most reliable way to get valid, parseable JSON out of the model?",
    "options": [
      "Ask nicely in the prompt for 'JSON only, no explanation' and hope the model complies",
      "Use a tool definition with a strict input schema (or structured output configuration) so the response is constrained to match the schema",
      "Always take the first curly-brace-delimited substring from the response text",
      "Set max_tokens very low so the model has no room to add extra prose"
    ],
    "correct": 1,
    "explanation": "Defining a tool with a JSON schema (or using structured output/strict mode) constrains the model's output to match that schema reliably, which is far more robust than prompt-only instructions (B). Politely asking for 'JSON only' (A) is a reasonable secondary step but frequently gets extra prose mixed in and isn't guaranteed. Regex-style substring extraction (C) is brittle and breaks on nested braces or preamble text. Lowering max_tokens (D) risks truncating the JSON mid-object rather than eliminating prose."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A data extraction service processes thousands of invoices per hour. During a traffic spike, the service starts receiving HTTP 429 responses from the Claude API.",
    "question": "What is the correct way to handle this?",
    "options": [
      "Immediately switch to a different API key and keep sending at the same rate",
      "Stop all requests permanently and alert an on-call engineer",
      "Retry the request after waiting an amount of time based on the retry-after header (or exponential backoff), rather than retrying immediately",
      "Ignore the error and resend the exact same request in a tight loop"
    ],
    "correct": 2,
    "explanation": "A 429 means the rate limit was exceeded; the correct response is to back off — using the retry-after header when present, or exponential backoff with jitter otherwise — before retrying (C). Switching keys to sidestep limits (A) is against the intent of rate limiting and doesn't scale. Halting entirely and paging a human (B) is overkill for a routine, expected, retryable condition. Retrying immediately in a tight loop (D) worsens the problem and can extend the throttling window."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A batch content-generation pipeline needs to generate marketing copy for 50,000 product listings overnight. Latency for any individual request doesn't matter, but cost and throughput do.",
    "question": "What is the most appropriate API feature for this workload?",
    "options": [
      "The Message Batches API, which processes large volumes of requests asynchronously at a reduced price",
      "Streaming responses for every request to reduce perceived latency",
      "Firing all 50,000 requests concurrently against the standard synchronous endpoint",
      "Using the smallest possible max_tokens for every request to speed things up"
    ],
    "correct": 0,
    "explanation": "The Message Batches API is purpose-built for large, non-latency-sensitive workloads: it accepts many requests at once, processes them asynchronously, and bills at a reduced rate compared to the standard endpoint (A). Streaming (B) only helps perceived latency for interactive use cases and doesn't matter when nothing is being watched live. Firing 50,000 concurrent synchronous requests (C) would hit rate limits almost immediately and is not how the API is designed to absorb bulk volume. Shrinking max_tokens (D) risks truncating the generated copy and doesn't address throughput or cost the way batching does."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is deploying a Claude-powered feature to production for the first time and wants to be able to debug issues after the fact without re-running requests.",
    "question": "What should they do as part of deployment?",
    "options": [
      "Log request parameters, response metadata (like stop_reason and token usage), and request IDs for observability, while avoiding logging sensitive user content in plaintext",
      "Rely solely on the Anthropic Console's own dashboards and add no application-side logging",
      "Only log errors, since successful requests never need to be inspected",
      "Print full request and response bodies to stdout in production with no redaction"
    ],
    "correct": 0,
    "explanation": "Good production observability means capturing enough metadata (parameters, stop_reason, token usage, request IDs) to debug issues after the fact, while being careful not to log sensitive content in plaintext for privacy/compliance reasons (A). Relying only on the Console (B) gives account-level visibility but not application-specific context tied to your own request flow. Logging only errors (C) misses the baseline data needed to diagnose subtle quality or cost regressions in successful calls. Dumping full unredacted bodies to stdout (D) creates a data exposure risk, especially if logs aren't access-controlled."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A research tool maintains long, multi-day conversations with a single user, persisting the messages array in a database between sessions. Over weeks, some conversations grow to hundreds of turns and start approaching the context window limit.",
    "question": "What is the best long-term strategy for managing this growth?",
    "options": [
      "Let the conversation grow indefinitely and simply increase max_tokens whenever an error occurs",
      "Truncate the conversation by deleting the oldest messages with no other handling",
      "Periodically summarize or compact older turns into a condensed representation and replace them in the stored history, preserving recent context in full",
      "Start a brand new conversation from scratch every time the context window is approached, discarding all prior history"
    ],
    "correct": 2,
    "explanation": "Summarizing or compacting older turns into a condensed form while keeping recent turns intact lets the conversation continue indefinitely without losing important context or blowing past the context window (C). Increasing max_tokens (A) controls output length, not input context size, and doesn't solve growing input. Blind truncation of oldest messages (B) can silently drop information the user still expects Claude to remember, like earlier decisions or facts. Discarding everything and starting over (D) destroys continuity entirely, which defeats the purpose of a long-running research assistant."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a simple chat UI displays each new user message and assistant reply as separate chat bubbles in the order they occur.",
    "question": "What is the most direct way to build the messages array sent to the API from this conversation history?",
    "options": [
      "Send only the newest user message; the API remembers earlier turns automatically",
      "Build a list of {role, content} objects in chronological order, mapping each chat bubble to a user or assistant message",
      "Concatenate the entire conversation into one long string and send it as a single user message",
      "Send the assistant's replies through a separate API endpoint from the user's messages"
    ],
    "correct": 1,
    "explanation": "The Messages API is stateless — the caller must resend the full conversation as an ordered list of role-tagged message objects each time (B). Sending only the newest message (A) is wrong because the API has no memory between calls. Flattening everything into a single string (C) loses the role structure and produces worse, less controllable results. There aren't separate endpoints for user versus assistant messages (D) — they're part of one array in one request."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A voice assistant backend converts speech to text, sends it to Claude, then converts the text response to speech. The product team wants the user to start hearing a response as quickly as possible after they finish speaking.",
    "question": "What API approach best supports this goal?",
    "options": [
      "Use the standard non-streaming request and wait for the full response before starting text-to-speech",
      "Use streaming, and begin feeding accumulated text to the text-to-speech engine sentence-by-sentence as text_delta events arrive",
      "Reduce max_tokens to make the whole response generate faster",
      "Pre-generate a fixed set of canned responses to avoid calling the API at all"
    ],
    "correct": 1,
    "explanation": "Streaming lets the application start converting text to speech as soon as enough text has arrived to form a sentence, rather than waiting for the entire response, directly reducing perceived latency (B). Waiting for the full non-streaming response (A) introduces a delay proportional to the entire output length. Lowering max_tokens (C) caps response length but doesn't change when the first usable text becomes available relative to streaming. Canned responses (D) abandon the dynamic, conversational nature of the assistant entirely and isn't a real fix to the latency problem."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a coding assistant wants to let Claude execute a lookup_documentation tool. They define the tool with a JSON schema and send a request with tool_choice left at its default.",
    "question": "What happens by default when the model decides a tool call is warranted?",
    "options": [
      "Claude refuses to use tools unless tool_choice is explicitly set to 'any'",
      "The response contains a tool_use content block with the tool name and input; the application must execute the tool and send the result back in a follow-up request",
      "The API executes the tool automatically on Anthropic's servers and returns the tool's output as if it were Claude's own text",
      "Claude appends a plain-text description of what it would have called, without a structured content block"
    ],
    "correct": 1,
    "explanation": "For user-defined (client-side) tools, Claude's decision to use a tool surfaces as a structured tool_use content block containing the tool name and input; it's the application's responsibility to execute the tool and return the result as a tool_result in the next request (B). The default tool_choice is 'auto', which already allows Claude to decide to call a tool without needing 'any' (A). User-defined tools are not executed server-side — that only applies to specific server-side tools like web search (C). The tool call is returned as structured JSON, not vague prose (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A backend engineer wraps Claude API calls inside a Flask endpoint. During testing, a malformed request (missing the required max_tokens parameter) is sent, and the code crashes with an unhandled exception, returning a raw 500 error with a stack trace to the client.",
    "question": "What is the best fix?",
    "options": [
      "Wrap the API call in a try/except that catches the SDK's typed exceptions (e.g. a bad-request exception) and returns a clean, appropriate error response to the caller",
      "Add a global try/except Exception that silently swallows all errors and always returns a 200 status",
      "Increase the request timeout so the malformed request has more time to succeed",
      "Retry the malformed request several times before giving up"
    ],
    "correct": 0,
    "explanation": "Catching the SDK's typed exceptions (like a 400-level bad request error) lets the application distinguish this from other failure types and return an appropriate, non-crashing response rather than leaking a stack trace (A). Silently swallowing all errors and always returning 200 (B) hides real failures from the caller and makes debugging much harder. A missing required parameter is a client-side request problem that a longer timeout (C) cannot fix. Retrying (D) is pointless here since a malformed request will fail identically every time until the parameter is fixed."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is comparing how to authenticate requests when calling the Claude API from a server-side Node.js application versus from client-side JavaScript running in a user's browser.",
    "question": "What is the correct security practice here?",
    "options": [
      "The API key can safely be embedded in client-side JavaScript since browsers sandbox it from other websites",
      "API calls should be made from a backend server that holds the API key; the browser should never have direct access to the key",
      "Client-side code should fetch the API key from a public CDN at runtime",
      "It doesn't matter where the key lives as long as HTTPS is used for the request"
    ],
    "correct": 1,
    "explanation": "API keys must stay server-side; the browser should call your own backend, which then calls the Claude API using a securely stored key, so the key is never exposed to end users (B). Browser sandboxing (A) does not hide network requests or bundled JavaScript source from a curious user — anyone can inspect page source or network calls and extract an embedded key. Fetching a key from a public CDN (C) exposes it to anyone. HTTPS (D) protects data in transit but does nothing to prevent a key embedded in client code from being read directly out of that code."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A production customer support bot occasionally returns a stop_reason of max_tokens mid-sentence, producing visibly truncated responses that confuse users. The team wants a systematic fix rather than a one-off patch.",
    "question": "What is the best combination of fixes?",
    "options": [
      "Silently append '...' to any truncated response and ship it as-is",
      "Ignore the issue since max_tokens truncation is rare and not worth engineering effort",
      "Increase max_tokens to a value with enough headroom for expected response lengths, and add logic to detect stop_reason == 'max_tokens' so the app can retry with more room or inform the user rather than silently truncating",
      "Switch entirely to a smaller model so responses are naturally shorter"
    ],
    "correct": 2,
    "explanation": "The systematic fix is twofold: size max_tokens with realistic headroom for the task, and explicitly check for stop_reason == 'max_tokens' in code so truncation is handled deliberately — either by continuing generation or communicating the limitation — rather than shipping a silently cut-off response (C). Cosmetically appending '...' (A) masks the symptom without addressing why the cutoff happened or giving the user real information. Ignoring it (B) leaves a confusing user-facing bug in production. Switching to a smaller model (D) doesn't guarantee shorter output and doesn't address requests that genuinely need a longer answer."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An internal tooling team builds a Slack bot backed by Claude. Slack requires webhook responses within 3 seconds, but generating a full Claude response can take much longer.",
    "question": "What is the best architectural approach?",
    "options": [
      "Acknowledge the Slack event immediately, then process the Claude request asynchronously (e.g. in a background worker or queue) and post the result back via a separate API call once ready",
      "Reduce max_tokens until every response reliably finishes within 3 seconds",
      "Block the Slack webhook handler until Claude responds, regardless of how long it takes",
      "Have the user manually refresh the Slack channel to check if a response has appeared"
    ],
    "correct": 0,
    "explanation": "The standard pattern for slow, long-running work behind a webhook with a strict response deadline is to acknowledge immediately and do the actual work asynchronously, posting the result back later through a separate call (A). Aggressively shrinking max_tokens (B) degrades response quality and still isn't a reliable guarantee of hitting 3 seconds for all queries. Blocking the handler (C) will routinely violate Slack's timeout and cause visible failures. Making the user manually refresh (D) is not a real engineering solution and provides a poor experience."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A legal document analysis service sends a 40-page contract as a PDF along with a question. The response comes back with stop_reason: 'max_tokens' after only two sentences of what should be a long, detailed answer.",
    "question": "What is most likely happening and what should the developer check first?",
    "options": [
      "The PDF was corrupted; the developer should re-upload it",
      "The requested max_tokens value is too low for the expected answer length and should be increased",
      "The model refused to answer due to safety concerns",
      "The API silently truncates any document over 10 pages"
    ],
    "correct": 1,
    "explanation": "A stop_reason of max_tokens means generation was cut off because the output token budget was exhausted, not because of a document or content problem — the fix is to raise max_tokens to accommodate a longer expected answer (B). A corrupted PDF (A) would typically cause a different error, not a token-limit stop reason. A safety refusal would surface as stop_reason: 'refusal', not max_tokens (C). The API does not silently truncate documents at a fixed page count — the document limits are much higher, and this symptom specifically points to the output token budget (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer is streaming a response and wants to accumulate the full text as it arrives so they can save the complete message to a database once the stream finishes.",
    "question": "Which stream event(s) should the code use to accumulate the text?",
    "options": [
      "Concatenate the text field from every content_block_delta event where delta.type is 'text_delta'",
      "Wait for the message_stop event and read the full text from it directly",
      "Only use the message_start event, since it contains the entire final message",
      "Poll a separate endpoint after the stream ends to fetch the full text"
    ],
    "correct": 0,
    "explanation": "In server-sent event streaming, the actual text arrives incrementally in content_block_delta events whose delta.type is text_delta; concatenating those chunks in order reconstructs the full text (A). message_stop (B) signals the end of the stream but doesn't carry the accumulated text itself — most SDKs provide a helper to accumulate this, but under the raw event model it's built from the deltas. message_start (C) only carries initial message metadata like id and role, not the content. There is no separate endpoint to re-fetch a streamed response after the fact (D) — the client must capture it during streaming."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a chat interface implements a 'stop generating' button. When clicked, the frontend closes the streaming connection. The team notices that on the backend, the Claude API call keeps running (and being billed) even after the user clicks stop.",
    "question": "What is the correct fix?",
    "options": [
      "This is expected and unavoidable; nothing can be done once a stream has started",
      "The backend should explicitly cancel or abort the in-flight API request/stream (e.g. using the SDK's cancellation support or closing the underlying connection) when it receives the stop signal from the frontend, rather than merely dropping the frontend connection",
      "Instruct users not to click stop unless absolutely necessary",
      "Set a very low max_tokens on every request so generation naturally finishes quickly"
    ],
    "correct": 1,
    "explanation": "Closing the frontend's view of the stream doesn't stop the backend's underlying API call; the backend needs to actively cancel/abort that request (most SDKs expose a way to do this, such as aborting the HTTP request or using a cancellation token) so generation actually stops and further billing is avoided (B). Claiming nothing can be done (A) is incorrect — proper cancellation handling exists precisely for this use case. Telling users not to click stop (C) doesn't fix a real bug in the interruption flow. Uniformly capping max_tokens low (D) hurts response quality for all requests and doesn't provide responsive cancellation for a specific user action."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a research tool wants Claude to analyze a chart image the user uploads (a PNG screenshot).",
    "question": "How should the image be included in the request?",
    "options": [
      "As an image content block with base64-encoded data (or a URL source) in the user message, alongside any accompanying text",
      "Images cannot be sent to Claude; only plain text is supported",
      "By embedding a markdown image link like ![chart](path) inside the text content",
      "By first converting the image to a textual description using a separate service, since Claude cannot interpret images itself"
    ],
    "correct": 0,
    "explanation": "Claude supports vision — images are included as a distinct image content block (base64 data or a URL source) inside the user message's content array (A). Claude does support multimodal image input directly, so (B) is false. A markdown link (C) is just inert text to the model; it doesn't actually transmit image bytes or trigger image understanding. Since Claude can interpret images natively, pre-converting via a separate captioning service (D) is unnecessary extra complexity and typically loses detail compared to direct image analysis."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "An e-commerce assistant calls Claude for each incoming customer chat message independently, re-sending the entire product catalog description (a large block of static text) as part of the system prompt on every single request, even though that text never changes between requests in the same conversation.",
    "question": "What is the most effective cost optimization for this pattern?",
    "options": [
      "Switch to a smaller model to offset the repeated token cost",
      "Use prompt caching by marking the static catalog text with a cache control breakpoint, so repeated requests reuse the cached prefix at a reduced token cost instead of reprocessing it fresh every time",
      "Remove the catalog description entirely from the prompt to save tokens",
      "Send the catalog description only on the first message of the day and hope Claude remembers it for later conversations"
    ],
    "correct": 1,
    "explanation": "Prompt caching is designed exactly for this pattern: static, repeated content marked with a cache breakpoint is cached and billed at a much lower rate on subsequent requests that share the same prefix, cutting cost without losing the catalog context (B). Switching models (A) doesn't address the redundant reprocessing of the same static content. Removing the catalog entirely (C) would degrade the assistant's ability to answer product questions accurately. Claude has no persistent memory across separate API calls, so omitting it after the first message (D) would mean later turns silently lose that context — the API is stateless between requests."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a data extraction service for scanned receipts wants Claude to output a JSON object with fields like merchant, total, and date for downstream ingestion into a database.",
    "question": "Besides using structured outputs or a well-defined tool schema, what is a good defensive practice on the application side?",
    "options": [
      "Skip validation entirely, since the model's schema guarantee makes it unnecessary",
      "Still validate and parse the returned JSON with a schema/type validator before writing it to the database, treating the model output as untrusted input like any other external data",
      "Store the raw response text directly in the database without parsing it at all",
      "Reject any response that isn't exactly 100 characters long"
    ],
    "correct": 1,
    "explanation": "Even with schema-constrained output, defensive engineering practice treats any external system's output — including an LLM's — as data to validate before it flows into critical systems like a database, catching edge cases such as unexpected nulls or type mismatches (B). Skipping validation (A) removes a cheap safety net for a low-cost check. Storing raw unparsed text (C) defeats the purpose of structured extraction, since downstream systems expect typed fields. An arbitrary length check like exactly 100 characters (D) has no relationship to correctness and would reject valid varying-length JSON."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer wants their retry logic to back off increasingly between attempts when the Claude API returns transient errors like 429 or 529, rather than retrying at a fixed interval.",
    "question": "What retry strategy best fits this need?",
    "options": [
      "Retry immediately with no delay between attempts, as many times as needed",
      "Exponential backoff with jitter — increasing the wait time between each retry (e.g. doubling) and adding a small random offset to avoid synchronized retry storms",
      "A fixed 1-second delay between every retry attempt, regardless of how many retries have occurred",
      "Retry only once, then give up permanently regardless of the error"
    ],
    "correct": 1,
    "explanation": "Exponential backoff with jitter increases wait time between attempts and randomizes it slightly, which reduces load on the recovering service and avoids many clients retrying in lockstep (B). Retrying with no delay (A) piles more load onto an already-struggling or rate-limited service and often worsens the situation. A fixed delay (C) doesn't adapt to sustained outages and can either retry too aggressively early on or too slowly once the issue has cleared. Giving up after one retry (D) may abandon requests that would have succeeded with a bit more patience for a transient blip."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer sends a request with a system prompt and a single user message but forgets to include the required max_tokens parameter.",
    "question": "What should the developer expect from the API?",
    "options": [
      "The API silently defaults max_tokens to 4096 and proceeds normally",
      "The API returns an HTTP 400 error, since max_tokens is a required parameter",
      "The API returns an HTTP 200 with an empty response body",
      "The request succeeds but billing is doubled as a penalty"
    ],
    "correct": 1,
    "explanation": "max_tokens is a required parameter on the Messages API; omitting it results in an HTTP 400 invalid_request_error rather than a silent default (B). There is no automatic silent default applied when the parameter is missing (A). A malformed request like this does not return a successful 200 with an empty body (C). There is no such billing penalty mechanism for malformed requests (D) — invalid requests that error out aren't billed for generation at all."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A team is building a coding assistant that needs to call a run_tests tool, get the results, then decide whether to call an apply_fix tool based on those results, potentially looping several times before finishing.",
    "question": "What is the correct way to structure this in code?",
    "options": [
      "Send a single request with all tools included and expect the entire multi-step process to complete in one API call automatically",
      "Run a loop: after each response, check for tool_use blocks, execute the corresponding tools, append both the assistant's tool_use content and a user message with tool_result blocks to the messages array, then call the API again — repeating until stop_reason is no longer tool_use",
      "Make separate, disconnected API calls for each tool with no shared conversation history between them",
      "Use only the streaming API, since tool use does not work with streaming"
    ],
    "correct": 1,
    "explanation": "Multi-step tool use requires an agentic loop: execute whatever tools Claude requests, feed the results back into the growing messages array as tool_result blocks, and keep calling the API until Claude stops requesting more tools (B). A single API call does not autonomously execute tools and loop on Anthropic's infrastructure for user-defined tools (A) — the client must drive that loop. Disconnected calls with no shared history (C) would cause Claude to lose all context between tool invocations, making a coherent multi-step task impossible. Tool use is fully compatible with streaming (D), so that claim is false."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal analytics tool wants Claude to query a company's read-only PostgreSQL database to answer natural-language questions, then summarize the results.",
    "question": "What is the safest architecture for this?",
    "options": [
      "Give Claude a raw SQL execution tool with full write access to the production database so it can query anything freely",
      "Give Claude a narrowly scoped tool (e.g. run_readonly_query) that executes only against a restricted, read-only replica or view, with the application enforcing query limits and access controls before execution",
      "Have Claude generate SQL as plain text in its response and let the frontend execute it directly against production with no review",
      "Skip tool use entirely and have engineers manually run any query Claude suggests"
    ],
    "correct": 1,
    "explanation": "The safest pattern is a narrowly scoped, read-only tool with the application enforcing access controls, query limits, and (ideally) a restricted replica, so Claude's tool calls can't cause damage even if the generated query is unexpected (B). Granting full write access to production (A) creates serious risk of data modification or deletion from either a bug or unexpected model behavior. Letting the frontend blindly execute model-generated SQL against production (C) is a textbook injection and safety risk. Requiring a human to manually run every query (D) defeats the purpose of building an automated tool and doesn't scale."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A content generation pipeline runs thousands of independent, non-urgent summarization jobs each night and currently sends them one at a time to the standard synchronous endpoint, taking hours to finish.",
    "question": "What change would most improve throughput?",
    "options": [
      "Switch to the Message Batches API to submit all jobs together and let them process asynchronously at scale",
      "Reduce the system prompt length by a few tokens",
      "Increase the client's HTTP read timeout to a very high value",
      "Add a 5-second sleep between each request to be polite to the API"
    ],
    "correct": 0,
    "explanation": "For large volumes of independent, non-urgent requests, the Message Batches API is built to accept and process many requests concurrently and asynchronously, dramatically improving throughput compared to serial synchronous calls (A). Trimming a few tokens from the system prompt (B) has negligible effect on overall pipeline throughput. Raising the timeout (C) only prevents premature client-side failures on slow individual calls — it does nothing to parallelize the workload. Adding a sleep between requests (D) would make total processing time even worse, not better."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer wants to make sure the exact same input never gets billed and reprocessed twice if their retry logic accidentally sends a duplicate request due to a network blip.",
    "question": "What API mechanism directly helps prevent duplicate processing from client-side retries?",
    "options": [
      "Passing an idempotency key header, so retried requests with the same key are recognized as duplicates and matched to the original result instead of processed again",
      "Lowering max_tokens on retries",
      "Always waiting exactly 60 seconds before any retry",
      "Sending retries to a different, secondary API key"
    ],
    "correct": 0,
    "explanation": "An idempotency key lets the client mark a request as logically 'the same operation' across retries, so if the original attempt actually succeeded server-side but the response was lost due to a network issue, retrying with the same key avoids reprocessing and returns the original result (A). Lowering max_tokens (B) has no bearing on duplicate detection. A fixed wait time (C) affects retry timing but not deduplication. Switching API keys (D) doesn't help match up a retried request with a prior attempt — if anything it obscures billing history for that logical request."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A production coding assistant handles requests from thousands of users. During a traffic surge, the team observes intermittent HTTP 529 'overloaded' errors from the API, and their naive retry logic retries all 529s at a fixed 100ms delay, which seems to make the surge worse rather than better.",
    "question": "What should the team change?",
    "options": [
      "Stop retrying 529 errors altogether and just show users an error",
      "Retry 529s with exponential backoff (and jitter), and consider adding client-side request queuing or shedding to reduce the burst of simultaneous retries hitting the API at once",
      "Retry 529s exactly as fast as possible to 'win the race' before other clients",
      "Switch every request to use the Batches API immediately, regardless of latency requirements"
    ],
    "correct": 1,
    "explanation": "A fixed, aggressive fixed-delay retry policy on 529s effectively creates synchronized retry storms that pile more load onto an already-overloaded service; the fix is exponential backoff with jitter plus, ideally, load-shedding or queuing on the client side to smooth out bursts (B). Refusing to retry at all (A) throws away legitimately transient errors that would succeed shortly after. Retrying as fast as possible (C) is the exact anti-pattern causing the problem to compound. Switching everything to the asynchronous Batches API (D) ignores the fact that this is a latency-sensitive interactive coding assistant, where users expect near-real-time responses."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants messages to render in the correct order even when a user sends several messages in quick succession before the assistant has replied to the first one.",
    "question": "What is the most robust approach?",
    "options": [
      "Queue user messages client-side and process them sequentially — waiting for (or explicitly handling) each assistant response before sending the next user turn as part of a coherent message history",
      "Fire all queued user messages as separate, simultaneous API calls and merge whichever responses come back first",
      "Only allow the user to send one message per session, ever",
      "Randomize the display order of messages to avoid confusion"
    ],
    "correct": 0,
    "explanation": "Since the Messages API expects an alternating, ordered conversation, the safest approach is to serialize rapid-fire user input into a single coherent, ordered message history rather than racing concurrent independent calls that could interleave unpredictably (A). Firing simultaneous separate calls for rapid messages (B) breaks the alternating-role structure and risks producing responses that don't build on each other or arrive out of order. Limiting users to one message ever (C) is not a real solution to ordering. Randomizing display order (D) actively makes the experience worse and has nothing to do with correct conversation structure."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a document Q&A tool wants to cache a large static reference document (200 pages) across many different users asking different one-off questions about it, to reduce cost and latency.",
    "question": "How should the request be structured to take advantage of prompt caching?",
    "options": [
      "Place the large static document early in the prompt (e.g. in the system prompt or the start of the user content) with a cache_control breakpoint, and put the varying per-user question after it",
      "Put the user's varying question first, followed by the static document",
      "Cache_control only works on the model's response, not on the request content",
      "Alternate the document and question content block by block to spread out the caching benefit"
    ],
    "correct": 0,
    "explanation": "Prompt caching works on a prefix basis: stable, repeated content should be placed early and marked with a cache_control breakpoint, with variable content (the differing question) placed after it, so the cached prefix can be reused across many requests (A). Putting the varying question first (B) would mean the 'prefix' differs on every request, defeating caching since nothing stable precedes it. cache_control is applied to request content blocks, not the response (C) — that's a misunderstanding of the feature. Interleaving static and varying content block by block (D) breaks the shared stable prefix that caching relies on."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer notices their non-streaming API call to generate a 20,000-token blog post is taking a very long time and occasionally times out at the HTTP client level.",
    "question": "What is the recommended fix?",
    "options": [
      "Switch to streaming for this large-output request, since large max_tokens values risk exceeding non-streaming HTTP timeouts",
      "Increase max_tokens further so the model finishes in fewer separate calls",
      "Retry the exact same non-streaming request until it happens to complete before the timeout",
      "Switch to a different model with a smaller context window"
    ],
    "correct": 0,
    "explanation": "For requests with large expected output, streaming is recommended because it avoids the long wait for a single complete non-streaming response, which is the actual source of the timeout risk for big generations (A). Increasing max_tokens further (B) makes the non-streaming wait even longer, worsening the problem. Blindly retrying the same non-streaming call (C) doesn't change the underlying timing behavior and may repeatedly hit the same timeout. Switching to a smaller-context-window model (D) doesn't address output generation time or timeout risk, and could actually be irrelevant to the issue since context window and output timing are different concerns."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A support bot developer wants to persist each user's conversation so that if the user closes the browser tab and returns the next day, the assistant remembers the prior discussion.",
    "question": "What is the correct approach?",
    "options": [
      "Nothing needs to be done — Claude automatically remembers all past conversations by user identity",
      "Store the messages array in a database keyed by user/session ID, and reload and resend it as the conversation history on the next API call when the user returns",
      "Rely on the user's browser cookies to make Claude remember the conversation server-side",
      "Ask the user to manually paste their previous conversation transcript back in"
    ],
    "correct": 1,
    "explanation": "Since the API is stateless, persistence across sessions must be implemented at the application layer: store the messages array (e.g. in a database) associated with the user, and reload it to resend as conversation history on subsequent calls (B). Claude has no built-in cross-session memory of a given user's past conversations (A) — that would need to be built by the application. Browser cookies affect only the client, not what the model 'remembers' server-side, since the API itself is stateless regardless of cookies (C). Requiring the user to manually paste in history (D) is an inferior, avoidable user experience compared to automatic server-side persistence."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A team deploys an internal tool that calls Claude to summarize incident reports. A week after launch, they realize they have no way to tell how many API calls were made, what the average latency was, or which requests failed, because nothing was instrumented.",
    "question": "What should have been added at deployment time?",
    "options": [
      "Nothing — the Anthropic Console provides all necessary per-application metrics automatically without integration",
      "Application-level metrics and logging (e.g. request count, latency, error rate, token usage per call) sent to the team's own observability stack (dashboards, alerts, tracing)",
      "A manual daily headcount of Slack messages mentioning the tool",
      "A cron job that re-sends the same test prompt once a week to see if the API is reachable"
    ],
    "correct": 1,
    "explanation": "Proper production monitoring requires the application itself to emit structured metrics and logs (latency, error rate, token usage, request volume) into an observability stack with dashboards and alerting, since this is application-specific behavior the Console alone won't capture (B). The Anthropic Console shows account-level usage but not necessarily fine-grained, feature-specific metrics tied to this particular tool's behavior and errors (A). Manually counting Slack mentions (C) is not a scalable or reliable monitoring signal. A weekly reachability check (D) is a weak health check that misses latency, error rate, and usage trends entirely."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants to distinguish, in the UI, between a response that ended naturally and one that was cut off because the model hit a custom stop sequence they configured (e.g. '\\n\\nUser:').",
    "question": "How can the code tell these two cases apart?",
    "options": [
      "By checking stop_reason: 'end_turn' means natural completion, while 'stop_sequence' means it was halted by a configured stop sequence",
      "By measuring the response length — longer responses always mean natural completion",
      "There is no way to distinguish these; both cases look identical in the API response",
      "By checking whether the response contains any punctuation at the end"
    ],
    "correct": 0,
    "explanation": "The stop_reason field distinguishes these cases directly: end_turn indicates the model naturally finished, while stop_sequence indicates generation was halted because one of the configured stop_sequences was produced (A). Response length (B) is not a reliable indicator of which stopping condition occurred. The API does expose this distinction explicitly via stop_reason, so claiming no way to tell (C) is incorrect. Checking for trailing punctuation (D) is an unreliable heuristic with no defined relationship to why generation stopped."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer wants their coding assistant backend to work whether the app is deployed by another engineer's laptop, a CI pipeline, or a production Kubernetes pod, without ever changing application code.",
    "question": "What is the best practice for supplying credentials across these different environments?",
    "options": [
      "Maintain one hardcoded key in the source and swap it out manually before each deploy",
      "Read the API key from an environment variable (or a secrets manager integrated with the deployment platform) so each environment supplies its own credential without code changes",
      "Ask each developer to email the key to each other whenever it's needed",
      "Store the key in a world-readable configuration file checked into the repository"
    ],
    "correct": 1,
    "explanation": "Reading credentials from environment variables (or a secrets manager) keeps the application code portable across environments, since each deployment target injects its own credential value without any code change (B). Manually swapping a hardcoded key before each deploy (A) is error-prone and doesn't scale, and risks accidental commits of real keys. Emailing keys around (C) is an insecure, unauditable distribution method. Committing a key into a world-readable config file in the repo (D) exposes it to anyone with repository access, and to the internet if the repo is public."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer is building a research tool that must cite specific passages from a large uploaded document when answering questions, so users can verify claims against the source.",
    "question": "What API feature best supports this requirement?",
    "options": [
      "Manually asking the model in the prompt to 'quote the source' with no other configuration",
      "The citations feature on document content blocks, which returns structured citation data (like page or character locations) tied to specific claims in the response",
      "Splitting the document into 1-page chunks and hoping the model references the right one",
      "There is no way to get source attribution from the API"
    ],
    "correct": 1,
    "explanation": "Enabling citations on document content blocks causes the API to return responses with structured citation metadata linking specific claims back to locations in the source document, which is exactly the verifiability requirement described (B). Simply asking in the prompt (A) can work as a soft nudge but doesn't provide the structured, reliable location data that the citations feature gives natively. Manually chunking by page (C) is a workaround that doesn't provide structured citation metadata and adds engineering complexity without solving the core need. The API does support this via the citations feature, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants tool calls that fail (e.g. an inventory lookup that times out) to be communicated back to Claude so it can gracefully tell the user or try an alternative approach, rather than crashing the conversation.",
    "question": "What is the correct way to report a failed tool execution back to the model?",
    "options": [
      "Silently omit the tool_result for that call and move on to the next user turn",
      "Send a tool_result block with is_error set to true and a descriptive error message in the content, so Claude can see the failure and respond appropriately",
      "Throw an exception in the application that terminates the conversation entirely",
      "Send a tool_result block with a fabricated successful-looking result instead of the real error"
    ],
    "correct": 1,
    "explanation": "The API supports representing a failed tool call through a tool_result with is_error: true and a descriptive message, letting Claude see that the call failed and react accordingly, such as informing the user or trying a different approach (B). Omitting the tool_result entirely (A) violates the requirement that every tool_use must be matched by a corresponding tool_result and can break the conversation structure. Terminating the conversation on a tool failure (C) is a poor user experience for a recoverable, common situation. Fabricating a fake success (D) actively misleads the model into reasoning from false information, which could produce confidently wrong responses to the user."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool wants to reduce the chance of unbounded cost from a single runaway conversation, where a user keeps the chat going for hours and the messages array (and therefore the input token count per request) keeps growing.",
    "question": "What is a reasonable cost-control measure?",
    "options": [
      "Cap the number of turns or total tokens retained in the conversation history, using summarization or truncation once a threshold is reached, rather than letting the full history grow unbounded",
      "Simply increase the user's rate limit so they can send even more messages",
      "Ignore the issue, since input tokens are free regardless of volume",
      "Charge the user a flat one-time fee regardless of usage"
    ],
    "correct": 0,
    "explanation": "Capping retained history — via summarization, compaction, or truncation of older turns once a threshold is hit — directly bounds the growth of input tokens sent on each subsequent request, controlling cost (A). Increasing the rate limit (B) addresses request frequency, not the per-request cost growth from an ever-larger message history. Input tokens are billed, not free, so (C) is factually wrong. A flat one-time fee (D) is a business/billing model choice, not an engineering control on the actual API cost incurred per conversation."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer needs to decide between including an image as a base64-encoded string directly in the request versus first uploading it via the Files API and referencing it by file ID.",
    "question": "When is using the Files API generally preferable to inline base64?",
    "options": [
      "Never — inline base64 is always superior in every case",
      "When the same file will be reused across multiple separate API requests, since uploading once and referencing by ID avoids re-sending and re-encoding the file bytes each time",
      "Only when the file is smaller than 1 KB",
      "The Files API cannot be used with document or image content types"
    ],
    "correct": 1,
    "explanation": "The Files API is most valuable when a file will be referenced across multiple requests — upload it once and reference the returned file ID afterward, avoiding the overhead of re-transmitting and re-encoding the same bytes on every call (B). Inline base64 is often simpler for one-off, single-request use cases, so claiming it's always superior (A) is inaccurate. There's no such 1 KB-only restriction on when the Files API is useful (C). The Files API supports referencing files as document or image content, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a multi-turn coding assistant that uses tool calls appends only the text portions of Claude's responses to the messages array, dropping the tool_use content blocks to 'save space.' The team notices the assistant frequently seems confused about what it already tried, repeating failed approaches.",
    "question": "What is the root cause and correct fix?",
    "options": [
      "The model has a bug; nothing on the application side needs to change",
      "The application must append the full assistant response content (including tool_use blocks), not just the text, so the conversation history accurately reflects what tools were called and with what inputs — dropping them breaks the model's memory of its own prior actions",
      "The fix is to increase max_tokens on every request",
      "The fix is to switch to a larger context window model"
    ],
    "correct": 1,
    "explanation": "Since the API is stateless, Claude's understanding of what it already did comes entirely from the message history it's re-sent; dropping tool_use blocks erases the record of prior tool calls and their inputs, causing exactly the repeated-attempt confusion described — the fix is to always append the full assistant content array (B). This is an application-level bookkeeping bug, not a model bug (A). Increasing max_tokens (C) affects response length, not what history is preserved across turns. A larger context window (D) doesn't help if the relevant tool_use content was actively removed from what gets sent, regardless of how much room is available."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a healthcare intake assistant wants to make sure that if the Claude API is briefly unavailable (a 500 or 529 error), the user still gets some kind of graceful response rather than a blank screen or crash.",
    "question": "What is a good fallback UX pattern?",
    "options": [
      "Retry with backoff for a bounded number of attempts, and if all retries are exhausted, show the user a clear, friendly error message (and optionally queue the request for later) rather than leaving the UI hanging or crashing",
      "Keep retrying forever with no limit, blocking the UI indefinitely until it eventually succeeds",
      "Immediately show a fake, made-up response so the user doesn't notice an outage occurred",
      "Redirect the user to a different website entirely"
    ],
    "correct": 0,
    "explanation": "A bounded retry-with-backoff strategy followed by a clear, honest fallback message (and possibly queuing for later) balances resilience against transient errors with a good user experience when the service is genuinely down (A). Retrying forever (B) can hang the UI indefinitely and provide no useful feedback to the user. Fabricating a fake response (C) is actively harmful, especially in a healthcare context where accuracy and honesty matter significantly. Redirecting elsewhere (D) is not a reasonable fallback for a transient service issue."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a data extraction pipeline needs to process a mixed batch: some inputs are short (a few hundred tokens) and finish quickly, others are very long documents. They currently process everything through the standard synchronous endpoint with a single shared timeout value across all request types.",
    "question": "What is a better approach?",
    "options": [
      "Use per-request timeout configuration (or route very long documents to streaming or the Batches API) rather than a single fixed timeout that's either too short for long documents or wastefully long for short ones",
      "Force every request, regardless of size, to use the same timeout as the longest expected document",
      "Cap all documents to the same short length regardless of actual content",
      "Disable timeouts entirely across the board"
    ],
    "correct": 0,
    "explanation": "Tailoring the handling — per-request timeout configuration, or shifting long-document processing to streaming or the asynchronous Batches API — matches processing strategy to actual workload characteristics rather than using one-size-fits-all timing (A). Using the longest-case timeout for everything (B) means short requests wait unnecessarily long before a real failure is detected, hurting responsiveness. Truncating all documents to a fixed short length (C) would lose content needed for accurate extraction from long documents. Disabling timeouts entirely (D) risks requests hanging indefinitely on a genuine failure, with no way to detect and recover."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface streams the assistant's reply, but also wants to run content moderation on the complete response before displaying anything, meaning the incremental streaming benefit is lost for this particular feature.",
    "question": "What is a reasonable way to reconcile streaming with a moderation requirement?",
    "options": [
      "Abandon streaming and moderation both, and just show unmoderated text as fast as possible",
      "Buffer the streamed text until a natural checkpoint (e.g. end of sentence or the full message), run moderation on that chunk, and only then reveal it — trading some latency for safety while still benefiting from incremental delivery at a coarser granularity",
      "Run moderation only on the final 10% of the message, ignoring the rest",
      "Moderate the system prompt only, and skip moderating the assistant's actual output entirely"
    ],
    "correct": 1,
    "explanation": "A practical middle ground is to buffer at a coarser granularity — sentence or paragraph-level chunks — moderate each chunk, then reveal it, which still delivers content incrementally (rather than waiting for the entire message) while enforcing a moderation check before display (B). Abandoning both streaming and moderation (A) sacrifices safety entirely for no real benefit. Moderating only the final fragment (C) leaves most of the content unchecked, defeating the purpose. Moderating only the system prompt (D) doesn't address the actual concern, which is about the model's generated output potentially containing something problematic."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A team wants to know, at a glance, whether a given API response used cached prompt content or not, to help validate their caching setup during development.",
    "question": "Where can they find this information?",
    "options": [
      "In the response's usage object, which reports fields like cache_creation_input_tokens and cache_read_input_tokens",
      "There is no way to observe cache behavior from the API response",
      "By checking the HTTP status code, since cached responses use a different code",
      "In the stop_reason field"
    ],
    "correct": 0,
    "explanation": "The usage object in the API response includes fields that report how many tokens were involved in cache creation versus cache reads, giving direct visibility into whether and how caching was applied for that request (A). This information is available, so (B) is incorrect. HTTP status codes don't encode caching behavior — a cached and uncached successful response both return 200 (C). stop_reason describes why generation ended, unrelated to caching (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants Claude to have access to order-lookup functionality but is deciding between implementing it as a bash-style command tool that runs a shell script versus a narrowly-typed order_lookup tool with an explicit order_id parameter.",
    "question": "For this specific use case, which is the better design choice and why?",
    "options": [
      "The bash-style tool, because it's more flexible and can handle any future need without redefinition",
      "The narrowly-typed order_lookup tool, because it constrains what the model can do to exactly the intended action, is easier to validate, and reduces the risk of unexpected or unsafe behavior compared to a broad shell-execution capability",
      "Neither approach works; only Anthropic-hosted server-side tools can look up orders",
      "It doesn't matter; both approaches carry identical risk"
    ],
    "correct": 1,
    "explanation": "For a well-defined, narrow action like an order lookup, a purpose-built tool with a specific, validated input schema is safer and easier to reason about than exposing broad shell execution, which carries a much larger and harder-to-bound attack surface (B). A general bash-style tool being 'more flexible' (A) is true but is exactly the problem for a security-sensitive customer support scenario where only one specific action is needed. This is a completely reasonable use of user-defined client-side tools, so (C) is wrong. The risk profiles of a narrow typed tool and an open shell tool are clearly different, so (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer is deciding how to structure a system prompt for a customer support bot that should always start with company policy and general behavior instructions, followed by user-specific account details fetched at request time.",
    "question": "Why does the order in which content is assembled in the prompt matter for cost efficiency, given prompt caching?",
    "options": [
      "Order never matters for cost; only total token count matters",
      "Placing the stable, unchanging policy content first and the varying user-specific details after it allows the stable portion to be cached and reused across many different users' requests",
      "Order only matters for readability, never for cost",
      "The API automatically reorders content for optimal caching regardless of how it's structured in the request"
    ],
    "correct": 1,
    "explanation": "Prompt caching relies on matching prefixes; putting the shared, unchanging policy text first (with a cache breakpoint) and the request-specific, varying details afterward allows the stable prefix to be cached and reused across many different requests, cutting cost (B). Order matters precisely because caching is prefix-based, so claiming it never affects cost (A) is wrong. It's not purely a readability concern — it has real, measurable cost implications (C). The API does not automatically reorder request content on the developer's behalf (D); the developer is responsible for structuring the request correctly."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a research tool that answers questions using web search results wants to make sure the assistant doesn't repeatedly search for the same query if the user asks a related follow-up question in the same conversation.",
    "question": "What allows the model to avoid redundant tool calls across a multi-turn conversation?",
    "options": [
      "Nothing can prevent this; Claude has no way to know what it already searched for",
      "As long as the full conversation history — including prior tool_use and tool_result blocks — is resent on each request, Claude can see its own prior search queries and results and reason about whether a new search is actually needed",
      "The API automatically deduplicates tool calls with identical inputs across a conversation",
      "Only by manually hardcoding a list of already-searched queries into the system prompt on every turn"
    ],
    "correct": 1,
    "explanation": "Because the model reasons over the full resent conversation history, including previous tool_use and tool_result blocks, it can see what it already searched and its results, letting it decide a fresh search may be unnecessary for a closely related follow-up (B). Claiming nothing can help (A) ignores how conversation context actually works. The API itself does not automatically deduplicate tool calls based on input similarity (C) — this is a reasoning behavior enabled by visible history, not an enforced mechanism. Manually hardcoding past queries into the system prompt (D) is unnecessary and doesn't scale, since the natural conversation history already carries this information."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer notices that a colleague's code catches a generic Exception around every Claude API call and always returns a hardcoded 'Something went wrong' message, regardless of what actually failed.",
    "question": "What is the main downside of this approach?",
    "options": [
      "There is no downside; a single generic handler is best practice",
      "It obscures the actual cause of failures (e.g. rate limiting versus invalid request versus authentication failure), making debugging harder and preventing different failure types from being handled differently (like retrying only retryable errors)",
      "Generic exception handling is technically impossible in most languages",
      "It will cause the API itself to reject future requests"
    ],
    "correct": 1,
    "explanation": "A blanket catch-all hides the distinction between different error types — like a transient 429 that should be retried versus a permanent 400 that should not be — making both debugging and building sensible retry logic much harder (B). This is a real and common downside, not a non-issue, so (A) is wrong. Generic exception handling is technically possible in essentially every language; the problem is a design choice, not a language limitation (C). Client-side error handling logic has no effect on whether the API itself accepts future requests (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface for a mobile app is deciding whether to call the Claude API directly from the mobile client or route requests through their own backend server.",
    "question": "What is the correct architectural choice and why?",
    "options": [
      "Call the API directly from the mobile client for lower latency, embedding the API key in the compiled app",
      "Route requests through the developer's own backend, which holds the API key securely and can add rate limiting, logging, and business logic, since a compiled mobile app cannot securely keep a secret",
      "It doesn't matter, since compiled mobile apps cannot be reverse-engineered",
      "Store the API key in the app's local device storage, which is inaccessible to anyone but the user"
    ],
    "correct": 1,
    "explanation": "Mobile apps are distributed to end-user devices and can be decompiled or inspected, so any embedded secret is not truly secure; routing through a backend that holds the key server-side is the standard, correct architecture, and it also enables centralized rate limiting and logging (B). Embedding the key directly in the compiled app (A) exposes it to extraction. Compiled apps absolutely can be reverse-engineered with reasonably available tooling, so (C) is a false assumption. Local device storage is still accessible via various device-level extraction techniques and doesn't make the key genuinely safe for a client-only architecture (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A backend engineer building a content moderation pipeline wants each incoming user post evaluated independently and quickly, with results needed within a couple seconds for real-time feed filtering.",
    "question": "Which processing approach fits best?",
    "options": [
      "The Message Batches API, since it processes many items at once",
      "Individual, synchronous (optionally streaming) requests per post, since low per-item latency is the primary requirement here, not bulk throughput on non-urgent work",
      "Queue every post for processing once per day in a single large batch",
      "Only process posts manually by a human moderator instead of using the API"
    ],
    "correct": 1,
    "explanation": "Because each post needs a fast, individual decision for real-time filtering, the standard synchronous (or streaming) endpoint is the right fit — the Batches API trades latency for throughput/cost on bulk, non-urgent work, which doesn't match a real-time requirement (B). The Batches API (A) is designed for asynchronous processing over minutes to hours, not sub-few-second turnaround for a single item. Daily batch queuing (C) is far too slow for real-time feed filtering. While human moderation has its place, the scenario specifically calls for an automated, fast pipeline, so abandoning the API integration (D) doesn't fit the stated requirement."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool wants the assistant to answer questions using the latest data from an internal wiki that changes daily, without retraining or fine-tuning any model.",
    "question": "What is the standard approach for this?",
    "options": [
      "Retrieve the relevant wiki content at request time (e.g. via a search or retrieval step) and include it in the prompt as context, so Claude reasons over fresh, current data",
      "Wait for Anthropic to release a new model version that has memorized the wiki content",
      "Manually paste the entire wiki into the system prompt once and never update it again",
      "This isn't possible with the Claude API"
    ],
    "correct": 0,
    "explanation": "The standard retrieval-augmented pattern is to fetch relevant, current content at request time and inject it into the prompt, so the model always reasons over up-to-date information without needing any retraining (A). Model releases (B) are not a practical or timely mechanism for reflecting daily-changing internal data. Pasting a static snapshot once and never updating it (C) defeats the purpose of needing 'the latest' data. This is a very common and well-supported pattern with the API, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer running a production content pipeline notices their Message Batches API job that submitted 10,000 requests returns individual results in a different order than they were submitted, and their code — which assumed order was preserved — is silently mismatching outputs to the wrong original inputs.",
    "question": "What is the correct fix?",
    "options": [
      "Switch away from the Batches API entirely, since order can't be relied upon",
      "Match each result back to its original input using the custom_id that was specified per-request when the batch was submitted, rather than relying on result ordering",
      "Sort results alphabetically by response text before processing",
      "Assume the first result always corresponds to the first submitted request and hope this happens to be true"
    ],
    "correct": 1,
    "explanation": "Batch results are not guaranteed to come back in submission order; the correct pattern is to assign a custom_id to each request at submission time and use that identifier to match each result back to its original input reliably (B). Abandoning the Batches API (A) throws away its cost and throughput benefits over a solvable ordering issue. Sorting by response text (C) has no logical connection to input identity and would produce nonsensical matching. Assuming order is preserved by position (D) is precisely the bug already causing the mismatches described in the scenario."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a multi-tenant SaaS product wants each tenant's conversation data and system prompt customizations kept fully isolated from other tenants.",
    "question": "Where should tenant-specific isolation be enforced?",
    "options": [
      "At the application layer, by keying stored conversation history, prompts, and any per-tenant configuration by tenant ID, and never mixing data across tenants when building requests",
      "The Claude API automatically isolates tenants if they share the same API key",
      "By using a different model name for each tenant",
      "Isolation is unnecessary since all tenants share the same underlying model weights anyway"
    ],
    "correct": 0,
    "explanation": "Multi-tenant data isolation is an application-layer responsibility: the app must key and separate stored history, prompts, and configuration by tenant ID, and construct each request from only that tenant's data (A). The API has no inherent concept of 'tenants' sharing a key and does not automatically isolate them — that isolation must be built by the calling application (B). Using different model names per tenant (C) doesn't provide data isolation and isn't a real mechanism for this purpose. Isolation is very much necessary regardless of shared model weights, since the actual concern is conversation data and business logic leaking between customers, not model internals (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a document Q&A tool for legal contracts wants to reduce hallucinated answers when the requested information genuinely isn't present in the provided document.",
    "question": "What prompt-level instruction is most directly aligned with this goal?",
    "options": [
      "Explicitly instruct Claude to answer only based on the provided document and to state clearly when information isn't present, rather than guessing",
      "Remove the system prompt entirely to give Claude maximum freedom",
      "Ask Claude to always provide a confident, definitive answer no matter what",
      "Increase temperature to make responses more creative"
    ],
    "correct": 0,
    "explanation": "Explicitly instructing the model to ground its answer in the provided document and to say when something isn't covered directly targets the hallucination problem the developer wants to reduce (A). Removing the system prompt (B) removes exactly the kind of grounding instruction that helps here, going the wrong direction. Demanding a confident answer regardless of certainty (C) actively encourages the model to fabricate an answer rather than admit missing information. Raising temperature (D) increases output variability/creativity, which tends to work against factual groundedness, not toward it."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer notices their production error monitoring shows a spike in 401 authentication errors starting at a specific timestamp, correlating with a scheduled API key rotation the security team performed.",
    "question": "What most likely went wrong?",
    "options": [
      "The new key was rotated in Anthropic's system but the deployed application's environment variable / secrets manager entry was not updated to the new key, so it's still sending the old, now-revoked key",
      "API key rotation is not a supported operation and should never be performed",
      "The 401 errors are unrelated to the key rotation and are a coincidence",
      "Rotating an API key always causes a permanent, unrecoverable outage"
    ],
    "correct": 0,
    "explanation": "The classic rotation failure mode is exactly this: the old key is revoked in the Anthropic system, but the deployed application still has the old key baked into its environment configuration, so it starts failing authentication until it's updated to the new key (A). Key rotation is a normal, supported security practice, not something to avoid (B). Given the precise timestamp correlation described, treating it as coincidental (C) ignores strong direct evidence of a causal relationship. This is a recoverable, common operational mistake — updating the deployed configuration resolves it — not a permanent outage (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a voice assistant backend wants to reduce the time between the user finishing speaking and hearing the first word of the response, and is considering whether extended/deep 'thinking' mode is appropriate for this specific low-latency use case.",
    "question": "What is the right tradeoff consideration here?",
    "options": [
      "Extended thinking should always be enabled for every request, since it only ever improves response quality with no cost",
      "For latency-sensitive, simple conversational turns, enabling extended thinking adds processing time before the visible response begins, so it should be reserved for genuinely complex reasoning tasks, not applied blindly to fast conversational exchanges",
      "Extended thinking has no effect on response latency at all",
      "Extended thinking should be disabled globally forever and never used in any product"
    ],
    "correct": 1,
    "explanation": "Extended thinking trades additional processing time for improved reasoning on complex problems; for a latency-sensitive, typically simple conversational exchange, that added time works against the core goal of a fast voice response, so it should be reserved for tasks that actually need deeper reasoning (B). Claiming it always helps with no cost (A) ignores the real latency tradeoff. It does affect latency, since it adds processing before the final response, so (C) is false. Blanket-disabling it everywhere forever (D) throws away a genuinely useful feature for the subset of tasks that do benefit from deeper reasoning."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants to show a typing indicator only while Claude is actively generating output, and hide it as soon as generation is fully done, using the streaming API.",
    "question": "Which event most directly signals that the assistant has fully finished generating and the typing indicator should be hidden?",
    "options": [
      "content_block_start",
      "message_stop",
      "ping",
      "content_block_delta"
    ],
    "correct": 1,
    "explanation": "message_stop is emitted once at the very end of the stream, signaling the entire message is complete — the correct trigger to hide a typing/generating indicator (B). content_block_start (A) fires when a new block begins, which is mid-generation, not completion. ping events (C) are periodic keep-alive events unrelated to completion status. content_block_delta (D) fires repeatedly throughout generation as content streams in, which is the opposite signal — it indicates the model is still actively producing output."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an e-commerce assistant is deciding whether to give Claude a single generic execute_action tool that takes a free-text action string, or several narrowly typed tools like check_order_status, initiate_return, and update_shipping_address.",
    "question": "Which approach is generally better, and why?",
    "options": [
      "The single generic tool, because it requires writing less code upfront",
      "Several narrowly typed tools, because clear, specific schemas make it easier for the model to select the right action reliably, easier for the application to validate inputs, and easier to reason about safety per action",
      "Neither approach works; Claude can only be given exactly one tool per request",
      "It makes no difference how tools are designed as long as the tool names are creative"
    ],
    "correct": 1,
    "explanation": "Narrow, well-typed tools with specific parameters give the model clearer signals about when and how to use each capability, make application-side input validation straightforward, and make it easier to reason about and restrict what each individual action can do (B). Writing less code upfront (A) is a short-term convenience that trades away reliability and safety, which matters more for a production customer-facing assistant. The API supports providing multiple tools in a single request, so (C) is false. Tool design meaningfully affects model behavior and reliability — it's not an arbitrary cosmetic choice, so (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a research tool receives an HTTP 413 error when sending a request containing a very large uploaded document directly as base64 in the request body.",
    "question": "What does a 413 error indicate, and what is a reasonable fix?",
    "options": [
      "The request exceeds allowed size limits; the developer should consider using the Files API to reference the document instead of embedding it inline, or otherwise reduce the payload size",
      "413 means the API key is invalid and should be rotated",
      "413 means the model refused the content for safety reasons",
      "413 means the request was rate limited and should be retried immediately with no changes"
    ],
    "correct": 0,
    "explanation": "A 413 (request_too_large) error means the request body exceeds size limits; the fix is to reduce the payload — for example, by uploading large files via the Files API and referencing them by ID instead of inlining raw base64 data directly in every request (A). A 413 is unrelated to key validity, which would instead produce a 401 (B). Safety refusals surface as a 200 response with stop_reason: 'refusal', not as a 413 error at the HTTP level (C). 413 is not the rate-limiting error code — that's 429 — so simply retrying without changing anything won't fix a payload that's genuinely too large (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants to gracefully handle the case where a user pastes an enormous block of text (accidentally an entire multi-hundred-page document) into the chat input, potentially exceeding the model's context window.",
    "question": "What is the best proactive handling for this?",
    "options": [
      "Let the request go through and let the API return whatever error results, with no client-side handling",
      "Estimate or count tokens client-side before sending (e.g. via the token counting endpoint or an approximate check) and warn the user or truncate/chunk the input if it would exceed reasonable limits, rather than discovering the problem only after a failed request",
      "Automatically ban any user who pastes a large block of text",
      "Silently drop the user's message entirely with no explanation"
    ],
    "correct": 1,
    "explanation": "Proactively checking input size (via the token counting endpoint or a reasonable estimate) before sending lets the application warn the user or chunk/handle oversized input gracefully, rather than only discovering the problem via a failed API call after the fact (B). Doing nothing and letting a raw error surface (A) is a worse user experience than catching it early. Banning the user for a likely accidental paste (C) is a wildly disproportionate response. Silently dropping the message with no feedback (D) leaves the user confused about why nothing happened."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tooling dashboard wants to show engineers a running total of how many tokens (input + output) their team's feature has consumed today, without querying the Anthropic Console manually.",
    "question": "What is the most direct way to build this?",
    "options": [
      "Have the application sum the usage.input_tokens and usage.output_tokens fields (including cache-related token fields) from every API response it makes, and persist a running total in its own database or metrics store",
      "This information can only ever be viewed manually in the Console dashboard",
      "Ask the model itself, in the prompt, to report the token count of its own previous responses",
      "Estimate token usage by counting words in each response with basic string splitting"
    ],
    "correct": 0,
    "explanation": "Each API response includes a usage object with token counts for that specific call; summing these programmatically (including cache creation/read fields when relevant) and storing a running total in the application's own metrics store gives an accurate, real-time internal dashboard without manual Console lookups (A). The Console does offer usage data, but the API also exposes it programmatically per response, so exclusively relying on manual Console checks (B) is unnecessarily limiting. Asking the model to self-report token counts (C) is unreliable, since Claude does not have privileged access to precise token accounting for its own output within its response text. Word-splitting (D) is a rough approximation that doesn't match actual tokenization and would produce inaccurate totals."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a coding assistant wants to send both a large repository context (which rarely changes within a session) and a specific, ever-changing user question in each request, while minimizing latency for the varying part.",
    "question": "Beyond prompt caching for cost, what streaming consideration matters here?",
    "options": [
      "Streaming has no interaction with how the prompt is structured; caching and streaming are entirely independent concerns that can be combined as needed",
      "Streaming cannot be used together with prompt caching under any circumstances",
      "Caching must be disabled whenever streaming is used",
      "Only the first 100 tokens of a streamed response can come from a cached prefix"
    ],
    "correct": 0,
    "explanation": "Prompt caching and streaming are independent, complementary features — caching reduces reprocessing cost/latency for the stable prefix, while streaming affects how the response is delivered incrementally; both can be used together in the same request without conflict (A). They are not mutually exclusive, so claims that they can't be combined (B) or that caching must be disabled for streaming (C) are false. There's no such artificial cap tying cached-prefix reuse to a fixed number of streamed output tokens (D) — caching applies to the input side of the request, and output streaming is a separate concern."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a company with a strict data residency and compliance policy needs to guarantee no user PII is ever written to shared application logs.",
    "question": "What is a reasonable approach given this constraint?",
    "options": [
      "Log full request and response bodies as-is, since logs are internal-only and considered safe by default",
      "Redact or omit user message content and any personally identifiable fields from logs, logging only non-sensitive metadata (like request IDs, timestamps, latency, and token counts) needed for debugging",
      "Disable all logging entirely, since any logging risks a compliance violation",
      "Log PII but encrypt the entire log file with a key that is never rotated"
    ],
    "correct": 1,
    "explanation": "The right balance is selective logging: capture operationally useful, non-sensitive metadata (IDs, timestamps, latency, token counts) for debugging and monitoring, while redacting or omitting actual user content and PII to satisfy compliance requirements (B). Logging full bodies unredacted (A) directly risks storing PII in violation of the stated policy — 'internal-only' doesn't automatically make something compliant. Disabling all logging (C) throws away the operational visibility needed to run the system reliably, which isn't necessary if sensitive fields are properly redacted. Encrypting everything with a never-rotated key (D) doesn't address the core issue of unnecessarily persisting PII in the first place, and key rotation practices are a separate concern from whether PII should be logged at all."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer testing locally sets ANTHROPIC_API_KEY in their shell before running a script, but the script still throws an authentication error.",
    "question": "What is a likely cause worth checking first?",
    "options": [
      "The environment variable was set in a different shell session/process than the one running the script, so the script's process doesn't actually see it",
      "Environment variables are never usable with the Anthropic SDK",
      "The API key format is fundamentally incompatible with environment variables",
      "The script must be run as a root/administrator user for environment variables to be visible"
    ],
    "correct": 0,
    "explanation": "A very common cause of 'I set the env var but it's not working' is that the variable was exported in one shell/terminal session while the script actually runs in a different process (a different terminal tab, an IDE-launched process, a subshell) that doesn't inherit it — checking this is a sensible first debugging step (A). The SDK's default client constructor is specifically designed to read from environment variables, so (B) is false. There's no such incompatibility between API key strings and environment variables as a storage mechanism (C). Environment variable visibility is about process/session inheritance, not about elevated OS privileges (D)."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a multi-agent research pipeline has one Claude call that plans a research strategy and, based on the plan, spawns several follow-up Claude calls to gather information, each of which redundantly re-includes the entire original planning conversation (including the large system prompt) as context, even though each follow-up call only needs to know its own specific sub-task.",
    "question": "What is the most effective change to reduce unnecessary cost here?",
    "options": [
      "Give each follow-up call only the context it actually needs for its specific sub-task (e.g. the sub-task description and relevant shared reference material with caching), rather than the full original planning conversation history it doesn't need",
      "Increase max_tokens on every follow-up call so they complete in fewer retries",
      "Merge all the follow-up calls into a single call with no sub-task separation",
      "Add extended thinking to every follow-up call to make them smarter"
    ],
    "correct": 0,
    "explanation": "Since each follow-up call has a distinct, narrow sub-task, it doesn't need the entire original planning conversation replayed into it — scoping each call's context down to what it actually needs (plus caching any genuinely shared static material) avoids redundant token cost across many parallel calls (A). Increasing max_tokens (B) affects output length and has nothing to do with unnecessary input context being resent. Merging everything into a single call (C) may reintroduce the coupling and context-bloat problem in a different form, and can also make it harder to parallelize independent sub-tasks. Adding extended thinking everywhere (D) increases cost and doesn't address the root inefficiency described, which is unnecessary repeated input context."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface persists conversation history to a database, but a bug causes the app to occasionally reload and resend two consecutive assistant-role messages when reconstructing history after a page refresh.",
    "question": "What will happen when this malformed history is sent to the API?",
    "options": [
      "The API will silently merge the two assistant messages into one",
      "The API will return a 400 error because roles must alternate between user and assistant",
      "The API will treat the second assistant message as if it were from the user",
      "The API will process it normally with no issue, since role order doesn't matter"
    ],
    "correct": 1,
    "explanation": "The Messages API enforces alternating user/assistant roles; sending two consecutive assistant messages violates that structure and results in an HTTP 400 invalid_request_error (B). The API does not silently merge or reinterpret malformed role sequences (A, C) — it validates and rejects them explicitly. Role alternation is a real, enforced requirement, not an optional convention, so (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to give the model access to both a knowledge-base search tool and a create-support-ticket tool, and wants Claude to be able to call both in the same turn if it decides that's appropriate (e.g. search first, then also flag for escalation).",
    "question": "What does the API support here by default?",
    "options": [
      "Claude can only ever call one tool per response, so parallel tool use across two different tools in one turn is impossible",
      "By default, Claude may include multiple tool_use blocks in a single response, allowing several different tools (or repeated calls) to be requested together, which the application should then execute and return as multiple tool_result blocks in one follow-up message",
      "Multiple tool calls are only possible if extended thinking is also enabled",
      "The application must make two entirely separate API requests to use two different tools in the same turn"
    ],
    "correct": 1,
    "explanation": "By default, Claude can request multiple tool calls within a single response (multiple tool_use blocks), and the application executes all of them and returns their results together as tool_result blocks in a single subsequent user message (B). This directly contradicts the one-tool-per-response claim (A). Parallel tool use is a default behavior independent of extended thinking (C). It does not require separate API requests per tool within the same turn — that's exactly what parallel tool use avoids (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an internal tool notices that when they interleave images and text in a user message's content array in an unusual order (e.g. text, image, text, image), the model still processes it correctly, but they're unsure this is guaranteed behavior.",
    "question": "What is generally true about ordering multimodal content blocks within a single message?",
    "options": [
      "Images and text can be interleaved within a content array, and the order can matter for how the model relates specific text to specific images, so intentional ordering (e.g. referring to 'the image above') is a reasonable practice",
      "Only one image is ever allowed per entire conversation, regardless of message count",
      "Text and images can never coexist in the same content array",
      "Content block order is entirely ignored by the model in every case"
    ],
    "correct": 0,
    "explanation": "The content array within a message can contain multiple blocks of different types (text, image, document) in a meaningful order, and that order can influence how the model relates references like 'the image above' to specific visual content, so deliberate ordering is a legitimate technique (A). There is no such single-image-per-conversation restriction (B); multiple images across multiple messages are supported. Text and images do coexist within the same content array — that's the standard way to ask a question about an image (C). Content order is not simply ignored; it can meaningfully affect interpretation, especially with multiple images or documents (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is choosing between temperature settings for a customer-facing FAQ bot that should give consistent, predictable answers to the same or similar questions.",
    "question": "What temperature setting best fits this goal?",
    "options": [
      "A high temperature, to maximize creative variation between answers to the same question",
      "A low temperature, to favor more deterministic, focused, and consistent outputs for repeated similar queries",
      "Temperature has no effect on output consistency",
      "Randomize the temperature on every request for variety"
    ],
    "correct": 1,
    "explanation": "Lower temperature values bias the model toward more deterministic, focused responses, which is generally desirable for an FAQ-style bot where consistency across similar questions matters more than creative variety (B). A high temperature (A) increases variability, working against the stated goal of consistent answers. Temperature is a real sampling parameter that does affect output variability, so (C) is false. Randomizing temperature per request (D) would produce inconsistent behavior, the opposite of what's wanted here."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a chat interface streams responses to the browser over a persistent connection but notices that on some corporate networks with aggressive proxies, the stream appears to hang indefinitely with no data received, even though the request eventually succeeds.",
    "question": "What is a resilient pattern to handle this?",
    "options": [
      "Nothing can be done; proxy issues are entirely outside the application's control",
      "Implement a client-side idle timeout that detects a lack of incoming stream data within a reasonable window and falls back to a non-streaming request or shows a retry option, rather than waiting forever",
      "Switch off streaming globally for all users to avoid this entirely, even those on unaffected networks",
      "Automatically increase max_tokens whenever a stream hangs"
    ],
    "correct": 1,
    "explanation": "A reasonable resilience pattern is a client-side idle/inactivity timeout that detects when no stream data has arrived for too long, and then falls back gracefully (retry, non-streaming request, or a clear error) rather than hanging indefinitely (B). While proxy behavior itself is outside the app's control, the application absolutely can build defensive handling around it, so (A) overstates helplessness. Disabling streaming for everyone (C) is an overcorrection that removes a real benefit for the majority of unaffected users. max_tokens controls output length and has no relationship to a connection-level hang caused by network infrastructure (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool needs to send a 90-page PDF report to Claude for analysis and is unsure whether there's a hard limit on document size that could silently affect their integration.",
    "question": "What should the developer do to be safe?",
    "options": [
      "Assume there are no limits whatsoever, since the model can handle infinitely large documents",
      "Check the documented limits on PDF page count and request size, and handle the case where a document exceeds them (e.g. by splitting it into sections or summarizing)",
      "Convert the entire PDF to a single image and send it as one image block instead",
      "Send only the PDF's file name as text and let Claude infer the content"
    ],
    "correct": 1,
    "explanation": "There are real, documented limits on request size and page counts for document input; a careful integration checks those limits and has a plan (like splitting a document into sections) for inputs that exceed them (B). Assuming no limits exist (A) risks a hard failure in production for a large enough document with no graceful handling. Flattening a 90-page PDF into a single image (C) is not how PDF document input is intended to work and would lose the document structure the API handles natively. Claude cannot infer file content from just a filename string (D) — no actual document data would be transmitted."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a company wants to prevent the assistant from ever discussing pricing for a competitor's product, even if a user directly asks.",
    "question": "What is the most reliable way to enforce this in the application?",
    "options": [
      "Instruct the model clearly in the system prompt about this boundary, and additionally validate/filter responses at the application layer as a backstop, rather than relying on prompt instructions alone for a hard business requirement",
      "Rely purely on hoping the model infers this boundary without being told",
      "Increase temperature so the model naturally avoids sensitive topics",
      "There's no way to influence what topics the model discusses"
    ],
    "correct": 0,
    "explanation": "For a hard business requirement, the best approach combines a clear system prompt instruction with an application-layer validation/filtering backstop, since prompt instructions alone reduce but don't perfectly guarantee compliance in every case (A). Hoping the model infers an unstated boundary (B) is unreliable and not a real strategy. Temperature affects output randomness, not adherence to topic restrictions, and raising it would if anything make behavior less predictable (C). System prompts and application-level guardrails are effective, well-established levers for shaping topic boundaries, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a coding assistant wants to let users pause an in-progress multi-step agentic tool-use loop, inspect what's happened so far, and then resume it later — potentially after the server process itself restarts.",
    "question": "What is required to support this kind of durable, resumable long-running task?",
    "options": [
      "Nothing; conversations resume automatically as long as the same API key is used",
      "The application must persist the full conversation state (messages array, including tool_use/tool_result history) to durable storage, so it can be reloaded and the loop resumed from that saved state even after a process restart",
      "Use a special 'pause' parameter on the API request that the server automatically remembers",
      "This is fundamentally impossible with the Claude API"
    ],
    "correct": 1,
    "explanation": "Since the API itself is stateless, durable pause/resume functionality across process restarts must be implemented by persisting the full conversation state to the application's own storage, allowing the loop to be reconstructed and continued later from that saved state (B). The API does not automatically resume conversations tied to an API key (A) — there's no server-side session concept keyed by API key. There is no such built-in 'pause' request parameter that the server remembers on your behalf (C). This is a well-established, achievable pattern given proper application-side persistence, so claiming it's impossible (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a data extraction service wants to know which HTTP status code family generally indicates a problem with how their request was formed, versus a problem on Anthropic's infrastructure.",
    "question": "Which pairing is correct?",
    "options": [
      "4xx errors generally indicate a problem with the request itself (e.g. malformed input, bad auth); 5xx (and 529) errors generally indicate a service-side issue",
      "4xx errors always mean the API is down; 5xx errors always mean the request was malformed",
      "Both 4xx and 5xx errors always mean the same thing: retry immediately",
      "HTTP status codes carry no meaningful distinction for the Claude API"
    ],
    "correct": 0,
    "explanation": "As with most HTTP APIs, 4xx-class errors (400, 401, 403, 404, 413, 429) generally point to a problem with the client's request, while 5xx-class errors (and the Anthropic-specific 529 overloaded error) generally indicate a service-side issue — this distinction is exactly why different handling (fix-and-resend versus backoff-and-retry) is appropriate for each (A). The characterizations in (B) are reversed and incorrect. Treating both classes identically as always-immediately-retryable (C) ignores that most 4xx errors (like a malformed request or invalid auth) will fail identically on retry until actually fixed. The status code families do carry clear, meaningful, and actionable distinctions for this API, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface for a support tool wants the frontend to know, before the assistant responds, that user input is currently being processed — including during the (potentially multi-second) gap between the request being sent and the first token arriving.",
    "question": "What is the correct way to represent this state in the UI?",
    "options": [
      "Show a loading/thinking indicator from the moment the request is sent until the first content actually starts arriving (e.g. the first content_block_delta), then transition to displaying streamed text",
      "Show no indicator at all, since users should just wait silently",
      "Wait for the entire response to complete before showing any UI feedback",
      "Show the loading indicator only after the response has fully finished"
    ],
    "correct": 0,
    "explanation": "Showing a loading/processing indicator from send-time until the first real content arrives, then switching to displaying the streamed text as it comes in, gives users continuous, honest feedback about what's happening (A). Providing no feedback at all (B) leaves users uncertain whether their input was even received. Waiting for full completion before any feedback (C) defeats much of the purpose of using streaming in the first place. Showing the loading indicator only after the response is already finished (D) is backwards and provides no useful signal during the actual wait."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot integrates a check_order_status tool that calls an internal REST API. During testing, the internal API occasionally returns malformed JSON due to a bug on that internal service, and the developer's tool-handling code crashes when trying to parse it, taking down the whole request.",
    "question": "What is the best fix?",
    "options": [
      "Wrap the internal API call and its response parsing in error handling; on failure, return a tool_result with is_error: true and a clear message, so the conversation can continue gracefully instead of crashing",
      "Have the tool-handling code silently return an empty string on any parsing failure with no error flag",
      "Remove the tool entirely so this situation can never occur",
      "Retry the internal API call in an infinite loop until it eventually returns valid JSON"
    ],
    "correct": 0,
    "explanation": "Defensive error handling around the tool's execution — catching parsing failures and reporting them back to Claude as an explicit tool error — lets the conversation degrade gracefully instead of crashing the whole request, and gives the model information it can act on (A). Silently returning an empty string with no error indication (B) misleads the model into thinking the tool succeeded with no useful data, which can produce confusing or wrong responses. Removing the tool (C) eliminates useful functionality just to avoid a fixable bug. Retrying in an infinite loop (D) risks the request hanging indefinitely if the internal service issue is persistent rather than transient."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool needs to decide between calling the Claude API directly with raw HTTP requests versus using the official Anthropic SDK for their language.",
    "question": "What is a key practical advantage of using the official SDK?",
    "options": [
      "The SDK is required by Anthropic and raw HTTP calls are technically disallowed",
      "The SDK handles details like request serialization, typed response objects, streaming event parsing, and built-in retry logic for transient errors, reducing the amount of boilerplate and error-prone plumbing the developer has to write themselves",
      "The SDK is always faster at the network level than raw HTTP",
      "The SDK does not support tool use, so raw HTTP is required for tool-using applications"
    ],
    "correct": 1,
    "explanation": "The official SDKs provide meaningful conveniences — typed objects, automatic retry with backoff for transient errors, streaming helpers, and less manual request/response plumbing — which reduces bugs and development time compared to hand-rolling raw HTTP calls (B). Raw HTTP calls to the API are fully supported and commonly used, so claiming they're disallowed (A) is false. The SDK is a wrapper around the same underlying HTTP API, so it doesn't inherently make network calls faster (C). The SDKs fully support tool use — in fact they add helper functionality like the tool runner on top of it — so (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A production research tool has a background job that periodically calls the Claude API to refresh cached summaries of frequently accessed documents. The team notices that during a recent Anthropic-side incident (a sustained period of 529 errors lasting 20 minutes), their background job's naive retry loop with a fixed 500ms delay ended up sending a very high rate of retries, and their on-call was paged for unrelated services being starved of resources by the retry storm.",
    "question": "What combination of changes would have prevented this cascading failure?",
    "options": [
      "Nothing could have prevented this; sustained outages always cause cascading failures elsewhere",
      "Implement exponential backoff with jitter and a maximum retry cap/circuit breaker, so retry attempts slow down and eventually pause during a sustained outage instead of hammering the API (and consuming local resources) at a constant high rate",
      "Increase the fixed retry delay to exactly 501ms",
      "Immediately fail over to a different, unrelated third-party API whenever a 529 occurs"
    ],
    "correct": 1,
    "explanation": "The correct fix is textbook resilience engineering: exponential backoff with jitter naturally slows the retry rate the longer an outage persists, and a circuit breaker or max-retry cap prevents indefinite resource consumption locally, both of which would have avoided starving other services during the sustained incident (B). Claiming nothing could have helped (A) ignores well-established, standard mitigations for exactly this scenario. A trivial one-millisecond increase to a fixed delay (C) does not meaningfully change the retry storm dynamics. Failing over to an unrelated third-party API (D) isn't a coherent or realistic mitigation for a single provider's outage and introduces its own complexity and risk."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a chat interface wants to display distinct visual styling for the model's step-by-step reasoning versus its final answer, when extended thinking is enabled.",
    "question": "How can the application tell these two kinds of content apart in the response?",
    "options": [
      "By checking the content block type — thinking blocks are a distinct type from text blocks, so the two can be rendered differently",
      "There's no way to distinguish reasoning from the final answer in the response",
      "By assuming the first half of the response is always reasoning and the second half is always the answer",
      "By checking whether the text contains the word 'because'"
    ],
    "correct": 0,
    "explanation": "When extended thinking is used, the response's content array includes distinct block types — thinking blocks separate from text blocks — so the application can render them with different UI treatment based on block type (A). This distinction is explicitly available via typed content blocks, so (B) is false. There's no fixed positional rule like 'first half is reasoning' — the structure is determined by typed content blocks, not response position (C). Keyword matching on specific words like 'because' (D) is an unreliable heuristic with no defined relationship to the actual content block type."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to give the assistant awareness of the current date and time so it can correctly answer questions like 'what's today's date' or reason about relative time ('is my subscription renewal in the past?').",
    "question": "What is the correct approach, given that the model has no built-in real-time clock?",
    "options": [
      "Include the current date/time as text in the prompt (e.g. in the system prompt or injected context) at request time, since the model itself has no live access to the current wall-clock time",
      "Assume the model always knows the current date automatically with no help needed",
      "This is impossible to achieve with the Claude API",
      "Ask the user to state the current date themselves in every message"
    ],
    "correct": 0,
    "explanation": "Since the model doesn't have live access to a real-time clock, the application must inject the current date/time into the prompt (commonly in the system prompt) at request time so Claude has accurate, current temporal grounding for its reasoning (A). Assuming the model inherently knows the live current date with no help (B) is incorrect and would lead to stale or wrong date reasoning. This is a very standard and achievable pattern, so (C) is false. Requiring the user to manually state the date every time (D) is unnecessary and provides a worse experience than the application supplying it automatically."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot integration is deciding how to log conversation transcripts for later quality review by human agents, while still meeting a strict data retention policy that says raw transcripts must be deleted after 30 days.",
    "question": "What is a reasonable implementation approach?",
    "options": [
      "Store transcripts indefinitely, since deleting data might be useful someday",
      "Store transcripts with a timestamp and implement an automated retention/deletion job (or a database TTL mechanism) that purges records older than 30 days, so the policy is enforced systematically rather than manually",
      "Never log transcripts at all, since any logging conflicts with the retention policy",
      "Print transcripts to a physical printer for archival instead of digital storage"
    ],
    "correct": 1,
    "explanation": "The correct approach is to log transcripts as needed for legitimate purposes like quality review, timestamped, with an automated deletion mechanism (a scheduled job or database TTL feature) enforcing the 30-day retention limit systematically and reliably (B). Storing indefinitely (A) directly violates the stated retention policy. Not logging at all (C) is an overcorrection — a 30-day retention policy explicitly permits storage within that window, it just requires eventual deletion. Physical printing (D) is not a sensible or practical response to a data retention requirement and doesn't actually address digital deletion needs."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants to correctly render Markdown-formatted responses from Claude (headers, code blocks, bold text) as they stream in, token by token, without waiting for the full message.",
    "question": "What is a practical challenge with rendering partial Markdown while streaming, and a reasonable mitigation?",
    "options": [
      "There is no challenge; partial Markdown always renders identically to complete Markdown",
      "Partial Markdown (e.g. an unclosed code fence or incomplete bold marker) can render incorrectly mid-stream; a common mitigation is to use a streaming-aware Markdown renderer or periodically re-parse the accumulated text as a whole rather than rendering each raw delta independently",
      "Disable Markdown rendering entirely and always show raw text",
      "Only render Markdown after converting the entire response to plain text first"
    ],
    "correct": 1,
    "explanation": "Because Markdown syntax often spans multiple tokens (like ``` for a code fence or ** for bold), naive per-token rendering can show broken or flickering formatting mid-stream; the practical fix is to re-parse the growing accumulated text as a whole on each update, or use a Markdown renderer designed for incremental/streaming content (B). Claiming there's no challenge (A) ignores a real and commonly encountered rendering issue. Disabling Markdown entirely (C) sacrifices formatting quality unnecessarily when better mitigations exist. Converting to plain text first (D) would remove the formatting the user actually wants to see, rather than solving the streaming rendering problem."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is unsure whether the `anthropic-version` header is required on every request to the Messages API when using raw HTTP calls (not the SDK).",
    "question": "What is correct here?",
    "options": [
      "The anthropic-version header is required on raw HTTP requests to specify which API version's behavior to use; the SDK sets this automatically",
      "The anthropic-version header is purely optional and has no effect on behavior",
      "The anthropic-version header is only needed for streaming requests",
      "The anthropic-version header must match the exact version of the SDK library installed"
    ],
    "correct": 0,
    "explanation": "The anthropic-version header pins the request to a specific API version's behavior and is required for raw HTTP calls, though the official SDKs set it automatically so developers using the SDK don't need to think about it (A). It is not merely optional/no-op — omitting it on a raw HTTP call results in an error (B). It applies to all Messages API requests, not just streaming ones (C). It refers to the API's versioning scheme (a date-based version string), not the installed SDK package's version number (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a data extraction service processes each incoming document with a single API call and treats the entire pipeline as done as soon as the API call returns 200, with no downstream validation.",
    "question": "What potential blind spot does this design have?",
    "options": [
      "None — a 200 status code always means the extracted data is fully correct and complete",
      "A 200 response only confirms the API call succeeded at the HTTP level; it doesn't guarantee the model's extracted output is accurate, complete, or matches the expected schema, so downstream validation is still valuable",
      "A 200 status code is impossible to receive from the Messages API",
      "This design is already fully complete and needs no further consideration"
    ],
    "correct": 1,
    "explanation": "A successful HTTP 200 only confirms the request was processed without a transport/protocol-level error — it says nothing about whether the model's actual extracted content is correct, complete, or schema-conformant, so validating the extracted data downstream remains important (B). Claiming 200 guarantees content correctness (A) conflates two different layers: request success versus content quality. 200 is obviously a normal, common response for this API (C). Given the blind spot described, the pipeline is not actually complete as designed (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot for an e-commerce company wants order-lookup results (fetched via a tool call to an internal order API) to always be treated as ground truth by the model, even if it conflicts with something claimed earlier in the conversation by the user.",
    "question": "What prompt-level guidance best supports this goal?",
    "options": [
      "Explicitly instruct the model, in the system prompt, to prioritize tool results as the authoritative source of truth over prior conversational claims when there's a conflict",
      "Say nothing and hope the model figures out the right priority on its own",
      "Instruct the model to always trust the user's claims over any tool result",
      "Remove the order-lookup tool entirely to avoid any possible conflict"
    ],
    "correct": 0,
    "explanation": "Explicitly telling the model how to prioritize sources when they conflict — treating verified tool results as authoritative over unverified user claims — directly encodes the desired behavior rather than leaving it to chance (A). Saying nothing (B) leaves this important precedence rule unspecified and unpredictable. Instructing the opposite priority, trusting user claims over tool results (C), undermines the entire purpose of having a verified data source. Removing the tool (D) eliminates the assistant's ability to give accurate, verified order information at all, which isn't a real solution to a conflict-resolution question."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool wants to detect, from application logs alone, whether a particular past request used extended thinking, without re-running the request.",
    "question": "What is the most reliable way to determine this after the fact?",
    "options": [
      "Log whether the thinking parameter was set on the outgoing request, and/or check whether the stored response contains thinking-type content blocks",
      "This information is permanently lost immediately after the response is received and cannot be recovered",
      "Guess based on how long the response text is",
      "Assume every request always used extended thinking by default"
    ],
    "correct": 0,
    "explanation": "The most reliable approach is to log the actual request parameters (including whether thinking was configured) and/or inspect the stored response for thinking-type content blocks, both of which directly and unambiguously indicate whether extended thinking was used (A). This is recoverable as long as relevant data was logged or stored, so claiming it's permanently and unrecoverably lost (B) is only true if nothing relevant was ever persisted — the better practice is to persist it in the first place. Response length (C) is not a reliable indicator of whether thinking was enabled. Extended thinking is not on by default for every request in general use, so assuming it was always used (D) is an unsafe assumption without evidence."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a chat interface for a customer support product needs the UI to show, in real time, a running count of tokens used so far in the current conversation, updating live as the assistant streams its response.",
    "question": "What is the correct source for an accurate live token count?",
    "options": [
      "Estimate tokens by dividing character count by 4 as the response streams, since the API never reports token usage during streaming",
      "Track cumulative usage from the message_start event (input tokens) and the message_delta event (output tokens, updated as streaming progresses/completes), which report actual token usage from the API",
      "Token counts are only available a full 24 hours after the request completes",
      "Token usage can only be obtained by making a separate, second API call after the response finishes"
    ],
    "correct": 1,
    "explanation": "Streaming responses include usage information as part of the message_start event (initial input token count) and message_delta events (updated output token counts), giving the application accurate, real API-reported figures to display live rather than relying on estimation (B). A character-count-based estimate (A) is an unnecessary approximation when the API already reports real usage during streaming. There's no such 24-hour delay on usage reporting (C) — it's available essentially immediately as part of the response. A separate follow-up call isn't needed to get usage data, since it's embedded directly in the streaming response itself (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a customer support bot wants to allow the assistant to ask a clarifying question back to the user when a request is ambiguous, rather than guessing.",
    "question": "How should this be handled at the API/architecture level?",
    "options": [
      "This requires a special 'clarification' API parameter that must be set on every request",
      "No special mechanism is needed — the model can naturally respond with a clarifying question as ordinary assistant text, and the application simply displays it and waits for the next user turn like any other reply",
      "Clarifying questions are not supported by the Messages API at all",
      "The application must detect a question mark in the response and reject it as invalid"
    ],
    "correct": 1,
    "explanation": "Asking a clarifying question is just an ordinary assistant text response — no special API parameter or mechanism is required; the application handles it exactly like any other reply and simply waits for the user's next message to continue the conversation (B). There is no dedicated 'clarification mode' parameter required for this (A). This is a completely normal, commonly encountered conversational pattern well within the Messages API's design, so (C) is false. Rejecting responses containing a question mark (D) would be a bizarre and counterproductive filter that breaks normal conversational behavior."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a production data extraction pipeline that processes sensitive financial documents wants to design their retry logic so that if a request partially succeeds (e.g. the API call succeeds but the application crashes before writing the result to the database), the system never silently loses or duplicates that extracted data on the next run.",
    "question": "What is the most robust design pattern for this?",
    "options": [
      "Rely on the fact that API calls always complete atomically with database writes with no possibility of a gap between them",
      "Design the write-to-database step to be idempotent (e.g. upsert keyed by document ID) and log/persist the API response before considering the item processed, so a crash between the API call and the DB write can be safely detected and either resumed or safely reprocessed without creating duplicate or missing records",
      "Never persist intermediate state; simply re-run the entire pipeline from scratch on any failure and accept whatever happens",
      "Add a manual human review step for every single document to catch any inconsistency"
    ],
    "correct": 1,
    "explanation": "The robust pattern here is standard distributed-systems practice: make the persistence step idempotent (e.g. an upsert keyed by a stable document identifier) and track processing state so a crash between the API call succeeding and the database write can be detected and safely retried without creating duplicates or silent gaps (B). Assuming API calls and database writes are atomically linked (A) is false — they are separate operations with a real gap where a crash can occur. Blindly re-running everything from scratch (C) doesn't address duplicate-detection and could reprocess (and potentially duplicate) already-completed work, or skip nothing meaningfully different from the original risk. Full manual review of every document (D) doesn't scale and isn't addressing the underlying reliability engineering problem."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface implements client-side message queuing so a user's rapid consecutive messages are sent to the backend one at a time, but discovers that under high server load, some messages get processed out of order because the backend uses multiple worker processes handling requests concurrently without any ordering guarantee.",
    "question": "What is the best fix to guarantee correct conversation ordering under concurrent backend processing?",
    "options": [
      "Give up on ordering guarantees entirely, since concurrency makes this impossible",
      "Serialize processing per-conversation (e.g. a per-conversation queue or lock) so that messages within the same conversation are always processed in the order they were received, even if different conversations are handled concurrently across workers",
      "Process all conversations across all users through a single single-threaded worker with no concurrency at all",
      "Randomly reorder messages before sending them so the disorder is at least intentional"
    ],
    "correct": 1,
    "explanation": "The correct fix is to serialize processing per-conversation (via a queue or lock keyed by conversation ID) while still allowing different conversations to be processed concurrently across workers — this preserves within-conversation ordering, which is what actually matters for the API's alternating message structure, without sacrificing overall system throughput (B). Giving up on ordering (A) accepts a real, fixable bug that will corrupt conversation coherence. Forcing a single-threaded worker for the entire system (C) sacrifices throughput and scalability far beyond what's needed to fix a per-conversation ordering issue. Deliberately randomizing message order (D) is nonsensical and actively worsens the exact problem being described."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants their production alerting to page an on-call engineer specifically when the error rate for Claude API calls crosses an abnormal threshold, but not for every single isolated transient error.",
    "question": "What is a sound approach to this alerting design?",
    "options": [
      "Page on-call for every single 429 or 529 error individually, no matter how brief",
      "Aggregate error rate over a rolling time window and alert only when it exceeds a defined threshold (e.g. more than X% of requests failing over 5 minutes), distinguishing sustained problems from normal transient blips already handled by retry logic",
      "Never alert on API errors at all, since retries handle everything",
      "Alert based on the total number of successful requests, ignoring errors entirely"
    ],
    "correct": 1,
    "explanation": "Rate-based alerting over a rolling window distinguishes a real, sustained problem worth waking someone up for from normal, expected transient errors that retry logic already absorbs — this is standard, sound monitoring design (B). Paging for every isolated transient error (A) would create alert fatigue for a completely expected, self-healing situation. Never alerting on errors at all (C) risks missing genuine sustained outages or bugs that retries can't fully mask. Alerting only on success counts while ignoring errors (D) misses a direct, important signal of degraded reliability."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an internal coding assistant wants to give Claude access to a company-internal API documentation search tool, but is unsure whether to fetch and pre-load all documentation into the system prompt versus exposing it as an on-demand search tool the model calls only when needed.",
    "question": "For a large, rarely-fully-needed documentation set, which approach is generally better and why?",
    "options": [
      "Pre-load the entire documentation set into the system prompt every time, since more context is always strictly better",
      "Expose it as an on-demand search tool, since the model can request only the specific relevant sections it needs per query, avoiding the cost and noise of always sending the entire (often irrelevant) documentation set",
      "Neither approach is technically possible with the Claude API",
      "Split the documentation into exactly two static halves and alternate between them randomly"
    ],
    "correct": 1,
    "explanation": "For a large reference corpus where most of the content is irrelevant to any single query, an on-demand search tool lets the model retrieve just the relevant sections as needed, which is both more cost-efficient and reduces the risk of irrelevant context diluting the model's focus, compared to always stuffing the entire corpus into every request (B). More context is not unconditionally better — irrelevant bulk content can add cost and even distract from the actual query, so (A) is a flawed assumption. Both static context inclusion and tool-based retrieval are fully supported patterns with this API, so (C) is false. Randomly alternating between arbitrary static halves (D) is an arbitrary, unprincipled strategy unrelated to actual query relevance."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a customer support bot wants to check if a response was cut off due to hitting the maximum output token limit, so they can decide whether to automatically request a continuation.",
    "question": "What check accomplishes this?",
    "options": [
      "Check if response.stop_reason equals 'max_tokens'",
      "Check if the response text is longer than 1000 characters",
      "Check if response.content is an empty array",
      "Check if the HTTP status code is 206"
    ],
    "correct": 0,
    "explanation": "stop_reason: 'max_tokens' is the explicit, documented signal that generation was cut off because the token limit was reached, making it the correct and reliable check for deciding whether to request a continuation (A). Response length in characters (B) has no defined relationship to whether truncation occurred — a naturally short complete response and a naturally short truncated one would both pass or fail this check unreliably. An empty content array (C) would indicate something else entirely, not standard truncation. The Messages API does not use HTTP 206 partial content semantics for this; the response is a normal 200 regardless of stop_reason (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface for a support tool wants the assistant to remember a user's name and preferred language across the conversation without re-asking every turn, but not necessarily across entirely separate conversations days apart.",
    "question": "What is the simplest correct implementation?",
    "options": [
      "Include the name and preferred language once early in the conversation history (e.g. as part of the first user turn or a system prompt), and continue resending the full growing conversation history — including that information — on each subsequent request within the same session",
      "Claude automatically remembers this information forever once mentioned, even in future unrelated conversations",
      "Store the name and language in a special persistent memory API that requires no further context in subsequent requests",
      "Ask the user to restate their name and language on every single message"
    ],
    "correct": 0,
    "explanation": "Because the API is stateless, simply having the name/language appear in the conversation history that gets resent on every subsequent request within the same session is sufficient for the model to 'remember' it for the rest of that conversation — no special mechanism is needed beyond normal message history management (A). Claude does not automatically retain information across genuinely separate conversations without the application re-supplying it, so claiming permanent automatic memory (B) is false for standard API usage. There's no such general persistent memory API where subsequent requests need zero context (C) — the standard building block is the resent messages array. Re-asking every message (D) is unnecessary and a poor user experience once the information is already in history."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants tool execution latency (e.g. an inventory check that takes 3-4 seconds) to not silently stall the whole conversation with no feedback while the user waits.",
    "question": "What is a good pattern to keep the user informed during a slow tool call?",
    "options": [
      "Show a UI indicator (like 'checking inventory...') while the tool executes on the backend, based on having received a tool_use content block, before the tool_result has been sent back and the final response streamed",
      "Do nothing and let the UI appear frozen until the tool call finishes",
      "Cancel any tool call that takes longer than 1 second automatically with no explanation",
      "Immediately show a fabricated placeholder answer while the real tool call runs in the background"
    ],
    "correct": 0,
    "explanation": "Since the application receives the tool_use block before it has executed the tool and sent back a tool_result, it can surface a specific, informative loading state ('checking inventory...') during that gap, giving the user real-time feedback about what's happening rather than an unexplained pause (A). Leaving the UI silently frozen (B) is a poor experience for anything beyond a near-instant tool call. Auto-canceling any call over an arbitrary 1-second threshold (C) would break legitimately slower but valid tool calls with no recovery path. Fabricating a placeholder answer (D) risks showing the user incorrect information before the real result is known, which is misleading."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool wants their retry logic to differentiate between a 400 error caused by exceeding the model's context window versus a 400 caused by a different validation issue (like an invalid parameter), so they can apply different recovery strategies for each.",
    "question": "What is a reasonable way to distinguish these programmatically?",
    "options": [
      "Inspect the error type/message field within the API's error response body, which distinguishes different invalid_request_error causes (like a context window overflow versus a bad parameter), rather than treating every 400 identically",
      "All 400 errors are functionally identical and require the exact same fix",
      "Only the HTTP status code matters; the error body never contains additional detail",
      "Assume every 400 error means the request should be retried unchanged"
    ],
    "correct": 0,
    "explanation": "The API's error response body includes structured detail beyond the bare status code — an error type and message — that can distinguish, for example, a context-window overflow from a different kind of validation error, letting the application apply the appropriate targeted recovery (like truncating input) for each case (A). Treating all 400s identically (B) discards useful information that would let the app respond more intelligently. The response body does carry meaningful additional detail beyond the status code alone, so ignoring it (C) throws away useful diagnostic information. A 400 indicates a client-side request problem that will typically fail identically on an unchanged retry, so blindly retrying without modification (D) is not a sound strategy."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an internal tool notices that a colleague added client-side code that catches every API error and automatically retries indefinitely with no upper bound on attempts, even for a 401 authentication error caused by an expired or revoked key.",
    "question": "What is wrong with this retry logic?",
    "options": [
      "Nothing is wrong; infinite retries are always safe and appropriate for any error type",
      "Authentication errors (401) are not transient and will not resolve simply by retrying; retrying indefinitely on a 401 wastes resources and delays actually fixing the underlying credential problem — retry logic should distinguish retryable (429, 5xx, 529) from non-retryable (400, 401, 403, 404) errors",
      "401 errors should be retried exactly 401 times as a rule of thumb",
      "The fix is to increase max_tokens whenever a 401 occurs"
    ],
    "correct": 1,
    "explanation": "A 401 indicates a fundamentally broken credential, which retrying will never fix on its own — the request will keep failing identically until the actual key problem is resolved, so indefinite retries here just waste resources and mask the real issue instead of surfacing it for a fix (B). Blanket infinite retries are not universally safe, since they're inappropriate for permanent, non-transient failures like this (A). There's no such numerological convention tying retry count to the status code number (C). max_tokens is unrelated to authentication and has no bearing on fixing a credential problem (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a chat interface for a support tool wants to render each assistant response as it streams, but also needs the complete, final message object (with full content and usage info) once streaming ends, without manually re-assembling deltas by hand.",
    "question": "What SDK feature commonly provides this?",
    "options": [
      "A helper method on the streaming object (such as get_final_message() / finalMessage()) that returns the fully assembled message once the stream completes, handling accumulation internally",
      "The developer must always manually concatenate every delta themselves; no SDK helper exists for this",
      "The final message can only be obtained by making a second, separate non-streaming API call after the stream finishes",
      "Streaming responses never include usage information, so a manual token count is required afterward"
    ],
    "correct": 0,
    "explanation": "Anthropic's SDKs commonly provide a helper (like get_final_message() in Python or finalMessage() in TypeScript) that internally accumulates the streamed deltas and returns the complete final Message object, including usage, once the stream is done — this avoids manual reassembly (A). This built-in convenience exists specifically to avoid requiring developers to do that accumulation themselves, so (B) is false. No second API call is needed to obtain the final assembled message from a stream that's already been consumed (C). Usage information is included as part of the streamed events (message_start/message_delta) and thus is available in the final assembled message too, so (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool for academic literature review wants each generated summary to include inline references to which source passage supported each claim, verifiable against the original uploaded PDFs.",
    "question": "Which feature combination is most appropriate?",
    "options": [
      "Enable citations on the document content blocks so responses include structured citation metadata tying claims to specific source locations",
      "Ask the model to include page numbers from memory with no supporting feature enabled",
      "Manually cross-reference every sentence against the PDF text using string search after the fact",
      "This kind of verifiable sourcing is not achievable with the Claude API"
    ],
    "correct": 0,
    "explanation": "Enabling the citations feature on document content blocks is purpose-built for exactly this: the API returns structured citation data linking specific claims in the response to specific locations in the source document, giving verifiable provenance (A). Asking the model to recall page numbers from memory with no structural support (B) is unreliable and prone to hallucinated citations. Manual post-hoc string matching (C) is a workaround with much weaker guarantees than the native citations feature and adds significant engineering overhead. This capability is directly supported by the API, so (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A team runs a customer support bot in production and observes that during a genuine, sustained Anthropic-side outage, all their retry attempts across thousands of concurrent user sessions eventually exhaust and fail, and users see raw error messages. Post-incident review reveals there was no fallback experience defined for this case at all.",
    "question": "What should be added to prevent this exact failure mode in the future?",
    "options": [
      "A graceful degradation path — e.g. a clear, friendly message explaining the assistant is temporarily unavailable, an option to submit the request for later processing, or routing to a human-staffed channel — triggered once retries are exhausted, rather than surfacing raw errors to end users",
      "A larger max_retries value so retries never actually exhaust",
      "A second, redundant copy of the exact same integration calling the exact same Claude API as a fallback",
      "Nothing needs to change, since sustained outages are rare and acceptable to leave unhandled"
    ],
    "correct": 0,
    "explanation": "The real gap is the absence of a defined degraded-mode user experience for when retries are genuinely exhausted during a sustained outage — adding a clear, friendly fallback message and/or an alternate path (queuing, human handoff) directly closes that gap and prevents raw errors from reaching end users (A). Simply raising max_retries (B) delays the same ultimate failure during a sustained outage rather than solving the lack of a fallback experience, and can make requests hang longer without addressing the real gap. A redundant integration calling the same underlying API (C) doesn't provide any real redundancy since it depends on the same provider being down. Dismissing this as acceptable to leave unhandled (D) ignores a clear, observed customer-facing failure that's straightforward to mitigate."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a content generation pipeline for blog posts wants to control how much the model varies its phrasing across multiple generations of similar prompts, while keeping the same model and prompt.",
    "question": "Which parameter most directly controls this variability?",
    "options": [
      "max_tokens",
      "temperature",
      "top_k only, since temperature has no effect on variability",
      "The system prompt length"
    ],
    "correct": 1,
    "explanation": "temperature is the primary sampling parameter that controls output randomness/variability — lower values produce more consistent, focused output and higher values produce more varied phrasing (B). max_tokens (A) only caps output length, not variability. temperature does have a direct, well-documented effect on variability, so dismissing it in favor of top_k alone (C) is incorrect. System prompt length (D) affects context and instructions, not the sampling randomness itself."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a voice assistant backend wants to reduce latency by avoiding an extra round trip: they want the very first chunk of audio synthesis to begin before the entire text response has been generated.",
    "question": "How does streaming enable this specific optimization?",
    "options": [
      "It doesn't — text-to-speech synthesis can only ever begin after the full text response is available",
      "Streaming delivers text incrementally via content_block_delta events, so the app can begin feeding completed sentence or clause fragments into text-to-speech as soon as they arrive, rather than waiting for the full message",
      "Streaming requires the text-to-speech engine to run on Anthropic's own infrastructure",
      "Streaming only works for image content, not text"
    ],
    "correct": 1,
    "explanation": "Streaming exposes text incrementally, letting the application pipe completed fragments (e.g. full sentences) to a text-to-speech engine as soon as they're available instead of waiting for the entire response to finish generating, directly reducing time-to-first-audio (B). This optimization is precisely what streaming enables, so claiming it's impossible (A) is wrong. Text-to-speech remains entirely the application's own responsibility and runs wherever the app chooses — Anthropic's API has nothing to do with audio synthesis (C). Streaming applies broadly to text output, not just to image-related content (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants to rotate their production API key on a schedule without any downtime, given that traffic is constant and the key can't simply be swapped instantaneously across every running server process.",
    "question": "What is a safe rotation strategy?",
    "options": [
      "Create a new key, deploy it to a subset of servers first while the old key remains valid, verify success, then finish rolling it out everywhere before finally revoking the old key — rather than revoking the old key before the new one is fully deployed",
      "Revoke the old key immediately, then create the new key and deploy it afterward",
      "Rotate keys only once a year regardless of any security concerns",
      "Share the new key with the old key holder over an unencrypted channel to save time"
    ],
    "correct": 0,
    "explanation": "Safe zero-downtime rotation follows an overlap pattern: issue the new key while the old one is still valid, roll it out gradually and verify it works, and only revoke the old key once the new one is confirmed live everywhere — this avoids any window where servers have no valid credential (A). Revoking the old key first (B) creates an outage window for any server not yet updated with the new key. An arbitrary fixed annual cadence with no other consideration (C) ignores that rotation should also happen promptly in response to suspected exposure, not just on a rigid schedule. Sharing a secret over an unencrypted channel (D) undermines the security purpose of rotation in the first place."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a document Q&A tool for insurance claims wants to send both a scanned claim form (image) and a typed claims-history PDF in the same request, with the same accompanying question.",
    "question": "Is this combination supported, and how should it be structured?",
    "options": [
      "No — a single request can only contain one type of media, either an image or a document, never both",
      "Yes — the user message's content array can include multiple content blocks of different types (image and document) alongside the text question, all in one request",
      "Only if the image is first converted to a PDF and merged into a single file",
      "Only by sending two completely separate API requests and manually combining the two answers"
    ],
    "correct": 1,
    "explanation": "A single user message's content array can contain multiple content blocks of different types — images, documents, and text — combined in one request, letting Claude reason over multiple pieces of multimodal input together (B). There's no such restriction limiting a request to only one media type (A). Merging everything into a single PDF (C) is unnecessary extra work when mixed content blocks are natively supported. Splitting into two separate requests (D) would prevent Claude from reasoning jointly across both documents in the same context, which is worse for a question that may depend on both."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a structured data extraction service defines a JSON schema for extracting invoice line items but is unsure whether to enforce it via a tool's strict input schema versus relying purely on prompt instructions describing the desired JSON shape.",
    "question": "What is the key reliability difference between these two approaches?",
    "options": [
      "There is no difference; both approaches produce identical reliability guarantees",
      "A strict, schema-validated tool (or structured output configuration) constrains the model's output to conform to the schema, while prompt-only instructions are a much weaker, best-effort nudge that can still produce malformed or incomplete JSON",
      "Prompt-only instructions are always more reliable than schema-based approaches",
      "Schemas can only be used with image inputs, not text extraction tasks"
    ],
    "correct": 1,
    "explanation": "Schema-constrained approaches (a strict tool schema or structured output configuration) actively constrain what the model can produce to match the defined shape, providing much stronger reliability guarantees than prompt-only instructions, which are a softer suggestion the model can still deviate from (B). These two approaches are not equivalent in reliability, so (A) is false. Prompt-only instructions being 'always more reliable' (C) reverses the actual relationship. Schema constraints apply generally to structured output tasks regardless of whether images are involved, so restricting them to image inputs only (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tooling dashboard is deciding what to include in a health-check endpoint that verifies their Claude-powered feature is functioning correctly before routing production traffic to a newly deployed instance.",
    "question": "What is a reasonable health check for this purpose?",
    "options": [
      "Make a minimal, low-cost API call (e.g. a small request with a trivial prompt) and verify a successful response is returned within an expected time, confirming connectivity, authentication, and basic functionality",
      "Skip health checks entirely for any feature that depends on an external API",
      "Check only that the deployment process itself completed, with no runtime verification",
      "Make an extremely large, expensive request as the health check to maximize confidence"
    ],
    "correct": 0,
    "explanation": "A lightweight, low-cost real API call is a practical health check: it verifies the credential works, the network path is open, and the API is reachable and responsive, without meaningfully adding to cost (A). Skipping health checks for external dependencies (B) leaves a real, common failure mode (broken auth, network issues) undetected until real user traffic hits it. Checking only that deployment completed (C) doesn't verify the actual runtime dependency is functioning. Using an expensive request as a routine health check (D) adds unnecessary cost without providing meaningfully better verification than a minimal one."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer new to the Claude API is confused about the difference between the 'system' parameter and the first message in the 'messages' array.",
    "question": "What is the correct distinction?",
    "options": [
      "They are identical and interchangeable in every way",
      "The system parameter sets overall behavior, persona, and instructions for the assistant and is separate from the messages array; the messages array holds the actual back-and-forth conversation turns, and its first entry must have role 'user'",
      "The system parameter is where the first user question goes",
      "The system parameter is deprecated and should never be used"
    ],
    "correct": 1,
    "explanation": "The system parameter is a distinct, top-level field used to set the assistant's overall behavior, persona, and instructions, separate from the messages array, which holds the actual conversational exchange and must start with a user-role message (B). They serve different purposes and aren't interchangeable (A). The first user question belongs in the messages array as a user message, not in the system parameter (C). The system parameter is an actively supported, commonly used part of the API, not deprecated (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot notices that when a tool_use block is followed by an error during execution, and they forget to include a matching tool_result for that specific tool_use_id in the next message, the following API call fails with a 400 error.",
    "question": "Why does this happen?",
    "options": [
      "The API requires every tool_use block to be matched by a corresponding tool_result block with the same tool_use_id before the conversation can continue; omitting it produces an invalid, unbalanced conversation structure",
      "This is unrelated to tool_use and is actually a random, unexplained bug",
      "tool_result blocks are entirely optional and this error is caused by something else",
      "The fix is to simply omit the assistant's tool_use message from history instead"
    ],
    "correct": 0,
    "explanation": "The API enforces that every tool_use block in an assistant turn must be answered by a corresponding tool_result (matched by tool_use_id) in the next user turn before the conversation can proceed; skipping this leaves an unbalanced structure that triggers a 400 error (A). This is a specific, well-defined structural requirement, not a random bug (B). tool_result blocks are required to complete a tool_use, not optional (C). Omitting the tool_use message from history (D) would also break the model's understanding of what it previously did, and doesn't correctly fix the balanced tool_use/tool_result requirement — the actual fix is to include the matching tool_result."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool wants to send several PDFs from a legal case to Claude at once so it can synthesize an answer that draws on all of them together, and needs to distinguish which claims came from which document in the response.",
    "question": "What API features support answering across multiple documents with per-document attribution?",
    "options": [
      "Including multiple document content blocks in one message, each with a distinct title, combined with citations enabled on each, so responses can be traced back to the specific source document",
      "Only one document can ever be included per request, so the documents must be processed and answered about entirely separately",
      "Document titles are not supported by the API",
      "There is no way to know which document a piece of text in the response came from"
    ],
    "correct": 0,
    "explanation": "Multiple document content blocks can be included in a single message, each optionally given a distinct title, and enabling citations lets the response reference specific source locations — together this supports synthesizing across several documents while still attributing claims to the correct one (A). Multiple documents per request are supported, so restricting to one document total (B) is false. Document blocks do support an optional title field (C). Citations provide exactly the per-source attribution mechanism the scenario needs, so claiming it's impossible to know source attribution (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a production content generation pipeline for a marketing team runs 200,000 generations per month through the standard synchronous endpoint. A cost review reveals the vast majority of generations reuse the exact same 3,000-token brand style guide and product catalog excerpt as the system prompt on every single call, with only a short unique product description varying each time.",
    "question": "What single change would most reduce cost here without changing model or output quality?",
    "options": [
      "Switch every request to use extended thinking to improve quality",
      "Apply prompt caching to the shared 3,000-token style guide/catalog prefix, so it's only fully billed on the first request and served from cache at a fraction of the cost on the other 199,999+ calls that share the identical prefix",
      "Delete the style guide from the prompt entirely to save tokens, accepting a quality regression",
      "Move the entire workload to the Batches API, since batching alone reduces the cost of any repeated content"
    ],
    "correct": 1,
    "explanation": "This is precisely the scenario prompt caching is built for: a large, unchanging prefix shared across a huge volume of otherwise-varying requests — caching it means only the first request pays full price for that prefix, with subsequent calls reading it from cache at a much lower rate, directly cutting cost at scale with zero quality tradeoff (B). Adding extended thinking (A) increases cost and doesn't address the redundant repeated context problem at all. Deleting the style guide (C) explicitly sacrifices output quality/brand consistency, which the question says to avoid. The Batches API's discount applies to overall processing, not specifically to deduplicating a repeated prompt prefix the way caching does — it doesn't eliminate the redundant token cost from re-sending the same context on every request (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface displays a distinct 'Claude is using a tool' indicator whenever a tool_use block appears, but currently detects this only after the entire (non-streaming) response has returned, meaning the indicator and the tool execution both happen only after a delay.",
    "question": "How could switching to streaming improve this specific behavior?",
    "options": [
      "Streaming would make no difference, since tool_use detection always requires the full response",
      "With streaming, a content_block_start event with a tool_use type content_block arrives as soon as the model begins that block, letting the UI show the 'using a tool' indicator earlier, before the full response (or full tool input) has finished streaming",
      "Streaming disables tool use entirely, so this scenario would not apply",
      "Tool use indicators can only be shown after the tool has already finished executing"
    ],
    "correct": 1,
    "explanation": "With streaming, a content_block_start event fires as soon as a new content block begins, including one of type tool_use — this lets the application detect and surface a 'using a tool' indicator earlier than waiting for the entire non-streaming response to complete (B). This is a real, meaningful improvement streaming provides, so claiming no difference (A) is incorrect. Tool use is fully compatible with streaming, not disabled by it (C). The indicator can and should be shown as soon as the tool_use is detected, well before the tool has actually finished executing — that's the whole point of showing a 'using a tool' status during the wait (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants to protect against a scenario where a bug in their own code accidentally sends thousands of duplicate requests per minute for a single user session, potentially running up a large, unexpected bill before anyone notices.",
    "question": "What safeguard best addresses this specific risk?",
    "options": [
      "Trust that the Anthropic account-level rate limits alone will always catch and fully prevent any cost overrun from application bugs",
      "Implement application-level safeguards such as per-user/session request-rate limiting, budget alerts or hard spend caps, and deduplication logic, rather than relying solely on the provider's account-level rate limits to catch buggy request patterns",
      "Remove all automated retry logic so bugs are more visible to users immediately",
      "Increase max_tokens so each request costs more but there are fewer of them"
    ],
    "correct": 1,
    "explanation": "The right defense-in-depth approach is application-level safeguards purpose-built for this exact failure mode: per-user or per-session rate limiting, cost/budget alerting or hard caps, and deduplication logic — these catch bugs specific to the application's own behavior that account-level provider limits weren't designed to fully prevent (B). Account-level rate limits exist mainly to protect Anthropic's infrastructure and may not kick in fast enough (or at a granular enough level) to stop a costly per-user bug, so relying on them alone (A) is insufficient. Removing retry logic (C) doesn't address a runaway request-generation bug and could make legitimate transient-error recovery worse. Increasing max_tokens (D) would make the problem more expensive per request, not less, and doesn't address the actual runaway-request-count issue."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a data extraction service wants their code to fail fast and clearly when the wrong model name (a typo) is passed to the API, rather than the request hanging or silently defaulting to something else.",
    "question": "What should the developer expect to happen with an invalid model name?",
    "options": [
      "The API automatically substitutes the closest valid model name and proceeds",
      "The API returns a 404 not_found_error (or similar), since the referenced model does not exist",
      "The request hangs indefinitely with no response",
      "The API defaults silently to the cheapest available model"
    ],
    "correct": 1,
    "explanation": "Requesting a model ID that doesn't exist (e.g. a typo) results in an explicit not_found-style error rather than silent behavior, letting the developer catch and fix the mistake quickly (B). The API does not guess and silently substitute a 'closest' valid model name on the developer's behalf (A). It does not hang indefinitely — it returns a clear error response (C). There's no silent fallback to a different, cheaper model when an invalid model string is supplied (D) — that would be a surprising, undocumented, and unsafe behavior the API does not exhibit."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal analytics tool that generates weekly reports wants the pipeline to run unattended overnight and be resilient if it's mid-generation when the scheduled job's time-box expires and the process is forcibly killed.",
    "question": "What design choice best supports resilience to abrupt process termination?",
    "options": [
      "Persist enough state (e.g. which report sections have completed) incrementally as the pipeline progresses, so a restart can resume from the last completed step rather than starting the entire multi-hour job over from scratch",
      "Assume the job will never be killed mid-run, so no special handling is needed",
      "Always restart the entire job from the very first step on any interruption, regardless of how much progress had been made",
      "Run the job with no logging so it completes faster and is less likely to be killed"
    ],
    "correct": 0,
    "explanation": "Incrementally persisting progress (e.g. per-section completion state) allows the job to resume from where it left off after an unexpected termination, avoiding wasted work and cost from redoing already-completed generation (A). Assuming termination will never happen (B) is an unsafe assumption for any unattended, long-running overnight job. Always restarting from scratch (C) is a valid but wasteful fallback compared to resumable checkpointing, especially for a multi-hour job. Removing logging (D) doesn't meaningfully reduce the chance of being killed and sacrifices visibility needed to debug failures."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot for a company operating in the EU needs to ensure conversation data sent to the Claude API and any resulting stored transcripts comply with data protection requirements around user consent and data minimization.",
    "question": "What is a reasonable engineering practice supporting this compliance goal?",
    "options": [
      "Send the user's entire account history and every piece of collected personal data with every single request 'just in case' it's useful",
      "Only include the minimum necessary user data in each request/context needed to answer the current query, and avoid persisting more conversation history than is actually required for the product's functioning and stated retention policy",
      "Ignore data minimization concerns entirely, since the API provider is solely responsible for compliance",
      "Store all data forever with no policy, since deletion could be seen as evidence tampering"
    ],
    "correct": 1,
    "explanation": "Data minimization — including only what's actually necessary for the current request and retaining only what the stated policy requires — is a core engineering practice supporting data protection compliance, and it also reduces the blast radius if anything is compromised (B). Sending all available personal data indiscriminately 'just in case' (A) directly conflicts with data minimization principles. Compliance responsibility is shared between the platform provider and the application developer processing personal data, so treating it as solely the provider's concern (C) is a misunderstanding of typical data protection frameworks. Storing everything forever with no retention policy (D) is generally the opposite of what data protection regulations require, and the reasoning about deletion and evidence tampering doesn't reflect standard data retention practice for routine business data."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a coding assistant wants to give Claude the ability to read files from a user's local project directory as a tool, but is concerned about a malicious or buggy prompt causing the tool to read files far outside the intended project folder (like /etc/passwd).",
    "question": "What is the best mitigation in the tool's implementation?",
    "options": [
      "Trust the model to never request an out-of-scope path, since it has been trained to behave safely",
      "In the tool's handler code, validate and restrict the resolved file path to stay within an allow-listed project directory, rejecting any path that resolves outside of it, regardless of what the model requests",
      "Give the tool unrestricted filesystem access, since restricting it would limit its usefulness",
      "Only check the file extension of the requested path, since that fully prevents path traversal"
    ],
    "correct": 1,
    "explanation": "Because the model's output (including requested file paths) should be treated as untrusted input, the tool's own handler code must enforce a hard boundary — resolving the path and verifying it falls within an allow-listed directory before performing any file operation, rejecting anything outside it regardless of the model's request (B). Trusting the model alone to never go out of scope (A) is not a real security boundary; models can be manipulated or make mistakes, so the application must enforce constraints itself. Deliberately giving unrestricted filesystem access (C) creates a serious security risk for a local file-reading tool. Checking only the file extension (D) does nothing to prevent path traversal attacks like '../../etc/passwd', which can have any extension or none."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer is comparing the 429 rate_limit_error and the 529 overloaded_error responses from the Claude API.",
    "question": "What is the key distinction between these two error types?",
    "options": [
      "They are the same error with two different names",
      "429 means the caller's own account-specific rate limit was exceeded; 529 generally indicates the API is experiencing high overall demand/capacity constraints unrelated to any single caller's specific limit",
      "429 only applies to streaming requests, and 529 only applies to non-streaming requests",
      "529 means the API key is invalid"
    ],
    "correct": 1,
    "explanation": "429 (rate_limit_error) reflects the caller exceeding their own account's specific rate limits (RPM/TPM/etc.), while 529 (overloaded_error) generally reflects broader service-level capacity constraints affecting availability regardless of any individual caller's limits (B). These are documented as distinct error types with different causes, not simply two names for the same thing (A). Neither error is restricted to only streaming or only non-streaming requests — both can occur in either mode (C). An invalid API key produces a 401 authentication error, not a 529 (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a chat interface for a customer support product wants to let users edit a previously sent message and regenerate the assistant's response from that point, discarding everything that came after the edited message.",
    "question": "What is the correct way to implement this against the stateless API?",
    "options": [
      "Truncate the stored messages array to end right after the edited user message (replacing its old content with the new text), then send that modified, shorter array as the new conversation history to generate a fresh assistant response",
      "Send the full original, unedited history plus the new edited text appended at the very end as an additional new turn",
      "This feature is not implementable because the API remembers the original message server-side",
      "Ask the user to manually start an entirely new conversation instead of supporting message editing"
    ],
    "correct": 0,
    "explanation": "Since the API is stateless, editing-and-regenerating is implemented purely at the application layer: truncate the stored history at the edited message, replace its content, and send that as the new, shorter conversation to get a fresh response as if the conversation had gone that way from the start (A). Appending the edited text at the end while keeping the entire original later history (B) would confusingly include the now-irrelevant original follow-up turns and responses, not achieve the described 'discard everything after' behavior. The API has no server-side memory of prior messages, so there's nothing to 'remember' that would block this (C). This is a well-supported, common chat UI pattern that doesn't require forcing users into brand new conversations (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to send the same base request to two different models (a fast, cheap model and a more capable model) to A/B test response quality, and is deciding whether prompt caching benefits would carry over between the two different model calls for the same cached content.",
    "question": "What is true about caching in this cross-model scenario?",
    "options": [
      "Cache entries are shared globally across all models, so caching the prompt once benefits both models equally",
      "Prompt caches are generally scoped per-model, so switching models means the cached prefix will not be reused between the two different model calls — each will need its own cache entry",
      "Caching is entirely disabled whenever more than one model is used within an application",
      "Only the more expensive model can use cached content; the cheaper model always processes everything fresh"
    ],
    "correct": 1,
    "explanation": "Prompt caches are scoped to a specific model, so a cache entry created for one model is not available when a different model is called with what looks like the same prefix — each model requires its own cache to be warmed independently (B). There's no global, cross-model cache sharing (A). Using multiple models within the same broader application doesn't disable caching altogether — it simply means each model maintains separate cache state (C). There's no such restriction limiting caching to only the more expensive model — caching works per-model regardless of relative cost tier (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an e-commerce assistant wants Claude to call a place_order tool but is worried about a scenario where the model, due to a misunderstanding, calls the tool with an unusually large quantity (e.g. 10,000 units) that no legitimate customer request would produce.",
    "question": "Where should protection against this kind of erroneous tool call be enforced?",
    "options": [
      "Solely in the system prompt, instructing the model never to place large orders, with no other safeguard",
      "In the tool's own handler/backend logic, applying sane bounds checking (e.g. rejecting or flagging quantities above a reasonable threshold) regardless of what the model requests, since the model's output should not be the only line of defense for business-critical actions",
      "Nowhere — this scenario cannot realistically occur",
      "Only in the frontend UI, trusting that the backend tool handler will always receive safe input"
    ],
    "correct": 1,
    "explanation": "For a business-critical, potentially costly action like placing an order, the tool's own backend logic should independently enforce sane bounds and validation, since prompt instructions alone are a soft guardrail that models can still deviate from — defense should not rely on the model's output being trustworthy by default (B). Relying solely on a prompt instruction with no code-level safeguard (A) is insufficient for a business-critical action. This kind of erroneous or unexpected tool input is a real, well-documented risk in tool-use systems, not a non-issue (C). Frontend-only validation (D) can be bypassed since the tool handler is invoked directly by the backend based on the model's request, not necessarily gated by frontend UI logic."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot for a subscription service wants to log, for every conversation, whether the interaction resulted in the user achieving their goal (e.g. successfully resolving their issue) versus escalating to a human, as a key product metric — not something the raw API response gives them.",
    "question": "How should this business-level metric be captured?",
    "options": [
      "Assume the Claude API automatically tracks and reports business outcome metrics like resolution rate",
      "Instrument the application itself to track this outcome (e.g. based on whether an escalation tool was called, explicit user feedback, or a follow-up classification step), since this is product-specific business logic the API has no visibility into",
      "This metric cannot be measured at all in a Claude-powered application",
      "Rely entirely on the Anthropic Console's usage dashboard for this metric"
    ],
    "correct": 1,
    "explanation": "Business-specific outcome metrics like resolution rate are product logic the application must define and track itself — for example, by observing whether an escalation tool was invoked, capturing explicit user feedback, or running a follow-up classification pass — since the API has no inherent concept of 'was this resolved successfully' (B). The Claude API doesn't automatically compute or report product-specific business outcomes (A). This is a very achievable, common pattern in production Claude-powered products, so claiming it's unmeasurable (C) is false. The Anthropic Console reports on API usage (tokens, requests, cost), not application-specific business outcomes, so relying on it for this metric (D) would not actually provide the needed data."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a customer support bot wants to know whether a given response was influenced by web search or another server-side tool the assistant used, purely by inspecting the response object.",
    "question": "How can this be determined?",
    "options": [
      "By inspecting the response's content array for server-side tool result content blocks (e.g. a web search result block), which indicate that tool was actually used for this response",
      "There is no way to tell after the fact whether a server-side tool was used",
      "By checking whether the response text is longer than usual",
      "By checking the HTTP response headers for a special 'tool-used' flag"
    ],
    "correct": 0,
    "explanation": "When a server-side tool like web search is used, the response's content array includes distinct result-type content blocks specific to that tool, which is a direct, reliable signal that it was actually invoked for that response (A). This information is directly observable in the response structure, so (B) is false. Response length has no defined, reliable relationship to whether a tool was used (C). There is no such standard HTTP header convention for this — the signal lives in the structured response body content, not response headers (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants their frontend to handle the case where the WebSocket or SSE connection to their own backend drops mid-stream (e.g. user's wifi blips), without losing the partial response already received or duplicating it on reconnect.",
    "question": "What is a reasonable client-side approach?",
    "options": [
      "Discard any partial response on disconnect and start the entire request over from scratch every single time, regardless of how much was already received",
      "Preserve the partially received text in the UI, attempt to reconnect, and — depending on backend support — either resume receiving remaining content or clearly indicate the response was interrupted and offer a retry, rather than silently duplicating or losing what was already shown",
      "Ignore connection drops entirely; the browser will always recover automatically with no application logic",
      "Immediately show an error and clear the entire chat history on any disconnect"
    ],
    "correct": 1,
    "explanation": "The best client-side handling preserves what's already been displayed, attempts reconnection, and gives the user clear, honest feedback if the response was interrupted (with a retry option), rather than either silently losing progress or duplicating content (B). Always restarting from scratch (A) is wasteful and can duplicate content already shown to the user if not handled carefully. Browsers do not automatically and transparently recover application-level streaming state on their own — the application must handle this explicitly (C). Clearing the entire chat history on any transient disconnect (D) is a jarring, destructive user experience for what may be a brief, recoverable network blip."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a data extraction service that pulls structured fields from scanned invoices notices that occasionally the model returns a JSON object matching the schema but with an obviously wrong value (e.g. a total of $0.00 when line items clearly sum to $450), a case a strict JSON schema alone can't catch.",
    "question": "What additional safeguard best addresses this class of error?",
    "options": [
      "Nothing further is needed; schema validation alone is sufficient for accuracy",
      "Add application-level business-logic validation after schema validation (e.g. checking that the total roughly matches the sum of line items) and flag or reject results that fail a sanity check, since schema conformance guarantees shape but not semantic correctness",
      "Increase max_tokens, since token limits cause this kind of error",
      "Switch to a lower temperature exclusively, since this alone guarantees numerically correct totals"
    ],
    "correct": 1,
    "explanation": "Schema validation only guarantees the output has the right shape and types — it says nothing about whether the actual values are semantically correct, so a separate business-logic sanity check (like verifying the total is consistent with line items) is needed to catch this class of error (B). Claiming schema validation alone is sufficient (A) ignores exactly the failure mode described in the scenario. max_tokens controls length, not numerical correctness of extracted values, so it's unrelated to this specific failure (C). Lowering temperature can improve consistency somewhat but does not guarantee correct arithmetic or semantic accuracy on its own, so treating it as a full guarantee (D) overstates what it actually provides."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool for engineers wants to build a small library wrapper around the Anthropic SDK that all internal teams use, so cost tracking, retry policy, and logging are consistent across every team's Claude-powered feature.",
    "question": "What is a good architectural reason for building this shared wrapper rather than letting each team call the SDK directly?",
    "options": [
      "It has no real benefit; every team should implement their own retry logic and logging independently",
      "Centralizing cross-cutting concerns like retry policy, cost tracking, and logging in one shared wrapper avoids duplicated, inconsistent implementations across teams and makes company-wide changes (like adjusting backoff strategy) a single update instead of many",
      "The Anthropic SDK cannot be used directly by more than one team in the same company",
      "A shared wrapper is only useful for authentication and has no other benefit"
    ],
    "correct": 1,
    "explanation": "A shared internal wrapper centralizes cross-cutting concerns — consistent retry/backoff behavior, cost tracking, and logging — so a company-wide policy change (like adjusting the backoff strategy) is a single update rather than needing to be replicated correctly across every team's separate implementation (B). This pattern has clear, real organizational benefits, so dismissing it (A) misses standard software engineering practice for shared infrastructure concerns. There's no technical restriction preventing multiple teams within the same company from using the SDK directly (C). The benefits extend well beyond authentication alone to include retries, observability, and cost governance (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a chat interface wants to know which content block type in a response represents the model's normal, user-facing textual reply (as opposed to tool calls or thinking).",
    "question": "Which type is this?",
    "options": [
      "'text'",
      "'tool_use'",
      "'thinking'",
      "'tool_result'"
    ],
    "correct": 0,
    "explanation": "The 'text' content block type carries the model's ordinary, user-facing textual output — this is the type an application typically renders as the assistant's visible message (A). 'tool_use' (B) represents a request from the model to call a tool, not user-facing prose. 'thinking' (C) represents the model's internal reasoning content when extended thinking is enabled, which is typically shown differently (or not shown) rather than as the main reply. 'tool_result' (D) is actually a block type sent by the application back to the model in a user turn, representing the outcome of a tool call — it doesn't appear as model output at all."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot deploys a new version of their system prompt to production without any staged rollout, and within an hour, support tickets spike because the new prompt caused Claude to give incorrect refund policy information.",
    "question": "What process change would have caught this before full rollout?",
    "options": [
      "Nothing could have prevented this; prompt changes cannot realistically be tested before production",
      "Test prompt changes against a representative evaluation set (including known edge cases like refund policy questions) before deployment, and consider a staged/canary rollout to a small percentage of traffic first, monitoring for regressions before rolling out to everyone",
      "Never change the system prompt again after the initial launch",
      "Deploy all future prompt changes directly to 100% of production traffic immediately, since staged rollouts add unnecessary complexity"
    ],
    "correct": 1,
    "explanation": "The standard mitigation is proper testing (an evaluation set covering known important cases like refund policy) combined with a staged or canary rollout that limits blast radius and allows monitoring before a change reaches all users — this is exactly the kind of regression a good pre-deployment process is meant to catch (B). Prompt changes absolutely can and should be tested before shipping, so claiming it's unpreventable (A) is incorrect. Freezing the prompt forever (C) is an overcorrection that prevents legitimate future improvements. Deploying every future change to 100% of traffic immediately (D) is precisely the risky practice that caused this incident in the first place."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool wants to let users download the full conversation transcript as a formatted document (e.g. a Markdown or PDF export) after their chat session ends.",
    "question": "What is the most straightforward way to implement this export feature?",
    "options": [
      "Use the application's already-persisted messages array (the same data used to reconstruct conversation history) to generate the export document, rather than trying to re-query the Claude API for historical conversation content",
      "Call the Claude API again asking it to 'remember and output the entire past conversation', since it retains this automatically",
      "This feature is impossible to build because API responses cannot be reused after the fact",
      "Ask the user to manually copy and paste every message individually"
    ],
    "correct": 0,
    "explanation": "Since the application already persists the messages array to maintain conversation state (a requirement for the stateless API to work at all), that same stored data is the natural, straightforward source for generating an export document — no additional API calls needed (A). Asking the model to 'remember and output' history it was never resent (B) wouldn't work reliably, since Claude has no persistent memory of past API calls outside of what's included in the request. This is a very achievable feature built entirely from data the application already has, so (C) is false. Manual copy-paste (D) is a poor, avoidable user experience compared to building a proper export feature."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a production customer support bot integrates with a downstream ticketing system (e.g. creating a Zendesk ticket) via a create_ticket tool. During a load test, they discover that when the ticketing system's API is slow (10+ seconds) or briefly down, the entire Claude conversation appears frozen with no way for the user to do anything else, since the tool_use loop is blocking end-to-end on that call.",
    "question": "What is the best architectural fix?",
    "options": [
      "Accept the blocking behavior as unavoidable, since tool execution must always be synchronous",
      "Apply a reasonable timeout to the downstream ticketing call within the tool handler, and if it's exceeded, return a tool_result (possibly is_error: true, or a 'still processing' status) so the conversation can continue rather than hang indefinitely on a slow external dependency",
      "Remove the create_ticket tool entirely so this situation never arises",
      "Increase the Claude API's max_tokens to force the ticketing system to respond faster"
    ],
    "correct": 1,
    "explanation": "The correct fix is to bound the tool handler's dependency on the slow external system with a timeout, and handle the timeout case explicitly (an error tool_result, or a status indicating the action is still processing asynchronously) so the conversation isn't held hostage by a single slow downstream call — this decouples Claude conversation responsiveness from unrelated external system latency (B). Blocking indefinitely is not an inherent requirement of tool use — tool handlers are the application's own code and can and should apply sensible timeouts (A). Removing the tool (C) eliminates useful functionality rather than fixing the actual reliability problem. max_tokens is an Anthropic API parameter controlling output length and has no effect whatsoever on an unrelated third-party ticketing system's response time (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a bank needs to ensure that under no circumstances does a user's full credit card number appear in application logs, even though it might appear in the conversation if a user pastes it in by mistake.",
    "question": "What is the most robust way to prevent this?",
    "options": [
      "Trust that users will never paste sensitive numbers into chat",
      "Apply a redaction/masking step (e.g. pattern-matching for card-number-like sequences) to both stored conversation data and any logs before they're written or displayed, in addition to instructing the model not to echo such data back",
      "Only redact data in logs that are older than 90 days",
      "Rely solely on a system prompt instruction telling Claude not to store credit card numbers"
    ],
    "correct": 1,
    "explanation": "The robust approach combines a technical safeguard — a redaction/masking layer applied to logs and stored data (e.g. via pattern matching for card-number-like sequences) — with a model instruction, rather than relying on either alone, since users pasting sensitive data is a realistic, foreseeable event that shouldn't be handled purely by hoping it doesn't happen (B). Assuming users will never make this mistake (A) is an unsafe assumption for a real production system handling financial data. Redacting only logs older than 90 days (C) leaves the sensitive data exposed in current/recent logs, which is exactly when it's most likely to be accessed or leaked. Relying solely on a prompt instruction not to echo the data back (D) does nothing to prevent the original pasted number from being captured and stored in logs in the first place, since the instruction affects only what Claude generates, not what the application logs from the user's own input."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a chat interface for a support tool wants to correctly display 'Claude' versus 'You' labels above each chat bubble, based on the stored messages array.",
    "question": "What field determines which label to show for a given message?",
    "options": [
      "The message's 'role' field, which is either 'user' or 'assistant'",
      "The message's array index, alternating labels regardless of actual role",
      "The length of the message content",
      "The timestamp the message was received"
    ],
    "correct": 0,
    "explanation": "Each message object explicitly carries a 'role' field set to either 'user' or 'assistant', which directly and unambiguously determines which label to display — this is the correct, authoritative source (A). While roles do alternate in a valid conversation, using array index as a proxy (B) is an indirect and unnecessary substitute when the role field is directly available and authoritative. Content length (C) has no defined relationship to who authored a message. Timestamp (D) indicates when a message was sent, not who sent it."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants to make sure that if their application's retry logic retries a request that actually succeeded on the server side but whose response was lost due to a client-side network error, the user doesn't end up seeing the same assistant response appear twice in the chat.",
    "question": "What combination of practices reduces this risk?",
    "options": [
      "Do nothing special; duplicate responses are a rare, acceptable annoyance",
      "Use client-side request tracking (e.g. a unique request ID generated before sending) so a retried call's result can be recognized and deduplicated against an already-displayed response, combined with idempotency-aware retry logic where supported",
      "Never retry any request under any circumstances to avoid this risk entirely",
      "Always show every response received, even if it's an exact duplicate of the previous one"
    ],
    "correct": 1,
    "explanation": "Tracking requests with a client-generated identifier lets the application recognize when a retried call's result corresponds to a request whose response was already shown, allowing deduplication before display; combining this with idempotency-aware retry behavior further reduces the risk of the underlying issue occurring (B). Treating duplicate visible responses as an acceptable inevitability (A) settles for a fixable UX bug. Disabling all retries (C) throws away legitimate resilience against real transient failures just to avoid a narrower duplication edge case, and isn't necessary since the actual fix is deduplication, not retry avoidance. Always showing every response including exact duplicates (D) is precisely the bug being described, not a fix for it."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to combine both a tool for looking up account details and Anthropic's web search server-side tool in the same conversation, so Claude can consult internal account data and current public information as needed.",
    "question": "Is this combination supported by the tools parameter?",
    "options": [
      "No — only one tool, of either type, can be included per request",
      "Yes — the tools array can include both user-defined (client-side) tools and Anthropic server-side tools together in the same request; Claude decides which to use as appropriate",
      "Yes, but only if extended thinking is disabled",
      "No — server-side tools and client-side tools require completely separate API keys"
    ],
    "correct": 1,
    "explanation": "The tools array supports mixing multiple tool types — user-defined client-side tools and Anthropic-hosted server-side tools like web search — together in a single request, and the model decides based on context which (if any) to invoke (B). Multiple tools of mixed types are supported per request, so limiting to just one (A) is false. This combination has no dependency on extended thinking being enabled or disabled (C). There's no such requirement for separate API keys based on tool type — one key and one request can include both kinds of tools together (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an internal HR assistant tool wants to log enough detail to audit, months later, exactly what information was provided to Claude and what it responded for any given HR policy question, in case of a compliance dispute.",
    "question": "What logging practice best supports this audit requirement?",
    "options": [
      "Log the full request (prompt, parameters) and full response (including stop_reason and any tool interactions) associated with a stable identifier, retained per the organization's audit/retention policy",
      "Log only whether the request succeeded or failed, with no content",
      "Rely on the fact that Anthropic retains a permanent, queryable copy of every request on the developer's behalf indefinitely",
      "Log a random sample of 1% of requests, since full logging is unnecessary for compliance"
    ],
    "correct": 0,
    "explanation": "A genuine audit trail requires capturing the actual request and response content (not just success/failure) tied to a stable identifier, retained according to the organization's audit and retention policy, so a specific past interaction can be reconstructed and reviewed later (A). Logging only success/failure with no content (B) would be useless for reconstructing what was actually said in a compliance dispute. Depending on indefinite retention by the API provider without the developer's own retained records is not a substitute for application-level audit logging under the developer's control and policy (C). Sampling only 1% of requests (D) would leave the vast majority of interactions unauditable, which defeats the purpose for a compliance-sensitive use case."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface wants to gray out or disable the message input box while the assistant is generating a response, then re-enable it once the response is complete, including properly handling the case where an error occurs mid-stream.",
    "question": "What is the correct set of conditions for re-enabling the input?",
    "options": [
      "Only re-enable on a successful message_stop event, leaving the input permanently disabled if any error occurs",
      "Re-enable the input on either a successful stream completion (message_stop) or on an error/exception during the stream, so the user is never permanently locked out of sending another message",
      "Never disable the input at all, regardless of streaming state",
      "Re-enable the input based on a fixed timer of exactly 5 seconds regardless of actual stream state"
    ],
    "correct": 1,
    "explanation": "The input should be re-enabled on both successful completion and on any error path, since permanently locking the user out after an error is a critical usability bug — proper error handling must restore normal interactivity even when things go wrong (B). Leaving the input disabled forever after an error (A) would trap the user with no way to continue the conversation. Never disabling the input at all (C) risks confusing overlapping requests or a broken conversation structure if the user sends a new message before the current one resolves. A fixed timer disconnected from actual stream state (D) is unreliable — it could re-enable too early (mid-generation) or leave it disabled too long after a fast completion."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a large-scale customer support platform serving multiple enterprise clients wants each client's API usage and cost tracked and billed back separately, even though the platform currently uses a single shared Anthropic API key for all clients' traffic.",
    "question": "What is a practical way to achieve accurate per-client cost attribution with a shared key?",
    "options": [
      "This is impossible with a shared API key; a separate key must be issued per client with no other option",
      "Tag or log each outgoing request with the originating client ID, and use the token usage reported in each response (or request metadata) to attribute cost per client in the platform's own accounting system, independent of how many underlying API keys are used",
      "Assume cost is distributed evenly across clients regardless of actual usage",
      "Rely on the Anthropic Console to automatically separate usage by client, since it has awareness of the platform's individual customers"
    ],
    "correct": 1,
    "explanation": "Per-client cost attribution is an application-level bookkeeping problem: tag each request with the originating client ID in the platform's own logs, and use the per-response usage data (token counts) to compute and attribute actual cost per client in the platform's own accounting — this works regardless of whether one shared key or multiple keys are used underneath (B). While separate keys per client (sometimes via request metadata/headers) can be a valid design choice for other reasons like isolation, it's not the only way to achieve billing attribution, so claiming it's impossible otherwise (A) is incorrect. Assuming even cost distribution (C) would be inaccurate whenever usage actually varies across clients, which is the realistic case. The Anthropic Console has no inherent knowledge of the platform's own downstream customer structure — that mapping only exists in the platform's own systems (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a coding assistant wants to know what triggers stop_reason: 'tool_use' on a response.",
    "question": "When does this stop_reason occur?",
    "options": [
      "When the model's context window has been exceeded",
      "When the model has decided to call one or more tools and is pausing generation to let the application execute them and return results",
      "When a custom stop_sequence string was generated",
      "Only when streaming is disabled"
    ],
    "correct": 1,
    "explanation": "stop_reason: 'tool_use' indicates the model has requested one or more tool calls and stopped generating so the application can execute them and return tool_result blocks in a follow-up request (B). Exceeding the context window produces a different, distinct error/stop condition, not tool_use (A). Hitting a configured stop_sequence produces stop_reason: 'stop_sequence', a different value (C). tool_use can occur whether or not streaming is enabled — it isn't restricted to non-streaming requests (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for an airline wants to let Claude check real-time flight status by calling an internal flights API, and wants the tool description itself to help the model use it correctly.",
    "question": "What makes for a well-written tool description in this case?",
    "options": [
      "A one-word name with no description at all, since the model can infer everything from context",
      "A clear description of what the tool does, when it should be used, and precise descriptions of each parameter (e.g. that flight_number expects a specific format), since Claude relies heavily on this description to decide when and how to call the tool correctly",
      "A description written in a different language than the rest of the prompt to save tokens",
      "An empty input_schema, since parameters are optional for all tools"
    ],
    "correct": 1,
    "explanation": "Claude relies heavily on the tool's name, description, and parameter descriptions to decide when a tool is applicable and how to correctly populate its inputs, so clear, specific descriptions (including expected formats) directly improve reliability of tool selection and correct usage (B). Omitting a description entirely (A) removes exactly the signal the model needs to use the tool well. Mixing languages arbitrarily (C) adds confusion with no real benefit and isn't a recognized best practice. input_schema should reflect the tool's actual required and optional parameters — leaving it empty when the tool genuinely needs a flight_number parameter would prevent the model from supplying the necessary structured input at all (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a document Q&A tool for a research firm wants users to be able to ask follow-up questions about a large uploaded PDF across multiple turns, without re-uploading or re-encoding the same PDF bytes on every single turn of the conversation.",
    "question": "What is the most efficient approach?",
    "options": [
      "Upload the PDF once via the Files API and reference it by file_id in the first turn; as long as that turn (and its file reference) remains part of the resent conversation history, later turns don't need to re-upload the file",
      "Re-upload and re-encode the full PDF as a new base64 block on every single turn of the conversation, even though the content hasn't changed",
      "PDFs cannot be referenced across multiple turns; a new file must be created for every message",
      "Convert the PDF to plain text once and discard the original formatting and layout information forever"
    ],
    "correct": 0,
    "explanation": "Uploading the file once via the Files API and referencing it by file_id means the document only needs to be transmitted/encoded once; as long as the message containing that reference stays part of the conversation history that gets resent, later turns can build on it without re-uploading the same bytes repeatedly (A). Re-uploading the full base64 content every turn (B) is unnecessary duplicated work when the Files API exists specifically to avoid this. File references can absolutely be reused across a conversation once uploaded — this isn't a one-message-only restriction (C). Converting to plain text (D) is unnecessary and would lose visual/layout information the native PDF-handling capability preserves, and isn't required simply to enable reuse across turns."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot notices that streaming responses sometimes include a 'ping' event type they don't recognize, interspersed with the expected content_block events.",
    "question": "What is the correct handling for ping events in a streaming client?",
    "options": [
      "Treat any ping event as a fatal error and abort the stream",
      "Ignore ping events for content purposes — they are periodic keep-alive signals to prevent idle connection timeouts, not carrying actual message content",
      "Treat ping events as if they were text_delta events and append their content to the displayed message",
      "Ping events indicate the request should be retried from scratch"
    ],
    "correct": 1,
    "explanation": "ping events are periodic keep-alive signals sent to prevent the connection from being closed due to inactivity during longer generations; they carry no message content and should simply be ignored by content-handling logic while the stream continues normally (B). Treating them as fatal errors (A) would incorrectly abort perfectly healthy streams. They have no text content to append, so treating them as text_delta events (C) would be a parsing mistake. They don't signal any need to retry — the stream is functioning as expected when pings appear (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building an internal tool wants to reduce redundant back-and-forth in a multi-step tool-use agentic loop by allowing Claude to request several independent tool calls (e.g. looking up three different customer records at once) in a single turn instead of one at a time across several round trips.",
    "question": "What API behavior already supports this optimization?",
    "options": [
      "Parallel tool use, where the model can include multiple tool_use blocks in one response; the application executes them (potentially concurrently) and returns all corresponding tool_result blocks together in a single follow-up message",
      "This requires a special 'batch_tools' parameter that must be explicitly enabled",
      "Only one tool call is ever possible per response, so this optimization is not achievable",
      "The model must be asked to wait exactly 3 seconds between each tool call"
    ],
    "correct": 0,
    "explanation": "By default, a single assistant response can contain multiple tool_use blocks (parallel tool use); the application executes all of them — potentially concurrently — and returns all the resulting tool_result blocks together in one subsequent message, reducing round trips compared to one tool call per turn (A). There's no special 'batch_tools' flag required to enable this default behavior (B). Multiple tool calls per response are explicitly supported, contradicting the one-tool-per-response claim (C). There's no such artificial timing requirement between tool calls (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to gracefully handle a 403 permission_error response, which they haven't seen before during development but want to be ready for in production.",
    "question": "What does a 403 error typically indicate for this API, and what's the appropriate response?",
    "options": [
      "It indicates the API key lacks permission for the requested resource or feature (e.g. a beta feature not enabled for the account); the fix is to check account/key permissions rather than retrying the same request unchanged",
      "It means the request was too large and should be split into smaller chunks",
      "It's a transient error that should be retried with exponential backoff like a 429",
      "It means the model itself refused to answer for safety reasons"
    ],
    "correct": 0,
    "explanation": "A 403 permission_error indicates the API key or account doesn't have permission for what's being requested (for example, access to a specific beta feature or model tier), and the correct response is to investigate and fix the underlying permission/configuration issue, not to blindly retry (A). A 413 request_too_large error, not 403, indicates an oversized payload (B). 403 is not classified as a retryable transient error the way 429 or 5xx errors are, since retrying an unchanged request with the same permission gap will fail identically (C). A safety-related refusal by the model surfaces as a successful response with stop_reason: 'refusal', not as an HTTP 403 error (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a chat interface with support for very long assistant responses wants to avoid a poor experience where the entire chat window has to re-render on every single token during streaming, causing visible jank on lower-end devices.",
    "question": "What is a practical mitigation?",
    "options": [
      "Switch off streaming entirely for all users to prevent any re-rendering at all",
      "Batch UI updates (e.g. update the displayed text at a throttled interval, or accumulate several deltas before triggering a re-render) rather than triggering a full re-render synchronously on every single individual delta event",
      "Force every device to upgrade its hardware before allowing streaming",
      "Disable all animations in the entire application unconditionally"
    ],
    "correct": 1,
    "explanation": "Throttling or batching UI updates — for example, accumulating several deltas before triggering a re-render, or updating on a fixed interval — reduces the render frequency to something the UI framework and device can handle smoothly, while still preserving the core benefit of incremental display (B). Disabling streaming entirely (A) throws away the whole latency benefit just to avoid a solvable rendering performance issue. Requiring hardware upgrades (C) is not a realistic or acceptable software fix. Disabling all animations app-wide (D) is an unrelated, overly broad change that doesn't specifically address the per-token re-render cost described."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a data extraction service wants to confirm whether the tool_use content block's 'input' field is already a parsed object or a raw JSON string that needs manual parsing.",
    "question": "What is correct about tool_use.input in the official SDKs?",
    "options": [
      "It is always a raw, unparsed string that must be manually run through a JSON parser before use",
      "In the official SDKs, tool_use.input is exposed as an already-parsed object (e.g. a Python dict or JS object) matching the tool's input_schema, not a raw string requiring manual parsing",
      "It is always empty and must be looked up separately via a different endpoint",
      "It contains binary data that must be base64-decoded before parsing"
    ],
    "correct": 1,
    "explanation": "The official SDKs parse the model-generated tool input JSON for you and expose tool_use.input as a native object (e.g. a dict in Python or an object in JavaScript) matching the tool's schema, so the developer doesn't need to manually parse a raw string in typical SDK usage (B). It is not left as an unparsed raw string requiring manual JSON parsing when using the SDK (A). It is populated directly on the response object, not something needing a separate lookup call (C). It's structured JSON input matching the schema, not base64-encoded binary data (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a retailer wants Claude to answer common questions using company policy documents, but the policy documents are updated roughly weekly by the legal team, and the developer doesn't want to redeploy their application every time a policy changes.",
    "question": "What is the best architecture for keeping this content current without a redeploy?",
    "options": [
      "Hardcode the policy text as a literal string constant directly in the application source code",
      "Store the current policy documents in an external, easily updatable location (e.g. a database, CMS, or object storage) and fetch the latest version at request time to inject into the prompt, decoupling content updates from application deployments",
      "Ask the legal team to manually retrain the Claude model whenever policy changes",
      "Cache the policy text permanently with no refresh mechanism ever"
    ],
    "correct": 1,
    "explanation": "Storing the frequently-changing policy content in an externally editable location and fetching the current version at request time decouples content updates (which the legal team can make independently) from application code deployments, exactly matching the stated goal (B). Hardcoding the text in source (A) would require a redeploy for every weekly update, which is precisely what the developer wants to avoid. Individual companies cannot retrain Anthropic's models with their own private policy content (C) — that's not how this integration works. Caching permanently with no refresh (D) would mean the assistant serves stale, outdated policy information indefinitely, which conflicts with the goal of keeping content current."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a coding assistant that runs an agentic tool-use loop wants to put a hard ceiling on how many iterations of tool calling can occur for a single user request, to avoid a pathological case where the model keeps calling tools indefinitely without ever reaching a final answer.",
    "question": "What is the correct way to implement this safeguard?",
    "options": [
      "Track the number of loop iterations in the application code and break out of the loop (returning a fallback message to the user) once a configured maximum iteration count is reached, rather than looping forever",
      "Rely on the API to automatically stop any tool-use loop after exactly 3 iterations with no configuration needed",
      "Set max_tokens to a very small number, which will always prevent infinite tool-use loops",
      "This safeguard is unnecessary since infinite tool-use loops cannot occur"
    ],
    "correct": 0,
    "explanation": "Since the application itself drives the agentic loop (calling the API repeatedly and executing tools), it's the application's responsibility to track iteration count and break out with a defined fallback once a sane maximum is reached, protecting against a pathological non-terminating loop (A). There's no built-in automatic 3-iteration cap enforced by the API itself for user-defined tools (B) — some server-side tool loops have their own default iteration limits, but that's a different mechanism from a general application-driven agentic loop. max_tokens caps output length per individual response, not the number of loop iterations across multiple requests, so it wouldn't reliably prevent an unbounded loop (C). Pathological non-terminating loops are a real, recognized risk in agentic tool-use systems, so dismissing the need for this safeguard (D) is incorrect."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface for a support tool is deciding how to handle the very first message a new user sends when there is no prior conversation history yet.",
    "question": "How should the messages array be constructed for this first request?",
    "options": [
      "It must include at least one prior assistant message before the user's first message, invented by the application",
      "Send a messages array containing just the single user message as the first (and only) entry, since a conversation is allowed to start this way",
      "The first request must always be empty with no messages at all",
      "Send the user's message twice to satisfy the alternation requirement"
    ],
    "correct": 1,
    "explanation": "A conversation can validly start with just a single user message as the only entry in the array — this satisfies the requirement that the array start with a user-role message and doesn't need any artificial prior turns (B). There's no requirement to fabricate a prior assistant message before the very first real user message (A). An empty messages array isn't a valid request — at least one message is required (C). Duplicating the same user message twice would violate the alternating-roles requirement, since two consecutive messages would share the same role (D)."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a production research tool notices that under sustained high load, requests occasionally succeed at the API level (200 response, valid content) but arrive back at the client after the user has already closed the browser tab or navigated away, wasting the generated tokens and the money spent on them with no one to see the result.",
    "question": "What is a reasonable mitigation for this specific waste?",
    "options": [
      "Nothing can be done about this; wasted generation is an unavoidable cost of doing business",
      "Detect client-side navigation/tab-close events and cancel/abort the in-flight request at that point (stopping further token generation and billing for what hasn't yet been produced), rather than letting an abandoned request run to completion",
      "Increase max_tokens for every request so abandoned ones are at least more 'complete' when discarded",
      "Ignore the issue since streaming already prevents this from ever happening"
    ],
    "correct": 1,
    "explanation": "Detecting that the user has navigated away or closed the tab and actively canceling/aborting the in-flight request stops further generation (and further billing for tokens not yet produced) rather than letting a now-unwatched request run to completion and waste resources (B). This is a solvable engineering problem with real mitigations available, so claiming nothing can be done (A) is incorrect. Increasing max_tokens (C) would make an abandoned request generate even more wasted tokens, the opposite of a fix. Streaming alone does not automatically detect and cancel on tab close — that requires explicit application logic tied to client lifecycle events, so (D) is a false assumption."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to add a feature where, if the assistant's response contains a tool_use block for an unrecognized tool name (one not defined in their current tools array), the application handles it gracefully instead of crashing.",
    "question": "What is a defensive coding practice for this edge case?",
    "options": [
      "Assume this can never happen and add no handling for it",
      "Explicitly check the tool name against the set of known/implemented tools before dispatching, and if it's unrecognized, return a tool_result with is_error: true describing the problem, rather than letting an unhandled case crash the application",
      "Silently ignore any tool_use block with an unrecognized name and send no tool_result at all",
      "Automatically restart the entire application whenever an unrecognized tool name appears"
    ],
    "correct": 1,
    "explanation": "Defensive dispatch logic should validate the tool name before executing, and return a clear, structured error tool_result for anything unrecognized, keeping the conversation in a valid, recoverable state instead of crashing or silently breaking the tool_use/tool_result pairing requirement (B). While an unrecognized tool name should be rare with a correctly configured tools array, defensive handling is still good practice for a production system, so assuming it can't happen and adding nothing (A) leaves a fragile gap. Silently ignoring it with no tool_result (C) violates the requirement that every tool_use be matched by a tool_result, leading to a 400 error on the next request. Restarting the whole application (D) is a wildly disproportionate response to a single malformed or edge-case tool call."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an internal tool wants their team to be able to test prompt and parameter changes against a fixed set of representative inputs before merging any change, similar to how they run unit tests for regular code.",
    "question": "What development practice does this describe, and why is it valuable for a Claude-powered feature?",
    "options": [
      "Manual, ad-hoc spot-checking with no fixed inputs, since automated evaluation isn't possible for LLM-based features",
      "Building an evaluation (eval) suite — a fixed set of representative test inputs with defined success criteria — run automatically against prompt/parameter changes, catching regressions before they reach production, much like unit tests catch regressions in conventional code",
      "This is unnecessary because LLM outputs are always deterministic and don't need regression testing",
      "Only testing in production with real users is a valid approach for LLM-based features"
    ],
    "correct": 1,
    "explanation": "Building an eval suite — a curated, representative set of inputs with defined pass/fail or scoring criteria, run automatically whenever prompts or parameters change — is the standard practice for catching quality regressions before deployment, analogous to unit testing for traditional code (B). Purely manual, ad-hoc spot-checking (A) is inconsistent and easy to skip, unlike a repeatable automated suite. LLM outputs are not fully deterministic by default (temperature introduces variability), and even where more deterministic, behavior can still regress with prompt or parameter changes, so treating regression testing as unnecessary (C) is incorrect. Testing only in production with real users (D) means regressions are caught only after real users are already affected, which is exactly what pre-deployment evaluation aims to prevent."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot wants to understand why, despite setting a system prompt instructing Claude to always respond in French, occasional responses come back in English when the user's message itself was in English.",
    "question": "What is the most likely explanation and appropriate fix?",
    "options": [
      "This is a bug in the API that cannot be fixed by the developer",
      "The model is following the linguistic cues in the user's own message alongside the system instruction; the fix is to make the system prompt instruction more explicit and unconditional (e.g. 'Always respond in French, regardless of the language the user writes in') to reduce ambiguity",
      "System prompts have no effect on response language at all",
      "The only fix is to translate every user message to French before sending it to the API"
    ],
    "correct": 1,
    "explanation": "The model weighs both the system instruction and contextual cues like the user's own language; a softer or ambiguous instruction can be outweighed by strong contextual signals, so tightening the instruction to be explicit and unconditional about language, regardless of user input language, typically resolves this (B). This is a prompting clarity issue rather than an unfixable API bug (A). System prompts absolutely do influence response language and behavior generally — that's a core part of what they're for, so dismissing their effect (C) is incorrect. Pre-translating every user message (D) is one possible workaround but isn't the most direct or necessary fix — clarifying the instruction is simpler and addresses the root cause directly."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a customer support bot wants to give their production deployment a distinct, restricted API key from the one used in local development, so a bug in a developer's local script can never accidentally affect production usage limits or billing.",
    "question": "What is this practice an example of?",
    "options": [
      "Environment separation / least-privilege credential management — using distinct keys per environment (dev, staging, production) so issues in one environment are isolated from others",
      "An unnecessary complication with no real benefit",
      "A requirement enforced automatically by the SDK with no developer action needed",
      "A practice that only matters for very large companies, never for small teams"
    ],
    "correct": 0,
    "explanation": "Using separate API keys per environment is a standard security and operational practice — environment separation and least-privilege credential management — that limits the blast radius of bugs, leaks, or misuse in one environment from affecting others, including production billing and rate limits (A). This has real, concrete benefits (isolation, easier auditing, safer key rotation per environment), so dismissing it as unnecessary (B) is wrong. The SDK does not automatically enforce or set up separate keys per environment on its own — this is a deliberate developer/operational choice (C). This practice benefits teams of any size, including small teams, where a single mistake in a shared key could still have outsized consequences (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a document Q&A tool notices that when they enable citations on a document content block, the response text comes back as multiple separate text blocks instead of one single block, which broke their code that assumed response.content[0].text always contained the entire answer.",
    "question": "What is the correct fix?",
    "options": [
      "This is unexpected and indicates a bug in the API that should be reported",
      "Citations-enabled responses can legitimately split output into multiple text blocks (each potentially carrying its own citations); the code should iterate over all content blocks of type 'text' and concatenate them, rather than assuming a single block holds the whole answer",
      "Disable citations entirely, since there's no way to reconstruct the full answer from multiple blocks",
      "Only response.content[content.length - 1].text should ever be read, ignoring all earlier blocks"
    ],
    "correct": 1,
    "explanation": "When citations are enabled, the response can legitimately be split across multiple text content blocks (each potentially annotated with its own citation data), so robust code should iterate through all 'text' type blocks in order and concatenate them to reconstruct the full answer, rather than assuming everything is in a single block (B). This is documented, expected behavior of the citations feature, not a bug (A). The full answer absolutely can be reconstructed by properly iterating all text blocks — abandoning citations entirely (C) is an overreaction to a straightforward parsing fix. Reading only the last block (D) would drop earlier parts of the answer, producing an incomplete result."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot for a company that operates 24/7 across multiple time zones wants their production monitoring to catch a scenario where the average response latency gradually creeps up over several days, even though no single request times out.",
    "question": "What monitoring approach would catch this kind of gradual degradation?",
    "options": [
      "Only alert on hard failures (errors, timeouts), since gradual latency creep with no outright failures isn't worth monitoring",
      "Track and chart latency percentiles (e.g. p50, p95, p99) over time and alert on sustained upward trends or threshold breaches, not just binary success/failure, so a slow gradual degradation is visible before it becomes a hard failure",
      "Check latency manually once a year during an annual review",
      "Rely exclusively on user complaints to signal a latency problem"
    ],
    "correct": 1,
    "explanation": "Tracking latency percentiles over time and alerting on trend or threshold breaches is exactly the kind of monitoring that surfaces gradual degradation long before it turns into outright failures or user-visible timeouts, giving the team a chance to investigate proactively (B). Monitoring only hard failures (A) would completely miss the gradual creep described in the scenario, by definition, since no request is actually failing yet. An annual manual check (C) is far too infrequent to catch a multi-day trend before it becomes a serious problem. Waiting for user complaints (D) means the team only finds out after the degradation has already meaningfully impacted the user experience."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building an e-commerce assistant wants to give Claude context about the specific user's order history for the current conversation, but is unsure whether to embed this as static text in the system prompt versus fetching it dynamically via a tool call.",
    "question": "What consideration should drive this choice?",
    "options": [
      "Always use the system prompt for this, since tools cannot access user-specific data",
      "If the relevant order history is known and needed at the start of the conversation and doesn't change mid-conversation, injecting it into the prompt/system text is simpler; if it's large, needs to be fetched fresh, or is only needed conditionally depending on what the user asks, a tool call is more appropriate",
      "Always use a tool call for this, since the system prompt can never contain any user-specific information",
      "It makes no difference; both approaches are functionally and practically identical in every case"
    ],
    "correct": 1,
    "explanation": "The right choice depends on the data's size, freshness needs, and whether it's always relevant versus only conditionally needed — static injection is simpler for small, known-upfront, always-relevant context, while a tool call is better for larger, freshness-sensitive, or conditionally-needed data fetched on demand (B). Tools absolutely can access and return user-specific data (that's a very common use case), so claiming they can't (A) is false. The system prompt can contain user-specific context perfectly well, so an absolute rule against ever putting it there (C) is incorrect. The two approaches have real practical tradeoffs (token cost, freshness, conditionality) — they are not interchangeable in every situation (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot for a company with strict change management wants a way to test a new system prompt against real production-like traffic patterns before fully committing to it, without risking a full-scale incident if the new prompt has a subtle regression.",
    "question": "What deployment technique best supports this goal?",
    "options": [
      "A canary or percentage-based rollout, where the new prompt is served to a small fraction of production traffic while the rest continues on the known-good version, with monitoring comparing outcomes between the two before a full rollout",
      "Deploying the new prompt to 100% of traffic immediately, since partial rollouts add unnecessary complexity",
      "Testing exclusively in a local development environment with no production-like traffic at all",
      "Announcing the change to users in advance so they can manually opt out if problems occur"
    ],
    "correct": 0,
    "explanation": "A canary/percentage-based rollout serves the change to a limited slice of real traffic while most users remain on the known-good version, letting the team compare real-world outcomes and catch regressions with a bounded blast radius before a full rollout — this is exactly the risk-mitigation technique the scenario calls for (A). Deploying to 100% immediately (B) is precisely the risky, all-or-nothing approach the developer is trying to avoid. Local-only testing (C) doesn't capture the real, messy diversity of actual production traffic patterns that a canary rollout is designed to validate against. Expecting users to manually detect and opt out of problems (D) is not a real technical safeguard and places the burden of catching regressions on end users rather than the engineering process."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a research tool wants to reduce cost on a workload where most queries only need a fast, capable-enough model, but a small subset of genuinely complex analytical questions benefit meaningfully from a more capable (and more expensive) model.",
    "question": "What is a reasonable cost-aware architecture for this?",
    "options": [
      "Always use the most expensive, most capable model for every single query regardless of complexity, to guarantee maximum quality",
      "Route requests based on an assessment of query complexity (e.g. a lightweight classification step, or simple heuristics) so straightforward queries go to a cheaper/faster model and only genuinely complex queries are sent to the more expensive model",
      "Always use the cheapest available model for every query regardless of the task, accepting whatever quality results",
      "Randomly assign each query to a model with no relationship to actual complexity"
    ],
    "correct": 1,
    "explanation": "Model routing based on query complexity — reserving the more expensive, more capable model for the subset of queries that actually benefit from it, and using a cheaper model for the rest — directly matches cost to actual need, which is a well-established cost-optimization pattern (B). Always using the most expensive model (A) ignores the fact that most queries don't need that level of capability, wasting money. Always using the cheapest model regardless of task (C) risks degraded quality on the genuinely complex questions that need more capability. Random assignment (D) has no relationship to actual need and would produce inconsistent quality and cost outcomes with no rational basis."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A developer building a customer support bot wants to make sure error responses from the API are surfaced to their internal error-tracking tool (like Sentry) with enough context to debug later, including the request_id the API returns.",
    "question": "Why is capturing the request_id specifically useful?",
    "options": [
      "It has no debugging value and can be safely ignored",
      "The request_id uniquely identifies a specific API request and can be shared with Anthropic support (or used in the developer's own logs) to investigate a specific failed or unexpected call after the fact",
      "It is only useful for billing purposes and has no relationship to debugging",
      "It changes on every retry of the same logical request, so it cannot be used to track anything reliably"
    ],
    "correct": 1,
    "explanation": "The request_id uniquely identifies a specific API call and is the standard reference point for investigating a particular request after the fact — whether internally in the developer's own logs or when escalating an issue to Anthropic support (B). It has clear, direct debugging value, so dismissing it (A) is incorrect. It's a diagnostic identifier for a specific call, not fundamentally a billing construct (C). Each distinct HTTP request (including each individual retry attempt) does get its own request_id, which is exactly why it's useful for pinpointing a specific attempt — this is a feature for precise tracking, not a limitation that makes it useless (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a customer support bot integrates a tool that calls a third-party shipping-rate API. During a postmortem, the team realizes that when that third-party API returned a plausible-looking but subtly wrong rate due to its own bug, the tool_result passed that bad data straight to Claude, and Claude confidently repeated it to the customer as fact with no way to know it was wrong.",
    "question": "What does this incident illustrate about tool results?",
    "options": [
      "Nothing needs to change; Claude is always responsible for catching errors in third-party data on its own",
      "Claude generally treats tool_result content as trustworthy ground truth by default, so the application/tool layer bears responsibility for validating third-party data (e.g. sanity-checking rates against expected ranges) before it ever reaches the model as a tool_result",
      "Tool results are never trusted by the model under any circumstances, so this scenario couldn't actually happen",
      "This is solely Anthropic's responsibility to fix on their infrastructure"
    ],
    "correct": 1,
    "explanation": "Claude has no independent way to verify the correctness of data it receives as a tool_result — it generally treats that content as trustworthy, which means the responsibility for validating third-party data before it becomes a tool_result sits with the application/tool layer, not the model (B). Expecting Claude to catch subtle third-party bugs it has no independent way to verify (A) misunderstands how tool results are consumed. This scenario is a well-documented, realistic failure mode precisely because tool results are generally trusted, contradicting (C). This is an application-layer integration design issue (how the tool validates and passes along external data), not something Anthropic's infrastructure controls or is responsible for (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a chat interface for a support product wants the UI to visually distinguish a response that ended because of a safety-related refusal from one that ended normally, so they can show an appropriate, specific message rather than a generic error.",
    "question": "How should the application detect this specific case?",
    "options": [
      "Check if stop_reason equals 'refusal', which specifically indicates the model declined to continue for safety-related reasons, distinct from a normal end_turn completion",
      "Check if the HTTP status code is anything other than 200",
      "Assume any short response is automatically a refusal",
      "There is no programmatic way to detect a safety-related refusal"
    ],
    "correct": 0,
    "explanation": "stop_reason: 'refusal' is a distinct, documented value specifically signaling the model declined to continue for safety-related reasons, letting the application detect this case precisely and respond with appropriate, specific UI messaging rather than a generic catch-all (A). A refusal is still a successful HTTP response (200) — it's not signaled via a non-200 status code (B). Response length alone has no defined, reliable relationship to whether a refusal occurred (C). The API does expose a specific, programmatically checkable signal for this case, so claiming it's undetectable (D) is false."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A developer building a production internal tool serving thousands of employees wants to design their rate-limiting strategy so that one team running an unusually heavy batch job doesn't starve other teams' interactive, latency-sensitive usage of the same shared account's rate limit.",
    "question": "What is a reasonable mitigation?",
    "options": [
      "Accept that all teams share one undifferentiated pool with no internal prioritization",
      "Implement application-level request prioritization or separate internal quotas/queues per team or workload type (e.g. reserving headroom for interactive traffic, routing heavy batch work through the Batches API or a lower-priority queue with its own pacing), rather than letting all traffic compete uniformly for the same shared limit",
      "Ask the heavy batch job's team to simply stop using the tool entirely",
      "Increase max_tokens for interactive requests so they process faster and 'win' more often against batch traffic"
    ],
    "correct": 1,
    "explanation": "The correct mitigation is application-level traffic shaping: separating interactive and batch workloads (ideally routing bulk/batch work through the purpose-built Batches API or a paced internal queue) and/or reserving quota headroom for latency-sensitive traffic, so one team's heavy usage doesn't starve others sharing the same underlying account limits (B). Accepting an undifferentiated shared pool with no prioritization (A) is exactly the situation causing the problem described. Telling a team to simply stop using the tool (C) isn't a scalable or fair engineering solution to a shared-resource contention problem. Increasing max_tokens for interactive requests (D) doesn't address rate-limit contention at all — max_tokens controls output length, not priority or ordering in the rate-limit queue."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A developer building a customer support bot wants to add a feature where the assistant can proactively flag a conversation for human review if it detects the user is highly frustrated, using a flag_for_review tool the model can call.",
    "question": "What should happen on the application side after this tool is called?",
    "options": [
      "The application should execute the tool's actual side effect (e.g. creating an internal alert or ticket for a human agent), then return a tool_result confirming this happened, so both the real-world action occurs and the conversation can continue coherently",
      "The tool call should be entirely cosmetic with no real backend action, since Claude cannot actually trigger real work",
      "The conversation should immediately and silently terminate with no tool_result sent back",
      "The application should ignore the tool_use block entirely and let the user's session simply time out"
    ],
    "correct": 0,
    "explanation": "A tool call represents a request for the application to take a real action; the correct handling is to actually perform the side effect (e.g. creating an internal alert), then return a tool_result confirming the outcome, keeping the conversation coherent and allowing it to continue or wrap up appropriately (A). Tool calls are meant to trigger genuine backend actions defined by the application — treating it as purely cosmetic with no real effect (B) defeats the entire purpose of the tool. Silently terminating the conversation with no tool_result (C) would break the required tool_use/tool_result pairing and abruptly cut off the user with no resolution. Ignoring the tool_use and letting the session time out (D) means the flag-for-review action never actually happens, failing the whole point of the feature."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A developer building a data extraction service wants to confirm that structured output validation happens on the Claude API side, and is deciding whether it's still worth adding their own JSON schema validation library on the client after receiving the response.",
    "question": "What is the best practice here?",
    "options": [
      "Skip client-side validation entirely, since server-side schema enforcement makes it fully redundant in all cases",
      "Even when the API enforces structured output shape, it's still reasonable to run a lightweight client-side validation pass as a defense-in-depth measure, since it's cheap insurance against edge cases like SDK/library version mismatches or partial responses from truncation",
      "Client-side validation should replace server-side structured output entirely, since it's more reliable",
      "Client-side validation is impossible for JSON data returned from an LLM"
    ],
    "correct": 1,
    "explanation": "Even with server-side schema enforcement, defense-in-depth client-side validation is cheap and catches edge cases the server-side guarantee might not fully cover in practice — like a truncated response due to hitting max_tokens before the JSON object was fully closed, or version mismatches — so it remains reasonable extra insurance (B). Treating it as fully redundant and skippable (A) ignores realistic failure modes like truncation that structured output constraints don't fully prevent on their own. Client-side validation is a check, not a replacement for the stronger, upstream guarantee that structured output provides — framing it as superior and a full replacement (C) misunderstands the relationship between the two. Standard JSON validation libraries work perfectly well on any JSON data regardless of its origin, so claiming it's impossible for LLM-returned JSON (D) is false."
  }
];
