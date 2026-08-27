// CCAR-P Domain 1 — Solution Design & Architecture (17% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
// No `id` — assigned by js/bank-ccar-p.js from array position. No `style` —
// every CCAR-P question is scenario-style (no parametric/computational track).
export const QUESTIONS_D1 = [
  {
    domain: 1,
    difficulty: 3,
    scenario: "A financial services company is designing a Claude-powered claims-processing system expected to handle 50,000 claims per day across three regional data centers, each with independent regulatory requirements around data residency. The architecture team must decide how to structure the agentic system before implementation begins.",
    question: "Which architectural approach best satisfies both the throughput requirement and the regulatory constraint?",
    options: [
      "A single centralized orchestrator in one region that routes all claims through it, with regional data anonymized before transmission",
      "Independent regional deployments, each with its own orchestrator and tool access scoped to that region's data, coordinated only through aggregate, non-identifying reporting",
      "One shared orchestrator per region, but all three writing claim decisions to a single global database for consistency",
      "A single global orchestrator with region selected dynamically per request based on load, not data origin"
    ],
    correct: 1,
    explanation: "Data residency requirements mean claim data generally cannot leave its region of origin, ruling out any design that centralizes raw data processing in one place (A, C, D). Independent regional deployments that only surface aggregate, non-identifying signals upward satisfy both compliance and throughput — each region scales independently and the compliance boundary is architectural, not a policy applied after the fact."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A mid-sized e-commerce retailer wants to add a Claude-based customer support assistant that answers order-status questions, processes simple returns, and escalates complex disputes to human agents. Engineering leadership is debating whether this warrants a multi-agent architecture or a single agent with several tools.",
    question: "Given the described scope, which design is most appropriate at launch?",
    options: [
      "A single agent equipped with order-lookup, returns-processing, and escalation tools, since the tasks are sequential and share the same conversational context",
      "A multi-agent system with separate specialist agents for order status, returns, and escalation, coordinated by an orchestrator",
      "Three fully independent chat applications, one per task, that the customer selects between manually",
      "A single agent with no tools that only drafts responses for a human agent to send"
    ],
    correct: 0,
    explanation: "The tasks described are low-complexity, share conversational context, and don't require independent scaling, specialized models, or conflicting tool permissions — the hallmarks that justify multi-agent decomposition. A single tool-using agent handles this scope with far less operational overhead. Splitting into an orchestrator with specialists (B) or separate applications (C) adds coordination cost with no corresponding benefit, and removing tool access (D) defeats the automation goal."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A hospital network is building a clinical documentation assistant that drafts visit summaries from physician dictation. Some notes must be available to the treating physician within seconds during the visit, while final coded summaries for billing can be produced afterward. The compliance team also requires that PHI never rests unencrypted outside the hospital's private network segment.",
    question: "Which processing model best fits the mixed latency requirements described?",
    options: [
      "Process everything synchronously in real time, including billing coding, so all outputs are available before the visit ends",
      "Process everything asynchronously in nightly batch jobs to reduce infrastructure cost",
      "Use synchronous processing for the in-visit draft summary and asynchronous batch processing for downstream billing coding",
      "Use asynchronous processing for the in-visit draft and synchronous processing for billing coding"
    ],
    correct: 2,
    explanation: "The scenario explicitly separates a real-time need (in-visit draft) from a deferred one (billing codes), so the architecture should mirror that: synchronous for the time-sensitive path, asynchronous for the rest. Forcing billing coding to be synchronous (A) adds latency and cost with no clinical benefit, pure batch (B) fails the real-time requirement entirely, and inverting the two (D) fails the visit's actual latency need."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A logistics company operating in North America is acquiring a European freight-forwarding firm. The combined company must support GDPR data-subject rights for EU shipment and customer data while continuing to run its existing North American Claude-based routing-optimization system unchanged. Leadership wants a single roadmap presented to the board within a month.",
    question: "Which integration strategy best balances speed of the board deadline with long-term compliance risk?",
    options: [
      "Immediately merge all shipment data into the existing North American data warehouse and apply GDPR access controls at the application layer only",
      "Leave the two systems fully separate indefinitely, with no shared reporting or optimization capability across regions",
      "Stand up an EU-resident data and processing boundary for EU shipment data with its own agentic pipeline, and integrate only aggregate, de-identified metrics into the shared reporting layer, migrating deeper integration later once legal review is complete",
      "Route all EU data through the North American system but encrypt it at rest so GDPR obligations are satisfied"
    ],
    correct: 2,
    explanation: "A phased approach that establishes proper data residency for EU data immediately, while deferring deeper system integration until legal review completes, meets the board deadline without creating unmanaged compliance exposure. Merging data into a US warehouse (A) or relying on encryption alone (D) does not satisfy GDPR's residency and processing-location expectations, since access-layer controls and encryption do not change where processing legally occurs. Permanent separation (B) is safe but abandons the stated business goal of a unified roadmap and cross-region optimization."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A B2B SaaS company's platform is used by thousands of independent customer organizations, each wanting a Claude-powered analytics assistant that only ever sees that customer's own data. Engineering must choose the multi-tenancy model before the feature ships.",
    question: "Which architecture best prevents cross-tenant data exposure while remaining operable at scale?",
    options: [
      "Shared infrastructure and shared agent context across all tenants, with prompts instructing the model not to reference other tenants' data",
      "Logical tenant isolation enforced at the data-access and tool layer (per-tenant credentials and scoped retrieval), on shared compute infrastructure",
      "A fully separate physical deployment — infrastructure, orchestrator, and storage — provisioned per customer, regardless of customer size",
      "One shared database with a single service account used by the agent for all tenants, relying on the model to filter query results correctly"
    ],
    correct: 1,
    explanation: "Logical isolation enforced structurally — scoped credentials and retrieval boundaries at the data-access layer — prevents cross-tenant leakage without the cost and operational burden of provisioning fully separate stacks per customer. Relying on prompt instructions or model behavior to enforce isolation (A, D) is not a security boundary and can fail under adversarial or malformed input. Full physical per-tenant isolation (C) is sometimes justified for very large or highly regulated customers, but as a blanket default across thousands of tenants it is operationally unsustainable."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A regional insurance carrier is deciding whether to build a custom document-extraction pipeline in-house or purchase a third-party solution that integrates with Claude for policy document ingestion. Their document formats are largely standard industry forms with only minor carrier-specific variations.",
    question: "From a solution-architecture standpoint, what should most heavily influence the build-versus-buy decision here?",
    options: [
      "Whether the in-house team enjoys building extraction pipelines",
      "Whether the carrier's document variations are unique enough that no vendor solution can be configured to handle them without unsustainable custom engineering",
      "Whether building in-house would look better in a press release",
      "Whether a competitor has already built a similar system"
    ],
    correct: 1,
    explanation: "The architecturally relevant question is whether the problem is genuinely differentiated (justifying custom build) or largely standard (favoring a configurable vendor solution). Since the scenario states the forms are largely standard with only minor variation, a vendor solution is likely to be both faster and cheaper to maintain. Team preference, PR optics, and competitor behavior are not sound architectural decision criteria."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A manufacturing company runs quality-inspection workflows on factory floors with intermittent, sometimes hours-long, internet outages due to remote plant locations. They want to introduce a Claude-based defect-triage assistant that helps floor supervisors classify and route defective parts.",
    question: "Which architecture best accommodates the connectivity constraint while still delivering the assistant's value?",
    options: [
      "Require constant cloud connectivity and pause the entire inspection workflow during any outage",
      "Design a local queuing and caching layer at each plant that buffers requests during outages and syncs with the cloud-based agent once connectivity returns, with a defined manual fallback procedure for extended outages",
      "Replicate the entire cloud orchestration stack physically inside every plant to eliminate any network dependency",
      "Abandon the AI-assisted workflow entirely and route all defect decisions to a central call center"
    ],
    correct: 1,
    explanation: "A local buffering layer with a defined manual fallback lets the plant keep operating during outages without requiring full duplication of the cloud stack, and reconciles automatically once connectivity is restored. Halting operations during outages (A) is operationally unacceptable in a manufacturing context, full on-premise replication at every plant (C) is disproportionately costly for intermittent rather than permanent disconnection, and abandoning the AI workflow (D) discards the stated business value without solving the underlying constraint."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A law firm wants to deploy a Claude-based contract review assistant across its litigation, corporate, and real estate practice groups. Each group has distinct document types, review checklists, and confidentiality walls between certain client matters that must be strictly enforced, including from other groups within the same firm.",
    question: "Which system-boundary design best respects the confidentiality walls while still allowing the firm to run one platform?",
    options: [
      "One shared agent and shared document index across all practice groups, relying on staff to avoid opening matters they shouldn't see",
      "Separate agent instances per practice group with per-matter access control enforced at the retrieval layer, so cross-group and cross-wall access is structurally prevented rather than merely discouraged",
      "One shared agent with a single prompt instructing it never to reveal information across ethical walls",
      "Three entirely separate vendor platforms with no shared architecture, review process, or governance at all"
    ],
    correct: 1,
    explanation: "Ethical walls are a hard confidentiality requirement in legal practice and must be enforced structurally at the access-control layer, not through staff discipline or prompt instructions, both of which can fail. Separate instances with per-matter access control give each group appropriate isolation while still operating under one governed platform, which is compatible with running unified tooling and audit processes. Fully fragmenting into unrelated vendor platforms (D) sacrifices manageability and consistency without providing any confidentiality benefit beyond what access controls alone already deliver."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A streaming media company wants to use Claude to generate personalized content summaries for its recommendation emails, sent once daily to 12 million subscribers. There is no requirement for the summaries to reflect activity from the last few minutes.",
    question: "Which processing pattern is most cost-effective and appropriate for this use case?",
    options: [
      "Real-time synchronous generation triggered the instant each subscriber opens the app",
      "Asynchronous batch generation run on a daily schedule ahead of the email send window",
      "A dedicated always-on streaming pipeline that regenerates every subscriber's summary continuously",
      "Manual generation by a content team member for each subscriber"
    ],
    correct: 1,
    explanation: "Since the requirement is a once-daily email with no real-time freshness need, batch generation ahead of the send window is by far the most cost- and resource-efficient pattern, and it's easy to monitor and retry as a bounded job. Real-time or continuous streaming generation (A, C) would consume far more compute for no perceptible user benefit, and manual generation (D) does not scale to 12 million subscribers."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A telecom operator's customer-service Claude deployment currently runs as a single monolithic service handling billing questions, network troubleshooting, and plan changes together. As usage has grown, a bug fix to the troubleshooting logic recently caused an unrelated outage in billing responses, and the three functions now have very different scaling and update cadences.",
    question: "What is the most appropriate architectural response to this situation?",
    options: [
      "Add more code review to the monolith so unrelated bugs are caught before release",
      "Decompose the system into independently deployable services per function (billing, troubleshooting, plan changes) with clear interfaces, so a change in one cannot break another",
      "Freeze all further changes to the troubleshooting logic to avoid future incidents",
      "Merge the three functions even more tightly so a single team owns and tests everything together"
    ],
    correct: 1,
    explanation: "The described symptoms — an unrelated outage from a single change, and diverging scaling and release needs — are the classic signal that a monolith should be decomposed into independently deployable services with well-defined interfaces. This directly addresses the blast-radius problem while allowing each function to scale and release on its own cadence. Extra code review (A) or freezing changes (C) treat the symptom rather than the architectural root cause, and merging further (D) would make the coupling problem worse, not better."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "An energy utility operates SCADA control systems that must remain isolated from the public internet for safety-certification reasons, but also wants a Claude-based assistant to help operations staff interpret sensor anomaly reports. The compliance function has stated clearly that no live production control-system data may transit any external network under any circumstances.",
    question: "Which architecture satisfies the assistant's purpose without violating the isolation requirement?",
    options: [
      "Grant the cloud-based agent direct read access to the SCADA network through a firewall exception",
      "Deploy the assistant entirely within the isolated network segment, using a self-hosted or air-gapped-compatible deployment model, with no data path to external networks",
      "Mirror SCADA data to a cloud staging database nightly, then let the agent query the mirror",
      "Ask operations staff to manually retype anomaly data into a separate cloud-connected chat interface"
    ],
    correct: 1,
    explanation: "The stated constraint is absolute — no control-system data may transit external networks — so the only compliant option is deploying the assistant fully within the isolated segment with no external data path. A firewall exception (A) or nightly mirroring to the cloud (C) both create exactly the external data path the compliance requirement forbids. Manual retyping (D) is error-prone and, if it recreates sensitive data on a cloud-connected system, may still violate the isolation intent even if not the literal network path."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A university system wants to deploy a Claude-based academic advising assistant across 12 campuses. Each campus currently has its own student information system, admissions rules, and IT team with limited coordination between them. Central IT wants one consistent advising experience for students who transfer between campuses.",
    question: "Which organizational-architecture alignment is most likely to succeed, given Conway's Law considerations?",
    options: [
      "Let each campus IT team build its own advising assistant independently, and hope the experiences converge naturally over time",
      "Mandate a single central team build and own the entire system end to end, bypassing campus IT teams entirely",
      "Establish a central platform team that owns shared orchestration, a common data model, and integration contracts, while campus teams own their local system connectors within that contract",
      "Require the 12 campus IT teams to reach unanimous consensus on every design decision before any implementation begins"
    ],
    correct: 2,
    explanation: "Given Conway's Law, if 12 loosely coordinated teams each build independently, the resulting system will mirror that fragmentation and consistency will not emerge naturally (A). A central platform team owning shared contracts, with campus teams responsible for their own local integration within that contract, aligns the organizational structure with the desired unified-but-locally-integrated architecture. Fully centralizing everything (B) ignores that campus teams hold necessary local system knowledge, and requiring unanimous consensus (D) will stall delivery indefinitely across 12 stakeholders."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A gaming studio's live-service title uses a Claude-based system to generate dynamic NPC dialogue during gameplay. Player testing shows that dialogue generated with noticeable delay breaks immersion, but the studio also wants richer, longer-form dialogue for cutscenes where a short delay is acceptable.",
    question: "Which architectural split best serves both needs?",
    options: [
      "Use one model configuration and one processing path for both in-game NPC dialogue and cutscene dialogue, tuned for the strictest latency need",
      "Use a low-latency, tightly scoped generation path for real-time in-game NPC dialogue, and a separate, higher-latency-tolerant path for richer cutscene content generated ahead of time or with a longer budget",
      "Pre-script all NPC dialogue by hand and reserve Claude only for cutscenes",
      "Generate all dialogue, both in-game and cutscene, well in advance during a nightly batch job"
    ],
    correct: 1,
    explanation: "The two use cases have genuinely different latency tolerances and content needs, so splitting into a low-latency real-time path and a separate higher-latency path for richer, pre-generatable content lets each be optimized appropriately. Forcing one path to serve both (A) either sacrifices cutscene richness or fails the in-game latency bar. Fully hand-scripting NPC dialogue (C) abandons the stated goal of dynamic generation, and full nightly batch generation (D) cannot serve dialogue that depends on unpredictable, in-session player actions."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A payments processor must guarantee 99.99% availability for its Claude-based fraud-review assistant, which supports human analysts in approving or blocking suspicious transactions. The current architecture runs entirely in a single cloud region, and a regional outage six months ago caused two hours of full downtime.",
    question: "Which disaster-recovery design most directly addresses the demonstrated failure mode while remaining proportionate to the availability target?",
    options: [
      "Increase the size of the single-region deployment so it can handle more load",
      "Implement an active-passive or active-active multi-region deployment with automated failover, tested regularly, so a single region's outage does not take down the fraud-review capability",
      "Add more monitoring dashboards in the existing single region so the team detects outages faster",
      "Document a manual runbook for staff to fall back to fully manual fraud review during any outage, with no automated system-level mitigation"
    ],
    correct: 1,
    explanation: "The demonstrated failure mode was a full regional outage, so the only design that directly addresses it is a multi-region deployment with tested automated failover — this is also consistent with the demanding 99.99% target. Scaling within the same single region (A) does nothing against a regional failure, better monitoring (C) shortens detection but not the outage itself, and a purely manual fallback (D) may be a reasonable last-resort layer but is not sufficient on its own to meet a 99.99% target for a fraud-critical system."
  },
  {
    domain: 1,
    difficulty: 1,
    scenario: "An architecture team is choosing between a single-agent and a multi-agent design for a new internal tool.",
    question: "Which factor is the most fundamental driver for deciding whether a multi-agent architecture is warranted?",
    options: [
      "Whether the task can be decomposed into distinct sub-tasks with different tools, context, or scaling needs that benefit from separation",
      "Whether the engineering team has more people available than a single-agent project would need",
      "Whether multi-agent systems are the newest architectural trend",
      "Whether the budget for the project is unusually large"
    ],
    correct: 0,
    explanation: "The core architectural question is whether the task naturally decomposes into sub-tasks with meaningfully different tools, context boundaries, or scaling requirements — multi-agent design earns its added coordination complexity only when that's true. Team headcount, trendiness, and budget size are not sound technical justifications for architectural complexity and can lead to over-engineering."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A real estate brokerage platform wants to use Claude to draft property listing descriptions from agent-submitted photos and notes, and separately to answer buyer questions about specific listings in real time via chat. Both features will be built on the same underlying agent capabilities.",
    question: "What is the most defensible reason to still treat these as two separate system components rather than one combined agent?",
    options: [
      "The two features have fundamentally different consumers (internal agents vs. external buyers), different data-sensitivity and access boundaries, and different latency and failure-tolerance profiles",
      "Two components look more impressive to executives in an architecture diagram",
      "It is customary in the industry to always separate any two features into different services",
      "Splitting them evenly divides the work between two engineering teams regardless of technical fit"
    ],
    correct: 0,
    explanation: "Real, defensible reasons to separate system components are differences in consumer trust boundaries, data access needs, and non-functional requirements like latency tolerance — listing generation is an internal, latency-tolerant workflow while buyer chat is external-facing and real-time. Visual impressiveness, blanket industry custom, and even work-division convenience are not sound architectural justifications on their own and can lead to unnecessary complexity if the underlying technical rationale isn't there."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "An agricultural technology company provides a Claude-based crop-advisory assistant to farmers in regions with unreliable cellular connectivity. Farmers need advice quickly while standing in a field, and the company is evaluating whether to route requests through a central cloud data center or a set of edge nodes closer to farming regions.",
    question: "Which factor should most heavily influence the choice between centralized cloud processing and regional edge deployment here?",
    options: [
      "Whichever option is cheaper to advertise in marketing materials",
      "The observed latency and connectivity reliability for the target regions relative to the responsiveness farmers need in the field, weighed against the added operational complexity of distributed edge nodes",
      "Whichever option the competitor uses",
      "Whichever option requires the fewest lines of code to implement"
    ],
    correct: 1,
    explanation: "The architecturally sound basis for a centralized-versus-edge decision is a real trade-off between the connectivity and latency conditions actually experienced by end users against the added operational burden of running distributed infrastructure. Marketing convenience, competitor mimicry, and implementation code volume are not meaningful architectural criteria and ignore the actual constraint described — unreliable connectivity in the field."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A supply-chain company runs a Claude-based demand-forecasting system that currently ingests data from an on-premise ERP system built in the 1990s, which cannot be easily modified and produces data in a proprietary batch export format once every 24 hours. The business now wants near-real-time forecast updates as new orders arrive throughout the day.",
    question: "Which integration strategy best reconciles the legacy system's constraints with the new near-real-time requirement?",
    options: [
      "Replace the legacy ERP system entirely before doing any forecasting work, since it is the root constraint",
      "Introduce a change-data-capture or incremental-extraction layer around the ERP system (or a lightweight middleware adapter) that surfaces order events more frequently than the full 24-hour batch export, feeding the forecasting agent incrementally without modifying the ERP itself",
      "Keep the 24-hour batch cycle unchanged and describe the forecasts as near-real-time regardless",
      "Have staff manually re-key new orders into a separate real-time system throughout the day"
    ],
    correct: 1,
    explanation: "Wrapping the legacy system with a change-data-capture or middleware adapter layer is the standard architecture-level pattern for extracting fresher data from an unmodifiable legacy source without a disruptive, high-risk full replacement. Replacing the ERP outright (A) is a large, risky undertaking disproportionate to the stated need and blocks progress until it's done, keeping the batch cycle while mislabeling it (C) does not meet the actual business requirement, and manual re-keying (D) does not scale and introduces error risk."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A national retail chain runs Claude-based inventory-optimization agents separately in each of its 200 stores. Leadership is evaluating whether to keep this fully federated per-store model or move to a more centralized regional or national model as the chain grows.",
    question: "Which consideration most directly favors keeping a federated, per-store model over centralizing?",
    options: [
      "Individual stores have meaningfully different product mixes, local demand patterns, and supplier relationships that benefit from localized decision-making and rapid local iteration",
      "Federated systems are always cheaper to operate than centralized ones",
      "Centralized systems are always less reliable than federated ones",
      "Federation avoids the need for any company-wide reporting"
    ],
    correct: 0,
    explanation: "A federated model is architecturally justified when there is genuine local variation — different product mixes, demand patterns, and supplier relationships — that benefits from localized, fast-iterating decisions rather than a one-size-fits-all national policy. Blanket claims that federation is always cheaper or that centralization is always less reliable are false generalizations, and avoiding company-wide reporting is not a benefit — the scenario doesn't suggest federation should prevent aggregate visibility, only that decision-making itself benefits from being local."
  },
  {
    domain: 1,
    difficulty: 5,
    scenario: "A multinational bank operates in 30 countries, each with distinct financial regulation, and is designing a Claude-based system for anti-money-laundering (AML) alert triage. Alerts must be reviewed within regulator-mandated timeframes ranging from 4 hours to 5 business days depending on jurisdiction. The bank also wants to apply consistent, centrally-governed AML methodology across all countries to satisfy its global regulator relationships, while each country's data must remain within its own borders per local law.",
    question: "Which architecture best satisfies all three constraints: jurisdictional SLA variation, centrally governed methodology, and per-country data residency?",
    options: [
      "One global orchestrator processing all alerts centrally, with country-specific SLA timers applied only at the reporting layer",
      "Fully independent AML systems per country, each designed and governed locally with no shared methodology",
      "Per-country deployments that enforce local data residency and local SLA-aware queuing/escalation logic, all instantiated from a centrally maintained, version-controlled methodology template that is deployed (not centrally executed) into each country's environment",
      "A single central database with per-country read replicas, processed by one shared national orchestrator regardless of jurisdiction"
    ],
    correct: 2,
    explanation: "The only design that satisfies all three constraints simultaneously is one where data and execution stay within each country's environment (residency), each country's own SLA logic governs local queuing and escalation (jurisdictional SLA variation), and the methodology itself is centrally authored and version-controlled but deployed locally rather than executed centrally (governance consistency without data centralization). A single global orchestrator or shared central database (A, D) violates data residency by processing or storing cross-border data centrally, while fully independent per-country systems (B) sacrifices the required central methodology governance."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A mid-market software company's engineering leadership is choosing a foundation-model vendor for a new Claude-based feature. Two finalists remain: one offers marginally lower per-token pricing, and the other offers stronger data-handling commitments, better enterprise support SLAs, and more mature tooling for the compliance auditing the company's largest customers require.",
    question: "Which vendor-selection approach best reflects sound architecture-level decision-making here?",
    options: [
      "Select strictly on lowest per-token cost, since that is the most easily quantified metric",
      "Weigh total cost of ownership and risk holistically — including compliance tooling maturity, support SLAs, and data-handling terms relevant to the largest customers' requirements — not just per-unit pricing",
      "Select whichever vendor the engineering team already has documentation memorized for, regardless of fit",
      "Flip a coin, since both vendors offer the same underlying capability"
    ],
    correct: 1,
    explanation: "Sound vendor selection at the architecture level weighs total cost of ownership and business risk holistically, including compliance tooling and support commitments that matter to the company's actual customer base, rather than optimizing a single easily-measured metric like per-token price in isolation. Choosing on raw price alone (A) ignores compliance risk that could jeopardize major customer relationships, familiarity (C) is not a substitute for fit, and treating the decision as a coin flip (D) ignores real, described differences between the vendors."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A regional airline is building a Claude-based assistant to help ground staff quickly answer passenger questions about baggage policy during boarding, where responses need to appear within roughly one second to keep the boarding line moving.",
    question: "Which system design choice most directly supports this responsiveness requirement?",
    options: [
      "Route every request through a multi-step chain of five sequential agent calls to maximize thoroughness",
      "Use a narrowly scoped agent with a small, well-curated policy knowledge source and minimal processing steps between request and response",
      "Batch all passenger questions and answer them once daily",
      "Require a human supervisor to approve every response before it is shown to ground staff"
    ],
    correct: 1,
    explanation: "Tight latency requirements favor a narrowly scoped design with minimal processing steps and a small, well-curated knowledge source, which keeps response time predictable and fast. A long chain of sequential agent calls (A) adds latency directly opposed to the goal, batch processing (C) doesn't meet the real-time need at all, and requiring human approval on every response (D) reintroduces the delay the system is meant to eliminate."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A cloud-native SaaS company currently runs entirely on a single public cloud provider. Its largest prospective enterprise customer, a defense contractor, requires that any vendor handling its data have a documented multi-cloud or provider-independent contingency plan due to internal supply-chain risk policy, but the company's engineering leadership is wary of the added complexity of true multi-cloud operation.",
    question: "Which approach best balances the customer's requirement against the stated operational concern?",
    options: [
      "Refuse the requirement and lose the deal rather than consider any architectural change",
      "Immediately re-architect the entire platform to run active-active across two cloud providers for all customers",
      "Design the platform's core abstractions (storage, compute, networking) to avoid unnecessary single-provider lock-in where reasonable, and produce a credible, tested contingency/migration plan for this customer's workload specifically, without committing to full active-active multi-cloud for the whole platform",
      "Tell the customer the company already operates multi-cloud, regardless of the actual architecture"
    ],
    correct: 2,
    explanation: "A proportionate response reduces unnecessary lock-in in core abstractions and produces a credible, tested contingency plan scoped to the customer's actual requirement, without forcing the operational cost of full active-active multi-cloud onto the entire platform for all customers. Refusing outright (A) forfeits the deal unnecessarily, full immediate multi-cloud re-architecture (B) is a disproportionate response to one customer's requirement, and misrepresenting the architecture (D) is dishonest and would likely fail due diligence."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A public transit authority wants a Claude-based system to answer rider questions about schedules and service disruptions. Ridership is heavily concentrated during two daily rush-hour windows, with very light usage the rest of the day, and the authority has a fixed, modest annual technology budget.",
    question: "Which capacity architecture best fits this usage pattern and budget constraint?",
    options: [
      "Provision fixed infrastructure sized for peak rush-hour load and keep it running at that size 24 hours a day",
      "Use elastically scaling infrastructure that scales up automatically for the rush-hour windows and scales down during low-usage periods",
      "Provision only for average daily usage and accept degraded performance during rush hour",
      "Provision the minimum possible infrastructure at all times and require riders to retry failed requests during rush hour"
    ],
    correct: 1,
    explanation: "Elastic scaling that expands for known peak windows and contracts during low usage directly matches the described bursty demand pattern and makes efficient use of a fixed budget by not paying for peak-sized capacity around the clock. Fixed peak provisioning at all times (A) wastes budget during off-peak hours, provisioning for the average (C) guarantees poor performance exactly when most riders need the system, and deliberately under-provisioning (D) degrades the rush-hour experience the system exists to serve."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A specialty pharmacy chain is designing a Claude-based system to check for potential drug interactions when pharmacists enter new prescriptions. Two candidate architectures are proposed: one where the interaction-check agent has broad read access to the full patient medical history database, and one where it only receives the specific medication list needed for the interaction check, passed explicitly by the calling application.",
    question: "Which design better reflects sound system-boundary and data-minimization practice at the architecture level?",
    options: [
      "Broad read access to the full patient database, since it might be useful for some future feature",
      "Scoped access limited to only the medication list needed for the interaction check, with any future feature requiring its own explicit, justified data access",
      "No access at all, requiring the pharmacist to describe medications from memory in free text",
      "Broad access, but with a note in the internal wiki asking developers not to use fields they don't need"
    ],
    correct: 1,
    explanation: "Sound architecture minimizes each component's data access to what its specific function requires, which limits blast radius, simplifies auditing, and avoids scope creep; broad access justified by hypothetical future use (A) is a common anti-pattern that expands risk without present benefit. Removing structured input entirely (C) increases error risk in a safety-critical drug-interaction check, and documentation-only restraint (D) is not an enforced boundary and can't be relied upon."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A large retailer's Claude-based product-recommendation system currently serves 2 million daily active users on a single-region, monolithic architecture. The company projects 100x user growth over three years due to international expansion, and the CTO wants an architecture roadmap that avoids a disruptive full rewrite at some future breaking point.",
    question: "What is the most sound approach to planning for this 100x growth?",
    options: [
      "Wait until performance problems actually appear at scale, then address them reactively",
      "Immediately over-build for 100x scale today, before any international users exist, even though current load doesn't require it",
      "Identify the components most likely to become bottlenecks at scale (e.g., single-region data stores, tightly coupled services) and evolve them incrementally toward horizontally scalable, regionally distributed patterns ahead of need, validated by load testing at each stage",
      "Rewrite the entire system from scratch in a new architecture before any further feature work is done"
    ],
    correct: 2,
    explanation: "The most sound approach identifies likely future bottlenecks and evolves the architecture incrementally ahead of actual need, validated by load testing — this avoids both the risk of reactive firefighting at scale and the waste of building 100x capacity before it's needed. Waiting for problems to appear (A) risks user-facing failures during the growth the company is actively planning for, over-building immediately for the full 100x (B) ties up capital and complexity years before it's needed, and a full rewrite (D) is a high-risk, disruptive move the CTO explicitly wants to avoid when incremental evolution can achieve the same end state."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A commercial property management company wants a Claude-based assistant that drafts responses to tenant maintenance requests and, separately, flags requests that indicate a potential safety hazard for immediate human review. The safety-flagging function has a much lower tolerance for missed detections than the drafting function has for imperfect wording.",
    question: "What does this asymmetry in risk tolerance imply for the architecture?",
    options: [
      "Both functions should share identical review thresholds and processing paths since they operate on the same input data",
      "The safety-flagging function should be architected as a distinct, more conservative decision path (e.g., biased toward over-flagging with mandatory human review) separate from the drafting function's more permissive path",
      "The drafting function should be removed entirely since safety is more important",
      "The safety-flagging function should be the only one implemented, and maintenance drafting handled entirely by humans forever"
    ],
    correct: 1,
    explanation: "When two functions built on the same input have meaningfully different risk tolerances, the architecture should treat them as distinct decision paths, each tuned appropriately — here, a conservative, over-flagging, human-reviewed path for safety detection, separate from a more permissive path for routine drafting. Forcing identical thresholds (A) would either make drafting overly conservative and slow or make safety-flagging dangerously permissive. Eliminating one function entirely (C, D) discards real business value the company wants without being required by the risk asymmetry itself."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A small legal-tech startup is building its first Claude-based product feature and must decide between using a managed API-based integration versus self-hosting and managing their own model infrastructure.",
    question: "Given the startup's small team and pre-scale stage, which factor should weigh most heavily toward using a managed API-based integration?",
    options: [
      "Managed integration eliminates infrastructure operations burden, letting the small team focus engineering effort on product differentiation rather than model-serving infrastructure",
      "Self-hosting is always more secure than any managed offering",
      "Managed APIs are always cheaper at every scale than self-hosting, regardless of usage volume",
      "Investors always prefer to see self-hosted infrastructure in a startup's pitch deck"
    ],
    correct: 0,
    explanation: "For a small team pre-scale, the dominant architectural consideration is opportunity cost: managed integration removes the burden of operating model infrastructure, freeing limited engineering capacity for product differentiation, which is usually the scarcer resource at this stage. The claims that self-hosting is always more secure or managed APIs are always cheaper are both false as blanket statements — the right answer depends on scale and requirements — and investor pitch-deck preference is not a sound architectural criterion."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A global shipping and logistics company wants a Claude-based system to optimize container loading plans. The optimization must incorporate live port congestion data, weather forecasts, and customs regulations that vary by destination country. Each data source has a different update frequency, from every few seconds (port congestion) to monthly (customs regulations).",
    question: "Which data-flow architecture best accommodates these mismatched update frequencies without over-engineering the slower-changing sources?",
    options: [
      "Poll all three sources at the same high frequency to keep the architecture simple",
      "Design separate ingestion pipelines per source, each matched to its natural update cadence, with the orchestrating agent querying current cached state from each rather than triggering fresh fetches per request",
      "Only use the fastest-changing data source, since it's the most technically interesting, and ignore the others",
      "Require an engineer to manually update all three data sources into the system each morning"
    ],
    correct: 1,
    explanation: "Matching each ingestion pipeline's cadence to its data source's natural rate of change — near-real-time for port congestion, infrequent for customs regulations — avoids both stale port data and wasteful over-polling of rarely-changing sources, with the agent reading current cached state rather than issuing fresh fetches per request. Uniformly high-frequency polling (A) wastes resources on sources that barely change, using only one source (C) ignores requirements the scenario states are necessary, and manual daily updates (D) cannot keep pace with a data source that changes every few seconds."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A workers' compensation insurer wants to introduce a Claude-based agent that recommends claim payout amounts. Legal counsel has required that a human adjuster review and explicitly approve every recommendation before payment is issued, with no exceptions in the initial rollout.",
    question: "What does this requirement most directly imply for the system's architecture?",
    options: [
      "The agent's output should feed into a human-in-the-loop approval step as a required, non-bypassable stage before any downstream payment action executes",
      "The agent should be given direct write access to the payment system to save adjusters time, since review can happen afterward",
      "The requirement can be satisfied by adjusters reviewing a random 10% sample of recommendations",
      "The requirement only applies to claims over a certain dollar threshold, so smaller claims can bypass review by default"
    ],
    correct: 0,
    explanation: "A hard requirement for human approval on every recommendation must be enforced architecturally as a mandatory, non-bypassable gate between the agent's recommendation and any downstream payment action — this is what 'no exceptions' means at the design level. Granting direct write access with after-the-fact review (B) allows payment before approval, contradicting the requirement outright, and both sampling-based review (C) and threshold-based exemptions (D) reintroduce exactly the exceptions legal counsel explicitly ruled out."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A car rental company wants a Claude-based assistant to help call-center staff resolve billing disputes. The company currently has two entirely separate billing systems as a result of a recent merger, each with different data models, and full consolidation into one system is planned but is 18 months away.",
    question: "Which architecture lets the assistant serve staff usefully now, without waiting for the 18-month consolidation?",
    options: [
      "Postpone the assistant project entirely until the billing systems are consolidated",
      "Build the assistant against an integration layer that normalizes queries across both existing billing systems' data models, so staff get one consistent interface regardless of which legacy system holds the customer's data, and retire the extra abstraction once consolidation completes",
      "Build two entirely separate, unrelated assistants, one per billing system, with call-center staff manually determining which to use",
      "Pick whichever billing system is larger and ignore customers whose data lives in the smaller one"
    ],
    correct: 1,
    explanation: "An integration/normalization layer that presents a unified interface over both legacy systems lets the assistant deliver value immediately while the underlying consolidation proceeds on its own timeline, and can be retired once that consolidation completes, avoiding wasted long-term investment in the abstraction. Waiting 18 months (A) delays value unnecessarily, two disconnected assistants (C) burdens staff with manual system selection and inconsistent experience, and ignoring customers in the smaller system (D) is an unacceptable business outcome."
  },
  {
    domain: 1,
    difficulty: 5,
    scenario: "A global pharmaceutical company is designing a Claude-based system to assist scientists across R&D sites in the US, EU, and China with literature review during drug discovery. US export-control regulations restrict certain technical data from being shared with China-based personnel, EU data protection law restricts moving EU research-subject data outside the EU, and Chinese data law separately restricts certain categories of data from leaving China. The system must still let scientists in all three regions benefit from shared, non-restricted scientific literature.",
    question: "Which architecture correctly satisfies all three regulatory regimes simultaneously while preserving cross-region collaboration where it's legally permitted?",
    options: [
      "One global orchestrator with a single access-control list checked before every response, sourcing from one shared global database",
      "Three fully siloed regional systems with absolutely no data or capability sharing between any of them",
      "Region-specific deployments (US, EU, China) that each enforce their own regulatory boundary for restricted data categories at the data-access layer, combined with a clearly delineated shared corpus of literature confirmed to be free of export-control, EU-transfer, and China-egress restrictions, replicated or accessible across all three deployments",
      "A single database with row-level tagging by regulation type, queried directly by all three regions' orchestrators without any regional processing boundary"
    ],
    correct: 2,
    explanation: "The only design that satisfies all three distinct, non-uniform regulatory regimes while still preserving the required cross-region collaboration is region-specific deployments that each enforce their own applicable restrictions at the access layer, plus a separately vetted, unrestricted shared corpus available to all. A single global system checking access at query time (A, D) still requires the restricted data to physically reside somewhere and be processed centrally, which risks violating whichever regime's data that touches, and full silos with zero sharing (B) needlessly forfeits the collaboration on non-restricted literature that the scenario explicitly wants preserved."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A mid-size credit union wants to introduce a Claude-based assistant for loan officers, and is deciding whether to route sensitive member financial data through a general-purpose orchestration layer already used by several other internal tools, or build a dedicated, narrowly scoped pipeline just for this use case.",
    question: "What is the most important architectural consideration in this decision?",
    options: [
      "Whether the general-purpose layer's existing access controls, logging, and blast-radius properties are actually appropriate for highly sensitive financial data, or whether that shared surface introduces unacceptable risk",
      "Whether building a dedicated pipeline takes slightly longer to implement",
      "Whether other internal tools would be jealous of a new dedicated pipeline",
      "Whether the general-purpose layer was built by a more senior engineer"
    ],
    correct: 0,
    explanation: "The central architectural question when reusing shared infrastructure for sensitive data is whether that shared surface's access controls, auditability, and blast radius are appropriate for the new, more sensitive use case — reusing a general-purpose layer not designed with that sensitivity in mind can introduce risk that a narrowly scoped, purpose-built pipeline would avoid. Implementation time, other tools' 'feelings,' and the seniority of the original builder are not sound architectural risk criteria."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A national parcel delivery service wants a Claude-based assistant to help dispatchers re-route drivers in real time when road closures are reported. Dispatchers need updated routing suggestions within seconds of a closure being reported, and the system must remain usable even if the routing-suggestion agent itself becomes temporarily unavailable.",
    question: "Which resiliency-focused architectural decision best supports continued dispatcher operation during an agent outage?",
    options: [
      "Design the dispatcher interface so it degrades gracefully to existing manual routing tools and last-known-good route data when the agent is unavailable, rather than blocking the workflow entirely",
      "Design the system so dispatchers cannot perform any rerouting at all unless the agent is available",
      "Rely on the agent achieving 100% uptime so a fallback is unnecessary",
      "Automatically shut down the entire dispatch platform, including unrelated functions, if the routing agent goes down"
    ],
    correct: 0,
    explanation: "Graceful degradation to manual tools and cached last-known-good data during an agent outage keeps dispatchers operational, which matches the requirement that the system 'remain usable' even during unavailability. Making the entire workflow dependent on the agent (B) contradicts that requirement directly, assuming 100% uptime (C) is not a realistic architectural guarantee for any service, and cascading the outage to unrelated dispatch functions (D) needlessly widens the blast radius of a single component's failure."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A media company is deciding how to architect a Claude-based system that both moderates user-generated comments in real time as they're posted, and separately generates a weekly digest report summarizing comment-moderation trends for the trust-and-safety leadership team.",
    question: "What is the strongest architectural rationale for treating real-time moderation and the weekly digest as separate components rather than a single combined pipeline?",
    options: [
      "They serve fundamentally different consumers and timing needs — one requires sub-second decisions gating live content, the other tolerates a weekly batch cadence summarizing already-decided outcomes",
      "Separate components always use less total compute than combined ones",
      "Trust-and-safety leadership specifically requested two different logos for the two features",
      "It's a coincidence which team happens to own each feature, and ownership alone justifies the split"
    ],
    correct: 0,
    explanation: "The legitimate architectural rationale is the sharp divergence in timing requirements and consumers: real-time moderation must gate live content in sub-second time, while the digest is a downstream, batch-tolerant summary consumed by a different audience on a different cadence. The claim about compute usage is not reliably true in general, branding preferences are not an architectural concern, and team ownership alone is an organizational fact, not by itself a technical justification, even though it may coincidentally align with the real technical reasons."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A commercial bank's architecture team is evaluating whether to introduce an orchestration layer in front of several existing Claude-based agents that currently operate independently: one for KYC document review, one for transaction monitoring, and one for customer chat support. Recently, a customer's chat inquiry about a flagged transaction had to be manually relayed between the chat and transaction-monitoring teams, delaying resolution by two days.",
    question: "Does the described incident justify introducing an orchestration layer, and why?",
    options: [
      "No, because orchestration layers should only ever be added for extremely large numbers of agents regardless of the coordination problems present",
      "Yes, because the incident reveals a real cross-agent coordination need — connecting chat context to transaction-monitoring state — that an orchestration layer could resolve by mediating information flow between the two, without requiring the underlying agents to be tightly coupled to each other",
      "No, because the two-day delay was a training issue, not an architectural one, so no system change is warranted",
      "Yes, but only by merging all three separate agents into one monolithic agent that handles KYC, monitoring, and chat entirely within a single context"
    ],
    correct: 1,
    explanation: "Orchestration layers are justified by real coordination needs between otherwise independent agents, not by agent count alone — here the incident exposed exactly that: a legitimate need to pass relevant context between chat and transaction monitoring, which an orchestration layer addresses without forcing the underlying agents into a single tightly-coupled system. Dismissing it as a training issue (C) ignores that the underlying systems genuinely couldn't share information, and merging everything into one monolithic agent (D) overcorrects, discarding the benefits of separately scoped, independently maintainable agents for functions with different risk profiles (KYC vs. monitoring vs. support)."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A consumer electronics manufacturer sells products in over 60 countries and wants one global Claude-based product-support chatbot. Support content must reflect country-specific warranty terms, and several countries require that consumer support interactions be logged and retained locally under local consumer-protection law.",
    question: "Which architecture best supports a single global product experience while meeting the local logging and retention requirements?",
    options: [
      "One global deployment with a single shared log store located in the manufacturer's home country, regardless of where each conversation occurred",
      "A single shared front-end and orchestration layer with country-aware routing that determines applicable warranty content, paired with region-local logging and retention stores that satisfy each country's specific requirement",
      "60 entirely independent chatbots, one built and maintained separately for each country, with no shared codebase or content pipeline",
      "One global deployment that skips logging entirely to avoid dealing with the varying retention requirements"
    ],
    correct: 1,
    explanation: "A shared front-end and orchestration layer with country-aware content routing preserves the single global product experience the company wants, while pairing it with region-local logging and retention stores satisfies each country's distinct legal requirement without forcing full duplication of the product itself. Centralizing all logs in the home country (A) would likely violate local retention laws in the countries that require local retention, building 60 fully independent chatbots (C) abandons the stated goal of one global experience and multiplies maintenance cost, and skipping logging (D) doesn't satisfy legal requirements — it evades them."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A boutique fitness studio chain with 15 locations wants a Claude-based assistant to answer class-schedule questions via their website chat widget. Expected volume is a few hundred messages per day across all locations combined.",
    question: "Given this modest scale, which architectural approach is most appropriate?",
    options: [
      "A simple, single-agent design using a managed API integration, sized for low, predictable volume without complex distributed infrastructure",
      "A multi-region, multi-agent architecture with dedicated infrastructure per location to ensure maximum scalability",
      "A custom-built, self-hosted model-serving cluster designed for tens of millions of daily requests",
      "An elaborate microservices architecture with a dozen independently deployed services, one per conceivable sub-function"
    ],
    correct: 0,
    explanation: "At a few hundred messages a day, a simple single-agent design on managed infrastructure is by far the most proportionate choice — it meets the need with minimal operational overhead and cost. The other options describe infrastructure and architectural complexity built for orders of magnitude more scale or geographic distribution than this scenario has any need for, which would waste budget and engineering effort without any corresponding benefit."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A health insurer's prior-authorization system currently runs as a single synchronous pipeline: a Claude-based agent reviews each request against policy rules and returns a decision before the provider's portal page finishes loading. As request volume has grown, occasional slow reviews (a small percentage requiring deeper policy lookups) are now causing portal timeouts and provider-facing errors for otherwise-fast requests queued behind them.",
    question: "Which architectural change best resolves the timeout problem without sacrificing responsiveness for the majority of fast requests?",
    options: [
      "Increase the portal's timeout threshold to several minutes so even slow requests never time out",
      "Move to an asynchronous processing model: return an immediate acknowledgment to the portal, process the review in the background, and notify or update the provider portal when the decision is ready, decoupling per-request review time from portal responsiveness",
      "Force every request, fast or slow, to use the deep policy-lookup path so all reviews take the same amount of time",
      "Reduce the number of requests processed per day by placing an artificial cap on daily submissions"
    ],
    correct: 1,
    explanation: "Decoupling the portal's responsiveness from individual review time via asynchronous processing and notification directly resolves the head-of-line blocking problem: fast requests are no longer queued behind slow ones inside a synchronous pipeline, and slow reviews no longer force a page timeout. Simply raising the timeout (A) leaves providers waiting on a blocked page for minutes, which is a poor experience even if it technically avoids an error. Forcing every request through the deep lookup path (C) makes all requests slow instead of just some, and capping submissions (D) doesn't address the architectural bottleneck at all — it just reduces the symptom's frequency by limiting business volume."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A city government is deploying a Claude-based assistant to help residents navigate permit applications. Elected officials have emphasized transparency and want the ability to audit exactly what information the assistant used to answer any given resident's question, in case of a public records request or dispute.",
    question: "Which architectural characteristic is most essential to satisfy this auditability requirement?",
    options: [
      "The assistant's response speed, since faster responses are inherently more auditable",
      "A retrieval and logging design that captures and retains which specific source documents or data were used to generate each response, tied to that response, in a way that can be reconstructed later",
      "The assistant's visual design and branding on the city website",
      "The total number of residents who used the assistant that day"
    ],
    correct: 1,
    explanation: "Satisfying a genuine auditability requirement means the architecture must capture and retain, per response, which specific sources or data informed that response, in a form that can be reconstructed for a later public-records or dispute review. Response speed, visual branding, and daily usage counts are unrelated to the ability to trace and justify an individual response after the fact."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A wind and solar energy developer wants a Claude-based assistant to help engineers analyze turbine sensor data for early maintenance signals. Sensor data streams continuously from thousands of turbines, but meaningful maintenance patterns typically only emerge over days or weeks of trend analysis, not from any single reading.",
    question: "Which processing architecture best matches the nature of this analytical task?",
    options: [
      "Analyze every individual sensor reading synchronously the instant it arrives and produce a maintenance recommendation from that single reading alone",
      "Aggregate and window sensor data over the relevant multi-day/multi-week trend period, running the agent's analysis periodically over that windowed data rather than on individual raw readings",
      "Discard sensor data after 24 hours to save storage, since older data is 'stale'",
      "Have engineers manually review raw sensor streams in real time with no aggregation or automated trend analysis at all"
    ],
    correct: 1,
    explanation: "Since the scenario states that meaningful patterns emerge only over multi-day or multi-week trends, the architecture should aggregate and window data over that relevant period and run analysis periodically against the windowed data, matching the actual signal timescale. Analyzing single raw readings synchronously (A) cannot detect a trend that only exists across many readings, discarding data after 24 hours (C) destroys the very history the trend analysis depends on, and pure manual review of raw streams (D) does not scale to thousands of turbines and abandons the stated goal of AI-assisted analysis."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A large enterprise HR software vendor sells its Claude-based résumé-screening assistant to customers ranging from 50-person startups to 200,000-employee conglomerates. Each customer wants some configurability in screening criteria, but the vendor's small platform team cannot maintain thousands of bespoke, hand-built configurations.",
    question: "Which architectural approach best balances customer configurability against the vendor's maintenance capacity?",
    options: [
      "Build one hard-coded configuration and disallow any customization, regardless of customer size or need",
      "Build a fully bespoke, independently coded system for every customer, hand-tuned by the platform team on request",
      "Design a configuration-driven platform with a bounded set of well-defined, parameterized customization points, allowing customer-specific behavior to be expressed as data/configuration rather than one-off code per customer",
      "Give every customer direct access to modify the underlying agent's core orchestration code themselves"
    ],
    correct: 2,
    explanation: "A configuration-driven platform with a bounded, well-defined set of parameterized customization points lets customers tailor behavior within supported limits while keeping the underlying system uniform and maintainable by a small team — this is the standard pattern for balancing configurability against maintenance load at scale. No customization at all (A) fails the stated customer need, fully bespoke per-customer code (B) does not scale to the vendor's team size, and giving customers direct access to core orchestration code (D) creates unmanageable support and stability risk."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A commercial trucking company wants to use Claude to help dispatch and route long-haul trucks, factoring in driver hours-of-service regulations, weather, and delivery windows. The company operates in a market where a well-established third-party fleet-routing platform already handles hours-of-service compliance reliably, but has no AI-assisted natural-language dispatch interface.",
    question: "Which architecture is most sensible given the existing third-party platform's strength?",
    options: [
      "Build an entirely new in-house routing and compliance engine from scratch, discarding the existing reliable platform",
      "Integrate a Claude-based natural-language dispatch assistant as a layer that calls into the existing, proven fleet-routing platform for compliance and routing logic, rather than reimplementing that logic independently",
      "Ignore hours-of-service compliance in the new AI assistant since the old platform already handles it somewhere else in the company",
      "Replace the third-party platform's routing logic with the Claude-based assistant's own from-scratch routing algorithm for consistency"
    ],
    correct: 1,
    explanation: "When a proven, reliable component already exists for a well-defined function like hours-of-service compliance, the sound architectural choice is to integrate with it rather than duplicate or discard that capability — this reduces risk and development cost while adding the genuinely new value (natural-language dispatch). Rebuilding compliance logic from scratch (A, D) discards a proven asset and introduces new regulatory risk, and ignoring compliance in the new assistant (C) is dangerous if the new assistant makes routing decisions without accounting for it, even if another part of the company handles it elsewhere."
  },
  {
    domain: 1,
    difficulty: 5,
    scenario: "A global reinsurance firm wants a Claude-based system to assist actuaries with catastrophe-risk modeling. The system must combine proprietary internal loss data (which cannot leave the firm's private infrastructure under any circumstances per board policy), licensed third-party catastrophe models (usable only within the license vendor's approved execution environment, per contract), and public weather/climate data (freely usable anywhere). Actuaries need a single coherent modeling workflow, not three disconnected tools.",
    question: "Which architecture satisfies all three data-handling constraints while still presenting actuaries with one coherent workflow?",
    options: [
      "Copy the licensed catastrophe models into the firm's private infrastructure so everything runs in one place",
      "Give up on integration and require actuaries to manually move numbers between three completely separate tools with no orchestration at all",
      "An orchestration layer that presents a single actuary-facing workflow, but routes each data type's processing to the environment where it's contractually and legally permitted to run — internal infrastructure for proprietary data, the vendor's approved environment for licensed models (via API/integration, not relocation), and any suitable environment for public data — assembling only the necessary outputs (not raw restricted data) back into the shared workflow",
      "Route all three data types through the licensed vendor's environment since it's the most capable"
    ],
    correct: 2,
    explanation: "The only design that respects all three distinct constraints is one where an orchestration layer keeps the user-facing workflow unified while routing each data type's actual processing to the environment where it is contractually or legally allowed to run, integrating only necessary outputs rather than relocating restricted data. Copying the licensed models into internal infrastructure (A) almost certainly breaches the vendor's contract restricting execution to its approved environment, routing proprietary data through the vendor's environment (D) violates the board policy that this data cannot leave private infrastructure under any circumstances, and abandoning integration entirely (B) fails the stated requirement for one coherent actuary workflow."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A dental clinic chain with 8 locations wants to try a Claude-based appointment-reminder message drafter. Volume is very low (under 200 messages per week total), and the clinic has no dedicated engineering team, relying on a single IT contractor for support.",
    question: "Which architectural posture is most appropriate for this organization's scale and staffing?",
    options: [
      "A fully managed, low-operational-overhead integration that minimizes the ongoing engineering burden the single contractor would otherwise carry",
      "A self-hosted, highly customized multi-agent orchestration platform requiring a dedicated platform engineering team",
      "A bespoke high-availability, multi-region failover architecture designed for mission-critical, always-on operation",
      "An architecture requiring the contractor to manually manage GPU infrastructure for self-hosted model serving"
    ],
    correct: 0,
    explanation: "Given very low volume and a single-contractor support model, minimizing ongoing operational burden through a fully managed integration is clearly the right fit — it matches the organization's actual staffing capacity. The other options describe infrastructure and operational complexity requiring dedicated teams and skills the clinic does not have, which would be unsustainable to operate and maintain, and vastly disproportionate to both the volume and criticality described."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A used-car marketplace platform is redesigning its Claude-based listing-fraud detection system. Currently, one large agent evaluates listing text, uploaded photos, and seller account history all within a single prompt and decision step. As fraud patterns have grown more sophisticated, the team wants to add specialized, deeper analysis for each signal type without slowing down the fast initial triage most listings need.",
    question: "Which architectural evolution best supports this goal?",
    options: [
      "Keep the single combined agent and simply give it a longer, more detailed prompt covering all three signal types in more depth",
      "Split into a fast, lightweight initial triage step that only escalates suspicious listings to specialized deeper-analysis agents (for text, photo, and account-history signals) run only when triage flags a concern",
      "Remove photo and account-history analysis entirely to keep the system simple",
      "Run the full deep analysis on every single listing regardless of initial risk signal, to be maximally thorough"
    ],
    correct: 1,
    explanation: "A tiered design — fast lightweight triage for the common case, escalating only suspicious listings to specialized deeper analysis — lets most listings clear quickly while still enabling more sophisticated, resource-intensive analysis where it's actually warranted. Simply lengthening one combined prompt (A) doesn't add the specialized depth needed and risks getting slower for every listing, removing signal types (C) reduces detection capability the team is trying to improve, and running full deep analysis on every listing (D) sacrifices the fast-triage requirement for listings that don't need it."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A federal government agency's procurement rules require that any AI system handling controlled unclassified information (CUI) undergo a lengthy accreditation process for each new integration or tool the system uses. The architecture team is designing a Claude-based system to help caseworkers process benefit applications and is deciding how many distinct tool integrations to expose to the agent.",
    question: "Which architectural principle should most heavily guide the number and scope of tool integrations, given this constraint?",
    options: [
      "Expose as many tool integrations as technically possible, since more tools generally make an agent more capable",
      "Deliberately minimize the number of distinct tool integrations to only those clearly necessary for the caseworker workflow, since each one adds accreditation burden and expands the CUI-handling surface requiring review",
      "The number of tool integrations is irrelevant to the accreditation process",
      "Add tool integrations first and worry about accreditation only if an audit specifically flags it"
    ],
    correct: 1,
    explanation: "Given that each new tool integration triggers a lengthy accreditation process for CUI handling, the architecturally sound approach deliberately minimizes tool surface to only what the caseworker workflow clearly requires, reducing both accreditation burden and the system's overall CUI exposure. Maximizing tool count for general capability (A) directly conflicts with the accreditation cost described, claiming irrelevance (C) ignores the stated constraint, and deferring compliance until an audit flags it (D) is a reactive posture inappropriate for a government CUI system, where accreditation is a precondition, not an afterthought."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A regional grocery chain's Claude-based demand-forecasting system currently runs as a single service processing all 400 stores' forecasts in one nightly batch job. The batch job's runtime has grown from 45 minutes to over 6 hours as the chain has added stores, and it now sometimes fails to complete before store managers need the forecast each morning.",
    question: "Which architectural change most directly and sustainably addresses the growing batch runtime problem?",
    options: [
      "Simply run the batch job earlier in the evening so there's more buffer time before it needs to complete",
      "Restructure the batch job to process stores in parallel, independent partitions (e.g., by region or store group) rather than as one large sequential job, so runtime scales with the slowest partition rather than the sum of all stores",
      "Reduce forecast quality/detail uniformly across all stores to make the job run faster",
      "Only generate forecasts for the chain's 50 largest stores going forward, dropping the rest"
    ],
    correct: 1,
    explanation: "Restructuring the batch job into parallel, independent partitions addresses the actual scaling problem — a job whose runtime grows with total store count processed sequentially — by making runtime scale with the slowest partition instead of the sum of all stores, which sustainably accommodates continued growth. Running the job earlier (A) is a stopgap that will fail again as the chain keeps growing, uniformly reducing forecast quality (C) sacrifices the system's core value to buy time, and dropping smaller stores (D) abandons a stated business requirement rather than solving the underlying architectural bottleneck."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A telehealth startup is choosing between building its Claude-based intake-triage assistant as part of its main patient-facing application's codebase, or as a separately deployed service accessed via an internal API. The startup expects the triage logic to change frequently as clinical guidelines are updated, while the rest of the patient app changes far less often.",
    question: "Which structure better accommodates the differing rates of change between these two parts of the system?",
    options: [
      "Embed the triage logic directly in the main application so both are always deployed and versioned together",
      "Deploy triage as a separately versioned and independently releasable service accessed via internal API, decoupling its frequent update cadence from the slower-changing main application",
      "Freeze clinical guideline updates to match the main application's release cadence instead",
      "Maintain two full, separately coded copies of the entire patient-facing application, one for each release cadence"
    ],
    correct: 1,
    explanation: "Separating components with meaningfully different rates of change into independently deployable services is a standard architectural pattern that lets frequently changing triage logic ship on its own schedule without forcing releases of, or being held back by, the slower-changing main application. Embedding them together (A) forces both to release in lockstep, which conflicts with the differing change cadences described, freezing clinical updates to match app releases (C) is clinically inappropriate given that guidelines must be updated promptly, and duplicating the entire application (D) is a wasteful, unnecessary solution to a problem that decoupling a single component already solves."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A small nonprofit legal-aid clinic wants a Claude-based intake assistant but has no ability to predict future demand accurately, since client volume depends heavily on unpredictable funding cycles and community outreach events.",
    question: "Which infrastructure characteristic should the architecture prioritize given this unpredictability?",
    options: [
      "Fixed, pre-purchased capacity for exactly today's volume, with no ability to adjust",
      "Elastic, usage-based infrastructure that can scale up or down without requiring the clinic to forecast demand precisely in advance",
      "A multi-year infrastructure contract locked to current volume estimates",
      "Infrastructure sized for the largest conceivable spike, purchased permanently upfront regardless of typical usage"
    ],
    correct: 1,
    explanation: "When future demand is genuinely hard to forecast, elastic, usage-based infrastructure is the architecturally appropriate choice because it avoids betting on a specific forecast that is likely to be wrong in either direction. Fixed capacity sized to today's volume (A) or locked into a multi-year contract (C) both assume a forecast the clinic explicitly cannot make reliably, and permanently over-provisioning for a worst-case spike (D) wastes the nonprofit's limited budget most of the time."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A multinational consumer goods company's marketing team wants a Claude-based content-generation tool available to regional marketing teams in 25 countries. Central brand governance requires all generated content to pass through a brand-compliance check before publication, but regional teams complain that a fully centralized review queue in headquarters creates multi-day bottlenecks during time-sensitive campaigns.",
    question: "Which architecture best resolves the tension between central brand governance and regional responsiveness?",
    options: [
      "Eliminate brand-compliance review entirely to speed up regional publishing",
      "Keep a single fully centralized human review queue in headquarters for all 25 countries' content, accepting the delay as a cost of governance",
      "Encode brand guidelines as automated compliance checks run locally as part of each region's generation pipeline, reserving centralized human review only for edge cases the automated check flags as ambiguous or high-risk",
      "Let each region define and enforce its own independent brand guidelines with no central coordination at all"
    ],
    correct: 2,
    explanation: "Encoding the bulk of brand governance as automated checks embedded in each region's own pipeline lets most content clear quickly and locally, while reserving genuinely ambiguous or high-risk cases for centralized human judgment — this directly resolves the stated bottleneck without abandoning governance. Removing compliance checks (A) discards a real governance requirement, keeping a fully centralized human queue for everything (B) perpetuates the exact bottleneck regional teams are complaining about, and letting each region set its own independent guidelines (D) undermines the central brand governance requirement entirely."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A regional bank's architecture team is evaluating a single-agent-with-many-tools design versus a multi-agent design for a new commercial-lending underwriting assistant. The workflow involves credit analysis, collateral valuation, and regulatory compliance checks — three areas with different data sensitivity levels, different subject-matter owners, and different rates of regulatory change.",
    question: "Which factors most strongly favor a multi-agent design over a single agent with many tools in this specific case?",
    options: [
      "The mere fact that three sub-tasks exist is sufficient on its own to justify separate agents, regardless of any other characteristics",
      "The divergent data sensitivity, distinct subject-matter ownership, and independent regulatory change cadence across the three areas each favor separately scoped, independently maintainable agents rather than one agent with broad access to all three domains",
      "Multi-agent designs are inherently more accurate than single-agent designs regardless of task structure",
      "A multi-agent design is preferable purely because it uses more infrastructure and appears more sophisticated"
    ],
    correct: 1,
    explanation: "The relevant justification for multi-agent decomposition here isn't the sub-task count alone, but the concrete differences in data sensitivity, ownership, and change cadence across the three domains — each of these favors giving credit analysis, collateral valuation, and compliance their own scoped agents with appropriately limited access, rather than one broadly privileged agent. The claim that task count alone justifies separation (A) ignores the real deciding factors, the claim that multi-agent is inherently more accurate (C) is not generally true, and preferring complexity for its own sake (D) is an anti-pattern, not sound architecture."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A subscription meal-kit company wants a Claude-based assistant to help customer service reps handle delivery complaints. The company's leadership wants to launch within six weeks, but the full desired feature set (order lookup, refund processing, delivery rescheduling, and recipe substitution guidance) would realistically take four months to build and properly test.",
    question: "Which architectural approach best reconciles the timeline pressure with sound engineering practice?",
    options: [
      "Launch all four features simultaneously in six weeks by skipping testing to meet the deadline",
      "Delay launch until all four features are fully built and tested in four months, regardless of the stated business timeline",
      "Design the system with extensibility in mind from the start, but launch first with the highest-value, best-understood subset of functionality (e.g., order lookup and refund processing) that can be built and properly tested in six weeks, adding the remaining features in subsequent phases",
      "Launch a version with no real functionality, just placeholder responses, to hit the six-week date on paper"
    ],
    correct: 2,
    explanation: "A phased launch — architected for extensibility from the outset, but shipping the highest-value, well-tested subset within the real timeline and adding remaining features later — reconciles the business deadline with sound engineering practice better than either extreme. Shipping all four features without proper testing (A) risks quality and trust issues in a customer-facing system, ignoring the stated business timeline entirely (B) fails to meet a real organizational constraint, and shipping placeholder functionality (D) delivers no actual value despite hitting the date."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A property insurance company operates in hurricane-prone coastal regions and wants its Claude-based claims-intake system to handle a possible 20x surge in claim submissions within 48 hours after a major storm makes landfall, compared to normal daily volume.",
    question: "Which architectural characteristic is most critical for handling this specific demand pattern?",
    options: [
      "Permanently provisioning 20x normal capacity year-round, regardless of the fact that surges are rare and storm-triggered",
      "Rapid, automated elastic scaling capable of responding within the surge's actual onset timeframe (hours, not days), combined with tested runbooks for the scale-up so it isn't attempted for the first time during an actual disaster",
      "A fixed monthly infrastructure budget that cannot be exceeded under any circumstances, including during a declared disaster",
      "Manually requesting additional server capacity from the cloud provider's sales team by phone once a storm is confirmed"
    ],
    correct: 1,
    explanation: "Because the surge is sudden (within 48 hours) and infrequent, the system needs rapid automated elastic scaling that can respond within that actual onset window, and that scaling process must be tested ahead of time rather than improvised during the first real disaster. Permanently provisioning 20x capacity (A) wastes resources nearly all year for a rare event, a hard-capped fixed budget during disasters (C) risks failing customers exactly when the insurer's service matters most, and manual phone-based capacity requests (D) is far too slow to respond within hours."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A regional community bank wants to add a Claude-based assistant to help loan officers summarize applicant financial documents. The bank's existing core banking system was built in-house 15 years ago and has a well-documented, stable internal API that other internal tools already use successfully.",
    question: "Given the existing well-documented internal API, what is the most sensible integration approach?",
    options: [
      "Integrate the new assistant against the existing, proven internal API, consistent with how other internal tools already connect to the core banking system",
      "Build an entirely new, separate data-access path into the core banking system specifically for the assistant, bypassing the existing API",
      "Require loan officers to manually export and re-upload documents instead of using any system integration",
      "Refuse to integrate with a 15-year-old system regardless of whether its API is stable and well-documented"
    ],
    correct: 0,
    explanation: "When a stable, well-documented internal API already exists and is proven by other tools' successful use, integrating against it is the lowest-risk, most maintainable path — age alone is not a disqualifying factor when the interface is sound. Building a separate, redundant access path (B) adds unnecessary risk and maintenance burden without a stated reason, requiring manual document handling (C) discards the integration opportunity available, and rejecting the system purely because of its age (D) is not a valid architectural reason when the interface itself is demonstrably reliable."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A digital media company generates thousands of short video clips per day using a Claude-based script-generation and metadata-tagging pipeline. A recent post-incident review found that when the tagging step occasionally fails, the entire pipeline halts and blocks all downstream publishing, even though tagging failures are recoverable and don't actually require blocking script generation for other videos.",
    question: "Which architectural change best addresses the root cause identified in the review?",
    options: [
      "Add more alerting so engineers are notified faster when tagging fails, without changing how failures propagate",
      "Decouple the tagging step so its failures are isolated and retried independently, without blocking script generation or publishing for unrelated videos in the pipeline",
      "Remove the tagging step from the pipeline entirely to eliminate the failure source",
      "Require a human to manually restart the entire pipeline after every single tagging failure, for every video, regardless of whether other videos were affected"
    ],
    correct: 1,
    explanation: "The root cause identified is that a single, recoverable component's failure is incorrectly allowed to block unrelated work — the fix is architectural isolation, decoupling the tagging step so its failures are contained and independently retried rather than propagating to the whole pipeline. Better alerting alone (A) shortens detection time but doesn't fix the propagation problem, removing tagging entirely (C) discards needed functionality instead of fixing its failure handling, and manual full-pipeline restarts (D) is a costly, non-scalable workaround for a design flaw that isolation would eliminate."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A global staffing agency wants one Claude-based résumé-matching system usable by recruiters across North America, Europe, and Asia-Pacific. Each region has different labor law constraints on which candidate attributes may be used or even stored (e.g., certain jurisdictions prohibit storing age or marital status), while the underlying matching logic itself (skills-to-role fit) is largely universal.",
    question: "Which architecture best accommodates region-specific legal constraints on data attributes while preserving one largely shared matching capability?",
    options: [
      "Store and use every candidate attribute globally, and apply legal filtering only in the recruiter-facing display layer",
      "Build three entirely independent matching systems with no shared logic at all, purely to be safe",
      "Apply region-specific data-collection and storage policies at ingestion (so prohibited attributes are never stored or made available for a given region in the first place), while sharing the core skills-matching logic as a common, reusable component across regions",
      "Store all attributes in one global database, but rename prohibited fields so they're harder to identify in an audit"
    ],
    correct: 2,
    explanation: "Enforcing region-specific restrictions at data ingestion — so prohibited attributes are never captured or stored for that region in the first place — is the architecturally sound way to satisfy legal constraints, while still sharing the genuinely universal matching logic as a common component to avoid needless duplication. Filtering only at the display layer (A) still stores prohibited data, which itself likely violates the law regardless of what's shown, three fully independent systems (B) needlessly discards a legitimately shared component, and obscuring prohibited fields by renaming (D) is a deceptive workaround, not a legal control, and would very likely fail an actual audit."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A national pharmacy chain's architecture team must decide where to draw the system boundary between its existing prescription-verification system (a highly regulated, FDA-adjacent system with strict change-control processes) and a new Claude-based assistant that helps pharmacists look up drug-interaction information. Every change to the verification system currently requires a multi-week formal change-control review.",
    question: "Which boundary design minimizes unnecessary regulatory change-control overhead while still letting the new assistant provide value?",
    options: [
      "Build the new assistant as a separate system that reads relevant data from the verification system through a stable, already-approved interface, without requiring changes to the verification system's own regulated codebase for typical feature updates",
      "Embed the new assistant's code directly inside the verification system's codebase so they share one deployment",
      "Route every drug-interaction lookup through the full multi-week change-control process, treating every assistant interaction as a change to the verification system",
      "Avoid touching the verification system in any way, including read access, effectively making the drug-interaction assistant unable to use any verification-system data"
    ],
    correct: 0,
    explanation: "Keeping the new assistant as a separate system that consumes the verification system through a stable, already-approved read interface lets it evolve independently — avoiding the regulated system's multi-week change-control cycle for the assistant's own routine updates — while still allowing it to use verification-system data. Embedding the assistant directly into the regulated codebase (B) would subject its every change to the same costly review process, treating every lookup as a change-control event (C) misapplies a change-management process meant for code/config changes to routine runtime queries, and refusing any data access at all (D) unnecessarily cripples the assistant's usefulness when a read-only interface can safely provide the needed value."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A ski resort operator wants a Claude-based assistant to answer guest questions about lift status and trail conditions. Usage is almost entirely confined to a five-month winter season, with the system essentially idle the rest of the year.",
    question: "Which infrastructure approach best matches this strongly seasonal usage pattern?",
    options: [
      "Provision and pay for full-scale, always-on infrastructure year-round, including during the seven idle months",
      "Use infrastructure that can be scaled down or effectively suspended during the off-season and scaled back up ahead of winter, avoiding paying full-scale costs during months of minimal use",
      "Rebuild the entire system from scratch each winter season rather than reusing the prior year's architecture",
      "Decommission the assistant entirely at the end of each season and require guests to call a phone line instead, forever"
    ],
    correct: 1,
    explanation: "Because usage is concentrated in a well-known five-month window, scaling infrastructure down (or effectively suspending it) during the off-season and ramping back up ahead of winter avoids paying for full-scale capacity during seven largely idle months, which is the most cost-effective match to this seasonal pattern. Running full-scale infrastructure year-round (A) wastes budget for most of the year, rebuilding from scratch annually (C) is unnecessary engineering effort when the same architecture can simply be resumed, and permanently decommissioning the assistant (D) discards a working system rather than adapting its operating cost to the season."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A mortgage lender's architecture team is designing a Claude-based system to pre-screen loan applications. Federal fair-lending regulations require that the lender be able to explain, for any adverse decision, the specific factors that contributed to it, in a form regulators and applicants can review. The team is choosing how tightly to couple the pre-screening agent's internal reasoning to the system's audit and explanation capability.",
    question: "Which architectural choice best ensures the lender can meet this explainability obligation reliably?",
    options: [
      "Design the system so that every decision-relevant factor and input the agent used is captured and structured at decision time as part of the pipeline itself, rather than attempting to reconstruct the reasoning after the fact from logs not designed for that purpose",
      "Rely on customer service staff to improvise an explanation if a regulator or applicant later asks, based on general knowledge of how the system usually behaves",
      "Design the system to produce a decision only, with no structured record of contributing factors, and treat explainability as a documentation problem to solve later if it becomes necessary",
      "Only capture the final approve/deny outcome in logs, since the specific factors are assumed to be implicit in the score"
    ],
    correct: 0,
    explanation: "A regulatory requirement to explain individual adverse decisions must be designed into the pipeline itself — capturing decision-relevant factors and inputs at decision time — because reconstructing a legally defensible explanation after the fact from logs not designed for that purpose is unreliable and risky. Improvised staff explanations (B) are not consistent, verifiable, or defensible under regulatory review, and logging only the final outcome (C, D) fails the requirement outright since neither preserves the specific contributing factors regulators and applicants are legally entitled to see."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A large union-run pension fund wants a Claude-based assistant to help retirees understand their benefit statements over the phone, handled by a call-center IVR system. Call volume peaks predictably every year during the fund's annual open-enrollment period, roughly 3x normal volume for two weeks.",
    question: "Which capacity-planning approach best fits this predictable, recurring peak?",
    options: [
      "Provision infrastructure for the annual peak volume as a scheduled, planned scale-up ahead of the known open-enrollment dates, scaling back down afterward",
      "Provision only for typical non-peak volume, since 3x is a manageable multiplier that doesn't need special planning",
      "Discover the correct peak capacity by trial and error each year during the actual open-enrollment period",
      "Permanently provision peak-level infrastructure at all times of year, even though the peak is known and predictable"
    ],
    correct: 0,
    explanation: "Because the peak is both predictable and recurring on a known annual schedule, the right approach is a planned, scheduled scale-up timed to the known open-enrollment dates, scaling back down once the period ends — this matches capacity to actual demand without waste or risk. Assuming a 3x multiplier is 'manageable' without explicit planning (B) risks under-provisioning for a known event, discovering capacity by trial and error during the actual peak (C) risks real service failures for retirees during a high-stakes period, and permanent peak provisioning (D) wastes resources during the other fifty weeks of the year when the peak is entirely foreseeable and short-lived."
  },
  {
    domain: 1,
    difficulty: 5,
    scenario: "A global asset management firm is designing a Claude-based investment-research assistant used simultaneously by portfolio managers in New York, London, and Singapore. Market-moving research must be released to all regions at precisely the same instant per securities-fairness regulation (no region may receive material information before another), yet each region's local support team wants sub-second local responsiveness for routine, non-market-moving queries, and infrastructure costs must stay within a fixed global budget.",
    question: "Which architecture satisfies the simultaneous-release regulation, regional responsiveness goal, and budget constraint together?",
    options: [
      "A single region's infrastructure serves all three regions' traffic directly, accepting whatever latency each remote region experiences",
      "Fully independent, unsynchronized regional deployments that each release research whenever their local pipeline happens to finish processing it",
      "Regionally distributed infrastructure for routine query handling (giving each region local responsiveness) combined with a synchronized release-gating mechanism specifically for market-moving research, which withholds publication in all regions until a single simultaneous release trigger fires — architected as the one deliberately centralized, tightly coordinated control point in an otherwise regionally distributed system",
      "Release market-moving research to whichever region's team finishes their review first, then relay it to the other two regions afterward for fairness"
    ],
    correct: 2,
    explanation: "The correct design distributes infrastructure regionally for routine, budget-sensitive, latency-sensitive traffic, but treats the simultaneous-release requirement as the one deliberately centralized, tightly synchronized control point — a shared gate that withholds market-moving research everywhere until a single coordinated trigger fires, which is the only way to guarantee no region receives it first. A single region serving all global traffic (A) fails the local responsiveness goal for the other two regions, fully independent unsynchronized deployments (B) directly violates the simultaneous-release regulation since local pipelines will finish at different times, and sequential region-by-region release (D) is exactly the kind of staggered release the fairness regulation is designed to prevent."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A metropolitan public library system wants a Claude-based assistant to help patrons find books and answer reference questions across 30 branch locations, each with a partially independent catalog due to historical system mergers. Leadership wants patrons at any branch to get consistent, accurate answers regardless of which branch's system underlies the data.",
    question: "Which architectural approach best delivers consistent patron-facing answers despite the underlying catalog fragmentation?",
    options: [
      "Build a unified catalog-query abstraction layer that the assistant queries consistently, which internally reconciles and normalizes results from the 30 partially independent catalogs",
      "Let the assistant connect directly and separately to whichever specific branch catalog the patron happens to be physically near, with no reconciliation across branches",
      "Tell patrons that consistent answers are only available at their home branch",
      "Wait to launch the assistant until all 30 catalogs are fully merged into one system, with no interim timeline"
    ],
    correct: 0,
    explanation: "A unified query-abstraction layer that reconciles and normalizes results across the fragmented catalogs lets the assistant present consistent answers system-wide without requiring the underlying catalog merger to be finished first. Connecting directly to whichever branch catalog is nearest (B) reproduces the very inconsistency leadership wants eliminated, restricting consistent answers to a patron's home branch (C) fails the stated goal of system-wide consistency, and waiting for full catalog consolidation with no interim plan (D) needlessly delays value that an abstraction layer can deliver much sooner."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A telecommunications provider's Claude-based network-fault-diagnosis assistant currently depends on a single third-party network-topology data vendor. That vendor experienced a multi-day outage last quarter, during which the diagnosis assistant was completely unusable, forcing engineers back to manual processes.",
    question: "Which architectural change most directly reduces the risk demonstrated by this incident?",
    options: [
      "Switch entirely to a second vendor, recreating the exact same single-vendor dependency risk with a different vendor",
      "Introduce an abstraction layer over the topology-data dependency with a defined fallback (e.g., a secondary data source, degraded-mode operation using cached topology data, or both), so a single vendor's outage no longer fully disables the assistant",
      "Do nothing differently, since the vendor's outage was an unusual one-time event unlikely to recur",
      "Require engineers to manually verify every single piece of data the assistant produces from now on, regardless of vendor status, permanently increasing manual workload"
    ],
    correct: 1,
    explanation: "The incident revealed a single-point-of-failure dependency on one vendor; the architecturally sound fix introduces an abstraction layer with a genuine fallback — a secondary source, degraded-mode operation on cached data, or both — so that vendor's future outages don't fully disable the assistant again. Simply switching to a different single vendor (A) recreates the identical structural risk, assuming the outage won't recur (C) ignores that vendor outages are a foreseeable and recurring category of risk regardless of the specific vendor, and permanently increasing manual verification for all data (D) is a costly blanket workaround that doesn't address the underlying architectural single-point-of-failure."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A children's hospital network wants a Claude-based assistant to help pediatric nurses look up standard dosing information. The hospital's clinical safety board mandates that any AI-assisted dosing suggestion must show its underlying source reference alongside any recommendation, and must never be the sole basis for a dosing decision without a qualified clinician's review.",
    question: "Which architectural requirement follows most directly from the clinical safety board's mandate?",
    options: [
      "The system should present dosing information as a definitive, standalone final answer requiring no further human review, to save clinician time",
      "The system must be designed so every dosing-related output is structurally paired with its cited source reference, and must be integrated into workflows in a way that keeps a qualified clinician as the decision-maker rather than the system operating autonomously on dosing",
      "The system should hide its data sources from nurses to avoid overwhelming them with detail",
      "The requirement is purely a documentation matter and does not require any change to how the system is architected"
    ],
    correct: 1,
    explanation: "A mandate for source citation and mandatory clinician review translates directly into architectural requirements: the output format must structurally pair recommendations with their source references, and the workflow integration must keep the clinician as the actual decision-maker rather than allowing the system to act as a sole or autonomous authority. Presenting output as a definitive standalone answer (A) directly contradicts the mandate, hiding sources (C) is the opposite of what's required, and treating this as documentation-only (D) misunderstands that citation and human-in-the-loop review are functional requirements the system must actually implement, not just describe after the fact."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A regional utility cooperative serving rural customers wants to add a Claude-based outage-reporting assistant, but their existing customer information system is hosted by a third-party vendor whose contract explicitly prohibits any external system from writing directly to its database, only reading via a rate-limited API.",
    question: "Which architecture respects this contractual constraint while still letting the assistant provide useful outage-reporting functionality?",
    options: [
      "Have the assistant write outage reports directly into the vendor's database, since it's the fastest technical path",
      "Design the assistant to read customer and account context through the vendor's approved rate-limited API, and route any outage report that needs to be recorded back to the vendor system through whatever officially supported write mechanism the vendor contract does allow (e.g., a supported ticketing endpoint), rather than direct database writes",
      "Ask the vendor to informally make an exception to the no-direct-write policy for this one project",
      "Avoid using the vendor's customer data at all, making the assistant unable to associate reports with actual customer accounts"
    ],
    correct: 1,
    explanation: "The architecture must work within the contractual boundary as given: read through the approved rate-limited API, and use whichever supported mechanism the vendor contract actually allows for writes — this respects the constraint while still delivering the needed functionality. Writing directly to the database (A) violates the explicit contract term, requesting an informal exception (C) is not a reliable architectural solution and may not be legally sound, and abandoning customer data entirely (D) unnecessarily cripples the feature when a compliant read path is already available."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A national online education platform's Claude-based tutoring assistant currently runs as a single service for all subjects. Usage analytics show that math tutoring sessions are typically short (5-10 minutes) and extremely high volume, while essay-feedback sessions are longer (20-40 minutes), lower volume, and require holding much more conversational context per session.",
    question: "Which architectural adjustment best reflects these divergent usage patterns?",
    options: [
      "Continue treating both subject areas identically in one undifferentiated service, since they're both technically 'tutoring'",
      "Architect the two workloads with independently tunable resource and context-management profiles — e.g., optimized for high-throughput, short-context sessions for math, and different memory/context handling suited to longer, lower-volume essay sessions — even if they share common underlying components",
      "Force essay-feedback sessions to be capped at 5-10 minutes to match the math workload's profile",
      "Force math tutoring sessions to always carry the same large context window essay-feedback needs, for consistency"
    ],
    correct: 1,
    explanation: "Since the two workloads have genuinely different volume, session length, and context requirements, the architecture should let each be tuned independently — high-throughput, short-context handling for math; different memory/context management for longer essay sessions — while still allowing shared underlying components where appropriate. Treating them identically (A) fails to optimize for either pattern's actual needs, and artificially forcing one workload's constraints onto the other (C, D) would either degrade the essay-feedback experience or waste resources on math sessions that don't need a large context window."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A theme park operator wants a Claude-based assistant embedded in its mobile app to answer guest questions about ride wait times and park navigation. Wait-time data changes every few minutes, and the park's wifi network, while generally solid, sees significant congestion near the most popular rides during peak hours.",
    question: "Which architectural choice best keeps the assistant responsive and accurate under these conditions?",
    options: [
      "Fetch fresh wait-time data on a short, regular interval and cache it briefly on the client or edge layer, so most guest queries are served from recently cached data rather than requiring a fresh network round-trip for every single question",
      "Query the live wait-time system fresh for every single guest question with no caching at all, maximizing network load exactly where and when it's most congested",
      "Cache wait-time data once per day, since caching in general is good practice",
      "Refuse to answer wait-time questions during peak hours to avoid network congestion"
    ],
    correct: 0,
    explanation: "Short-interval caching close to the guest (client or edge) matches the actual data freshness need (wait times change every few minutes, not every second) while sharply reducing the number of live network round-trips during exactly the congested peak-hour conditions described. Fetching fresh data for every query (B) maximizes load precisely when the network is most congested, caching once daily (C) makes wait-time answers badly stale given how quickly that data actually changes, and refusing to answer during peak hours (D) removes the feature exactly when guests most need it."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A multinational apparel retailer's architecture team must decide how to handle a new EU requirement that AI systems influencing consumer-facing decisions maintain documented risk assessments and human-oversight mechanisms, while the retailer's existing US-built Claude-based product-recommendation system has none of this documentation and was not designed with a human-oversight hook.",
    question: "Which approach best addresses the new EU requirement without unnecessarily disrupting the existing, functioning US system?",
    options: [
      "Shut down the recommendation system globally, including in the US, until full EU-style compliance is built everywhere",
      "Ignore the EU requirement and continue operating identically in all markets",
      "Introduce the required documentation and human-oversight mechanisms specifically for the EU-facing deployment (or as a configurable capability applied where legally required), without necessarily forcing an identical redesign of the unaffected US deployment",
      "Apply the EU's human-oversight requirement only in the US, since that's where the system was originally built"
    ],
    correct: 2,
    explanation: "The proportionate response scopes the new compliance work to where it's actually legally required — the EU-facing deployment — potentially as a configurable capability, without necessarily forcing a full redesign of the US deployment where the requirement doesn't apply. Shutting the system down globally (A) is a disproportionate response to a jurisdiction-specific requirement, ignoring the requirement entirely (B) creates real legal exposure in the EU market, and applying the EU-specific requirement only in the US (D) misapplies the law to the wrong jurisdiction entirely."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A regional theater chain wants a Claude-based assistant to recommend showtimes and handle simple ticket questions via SMS text message. SMS has strict message-length limits and no native support for rich formatting, unlike the chain's existing web chat assistant which supports longer, formatted responses.",
    question: "What is the most sound architectural approach to serving both channels well?",
    options: [
      "Reuse the exact same response-generation logic and formatting for both SMS and web chat without any channel-specific adaptation",
      "Share the core underlying reasoning and data access between channels, but apply channel-specific output formatting/constraints (e.g., concise plain text for SMS, richer formatted responses for web) at the presentation layer",
      "Build two completely independent systems with no shared logic or data access at all between SMS and web chat",
      "Only support web chat and discontinue SMS entirely to avoid dealing with its formatting constraints"
    ],
    correct: 1,
    explanation: "Sharing the core reasoning and data access while applying channel-appropriate formatting at the presentation layer avoids duplicating business logic while still respecting each channel's real constraints, like SMS's length limits and lack of rich formatting. Reusing identical formatting across both channels (A) would produce broken or unusable SMS output, building two fully independent systems (C) needlessly duplicates the shared underlying logic, and dropping SMS entirely (D) discards a channel the business wants to support rather than solving the formatting mismatch."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A multi-state healthcare provider group is consolidating five previously separate regional Claude-based clinical-documentation systems, each built by a different acquired practice, into one platform. Each system has slightly different data models for patient encounters, and providers are anxious about disruption to a system they use dozens of times per day.",
    question: "Which consolidation strategy best manages both technical risk and provider disruption?",
    options: [
      "A single 'big bang' cutover where all five regions switch to the new unified platform simultaneously on one date",
      "A phased migration, region by region, with the unified platform initially running alongside legacy systems, validating each region's data mapping and provider workflow before fully retiring that region's legacy system",
      "Never consolidate, and permanently maintain five separate systems with duplicated engineering effort indefinitely",
      "Force providers to manually re-enter every past patient encounter into the new system's data model before they're allowed to use it"
    ],
    correct: 1,
    explanation: "A phased, region-by-region migration with a period of parallel operation lets each region's data mapping and provider workflow be validated before legacy retirement, directly reducing both technical risk (data-mapping errors caught early, region by region) and provider disruption (no single high-stakes simultaneous cutover for everyone). A single simultaneous 'big bang' cutover (A) concentrates risk and disruption into one event across all five regions with no opportunity to learn from an early region's issues, indefinite non-consolidation (C) abandons the stated goal and perpetuates duplicated effort, and requiring manual re-entry of historical encounters (D) is an enormous, unnecessary burden when proper data migration and mapping can handle historical data programmatically."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A regional grocery delivery startup wants to decide between two architectures for its Claude-based order-substitution assistant (which suggests replacement items when something is out of stock): one where the assistant calls a live inventory-check tool for every suggestion, and one where it works from an inventory snapshot refreshed every 15 minutes. Substitutions are finalized by a human shopper at checkout regardless.",
    question: "Given that a human shopper finalizes substitutions at checkout, which architecture is more appropriate?",
    options: [
      "The live inventory-check-per-suggestion design, since perfect real-time accuracy is always worth any added latency and system load regardless of downstream safeguards",
      "The 15-minute snapshot design, since a human shopper already verifies actual availability at checkout, making sub-minute-level suggestion freshness unnecessary while meaningfully reducing system load compared to a live check on every suggestion",
      "Neither design matters since the assistant's suggestions have no real consequence",
      "The two designs are functionally identical in every respect, so the choice is arbitrary"
    ],
    correct: 1,
    explanation: "Because a human shopper already verifies real availability at checkout, the suggestion step doesn't need sub-minute freshness — a 15-minute snapshot is easily fresh enough for a suggestion that gets checked downstream anyway, and it meaningfully reduces load compared to a live inventory call for every single suggestion. Insisting on live checks 'regardless of downstream safeguards' (A) ignores that the checkout verification step already provides the accuracy guarantee that matters, claiming the choice is inconsequential (C) is incorrect since load and cost still matter operationally, and claiming the two designs are functionally identical (D) ignores their real difference in freshness and system load."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A commercial cleaning services company wants a Claude-based scheduling assistant. They currently outsource all payroll and HR to a third-party provider whose system has a documented, versioned public API. The company's small internal IT team has no experience building integrations against unfamiliar third-party systems.",
    question: "What is the most important architectural risk to assess before committing to a specific integration design here?",
    options: [
      "Whether the third-party API's documented capabilities, rate limits, and support model are sufficient for the intended integration, and whether the internal team has or can obtain the expertise to build and maintain that integration reliably",
      "Whether the third-party provider's company logo matches the cleaning company's brand colors",
      "Whether the payroll provider is the most well-known brand in the industry",
      "Whether integrating with any third party at all is inherently a bad architectural practice"
    ],
    correct: 0,
    explanation: "The relevant architectural risk assessment covers whether the third-party API's actual capabilities, rate limits, and support model can meet the integration's needs, and whether the team building and maintaining it has or can develop the necessary skill — especially important given the team's stated inexperience. Brand color matching (B) and general provider fame (C) are irrelevant to technical integration risk, and the blanket claim that third-party integration is inherently bad practice (D) is false — reuse of proven external systems is often the sounder architectural choice, as seen in several other scenarios in this domain."
  },
  {
    domain: 1,
    difficulty: 2,
    scenario: "A small-town public school district wants to try a Claude-based assistant to help teachers draft individualized lesson-plan suggestions. Budget is extremely limited, there's no dedicated IT staff, and only about 30 teachers would use it, a handful of times per week each.",
    question: "Which architectural approach best matches this district's constraints?",
    options: [
      "A simple, low-maintenance managed integration requiring minimal ongoing technical upkeep, appropriate for the very limited budget, staff, and usage volume",
      "A custom-built, self-managed multi-region deployment designed for tens of thousands of concurrent users",
      "A dedicated 24/7 on-call engineering rotation to support the assistant's infrastructure",
      "A formal enterprise procurement process modeled on those used by large multinational corporations"
    ],
    correct: 0,
    explanation: "Given an extremely limited budget, no dedicated IT staff, and light usage by roughly 30 teachers, a simple low-maintenance managed integration is clearly proportionate — it requires minimal ongoing technical upkeep the district isn't staffed to provide. The other options describe infrastructure, staffing, and process overhead built for far larger organizations and usage scales, which the district has neither the budget nor the staff to sustain."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A national auto-insurance company's Claude-based claims-photo-damage-assessment feature currently runs as one tightly coupled pipeline: photo upload, damage classification, and repair-cost estimation all happen as a single atomic step, and if cost estimation fails (e.g., due to a pricing-data-service hiccup), the entire submission is rejected and the customer must re-upload photos from scratch.",
    question: "Which architectural change would most improve the customer experience described, without discarding the automation the feature provides?",
    options: [
      "Keep the pipeline as one atomic step, but simply add a friendlier error message when it fails",
      "Decouple the steps so a successful photo upload and damage classification are preserved even if the downstream cost-estimation step temporarily fails, allowing cost estimation to be retried without requiring the customer to redo the earlier, already-successful steps",
      "Remove automated cost estimation entirely and have a human always calculate repair costs manually",
      "Require customers to upload photos multiple times as a matter of course, to increase the odds at least one attempt succeeds"
    ],
    correct: 1,
    explanation: "Decoupling the pipeline's steps so that already-successful work (photo upload, classification) is preserved and only the failed step (cost estimation) needs retrying directly fixes the described experience problem without discarding the automation. A friendlier error message on the same atomic pipeline (A) doesn't change the underlying re-upload burden, removing automated estimation entirely (C) discards a stated valuable feature to work around what is really a resilience/isolation problem, and asking customers to upload multiple times preemptively (D) is an awkward workaround that doesn't address the root architectural coupling issue."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A regional craft brewery chain wants a Claude-based assistant to help retail partners (grocery stores, bars) look up product availability and place reorders. Retail partners range from single independent bars placing a few orders a month to large grocery chains placing hundreds of orders weekly through automated systems, not humans.",
    question: "Which architectural characteristic is most important to support both ends of this partner spectrum?",
    options: [
      "Support only a conversational chat interface, since that's simplest to build, even though large automated partners cannot use a chat interface programmatically",
      "Design the core ordering and lookup capability behind both a conversational interface for manual users and a well-defined API for automated/programmatic partners, so each partner type can interact through the channel that fits their actual usage pattern",
      "Require every partner, regardless of size, to designate a human to manually operate the chat interface",
      "Build two entirely separate, non-integrated ordering systems that maintain inventory independently and reconcile manually"
    ],
    correct: 1,
    explanation: "Exposing the same underlying ordering and lookup capability through both a conversational interface (for small manual users) and a proper API (for large automated partners) lets each partner type interact in the way that actually fits their operational pattern, without duplicating the underlying business logic. Chat-only access (A) excludes large automated partners entirely, forcing all partners including automated ones to use manual chat (C) ignores their stated need for programmatic ordering, and two separately reconciled inventory systems (D) introduces unnecessary duplication and reconciliation risk when one shared backend behind two interfaces solves the problem more cleanly."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A city's 911 emergency dispatch center is exploring a Claude-based assistant to help dispatchers quickly summarize caller information for responding units. Given the life-safety context, the department's leadership insists any new system must never introduce additional delay to the existing dispatch workflow, even if that means the AI assistance is skipped for a specific call.",
    question: "Which architectural principle should govern how the assistant is integrated into the live dispatch workflow?",
    options: [
      "The assistant should be inserted as a mandatory, blocking step that every call must pass through before a dispatcher can act, regardless of processing time",
      "The assistant should run in parallel with, and be strictly non-blocking to, the existing dispatch workflow, providing supplementary summary information when available in time, without ever being able to delay or gate the dispatcher's core actions",
      "The assistant should completely replace the dispatcher's judgment on all calls to reduce human error",
      "The assistant should only be used for calls dispatchers manually flag as 'not urgent,' determined without any system support"
    ],
    correct: 1,
    explanation: "Given leadership's explicit requirement that the system must never add delay to the life-safety-critical dispatch workflow, the assistant must be architected as a non-blocking, parallel supplement — providing value when it's ready in time, but never gating or slowing the dispatcher's core actions. Making it a mandatory blocking step (A) directly violates the no-added-delay requirement, having it replace dispatcher judgment entirely (C) is neither requested nor appropriate for a life-safety decision, and manually pre-flagging 'non-urgent' calls without system support (D) doesn't address the architectural integration question at all and burdens dispatchers with an extra manual judgment call before help is even offered."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A telecom carrier is evaluating whether to route its Claude-based customer-churn-prediction system's data pipeline through the carrier's existing general-purpose enterprise data lake (used by dozens of other analytics teams with varying access-control rigor) or through a newly built, narrowly scoped data pipeline dedicated to this specific use case. Churn-prediction inputs include call detail records that are subject to telecom-specific privacy regulation with steep per-violation penalties.",
    question: "Which factor should weigh most heavily in this decision?",
    options: [
      "Whether reusing the existing data lake is faster to implement in the short term, regardless of its access-control rigor relative to the sensitivity and regulatory exposure of the data involved",
      "Whether the existing data lake's actual access-control rigor and audit posture are adequate for regulated call detail records with steep penalty exposure, or whether that shared, variably-governed environment introduces unacceptable regulatory risk relative to a narrowly scoped, purpose-built pipeline",
      "Whether other analytics teams would be inconvenienced by the churn-prediction team not using the shared data lake",
      "Whether a dedicated pipeline is a more modern-sounding architecture in general"
    ],
    correct: 1,
    explanation: "Given steep regulatory penalty exposure on call detail records, the decisive factor is whether the shared data lake's actual, demonstrated access-control rigor is adequate for that risk level, versus whether a narrowly scoped, purpose-built pipeline more reliably contains and audits access to this sensitive data. Prioritizing short-term implementation speed alone (A) ignores the regulatory risk explicitly at stake, other teams' convenience (C) is not a data-protection criterion, and a general aesthetic preference for 'modern' architecture (D) is not a substantive risk-based justification."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A boutique hotel group operating 22 properties wants a single Claude-based concierge assistant usable across all properties, but each hotel's local team wants the ability to add property-specific recommendations (local restaurants, attractions) without needing central IT's involvement for every update.",
    question: "Which architecture best supports both a shared common platform and low-friction local content updates?",
    options: [
      "A shared platform with a self-service content-management layer that lets each property's local team update their own property-specific recommendations directly, without requiring a code change or central IT ticket per update",
      "One central team manually reviews and code-deploys every individual restaurant recommendation change requested by any of the 22 properties",
      "Each property builds and maintains its own entirely separate assistant application from scratch",
      "Local teams are given direct write access to the shared platform's underlying application code to make their own changes"
    ],
    correct: 0,
    explanation: "A shared platform with a self-service content layer for property-specific data lets local teams update their own recommendations quickly without central IT bottlenecking every change, while still keeping one common underlying platform. Routing every small content change through central code deployment (B) reproduces exactly the friction local teams want to avoid, 22 fully separate applications (C) discards the benefit of a shared platform and multiplies maintenance cost, and giving local teams direct access to application code (D) is far riskier and less appropriate than a scoped content-management interface for what is fundamentally a content-update need, not a code-change need."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A regional water utility wants a Claude-based assistant to help field technicians diagnose issues from meter-reading anomalies. The utility's leadership wants to launch a pilot in one small district first, explicitly to learn whether the approach works before any further investment, and has asked the architecture team to design accordingly.",
    question: "Which architectural characteristic best supports the stated goal of the pilot?",
    options: [
      "Building the pilot on fully scaled, utility-wide infrastructure from day one, since it will need to scale eventually anyway",
      "Designing the pilot to be easy to instrument with clear success/failure metrics and straightforward to extend or unwind afterward, avoiding heavy irreversible infrastructure commitments before the approach itself is validated",
      "Skipping metrics entirely, since the pilot is 'just a pilot' and formal measurement can wait until full-scale rollout",
      "Designing the pilot with permanent, hard-to-reverse integrations into every other utility system, to save integration work later regardless of pilot outcome"
    ],
    correct: 1,
    explanation: "A pilot explicitly meant to validate the approach before further investment should be easy to measure and easy to extend or unwind, avoiding heavy, hard-to-reverse commitments before there's evidence the approach actually works. Building fully scaled, utility-wide infrastructure upfront (A) commits significant investment before validation, which is exactly what the pilot is meant to avoid, skipping metrics (C) defeats the stated learning purpose of the pilot, and building permanent, hard-to-reverse integrations regardless of outcome (D) creates unnecessary sunk cost and risk if the pilot reveals the approach doesn't work."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A defense contractor's architecture team is building a Claude-based system to help engineers search internal technical documentation. Some documentation is export-controlled (ITAR) and may only be accessed by personnel who are US persons per federal regulation, while other documentation has no such restriction. The same engineering team includes both US persons and foreign-national engineers working on unrestricted projects.",
    question: "Which architectural design correctly enforces the export-control requirement without unnecessarily restricting access to unrestricted documentation?",
    options: [
      "Restrict all documentation, restricted and unrestricted alike, to US persons only, to simplify the access model",
      "Grant all engineers, regardless of citizenship status, equal access to the full documentation set for convenience",
      "Implement access control that is tied to each user's verified citizenship/person status and enforced per-document at the retrieval layer, so ITAR-controlled documents are only ever surfaced to verified US persons while unrestricted documents remain accessible to the full engineering team",
      "Rely on a general instruction in the system prompt telling the assistant not to share export-controlled information with foreign nationals"
    ],
    correct: 2,
    explanation: "Export-control law requires that access be tied to verified person-status and enforced at the point of retrieval so restricted documents are structurally unavailable to unauthorized users, while unrestricted documents remain accessible to the full team — this satisfies the legal requirement precisely without over-restricting. Blanket-restricting everything to US persons (A) needlessly excludes foreign-national engineers from unrestricted work they're legally allowed to do, granting equal access to everyone (B) violates federal export-control law outright, and relying on a prompt-level instruction (D) is not an enforced access boundary and is not an acceptable control for a hard legal requirement like ITAR."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A subscription box service wants to add a Claude-based assistant that recommends box customizations based on customer preferences. The product team wants to run frequent A/B tests on different recommendation strategies, sometimes multiple experiments running concurrently, without each experiment requiring a full separate system deployment.",
    question: "Which architectural capability best supports this frequent-experimentation requirement?",
    options: [
      "A configuration-driven experimentation layer that can route different customer segments to different recommendation strategies/parameters within the same deployed system, tracked and measured centrally",
      "Deploying an entirely separate, fully independent system for every individual experiment the product team wants to run",
      "Running only one recommendation strategy at a time, sequentially, to avoid the complexity of concurrent experiments",
      "Manually reassigning customers between strategies by editing individual customer records by hand for each experiment"
    ],
    correct: 0,
    explanation: "A configuration-driven experimentation layer that can route segments to different strategies within one deployed system directly supports frequent, even concurrent, experimentation without the overhead of a full separate deployment per test — this is the standard architectural pattern for supporting active A/B testing programs. Deploying a fully separate system per experiment (B) doesn't scale to the frequent and sometimes-concurrent testing described, running strategies only sequentially (C) prevents the concurrent experimentation the product team wants, and manual per-customer record editing (D) is not a scalable or reliable way to run structured experiments."
  },
  {
    domain: 1,
    difficulty: 4,
    scenario: "A national moving-truck rental company's Claude-based rental-recommendation system currently runs on infrastructure procured through a single cloud vendor under a long-term contract that includes favorable pricing tied to committed spend. A new engineering hire proposes moving parts of the system to a different cloud vendor purely because that vendor has a marginally newer version of a similar service, with no other stated benefit.",
    question: "How should the architecture team evaluate this proposal?",
    options: [
      "Approve it immediately, since using the newest available technology is always the correct architectural choice",
      "Reject it immediately without any evaluation, since committed-spend contracts should never be reconsidered under any circumstances",
      "Evaluate it against the actual business trade-offs: the value of the marginally newer service against the cost of breaking committed-spend pricing, the migration effort, and whether any concrete capability gap actually justifies moving, rather than treating 'newer' as inherently sufficient justification",
      "Approve it solely because the proposal came from a new hire whose perspective should be automatically trusted over existing architecture"
    ],
    correct: 2,
    explanation: "Sound architectural decision-making weighs concrete costs and benefits — here, committed-spend pricing losses and migration effort against whatever specific capability gap, if any, the newer service actually closes — rather than treating novelty alone as sufficient justification. Approving automatically because something is newer (A) or because of who proposed it (D) are not substantive technical or business justifications, and refusing to even evaluate the proposal (B) is equally unsound; a good architecture process is not automatically closed to reconsidering existing contracts if a genuinely compelling reason emerges, it simply requires that reason to be substantiated first."
  },
  {
    domain: 1,
    difficulty: 3,
    scenario: "A multi-brand restaurant franchise group wants one Claude-based assistant to help franchisees across its five distinct brands (each with different menus, branding, and operating procedures) get answers to operational questions. Corporate wants consistent underlying quality and a single support team maintaining it, but franchisees must never see another brand's proprietary information.",
    question: "Which architecture best satisfies both the unified-maintenance goal and the cross-brand information boundary?",
    options: [
      "One assistant instance with a shared knowledge base across all five brands, relying on the model to determine which information is appropriate to share with which franchisee",
      "A shared underlying platform and support team, with brand-specific configuration and strictly scoped, brand-partitioned knowledge access so each franchisee's session can only retrieve their own brand's information",
      "Five entirely separate support teams and platforms, one per brand, with zero shared maintenance",
      "One shared assistant instance with a single unified knowledge base merging all five brands' proprietary information into one dataset, protected only by a generic confidentiality disclaimer in the system prompt"
    ],
    correct: 1,
    explanation: "A shared platform and support team with brand-specific configuration and structurally partitioned knowledge access satisfies both goals: corporate gets one team maintaining consistent quality, and the information boundary between brands is enforced at the access layer rather than left to model judgment. Relying on the model to self-select appropriate information from a shared knowledge base (A) or protecting a merged dataset with only a prompt-level disclaimer (D) are not reliable enforcement mechanisms for a hard confidentiality boundary, and five fully separate teams and platforms (C) abandons the stated goal of unified maintenance and consistent quality."
  },
  {
    domain: 1,
    difficulty: 5,
    scenario: "A global investment bank is designing a Claude-based system to assist traders with real-time market-commentary summarization across equities, fixed income, and FX desks in six trading hubs worldwide. Each jurisdiction has different market-abuse and information-barrier ('Chinese wall') regulations governing what information may flow between certain desks, the system must not introduce material latency into traders' existing sub-second workflows, and the bank's infrastructure budget for this initiative is fixed and modest relative to the bank's total trading infrastructure spend.",
    question: "Which architecture best reconciles the information-barrier regulations, the near-zero added latency requirement, and the constrained budget?",
    options: [
      "One global, shared real-time summarization service that all desks query directly, with information-barrier rules enforced only through a post-hoc compliance review of past outputs",
      "A per-desk-and-jurisdiction-scoped summarization capability with information-barrier boundaries enforced structurally at the data-access layer (so barred desks structurally cannot retrieve each other's information), deployed as a lightweight, narrowly scoped add-on integrated into each desk's existing low-latency workflow rather than as a new heavyweight, latency-adding system layer, reusing shared underlying components across desks and jurisdictions only where doing so doesn't cross an information barrier",
      "A single heavyweight, fully centralized real-time processing platform built especially for this initiative, funded by reallocating the majority of the bank's total trading infrastructure budget",
      "Removing real-time summarization entirely and only offering next-day, batch-generated commentary to sidestep both the latency requirement and the information-barrier complexity"
    ],
    correct: 1,
    explanation: "The only design that satisfies all three constraints together enforces information barriers structurally at the data-access layer (not via after-the-fact review, which doesn't prevent a violation from occurring), integrates as a lightweight addition to existing low-latency workflows rather than a new heavyweight layer (protecting the sub-second latency requirement), and reuses shared components across desks only where doing so doesn't cross a barrier (respecting the modest, fixed budget by avoiding unnecessary duplication). A single shared service with only post-hoc compliance review (A) does not actually prevent a market-abuse violation, it only detects one after the fact, a heavyweight centralized platform funded by reallocating most of the infrastructure budget (C) violates the stated budget constraint, and eliminating real-time summarization altogether (D) abandons the actual business requirement rather than architecting around the constraints."
  }
];
