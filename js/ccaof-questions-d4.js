// CCAO-F Domain 4 — Workflow Integration and Solution Design (16% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D4 = [
  {
    domain: 4,
    difficulty: 1,
    scenario: "A marketing coordinator sends a weekly newsletter. Each week she gathers five article links, writes a short blurb for each, and formats the whole thing into her email tool's template.",
    question: "Which part of this recurring task is the best candidate to hand off to Claude?",
    options: [
      "Deciding which five articles are most relevant to subscribers this week",
      "Drafting the short blurbs once she has chosen and shared the articles",
      "Approving the final newsletter before it goes out to the full subscriber list",
      "Choosing which email tool the team uses going forward"
    ],
    correct: 1,
    explanation: "Drafting blurbs from articles she has already selected is a well-defined writing task Claude can do quickly, freeing her time (B). Selecting which articles matter to the audience relies on judgment about current priorities and relationships (A), final send approval should stay with a human for a message going to all subscribers (C), and tool selection is a separate business decision unrelated to this workflow (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An HR generalist wants to build a repeatable process for writing job postings. Each posting currently takes about an hour: reading the hiring manager's notes, drafting the listing, and posting it live.",
    question: "What is the best way to design this as a repeatable weekly workflow?",
    options: [
      "Have Claude draft the listing from the hiring manager's notes using a consistent template, then have HR review and edit before posting it live",
      "Have Claude draft the listing and post it live automatically each time, since job postings follow a predictable format",
      "Keep writing every listing from scratch manually, since each role is different enough that a template would not help",
      "Have the hiring manager write the full listing themselves so HR does not need to review it"
    ],
    correct: 0,
    explanation: "A repeatable workflow benefits from a consistent template and a defined human review step before anything public goes out, which catches inaccurate requirements or tone issues while still saving drafting time (A). Auto-posting without review (B) risks incorrect or non-compliant postings going live, and treating every listing as fully unique (C) throws away the efficiency gain a template offers even though roles differ."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A customer support manager has Claude draft summaries of long support tickets. The summaries are then copy-pasted into the company's ticketing system as internal notes, which agents rely on to get up to speed quickly.",
    question: "What is the most important thing to get right in this handoff step?",
    options: [
      "Making sure the summary is copied into the correct field so agents actually see it when they open the ticket",
      "Making sure the summary uses the exact same font as the rest of the ticketing system",
      "Making sure Claude generates the summary in under five seconds",
      "Making sure the summary is at least 300 words long"
    ],
    correct: 0,
    explanation: "A handoff only works if the output actually lands where the next person in the process will look for it; a well-written summary pasted into the wrong field is effectively invisible to agents (A). Font matching, generation speed, and word count are minor or irrelevant compared to whether the information reaches its intended destination and audience."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A finance team uses Claude to draft explanations for budget variances each month. A senior analyst currently reviews every explanation before it goes into the report sent to the CFO. Someone suggests removing that review step to save time, since Claude has been accurate so far.",
    question: "What is the best response to this suggestion?",
    options: [
      "Agree, since consistent past accuracy is a reliable predictor that review is no longer needed",
      "Keep the review step, because financial explanations that go to executive leadership are high-stakes and errors could mislead decisions, even if past output has generally been accurate",
      "Remove the review step but only for smaller variances, since those are less important",
      "Replace the analyst's review with a second Claude conversation checking the first one, and skip human involvement entirely"
    ],
    correct: 1,
    explanation: "For consequential, executive-facing outputs, a track record of accuracy does not eliminate the risk of an error slipping through on a given month, and the cost of an undetected mistake reaching the CFO is high, so human review remains warranted (B). Past performance is not a guarantee of future correctness (A), and having Claude check Claude's own work is not a substitute for independent human judgment on high-stakes content (D)."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A small nonprofit's development director wants Claude to help with fundraising. She is deciding what to use it for: writing thank-you letters to donors, or deciding which major donors to personally call this month based on giving history and relationship context.",
    question: "Which task is the better fit for Claude?",
    options: [
      "Deciding which major donors to call, since Claude can process giving history quickly",
      "Drafting the thank-you letters, since that is a writing task that does not require weighing relationship nuance",
      "Both tasks equally, since Claude can fully own donor relationship strategy",
      "Neither task, since fundraising is too sensitive for Claude to be involved in at all"
    ],
    correct: 1,
    explanation: "Drafting thank-you letters is a well-scoped writing task well suited to Claude, especially with a human doing a final personal touch pass (B). Deciding which major donors to prioritize for a personal call depends on relationship history, subtle context, and judgment that should stay with the development director (A, C), while flatly excluding Claude from all fundraising tasks (D) ignores a genuinely useful application."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A project manager runs a weekly status meeting. Afterward, she manually types up meeting notes into a shared doc, then separately drafts an email summary for stakeholders who did not attend, then updates the project timeline tool.",
    question: "How could this workflow be redesigned to reduce friction while keeping appropriate oversight?",
    options: [
      "Have Claude generate the notes, stakeholder email, and timeline update automatically from a recording, and publish all three without review since they come from the same source material",
      "Have Claude draft the notes and stakeholder email from her rough notes or a transcript, have her quickly review both, and keep the timeline tool update as a manual step since it feeds a system others depend on for accuracy",
      "Keep all three steps fully manual, since combining them into one workflow risks losing detail",
      "Have Claude decide which stakeholders should receive the summary email"
    ],
    correct: 1,
    explanation: "Drafting repetitive written outputs like notes and a stakeholder summary is a strong use of Claude, and a quick human review before sending keeps quality control intact (B); the timeline tool update can reasonably stay manual or be handled separately since it's a structured system of record other teams rely on. Publishing everything without review (A) removes a needed check, staying fully manual (C) ignores a real efficiency opportunity, and stakeholder distribution decisions are a judgment call for the PM, not Claude (D)."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A retail chain's operations team wants a workflow where Claude reads daily sales data exports and automatically drafts a short summary of anomalies (e.g., a store's sales dropped 40%) that gets emailed straight to regional managers without anyone reviewing it first.",
    question: "What is the main risk with this design?",
    options: [
      "Claude cannot summarize numerical data under any circumstances, so this task should not involve Claude at all",
      "Without a review step, an inaccurate or misread anomaly could reach regional managers as if it were confirmed fact, prompting wrong decisions before anyone catches the error",
      "Regional managers should be drafting these summaries themselves instead of receiving them by email",
      "The workflow is appropriate as designed since sales data summaries are low-stakes"
    ],
    correct: 1,
    explanation: "Sending an unreviewed, automatically generated anomaly alert straight to decision-makers means a misinterpretation of the data (e.g., confusing a data export glitch with a real sales drop) could trigger costly wrong decisions before anyone checks it (B). Claude can generally work with described or exported data (ruling out A), the email channel itself isn't the problem (C), and treating anomaly alerts that drive management action as low-stakes (D) understates the real risk of an unreviewed error."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A high school teacher wants to save time grading short-answer quizzes. She is considering having Claude grade and record final scores in the gradebook without her review, since it would save the most time.",
    question: "What is the better approach?",
    options: [
      "Have Claude grade and finalize scores automatically, since consistency matters more than speed",
      "Have Claude suggest scores and feedback as a first pass, but have the teacher review and finalize grades before they are recorded, since grading involves judgment calls the teacher is accountable for",
      "Avoid using Claude for grading in any capacity, since only teachers should ever look at student answers",
      "Have students grade each other's quizzes using Claude's suggested rubric instead of the teacher reviewing anything"
    ],
    correct: 1,
    explanation: "Grades are consequential and often involve judgment calls (partial credit, unusual but valid answers) that the teacher is ultimately accountable for, so a first-pass draft with teacher review before finalizing is the sound design (B). Fully automating final scores (A) removes accountability, banning Claude entirely (C) forgoes a genuine time-saver on the drafting side, and shifting review to peer students (D) does not preserve the needed oversight."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A real estate agent wants to use Claude in her daily workflow. She is trying to decide between two ideas: (1) having Claude draft personalized property descriptions for new listings, and (2) having Claude decide the final asking price for each property.",
    question: "Which idea reflects better workflow design, and why?",
    options: [
      "Idea 2, because pricing is a repetitive task Claude can standardize across all listings",
      "Idea 1, because writing descriptions is a scoped drafting task, while pricing requires judgment about local market conditions, client goals, and negotiation strategy that should stay with the agent",
      "Both ideas are equally good uses of Claude, since real estate decisions are always low-risk",
      "Neither idea is appropriate, since real estate work cannot involve any AI assistance"
    ],
    correct: 1,
    explanation: "Drafting listing descriptions is a bounded writing task well suited to Claude, while setting a final asking price is a high-stakes judgment call that blends market data, client relationship, and negotiation strategy — exactly the kind of decision that should stay with the licensed agent (B). Treating pricing as something to standardize away (A) misunderstands its complexity, and the other two options either overstate the risk uniformly (C) or wrongly rule out a genuinely useful application (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An events planning company runs the same type of workflow for every corporate event they book: gather client requirements, draft a proposal, get client sign-off, then build a detailed run-of-show document. Currently, every planner does this slightly differently, and new hires often forget steps.",
    question: "What is the best way to use Claude to improve this situation across the whole team?",
    options: [
      "Have each planner keep improvising their own process, since events differ too much to standardize",
      "Build a shared, documented workflow with a consistent prompt or template for each stage (proposal draft, run-of-show draft) that any planner can follow, rather than relying on individual habits",
      "Have Claude fully manage client relationships and sign-off approvals without planner involvement",
      "Only apply this to the most experienced planners, since new hires should learn the manual process first"
    ],
    correct: 1,
    explanation: "A workflow that scales across a team needs to be documented and consistent rather than dependent on each person's individual habits, and a shared template for each stage helps new hires avoid missing steps while still using Claude for the drafting-heavy parts (B). Leaving the process unstandardized (A) perpetuates the original problem, letting Claude own client sign-off (C) removes necessary human relationship management, and withholding the improved process from new hires (D) misses the exact group most likely to benefit."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A legal administrative assistant at a small firm currently spends significant time manually reformatting attorneys' rough notes into standardized client intake summaries, a task everyone agrees is tedious but not risky since it's just formatting existing information, not adding new content.",
    question: "What does this situation suggest about the workflow?",
    options: [
      "This is a bottleneck involving a repetitive, low-risk task that Claude could likely help with, freeing the assistant's time for higher-judgment work, with a quick human check to confirm nothing was altered",
      "This task should never be touched by Claude, since it involves legal documents of any kind",
      "The assistant should be replaced entirely, since the task is repetitive",
      "The attorneys should stop taking notes and dictate directly into the client file to eliminate the step entirely"
    ],
    correct: 0,
    explanation: "A repetitive, low-risk, well-defined reformatting task is a textbook bottleneck Claude can help with, especially when a quick human check confirms accuracy of the reformatted summary (A). The legal context calls for care, not a blanket exclusion of Claude from any legal-adjacent task (B); reducing tedious work is not the same as eliminating the role (C), and redesigning attorney note-taking habits (D) is a bigger process change unrelated to the actual bottleneck identified."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "A customer support team gets the same five categories of questions repeatedly. An agent wants Claude to draft reply templates for each category that agents can then personalize before sending.",
    question: "Is this a good use of Claude, and why?",
    options: [
      "No, because customer replies should never be assisted by AI in any way",
      "Yes, because drafting reusable templates for common, well-understood question categories is a repetitive task Claude can speed up, while agents still personalize and review before sending",
      "Yes, but only if the templates are sent to customers without any agent involvement, to save the most time",
      "No, because template drafting requires understanding each individual customer's full history"
    ],
    correct: 1,
    explanation: "Common, well-understood categories of questions are a good candidate for Claude-drafted templates, since agents remain in the loop to personalize and review before anything reaches a customer (B). Banning AI assistance from support entirely (A) forgoes a real efficiency gain, sending unreviewed replies (C) removes a needed check, and generic templates for common categories don't require knowing an individual's full history (D) — that personalization happens after the draft."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A sales operations analyst asks Claude to draft a weekly pipeline summary. She then copies the output into a slide deck, reformats the bullet points to match the deck's style, and manually re-enters the numbers because the copy-paste breaks the table formatting.",
    question: "What is the clearest improvement to make to this handoff?",
    options: [
      "Stop using Claude for the summary altogether since the reformatting takes too long",
      "Ask Claude to format the output in a way that pastes cleanly into the deck (e.g., plain text bullets or a simple table matching the deck's structure), reducing the manual rework needed at handoff",
      "Have Claude directly edit the slide deck file without her involvement",
      "Keep the current process, since some manual cleanup after drafting is unavoidable"
    ],
    correct: 1,
    explanation: "The friction here is a formatting mismatch at the handoff point, which can be reduced by asking for output already shaped to fit the destination (e.g., plain bullets instead of a table that breaks on paste), cutting rework without removing her involvement (B). Abandoning Claude over a fixable formatting issue (A) discards real time savings, letting Claude directly edit the deck file (C) isn't a capability available in this kind of workflow, and assuming rework is unavoidable (D) overlooks the simple fix."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A hospital administrative office wants to design a recurring workflow: Claude drafts personalized appointment reminder messages for patients based on a data export, and a staff member spot-checks only 1 out of every 50 messages before the batch is sent.",
    question: "What is the concern with this design?",
    options: [
      "There is no concern, since spot-checking is always sufficient regardless of the content or audience",
      "A 1-in-50 spot check may not catch an error that repeats across a data-driven batch, such as a mail-merge mismatch pulling the wrong appointment time or patient name into many messages at once; the sampling rate should reflect the risk of a systemic error affecting many patients at once",
      "Appointment reminders are so low-stakes that no review is necessary at all",
      "The staff member should personally rewrite every single message instead of using Claude"
    ],
    correct: 1,
    explanation: "When messages are generated from a shared data export, an error in the merge process (like a mismatched field) can repeat across many messages at once, so a very thin spot check risks missing a systemic issue rather than a one-off mistake (B). Spot-checking isn't automatically adequate regardless of context (A), patient-facing appointment details carry real consequences if wrong (ruling out C), and full manual rewriting (D) discards the efficiency benefit without being necessary if the review step is properly scaled to the risk."
  },
  {
    domain: 4,
    difficulty: 1,
    scenario: "An office manager wants Claude to help schedule a recurring all-hands meeting by finding a time that works for 40 people across different calendars and time zones, and then actually placing the event on everyone's calendar.",
    question: "What is the best way to think about this task?",
    options: [
      "This is a good candidate for Claude on the drafting/analysis side (e.g., summarizing constraints or suggesting candidate times from information she provides), but actually placing events on 40 people's calendars is better handled through the office's scheduling software with mutual visibility into availability",
      "Claude should be given full access to send Outlook invites to all 40 people directly, since that is the most efficient path",
      "This task is entirely unsuited to Claude and should be done by hand with no assistance",
      "The office manager should delegate calendar access to Claude so it can add and remove events at will"
    ],
    correct: 0,
    explanation: "Claude can help think through scheduling constraints or draft communications about the meeting, but the actual mechanics of checking real-time calendar availability and placing events for 40 people is a job for dedicated scheduling software that has visibility into everyone's calendars (A). Directly connecting Claude to send invites or granting it standing calendar access (B, D) goes beyond what's appropriate or how these tools are typically used in a business chat context, and dismissing Claude's usefulness for the planning portion entirely (C) discards a real time-saver."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A restaurant chain's regional manager wants to create a monthly process for compiling customer feedback from surveys into a report for the executive team. Right now, a different person compiles it every month, and the format changes each time.",
    question: "What is the best first step in designing a repeatable version of this workflow?",
    options: [
      "Have Claude decide on its own what format to use each month, changing the framing based on what seems most relevant",
      "Define a consistent report structure and a standard set of instructions for summarizing the survey data, so that whoever runs the process, and however Claude assists, produces a comparable report each month",
      "Skip creating a report altogether and have executives read the raw survey responses directly",
      "Assign the report to only one specific person permanently so no process needs to be documented"
    ],
    correct: 1,
    explanation: "Making a workflow repeatable and comparable month-over-month starts with a consistent structure and clear instructions, so results don't depend on who happens to run it or how Claude is prompted that particular month (B). Letting the format vary freely (A) recreates the original problem, skipping synthesis entirely (C) loses the value of a digestible summary for executives, and pinning the task to one person (D) avoids documenting a process, which fails as soon as that person is unavailable."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A university research coordinator uses Claude to help summarize academic papers for a literature review. She wants to also have Claude determine the final conclusions of the review and submit it as the credited author on a co-authored paper.",
    question: "What is the issue with this plan?",
    options: [
      "There is no issue; Claude can appropriately be listed as a co-author since it contributed significant summarization work",
      "Using Claude to help summarize source material is reasonable, but drawing the review's scholarly conclusions and taking authorship credit are judgment- and integrity-sensitive academic responsibilities that should remain with the human researchers",
      "Claude should not be used for any part of academic research under any circumstances",
      "The literature review should be abandoned since Claude cannot read academic papers"
    ],
    correct: 1,
    explanation: "Summarization support is a reasonable and common use of Claude in research workflows, but forming the review's actual scholarly conclusions and claiming authorship are matters of academic judgment, integrity, and accountability that belong to the human researchers, not an AI tool (B). Treating authorship credit as fine (A) misunderstands academic norms and accountability, banning all research use (C) discards a genuinely helpful application, and D is simply factually off-base about the underlying capability."
  },
  {
    domain: 4,
    difficulty: 5,
    scenario: "A property management company wants to build a workflow where Claude drafts responses to prospective tenants' inquiries about apartment availability and pricing, pulling numbers from a document the team updates weekly, and sends the reply immediately without anyone checking the response.",
    question: "What went wrong with this workflow design?",
    options: [
      "Nothing went wrong, since inquiries about availability and pricing are simple and low-risk",
      "If the reference document is even briefly out of date, an immediately auto-sent reply could quote wrong pricing or availability to a prospective tenant, and there is no review step to catch that before it goes out",
      "Claude should not be trusted to read the pricing document at all, so the whole workflow is a poor fit",
      "The workflow should be entirely manual, since apartment inquiries always require a phone call"
    ],
    correct: 1,
    explanation: "Pricing and availability information changes and can go stale between updates, so sending an auto-generated reply straight to a prospective tenant with no check creates real risk of quoting wrong numbers with no chance to catch it first (B). Pricing quotes are a genuine business commitment, not inherently low-risk (A), the concern is the missing review step rather than Claude's ability to read a document (C), and requiring a phone call for every inquiry (D) overcorrects by discarding a legitimate efficiency gain."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A nonprofit program coordinator writes a monthly impact report for the board. She has been doing this manually for two years, spending about four hours each month gathering data and writing narrative summaries.",
    question: "Which approach best integrates Claude into this existing process?",
    options: [
      "Replace the report entirely with raw data tables, since narrative writing is unnecessary",
      "Continue doing everything manually, since the process has worked fine for two years",
      "Have her provide the gathered data to Claude to draft the narrative sections in a consistent format each month, then review and adjust before sending to the board",
      "Have Claude independently gather the program data from wherever it can find it, without her involvement"
    ],
    correct: 2,
    explanation: "The most effective integration keeps her doing what requires firsthand knowledge (gathering accurate program data) while handing the repetitive narrative drafting to Claude, with her review before it reaches the board (C). Dropping narrative context in favor of raw tables (A) reduces the report's usefulness, sticking with a fully manual process ignores a real time-saving opportunity just because it's familiar (B), and having Claude source data on its own (D) is unreliable since it doesn't have independent access to the program's actual figures."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A call center trains new hires using a multi-step onboarding checklist: watch training videos, complete a quiz, shadow a senior agent, then take live calls with supervision. A manager proposes having Claude conduct the final readiness evaluation and clear trainees to take unsupervised live calls on its own.",
    question: "What is the best assessment of this proposal?",
    options: [
      "This is a good idea, since Claude can process quiz scores and video completion data faster than a manager",
      "Claude could help summarize a trainee's progress across the earlier checklist steps, but the final go/no-go decision to release someone to unsupervised customer calls is a judgment call with real consequences that should be made by a manager",
      "The entire onboarding checklist should be handled by Claude from start to finish, including live call shadowing",
      "Onboarding should remain entirely paper-based with no digital or AI assistance at any step"
    ],
    correct: 1,
    explanation: "Summarizing a trainee's documented progress is a reasonable support task, but deciding whether someone is ready to handle real customers unsupervised is a consequential judgment call that depends on qualitative observations a manager is positioned to make, so that final decision should stay human (B). Handing off the readiness call because it's faster (A) overlooks the stakes involved, having Claude run live call shadowing (C) isn't something it can meaningfully do, and rejecting all digital assistance (D) discards a legitimate efficiency opportunity elsewhere in the process."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An insurance claims office wants Claude to draft plain-language explanations of claim decisions to send to policyholders. The claims adjuster reviews and edits each draft before it's sent, but the manager wants to remove that review step for claims under $500 to speed up small claims processing.",
    question: "Is removing review for small claims a reasonable idea?",
    options: [
      "No, dollar amount is irrelevant, so review should never be removed for any claim regardless of size",
      "It could be reasonable if the risk is genuinely low and consistent for small claims, but the team should confirm that low dollar value also means low risk of misstatement (e.g., no complex denial reasoning) before removing the check, rather than assuming size alone is a safe proxy",
      "Yes, this should be done immediately since smaller claims are inherently unimportant to customers",
      "No, the entire claims explanation process should be done manually with no Claude involvement regardless of claim size"
    ],
    correct: 1,
    explanation: "Reducing review burden for lower-stakes cases can be reasonable, but the team should verify that dollar amount actually correlates with low risk of a wrong or confusing explanation (a small claim could still involve a denial that needs care in how it's communicated) rather than assuming size alone makes it safe (B). A blanket never-remove-review rule (A) ignores that risk can genuinely vary, assuming low dollar value means the customer doesn't care (C) is a poor read on customer experience, and rejecting Claude's help entirely (D) discards a real efficiency opportunity for the lower-risk cases that do turn out to be safe to streamline."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A marketing team runs quarterly brand campaigns. Each campaign involves: brainstorming concepts, drafting copy, getting legal/compliance sign-off, and final creative approval from the CMO. A team member wants to use Claude for brainstorming and drafting copy, but is unsure whether that changes the rest of the approval chain.",
    question: "What is the correct way to think about this?",
    options: [
      "Using Claude for brainstorming and drafting does not eliminate the need for the existing compliance and CMO approval steps downstream — those checks exist regardless of who or what produced the draft",
      "Since Claude helped write it, compliance and CMO approval can be skipped, because Claude's drafts are inherently free of legal risk",
      "Only the CMO approval step can be skipped, since Claude's writing quality replaces that need",
      "Using Claude anywhere in the process requires skipping brainstorming entirely, since that step becomes redundant"
    ],
    correct: 0,
    explanation: "Where content came from doesn't change why the downstream approval steps exist; compliance review and CMO sign-off are there to check legal risk and brand fit regardless of whether a human or Claude produced the first draft, so those steps should remain intact (A). Assuming Claude-authored copy is inherently compliant (B) is a risky assumption, dropping only the CMO step (C) is similarly unfounded, and D misunderstands the relationship between brainstorming with Claude's help and the rest of the process."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A small business owner wants to use Claude to write personalized thank-you notes to customers after every purchase, pulling customer names and order details from a spreadsheet she exports weekly.",
    question: "What is a reasonable way to structure this recurring task?",
    options: [
      "Export the relevant customer and order details weekly, have Claude draft personalized notes from that information, and do a quick pass to check names and details before sending",
      "Have Claude access her sales platform directly and send notes automatically with no export or review needed",
      "Write every note by hand each week, since personalization cannot be assisted by Claude in any way",
      "Send the same generic note to every customer to avoid any risk of a mismatched detail"
    ],
    correct: 0,
    explanation: "A workable recurring process is to feed Claude the relevant weekly data, let it draft the personalized notes, and do a brief check for accuracy (like a mismatched name) before sending (A). Assuming direct automatic access to her sales platform (B) isn't how this kind of workflow typically works in a business chat setting, doing it entirely by hand (C) forgoes a real time-saver, and abandoning personalization altogether (D) overcorrects against a manageable risk."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A logistics coordinator receives shipment status update emails from six different carriers, each in a different format. She currently reads each one and manually re-types the key details (tracking number, expected delivery date, delay reason) into a shared tracking spreadsheet.",
    question: "How could Claude best fit into this workflow?",
    options: [
      "Claude could extract the key details from each email she pastes in and reformat them consistently for the spreadsheet, saving her the manual re-typing while she still verifies the entries look right and does the actual entry or paste",
      "Claude should replace the shared spreadsheet with its own tracking system that other coordinators cannot access",
      "She should ask the six carriers to standardize their email formats before considering any change to her own process",
      "This task should stay fully manual, since it involves numbers that must be exact"
    ],
    correct: 0,
    explanation: "This is a clear bottleneck: repetitive extraction and reformatting across inconsistent source formats, which Claude can speed up while she retains a quick verification step given the numbers matter (A). Asking six external carriers to change their formats (C) is outside her control and not a realistic near-term fix, replacing the shared spreadsheet with a siloed system (B) breaks team visibility, and avoiding Claude because precision matters (D) ignores that a human check can still catch errors after Claude's draft extraction."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A mid-size company's IT helpdesk wants to use Claude to draft responses to internal password reset and software access requests, then automatically execute the account changes described in Claude's draft without a human in the loop, to reduce ticket resolution time.",
    question: "What is the biggest concern with this plan?",
    options: [
      "Drafting the response text is fine, but having account access changes (like resets or permission grants) executed automatically based on an AI-drafted description, without a human verifying identity and appropriateness first, creates a security risk",
      "There is no concern, since password resets are a routine, repetitive task",
      "The concern is that Claude cannot draft helpdesk responses in a professional tone",
      "Ticket resolution time is not an important metric, so this workflow change is not worth considering either way"
    ],
    correct: 0,
    explanation: "Account access changes touch security directly — verifying the requester's identity and whether the access is appropriate is exactly the kind of judgment-heavy, high-stakes check that should not be automated away, even though drafting the response text itself is a reasonable use of Claude (A). Calling this routine and therefore safe to fully automate (B) ignores the security stakes, tone is not the core issue here (C), and dismissing resolution time as unimportant (D) sidesteps the actual workflow design question being asked."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A freelance graphic designer wants to write a monthly newsletter to past clients but keeps putting it off because staring at a blank page is the hardest part for her.",
    question: "How could Claude best help with this specific friction point?",
    options: [
      "Have Claude generate a first-draft outline or rough draft based on her notes about the month's work, which she can then edit into her own voice, addressing the blank-page problem directly",
      "Have Claude decide what topics are most interesting to her past clients without her input",
      "Skip the newsletter entirely, since writer's block cannot be addressed with Claude's help",
      "Hire a full-time writer instead of considering any Claude-based solution"
    ],
    correct: 0,
    explanation: "The specific bottleneck she describes is starting from nothing, and a Claude-generated first draft or outline directly removes that barrier while she still supplies the substance and personal voice (A). Letting Claude guess at client interests without her input (B) skips the personalization that makes the newsletter valuable, abandoning the newsletter (C) doesn't solve the actual problem, and hiring staff (D) is a disproportionate response to a solvable friction point."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A construction project manager wants a repeatable weekly process for turning field notes from site supervisors into a status update for the client. Field notes arrive by text message in inconsistent formats and are often missing context that only the PM would know.",
    question: "What is the most important design consideration for this workflow?",
    options: [
      "Automating the entire process end-to-end so no one has to read the field notes personally",
      "Building in a step where the PM adds missing context or clarifies ambiguous notes before or after Claude drafts the update, since Claude cannot supply context it was never given",
      "Requiring site supervisors to stop sending text updates and switch to phone calls only",
      "Sending the raw, unedited field notes directly to the client to save time"
    ],
    correct: 1,
    explanation: "Since the field notes are often missing context only the PM has, the workflow needs a step where that context gets added before Claude can produce an accurate draft — Claude can only work with what it's given, not infer missing knowledge (B). Fully automating away human involvement (A) ignores this exact limitation, forcing a communication channel change on supervisors (C) doesn't address the underlying gap, and sending raw notes to the client (D) skips the value of synthesis altogether."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A dental office wants to use Claude to draft appointment confirmation texts and also wants Claude to make the final call on which patients qualify for a payment plan based on their financial hardship applications.",
    question: "How should these two ideas be evaluated differently?",
    options: [
      "Both are equally suitable for full automation, since both are administrative tasks",
      "Drafting routine confirmation texts is a good fit for Claude, while deciding financial hardship qualification involves sensitive judgment about individual circumstances and policy application that should be made by office staff, with Claude at most helping organize the information",
      "Neither task should involve Claude, since both involve patient information",
      "Only the payment plan decision should involve Claude, since it is more complex and could benefit from automation"
    ],
    correct: 1,
    explanation: "Not all administrative tasks carry the same stakes: confirmation texts are routine and low-risk, while hardship-based financial decisions require weighing individual circumstances against policy in a way that affects someone's finances and deserves human judgment (B). Treating both as equally automatable (A) glosses over that difference, excluding Claude from both just because patient information is involved (C) is overly broad since confirmation texts are low-risk, and prioritizing automation for the more sensitive decision (D) gets the risk assessment backwards."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A nonprofit's grant writer has historically spent two full days per grant application manually reformatting the same core program information into each funder's unique application template. She has never considered using Claude for this because she assumed AI tools were only useful for writing brand-new content, not reformatting existing material.",
    question: "What does this situation illustrate?",
    options: [
      "That Claude genuinely cannot help with reformatting tasks, confirming her original assumption",
      "An under-use of Claude: reformatting existing, approved program information into different templates is exactly the kind of repetitive task Claude could speed up significantly, with her still reviewing each version for accuracy and fit to the funder",
      "That she should stop applying to grants with different template requirements",
      "That the two-day process is actually optimal and should not be changed"
    ],
    correct: 1,
    explanation: "This is a case of under-using Claude based on a mistaken assumption — reformatting already-approved material into different structures is a repetitive, well-defined task Claude handles well, and she'd still review each version to make sure it fits the specific funder's requirements (B). The premise in A is simply incorrect, refusing funders over template differences (C) is an extreme overreaction, and calling the current two-day manual process optimal (D) ignores the clear efficiency opportunity being missed."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A small accounting firm wants to send quarterly reminder emails to clients about upcoming tax deadlines. The content is nearly identical every quarter except for the specific deadline date and a couple of client-specific notes.",
    question: "What is a sound way to make this a repeatable process using Claude?",
    options: [
      "Rewrite the reminder completely from scratch each quarter with no reused structure",
      "Create a standard template with Claude, then each quarter have Claude update the date and plug in any client-specific notes, with a quick review before sending",
      "Have Claude decide independently which clients should receive different deadline dates",
      "Discontinue the reminders since writing them is repetitive and low value"
    ],
    correct: 1,
    explanation: "Since the content is largely stable quarter to quarter, building a reusable template and having Claude handle the small recurring updates (date, specific notes) is an efficient, repeatable design, with a quick human check before sending (B). Rewriting from scratch each time (A) wastes the consistency already established, letting Claude independently assign different deadlines to clients (C) risks factual errors since deadline eligibility is a matter of client-specific tax facts, and discontinuing a useful client communication (D) throws out value rather than streamlining it."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A manufacturing plant's safety officer wants to use Claude to draft the plant's monthly safety bulletin, which includes a summary of recent incident reports and safety tips. He also wants Claude to independently decide whether a given incident is serious enough to require an OSHA-reportable filing.",
    question: "How should he treat these two tasks differently?",
    options: [
      "Both tasks should be fully delegated to Claude, since both relate to the same safety bulletin process",
      "Drafting the bulletin summary is a reasonable use of Claude with his review, but determining regulatory reportability is a compliance judgment with legal consequences that should be made by a qualified person, possibly with Claude helping organize relevant facts",
      "Neither task should involve Claude, since safety topics are always too sensitive",
      "Only the reportability determination should be automated, since it follows clear rules"
    ],
    correct: 1,
    explanation: "Drafting a routine internal bulletin is well within Claude's wheelhouse with his review, but determining whether an incident meets regulatory reporting thresholds carries legal and compliance consequences that call for a qualified person's judgment, even if Claude can help organize the relevant facts (B). Treating both tasks identically (A) ignores this real difference in stakes, excluding Claude from safety topics altogether (C) is overly broad, and D's claim that reportability 'follows clear rules' oversimplifies a determination that often involves nuanced case-by-case judgment."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A software company's customer success team wants Claude to draft renewal outreach emails for accounts approaching contract expiration. The draft pulls account health data from a report a rep exports monthly. Some reps have started skipping the export and just asking Claude to guess likely renewal risk based on the account name alone.",
    question: "What is wrong with the reps' shortcut?",
    options: [
      "Nothing is wrong, since Claude can infer renewal risk accurately from an account name alone",
      "Skipping the actual account data means Claude has no real basis for assessing renewal risk, so its guess is unreliable and could lead to a poorly targeted or inaccurate outreach message reaching a client",
      "The shortcut is fine as long as the rep still reviews the email before sending",
      "This is only a problem for large accounts, not smaller ones"
    ],
    correct: 1,
    explanation: "Claude cannot meaningfully assess account health or renewal risk from a name alone — that requires the actual usage, engagement, or billing data the report provides, so skipping the export removes the entire factual basis for the draft, undermining the whole point of a data-informed outreach email (B). This isn't something Claude can reliably infer regardless of review afterward (contradicting A and C), and the underlying problem — no real data to work from — applies regardless of account size (D)."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "An HR team is designing a new employee performance review process. They want Claude to help managers draft review narratives based on manager notes, but are debating whether to also have Claude assign the final numeric performance rating (1–5) that determines bonus eligibility.",
    question: "What is the best design choice?",
    options: [
      "Have Claude both draft narratives and assign final ratings, since consistency in ratings across the company would improve",
      "Have Claude help draft narrative language from the manager's notes and assessment, but have the manager (and typically a review layer above them) determine and own the final numeric rating, since it directly affects compensation and requires accountable human judgment",
      "Skip narrative drafting and only use Claude for the numeric rating, since consistency is the top priority",
      "Remove numeric ratings from the process altogether since they are inherently unfair"
    ],
    correct: 1,
    explanation: "Narrative drafting from the manager's own notes is a reasonable use of Claude, but a rating that directly determines bonus eligibility is a consequential, compensation-linked decision that should be owned by an accountable human, typically with additional calibration review (B). Having Claude assign ratings for the sake of 'consistency' (A, C) hands a compensation decision to a tool without the full context or accountability a manager has, and eliminating ratings entirely (D) is a much larger policy change unrelated to the actual workflow design question."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A travel agency wants to speed up writing personalized itinerary summaries for clients after a trip is booked, since agents currently spend 30–45 minutes per client typing them up from booking details already in the system.",
    question: "What is a reasonable workflow redesign?",
    options: [
      "Have Claude draft the itinerary summary from the booking details the agent provides, with the agent doing a quick review for accuracy and personal touches before sending to the client",
      "Stop sending itinerary summaries altogether since they take too long to write",
      "Have Claude access the booking system directly and email clients without agent involvement",
      "Require agents to write itineraries by hand only, since personalized client communication should never involve Claude"
    ],
    correct: 0,
    explanation: "Feeding Claude the already-known booking details to draft the summary, then having the agent review and personalize before sending, meaningfully cuts the 30–45 minute task while keeping a quality check in place (A). Dropping the service entirely (B) sacrifices something clients value, giving Claude direct system access and client-facing autonomy (C) skips necessary human oversight, and banning Claude from client communication outright (D) forgoes a clear efficiency win without a good reason."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A city government office wants to use Claude to draft plain-language summaries of new local ordinances for its public website, replacing the dense legal text with something residents can actually understand. A staff attorney would review each summary before publishing.",
    question: "Is this workflow well designed?",
    options: [
      "No, because government communications should never be simplified for the public",
      "Yes, this is a sound design: Claude helps with the accessible drafting, and a qualified reviewer checks legal accuracy before anything goes live on a public-facing site",
      "No, because the attorney review step is unnecessary and slows things down for no benefit",
      "Yes, but only if the plain-language summary replaces the actual ordinance text everywhere, including the legal record"
    ],
    correct: 1,
    explanation: "This design uses Claude for what it's good at — translating dense text into accessible language — while keeping a qualified human check on legal accuracy before public release, which is appropriate given that a misstatement of a legal requirement could genuinely mislead residents (B). Simplifying government communication for residents is generally a good goal, not something to avoid (A); the attorney review step is precisely the meaningful safeguard here, not unnecessary friction (C); and replacing the actual legal text of the ordinance itself would be inappropriate — the plain-language version should supplement, not substitute for, the official record (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A wedding planning business owner currently handles every client inquiry personally, from initial pricing questions to final contract negotiations, and is overwhelmed by inquiry volume during peak season.",
    question: "Which part of this process is most appropriate to hand off to Claude first?",
    options: [
      "Drafting responses to common initial questions (pricing ranges, availability, package details) that she can review and personalize before sending, freeing time for higher-touch conversations",
      "Negotiating final contract terms with clients directly through Claude",
      "Signing contracts on her behalf once a client agrees to terms",
      "Nothing should change, since client communication is the core of her business and should stay entirely as-is"
    ],
    correct: 0,
    explanation: "Initial, repetitive inquiries are the highest-volume and lowest-judgment part of the funnel, making them the natural first candidate to offload with her still reviewing before sending, which frees her time for the higher-stakes negotiation and relationship work (A). Delegating contract negotiation (B) or signing authority (C) to Claude hands over decisions with real business and legal consequences, and refusing any change (D) leaves her overwhelmed despite a clear, low-risk opportunity to improve."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A pharmaceutical company's regulatory affairs team is considering using Claude to draft summaries of clinical trial data for internal review meetings, feeding it the underlying data tables the team already has access to. Some team members worry this represents an inappropriate use of AI in a regulated industry.",
    question: "What is the most balanced way to evaluate this proposal?",
    options: [
      "Reject the idea outright, since any AI involvement in a regulated industry is automatically inappropriate",
      "Approve it, but only if Claude's drafts are used for internal, informal review meetings rather than in place of the team's own analysis, with qualified staff still reviewing the summaries and doing the actual regulatory judgment work themselves",
      "Approve it and let the drafted summaries be submitted directly to regulators without additional review, since the underlying data was already correct",
      "Approve it only if the team stops looking at the underlying data tables themselves"
    ],
    correct: 1,
    explanation: "Using Claude to help draft internal summaries from data the team already has can be a reasonable time-saver as long as it supports, rather than replaces, the team's own analysis and judgment, and qualified staff still review the content before it's relied upon (B). A blanket ban ignores a legitimate use case (A), submitting AI-drafted material straight to regulators without review (C) is a serious risk regardless of whether the source data was accurate, and having the team stop engaging with the underlying data (D) would remove the expertise the process depends on."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A recruiting coordinator manually copies candidate information from resumes into a spreadsheet tracker, then separately writes a short note describing each candidate's background for the hiring manager.",
    question: "What is a reasonable way to streamline this?",
    options: [
      "Have Claude read each resume (that she shares) and draft both the structured spreadsheet entry and a short candidate summary at the same time, which she then reviews and copies into the tracker",
      "Have Claude make the final hiring decision for each candidate to save the most time",
      "Stop tracking candidates in a spreadsheet altogether",
      "Only use Claude for candidates she has already decided to reject, since accepted candidates deserve more careful handling"
    ],
    correct: 0,
    explanation: "Having Claude draft both the structured entry and the narrative summary from the same resume in one pass reduces duplicated manual work, while she still checks accuracy before entering it into the tracker (A). Delegating the hiring decision itself (B) hands over a judgment call with real consequences for both the candidate and company, abandoning structured tracking (C) removes a useful record-keeping tool, and applying Claude only to rejected candidates (D) has the logic backwards since it's an efficiency task, not a differential-care one."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional sales team leader wants every rep to use Claude the same way when drafting post-call summary notes for the CRM, but currently each rep asks Claude something different, resulting in wildly inconsistent notes that make it hard to compare accounts.",
    question: "What is the best fix for this problem?",
    options: [
      "Tell reps to stop using Claude for call notes altogether",
      "Create a shared prompt or note template that all reps use when asking Claude to draft call summaries, so the output is consistent across the team regardless of who writes it",
      "Have a manager rewrite every single note personally after the rep submits it",
      "Allow the inconsistency to continue, since call notes are for internal use only and consistency does not matter"
    ],
    correct: 1,
    explanation: "This is a classic team-scaling problem: individual habits led to inconsistent results, and the fix is a shared template or standard set of instructions so the workflow produces comparable output no matter which rep uses it (B). Abandoning Claude for this task (A) discards a real time-saver without addressing the root cause, having a manager manually rewrite every note (C) doesn't scale and recreates the original workload, and dismissing consistency as unimportant (D) ignores that comparing notes across accounts is exactly the stated goal."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A company's internal communications team publishes an all-staff newsletter. They have Claude draft the full newsletter, including a leadership Q&A section based on notes from an interview with the CEO, and it goes out to all 3,000 employees after only a spelling check, with no substantive review of the Q&A content.",
    question: "What is the biggest gap in this workflow?",
    options: [
      "There is no gap, since spelling accuracy is the only thing that matters in an all-staff communication",
      "There is no substantive check that the Q&A section accurately reflects what the CEO actually said and intended, which matters because a misrepresented quote or nuance reaching all staff could cause real confusion or reputational issues",
      "The newsletter should be written entirely by the CEO personally with no assistance",
      "The gap is that Claude was used for the Q&A section instead of only the routine announcements"
    ],
    correct: 1,
    explanation: "A spelling check does not verify substantive accuracy, and a section attributed to the CEO's own words needs a content check to confirm it accurately reflects what was actually said, since a distorted quote reaching thousands of employees carries real reputational and trust risk (B). Claiming only spelling matters (A) ignores this substantive risk entirely, requiring the CEO to personally write the whole newsletter (C) is a disproportionate fix, and D mistakenly suggests the issue is Claude's involvement rather than the missing review step."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A yoga studio owner wants to post on social media three times a week but often skips it because coming up with captions takes too long, even though she always knows what photo or video she wants to post.",
    question: "How should Claude best fit into her workflow?",
    options: [
      "Have Claude generate caption drafts based on the photo/video topic she describes, which she quickly edits into her own voice before posting, directly addressing the time bottleneck",
      "Have Claude decide her entire posting schedule and content calendar without her input",
      "Have Claude automatically post to her accounts on a schedule without her ever seeing the captions first",
      "Give up on consistent posting since caption writing cannot be sped up"
    ],
    correct: 0,
    explanation: "Since she already knows what she wants to post and captioning is the specific bottleneck, having Claude draft captions she then personalizes directly solves the friction point while keeping her voice and final judgment in the post (A). Letting Claude own the whole content calendar (B) removes her strategic input, auto-posting without her seeing the caption first (C) risks an off-brand or inaccurate post going out unreviewed, and giving up (D) ignores a real, solvable fix."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An HR benefits administrator fields the same handful of employee questions about health insurance enrollment every open enrollment season. She wants to design a repeatable process using Claude for next year rather than answering each email individually again.",
    question: "What is a sound approach?",
    options: [
      "Build a set of pre-approved, Claude-assisted answers to the common questions (reviewed by benefits and legal ahead of time) that she can quickly send or adapt, while routing genuinely unusual questions to her personal attention",
      "Have Claude answer every employee benefits question in real time going forward without any human review of the underlying answers",
      "Stop answering repeat questions and just point everyone to the benefits handbook",
      "Keep responding to each email individually from scratch every year, since the questions might change slightly"
    ],
    correct: 0,
    explanation: "Building pre-reviewed, reusable answers for the recurring questions — vetted once by benefits and legal — creates a repeatable, low-effort process for the common cases while she still personally handles anything unusual, which is a much better use of her time (A). Letting Claude answer live with no review of the underlying guidance (B) is risky for benefits questions with real financial and coverage implications, deflecting everyone to a handbook (C) ignores why people are asking directly, and treating every year as fully novel (D) forgoes the efficiency of building on a known, mostly stable set of questions."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An operations manager at a warehouse wants Claude to help draft the weekly shift schedule by suggesting an assignment of employees to shifts based on a list of availability and requested time off she provides, which she then finalizes.",
    question: "Is this a reasonable way to use Claude in this workflow?",
    options: [
      "Yes, this is reasonable: Claude can help organize a first-pass schedule suggestion from clearly defined inputs, while she retains final judgment for fairness, labor rules, and edge cases before publishing it",
      "No, scheduling should never involve any AI assistance since it affects people's paychecks",
      "Yes, but only if the schedule is published automatically without her review, to save the most time",
      "No, because Claude cannot process a list of names and availability"
    ],
    correct: 0,
    explanation: "Generating a first-pass schedule from clear inputs like availability and time-off requests is a reasonable use of Claude, especially since she still reviews for fairness, labor compliance, and any edge cases before it's finalized and published (A). Excluding AI from scheduling entirely (B) overstates the risk given she retains final control, publishing without her review (C) removes the necessary check on a paycheck-affecting document, and D is simply incorrect about the underlying capability."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A public school district's communications office wants to use Claude to draft responses to parent emails, including sensitive ones about individual student behavioral incidents, and have front-office staff send them without any input from the teacher or counselor involved in the incident.",
    question: "What is the core issue with this design?",
    options: [
      "Front-office staff sending emails drafted by Claude about a specific student incident, without input from the teacher or counselor who has firsthand knowledge, risks inaccuracies or missing important context in a sensitive, individual situation",
      "There is no issue, since front-office staff are capable of sending any email",
      "The issue is that Claude should not be used for any parent communication under any circumstances",
      "The issue is that emails to parents should always be handled by the superintendent personally"
    ],
    correct: 0,
    explanation: "A specific behavioral incident involves individual facts and context that only the teacher or counselor directly involved would know, so routing it through front-office staff with no input from that person risks an inaccurate or incomplete account going to a parent about their child (A). The concern isn't staff competence generally (B), routine parent communication (like schedule reminders) is a reasonable use of Claude, so a blanket ban (C) overreaches, and requiring superintendent-level involvement for every parent email (D) is a disproportionate fix unrelated to the actual gap identified."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A boutique consulting firm wants to standardize how consultants write client meeting recap emails, since currently every consultant's recap looks different in length, tone, and structure.",
    question: "What is the best step to bring consistency across the team?",
    options: [
      "Have each consultant continue writing recaps in their own personal style, since consistency does not matter for internal team habits",
      "Create a shared recap template and standard instructions for using Claude to draft from meeting notes, so recaps are structurally consistent across consultants while still reviewed and personalized before sending to the client",
      "Assign one consultant to write every client's recap regardless of who attended the meeting",
      "Eliminate recap emails, since consultants clearly cannot agree on a format"
    ],
    correct: 1,
    explanation: "A shared template plus consistent instructions for using Claude gives every consultant the same starting structure while they still personalize and review before it reaches the client, solving the team-wide consistency problem without losing quality control (B). Leaving it as-is (A) perpetuates the inconsistency the firm wants fixed, having one consultant write every recap regardless of meeting attendance (C) creates an information bottleneck and inaccuracy risk, and eliminating recaps altogether (D) discards something clients likely value."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A veterinary clinic wants to use Claude to draft post-visit summary handouts for pet owners, based on notes the vet dictates after each appointment. They are debating whether the vet needs to review the handout before it's given to the owner, given time pressure between appointments.",
    question: "What is the best approach given the time pressure?",
    options: [
      "Skip review entirely and hand every summary directly to owners, since dictated notes are always accurate",
      "Have the vet do a brief, fast review of the drafted handout (not a full rewrite) before it's given to the owner, since it summarizes medical guidance for a pet's care and an error could affect how the owner follows up",
      "Have the vet techs, rather than the vet, make all edits and decide what to send, since they have more available time",
      "Discontinue after-visit handouts, since the review step under time pressure is not sustainable"
    ],
    correct: 1,
    explanation: "Given that the handout conveys medical guidance affecting how an owner cares for their pet, a quick review by the vet — not a full rewrite, just a check for accuracy — is a reasonable middle ground under time pressure, catching errors without erasing the time savings from drafting (B). Skipping review because dictation is assumed always accurate (A) ignores that transcription and drafting errors happen, delegating medical accuracy checks to techs instead of the vet (C) misplaces accountability, and discontinuing a useful service over a solvable friction point (D) is an overreaction."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A financial advisory firm's compliance officer is reviewing a proposed workflow: advisors use Claude to draft personalized investment recommendation letters to clients, and the letters go out after only the advisor's own review, with no separate compliance check, because compliance review was seen as slowing things down too much.",
    question: "What is the concern from a workflow design standpoint?",
    options: [
      "There is no concern, since the advisor's own review is equivalent to a compliance review",
      "Removing the compliance review from personalized investment recommendation letters removes an independent check specifically designed to catch regulatory or suitability issues that the advisor, who wrote or approved the letter, may not catch themselves",
      "The concern is that advisors should not be involved in reviewing their own client letters at all",
      "The concern is that Claude should not be used to draft any client-facing investment content"
    ],
    correct: 1,
    explanation: "Compliance review exists as an independent check precisely because the person who wrote or approved content is not well positioned to catch their own regulatory or suitability blind spots, so removing it for speed eliminates a distinct and important safeguard, not a redundant one (B). Treating the advisor's own review as equivalent (A) misunderstands why compliance review exists as a separate function, excluding advisors from reviewing their own letters (C) isn't the issue at all, and banning Claude from drafting entirely (D) conflates a legitimate drafting use with the actual missing safeguard."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A community theater company's volunteer coordinator wants to send personalized thank-you emails to each volunteer after a show closes, mentioning their specific role, but has 60 volunteers and limited time.",
    question: "What is a practical way to use Claude here?",
    options: [
      "Provide Claude with each volunteer's name and role, have it draft the personalized notes, and do a quick scan for accuracy before sending, rather than writing all 60 by hand",
      "Send the same identical email to all 60 volunteers to avoid any risk of a mismatched detail",
      "Have Claude decide which volunteers deserve a thank-you email and which do not",
      "Skip the thank-you emails this year, since personalizing 60 of them is too time-consuming even with help"
    ],
    correct: 0,
    explanation: "Supplying the specific names and roles lets Claude draft genuinely personalized notes at scale, with a quick accuracy check before sending — solving the exact volume-versus-time problem described (A). A single generic email (B) loses the personalization value the coordinator is trying to achieve, letting Claude decide who deserves thanks (C) hands over a relationship decision that should stay with the coordinator, and skipping the gesture entirely (D) ignores that Claude removes most of the friction that made it impractical before."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A commercial insurance broker wants to use Claude to draft comparison summaries of different policy quotes for clients, showing coverage differences side by side. He plans to send these directly to clients without reviewing them, reasoning that the underlying numbers come straight from the insurers' own quote documents.",
    question: "What is the flaw in his reasoning?",
    options: [
      "There is no flaw, since accurate source numbers guarantee an accurate summary",
      "Even with accurate source numbers, a drafting or interpretation error could occur when translating detailed policy documents into a simplified comparison, and an unreviewed error reaching a client could lead to a real misunderstanding about their coverage",
      "The flaw is that Claude cannot read or process insurance quote documents at all",
      "The flaw is that comparison summaries should never be simplified from the original documents"
    ],
    correct: 1,
    explanation: "Accurate source data does not guarantee an accurate summary — mistakes can happen in how information gets condensed, categorized, or compared, and for something like insurance coverage, an unreviewed error reaching a client could lead them to misunderstand what they're actually buying, which is exactly why a review step matters here (B). Assuming accurate inputs guarantee an accurate output (A) ignores this transformation risk, B does not depend on any claim about Claude's capabilities (contradicting C), and simplified comparisons are broadly useful and appropriate as long as they're checked, not inherently improper (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A museum's education department runs school tour bookings. Staff currently reply to booking inquiries, confirm dates, and send a pre-visit information packet, all as three separate manual steps that often get done at different times, sometimes days apart.",
    question: "What is a good way to redesign this into a smoother process?",
    options: [
      "Have Claude draft the reply, confirmation, and info packet content together as soon as a booking inquiry comes in complete with the relevant details, so staff can review and send them as a single, timely response instead of three disjointed ones",
      "Combine the three communications into one but skip having staff review any of it before sending",
      "Keep the three steps fully separate and manual, since combining communication types risks confusing schools",
      "Automatically confirm every booking request without checking date availability first"
    ],
    correct: 0,
    explanation: "The friction here is fragmentation across time, not the content itself, so having Claude draft all three pieces together once the details are known lets staff review and send a single, prompt, cohesive response instead of scattered follow-ups (A). Removing staff review entirely (B) loses the accuracy check for a public-facing booking confirmation, keeping the steps artificially separate (C) preserves the exact friction being addressed, and skipping availability verification (D) risks confirming a date that isn't actually open."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A staffing agency wants to fully automate its candidate-to-job matching process: Claude reads resumes and job descriptions, ranks candidates, and automatically sends offer-interview invitations to the top three ranked candidates for each role with no recruiter reviewing the rankings first.",
    question: "What is the strongest reason to add a human review step before invitations go out?",
    options: [
      "Recruiters enjoy the matching process and would be bored without it",
      "Ranking and shortlisting candidates involves judgment calls (e.g., weighing nontraditional experience, avoiding pattern-based unfairness) that carry real consequences for candidates and clients, so an unreviewed automated ranking risks poor or unfair matches reaching clients undetected",
      "Claude cannot read resumes or job descriptions at all, so this task should not involve Claude",
      "There is no reason to add a review step, since ranking is purely objective when both resumes and job descriptions are text"
    ],
    correct: 1,
    explanation: "Candidate ranking is not a purely mechanical text-matching exercise — it involves judgment calls about what experience actually qualifies someone, and getting it wrong has real consequences for candidates' livelihoods and the agency's client relationships, which is exactly why an unreviewed automated ranking is risky (B). Recruiter enjoyment (A) isn't the substantive concern, Claude can work with resume and job description text (ruling out C), and calling the task 'purely objective' (D) understates the genuine judgment involved in evaluating fit."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A physical therapy clinic's front desk staff spend time each day manually typing appointment reminder texts for the next day's patients, copying names and times from the scheduling system into a texting app one at a time.",
    question: "What does this situation suggest for workflow improvement?",
    options: [
      "This is exactly the kind of repetitive, low-judgment task that a template or Claude-assisted draft (with staff doing a quick check before sending) could speed up significantly",
      "This task should stay exactly as it is, since appointment reminders are too important to ever change",
      "The front desk staff should stop sending reminder texts altogether to save time",
      "The clinic should switch to only phone calls, which would take even longer per patient"
    ],
    correct: 0,
    explanation: "Repetitive, template-like tasks with clear source data (names and times already in the scheduling system) are a strong fit for streamlining with a consistent template or Claude-drafted batch, with a quick human check before sending (A). Insisting nothing should change simply because reminders matter (B) doesn't follow — importance is actually a reason to make the process more reliable, dropping reminders (C) would likely increase no-shows, and switching to phone calls (D) would make the task slower, not faster."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "An e-commerce brand's customer service team wants Claude to draft responses to product return requests. Returns under the standard 30-day policy are handled with a consistent, pre-approved process; returns outside that window require a judgment call about whether to make an exception.",
    question: "How should the workflow treat these two types of requests differently?",
    options: [
      "Both should be handled identically, since Claude drafts a response either way",
      "Standard-policy returns can use a fairly light-touch review process since the outcome is already policy-defined, while exception requests outside the window should get more deliberate human judgment before a response is sent, since that decision is not simply the standard policy applied",
      "Only the exception requests should ever be handled by Claude, since routine requests do not need any assistance",
      "Neither type should involve Claude, since all return decisions carry some risk"
    ],
    correct: 1,
    explanation: "The risk profile differs meaningfully between the two: standard-policy returns follow a defined, pre-approved rule so a lighter review is reasonable, while exception requests require someone to actually weigh whether to deviate from policy, which deserves more deliberate attention before the response goes out (B). Treating both the same (A) ignores this real difference in judgment required, restricting Claude to only the harder case (C) has the efficiency logic backwards, and excluding Claude from both (D) discards a legitimate time-saver for the well-defined, lower-risk case."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A mid-size accounting firm's tax department is designing next season's process. They want Claude to draft client-facing responses to routine tax question emails, but are torn between two designs: (1) Claude drafts and a preparer reviews before sending, or (2) Claude drafts and sends automatically, with a preparer spot-checking a sample of sent emails afterward for quality assurance.",
    question: "Which design is more appropriate for this context, and why?",
    options: [
      "Design 2, since tax questions from clients are routine enough that after-the-fact spot-checking is sufficient",
      "Design 1, because tax guidance has real financial and compliance consequences for clients, and a review before sending catches an error before a client acts on incorrect information, whereas after-the-fact spot-checking only catches errors after the client has already potentially acted",
      "Design 2, since it saves more preparer time and preparers are highly experienced",
      "Neither design is appropriate; tax question emails should never be answered by email at all"
    ],
    correct: 1,
    explanation: "Tax guidance carries real consequences if wrong, and a before-send review catches an error while there's still time to fix it, whereas spot-checking after the email has gone out only surfaces problems once a client may have already relied on incorrect guidance (B). Design 2's appeal (A, C) trades away exactly the protection that matters most for this kind of content, and refusing to answer routine tax questions by email at all (D) is an extreme response that ignores a workable middle-ground design."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A landscaping company owner wants to write a short weekly \"tip of the week\" post for his customer email list, but he says the actual research and writing is what takes the most time, not deciding on the topic (he already knows which season-specific tip he wants to share).",
    question: "What is the most efficient way for him to use Claude given this specific bottleneck?",
    options: [
      "Have Claude generate topic ideas each week, since topic selection is the hardest part",
      "Tell Claude the tip he already has in mind and have it draft the explanation and writing, since that is the actual bottleneck he described, then he reviews before sending",
      "Have Claude fully manage the customer email list including who receives it",
      "Skip using Claude since coming up with tips is not something it can help with anyway"
    ],
    correct: 1,
    explanation: "He explicitly said topic selection isn't the problem — the drafting and research write-up is, so the most efficient design targets that actual bottleneck by having Claude draft from the topic he already knows, with him reviewing before sending (B). Generating topic ideas (A) solves a problem he doesn't have, having Claude manage list membership (C) is an unrelated administrative task, and D mischaracterizes both the bottleneck and Claude's ability to help with it."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional food bank's volunteer manager wants to build a repeatable process for onboarding new volunteers: send a welcome email, share the training schedule, and collect required waiver forms. She currently does all three manually and inconsistently depending on how busy she is.",
    question: "What is the best way to bring consistency to this recurring process?",
    options: [
      "Create a standard onboarding sequence with Claude-drafted templates for the welcome email and schedule reminder that go out the same way for every new volunteer, while keeping waiver form collection as a tracked administrative step she or a system handles directly",
      "Skip the welcome email and training schedule reminder altogether, since consistency is hard to achieve manually",
      "Have Claude collect and store the signed waiver forms directly",
      "Personally rewrite a new welcome email from scratch for every volunteer to keep things highly individualized"
    ],
    correct: 0,
    explanation: "A standard, Claude-assisted template for the repetitive communications (welcome, schedule) creates consistency regardless of how busy she is, while waiver collection — which involves signed legal documents and recordkeeping — reasonably stays a tracked administrative step handled directly rather than something to hand off for drafting (A). Dropping the communications (B) removes value rather than fixing consistency, having Claude collect and store signed waivers (C) misapplies a drafting tool to a recordkeeping/compliance task, and writing each welcome email fully from scratch (D) undermines the exact consistency and time-saving goal she's trying to achieve."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A small architecture firm wants Claude to help draft written responses to routine client questions about project timelines, pulling status information from a shared project tracker the team updates weekly. An architect notices Claude's response quoted a completion date that was three weeks out of date.",
    question: "What is the most likely cause and appropriate fix?",
    options: [
      "Claude fundamentally cannot handle project timeline information, so this task should be abandoned entirely",
      "The tracker information given to Claude was probably stale at the time of drafting; the fix is to ensure whoever asks Claude to draft the response provides the most current tracker data, and to keep a habit of double-checking dates before sending given how directly they affect client expectations",
      "The firm should stop updating the project tracker since it is clearly unreliable",
      "The response should have been sent as-is, since minor date discrepancies do not matter to clients"
    ],
    correct: 1,
    explanation: "Claude's draft can only be as current as the information it's given, so an out-of-date quote most likely reflects stale input data rather than a flaw in Claude itself, and the fix is ensuring current data is provided along with a quick date check before sending, since timeline accuracy directly affects client expectations (B). Abandoning the task entirely (A) overreacts to what is likely an input problem, blaming the tracker itself (C) misdiagnoses the issue, and treating a three-week date error as immaterial to a client (D) understates the real impact of timeline miscommunication in project-based work."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A hospital's patient experience team wants to design a workflow where Claude analyzes open-ended comments from patient satisfaction surveys and drafts a quarterly themes report for leadership. They are debating whether to also have Claude decide which specific complaints are urgent enough to route immediately to a department head, bypassing the quarterly cycle.",
    question: "How should these two capabilities be evaluated?",
    options: [
      "Both should be delegated fully to Claude, since both involve analyzing the same survey text",
      "Quarterly theme synthesis is a reasonable use of Claude with team review before it reaches leadership, but flagging individual complaints as urgent enough for immediate escalation is a higher-stakes judgment call (a safety or serious care issue could be missed or over-triggered) that should include a human checkpoint even if Claude helps surface likely candidates",
      "Neither task should involve Claude, since patient feedback is always too sensitive",
      "Only the urgent-routing decision should be automated, since speed matters most for urgent issues"
    ],
    correct: 1,
    explanation: "Quarterly synthesis for a leadership report is a lower-stakes, batch task well suited to Claude with a review step, but deciding whether an individual comment signals something urgent enough to escalate immediately is exactly the kind of judgment call where a missed or over-triggered flag has real consequences, so it warrants a human checkpoint even while Claude helps surface likely candidates quickly (B). Treating both identically (A) ignores this real difference in stakes and error cost, excluding Claude from patient feedback entirely (C) forgoes genuine value in the lower-stakes synthesis task, and fully automating urgent escalation for speed alone (D) prioritizes speed over the accuracy that matters most when something urgent is at stake."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A gym owner wants to send a monthly email to members highlighting a featured class and a member success story, but currently forgets to send it some months because it always feels like it requires blocking off a big chunk of time to write from scratch.",
    question: "What change would most directly address the actual reason the emails get skipped?",
    options: [
      "Have Claude draft the email from a quick note about the featured class and success story, cutting the time investment enough that it becomes easy to fit in and send after a quick review",
      "Switch to sending the email only once a year instead of monthly",
      "Have Claude decide which member's story to feature without the owner's input",
      "Stop personalizing the email and send a generic template with no monthly content"
    ],
    correct: 0,
    explanation: "The stated reason emails get skipped is the time commitment of writing from scratch, so shrinking that time investment by having Claude draft from a quick note directly addresses the actual bottleneck, while he still reviews before sending (A). Reducing frequency (B) sidesteps the problem instead of solving it, letting Claude choose which member to feature (C) hands off a relationship decision that benefits from his personal knowledge, and stripping out the featured content (D) removes the part members likely find most engaging."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A commercial cleaning company's operations lead wants to use Claude to draft responses to new client bid requests, which include pricing based on square footage and service frequency using the company's standard rate card. He wants the drafted response to go out with pricing filled in automatically, without him checking the numbers, since the rate card doesn't change often.",
    question: "What is the risk in his plan?",
    options: [
      "There is no risk, since the rate card rarely changes",
      "Even with a stable rate card, an error could occur in how the specific job's square footage or frequency was applied to the rates in that particular draft, and an unchecked pricing mistake sent to a prospective client could create a binding quote issue or lost credibility",
      "The risk is that Claude cannot read a rate card at all",
      "The risk only applies to large clients, not smaller ones"
    ],
    correct: 1,
    explanation: "A stable rate card doesn't guarantee the specific calculation was applied correctly to a particular job's details in a given draft, and since a price quote can function as a real commitment to a prospective client, an unchecked math or application error could create a costly binding issue or damage credibility (B). Rate card stability (A) doesn't eliminate case-specific application errors, this isn't a claim about Claude's ability to process a rate card (ruling out C), and the risk of a bad quote applies regardless of client size (D)."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A university admissions office wants to use Claude to draft personalized outreach emails to prospective students who requested information, based on fields they filled out (intended major, extracurricular interests). The office is deciding whether admissions counselors should review each drafted email before sending, given the volume (thousands per year).",
    question: "Given the volume, what is a sound approach?",
    options: [
      "Send every email without review, since the volume makes individual review impractical and delays would hurt the recruiting timeline",
      "Establish clear guardrails and a template structure Claude drafts within, then use a practical review approach such as counselors reviewing a meaningful sample and any email touching on sensitive topics (e.g., financial aid specifics), rather than either full manual review of thousands or none at all",
      "Stop personalizing outreach emails entirely and send one identical email to all prospective students to avoid needing any review",
      "Require full individual review of every single email regardless of the volume, even if it delays outreach significantly"
    ],
    correct: 1,
    explanation: "At high volume, neither zero review nor full manual review of every email is practical or necessary; a workable middle ground uses tight guardrails and templates to constrain what Claude can produce, combined with meaningful sampling and mandatory review for higher-sensitivity content like financial aid, which manages risk without recreating the original bottleneck (B). Skipping review entirely at this volume (A) risks systemic errors going undetected, dropping personalization altogether (C) loses recruiting value, and requiring full review of thousands of emails (D) simply reintroduces the scalability problem the office is trying to solve."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A mid-size manufacturing company's procurement team wants Claude to draft comparison memos of vendor bids, summarizing pricing, delivery timelines, and terms from bid documents team members upload. Leadership then approves the recommended vendor based on the memo alone, without anyone re-checking the memo against the original bid documents.",
    question: "What gap should this workflow address?",
    options: [
      "Claude should not be used to summarize vendor bids under any circumstances, since procurement decisions are always high-stakes",
      "There should be a step where a team member with knowledge of procurement verifies the memo's key figures and characterizations against the original bid documents before it's used as the basis for a leadership decision, since a summarization error could lead to selecting the wrong vendor",
      "Leadership should read the full original bid documents themselves instead of any summary",
      "There is no gap, since the memo is drafted directly from documents the team uploaded"
    ],
    correct: 1,
    explanation: "A summarization error (a mischaracterized term, a wrong figure carried over) could lead leadership to approve a vendor based on inaccurate information, so a verification step by someone with procurement knowledge before the memo drives a real decision is the missing safeguard, while still preserving the time savings from having a synthesized memo in the first place (B). Banning summarization outright (A) forgoes a real efficiency benefit, having leadership read every full bid document (C) defeats the purpose of the memo, and D overlooks that being drafted from the right source documents doesn't guarantee an error-free summary."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A small law firm's paralegal wants to use Claude to draft a first pass at organizing a client's uploaded documents into a labeled folder structure by document type, which she then double-checks and adjusts.",
    question: "Is this a reasonable use of Claude in the workflow?",
    options: [
      "Yes, this is reasonable: organizing and labeling by document type is a well-defined task Claude can speed up, and her review catches any misclassifications before the structure is finalized",
      "No, because paralegals should never use any tool to help organize client documents",
      "Yes, but only if she skips reviewing the folder structure afterward to save time",
      "No, because Claude cannot help with any task involving legal documents"
    ],
    correct: 0,
    explanation: "Sorting and labeling by document type is a bounded, relatively low-risk organizational task, and her follow-up check catches misclassifications before anything is finalized, making this a sound and efficient use of Claude in the workflow (A). A blanket rule against any tool assistance (B) is overly restrictive without a specific reason, skipping her review (C) removes the safeguard that makes this workflow trustworthy, and D incorrectly implies Claude cannot help with any legal-adjacent task, when organizational support like this is a reasonable application."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A boutique hotel's guest services manager wants a repeatable process for responding to online reviews. Positive reviews get a brief thank-you reply; negative reviews sometimes involve specific service failures that need investigation before responding.",
    question: "How should the workflow differ between these two review types?",
    options: [
      "Both types should get the exact same fast, templated Claude-drafted reply with no distinction",
      "Positive reviews can use a Claude-drafted templated thank-you with light review, while negative reviews involving a specific complaint should involve someone checking what actually happened before Claude drafts (or the manager finalizes) a response, since responding without knowing the facts risks an inaccurate or tone-deaf reply",
      "Neither review type should ever get a response, since responding could invite further complaints",
      "Only negative reviews should get automated responses, since positive reviews do not need any acknowledgment"
    ],
    correct: 1,
    explanation: "Positive reviews are low-risk and well suited to a quick templated reply, but a specific negative review often references a real incident that needs to be understood first, since replying without knowing what actually happened risks an inaccurate or dismissive-sounding response that could make things worse (B). Treating both identically (A) ignores that real difference in what's needed, avoiding responses altogether (C) forgoes an opportunity to manage reputation and guest relationships, and skipping acknowledgment of positive reviews (D) has the logic backwards since those are actually the easier, lower-risk case to respond to quickly."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A national nonprofit is scaling a workflow across 30 regional chapters: each chapter uses Claude to draft grant reports for their local funders. Headquarters notices wide variation in report quality and consistency between chapters, since each chapter director set up their own way of using Claude independently.",
    question: "What is the best way to fix the team-wide inconsistency?",
    options: [
      "Have headquarters personally rewrite every chapter's grant report before submission",
      "Develop and distribute a standardized template and shared set of instructions for how chapters should use Claude to draft grant reports, along with guidance on what to check before submitting, so quality is more consistent across chapters rather than dependent on each director's individual approach",
      "Ban the use of Claude for grant reports across all chapters going forward",
      "Allow the inconsistency to continue, since each chapter serves a different local community"
    ],
    correct: 1,
    explanation: "This is a workflow-scaling problem: letting each of 30 chapters independently improvise led to wide quality variation, and the fix is a standardized template and shared usage guidance (including what to check before submitting) so results are consistent across the organization rather than dependent on any one director's habits (B). Headquarters personally rewriting every report (A) doesn't scale to 30 chapters, banning Claude outright (C) discards a genuine efficiency tool rather than fixing how it's used, and tolerating the inconsistency because communities differ (D) conflates local content differences with the actual problem, which is process inconsistency."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A photography studio owner wants to send personalized follow-up emails to clients a week after their photo session, thanking them and letting them know when their edited photos will be ready, using details from her booking notes.",
    question: "What is a sound way to design this recurring task?",
    options: [
      "Provide the client details and session notes to Claude, have it draft the personalized follow-up, and review quickly before sending, rather than typing each one individually",
      "Send a mass, unpersonalized email to all clients regardless of when their session occurred",
      "Have Claude automatically determine and communicate the exact photo delivery date without her confirming it first",
      "Stop sending follow-up emails since personalizing them individually takes too much time"
    ],
    correct: 0,
    explanation: "Feeding Claude the specific client and session details to draft a personalized follow-up, then doing a quick review before sending, captures the time savings while keeping accuracy in check (A). A generic mass email (B) loses the personal touch that makes the follow-up valuable, letting Claude state a delivery date without her confirming it first (C) risks communicating an inaccurate commitment to the client, and dropping the follow-up altogether (D) forgoes value that Claude's help was specifically meant to make feasible."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A corporate training department wants Claude to help draft quiz questions for a new employee compliance training module, based on the training content they provide. Someone suggests also having Claude decide the passing score threshold and automatically issue completion certificates without any human sign-off.",
    question: "How should the department treat these two requests?",
    options: [
      "Drafting quiz questions from provided training content is a reasonable use of Claude with a review pass, but setting the passing threshold and certifying completion involves policy judgment and compliance accountability that should involve a human decision-maker, not full automation",
      "Both tasks are equally appropriate to fully automate, since both relate to the same training module",
      "Neither task should involve Claude, since compliance training is inherently too sensitive",
      "Only the certificate issuance should be automated, since passing thresholds require more careful thought"
    ],
    correct: 0,
    explanation: "Drafting quiz questions from source content is a bounded, reviewable task well suited to Claude, but setting the passing threshold and certifying compliance completion are policy decisions with real accountability implications (e.g., regulatory training records) that should involve a human decision-maker rather than being fully automated (A). Treating both as equally automatable (B) ignores this difference in stakes, excluding Claude entirely (C) discards a legitimate use for the drafting portion, and D's suggestion to automate only certificate issuance gets the risk assessment backwards, since that's arguably the more consequential of the two."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A boutique retail store owner uses Claude to draft responses to customer emails about order status, pulling tracking information from her shipping platform's export. She's proud that she's automated the whole thing: Claude reads the export, drafts the reply, and sends it, and she only checks in once a week to skim a handful of sent emails.",
    question: "What would most improve this workflow's reliability?",
    options: [
      "Nothing needs to change, since weekly skimming is an adequate check for any volume of automated customer emails",
      "Given that pricing, addresses, and order details change per customer, a full replacement of the weekly skim with either upfront review before sending, or at minimum a much tighter and more immediate sampling process, would catch errors before or shortly after they reach customers rather than up to a week later",
      "She should stop checking in at all, since the process has been working so far",
      "She should personally write every single customer email by hand going forward"
    ],
    correct: 1,
    explanation: "Order-specific, data-driven emails carry per-customer risk of a mismatched detail, and a once-a-week skim means an error could reach many customers before being caught, so tightening the review timing (either before sending or via prompt, frequent sampling) closes that gap without discarding the automation's benefits (B). A once-weekly skim is not adequate given how quickly errors can compound in a live customer-facing channel (contradicting A), removing checks altogether (C) makes things worse, and reverting to fully manual replies (D) is a bigger step back than the situation calls for."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A city parks department wants to design a process for responding to public records requests. Simple requests (e.g., \"send me the mowing schedule\") are common and low-risk. Complex requests sometimes touch on pending litigation or personnel matters and require legal review regardless of who drafts the response.",
    question: "What is the best workflow design?",
    options: [
      "Use Claude to draft responses to simple, routine requests with light staff review, while routing anything touching litigation or personnel matters through legal review before any response is sent, regardless of how the draft was produced",
      "Have Claude draft and send responses to all requests, including those touching litigation, since drafting speed matters most",
      "Require legal review of every single request, including the simplest routine ones, to be maximally safe",
      "Refuse to use Claude for any public records request, since government records are always high-risk"
    ],
    correct: 0,
    explanation: "Matching the level of review to the actual risk is the sound design: routine, low-risk requests can move quickly with light staff review, while requests touching litigation or personnel — which carry legal exposure regardless of how the draft was produced — should go through legal review before anything is sent (A). Sending litigation-adjacent responses without that legal check (B) creates real legal risk, requiring full legal review of every routine request (C) creates unnecessary bottlenecks without a corresponding safety benefit, and banning Claude from all public records work (D) discards a real efficiency gain on the clearly low-risk requests."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A personal trainer wants to create individualized workout plan summaries for clients each month based on notes she takes during sessions about their goals and progress.",
    question: "What is a reasonable way to bring Claude into this process?",
    options: [
      "Share her session notes with Claude, have it draft a written summary of the plan and progress, and review it for accuracy against what she actually observed before giving it to the client",
      "Have Claude design the workout plans independently without any input from her notes or observations",
      "Stop writing summaries for clients since doing so individually takes too much time",
      "Have Claude message clients directly to discuss their progress without her involvement"
    ],
    correct: 0,
    explanation: "Feeding Claude her actual session notes to draft a written summary, then checking it against what she personally observed, combines her expertise and firsthand knowledge with Claude's drafting speed (A). Having Claude design plans without her input (B) removes the professional judgment that makes the plan appropriate for that specific client, dropping the summaries altogether (C) forgoes a service clients likely value, and having Claude message clients directly (D) removes her from a relationship-building touchpoint that should stay personal."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A mid-size company's facilities team handles maintenance requests submitted through a simple form. They want to use Claude to draft an acknowledgment reply to each request and also to decide which requests get escalated as \"urgent\" (e.g., possible safety hazards) versus routine, based only on the text the employee typed in the form.",
    question: "What is the most important consideration in this design?",
    options: [
      "Both tasks are equally low-risk, so both can be fully automated with no human involvement",
      "Acknowledging receipt is low-risk and can be automated, but urgency triage based only on brief form text carries real risk of under-flagging a genuine hazard (or over-flagging routine issues), so a human should review the urgency classification, at least for anything not clearly routine, before it's acted on or ignored",
      "Urgency triage is the easier task and should be fully automated first, while acknowledgment replies should stay manual",
      "Neither task should involve Claude, since facilities requests could involve safety issues"
    ],
    correct: 1,
    explanation: "Acknowledging a request is a low-stakes, easily automatable step, but classifying urgency from limited form text carries real risk — missing a genuine hazard because the wording was mild, or flooding staff with false urgent flags — so a human check on the triage decision, especially for anything ambiguous, is the important safeguard (B). Treating both as equally low-risk (A) ignores this real difference, prioritizing automation for the harder judgment call while leaving the trivial task manual (C) has the logic backwards, and excluding Claude from both (D) discards a legitimate efficiency gain on the low-risk acknowledgment step."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A marketing agency account manager receives a client's raw campaign performance data each month and needs to turn it into a client-facing performance report. She currently spends most of her time formatting charts and writing the narrative explanation, and comparatively little time actually analyzing what the numbers mean.",
    question: "Where would integrating Claude create the most value in this specific situation?",
    options: [
      "Having Claude take over the actual analysis and interpretation of what the numbers mean for the client's strategy, since that is the most time-consuming part",
      "Having Claude help draft the narrative explanation of the data (once she's identified the key takeaways) so she can redirect more of her time toward the actual strategic analysis, which is the higher-value part of her job",
      "Having Claude decide which client to prioritize this month based on account size",
      "Nothing should change, since she is already spending most of her time on the highest-value part of the task"
    ],
    correct: 1,
    explanation: "She describes spending most of her time on formatting and narrative writing rather than the strategic analysis that actually drives client value, so shifting the writing workload to Claude (once she has the key takeaways) frees her to spend more time on the higher-value analytical work (B). Having Claude take over the analysis itself (A) hands off the part that most needs her judgment and client context, prioritizing clients by account size (C) is an unrelated business decision, and D mischaracterizes her situation, since she's currently spending the most time on the lower-value part of the task."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A mid-size company's IT department rolls out Claude access to all employees with a one-line guideline: \"use good judgment.\" Six months later, usage varies wildly across teams: some teams built consistent processes for things like meeting notes and drafts, while others barely use it at all and one team routinely pastes sensitive unreleased financial data into prompts without a clear policy against it.",
    question: "What does this outcome suggest about the original rollout?",
    options: [
      "Nothing needs to change, since usage naturally varies across different types of teams",
      "A vague, one-line guideline was insufficient for scaling responsible and effective use across a whole company; teams need clearer guidance on appropriate use cases, what data is and isn't appropriate to share, and examples of good workflows, not just a general instruction to use judgment",
      "The company should revoke Claude access entirely, since one team misused it",
      "Only the IT department should be allowed to use Claude going forward, since other teams cannot be trusted"
    ],
    correct: 1,
    explanation: "A one-line guideline leaves too much room for interpretation to scale consistently and safely across many teams; the fix is clearer, more specific guidance covering appropriate use cases, sensitive data handling, and example workflows, rather than relying on individual judgment alone (B). The wide variance and the sensitive-data issue are signs of a real gap, not natural and acceptable variation (A), revoking access company-wide over one team's issue (C) overreacts and discards value for teams using it well, and restricting access to IT alone (D) doesn't address the actual root cause, which is a lack of clear guidance."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A small bakery owner wants to write responses to customer reviews on a delivery app but often lets them pile up for weeks because she doesn't enjoy sitting down to write them.",
    question: "How should she think about using Claude here?",
    options: [
      "Have Claude draft quick reply options she can pick from and lightly edit, addressing the actual reason reviews pile up (avoidance of the writing task) while she stays in control of what's sent",
      "Ignore reviews altogether, since responding is optional and she dislikes the task",
      "Have Claude automatically post replies to all reviews without her ever seeing them",
      "Hire a full-time social media manager just to handle review replies"
    ],
    correct: 0,
    explanation: "Since the actual friction is the writing task itself, having Claude draft options she can quickly pick and lightly edit removes that specific barrier while she retains control over tone and what actually gets posted (A). Ignoring reviews (B) forgoes real reputational value, letting replies post without her ever seeing them (C) removes a needed check on a public-facing response tied to her business, and hiring dedicated staff (D) is a disproportionate fix for what is a solvable friction point."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A nonprofit executive director wants to design a workflow for board meeting preparation: gather committee updates, draft a board packet, and get it approved for distribution a week before each meeting. Currently the process is rushed and the packet often goes out late.",
    question: "How could Claude best help fix the timing problem specifically?",
    options: [
      "Have Claude decide the board meeting agenda without input from committees",
      "Have committees submit their updates on a set schedule, then have Claude draft the compiled packet from those updates promptly once received, giving the director more buffer time to review and get approval before the weekly deadline",
      "Skip the board packet process entirely and have the director speak from memory at each meeting",
      "Have Claude send the packet directly to board members without the director's review, to avoid delays"
    ],
    correct: 1,
    explanation: "The bottleneck is likely the compilation and drafting step eating into the timeline, so having committees submit on schedule and having Claude draft the compiled packet promptly gives the director more buffer time to review and secure approval before the deadline, addressing the actual timing problem (B). Having Claude set the agenda without committee input (A) is an unrelated and inappropriate delegation, dropping the packet process (C) removes a valuable governance tool, and skipping director review to save time (D) removes oversight on a document that goes to the full board."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A large call center is designing a workflow where Claude listens to (via transcript) and scores agent calls against a quality rubric for coaching purposes, replacing a process where team leads manually reviewed a sample of calls each month. Leadership wants to remove team leads from call review entirely and have coaching conversations driven solely by Claude's scores.",
    question: "What is the best assessment of this plan?",
    options: [
      "This is an improvement with no downside, since Claude's scoring will be more consistent than human reviewers",
      "Using Claude to help score calls against a rubric and surface patterns can meaningfully reduce a team lead's manual review workload, but removing team leads from the coaching conversation entirely risks losing important context (tone, situational judgment, agent development needs) that a rubric score alone doesn't capture, and coaching is fundamentally a people-management function",
      "This plan should be abandoned entirely, since Claude cannot process a call transcript",
      "This plan is fine as long as agents are not told their calls are being scored by Claude"
    ],
    correct: 1,
    explanation: "Using Claude to help apply a rubric to transcripts can genuinely reduce team leads' manual review burden and surface useful patterns, but coaching is a people-management function that depends on context, tone, and individual development needs that a numeric rubric score doesn't fully capture, so team leads should remain the ones actually having coaching conversations even if Claude assists with the underlying review (B). Assuming no downside to full automation (A) overlooks this real limitation, dismissing the plan over a false capability claim (C) is incorrect, and transparency with agents about how their calls are evaluated (D) is a separate ethical consideration, not something that fixes the coaching design gap."
  },
  {
    domain: 4,
    difficulty: 2,
    scenario: "A freelance bookkeeper wants to send clients a friendly monthly check-in message asking if they have any outstanding invoices or receipts to send over, using largely the same wording each time with the client's name and month filled in.",
    question: "What is the best way to set this up as a recurring workflow?",
    options: [
      "Write a completely different message from scratch for each client every single month",
      "Create a reusable template with Claude for the recurring structure, and each month just update the name and month before a quick send, since the content is largely stable",
      "Have Claude decide which clients are behind on their bookkeeping without her review",
      "Stop sending check-in messages since they are repetitive"
    ],
    correct: 1,
    explanation: "Since the content is nearly identical each month, building one reusable template with Claude and just swapping the name and month is the efficient, repeatable design (B). Rewriting from scratch every month (A) wastes the fact that the structure barely changes, having Claude independently judge which clients are behind (C) requires actual bookkeeping records she should verify herself, and dropping the check-ins (D) removes a useful client touchpoint over something that's actually easy to streamline."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A regional airline's ground operations team wants to use Claude to draft internal shift-change handover notes summarizing the day's issues (delays, equipment problems, staffing notes) for the next shift's supervisor. The current process has supervisors verbally handing off information, which sometimes gets lost or forgotten by the next shift.",
    question: "How would introducing Claude into this workflow most directly address the stated problem?",
    options: [
      "Have Claude fully replace verbal handovers with an automatically generated note the outgoing supervisor never reviews, based on system logs alone",
      "Have the outgoing supervisor give Claude a quick rundown of the day's key issues, have Claude draft a structured written note, and have the supervisor do a fast review before the handover, creating a written record that reduces the risk of information being lost verbally",
      "Keep handovers entirely verbal, since writing things down would slow the process too much",
      "Have Claude decide which issues are worth mentioning in the handover without supervisor input"
    ],
    correct: 1,
    explanation: "The stated problem is that verbally handed-off information gets lost, so having Claude turn the supervisor's quick rundown into a structured written note — reviewed briefly before handover — creates a durable record that directly addresses the loss-of-information problem while still being fast (B). Generating the note from system logs alone without the supervisor's input or review (A) risks missing context only the supervisor knows and misses the review safeguard, keeping it purely verbal (C) preserves the exact problem being solved, and letting Claude decide what's worth including without supervisor input (D) risks omitting something only the supervisor would know matters."
  },
  {
    domain: 4,
    difficulty: 3,
    scenario: "A small business's bookkeeper wants Claude to help draft monthly expense category summaries by reading through exported transaction lists and grouping them, and then wants those categorized summaries sent directly to the accountant for tax filing without the bookkeeper reviewing the categorizations first.",
    question: "What is the concern with skipping the bookkeeper's review?",
    options: [
      "There is no concern, since Claude can categorize transactions with perfect accuracy every time",
      "Miscategorized transactions could affect the accuracy of tax filings, and the bookkeeper is best positioned to catch categorization errors given her knowledge of the business's specific spending patterns, so a review step before the summary is used for filing is an important safeguard",
      "The concern is that Claude cannot process a list of transactions at all",
      "The concern applies only if the business has very high transaction volume"
    ],
    correct: 1,
    explanation: "Transaction categorization can involve ambiguous judgment calls specific to how a particular business operates, and errors here can flow through to tax filings, so the bookkeeper's review — informed by her specific knowledge of the business — is an important check before the summary is relied on for filing purposes (B). Assuming perfect accuracy (A) is an unfounded assumption, this isn't a claim about whether Claude can process transaction lists (ruling out C), and the risk of a categorization error mattering isn't limited to high-volume businesses (D) — even a single miscategorized large expense could matter."
  },
  {
    domain: 4,
    difficulty: 4,
    scenario: "A multinational company's global mobility team (which handles employee international relocations) wants to build a workflow where Claude drafts personalized relocation checklists for employees moving between offices, based on origin and destination country, pulling from a document of country-specific requirements the team maintains. They want to skip having anyone review the checklist because the source document is considered authoritative.",
    question: "What is the risk in skipping review here?",
    options: [
      "There is no risk, since the source document is authoritative and Claude is just summarizing it",
      "Even with an authoritative source document, an error could occur in how country-specific requirements are selected, combined, or applied to a specific employee's actual situation, and an inaccurate relocation checklist could cause real problems (visa issues, missed deadlines) for that employee, so a review step remains valuable",
      "The risk is that Claude cannot read a document about country requirements",
      "The risk only matters for relocations involving fewer than three countries"
    ],
    correct: 1,
    explanation: "Even a trustworthy source document doesn't guarantee the specific selection or combination of requirements was applied correctly to an individual employee's particular route and circumstances, and a wrong or incomplete relocation checklist can cause serious real-world consequences like a missed visa deadline, so a review step still adds meaningful value (B). Assuming source authority guarantees output accuracy (A) ignores this application risk, this isn't a question of whether Claude can read the document (ruling out C), and D's country-count qualifier is an arbitrary and irrelevant distinction."
  },
];
