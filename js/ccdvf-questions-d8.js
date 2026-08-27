export const QUESTIONS_D8 = [
  {
    domain: 8,
    difficulty: 3,
    scenario: "A backend team's CLAUDE.md file currently just says 'This is a Node.js project. Write good code.' Developers still find that Claude Code frequently uses the wrong test runner and puts new files in the wrong directories.",
    question: "What change to CLAUDE.md would most directly fix this?",
    options: [
      "Add specific, actionable details: the exact test command to run, the directory structure and where new files of each type belong, and naming conventions",
      "Shorten the file further so Claude Code parses it faster",
      "Remove CLAUDE.md entirely and rely on Claude Code inferring conventions from existing code each session",
      "Move the file to each developer's home directory instead of the project root"
    ],
    correct: 0,
    explanation: "CLAUDE.md is only useful to the extent it contains concrete, specific instructions; vague statements like 'write good code' give Claude Code nothing actionable (A is correct). Shortening it further (B) would remove detail, not add it. Deleting the file (C) discards the mechanism meant to solve exactly this problem. A project-root CLAUDE.md is shared context for anyone working in that repo; moving it to a personal home directory (D) would stop it from being picked up as project context at all in the intended way."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A team wants every file Claude Code edits to automatically be run through their project's linter and auto-formatter immediately after the edit, without relying on the developer or Claude to remember to do it.",
    question: "Which mechanism is designed for this?",
    options: [
      "A custom slash command that developers must remember to invoke after each session",
      "A PostToolUse hook that runs the linter/formatter after file-editing tool calls",
      "A more detailed CLAUDE.md instruction asking Claude Code to 'always format files after editing'",
      "A subagent invoked manually at the end of the day to reformat all changed files"
    ],
    correct: 1,
    explanation: "Hooks are event handlers that fire automatically on tool-use events (e.g. PostToolUse after an Edit/Write), making them the right tool for deterministic, unattended automation like linting (B). A slash command (A) still requires someone to remember to run it. A CLAUDE.md instruction (C) is a request the model may or may not follow consistently, not a guaranteed enforcement mechanism. A manually-invoked subagent (D) also depends on someone remembering to trigger it and only runs in batch at day's end, not immediately per edit."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "A developer is setting up Claude Code for a project that touches production infrastructure scripts. They want Claude Code to be able to run tests and read files freely, but they're worried about it accidentally running destructive commands like `rm -rf` or deploy scripts without explicit approval.",
    question: "What is the most appropriate permissions approach?",
    options: [
      "Grant blanket approval for all Bash commands so Claude Code never interrupts the workflow with prompts",
      "Disable Claude Code's tool use entirely and only use it for read-only chat about the code",
      "Configure settings to allow safe, frequently-used commands (like the test runner) while leaving destructive or deploy-related commands to require explicit per-use approval",
      "Only ever run Claude Code with no settings file, accepting the default prompt-every-time behavior for all commands including harmless ones"
    ],
    correct: 2,
    explanation: "Scoping permissions lets you allow low-risk, repetitive commands automatically while keeping a human in the loop for high-risk actions like deploys or destructive file operations (C). Blanket-approving all Bash commands (A) removes exactly the safety check needed for a production-adjacent repo. Disabling tool use (B) throws away most of Claude Code's value. Prompting for every single command including safe ones (D) is safe but needlessly slows down routine work that could be pre-approved."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A developer repeatedly types out the same multi-step prompt in Claude Code: 'Review the diff for security issues, check for exposed secrets, and summarize risk level.' They do this before every commit.",
    question: "What is the best way to streamline this recurring workflow?",
    options: [
      "Create a custom slash command that encapsulates the review prompt, so it can be invoked with a short command each time",
      "Add the entire review prompt as a permanent line item in CLAUDE.md so it runs automatically on every message",
      "Paste the prompt into a new chat window each time to keep sessions isolated",
      "Ask a colleague to run the review manually going forward"
    ],
    correct: 0,
    explanation: "Custom slash commands are built for exactly this: packaging a reusable, parameterized prompt so it can be invoked on demand with a short command instead of retyped (A). Putting it in CLAUDE.md (B) would make Claude try to apply that review framing to every unrelated interaction, not just pre-commit checks. Retyping into new windows (C) doesn't reduce the repeated effort. Delegating to a colleague (D) doesn't use Claude Code's automation capability at all."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "A CI pipeline needs Claude Code to automatically review each pull request's diff and post a comment, running without any human present to approve prompts or type responses interactively.",
    question: "What is required to make this work correctly in CI?",
    options: [
      "Run Claude Code in its normal interactive mode inside the CI job and hope no prompts appear",
      "Run Claude Code in headless/non-interactive mode with pre-configured permissions so it can execute its needed actions without waiting on interactive approval",
      "Have a human remotely log into the CI runner to approve each tool-use prompt as it happens",
      "Skip permission configuration entirely, since CI environments bypass all permission checks by default"
    ],
    correct: 1,
    explanation: "Headless/non-interactive mode plus pre-scoped permissions is exactly what makes unattended CI use possible: Claude Code performs the automation without pausing for a human to respond to prompts (B). Interactive mode (A) will stall waiting for input it will never receive in an unattended pipeline. Having a human on standby (C) defeats the purpose of automation. CI does not implicitly bypass permission checks (D) — permissions still need to be explicitly configured for headless execution."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A team wants Claude Code to be able to query their internal ticketing system and pull ticket details into context while working on a bug fix, rather than developers manually copy-pasting ticket text into the chat.",
    question: "Which Claude Code feature is designed for this kind of integration?",
    options: [
      "CLAUDE.md, by hardcoding a snapshot of all current tickets into the file",
      "A pre-commit hook that blocks commits until a ticket number is typed manually",
      "MCP (Model Context Protocol) integration, connecting Claude Code to an MCP server that exposes the ticketing system's data and actions as tools",
      "A custom slash command that opens the ticketing system's website in a browser for the developer to read manually"
    ],
    correct: 2,
    explanation: "MCP is the mechanism for giving Claude Code live access to external tools and data sources, like an internal ticketing system, so it can query and act on that data directly (C). Hardcoding a ticket snapshot into CLAUDE.md (A) would go stale immediately and doesn't scale to many tickets. A commit-blocking hook (B) enforces a process step but doesn't give Claude Code data access. Opening a browser for manual reading (D) is exactly the manual copy-paste workflow the team wants to eliminate."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A large monorepo has dozens of subprojects. Developers report that Claude Code sessions in the repo root are slow to get useful context and sometimes edit files in the wrong subproject.",
    question: "What is the best organizational practice to address this?",
    options: [
      "Delete unused subprojects from the repo so there is less code overall",
      "Add nested CLAUDE.md files within each subproject directory describing that subproject's specific structure and conventions, in addition to a root-level CLAUDE.md for repo-wide context",
      "Require every session to start with a full manual directory listing pasted into the chat",
      "Keep only a single root CLAUDE.md but make it exhaustively describe every subproject's internals in one giant file"
    ],
    correct: 1,
    explanation: "Claude Code supports nested CLAUDE.md files, so each subproject can carry its own focused, locally-relevant context while the root file covers repo-wide conventions — this scopes context appropriately and helps Claude Code navigate large monorepos efficiently (B). Deleting subprojects (A) isn't a realistic fix for an active monorepo. Manually pasting directory listings every session (C) is repetitive manual work the tool is meant to avoid. One giant root file covering every subproject's internals (D) becomes unwieldy and buries the specific details relevant to whichever subproject is being worked on."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "While fixing a bug, a developer's Claude Code session also needs to research an unrelated part of the codebase to understand a data format, generating a lot of exploratory back-and-forth that isn't relevant to the actual fix.",
    question: "How can subagents help in this situation?",
    options: [
      "The exploratory research can be delegated to a subagent, which does the investigation in its own context and returns a summary, keeping the main session focused on the actual bug fix",
      "Subagents replace the main session entirely so all future work happens only in subagents",
      "Subagents are only useful for writing code, never for research or investigation tasks",
      "Subagents share the exact same context window as the main session, so delegating work to one doesn't change what accumulates in context"
    ],
    correct: 0,
    explanation: "Subagents run in their own separate context and can be delegated a self-contained task like exploratory research, reporting back a concise result instead of flooding the main session's context with intermediate exploration (A). Subagents complement, not replace, the main session (B). They can be used for research and investigation as well as coding tasks (C). Their key value is precisely that they do NOT share the main session's context window (D) — that's why delegating to one keeps the main session cleaner."
  },
  {
    domain: 8,
    difficulty: 2,
    scenario: "A new engineer joins a team that has been using Claude Code for months. They open the project and ask a teammate how Claude Code already seems to 'know' the team's branching strategy, commit message format, and which directories are auto-generated and should never be edited.",
    question: "What is the most likely explanation?",
    options: [
      "Claude Code has permanent memory of every project it has ever been used on across all users",
      "The project's CLAUDE.md file documents these conventions, so that context loads automatically for anyone working in the project with Claude Code",
      "Claude Code automatically infers all team conventions purely by scanning git history with no configuration needed",
      "A teammate must retype these conventions into the chat at the start of every single session"
    ],
    correct: 1,
    explanation: "This is the core purpose of CLAUDE.md: capturing project conventions once so they're automatically available to anyone using Claude Code on that project (B). Claude Code doesn't retain persistent cross-user memory of every project (A). While it can infer some things from code, reliably knowing conventions like commit format and off-limits directories generally comes from explicit documentation, not just git-history scanning (C). If someone had to retype it every session (D), a new engineer wouldn't observe this behavior working automatically."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "A security-conscious team is configuring Claude Code's permissions for a repository that contains both application code and a `deploy/` directory with scripts that push directly to production.",
    question: "Which permission configuration best balances productivity and safety?",
    options: [
      "Allow all file edits and shell commands anywhere in the repo, including inside deploy/, to avoid interrupting the developer's flow",
      "Block Claude Code from reading any file in the repo so it can't accidentally learn about the deploy scripts",
      "Deny all Bash execution repo-wide, including running the test suite, to be maximally cautious",
      "Allow routine development commands (tests, linters, builds) broadly, while requiring explicit approval or denying execution of scripts within deploy/"
    ],
    correct: 3,
    explanation: "Scoping permissions so routine, low-risk actions are pre-approved while high-risk actions (deploy scripts) require explicit approval or are denied gives the best balance of productivity and safety (D). Allowing everything including deploy scripts (A) creates exactly the production risk the team is worried about. Blocking all file reads (B) would cripple Claude Code's ability to help with the application code too. Denying all Bash execution (C) is overly restrictive and blocks harmless, useful actions like running tests."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A team notices that whenever Claude Code edits a database migration file, developers occasionally forget to also update the corresponding schema documentation file, causing them to drift out of sync.",
    question: "Which approach would most reliably prevent this drift going forward?",
    options: [
      "A PostToolUse hook that detects edits to migration files and automatically reminds or triggers a check that the schema docs were also updated",
      "A note in the team's onboarding wiki asking developers to remember to update docs",
      "A CLAUDE.md instruction asking Claude Code to 'try to remember' to update docs, with no automated enforcement",
      "Periodically auditing the two files by hand once a quarter"
    ],
    correct: 0,
    explanation: "A hook tied to the relevant tool-use event (editing a migration file) can automatically enforce or flag the related action every time, which is far more reliable than relying on memory (A). An onboarding wiki note (B) is easy to forget in practice, which is the exact problem described. A soft CLAUDE.md request without enforcement (C) is better than nothing but not deterministic. A quarterly manual audit (D) lets drift accumulate for months between checks instead of catching it immediately."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A developer wants to run Claude Code as part of a nightly automated job that scans the codebase for outdated dependency usage and opens a summary report, with no one watching the terminal.",
    question: "Which combination of features is most appropriate for this job?",
    options: [
      "Interactive mode plus a custom slash command, run manually each night by whichever developer is on call",
      "Headless/non-interactive execution triggered by the job scheduler, with permissions pre-scoped to the read/write actions the scan needs",
      "A hook that fires only when a developer manually opens Claude Code the next morning",
      "MCP integration alone, without addressing how the session itself gets started or how commands get approved"
    ],
    correct: 1,
    explanation: "Unattended, scheduled automation is exactly what headless mode plus pre-scoped permissions supports — the job can start, run, and finish without any human present to respond to prompts (B). Interactive mode run manually (A) requires a human present, defeating the 'nightly, unwatched' requirement. A hook tied to a developer manually opening the tool (C) doesn't run on a schedule independent of human action. MCP integration (D) may help the scan reach external data, but it doesn't address how the session is launched or how it runs unattended, which is the core requirement here."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "A developer sets up an MCP server that gives Claude Code access to their company's internal analytics database, including write access to run arbitrary queries. They plan to use the default configuration for a shared project.",
    question: "What is the most important consideration before enabling this broadly for the team?",
    options: [
      "MCP servers only ever provide read-only access by design, so no additional consideration is needed",
      "Whether the scope of access (e.g. read-only vs. write, which tables/actions are exposed) and the permission settings around invoking those MCP tools are appropriately restricted for a shared team context",
      "Whether the MCP server's name is descriptive enough for developers to recognize it",
      "Whether the analytics database has a visually appealing dashboard UI"
    ],
    correct: 1,
    explanation: "MCP servers can expose powerful actions, including writes, so before rolling one out broadly the team should evaluate and scope exactly what access it grants and how permissions gate its use — the same care applied to any tool with real side effects (B). MCP servers are not inherently read-only (A); this one explicitly has write access to run arbitrary queries. Naming clarity (C) and UI aesthetics (D) are irrelevant to the actual risk of unscoped write access to a production analytics database."
  },
  {
    domain: 8,
    difficulty: 3,
    scenario: "A team maintains three different custom slash commands for generating release notes, running the full regression suite, and scaffolding a new API endpoint. A new hire asks why these exist instead of just typing out full prompts each time.",
    question: "What is the best explanation of the benefit custom slash commands provide here?",
    options: [
      "They let the team invoke well-defined, reusable, multi-step prompts consistently and quickly, instead of everyone retyping and possibly varying the same instructions each time",
      "They are required before Claude Code can access any tools at all",
      "They replace the need for a CLAUDE.md file in the project",
      "They only work for a single specific developer's account and can't be shared with teammates"
    ],
    correct: 0,
    explanation: "Custom slash commands package a prompt/workflow so it can be invoked consistently and quickly by name, avoiding retyping and reducing variance between team members' phrasing (A). They aren't a prerequisite for tool access in general (B) — that's governed by permissions/settings. They serve a different purpose than CLAUDE.md and don't replace it (C); CLAUDE.md provides persistent background context, while slash commands trigger specific on-demand actions. Project-level slash commands can be checked into the repo and shared across the team, not limited to one developer (D)."
  },
  {
    domain: 8,
    difficulty: 4,
    scenario: "One developer on a shared repository personally likes to auto-approve a specific rarely-used CLI tool for quick experiments, but the rest of the team has agreed that no one should auto-approve that tool because of past mistakes with it.",
    question: "What is the best way to satisfy both the individual preference and the team agreement?",
    options: [
      "Edit the project's shared settings file (checked into the repo) to auto-approve the tool for everyone, since that is the only place permissions can be set",
      "Ask the whole team to change their agreement so it matches what one developer wants",
      "Put the auto-approval in that developer's personal/local settings, which apply only to their own environment, while the shared project settings committed to the repo remain unchanged for the rest of the team",
      "Have the developer manually approve the tool every single time and stop wanting the shortcut"
    ],
    correct: 2,
    explanation: "Claude Code separates shared, repo-level settings from personal/local settings, so an individual can adjust their own environment's permissions without changing what's committed and applied to the rest of the team (C). Editing the shared project settings (A) would impose the individual's preference on everyone, violating the team agreement. Changing the team's agreement (B) isn't a settings solution and overrides a decision made for good reason. Forcing manual approval every time (D) ignores that personal-scope settings exist to solve exactly this kind of individual customization."
  }
];
