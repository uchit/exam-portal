export const QUESTIONS_D1 = [
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A marketing coordinator asks Claude to \"write a product description.\" The result is bland and could apply to almost any product in the category.",
    "question": "What should the coordinator add to get a description that actually fits their product?",
    "options": [
      "Nothing — the coordinator should just ask for three more versions and pick the best one",
      "The product's specific features, target customer, and what makes it different from competitors",
      "A request to make the writing \"more creative\"",
      "A note asking Claude to use more marketing buzzwords"
    ],
    "correct": 1,
    "explanation": "A vague prompt produces a generic answer because Claude has nothing specific to work from; adding real product details, audience, and differentiators (B) gives it something concrete to write about. Generating more random variations (A) or asking for vaguer stylistic tweaks like \"more creative\" (C) or buzzwords (D) doesn't fix the underlying problem — the description will still be generic, just differently worded."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An HR manager wants Claude to draft a rejection email for a job candidate. She types: \"Write a rejection email.\" The draft is generic and doesn't reflect that this candidate made it to the final round and was well-liked by the team.",
    "question": "What is the best way for the HR manager to fix this?",
    "options": [
      "Accept the draft since rejection emails are inherently generic",
      "Regenerate the response several times until one happens to sound warmer",
      "Provide context about the candidate's strong final-round performance and ask for a warmer, more personal tone",
      "Ask a coworker to rewrite it manually instead"
    ],
    "correct": 2,
    "explanation": "Telling Claude the relevant facts — that the candidate impressed the team — gives it what it needs to strike the right tone (C). Rerolling randomly (B) is inefficient and unreliable, accepting a mismatched draft (A) ignores the real problem, and abandoning the tool entirely (D) throws away a task Claude can handle well once given the right input."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A financial analyst wants Claude to review a quarterly expense report and flag anomalies. The analyst pastes only the raw numbers with no column labels or explanation of what a \"normal\" range looks like for this business.",
    "question": "What is the biggest risk with this approach?",
    "options": [
      "Claude will crash trying to process unlabeled numbers",
      "Claude might flag normal variation as anomalous, or miss real anomalies, because it lacks context on what's typical for this business",
      "Claude cannot read numeric data under any circumstances",
      "The report will be summarized in a random order"
    ],
    "correct": 1,
    "explanation": "Without labels or a sense of the business's normal ranges, Claude is guessing at what counts as unusual, which risks both false positives and missed issues (B). Claude can process numeric data fine (C), doesn't crash on unlabeled input (A), and ordering isn't the core risk here (D) — the real problem is missing interpretive context."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A real estate agent asks Claude to write a listing description for a house, giving only the address and price, but not the square footage, number of bedrooms, or any standout features.",
    "question": "What should the agent do before asking Claude to write the listing?",
    "options": [
      "Proceed as-is; Claude can look up the property details automatically",
      "Gather and include key facts like square footage, bedrooms, bathrooms, and notable features in the prompt",
      "Ask Claude to \"guess\" reasonable details based on the price",
      "Skip writing a description and just post the address"
    ],
    "correct": 1,
    "explanation": "Claude doesn't have live access to property listings, so it needs the concrete facts supplied directly (B). Assuming automatic lookup (A) or having Claude invent plausible-sounding but unverified details (C) risks inaccurate or misleading claims in a listing, and skipping the task (D) isn't a real solution."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A teacher wants Claude to create a reading comprehension quiz \"appropriate for my class.\" The teacher never states the grade level or reading level of the students.",
    "question": "Why is this prompt likely to produce a poor result?",
    "options": [
      "Claude cannot generate quizzes about reading comprehension at all",
      "Claude will default to a college reading level regardless of context",
      "\"Appropriate for my class\" is subjective, and without the grade or reading level Claude has no way to calibrate difficulty",
      "Quizzes require a specialized tool outside Claude's capability"
    ],
    "correct": 2,
    "explanation": "The phrase \"appropriate for my class\" means nothing without knowing the students' grade or reading level, so Claude is left guessing (C). Claude can absolutely generate quizzes (A, D), and it doesn't default to any single fixed level (B) — it will make some assumption, but there's no guarantee it matches the teacher's actual class."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A project manager needs Claude to help produce a full project kickoff package: a stakeholder summary, a risk list, and a timeline. The manager sends one message asking for \"the kickoff package\" with no further structure.",
    "question": "What is the best approach for getting a complete, well-organized result?",
    "options": [
      "Ask for all three deliverables in one prompt, but list them out explicitly with a short description of what each should include",
      "Send three completely separate, unrelated conversations for each piece",
      "Assume Claude will infer the three components and their exact scope automatically",
      "Ask only for the timeline since it's the most important piece"
    ],
    "correct": 0,
    "explanation": "Naming each deliverable explicitly in the request, even within one message, gives Claude a clear structure to follow so nothing gets missed or blended together (A). Splitting into unrelated conversations (B) loses shared context unnecessarily, hoping Claude infers scope (C) is unreliable, and dropping two of three deliverables (D) doesn't meet the actual need."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A nonprofit development director asks Claude to draft a fundraising appeal letter but doesn't mention the campaign's specific goal, deadline, or the donor segment being targeted.",
    "question": "What will most likely happen, and what's the fix?",
    "options": [
      "Claude will produce a letter with placeholder-like generic appeals; the director should supply the goal, deadline, and donor segment upfront",
      "Claude will refuse until given a donor database export",
      "The letter will be accurate because fundraising appeals follow a fixed template Claude already knows",
      "Nothing changes — appeal letters don't benefit from specifics"
    ],
    "correct": 0,
    "explanation": "Without the campaign's goal, deadline, or audience, Claude can only write something broadly appeal-shaped rather than tailored, so supplying those specifics upfront (A) is the fix. Claude doesn't require a database export to proceed (B), there's no universal fixed template that makes specifics unnecessary (C), and appeal letters clearly benefit from concrete campaign details (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A restaurant manager asks Claude to \"write a social media post about our new menu\" without saying what the new dishes are or which platform it's for.",
    "question": "What is missing that would most improve the result?",
    "options": [
      "The manager's personal writing style guide",
      "A list of the new dishes and the target platform (e.g., Instagram vs. a text-heavy newsletter)",
      "The restaurant's tax ID number",
      "Nothing; Claude will invent plausible dishes on its own"
    ],
    "correct": 1,
    "explanation": "Without knowing what's actually on the new menu or which platform the post is for, Claude can't write something accurate or correctly formatted (B). Having Claude invent dishes (D) risks factually wrong content, and a personal style guide (A) or tax ID (C) aren't relevant to this task."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An insurance claims adjuster wants Claude to draft a letter explaining a partial claim denial. The adjuster provides the policy section that applies and the specific facts of the claim before asking for the letter.",
    "question": "Why does this approach work well?",
    "options": [
      "It doesn't — insurance letters should never be drafted with AI assistance",
      "Providing the exact policy language and claim facts gives Claude the specific context needed to write an accurate, defensible letter",
      "It guarantees the letter will be legally binding without review",
      "Policy details are irrelevant to letter-writing tasks"
    ],
    "correct": 1,
    "explanation": "Grounding the request in the actual policy language and claim facts means Claude is working from accurate source material rather than guessing, producing a more precise draft (B). This doesn't make the letter automatically legally binding without human review (C), option (D) contradicts the point of providing context, and (A) overstates the risk — the issue is giving Claude the right input, not avoiding the tool entirely."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A hotel general manager asks Claude to write a response to a negative online review. The manager includes the guest's review text but not any internal notes about what actually happened during the stay.",
    "question": "What should the manager consider before sending the drafted response?",
    "options": [
      "Whether the draft acknowledges specifics of the actual incident, which requires giving Claude the internal account of what happened, not just the guest's review",
      "Whether the response is long enough to seem thorough",
      "Whether Claude used the word \"sincerely\" at the end",
      "Nothing further is needed since the guest's review alone is sufficient context"
    ],
    "correct": 0,
    "explanation": "A response based only on the public review can address the complaint in general terms but may misstate or omit specifics from the hotel's side of the story; giving Claude the internal account produces a more accurate, credible reply (A). Length (B) and a specific closing word (C) don't address the actual gap, and the review alone (D) is one-sided context."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "An event planner tells Claude: \"Help me plan a corporate holiday party,\" without mentioning the budget, guest count, or venue constraints.",
    "question": "What is the main downside of this prompt as written?",
    "options": [
      "Claude will decline to discuss party planning topics",
      "Suggestions may be impractical or mismatched to the planner's actual budget and constraints since none were shared",
      "Claude will only produce a list of venues, nothing else",
      "The response will always default to a formal black-tie theme"
    ],
    "correct": 1,
    "explanation": "Without budget, headcount, or venue constraints, any suggestions are just generic and may not fit the real situation at all (B). Claude doesn't refuse such requests (A), isn't limited to only listing venues (C), and doesn't have one fixed default theme it always reaches for (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A dental office administrator wants Claude to draft patient reminder texts. She tells Claude the appointment types, typical patient tone preferences (friendly, brief), and the practice's cancellation policy before asking for the drafts.",
    "question": "What does this example illustrate?",
    "options": [
      "That Claude needs excessive detail for even simple tasks",
      "That giving relevant background — audience tone, policy details, appointment types — upfront leads to more usable output than a bare request",
      "That reminder texts cannot be personalized",
      "That the cancellation policy is irrelevant to a reminder text"
    ],
    "correct": 1,
    "explanation": "Supplying tone preferences, appointment types, and the cancellation policy gives Claude everything it needs to draft texts that actually fit the practice's needs (B). This isn't excessive for the task (A) — a reminder text often does need to reference the cancellation policy (contradicting D) — and personalization is clearly possible (contradicting C)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A sales rep needs a proposal email sent to five prospects, each in a different industry. She wants each email personalized to that prospect's business and pain points.",
    "question": "What is the best way to structure this request?",
    "options": [
      "Send one prompt with all five prospects listed at once and no company-specific details, then merge fields later",
      "Ask Claude to write \"five sales emails\" with no further detail and personalize them manually afterward",
      "Handle each prospect in turn, giving Claude that prospect's industry, specific pain points, and any past conversation notes before drafting that one email",
      "Write one generic template and send it to all five unchanged"
    ],
    "correct": 2,
    "explanation": "Working through prospects one at a time with their specific industry, pain points, and history lets Claude produce genuinely tailored emails rather than generic ones (C). Listing all five with no details (A) or asking generically (B) still leaves Claude guessing at specifics, and a single unchanged template (D) defeats the stated goal of personalization."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A legal administrative assistant wants Claude to help draft a client-facing summary of a settlement agreement. She provides the full agreement text, plus a note about which sections are confidential and shouldn't appear in the summary.",
    "question": "Why is including the confidentiality note important here?",
    "options": [
      "It isn't important — Claude automatically detects confidential sections on its own",
      "It ensures the summary doesn't inadvertently surface details the client shouldn't see in that document, since Claude only knows what's marked if it's told",
      "It changes nothing about what Claude includes",
      "Confidentiality notes only matter for court filings, not summaries"
    ],
    "correct": 1,
    "explanation": "Claude has no independent way to know which parts of a document are meant to stay confidential unless that's specified; stating it explicitly prevents sensitive sections from leaking into the summary (B). Claude cannot detect confidentiality automatically (contradicting A), the instruction clearly does affect output (contradicting C), and the concern applies to any client-facing document, not just filings (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "An academic librarian asks Claude to \"summarize this research trend\" without specifying the field, timeframe, or intended audience for the summary.",
    "question": "What is the clearest weakness in this request?",
    "options": [
      "It's too short to be a valid request",
      "Key parameters — field, timeframe, audience — are missing, so Claude must guess at scope and depth",
      "Research trends cannot be summarized by Claude under any circumstance",
      "The request uses too much technical jargon"
    ],
    "correct": 1,
    "explanation": "\"This research trend\" doesn't specify which field, what time period, or who the summary is for, forcing Claude to guess and likely miss the mark (B). Length alone isn't the problem (A), Claude can summarize research topics (C), and the request actually lacks jargon rather than overusing it (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A retail store manager wants Claude to write a memo to staff about a new return policy. She provides the exact policy wording, the effective date, and notes that cashiers specifically need to know how it affects gift cards.",
    "question": "What does specifying the gift card detail accomplish?",
    "options": [
      "It ensures the memo addresses a point the manager knows staff will ask about, rather than leaving it out because Claude wasn't aware it mattered",
      "It has no real effect on the memo's usefulness",
      "It guarantees the memo will be exactly one paragraph long",
      "It causes Claude to write in legal terminology"
    ],
    "correct": 0,
    "explanation": "Calling out the gift card detail tells Claude this is a point staff care about, so it gets addressed directly instead of being glossed over (A). This detail doesn't dictate length (C) or trigger legal-style language (D), and clearly it does affect usefulness (contradicting B)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A training coordinator wants a single onboarding checklist covering IT setup, benefits enrollment, and team introductions for new hires — three fairly different topics.",
    "question": "What's the best way to ask Claude for this?",
    "options": [
      "Ask for \"an onboarding checklist\" and hope all three areas are covered evenly",
      "Ask for each area separately in three unrelated sessions with no shared context",
      "List the three areas explicitly as sections to include, so the checklist covers all of them intentionally",
      "Only ask about IT setup since that's the most technical part"
    ],
    "correct": 2,
    "explanation": "Explicitly naming the three sections needed ensures the checklist is structured around all of them rather than leaving coverage to chance (C). A vague request (A) risks uneven coverage, splitting into disconnected sessions (B) loses the benefit of one coherent document, and dropping two of the three topics (D) doesn't meet the actual need."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A social media manager needs a month's worth of posts for a product launch, covering teaser content, launch day, and post-launch follow-up, each with a different goal.",
    "question": "What is the most effective way to structure this request?",
    "options": [
      "Ask for \"a month of posts\" in one line and let Claude decide the phases",
      "Break the request into the three phases, describing the goal of each phase, so Claude can tailor content to where each post falls in the campaign",
      "Ask only for launch-day content since that's the most important day",
      "Provide no phase information but specify the total post count"
    ],
    "correct": 1,
    "explanation": "Naming the three phases and their distinct goals lets Claude write content appropriate to each stage of the campaign rather than treating every post the same way (B). A bare one-line request (A) or a request with only a post count (D) leaves the phase structure to guesswork, and dropping two phases (C) doesn't fulfill the actual need."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A museum curator wants Claude to draft exhibit label text explaining an artifact's history. The curator provides three separate research notes with slightly conflicting dates for the artifact's origin, without flagging the conflict.",
    "question": "What risk does this create?",
    "options": [
      "None — Claude will automatically research the correct date externally",
      "Claude may pick one date without realizing it's disputed, presenting it as settled fact",
      "Claude will refuse to write the label until the conflict is resolved",
      "The label will list all three dates as equally likely by default"
    ],
    "correct": 1,
    "explanation": "If the conflicting dates aren't flagged, Claude has no signal that this is a disputed point and may simply present one date as fact (B). Claude can't independently verify historical facts against outside sources (contradicting A), it won't necessarily refuse or automatically hedge across all three dates without being told to (contradicting C and D) — the safer move is for the curator to flag the discrepancy explicitly."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A fitness studio owner wants Claude to write a re-engagement email to lapsed members. She mentions the average time since their last visit and the studio's current promotion, then asks for the email.",
    "question": "What did the owner do well here?",
    "options": [
      "She gave Claude concrete, relevant context (recency and the active promotion) that the email can actually reference",
      "She wrote an unnecessarily long prompt for a simple task",
      "She should have instead asked Claude to guess what promotion might exist",
      "Providing promotion details is irrelevant to a re-engagement email"
    ],
    "correct": 0,
    "explanation": "Recency of last visit and the specific active promotion are exactly the kind of concrete details that let the email feel relevant rather than generic (A). The prompt isn't excessive for the goal (B), guessing at a promotion (C) would risk inaccuracy, and a promotion is highly relevant to a re-engagement message (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A travel agent asks Claude to \"suggest a good itinerary\" without saying the destination, trip length, budget, or traveler interests.",
    "question": "What is the core issue with this prompt?",
    "options": [
      "It omits the essential details needed to produce a useful, specific itinerary",
      "Itinerary requests are outside what Claude can assist with",
      "Claude will always default to suggesting the same destination",
      "The request is too polite to get a good response"
    ],
    "correct": 0,
    "explanation": "\"A good itinerary\" is meaningless without knowing where, for how long, at what budget, and for whom — all essential missing details (A). Claude can help with travel planning (B), doesn't have one fixed default destination (C), and politeness has no bearing on response quality (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An accounting clerk needs to reconcile a set of transactions and wants Claude's help. She explains the reconciliation goal but doesn't mention that some transactions are already flagged as pending in a separate system.",
    "question": "Why might this omission cause a problem?",
    "options": [
      "Claude might treat pending transactions as settled, leading to an inaccurate reconciliation",
      "It won't matter since pending status never affects reconciliation",
      "Claude will automatically cross-check against the other system",
      "The clerk should have asked for a different task entirely"
    ],
    "correct": 0,
    "explanation": "If Claude isn't told which transactions are pending elsewhere, it can only treat all given transactions the same way, which could produce a reconciliation that's technically off (A). Claude has no access to the other system to check automatically (contradicting C), pending status is clearly relevant to reconciliation accuracy (contradicting B), and the task itself is appropriate — it's the missing detail that's the issue (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A warehouse operations supervisor asks Claude to write standard operating procedure steps for a new equipment loading process, describing the physical steps in detail from start to finish.",
    "question": "Why does describing the physical steps in detail help?",
    "options": [
      "It doesn't — SOPs should be written entirely from Claude's general knowledge",
      "It gives Claude the specific process to document accurately rather than inventing generic warehouse steps that may not match this equipment or workflow",
      "It's only useful for legal documents, not SOPs",
      "It guarantees zero errors in the final SOP without any review"
    ],
    "correct": 1,
    "explanation": "Every warehouse's equipment and layout differs, so describing the actual steps ensures the SOP reflects the real process rather than a generic guess (B). Relying purely on general knowledge (A) risks inaccuracy for this specific setup, the benefit isn't limited to legal documents (C), and providing detail doesn't eliminate the need for human review (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A grant program officer wants Claude to write a report that touches on: (1) funds disbursed, (2) outcomes achieved, and (3) next steps for the coming quarter. She lists all three items clearly, in order, in her prompt.",
    "question": "What benefit does listing the three parts explicitly provide?",
    "options": [
      "None — Claude would have covered these three areas regardless",
      "It reduces the chance that any of the three required sections gets skipped or underdeveloped",
      "It forces the report to be exactly three paragraphs long",
      "It prevents Claude from including any numbers in the report"
    ],
    "correct": 1,
    "explanation": "Spelling out each required part makes it far less likely that Claude omits or shortchanges one of them, since there's no ambiguity about what's expected (B). Claude wouldn't necessarily guess the same three areas unprompted (contradicting A), listing parts doesn't fix paragraph count (C), and numeric content is often exactly what a disbursement/outcomes report needs (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A recruiter wants Claude's help writing interview questions for a role. In one message she asks Claude to: draft five behavioral questions, suggest a scoring rubric for each, and format everything into a printable one-page guide.",
    "question": "What makes this a well-structured multi-part request?",
    "options": [
      "It's not well-structured — each part should be a separate, unrelated request with no connection",
      "It clearly separates the distinct pieces (questions, rubric, formatting) so Claude can address each without missing one",
      "It's well-structured only because it uses bullet points",
      "It's poorly structured because multi-part requests always confuse Claude"
    ],
    "correct": 1,
    "explanation": "Naming each distinct component — questions, rubric, final formatting — means Claude has clear sub-goals to hit rather than one vague ask (B). Multi-part requests aren't inherently confusing when structured this way (contradicting D), splitting into unrelated separate requests loses useful shared context (contradicting A), and the benefit comes from clarity of the parts, not the presence of bullet points specifically (contradicting C)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A benefits administrator needs to send three different documents to employees: an open enrollment summary, an FAQ, and a deadline reminder. She asks Claude for all three in one message but doesn't distinguish which content belongs in which document.",
    "question": "What problem is likely to occur?",
    "options": [
      "Content may bleed between the three documents, such as FAQ material appearing in the summary, since the boundaries weren't defined",
      "Claude will automatically create three perfectly separated documents regardless",
      "The task will fail completely and produce nothing",
      "Only the deadline reminder will be produced"
    ],
    "correct": 0,
    "explanation": "Without clear boundaries between the three documents, Claude may not draw the same lines the administrator has in mind, causing overlap or misplaced content (A). Claude doesn't guarantee clean separation without being told the boundaries (contradicting B), the task won't simply fail (C), and there's no reason only one of three documents would appear (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A customer support lead needs to: (1) categorize 20 support tickets by issue type, (2) identify the three most common issues, and (3) draft a short summary for the weekly team meeting.",
    "question": "What is the best way to phrase this as one request to Claude?",
    "options": [
      "Number the three tasks explicitly in the request so each is addressed as a distinct step",
      "Ask only \"help me with the tickets\" and let Claude figure out what's needed",
      "Send the 20 tickets with no request at all and see what Claude produces",
      "Ask for the summary only, since categorization isn't necessary"
    ],
    "correct": 0,
    "explanation": "Explicitly numbering the three steps — categorize, identify top issues, summarize — gives Claude a clear structure to follow so each step is actually completed (A). A vague ask (B) or sending data with no instructions (C) leaves the actual goal unclear, and skipping categorization (D) undermines the accuracy of the summary itself, which depends on it."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A hospital administrative coordinator wants a patient intake form redesigned. The task involves: simplifying the language, reordering sections by priority, and adding a new insurance verification section. She lists all three changes together in her request.",
    "question": "Why is listing all three changes together, rather than one vague request to \"improve the form,\" the better approach?",
    "options": [
      "It isn't better — \"improve the form\" would produce the same result",
      "It ensures each specific change the coordinator wants is actually addressed, rather than leaving \"improve\" open to interpretation",
      "It guarantees HIPAA compliance automatically",
      "It only matters for digital forms, not paper ones"
    ],
    "correct": 1,
    "explanation": "\"Improve the form\" could mean many things; listing the three specific changes wanted removes ambiguity and ensures each one is actually made (B). Naming the changes doesn't by itself guarantee regulatory compliance (C), which still needs separate review, the approach applies to any form format (contradicting D), and a vague request would likely miss at least one of the intended changes (contradicting A)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A conference organizer asks Claude to produce a speaker communication packet in one request: a welcome email, a technical requirements checklist, and a bio-formatting template — three components with different audiences and purposes within the same packet.",
    "question": "What is the risk if the organizer doesn't clarify which audience each component addresses?",
    "options": [
      "Claude may write all three pieces in the same tone and level of detail, even though a welcome email and a technical checklist serve very different purposes",
      "There is no risk since all three are part of one packet",
      "Claude will automatically produce three completely distinct tones without guidance",
      "The technical checklist will be omitted entirely"
    ],
    "correct": 0,
    "explanation": "Without guidance that these pieces serve different purposes (warm welcome vs. precise technical checklist vs. a formatting template), Claude may default to one consistent tone throughout, which doesn't serve all three well (A). Claude doesn't automatically infer distinct tones on its own (contradicting C), there's no reason a component would be dropped (D), and being part of one packet doesn't eliminate the need for purpose-specific guidance (contradicting B)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A payroll specialist asks Claude to write internal guidance covering both a new expense submission process and an unrelated update to overtime rules, all mashed into one paragraph without headers.",
    "question": "What is the downside of mashing two unrelated topics into one unstructured paragraph?",
    "options": [
      "Readers are more likely to miss one of the two updates since nothing visually or structurally separates them",
      "There's no downside since both are internal guidance topics",
      "Claude will refuse to write about two topics at once",
      "It will automatically split into two separate documents"
    ],
    "correct": 0,
    "explanation": "When two distinct updates are blended without separation, readers skimming for one topic can easily miss the other (A). Claude will write about both if asked but won't auto-split them without being told to (contradicting D), doesn't refuse multi-topic requests (C), and the fact that both are \"internal guidance\" doesn't mean mixing them is harmless (contradicting B)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A brand manager provides Claude with three examples of past product taglines the company has used and liked, then asks for ten new tagline options for a new product in the same style.",
    "question": "What is the main benefit of providing the three example taglines?",
    "options": [
      "It gives Claude a concrete sense of the brand's voice and style to match, rather than guessing at tone from scratch",
      "It guarantees all ten new taglines will be equally good",
      "It has no effect since taglines are short and don't need examples",
      "It restricts Claude to only paraphrasing the three examples given"
    ],
    "correct": 0,
    "explanation": "Showing examples of preferred style is one of the most effective ways to steer tone and voice, since Claude can pattern-match to what's demonstrated rather than guessing (A). It doesn't guarantee uniform quality across all ten (B), examples are valuable even for short text (contradicting C), and providing examples for style guidance doesn't mean Claude is limited to paraphrasing them (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A customer support rep wants Claude to draft replies to common tickets \"in our brand voice\" but never shows Claude what that voice sounds like.",
    "question": "What is the clearest way to fix this?",
    "options": [
      "Include two or three sample replies that represent the brand voice well, and ask Claude to match that style",
      "Add the words \"friendly and professional\" to the prompt and stop there",
      "Assume Claude already knows the company's specific brand voice",
      "Ask Claude to invent a brand voice for the company"
    ],
    "correct": 0,
    "explanation": "Concrete sample replies let Claude match the actual voice rather than a generic interpretation of \"friendly and professional,\" which could mean many different things (A). Adding a short adjective phrase (B) is vague compared to real examples, Claude has no way to know a specific company's unstated voice (contradicting C), and having Claude invent a voice from nothing (D) won't match what the company actually uses."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A technical writer at a non-technical company wants Claude to draft user-facing help articles matching the existing article style. She pastes one existing article in full and asks Claude to write new ones \"just like this.\"",
    "question": "What is a potential limitation of using only one example?",
    "options": [
      "One example works exactly as well as several, so there's no limitation",
      "A single example may not reveal which features are consistent style rules versus one-off choices specific to that article's topic",
      "Claude cannot process any pasted article text",
      "Using an example at all will make the output plagiarized"
    ],
    "correct": 1,
    "explanation": "With only one sample, Claude can't always distinguish a consistent style pattern from something that was just a one-time choice for that particular article's content (B). Multiple examples generally help Claude generalize style more reliably than a single one (contradicting A), Claude can process pasted text (C), and matching a style isn't the same as plagiarizing it (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A procurement officer wants weekly vendor status updates written in a very specific format the department has used for years. She pastes a filled-in example of last week's update and asks Claude to use it as a template for this week's data.",
    "question": "What does using a filled-in example as a template accomplish here?",
    "options": [
      "It shows Claude the exact structure and level of detail expected, which is more reliable than describing the format in words alone",
      "It's unnecessary since Claude already knows the department's internal format",
      "It only works if the officer also provides a blank template with no data",
      "It prevents Claude from updating the format if requested later"
    ],
    "correct": 0,
    "explanation": "A real filled-in example demonstrates structure, tone, and level of detail far more precisely than trying to describe the format in words, and Claude has no prior knowledge of this specific internal format (contradicting B). A filled-in example works fine as a template even with real data present (contradicting C), and providing an example doesn't lock the format in place for future changes (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A copywriter wants Claude to write five email subject lines. She provides two subject lines she considers too long-winded and two she considers ideal, labeling which is which, before asking for new ones.",
    "question": "What is the value of showing both \"good\" and \"bad\" examples together?",
    "options": [
      "None — showing bad examples will make Claude copy the flaws",
      "It sharpens Claude's sense of exactly what to avoid and what to aim for, which is more precise than showing good examples alone",
      "It's redundant since good examples alone communicate everything needed",
      "It only works for subject lines, not other content types"
    ],
    "correct": 1,
    "explanation": "Labeled contrast — here's what's too long-winded, here's what's ideal — gives a clearer boundary than positive examples alone, similar to explaining both a target and a pitfall (B). Showing a flaw doesn't mean Claude will replicate it, especially when it's clearly labeled as undesirable (contradicting A), the contrast typically adds precision beyond good examples alone (contradicting C), and this labeling technique isn't limited to subject lines (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "An HR generalist wants Claude to write a performance review comment bank. Instead of an example, she just tells Claude \"make it sound professional.\"",
    "question": "Compared to providing a sample comment, what's the drawback of only saying \"make it sound professional\"?",
    "options": [
      "\"Professional\" can be interpreted many different ways, so the result may not match what she actually has in mind stylistically",
      "There is no drawback — the two approaches produce identical results",
      "\"Professional\" is too specific an instruction and over-constrains Claude",
      "Providing a sample would be against best practice"
    ],
    "correct": 0,
    "explanation": "\"Professional\" is a broad, subjective descriptor that could mean many different tones and structures, whereas a real sample removes that ambiguity (A). The two approaches are not equivalent (contradicting B), \"professional\" is actually vague rather than over-specific (contradicting C), and providing a sample is a recommended, not discouraged, practice (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A university admissions officer provides Claude with three anonymized sample acceptance letters that vary slightly in tone, then asks for a new letter \"blending the warmth of the second one with the brevity of the third.\"",
    "question": "What makes this a strong use of examples?",
    "options": [
      "It references specific, distinguishable qualities from named examples, giving Claude precise stylistic targets instead of a vague blend request",
      "It's actually a weak approach since mixing examples always confuses the output",
      "It works only because exactly three examples were used",
      "The letters being anonymized makes the examples ineffective"
    ],
    "correct": 0,
    "explanation": "Pointing to specific qualities in specific examples — warmth from one, brevity from another — gives Claude precise, referenceable targets rather than an abstract stylistic request (A). Mixing referenced qualities from multiple examples is a legitimate technique, not inherently confusing (contradicting B), the number three isn't what makes it work (contradicting C), and anonymization doesn't reduce the letters' usefulness as style examples (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A content marketer asks Claude to write a blog post introduction, gets a draft, and it's close but too formal. She replies: \"Keep the structure, but make the tone more conversational.\"",
    "question": "What does this follow-up demonstrate?",
    "options": [
      "Effective iterative refinement — building on the existing draft with a targeted change instead of starting over from scratch",
      "A mistake — she should have restarted with an entirely new prompt",
      "An unnecessary step since the first draft was already final",
      "A request Claude cannot act on since it references a previous message"
    ],
    "correct": 0,
    "explanation": "Referring back to the existing draft and requesting a specific, targeted adjustment — tone, not structure — is efficient and lets Claude build on what's already good (A). Starting over (B) would waste the useful structural work already done, the first draft clearly wasn't sufficient (contradicting C), and Claude can absolutely act on follow-ups that reference prior turns in the same conversation (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An operations analyst asks Claude for a summary of a vendor contract, then in a follow-up says, \"Now do the same thing for these other two contracts, matching the format you just used.\"",
    "question": "Why is this a good use of a follow-up turn?",
    "options": [
      "It isn't — each contract summary should start a completely new conversation for accuracy",
      "It reuses an already-established, approved format instead of re-describing it from scratch for each contract",
      "It has no advantage over starting new conversations for each contract",
      "It will cause Claude to ignore the new contract content"
    ],
    "correct": 1,
    "explanation": "Referencing the format \"you just used\" lets Claude carry forward the established structure without the analyst having to redescribe it, saving effort and keeping results consistent (B). Starting fresh each time (A) would require re-explaining the desired format repeatedly, there's a clear advantage over starting over (contradicting C), and referencing the prior format doesn't cause Claude to disregard the new content (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A compliance officer is refining a policy summary across several turns. After four rounds of edits, the conversation has drifted and the current draft no longer matches the original policy source she pasted at the start.",
    "question": "What is the best next step?",
    "options": [
      "Continue making edits indefinitely without checking against the source",
      "Re-paste or re-reference the original source text and ask Claude to reconcile the current draft against it",
      "Start over completely, discarding all four rounds of useful refinement",
      "Assume the draft is fine since it has been edited several times already"
    ],
    "correct": 1,
    "explanation": "When a long iterative conversation risks drift, re-grounding in the original source and asking for a reconciliation check keeps accuracy intact without throwing away the refinement work (B). Continuing blindly (A) or assuming accuracy from iteration count alone (D) doesn't address the drift risk, and discarding everything (C) wastes the useful progress that a targeted reconciliation could preserve."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A facilities manager asks Claude for a maintenance request template, reviews it, and says: \"This is great — can you also add a field for urgency level?\"",
    "question": "What does this exchange represent?",
    "options": [
      "An inappropriate request since templates can't be modified after creation",
      "A normal, efficient follow-up that incrementally improves the output without restating the entire original request",
      "A sign that the first draft was a failure",
      "A request that requires starting a brand new conversation to work"
    ],
    "correct": 1,
    "explanation": "Asking for one additional field, referencing the existing template, is a lightweight and efficient way to refine output incrementally (B). Templates can absolutely be modified after the fact (contradicting A), a good first draft that just needs one addition isn't a failure (contradicting C), and this kind of small addition works fine as a same-conversation follow-up (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A research assistant is drafting a literature summary over multiple turns. Midway through, she realizes she forgot to mention that the summary should exclude studies published before 2015. She adds this constraint in a new follow-up message.",
    "question": "What should she expect regarding the earlier parts of the summary?",
    "options": [
      "Claude will retroactively know to apply this to everything from the very first message even without being asked to revise",
      "She may need to explicitly ask Claude to review and revise the earlier content against the new constraint, since it was added after the fact",
      "The constraint will be ignored entirely since it wasn't in the original message",
      "She must start a new conversation for the constraint to take effect at all"
    ],
    "correct": 1,
    "explanation": "A constraint introduced mid-conversation applies going forward, but content already drafted before it was mentioned may not automatically be re-checked against it — she should explicitly ask for that review (B). Claude won't retroactively apply an unstated rule to earlier turns on its own (contradicting A), a new instruction is not simply ignored (contradicting C), and it doesn't require a brand new conversation to take effect (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A benefits coordinator has a long back-and-forth with Claude refining an FAQ document, but instead of clearly saying what to change each time, she just repeats \"make it better\" after each draft.",
    "question": "What is the problem with this style of follow-up?",
    "options": [
      "\"Make it better\" is too vague to guide specific improvement, so results may drift randomly rather than converge on what she actually wants",
      "There is no problem — vague follow-ups work as well as specific ones",
      "Repeating the same phrase will eventually cause Claude to stop responding",
      "\"Make it better\" is best practice for iterative refinement"
    ],
    "correct": 0,
    "explanation": "Without saying what specifically to improve, each revision is a guess, and results can drift without ever converging on what she actually wants (A). Vague and specific follow-ups don't perform equally well (contradicting B), Claude doesn't stop responding due to phrase repetition (C), and vague feedback is not the recommended way to iterate effectively (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A department head is refining a budget justification memo. After Claude's third revision goes in a direction she doesn't like, she says: \"Go back to the version from two drafts ago and adjust the tone instead of the numbers this time.\"",
    "question": "What does this follow-up demonstrate about working with Claude across turns?",
    "options": [
      "That Claude cannot reference earlier versions within the same conversation",
      "That referencing a specific earlier point in the conversation and giving a precise new instruction is an effective way to redirect without losing useful prior work",
      "That she should have abandoned the memo and asked a colleague instead",
      "That tone and numbers cannot be adjusted independently"
    ],
    "correct": 1,
    "explanation": "Pointing to a specific earlier draft and giving a precise, targeted instruction lets Claude course-correct efficiently within the same conversation, avoiding wasted rework (B). Claude can reference earlier turns in an ongoing conversation (contradicting A), abandoning the task isn't necessary (C), and tone and numeric content are separable aspects that can be adjusted independently (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A paralegal needs Claude to review a lengthy contract for defined terms. Rather than retyping the contract into the chat, she pastes the full text once and refers back to it in later questions.",
    "question": "Why is pasting the full document once, rather than repeatedly retyping excerpts, the better approach?",
    "options": [
      "It ensures Claude has the complete, exact text to work from consistently across the conversation, reducing the risk of errors from retyped excerpts",
      "It has no real benefit over retyping small excerpts each time",
      "It's required because Claude cannot handle long text at all",
      "It prevents her from asking any follow-up questions about the contract"
    ],
    "correct": 0,
    "explanation": "Pasting the complete text once gives Claude a consistent, accurate source to reference throughout the conversation, avoiding transcription errors or missing context from partial excerpts (A). Claude can handle long text (contradicting C), there is a real benefit versus repeated retyping (contradicting B), and pasting the full document doesn't limit her ability to ask follow-up questions (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A market researcher wants Claude to analyze a customer survey. Instead of pasting the raw response data, she describes the survey results in her own words: \"most people liked it and a few didn't.\"",
    "question": "What is the main limitation of this approach compared to sharing the actual data?",
    "options": [
      "Claude's analysis is only as good as this vague secondhand description, and specific patterns in the real responses will be missed",
      "There is no limitation; a description is just as useful as raw data",
      "Claude cannot analyze anything described in the researcher's own words",
      "Vague descriptions are actually preferred over raw data for analysis tasks"
    ],
    "correct": 0,
    "explanation": "A vague paraphrase like \"most people liked it\" strips out the specific detail that real analysis depends on, so the results will be shallow compared to working from actual response data (A). Claude can work with described information (contradicting C), but it's clearly not equivalent to the real data in analytical value (contradicting B), and raw data is generally preferable for genuine analysis, not the reverse (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An office manager wants Claude to compare two vendor proposals. She pastes both proposal documents in full at the start of the conversation before asking her question.",
    "question": "What advantage does this give over summarizing each proposal verbally first?",
    "options": [
      "None — a verbal summary would work identically well",
      "Claude can compare the actual details, pricing, and terms directly from source text rather than from a possibly incomplete paraphrase",
      "It guarantees Claude will recommend the cheaper proposal",
      "It only helps if the documents are under one page each"
    ],
    "correct": 1,
    "explanation": "Providing the actual proposal text lets Claude compare real details, figures, and terms rather than relying on a paraphrase that might omit something important (B). A verbal summary risks losing detail, so it's not equivalent (contradicting A), pasting full text doesn't bias the recommendation toward price alone (C), and this approach isn't limited to very short documents (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A compliance analyst needs Claude to check a draft internal policy against an existing external regulation. She provides the draft policy but not the regulation text itself, assuming Claude already knows the specific regulation by heart.",
    "question": "What is the risk with this assumption?",
    "options": [
      "None — Claude has memorized every regulation and will apply it perfectly from memory",
      "Claude's knowledge of the specific regulation's current wording may be incomplete or out of date, so the check could miss real discrepancies",
      "Claude will refuse to compare a policy to any regulation",
      "The comparison will fail immediately with no output at all"
    ],
    "correct": 1,
    "explanation": "Even if Claude has some general familiarity with a regulation, relying on memory instead of the actual current text risks outdated or incomplete information, especially for something requiring precise wording comparison — providing the regulation text directly is far more reliable (B). Claude doesn't have a perfect memorized copy of every regulation (contradicting A), it won't simply refuse (C) or fail outright (D), but the quality of the analysis suffers without the source text."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A property manager wants Claude to draft a notice based on a lease clause. Instead of quoting the clause, she summarizes it loosely from memory: \"something about late fees after five days.\"",
    "question": "What should she do instead for a more reliable result?",
    "options": [
      "Quote or paste the actual lease clause text so the notice reflects the precise terms",
      "Nothing different; loose summaries are just as reliable as exact text",
      "Ask Claude to guess standard late fee terms instead",
      "Skip the notice since lease clauses can't be referenced in a prompt"
    ],
    "correct": 0,
    "explanation": "Providing the exact clause text ensures the notice states the real terms accurately, rather than relying on a possibly imprecise memory of the wording (A). A loose summary risks getting details wrong (contradicting B), having Claude guess standard terms (C) could produce something that doesn't match this specific lease, and lease clauses can absolutely be referenced directly in a prompt (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A nonprofit grants manager has a 40-page funder guidelines document. She wants Claude to help draft a proposal that complies with it. She pastes the entire document, then asks specific questions about sections as needed.",
    "question": "Why is pasting the full document upfront, even though only some sections may be relevant to each question, a reasonable strategy?",
    "options": [
      "It lets Claude reference the right section accurately when asked, without the manager needing to guess in advance exactly which parts will matter",
      "It's wasteful and she should retype only the exact sentence needed for each question",
      "Pasting the full document will cause Claude to ignore her questions",
      "It only works if the document has no formatting"
    ],
    "correct": 0,
    "explanation": "Having the whole document available means Claude can pull the relevant section accurately as questions arise, rather than the manager having to predict and retype the right excerpt each time, which risks missing something relevant (A). Retyping single sentences repeatedly (B) is more error-prone and effortful, providing full context doesn't cause Claude to ignore follow-up questions (C), and document formatting doesn't prevent this approach from working (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A skeptical procurement manager wants Claude to poke holes in a vendor's proposal before a negotiation meeting. He asks Claude to \"review this as a tough negotiator looking for weaknesses and unfavorable terms.\"",
    "question": "What is the benefit of assigning this persona?",
    "options": [
      "It has no effect on the output compared to asking for a neutral summary",
      "It directs Claude to focus specifically on critical, adversarial analysis rather than a balanced or purely descriptive review",
      "It guarantees the vendor's proposal will be rejected",
      "It causes Claude to fabricate weaknesses that don't exist"
    ],
    "correct": 1,
    "explanation": "Framing the task as a skeptical negotiator focuses Claude's attention on finding weak points and unfavorable terms, which is different from a neutral, balanced summary (B). This framing changes the angle of analysis compared to a neutral request (contradicting A), doesn't predetermine an outcome like rejection (C), and asking for critical scrutiny isn't the same as asking Claude to invent false problems (D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A high school teacher asks Claude to review her lesson plan \"as a first-year teacher would\" versus, in a separate case, \"as an experienced curriculum director would.\"",
    "question": "What is the practical value of specifying different perspectives for the same document?",
    "options": [
      "None — the feedback will be identical regardless of the persona requested",
      "Each perspective is likely to surface different kinds of concerns — practical classroom-management gaps versus strategic curriculum alignment — giving her a fuller picture",
      "Only one of the two personas is a valid request; the other will be ignored",
      "Assigning a persona is only useful for creative writing tasks"
    ],
    "correct": 1,
    "explanation": "Different vantage points tend to notice different things — a novice might flag classroom logistics, while a curriculum director might flag alignment with broader standards — so using both gives more well-rounded feedback (B). The two framings are not expected to produce identical output (contradicting A), both are valid requests Claude can act on (contradicting C), and persona framing is useful well beyond creative writing, including feedback and review tasks (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A small business owner asks Claude to review her website copy \"as a potential customer who has never heard of the business before.\"",
    "question": "Why might this framing produce more useful feedback than simply asking \"is this copy good\"?",
    "options": [
      "It anchors the feedback in a specific, relevant viewpoint — an unfamiliar customer's first impression — rather than an undefined general judgment of quality",
      "It has no meaningful difference from asking a generic quality question",
      "It will cause Claude to rewrite the copy entirely without being asked",
      "It only works if the business owner also provides analytics data"
    ],
    "correct": 0,
    "explanation": "\"Is this good\" is vague and open to many interpretations, while framing the review around a first-time visitor's perspective focuses the feedback on clarity and first impressions, which is likely what she actually cares about (A). This is meaningfully different from the vague version (contradicting B), assigning a review perspective doesn't automatically trigger an unsolicited rewrite (C), and it doesn't require analytics data to be useful (D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A city planning department wants feedback on a public notice draft. An analyst asks Claude to review it \"as a resident with limited English proficiency and no background in zoning terminology.\"",
    "question": "What does this persona assignment help accomplish?",
    "options": [
      "It ensures the review specifically checks for plain-language clarity and jargon that could confuse the intended audience, rather than general polish",
      "It's an ineffective use of persona since Claude cannot simulate reading comprehension differences",
      "It guarantees the notice will be translated into another language",
      "It's equivalent to just asking for a grammar check"
    ],
    "correct": 0,
    "explanation": "Framing the review around this specific reader's likely gaps directs Claude to flag jargon and unclear phrasing that a general-audience or grammar-only review might miss (A). Claude can reason about likely comprehension barriers even without literally simulating a person (contradicting B), the request doesn't include translation (C), and it's a more targeted lens than a plain grammar check (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A sales director wants Claude to stress-test a pricing proposal before it goes to a client. She asks Claude to respond \"as a budget-conscious client who is likely to push back on cost.\"",
    "question": "What is this technique primarily useful for?",
    "options": [
      "Anticipating objections and weak points from a specific point of view before the real conversation happens",
      "Guaranteeing the client will accept the final pricing",
      "Replacing the need for an actual client conversation entirely",
      "Making the proposal document longer"
    ],
    "correct": 0,
    "explanation": "Role-playing a likely counterpart's perspective is a practical way to surface objections and gaps in advance, so the director can prepare responses before the real meeting (A). It doesn't guarantee client acceptance (B) or replace the actual conversation (C), and it's not aimed at increasing document length (D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "An office administrator asks Claude for feedback on a meeting agenda \"as a busy executive who only has two minutes to skim it.\"",
    "question": "What kind of feedback is this framing most likely to produce?",
    "options": [
      "Feedback focused on scannability, prioritization, and whether key points stand out quickly — not a deep line-by-line edit",
      "A complete rewrite of the agenda into a different document type",
      "Identical feedback to a request with no persona specified",
      "A refusal, since executives are not a valid persona for Claude to adopt"
    ],
    "correct": 0,
    "explanation": "Framing around a time-pressed reader shifts the feedback toward scanability and prioritization of key points, which is a distinct and useful lens (A). It's not a request to change document type (B), the framing does change the emphasis of feedback compared to no persona (contradicting C), and Claude can adopt a reader-perspective framing like this without issue (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A product team lead asks Claude, with no other context: \"Fix the document.\" No document was pasted or referenced, and the previous conversation topic was unrelated.",
    "question": "What should happen next?",
    "options": [
      "Claude should proceed by fixing a random unrelated document from earlier in its training",
      "Claude should ask which document is meant and/or what specifically needs fixing, since neither is clear from the request",
      "Claude should refuse to respond at all",
      "Claude should assume it means the most recently discussed topic even though that topic is unrelated"
    ],
    "correct": 1,
    "explanation": "With no document provided and no clear referent, the request is genuinely ambiguous, and the appropriate response is to ask what's meant rather than guess (B). Claude has no access to arbitrary outside documents to fix (contradicting A), it doesn't have to refuse outright — clarifying is the useful path (contradicting C), and assuming an unrelated prior topic is the intended referent isn't reliable (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A store manager types: \"Make the schedule better.\" No schedule was shared, and \"better\" isn't defined in any way.",
    "question": "What makes this request too vague to act on directly?",
    "options": [
      "Nothing — Claude can produce a generic \"better\" schedule that will apply to any store",
      "Both the actual schedule and the criteria for \"better\" (fewer conflicts? cost? staff preference?) are missing",
      "Schedule requests are outside Claude's capabilities entirely",
      "The request is fine as written and needs no clarification"
    ],
    "correct": 1,
    "explanation": "Without the actual current schedule or any definition of what \"better\" means (cost, coverage, staff satisfaction, fewer conflicts), there's nothing concrete to act on (B). A generic schedule (A) wouldn't reflect this store's real situation, scheduling help is within scope (contradicting C), and the vagueness here is a real problem, not a non-issue (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A regional sales manager asks Claude to \"analyze our performance\" and attaches nothing — no data, no time period, no metric definition.",
    "question": "What is the appropriate response strategy in a case like this?",
    "options": [
      "Produce a lengthy, confident-sounding analysis based on general sales knowledge without asking anything",
      "Ask clarifying questions about what data, time period, and metrics are meant before attempting a substantive analysis",
      "Refuse the task entirely since analysis requires perfect data",
      "Silently assume the most recent fiscal quarter and proceed without mentioning the assumption"
    ],
    "correct": 1,
    "explanation": "With no data, timeframe, or metrics specified, a substantive analysis isn't possible — the useful move is to ask what's meant before producing something that might not match her actual need (B). Inventing a confident-sounding analysis with nothing behind it (A) risks being misleading, refusing the task outright (C) isn't necessary once clarified, and silently assuming a timeframe without flagging it (D) could produce a mismatched answer without her realizing why."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A volunteer coordinator asks Claude: \"Write something for the newsletter.\" No topic, audience, length, or tone is given.",
    "question": "What should the coordinator do to get a genuinely useful draft?",
    "options": [
      "Nothing further; any draft can simply be adapted afterward",
      "Specify the topic, audience, approximate length, and tone before or alongside the request",
      "Ask Claude to write ten completely different newsletters and pick one at random",
      "Assume Claude will automatically know what past newsletters looked like"
    ],
    "correct": 1,
    "explanation": "A request this open-ended needs basic specifics — what it's about, who it's for, how long, what tone — to produce something actually usable rather than a shot in the dark (B). Adapting a random draft afterward (A) is less efficient than specifying upfront, generating many random variants (C) doesn't solve the ambiguity, and Claude has no memory of past newsletters unless they're shared (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A hospital scheduling coordinator says: \"Help with the staffing thing from before.\" This is the first message in a brand-new conversation, with no prior context available.",
    "question": "Why is this request problematic, and what should happen?",
    "options": [
      "It's fine as-is because Claude retains memory of all previous separate conversations automatically",
      "\"The staffing thing from before\" has no meaning in a new conversation with no shared history, so the coordinator needs to restate the relevant details",
      "The coordinator should assume Claude already fixed the staffing issue",
      "It's problematic only because it's too short, not because of the missing context"
    ],
    "correct": 1,
    "explanation": "A brand-new conversation starts without access to unrelated past conversations, so a reference like \"the thing from before\" is meaningless unless the coordinator restates what's needed (B). Claude does not automatically carry memory across separate conversations by default (contradicting A), assuming an unstated resolution already happened (C) is unfounded, and the core issue is missing context, not merely brevity (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "An event sponsor relations manager asks Claude: \"Is this a good sponsorship deal?\" and pastes a partial deal summary with the sponsorship amount but no mention of what the sponsor receives in return.",
    "question": "What's missing that prevents a meaningful answer?",
    "options": [
      "Nothing is missing; the dollar amount alone is sufficient to judge a deal's quality",
      "The benefits/deliverables the sponsor receives, without which \"good deal\" can't be assessed relative to value given",
      "The sponsor's company logo file",
      "A request like this cannot be evaluated by Claude under any circumstances"
    ],
    "correct": 1,
    "explanation": "Judging whether a deal is \"good\" requires comparing what's given (money) against what's received (benefits, visibility, deliverables) — without the latter, there's no basis for the judgment (B). A dollar figure alone doesn't establish value (contradicting A), a logo file is irrelevant to deal evaluation (C), and this kind of evaluative reasoning is something Claude can help with once given adequate information (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A talent acquisition manager wants a weekly candidate pipeline report sent to leadership. She specifies the same five metrics, same section order, and same summary length every week when prompting Claude.",
    "question": "What is the benefit of using a consistent, explicit structure for a recurring report like this?",
    "options": [
      "It produces a fresh, unpredictable structure each week to keep leadership engaged",
      "It ensures the report stays consistent and comparable week over week, which matters for a recurring leadership report",
      "It has no advantage over changing the format each time for variety",
      "It only matters for the very first report, not later ones"
    ],
    "correct": 1,
    "explanation": "Recurring reports to leadership are more useful when comparable across weeks, so specifying the same metrics, order, and length each time keeps that consistency intact (B). Deliberately varying the format (A) would undermine comparability, there is a clear advantage over inconsistent formatting (contradicting C), and consistency matters for every instance of a recurring report, not just the first (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A customer support supervisor wants every ticket escalation summary to follow the same structure: issue, customer impact, resolution attempted, recommended next step. She writes this structure once and reuses the exact same instructions each time she asks Claude to summarize a new ticket.",
    "question": "What does reusing the same explicit instructions each time accomplish?",
    "options": [
      "It guarantees identical wording will appear in every summary, which is undesirable",
      "It produces consistent, comparable summaries across different tickets, making them easier to scan as a set",
      "It prevents Claude from including any ticket-specific details",
      "It only works the first time; subsequent uses require rewriting the instructions"
    ],
    "correct": 1,
    "explanation": "A reused, explicit structure keeps summaries comparable across many different tickets, which is exactly what's useful when reviewing them as a set (B). It doesn't force identical wording, only a consistent structure, so ticket-specific content still varies appropriately (contradicting A and C), and the instructions can be reused as-is every time without needing to be rewritten (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 4,
    "scenario": "A quality assurance manager at a call center wants Claude to score call transcripts against a five-point rubric consistently across dozens of calls. In the first request she defines all five rubric criteria explicitly and asks Claude to apply that exact rubric to each transcript going forward.",
    "question": "Why does explicitly defining the rubric upfront matter for consistency across dozens of scored calls?",
    "options": [
      "It doesn't matter; Claude will invent an equally valid rubric on its own each time",
      "Without a fixed, explicit rubric applied the same way each time, scoring criteria could subtly shift from call to call, undermining comparability",
      "It matters only for the very last transcript scored",
      "Rubric definitions are unnecessary since call quality is a purely subjective judgment"
    ],
    "correct": 1,
    "explanation": "A fixed, explicitly defined rubric applied consistently is what allows scores across many different calls to be meaningfully compared; without it, each scoring pass could subtly interpret \"good\" differently (B). Claude would not necessarily reinvent the same rubric unprompted each time (contradicting A), consistency matters throughout the whole batch, not just at the end (contradicting C), and defining objective criteria is exactly how to reduce unwanted subjectivity (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A retail operations lead asks Claude to summarize daily sales figures into a report. On Monday she requests a bullet-point format; on Tuesday, without saying anything different, she just says \"do the same thing for today's numbers\" and gets a paragraph-style report instead.",
    "question": "What likely caused the format mismatch, and how should she prevent it going forward?",
    "options": [
      "Claude changes formats randomly regardless of instructions; nothing can be done",
      "\"The same thing\" wasn't specific enough on its own; explicitly stating the desired bullet-point format each time (or clearly referencing Monday's exact structure) would ensure consistency",
      "She should stop requesting daily reports since consistency isn't achievable",
      "The mismatch is unavoidable because sales data changes daily"
    ],
    "correct": 1,
    "explanation": "\"The same thing\" is a bit ambiguous about which aspects should stay identical, so being explicit about the format (or clearly pointing back to Monday's exact structure) is a more reliable way to guarantee consistency (B). Format changes aren't random and unpreventable (contradicting A), consistency is achievable with clearer instructions rather than giving up on daily reports (contradicting C), and changing data values don't require changing the report's format (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 2,
    "scenario": "A training coordinator creates a reusable prompt that defines the exact structure for course completion certificates: recipient name field, course title field, date field, and signature line, in that order.",
    "question": "What is the main advantage of saving this as a reusable structure rather than describing it fresh each time a certificate is needed?",
    "options": [
      "It saves effort and guarantees every certificate follows the identical, correct structure without re-explaining it each time",
      "It prevents any new recipient names from being entered",
      "It only works for one single certificate and can't be reused",
      "It has no advantage over writing a new description for each certificate"
    ],
    "correct": 0,
    "explanation": "A saved, reusable structure means the coordinator doesn't have to redescribe the layout every time, and it guarantees consistency across every certificate produced (A). It doesn't restrict which names can be entered (contradicting B), it's explicitly meant to be reused across many certificates (contradicting C), and there's a clear efficiency and consistency advantage over rewriting the description each time (contradicting D)."
  },
  {
    "domain": 1,
    "difficulty": 5,
    "scenario": "A regional operations director oversees monthly compliance summaries produced by five different staff members, each prompting Claude independently with their own wording. The five resulting summaries vary noticeably in structure, level of detail, and terminology, making them hard to compare across regions.",
    "question": "What is the most effective fix for this consistency problem?",
    "options": [
      "Have all five staff members use one shared, explicit prompt template specifying the same structure, sections, and terminology, rather than each phrasing requests independently",
      "Accept the variation since compliance summaries naturally differ by region",
      "Have only one staff member write all five summaries manually going forward",
      "Ask each staff member to add \"be consistent\" to their individual prompts"
    ],
    "correct": 0,
    "explanation": "The variation stems from each person phrasing the request differently; a shared, explicit template that fixes structure, sections, and terminology ensures comparable output regardless of who's prompting (A). Regional differences in content don't require differences in structure (contradicting B), abandoning the distributed process for one person to do everything manually (C) isn't necessary once a shared template exists, and adding a vague phrase like \"be consistent\" to individually worded prompts (D) doesn't create the actual shared structure needed to fix the root problem."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A customer onboarding specialist needs to send a personalized welcome packet to each new client. She has a firm requirement that every packet include: a named point of contact, the client's specific plan tier, and their onboarding call date.",
    "question": "What is the best way to make sure none of these three required elements is ever missing from a given packet?",
    "options": [
      "Explicitly list all three required elements in the prompt each time, ideally as a reusable checklist-style instruction",
      "Mention only the point of contact since it's the most personal element",
      "Trust that Claude will infer plan tier and call date from context automatically every time",
      "Skip specifying elements and review each packet after the fact to catch omissions"
    ],
    "correct": 0,
    "explanation": "Explicitly listing all three required elements each time — ideally as a reusable structure — is the most reliable way to guarantee none is missed (A). Naming only one of three (B) doesn't cover the actual requirement, relying on inference (C) is unreliable since Claude only knows what it's told, and catching omissions after the fact (D) is less efficient than preventing them upfront, though review is still a reasonable safety net, not the primary fix."
  },
  {
    "domain": 1,
    "difficulty": 3,
    "scenario": "A university department assistant needs to send meeting minutes in a consistent format to faculty every week: attendees, decisions made, and action items with owners. In her very first request she also asks Claude to remember to always use this exact structure for future minutes in the same conversation thread.",
    "question": "What should she understand about this instruction's persistence?",
    "options": [
      "It will reliably apply within that same ongoing conversation thread, but a new, separate conversation later would need the structure restated",
      "It will apply forever across every future conversation automatically, with no need to ever restate it",
      "It has no effect at all and must be repeated every single message even within the same thread",
      "It only applies if she also uploads a blank template file"
    ],
    "correct": 0,
    "explanation": "An instruction like this holds within the ongoing conversation where it was given, but a brand-new, separate conversation doesn't inherit it automatically — restating the structure there keeps things consistent (A). It doesn't persist automatically across all future separate conversations (contradicting B), it also doesn't need to be repeated every single message within the same thread once established (contradicting C), and no file upload is required for the instruction to take effect (contradicting D)."
  }
];
