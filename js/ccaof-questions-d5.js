export const QUESTIONS_D5 = [
  {
    domain: 5,
    difficulty: 2,
    scenario: "A marketing coordinator uses Claude several times a week to draft social captions for one ongoing product launch, and expects to keep working on this launch for the next two months.",
    question: "What is the best way to set this up in claude.ai?",
    options: [
      "Start a brand-new conversation each time and paste in the brand voice guidelines and launch details again",
      "Create a Project for the launch, attach the brand voice guidelines and launch details, and work within it for the duration of the campaign",
      "Keep everything in a single long-running conversation with no Project, scrolling back whenever context is needed",
      "Email the brand guidelines to a coworker instead, since Claude cannot reliably use reference material"
    ],
    correct: 1,
    explanation: "A Project scoped to the launch lets the coordinator attach the guidelines and details once so every new conversation in that Project already has them (B). Re-pasting the same material each time (A) is repetitive and error-prone. A single endless conversation (C) works short-term but becomes unwieldy and doesn't let the coordinator start fresh threads for different caption batches while keeping shared context. Option D dismisses a core capability that works well here."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An HR generalist handles two unrelated efforts with Claude: drafting employee handbook updates, and screening resumes for an open role. Both currently live in one Project called 'HR Work' with all files uploaded together.",
    question: "What is the problem with this setup, and what should change?",
    options: [
      "There is no problem; combining related HR tasks into one Project is always the most efficient approach",
      "The Project should be deleted, since Claude should not be used for HR-sensitive tasks at all",
      "The handbook drafts and resume files are unrelated tasks with different reference material; they should be split into two separate Projects so each stays focused and irrelevant material doesn't bleed into either task",
      "The files should be renamed alphabetically so Claude can search them faster"
    ],
    correct: 2,
    explanation: "Handbook drafting and resume screening use different reference material and serve different purposes, so combining them (A) risks Claude mixing irrelevant context between tasks, and finding the right file becomes harder. Splitting into two purpose-specific Projects (C) keeps each one's knowledge relevant. Claude can appropriately support many HR tasks (ruling out B), and renaming files alphabetically (D) doesn't address the core scoping issue."
  },
  {
    domain: 5,
    difficulty: 1,
    scenario: "A customer support lead wants every response Claude drafts, across all conversations and all Projects, to always use a friendly but concise tone and to never use exclamation points.",
    question: "Where should this preference be set?",
    options: [
      "As an account-wide custom instruction/preference, since it applies to everything the person does with Claude, not just one Project",
      "Re-typed at the start of every single conversation",
      "As a one-time note in a single conversation, since preferences don't carry forward anyway",
      "In the title of each new conversation"
    ],
    correct: 0,
    explanation: "A preference meant to apply everywhere, regardless of Project or topic, belongs at the account-wide custom instructions level so it's applied automatically without repetition (A). Retyping it every time (B) is unnecessary manual effort. Preferences set at the account level do carry forward, so (C) is incorrect. Conversation titles (D) have no effect on how Claude responds."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A nonprofit program manager set up a Project six months ago with the organization's grant reporting template and budget rules attached. The finance team recently changed several budget category names, but the Project's uploaded files were never updated.",
    question: "What is most likely happening, and what should the manager do?",
    options: [
      "Claude automatically detects and corrects outdated files, so no action is needed",
      "Claude may be producing reports using the old, now-incorrect budget category names because the uploaded reference material is stale; the manager should replace the outdated files with the current version",
      "The Project should be deleted and never used again, since uploaded files can never be changed",
      "The manager should just mention the new category names once in a conversation and assume Claude will remember it for all future Projects"
    ],
    correct: 1,
    explanation: "Claude relies on the reference material actually present in the Project; if that material is outdated, outputs will reflect the old information, so the fix is to update the uploaded files (B). Claude does not silently detect and fix stale content on its own (ruling out A). Files in a Project can be replaced or removed, so deleting the Project entirely is unnecessary (C). Mentioning something in one conversation doesn't update a separate Project's persistent knowledge or other Projects (D)."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A regional real estate brokerage has 12 agents, each running their own listings, using Claude for property descriptions, client emails, and market summaries. Leadership wants to set this up so agents can each find and reuse the right tools quickly.",
    question: "What is the best way to organize this at the team level?",
    options: [
      "One single shared Project containing every agent's listings, templates, and client notes together",
      "No Projects at all — each agent should just start fresh conversations and explain their situation from scratch every time",
      "Separate, clearly named Projects by purpose (e.g., a shared 'Listing Description Templates' Project, a shared 'Client Email Templates' Project), so agents can find the relevant one without wading through unrelated client-specific material",
      "A Project per day of the week, rotating regardless of task or client"
    ],
    correct: 2,
    explanation: "Organizing Projects by purpose with clear names (C) lets any agent quickly find the relevant shared templates without sorting through unrelated listings or another agent's client details. Dumping everything into one giant Project (A) creates a cluttered, hard-to-navigate knowledge base and mixes client-specific data across agents. Skipping Projects entirely (B) forces repetitive re-explanation. Organizing by day of the week (D) has nothing to do with task purpose and would be confusing to navigate."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An event planner is organizing a single corporate holiday party and expects to only use Claude for this event, never again after it wraps up.",
    question: "What is a reasonable way to handle this, given it's a one-off effort?",
    options: [
      "It is unreasonable to use claude.ai for a one-time event at all",
      "A lightweight approach — such as a single Project or even just a well-organized conversation with the vendor list and budget attached — is reasonable, since the overhead of building an elaborate reusable knowledge setup isn't needed for a one-time effort",
      "The planner must build an extensive Project with account-wide preferences and multiple sub-Projects regardless of whether the event recurs",
      "The planner should avoid attaching any files and instead describe the vendor list from memory in every message"
    ],
    correct: 1,
    explanation: "For a genuinely one-off task, a simple Project (or even a single well-organized conversation) with the relevant files attached is proportionate — there's no long-term reuse to justify heavier setup (B). Claude is well suited to this kind of task, so (A) is wrong. Building an elaborate multi-Project structure (C) is unnecessary overhead for a single event. Avoiding file attachments and re-describing details from memory (D) is more error-prone and effortful than just attaching the file once."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A university admissions office uses a Project containing FAQ answers and program details to help staff draft responses to prospective student emails. A staff member notices Claude recently gave an answer about a financial aid deadline that no longer exists.",
    question: "What should the office do first?",
    options: [
      "Ignore it — Claude occasionally makes up random facts and there is nothing that can be done",
      "Check whether the FAQ document in the Project still lists the old deadline, and if so, update or replace it with current information",
      "Delete the entire Project and have staff answer all emails without any assistance going forward",
      "Tell staff to stop mentioning financial aid topics in any conversation, forever"
    ],
    correct: 1,
    explanation: "When a Project-based answer is wrong, the most likely cause is that the uploaded reference material itself is outdated, so checking and updating the FAQ document is the direct fix (B). This isn't an unfixable random error — it traces back to stale source content, so (A) is wrong. Deleting the whole Project (C) throws away a useful setup over a fixable data problem. Banning a topic entirely (D) doesn't solve the underlying staleness issue and blocks a legitimate use case."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A small law office's paralegal wants Claude to always format case summaries as: client name, key dates, and outstanding action items, in that specific order, for every case summary she asks for across many different case-related Projects.",
    question: "Where does this formatting preference best belong?",
    options: [
      "As an account-wide custom instruction, since the formatting rule should apply consistently across all of her Projects and conversations, not just one case",
      "Uploaded as a separate file in only one case's Project",
      "Nowhere — formatting preferences cannot be set in claude.ai",
      "As the title of each new conversation"
    ],
    correct: 0,
    explanation: "Since the formatting rule should apply the same way regardless of which case or Project she's working in, it belongs at the account-wide preference level so it's automatically applied everywhere (A). Placing it in only one Project's file (B) would mean it's missing from her other case Projects. Claude does support persistent formatting preferences, so (C) is incorrect. A conversation title (D) has no bearing on response formatting."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A retail chain's operations team maintains a Project with store opening/closing procedures for use by shift supervisors. The company just changed its closing checklist, but supervisors are still getting Claude's old checklist steps in their answers.",
    question: "What is the most likely cause and correct fix?",
    options: [
      "Claude is malfunctioning and the company should stop using it entirely",
      "The old checklist file is still the one uploaded to the Project; the fix is to remove or replace it with the updated checklist so future answers reflect current procedure",
      "Supervisors need to clear their own browser history before each conversation",
      "The Project needs to be renamed for the update to take effect"
    ],
    correct: 1,
    explanation: "Claude answers based on what's actually attached to the Project; if the old checklist file is still there (or the new one was never uploaded), outdated answers will keep appearing until the file is updated or replaced (B). This is a content-maintenance issue, not a malfunction (ruling out A). Browser history (C) and renaming the Project (D) have no effect on what reference material Claude uses to answer."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A hospital administrative team wants a Project to help staff draft patient appointment reminder letters. They are debating whether to upload actual past patient records as example letters, or to upload a blank template with placeholder fields plus general style notes.",
    question: "Which approach better fits sound knowledge management practice for this Project?",
    options: [
      "Upload real patient records as examples, since more realistic examples always produce better writing",
      "Upload a blank template with placeholder fields and general style notes, avoiding real patient-identifying information in the Project's reference material, since the knowledge base only needs the structure and tone, not real personal data",
      "Upload nothing at all and have staff describe the entire letter format verbally in every conversation",
      "Upload the hospital's entire patient database so Claude has maximum context"
    ],
    correct: 1,
    explanation: "The Project's purpose only requires the structural format and tone; a template with placeholders and style notes achieves that without unnecessarily storing real patient-identifying information as reusable reference material (B). Using real patient records (A) or the entire database (D) introduces unnecessary sensitive personal data into persistent knowledge that many more people may access. Uploading nothing (C) forgoes the efficiency benefit of a Project entirely and forces repeated verbal re-explanation."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A freelance graphic designer occasionally asks Claude quick one-off questions — like rewording a single invoice line or suggesting a font pairing — with no ongoing project attached to any of them.",
    question: "Is it necessary to create a Project for these questions?",
    options: [
      "Yes, every single use of Claude requires a dedicated Project to function correctly",
      "No — for quick, unrelated, one-off questions with no recurring context to reuse, a plain conversation is simpler and just as effective; a Project makes sense once there's recurring context worth reusing",
      "Yes, but only if the designer uploads a business plan document first",
      "No, but only because Projects are a paid-only feature unrelated to use case"
    ],
    correct: 1,
    explanation: "Projects add value when there's context worth reusing across multiple conversations; for isolated, unrelated quick questions, a plain conversation is simpler with no real downside (B). Claude does not require a Project for basic use (ruling out A and C). Option D reasons from an irrelevant and unfounded premise about the feature."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A logistics coordinator has built a Project for tracking vendor contract terms. Every time she starts a new conversation in it, she still manually re-explains that dates should be written as MM/DD/YYYY and that vendor names should be spelled out in full.",
    question: "What would improve this setup?",
    options: [
      "Nothing needs to change — repeating small formatting notes each time is standard practice",
      "Add those formatting rules to the Project's custom instructions so they apply automatically to every conversation within that Project, removing the need to restate them",
      "Delete the Project since formatting preferences cannot be saved anywhere",
      "Switch to writing everything in a single conversation instead of using a Project"
    ],
    correct: 1,
    explanation: "Recurring formatting rules for a specific Project belong in that Project's custom instructions, where they apply automatically to every conversation in it, eliminating repeated manual restatement (B). Continuing to repeat them (A) wastes effort the feature is designed to prevent. Project-level custom instructions do support this exact use case, so (C) is wrong. Switching to a single conversation (D) doesn't address the repetition problem and loses the benefit of separate, organized threads."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A sales manager wants to try out how Claude handles a single unusual, one-time request: rewriting an old proposal from a defunct product line for a client who returned after five years.",
    question: "What's the most sensible approach?",
    options: [
      "Build a full new Project with custom instructions and multiple uploaded files before attempting the task",
      "Handle it in a normal one-off conversation, attaching the old proposal file if needed, since this isn't a recurring task that needs a dedicated ongoing knowledge base",
      "Refuse to use Claude for this since the product line is defunct",
      "Create a Project but leave it completely empty with no context, defeating its purpose"
    ],
    correct: 1,
    explanation: "For a single unusual request with no expected recurrence, a normal conversation with the relevant file attached is proportionate and efficient (B). Building a whole Project (A) is more setup than the task warrants. There's no reason Claude can't help rewrite an old proposal (C). Creating an empty Project (D) provides no benefit over a plain conversation."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A multi-location fitness studio chain has one Project per location containing that location's class schedule and membership pricing. A new regional manager wants a single dashboard-style answer combining data from all six locations, and keeps getting incomplete answers because they're working inside only one location's Project.",
    question: "What explains the incomplete answers, and what should the manager do?",
    options: [
      "Claude is broken and needs to be reset",
      "A single Project only has access to the material uploaded to it; to combine data across all six locations, the manager needs either a separate summary Project with consolidated data from all locations, or to gather the relevant figures across Projects manually before asking for the combined view",
      "The manager should delete all six Projects and start using only conversations with no reference material",
      "The manager should rename all six Projects to have the exact same name"
    ],
    correct: 1,
    explanation: "Each Project's knowledge is scoped to what's uploaded there; a Project for Location A doesn't have access to Location B's files, so cross-location answers require either a consolidated dataset in one place or manually assembled input (B). This is expected scoping behavior, not a malfunction (ruling out A). Deleting the useful per-location Projects (C) removes value rather than solving the cross-location problem. Giving Projects identical names (D) would only create confusion, not shared access to content."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A construction project manager has a Project with the current building code requirements for a specific job site attached as a reference file. Midway through the job, the local authority issues a revised code. The manager keeps the old file in the Project 'just in case it's useful later' alongside the new one.",
    question: "What risk does this create, and what's the better practice?",
    options: [
      "No risk — Claude will always know to ignore the old file automatically",
      "Keeping both the outdated and current code documents in the same Project risks Claude referencing the wrong one; the outdated file should be removed once it's no longer applicable, or clearly separated if a historical record is genuinely needed",
      "The manager should delete the new file and keep only the old one for consistency",
      "The manager should combine both files into one document without indicating which parts are outdated"
    ],
    correct: 1,
    explanation: "Having conflicting versions of a reference document in the same Project creates ambiguity about which is authoritative, and Claude has no reliable way to know the old one should be ignored just because it's outdated, so removing or clearly separating it is the safer practice (B). Assuming Claude will automatically know to disregard it (A) is not something to rely on. Keeping the old file instead of the new one (C) would guarantee wrong answers. Merging them without marking what's outdated (D) makes the ambiguity worse, not better."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A high school teacher creates a Project for a semester-long unit, attaching the syllabus, grading rubric, and reading list, so she can ask Claude to help draft quizzes, feedback comments, and lesson recaps all season.",
    question: "Why is a Project a better fit here than a series of unrelated one-off conversations?",
    options: [
      "Projects are required for anyone working in education",
      "Because the syllabus, rubric, and reading list are recurring context relevant to many tasks over the whole semester, attaching them once avoids re-explaining them in every new conversation",
      "Because one-off conversations cannot use uploaded files at all",
      "Because a Project automatically grades student work without teacher review"
    ],
    correct: 1,
    explanation: "The recurring, semester-long relevance of the syllabus, rubric, and reading list is exactly the kind of context a Project is built to hold once and reuse across many conversations (B). There's no such requirement tied to a profession (A). Plain conversations can also use uploaded files, just without persistence across conversations, so (C) is inaccurate. Claude assisting with drafts is not the same as autonomously grading students without review (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A property management company handles both residential leasing and commercial leasing. An assistant proposes putting both types of leases, addenda, and correspondence templates into one big Project called 'Leasing' to 'keep it simple.'",
    question: "What is the concern with this plan, and what's a better alternative?",
    options: [
      "There is no concern; combining all leasing material into one Project is the simplest and best approach regardless of differences between residential and commercial rules",
      "Residential and commercial leasing involve different legal terms, templates, and rules; mixing them into one undifferentiated Project risks Claude pulling the wrong template or clause type, so splitting into two purpose-specific Projects (or clearly separated sections) is safer",
      "The company should stop using Claude for leasing tasks altogether",
      "The assistant should rename all files with random numbers so they load faster"
    ],
    correct: 1,
    explanation: "Residential and commercial leasing have materially different terms and templates; combining them into a single undifferentiated Project increases the risk of Claude blending or misapplying content from the wrong category, so separating them (or organizing clearly within the Project) reduces that risk (B). Assuming 'simple' always means 'combined' overlooks this risk (A). Leasing is a reasonable use case for Claude (C). Random file renaming (D) doesn't address the underlying organizational problem and adds unnecessary confusion."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A nonprofit's development director maintains a Project with donor communication guidelines for major-gift outreach. She personally also wants Claude to always sign her emails 'Warmly, Dana' regardless of which Project or conversation she's in, including personal, non-work chats.",
    question: "How should 'Warmly, Dana' and the donor guidelines each be configured?",
    options: [
      "Both should go in the donor Project's custom instructions, since that's the only place preferences can be set",
      "The donor guidelines belong in the donor-outreach Project (task-specific, not needed elsewhere), while the personal sign-off, which she wants applied everywhere including outside that Project, belongs in her account-wide custom instructions",
      "Both should be repeated manually in every message, since preferences don't carry over between Projects",
      "Neither should be saved anywhere, since claude.ai has no way to store personal preferences"
    ],
    correct: 1,
    explanation: "The donor guidelines are specific to major-gift outreach and belong scoped to that Project, while the sign-off she wants used everywhere, even outside that Project, is a good fit for account-wide preferences (B). Preferences aren't limited to one Project's custom instructions (A). Manually repeating both (C) defeats the purpose of either setting. Account-wide custom instructions do exist for exactly this kind of persistent personal preference (D)."
  },
  {
    domain: 5,
    difficulty: 1,
    scenario: "A new employee at an insurance office is told the company has a Project set up called 'Claims Intake Templates' with standard forms and phrasing already attached.",
    question: "What is the main benefit of working inside that existing Project instead of starting a plain new conversation?",
    options: [
      "It guarantees claims are approved faster by the insurance underwriter",
      "The employee can start drafting immediately, since the standard forms and phrasing are already available as context without needing to upload or explain them again",
      "It automatically emails the completed forms to clients",
      "It prevents the employee from asking any questions outside of claims topics"
    ],
    correct: 1,
    explanation: "The core benefit of an existing, well-set-up Project is that shared reference material is already there, so the employee can start working right away without re-uploading or re-explaining it (B). Claude assisting with drafts has no bearing on underwriting approval speed (A) or automated email sending (C), and a Project doesn't restrict what topics can be discussed elsewhere (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A small accounting firm's team lead created five Projects over the past year for different clients but named them all simply 'Project 1' through 'Project 5.' New hires struggle to figure out which one to use.",
    question: "What change would most directly fix this usability problem?",
    options: [
      "Delete all five Projects and start over with no Projects at all",
      "Rename each Project with a clear, descriptive name (e.g., the client's name or engagement type) so team members can identify the right one at a glance",
      "Merge all five Projects into a single Project so there's only one name to remember",
      "Leave the names as-is, since Project names have no effect on findability"
    ],
    correct: 1,
    explanation: "Descriptive, specific names directly solve the stated problem — team members being unable to tell Projects apart — by making each Project's purpose clear at a glance (B). Deleting the Projects (A) throws away the useful client-specific reference material already built up. Merging distinct clients into one Project (C) would mix unrelated client data, a worse outcome. Names very much affect findability, so (D) is incorrect."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A mid-sized company's internal communications team maintains one large Project containing: the brand style guide, an archive of every past internal newsletter (over 40 issues), leadership bios, and unrelated meeting notes from an unrelated town hall planning effort. Drafts of new newsletters have recently started echoing outdated phrasing from years-old issues instead of the current style guide.",
    question: "What is the best combination of fixes for this Project?",
    options: [
      "Nothing needs fixing; more historical material always makes Claude's drafts better",
      "Trim the newsletter archive to a small set of recent, representative examples (or clearly mark older ones as historical/not to emulate), keep the current style guide as the primary reference, and move the unrelated town hall meeting notes to their own separate Project",
      "Delete the style guide since it's apparently not working",
      "Add even more old newsletters going back further in time to give Claude more examples to choose from"
    ],
    correct: 1,
    explanation: "The likely cause is an overloaded, unscoped Project where a large volume of older newsletters competes with the current style guide, plus unrelated content diluting focus; trimming/labeling the archive, prioritizing the current guide, and separating the unrelated meeting notes into their own Project directly addresses both the staleness and the scope-mixing issues (B). More historical volume (A, D) would make the problem worse, not better. The style guide itself isn't the cause, so removing it (C) doesn't fix anything."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A restaurant owner wants Claude to help write daily social media posts. Some days it's about a lunch special, other days about a hiring ad, and other days about a private event booking — each completely unrelated to the others.",
    question: "Does this situation call for one shared Project or several separate ones?",
    options: [
      "A single Project makes sense as long as it holds general restaurant brand info (name, tone, logo colors) usable across all these post types, since that shared context applies broadly even though daily topics vary",
      "Each daily topic requires its own separate Project, no matter how small the difference",
      "No Project should ever be used for social media content",
      "A new account should be created for each day of posting"
    ],
    correct: 0,
    explanation: "Since brand tone, name, and general style apply across all the post topics, a single Project holding that shared foundational context is efficient and appropriate even though specific daily topics vary (A). Creating a brand-new Project for every minor topic (B) is excessive overhead relative to the shared, reusable core context. Social media drafting is a reasonable use of Claude (C). Creating new accounts per day (D) is unrelated to how Projects work and wildly impractical."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A supply chain analyst at a manufacturing company keeps a Project stocked with supplier contact sheets and lead-time data. She notices that whenever she asks about supplier lead times, Claude's answers sometimes reference numbers that don't match the latest sheet she uploaded last week — it seems to still reference an older sheet from two months ago that's also still in the Project.",
    question: "What is the appropriate corrective action?",
    options: [
      "Remove the outdated two-month-old lead-time sheet from the Project now that the newer one supersedes it, so only current data remains as reference material",
      "Upload the new sheet as an additional file but keep the old one exactly where it is, unlabeled",
      "Assume Claude is choosing the correct file at random and accept inconsistent answers as unavoidable",
      "Stop using a Project altogether and paste the entire spreadsheet into the chat box every single time instead"
    ],
    correct: 0,
    explanation: "When outdated and current versions of the same data coexist in a Project, removing the superseded file is the direct fix that ensures only current data is used going forward (A). Leaving the old file in place unlabeled (B) preserves the exact ambiguity causing the problem. Treating inconsistent answers as unavoidable (C) ignores a fixable root cause. Abandoning the Project structure in favor of manual pasting (D) is a step backward in efficiency, not a real fix for the stale-data issue."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A financial services firm's compliance officer wants a Project where junior staff can draft client-facing disclosures. She's deciding whether to attach the actual current regulatory disclosure requirements as reference files, or just tell staff to 'use good judgment' with no reference material attached.",
    question: "Which approach better supports accurate, consistent output?",
    options: [
      "Attaching the current, accurate regulatory requirements as reference material gives Claude a concrete, consistent basis to draft from, rather than relying on staff members' individual judgment and memory each time",
      "'Use good judgment' is always superior because it avoids the effort of organizing files",
      "Neither approach matters since Claude produces identical output regardless of what's attached",
      "The requirements should be described verbally by whichever staff member happens to be in the conversation, differently each time"
    ],
    correct: 0,
    explanation: "Attaching accurate, current reference material gives every draft a consistent, verifiable basis rather than depending on each staff member's memory, which will vary and can drift from what's actually required (A). Skipping reference material to save effort (B) undermines accuracy in a compliance-sensitive context. What's attached to a Project does affect output, so (C) is false. Verbal, inconsistent restatement by different people each time (D) is exactly the kind of variability a Project's attached files are meant to eliminate."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A regional theater company has a single Project used for both grant-writing (formal, precise language for funders) and audience-facing marketing emails (casual, upbeat language for patrons). Staff have noticed grant drafts sometimes come out too casual and marketing emails sometimes come out too formal.",
    question: "What is the most likely explanation and the best fix?",
    options: [
      "Claude cannot produce more than one tone and this is an unavoidable limitation",
      "Mixing two tasks that call for different, conflicting tones in a single Project makes it harder for Claude to consistently apply the right tone for each; splitting into two Projects — one for grant writing, one for marketing — each with its own tone-specific instructions, would produce more consistent results",
      "The company should stop writing marketing emails entirely and only do grant writing",
      "The fix is to write all content in one tone that splits the difference between formal and casual"
    ],
    correct: 1,
    explanation: "When one Project holds instructions and examples for two tasks needing different tones, that mixed context can bleed between tasks; separating them into purpose-specific Projects, each with tone guidance suited to its own task, addresses the inconsistency directly (B). Claude can adapt tone well when given clear, unmixed context, so (A) overstates a limitation. Dropping one task entirely (C) is unnecessary. A single blended 'compromise' tone (D) would satisfy neither audience well."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A landscaping company owner wants to make sure that whenever anyone on his team asks Claude to write a client quote, it always uses the company's current pricing per square foot, which changes seasonally.",
    question: "What is the best way to keep this pricing accurate and available for quote drafting?",
    options: [
      "Upload the current seasonal pricing sheet to the relevant Project, and remember to swap it out each time pricing changes, rather than relying on staff to recall figures from memory",
      "Have each team member memorize the pricing and never write it down anywhere",
      "Set the pricing once at the very beginning and never touch it again, regardless of seasonal changes",
      "Ask Claude to guess reasonable pricing based on general market rates"
    ],
    correct: 0,
    explanation: "Keeping the actual current pricing sheet uploaded, and updating it when prices change seasonally, ensures quotes are drafted from accurate, current figures (A). Relying purely on staff memory (B) is more error-prone than a maintained reference file. Setting it once and never updating it (C) is exactly the kind of staleness problem that leads to bad outputs. Letting Claude guess at pricing (D) risks inaccurate client-facing quotes when real figures are known and available."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A city parks department runs several distinct programs — youth sports leagues, senior center activities, and public trail maintenance — each with its own staff, forms, and vendors. One employee suggests just using account-wide custom instructions to hold all the details for all three programs so nothing needs a separate Project.",
    question: "Is that a good idea?",
    options: [
      "Yes, account-wide instructions are the correct place for any information that might ever be needed, regardless of scope",
      "No — program-specific details like forms and vendors for three distinct, unrelated programs are better scoped to three separate Projects; account-wide instructions are best reserved for things that should apply to genuinely everything the person does",
      "Yes, because Projects cannot hold multiple types of files",
      "No, because account-wide custom instructions do not exist in claude.ai"
    ],
    correct: 1,
    explanation: "Cramming three unrelated programs' details into account-wide instructions means irrelevant context from one program shows up in conversations about the others; separate, purpose-specific Projects keep each program's material relevant and easy to find (B). Account-wide instructions are meant for broadly applicable preferences, not the sole home for all task-specific detail (A). Projects can hold many types of files (C), and account-wide custom instructions are a real feature (D)."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A boutique HR consultancy has a Project titled 'All Client Work' that has grown to contain onboarding checklists for eight different clients, each with different company policies, mixed together in one folder of uploaded files with generic filenames like 'doc1,' 'doc2,' etc.",
    question: "What issue does this raise, and what's the recommended fix?",
    options: [
      "No issue — more files in one Project always improves Claude's answers regardless of organization",
      "Mixing eight different clients' distinct policies in one undifferentiated Project with unclear filenames creates a real risk of one client's policy details leaking into another client's onboarding materials; splitting into per-client Projects (or at least clearly labeled, separated sections) reduces that risk",
      "The consultancy should stop doing onboarding work for more than one client at a time",
      "The filenames should be left generic, since names don't affect anything Claude does"
    ],
    correct: 1,
    explanation: "With eight clients' distinct policies mixed together under vague filenames, there's a meaningful risk of cross-contamination — one client's onboarding checklist reflecting another's policy details; separating clients into their own Projects (or clearly labeled sections) reduces that risk and improves accuracy (B). Volume without organization doesn't reliably improve quality (A). The consultancy doesn't need to limit itself to one client at a time if the Projects are properly separated (C). Clear, descriptive filenames do help both the team and reduce ambiguity, so (D) is wrong."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A dental office receptionist uses claude.ai only occasionally, for a single unrelated task each time — sometimes drafting an appointment reminder, sometimes writing a thank-you note to a longtime patient, with no overlap in content between them.",
    question: "Is setting up a Project necessary for this receptionist's usage pattern?",
    options: [
      "Yes, a Project is mandatory for any professional use of Claude",
      "Not necessarily — since each task is unrelated with little recurring shared context, individual conversations may be perfectly adequate; a Project becomes more valuable once there's recurring material worth reusing",
      "Yes, because conversations without a Project cannot be saved for later reference",
      "No, because Projects are only for engineering teams"
    ],
    correct: 1,
    explanation: "With no meaningfully recurring shared context between unrelated one-off tasks, plain conversations are a reasonable, low-overhead choice; Projects earn their value when there's reusable context across multiple related conversations (B). Projects aren't mandatory for professional use (A). Regular conversations are also retained and can be revisited later, so (C) is inaccurate. Projects are broadly useful across many professions, not limited to engineering (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A wedding planning business keeps one Project per couple, each containing that couple's guest list, vendor selections, and timeline. The owner wants to add a company-wide vendor discount list that should be visible and usable across every couple's Project.",
    question: "What is the most maintainable way to include the discount list across all client Projects?",
    options: [
      "Paste the discount list manually into every single couple's Project and update every copy by hand whenever a discount changes",
      "Recognize that Project-level files aren't automatically shared across separate Projects; if the company frequently needs this shared list across many Projects, they should establish a clear process for keeping each copy updated, or consider whether a more centralized reference approach fits their workflow better",
      "Assume Claude will automatically sync the discount list across all Projects the moment it's added to one",
      "Delete all the individual couple Projects and combine every client into a single Project to simplify sharing"
    ],
    correct: 1,
    explanation: "Files added to one Project do not automatically appear in other separate Projects, so the owner needs to be deliberate about how a shared resource like this gets maintained across many client Projects, rather than assuming automatic syncing (B, ruling out C). Manually copying and separately maintaining it in every Project (A) is workable but the least efficient and most error-prone version of that same reality, making B the more complete answer since it acknowledges the maintenance burden and encourages a real process. Merging all clients into one Project (D) would mix confidential details across unrelated couples, which is worse than the original setup."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A veterinary clinic manager sets account-wide custom instructions telling Claude to always write in a warm, reassuring tone for pet owners. She also has a separate Project for internal staff scheduling memos, which should sound neutral and efficient, not warm and reassuring.",
    question: "What will likely happen, and how should she address it?",
    options: [
      "The account-wide warm tone preference will apply everywhere by default, including the staff scheduling Project, unless she adds Project-specific instructions there overriding it toward a neutral, efficient tone for that particular use case",
      "Account-wide preferences never apply inside any Project, so nothing needs to be done",
      "She should remove the account-wide tone preference entirely since it can never coexist with a Project",
      "She should create a brand-new account just for scheduling memos"
    ],
    correct: 0,
    explanation: "Account-wide preferences generally carry through unless a Project's own instructions specify something different for that context, so she should add Project-specific guidance in the scheduling Project to override the tone for that particular use case (A). It's not accurate that account-wide settings never apply within Projects (B). The two levels are meant to work together, with Project-level instructions able to adjust for a specific context, so removing the account-wide preference (C) is an overcorrection. Creating a separate account (D) is unnecessary and impractical."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A multinational nonprofit's grants team has Projects organized by funder (Funder A, Funder B, Funder C), each with that funder's specific application requirements. A new team member proposes reorganizing into Projects by internal department instead (Programs, Finance, Communications) so each department 'owns' one Project.",
    question: "Which organizing principle better serves this team's actual workflow, and why?",
    options: [
      "Reorganizing by department is strictly better in all cases because it matches the org chart",
      "Keeping Projects organized by funder is likely better here, since each funder has distinct requirements that shape what reference material and instructions are needed, and grant writers work funder-by-funder; a department-based split would scatter one funder's requirements across three separate Projects and require constant cross-referencing",
      "Both organizing principles are functionally identical and the choice makes no difference",
      "The best approach is to abandon Projects and put every funder's requirements into one enormous shared document pasted into each conversation"
    ],
    correct: 1,
    explanation: "Since the defining variable driving what reference material and instructions are needed is the funder (each with distinct requirements), organizing by funder keeps each Project's knowledge coherent and directly usable; splitting by department instead would fragment one funder's requirements across multiple Projects that the grant writer would have to piece back together (B). Matching the org chart isn't automatically the right structure if it doesn't match how the actual work is organized (A). The choice clearly does matter for findability and coherence (C), and abandoning Projects for one giant pasted document (D) loses the organizational benefit entirely and burdens every conversation with irrelevant funders' requirements."
  },
  {
    domain: 5,
    difficulty: 1,
    scenario: "A part-time bookkeeper wants Claude to stop re-asking about her business's fiscal year start month every time she asks for a quarterly summary framing.",
    question: "What is the simplest fix?",
    options: [
      "State the fiscal year start month once in her custom instructions or the relevant Project's instructions so it's remembered going forward instead of being asked about repeatedly",
      "Give up on using Claude for quarterly summaries",
      "Change her business's actual fiscal year to match a date Claude prefers",
      "Ask a different AI tool instead, since this cannot be fixed"
    ],
    correct: 0,
    explanation: "Setting a stable fact like the fiscal year start month once in custom instructions (or a relevant Project's instructions) means it's available automatically going forward, avoiding repeated questions (A). Abandoning the task (B) is unnecessary. Changing her actual business fiscal year to suit a tool (C) is backwards and impractical. The problem is straightforwardly fixable within claude.ai's existing features, so (D) is incorrect."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A software training company (whose staff are not developers themselves — they teach non-technical customers to use various business apps) has a Project per course they teach, each with that course's outline, slide talking points, and quiz questions.",
    question: "A new trainer is added to the team and needs to write quiz questions for the 'Spreadsheets Basics' course. What should they do?",
    options: [
      "Ask to be given access to the existing 'Spreadsheets Basics' Project so they can draft quiz questions with the course's existing outline and talking points as context, rather than recreating that material from scratch",
      "Create an entirely new Project from scratch and manually reconstruct the outline and talking points from memory",
      "Combine all the company's course Projects into one before starting",
      "Avoid using Claude for this and write the quiz unaided instead"
    ],
    correct: 0,
    explanation: "Using the existing, purpose-built 'Spreadsheets Basics' Project gives the new trainer immediate access to the accurate outline and talking points already there, avoiding duplicated effort and inconsistency (A). Rebuilding it from memory in a new Project (B) risks inaccuracies and wastes the existing setup. Merging all course Projects together (C) would blur the boundaries between distinct courses' material. Avoiding Claude altogether (D) forgoes a genuinely useful setup for a task Claude is well suited to help with."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A commercial insurance brokerage keeps a single Project with underwriting guideline documents. An intern uploads a personal draft of guidelines she wrote herself (never formally approved) into that same Project 'to compare against later,' alongside the official approved guidelines.",
    question: "What risk does this introduce, and what should be done?",
    options: [
      "No risk — Claude will always correctly identify which document is officially approved without being told",
      "The unapproved draft sitting alongside the official guidelines risks being treated as equally authoritative reference material; it should be removed from the Project (or moved somewhere clearly separate and labeled as unofficial) until/unless it's formally approved",
      "The official approved guidelines should be deleted instead, since the intern's draft is newer",
      "Both documents should be merged into one file without any indication of which is official"
    ],
    correct: 1,
    explanation: "Claude has no independent way to know one uploaded document is officially approved and another is an unreviewed personal draft unless that's made explicit; leaving them together risks the draft being treated as equally valid, so it should be removed or clearly separated and labeled (B). Assuming Claude will infer approval status on its own (A) is not reliable. Deleting the official guidelines instead (C) is backwards. Merging them without distinction (D) makes the ambiguity worse."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A photography studio owner wants Claude to always refer to the business by its full legal name, 'Aperture & Ash Photography LLC,' rather than any shortened version, across every task from client emails to social captions.",
    question: "What is the appropriate way to ensure this happens consistently?",
    options: [
      "Set it as an account-wide custom instruction so it's applied by default across every conversation and Project, regardless of task",
      "Type the full legal name once in a single conversation and hope it carries over to unrelated future conversations automatically",
      "Add it only to a Project used for invoices, since that's the most formal use case, and skip it elsewhere",
      "Avoid naming the business at all to sidestep the issue"
    ],
    correct: 0,
    explanation: "Since this naming preference should apply universally across all tasks and Projects, account-wide custom instructions are the right place to set it once and have it apply everywhere (A). A one-off mention in a single conversation (B) won't carry into unrelated future conversations outside that thread. Restricting it to only one Project (C) leaves it inconsistently applied elsewhere, which was the exact problem to avoid. Avoiding naming the business (D) doesn't solve the stated goal at all."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A community theater's volunteer coordinator manages a Project with volunteer contact info, shift schedules, and role descriptions. She's about to go on leave for two months and another volunteer will take over using the same Project.",
    question: "What should she do before handing it off to keep the knowledge management setup useful for her successor?",
    options: [
      "Nothing — Projects require no maintenance and will remain perfectly accurate indefinitely with no attention",
      "Review the uploaded files for anything outdated (e.g., volunteers who've left, expired shift schedules) and update or remove it, so her successor starts with accurate, current material rather than inheriting stale data",
      "Delete the Project entirely so the successor has to start over from nothing",
      "Change the account password so the successor cannot access the Project at all"
    ],
    correct: 1,
    explanation: "A quick review and cleanup of stale entries before handoff ensures the successor inherits accurate, trustworthy reference material rather than outdated volunteer info or expired schedules (B). Projects are not self-maintaining — content can go stale over time and needs periodic review (ruling out A). Deleting the Project (C) discards genuinely useful, mostly-accurate material unnecessarily. Restricting access entirely (D) defeats the purpose of a handoff and prevents her successor from using the Project at all."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A small architecture firm has a Project for a specific ongoing client's renovation project, containing that client's floor plans, budget, and correspondence history. A junior architect wants to also ask Claude general questions about building material trends unrelated to that client, and does so inside the same Project because it's already open.",
    question: "Is this a good practice?",
    options: [
      "Yes, since keeping everything in one place is always better regardless of relevance",
      "Not ideally — general, unrelated questions don't need that client's specific confidential material as context, and doing this repeatedly could clutter the Project's conversation history and blur its clear purpose; a separate conversation or Project for general research would be cleaner",
      "Yes, because Projects can only be used for one conversation at a time",
      "No, because asking general questions inside any Project is technically impossible"
    ],
    correct: 1,
    explanation: "Using a client-specific Project for unrelated general research isn't harmful in a single instance, but doing it as a habit clutters that Project's history and blurs its purpose, when a separate space would be cleaner and just as easy (B). Convenience doesn't outweigh the organizational cost of relevance drift, so 'always better together' (A) doesn't hold. Projects support multiple conversations over time (C), and general questions can technically be asked inside any Project (D), so those options are factually wrong."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A talent agency's Project for actor casting submissions includes headshots, resumes, and audition notes for dozens of actors submitted over the past year, many of whom are no longer being considered for any current role. A new coordinator finds it hard to identify which actors are still 'active' candidates.",
    question: "What best addresses this organizational issue?",
    options: [
      "Periodically archive or remove submissions for actors no longer under consideration, keeping the active Project focused on current candidates, rather than letting it accumulate indefinitely",
      "Leave everything in the Project permanently, since removing anything ever is against best practice",
      "Create a new Project every single day regardless of whether anything has changed",
      "Rename the Project to something unrelated to casting so it's harder to confuse with other Projects"
    ],
    correct: 0,
    explanation: "Periodically pruning inactive submissions keeps the Project focused on genuinely current candidates and directly solves the coordinator's stated problem of not being able to tell who's still active (A). Never removing anything (B) is exactly what caused the clutter in the first place. Creating a new Project daily regardless of actual change (C) is excessive churn that doesn't address the real issue of stale entries. Renaming it to something unrelated (D) would make the Project harder to find, not easier to use."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A church office administrator wants help drafting the weekly bulletin. The content — service times, announcements, and a short devotional — changes every single week, but the basic bulletin format and section order rarely changes.",
    question: "What's a sensible setup?",
    options: [
      "A Project with the recurring bulletin format/section-order guidance saved as custom instructions, while the fresh weekly content (service times, announcements, devotional) is provided each week within that Project since it changes regularly",
      "Upload a new file to a brand-new Project every single week, even though the format never changes",
      "Save last week's exact bulletin content as a permanent instruction so it's reused verbatim every future week",
      "Avoid using any persistent setup and re-explain the entire format from scratch every week"
    ],
    correct: 0,
    explanation: "The stable, recurring element (format and section order) is the right candidate for saved instructions, while genuinely changing content (dates, announcements) is naturally provided fresh each week within the same ongoing Project (A). Creating a whole new Project weekly (B) is unnecessary churn for content that's fundamentally the same recurring task. Saving last week's specific content as a permanent instruction (C) would cause outdated info to resurface in future bulletins. Skipping any persistent setup (D) discards the clear efficiency win available here."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A car dealership's sales manager has a Project containing current promotional financing rates. He's about to go on a two-week vacation, during which the finance department plans to change the promotional rate.",
    question: "What should happen with the Project while he's away, to avoid bad outputs?",
    options: [
      "Nothing needs to be done since promotional rates don't affect what Claude produces",
      "Someone on the team should be responsible for updating the Project's rate information when it changes, so sales staff drafting customer materials during his absence aren't working from outdated figures",
      "The Project should be deleted for the two weeks he's away and recreated when he returns",
      "Sales staff should stop using Claude entirely until he returns from vacation"
    ],
    correct: 1,
    explanation: "Since the rate is scheduled to change while the Project's owner is away, someone else needs to take responsibility for updating that reference material so subsequent drafts reflect the current rate rather than the outdated one (B). The promotional rate is exactly the kind of detail that shapes customer-facing drafts, so ignoring it (A) risks inaccurate materials going out. Deleting and recreating the Project (C) is unnecessary churn compared to simply updating a file. Pausing all use of Claude for two weeks (D) is a bigger disruption than just assigning update responsibility."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A university research lab has a Project containing summaries of past published papers to help a graduate student draft a related literature review section for a new paper. The student adds their own personal, unreviewed hypothesis notes to the same Project, planning to keep them there permanently as 'just another file.'",
    question: "What's the concern here, and what would be a better approach?",
    options: [
      "No concern; any file can go in any Project with no distinction needed",
      "Mixing established, published-paper summaries with the student's own unreviewed, speculative hypothesis notes in the same reference set risks Claude treating speculation as equally established fact in the literature review; the personal notes should be clearly separated or labeled as unreviewed/speculative, or kept in a different space",
      "The student should stop drafting literature reviews altogether",
      "All published paper summaries should be removed so only the student's personal notes remain"
    ],
    correct: 1,
    explanation: "When unreviewed personal speculation sits in the same reference pool as summaries of established published work, there's a real risk that Claude's literature review draft treats the speculative notes with the same weight as vetted findings; clearly separating or labeling the personal notes (or keeping them elsewhere) avoids that confusion (B). Assuming no distinction matters (A) ignores this real risk. Literature review drafting is a reasonable task for Claude to assist with (C). Removing the actual published summaries and keeping only the speculation (D) would make the review far less reliable, not more."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A daycare center director wants staff to stop manually typing out the center's licensing number, address, and hours every time they draft a parent-facing note using Claude.",
    question: "What is the most efficient fix?",
    options: [
      "Add those stable, recurring facts (licensing number, address, hours) to the relevant Project's instructions or attached files so staff don't have to retype them each time",
      "Have staff continue typing them manually every time, since this information changes too often to save",
      "Remove this basic information from all parent-facing notes entirely",
      "Print the information on paper and staple it to every note by hand instead of using Claude for it"
    ],
    correct: 0,
    explanation: "Stable facts like a licensing number, address, and hours are exactly the kind of recurring information worth saving once in Project instructions or files so staff don't retype them repeatedly (A). This information is quite stable, not frequently changing, so (B) mischaracterizes the situation. Removing basic contact information from parent communications (C) would make the notes less useful, not more efficient. Manually stapling paper info (D) sidesteps the actual efficiency problem being solved."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A boutique hotel's front desk manager sets up a Project with the hotel's cancellation policy, local attraction recommendations, and shuttle schedule to help staff answer guest emails. Six months later, the shuttle schedule changes for the winter season, but the cancellation policy and attraction list remain the same.",
    question: "What is the correct maintenance action?",
    options: [
      "Replace the entire Project's contents, including the still-accurate cancellation policy and attraction list, just to be thorough",
      "Update only the shuttle schedule file, since that's the piece that actually changed; the cancellation policy and attractions remain accurate and don't need to be touched",
      "Leave everything as-is since one changed detail doesn't matter",
      "Delete the whole Project since any change means the entire setup is now unreliable"
    ],
    correct: 1,
    explanation: "Good knowledge maintenance means updating only what actually changed — the shuttle schedule — while leaving still-accurate material like the cancellation policy and attraction list untouched (B). Wholesale replacement of unchanged, accurate content (A) is unnecessary effort. Leaving the outdated shuttle schedule unchanged (C) would cause Claude to give guests wrong shuttle information. Deleting the entire Project over one outdated file (D) is a drastic overreaction that discards still-useful material."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A large membership association runs six regional chapters, each with its own Project containing that chapter's bylaws, event calendar, and local board contacts. Headquarters wants to add a single shared policy — a new code of conduct — that must appear identically across all six chapters' materials.",
    question: "What is the best way to handle this shared addition given that each chapter's Project is a separate space?",
    options: [
      "Add the new code of conduct document to each of the six chapter Projects individually, and establish a clear process for keeping all six copies in sync if it's ever revised, since Project content doesn't automatically propagate between separate Projects",
      "Add it to only one chapter's Project and assume the other five will automatically receive it",
      "Merge all six chapters into a single combined Project so there's only one copy to manage, disregarding that each chapter has distinct bylaws and local contacts",
      "Skip adding it anywhere and just tell staff to remember the code of conduct by heart"
    ],
    correct: 0,
    explanation: "Since Projects are separate and content doesn't sync between them automatically, achieving identical coverage across all six chapters requires deliberately adding the document to each one, plus a real process for future updates so all six stay consistent (A). Assuming automatic propagation to the other five (B) is a false assumption about how Projects work. Merging all chapters together (C) would blur genuinely distinct chapter-specific bylaws and contacts, creating a worse problem than the one being solved. Relying on staff memory instead of documented material (D) forfeits the reliability a Project provides."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A yoga studio owner asks Claude, in a single standalone conversation, to help pick a name for a brand-new pop-up class series she's launching once, with no plans to reuse this context again.",
    question: "Is it worth creating a Project just for this naming brainstorm?",
    options: [
      "Yes, every brainstorming task requires its own dedicated Project regardless of how one-off it is",
      "Not particularly — for a single, non-recurring brainstorm with no ongoing reference material, a plain conversation accomplishes the goal without the overhead of a Project",
      "No, because Claude cannot help with naming or brainstorming tasks",
      "Yes, but only if she also uploads her entire studio's financial records"
    ],
    correct: 1,
    explanation: "For a one-time brainstorm with no expectation of reuse, a plain conversation is sufficient and proportionate — there's no ongoing reference material that justifies Project overhead (B). Not every task needs a dedicated Project, especially standalone ones (A). Claude is well suited to naming and brainstorming tasks (C). Uploading unrelated financial records (D) has nothing to do with a naming brainstorm and would be an odd, irrelevant addition."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A physical therapy clinic wants a Project to help front-desk staff draft appointment confirmation messages. They're deciding what to include: (1) the clinic's appointment confirmation template and tone guidelines, or (2) individual patients' full treatment history and medical notes, which aren't needed for a simple confirmation message.",
    question: "What should the Project include, based on sound scoping practice?",
    options: [
      "Only the confirmation template and tone guidelines — the material actually relevant to the task — while leaving out unrelated and unnecessarily sensitive patient treatment history that isn't needed for this purpose",
      "Both, since including maximum information regardless of relevance always produces the best outcome",
      "Only the treatment history and medical notes, leaving out the confirmation template",
      "Neither — this task should never involve any reference material"
    ],
    correct: 0,
    explanation: "Good scoping means including only what's actually needed for the task — the confirmation template and tone guidelines — and leaving out unrelated, more sensitive material like full treatment histories that the task doesn't require (A). Including everything regardless of relevance (B) unnecessarily exposes sensitive data with no benefit to a simple confirmation message. Including only the treatment history while omitting the actually-relevant template (C) inverts the correct scoping entirely. Some reference material clearly helps this task, so including none (D) forgoes an easy efficiency gain."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A mid-size accounting firm has separate Projects for 'Tax Season Client Letters' and 'Year-Round Bookkeeping Support.' A partner wants to merge them into one Project to 'reduce the number of Projects we manage.'",
    question: "Is reducing the Project count on its own a good enough reason to merge these two?",
    options: [
      "Yes, fewer Projects is always better regardless of what each one is used for",
      "Not necessarily — if the two Projects serve genuinely different purposes with different reference material and timing (tax season vs. year-round work), merging them just to reduce a count could reintroduce the clutter and irrelevance problems that separate, purpose-scoped Projects were meant to avoid",
      "Yes, because claude.ai limits the total number of Projects any team can have to two",
      "No, because Projects can never be merged under any circumstances, technically or practically"
    ],
    correct: 1,
    explanation: "Minimizing the raw count of Projects isn't inherently valuable if it comes at the cost of remixing genuinely distinct purposes and reference material back together, undoing the benefits that scoped separation provided (B). 'Fewer is always better' (A) ignores the actual tradeoff. There's no such platform-enforced Project limit driving this decision (C). The real consideration is whether merging makes sense given the tasks' relatedness, not a technical impossibility (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A boutique PR agency wants new hires to ramp up quickly. They're deciding between (a) documenting their pitch-writing standards and press release format once in a shared Project available to the whole team, or (b) having a senior staffer explain the standards verbally to each new hire individually, from memory, every time someone joins.",
    question: "Which approach better supports consistent, scalable knowledge management?",
    options: [
      "The verbal, memory-based explanation, since face-to-face onboarding is inherently more accurate than any written material",
      "The shared Project with documented standards, since it ensures every new hire (and Claude, when helping draft pitches) references the same accurate, consistent source material rather than depending on one person's memory and time each time",
      "Neither matters since new hires never actually use Claude for pitch writing",
      "The verbal approach, because written standards in a Project can never be updated once created"
    ],
    correct: 1,
    explanation: "A documented, shared Project ensures consistency across every new hire and every Claude-assisted draft, and doesn't depend on a senior staffer's memory or availability each time someone joins (B). Verbal explanations from memory (A) are more prone to drift and inconsistency over repeated retellings, not inherently more accurate. Pitch and press release writing is a very plausible use case for Claude (C). Project files can absolutely be updated over time, so (D) is factually wrong."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A private tutoring company's founder maintains a single account-wide custom instruction that says, in part, 'Always use examples from 7th-grade algebra when explaining concepts.' She also tutors high school seniors preparing for standardized tests using the same account.",
    question: "What is the issue with this setup, and what should change?",
    options: [
      "There is no issue; account-wide instructions should always be as specific as possible regardless of variation in her actual work",
      "The 7th-grade algebra example preference is too narrowly tied to one specific tutoring context to be a good account-wide default; it would be better scoped to a Project specific to that grade level, while her account-wide instructions stay general enough to fit all her tutoring work",
      "She should stop tutoring high schoolers since her account-wide instructions can't be changed",
      "Account-wide instructions cannot reference any subject matter at all"
    ],
    correct: 1,
    explanation: "A preference tied to one narrow context (7th-grade algebra examples) doesn't fit as an account-wide default when her work spans multiple grade levels and subjects; it's better placed in a Project scoped to that specific grade level, keeping account-wide instructions general enough to apply broadly (B). Applying an overly specific rule everywhere (A) causes exactly the mismatch described with her high school seniors. She isn't locked out of tutoring other levels because of one instruction (C), and account-wide instructions can absolutely reference subject matter when it's genuinely universal (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A nonprofit's volunteer coordinator uploaded a spreadsheet of volunteer sign-ups to a Project three months ago. Since then, dozens of new volunteers have signed up through a separate system, and the coordinator has been manually re-describing the new sign-ups in the chat each time instead of updating the Project's file.",
    question: "What would make this workflow more efficient and accurate?",
    options: [
      "Continue describing new sign-ups manually in every conversation indefinitely, since updating the actual file provides no benefit",
      "Periodically update or replace the spreadsheet in the Project with current sign-up data, so Claude has accurate, complete information available without needing manual re-description each time",
      "Delete the original spreadsheet and never replace it with anything",
      "Stop tracking volunteer sign-ups altogether since spreadsheets cannot be reused"
    ],
    correct: 1,
    explanation: "Periodically refreshing the uploaded spreadsheet with current data restores the core benefit of a Project — accurate context available automatically — instead of manually re-describing new information every time (B). Continuing the manual workaround indefinitely (A) is the inefficient pattern that should be fixed. Deleting the file with no replacement (C) removes reference material without addressing the actual staleness issue. Spreadsheets can absolutely be reused and updated in a Project, so (D) is incorrect."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A boutique law firm's paralegal uses a Project for drafting standard NDAs. She's now asked to help with a completely different task — organizing the firm's holiday party — and considers just using the same NDA Project since it's already open on her screen.",
    question: "What is the better practice here?",
    options: [
      "Use the same NDA Project for the holiday party planning too, since switching between Projects is inconvenient",
      "Start a new conversation or Project appropriate to the unrelated holiday party task, keeping the NDA Project focused on its original legal drafting purpose rather than mixing in unrelated party-planning content",
      "Delete the NDA Project since it's now going to be used for something else",
      "Rename the NDA Project to include 'Holiday Party' in the title without changing anything else"
    ],
    correct: 1,
    explanation: "Keeping the NDA Project scoped to its original legal-drafting purpose and starting separate space for the unrelated party-planning task preserves clarity and avoids mixing unrelated content into a focused, purpose-built Project (B). Using the same Project purely out of convenience (A) reintroduces the scope-mixing problem that focused Projects are meant to avoid. Deleting a working, useful Project (C) is unnecessary. Renaming it to reflect two unrelated purposes without actually separating the content (D) doesn't fix the underlying mixing issue."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A national franchise's corporate training team built one master Project containing training material for all 40 franchise locations, including location-specific manager names, local health-code variations, and city-specific permit requirements, all combined. Franchisees have started reporting that answers sometimes include another city's permit requirements by mistake.",
    question: "What restructuring would best resolve this while preserving the value of shared corporate content?",
    options: [
      "Split into a shared 'Corporate Training Core' Project for content common to all locations (general training curriculum, brand standards), plus separate location-specific Projects (or clearly labeled sections) for each city's permit requirements and local manager info, so location-specific facts don't bleed across cities",
      "Keep everything in the single master Project exactly as-is, since separating things would lose the benefit of having 'everything in one place'",
      "Remove all city-specific permit information entirely so no location ever has accurate local requirements",
      "Create a new master Project every time any single city's requirement changes, without addressing the underlying mixing of all 40 cities' data"
    ],
    correct: 0,
    explanation: "The reported problem — cross-city permit mixing — stems directly from combining genuinely location-specific facts for 40 different cities into one undifferentiated pool; splitting into a shared core plus location-specific spaces isolates each city's unique details while still preserving common training content in one place (A). Leaving it as-is (B) preserves the exact cause of the reported errors. Removing permit info entirely (C) throws away needed accurate information rather than fixing the mixing problem. Recreating the whole master Project on every single city's change (D) is excessive churn that doesn't address the structural cause of the mixing."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A commercial cleaning company's operations lead maintains a Project with client-site instructions (access codes, special requests, supply closets locations) for use by team leads writing shift handoff notes. A client recently changed their building's access code, and the operations lead updated it in the Project the same day.",
    question: "What is the benefit of this prompt update, illustrated in this scenario?",
    options: [
      "It has no real benefit since Claude ignores changes to Project files after they're first uploaded",
      "It ensures that any shift handoff note drafted going forward reflects the correct, current access code rather than a stale one that could cause a team to be locked out",
      "It automatically notifies the client that their access code was changed",
      "It prevents the client from ever changing their access code again in the future"
    ],
    correct: 1,
    explanation: "Promptly updating the Project's file means every future handoff note drafted from that point on reflects the correct, current access code, directly preventing the real-world problem of a team being locked out with outdated information (B). Claude does use updated file content going forward, so (A) is incorrect. Updating a Project file has no effect on external client notifications (C) or on the client's ability to change codes again later (D)."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A boutique wealth management firm's advisor wants to make sure sensitive details from one client's portfolio conversations never surface when he's drafting a totally different client's quarterly letter. He currently uses one big Project called 'All Clients' for every client's correspondence and portfolio notes.",
    question: "What structural change would best reduce the risk of one client's details leaking into another client's materials?",
    options: [
      "Continue using the single combined Project, since risk of cross-client leakage is purely theoretical and never actually happens",
      "Split into a separate Project per client, so each client's portfolio notes and correspondence are isolated from every other client's, directly reducing the chance that irrelevant or sensitive details from one surface in another's draft",
      "Add a note at the top of the combined Project saying 'don't mix up clients,' while keeping all data merged in one place",
      "Stop taking notes on client portfolios altogether to avoid the risk"
    ],
    correct: 1,
    explanation: "Separating clients into individual Projects creates an actual structural boundary — each Project only contains that one client's material — which directly reduces the chance that another client's sensitive details show up in an unrelated draft (B). The risk of mixing client-specific reference material together is a real, not merely theoretical, concern in a combined Project (A). A note asking Claude not to mix things up (C) doesn't remove the underlying mixed data sitting in the same reference pool. Abandoning note-taking altogether (D) is an extreme step that discards a legitimately useful practice instead of fixing the actual structural issue."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A produce distributor's logistics team keeps a Project with delivery route maps and driver contact info. It's been six weeks since a driver roster change, and no one has updated the Project even though two drivers have left and two new ones joined.",
    question: "What is the risk of this gap, and what should be done?",
    options: [
      "There's no risk since Claude always defaults to correct, current information even if the uploaded file is outdated",
      "Draft communications referencing driver contacts could list former drivers who are no longer with the company and omit the two new ones; the roster file should be updated as soon as possible to reflect current staff",
      "The Project should be permanently abandoned since roster changes make all Projects useless",
      "The two departed drivers should be left in the file forever as a historical record with no separation from current staff"
    ],
    correct: 1,
    explanation: "An outdated roster file risks Claude producing communications that reference former employees and miss current ones, which is a real, avoidable accuracy problem fixed simply by updating the file (B). Claude does not have independent knowledge of real-world staffing changes beyond what's provided, so it can't correct this on its own (ruling out A). One overdue update doesn't make the whole Project useless (C) — it's a routine maintenance task. Leaving departed drivers mixed in indefinitely without distinction (D) preserves exactly the ambiguity causing the risk."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A regional airline's crew scheduling office is choosing between two options for a Project meant to help draft crew notification emails: (a) upload the full 200-page collective bargaining agreement as-is, or (b) extract and upload just the specific sections relevant to scheduling notices (rest requirements, notice periods) as a shorter, focused reference document.",
    question: "Which is generally the better approach for this specific Project's purpose, and why?",
    options: [
      "Uploading the full 200-page document, since more source material always guarantees better, more accurate answers no matter the task",
      "Extracting and uploading just the relevant sections, since a focused, purpose-matched reference document is easier for the task at hand and avoids diluting the Project's relevant content with hundreds of pages covering unrelated topics",
      "Neither option matters since file length has no bearing on anything",
      "Uploading neither document and instead re-typing the relevant clauses from memory in every single conversation"
    ],
    correct: 1,
    explanation: "For a narrowly scoped task like drafting scheduling notices, a focused extract of just the relevant sections keeps the Project's reference material tightly matched to its purpose, rather than surrounding it with hundreds of pages of unrelated agreement content (B). More volume isn't automatically better if most of it is irrelevant to the specific task (A). The scope and relevance of uploaded content does matter for how effectively it's used (C). Manually re-typing clauses from memory every time (D) is more error-prone and defeats the purpose of having a reference file at all."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "An office manager at a small design studio is setting her personal account-wide preferences and wants to decide whether 'always respond in a bulleted list format' belongs there, given that she uses Claude for many different kinds of tasks — meeting notes, vendor emails, and personal task lists.",
    question: "Is this a reasonable account-wide preference for her to set?",
    options: [
      "No, formatting preferences can never be saved anywhere in claude.ai",
      "Yes — since she wants this formatting style applied broadly across many different kinds of tasks she does, an account-wide preference is a reasonable place for it, though she can still override it in specific Projects if a particular task calls for prose instead",
      "No, formatting preferences must be tied to a single specific Project and cannot apply more broadly",
      "Yes, but only if she deletes all her existing Projects first"
    ],
    correct: 1,
    explanation: "Since she wants this style applied consistently across many different, unrelated tasks, account-wide preferences are a reasonable and appropriate place to set it, and she retains the ability to override it for a specific Project or conversation where prose fits better (B). Formatting preferences absolutely can be saved (ruling out A). They aren't restricted to only Project-level scope (C). There's no need to delete anything first to set an account-wide preference (D)."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A independent insurance agent handles both auto and home policies. He's building a Project to help him draft policy comparison summaries for prospective clients and is deciding how to organize reference material for both policy types.",
    question: "What is a sound way to structure this?",
    options: [
      "Combine all auto and home policy details into one unlabeled block of text so it loads faster",
      "Clearly organize the uploaded files or notes by policy type (e.g., separate files or clearly labeled sections for auto vs. home) within the Project, so Claude can reliably distinguish which details apply to which policy type when drafting a specific comparison",
      "Only include auto policy information and just skip home policies from the Project entirely",
      "Ask Claude to guess which policy type the client is asking about without providing any organized reference material"
    ],
    correct: 1,
    explanation: "Clearly labeled or separated content by policy type within the Project helps Claude reliably distinguish auto-specific from home-specific details when drafting a given comparison, reducing the risk of details getting crossed (B). Merging everything into one unlabeled block (A) increases ambiguity rather than improving load speed in any meaningful way for this purpose. Omitting home policy information entirely (C) makes the Project incomplete for its stated dual purpose. Providing no organized reference material at all (D) forces Claude to guess, which is less reliable than giving it clear, organized context."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A city library system's outreach team has been using one shared Project for two years to draft newsletters, event flyers, and grant applications together. A new outreach coordinator, reviewing it for the first time, finds it hard to tell which uploaded files are current versus superseded by newer drafts, since nothing has ever been removed.",
    question: "What is the best next step for the coordinator?",
    options: [
      "Leave everything exactly as it is, since a two-year-old Project is inherently more valuable the more files it accumulates over time regardless of currency",
      "Do a cleanup pass — identify which files are current and actively relevant, archive or remove clearly superseded drafts, and consider whether the Project's now-mixed purposes (newsletters, flyers, grants) would be better split into more focused Projects going forward",
      "Delete the entire Project immediately without reviewing any of its contents first",
      "Rename every file to the same generic name so they're indistinguishable"
    ],
    correct: 1,
    explanation: "A deliberate cleanup pass — identifying current versus superseded material and reconsidering whether the Project's scope has grown too broad — directly addresses both the staleness and the mixed-purpose clutter the coordinator identified (B). Treating age and volume as inherently valuable regardless of currency (A) is the mindset that led to the current mess. Deleting everything without review (C) risks losing genuinely useful, still-accurate material. Making all files indistinguishable through generic renaming (D) would make the problem drastically worse, not better."
  }
];
