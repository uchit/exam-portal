export const QUESTIONS_D6 = [
  {
    domain: 6,
    difficulty: 2,
    scenario: "A customer support agent wants help drafting a reply to an angry customer. To get a more tailored response, the agent pastes the customer's full name, home address, and order history into a general consumer AI chat tool.",
    question: "What is the biggest risk in this situation?",
    options: [
      "The AI might draft a reply that is too polite",
      "Sharing the customer's personal information with a general consumer tool may violate data handling and privacy expectations",
      "The reply will take longer to write than if the agent had done it manually",
      "The AI chat tool might refuse to help with customer service topics"
    ],
    correct: 1,
    explanation: "Personal details like a full name, address, and order history are customer PII, and pasting them into a general consumer AI tool (rather than an approved, sanctioned system) risks violating privacy and data handling norms (B). The other options are not meaningful risks — tone and speed are minor concerns, and general tools readily help with customer service writing (A, C, D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A regional sales manager wants to summarize a spreadsheet of confidential quarterly revenue figures before a board meeting. Their company has an approved, sanctioned enterprise AI tool for this exact purpose, but the manager finds the consumer version faster to open.",
    question: "What should the manager do?",
    options: [
      "Use whichever tool is fastest, since the content is only being summarized, not published",
      "Use the approved enterprise tool, since confidential financial data should stay within sanctioned systems with appropriate data protections",
      "Avoid using AI altogether for anything involving numbers",
      "Ask a colleague to paste the data instead, since that shifts the responsibility away from the manager"
    ],
    correct: 1,
    explanation: "When a sanctioned enterprise tool exists specifically for this kind of sensitive work, it should be used instead of a general consumer tool, because it typically has data protection commitments the consumer version lacks (B). Convenience (A) doesn't offset that risk, avoiding AI entirely (C) is an unnecessary overcorrection, and having someone else do it (D) doesn't remove the underlying data exposure risk."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "An HR team uses an AI tool to help screen resumes for a software engineering role. Over several months, the team notices the tool has been consistently ranking candidates from certain universities lower, even when qualifications are comparable.",
    question: "What is the most responsible next step?",
    options: [
      "Stop using AI for resume screening entirely and switch to fully manual review with no analysis of what went wrong",
      "Continue using the tool as-is, since AI output is generally considered neutral and objective",
      "Investigate the pattern, adjust the process to reduce the bias, and ensure a human reviews rankings before decisions are made",
      "Quietly lower the pass threshold for candidates from those universities to compensate, without telling anyone"
    ],
    correct: 2,
    explanation: "Recognizing a bias pattern and responding to it — including human review of consequential decisions — is the responsible approach (C). Assuming AI output is inherently neutral (B) ignores real fairness risk, an unexplained secret workaround (D) lacks transparency and could create its own inconsistencies, and abandoning AI without diagnosing the actual problem (A) is an overcorrection that doesn't build a better process for the future."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A marketing coordinator uses AI to help draft a company blog post. The AI-assisted draft is edited, fact-checked, and approved by the coordinator's manager before publishing.",
    question: "What is the most reasonable disclosure practice here?",
    options: [
      "The post must include a large disclaimer stating 'This entire post was written by AI' regardless of how much editing occurred",
      "No disclosure is needed since a human reviewed, edited, and takes responsibility for the final content, consistent with normal editorial practice",
      "The coordinator should tell no one, including their manager, that AI was used at any point",
      "The post should be published anonymously so no one can be blamed if it contains errors"
    ],
    correct: 1,
    explanation: "When a human substantively reviews, edits, and takes ownership of the final content, routine use of AI as a drafting aid typically doesn't require special disclosure — this is similar to using any other writing tool (B). Overstating AI's role (A) is inaccurate, hiding usage from a manager (C) is unnecessary and could violate internal policy, and publishing anonymously (D) sidesteps accountability rather than addressing disclosure norms."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A freelance graphic designer asks an AI image tool to create marketing artwork 'in the exact style of' a famous living illustrator whose work the client recognizes, intending to use it in a paid ad campaign.",
    question: "What is the main concern the designer should consider before using this image commercially?",
    options: [
      "The image might load slowly on the client's website",
      "Deliberately mimicking a specific living artist's recognizable style for commercial use raises copyright and attribution concerns worth addressing before use",
      "There is no concern, since AI-generated images can never resemble any existing artist's work",
      "The only concern is whether the client will notice the image was AI-generated"
    ],
    correct: 1,
    explanation: "Intentionally generating content 'in the style of' an identifiable working artist for commercial use raises real IP and ethical concerns, and the designer should evaluate originality and consider alternatives or licensing (B). Claiming this can never happen (C) is false, load speed (A) is unrelated, and whether the client 'notices' (D) misses the actual issue, which is about rights and attribution, not detection."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A loan officer at a credit union uses an AI tool to generate a recommended approve/deny decision for mortgage applications. To save time, the officer has started auto-approving whatever the AI recommends without reviewing the applicant's file.",
    question: "What is wrong with this practice?",
    options: [
      "Nothing is wrong, since AI recommendations are typically more accurate than human judgment on financial matters",
      "Lending decisions are consequential and can carry fairness and legal implications, so they require meaningful human review rather than automatic approval of AI output",
      "The only problem is that the process is now faster than before, which could seem suspicious to regulators",
      "The officer should stop using AI for any part of the process, including drafting summaries of applications"
    ],
    correct: 1,
    explanation: "Lending decisions directly affect people's financial lives and carry fairness and compliance obligations, so they need genuine human judgment rather than rubber-stamping AI output (B). Treating AI recommendations as infallible (A) is an over-trust failure, speed alone isn't the core issue (C), and banning all AI assistance, including lower-stakes tasks like summarizing (D), is an unnecessary overcorrection."
  },
  {
    domain: 6,
    difficulty: 1,
    scenario: "An office manager wants to use AI to help write a friendly reminder email about the company's holiday party. The email will include the party date, location, and a request to RSVP.",
    question: "Is this an appropriate use of a general consumer AI tool?",
    options: [
      "Yes, this is low-risk, generic content with no sensitive personal or confidential business information involved",
      "No, all internal company communications must never involve AI in any way",
      "No, because the email mentions a location, which is always considered confidential",
      "Yes, but only if the office manager first gets written approval from legal counsel"
    ],
    correct: 0,
    explanation: "A generic event reminder with no sensitive data is a low-risk, appropriate use of a general AI tool (A). Blanket bans on any internal communication (B) are an unnecessary overcorrection, a party location isn't inherently confidential (C), and requiring legal sign-off for routine, low-stakes content (D) is excessive caution that doesn't match the actual risk level."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A nonprofit's grant writer uses AI to help draft a funding proposal. The organization's AI use policy states that all externally submitted documents using AI assistance must be reviewed by a second staff member before submission. The grant writer is confident in the draft and submits it directly to save time.",
    question: "What did the grant writer do wrong?",
    options: [
      "Nothing — confidence in the draft's quality is a reasonable substitute for the review requirement",
      "The grant writer should not have used AI at all for a funding proposal",
      "The grant writer bypassed the organization's documented AI use policy by skipping the required second review",
      "The grant writer should have disclosed AI use to the funder instead of getting internal review"
    ],
    correct: 2,
    explanation: "Regardless of personal confidence in draft quality, skipping a documented organizational policy requirement — the second-person review — is a clear policy violation (C). Confidence isn't a valid substitute for a defined process (A), using AI to draft isn't inherently prohibited (B), and the missing step was internal review, not funder disclosure (D), which is a separate question the policy doesn't address here."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A high school teacher uses AI to help generate individualized feedback comments on student essays, then reads each comment and adjusts it before entering it into the gradebook.",
    question: "Which best describes this use of AI?",
    options: [
      "Irresponsible, because any AI involvement in grading is never appropriate under any circumstances",
      "Responsible, because the teacher maintains meaningful human review and judgment over the final feedback rather than delegating grading itself to AI",
      "Irresponsible, because students must be informed in writing before any teacher uses AI for any purpose",
      "Responsible, but only if the school has no AI use policy at all"
    ],
    correct: 1,
    explanation: "The teacher is using AI as a drafting aid while retaining human judgment and final say over each student's feedback, which is a reasonable and responsible pattern (B). A blanket ban (A) overstates the risk of assisted drafting, a universal written-disclosure requirement (C) isn't a standard norm for this kind of low-stakes assistance, and the presence or absence of a school policy (D) doesn't itself determine responsibility."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A hospital administrative assistant is asked to use AI to help summarize patient intake notes that include diagnoses and treatment histories, using a general consumer AI tool because the hospital's approved system is temporarily down.",
    question: "What should the assistant do?",
    options: [
      "Proceed with the general consumer tool since the deadline is urgent and the outage is temporary",
      "Wait until the approved, compliant system is available, or use another sanctioned option, rather than putting protected health information into a general tool",
      "Remove only the patient's name before pasting the notes into the general tool, since that makes the data anonymous enough",
      "Ask a colleague at another hospital to run the summary through their system instead"
    ],
    correct: 1,
    explanation: "Protected health information carries strict regulatory handling requirements, and a temporary outage of the approved system doesn't justify moving that data into an unsanctioned general tool (B). Urgency doesn't override the risk (A), removing just a name doesn't fully de-identify detailed clinical notes since other details can still identify a patient (C), and sending data to an external, unauthorized party (D) introduces a new privacy violation."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "An event planner uses AI to brainstorm a list of creative theme ideas for a corporate holiday party. No client data or confidential details are entered — just general prompts like 'suggest winter party themes for 150 guests.'",
    question: "What is the appropriate assessment of this use case?",
    options: [
      "This is inappropriate because event planning should never involve AI assistance",
      "This is a low-risk, appropriate use since no sensitive or confidential information is involved",
      "This is inappropriate unless the planner discloses AI use to every guest at the party",
      "This is appropriate only if performed on an approved enterprise tool, even though no sensitive data is involved"
    ],
    correct: 1,
    explanation: "Generic brainstorming with no sensitive or confidential inputs is a textbook low-risk, appropriate use of a general AI tool (B). There's no reason to ban this use case (A), disclosure to guests about internal brainstorming isn't a real norm (C), and requiring an enterprise tool for non-sensitive brainstorming (D) is unnecessary caution that doesn't match the actual risk."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A performance review season is underway. A department head has AI draft summary ratings for each employee based on short notes, then submits those ratings to HR without adding their own assessment or meeting with any employees.",
    question: "What is the core issue here?",
    options: [
      "AI-assisted drafting of performance review language is inherently prohibited in any context",
      "A consequential decision affecting employees' careers is being finalized without meaningful human judgment or input, relying entirely on an AI-generated draft",
      "The department head should have used a longer prompt to get better quality ratings",
      "There is no issue as long as the notes given to the AI were accurate"
    ],
    correct: 1,
    explanation: "Performance ratings materially affect careers and compensation, so they need genuine human evaluation, context, and conversation — not just AI-drafted output submitted as final (B). Using AI to help draft language isn't inherently wrong (A), a longer prompt doesn't fix the lack of human judgment (C), and accurate input notes don't address the missing review step (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A small business owner reads that their industry association recommends never using AI for any task, including proofreading public-facing marketing flyers that contain no confidential information.",
    question: "How should the owner think about this recommendation?",
    options: [
      "Follow it literally in all cases, since any AI use carries the same level of risk",
      "Recognize that blanket bans on low-risk uses like proofreading generic public content don't meaningfully reduce real risk, and evaluate case by case",
      "Ignore all organizational guidance and use AI however is most convenient",
      "Only follow the recommendation if a lawyer confirms it in writing"
    ],
    correct: 1,
    explanation: "Not all AI use carries equal risk — proofreading a public flyer with no sensitive data is very different from handling confidential data, and treating them identically is an over-restriction that doesn't track actual risk (B). Blindly following a blanket ban regardless of context (A) is the over-restriction failure mode, ignoring guidance altogether (C) swings too far the other way, and requiring legal sign-off for a routine proofreading task (D) is excessive."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A real estate agent uses AI to write property listing descriptions. For one listing, the AI's description of the home's square footage doesn't match the actual appraisal document.",
    question: "What should the agent do before publishing the listing?",
    options: [
      "Publish it as-is, since AI-generated content is generally accurate enough for marketing purposes",
      "Verify and correct the square footage against the appraisal document before publishing, since factual errors in listings can have legal and financial consequences",
      "Remove the square footage from the listing entirely so the discrepancy can't be noticed",
      "Publish it and only fix it if a buyer later complains"
    ],
    correct: 1,
    explanation: "Factual details like square footage can carry legal and financial weight in real estate transactions, so the agent must verify AI-generated content against a reliable source before publishing (B). Trusting the AI output without checking (A) is an over-trust failure, quietly omitting the figure (C) doesn't resolve the inaccuracy and could look evasive, and waiting for a complaint (D) risks real harm and liability."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A university admissions office is considering using an AI tool to generate a numeric 'likely success' score for each applicant that would be the sole factor determining acceptance, without any human reading the applications.",
    question: "What is the primary concern with this plan?",
    options: [
      "Using AI to help organize application materials is never acceptable in admissions",
      "A high-stakes, consequential decision about applicants' futures would be fully delegated to AI output with no meaningful human review",
      "The score would take too long for the AI to calculate for a large applicant pool",
      "There is no concern, since standardized scoring removes human bias entirely"
    ],
    correct: 1,
    explanation: "Admissions decisions are highly consequential for applicants, and fully automating them without human review removes essential judgment and accountability, and risks embedding bias undetected (B). Using AI to assist with organizing or summarizing materials isn't inherently wrong (A), processing speed isn't the core issue (C), and assuming an AI score is automatically unbiased (D) ignores well-documented fairness risks in automated scoring."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A project manager wants to use AI to turn a set of internal meeting notes into a clean summary for the team, then plans to send that summary to the same internal team that attended the meeting.",
    question: "What is the appropriate approach to data handling here?",
    options: [
      "This still requires special written consent from every meeting attendee before using AI",
      "As long as the company's AI use policy permits using AI on internal, non-confidential meeting content, this is a reasonable use case",
      "This should never be done because meeting notes always contain trade secrets",
      "The manager should first strip out all names of anyone who spoke in the meeting"
    ],
    correct: 1,
    explanation: "Summarizing internal notes for the same internal team, when consistent with company policy, is a routine and reasonable use case (B). This doesn't typically require special consent for basic internal work product (A), meeting notes aren't automatically trade secrets (C), and stripping all speaker names isn't a general requirement for internal summaries with no other sensitive content (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A law firm's paralegal uses AI to draft a first pass of a client contract, then an attorney reviews, revises, and takes professional responsibility for the final version before it's sent to the client.",
    question: "Does this workflow raise a governance concern?",
    options: [
      "Yes, because any legal document touched by AI is automatically invalid",
      "No, this reflects an appropriate pattern where AI assists with drafting but a qualified human retains final review and professional responsibility",
      "Yes, because the client must be informed and must approve of AI use before any drafting begins",
      "No, because legal work is never consequential enough to require human review"
    ],
    correct: 1,
    explanation: "Using AI as a drafting aid while a licensed attorney reviews, revises, and takes professional accountability for the final contract is a sound and common practice (B). Legal documents aren't automatically invalidated by AI-assisted drafting (A), while some firms may disclose AI use as a courtesy or per client agreement, it's not a universal precondition to begin drafting (C), and legal work is in fact often highly consequential, which is exactly why human review matters (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A retail chain's regional manager drafts a company-wide memo about a new return policy using AI, then has it reviewed and approved by the legal and operations teams before distribution.",
    question: "Should the memo explicitly state that AI was used to draft it?",
    options: [
      "Yes, every internal memo touched by AI legally requires a disclosure statement",
      "Not necessarily — since it went through normal review and approval and the content itself doesn't misrepresent its origin, explicit disclosure isn't generally required for routine internal drafting",
      "No, and the manager should also avoid telling the legal and operations teams that AI was used",
      "Yes, but only if the memo is longer than one page"
    ],
    correct: 1,
    explanation: "For routine internal communications drafted with AI assistance and properly reviewed, explicit disclosure isn't typically a governance requirement, since the content is vetted through normal channels (B). There's no blanket legal disclosure mandate for internal memos (A), hiding AI use from reviewers (C) is unnecessary and could undermine trust or violate internal policy, and document length isn't a relevant factor (D)."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A company's AI use policy allows AI-assisted drafting of external client proposals but requires that any proposal referencing specific financial projections be reviewed by the finance team before sending. A salesperson uses AI to draft a proposal, and the AI includes a plausible-sounding revenue projection that the salesperson didn't provide as input and doesn't verify before sending it to the client.",
    question: "What multiple failures occurred here?",
    options: [
      "Only one failure occurred: the salesperson should have written the proposal without AI assistance",
      "The salesperson both skipped the required finance review for financial projections and failed to verify a fabricated-looking figure the AI introduced on its own",
      "No real failure occurred, since AI tools are reliable enough that fabricated figures are extremely rare",
      "The only failure was a formatting issue in the AI-generated proposal"
    ],
    correct: 1,
    explanation: "This case combines an over-trust failure (accepting an unverified, possibly fabricated projection) with a direct policy violation (skipping the mandatory finance review for financial claims) (B). AI drafting itself isn't the problem (A), assuming AI-generated numbers are inherently trustworthy (C) is exactly the risk this domain warns against, and this is a substantive accuracy and compliance issue, not a formatting one (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A customer support team lead sees a new AI-generated response template that closely mirrors, almost word-for-word, a competitor's published help-center article the AI must have been trained on or referenced.",
    question: "What should the team lead do before rolling out this template?",
    options: [
      "Use it as-is, since AI-generated text can never resemble another company's published material",
      "Revise the template so it reflects the company's own voice and isn't a close reproduction of another organization's specific published content",
      "Publish it immediately, since help-center articles are never protected by any ownership considerations",
      "Add a footnote citing the competitor and publish it unchanged"
    ],
    correct: 1,
    explanation: "Noticing that AI output closely mirrors another organization's specific published content is a signal to revise for originality rather than publish as-is, since close reproduction raises IP concerns (B). Assuming this can't happen (A) is false, treating help content as unprotected (C) is incorrect, and merely citing the source while keeping the near-identical text (D) doesn't resolve the underlying reproduction issue in a commercial template."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A company rolls out a strict policy banning all employees from using AI tools for any purpose, including basic tasks like fixing typos in already-public marketing copy, citing 'AI risk' as the reason.",
    question: "What is the most accurate critique of this policy?",
    options: [
      "The policy is ideal because eliminating all AI use is always the safest option in every situation",
      "The policy over-restricts by treating low-risk tasks the same as high-risk ones, which doesn't meaningfully reduce real risk and may push employees toward using unsanctioned tools anyway",
      "The policy has no downsides since employees will simply work more slowly, which is always safer",
      "The policy is only a problem if it also bans AI use in personal, non-work contexts"
    ],
    correct: 1,
    explanation: "Blanket bans that don't distinguish between low-risk and high-risk tasks are a classic over-restriction failure — they don't target actual risk and can push employees toward shadow use of ungoverned tools (B). Treating maximal restriction as inherently safest (A) ignores this dynamic, slower work isn't automatically safer or risk-free (C), and the policy's scope on personal use (D) is a separate, unrelated question."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A nonprofit's communications director publishes a fundraising appeal letter that was almost entirely written by AI with minimal human editing, and signs it under the executive director's name as though the executive director personally wrote every word and story shared.",
    question: "What is the concern with this approach?",
    options: [
      "There is no concern, since fundraising letters are never scrutinized for authenticity",
      "Presenting AI-drafted content as the executive director's personal, first-hand account raises authenticity and disclosure concerns, especially if it implies personal experiences that weren't verified",
      "The only concern is that AI-written letters are always worse at raising donations",
      "The concern is limited to grammar quality, which AI tools generally handle well"
    ],
    correct: 1,
    explanation: "When content implies personal, first-hand experience or voice, using largely unedited AI drafting without verification and attribution transparency raises authenticity concerns that donors would reasonably care about (B). This isn't a non-issue (A), fundraising performance isn't the core governance concern here (C), and the issue is about authenticity and disclosure, not grammar (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "An operations analyst wants to use AI to reformat a public government dataset into a cleaner table for an internal report. The dataset contains no personal or confidential information and is already publicly available online.",
    question: "Is this an appropriate use of a general AI tool?",
    options: [
      "Yes, since the data is public and non-sensitive, this is a low-risk use case",
      "No, all data, public or not, must go through an approved enterprise tool",
      "No, because reformatting data is a task AI should never assist with",
      "Yes, but only with prior written approval from senior leadership"
    ],
    correct: 0,
    explanation: "Reformatting already-public, non-sensitive data is a low-risk task well suited to a general AI tool (A). Requiring an enterprise tool for public data with no sensitivity (B) is unnecessary over-restriction, AI is commonly and appropriately used for this kind of reformatting task (C), and requiring leadership approval for routine, low-risk work (D) is excessive."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A city government's parks department is deciding whether to let AI auto-generate and send final approval or denial letters for park event permits without any staff reviewing the letters individually, to speed up a large backlog.",
    question: "What is the biggest risk of this plan?",
    options: [
      "Applicants might receive their letters too quickly",
      "Permit decisions can have legal and public accountability implications, and skipping human review of individual determinations removes an important safeguard against errors or unfair outcomes",
      "AI-written letters will always use worse grammar than staff-written ones",
      "There is no risk since permit letters are considered low-stakes government correspondence"
    ],
    correct: 1,
    explanation: "Permit decisions can affect who is allowed to hold public events and carry legal and accountability weight, so removing human review from individual determinations risks errors and unfair outcomes going unnoticed (B). Speed itself isn't the risk (A), AI grammar quality isn't the concern (C), and government determinations affecting public access aren't inherently low-stakes (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A financial services firm's compliance team publishes clear guidance: client account numbers, balances, and social security numbers may never be entered into any AI tool, sanctioned or not, under any circumstances, while general questions about financial regulations may be researched using the sanctioned enterprise AI tool.",
    question: "What best characterizes this policy?",
    options: [
      "It is overly restrictive because it treats all AI-related tasks identically",
      "It is a reasonable, risk-based policy that restricts the most sensitive data categories while still allowing lower-risk research tasks",
      "It is inadequate because it should also ban using AI for general regulatory research",
      "It is meaningless because sanctioned tools already prevent all possible data risks automatically"
    ],
    correct: 1,
    explanation: "This policy calibrates restriction to risk: it prohibits AI use for the most sensitive identifiers while permitting a lower-risk research task on an approved tool, which reflects good risk-based governance (B). It doesn't treat all tasks identically (A), banning general regulatory research would be an unnecessary overcorrection (C), and no tool, sanctioned or not, eliminates all risk automatically, which is exactly why the policy still restricts certain data (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A recruiter uses AI to help write an outreach message inviting a passive candidate to consider an open role, using only the candidate's publicly listed job title and industry, no personal contact details or private information.",
    question: "How should this use case be assessed?",
    options: [
      "This is appropriate since it relies on generic, publicly available professional information rather than sensitive personal data",
      "This is inappropriate because recruiting messages should never be AI-assisted",
      "This is inappropriate because the recruiter must disclose AI use directly within the outreach message",
      "This is appropriate only if the recruiter uses the enterprise tool, even though no sensitive data is involved"
    ],
    correct: 0,
    explanation: "Using generic, already-public professional details for outreach drafting is a low-risk, reasonable use case (A). AI-assisted recruiting outreach isn't inherently problematic (B), disclosing AI use within a cold outreach message isn't a standard requirement for this kind of task (C), and requiring the enterprise tool for non-sensitive drafting (D) is excessive given the actual risk."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A mid-size company's leadership uses AI to analyze anonymized employee survey data and generate a report recommending which departments should be restructured, then acts on the recommendations without further analysis, discussion, or considering context the AI didn't have access to.",
    question: "What is the biggest concern with this decision-making process?",
    options: [
      "The AI-generated report might use an unappealing font in its formatting",
      "A consequential organizational decision affecting people's jobs is being acted on directly from AI output without human deliberation or consideration of context the AI lacked",
      "There is no concern since the underlying survey data was anonymized",
      "The concern is limited to the time it took to generate the report"
    ],
    correct: 1,
    explanation: "Restructuring decisions significantly affect employees' livelihoods, and acting directly on AI output without deliberation or added context is an over-trust failure regardless of how the input data was handled (B). Formatting is irrelevant (A), anonymizing the input data doesn't address the separate issue of skipping human judgment on the output (C), and time-to-produce isn't the core issue (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A product marketing manager asks AI to write ad copy that intentionally reuses a well-known, trademarked tagline from a major competing brand, slightly reworded, for a new campaign.",
    question: "What should the manager do?",
    options: [
      "Proceed with the campaign since slightly reworded taglines are always considered original",
      "Avoid using content that closely echoes another brand's trademarked tagline, and ask AI to generate genuinely original alternatives instead",
      "Proceed but only run the ad in regions where the competitor doesn't operate",
      "Proceed since AI-generated text is automatically free of any trademark issues"
    ],
    correct: 1,
    explanation: "Deliberately echoing a competitor's trademarked tagline, even reworded, raises real trademark and originality concerns that should be avoided by seeking genuinely original copy (B). Slight rewording doesn't guarantee originality or legal safety (A), limiting geography doesn't resolve trademark risk in the regions where the ad does run (C), and AI-generated text carries no automatic exemption from trademark law (D)."
  },
  {
    domain: 6,
    difficulty: 1,
    scenario: "A customer support representative wants to use AI to check the spelling and tone of a reply about a shipping delay, using only the generic complaint text with no order numbers, names, or account details included.",
    question: "Is this an appropriate use of a general AI tool?",
    options: [
      "Yes, this is a low-risk editing task involving no sensitive customer data",
      "No, all customer support communication must avoid AI in every case",
      "No, because tone-checking always requires special managerial approval",
      "Yes, but only if the representative first anonymizes the word 'shipping'"
    ],
    correct: 0,
    explanation: "Checking spelling and tone on generic text with no identifying customer details is a straightforward, low-risk use of a general AI tool (A). A blanket ban on any AI use in support work (B) is excessive, routine tone-checking doesn't typically require special approval (C), and there's nothing sensitive about the word 'shipping' that needs removal (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A construction company's safety officer wants AI to review incident reports and generate a recommended root-cause finding and corrective action plan after a workplace injury, planning to file it as the official investigation outcome without further review by a safety professional.",
    question: "What is the main problem here?",
    options: [
      "There is no problem, since AI can process incident details faster than any human investigator",
      "A safety-critical investigation with legal and human-safety implications is being finalized based on AI output without meaningful review by a qualified safety professional",
      "The only problem is the extra time it takes to generate the AI report",
      "The problem is that incident reports are too short for AI to analyze meaningfully"
    ],
    correct: 1,
    explanation: "Workplace injury investigations can have serious legal, regulatory, and human-safety consequences, so finalizing findings without a qualified professional's review is a significant over-trust failure (B). Processing speed doesn't address that risk (A), time spent isn't the concern (C), and report length isn't a barrier to meaningful analysis or the actual issue at hand (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A small marketing agency's new employee handbook says 'AI use is allowed for internal brainstorming and drafting, but any content shared externally with clients must be reviewed by a supervisor before sending.' An account executive uses AI to draft a client-facing proposal and sends it directly to the client without supervisor review, believing the draft was already 'good enough.'",
    question: "What is the correct assessment of this situation?",
    options: [
      "This is acceptable because the account executive is experienced enough to judge quality without a supervisor",
      "This is a policy violation, since the handbook explicitly requires supervisor review of external content regardless of the sender's confidence in its quality",
      "This is acceptable because the handbook only applies to written proposals over a certain length",
      "This is a policy violation only if the client notices AI was used"
    ],
    correct: 1,
    explanation: "The handbook sets a clear rule requiring supervisor review before sending external content, and personal confidence in quality doesn't substitute for that required step (B). Experience doesn't override an explicit policy requirement (A), the handbook doesn't mention any length exception (C), and the violation is about skipping the review step itself, not about whether the client detects AI involvement (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A church administrative volunteer wants to use AI to help draft a newsletter summarizing upcoming community events, using only information that's already been announced publicly during services.",
    question: "What is the appropriate way to think about this use case?",
    options: [
      "This is a low-risk, appropriate use since the source information is already public and non-sensitive",
      "This should never be done because religious organizations must avoid all AI tools",
      "This requires written sign-off from every congregation member before proceeding",
      "This is appropriate only if the volunteer uses a specialized enterprise AI tool"
    ],
    correct: 0,
    explanation: "Drafting a newsletter from already publicly announced, non-sensitive information is a low-risk, ordinary use case for a general AI tool (A). There's no general prohibition on AI use in religious or community organizations (B), requiring universal member sign-off for a routine newsletter (C) is excessive, and an enterprise tool isn't necessary when no sensitive data is involved (D)."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A multinational company operates in several countries with different data protection laws. A regional HR director in one country wants to paste employee salary and health-benefit enrollment data into a general consumer AI tool to generate a summary report, reasoning that 'AI companies are based elsewhere so local law doesn't apply.'",
    question: "What is wrong with this reasoning?",
    options: [
      "Nothing is wrong; data protection laws only apply within the borders of the country where a company is headquartered",
      "The reasoning is flawed: sensitive employee data such as salary and health information generally requires careful handling regardless of where a tool's provider is based, and a general consumer tool is not designed for this kind of regulated data",
      "The reasoning is flawed only because AI tools cannot process spreadsheets with numeric data",
      "The reasoning is correct as long as the report itself is never shared outside the company"
    ],
    correct: 1,
    explanation: "Data protection obligations typically follow the data subject and the handling organization, not simply where a tool vendor happens to be based, and sensitive salary and health data calls for an approved, appropriately governed system rather than a general consumer tool (B). The 'law doesn't apply elsewhere' reasoning is incorrect (A), AI tools can in fact process numeric spreadsheet data (C), and internal-only distribution doesn't eliminate the underlying data handling risk of using an unsanctioned tool (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A university research assistant uses AI to help paraphrase sections of a literature review for a manuscript, closely following the structure and specific findings of a handful of published papers without adding original citation or attribution.",
    question: "What is the main concern with this approach?",
    options: [
      "There is no concern since paraphrasing by definition can never resemble the original enough to matter",
      "Closely following existing published work's structure and findings without proper citation raises both academic integrity and IP attribution concerns",
      "The concern is only that AI paraphrasing tools are slower than manual paraphrasing",
      "The concern applies only if the original papers were published more than ten years ago"
    ],
    correct: 1,
    explanation: "Even paraphrased content that closely tracks another work's structure and findings needs proper citation; skipping attribution raises academic integrity and IP concerns regardless of AI involvement (B). Paraphrasing doesn't automatically eliminate similarity concerns (A), speed isn't the relevant issue (C), and publication age doesn't change the need for proper attribution (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A retail store manager uses AI to draft a weekly staff schedule based on availability the team submitted through a shared spreadsheet containing only first names and available shift times, no other personal information.",
    question: "How should this use case be evaluated?",
    options: [
      "This is a low-risk use, since the information involved is minimal and limited to scheduling logistics",
      "This is inappropriate because employee names should never appear in any AI tool under any circumstances",
      "This is inappropriate because scheduling decisions always require legal department review",
      "This is appropriate only if every employee individually approves the specific AI tool being used"
    ],
    correct: 0,
    explanation: "First names and shift availability for routine scheduling is a low-sensitivity use case appropriate for a general AI tool (A). Employee first names alone aren't so sensitive that they can never be used (B), routine scheduling doesn't need legal review (C), and requiring individual sign-off from every employee for ordinary scheduling work (D) is excessive relative to the actual risk."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A company's leadership wants to use AI to analyze employee emails and flag which employees seem 'disengaged' based on tone and word choice, then use that flag as a factor in upcoming layoff decisions, without informing employees this analysis is happening.",
    question: "What are the two biggest concerns here?",
    options: [
      "There are no real concerns, since analyzing writing tone is a purely technical, neutral process",
      "Using an opaque, potentially unreliable AI-driven inference about 'disengagement' as a factor in a consequential decision like layoffs raises fairness concerns, and doing so covertly without any transparency compounds the risk",
      "The only concern is that email analysis tools are historically inaccurate at detecting spam",
      "The only concern is that this process might take too long to complete before the layoffs are announced"
    ],
    correct: 1,
    explanation: "Inferring something as subjective as 'disengagement' from tone and using it in a high-stakes decision like layoffs risks unfair or inaccurate outcomes, and doing this without any transparency to affected employees compounds the ethical and trust problem (B). Tone analysis isn't neutral or risk-free just because it's automated (A), spam detection accuracy is irrelevant (C), and processing time isn't the substantive concern (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A consulting firm's client-facing deliverable includes several charts and analysis that were AI-generated based on the consultant's own proprietary framework and data the consultant provided. The final deck is reviewed, edited, and approved by a senior partner before delivery.",
    question: "What is the appropriate disclosure practice for this deliverable?",
    options: [
      "The firm should avoid ever telling the client that any part of the process involved AI, even if directly asked",
      "Whether to proactively disclose AI involvement is a reasonable judgment call informed by client expectations and any contractual terms, but if asked directly, the firm should answer honestly",
      "The deck must include a full log of every AI prompt used during development",
      "Disclosure is required only if the deck contains more than fifty pages"
    ],
    correct: 1,
    explanation: "For professional deliverables, whether to proactively volunteer AI involvement often depends on context, client relationship, and any contract terms, but honesty when directly asked is a baseline norm regardless of that judgment call (B). Refusing to answer honestly if asked directly (A) crosses an integrity line, requiring a full prompt log (C) is excessive and not standard practice, and page count is not a meaningful disclosure threshold (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A logistics coordinator wants to use AI to translate a public shipping status update into three languages for customers, using only the generic status text with no customer names or tracking numbers included.",
    question: "Is this a reasonable use of a general AI tool?",
    options: [
      "Yes, this is a low-risk translation task with no sensitive data involved",
      "No, translation tasks should never be trusted to AI under any circumstances",
      "No, because translated content always requires a certified human translator by law",
      "Yes, but only for languages with fewer than one million speakers"
    ],
    correct: 0,
    explanation: "Translating generic, non-sensitive status text is a low-risk, common, and appropriate use of AI (A). AI translation is widely and reasonably used for this kind of task (B), certified human translators are typically required only in specific legal or official contexts, not for a general customer update (C), and there's no such limitation based on the number of speakers of a language (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A property management company uses AI to help screen prospective tenants by analyzing rental applications and generating a recommendation, then a leasing agent reviews each AI recommendation, checks it against the same criteria applied to every applicant, and makes the final call while documenting their reasoning.",
    question: "How should this workflow be assessed?",
    options: [
      "This is problematic because any AI involvement in tenant screening is automatically illegal everywhere",
      "This reflects a reasonable pattern: AI assists with a first pass, but a human applies consistent criteria, exercises independent judgment, and documents the final consequential decision",
      "This is problematic because the leasing agent should rely solely on the AI recommendation to save time",
      "This is acceptable only if the AI recommendation is kept completely hidden from the leasing agent"
    ],
    correct: 1,
    explanation: "Using AI as a first-pass aid while a human applies consistent criteria, exercises real judgment, and documents reasoning for a consequential housing decision is a responsible pattern that supports both fairness and accountability (B). Blanket illegality claims (A) are inaccurate and vary by jurisdiction and practice, relying solely on the AI output (C) is the over-trust failure this workflow is specifically avoiding, and hiding the recommendation from the agent (D) isn't necessary or standard practice."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A book publisher's junior editor uses AI to generate several possible chapter titles 'in the tone of' a bestselling author whose work is not connected to this project at all, purely as creative inspiration, then writes entirely original titles herself without copying any of the AI's suggestions.",
    question: "How should this specific use case be assessed?",
    options: [
      "This is problematic regardless of outcome, since even brainstorming in another author's tone is always a copyright violation",
      "This is a reasonable use of AI for inspiration, since the final published titles are original work created by the editor rather than reused AI output styled after another author",
      "This is problematic because brainstorming must never reference any existing author's tone or style",
      "This is reasonable only if the bestselling author is contacted for permission before any brainstorming occurs"
    ],
    correct: 1,
    explanation: "Using AI output purely as private inspiration, while ensuring the actual published work is original and not a reproduction of another author's style, is a reasonable and common creative practice (B). Brainstorming in a private, non-published context isn't itself a copyright violation (A) or something that requires avoiding all stylistic reference (C), and permission isn't required for informal internal brainstorming that never gets published (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A call center supervisor is told that all client account details must stay within the company's approved enterprise AI platform, but a general consumer AI tool has a much better summarization feature. Believing the feature difference is worth it, the supervisor starts a habit of pasting anonymized-looking call transcripts into the consumer tool.",
    question: "What is the risk in the supervisor's reasoning?",
    options: [
      "There is no risk since the transcripts were described as 'anonymized-looking'",
      "Call transcripts often contain indirect identifying details even after a quick anonymization attempt, and bypassing the approved platform for a feature preference undermines the organization's data handling policy",
      "The risk is limited to the consumer tool being slower than the enterprise platform",
      "The risk only applies if the supervisor discusses this decision with colleagues"
    ],
    correct: 1,
    explanation: "Ad hoc, 'looks anonymized' transcripts can still contain names, account references, or other identifying details, and choosing a feature preference over a clear policy requirement to use the approved platform is a data handling violation (B). Assuming it's automatically safe (A) is risky, speed isn't the concern (C), and whether colleagues know about the decision (D) doesn't change the underlying policy violation."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A volunteer coordinator at a nonprofit wants to use AI to draft thank-you messages for donors, using only donor first names and general donation amount ranges (e.g., '$100-250') rather than exact figures or full account details.",
    question: "What is the appropriate assessment?",
    options: [
      "This is a reasonably low-risk use, as long as it aligns with the nonprofit's data handling practices and doesn't include more sensitive donor details",
      "This is inappropriate because any mention of donation amounts is always highly sensitive regardless of specificity",
      "This is inappropriate because nonprofit organizations must never use AI tools",
      "This is appropriate only with a signed waiver from each donor"
    ],
    correct: 0,
    explanation: "Using minimal identifying information and general ranges for routine donor communication is a reasonably low-risk approach, provided it fits the organization's broader data practices (A). Donation ranges alone aren't automatically highly sensitive (B), nonprofits aren't barred from AI use (C), and a signed waiver isn't a standard requirement for this kind of low-risk task (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A pharmaceutical sales rep asks AI to draft talking points about a drug's off-label uses for an upcoming physician meeting, based on the rep's own understanding of some informal, unverified claims about efficacy.",
    question: "What should the rep do before using these talking points?",
    options: [
      "Use them as-is since AI-generated medical content is automatically vetted for accuracy",
      "Have the talking points reviewed and verified by qualified medical/regulatory affairs staff before use, since inaccurate or unapproved claims about drug uses carry serious compliance and patient-safety risk",
      "Skip verification since physicians are trained to independently fact-check anything a rep tells them",
      "Only remove the word 'off-label' from the talking points and proceed"
    ],
    correct: 1,
    explanation: "Pharmaceutical claims, especially about off-label use, are subject to strict regulatory requirements and carry patient-safety implications, so qualified review before use is essential rather than optional (B). AI output isn't automatically medically vetted (A), relying on physicians to catch inaccuracies doesn't excuse a rep from providing accurate, compliant information (C), and removing a single word doesn't address the underlying unverified claims (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A social media manager for a local restaurant uses AI to generate a caption for a food photo, then posts it without indicating anywhere that AI was involved. The caption doesn't make any factual claims and is purely stylistic.",
    question: "Is disclosure necessary in this situation?",
    options: [
      "Yes, every single social media caption generated with any AI assistance requires an explicit disclosure tag",
      "Generally no — for low-stakes, purely stylistic content with no factual claims or impersonation involved, explicit disclosure isn't typically necessary",
      "Yes, but only because food-related content is legally regulated",
      "No, but only if the restaurant deletes the caption within 24 hours"
    ],
    correct: 1,
    explanation: "For low-stakes creative content with no factual claims, misrepresentation, or impersonation at stake, explicit AI disclosure isn't generally required or expected (B). A universal tagging requirement for every caption (A) is excessive, food content isn't specially regulated in this way (C), and a deletion timeline is irrelevant to whether disclosure was needed at the time of posting (D)."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A city's public health department wants to use AI to draft public guidance about a fast-moving health situation. Leadership is split: one group wants to publish whatever AI drafts immediately to move fast, another wants to ban AI from the process entirely due to 'liability concerns,' even for administrative tasks like formatting.",
    question: "What is the most balanced approach?",
    options: [
      "Adopt the 'publish immediately' approach, since speed is the top priority during a fast-moving health situation",
      "Adopt the full ban, since any error in public health guidance is unacceptable regardless of the task involved",
      "Use AI to assist with drafting and formatting, but require qualified public health staff to review, verify, and approve substantive guidance content before it is published, calibrating oversight to the task's risk",
      "Alternate between the two approaches randomly to balance out the risks over time"
    ],
    correct: 2,
    explanation: "The balanced, risk-calibrated approach uses AI for lower-risk tasks like drafting and formatting while requiring qualified human review and approval of substantive public health content before release, matching oversight to consequence (C). Publishing unreviewed AI drafts on health guidance (A) is a serious over-trust risk, banning AI even from low-risk administrative tasks (B) is an unnecessary overcorrection, and alternating randomly (D) isn't a coherent or defensible governance approach."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A talent agency uses AI to help draft standard email replies to actors' agents about audition logistics — dates, times, and locations — using information that's already been finalized and shared in a group email thread.",
    question: "How should this use case be categorized?",
    options: [
      "Low risk, since the information is administrative, already shared with the relevant parties, and non-sensitive",
      "High risk, because anything related to entertainment industry casting is automatically confidential",
      "High risk, because email drafting should never be automated in any professional context",
      "Low risk, but only if the agency first obtains signed consent from every actor involved"
    ],
    correct: 0,
    explanation: "Drafting routine logistics emails using already-shared, non-sensitive scheduling information is a low-risk, appropriate use case (A). Casting logistics aren't automatically confidential just because they're in entertainment (B), routine email drafting is a common and reasonable AI use case (C), and signed consent isn't a standard requirement for this kind of low-risk administrative task (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A bank's fraud investigation unit uses AI to flag transactions as 'likely fraudulent' and automatically freezes the associated customer accounts without any human confirming the flag before the freeze takes effect, in order to respond as fast as possible.",
    question: "What is the concern with this design?",
    options: [
      "There is no concern, since fast fraud response is always worth any trade-off",
      "Automatically freezing customer accounts based solely on an AI flag, with no human confirmation before action, risks harming legitimate customers through false positives with no safeguard before real-world impact occurs",
      "The concern is only that AI fraud detection is always less accurate than manual review",
      "The concern is limited to the extra computing resources required to run the fraud detection system"
    ],
    correct: 1,
    explanation: "Freezing a customer's account is a real, immediate consequence, so acting on an AI flag with no human confirmation risks harming legitimate customers caught in false positives, with no check before the impact lands (B). Speed doesn't justify skipping this safeguard entirely (A), the concern isn't a blanket accuracy claim about AI versus manual review (C), and computing resources aren't the substantive issue (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "An insurance agency's front-desk staff want to use AI to draft a general FAQ document about office hours and how to schedule an appointment, containing no client-specific or policy-specific information.",
    question: "What is the appropriate assessment of this task?",
    options: [
      "Low risk, appropriate for a general AI tool since it involves only generic, non-sensitive office information",
      "High risk, because insurance-related content of any kind must never touch AI tools",
      "High risk, because FAQ documents require several rounds of legal review before any drafting begins",
      "Low risk, but only if the document is under 100 words"
    ],
    correct: 0,
    explanation: "A generic FAQ about office hours and scheduling, with no client or policy-specific information, is a straightforward low-risk task for a general AI tool (A). Not all insurance-related content is off-limits for AI (B), legal review before drafting even begins isn't a standard or necessary step for this kind of generic content (C), and there's no meaningful length threshold determining risk here (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A museum curator uses AI to draft descriptive placards for an exhibit, closely basing the wording and structure on placards used at another well-known museum's similar exhibit that the curator found online, without adapting the language significantly.",
    question: "What is the concern with this practice?",
    options: [
      "There is no concern since museum placards are considered public domain by default",
      "Closely reproducing another museum's specific descriptive text without significant adaptation or attribution raises originality and IP concerns worth addressing before use",
      "The concern is limited to whether visitors will prefer the other museum's wording",
      "The concern only applies if the other museum is located in a different country"
    ],
    correct: 1,
    explanation: "Museum placard text is original creative and educational writing, and closely basing new placards on another institution's specific wording without meaningful adaptation raises real originality and IP concerns (B). Such text isn't automatically public domain (A), visitor preference isn't the governance issue (C), and geography doesn't change the underlying concern about reproducing another institution's specific content (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A company's DEI (diversity, equity, and inclusion) committee wants to use AI to analyze promotion data and identify whether certain demographic groups are being promoted at different rates, in order to surface potential fairness issues for leadership to investigate further with HR and legal input.",
    question: "How should this use case be assessed?",
    options: [
      "This is inappropriate because AI should never be used to look at any data related to demographic patterns",
      "This is a reasonable and constructive use of AI: identifying potential disparities for further human investigation, rather than using AI output to make final personnel decisions directly",
      "This is inappropriate because promotion data can only ever be analyzed manually",
      "This is reasonable only if the analysis is kept completely secret from HR and legal"
    ],
    correct: 1,
    explanation: "Using AI to surface potential patterns worth investigating — with humans, HR, and legal driving any follow-up and decisions — is a constructive, appropriate use aimed at improving fairness rather than replacing human judgment (B). Blanket prohibition on analyzing demographic patterns (A) would prevent legitimate fairness auditing, manual-only analysis isn't required (C), and keeping the analysis secret from HR and legal (D) would undermine, not support, the goal of addressing fairness issues properly."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A freelance journalist uses AI to help organize research notes and generate an outline for an investigative story, then personally conducts all interviews, verifies all facts, and writes the actual article text herself.",
    question: "Does this workflow raise a significant disclosure or integrity concern?",
    options: [
      "Yes, because any AI assistance anywhere in the reporting process must be disclosed to readers in detail",
      "Not significantly — using AI for organizational support while personally handling reporting, verification, and writing is a reasonable research aid that doesn't misrepresent authorship of the actual content",
      "Yes, because investigative journalism can never involve any AI tool at any stage",
      "No, but only if the journalist also stops taking notes by hand entirely"
    ],
    correct: 1,
    explanation: "Using AI as an organizational aid while the journalist personally handles the substantive reporting, verification, and writing doesn't misrepresent authorship and is a reasonable use of AI as a tool, not a replacement for journalistic work (B). Detailed disclosure requirements for organizational aids aren't standard practice (A), investigative journalism isn't categorically barred from any AI assistance (C), and note-taking method is irrelevant (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A gym manager wants to use AI to write a generic social media post congratulating members on hitting the New Year fitness season, without mentioning any individual member by name or referencing any specific person's data.",
    question: "How should this be assessed?",
    options: [
      "Low risk, appropriate for a general AI tool, since it involves only generic promotional content with no individual data",
      "High risk, because fitness-related content always involves regulated health information",
      "High risk, because social media posts always require executive sign-off before drafting",
      "Low risk, but only if posted on a private account"
    ],
    correct: 0,
    explanation: "A generic, non-personalized promotional post with no individual data involved is a low-risk, appropriate use case (A). Generic fitness marketing isn't the same as regulated individual health information (B), executive sign-off before drafting isn't a standard requirement for routine social content (C), and account privacy settings don't change the risk assessment of the drafting task itself (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "An immigration consulting firm uses AI to help draft responses to client questions about visa eligibility, and a licensed immigration consultant reviews each response for accuracy against current regulations before sending, given how frequently rules change and how serious the consequences of wrong guidance can be.",
    question: "Why is the human review step particularly important in this case?",
    options: [
      "It isn't particularly important, since AI is generally up to date on all regulatory changes worldwide in real time",
      "Because immigration guidance is high-stakes and time-sensitive, and outdated or inaccurate AI-drafted responses could seriously harm a client's case if not caught by a qualified professional",
      "It matters only because it makes the firm's process appear more professional to clients",
      "It matters only for responses longer than a single paragraph"
    ],
    correct: 1,
    explanation: "Immigration rules change frequently and errors can have serious, life-altering consequences for clients, making qualified human verification essential rather than optional (B). AI knowledge can be outdated and isn't guaranteed current on fast-changing regulations (A), the value here isn't about appearances (C), and response length doesn't determine whether review is warranted (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A small e-commerce business owner uses AI to generate product descriptions, and later discovers that one description closely copied specific unique phrasing from a competitor's product page that the AI must have encountered.",
    question: "What should the owner do upon discovering this?",
    options: [
      "Leave the description as-is, since the copying was unintentional and done by the AI, not the owner directly",
      "Revise the description to ensure it's original and doesn't closely mirror the competitor's specific unique phrasing",
      "Contact the competitor to ask permission to keep using their phrasing",
      "Remove the product from sale entirely rather than fix the description"
    ],
    correct: 1,
    explanation: "Once close copying is discovered, the responsible step is to revise the content so it's genuinely original, regardless of the fact that AI produced the initial draft — the business is still responsible for what it publishes (B). Unintentional copying still needs correction rather than being left alone (A), asking for permission to keep near-identical text (C) is an unusual and unnecessary path when simply rewriting is straightforward, and removing the product entirely (D) is a disproportionate response to a fixable content issue."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A school district administrator wants to use AI to draft individualized education plan (IEP) language for students with disabilities, then have each plan reviewed and finalized by the student's case manager and special education team as legally required.",
    question: "Is this an appropriate way to incorporate AI into this process?",
    options: [
      "No, because IEP-related content can never involve any AI assistance under any circumstances",
      "Yes, as long as the legally required human review, professional judgment, and family involvement in finalizing the plan remain fully intact",
      "No, because AI drafting always violates special education law regardless of review",
      "Yes, but only if the AI-generated draft is used without any review to save the case manager's time"
    ],
    correct: 1,
    explanation: "Using AI to assist with drafting language, while ensuring the legally required human review, professional judgment, and family involvement remain intact, is a reasonable way to save time without compromising the required process (B). A blanket prohibition (A, C) overstates the risk when proper review remains in place, and skipping review to save time (D) would undermine the legally required safeguard that makes this use case acceptable in the first place."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A political campaign's communications staffer uses AI to generate a fundraising email that includes a specific, dramatic personal anecdote about the candidate that the staffer isn't certain actually happened, since the AI seemed to 'fill in' plausible-sounding details when asked to make the story more compelling.",
    question: "What should the staffer do before sending this email?",
    options: [
      "Send it as written since dramatic details make fundraising emails more effective",
      "Verify the anecdote's accuracy with the candidate or campaign records before sending, since AI can generate plausible-sounding but fabricated details, and publishing an inaccurate personal story raises honesty and reputational risk",
      "Remove the candidate's name from the email so accuracy no longer matters",
      "Send it, since AI-generated anecdotes are always fact-checked automatically before being produced"
    ],
    correct: 1,
    explanation: "AI can generate confident-sounding but fabricated specifics, and publishing an unverified personal anecdote attributed to a real candidate carries real honesty and reputational risk that must be checked before sending (B). Effectiveness doesn't justify sending unverified claims (A), removing the candidate's name wouldn't fix a fundraising email that's supposed to be about them (C), and AI output is not automatically fact-checked (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A warehouse operations supervisor uses AI to help draft a generic internal reminder about forklift safety procedures, based on publicly available OSHA guidance, with no company-specific incident details or employee names included.",
    question: "How should this task be assessed?",
    options: [
      "Low risk, appropriate for a general AI tool since it's based on public safety guidance with no sensitive specifics",
      "High risk, because any workplace safety topic is automatically confidential",
      "High risk, because safety reminders always require sign-off from a government regulator before distribution",
      "Low risk, but only if the reminder omits the word 'forklift'"
    ],
    correct: 0,
    explanation: "Drafting a generic safety reminder from publicly available guidance, without sensitive specifics, is a low-risk and appropriate AI use case (A). Safety topics aren't automatically confidential just because they concern the workplace (B), routine internal safety reminders don't require regulator sign-off (C), and there's no reason a specific safety-related word would change the risk profile (D)."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A publicly traded company's investor relations team is drafting an earnings call script. A junior analyst uses AI to help phrase forward-looking statements about next quarter's expected performance, and wants to send the draft directly to the CEO to read aloud without any review from the legal or finance teams, since the numbers 'came from the official model.'",
    question: "What is the biggest risk in skipping legal and finance review here?",
    options: [
      "There is no risk since the underlying numbers came from an official internal model",
      "Forward-looking financial statements made publicly by executives carry significant legal and regulatory disclosure obligations, and AI-assisted phrasing could introduce subtle wording issues that create compliance risk if not reviewed by qualified teams",
      "The only risk is that the script might sound less natural when read aloud",
      "The risk applies only if the earnings call is recorded for later publication"
    ],
    correct: 1,
    explanation: "Public forward-looking statements are subject to strict securities disclosure rules, and even accurate underlying figures can become legally risky if phrasing implies unwarranted certainty or omits required qualifiers — exactly the kind of subtle issue legal and finance review is meant to catch (B). Using correct source numbers doesn't eliminate phrasing-related compliance risk (A), naturalness of delivery isn't the core concern (C), and the disclosure obligations apply regardless of whether the call happens to be recorded (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A wedding photographer uses AI to help write personalized-sounding social media captions for each client's photo gallery, using only publicly shared details like the couple's first names and wedding venue, which the couple already posted themselves.",
    question: "What is the appropriate assessment?",
    options: [
      "Low risk, since the information used was already voluntarily made public by the couple themselves",
      "High risk, because any mention of a real couple's names in AI-generated content is inherently unsafe",
      "High risk, because captions must always be written entirely without any drafting assistance",
      "Low risk, but only if the photographer also obtains a notarized release for each caption"
    ],
    correct: 0,
    explanation: "Using details the couple already made public themselves for a low-stakes marketing caption is a low-risk use case (A). Using a real first name that's already public isn't inherently unsafe (B), caption drafting assistance isn't prohibited (C), and a notarized release is a disproportionate requirement for routine, already-public social content (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A company transitions to a new AI use policy that requires disclosure whenever AI substantially shaped a document sent to external stakeholders, but leaves 'substantially shaped' undefined. An employee uses AI only to check grammar on an otherwise fully human-written report and wonders whether disclosure is required.",
    question: "How should the employee reason through this ambiguous case?",
    options: [
      "Always disclose regardless of the task, since any ambiguity should default to maximum disclosure with no further thought",
      "Consider that grammar-only checking is a minor, non-substantive edit rather than something that 'substantially shaped' the content, and if still unsure, ask a manager or compliance contact to interpret the policy consistently with how other cases have been handled",
      "Never disclose anything, since the policy's ambiguity means it isn't enforceable in any case",
      "Decide based solely on the employee's personal preference for how transparent they feel like being that day"
    ],
    correct: 1,
    explanation: "A grammar check is a minor edit, not something that substantially shaped the content's substance, so it likely falls outside the disclosure requirement — and when policy language is genuinely ambiguous, checking with a manager or compliance contact promotes consistent interpretation (B). Defaulting to always disclose without judgment (A) isn't necessary here, treating ambiguity as unenforceable (C) is an inappropriate workaround, and personal mood isn't a valid basis for policy interpretation (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A veterinary clinic's receptionist wants to use AI to write a general educational handout about seasonal pet allergy symptoms to hand out to any interested client, containing no specific patient or pet information.",
    question: "How should this be assessed?",
    options: [
      "Low risk, appropriate for a general AI tool, since it's general educational content with no specific patient data",
      "High risk, because any content related to animal health must never involve AI",
      "High risk, because handouts require veterinary board certification of the AI tool itself before use",
      "Low risk, but only if reviewed by a state veterinary licensing board first"
    ],
    correct: 0,
    explanation: "A general educational handout with no patient-specific information is a low-risk, appropriate use case, though it's still reasonable for clinic staff to have a vet review the medical content for accuracy (A). A blanket ban on animal-health content (B) is excessive, there's no such thing as 'board certification' of an AI tool itself (C), and formal state licensing board review isn't required for a general handout (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A midsize manufacturing firm's HR department uses AI to draft an internal announcement about upcoming layoffs, including which departments will be affected. The draft is then sent straight to the company-wide email list by an HR coordinator without any additional review, since 'the important information was accurate.'",
    question: "What is missing from this process?",
    options: [
      "Nothing is missing since factual accuracy is the only thing that matters for this kind of announcement",
      "Review by senior HR/legal leadership for tone, legal sensitivity, and completeness before a consequential, high-visibility announcement like this goes out company-wide",
      "The announcement should have been translated into additional languages before sending",
      "The announcement should have included a joke to soften the impact"
    ],
    correct: 1,
    explanation: "Layoff announcements are highly sensitive and consequential, requiring senior review for tone, legal sensitivity, and completeness beyond just factual accuracy before company-wide distribution (B). Accuracy alone isn't sufficient for this kind of high-stakes communication (A), translation may or may not be relevant depending on the workforce but isn't the core missing safeguard (C), and humor is inappropriate and irrelevant here (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A yoga studio owner wants to use AI to write a few different versions of an Instagram bio for the studio, experimenting with tone and style, using no client information at all.",
    question: "What is the appropriate assessment of this task?",
    options: [
      "Low risk, appropriate for a general AI tool since it involves no client or sensitive data",
      "High risk, because bios always require professional marketing consultant sign-off",
      "High risk, because wellness-industry content is automatically regulated health information",
      "Low risk, but only after consulting with a branding attorney first"
    ],
    correct: 0,
    explanation: "Drafting bio copy with no client or sensitive data involved is a straightforward low-risk, appropriate AI use case (A). Marketing consultant sign-off isn't required for routine bio drafting (B), a business bio isn't regulated health information (C), and consulting an attorney is unnecessary for this low-stakes creative task (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A debt collection agency uses AI to draft the wording of collection notices sent to consumers, and legal compliance reviews the templates for accuracy against consumer protection regulations before they're used at scale across thousands of accounts.",
    question: "Why is this review step especially important in this context?",
    options: [
      "It isn't especially important, since debt collection notices are informal and not subject to specific regulation",
      "Because debt collection communications are subject to strict consumer protection laws, and a wording error in an AI-drafted template could create legal exposure across every account that uses that template",
      "It matters only because it makes the notices look more polished",
      "It matters only if the agency operates in more than one state"
    ],
    correct: 1,
    explanation: "Debt collection communications are governed by specific consumer protection regulations, and because a template is reused across many accounts, a single wording flaw could create compliance exposure at scale — making careful review before rollout especially important (B). These communications are in fact regulated, not informal (A), the value isn't about appearance (C), and the regulatory risk isn't limited to multi-state operations (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "An HR business partner wants to use AI to draft interview questions for a leadership role. The AI suggests including a question about the candidate's 'family planning intentions' to assess 'availability for travel.'",
    question: "What should the HR business partner do?",
    options: [
      "Include the question as suggested, since the AI generated it and AI output reflects neutral, unbiased judgment",
      "Reject that specific question, recognizing it touches on a protected category and creates legal and fairness risk, and select or write alternative questions that assess travel availability appropriately",
      "Ask the question but phrase it more subtly so it's less noticeable",
      "Cancel the leadership interview process entirely because AI was involved in drafting questions"
    ],
    correct: 1,
    explanation: "AI-suggested content isn't automatically appropriate or unbiased, and a question probing family planning touches a protected category, creating real legal and fairness risk that the HR partner should recognize and avoid, replacing it with an appropriate way to ask about travel availability (B). Assuming AI output is inherently neutral (A) is the over-trust failure this domain warns about, disguising a problematic question (C) doesn't fix the underlying issue, and abandoning the whole process (D) is an overreaction to a fixable drafting issue."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A restaurant owner uses AI to generate a few options for a new seasonal menu name, choosing purely from creative wordplay suggestions with no reference to any specific competitor's menu.",
    question: "How should this task be assessed?",
    options: [
      "Low risk, appropriate for a general AI tool since it's a purely creative task with no sensitive or reproduced content involved",
      "High risk, because menu naming always requires trademark clearance before any brainstorming can occur",
      "High risk, because food service businesses are barred from using AI for any marketing purpose",
      "Low risk, but only if the owner keeps the AI's suggestions completely private forever"
    ],
    correct: 0,
    explanation: "Purely creative brainstorming with no sensitive data or reproduction of existing protected content is a low-risk, appropriate use case (A). Trademark clearance matters before final commercial use, not before informal brainstorming (B), food businesses aren't barred from AI marketing use (C), and there's no requirement to keep informal brainstorming private forever (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A nonprofit board is evaluating final candidates for executive director. One board member suggests having AI read all candidate interview transcripts and declare a single 'best fit' recommendation that the board will treat as the deciding vote, to remove 'messy human politics' from the decision.",
    question: "What is the best response to this suggestion?",
    options: [
      "Adopt it, since removing human judgment eliminates political bias from the hiring decision entirely",
      "Reject treating an AI output as the deciding vote for such a consequential leadership decision; AI can help organize notes or surface themes, but the board should retain meaningful collective judgment over the final choice",
      "Adopt it, but only after asking the AI to double-check its own recommendation for bias",
      "Reject any AI involvement at all, including using it to help organize interview notes into a summary for board discussion"
    ],
    correct: 1,
    explanation: "An executive director hire is highly consequential, and treating an AI recommendation as the deciding vote removes essential human judgment and accountability rather than actually eliminating bias, since AI can carry its own biases and blind spots (B). Assuming this removes bias (A) is a false premise, having the AI self-check doesn't resolve the core over-trust problem (C), and using AI to help organize notes for human discussion is a reasonable, lower-risk use that doesn't need to be banned (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A city council staffer uses AI to draft a public meeting summary and posts it to the city website under the label 'AI-Assisted Summary — Reviewed by Staff,' after checking it against the meeting recording for accuracy.",
    question: "How should this disclosure practice be evaluated?",
    options: [
      "This is excessive because government documents should never mention any tool used to produce them",
      "This is a reasonable, transparent practice: it discloses AI assistance clearly to the public while also confirming that a human verified accuracy, which is especially appropriate for official government records",
      "This is inadequate because it should also include the exact AI tool's internal technical specifications",
      "This is inadequate because public meeting summaries should never be drafted with AI assistance"
    ],
    correct: 1,
    explanation: "For official public records, clearly labeling AI assistance while confirming human verification is a transparent, appropriate practice that serves public trust (B). There's no rule against mentioning tools used (A), technical specifications aren't relevant or expected in a public-facing disclosure (C), and using AI as a drafting aid for public summaries isn't inherently improper as long as it's reviewed and disclosed (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A dental office wants to use AI to help write a script that front-desk staff can use when calling patients to remind them of upcoming appointments, using only generic scheduling phrases and no patient-specific medical details.",
    question: "What is the appropriate assessment?",
    options: [
      "Low risk, appropriate for a general AI tool since the script itself contains no patient-specific or medical information",
      "High risk, because any healthcare-adjacent business must avoid AI entirely",
      "High risk, because appointment reminder scripts always require a compliance officer's written sign-off",
      "Low risk, but only if the office also stops sending appointment reminders altogether"
    ],
    correct: 0,
    explanation: "A generic, reusable script with no patient-specific or medical information is a low-risk, appropriate use of AI (A). Healthcare-adjacent businesses can use AI for non-clinical administrative tasks like this (B), formal compliance sign-off isn't a standard requirement for a generic script template (C), and stopping reminders isn't a relevant or reasonable response (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "A market research firm delivers a client report that includes AI-generated survey analysis. The client later asks directly whether AI was used to produce any part of the analysis, and the account manager considers saying no because 'it might make the report seem less rigorous.'",
    question: "What should the account manager do?",
    options: [
      "Say no, since protecting the client's perception of rigor is more important than technical accuracy about the process",
      "Answer honestly that AI assisted with the analysis, since misrepresenting how a deliverable was produced when directly asked undermines trust and professional integrity",
      "Change the subject and avoid answering the question directly",
      "Say yes, but only if the client threatens to end the contract"
    ],
    correct: 1,
    explanation: "When asked directly, misrepresenting how work was produced is a straightforward integrity violation regardless of concerns about perceived rigor, and the account manager should answer honestly (B). Prioritizing perception over honesty (A) crosses a clear line, deflecting the question (C) is evasive and similarly problematic, and honesty shouldn't be conditional on the threat of losing the contract (D)."
  },
  {
    domain: 6,
    difficulty: 2,
    scenario: "A landscaping company owner wants to use AI to draft a general seasonal maintenance tip sheet to hand out to any customer, with generic advice like 'water lawns early in the morning,' containing no customer-specific property details.",
    question: "How should this task be assessed?",
    options: [
      "Low risk, appropriate for a general AI tool since it's generic advice with no customer-specific information",
      "High risk, because agricultural and landscaping advice is always subject to strict federal regulation",
      "High risk, because tip sheets must be reviewed by a licensed horticulturist before any drafting begins",
      "Low risk, but only if fewer than five tips are included"
    ],
    correct: 0,
    explanation: "Generic seasonal advice with no customer-specific details is a low-risk, appropriate AI use case (A). This kind of general tip sheet isn't subject to strict federal regulation (B), formal expert review before drafting even begins isn't a standard requirement here, though a quick accuracy check is reasonable (C), and there's no meaningful risk threshold tied to the number of tips (D)."
  },
  {
    domain: 6,
    difficulty: 4,
    scenario: "An HR analytics team builds a dashboard that uses AI to generate a single 'flight risk' score for each employee based on internal data, and shares these scores directly with individual managers, who are told to 'use their judgment' but are given no explanation of how the score is calculated or its accuracy rate.",
    question: "What is the biggest concern with this rollout?",
    options: [
      "There is no concern, since managers are explicitly told to use their own judgment",
      "Handing managers an opaque, unexplained AI-generated score risks the score being treated as authoritative in practice, especially without transparency about its accuracy or methodology, undermining the intended human judgment safeguard",
      "The only concern is that 'flight risk' is an unusual term to use in a corporate setting",
      "The concern is limited to how the dashboard is visually formatted"
    ],
    correct: 1,
    explanation: "Telling managers to 'use judgment' isn't a meaningful safeguard if they're given an authoritative-looking score with no insight into its reliability or basis — in practice, opaque scores tend to anchor decisions rather than truly inform independent judgment (B). The instruction to use judgment doesn't eliminate this risk (A), terminology isn't the substantive issue (C), and visual formatting isn't the core concern (D)."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A software training company creates course materials using AI, including practice exercises that closely resemble copyrighted textbook problems from a well-known publisher, changing only the numbers in each problem.",
    question: "What is the concern with this practice?",
    options: [
      "There is no concern, since changing the numbers in a problem makes it entirely original",
      "Closely reproducing the structure and wording of specific copyrighted textbook problems, even with different numbers, raises real IP concerns and the exercises should be substantially reworked to be genuinely original",
      "The concern is limited to whether the numbers are mathematically accurate",
      "The concern only applies if the textbook publisher is a direct competitor of the training company"
    ],
    correct: 1,
    explanation: "Merely swapping numbers while keeping a problem's specific structure and wording intact doesn't make it original — this pattern raises real copyright concerns, and the exercises should be substantially reworked (B). Changing numbers alone isn't sufficient for originality (A), mathematical accuracy isn't the core issue (C), and the IP concern doesn't depend on whether the publisher is a competitor (D)."
  },
  {
    domain: 6,
    difficulty: 5,
    scenario: "A national retail chain's legal team is drafting an AI use policy. One proposal states: 'Employees may use AI for any task as long as they personally feel comfortable with the outcome.' A colleague objects that this standard is too vague to be useful.",
    question: "Why is the colleague's objection reasonable?",
    options: [
      "It isn't reasonable — personal comfort is always sufficient to determine appropriate AI use in any organization",
      "A purely subjective 'personal comfort' standard gives no concrete guidance on data handling, review requirements, or prohibited use cases, making it inconsistent and hard to apply or enforce compared to specific, risk-based criteria",
      "The objection is only about the policy being too short in length",
      "The objection is irrelevant since AI use policies are never actually followed in practice"
    ],
    correct: 1,
    explanation: "A subjective 'if it feels fine' standard doesn't give employees concrete, consistent guidance on what data can be used where, when review is required, or what's off-limits — effective policies need specific, risk-based criteria to be enforceable and consistent across a large organization (B). Personal comfort alone isn't a reliable governance standard (A), the objection is about substance and clarity, not length (C), and dismissing policy value entirely (D) isn't a fair characterization of the objection or of how policies function."
  },
  {
    domain: 6,
    difficulty: 3,
    scenario: "A nonprofit grant program manager uses AI to help score applicant organizations against published funding criteria, then personally reads each application in full, adjusts several scores based on context the AI missed, and documents her reasoning before finalizing funding recommendations for the board.",
    question: "How should this workflow be evaluated?",
    options: [
      "This is problematic because using AI anywhere in a grant scoring process automatically invalidates the results",
      "This reflects a responsible pattern: AI assists with an initial pass against defined criteria, while the manager applies contextual judgment, corrects the score where warranted, and documents reasoning before a consequential funding decision goes to the board",
      "This is problematic because the manager should have let the AI scores stand unchanged to remain 'objective'",
      "This is responsible only if the applicant organizations are never told a grant program exists"
    ],
    correct: 1,
    explanation: "Using AI for an initial, criteria-based pass while a human applies contextual judgment, corrects scores, and documents reasoning before a consequential funding decision is exactly the kind of meaningful human review this domain calls for (B). AI assistance doesn't automatically invalidate a process (A), leaving AI scores unchanged in the name of 'objectivity' would actually remove valuable human judgment and risks perpetuating any AI errors or bias (C), and applicant awareness of the program's existence is unrelated to the soundness of this scoring workflow (D)."
  }
];

