// Auto-extracted curated seed questions (from official study-guide practice engine)
export const SEED_QUESTIONS = [
  {
    "id": "d1q1",
    "domain": 1,
    "difficulty": 2,
    "scenario": "Your agentic loop terminates by checking if Claude's response text contains 'TASK_COMPLETE'.",
    "question": "What is wrong with this approach?",
    "options": [
      "Nothing -- this is a recommended pattern",
      "It should check for 'DONE' instead",
      "It parses natural language for loop termination instead of using the stop_reason field",
      "It should check for 'TASK_COMPLETE' at the start of the response instead of anywhere in it"
    ],
    "correct": 2,
    "explanation": "Parsing natural language signals is an anti-pattern. Use stop_reason ('end_turn' vs 'tool_use') for reliable loop control.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q2",
    "domain": 1,
    "difficulty": 3,
    "scenario": "A coordinator agent always routes queries through all 5 subagents regardless of query complexity.",
    "question": "What is the primary issue?",
    "options": [
      "The pipeline needs more subagents",
      "The coordinator should dynamically select subagents based on query requirements",
      "Simple queries should use a different coordinator",
      "All subagents should run in parallel"
    ],
    "correct": 1,
    "explanation": "Coordinators should analyze query complexity and selectively invoke relevant subagents, not always use the full pipeline.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q3",
    "domain": 1,
    "difficulty": 2,
    "scenario": "A subagent needs findings from a prior web search agent.",
    "question": "How should context be passed?",
    "options": [
      "Subagents automatically inherit parent context",
      "Include complete findings directly in the subagent prompt with structured metadata",
      "Save to a shared database",
      "Use fork_session"
    ],
    "correct": 1,
    "explanation": "Subagents do NOT inherit parent context. Context must be explicitly passed in the prompt with structured data formats.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q4",
    "domain": 1,
    "difficulty": 4,
    "scenario": "Identity verification before financial operations is enforced via system prompt: 'Always verify identity before processing refunds.'",
    "question": "Why is this insufficient for production?",
    "options": [
      "System prompts should repeat the instruction multiple times for emphasis",
      "Prompt instructions have non-zero failure rate -- use programmatic enforcement for deterministic compliance",
      "The instruction should be in CLAUDE.md",
      "The prompt needs more detail"
    ],
    "correct": 1,
    "explanation": "When guaranteed compliance is required, prompt-based enforcement is insufficient. Use hooks or prerequisite gates.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q5",
    "domain": 1,
    "difficulty": 3,
    "scenario": "You need to explore two refactoring approaches from a shared codebase analysis.",
    "question": "Which session approach is best?",
    "options": [
      "Two new sessions from scratch",
      "fork_session to branch from the shared baseline",
      "Sequential exploration in one session",
      "Resume the same session twice"
    ],
    "correct": 1,
    "explanation": "fork_session creates parallel branches from a shared analysis point, ideal for comparing approaches.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q6",
    "domain": 1,
    "difficulty": 3,
    "scenario": "A PostToolUse hook normalizes timestamps: one tool returns Unix, another ISO 8601, a third MM/DD/YYYY.",
    "question": "What is the primary benefit?",
    "options": [
      "Better log display",
      "Consistent data formats prevent reasoning errors from heterogeneous tool outputs",
      "Reduced token usage",
      "Faster tool execution"
    ],
    "correct": 1,
    "explanation": "Normalizing heterogeneous formats prevents the agent from misinterpreting temporal data.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q7",
    "domain": 1,
    "difficulty": 2,
    "scenario": "A customer says 'I want to talk to a human' to your support agent.",
    "question": "What should the agent do?",
    "options": [
      "Try to resolve the issue first to demonstrate capability",
      "Escalate immediately -- honor explicit human requests",
      "Ask why they want a human",
      "Ignore and continue the conversation"
    ],
    "correct": 1,
    "explanation": "Explicit customer requests for human agents should be honored immediately.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q8",
    "domain": 1,
    "difficulty": 4,
    "scenario": "Your multi-agent research system's synthesis reports have gaps in certain topic areas.",
    "question": "What coordinator change would help?",
    "options": [
      "Larger model for synthesis",
      "Iterative refinement: evaluate synthesis for gaps, re-delegate targeted queries, re-synthesize until coverage is sufficient",
      "More subagents",
      "Larger token budget"
    ],
    "correct": 1,
    "explanation": "Iterative refinement loops where the coordinator checks for gaps and re-delegates are the key pattern.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q9",
    "domain": 1,
    "difficulty": 3,
    "scenario": "You're splitting a 500-line PR review across agents.",
    "question": "What decomposition works best?",
    "options": [
      "One agent for the whole PR",
      "Per-file local analysis plus separate cross-file integration pass",
      "One agent per function, regardless of file boundaries",
      "Split files evenly by line count among agents"
    ],
    "correct": 1,
    "explanation": "Per-file passes + cross-file integration avoids attention dilution while catching both local and integration issues.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q10",
    "domain": 1,
    "difficulty": 2,
    "scenario": "Resuming a Claude Code session after modifying previously analyzed files.",
    "question": "What is recommended?",
    "options": [
      "Just resume -- Claude detects changes",
      "Inform the session about specific file changes for targeted re-analysis",
      "Delete and restart",
      "Roll back changes first"
    ],
    "correct": 1,
    "explanation": "Tell the resumed session about specific changes for targeted re-analysis rather than full re-exploration.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q11",
    "domain": 1,
    "difficulty": 4,
    "scenario": "A customer asks about both billing and returns in the same message.",
    "question": "Best architecture?",
    "options": [
      "Handle sequentially in one response",
      "Decompose into distinct items, investigate each in parallel, synthesize unified resolution",
      "Ask customer to pick one",
      "Route to billing only"
    ],
    "correct": 1,
    "explanation": "Decompose multi-concern requests and investigate each (potentially parallel) before unified response.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q12",
    "domain": 1,
    "difficulty": 3,
    "scenario": "Your agent needs to spawn 3 parallel research subagents.",
    "question": "How should this be done?",
    "options": [
      "Three sequential Task calls across three turns",
      "Emit multiple Task tool calls in a single coordinator response",
      "Create three separate sessions",
      "Spawn subagents using a background job queue outside the conversation"
    ],
    "correct": 1,
    "explanation": "Spawn parallel subagents by emitting multiple Task calls in one response, not across separate turns.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q13",
    "domain": 1,
    "difficulty": 3,
    "scenario": "Coordinator prompts specify step-by-step procedures for each subagent.",
    "question": "What's the issue?",
    "options": [
      "Steps are too detailed",
      "Specifying procedures reduces adaptability -- specify goals and quality criteria instead",
      "Not enough steps",
      "Steps should be numbered"
    ],
    "correct": 1,
    "explanation": "Design coordinator prompts with research goals and quality criteria, enabling subagent adaptability.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q14",
    "domain": 1,
    "difficulty": 4,
    "scenario": "A hook blocks refunds above $500 and redirects to supervisor.",
    "question": "What hook type is this?",
    "options": [
      "PostToolUse",
      "PreToolUse tool call interception",
      "Stop hook",
      "Notification hook"
    ],
    "correct": 1,
    "explanation": "Tool call interception hooks inspect outgoing calls and block policy violations before execution.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q15",
    "domain": 1,
    "difficulty": 2,
    "scenario": "Choosing between fixed pipeline and dynamic decomposition.",
    "question": "When is a fixed pipeline better?",
    "options": [
      "Always",
      "For predictable multi-aspect reviews with known stages",
      "Never -- dynamic is always superior",
      "Only for simple tasks"
    ],
    "correct": 1,
    "explanation": "Fixed pipelines work well for predictable workflows. Dynamic decomposition suits open-ended investigation tasks.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d1q16",
    "domain": 1,
    "difficulty": 3,
    "scenario": "Customer is frustrated but the issue is within agent capability.",
    "question": "Best approach?",
    "options": [
      "Escalate because of frustration",
      "Acknowledge frustration, offer to resolve; escalate only if customer reiterates preference for human",
      "Ignore the frustration",
      "Apologize and end conversation"
    ],
    "correct": 1,
    "explanation": "Acknowledge emotion while offering resolution. Escalate only when the customer explicitly insists on a human.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q1",
    "domain": 2,
    "difficulty": 2,
    "scenario": "Claude consistently picks Grep over your custom search_docs MCP tool.",
    "question": "Most likely cause?",
    "options": [
      "Grep is hardcoded as default",
      "Tool descriptions overlap -- differentiate your tool's description from Grep's",
      "MCP server is slow",
      "Claude prefers built-in tools"
    ],
    "correct": 1,
    "explanation": "Ambiguous descriptions cause misrouting. Make your tool's description clearly different from built-in alternatives.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q2",
    "domain": 2,
    "difficulty": 3,
    "scenario": "Your MCP tool returns a generic 'Operation failed' for all errors.",
    "question": "What's the problem?",
    "options": [
      "The message is too short",
      "Uniform errors prevent the agent from making appropriate recovery decisions",
      "The tool should retry internally and never surface errors to Claude",
      "Only transient errors need messages"
    ],
    "correct": 1,
    "explanation": "Without error categorization (transient/validation/permission) and retry guidance, Claude can't recover intelligently.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q3",
    "domain": 2,
    "difficulty": 2,
    "scenario": "Team needs shared MCP server configuration.",
    "question": "Where should it go?",
    "options": [
      "~/.claude.json (personal)",
      ".mcp.json in project root (shared via git)",
      "CLAUDE.md",
      "settings.json"
    ],
    "correct": 1,
    "explanation": "Project-scoped .mcp.json is shared via version control. Use ~/.claude.json for personal/experimental servers.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q4",
    "domain": 2,
    "difficulty": 3,
    "scenario": "A synthesis agent keeps trying web searches instead of synthesizing.",
    "question": "How to fix?",
    "options": [
      "Better prompt instructions",
      "Restrict the synthesis agent's tools to only those relevant to its role",
      "Add a system reminder before each turn telling it not to search",
      "Use a smarter model"
    ],
    "correct": 1,
    "explanation": "Restrict each agent's tools to its role. Agents with extra tools tend to misuse them.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q5",
    "domain": 2,
    "difficulty": 4,
    "scenario": "MCP tool returns empty results for a query.",
    "question": "How should this differ from an access failure?",
    "options": [
      "They should be identical",
      "Empty results = successful query with no matches; access failure = needs retry decision. Use different response patterns.",
      "Return errors for both",
      "Empty results are never valid"
    ],
    "correct": 1,
    "explanation": "Distinguishing valid empty results from access failures enables correct coordinator decisions (accept vs retry).",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q6",
    "domain": 2,
    "difficulty": 3,
    "scenario": "You have 18 tools registered for one agent.",
    "question": "What's the likely issue?",
    "options": [
      "The tools need clearer names, but the count is fine",
      "Too many tools degrade selection reliability -- restrict to 4-5 relevant tools per agent",
      "Tools should be combined",
      "Group the 18 tools into categories the agent can browse"
    ],
    "correct": 1,
    "explanation": "Giving an agent too many tools increases decision complexity and degrades selection accuracy.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q8",
    "domain": 2,
    "difficulty": 3,
    "scenario": "Agent prefers built-in Grep over your more capable semantic search MCP tool.",
    "question": "What should you change?",
    "options": [
      "Remove Grep from available tools",
      "Enhance MCP tool description to explain capabilities and why it's better than Grep for semantic search",
      "Use tool_choice to force it",
      "Change the tool name"
    ],
    "correct": 1,
    "explanation": "Improve tool descriptions to clearly differentiate capabilities. Don't just remove alternatives.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q9",
    "domain": 2,
    "difficulty": 2,
    "scenario": "Using Edit tool but it fails due to non-unique text match.",
    "question": "Best fallback?",
    "options": [
      "Use Bash with sed",
      "Use Read to get full file, then Write the modified version",
      "Try a shorter old_string",
      "Give up on the edit"
    ],
    "correct": 1,
    "explanation": "When Edit can't find unique anchor text, Read + Write is the reliable fallback.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q10",
    "domain": 2,
    "difficulty": 4,
    "scenario": "Subagent encounters a transient database timeout.",
    "question": "Best error handling?",
    "options": [
      "Propagate to coordinator immediately",
      "Retry locally within the subagent; only propagate if local recovery fails, including partial results",
      "Suppress the error and return empty",
      "Terminate the entire workflow"
    ],
    "correct": 1,
    "explanation": "Local recovery for transient failures, propagating only unrecoverable errors with partial results and context.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q11",
    "domain": 2,
    "difficulty": 3,
    "scenario": "You need Claude to ALWAYS call a tool instead of responding with text.",
    "question": "Which setting?",
    "options": [
      "tool_choice: 'auto'",
      "tool_choice: 'any'",
      "tool_choice: 'required'",
      "tool_choice: 'force'"
    ],
    "correct": 1,
    "explanation": "'any' forces the model to call at least one tool. 'auto' allows text responses.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d2q12",
    "domain": 2,
    "difficulty": 3,
    "scenario": "Choosing between community MCP server and custom implementation for Jira integration.",
    "question": "Best approach?",
    "options": [
      "Always build custom",
      "Use existing community server for standard integrations; reserve custom for team-specific workflows",
      "Community servers are unreliable",
      "Build custom then open-source it"
    ],
    "correct": 1,
    "explanation": "Don't reinvent the wheel. Community servers work for standard integrations.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q1",
    "domain": 3,
    "difficulty": 2,
    "scenario": "New team member doesn't receive project coding standards.",
    "question": "Most likely cause?",
    "options": [
      "Standards are in the team lead's ~/.claude/CLAUDE.md (user-level)",
      "The member's editor doesn't support CLAUDE.md",
      "The project doesn't have any standards",
      "Claude Code needs to be reinstalled"
    ],
    "correct": 0,
    "explanation": "User-level CLAUDE.md only applies to that user. Move standards to project-level CLAUDE.md for team-wide sharing.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q2",
    "domain": 3,
    "difficulty": 3,
    "scenario": "Testing conventions need to apply to all *.test.tsx files across the entire monorepo.",
    "question": "Best configuration approach?",
    "options": [
      "CLAUDE.md in every test directory",
      "Path-specific rule in .claude/rules/testing.md scoped with a glob like **/*.test.tsx",
      "One global CLAUDE.md for the whole monorepo",
      "A custom slash command"
    ],
    "correct": 1,
    "explanation": "Path-specific rules with glob patterns apply conventions to files by type regardless of directory location.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q3",
    "domain": 3,
    "difficulty": 2,
    "scenario": "Running Claude Code in a CI/CD pipeline.",
    "question": "Which flag prevents interactive input hangs?",
    "options": [
      "-v (verbose)",
      "-p (print/non-interactive)",
      "-s (silent)",
      "-b (batch)"
    ],
    "correct": 1,
    "explanation": "The -p (--print) flag runs Claude Code in non-interactive mode, essential for automated pipelines.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q4",
    "domain": 3,
    "difficulty": 3,
    "scenario": "Complex monolith-to-microservices refactoring affecting 45+ files.",
    "question": "Should you use plan mode or direct execution?",
    "options": [
      "Direct -- just start making changes",
      "Plan mode -- explore and design before committing to changes",
      "Neither -- do it manually",
      "Direct for investigation, plan for execution"
    ],
    "correct": 1,
    "explanation": "Plan mode is designed for complex tasks with architectural implications and multi-file modifications.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q5",
    "domain": 3,
    "difficulty": 3,
    "scenario": "A skill produces verbose exploratory output during codebase analysis.",
    "question": "What frontmatter option prevents polluting the main session?",
    "options": [
      "context: isolate",
      "context: fork",
      "context: separate",
      "context: new"
    ],
    "correct": 1,
    "explanation": "context: fork runs the skill in an isolated sub-agent context.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q6",
    "domain": 3,
    "difficulty": 2,
    "scenario": "Creating a custom slash command the entire team should use.",
    "question": "Where should the command file go?",
    "options": [
      "~/.claude/commands/ (personal)",
      ".claude/commands/ (project, committed to git)",
      "/usr/local/claude/commands/",
      "In the CLAUDE.md file"
    ],
    "correct": 1,
    "explanation": "Project-scoped commands in .claude/commands/ are shared via version control.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q7",
    "domain": 3,
    "difficulty": 4,
    "scenario": "Claude generates tests that duplicate existing test scenarios.",
    "question": "How to prevent this in CI?",
    "options": [
      "Delete existing tests first",
      "Provide existing test files in context so Claude avoids duplicates",
      "Ask Claude to check its own output for duplicates after generating",
      "Instruct Claude to be more creative with test scenarios"
    ],
    "correct": 1,
    "explanation": "Including existing tests in context helps Claude generate complementary, non-duplicate test scenarios.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q8",
    "domain": 3,
    "difficulty": 3,
    "scenario": "Code review in CI produces duplicate comments on re-runs after new commits.",
    "question": "How to fix?",
    "options": [
      "Clear all previous comments",
      "Include prior review findings in context, instructing Claude to report only new or unaddressed issues",
      "Reduce the review scope",
      "Use a different model each time"
    ],
    "correct": 1,
    "explanation": "Including prior findings prevents duplicate comments while ensuring new issues are still caught.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q9",
    "domain": 3,
    "difficulty": 2,
    "scenario": "CLAUDE.md is getting too large and hard to maintain.",
    "question": "Best organizational approach?",
    "options": [
      "Delete most of it",
      "Split into focused topic files in .claude/rules/ (testing.md, api.md, deployment.md)",
      "Move to a wiki instead",
      "Keep it large but add a table of contents"
    ],
    "correct": 1,
    "explanation": ".claude/rules/ directory organizes rules by topic with optional path scoping.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q10",
    "domain": 3,
    "difficulty": 4,
    "scenario": "Claude Code CI review needs machine-parseable structured output for PR comments.",
    "question": "Which CLI flags?",
    "options": [
      "-p only",
      "-p --output-format json --json-schema",
      "-p --format markdown",
      "-p --structured"
    ],
    "correct": 1,
    "explanation": "--output-format json and --json-schema produce machine-parseable structured findings.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q11",
    "domain": 3,
    "difficulty": 3,
    "scenario": "Natural language descriptions produce inconsistent output formats.",
    "question": "Most effective fix?",
    "options": [
      "Longer descriptions",
      "Provide 2-3 concrete input/output examples to clarify the transformation",
      "Use a different model",
      "Add 'be consistent' to the prompt"
    ],
    "correct": 1,
    "explanation": "Few-shot examples are the most effective technique for achieving consistent output formatting.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d3q12",
    "domain": 3,
    "difficulty": 3,
    "scenario": "Implementing a feature in an unfamiliar domain.",
    "question": "What technique helps surface considerations you haven't anticipated?",
    "options": [
      "Just start coding",
      "Use the interview pattern -- have Claude ask questions before implementing",
      "Read all documentation first",
      "Copy code from a similar project"
    ],
    "correct": 1,
    "explanation": "The interview pattern surfaces design considerations the developer may not have anticipated.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q1",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Code review produces too many false positive style warnings, undermining developer trust.",
    "question": "Best fix?",
    "options": [
      "Add 'be conservative' to the prompt",
      "Define explicit categorical criteria: report bugs and security issues, skip minor style concerns",
      "Lower temperature",
      "Use a smaller model"
    ],
    "correct": 1,
    "explanation": "Explicit criteria outperform vague conservatism instructions. Define specific categories to report vs skip.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q2",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Extraction pipeline returns null for fields that exist in the source document.",
    "question": "What technique would help?",
    "options": [
      "Retry without changes",
      "Add few-shot examples showing correct extraction from varied document formats",
      "Ask the model to infer missing fields from context when not explicitly stated",
      "Simplify the schema by removing the fields that return null"
    ],
    "correct": 1,
    "explanation": "Few-shot examples demonstrating extraction from varied formats reduce empty/null extraction errors.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q3",
    "domain": 4,
    "difficulty": 2,
    "scenario": "You need guaranteed JSON output with no syntax errors.",
    "question": "Best approach?",
    "options": [
      "Ask for JSON in the prompt",
      "Use tool_use with a JSON Schema -- guarantees schema compliance",
      "Set output format to JSON",
      "Parse and fix any JSON errors"
    ],
    "correct": 1,
    "explanation": "tool_use with JSON schemas is the most reliable way to guarantee syntactically valid, schema-compliant output.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q4",
    "domain": 4,
    "difficulty": 4,
    "scenario": "Source document may or may not contain a 'methodology' section.",
    "question": "How should the schema handle this field?",
    "options": [
      "Make it required -- Claude will find it",
      "Make it optional (nullable) to prevent fabrication when information is absent",
      "Don't include the field",
      "Make it an enum with 'not found' option"
    ],
    "correct": 1,
    "explanation": "Optional/nullable fields prevent the model from fabricating values to satisfy required fields.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q5",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Validation-retry loop keeps failing because the source document doesn't contain the required information.",
    "question": "What should you recognize?",
    "options": [
      "Need more retries",
      "Retries are ineffective when information is absent from the source -- don't retry",
      "Use a better model",
      "Increase temperature for creativity"
    ],
    "correct": 1,
    "explanation": "Identify when retries are futile (data absent vs format wrong) to avoid wasted API calls.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q6",
    "domain": 4,
    "difficulty": 2,
    "scenario": "Non-urgent weekly analytics reports need to be generated at lowest cost.",
    "question": "Which API approach?",
    "options": [
      "Real-time Messages API",
      "Message Batches API -- 50% cost savings, appropriate for non-blocking workloads",
      "Streaming API",
      "Agent SDK"
    ],
    "correct": 1,
    "explanation": "Batch API offers 50% savings and is ideal for latency-tolerant workloads like weekly reports.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q7",
    "domain": 4,
    "difficulty": 4,
    "scenario": "Same Claude session generates code and then reviews it for bugs.",
    "question": "What's the reliability concern?",
    "options": [
      "No concern",
      "The reviewing instance retains generation reasoning context, making it biased toward its own output",
      "It will find too many bugs",
      "Token usage doubles"
    ],
    "correct": 1,
    "explanation": "Self-review in the same session is biased. Use an independent instance for objective review.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q8",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Large multi-file code review produces contradictory findings.",
    "question": "What architecture prevents this?",
    "options": [
      "One pass with a larger context",
      "Split into per-file local passes plus separate cross-file integration pass",
      "Review only the diff",
      "Use multiple models"
    ],
    "correct": 1,
    "explanation": "Per-file + integration passes prevent attention dilution that causes contradictions.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q9",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Batch processing job has a 30-hour SLA.",
    "question": "Appropriate submission frequency?",
    "options": [
      "Once at the start",
      "Every 4 hours to account for 24-hour batch processing window",
      "Every 30 minutes",
      "Once per day"
    ],
    "correct": 1,
    "explanation": "With 24h batch processing, 4-hour submissions guarantee meeting the 30-hour SLA.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q11",
    "domain": 4,
    "difficulty": 3,
    "scenario": "Developers dismiss most code review findings as false positives.",
    "question": "How to restore trust?",
    "options": [
      "Lower the confidence threshold so more findings surface",
      "Temporarily disable high-FP categories while improving prompts for those categories",
      "Remove the code review system",
      "Add confidence scores"
    ],
    "correct": 1,
    "explanation": "Temporarily disabling high-FP categories restores trust while you improve the underlying prompts.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d4q12",
    "domain": 4,
    "difficulty": 4,
    "scenario": "Extraction schema uses required fields, but some source documents don't contain all information.",
    "question": "What should be changed?",
    "options": [
      "Add validation to fill in missing data",
      "Use enum with 'unclear' for ambiguous cases and 'other' with detail strings for extensibility",
      "Make all fields required with defaults",
      "Remove those fields"
    ],
    "correct": 1,
    "explanation": "Enum values like 'unclear' handle ambiguity gracefully. 'other' + detail fields enable extensible categorization.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q1",
    "domain": 5,
    "difficulty": 3,
    "scenario": "Extended customer support session loses track of specific dollar amounts and dates mentioned earlier.",
    "question": "Best mitigation?",
    "options": [
      "Longer context window",
      "Extract transactional facts into a persistent 'case facts' block included in each prompt",
      "Start new sessions more often",
      "Use a notebook"
    ],
    "correct": 1,
    "explanation": "Persistent structured 'case facts' blocks prevent progressive summarization from losing numerical values.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q2",
    "domain": 5,
    "difficulty": 3,
    "scenario": "Agent research report omits findings from the middle section of a long input.",
    "question": "What causes this?",
    "options": [
      "The middle section was summarized more aggressively during compaction",
      "The 'lost in the middle' effect -- models process beginning and end more reliably",
      "Token limit reached",
      "The tokenizer splits mid-section content into malformed tokens"
    ],
    "correct": 1,
    "explanation": "Place key summaries at the beginning of aggregated inputs to mitigate position effects.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q3",
    "domain": 5,
    "difficulty": 2,
    "scenario": "Customer is frustrated about a billing error. Agent can resolve it.",
    "question": "Should the agent escalate?",
    "options": [
      "Yes -- frustrated customers always need a human",
      "No -- acknowledge frustration, offer resolution; escalate only if customer insists on human",
      "Yes -- billing issues require human approval",
      "Ignore the frustration"
    ],
    "correct": 1,
    "explanation": "Frustration alone isn't an escalation trigger. Offer resolution for issues within capability.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q4",
    "domain": 5,
    "difficulty": 4,
    "scenario": "Multi-agent pipeline: search agent fails with 'service unavailable'.",
    "question": "Best error propagation?",
    "options": [
      "Silently return empty results",
      "Return structured error with failure type, attempted query, and suggested alternatives for coordinator recovery",
      "Terminate entire workflow",
      "Retry indefinitely"
    ],
    "correct": 1,
    "explanation": "Structured error context enables intelligent coordinator recovery decisions.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q5",
    "domain": 5,
    "difficulty": 3,
    "scenario": "Extended codebase exploration session. Claude starts referencing 'typical patterns' instead of specific classes.",
    "question": "What's happening and how to fix?",
    "options": [
      "Claude is hallucinating",
      "Context degradation -- use scratchpad files to persist key findings and spawn subagents for new research",
      "Model is too small",
      "Session timeout"
    ],
    "correct": 1,
    "explanation": "Context degradation in long sessions. Scratchpad files and subagent delegation preserve high-level understanding.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q6",
    "domain": 5,
    "difficulty": 3,
    "scenario": "97% overall extraction accuracy but poor performance on handwritten invoices.",
    "question": "What metric practice is needed?",
    "options": [
      "Overall accuracy is sufficient",
      "Stratified analysis by document type -- aggregate metrics mask segment-specific problems",
      "Process more documents",
      "Use a better model"
    ],
    "correct": 1,
    "explanation": "Validate accuracy by document type and field before trusting aggregate metrics.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q7",
    "domain": 5,
    "difficulty": 4,
    "scenario": "Research synthesis merges findings from 3 sources, but one source's statistics conflict with the others.",
    "question": "How should synthesis handle this?",
    "options": [
      "Pick the most recent source",
      "Annotate the conflict with source attribution rather than silently selecting one value",
      "Average the values",
      "Exclude the outlier"
    ],
    "correct": 1,
    "explanation": "Preserve conflicting values with explicit source attribution. Let downstream consumers decide how to reconcile.",
    "cat": "curated",
    "src": "seed"
  },
  {
    "id": "d5q8",
    "domain": 5,
    "difficulty": 3,
    "scenario": "Tool results accumulate 40+ fields per order lookup, but only 5 are relevant.",
    "question": "What should be done?",
    "options": [
      "Keep all fields for completeness",
      "Trim tool outputs to relevant fields before they accumulate in context",
      "Increase context window",
      "Summarize all fields"
    ],
    "correct": 1,
    "explanation": "Trimming verbose tool outputs preserves context budget for what actually matters.",
    "cat": "curated",
    "src": "seed"
  }
];
