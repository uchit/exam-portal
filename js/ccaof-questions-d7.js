// CCAO-F Domain 7 — Troubleshooting and Optimisation (10% weight).
// Original practice material for thatclaude.com — not official Anthropic exam content.
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D7 = [
  {
    domain: 7,
    difficulty: 1,
    scenario: "A marketing coordinator asks Claude to \"write some social posts\" for a product launch and receives three generic posts that could apply to almost any product, with no mention of the launch date, the product name, or the platform they'll be posted on.",
    question: "What is the most likely reason the output is so generic?",
    options: [
      "Claude cannot write marketing copy without being connected to the company's website",
      "The request left out key details like the product, launch date, platform, and tone, so Claude had nothing specific to work with",
      "Social media writing is outside what Claude is designed to do",
      "The coordinator needs to ask a colleague to review the request before submitting it"
    ],
    correct: 1,
    explanation: "Generic output is the expected result of a generic prompt — Claude filled in the gaps with plausible but non-specific content because no specifics were given (B). This isn't a capability limit (A, C rule this out); reviewing with a colleague (D) doesn't address the missing information itself.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A customer support lead pastes a garbled paragraph of instructions into Claude that mixes refund policy, shipping policy, and escalation steps all together, then asks it to \"summarize the policy.\" The summary Claude returns focuses almost entirely on shipping and barely touches refunds or escalation.",
    question: "What should the lead do to get a summary that covers all three areas evenly?",
    options: [
      "Accept the summary since Claude decided shipping was the most important topic",
      "Ask Claude to try again with the exact same instruction and hope it balances the topics this time",
      "Split the request into three separate summaries, one per topic, or explicitly ask for balanced coverage of all three named areas",
      "Conclude that Claude is unable to summarize policy documents accurately"
    ],
    correct: 2,
    explanation: "When a request bundles unrelated topics without guidance on how to weight them, Claude may emphasize whichever one reads as most prominent — the fix is to structure the request, either by separating topics or explicitly naming all three for balanced coverage (C). Repeating the identical vague request (B) is unlikely to fix an ambiguity problem, and this isn't a hard capability ceiling (D).",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A project manager asks Claude in a single message to draft a full project charter, build a 6-month timeline with dependencies, write risk mitigation plans for 10 identified risks, and produce a stakeholder communication plan — all at once. The response covers the charter reasonably well but the timeline is thin, two risks are missing, and the communication plan is only a few bullet points.",
    question: "What is the most likely reason the output fell short in some areas, and what should the PM do?",
    options: [
      "Claude deliberately skipped parts of the request to save time, so the PM should complain about laziness",
      "The request bundled four substantial deliverables into one ask, which is a lot to fully develop at once; the PM should break it into separate requests, tackling one deliverable at a time",
      "The PM should give up on using Claude for project planning and do it manually",
      "The PM should resend the identical request and expect a complete result next time"
    ],
    correct: 1,
    explanation: "Four substantial deliverables crammed into a single request is genuinely a lot to fully develop at once, and thinner treatment of later items is a predictable outcome of an overloaded ask — breaking it into focused, sequential requests (B) lets each get proper attention. There's no intent to shortchange the PM (ruling out A), and neither abandoning the tool (C) nor repeating the same overloaded request (D) addresses the actual issue.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "An HR specialist has been chatting with Claude for over an hour about an employee handbook rewrite. Partway through, the conversation drifted into a tangent about company holiday scheduling, then benefits enrollment, and now when the specialist asks for a final clean draft of the handbook's conduct section, Claude's response blends in leftover holiday and benefits language that doesn't belong there.",
    question: "What is the best next step for the specialist?",
    options: [
      "Keep asking follow-up questions in the same conversation and hope the blended content eventually resolves itself",
      "Start a new conversation focused solely on the conduct section, pasting in just the relevant handbook text and clear instructions",
      "Conclude that Claude cannot write handbook sections without confusing them with unrelated topics",
      "Ask Claude to remember not to mention holidays or benefits, then continue in the same long conversation"
    ],
    correct: 1,
    explanation: "After a long conversation has drifted across several unrelated subtopics, the accumulated context itself becomes the problem — starting fresh with only the relevant material (B) gives Claude a clean slate focused on exactly the task at hand. Simply asking it to \"not mention\" the tangents (D) leaves the cluttered context in place and is less reliable than removing the clutter; this isn't a fixed capability gap (C), and continuing to layer more follow-ups onto an already-drifted thread (A) is unlikely to clean it up.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A retail operations manager asks Claude to write a two-sentence summary of a vendor contract for a quick Slack update, but gets back a detailed six-paragraph breakdown covering every clause.",
    question: "What is the most efficient fix?",
    options: [
      "Manually delete most of the paragraphs before posting, since Claude can't be told to shorten things",
      "Ask a follow-up in the same conversation explicitly requesting a two-sentence summary, since the length wasn't clearly specified the first time",
      "Assume Claude is only capable of producing long, detailed answers for contract-related questions",
      "Start an entirely new conversation from scratch and re-upload the contract"
    ],
    correct: 1,
    explanation: "Length control is a matter of instruction, not capability — a quick follow-up specifying \"two sentences\" (B) in the same thread is the fastest fix, since Claude already has the contract context loaded. Manual editing (A) treats a fixable input problem as unfixable, assuming a fixed capability ceiling (C) is incorrect, and restarting the conversation (D) is unnecessary extra work when a targeted follow-up will do.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A nonprofit program officer asks Claude to draft a thank-you letter to a major donor. The draft comes back written in a casual, joking tone with exclamation points, which feels wrong for a formal donor relationship.",
    question: "What should the program officer do?",
    options: [
      "Ask Claude to revise the letter in a warm but formal and professional tone, since tone wasn't specified in the original request",
      "Assume Claude cannot write in a formal register and switch to writing the letter by hand",
      "Send the letter as-is since rewriting would take too much time",
      "Start over in a brand-new conversation with no explanation, hoping the tone is different by chance"
    ],
    correct: 0,
    explanation: "Tone is easy to adjust once named — asking for \"warm but formal and professional\" (A) directly targets the mismatch and lets Claude apply the existing content in the right register. Assuming a formal tone is impossible (B) is a capability misdiagnosis; sending unsuitable copy (C) risks the donor relationship, and restarting blind (D) leaves the actual instruction gap unaddressed.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A financial analyst has an ongoing conversation with Claude where she's been iterating on a quarterly variance report for 90 minutes: first draft, then feedback, then a rewrite, then more feedback, then a request to change the chart descriptions, then a request to adjust the executive summary. She now asks for \"one more small tweak\" to the summary's opening line, but the response instead rewrites large portions of the report unprompted.",
    question: "What is the most likely explanation, and what should she do?",
    options: [
      "Claude is malfunctioning and she should report a bug rather than continue",
      "The long back-and-forth has accumulated enough conflicting or unclear instructions that a small ask is being interpreted too broadly; she should give a precise, narrowly scoped instruction, and consider starting fresh with the current draft as clean input if the drift continues",
      "She should abandon the report entirely and write the rest manually",
      "She should repeat \"just fix the opening line\" verbatim several times until it works"
    ],
    correct: 1,
    explanation: "After many rounds of edits, a conversation can accumulate enough layered, sometimes conflicting instructions that even a small ask gets interpreted broadly; the fix is a precise, narrow instruction, and if that doesn't resolve it, restarting with the current draft as fresh input clears the accumulated ambiguity (B). This isn't a malfunction to report (A), abandoning the tool (C) throws away real productivity, and repeating the same phrasing (D) doesn't address why the scope crept in the first place.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A real estate agent regularly asks Claude to write property listing descriptions. Each time, she has to re-explain her preferred format (headline, three bullet highlights, closing call-to-action) and her brand voice from scratch, which is repetitive and sometimes she forgets a detail, leading to inconsistent listings.",
    question: "What would most improve consistency and save her time going forward?",
    options: [
      "Keep re-typing the full instructions from memory each time and accept the occasional inconsistency",
      "Save a reusable prompt template that spells out the format, structure, and brand voice once, then reuse or lightly adapt it for each new property",
      "Ask a coworker to write listings instead, since Claude can't be relied on for repeated tasks",
      "Submit only the property address each time and expect Claude to infer her preferred format automatically"
    ],
    correct: 1,
    explanation: "A saved, reusable template capturing the format and voice once (B) removes the need to reconstruct instructions from memory each time and produces consistent results. Continuing to retype from memory (A) keeps the error risk that's already causing problems; switching away from the tool (C) isn't necessary once a repeatable input is in place, and expecting the format to be inferred with no cues (D) reintroduces the original ambiguity problem.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A hospital administrative assistant asks Claude to \"help with the intake form\" for a new patient portal. Claude asks a clarifying question about which fields to include, and the assistant, in a hurry, replies \"whatever's normal.\" The resulting form omits an insurance field the clinic specifically requires.",
    question: "What is the most accurate diagnosis of what went wrong?",
    options: [
      "Claude ignored the assistant's instructions on purpose",
      "The assistant's answer to the clarifying question was itself vague (\"whatever's normal\"), so Claude filled the gap with a generic assumption instead of the clinic's specific requirement",
      "Intake forms are too complex a topic for Claude to help with at all",
      "The assistant should never respond to clarifying questions and should let Claude decide everything"
    ],
    correct: 1,
    explanation: "The clarifying question was a chance to supply the missing specific requirement, but the vague reply (\"whatever's normal\") passed the ambiguity right back, so Claude reasonably defaulted to a generic standard set of fields (B). This wasn't intentional non-compliance (A), the task itself isn't beyond scope (C), and avoiding clarifying questions altogether (D) would make the ambiguity problem worse, not better.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A logistics coordinator wants Claude to help redesign an entire warehouse shift-scheduling system in one go: staffing rules, shift swap policy, overtime calculations, holiday coverage, and a communication rollout plan, all in a single prompt. The response is long but shallow in several areas, and the coordinator isn't sure which part to trust.",
    question: "What is the best way for the coordinator to get a genuinely usable result?",
    options: [
      "Trust the shallow output as-is since Claude produced a complete-looking document",
      "Break the project into stages (e.g., staffing rules first, then swap policy, then overtime, etc.), working through each one in a focused way and building on confirmed pieces before moving to the next",
      "Give up on using Claude for anything involving multiple interconnected policies",
      "Resend the exact same single mega-prompt multiple times until the depth improves"
    ],
    correct: 1,
    explanation: "A five-part interconnected redesign is genuinely too much for one request to handle with real depth; sequencing the work into stages and building on confirmed pieces (B) lets each component get proper attention and lets earlier decisions inform later ones. Trusting shallow output (A) risks real operational mistakes, abandoning the tool for complex work (C) throws away a workable approach, and repeating an overloaded prompt (D) doesn't fix a scope problem.",
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "A sales rep asks Claude to \"write a follow-up email\" after a client call but doesn't mention what was discussed, the client's name, or what the next step should be. The email that comes back is generic and could be sent to any client after any call.",
    question: "What should the rep do differently?",
    options: [
      "Give up and write the follow-up email manually every time",
      "Include the client's name, key discussion points, and the desired next step in the request so the email can be specific",
      "Assume the rep's account has limited features compared to other users",
      "Send the generic email as-is since personalizing it isn't necessary"
    ],
    correct: 1,
    explanation: "A follow-up email needs specifics — who, what was discussed, what's next — to be anything other than generic; including them (B) directly fixes the root cause. This is not an account limitation (C) or a reason to abandon the tool (A), and sending a generic email to a client (D) is a poor outcome that's easily avoided.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "An event planner is 40 minutes into a conversation with Claude about vendor selection when she pivots to asking about a completely unrelated topic: drafting a farewell speech for a retiring colleague. The speech that comes back oddly references catering and vendor contracts.",
    question: "What is the best way to handle this?",
    options: [
      "Keep clarifying in the same conversation that the speech has nothing to do with vendors, repeating this each time it happens",
      "Start a new conversation dedicated to the farewell speech, since it's unrelated to the vendor discussion and doesn't need that context",
      "Conclude that Claude cannot write speeches",
      "Blend the vendor and speech topics together since Claude already introduced the connection"
    ],
    correct: 1,
    explanation: "When a new task is entirely unrelated to what's already in the conversation, that prior context is more likely to leak in unhelpfully than to help — starting a fresh conversation (B) is the more reliable and efficient fix. Repeatedly correcting within the same cluttered thread (A) is less efficient than just starting clean, this isn't a capability gap (C), and deliberately blending unrelated topics (D) compounds the problem.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A training manager asks Claude to \"make the onboarding guide better.\" The response focuses heavily on rewriting the tone, when what the manager actually wanted was to reorganize the section order and add a checklist — tone wasn't a concern at all.",
    question: "What is the most likely cause of the mismatch?",
    options: [
      "The word \"better\" is ambiguous and could mean many different kinds of improvement, so Claude guessed at one interpretation rather than the one the manager had in mind",
      "Claude decided tone mattered more than structure and overruled the manager's intent",
      "Onboarding guides are outside the range of documents Claude can improve",
      "The manager's document was too short to work with"
    ],
    correct: 0,
    explanation: "\"Make it better\" is genuinely ambiguous — it could mean tone, structure, clarity, length, or more — so Claude picked a plausible interpretation that happened not to match what the manager wanted (A). This isn't Claude overriding the manager's actual intent, since no specific intent was stated (ruling out B); it's not a document-type or length limitation (C, D).",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A customer support manager has spent 25 turns in a conversation trying to get Claude to draft a new escalation policy, but each round of feedback (\"more detail here,\" \"less formal there,\" \"actually reconsider that section\") has left the draft an inconsistent patchwork where some sections reflect old feedback and others don't.",
    question: "What is the most effective next move?",
    options: [
      "Continue giving more incremental feedback in the same conversation indefinitely",
      "Consolidate all current requirements into one clear, complete set of instructions and start a new conversation (or a clearly reset point) using that consolidated brief plus the best parts of the existing draft",
      "Discard everything and start over completely from a blank page with no reference to prior work",
      "Ask Claude to \"remember everything we discussed\" and continue exactly as before"
    ],
    correct: 1,
    explanation: "After many rounds of piecemeal feedback, the draft has drifted into an inconsistent patchwork; consolidating everything into one clear brief and giving Claude a clean, well-defined starting point (B) — while still reusing the good parts already written — resolves the inconsistency more reliably than more incremental patching. Continuing indefinitely (A) is what created the problem; discarding useful prior work entirely (C) wastes real progress, and simply asking Claude to \"remember everything\" (D) doesn't address the accumulated inconsistency itself.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A paralegal asks Claude to summarize a lengthy deposition transcript in \"a paragraph or two\" but receives back a single dense paragraph that's actually about a full page long.",
    question: "What is the most direct way to fix this?",
    options: [
      "Ask Claude to revise it down to a specific word or sentence count, since \"a paragraph or two\" was open to interpretation",
      "Manually cut the paragraph down word by word",
      "Conclude Claude cannot follow length instructions and avoid using it for summaries",
      "Restate the entire original request in a brand-new conversation"
    ],
    correct: 0,
    explanation: "\"A paragraph or two\" is a loose length guideline that can be interpreted generously; giving a concrete target like a word or sentence count (A) removes the ambiguity directly, and doing so as a quick follow-up keeps the existing context. Manual editing (B) is unnecessary extra work, the length-following capability generally works fine once given a precise target (ruling out C), and restarting a fresh conversation (D) isn't needed for a simple length adjustment.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A nonprofit grant writer regularly needs Claude to turn program data into consistent one-page funder updates. Each month she gets slightly different structure, and reviewers complain the reports \"don't look like a series.\" She has never given the same framing twice.",
    question: "What would best solve the inconsistency across monthly reports?",
    options: [
      "Accept that monthly variation is unavoidable and ask reviewers to adjust their expectations",
      "Create a standard reusable prompt or template specifying section order, headers, and length, and reuse it every month with just the new data swapped in",
      "Write each month's report manually since consistency can't be achieved with Claude",
      "Ask Claude to guess her preferred structure by reviewing a past report she never shares"
    ],
    correct: 1,
    explanation: "A saved template locking in section order, headers, and length (B) is exactly what produces a consistent \"series\" look across months, since the same structure is reused with just new data plugged in. Treating inconsistency as unavoidable (A) accepts a solvable problem, going fully manual (C) throws away real time savings, and expecting consistency without ever supplying the reference material (D) sets up the same failure again.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "An operations analyst asks Claude to \"analyze this data and tell me what's wrong\" while pasting in a spreadsheet-like block of numbers with no column headers or explanation of what the numbers represent.",
    question: "What is the most likely reason the analysis feels off-base?",
    options: [
      "Claude cannot read numerical data under any circumstances",
      "Without headers or context describing what the numbers mean, Claude has to guess at the data's meaning, which can lead it in the wrong direction",
      "The analyst's spreadsheet software is incompatible with Claude",
      "Data analysis tasks always fail regardless of how they're described"
    ],
    correct: 1,
    explanation: "Raw numbers with no labels or explanation force Claude to guess what's being measured, which is a recipe for a misdirected analysis (B) — this is a missing-context issue, not a hard capability limit (A, D) or a compatibility problem (C, which isn't really applicable to pasted text).",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A product manager wants a single response from Claude that includes: a competitive analysis of five rival products, a prioritized feature roadmap for the next two quarters, a pricing recommendation, and messaging for a launch announcement. She gets a response that touches all four but each section is superficial and the roadmap doesn't actually reflect the competitive analysis findings.",
    question: "What is the best explanation and fix?",
    options: [
      "Claude randomly ignored the connections between sections and this is unfixable",
      "The request combined several substantial, interdependent deliverables into one ask; the PM should do the competitive analysis first, review it, then feed its findings into a separate request for the roadmap, and so on",
      "The PM should abandon using Claude for roadmap planning since this is inherently outside its ability",
      "The PM should resend the exact same prompt, since more attempts eventually average out to a coherent result"
    ],
    correct: 1,
    explanation: "Four interdependent, substantial deliverables in one request is too much to develop with real depth or connect properly; sequencing the work — completing and reviewing the competitive analysis before using it to inform the roadmap (B) — lets each piece actually build on the last. This isn't random or unfixable (A), the task is within reach when properly staged (ruling out C), and repeating the same overloaded prompt (D) won't reliably produce coherent cross-references.",
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "A front-desk coordinator at a dental office asks Claude to write a reminder text for patients, and gets back a message that's appropriate but uses the word \"patient\" five times awkwardly and reads stiffly for a text message.",
    question: "What is the simplest way to improve it?",
    options: [
      "Ask for a shorter, more casual, text-message-appropriate version in a follow-up message",
      "Assume text messages are not something Claude can write well and switch tools",
      "Send it as-is since minor awkwardness doesn't matter",
      "Start a completely new conversation and re-describe the entire dental office from scratch"
    ],
    correct: 0,
    explanation: "A quick, specific follow-up naming the desired register (\"shorter, casual, text-appropriate\") (A) is the fastest and most direct fix, and the existing conversation already has the needed context. This isn't a fundamental capability gap (B), sending stiff-sounding text to patients isn't ideal when an easy fix is available (C), and restarting from scratch (D) is unnecessary for a tone tweak.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A university research assistant has been using Claude for weeks to help summarize academic articles for a literature review, but has to explain the citation format, summary length, and key-themes structure every single time, and results vary because instructions are worded slightly differently each session.",
    question: "What change would most improve efficiency and consistency?",
    options: [
      "Save a standard reusable prompt describing the citation format, desired length, and structure once, and reuse it for every new article going forward",
      "Continue explaining requirements fresh each time, accepting the variability as normal",
      "Stop using Claude for literature reviews since consistency isn't achievable",
      "Ask a research partner to standardize the results manually after each session"
    ],
    correct: 0,
    explanation: "A saved template capturing the format, length, and structure once (A) is a reusable input that removes the variability caused by re-explaining things slightly differently each time. Continuing to re-explain each time (B) is what's already producing inconsistent results, dropping the tool (C) throws away real value, and manually standardizing after the fact (D) is more effort than just fixing the input up front.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A small business owner asks Claude \"is this a good idea?\" while pasting in a one-line description of a promotional offer, with no information about the target customers, budget, timing, or business goals.",
    question: "What is the most likely reason the response feels generic and not very useful?",
    options: [
      "Claude cannot evaluate business ideas at all",
      "Without context on the target customers, budget, timing, or goals, Claude has nothing specific to weigh the idea against, so it can only respond in general terms",
      "The owner's business is too small for Claude to give relevant advice",
      "Promotional offers are a topic Claude has no knowledge of"
    ],
    correct: 1,
    explanation: "Evaluating whether an idea is \"good\" requires knowing what it should be good for and for whom — without target customers, budget, timing, or goals, only generic feedback is possible (B). This is a missing-context problem, not a limitation tied to business size (C), topic (D), or a blanket incapacity to evaluate ideas (A).",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A benefits administrator has an ongoing conversation with Claude about updating the employee benefits FAQ. Midway through, she also starts asking about unrelated IT password reset instructions in the same thread. When she returns to ask for a final version of the benefits FAQ, oddly worded references to password resets appear in one of the answers.",
    question: "What is the best way to prevent this kind of mixing in the future?",
    options: [
      "Continue mixing unrelated topics in one conversation since it saves the effort of opening multiple tabs",
      "Use separate conversations for genuinely unrelated topics, so each stays focused and content from one doesn't leak into the other",
      "Avoid asking Claude multiple questions in a single day",
      "Assume the FAQ is being auto-corrupted by an unrelated system bug"
    ],
    correct: 1,
    explanation: "Keeping unrelated topics in separate conversations (B) prevents context from one bleeding into the other, which is what caused the password-reset content to leak into the FAQ. Deliberately mixing topics (A) is what caused the issue in the first place, limiting overall daily usage (C) doesn't address the actual cause, and there's no indication of a system bug (D) — this is a predictable consequence of combined context.",
  },
  {
    domain: 7,
    difficulty: 5,
    scenario: "A construction project manager wants Claude, in one prompt, to reconcile a 200-line change-order log, flag discrepancies against the original contract, recalculate the running budget impact, and draft a client-facing explanation letter. The output flags a few discrepancies but misses several obvious ones and the budget recalculation contains an error the PM catches on inspection.",
    question: "What is the best way to get a more reliable result?",
    options: [
      "Trust the numbers as given since Claude produced a confident-sounding answer",
      "Break the task into stages: first reconcile and flag discrepancies, verify that output, then request the recalculation as its own step referencing the verified discrepancies, then draft the letter last",
      "Conclude Claude cannot be used for anything involving numbers",
      "Repeat the exact same all-in-one prompt, since repetition improves accuracy on complex numeric tasks"
    ],
    correct: 1,
    explanation: "A four-stage task involving detailed reconciliation, discrepancy analysis, recalculation, and drafting is a lot to do reliably in one pass; splitting it into verified stages (B) means each step's output can be checked before it becomes the input to the next, catching errors before they compound. Trusting confident-sounding but unverified output (A) is risky for financial figures, avoiding numeric tasks altogether (C) is an overcorrection, and repeating the identical overloaded prompt (D) doesn't fix the underlying issue of too much done at once.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A restaurant manager asks Claude to write a job posting for a line cook and specifies pay, hours, and required experience, but forgets to mention that the restaurant is a vegan establishment. The posting comes back solid but doesn't emphasize plant-based cooking experience, which the manager actually cares about most.",
    question: "What should the manager do?",
    options: [
      "Rewrite the whole posting from scratch manually since the omission means the AI-generated draft is unusable",
      "Send a quick follow-up adding the missing detail (plant-based/vegan focus) and ask for the posting to be revised to emphasize it",
      "Conclude Claude cannot write job postings for specialty restaurants",
      "Post the listing as-is since minor omissions rarely matter to applicants"
    ],
    correct: 1,
    explanation: "The vegan focus was simply never mentioned in the original request, so its absence in the draft is a missing-detail problem, not a flaw in the draft itself — a quick follow-up supplying it (B) is the efficient fix, since the existing draft is a good starting point. Starting over from scratch (A) discards useful work unnecessarily, this isn't a specialty-restaurant capability gap (C), and skipping a detail the manager says matters most (D) risks the wrong applicants.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A call center trainer asks Claude to write a script for handling angry customers, and specifies the tone should be \"assertive.\" The result comes across as borderline confrontational rather than calm-but-firm, which isn't what the trainer meant.",
    question: "What is the best explanation and next step?",
    options: [
      "\"Assertive\" is a word that can be interpreted multiple ways; the trainer should clarify with a more precise description (e.g., \"calm, firm, and de-escalating, not confrontational\") in a follow-up",
      "Claude is incapable of writing customer service scripts appropriately",
      "The trainer should abandon the request and write the script alone",
      "The trainer should repeat the word \"assertive\" more forcefully in the next message"
    ],
    correct: 0,
    explanation: "\"Assertive\" is genuinely ambiguous and can reasonably be read as either calm-firm or confrontational; giving a more precise description of the intended tone (A) resolves the ambiguity directly. This isn't a capability failure specific to customer service writing (B), abandoning the task (C) is unnecessary when a quick clarification would work, and simply repeating the same ambiguous word more forcefully (D) doesn't add any new information to disambiguate it.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A insurance claims supervisor has spent over an hour going back and forth with Claude trying to build a standardized claims-triage checklist, but every time she asks for \"one more adjustment,\" contradictions pile up: an earlier rule says escalate claims over $5,000, a later addition says escalate over $10,000, and neither was explicitly removed.",
    question: "What is the most effective way to resolve this?",
    options: [
      "Keep adding more adjustments to the same conversation and hope the contradictions cancel out",
      "Explicitly state the final, current rule and ask Claude to reconcile the checklist against just that one rule, removing the outdated version, or restate the complete current ruleset fresh if confusion persists",
      "Assume Claude cannot maintain consistency in checklists and build it manually from that point on",
      "Delete the entire conversation and provide zero prior context, rebuilding intuition on what was already decided from memory alone"
    ],
    correct: 1,
    explanation: "The contradiction exists because an outdated rule was never explicitly retracted, so pointing to the single current rule and asking for reconciliation — or, if needed, restating the complete current ruleset cleanly — resolves the conflict directly (B). Continuing to pile on adjustments (A) is what created the contradiction, switching to fully manual work (C) is an overreaction to a fixable input issue, and discarding all context and working from memory (D) risks losing already-good decisions unnecessarily.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A marketing director has Claude drafting a full campaign brief across many turns: audience, channels, budget split, creative concepts, and KPIs. Partway through, she realizes the audience she described early on was wrong, but never corrected it — later parts of the brief (creative concepts, channel choices) are now built on the wrong audience assumption.",
    question: "What is the most reliable way to fix this?",
    options: [
      "Only correct the very last message, leaving earlier sections referencing the wrong audience unresolved",
      "Explicitly correct the audience description and ask Claude to review and update all downstream sections (creative concepts, channels, etc.) that depended on it",
      "Start a completely new conversation and rebuild the entire brief from nothing, discarding all already-good creative work",
      "Ignore the error since audience details rarely affect the rest of a campaign brief"
    ],
    correct: 1,
    explanation: "Since later sections were built on the incorrect audience, explicitly correcting it and asking for a review of dependent sections (B) is the most reliable way to propagate the fix without losing the good parts of the work already done. Correcting only the latest message (A) leaves earlier, now-wrong sections standing, throwing out everything and starting over (C) wastes useful creative work, and audience is generally foundational to a campaign brief, so ignoring the error (D) risks a misaligned campaign.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A pharmacy operations lead asks Claude, in a single prompt, to redesign the entire medication-refill workflow, update every staff role description, draft new patient communication templates, and create a training rollout schedule — all interconnected, and all at once. The response is a jumble that partially addresses each piece but doesn't connect them coherently.",
    question: "What is the best way to approach this task?",
    options: [
      "Accept the jumbled draft and manually untangle the connections between pieces afterward",
      "Recognize this as too much to do coherently in a single request, and instead work through it in an order where each completed, reviewed piece informs the next (e.g., workflow first, then roles, then communications, then training)",
      "Conclude Claude is fundamentally unable to help with workflow redesign",
      "Resend the identical mega-prompt several times, since repeated attempts on complex multi-part tasks tend to converge on a coherent result"
    ],
    correct: 1,
    explanation: "Four deeply interconnected deliverables in a single ask is too much to develop coherently at once; sequencing the work so each reviewed piece can properly inform the next (B) produces a genuinely connected result. Manually untangling a jumbled draft after the fact (A) is more effort than doing it right the first time, workflow redesign is within reach when properly staged (ruling out C), and repeating the same overloaded prompt (D) doesn't reliably produce coherence.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A legal assistant asks Claude to \"look over this contract clause\" and gets back a response focused on grammar and formatting, when what the assistant actually wanted was a check for ambiguous language that could be exploited.",
    question: "What is the best explanation for the mismatch?",
    options: [
      "\"Look over\" is a vague instruction that doesn't specify what kind of review is wanted, so Claude defaulted to a general read rather than the specific ambiguity check intended",
      "Claude refuses to analyze legal risk in any contract clause",
      "The clause itself must be too short to analyze properly",
      "The assistant's request triggered an error that produced the wrong kind of response"
    ],
    correct: 0,
    explanation: "\"Look over\" doesn't specify what kind of review is wanted, so a general pass (grammar, formatting) is a reasonable but mismatched interpretation of a vague request (A). This isn't a blanket refusal to discuss legal risk (B), clause length isn't indicated as the issue (C), and there's no indication of an error (D) — the response is a plausible, just wrong, interpretation.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A recruiter uses Claude weekly to screen resumes against job descriptions but writes the evaluation criteria differently every time, from memory, leading to noticeably inconsistent screening notes from week to week that make it hard to compare candidates fairly.",
    question: "What is the best fix for consistency?",
    options: [
      "Create a standard reusable evaluation criteria prompt (weighting for skills, experience, etc.) and use the same one for every resume screening going forward",
      "Continue writing criteria from memory but try to remember them more carefully next time",
      "Stop using Claude for resume screening since consistency isn't achievable with the tool",
      "Ask each hiring manager to write their own separate criteria independently every time"
    ],
    correct: 0,
    explanation: "A standard, reusable evaluation prompt applied consistently every week (A) is exactly what removes the from-memory variability causing inconsistent notes. Relying on memory more carefully (B) doesn't address the root cause of variability, abandoning the tool (C) discards a workable approach, and having each manager write independent criteria (D) would introduce even more inconsistency, not less.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "An operations director has a 50-turn conversation with Claude spanning a vendor negotiation strategy, then a pivot to staffing plans, then back to vendor terms, then a tangent about office relocation. When she now asks for \"the final vendor negotiation summary,\" the response incorrectly includes staffing and relocation details mixed in.",
    question: "What is the most effective way to get a clean, accurate summary?",
    options: [
      "Keep asking for corrections within the same sprawling conversation, one mixed-in detail at a time",
      "Start a new conversation focused only on the vendor negotiation, providing just the relevant vendor-related facts and decisions as a clean recap",
      "Conclude that Claude cannot produce accurate summaries of long conversations",
      "Ask Claude to summarize the entire 50-turn conversation exactly as-is with no guidance on what to include"
    ],
    correct: 1,
    explanation: "A conversation that has drifted across several unrelated topics accumulates context that's more likely to bleed into an unrelated summary than help it — a fresh conversation with just the relevant vendor facts recapped cleanly (B) is the most reliable path to an accurate result. Correcting piecemeal within the same sprawling thread (A) is slower and less reliable, this isn't a fixed summarization limit (C), and asking for a summary of everything with no scoping (D) would likely reproduce the same mixing problem.",
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "A florist asks Claude to write an Instagram caption for a wedding bouquet photo, but the caption that comes back is written like a formal press release rather than a casual social caption.",
    question: "What's the most direct fix?",
    options: [
      "Follow up specifying a casual, social-media-appropriate tone with appropriate length and maybe an emoji or two",
      "Assume Claude cannot write in a casual voice and hire a social media consultant",
      "Post the caption as-is since tone doesn't really affect engagement",
      "Start over completely and re-describe the flower shop from the beginning"
    ],
    correct: 0,
    explanation: "The mismatch is a tone specification gap, easily closed with a quick, specific follow-up (A) building on the existing draft. This isn't a fundamental voice limitation (B), tone does matter for social engagement so posting a mismatched caption isn't ideal (C), and restarting entirely (D) is more than needed for a tone adjustment.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A facilities manager asks Claude to compare quotes from four vendors for a roof repair, but only pastes in three of the four quotes, having forgotten the fourth. The comparison Claude produces is accurate for the three quotes given but the manager is confused why the fourth vendor isn't mentioned.",
    question: "What is the best explanation and fix?",
    options: [
      "Claude cannot compare more than three quotes at a time",
      "The fourth quote was never provided, so Claude compared only what it had; the manager should paste in the missing quote and ask for an updated comparison",
      "The manager should assume the comparison logic is broken and manually redo all four comparisons",
      "Vendor quote comparison is not a task Claude can perform reliably"
    ],
    correct: 1,
    explanation: "The fourth quote simply wasn't part of the input, so its absence from the output is expected, not a flaw — supplying it and asking for an updated comparison (B) directly resolves it. This isn't a numeric input-count limitation (A), nothing suggests broken comparison logic requiring a full manual redo (C), and the task itself is well within scope once all the input is provided (ruling out D).",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A nonprofit volunteer coordinator asks Claude for \"a short volunteer sign-up message\" and gets a message that's three sentences, which she considers exactly right, but then a colleague asks for the same kind of message next month and gets six sentences from a completely different, freshly typed request.",
    question: "What would most reliably make the output length consistent across requests?",
    options: [
      "Explicitly stating a target sentence or word count each time, ideally reused via a saved prompt template so it doesn't rely on remembering to add it",
      "Accepting that length will vary randomly since there's no way to control it",
      "Always asking for \"short\" and hoping it means the same thing every time",
      "Switching to writing all future sign-up messages by hand to guarantee consistency"
    ],
    correct: 0,
    explanation: "A vague word like \"short\" can be interpreted differently request to request; specifying a concrete target (word or sentence count) and reusing it as a saved template (A) removes that variability reliably. Length is controllable, so accepting random variation (B) settles for less than achievable, relying on \"short\" alone repeats the ambiguity that caused the inconsistency (C), and going fully manual (D) is unnecessary once a precise, reusable instruction exists.",
  },
  {
    domain: 7,
    difficulty: 5,
    scenario: "A compliance officer at a bank wants Claude to, in one request, review a 40-page policy document for regulatory gaps, rewrite the non-compliant sections, translate the rewritten sections into plain language for staff training, and produce an executive summary of the changes. The response addresses all four but the plain-language translation still contains regulatory jargon, and the executive summary doesn't match the actual rewritten sections.",
    question: "What is the best way to fix this going forward?",
    options: [
      "Treat this as unfixable since compliance documents are inherently too complex for any tool to help with",
      "Break the task into sequential, verifiable stages: first identify and confirm the gaps, then do the rewrite and verify it against the original, then translate the verified rewrite into plain language, then summarize the confirmed final version",
      "Accept the current output and manually reconcile the mismatches between sections after the fact",
      "Resend the same four-part request repeatedly until all sections happen to align"
    ],
    correct: 1,
    explanation: "Four substantial, dependent stages of compliance work in a single request is too much to keep coherent and accurate at once; verifying each stage before it feeds the next (B) — gaps, then rewrite, then translation, then summary — prevents errors and mismatches from compounding, which is exactly what happened here. This isn't an inherently unfixable task (A), reconciling mismatches manually after the fact (C) is more work than doing it right in stages, and repeating the identical overloaded request (D) doesn't address why the pieces went out of sync.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A restaurant chain's regional manager asks Claude to draft a memo about a new inventory policy but doesn't mention that it needs to reference the specific POS system the stores use. Claude's memo describes generic inventory practices that don't map to how staff actually interact with their system.",
    question: "What should the manager do?",
    options: [
      "Send a follow-up naming the specific POS system and how staff interact with it, then ask for the memo to be revised to reference those specifics",
      "Conclude Claude doesn't know enough about restaurant operations to help",
      "Rewrite the entire memo from scratch without using Claude further",
      "Publish the generic memo since staff can figure out the specifics themselves"
    ],
    correct: 0,
    explanation: "The missing detail — the specific POS system — was never in the original request, so its absence in the output is a predictable gap; supplying it in a follow-up (A) is the direct and efficient fix. This isn't a domain-knowledge failure (B), starting over from scratch (C) is unnecessary when a follow-up would work, and publishing a memo staff will struggle to apply (D) risks confusion that's easily avoided.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A speech-language pathologist in a school district asks Claude to draft individualized progress notes for five students, all in one message with minimal detail per student (just first names, no specifics). The notes come back generic and interchangeable, missing each student's actual progress markers.",
    question: "What is the best way to fix this?",
    options: [
      "Provide the specific, individual progress details for each student (goals, recent performance, notable observations) rather than just names, since generic input produced generic output",
      "Ask Claude to guess likely progress markers based on typical caseloads",
      "Conclude that progress notes are not something Claude can help draft",
      "Submit the same minimal request again in hopes of more specific results"
    ],
    correct: 0,
    explanation: "Names alone give no substance to work from; providing each student's actual goals, recent performance, and observations (A) supplies the missing specifics needed for individualized notes. Asking Claude to guess plausible-sounding markers (B) risks fabricated, inaccurate content in a student record, this isn't a task-type limitation (C), and resubmitting the same minimal request (D) won't produce different results since the underlying gap is unchanged.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A city parks department administrator has been chatting with Claude for over two hours, working through a public event permit process redesign that pivoted through five different sub-topics: fee structure, application forms, review timelines, insurance requirements, and appeals process. She now wants \"the whole thing pulled together into one clean policy document,\" but the result is disorganized, repeats itself, and buries the appeals section in the middle of the fee discussion.",
    question: "What is the best approach to get a clean final document?",
    options: [
      "Ask for minor formatting fixes within the same long conversation and hope the underlying disorganization resolves",
      "Start a new conversation, and for each of the five sub-topics, paste in just the finalized decision reached earlier, then ask for one organized document built from those clean building blocks",
      "Conclude the redesign project has failed and needs to be restarted from a blank slate with no reference to two hours of decisions",
      "Ask Claude to reorder the sections without providing any additional guidance on what belongs where"
    ],
    correct: 1,
    explanation: "After a long, winding conversation, the raw history is a poor source to compile a clean document from directly; extracting the finalized decision from each sub-topic and feeding those distilled building blocks into a fresh, focused request (B) produces the organized result the administrator wants while still preserving two hours of real work. Minor formatting fixes on a disorganized base (A) won't fix structural repetition, discarding all the decisions (C) wastes significant progress, and reordering with no added guidance (D) doesn't address why content bled across sections in the first place.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "An IT helpdesk lead builds a Claude prompt that reliably turns messy ticket notes into clean, well-categorized incident summaries for the weekly report. It works so well that other team leads start asking her to redo their notes manually because they don't know how she does it.",
    question: "What is the best way to scale this success across the team?",
    options: [
      "Continue being the sole person who runs the process for everyone, to keep quality consistent",
      "Share the reusable prompt and a short explanation of how to use it so other leads can run it themselves on their own notes",
      "Discourage other leads from using Claude for this since only one prompt can work at a time",
      "Ask each lead to independently discover their own version of the prompt through trial and error"
    ],
    correct: 1,
    explanation: "Sharing the working prompt along with a short usage explanation (B) is exactly how a successful one-off approach becomes reusable and scalable across a team. Staying the sole bottleneck (A) doesn't scale, there's no reason only one prompt can be used team-wide (C), and having everyone rediscover it independently (D) wastes time already saved by having a working solution.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A hotel general manager asks Claude, across a single message, to write a guest apology email for a service failure, draft an internal incident report about the same failure, and create a staff training note to prevent recurrence — three documents with different audiences and purposes bundled into one request. The result blends language from all three; the guest apology accidentally includes internal incident-report phrasing.",
    question: "What is the best way to fix this?",
    options: [
      "Send the blended apology as-is since guests are unlikely to notice the internal phrasing",
      "Request each of the three documents separately, since they have different audiences and tones that don't mix well in a single combined request",
      "Conclude Claude cannot write guest-facing communications after a service failure",
      "Ask Claude to fix just the one sentence that sounds most internal, leaving the rest of the blending unaddressed"
    ],
    correct: 1,
    explanation: "Three documents with different audiences and purposes bundled together invites exactly this kind of cross-contamination; separating them into distinct requests (B) keeps each document's tone and content appropriate to its actual audience. Sending blended guest-facing language externally (A) is a real reputational risk, this isn't a capability failure around apology writing (C), and patching a single sentence (D) doesn't address the systemic mixing likely present throughout.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A church administrator asks Claude to format a weekly bulletin, specifying two columns and a specific font style. The result is well-organized content but presented as plain running text with no columns, since Claude generates text rather than a formatted document.",
    question: "What is the most accurate way to think about this outcome?",
    options: [
      "The content and structure can be requested and organized clearly, but visual page layout (columns, specific fonts) is something to apply afterward in a document/design program — asking for a clear content outline and formatting suggestions is the effective ask",
      "This proves Claude is broadly incapable of helping with bulletins at all",
      "The administrator should keep repeating the same request expecting a two-column PDF to eventually appear",
      "The administrator's request contained a typo that confused the formatting instructions"
    ],
    correct: 0,
    explanation: "Recognizing the real boundary — text content and organization versus actual visual page layout — lets the administrator ask for what's actually deliverable (a clear outline, suggested structure) and then apply it in a layout tool (A). Treating this as total incapability (B) overstates the limitation, repeating the same request won't produce a different kind of output (C), and there's no indication of a typo (D) — the mismatch is about output type, not wording.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A community college advisor asks Claude to \"help students pick classes\" by pasting in one student's full academic history, degree requirements, and preferences, and gets a strong, specific recommendation. She then tries to reuse the exact same message for a different student without updating any of the details, and is confused when the recommendation is still about the first student.",
    question: "What is the most accurate explanation?",
    options: [
      "Claude has a memory limit that prevented it from handling the second student",
      "The message wasn't updated with the second student's actual information, so the recommendation naturally still reflects the first student's details",
      "The advisor's account needs to be reset between students",
      "Claude cannot give course recommendations to more than one student ever"
    ],
    correct: 1,
    explanation: "Reusing the identical message without updating the actual details means the second request still describes the first student, so the same-looking recommendation is expected, not a malfunction (B). This isn't a memory-limit issue (A) or an account problem (C), and Claude can certainly advise multiple different students (ruling out D) — the input simply needs to change with each one.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A regional sales director wants Claude, in one prompt, to analyze last quarter's sales data across 8 territories, identify underperforming reps, draft individualized coaching plans for each underperformer, and create a board-ready summary slide deck outline — all connected and consistent with each other. The result superficially covers everything, but the coaching plans don't actually reference the specific performance issues identified in the analysis.",
    question: "What is the best approach going forward?",
    options: [
      "Treat the disconnect as unavoidable since connecting analysis to individualized coaching is beyond what's achievable",
      "Do the territory analysis first and confirm the underperformers and their specific issues, then use those confirmed findings as input to a separate request for individualized coaching plans, then build the board summary from the finished plans",
      "Accept the plans as generic since board members won't check them against the raw data anyway",
      "Resend the identical single mega-prompt, since the connections will eventually align with enough repetitions"
    ],
    correct: 1,
    explanation: "This is a case where the total task is too much for one request to keep properly connected; completing and confirming the analysis first, then explicitly feeding its specific findings into the coaching-plan request (B), ensures the plans actually reference real performance issues instead of drifting generic. Treating this as impossible (A) overstates the limitation — staging fixes it — accepting disconnected, generic coaching plans (C) undermines their purpose, and repeating the same overloaded prompt (D) doesn't reliably fix a structural scope problem.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A theater company's production manager asks Claude to write a press release, and separately, in the same message, asks a completely different question about whether a specific insurance policy covers a rented venue. The response mixes legal-sounding insurance caveats into the press release draft.",
    question: "What is the best way to avoid this kind of mixing?",
    options: [
      "Combine even more unrelated questions into single messages to save time",
      "Separate genuinely unrelated requests (press release vs. insurance question) into distinct messages or conversations so each gets focused, uncontaminated treatment",
      "Give up on asking Claude more than one question per day",
      "Accept that press releases will always contain irrelevant content when using Claude"
    ],
    correct: 1,
    explanation: "Bundling two unrelated topics together in one message increases the chance content bleeds across them; separating them (B) keeps each response focused on its own topic. Combining even more unrelated topics (A) would make the problem worse, limiting overall usage (C) is an overcorrection unrelated to the actual cause, and this kind of mixing is not inevitable (D) — it's avoidable by structuring requests better.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "An HR generalist asks Claude to write interview questions for a \"marketing role\" without specifying seniority level, whether it's for a specialist or a manager, or which marketing discipline (content, paid media, brand). The questions that come back are too basic for the actual senior paid-media manager role being filled.",
    question: "What is the best next step?",
    options: [
      "Specify the seniority level, discipline, and role scope, then request revised, more targeted questions",
      "Assume Claude cannot write interview questions above an entry level",
      "Use the basic questions anyway since interview questions rarely need to match the role precisely",
      "Abandon using Claude for interview prep since the first attempt didn't match"
    ],
    correct: 0,
    explanation: "The mismatch traces directly to missing specifics — seniority, discipline, scope — that would have anchored more targeted questions; supplying them (A) is the direct fix. This isn't a seniority-level capability ceiling (B), using clearly mismatched questions for a real interview is a poor outcome (C), and abandoning the approach after one under-specified attempt (D) is premature.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A museum's education coordinator has a productive conversation with Claude generating a field trip worksheet, but then spends 15 more turns asking Claude to also plan the bus schedule, then the lunch logistics, then a completely unrelated docent training outline, all within that same thread. Now she wants to revisit and finalize the worksheet, but the response drifts into referencing bus timing.",
    question: "What is the best way to finalize a clean worksheet?",
    options: [
      "Keep working in the same thread, repeatedly telling Claude to ignore the bus and docent content",
      "Open a new conversation focused only on the worksheet, providing the current worksheet draft as the starting point without the unrelated logistics context",
      "Conclude that Claude cannot maintain focus across any multi-topic conversation",
      "Merge the worksheet and bus schedule content together since they were discussed in the same conversation"
    ],
    correct: 1,
    explanation: "Once a conversation has accumulated several unrelated tangents, isolating the actual task in a fresh conversation with just the relevant draft (B) is more reliable than continuing to fight the same cluttered context. Repeated in-thread corrections (A) are less efficient than simply starting clean, this isn't a general inability to stay focused (C) — it's a predictable effect of topic drift — and deliberately merging unrelated content (D) compounds rather than solves the problem.",
  },
  {
    domain: 7,
    difficulty: 1,
    scenario: "A yoga studio owner asks Claude to write a welcome email for new members but doesn't mention the studio's name, class schedule link, or the owner's name for the sign-off. The email reads well but has placeholder-style gaps where those specifics should be.",
    question: "What should the owner do?",
    options: [
      "Fill in the specific studio name, schedule link, and sign-off details, either by supplying them directly or asking for a revision that includes them",
      "Conclude Claude cannot write welcome emails for small businesses",
      "Send the email with placeholder gaps left in, since members will understand",
      "Start over completely rather than simply adding the missing details"
    ],
    correct: 0,
    explanation: "The gaps exist because the specific details were never provided, so supplying them, either directly or via a follow-up request (A), is the straightforward fix. This isn't a small-business capability gap (B), sending an email with visible placeholder-style gaps to new members looks unpolished (C), and starting over entirely (D) is more effort than simply adding what's missing.",
  },
  {
    domain: 7,
    difficulty: 3,
    scenario: "A city library's programming coordinator wants Claude to design an entire summer reading program in one request: age-tiered reading goals, a rewards/incentive structure, a full event calendar with themes, volunteer sign-up logistics, and promotional materials. The single response covers all five but the event calendar themes don't connect to the reading goals, and the promotional materials don't mention the rewards structure at all.",
    question: "What is the most effective way to fix this?",
    options: [
      "Publish the materials as-is, since patrons are unlikely to notice inconsistencies between components",
      "Develop the components in a deliberate sequence — reading goals first, then a rewards structure tied to those goals, then a calendar themed around both, then promotional materials referencing everything already finalized",
      "Conclude that Claude cannot help design multi-part programs",
      "Resend the same five-part request, expecting the connections to resolve with repetition"
    ],
    correct: 1,
    explanation: "Five interdependent components in one request is too much to keep mutually consistent at once; building them in a deliberate sequence where each stage explicitly references the finalized version of the last (B) ensures the pieces actually connect. Publishing inconsistent materials (A) risks real confusion for patrons, this isn't a fundamental capability wall for multi-part programs (C), and repeating the same overloaded request (D) doesn't fix a structural sequencing problem.",
  },
  {
    domain: 7,
    difficulty: 2,
    scenario: "A boutique fitness studio's social media coordinator wants Claude to consistently write in the studio's established playful, pun-heavy voice for every post, but keeps getting a more neutral, professional tone back because she never actually describes the voice, just says \"write a post.\"",
    question: "What is the best fix, and how should she make it repeatable?",
    options: [
      "Describe the playful, pun-heavy voice explicitly (with a couple of example posts) and save that description as a reusable prompt template for all future posts",
      "Accept the neutral tone since voice consistency isn't something that can be controlled",
      "Rewrite every post manually to inject the studio's voice after the fact",
      "Ask Claude to guess the studio's brand voice based on the studio's name alone"
    ],
    correct: 0,
    explanation: "Explicitly describing the desired voice, ideally with example posts, and saving it as a reusable template (A) both fixes the immediate mismatch and makes the fix repeatable for every future post. Voice is controllable through explicit instruction, so treating it as uncontrollable (B) is inaccurate, manual post-hoc rewriting (C) is more effort than needed, and guessing from a name alone (D) doesn't supply enough real information to reproduce a specific brand voice.",
  },
  {
    domain: 7,
    difficulty: 4,
    scenario: "A hospital patient-experience coordinator has been refining a patient survey with Claude over many turns: adding questions, removing others, rewording several, and reordering sections multiple times. She now asks for \"the final version\" and receives a survey that includes two questions she explicitly asked to remove earlier in the conversation, plus a wording change she'd reverted.",
    question: "What is the most reliable way to get an accurate final version?",
    options: [
      "Ask Claude to \"remove the two extra questions again\" and hope it also implicitly catches the reverted wording without being told",
      "Explicitly and completely restate the final intended state of the survey — every question, in final wording and order — as a single clear instruction, rather than relying on Claude to correctly track every edit across a long, iterative history",
      "Assume Claude is fundamentally incapable of editing surveys accurately over multiple turns",
      "Discard the entire survey and start completely over with a blank page"
    ],
    correct: 1,
    explanation: "Across many iterative edits, small inconsistencies can accumulate or get missed; explicitly restating the complete final intended state in one clear instruction (B) removes any ambiguity about what should and shouldn't be included, rather than relying on Claude to have perfectly tracked every change across a long history. A narrow, partial correction (A) risks missing other drifted details, this isn't a fundamental editing incapacity (C), and discarding all the substantive work already done (D) is unnecessary when restating the final state accomplishes the same goal faster.",
  },
];
