export const QUESTIONS_D2 = [
  {
    domain: 2,
    difficulty: 2,
    scenario: "A marketing coordinator asks Claude for the founding year and headquarters city of a mid-size competitor, then drops the answer straight into a slide for tomorrow's leadership meeting.",
    question: "What is the biggest risk in this workflow?",
    options: [
      "Claude's answer will be formatted inconsistently with the rest of the slide deck",
      "Claude could state a plausible-sounding founding year or city that is actually incorrect, and no one will catch it before the meeting",
      "Claude will refuse to answer questions about competitors",
      "The slide will take too long to load if Claude's answer is too long"
    ],
    correct: 1,
    explanation: "Specific facts like founding dates and headquarters locations are exactly the kind of detail Claude can state confidently while being wrong, so an unverified fact can slip into an executive presentation (B). Formatting (A) and load time (D) are trivial concerns, and Claude does not refuse ordinary competitor research questions (C)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A journalist uses Claude to draft background context for an article and receives a paragraph that quotes a named academic study, including a journal title and publication year.",
    question: "What should the journalist do before publishing that quote?",
    options: [
      "Publish it as-is, since Claude cited a specific journal and year, which shows the source is real",
      "Independently search for the actual study to confirm it exists and says what Claude claims, since Claude can fabricate plausible-looking citations",
      "Remove the year only, since that is the part most likely to be wrong",
      "Ask Claude to rephrase the sentence so it no longer looks like a direct quote"
    ],
    correct: 1,
    explanation: "Claude can generate citations that look completely legitimate — correct-sounding journal names, years, and authors — without the source actually existing or saying what's claimed, so independent verification is required before publishing (B). Specificity is not evidence of authenticity (A), and rephrasing (D) or trimming one detail (C) doesn't address the core risk that the entire citation could be fabricated."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An HR generalist asks Claude to summarize a new state paid-leave law and gets a confident, well-organized answer with three specific compliance deadlines listed.",
    question: "Before using this summary to update the company's HR policy, what should the generalist do?",
    options: [
      "Nothing further — Claude's answer was detailed and well-organized, which indicates it's accurate",
      "Verify the specific deadlines and legal requirements against the actual state statute or a legal source, since Claude can produce confident-sounding but incorrect legal specifics",
      "Ask Claude a second time to see if it gives the same answer, and use that as confirmation the information is correct",
      "Reject the summary entirely and avoid using Claude for any HR compliance research going forward"
    ],
    correct: 1,
    explanation: "Specific legal deadlines are exactly the kind of detail Claude can state confidently while being wrong — polish and confidence are not evidence of accuracy (A is the core misconception this domain tests). Asking again (C) doesn't help, since a wrong answer can be repeated consistently. Avoiding the tool entirely (D) overcorrects; verifying consequential specifics (B) against an authoritative source is the right move."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A retail store manager asks Claude to calculate the total cost of a 15-item purchase order after a 12% discount, and Claude returns a final dollar figure.",
    question: "What is the best practice before approving the purchase order with that figure?",
    options: [
      "Trust the figure, since arithmetic is a strength of AI systems and errors are rare enough to ignore",
      "Spot-check the math yourself, or with a calculator or spreadsheet, especially since a wrong total could mean overpaying or underpaying a vendor",
      "Round the figure to the nearest hundred dollars to reduce the impact of any error",
      "Ask Claude to explain its reasoning in more detail, which guarantees the number is correct"
    ],
    correct: 1,
    explanation: "Claude can make arithmetic errors, especially with multi-step calculations, so verifying a number that affects real spending is good practice (B). Assuming math is inherently reliable (A) or that a detailed explanation guarantees correctness (D) are both false assumptions; explanations can be wrong just as easily as the final answer. Rounding (C) doesn't fix a potentially wrong number, it just hides the error."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A project manager asks Claude to compare two vendor proposals and give a recommendation. Claude responds: \"Based on the information provided, Vendor A appears somewhat stronger on cost, though I don't have enough detail on their support terms to be fully confident in this recommendation.\"",
    question: "How should the project manager interpret this response?",
    options: [
      "As a fully reliable recommendation, since Claude explicitly compared both vendors",
      "As a signal to disregard Claude's input entirely, since it admitted uncertainty",
      "As useful input that comes with an explicit caveat, meaning the manager should gather more information about support terms before deciding",
      "As evidence that Claude is malfunctioning, since a good answer should never include hedging language"
    ],
    correct: 2,
    explanation: "Claude's hedge about support terms is useful signal, not noise — it tells the manager exactly what additional information is needed before finalizing a decision (C). Treating the answer as fully reliable (A) ignores the caveat, while discarding it entirely (B) wastes the useful part of the analysis. Hedging is normal, appropriate behavior, not a malfunction (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A financial analyst asks Claude about current mortgage interest rates to include in a client newsletter going out this week.",
    question: "What is the key limitation to keep in mind here?",
    options: [
      "Claude cannot discuss financial topics at all, so the analyst must remove this section entirely",
      "Claude's training data has a knowledge cutoff, so real-time figures like current interest rates may be outdated even if stated confidently, and should be checked against a live source",
      "Claude will always clearly label financial numbers as outdated, so no further checking is needed",
      "Interest rates never change quickly enough for this to matter"
    ],
    correct: 1,
    explanation: "Claude has a knowledge cutoff and no live access to markets, so a rate it states may be stale even though it sounds current and confident — this needs to be checked against a live financial source before publication (B). Claude does discuss financial topics generally (A is an overcorrection), it does not reliably flag every outdated figure (C), and rates do fluctuate frequently enough to matter (D is false)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A nonprofit program director asks Claude to draft a grant report summary and then, out of caution, asks the same question again in a new conversation. The two summaries describe the program's outcomes with slightly different numbers.",
    question: "What should the director do with this discrepancy?",
    options: [
      "Pick whichever summary sounds more professional and submit it",
      "Average the two sets of numbers together to split the difference",
      "Treat the inconsistency as a signal that the numbers are not reliably sourced from Claude alone, and verify them against the program's actual data records",
      "Submit both versions to the funder and let them decide which is correct"
    ],
    correct: 2,
    explanation: "When two outputs disagree on factual figures, that inconsistency is a useful sanity-check signal that the numbers weren't drawn from a verified source — the director should go back to the actual program data (C). Choosing based on tone (A) or averaging (B) doesn't address the underlying reliability problem, and submitting both to the funder (D) offloads a problem the director is responsible for catching."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A hospital administrative assistant asks Claude to summarize general guidance on a medication's typical dosage range for an internal patient-education handout.",
    question: "Given the stakes involved, what is the most appropriate approach?",
    options: [
      "Publish Claude's summary directly, since medication information is factual and unlikely to vary",
      "Use Claude's draft only as a starting point for wording, and have a licensed clinician or pharmacist verify all dosage information against current authoritative medical references before it reaches patients",
      "Add a disclaimer to the handout instead of verifying the content, since disclaimers are legally sufficient",
      "Avoid asking Claude about medical topics altogether and write the handout from memory instead"
    ],
    correct: 1,
    explanation: "Medical dosage information is high-stakes: an error can directly harm a patient, so it requires clinical verification against authoritative sources regardless of how confident or fluent Claude's draft sounds (B). Publishing without review (A) is unsafe, a disclaimer doesn't substitute for accuracy (C), and avoiding the tool for drafting (D) is an overcorrection — using it as a starting point is fine as long as a qualified person verifies the substance."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A customer support rep asks Claude to write a casual internal Slack message summarizing today's ticket volume trends, for the rep's own team only, not for external use.",
    question: "What level of scrutiny is appropriate here?",
    options: [
      "The same exhaustive fact-checking required for a legal filing, since all AI output should be treated identically regardless of context",
      "A light read-through for obvious errors is reasonable, since this is a low-stakes internal message and not a regulated or public-facing document",
      "No review at all is needed for any internal communication, ever",
      "The message should be rejected outright because it wasn't written entirely by a human"
    ],
    correct: 1,
    explanation: "Scrutiny should scale with stakes — a casual internal update is low-risk, so a quick sanity check is proportionate (B). Treating every output with the same intensity as a legal filing (A) is inefficient and not how professionals actually work, while skipping review entirely (C) or rejecting AI assistance outright (D) are both extremes that don't match sound judgment."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A real estate agent asks Claude to summarize typical closing costs in their state and gets a detailed answer including specific percentage ranges.",
    question: "What is the most important thing to check before repeating these figures to a client?",
    options: [
      "Whether the answer used bullet points, since well-formatted answers are more trustworthy",
      "Whether the percentages are current and specific to that state, by checking against a title company, real estate attorney, or current local resource",
      "Whether Claude used the word 'typically,' since hedge words guarantee the numbers are approximate but correct",
      "Nothing, because closing costs are federally standardized and do not vary"
    ],
    correct: 1,
    explanation: "Closing costs vary by state and change over time, and financial figures like this are a common area where Claude can sound authoritative while being imprecise or outdated, so checking against a current, state-specific source is warranted (B). Formatting (A) has no bearing on accuracy, hedge words don't guarantee correctness (C), and closing costs are not federally standardized (D is factually wrong)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An event planner asks Claude to list vendors who specialize in outdoor weddings in their city, and Claude provides five business names with brief descriptions.",
    question: "What should the planner do before including these vendors in a client-facing recommendation list?",
    options: [
      "Confirm that each business actually exists, is still operating, and matches the description, since Claude can generate plausible but inaccurate or outdated business details",
      "Trust the list completely, since Claude would not invent a business name",
      "Only check the vendor listed first, since Claude presents answers in order of reliability",
      "Ask Claude to confirm its own list is accurate, which is sufficient verification"
    ],
    correct: 0,
    explanation: "Claude can generate business names and details that sound real but are inaccurate, merged from different businesses, or simply outdated, so independent verification (existence, current operation, accuracy of description) is needed before recommending vendors to clients (A). Claude is not immune to inventing plausible details (B), answer order doesn't indicate reliability (C), and Claude re-affirming its own answer isn't independent verification (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A paralegal asks Claude to find case law supporting a specific legal argument for a brief. Claude returns three case names with citations that look properly formatted.",
    question: "What is the appropriate next step?",
    options: [
      "Include the citations directly in the brief, since proper formatting indicates the cases are real and correctly described",
      "Look up each case in a legal database to confirm it exists, is accurately described, and actually supports the argument, since Claude can fabricate realistic-looking case citations",
      "Use only the case listed first, since the most relevant case is always presented first",
      "Ask the supervising attorney to reformat the citations rather than verify their existence"
    ],
    correct: 1,
    explanation: "Fabricated case citations are a well-documented failure mode: Claude can produce citations that are formatted perfectly but refer to cases that don't exist or don't say what's claimed, so each one must be checked in an actual legal database before use in a filing (B). Correct formatting says nothing about existence or accuracy (A), there's no rule that the first-listed case is most relevant (C), and reformatting (D) sidesteps the real risk entirely."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A teacher asks Claude to generate ten multiple-choice questions about photosynthesis for a quiz and quickly skims the output before printing it for class.",
    question: "What should the teacher specifically check during that skim?",
    options: [
      "Only whether the formatting looks like a typical quiz",
      "Whether each question has exactly the same number of words",
      "Whether the stated correct answers are actually scientifically accurate, since Claude can generate a quiz that looks polished but contains factual errors",
      "Nothing, since educational content is held to a lower accuracy standard"
    ],
    correct: 2,
    explanation: "A quiz that looks well-formatted can still contain incorrect facts or a mismatched answer key, so the teacher should verify the science content itself, not just the presentation (C). Formatting consistency (A, B) doesn't guarantee correctness, and educational content circulated to students deserves careful accuracy checking, not a lower bar (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A small business owner asks Claude for a summary of federal tax deduction rules relevant to home office expenses, planning to use it when filing this year's taxes.",
    question: "What is the safest approach?",
    options: [
      "File taxes based on Claude's summary directly, since tax rules are publicly documented and unlikely to be misstated",
      "Use Claude's summary as a general starting point, but verify specific rules, thresholds, and eligibility criteria with current IRS guidance or a tax professional before filing",
      "Ignore the summary and assume all AI-generated tax information is worthless",
      "Ask Claude to cite IRS publication numbers and trust those citations without checking them"
    ],
    correct: 1,
    explanation: "Tax rules change yearly and have specific thresholds where a small error has real financial and legal consequences, so treating Claude's summary as a starting point that gets verified against current IRS guidance or a professional is the appropriate level of caution (B). Filing directly off it (A) is risky, dismissing all AI help (C) is an overcorrection, and trusting cited publication numbers without checking them (D) repeats the citation-fabrication risk."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A market research analyst asks Claude to summarize a competitor's Q3 earnings, and the summary includes specific revenue figures presented in a confident, matter-of-fact tone with no hedging.",
    question: "What should the analyst keep in mind about the lack of hedging in this case?",
    options: [
      "The absence of hedging language proves the figures are accurate, since Claude only hedges when it's unsure",
      "Confident phrasing is not the same as verified accuracy — the analyst should trace the figures back to the actual earnings report or press release before using them",
      "The analyst should ask Claude to add hedging language, which would make the numbers more trustworthy",
      "Financial figures do not need verification once Claude presents them without qualifiers"
    ],
    correct: 1,
    explanation: "Claude does not always hedge exactly when it should — confident, unhedged phrasing can still accompany incorrect figures, especially for detailed financial data, so the analyst should trace numbers to the primary source (B). Assuming confidence equals accuracy (A) is the core misconception this domain tests, and adding hedging language (C) or skipping verification because it sounds certain (D) don't actually establish correctness."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An operations manager asks Claude to summarize the key differences between two shipping carriers' insurance policies, and the answer covers pricing and claim windows but never addresses what happens with international shipments, which the manager specifically asked about.",
    question: "What should the manager notice about this response?",
    options: [
      "That the response is complete, since it addressed the general topic of insurance policies",
      "That the response is incomplete, since it didn't address the international shipment question that was specifically asked, and should be followed up before being treated as final",
      "That the response should be discarded entirely, since a partial answer has no value",
      "That Claude intentionally omitted international details because that information doesn't exist anywhere"
    ],
    correct: 1,
    explanation: "Evaluating completeness means checking whether the response actually answered everything that was asked, not just the general topic — the manager should notice the gap and ask a follow-up (B). The response isn't fully complete just because it covered related ground (A), a partial answer can still be useful and doesn't need to be thrown out (C), and there's no basis to assume the omitted information doesn't exist (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A consultant asks Claude to summarize a lengthy industry report and share the key statistics for a client deck. The summary includes a statistic attributed to \"a recent industry survey\" without naming which one.",
    question: "What should the consultant do with this vague attribution?",
    options: [
      "Use the statistic as-is, since \"a recent industry survey\" is specific enough sourcing for a client deck",
      "Trace the statistic back to the original report to confirm it's actually there and correctly stated, since vague or unnamed sourcing is a red flag that the figure may be inaccurate or invented",
      "Change the attribution to name a specific, well-known survey so it looks more credible",
      "Remove all statistics from the deck to avoid the issue entirely"
    ],
    correct: 1,
    explanation: "A vague, unnamed attribution is a warning sign that the statistic may not be reliably sourced, so tracing it back to the actual report before it appears in a client-facing deck is the right move (B). Using it as-is (A) risks presenting an unverified or fabricated number as fact, inventing a specific source name (C) would itself be fabricating a citation, and removing all statistics (D) is an overcorrection when the underlying report is available to check."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A logistics coordinator asks Claude to convert a shipment weight from kilograms to pounds for a customs form, and Claude returns a converted figure.",
    question: "What is a reasonable check before submitting the customs form?",
    options: [
      "Assume the conversion is correct, since unit conversions are simple math that AI systems never get wrong",
      "Do a quick independent check of the conversion, such as with a calculator or known conversion factor, since even simple calculations can occasionally be miscalculated and errors on customs forms can cause real delays or penalties",
      "Submit the form and correct it later if customs flags an issue",
      "Ask Claude to convert it a second time in the same conversation as sufficient verification"
    ],
    correct: 1,
    explanation: "Even straightforward calculations can occasionally be wrong, and on a customs form the consequence of an error is a real delay or penalty, so a quick independent check is warranted given the stakes (B). Assuming simple math is infallible (A) is a false assumption, submitting first and fixing later (C) risks real-world consequences, and asking the same tool to repeat itself in the same conversation (D) doesn't provide independent verification."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A compliance officer at a mid-size bank asks Claude to explain how a specific federal lending regulation applies to a new loan product. The answer is detailed, well-structured, and internally consistent, but the officer has no legal background to judge whether it's actually correct.",
    question: "What is the most appropriate action given the regulatory stakes involved?",
    options: [
      "Approve the loan product based on Claude's explanation, since internal consistency is a strong signal of legal accuracy",
      "Have the explanation reviewed by legal or compliance counsel before it informs any regulatory decision, since regulatory misapplication carries real legal and financial consequences",
      "Cross-reference the explanation with a second unrelated AI tool, and if they agree, treat that as sufficient sign-off",
      "Proceed, since Claude would refuse to answer if it were not confident in the regulatory interpretation"
    ],
    correct: 1,
    explanation: "In a regulated, high-stakes domain like lending compliance, a well-organized and internally consistent answer is still not a substitute for expert review — regulatory misapplication has real legal and financial consequences, so qualified counsel should verify it (B). Internal consistency doesn't guarantee legal correctness (A), agreement between two AI tools isn't the same as expert validation (C), and Claude does not withhold answers only when it lacks confidence (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A social media manager asks Claude to write a caption referencing a competitor's recent product launch, including the launch date. The manager knows the product actually launched two weeks earlier than the date Claude stated.",
    question: "What does this situation illustrate?",
    options: [
      "That Claude deliberately lies about product launch dates",
      "That the manager's own knowledge caught a subtly wrong detail that otherwise looked plausible, which is why fact-checking against what you already know is valuable even for casual content",
      "That the caption should be published anyway, since a two-week discrepancy is immaterial for social media",
      "That Claude cannot be used for any content involving dates going forward"
    ],
    correct: 1,
    explanation: "This is a case of catching a subtly wrong output that looked plausible on its surface — the manager's own domain knowledge was the check that caught it, illustrating why reviewers should apply what they already know rather than assuming accuracy (B). There's no indication of deliberate deception (A), publishing a known factual error is not advisable even for low-stakes content (C), and one date error doesn't mean the tool is unusable for date-related content generally (D)."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "An investment advisor asks Claude to summarize the historical average annual return of a specific asset class over the past 20 years, planning to use the figure in a client presentation about long-term growth expectations.",
    question: "What is the most important consideration before including this figure?",
    options: [
      "The figure should be used exactly as given, since 20-year averages are stable, well-documented numbers that don't require checking",
      "The figure should be verified against a reputable financial data source, since precise historical return figures are easy for Claude to state with confidence while being slightly or significantly off, and client-facing financial guidance carries real fiduciary and regulatory weight",
      "The figure only needs verification if it looks unusually high or low",
      "The advisor should ask Claude for its confidence level as a percentage and use that as the basis for how much to trust the number"
    ],
    correct: 1,
    explanation: "Precise historical financial statistics are a common area for confidently-stated inaccuracies, and this is high-stakes fiduciary content given to clients, so independent verification against a reputable data source is warranted regardless of how the number looks (B). Assuming stability (A) or only checking outlier-looking numbers (C) both leave subtly wrong figures unverified, and Claude's self-reported confidence levels are not a reliable substitute for external verification (D)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A recruiter asks Claude to help brainstorm interview questions for a marketing role and gets a list of ten thoughtful, open-ended questions.",
    question: "What is the appropriate level of review here?",
    options: [
      "A quick skim to make sure the questions are relevant and appropriate is enough, since this is a low-stakes brainstorming task with no factual claims to verify",
      "The same rigorous external verification required for a legal contract",
      "No review, since brainstorming output is never wrong",
      "The recruiter should discard the list because AI-generated questions are inherently lower quality than human-written ones"
    ],
    correct: 0,
    explanation: "This is a low-stakes, subjective brainstorming task with no factual claims to fact-check, so a quick relevance-and-appropriateness skim matches the actual risk level (A). Applying legal-contract-level rigor (B) is disproportionate, assuming brainstorming output can't be off-target (C) is wrong since some questions could be irrelevant or inappropriate, and blanket-discarding AI brainstorming (D) is an unfounded overcorrection."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A customer support lead asks Claude to draft a response to an angry customer about a refund policy, and the draft states a return window of 45 days. The lead knows the actual company policy is 30 days.",
    question: "What does catching this error demonstrate about proper use of AI-generated customer communications?",
    options: [
      "That Claude fundamentally cannot be trusted to draft customer communications and should never be used for this purpose",
      "That reviewers with subject-matter knowledge of their own company's policies are essential, since Claude may not know or may misstate company-specific facts even in a confident, ready-to-send draft",
      "That the error is unlikely to matter, since customers rarely notice small policy discrepancies",
      "That the draft should be sent as-is and corrected only if the customer complains about the wrong number"
    ],
    correct: 1,
    explanation: "Claude doesn't have privileged, guaranteed-accurate knowledge of a specific company's internal policies, so a human reviewer with that knowledge is the safeguard that catches company-specific errors before they reach a customer (B). One caught error doesn't mean the tool is unusable for drafting (A), sending a wrong policy detail to an already-angry customer is a real risk not a minor one (C), and knowingly sending an incorrect policy statement (D) is poor practice."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A university research assistant asks Claude to summarize the current scientific consensus on a specific nutrition topic and gets a clear, confident answer with no caveats about the state of the research.",
    question: "What should the research assistant be cautious about?",
    options: [
      "Nothing, since scientific consensus topics are static and well-settled by definition",
      "That nutrition science is an area where findings evolve and are debated, and Claude's confident tone doesn't confirm that a genuine consensus exists or that its summary reflects current thinking, so checking recent peer-reviewed sources is warranted",
      "That Claude cannot discuss any health-adjacent research topics",
      "That the summary should be accepted only if it includes numbers"
    ],
    correct: 1,
    explanation: "Nutrition science frequently involves ongoing debate and evolving findings, and Claude's confident tone is not proof that a stable consensus actually exists or that the summary is current — checking recent, credible sources is the appropriate step (B). Assuming such topics are static (A) misunderstands how science works, Claude can and does discuss general research topics (C is an overcorrection), and the presence of numbers (D) is irrelevant to reliability."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A sales manager asks Claude to summarize last quarter's regional sales performance from a pasted spreadsheet, and the summary states the West region grew 18% while the manager's own quick mental math suggests it was closer to 12%.",
    question: "What should the manager do?",
    options: [
      "Trust Claude's 18% figure, since it processed the full spreadsheet and the manager only did rough mental math",
      "Recalculate the growth percentage directly from the spreadsheet data to determine the correct figure before using it in a report, since a noticeable discrepancy is worth resolving rather than ignoring",
      "Split the difference and report 15% growth",
      "Present both numbers in the report and let leadership decide which one to believe"
    ],
    correct: 1,
    explanation: "A meaningful discrepancy between Claude's output and the manager's own estimate is a signal worth resolving by recalculating directly from the source data, since Claude can make errors when summarizing or computing from pasted data (B). Assuming the AI-processed number is automatically more reliable than a sanity check (A) is the wrong instinct, splitting the difference (C) or punting the decision to leadership (D) both avoid doing the verification that would actually resolve the discrepancy."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "An office manager asks Claude for generic tips on organizing a supply closet and gets a straightforward, practical list.",
    question: "How much external verification does this response need?",
    options: [
      "Extensive verification, since any AI-generated content requires the same scrutiny regardless of topic",
      "Very little — this is a low-stakes, common-sense topic with no factual claims that could cause harm if slightly imperfect",
      "None ever, for any task, since AI is always accurate on non-technical topics",
      "It should be verified against a professional organizing certification body before use"
    ],
    correct: 1,
    explanation: "Matching scrutiny to stakes means recognizing that generic organizational tips carry essentially no risk if imperfect, so minimal review is proportionate (B). Applying uniform maximum scrutiny to every output regardless of topic (A) is inefficient, claiming zero verification is ever needed (C) overstates AI reliability, and requiring certification-body validation for a supply closet tip list (D) is a wild overcorrection."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A benefits administrator asks Claude to explain how a specific IRS rule interacts with the company's health savings account contribution limits for the current year, and the answer includes a specific dollar limit.",
    question: "What is the biggest risk if the administrator treats this number as final without checking it?",
    options: [
      "The dollar limit could be from a prior year or otherwise incorrect, since contribution limits change annually and Claude may state an outdated or wrong figure with full confidence, leading to compliance errors that affect employees' accounts",
      "There is no risk, since IRS limits are fixed permanently once set",
      "The only risk is a minor formatting inconsistency in how the dollar figure is displayed",
      "The risk is limited to Claude using the wrong currency symbol"
    ],
    correct: 0,
    explanation: "Contribution limits are updated annually, and Claude's knowledge cutoff plus its tendency to state figures confidently means an outdated or wrong limit could get used, causing real compliance problems for employee accounts (A). IRS limits are not fixed permanently (B is false), and the actual risk is a substantive compliance error, not cosmetic formatting or currency symbols (C, D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A content writer at a nonprofit asks Claude to write a blog post citing \"a 2021 university study\" showing a specific statistic about volunteer engagement, but doesn't name the university or authors.",
    question: "What should the writer do before publishing the blog post?",
    options: [
      "Publish as written, since the year and general description make the citation feel credible enough",
      "Try to locate the actual study using the details given; if it cannot be found or confirmed, remove the claim or the specific statistic rather than publish an unverifiable citation",
      "Change \"a 2021 university study\" to a more specific-sounding fake citation to make it appear more credible",
      "Keep the statistic but delete the citation entirely so no one can check it"
    ],
    correct: 1,
    explanation: "An unnamed, unverifiable citation is a red flag for possible fabrication, so the writer should try to locate and confirm the actual study, and drop the claim if it can't be verified, rather than publish something unverifiable (B). Publishing on the strength of vague plausibility (A) risks spreading misinformation, and both fabricating a more specific-sounding source (C) and stripping the citation to avoid scrutiny (D) make the problem worse, not better."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A property manager asks Claude two separate times, in two separate conversations, whether a specific local ordinance requires smoke detectors in a particular type of rental unit. The first answer says yes, the second says it depends on the building's age.",
    question: "What is the most reasonable interpretation of these differing answers?",
    options: [
      "The two answers are contradictory proof that Claude is unreliable and should never be consulted on local ordinances again",
      "The two answers should be averaged into a single compromise policy",
      "The differing answers signal that the actual rule may have nuances Claude isn't consistently capturing, so the manager should check the specific municipal code directly rather than rely on either answer",
      "The most recent answer should always be trusted over the earlier one"
    ],
    correct: 2,
    explanation: "Comparing outputs for consistency and finding a mismatch is a useful signal — it suggests the underlying rule has nuance (like building age) that isn't being reliably captured, and the right response is to check the actual municipal code rather than pick one answer (C). One inconsistency doesn't mean the tool is permanently unusable (A), averaging a factual/legal question doesn't make sense (B), and recency alone isn't a valid tiebreaker for correctness within the same session (D)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A team lead asks Claude to summarize meeting notes into action items, and the summary looks accurate but leaves out a deadline that was clearly stated in the notes.",
    question: "What does this represent?",
    options: [
      "A completeness gap — the summary missed part of the source material, so the lead should compare it against the original notes before distributing the action items",
      "A hallucination, since Claude invented information that wasn't there",
      "A citation problem, since no external source was involved",
      "An acceptable outcome, since summaries are expected to omit minor details"
    ],
    correct: 0,
    explanation: "This is a completeness issue: the output omitted material information from the source rather than inventing false information, so the fix is comparing the summary against the original notes before it goes out (A). It's not a hallucination since nothing false was added (B), there's no citation involved (C), and a missed deadline is not a \"minor\" detail to shrug off (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A physical therapist's front-office coordinator asks Claude general questions about a treatment technique to include in a patient FAQ handout, and the answer includes claims about expected recovery timelines for specific conditions.",
    question: "What is the appropriate handling of this content given it touches on medical outcomes?",
    options: [
      "Publish the handout as drafted, since it's just a general FAQ and not a diagnosis for any specific patient",
      "Have a licensed clinician review and approve the recovery timeline claims before the handout goes to patients, since even general medical claims can be inaccurate or overly specific, and patients may rely on them for expectations about their own care",
      "Remove the FAQ idea entirely, since no medical-adjacent content should ever be assisted by AI",
      "Add a line saying \"results may vary\" instead of reviewing the timeline claims for accuracy"
    ],
    correct: 1,
    explanation: "Even general, non-personalized medical claims can be inaccurate or misleadingly specific, and patients may form real expectations from an FAQ, so clinical review before publication is the appropriate safeguard (B). Being general rather than patient-specific doesn't eliminate the risk (A), avoiding AI assistance for drafting entirely is an overcorrection (C), and a generic disclaimer doesn't substitute for verifying the underlying claims (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An HR coordinator asks Claude to list \"recent\" changes to a well-known workplace software platform's pricing tiers, intending to share this with the team this week.",
    question: "What should the coordinator keep in mind?",
    options: [
      "Claude's information could be outdated relative to its knowledge cutoff, and pricing tiers change frequently, so the coordinator should check the vendor's current pricing page directly before sharing",
      "Claude always knows the very latest pricing since it updates constantly in real time",
      "Pricing information never needs verification since vendors rarely change prices",
      "The coordinator should ask Claude to guarantee the information is current, and treat a confident answer as sufficient guarantee"
    ],
    correct: 0,
    explanation: "Claude's knowledge has a training cutoff and doesn't automatically reflect live vendor updates, and software pricing changes fairly often, so checking the vendor's current pricing page is the reliable way to confirm the information before it's shared (A). Claude does not have automatic real-time updates (B), pricing does change with some regularity (C), and asking Claude to \"guarantee\" currency doesn't actually make the information current (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A financial planner asks Claude to calculate compound interest projections for a client's retirement account over 25 years using a specific rate and monthly contribution.",
    question: "Before presenting the projection to the client, what should the planner do?",
    options: [
      "Present it as final, since compound interest is a standard formula and Claude would apply it correctly every time",
      "Re-run the calculation independently, such as with a financial calculator or spreadsheet formula, since multi-step numeric projections are an area where errors can occur and this figure will directly shape a client's retirement expectations",
      "Round the final number to make it look more approximate and therefore less risky to present",
      "Ask Claude to double the projection as a safety margin"
    ],
    correct: 1,
    explanation: "Multi-step financial projections are exactly the kind of calculation where errors can creep in, and because this number will shape a client's real retirement decisions, independent verification with a calculator or spreadsheet is warranted (B). Assuming standard formulas are always applied flawlessly (A) is the core misconception being tested, and rounding (C) or arbitrarily doubling the figure (D) don't address whether the underlying calculation is correct."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A restaurant manager asks Claude to draft a friendly out-of-office auto-reply email and gets a short, well-written draft with no factual claims in it.",
    question: "What is the appropriate next step?",
    options: [
      "A quick proofread for tone and correct dates/names is sufficient, since there's no factual or numerical content that requires deeper verification",
      "The manager should independently verify this content with an external fact-checking service",
      "The manager should ask three separate AI tools and compare all three before using any of them",
      "The email should not be sent because AI-drafted communications are inherently unprofessional"
    ],
    correct: 0,
    explanation: "This is a low-stakes drafting task with no factual claims, so a light proofread for tone and any inserted specifics (like dates) matches the actual risk (A). External fact-checking (B) and cross-checking with multiple tools (C) are disproportionate effort for a routine auto-reply, and AI-assisted drafting is not inherently unprofessional (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An insurance claims adjuster asks Claude to summarize policy exclusions relevant to a specific water damage claim, and the summary confidently states that mold damage is covered under the policy.",
    question: "What should the adjuster do given the financial and legal stakes of a claims decision?",
    options: [
      "Approve the claim payout based on this summary, since Claude reviewed the relevant policy language",
      "Verify the mold coverage determination directly against the actual policy document and, if needed, a claims supervisor, since misreading exclusions can result in improper payouts or wrongful denials with real financial and legal consequences",
      "Deny the claim automatically, since AI-assisted summaries should never be trusted for claims decisions",
      "Ask Claude whether it's sure, and proceed based on whether it reaffirms the same answer"
    ],
    correct: 1,
    explanation: "Policy exclusions are exactly the kind of detail-sensitive, high-stakes content where a confidently wrong summary can lead to improper payouts or wrongful denials, so the actual policy document (and a supervisor if needed) should be the final source of truth before a claims decision is made (B). Approving directly off the summary (A) or denying automatically (C) are both extremes that skip verification, and re-asking the same tool for reassurance (D) doesn't constitute independent verification."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A grant writer asks Claude to summarize a foundation's funding priorities based on information the writer pasted from the foundation's website, and the summary accurately reflects everything pasted but doesn't mention that the foundation only funds organizations in three specific states, a detail buried in the pasted text.",
    question: "What is the most likely explanation and appropriate response?",
    options: [
      "Claude fabricated information, so the whole summary should be distrusted",
      "The summary is incomplete relative to the source material — the writer should re-check the summary against the full pasted text for any other omitted eligibility details before deciding whether to apply",
      "The state restriction doesn't matter for a summary of \"funding priorities\" specifically",
      "The foundation's website itself must be wrong, since Claude wouldn't miss a detail like that"
    ],
    correct: 1,
    explanation: "This is a completeness failure — an important detail from the source was omitted, not fabricated — so the writer should re-check the summary against the original text for other gaps before making an application decision that depends on eligibility (B). Nothing was invented, so it's not a fabrication issue (A), a state eligibility restriction is highly material to whether to even apply, not a separate topic (C), and there's no reason to assume the source website is wrong just because Claude missed a detail (D)."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A compliance analyst at an investment firm asks Claude to explain whether a proposed marketing statement about a mutual fund's past performance would comply with securities disclosure rules, and receives a confident \"yes, this would be compliant\" answer with reasoning.",
    question: "What is the appropriate way to handle this answer given the regulatory environment?",
    options: [
      "Approve the marketing statement based on Claude's compliance assessment, since the reasoning provided sounds sound and well-structured",
      "Treat the answer as a helpful starting point only, and route the actual compliance determination through qualified securities compliance counsel, since regulatory compliance judgments carry firm-level legal liability and Claude is not a substitute for licensed review",
      "Ask Claude to cite the specific SEC rule number, and treat that citation as sufficient legal authority on its own",
      "Skip compliance review altogether for any statement Claude says is compliant, to save time"
    ],
    correct: 1,
    explanation: "Securities compliance determinations carry direct legal liability for the firm, and Claude's confident, well-reasoned tone is not a substitute for licensed compliance review — this is a case where the stakes demand qualified human sign-off regardless of how convincing the AI's reasoning sounds (B). Approving based on the AI's own assessment (A) is unsafe, an AI-provided rule citation could itself be inaccurate and isn't legal authority (C), and skipping compliance review to save time (D) directly increases regulatory risk."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A warehouse supervisor asks Claude to draft a simple shift-change announcement for staff, with no numbers, dates, or claims beyond the schedule the supervisor already provided.",
    question: "What is the most reasonable review step?",
    options: [
      "Confirm that the schedule details Claude included match exactly what the supervisor provided, since transcription slips can happen even in simple drafting tasks",
      "Send the announcement to corporate legal for a compliance review",
      "Have three different supervisors independently verify the announcement before it's posted",
      "Skip any review, since Claude never makes transcription errors when repeating information back"
    ],
    correct: 0,
    explanation: "Even in simple drafting, it's worth a quick check that specific details the user supplied (like shift times) were carried over accurately, since transcription-style slips can occur (A). Legal review (B) and triple independent verification (C) are disproportionate for a routine internal announcement, and assuming zero risk of transcription error (D) skips a check that costs almost nothing to do."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A public relations specialist asks Claude to draft a statement responding to a product recall, including a specific number of affected units. The number Claude used doesn't match the number in the official recall notice the specialist has open in another tab.",
    question: "What should the specialist do?",
    options: [
      "Use the official recall notice's number and correct the draft, since a mismatch between Claude's figure and a verified primary source should always defer to the primary source",
      "Use Claude's number since it was generated more recently than the recall notice was written",
      "Average the two numbers to be safe",
      "Present the discrepancy to the media and let them investigate which number is correct"
    ],
    correct: 0,
    explanation: "When Claude's output conflicts with a verified primary source document the user already has, the primary source should govern — this is a straightforward external fact-check that resolves the discrepancy immediately (A). Recency of generation says nothing about accuracy (B), averaging conflicting factual figures doesn't produce a correct number (C), and pushing a known discrepancy into a public statement for media to sort out (D) is a serious credibility and safety risk in a recall context."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A training coordinator asks Claude to summarize \"best practices for remote onboarding\" for a new employee handbook, and the resulting content is generic but doesn't cite any sources.",
    question: "How should the coordinator evaluate this content?",
    options: [
      "Reject it entirely, since content without citations should never be trusted",
      "Treat it as generalized guidance rather than sourced fact, evaluate whether it makes practical sense for the organization, and add citations only if specific claims need to be attributed or verified",
      "Add fake citations to make the handbook look more authoritative",
      "Assume the lack of citations means Claude is hiding sources it actually has"
    ],
    correct: 1,
    explanation: "General best-practice guidance (not tied to specific studies or statistics) can be legitimately useful without citations — the appropriate move is to judge it on practical merit for the organization, and only add sourcing where specific factual claims genuinely need attribution or verification (B). Blanket rejection (A) discards useful generic guidance, fabricating citations (C) is dishonest and creates a new accuracy problem, and assuming hidden sources (D) is an unfounded guess."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A nonprofit's finance director asks Claude to reconcile a summary of monthly expenses against a budget, and Claude reports that the organization is $3,200 under budget for the quarter. The director's own spreadsheet formula shows a $1,800 overage instead.",
    question: "What should the director do with this significant discrepancy before reporting to the board?",
    options: [
      "Report Claude's under-budget figure to the board, since it presents better news",
      "Investigate the discrepancy directly in the underlying transaction data to determine which figure (or neither) is correct, since a difference this large between two calculations must be resolved, not chosen based on preference",
      "Report both figures to the board without further investigation and let them decide",
      "Report the spreadsheet's overage figure automatically, since spreadsheets are always more accurate than AI"
    ],
    correct: 1,
    explanation: "A large discrepancy like this — the difference between an under-budget and over-budget conclusion — must be resolved by digging into the actual transaction data, since either calculation (or both) could be wrong, and this is a board-facing financial figure with real consequences (B). Choosing the more favorable number (A) is a serious integrity problem, punting to the board unresolved (C) is not the director's job to skip, and assuming spreadsheets are inherently more accurate than any calculation (D) is not a safe general rule since spreadsheet formulas can also contain errors."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A barista shop owner asks Claude for five creative names for a new seasonal drink, purely for brainstorming with no factual content involved.",
    question: "What kind of scrutiny does this output need?",
    options: [
      "Minimal — this is a creative, subjective, low-stakes task where 'accuracy' isn't really the relevant concept",
      "The same fact-checking rigor as a legal document",
      "External verification against competitor trademark databases before even considering any name",
      "None of the names should be considered without a full market research study first"
    ],
    correct: 0,
    explanation: "Creative brainstorming with no factual claims doesn't call for fact-checking rigor at all — the relevant judgment here is taste and fit, not accuracy (A). Legal-document-level scrutiny (B) is disproportionate for drink names, and while a trademark check (C) might eventually be sensible before finalizing a name commercially, it's not required just to review a brainstorm list, and requiring a full market study before even considering names (D) is excessive at this stage."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A city government communications officer asks Claude to draft a public FAQ about a new local ordinance, including specific effective dates and penalty amounts, to be posted on the city website.",
    question: "What is the appropriate process before publishing?",
    options: [
      "Publish immediately, since the FAQ is written in clear, accessible language that residents will understand",
      "Have the specific dates, penalty amounts, and legal interpretations verified against the actual ordinance text or city legal counsel, since this is official government guidance that residents will rely on and errors could have real consequences",
      "Publish with a note that the FAQ was AI-generated, which removes the need for fact verification",
      "Skip verification for the dates but verify the penalty amounts only, since dates are less important"
    ],
    correct: 1,
    explanation: "Official government guidance that residents rely on for compliance is high-stakes — specific dates and penalties need to be checked against the actual ordinance or legal counsel before publication, regardless of how clearly the FAQ is written (B). Clear language doesn't establish factual accuracy (A), disclosing AI involvement doesn't substitute for verifying content (C), and dates are just as consequential as penalty amounts, so selectively verifying only one is insufficient (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An academic researcher asks Claude to summarize the methodology section of a paper they've pasted in full, and the summary accurately captures the sample size and statistical test used, but incorrectly states the study was longitudinal when it was actually cross-sectional.",
    question: "What does this scenario illustrate?",
    options: [
      "That Claude cannot summarize any academic content reliably",
      "That partial accuracy doesn't guarantee full accuracy — a summary can get several details right while still containing a subtle, consequential error, so each key claim should be checked against the source",
      "That the researcher should stop pasting full papers into Claude",
      "That statistical test names are always summarized incorrectly"
    ],
    correct: 1,
    explanation: "This illustrates that a mostly-accurate summary can still contain a specific, subtly wrong detail (study design) that changes how the findings should be interpreted, which is why each material claim in a summary should be checked against the source rather than trusting the summary as a whole because most of it checks out (B). This doesn't mean academic summarization is unreliable across the board (A), pasting full text is actually a good practice that gave the researcher something to check against (C), and there's no basis to generalize about statistical test names specifically (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A talent acquisition specialist asks Claude to summarize a candidate's LinkedIn profile that was pasted into the chat, including their stated years of experience, and then forwards the summary to the hiring manager without re-reading the original profile.",
    question: "What is the risk in skipping that re-read?",
    options: [
      "There is no risk, since Claude cannot make errors when summarizing text that was directly provided",
      "Claude could still misstate a detail (like years of experience) even when working from pasted text, so a quick comparison against the original before forwarding to the hiring manager reduces the chance of passing along an error",
      "The risk only applies to numerical details, not other candidate information",
      "The risk is that the hiring manager will discover Claude was used, which is inherently a problem"
    ],
    correct: 1,
    explanation: "Even when summarizing directly provided text, Claude can introduce small inaccuracies, so a quick comparison against the original profile before forwarding a summary that could influence a hiring decision is a reasonable safeguard (B). Assuming zero error risk just because the source text was provided (A) is incorrect, the risk isn't limited to numbers alone (C), and using AI to summarize a public profile isn't inherently something to hide (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A pharmacist's office manager asks Claude to explain potential interactions between two common over-the-counter medications for a general informational flyer, and the answer states there are \"no significant interactions\" between them.",
    question: "Given the audience will use this flyer to make real health decisions, what should happen before distribution?",
    options: [
      "Distribute the flyer as-is, since Claude's answer directly addresses the interaction question asked",
      "Have a licensed pharmacist verify the interaction claim against a current drug interaction reference before distribution, since an incorrect \"no interaction\" claim could lead someone to unsafely combine medications",
      "Add a general disclaimer about consulting a doctor and skip pharmacist verification, since disclaimers cover this kind of risk",
      "Trust the answer since drug interactions are static facts that don't change over time"
    ],
    correct: 1,
    explanation: "A false-negative claim about drug interactions (\"no significant interactions\" when there actually are some) could directly lead to unsafe medication combinations, so licensed pharmacist verification against a current reference is essential before this reaches patients (B). Addressing the question isn't the same as answering it correctly (A), a disclaimer doesn't prevent the harm of acting on wrong safety information (C), and interaction knowledge does get updated as new research and drug combinations emerge (D is false)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A volunteer coordinator asks Claude to write a thank-you email to volunteers after an event, referencing the number of volunteer hours logged, a number the coordinator provided directly in the prompt.",
    question: "What should the coordinator check before sending?",
    options: [
      "That the hours figure in the drafted email matches the number the coordinator actually provided, since transcription errors can occur even with directly supplied numbers",
      "Nothing, because the coordinator supplied the number, so it's guaranteed to be transcribed correctly",
      "The email should be sent to an external auditor for review first",
      "The coordinator should recalculate total volunteer hours from scratch using a different method"
    ],
    correct: 0,
    explanation: "Even when a number is directly supplied, it's worth a quick check that it was carried into the draft accurately, since transcription slips can still happen (A). Assuming a supplied number is automatically transcribed correctly (B) skips a nearly-free check, external audit (C) is disproportionate for a thank-you email, and recalculating from scratch (D) is unnecessary when the number was already known and just needs to be confirmed in the draft."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A construction project manager asks Claude to estimate the total material cost for a renovation based on square footage and unit prices the manager provided, and gets a final total.",
    question: "What is the appropriate way to use this total in a client proposal?",
    options: [
      "Include it directly in the proposal, since Claude was given all the necessary inputs and should produce a correct total",
      "Recompute the total independently (spreadsheet or calculator) before including it in a client-facing proposal, since a wrong total in a formal proposal could cause a costly under-bid or lose the client's trust",
      "Increase the total by an arbitrary buffer to account for possible errors, without checking whether it's actually correct",
      "Ask Claude if it's confident in the number, and treat a 'yes' as sufficient verification"
    ],
    correct: 1,
    explanation: "A wrong total in a formal client proposal has real financial consequences (under-bidding) and reputational consequences (looking unreliable), so independently recomputing it before it goes to a client is the appropriate check even though all the inputs were provided (B). Having correct inputs doesn't guarantee the calculation itself was performed correctly (A), an arbitrary buffer (C) doesn't actually verify accuracy, and Claude's self-reported confidence (D) isn't a substitute for checking the math."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A compliance officer at a healthcare clinic asks Claude to explain HIPAA requirements for a new patient intake process, and the answer is detailed but subtly conflates two different HIPAA provisions in a way that would lead to an incorrect intake procedure if followed exactly.",
    question: "What underlying risk does this scenario best illustrate?",
    options: [
      "That Claude never provides useful information about regulated topics, so it should be avoided entirely for compliance work",
      "That a subtly incorrect answer in a specialized, regulated domain can look thorough and confident while still containing an error serious enough to create real compliance exposure, which is why regulated-domain content specifically warrants expert verification, not just a general skim",
      "That HIPAA is too complex for any tool, human or AI, to explain accurately",
      "That the officer should have asked a simpler, more general question to avoid this problem"
    ],
    correct: 1,
    explanation: "This illustrates the core reason regulated domains like healthcare compliance need extra scrutiny: an answer can be thorough, well-organized, and still contain a subtle but consequential error that only a subject-matter expert would catch, which is exactly the kind of risk a general skim would miss (B). This doesn't mean the tool is useless for compliance topics generally (A), nor that HIPAA is unexplainable in principle (C), and asking a vaguer question wouldn't have prevented the underlying accuracy risk — it might have just hidden it (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A digital marketing analyst asks Claude to analyze click-through rate data from a pasted spreadsheet and identify the best-performing ad, and Claude names \"Ad Variant B\" as the winner with a stated CTR of 4.2%.",
    question: "What is a reasonable verification step before reporting this to the client?",
    options: [
      "Spot-check the CTR calculation and the underlying ranking directly from the spreadsheet, since data analysis involving multiple rows and calculations is an area where mistakes can occur",
      "Report the finding as-is, since Claude analyzed the full dataset and clients trust data presented with specific percentages",
      "Ask Claude to restate the same finding in different words as confirmation",
      "Remove the specific percentage and just say 'Ad Variant B performed best' to avoid the need for verification"
    ],
    correct: 0,
    explanation: "Multi-row data analysis and derived statistics are an area where errors can occur, so spot-checking the specific figure and the ranking logic against the actual spreadsheet before it goes to a client is the appropriate safeguard (A). Trusting a specific-looking percentage without checking it (B) is the core misconception here, restating in different words (C) doesn't verify anything, and removing the number to dodge verification (D) still leaves a potentially wrong conclusion (Ad Variant B being the winner) unchecked."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A university admissions officer asks Claude to summarize a foreign university's accreditation status and grading scale for transcript evaluation purposes, since this directly affects whether a transfer applicant's credits will be accepted.",
    question: "What is the appropriate approach given this affects an admissions decision?",
    options: [
      "Use Claude's summary directly, since foreign accreditation information is unlikely to be a common error area",
      "Verify the accreditation status and grading scale against an official credential evaluation service or the foreign institution's accrediting body, since this information directly determines an applicant's academic outcome and errors could unfairly help or harm a real student",
      "Ask the applicant to confirm Claude's summary is accurate, since they would know best",
      "Approve the transfer credits provisionally based on Claude's summary and revisit only if a problem arises later"
    ],
    correct: 1,
    explanation: "Foreign accreditation status and grading scales are specialized, less-common information where errors are plausible, and the decision directly affects a real applicant's academic standing, so checking against an official credential evaluation service or accrediting body is warranted (B). Assuming low error risk without checking (A) is unfounded, asking the applicant to self-verify creates an obvious conflict of interest (C), and provisionally approving without verification (D) risks an unfair outcome that's harder to unwind later."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A small bakery owner asks Claude to suggest a few catchy taglines for a new sourdough loaf and picks a favorite from the list to put on packaging.",
    question: "Is significant fact-checking needed before printing the tagline on packaging?",
    options: [
      "Yes, taglines must always be verified against a trademark database and legal counsel before any use",
      "No — this is a subjective, low-stakes creative choice with no factual claims, so a basic read for tone and clarity is sufficient",
      "Yes, the owner should verify the tagline with a second AI tool before proceeding",
      "No fact-checking is ever appropriate for any marketing material"
    ],
    correct: 1,
    explanation: "A creative tagline with no factual claims is low-stakes and largely a matter of taste, so a basic read for tone and clarity is proportionate (B). Requiring trademark/legal review (A) may be sensible for a major brand launch but is disproportionate for a simple bakery tagline, cross-checking with a second AI tool (C) adds little value for a subjective creative choice, and claiming fact-checking is never appropriate for marketing material generally (D) overstates the point — some marketing claims (like performance or health claims) absolutely do need checking."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A logistics analyst asks Claude to explain why a specific international shipping regulation exists and how it currently applies to a shipment bound for a country with recently changed trade rules.",
    question: "What limitation is most relevant here?",
    options: [
      "Claude cannot discuss trade regulations of any kind",
      "Trade rules can change, and if the changes are recent, Claude's answer may reflect outdated regulations from before its knowledge cutoff or before the rule change, so the analyst should verify against current customs or trade authority guidance",
      "International trade rules never change once established, so no verification is needed",
      "The analyst should rely on the shipment's country of origin to determine accuracy rather than checking the regulation directly"
    ],
    correct: 1,
    explanation: "Recently changed trade rules are a clear case where Claude's knowledge cutoff could produce an outdated answer stated with full confidence, so checking current customs or trade authority guidance is the right move (B). Claude can discuss trade regulations generally (A is an overcorrection), trade rules do change over time (C is false), and country of origin isn't a substitute for actually checking the current rule (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A conference organizer asks Claude to draft speaker bios based on information pasted from each speaker's own website, and one bio ends up stating a speaker has \"over 20 years of experience\" when the pasted source said \"nearly 15 years.\"",
    question: "What should the organizer do upon noticing this?",
    options: [
      "Leave it as written, since it's a minor stylistic difference between similar-sounding numbers",
      "Correct the bio to match the source material exactly, since even when working from provided text, Claude can introduce inaccuracies, and a misstated credential could embarrass the organizer and misrepresent the speaker",
      "Ask the speaker to clarify which number is correct instead of checking the source that was already pasted",
      "Assume Claude rounded up intentionally for stylistic effect, which is acceptable practice"
    ],
    correct: 1,
    explanation: "\"Over 20 years\" versus \"nearly 15 years\" is a real factual discrepancy, not a stylistic variation, and it shows that even working from provided source text, Claude can introduce inaccuracies — the organizer should correct it to match the actual source before publishing (B). This isn't a trivial difference (A), there's no need to bother the speaker when the correct information is already in hand from the pasted source (C), and silently inflating a credential is not an acceptable stylistic choice, intentional or not (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A procurement specialist asks Claude to summarize the terms of a vendor contract that was pasted in full, focusing on termination clauses, and the summary states the contract can be terminated with 30 days' notice.",
    question: "What should the specialist do before relying on this summary to plan a vendor transition?",
    options: [
      "Reread the actual termination clause in the contract text to confirm the 30-day figure and any conditions attached to it, since a misread contract term could lead to a costly or legally improper termination attempt",
      "Trust the summary since the full contract was pasted in and Claude had complete information",
      "Assume the 30-day figure is a safe overestimate and plan around a shorter timeline instead",
      "Forward the summary to the vendor as confirmation of the terms without independently checking it"
    ],
    correct: 0,
    explanation: "Contract terms often have conditions or exceptions attached, and even with the full text provided, Claude can misstate or oversimplify a clause, so rereading the actual termination language before acting on it is essential given the legal and financial consequences of an improper termination (A). Having complete source text doesn't guarantee an error-free summary (B), guessing whether the figure is an overestimate (C) is not a substitute for checking, and sending an unverified summary to the vendor as if it were confirmed (D) risks a real contractual dispute."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A social worker asks Claude to help draft a general list of community resource categories (like \"food assistance\" and \"housing support\") for a client intake packet, without asking for any specific organization names, addresses, or phone numbers.",
    question: "What is the main advantage of keeping the request this general?",
    options: [
      "It reduces the risk of including specific factual details, like organization names or contact information, that could be outdated or incorrect and would need separate verification",
      "It guarantees the entire packet is accurate with no further review needed",
      "It means the packet doesn't need to be reviewed by the social worker at all before use",
      "General categories are inherently more helpful to clients than specific resources"
    ],
    correct: 0,
    explanation: "By avoiding specific, verifiable details like organization names and contact information, the request sidesteps a common area for outdated or incorrect specifics, which is a sound risk-reduction strategy, though it doesn't eliminate the need for any review at all (A). It doesn't mean zero review is needed overall (B, C), and general categories aren't inherently \"more helpful\" than specific resources — the two serve different purposes and specific resources would need their own verification (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A hotel general manager asks Claude to summarize recent guest review trends from a batch of pasted reviews, and the summary states \"the majority of reviews mention slow check-in,\" but when the manager skims the actual reviews, only 3 of the 20 pasted reviews mention check-in at all.",
    question: "What does this reveal, and what should the manager do?",
    options: [
      "The summary overstated the prevalence of an issue; the manager should have Claude redo the analysis or verify the actual counts directly, since decisions based on this summary (like reallocating front-desk staff) should rest on accurate patterns, not overstated ones",
      "The manager should trust the 'majority' framing since Claude analyzed all 20 reviews at once",
      "The discrepancy doesn't matter since check-in issues are common at most hotels anyway",
      "The manager should discard the concept of review analysis altogether and read every review manually going forward"
    ],
    correct: 0,
    explanation: "This is a clear case of a confidently wrong summary — 3 out of 20 is not \"the majority\" — and because this kind of finding could drive real operational decisions like staffing, the manager should verify the actual counts or have the analysis redone before acting on it (A). Trusting the summary just because it covered the full batch (B) is the error being tested, general assumptions about the hotel industry (C) don't substitute for checking this specific batch of reviews, and abandoning AI-assisted analysis entirely (D) is an overcorrection when a simple recount would resolve it."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A journalist covering a fast-moving story asks Claude for background on a public figure's current job title and role, and the answer states a title the journalist suspects may have changed recently given the pace of news in this area.",
    question: "What should the journalist do?",
    options: [
      "Publish the title as given, since Claude generally has broad knowledge of public figures",
      "Check a current, live source (such as the organization's official website or a recent news article) to confirm the person's current title before publishing, since this is exactly the kind of fast-changing detail that can fall outside Claude's knowledge cutoff",
      "Note in the article that the title \"may or may not be current\" instead of checking it",
      "Avoid mentioning the person's title at all to sidestep the verification step"
    ],
    correct: 1,
    explanation: "Roles and titles for public figures can change, and this is precisely the kind of fast-moving, time-sensitive detail Claude's knowledge cutoff makes unreliable, so checking a current source before publication is the right call, especially in journalism where accuracy is paramount (B). General broad knowledge doesn't guarantee currency on a specific fast-changing detail (A), hedging in print instead of verifying (C) is a weak substitute for accuracy, and omitting the detail entirely (D) avoids the problem rather than solving it when the title may be relevant to the story."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A supply chain coordinator asks Claude to identify potential risks in a proposed new supplier relationship based on a company profile the coordinator provided, and the response lists financial risk and quality risk but doesn't mention geopolitical or regulatory risk, categories the coordinator specifically wanted covered.",
    question: "What should the coordinator do?",
    options: [
      "Accept the response as complete, since two solid risk categories were identified",
      "Recognize the response didn't fully address what was asked and follow up specifically requesting analysis of geopolitical and regulatory risk before finalizing the supplier risk assessment",
      "Assume geopolitical and regulatory risks don't apply to this supplier since Claude didn't mention them",
      "Discard the entire response since it didn't cover every possible risk category"
    ],
    correct: 1,
    explanation: "This is a completeness gap — specific categories that were explicitly requested were left out — so the coordinator should follow up and get those categories addressed before treating the risk assessment as done (B). Treating a partial answer as complete just because part of it was solid (A) misses the requested scope, assuming omission means \"not applicable\" (C) is an unwarranted inference, and discarding the whole response (D) wastes the useful parts that were provided."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A corporate attorney's paralegal asks Claude to help identify relevant precedent for a contract dispute and cross-checks the citations against two different legal databases; one citation checks out exactly, but a second citation matches a real case with a similar name, except the outcome and legal holding described don't match the actual case at all.",
    question: "What does this situation best illustrate, and what should the paralegal do?",
    options: [
      "That legal research assistance from AI is never worth attempting given this level of error, so it should be avoided entirely going forward",
      "That a citation can point to a real, existing case while still misrepresenting what that case actually held — this is a subtler and more dangerous error than a fully fabricated citation, so every citation needs both existence AND substance verified, and the mismatched one should be discarded or corrected before use in the filing",
      "That because one citation checked out, the second one is probably also close enough to use with minor edits",
      "That the paralegal should stop cross-checking citations since it already found one error and that's sufficient due diligence"
    ],
    correct: 1,
    explanation: "This is a particularly dangerous failure mode: the citation exists (so a simple existence check would pass) but the substance is wrong, meaning verification must confirm both that a source exists and that it actually says what's claimed — this is more insidious than an obviously fake citation because it's easier to miss (B). Abandoning AI research assistance entirely after finding an error through the very process designed to catch it (A) is an overcorrection, using a mismatched precedent with only minor edits (C) risks citing a case for a holding it doesn't support, and stopping verification early because one error was already found (D) is exactly backwards — it shows why continued verification matters."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A gym manager asks Claude for general tips on writing a friendly reminder email about membership renewal, without any specific dates, prices, or policy details included in the response.",
    question: "How should the manager treat this output?",
    options: [
      "As requiring the same verification as a legal notice, since any business communication carries risk",
      "As reasonably safe to use with a light read-through, since it contains general writing advice rather than specific factual or numerical claims",
      "As something that must be verified against company legal counsel before use",
      "As unusable, since it lacks specific details tailored to the gym"
    ],
    correct: 1,
    explanation: "General writing guidance with no specific factual claims is low-stakes and can reasonably be used after a light read-through (B). Treating it like a legal notice (A) or requiring legal counsel review (C) is disproportionate to the actual content, and calling it unusable simply because it's general rather than gym-specific (D) misunderstands what was actually asked for — the manager can still personalize it afterward."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A biotech company's marketing associate asks Claude to summarize published clinical trial results for a competitor's product, planning to reference the summary in an internal competitive analysis (not for public use).",
    question: "Even though this is for internal use only, what should the associate still do?",
    options: [
      "Skip any verification, since internal documents don't need to be accurate",
      "Verify the specific trial results, endpoints, and figures against the actual published study or press release, since internal competitive analyses often inform real business decisions and clinical trial data is technical, detail-heavy content where errors are plausible",
      "Assume the summary is accurate since it's just for internal use and low visibility",
      "Only verify it if the summary happens to include a statistic that looks surprising"
    ],
    correct: 1,
    explanation: "\"Internal use\" doesn't mean low-stakes — competitive analyses often directly inform business strategy decisions, and clinical trial data is detailed, technical content where confidently-stated errors are plausible, so verification against the actual published source is still warranted (B). Skipping verification because it's internal (A, C) confuses audience with stakes, and only checking numbers that look surprising (D) misses the fact that plausible-looking wrong numbers are the harder and more common problem to catch."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A city planner asks Claude to summarize public comments submitted about a proposed zoning change, and the summary states that \"most commenters opposed the change,\" which will be referenced in a report to the city council.",
    question: "What should the planner do before this characterization goes into an official report?",
    options: [
      "Use the characterization as-is, since summarizing sentiment is subjective and doesn't need verification",
      "Independently tally or spot-check the actual comments to confirm the stated sentiment breakdown is accurate, since this characterization will shape a council decision and a miscounted or overstated sentiment trend could misrepresent public opinion in an official record",
      "Replace 'most' with 'some' to make the claim safer without checking the actual comments",
      "Ask Claude to recount the comments in the same conversation and treat a matching answer as sufficient confirmation"
    ],
    correct: 1,
    explanation: "Sentiment summaries can still be wrong in a checkable way — the underlying comments can be tallied — and because this will inform an official government report and council decision, verifying the actual breakdown is warranted rather than trusting the characterization at face value (B). Sentiment isn't purely unverifiable just because it involves judgment (A), swapping in vaguer language without checking (C) avoids the real question of accuracy, and having the same tool recheck its own work in the same conversation (D) isn't independent verification."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A career coach asks Claude to summarize typical salary ranges for a specific job title in a specific metro area, to share with a coaching client preparing for a negotiation.",
    question: "What should the coach do given how much weight the client will place on this number?",
    options: [
      "Present the figure as authoritative, since Claude likely drew from broad general knowledge about salaries",
      "Cross-check the range against a current salary data source (such as a compensation survey or job board aggregator) before advising the client, since salary data changes over time and varies by source, and an inaccurate range could lead to a poorly calibrated negotiation",
      "Tell the client the exact figure with no caveats, since specific numbers are more persuasive in a negotiation",
      "Avoid discussing salary ranges with clients altogether since AI cannot be trusted with numbers"
    ],
    correct: 1,
    explanation: "Salary data changes over time, varies significantly by source and methodology, and directly affects a client's real negotiating position, so cross-checking against a current compensation data source before advising the client is the appropriate step (B). Treating the figure as authoritative without checking (A) risks a poorly calibrated negotiation, presenting it with false certainty (C) overstates confidence the coach doesn't actually have, and refusing to discuss salary data at all (D) is an overcorrection when verification is a reasonable middle path."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An operations analyst asks Claude to summarize a long internal audit report and highlight the top three findings, and the summary presents three findings clearly, but one of them reverses the actual conclusion stated in the source report (the report said a control was \"functioning adequately\"; the summary says it was \"a significant weakness\").",
    question: "What should the analyst do upon noticing this?",
    options: [
      "Correct the summary to match the source report exactly, and re-check the other findings for similar reversals before distributing the summary further, since this kind of error can materially mislead readers about audit conclusions",
      "Leave it as-is since two of the three findings appear to be accurate",
      "Assume the summary is right and the original report has a typo",
      "Split the difference and describe the control as 'partially adequate'"
    ],
    correct: 0,
    explanation: "A summary that reverses a source document's actual conclusion is a serious, materially misleading error, especially for an audit report, so it needs correcting and the analyst should re-check the remaining findings for similar issues before the summary circulates further (A). A 2-out-of-3 accuracy rate (B) isn't good enough when the third finding is a direct reversal, assuming the original source is wrong instead of the summary (C) is backwards without actual evidence, and inventing a middle-ground characterization (D) doesn't reflect what the source document actually said."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A front desk coordinator at a dental office asks Claude to write a general appointment reminder text template, with placeholders for date, time, and provider name to be filled in manually each time.",
    question: "What is the main benefit of using placeholders rather than having Claude fill in specific appointment details?",
    options: [
      "It avoids having Claude generate or guess specific factual details (like a real date, time, or provider name) that would need separate per-patient verification, since those come from the actual scheduling system",
      "It makes the template look more professional",
      "It means the template never needs to be reviewed before use",
      "It guarantees patients will show up on time"
    ],
    correct: 0,
    explanation: "Using placeholders keeps Claude out of the business of generating specific, verifiable facts (an actual date, time, or provider name) that should come directly from the scheduling system rather than being guessed or invented, which is a sound way to reduce error risk (A). It's not primarily about appearance (B), a template still deserves a basic review of the wording (C), and it has no bearing on patient attendance (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A benefits broker asks Claude to compare three health insurance plans' out-of-pocket maximums for a client, and the answer's numbers for two of the three plans match the plan documents the broker has on file, but the third plan's figure is off by several thousand dollars.",
    question: "What should the broker take away from this pattern?",
    options: [
      "Since most of the numbers were correct, the third figure is probably also close enough to use",
      "Even when Claude gets most details right, any individual figure can still be wrong, so every number that will be presented to a client should be checked against the actual plan documents rather than assuming accuracy based on a good track record within the same answer",
      "The broker should stop using Claude for insurance comparisons altogether after this single error",
      "The broker should average the AI-provided figure with the correct one from the plan document"
    ],
    correct: 1,
    explanation: "Partial accuracy within one answer doesn't predict the accuracy of the remaining figures — this is exactly why each individual number destined for a client needs its own check against the source documents, not a pass based on the answer's overall track record (B). Assuming the third number is \"probably close enough\" because the others were right (A) is the exact error being tested, discontinuing use entirely after one caught error (C) is an overcorrection when verification is working as intended, and averaging a wrong figure with a known-correct one (D) makes no sense once the correct figure is already available."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A public health outreach worker asks Claude for statistics on vaccination rates in their county to include in a grant application due this afternoon, and the answer includes a specific percentage with no source mentioned.",
    question: "Given the tight deadline, what is the best approach?",
    options: [
      "Use the number as given, since the deadline doesn't leave time for verification and a specific percentage is better than nothing",
      "Quickly check the figure against a public health department or CDC data source, since this is a factual, checkable claim, and a wrong statistic in a grant application can affect funding decisions and organizational credibility",
      "Remove all statistics from the application regardless of deadline pressure",
      "Cite the statistic as coming from 'internal research' to avoid needing an external source"
    ],
    correct: 1,
    explanation: "A specific, checkable public health statistic can typically be verified quickly against an authoritative source like a health department or the CDC, and a deadline is not a good reason to submit potentially wrong data in a funding application (B). Using the number simply because there's a deadline (A) risks submitting inaccurate data, removing all statistics (C) is an overcorrection when quick verification is realistic, and fabricating a source label (D) is dishonest and doesn't solve the underlying accuracy question."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A retail buyer asks Claude to forecast next month's demand for a product line based on the last six months of sales data pasted into the chat, and the forecast includes a specific unit number with the caveat: \"this is a rough estimate and actual demand could vary based on factors not reflected in this data, such as seasonality or promotions.\"",
    question: "How should the buyer use this forecast?",
    options: [
      "Order exactly that unit number with no adjustment, since Claude already accounted for seasonality in its caveat",
      "Use the number as one input among several, factoring in the explicitly flagged uncertainty (seasonality, promotions) and any other business knowledge before placing a final order",
      "Discard the forecast entirely, since it admitted uncertainty",
      "Order double the suggested amount to be safe, without further analysis"
    ],
    correct: 1,
    explanation: "The caveat explicitly names what the forecast doesn't account for, so it should be treated as one useful input that gets combined with the buyer's own knowledge of upcoming promotions or seasonal patterns, not followed blindly or ignored (B). Ordering the exact number despite the caveat's warning (A) misreads what the hedge is telling the buyer, discarding the forecast entirely (C) wastes a reasonable starting estimate, and arbitrarily doubling the order (D) isn't a substitute for actually incorporating the flagged factors."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A payroll administrator asks Claude to explain how overtime pay should be calculated for an employee who worked across two different pay classifications in the same week, and the explanation walks through a formula with specific numbers matching this employee's situation.",
    question: "What should the administrator do before running actual payroll based on this explanation?",
    options: [
      "Run payroll using Claude's calculation directly, since it walked through the formula step by step",
      "Verify the calculation approach against the company's actual payroll policy and applicable labor law, and recompute the final figures independently, since overtime miscalculations can result in underpaying an employee or violating labor regulations",
      "Only check the math if the employee complains about their paycheck being wrong",
      "Assume overtime rules are the same everywhere and skip checking company-specific policy"
    ],
    correct: 1,
    explanation: "Overtime calculations across mixed pay classifications are legally sensitive, and getting them wrong can mean underpaying an employee or violating labor law, so both the calculation approach and the final figures should be checked against actual policy and independently recomputed before payroll runs (B). A step-by-step explanation isn't proof the steps or inputs were correct (A), waiting for employee complaints (C) means the error already caused harm before being caught, and overtime rules vary by jurisdiction and company policy, so assuming universality (D) is risky."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A yoga studio owner asks Claude to write a light, encouraging Instagram caption for a new class launch, with no factual claims about health benefits included.",
    question: "What is a reasonable amount of review here?",
    options: [
      "A quick tone check is enough, since there's no factual content and the stakes of a minor wording issue are low",
      "The caption should be checked by a medical professional before posting",
      "The caption requires the same scrutiny as a public health statistic",
      "No captions written with AI assistance should ever be posted"
    ],
    correct: 0,
    explanation: "With no factual or health claims involved, this is a low-stakes creative task where a quick tone check is proportionate (A). Requiring medical review (B) or statistic-level scrutiny (C) doesn't match the actual content, and refusing to ever post AI-assisted captions (D) is an unfounded blanket rule — the concern would be different if the caption made specific health claims, which it doesn't here."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An immigration paralegal asks Claude to summarize current visa processing timelines for a specific visa category, to advise a client about how long to expect to wait.",
    question: "What is the biggest concern with using this summary directly?",
    options: [
      "Processing timelines fluctuate and are published by government agencies with regular updates, so Claude's answer may reflect outdated timelines from before its knowledge cutoff, making a check against the current official government source necessary",
      "Government processing timelines never change once set, so no verification is necessary",
      "The main concern is that Claude will refuse to discuss immigration topics",
      "The paralegal should trust the summary as long as it includes a specific number of weeks or months"
    ],
    correct: 0,
    explanation: "Visa processing timelines are updated regularly by government agencies and are exactly the kind of frequently-changing data that can be outdated in Claude's training data, so checking the current official source before advising a client is essential (A). Timelines do change (B is false), Claude does not refuse general immigration information requests (C), and a specific-sounding number doesn't establish that it's current (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A restaurant owner asks Claude to summarize local health code requirements for food storage temperatures, and the answer gives specific temperature thresholds.",
    question: "What should the owner do before posting these thresholds as official kitchen guidance?",
    options: [
      "Post them directly, since food safety temperatures are generally well-known and unlikely to be misstated",
      "Verify the specific thresholds against the local health department's actual code or an official food safety resource, since incorrect thresholds could lead to a real health code violation or foodborne illness risk",
      "Post them but round all numbers down to be conservative",
      "Skip verification since Claude is generally reliable about safety-related numbers"
    ],
    correct: 1,
    explanation: "Local health codes can vary by jurisdiction and specific numeric thresholds are exactly the kind of detail that can be stated confidently but incorrectly, and getting this wrong risks both a health code violation and actual foodborne illness, so checking against the actual local code is warranted (B). Assuming general familiarity means no risk of misstatement (A) is unfounded, arbitrarily rounding down (C) doesn't verify accuracy and could introduce its own compliance issues, and general reliability claims (D) don't substitute for checking a specific, jurisdiction-dependent figure."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A museum curator asks Claude to write descriptive placards for an exhibit, including specific dates and historical details about featured artifacts, based on background material the curator provided.",
    question: "What should the curator do before the placards go to print?",
    options: [
      "Print them directly, since the background material was provided and Claude should have used it accurately",
      "Cross-check each factual claim (dates, names, historical details) in the drafted placards against the original background material and other historical references, since printed museum placards are treated by visitors as authoritative and errors are costly to correct once printed",
      "Print them and plan to issue corrections only if a visitor points out an error",
      "Skip verification for placards describing well-known historical events, but check the others"
    ],
    correct: 1,
    explanation: "Museum placards are treated by the public as authoritative, printing is costly to redo, and even with source material provided Claude can misstate specific details, so cross-checking every factual claim before printing is the appropriate diligence (B). Providing source material doesn't guarantee flawless use of it (A), waiting for visitor-reported errors (C) means inaccurate information is already public and printed, and selectively skipping verification for \"well-known\" events (D) is exactly where subtle errors can hide since reviewers may be less careful."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A wealth management associate asks Claude to explain the tax implications of a specific type of trust distribution for a client's estate plan, and the explanation is detailed and confident but touches on an area of tax law with known regional variation and periodic legislative changes.",
    question: "What is the appropriate way to use this explanation?",
    options: [
      "Present it directly to the client as the final answer, since estate tax questions are standardized nationally and don't vary",
      "Use it as background context only, and have a tax attorney or CPA confirm the specific application to this client's situation and jurisdiction before any advice is given, since incorrect estate tax guidance can create significant financial and legal harm",
      "Present it to the client along with a note that it was AI-generated, which shifts responsibility for accuracy to the client",
      "Skip professional review since the explanation sounded thorough and well-reasoned"
    ],
    correct: 1,
    explanation: "Estate and trust tax law varies by jurisdiction and changes periodically, and giving a client incorrect guidance here can cause serious financial and legal harm, so this is a clear case for treating the AI output as background only, with a qualified tax professional confirming the specific application (B). Estate tax rules are not uniform nationally (A is false), disclosing AI involvement doesn't transfer responsibility for giving correct advice (C), and thoroughness of explanation is not the same as correctness (D)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A freelance graphic designer asks Claude for feedback on a logo concept description (text-based, no image), purely as a creative sounding board.",
    question: "How should the designer treat this feedback?",
    options: [
      "As one subjective opinion to weigh alongside the designer's own judgment and possibly client feedback, since this is a creative, low-stakes matter of taste rather than a factual claim",
      "As definitive, expert-level design authority that should override the designer's own judgment",
      "As something requiring formal verification against design industry standards bodies",
      "As irrelevant, since AI feedback on creative work has no value"
    ],
    correct: 0,
    explanation: "Creative feedback is inherently subjective and low-stakes, so it's reasonably treated as one input among several — useful, but not a verified fact needing fact-checking, and not authoritative over the designer's own expertise either (A). Treating it as definitive authority (B) misunderstands what subjective feedback is, requiring formal standards-body verification (C) doesn't apply to creative taste, and dismissing it as valueless (D) is an unwarranted overcorrection."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A clinical research coordinator asks Claude to summarize eligibility criteria for a clinical trial based on the trial protocol document pasted in full, to help pre-screen patients over the phone. The summary correctly lists four of five inclusion criteria but omits an exclusion criterion related to a specific prior medical condition that was clearly stated in the protocol.",
    question: "What does this omission illustrate about evaluating AI output in a clinical research context, and what should the coordinator do?",
    options: [
      "That AI tools should never be used to touch any clinical trial materials under any circumstances",
      "That completeness failures in high-stakes technical documents can directly cause real-world harm — here, a missed exclusion criterion could lead to enrolling an ineligible and potentially at-risk patient — so the summary must be checked line-by-line against the full protocol, not just spot-checked, before it's used for actual patient screening",
      "That the omission is acceptable since four of five criteria is a high accuracy rate",
      "That the coordinator should ask Claude why it left out the criterion and trust whatever explanation is given"
    ],
    correct: 1,
    explanation: "In clinical research, a missed exclusion criterion isn't a cosmetic gap — it could lead directly to enrolling a patient for whom the trial poses real risk, which is why completeness needs full, line-by-line verification against the source protocol before the summary is used operationally, not a spot-check or a percentage-based tolerance (B). Banning AI assistance for all clinical materials (A) is an overcorrection when careful verification can make the tool safely useful, treating 80% completeness as good enough (C) is unacceptable when the missing 20% concerns patient safety, and asking Claude to explain its own omission and trusting that explanation (D) doesn't provide the independent verification actually needed."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A church administrator asks Claude to draft a newsletter blurb summarizing attendance trends over the past year, using numbers the administrator typed in from memory rather than looking them up.",
    question: "What is the main risk in this workflow, and where does it originate?",
    options: [
      "The risk originates with Claude fabricating attendance data",
      "The risk originates with the administrator's own memory-based numbers being potentially inaccurate, not with Claude, so the administrator should verify the input figures against actual attendance records before or after drafting, regardless of how well Claude uses them",
      "There is no risk since newsletters are inherently low-stakes documents",
      "The risk is that Claude will refuse to use estimated numbers"
    ],
    correct: 1,
    explanation: "This scenario highlights that output quality also depends on input quality — if the administrator's memory-based figures are wrong, even a flawless summary will faithfully repeat the wrong numbers, so the fix is verifying the actual source figures, not scrutinizing Claude's handling of them (B). Claude isn't the origin of the risk here since it was simply given the numbers (A), attendance figures published to a congregation still deserve basic accuracy even if low-stakes (C), and Claude does not refuse to work with user-supplied estimates (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A logistics manager asks Claude to summarize a lengthy vendor performance report and specifically requests the summary include on-time delivery rate, defect rate, and average response time. The resulting summary covers on-time delivery and defect rate clearly but never mentions response time at all.",
    question: "What is the appropriate reaction?",
    options: [
      "Assume response time wasn't in the original report, since Claude would have included it if it were there",
      "Treat this as an incomplete answer relative to what was explicitly requested, and either search the original report directly or ask a specific follow-up question about response time before treating the summary as done",
      "Accept the two metrics that were provided as sufficient, since two out of three is a reasonable completion rate",
      "Assume the omission means response time data was unfavorable and was deliberately left out"
    ],
    correct: 1,
    explanation: "When a specific, explicitly requested item is missing from a summary, the safest assumption is that the summary is incomplete, not that the underlying data doesn't exist — the manager should check the source directly or follow up rather than treat the answer as finished (B). Assuming absence from the summary means absence from the source (A) is an unsafe inference, accepting partial coverage of an explicit request (C) doesn't meet the actual need, and assuming intentional suppression of unfavorable data (D) attributes motive without evidence."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A school district's data coordinator asks Claude to calculate the year-over-year percentage change in standardized test scores across five schools from a pasted spreadsheet, intending to present the results at a public school board meeting.",
    question: "Given this will be presented publicly and could influence funding or policy discussions, what should the coordinator do?",
    options: [
      "Present the percentages as calculated, since Claude processed the full spreadsheet in one pass",
      "Independently recalculate the percentage changes for at least a sample of schools using spreadsheet formulas to confirm accuracy, since multi-row percentage calculations are error-prone and a mistake presented publicly could misinform a funding or policy decision and would be embarrassing to correct later",
      "Present the numbers rounded to the nearest whole percent, which eliminates the risk of calculation error",
      "Ask Claude to show its work, and treat any answer with shown steps as automatically correct"
    ],
    correct: 1,
    explanation: "Public, policy-relevant calculations from spreadsheet data carry real consequences if wrong — both for decision-making and for the coordinator's credibility — so independently recalculating at least a sample of the figures is a proportionate check before a public presentation (B). Trusting a single-pass calculation without verification (A) is the risk being tested, rounding (C) doesn't fix a wrong underlying number, and showing work doesn't guarantee the work itself is correct (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A nonprofit executive director asks Claude to compare their organization's overhead ratio to \"typical nonprofit benchmarks\" and gets a specific percentage cited as the industry standard.",
    question: "What should the director do with this benchmark figure before including it in a donor report?",
    options: [
      "Use it directly, since industry benchmarks are widely known and unlikely to vary",
      "Trace the benchmark to a specific, reputable source (such as a nonprofit sector watchdog or association) to confirm the percentage and its applicability to the organization's size and sector, since benchmarks vary by nonprofit type and an unsupported claim in a donor report could damage credibility if wrong",
      "Replace the specific percentage with the vague phrase 'within typical range' to avoid needing to verify it",
      "Assume the benchmark is accurate because Claude presented it as \"the industry standard\" rather than hedging"
    ],
    correct: 1,
    explanation: "Overhead ratio benchmarks vary meaningfully by nonprofit sector and size, and an incorrect benchmark presented to donors risks credibility, so tracing it to a specific reputable source before using it is the right step (B). Assuming a single universal benchmark exists and needs no checking (A) oversimplifies a genuinely variable figure, swapping in vague language to dodge verification (C) doesn't resolve whether the underlying comparison is even valid, and confident phrasing from Claude is not itself evidence of accuracy (D)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A dog groomer asks Claude to write a fun, informal caption for a before-and-after photo post on social media, with no claims made about the dog's breed, age, or any factual detail beyond what the groomer already knows.",
    question: "What is the appropriate scrutiny level for this task?",
    options: [
      "Minimal — this is a low-stakes creative caption with essentially no factual content to verify",
      "The groomer should verify the caption's claims against veterinary records before posting",
      "The same scrutiny needed for a public health announcement",
      "The caption should be reviewed by a professional editor before any social post"
    ],
    correct: 0,
    explanation: "A purely creative caption with no factual claims warrants only a light glance before posting, matching the low stakes involved (A). There are no veterinary claims to check here (B), applying public-health-level scrutiny (C) is a mismatch, and requiring professional editorial review for a casual social post (D) is disproportionate."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "An HR investigator asks Claude to summarize witness statements from a workplace complaint investigation, pasted in full, to include in a formal findings report. The summary paraphrases one witness as saying they \"directly observed\" an incident, but the original statement actually said they \"heard about it from a coworker.\"",
    question: "Why is this particular kind of error especially serious in this context?",
    options: [
      "It isn't especially serious, since paraphrasing always changes some nuance and this is expected",
      "It changes the evidentiary weight of the statement from firsthand to secondhand, which could materially affect the investigation's findings and any resulting employment decision, so the investigator must verify every witness statement summary against the original wording before including it in the formal report",
      "It only matters if the complaint involves financial misconduct rather than other workplace issues",
      "It can be resolved by adding a general disclaimer that the report was AI-assisted"
    ],
    correct: 1,
    explanation: "Turning secondhand information into a claimed firsthand observation is a substantive distortion, not a stylistic paraphrase — it changes how much weight the statement should carry in the investigation and could affect the outcome for the employees involved, making word-for-word verification against original statements essential in a formal HR investigation (B). This is not a trivial paraphrasing quirk (A), the seriousness applies across complaint types, not just financial ones (C), and a general disclaimer does nothing to fix a substantively inaccurate characterization in a formal findings report (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A product manager asks Claude to summarize customer feedback themes from a batch of support tickets and gets a summary claiming that \"pricing concerns\" was the top complaint theme.",
    question: "What is a reasonable check before this conclusion drives a pricing strategy discussion?",
    options: [
      "Spot-check a sample of the actual tickets to confirm pricing complaints are indeed the most frequent theme, since a strategic pricing decision based on a miscounted or overstated theme could be costly",
      "Accept the conclusion, since theme extraction from large batches of text is a task AI performs with guaranteed accuracy",
      "Ask Claude to name the top theme a second time and treat a repeated answer as confirmation",
      "Skip verification since customer feedback themes are inherently subjective and can't really be checked"
    ],
    correct: 0,
    explanation: "Theme frequency claims from a batch of tickets are a factual, checkable claim about the data, and because this will influence a real pricing strategy discussion, spot-checking a sample of tickets is a reasonable and low-cost way to catch a miscounted or overstated theme before it drives a costly decision (A). Assuming guaranteed accuracy on text analysis tasks (B) is unfounded, repeating the same question to the same tool isn't independent verification (C), and theme extraction is checkable by sampling actual tickets, so calling it unverifiable (D) is incorrect."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A veterinary clinic's office manager asks Claude to summarize general information about a common pet vaccination schedule for a client education handout, and the answer states specific age intervals for booster shots.",
    question: "What should happen before this handout is distributed to pet owners?",
    options: [
      "Distribute it directly, since vaccination schedules are common knowledge unlikely to be misstated",
      "Have a veterinarian on staff confirm the specific intervals match the clinic's actual protocol and current veterinary guidance, since incorrect timing information could lead an owner to under- or over-vaccinate their pet",
      "Add a general disclaimer instead of veterinary review, since disclaimers address this type of risk",
      "Distribute it, but only verify the schedule if a client specifically asks about it"
    ],
    correct: 1,
    explanation: "Specific vaccination intervals are exactly the kind of confidently-stated detail that can be wrong or generic rather than matching the clinic's actual protocol, and getting it wrong has real animal health consequences, so veterinary confirmation before distribution is warranted (B). Assuming common-knowledge topics are immune to error (A) is the core misconception this domain tests, a disclaimer doesn't fix inaccurate content (C), and waiting for a client to ask before checking (D) means incorrect information may already have been acted on by other clients."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A camp director asks Claude to brainstorm icebreaker activity ideas for a new group of summer camp counselors, with no factual claims involved.",
    question: "What is the appropriate level of scrutiny?",
    options: [
      "A light skim for age-appropriateness and practicality is sufficient, since this is a low-stakes creative brainstorm with nothing to fact-check",
      "The ideas should be checked against a national youth safety certification database before use",
      "The same rigor as reviewing a legal waiver",
      "No use of the ideas at all, since brainstorming assistance is inappropriate for youth programs"
    ],
    correct: 0,
    explanation: "This is a low-stakes creative brainstorming task, so a practical skim for age-appropriateness and feasibility matches the actual risk (A). Requiring a safety-certification-database check (B) or legal-waiver-level rigor (C) is disproportionate to icebreaker activity ideas, and refusing to use any AI brainstorming for youth programs (D) is an unfounded blanket restriction — the director's own judgment on appropriateness is a normal and sufficient safeguard here."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A construction safety officer asks Claude to summarize OSHA fall protection requirements for scaffolding work at a specific height, and the answer includes a specific height threshold that determines when fall protection is legally required.",
    question: "What should the safety officer do before updating the job site safety policy based on this threshold?",
    options: [
      "Update the policy directly, since OSHA regulations are federal and therefore simple enough that Claude is unlikely to get them wrong",
      "Verify the exact threshold against the current OSHA regulation text or a qualified safety consultant, since a wrong threshold in a safety policy could lead to a serious injury, a fatality, or a regulatory violation, and OSHA rules can have exceptions based on industry and work type",
      "Set the policy at a slightly more conservative threshold than what Claude gave, without checking whether the underlying rule was even correct",
      "Trust the threshold since it was stated as a specific number, and specific numbers are inherently more reliable than general statements"
    ],
    correct: 1,
    explanation: "Fall protection thresholds are life-safety-critical and can have industry-specific exceptions, so verifying the exact figure against the actual OSHA regulation or a qualified safety consultant is essential before it becomes site policy — the consequences of an error range from injury to fatality to regulatory citation (B). Assuming federal regulations are simple and low-error-risk (A) is unfounded, adjusting to be \"more conservative\" without confirming the actual rule (C) doesn't verify correctness, and a number's specificity doesn't make it inherently more trustworthy (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A travel agency consultant asks Claude for current entry requirements (visa, vaccination, documentation) for a client traveling to a specific country next month.",
    question: "What is the most important consideration given the trip is imminent?",
    options: [
      "Entry requirements should be verified against the destination country's official government or embassy source, since these requirements can change and Claude's knowledge cutoff means the information might be outdated, which could cause the client to be denied entry",
      "Entry requirements are internationally standardized and don't need country-specific verification",
      "The consultant should trust Claude's answer since it's specific to the country in question",
      "Verification is only necessary if the client is traveling to a country with an unstable political situation"
    ],
    correct: 0,
    explanation: "Entry requirements change and vary significantly by country, and Claude's knowledge cutoff makes this a clear case for checking an official government or embassy source, since a wrong answer could mean a client is denied entry to a country they've already booked travel for (A). Entry requirements are not internationally standardized (B is false), specificity to the country doesn't establish currency (C), and this risk applies broadly, not only to politically unstable destinations (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A corporate trainer asks Claude to generate a quiz to test employees on a company's internal expense reporting policy, based on the actual policy document pasted into the chat. One quiz question's \"correct\" answer contradicts a specific rule stated in the pasted policy document.",
    question: "What should the trainer do?",
    options: [
      "Use the quiz as-is, since it was generated directly from the company's own policy document",
      "Review every question and its marked correct answer against the actual policy text before distributing the quiz, since even with source material provided, Claude can misstate a rule, and an incorrect \"correct\" answer would actively teach employees the wrong policy",
      "Remove just that one question but assume the rest are accurate without checking",
      "Assume the pasted policy document itself must be outdated, since the quiz question seems confident"
    ],
    correct: 1,
    explanation: "This is a case where output can be wrong even when generated directly from correct source material, and because a quiz actively teaches (and potentially misinforms) employees about policy, every question and answer should be checked against the actual policy text before distribution (B). Trusting it simply because a real source document was used (A) is the core error, fixing only the one already-noticed error without checking the rest (C) is incomplete verification, and assuming the source document is wrong instead of the AI-generated quiz (D) has it backwards without actual evidence."
  },
  {
    domain: 2,
    difficulty: 5,
    scenario: "A hospital risk management officer asks Claude to draft an incident report summary of a patient safety event, based on notes from multiple staff members pasted into the chat. The draft is well-organized and reads professionally, but subtly changes the sequence of events in a way that shifts apparent responsibility between two staff members compared to what the original notes describe.",
    question: "What is the most serious concern illustrated here, and what is the correct response?",
    options: [
      "That professional-sounding, well-organized language can mask a substantive factual distortion with real consequences for the people involved, so incident reports in a patient-safety and potential liability context must be verified sentence-by-sentence against the original source notes by someone with firsthand knowledge of the event, not accepted based on how polished the draft reads",
      "That incident reports should never involve any drafting assistance, since the risk of error is too high in any circumstance",
      "That this is a minor stylistic issue since the overall incident is still described accurately in broad terms",
      "That the officer should ask Claude to confirm the sequence is accurate, and treat its confirmation as sufficient"
    ],
    correct: 0,
    explanation: "This scenario shows the domain's central risk at its highest stakes: fluent, well-organized text can quietly contain a factual distortion that has real consequences — here, shifting apparent responsibility between staff members — which is precisely why polish must never be mistaken for accuracy, and why sentence-level verification against source notes by someone with firsthand knowledge is required in a patient-safety and liability context (A). Banning all drafting assistance outright (B) is an overcorrection when careful verification can make the tool safely useful, calling a responsibility-shifting sequence change \"minor\" (C) dramatically understates the harm, and asking the same tool to confirm its own accuracy (D) provides no real independent verification."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A landscaping business owner asks Claude for general seasonal lawn care tips to post on the company blog, without asking about any specific regulated products like pesticides.",
    question: "What review is appropriate before publishing?",
    options: [
      "A general read-through for correctness and relevance is reasonable, since this is fairly low-stakes general advice with no regulated product or safety claims involved",
      "The blog post requires review by an agricultural regulatory agency before publishing",
      "No review is needed since lawn care tips are inherently harmless regardless of content",
      "The post should be withheld indefinitely pending a licensed horticulturist's sign-off"
    ],
    correct: 0,
    explanation: "General seasonal lawn care advice without specific regulated-product or safety claims is reasonably low-stakes, so a general accuracy read-through is proportionate (A). Requiring regulatory agency review (B) or a licensed horticulturist's sign-off (D) would be appropriate if the content involved specific chemical application rates or safety claims, but not for generic tips, and assuming zero risk regardless of content (C) overlooks that even general tips could contain a plausible-sounding but wrong claim worth a basic check."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A software training consultant (for a non-technical audience) asks Claude to summarize the differences between two versions of a common office productivity suite for a client considering an upgrade, and the answer describes features that sound plausible but the consultant isn't sure are accurate.",
    question: "What should the consultant do before advising the client?",
    options: [
      "Rely on the answer, since Claude has broad general knowledge of common software products",
      "Check the vendor's official release notes or product comparison page to confirm the described feature differences, since software features change between versions and an inaccurate comparison could lead the client to make a poor upgrade decision",
      "Ask Claude if it's confident about the comparison, and proceed if it says yes",
      "Recommend the upgrade regardless, since most software upgrades are beneficial anyway"
    ],
    correct: 1,
    explanation: "Software feature sets change between versions and across time, so a plausible-sounding but unverified comparison should be checked against the vendor's actual release notes or comparison page before it informs a client's purchasing decision (B). Broad general knowledge doesn't guarantee accuracy on version-specific details (A), self-reported confidence isn't reliable verification (C), and assuming upgrades are generally beneficial doesn't address whether the specific comparison given to the client is accurate (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A nonprofit's development director asks Claude to draft a year-end impact report for major donors, including a statistic that \"90% of program participants reported improved outcomes,\" a figure the director doesn't recall being part of any survey the organization actually conducted.",
    question: "What should the director do?",
    options: [
      "Include the statistic since it makes the report more compelling to donors",
      "Investigate whether this statistic has any basis in the organization's actual data; if no such survey or figure exists, remove or replace it with a verified number, since presenting a fabricated statistic to donors is both a factual and ethical problem that could seriously damage the organization's credibility",
      "Change the number to 85% to make it seem less suspiciously round",
      "Keep the statistic but attribute it vaguely to 'internal surveys' without confirming one exists"
    ],
    correct: 1,
    explanation: "A specific statistic the director doesn't recognize from any actual survey is a strong signal of possible fabrication, and presenting an invented statistic to donors is both a factual accuracy problem and a serious ethical and credibility risk if ever discovered — the director should trace it to real data or drop it (B). Including it for persuasive value without verification (A) risks exactly that damage, changing the number to seem more plausible (C) doesn't address whether any real data supports the claim, and vaguely attributing it to unconfirmed internal surveys (D) is a version of the same fabrication problem."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A restaurant chain's regional manager asks Claude to calculate the average table turnover time across ten locations from a pasted data table, and cross-checks the result by asking the same question again in a fresh conversation. Both times, Claude gives the same average.",
    question: "How much confidence should this consistency give the manager?",
    options: [
      "Full and complete confidence, since getting the same answer twice is proof the calculation is correct",
      "Somewhat more confidence than a single answer alone, but not full certainty, since Claude could make the same systematic error both times; an independent recalculation with a spreadsheet formula is still the more reliable check",
      "No additional confidence at all, since repeating a question is completely meaningless",
      "Confidence should decrease, since asking twice always indicates something is wrong"
    ],
    correct: 1,
    explanation: "Getting the same answer twice is mildly reassuring but not proof of correctness, since a systematic misreading of the data or a consistent calculation mistake would be reproduced identically both times — an independent method like a spreadsheet formula remains the more reliable check (B). Treating repetition as full proof (A) overstates what consistency actually demonstrates, calling it completely meaningless (C) understates its modest value as one signal among several, and there's no basis for confidence to decrease just from repeating a question (D)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A political campaign staffer asks Claude to fact-check a claim in a draft speech about an opponent's voting record, and Claude responds that it cannot verify the specific claim with confidence and recommends checking an official legislative record.",
    question: "What should the staffer do with this response?",
    options: [
      "Treat Claude's inability to verify as effectively confirming the claim is true, since Claude would have corrected it if it were false",
      "Follow Claude's recommendation and check the claim against the official legislative record before it appears in a speech, given the reputational and legal risk of a public figure making a false statement about an opponent's record",
      "Remove Claude's hedge language from consideration and use the claim anyway, since the speech is due soon",
      "Treat the hedge as a definitive statement that the claim is false"
    ],
    correct: 1,
    explanation: "When Claude explicitly says it can't verify something and points to an authoritative source, that's a direct, actionable signal — checking the official legislative record before a public figure makes the claim is the responsible move given the reputational and legal stakes of misstating an opponent's record (B). Silence or uncertainty is not confirmation of truth (A), ignoring the hedge due to time pressure (C) is exactly the risky shortcut this domain warns against, and uncertainty is not the same as a definitive false rating either (D)."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A bookstore employee asks Claude to write a short shelf-talker card recommending a well-known novel, including a one-sentence plot description based on the book's back-cover summary the employee typed in.",
    question: "What is a sensible check before printing the card?",
    options: [
      "A quick read to confirm the plot description matches what was typed in and doesn't misstate a major plot detail, since even short text can occasionally drift from the source",
      "No check is needed since it's just a shelf card",
      "The card should be verified by the book's publisher before printing",
      "The card should be checked against professional literary critic reviews"
    ],
    correct: 0,
    explanation: "A quick comparison against the source summary is a low-effort, proportionate check for a short piece of customer-facing text, especially since even brief text can occasionally misstate a detail (A). Skipping any check at all (B) is a minor risk not worth taking when the check is so easy, and requiring publisher sign-off (C) or critic-review-level verification (D) is disproportionate for an in-store shelf card."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A dental insurance coordinator asks Claude to explain how a specific procedure code should typically be billed, and the answer includes a confident explanation along with the phrase \"this can vary by insurer and plan, so confirming with the specific payer is recommended.\"",
    question: "How should the coordinator act on this response?",
    options: [
      "Ignore the caveat and bill according to Claude's general explanation for all payers uniformly",
      "Use the general explanation as a starting framework, but follow the explicit advice to confirm the specific billing rule with each relevant payer before submitting claims, since incorrect billing can result in claim denials or compliance issues",
      "Treat the caveat as boilerplate that doesn't need to be acted on",
      "Assume the explanation is wrong entirely because it included a caveat"
    ],
    correct: 1,
    explanation: "Claude's explicit caveat about payer-specific variation is directly actionable guidance, not boilerplate — the coordinator should use the general explanation as a starting point but actually follow through on confirming with each specific payer before submitting claims, since incorrect billing has real financial and compliance consequences (B). Ignoring the caveat and billing uniformly (A) risks exactly the variation Claude flagged, dismissing the caveat as meaningless (C) wastes a useful warning, and assuming a caveat means the whole explanation is wrong (D) misreads appropriate hedging as an error signal."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A conference planning committee member asks Claude to estimate total catering costs based on a headcount and per-person price the member provided, and separately asks a colleague to do the same math manually. The two totals differ by about 10%.",
    question: "What should the committee do?",
    options: [
      "Use Claude's total, since it's an AI system and inherently more precise than manual human math",
      "Use the colleague's total, since a human calculated it and humans are inherently more reliable than AI",
      "Investigate the discrepancy by redoing the calculation from scratch (ideally with a calculator or spreadsheet) to determine which total, if either, is correct, since a 10% gap in a budget figure is significant enough to resolve rather than guess at",
      "Split the difference and budget for the average of the two totals"
    ],
    correct: 2,
    explanation: "A 10% discrepancy between two independently produced totals is a meaningful sanity-check signal that shouldn't be resolved by picking a side based on assumed superiority — the right move is to redo the calculation carefully to find the actual correct figure (C). Neither AI (A) nor manual human calculation (B) is inherently infallible, so defaulting to one without checking is unjustified, and averaging two potentially-wrong numbers (D) doesn't produce a reliable budget figure."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A commercial property manager asks Claude to summarize a tenant's lease renewal terms based on the lease document pasted in full, and the summary states the rent escalation clause caps annual increases at 3%, but the actual lease text says the cap is 3% only for the first two years and uncapped afterward.",
    question: "What is the risk of relying on the summary as given, and what should the manager do?",
    options: [
      "There's no meaningful risk since the 3% figure is accurate for at least part of the lease term",
      "The summary drops a material condition (the cap's time limit), which could lead the manager to underestimate future rent revenue or misinform ownership about the lease's actual terms; the manager should reread the escalation clause in full and correct the summary before using it in any lease abstract or ownership report",
      "The manager should just add a note that the terms 'might change' without checking what the lease actually specifies",
      "The manager should ask the tenant to explain the lease terms instead of rereading the pasted lease document already at hand"
    ],
    correct: 1,
    explanation: "Dropping the time-limited nature of a rent cap is a material omission that changes the real financial picture of the lease, and because this could misinform ownership reporting or revenue projections, the manager should reread the actual clause and correct the summary before using it further (B). The partial accuracy of the 3% figure doesn't offset the missing condition (A), a vague \"might change\" note (C) doesn't convey the actual terms, and asking the tenant (D) is unnecessary and less reliable than simply rereading the lease document that's already available."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A pet store employee asks Claude to write a short product description for a new brand of dog toy, using bullet points from the packaging that the employee typed in.",
    question: "What is a reasonable check before posting the description online?",
    options: [
      "Compare the drafted description against the bullet points provided to make sure no feature was misstated or exaggerated, since even simple product copy can drift from the source",
      "No check is necessary since product descriptions are inherently low-risk regardless of content",
      "The description must be reviewed by the toy manufacturer's legal department before posting",
      "The description should be checked against competitor product listings instead of the actual packaging information"
    ],
    correct: 0,
    explanation: "A quick comparison against the source bullet points is a low-effort way to catch a misstated or exaggerated feature claim before it's posted publicly, since even simple copywriting tasks can occasionally drift from the provided facts (A). Assuming zero risk regardless of content (B) skips an easy check, requiring manufacturer legal review (C) is disproportionate for routine product copy, and checking against competitors instead of the actual source packaging (D) doesn't verify accuracy at all."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "A university financial aid advisor asks Claude to summarize federal student loan forgiveness eligibility criteria to share in a general information session for students.",
    question: "What is most important to verify before the session?",
    options: [
      "Whether the summary is written in an engaging tone",
      "Whether the eligibility criteria described are current, since federal loan forgiveness rules have changed multiple times and outdated or incorrect information could lead students to make poor decisions about their loans",
      "Whether the summary mentions the word 'forgiveness' enough times for clarity",
      "Nothing, since federal student loan rules are permanently fixed by law"
    ],
    correct: 1,
    explanation: "Federal loan forgiveness rules have changed significantly and repeatedly, making this a clear case where Claude's knowledge cutoff could produce outdated guidance that leads students to make poor financial decisions, so checking current official guidance before the session is essential (B). Tone (A) and word frequency (C) are irrelevant to accuracy, and loan forgiveness rules are demonstrably not permanently fixed (D is false)."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A corporate communications director asks Claude to draft a press release announcing quarterly earnings, including specific revenue and profit figures the director provided. The draft accurately includes the profit figure but states the revenue figure with one extra zero, turning $4.5 million into $45 million.",
    question: "What does this illustrate, and what is the appropriate safeguard?",
    options: [
      "That the director should stop providing exact figures to avoid this problem",
      "That even directly provided numbers can be transcribed incorrectly in the output, so every specific figure in a document as consequential as a public earnings release must be checked word-for-word against the source figures before release, regardless of how the rest of the draft reads",
      "That this kind of error is rare enough that a general read-through of the whole press release is unnecessary",
      "That the error is immaterial since the overall press release still communicates positive earnings"
    ],
    correct: 1,
    explanation: "This shows that transcription-style errors can occur even with directly supplied, unambiguous figures, and given that a public earnings release is exactly the kind of high-stakes, market-moving document where a misstated figure could cause real financial and legal harm, every number needs a word-for-word check against the source before release (B). Avoiding giving exact figures (A) would make the task impossible, assuming this kind of error is rare enough to skip review (C) is the wrong lesson to draw from actually observing one, and a 10x revenue overstatement is a serious, material error, not an immaterial one (D)."
  },
  {
    domain: 2,
    difficulty: 3,
    scenario: "An auto repair shop manager asks Claude to explain the typical warning signs of a failing transmission, planning to post the answer as a customer-facing educational article on the shop's website.",
    question: "What should the manager check before publishing, given the article could influence a customer's repair decisions?",
    options: [
      "Nothing, since transmission symptoms are common mechanical knowledge unlikely to contain errors",
      "Have a certified technician review the listed symptoms for accuracy and completeness, since a misleading or incomplete symptom list could cause a customer to either overpay for unneeded work or delay a repair that's actually urgent",
      "Only check the article if a customer specifically disputes it after reading",
      "Publish it, then quietly edit it later if an error is noticed"
    ],
    correct: 1,
    explanation: "Guidance that shapes a customer's repair decisions has real financial and safety consequences if wrong, so a certified technician should review the content for accuracy and completeness before it's published, rather than assuming common-sounding mechanical topics are error-free (B). Skipping review because the topic seems common knowledge (A) is the core misconception this domain tests, waiting for a customer complaint (C) means the error already caused harm, and quietly fixing it later (D) doesn't address customers who already acted on the wrong version."
  },
  {
    domain: 2,
    difficulty: 4,
    scenario: "A tax preparation firm's junior associate asks Claude to explain how a client's freelance income should be categorized for a specific deduction, and the answer is confident but the associate notices it doesn't address a detail about the client's situation (multiple income streams) that seems relevant.",
    question: "What should the associate do?",
    options: [
      "Use the general answer as-is, since it directly addresses the deduction category asked about",
      "Recognize this as a completeness gap, since the answer didn't account for a client-specific detail that could change the correct treatment, and either ask a follow-up that includes that detail or consult a senior preparer before finalizing the client's return",
      "Assume the multiple income streams don't affect the deduction since Claude didn't mention them",
      "File the return as drafted and let the client's accountant catch any issues later"
    ],
    correct: 1,
    explanation: "An answer that doesn't account for a relevant detail of the client's actual situation is incomplete relative to what's needed to give correct guidance, and on a tax return this gap should be closed — either by asking a more specific follow-up or consulting a senior preparer — before filing, given the financial and compliance stakes (B). Treating the general answer as sufficient (A) ignores the relevant complication, assuming no effect just because it wasn't mentioned (C) is an unsafe inference, and filing now with the expectation someone else will catch errors later (D) is poor practice on a document with real legal and financial consequences."
  },
  {
    domain: 2,
    difficulty: 2,
    scenario: "A florist asks Claude to suggest seasonal flower pairings for a spring wedding, purely as creative inspiration with no claims about flower toxicity, allergies, or availability guarantees included in the request.",
    question: "How should the florist treat this list of suggestions?",
    options: [
      "As reliable creative input to consider alongside their own professional knowledge of what's actually in season and available, since this is a low-stakes, subjective task",
      "As something that must be verified against a horticultural research database before use",
      "As requiring legal review before presenting options to a client",
      "As unusable, since AI-generated creative suggestions can never be trusted"
    ],
    correct: 0,
    explanation: "This is a low-stakes, creative brainstorming task where the florist's own professional expertise (about seasonal availability, client budget, etc.) is the natural check, not formal fact-checking (A). Requiring a horticultural database check (B) or legal review (C) is disproportionate for creative pairing suggestions, and dismissing the suggestions as universally unusable (D) is an unfounded overcorrection for a task this low-risk."
  }
];
