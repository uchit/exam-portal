// CCAR-P Domain 3 — Integration (19% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D3 = [
  {
    domain: 3,
    difficulty: 3,
    scenario: "An enterprise architecture team is integrating Claude into a 15-year-old inventory management system that exposes only a brittle SOAP API with no sandbox environment, alongside a modern internal REST service the same team fully controls.",
    question: "What integration approach best manages risk from the legacy system while still enabling the new capability?",
    options: [
      "Have Claude call the legacy SOAP API directly for every inventory lookup and write, matching how it calls the modern REST service",
      "Build a thin internal adapter service that wraps the legacy SOAP API, exposing a small, well-tested interface Claude calls instead — isolating Claude's tool surface from the legacy system's fragility",
      "Avoid integrating with the legacy system at all until it can be replaced",
      "Give Claude broader, unscoped access to the legacy system so it can work around whatever the SOAP API doesn't support"
    ],
    correct: 1,
    explanation: "A brittle, sandbox-less legacy API is exactly the case for an adapter layer: it lets the team control blast radius (validate inputs, add retries/timeouts, test the adapter itself) without depending on the legacy system's own reliability. Direct calls (A) or broad access (D) put Claude's tool-calling behavior at the mercy of a system nobody fully trusts; refusing to integrate (C) blocks the capability entirely when a bounded, lower-risk path exists."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A regional bank wants Claude to answer customer questions using account data pulled from a 30-year-old COBOL mainframe. The mainframe team can expose a nightly batch extract to a data warehouse, but real-time queries against the mainframe are technically possible only through an overloaded terminal-emulation gateway that already struggles under teller load.",
    question: "Which integration design should the architecture team recommend for this use case?",
    options: [
      "Route Claude's account lookups through the terminal-emulation gateway in real time, since customers expect up-to-date balances",
      "Have Claude query the nightly warehouse extract for most conversational context, and reserve any real-time gateway calls for the narrow set of actions that truly require current-moment accuracy",
      "Ask the mainframe team to build a brand-new real-time API before allowing any integration to proceed",
      "Cache account data in the chat application's session memory so Claude never needs to query either system twice"
    ],
    correct: 1,
    explanation: "Blending batch data for general context with narrow, justified real-time calls balances latency, mainframe load, and data freshness — it avoids adding Claude traffic to an already-strained gateway while still supporting cases where staleness is unacceptable. Routing everything through the gateway (A) risks degrading teller operations; demanding a new API (C) stalls the project indefinitely; session caching (D) doesn't solve the underlying batch-vs-real-time freshness problem and can serve stale balances silently."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A mid-size e-commerce retailer wants Claude to check order status by calling a third-party fulfillment platform's public API. The vendor's documentation states a hard limit of 100 requests per minute per account, and the retailer's support volume can spike to 500 concurrent chats during flash sales.",
    question: "What is the most appropriate way to integrate with this rate-limited vendor API?",
    options: [
      "Instruct Claude to retry immediately and repeatedly whenever a rate-limit error is returned, so no customer request is dropped",
      "Introduce a caching and request-queuing layer between Claude and the vendor API that deduplicates lookups, serves recently-fetched statuses from cache, and smooths bursts within the vendor's published limit",
      "Negotiate away from the vendor's stated limit by spreading calls across multiple vendor accounts registered under different names",
      "Disable order-status lookups entirely during flash sales to avoid hitting the limit"
    ],
    correct: 1,
    explanation: "A caching/queuing layer directly addresses the mismatch between conversational demand and the vendor's fixed ceiling, reducing redundant calls (many customers ask about the same recent orders) while respecting the contractual limit. Aggressive immediate retries (A) worsen throttling and may get the account suspended; creating shadow accounts (C) violates the vendor agreement and is a governance/ethics problem; disabling the feature (D) sacrifices the exact capability needed during peak demand when it's most valuable."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A hospital system is connecting Claude to its electronic health records (EHR) platform so clinicians can ask natural-language questions about patient history. The EHR vendor offers a certified API but requires all access to flow through the hospital's existing SSO/identity provider with role-based scopes already defined for clinical staff.",
    question: "How should the integration handle authentication and authorization for Claude's access to patient data?",
    options: [
      "Issue Claude a single shared service-account credential with full read access to streamline development",
      "Route Claude's EHR requests through the existing SSO layer so each request executes under the requesting clinician's own authenticated identity and role scope",
      "Have each clinician paste their personal login credentials into the chat interface when they need patient data",
      "Store a static API key for the EHR in the application's front-end code so the browser can call the EHR directly"
    ],
    correct: 1,
    explanation: "Propagating the clinician's authenticated identity and existing role-based scopes through the integration preserves the hospital's access-control model and produces a proper audit trail per user, which is essential for clinical data. A shared full-access service account (A) breaks least-privilege and audit granularity; asking clinicians to paste credentials (C) is an insecure anti-pattern that trains bad security habits; embedding a static key client-side (D) exposes credentials to anyone who inspects the browser."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A logistics company integrates Claude with a partner customs-clearance API used at national borders. The partner has no staging environment, and its terms of service state that test transactions submitted to production are billed and may trigger real regulatory filings.",
    question: "Given the complete absence of a safe test environment, what is the best strategy for validating the integration before go-live?",
    options: [
      "Test directly against the partner's production endpoint using real shipment data, accepting the billing cost as a normal project expense",
      "Build a local mock of the partner API that mirrors its documented request/response contract and error behavior, validate Claude's integration logic against the mock, then do a small number of tightly controlled, pre-arranged live transactions with the partner's operations team before full rollout",
      "Skip pre-launch testing and rely on production monitoring to catch integration issues after go-live",
      "Ask the partner to grant unrestricted production access under a discount so more test transactions can be run cheaply"
    ],
    correct: 1,
    explanation: "Mocking the documented contract lets the team validate logic, error handling, and edge cases without regulatory or financial risk, and a small number of coordinated live transactions closes the gap between mock and reality under controlled conditions. Testing freely in production (A) risks real customs filings and unplanned cost; skipping testing (C) is reckless for a regulated, high-stakes integration; negotiating discounted unrestricted access (D) still leaves every test transaction live and regulatorily consequential."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An insurance carrier is integrating Claude with both a claims-processing system (internal, real-time) and a fraud-scoring vendor (third-party, batch-only, updates once daily). A claims adjuster wants Claude to give a single recommendation combining both signals.",
    question: "What is the best way to design this multi-system integration?",
    options: [
      "Have Claude call the fraud-scoring vendor synchronously on every claim inquiry, waiting for a fresh score before responding",
      "Orchestrate the two systems so Claude combines real-time claims data with the most recent available daily fraud score, and clearly indicates the fraud score's as-of timestamp so the adjuster understands its freshness",
      "Ignore the fraud-scoring vendor's data entirely since it cannot be refreshed in real time",
      "Have Claude estimate a fraud score itself from claims data instead of using the vendor's system"
    ],
    correct: 1,
    explanation: "Orchestrating both systems while transparently surfacing the fraud score's freshness gives the adjuster accurate context without pretending batch data is real-time. Synchronous calls to a batch-only vendor (A) cannot produce a fresher score and will simply add latency or fail; discarding the vendor signal (C) throws away a paid, validated data source; having Claude fabricate its own fraud score (D) replaces a governed, vendor-validated model with an ungoverned one, which is inappropriate for a regulated risk decision."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A SaaS company's product team wants Claude to trigger downstream actions in Salesforce, Zendesk, and an internal billing system whenever a customer conversation reveals a churn risk. Each of these three systems has a different auth model, rate limit, and failure mode.",
    question: "What integration pattern best manages this fan-out to multiple third-party and internal systems?",
    options: [
      "Have Claude call all three systems directly and synchronously within the same conversational turn",
      "Publish a single 'churn risk detected' event from Claude's tool layer to an internal event bus, with separate downstream consumers handling each system's specific auth, retry, and rate-limit behavior independently",
      "Pick the single most important system (billing) and integrate only with that one to reduce complexity",
      "Require a human to manually copy the churn signal into each of the three systems after reviewing the transcript"
    ],
    correct: 1,
    explanation: "An event-driven fan-out decouples Claude's tool surface from the operational quirks of three different vendors, letting each consumer handle its own retries, backoff, and failure isolation without one system's outage blocking the others or blocking Claude's response. Direct synchronous calls to all three (A) means the slowest or least reliable system determines response time and any one failure can break the whole flow; integrating with only one system (C) drops needed functionality; fully manual handoff (D) doesn't scale and defeats the purpose of automation."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A university's admissions office wants Claude to answer applicant questions using data from an aging student information system (SIS) that returns dates in an inconsistent mix of formats (MM/DD/YYYY, DD-MM-YYYY, and Julian dates) depending on which decades-old module wrote the record.",
    question: "What is the most appropriate way to handle this data quality issue in the integration?",
    options: [
      "Pass the raw SIS date values to Claude unchanged and let it infer the correct format from context each time",
      "Add a normalization step in the integration layer that detects and converts each date format to a single canonical format before the data reaches Claude",
      "Exclude all date fields from the data Claude can access to avoid the ambiguity",
      "Ask applicants to manually confirm every date Claude presents to them"
    ],
    correct: 1,
    explanation: "Normalizing inconsistent legacy formats at the integration layer, where the format's provenance and rules are best understood, produces reliable data before it ever reaches the model — this is a data engineering problem, not a reasoning problem. Relying on the model to infer format from ambiguous values (A) will produce silent misinterpretations (e.g., 03/04 is ambiguous); excluding dates entirely (C) removes needed functionality; requiring manual confirmation for every date (D) is not scalable and undermines the point of the assistant."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A government tax agency plans to integrate Claude with an internal case-management system holding citizen tax records. Statute requires that no citizen PII ever leave systems within the agency's own data center, and the agency currently uses a cloud-hosted deployment of Claude.",
    question: "What integration design correctly respects the stated legal boundary?",
    options: [
      "Send full case records including PII to the cloud-hosted Claude deployment, since the agency trusts the vendor's security certifications",
      "Redesign the flow so PII stays behind the agency's boundary — the internal system resolves case data to de-identified or tokenized representations before anything is sent to Claude, and any PII needed in the final output is rehydrated locally after Claude responds",
      "Proceed with sending PII to the cloud deployment but add a data processing addendum after the fact to make it compliant",
      "Abandon the integration since any use of a cloud-hosted model automatically violates the statute"
    ],
    correct: 1,
    explanation: "Tokenizing or de-identifying PII before it crosses the trust boundary, with rehydration happening locally, satisfies both the statute and the functional need — this is a standard pattern for keeping regulated data within a required boundary while still leveraging an external service for reasoning. Sending PII outright (A) violates the law regardless of vendor trust; retroactive paperwork (C) doesn't cure a data flow that already breached the boundary; assuming no integration is possible (D) ignores well-established de-identification patterns that make it feasible."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A manufacturing company runs a 20-year-old MES (manufacturing execution system) on the factory floor with an undocumented proprietary protocol. A contractor who built the original system left no source code, but a working client library exists as a compiled binary with no available documentation.",
    question: "What is the most responsible integration strategy given this level of legacy risk?",
    options: [
      "Reverse-engineer the proprietary protocol from network traffic and build a new direct integration, bypassing the binary client library entirely",
      "Wrap the existing compiled client library in a small internal service with a well-defined interface, treating the library as an opaque but functioning black box, and invest reverse-engineering effort only if the library later proves insufficient",
      "Replace the entire MES before attempting any integration",
      "Have Claude send commands formatted by guesswork directly to the MES's network port"
    ],
    correct: 1,
    explanation: "Wrapping the known-working binary in a service boundary captures the value of a working (if opaque) integration point without taking on the risk of reverse-engineering an undocumented protocol from scratch, and defers that higher-risk work unless it becomes necessary. Reverse-engineering the protocol outright (A) is high-effort and high-risk for a working alternative; requiring MES replacement first (C) is disproportionate and stalls the project for years; sending guessed commands directly to a live factory system (D) risks operational and safety incidents."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A telecom provider integrates Claude with a third-party billing platform via webhooks: the platform pushes 'invoice generated' and 'payment failed' events to the provider's systems. The vendor's webhook delivery has no built-in retry and occasionally drops events silently during its own maintenance windows.",
    question: "What should the integration team add to make this event-driven design reliable?",
    options: [
      "Trust the vendor's webhook delivery as-is, since adding complexity isn't worth it for occasional drops",
      "Add a periodic reconciliation job that polls the vendor's API to compare its event log against what the provider's systems actually received, backfilling any missed events",
      "Switch entirely from webhooks to having a human check the vendor's dashboard manually each morning",
      "Ask Claude to infer which events might have been missed based on conversational patterns"
    ],
    correct: 1,
    explanation: "A reconciliation job is the standard mitigation for unreliable webhook delivery: it closes the gap between 'events sent' and 'events received' without abandoning the low-latency benefit of webhooks for the common case. Trusting delivery as-is (A) leaves known silent failures unaddressed for a billing-critical event stream; manual dashboard checks (C) don't scale and are error-prone; having Claude guess at missing events (D) is not a reliable engineering control and misuses the model for a problem that needs deterministic reconciliation."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A media streaming company wants to integrate Claude with a content recommendation microservice that already has robust authentication, versioned APIs, comprehensive documentation, and a dedicated staging environment.",
    question: "Compared to the legacy and undocumented systems typical in this domain, how should the integration approach for this well-governed internal service differ?",
    options: [
      "Apply the same heavy defensive wrapping (extensive adapters, conservative rate throttling, exhaustive mocking) used for brittle legacy systems, regardless of this service's maturity",
      "Integrate more directly against the service's stable versioned API, since its existing contracts, staging environment, and documentation already provide much of the safety a defensive layer would otherwise need to create",
      "Refuse to integrate until the service is rewritten to match the legacy system's protocol for consistency",
      "Bypass staging and test only in production because the service is described as robust"
    ],
    correct: 1,
    explanation: "Integration effort should be proportional to actual risk: a well-documented, versioned, staged internal service already provides the safety properties that a heavy adapter layer exists to compensate for elsewhere, so a lighter-weight, more direct integration is appropriate and avoids unnecessary engineering overhead. Applying maximal defensive wrapping regardless of context (A) wastes effort where it isn't needed; demanding protocol uniformity with a legacy system (C) is an arbitrary and costly constraint; skipping staging just because the service seems robust (D) discards a real safety benefit for no good reason."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A law firm's document management system integration with Claude has grown organically over two years: five different point-to-point connections now exist between Claude's tool layer and various practice-management tools, each with its own authentication, error handling, and data mapping logic duplicated across the codebase.",
    question: "What is the best way to address the technical debt this integration sprawl represents?",
    options: [
      "Leave the five point-to-point integrations as-is, since they currently function and refactoring risks introducing new bugs",
      "Consolidate the duplicated auth, error-handling, and mapping logic into a shared integration layer or gateway that each point-to-point connection is migrated onto incrementally, reducing duplication without a risky big-bang rewrite",
      "Immediately decommission all five integrations and rebuild them simultaneously from scratch over a single weekend",
      "Add a sixth point-to-point integration for the next practice-management tool to keep the pattern consistent with what's already there"
    ],
    correct: 1,
    explanation: "Incremental consolidation onto a shared gateway addresses the root cause (duplicated, divergent logic) while managing risk through gradual migration rather than a disruptive rewrite — a standard way to pay down integration technical debt. Leaving it as-is (A) lets the duplication and inconsistency compound with every new integration; a simultaneous full rewrite (C) is high-risk and likely to cause an outage; adding a sixth point-to-point connection in the same pattern (D) actively worsens the debt being described."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A non-profit relief organization integrates Claude with a donor CRM platform to draft personalized outreach. The CRM vendor is a small startup with a documented history of unannounced breaking changes to its API roughly twice a year, with no advance deprecation notice.",
    question: "How should the integration be designed to withstand this vendor's release practices?",
    options: [
      "Integrate directly against the vendor's API with no abstraction, and fix breaks reactively each time they occur",
      "Build an internal facade around the CRM API so breaking changes are absorbed and repaired in one place, and add automated contract tests against the vendor's API that run on a schedule to catch breaking changes before they affect users",
      "Require the vendor to sign a contract promising not to make breaking changes, and treat that as sufficient protection",
      "Avoid using any third-party CRM vendor and build a replacement CRM in-house"
    ],
    correct: 1,
    explanation: "A facade contains the blast radius of a single-vendor break to one place in the codebase, and scheduled contract tests convert 'silent breakage discovered by users' into 'breakage caught by monitoring before impact' — appropriate given this vendor's documented track record. Integrating with no abstraction (A) means every break has scattered impact; a contractual promise alone (C) doesn't prevent technical breakage or give early warning; building a replacement CRM (D) is a disproportionate response to an API stability problem."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "An agriculture-tech company wants Claude to combine real-time soil-sensor readings (updated every 5 minutes via MQTT) with a slow-changing crop-planning database (updated a few times per season) to advise farmers on irrigation timing.",
    question: "What integration pattern most sensibly matches the differing update cadences of these two data sources?",
    options: [
      "Poll the crop-planning database every 5 minutes at the same cadence as the sensor feed, to keep both sources synchronized",
      "Subscribe to the sensor stream for near-real-time readings and fetch or cache the crop-planning data at a cadence matched to how infrequently it actually changes, combining both within Claude's context only when a recommendation is generated",
      "Only use the sensor data and ignore the crop-planning database since it changes less often",
      "Batch both sources together and refresh them once per day for consistency"
    ],
    correct: 1,
    explanation: "Matching each source's polling or subscription cadence to its actual rate of change avoids both unnecessary load (polling a rarely-changing database every 5 minutes) and staleness (treating a fast-changing sensor feed like a seasonal dataset), while combining them at recommendation time gives Claude the freshest relevant view of each. Polling the slow database on the fast cadence (A) wastes resources for no benefit; dropping the planning data (C) removes needed context; forcing both to a daily batch (D) makes the real-time sensor data uselessly stale for irrigation timing."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A gaming company integrates Claude into its in-game support chat, which needs to look up a player's purchase history from a third-party payment processor. The processor's API returns rich transaction data, but the game's trust and safety policy restricts what financial detail should ever be visible to a chat-facing AI system.",
    question: "How should the integration layer handle the mismatch between what the vendor API returns and what policy allows Claude to see?",
    options: [
      "Pass the processor's full API response to Claude and rely on instructions telling it not to repeat sensitive fields to the player",
      "Filter and transform the processor's response at the integration layer so only the fields permitted by trust-and-safety policy (e.g., purchase status, item, date) ever reach Claude, stripping full card numbers, billing addresses, and other restricted financial detail before it crosses the boundary",
      "Deny Claude any access to purchase history to avoid the policy conflict entirely",
      "Ask the payment processor to change what their API returns for this one integration"
    ],
    correct: 1,
    explanation: "Enforcing the policy boundary at the integration layer — stripping restricted fields before they ever reach the model — is a structural control that doesn't depend on the model correctly following an instruction not to disclose data it can see. Relying on prompted instructions alone (A) is a weaker control since the sensitive data still reaches the model and could leak; withholding purchase history entirely (D) removes needed support functionality; expecting the vendor to customize their API for one integration (D... C) is generally impractical and outside the team's control."
  },
  {
    domain: 3,
    difficulty: 5,
    scenario: "A multinational energy utility operates grid-control systems across four countries, each with different regulators, different legacy SCADA vendors, and different data residency rules. Leadership wants a single Claude-based assistant for grid operators globally, but two of the four countries' regulators explicitly prohibit any operational grid data from being processed outside their national borders, even transiently.",
    question: "What integration architecture satisfies both the goal of a unified assistant experience and the conflicting regulatory constraints?",
    options: [
      "Deploy one centralized integration that routes all four countries' grid data through a single regional processing hub for consistency",
      "Deploy region-specific integration and processing instances so grid data from the two restricted countries never crosses their borders, while presenting operators in all four countries with a consistent assistant experience and interface built on top of these regionally isolated backends",
      "Exclude the two restricted countries from the assistant program entirely to avoid the compliance complexity",
      "Process the restricted countries' data centrally but encrypt it in transit, treating encryption as sufficient to satisfy the residency requirement"
    ],
    correct: 1,
    explanation: "Regionally isolated backends satisfy hard data-residency law while a shared interface/experience layer on top delivers the consistency leadership wants — this is the standard architecture for reconciling global product goals with per-jurisdiction legal constraints. Central routing for all four countries (A) directly violates two countries' law regardless of technical elegance; excluding those countries (C) sacrifices the stated business goal unnecessarily when a compliant architecture exists; treating encryption-in-transit as satisfying residency (D) misunderstands residency law, which typically concerns where data is processed and stored, not just how it's transmitted."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A real estate brokerage integrates Claude with an MLS (multiple listing service) data feed that is delivered as a nightly FTP file drop in a fixed-width text format dating to the 1990s, alongside a modern listings API from a newer regional exchange that returns JSON.",
    question: "What is the best way to reconcile these two structurally different data sources for use by Claude?",
    options: [
      "Have Claude parse the raw fixed-width file directly at query time alongside calling the JSON API",
      "Build a transformation pipeline that parses the fixed-width file into a normalized schema matching the structure already used for the JSON API, so Claude consumes one consistent internal representation regardless of source",
      "Drop the older MLS feed and rely solely on the newer JSON API for all listings",
      "Convert the JSON API's output into fixed-width format to match the legacy feed's structure"
    ],
    correct: 1,
    explanation: "Normalizing both sources into one consistent internal schema in a pipeline — rather than in the model's context window — is standard ETL practice and keeps Claude's tool interface simple and source-agnostic. Having Claude parse raw fixed-width text at query time (A) is fragile, error-prone, and wastes model effort on a mechanical parsing task; dropping the legacy feed (C) loses listings data likely unavailable elsewhere; converting the modern API's output backward into a legacy format (D) is needless extra complexity in the wrong direction."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A B2B SaaS company's customers each configure their own webhook endpoints to receive notifications when Claude completes an automated workflow. Some customer endpoints are slow, some are occasionally down, and one customer's endpoint has been observed to hang for over a minute without responding.",
    question: "How should outbound webhook delivery to customer endpoints be architected to prevent one customer's unreliable endpoint from affecting the platform?",
    options: [
      "Send each webhook synchronously as part of the workflow completion, waiting for the customer's endpoint to respond before considering the workflow finished",
      "Deliver webhooks asynchronously through a queue with per-endpoint timeouts, retry-with-backoff, and circuit breaking, so a slow or hanging customer endpoint cannot block or degrade processing for other customers",
      "Stop sending webhooks to any customer whose endpoint has ever failed once",
      "Increase the timeout indefinitely for all customers so slow endpoints eventually succeed"
    ],
    correct: 1,
    explanation: "Asynchronous queued delivery with per-endpoint timeouts and circuit breaking is the standard pattern for multi-tenant webhook fan-out: it isolates one customer's unreliable endpoint from affecting others or blocking core workflow completion. Synchronous delivery (A) directly couples workflow completion to the slowest customer endpoint, exactly the failure mode described; permanently disabling delivery after one failure (C) is overly punitive for transient issues; unlimited timeouts (D) still leaves the platform hostage to a hanging endpoint and doesn't isolate the failure."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A public library system wants to integrate Claude with its catalog system to help patrons find books. The catalog vendor offers both a modern read-only search API and a separate, older API required for placing holds that has no rate limit documentation and a history of vendor-side outages during peak hours.",
    question: "What is a sound approach to sequencing this integration work?",
    options: [
      "Integrate both APIs simultaneously in the first release to deliver full functionality at once",
      "Integrate the modern, well-documented search API first to deliver immediate value, and treat the older holds API as a separate phase requiring more defensive engineering (timeouts, graceful degradation, fallback messaging) given its documented instability",
      "Wait to release any functionality until the vendor fixes the older API's reliability issues",
      "Integrate only the older holds API first since placing holds is the more valuable feature"
    ],
    correct: 1,
    explanation: "Phasing the integration lets the team ship low-risk, high-value functionality quickly while giving the less reliable, higher-risk component the additional defensive engineering it needs — appropriately calibrating effort to each API's actual risk profile. Building both at once (A) applies the same timeline to a stable and an unstable dependency, likely delaying the stable one's launch; waiting on the vendor to fix reliability (C) cedes the release timeline to a third party with no control or deadline; prioritizing the unreliable API first (D) takes on the highest integration risk before validating anything else works."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A large retailer's fraud-detection pipeline currently has three different teams independently maintaining separate point-to-point integrations from their own services into the same third-party identity-verification vendor, each negotiated with different contract terms and rate limits.",
    question: "From an integration governance perspective, what is the most significant risk in this arrangement, and how should it be addressed?",
    options: [
      "There is no real risk since each team's integration works independently; governance should focus elsewhere",
      "The lack of a single point of vendor governance creates risk of inconsistent contract terms, duplicated spend, and an aggregate rate-limit usage no one team can see; the organization should consolidate to one governed integration point (or a shared gateway) with visibility across all consuming teams",
      "The risk is purely technical (duplicated code), so the fix is simply a shared code library with no change to how contracts or rate limits are managed",
      "Each team should switch to a different identity-verification vendor to eliminate the overlap"
    ],
    correct: 1,
    explanation: "Multiple ungoverned point-to-point relationships with the same vendor create real organizational risk — inconsistent terms, invisible aggregate usage against a shared rate limit, and duplicated negotiation effort — that only centralized vendor governance (a shared gateway or a single owning team) can resolve. Dismissing it as risk-free (A) ignores the commercial and reliability exposure; treating it as purely a code-sharing problem (C) misses the contractual and governance dimension, which is the more serious issue; switching vendors (D) doesn't fix the underlying lack of governance and just recreates the same problem with a new vendor."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A national postal service wants to sunset a 25-year-old package-tracking mainframe integration in favor of a modern cloud-based tracking platform. Thousands of downstream systems, including the Claude-based customer support assistant, currently depend on the mainframe's tracking API.",
    question: "What is the best migration strategy for decommissioning this legacy integration without disrupting dependent systems like the support assistant?",
    options: [
      "Switch the Claude integration directly from the mainframe API to the new platform's API on a single cutover date, along with all other dependent systems",
      "Run the mainframe and new platform in parallel behind a stable internal interface, migrating the Claude integration (and other consumers) to read from the new platform gradually while comparing outputs for consistency, then decommission the mainframe once parity is confirmed and all consumers have migrated",
      "Decommission the mainframe immediately and let each dependent system, including the Claude integration, adapt afterward on its own timeline",
      "Keep the mainframe running indefinitely alongside the new platform without ever migrating consumers, to avoid any risk of disruption"
    ],
    correct: 1,
    explanation: "A parallel-run, gradual-migration strategy behind a stable interface lets teams validate the new platform's output against the trusted legacy system before cutover and migrate consumers incrementally, minimizing disruption risk for a system with thousands of dependents. A single big-bang cutover for all consumers (A) concentrates risk on one date across an enormous dependent surface; decommissioning first and adapting later (C) guarantees outages for every dependent system; running both forever with no migration (D) never actually retires the legacy system and defeats the stated goal."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A car insurance company wants Claude to pull driving-record data from a state DMV system as part of underwriting. The DMV's integration agreement requires that every access be logged with a specific state-mandated audit format, and the DMV can suspend the insurer's access entirely if audit logging is found non-compliant during a periodic review.",
    question: "Where should audit logging responsibility for DMV data access be enforced in this integration?",
    options: [
      "Rely on Claude to include an audit note in its response text describing that it accessed DMV data",
      "Implement mandatory, structured audit logging in the integration layer that intercepts every DMV API call, independent of what Claude does or says, ensuring every access is logged in the state's required format regardless of application-level behavior",
      "Log DMV access only when the underwriting outcome is a denial, since approvals are less likely to be audited",
      "Have underwriters manually log each DMV lookup in a separate spreadsheet"
    ],
    correct: 1,
    explanation: "A compliance-critical, all-access audit requirement with suspension consequences needs a deterministic control at the integration layer that captures every call regardless of what the model generates in its response — logging can't depend on the model choosing to mention it. Relying on Claude's text output (A) is not a reliable compliance control since it could omit or malform the note; logging only denials (C) directly violates the 'every access' requirement; manual spreadsheet logging (D) doesn't scale and is highly error-prone for an audit-critical, suspension-risk requirement."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "An architecture team is evaluating whether a new integration between Claude and an external vendor's inventory API should use synchronous request/response calls or an asynchronous, queue-based pattern.",
    question: "Which factor is most directly relevant to choosing between synchronous and asynchronous integration for this call?",
    options: [
      "The vendor's marketing materials and brand reputation",
      "Whether the caller (Claude, in the middle of a conversation) needs the result immediately to continue, versus whether the operation can tolerate delayed completion and eventual notification",
      "The number of employees at the vendor company",
      "Whether the vendor's API documentation uses REST or SOAP terminology"
    ],
    correct: 1,
    explanation: "The core architectural question for sync vs. async is latency tolerance: does the calling context need an immediate result to proceed, or can the operation complete later with an eventual notification (e.g., webhook)? A conversational reply usually needs a timely answer, favoring synchronous calls for quick lookups and async patterns for longer-running operations. Vendor reputation (A) and employee count (C) are irrelevant to this technical decision, and REST vs. SOAP (D) is a protocol choice, not the determining factor for sync/async design."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A large hospital network's Claude-based clinical documentation assistant must integrate with both a hospital-owned EHR (which the architecture team fully controls) and an outside specialist lab's results-reporting system (a small independent lab with no dedicated IT department and a system that has been down for entire days in the past year).",
    question: "How should the integration's failure-handling design differ between these two dependencies?",
    options: [
      "Treat both systems identically since they are both 'external' data sources from Claude's perspective",
      "Design tighter SLAs and less defensive handling for the fully-controlled EHR, while building explicit graceful-degradation behavior for the lab system — such as clearly telling clinicians when lab results are unavailable rather than blocking the whole assistant — given its documented unreliability and lack of dedicated support",
      "Apply the most defensive, conservative handling to the EHR since it holds the most sensitive data, and treat the lab system as lower priority to engineer for",
      "Refuse to integrate with the lab system at all until it proves 99.9% uptime"
    ],
    correct: 1,
    explanation: "Failure-handling design should be proportional to each dependency's actual demonstrated reliability and the team's ability to influence it: the well-controlled EHR can reasonably support tighter guarantees, while the small lab's documented multi-day outages call for explicit graceful degradation so the whole assistant doesn't become unusable when that one dependency fails. Treating both identically (A) ignores materially different risk profiles; over-engineering the EHR at the lab's expense (C) misallocates effort away from the system actually prone to failure; refusing to integrate until the lab proves high uptime (D) may be impractical for a small lab and unnecessarily blocks a valuable data source when graceful degradation is achievable instead."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A subscription box e-commerce company is integrating Claude with Shopify (order data) and Stripe (payment data) to support customer service agents. Both platforms provide official, well-documented SDKs and sandbox/test environments.",
    question: "Given that both third-party platforms already provide mature SDKs and sandbox environments, what should the integration team prioritize?",
    options: [
      "Building custom low-level HTTP clients from scratch for both platforms instead of using the official SDKs, for maximum control",
      "Using the official SDKs and sandbox environments as the foundation, focusing engineering effort on the integration-specific concerns: mapping the data each platform returns into what Claude's tools need, handling errors consistently, and testing realistic customer-service scenarios in the sandboxes before production use",
      "Skipping sandbox testing entirely since both platforms are described as mature and well-documented",
      "Building a single generic adapter that treats Shopify and Stripe identically to minimize integration code"
    ],
    correct: 1,
    explanation: "When mature SDKs and sandboxes already exist, the team's effort is best spent where it adds unique value — data mapping, consistent error handling, and scenario testing specific to this use case — rather than reinventing what the vendors already provide well. Building custom HTTP clients from scratch (A) duplicates effort the SDKs already handle reliably; skipping sandbox testing (C) discards a valuable safety net that costs little to use; forcing Shopify and Stripe into one identical adapter (D) ignores that orders and payments have different data models and failure modes, which a single generic abstraction would likely handle poorly."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A legal services firm wants Claude to search across an internal document repository, a third-party legal-research platform (Westlaw-like), and a client-facing matter-management SaaS tool, presenting a unified answer to attorneys researching a case.",
    question: "What integration pattern best supports Claude drawing on all three sources coherently in one response?",
    options: [
      "Query all three systems in whatever order they respond, and present each system's raw output back-to-back without synthesis",
      "Query all three systems through their respective integrations, normalize each source's results into a comparable format tagged with its origin, and let Claude synthesize a single coherent answer that cites which source each piece of information came from",
      "Pick the fastest-responding system each time and only use that one's data",
      "Require the attorney to manually query each of the three systems separately and paste the results into the chat"
    ],
    correct: 1,
    explanation: "Normalizing multi-source results with clear provenance tagging lets Claude synthesize a coherent, properly-attributed answer — critical in a legal context where knowing which source (internal repository vs. external research platform vs. matter data) backs a claim matters for professional responsibility. Presenting raw, unsynthesized output (A) pushes the integration work onto the attorney and produces a poor experience; picking only the fastest-responding system (C) arbitrarily discards relevant sources; requiring manual querying (D) defeats the purpose of building the integration at all."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A supply chain company integrates Claude with a freight-carrier tracking API that occasionally returns malformed JSON due to a known vendor bug, roughly 2% of the time, according to the vendor's own status page.",
    question: "What is the most robust way for the integration layer to handle this known, quantified failure rate?",
    options: [
      "Let malformed responses propagate to Claude unchanged and rely on the model to recover gracefully from arbitrary parse errors",
      "Implement explicit parsing validation and error handling in the integration layer that detects malformed responses, retries the call a bounded number of times, and returns a clear, structured error to Claude's tool-calling layer if retries are exhausted",
      "Stop using the freight-carrier API entirely since any known bug rate is unacceptable",
      "Silently substitute a plausible-looking placeholder value whenever the response is malformed, so the flow never appears to fail"
    ],
    correct: 1,
    explanation: "Deterministic validation, bounded retries, and structured error surfacing at the integration layer is the correct place to handle a known, quantified failure mode — it gives Claude's tool layer a clean, predictable signal to reason about instead of raw garbage. Letting malformed data reach Claude unchanged (A) risks the model treating corrupted data as valid; refusing to use the API over a 2% known bug rate (C) is a disproportionate response to a manageable, quantified issue; silently substituting placeholder values (D) is actively dangerous because it hides real failures and can present fabricated tracking data as fact."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A telehealth startup integrates Claude with a third-party e-prescribing network required for controlled-substance prescriptions. The network mandates that any AI-assisted drafting of a prescription be reviewed and explicitly countersigned by a licensed prescriber before transmission, per DEA regulation.",
    question: "How should this regulatory requirement shape the integration's architecture?",
    options: [
      "Let Claude submit prescriptions directly to the e-prescribing network's transmission endpoint, and add a note in the system prompt instructing it to always have a human review first",
      "Architect the integration so Claude can only write to a draft/staging state, with the actual transmission endpoint access gated behind a separate, auditable prescriber countersignature step that Claude's credentials cannot bypass",
      "Give Claude full access equivalent to a licensed prescriber's credentials, since it operates under the clinic's supervision",
      "Avoid integrating with the e-prescribing network at all and have staff handle every prescription manually outside the assistant"
    ],
    correct: 1,
    explanation: "A hard architectural gate — Claude can only reach a draft state, with transmission requiring a separate credentialed countersignature the model's access cannot bypass — is a structural control that enforces the DEA requirement regardless of prompt instructions. Relying on a system-prompt instruction while giving Claude direct transmission access (A) is not a reliable compliance control since it depends on the model reliably following an instruction it technically has the access to violate; giving Claude prescriber-equivalent credentials (C) directly violates the regulation's requirement for human licensure and countersignature; avoiding the integration entirely (D) discards the assistant's value for the majority of workflow around prescriptions where a compliant architecture is achievable."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A regional airline wants to integrate Claude with a weather-data vendor to help dispatchers assess delay risk. The vendor offers two tiers: a free tier with 15-minute-old data and unlimited calls, and a paid real-time tier with per-call pricing that could become expensive at the airline's call volume.",
    question: "What integration approach best balances cost and the operational need for timely weather data?",
    options: [
      "Use only the free 15-minute-delayed tier for all weather lookups, regardless of how time-sensitive the specific decision is",
      "Use the free tier for general situational awareness and lower-stakes queries, and reserve paid real-time calls for the specific high-stakes decisions (e.g., imminent departure delay calls) where 15-minute-old data could lead to a materially wrong operational decision",
      "Use the paid real-time tier for every single weather query to guarantee the freshest possible data at all times",
      "Avoid integrating weather data at all due to the cost tradeoff"
    ],
    correct: 1,
    explanation: "Matching data freshness tier to decision stakes — free tier for general context, paid real-time calls reserved for genuinely time-sensitive operational decisions — controls cost while ensuring the moments where staleness actually matters get accurate data. Using only the delayed free tier everywhere (A) risks feeding stale data into decisions where minutes matter; using paid real-time calls for every query (C) is needlessly expensive when most queries don't require that precision; avoiding weather integration altogether (D) discards a clearly valuable capability over a solvable cost-tiering problem."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A financial services firm's Claude-based advisory assistant integrates with a market-data vendor whose contract includes a clause prohibiting the data from being used to train or fine-tune any machine learning model, only for point-in-time display and reasoning.",
    question: "What integration and data-handling safeguard is most directly required by this contractual restriction?",
    options: [
      "Ensure the market-data vendor's responses are used only within live inference calls and are not captured into any dataset used for model training or fine-tuning, with logging/retention policies reviewed to confirm this boundary is actually enforced",
      "Ask the legal team to renegotiate the clause after the integration is already built and in production",
      "Assume the restriction is automatically satisfied because Claude is a hosted model the firm doesn't train",
      "Store the vendor's data long-term in the firm's data warehouse for analytics, since the contract only mentions 'training'"
    ],
    correct: 0,
    explanation: "The contractual restriction is a data-governance requirement that must be actively verified in how the integration logs, retains, and potentially reuses vendor data — not something that's automatically true just because the firm doesn't operate its own training pipeline; feedback or evaluation datasets, fine-tuning experiments, or logging pipelines could inadvertently violate it. Renegotiating only after building the integration (B) is backwards and risks a breach in the interim; assuming compliance without verification (C) ignores that logging or downstream analytics pipelines commonly repurpose captured data; treating long-term warehousing as fine because it isn't literally 'training' (D) misses the spirit and likely the letter of a restriction meant to prevent broader reuse of licensed data."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A manufacturing company's plant-floor IoT integration streams sensor telemetry to Claude for predictive maintenance alerts. The plant network and the corporate network where Claude's tool layer runs are on separate VLANs, and the plant's OT (operational technology) security policy strictly forbids any inbound connection initiated from the corporate network into the OT network.",
    question: "What integration architecture respects the OT network's inbound-connection restriction while still delivering telemetry to Claude?",
    options: [
      "Open a firewall exception allowing the corporate network's integration service to initiate inbound connections into the OT network whenever it needs fresh telemetry",
      "Have the OT-side system push telemetry outbound to a broker or gateway in the corporate/DMZ network, with the Claude integration layer only ever pulling from that broker — never initiating a connection into the OT network itself",
      "Merge the two VLANs into one network to simplify the integration",
      "Have plant engineers manually export telemetry files and upload them to the corporate network each shift"
    ],
    correct: 1,
    explanation: "An outbound-push model to a DMZ broker respects the OT policy's directionality constraint exactly as stated — the OT network only ever initiates connections outward, and the corporate-side integration only ever pulls from the intermediary, never reaching into the OT network. Opening a firewall exception for inbound corporate-to-OT connections (A) directly violates the stated security policy; merging the VLANs (C) eliminates the security boundary the policy exists to protect entirely; manual file exports (D) doesn't scale for near-real-time predictive maintenance and introduces significant latency and human error."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A city government's 311 service-request platform wants to integrate Claude to help residents check request status. The platform's existing REST API returns clean JSON and has a documented staging environment, but the city's IT policy requires a formal security review before any new external integration touches resident data, typically taking six to eight weeks.",
    question: "What should the project team do given this policy requirement?",
    options: [
      "Skip the security review to hit an aggressive launch date, since the API itself is well-documented and low-risk",
      "Build and test the integration against the staging environment in parallel with initiating the security review early, so review timelines and development proceed concurrently rather than sequentially, and hold production go-live until the review is complete",
      "Wait until the security review is entirely finished before writing any integration code at all",
      "Launch to a small percentage of residents without waiting for the review, treating it as a limited pilot exempt from policy"
    ],
    correct: 1,
    explanation: "Running development against staging in parallel with the mandated review — rather than sequentially — compresses the overall timeline without skipping a required control, and holding production access until the review clears respects the policy's intent. Skipping the review (A) violates governance policy on resident data; waiting to start any development until the review finishes (C) unnecessarily extends the timeline when parallel work is possible; launching a 'pilot' without the review (D) is a workaround that still exposes real resident data without the required security clearance."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A large hotel chain integrates Claude with its central reservation system (CRS), a property management system (PMS) at each hotel, and a third-party channel manager that syncs availability to Expedia, Booking.com, and others. A booking made through Claude must correctly reflect across all three systems within seconds to avoid overbooking.",
    question: "What integration design best prevents overbooking across these tightly coupled systems?",
    options: [
      "Have Claude write the booking to whichever system responds first, and let the other systems catch up eventually",
      "Route bookings through the CRS as the authoritative system of record with synchronous confirmation before Claude reports success, while the CRS itself is responsible for propagating the update to the PMS and channel manager through its existing, already-reliable sync mechanisms",
      "Have Claude write the same booking independently and directly to all three systems in parallel to maximize speed",
      "Only update the channel manager, since third-party channels are the primary overbooking risk"
    ],
    correct: 1,
    explanation: "Treating the CRS as the single system of record, with Claude waiting for its authoritative confirmation before reporting success, avoids the classic distributed-write race condition that causes overbooking, and leverages sync mechanisms between CRS/PMS/channel manager that already exist and are presumably reliable rather than reinventing them in Claude's integration layer. Writing to whichever system responds first (A) creates exactly the kind of inconsistent state that causes overbooking; parallel independent writes to all three (C) is a textbook distributed-consistency anti-pattern without a single source of truth; updating only the channel manager (D) ignores that the CRS and PMS are equally capable of causing overbooking if left unsynchronized."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A media company's editorial team wants Claude to pull licensed stock photo metadata from two different third-party image libraries, each of which structures licensing/usage-rights fields completely differently — one uses a simple 'commercial/editorial' flag, the other uses a complex nested rights-matrix by region and use case.",
    question: "How should the integration reconcile these different rights models so editors get accurate, comparable licensing guidance from Claude?",
    options: [
      "Present each vendor's raw rights data to Claude exactly as returned and let it improvise a comparison across the two different structures",
      "Define a normalized internal rights schema that both vendors' data is mapped into at the integration layer, with any information that doesn't cleanly map (e.g., unsupported regions in the simpler vendor's model) explicitly flagged as unknown rather than guessed",
      "Only use the vendor with the simpler licensing model to avoid the reconciliation problem",
      "Have editors manually verify licensing for every single image regardless of what Claude reports, making the integration purely advisory with no data normalization needed"
    ],
    correct: 1,
    explanation: "A normalized rights schema with explicit 'unknown' flagging for information that doesn't map cleanly gives Claude consistent, comparable data to reason over while being honest about genuine gaps — critical for a domain (image licensing) where a wrong answer creates real legal exposure. Passing raw, differently-structured data and letting the model improvise a comparison (A) risks it inferring rights that don't actually exist; using only the simpler vendor (C) discards licensed content unnecessarily; making the integration purely advisory with no normalization (D) forfeits the efficiency the integration was built to provide while still incurring the engineering cost of connecting to both vendors."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "A team is documenting their integration architecture and needs to explain to stakeholders the difference between a batch integration and a real-time integration for a customer-data sync between Claude's supporting systems and a marketing platform.",
    question: "Which statement correctly characterizes the fundamental tradeoff between batch and real-time integration?",
    options: [
      "Batch integration always uses less total compute than real-time integration under every circumstance",
      "Batch integration trades data freshness for lower operational complexity and predictable resource usage, while real-time integration trades higher complexity and resource cost for up-to-the-moment data",
      "Real-time integration is only a marketing term and has no meaningful technical difference from batch processing",
      "Batch and real-time integration differ only in which programming language is used to implement them"
    ],
    correct: 1,
    explanation: "The core, well-established tradeoff is freshness versus complexity/cost: batch jobs are simpler to build, test, and reason about, and use resources predictably, at the cost of data being only as fresh as the last run; real-time integration delivers current data but requires more sophisticated infrastructure (streaming, event handling) and ongoing resource consumption. Claiming batch always uses less total compute (A) isn't reliably true across all workloads; dismissing real-time integration as merely a marketing term (C) is factually wrong; framing the distinction as a language choice (D) confuses implementation detail with architectural pattern."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A pharmaceutical company integrates Claude with a clinical trial data platform operated by a CRO (contract research organization) partner. The partnership agreement specifies that the CRO retains sole authority to approve any new system that reads trial data, and any unapproved integration could jeopardize FDA submission validity for the trial.",
    question: "What governance step must precede any technical integration work in this scenario?",
    options: [
      "Begin building and testing the integration against the CRO's API immediately, since technical feasibility should be validated before seeking formal approval",
      "Obtain the CRO's formal approval for the Claude integration as specified in the partnership agreement before any production data access is built or used, since unapproved access could invalidate the trial's regulatory standing",
      "Proceed without CRO approval as long as the integration only reads data and never writes to the platform",
      "Rely on the pharmaceutical company's own internal architecture review as sufficient, since it is the CRO's client and ultimately responsible for the trial"
    ],
    correct: 1,
    explanation: "When a partnership agreement explicitly reserves approval authority to the CRO and ties it to regulatory validity, obtaining that formal approval is a hard governance prerequisite, not a step that can be sequenced after technical work or substituted with the client's own internal review. Building and testing against production data before approval (A) risks doing exactly the unapproved access the agreement prohibits, even if only for testing; assuming read-only access is exempt (C) is not supported by the scenario, which says any unapproved system jeopardizes validity, not just write-access systems; relying on internal review alone (D) doesn't satisfy a contractual requirement that explicitly names the CRO as the approving party."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A logistics company's warehouse management system (WMS) integration with Claude needs to support both a real-time 'check current stock' query used by customer service and a nightly reconciliation report comparing WMS records against a separate financial system's inventory valuation.",
    question: "Should these two integration needs share the same technical implementation, and why?",
    options: [
      "Yes, both should use the identical real-time query path since consistency of implementation is more important than matching each use case's actual requirements",
      "No — the real-time stock check should be a lightweight, low-latency query against current WMS state, while the nightly reconciliation should be a separate batch process reading a consistent point-in-time snapshot from both systems, since the two use cases have fundamentally different latency, volume, and consistency needs",
      "No — the nightly reconciliation should replace the real-time check entirely to reduce the number of integrations maintained",
      "Yes, because building two separate integration paths always doubles maintenance cost with no benefit"
    ],
    correct: 1,
    explanation: "The two use cases have genuinely different requirements — a customer-facing query needs low latency on current state, while a financial reconciliation needs a consistent point-in-time snapshot across two systems and can tolerate batch timing — so separate, purpose-built implementations serve each need correctly rather than forcing one pattern to do both jobs poorly. Forcing both onto the real-time path (A) either makes reconciliation inconsistent (comparing non-simultaneous reads) or makes the customer-facing query slower than needed; replacing the real-time check with the nightly batch (C) would give customer service stale data for a moment-to-moment need; assuming two paths 'always' double cost with no benefit (D) ignores that matching implementation to requirements often reduces bugs and rework compared to one ill-fitting shared path."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A telecommunications provider is integrating Claude with a customer identity-verification vendor for SIM-swap fraud prevention. The vendor's API occasionally times out during regional network congestion, and a timeout during a real fraud check must never be silently treated as 'verification passed.'",
    question: "How should the integration layer handle a timeout from the identity-verification vendor?",
    options: [
      "Treat any timeout as an automatic pass, since blocking legitimate customers is worse for the business than an occasional fraud risk",
      "Treat a timeout as an explicit 'verification inconclusive' state distinct from both pass and fail, routing the case to a defined fallback path (such as manual review or a secondary verification method) rather than defaulting to either outcome",
      "Treat any timeout as an automatic fail, permanently blocking the customer's request with no fallback path",
      "Retry the vendor call indefinitely until a definitive answer is received, with no time limit on the customer interaction"
    ],
    correct: 1,
    explanation: "A fail-safe design distinguishes 'inconclusive' from both 'pass' and 'fail,' routing ambiguous outcomes to a defined fallback rather than silently defaulting either way — critical because defaulting to pass creates a fraud vulnerability and defaulting to fail creates unnecessary customer friction with no recourse. Auto-passing on timeout (A) creates exactly the silent fraud bypass the scenario warns against; auto-failing with no fallback (C) blocks legitimate customers with no path forward, which is also unacceptable; indefinite retries with no time limit (D) leaves the customer interaction hanging and doesn't actually solve the ambiguous-outcome problem, just delays confronting it."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A food delivery platform wants Claude to check restaurant operating hours from a third-party restaurant-data aggregator. The aggregator's data is crowdsourced and known to be wrong or outdated for roughly 8% of listings, according to the vendor's own accuracy disclosure.",
    question: "Given this known data quality limitation, what should the integration surface to end users?",
    options: [
      "Present the aggregator's hours as definitively accurate with no caveat, since 92% accuracy is generally good enough",
      "Present the hours along with an appropriately calibrated caveat (e.g., suggesting the customer confirm directly with the restaurant for time-sensitive orders) and, where feasible, cross-reference against a second, more authoritative source such as the restaurant's own confirmed profile",
      "Refuse to answer any question about restaurant hours since the data source isn't perfectly reliable",
      "Round all restaurant hours to the nearest even hour to make the uncertainty less noticeable"
    ],
    correct: 1,
    explanation: "Surfacing an appropriately calibrated caveat and cross-referencing against a better source where available gives users accurate expectations without either overstating confidence or withholding a useful feature — appropriate for a known, quantified 8% error rate. Presenting the data as definitive (A) misrepresents known reliability limitations to the user; refusing to answer entirely (C) is a disproportionate response to an 8% known error rate for a low-stakes informational query; rounding hours to obscure uncertainty (D) doesn't address the actual data quality problem and introduces new inaccuracy rather than fixing anything."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A gaming studio integrates Claude with a third-party anti-cheat vendor's API to help support agents investigate suspicious account activity. The vendor's terms explicitly prohibit sharing detection-signature details with end users, since doing so would help cheaters evade detection.",
    question: "How should this vendor constraint be enforced in the integration design?",
    options: [
      "Trust Claude's judgment not to reveal detection signatures based on general safety training, without any additional technical control",
      "Filter the anti-cheat vendor's API responses at the integration layer so detection-signature fields are stripped before the data reaches Claude's context, ensuring the information simply isn't available to be disclosed regardless of how the conversation unfolds",
      "Give support agents full raw vendor data and rely on internal training to ensure they don't share it with players",
      "Stop using the anti-cheat vendor's API in the support workflow entirely to avoid any disclosure risk"
    ],
    correct: 1,
    explanation: "Stripping restricted fields at the integration layer before they ever enter Claude's context is a structural control that guarantees the information cannot be disclosed in conversation, regardless of how a player might try to elicit it — stronger than relying on the model's general judgment alone. Trusting model behavior without a technical control (A) is a weaker safeguard for a contractually binding vendor restriction with real security consequences; giving agents raw data and relying on training alone (C) still risks accidental disclosure and doesn't constrain what Claude itself could surface; abandoning the API integration entirely (D) discards its value for support investigations when a straightforward field-level filter solves the actual problem."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A cross-border payments company integrates Claude with correspondent banking partners in six countries, each requiring different message formats (some ISO 20022, some legacy SWIFT MT, some proprietary). Leadership wants to add a seventh country's partner next quarter, and the current codebase has custom transformation logic hardcoded per-partner with significant duplicated code.",
    question: "What architectural change would most improve the integration's ability to scale to additional partners over time?",
    options: [
      "Continue writing a new hardcoded transformation module for each new partner, since the current approach has worked for six partners already",
      "Introduce a canonical internal message format with pluggable, per-standard transformation adapters (ISO 20022, SWIFT MT, proprietary) that convert to and from the canonical format, so adding a new partner requires only a new adapter rather than partner-specific logic scattered throughout the system",
      "Require all seven partners to adopt ISO 20022 before any integration work begins, regardless of what their systems currently support",
      "Merge all six existing partner integrations into a single shared code module with conditional branches for each partner's format, without introducing any canonical intermediate representation"
    ],
    correct: 1,
    explanation: "A canonical internal format with pluggable per-standard adapters is the standard architecture for scaling multi-format partner integrations: each new partner needs only a new adapter to/from the canonical format rather than bespoke end-to-end logic, and existing adapters remain isolated from each other's changes. Continuing the hardcoded, duplicated approach (A) is exactly the pattern generating the current technical debt and will worsen with each new partner; mandating ISO 20022 for all partners (C) is outside the integration team's control since partner banks' systems and standards aren't something this team can unilaterally dictate; merging into one module with per-partner conditionals but no canonical format (D) reduces file count but keeps the same tangled, hard-to-extend logic in a single place, which is arguably worse for maintainability."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A fitness app company integrates Claude with a wearable-device vendor's API to answer user questions about their workout data. The vendor recently announced they will deprecate their current API version in six months, with a new version requiring different authentication and data structures.",
    question: "What is the appropriate response to this advance deprecation notice?",
    options: [
      "Wait until the deprecation date arrives and address the break at that point, since six months is a long time away",
      "Begin planning and scheduling the migration to the new API version well before the deprecation date, using the advance notice to test the new version in parallel and cut over with time to spare",
      "Immediately migrate to the new API version with no testing, to get ahead of the deadline as fast as possible",
      "Contact the vendor to demand they cancel the deprecation and continue supporting the old version indefinitely"
    ],
    correct: 1,
    explanation: "Advance deprecation notice exists precisely so teams can plan and test a migration on their own timeline rather than reacting under deadline pressure; using the six months to test the new version in parallel and cut over with margin is the responsible approach. Waiting until the deadline (A) squanders the advance notice and risks a rushed, error-prone migration under time pressure; migrating immediately with no testing (C) trades one risk (missing the deadline) for another (shipping bugs from an untested integration); demanding the vendor reverse its deprecation (D) is not a plan the team controls and shouldn't be the primary mitigation strategy."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A regional grocery chain integrates Claude with a loyalty-points platform operated by a marketing agency partner. The agency's system authenticates using a shared API key embedded in a config file that several other agency clients also reportedly use for their own integrations, according to comments found in the agency's own sample code.",
    question: "What is the most appropriate response to discovering this shared-credential pattern?",
    options: [
      "Continue using the shared API key as provided, since it's the agency's system and their design choice to make",
      "Raise the shared-credential pattern as a security concern with the agency and request a dedicated, scoped credential for this integration, since a shared key across multiple clients means one client's key compromise or misuse could affect all of them and makes it impossible to audit or revoke access per client",
      "Stop using the loyalty-points platform entirely without raising the issue with the agency first",
      "Generate a second API key independently without informing the agency, to avoid using the shared one"
    ],
    correct: 1,
    explanation: "A shared credential across multiple unrelated clients is a genuine security and governance problem — it removes the ability to audit which client made which call, prevents scoped revocation if one client is compromised, and violates least-privilege principles — so raising it and requesting a dedicated scoped credential is the correct next step. Accepting the shared key without objection (A) accepts an avoidable security risk; abandoning the integration without raising the issue (C) forfeits a fixable partnership over a solvable problem; generating a second key independently without informing the agency (D) is not something the integrating company can typically even do unilaterally on the agency's system, and attempting to would likely violate the partnership agreement."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An online education platform wants Claude to sync enrollment status between its own LMS and a third-party proctoring service for exams. The proctoring vendor's API is eventually consistent, meaning a status update can take up to two minutes to be reflected when queried immediately after being written.",
    question: "How should the integration account for this eventual-consistency behavior to avoid giving students incorrect exam-eligibility information?",
    options: [
      "Treat the proctoring API's response as immediately authoritative at all times, with no allowance for propagation delay",
      "Design the integration to account for the propagation window — for example, by having the LMS pass its own just-written enrollment status alongside the query, or by adding a brief buffer before treating a 'not yet reflected' response as authoritative — rather than assuming the vendor's response is always instantly current",
      "Poll the proctoring API continuously in a tight loop until the expected status appears, regardless of the vendor's rate limits",
      "Avoid syncing enrollment status with the proctoring service at all and have students manually confirm their status with support before every exam"
    ],
    correct: 1,
    explanation: "Explicitly designing for the documented propagation delay — by supplementing the query with locally known just-written state or tolerating a brief buffer — avoids the specific failure mode of telling a student they're ineligible when the status update simply hasn't propagated yet. Treating the response as always instantly authoritative (A) ignores the documented eventual-consistency behavior and will produce exactly the wrong-information problem described; tight-loop polling with no regard for rate limits (C) risks throttling or vendor account issues while still not solving the fundamental timing problem elegantly; requiring manual support confirmation before every exam (D) doesn't scale and defeats the purpose of automating the sync."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A global apparel retailer's integration roadmap calls for connecting Claude to twelve different regional ERP systems, each run by a different regional IT team with its own priorities, release schedules, and risk tolerance. Central architecture wants a consistent integration pattern; the regional teams want autonomy to move at their own pace.",
    question: "What integration governance model best balances central consistency with regional autonomy in this situation?",
    options: [
      "Central architecture mandates an identical implementation timeline and technical approach for all twelve regions with no flexibility",
      "Central architecture defines a shared contract/interface standard (data format, security requirements, adapter pattern) that all regions must conform to, while leaving each region free to choose its own implementation timeline and internal integration details within that standard",
      "Each regional team designs its own completely independent standard with no coordination, since local autonomy is the priority",
      "Central architecture builds and operates all twelve integrations directly, bypassing regional IT teams entirely"
    ],
    correct: 1,
    explanation: "Defining a shared contract (interoperability standard: data format, security baseline, adapter pattern) while leaving implementation timeline and internal details to each region is the standard federated-governance model — it achieves the consistency central architecture needs for a coherent overall system while respecting the regional autonomy the teams need to manage their own risk and pace. A single mandated timeline for all twelve regions (A) ignores that regions have genuinely different constraints and risk tolerance, which was explicitly stated as a real concern; fully independent standards per region with no coordination (C) recreates the exact integration sprawl and inconsistency central architecture is trying to avoid; central architecture building and operating everything directly (D) removes regional autonomy entirely and doesn't scale given twelve different regional systems and contexts central architecture likely doesn't have deep visibility into."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A property insurance company integrates Claude with a satellite/aerial imagery vendor to assess roof damage claims. The vendor's terms of service state imagery may be up to 18 months old in rural areas due to infrequent satellite passes, though the vendor's marketing materials describe the service as 'real-time property intelligence.'",
    question: "How should the integration and any resulting claims guidance address this gap between the vendor's marketing claims and its actual documented terms?",
    options: [
      "Trust the vendor's marketing description and present imagery-based assessments to adjusters as current, since that's how the product is advertised",
      "Build the integration around the vendor's actual contractual terms rather than its marketing language, surfacing imagery age/timestamp explicitly to adjusters so a claim isn't assessed using imagery that may substantially predate recent storm damage",
      "Refuse to use the vendor at all because of the discrepancy between marketing and terms of service",
      "Average the vendor's imagery with a generic assumed age to produce a single 'confidence-adjusted' damage estimate"
    ],
    correct: 1,
    explanation: "Contractual terms of service, not marketing copy, define the actual guarantees of a data source, and for a claims process where imagery could be up to 18 months stale, surfacing the actual timestamp to adjusters prevents a serious misassessment (e.g., attributing pre-existing damage or missing recent storm damage). Trusting the marketing description over the documented terms (A) risks exactly this kind of misassessment and is not a defensible basis for an insurance decision; refusing to use the vendor entirely (C) is an overreaction when the real fix is transparent timestamping, and the imagery still has value when its age is known; averaging in a fabricated 'confidence-adjusted' estimate (D) manufactures false precision rather than giving adjusters the actual, verifiable timestamp they need to make a sound judgment."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A small nonprofit with limited engineering staff wants to integrate Claude with Mailchimp for donor communications. They are choosing between using Mailchimp's official, actively maintained API client library versus a community-built alternative that offers a few extra convenience features but was last updated three years ago.",
    question: "Given the nonprofit's limited engineering capacity, which choice is more appropriate and why?",
    options: [
      "The community-built alternative, because the extra convenience features will save development time now",
      "The official, actively maintained client library, because ongoing vendor API changes are more likely to be reflected in it, reducing the long-term maintenance burden on a team with limited capacity to debug an unmaintained dependency",
      "Neither — the nonprofit should write its own client from scratch to avoid any third-party dependency risk",
      "It doesn't matter which is chosen, since both ultimately call the same underlying Mailchimp API"
    ],
    correct: 1,
    explanation: "For a team with limited engineering capacity, minimizing long-term maintenance burden matters more than short-term convenience features — an actively maintained official library is far more likely to track API changes and get security fixes, reducing the odds of the nonprofit being stuck debugging a stale, unsupported dependency. The community alternative's extra convenience features (A) don't offset the real risk of relying on unmaintained code for years; building a client from scratch (C) is the highest-effort option and directly conflicts with the stated constraint of limited engineering staff; assuming it doesn't matter because both call the same API (D) ignores that client library quality, error handling, and maintenance status materially affect how much ongoing engineering effort is required."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A ride-sharing company wants Claude to help support agents resolve driver payout disputes by pulling data from an internal trip-ledger service and a third-party payment-processor. The trip-ledger service was recently migrated to a new schema, but the payment-processor's webhook payloads still reference trip IDs in the old schema's format for several more months per the processor's own migration timeline.",
    question: "What is the best way to handle this temporary schema mismatch between the two systems during their overlapping migration windows?",
    options: [
      "Force the payment processor to immediately adopt the new schema to eliminate the mismatch",
      "Add a translation/mapping layer in the integration that converts between old-format and new-format trip IDs during the overlap period, with a plan to remove the mapping layer once the payment processor completes its own migration",
      "Ignore trip records where the ID formats don't match until both systems are fully migrated",
      "Roll back the trip-ledger service to its old schema until the payment processor also migrates"
    ],
    correct: 1,
    explanation: "A temporary translation layer that bridges the two systems' differing timelines is the standard way to handle a known, time-bound schema mismatch during a migration overlap — it keeps both systems functional together without forcing either team onto the other's timeline. Forcing the payment processor to migrate immediately (A) is outside the company's control since it's the processor's own migration schedule; ignoring mismatched records (C) means support agents can't resolve disputes for those trips during the entire overlap window, which could be months; rolling back the trip-ledger's schema (D) undoes completed migration work and only delays the same problem rather than solving it."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A commercial real estate firm integrates Claude with a due-diligence document vault used during property transactions. Different deals use different third-party vault vendors depending on which law firm structures the deal, and the firm's own team has no influence over which vendor is chosen for any given deal.",
    question: "Given that the vendor varies per deal and is outside the firm's control, what integration architecture best supports this variability?",
    options: [
      "Build a deep, vendor-specific integration for whichever vault vendor is currently most common, and treat other vendors as unsupported",
      "Design a vendor-agnostic integration interface with pluggable connectors for each vault vendor encountered, so adding support for a new vendor on a future deal requires implementing one new connector against a stable internal interface rather than restructuring the whole integration",
      "Require every law firm to standardize on a single vault vendor before the firm will use Claude on their deals",
      "Avoid integrating with deal vaults entirely and have staff manually download and upload documents for every deal"
    ],
    correct: 1,
    explanation: "A pluggable connector architecture against a stable internal interface directly matches the situation described — vendor choice genuinely varies and is outside the firm's control, so the integration needs to be designed for extensibility from the start rather than assuming one dominant vendor. Deep-coupling to the currently most common vendor (A) leaves the firm unable to support deals using other vendors, which the scenario says happens regularly; demanding law firms standardize on one vendor (B... C) isn't within this firm's authority to impose on outside counsel; avoiding vault integration entirely (D) sacrifices real efficiency gains over a solvable architecture problem."
  },
  {
    domain: 3,
    difficulty: 5,
    scenario: "A national health insurer is integrating Claude across four legacy systems acquired through three separate mergers over the past decade, each with overlapping member ID schemes that were never reconciled — the same physical member can have three different, non-unique member IDs across the systems, and in a small number of cases two different actual people share what looks like the same ID string across systems.",
    question: "What must be resolved before any of these four systems can be safely integrated for a Claude-based assistant handling member-specific queries?",
    options: [
      "Proceed with integration and have Claude use whatever member ID the user provides, resolving ambiguity through conversational context alone",
      "Establish a reliable, verified cross-system identity resolution and matching process (a golden-record or master data management layer) before exposing any member-specific data through the assistant, since colliding IDs create a real risk of returning one member's data in response to another member's query",
      "Pick the newest of the three acquired systems as the sole source of truth and ignore the other two entirely",
      "Add a disclaimer to the assistant's responses noting that member data may belong to a different person, and proceed with integration as-is"
    ],
    correct: 1,
    explanation: "When identifiers are documented to collide across systems — including cases where the same ID string represents two different actual people — this is a data integrity problem that must be resolved with reliable identity matching (a master data management or golden-record layer) before any member-specific integration goes live, because the failure mode is disclosing one person's protected health information to another person querying under a colliding ID. Relying on conversational context to disambiguate (A) is not a reliable technical control for a data integrity problem with real privacy and regulatory consequences; picking one system as sole source of truth (C) discards data and functionality from the other two systems and doesn't actually resolve the underlying ID collisions for the system that remains; adding a disclaimer while proceeding as-is (D) does nothing to prevent the actual privacy breach and is not an acceptable substitute for fixing the identity resolution problem in a healthcare context."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A B2B software company's customers integrate their own instance of Claude-based support with the company's product via a documented public API. One enterprise customer requests a private, non-public API endpoint with extended capabilities not offered to other customers, citing their specific workflow needs.",
    question: "What is the most sound way to evaluate and, if appropriate, accommodate this custom-integration request?",
    options: [
      "Automatically decline, since public APIs should never have customer-specific variants under any circumstances",
      "Automatically grant the exact custom endpoint requested, since the customer knows their own workflow needs best and retaining a large account is a priority",
      "Evaluate whether the underlying need can be met through configuration of the existing public API or a generally available feature, and if a genuinely custom endpoint is still warranted, design it with the same security, versioning, and support rigor as public APIs — treating it as a governed extension rather than an ungoverned one-off",
      "Grant temporary undocumented access with no formal support commitment, to satisfy the request quickly without going through the normal governance process"
    ],
    correct: 2,
    explanation: "The sound approach first checks whether the existing public surface (possibly with configuration) already meets the need, and if a custom endpoint is genuinely warranted, holds it to the same security, versioning, and support standards as any other API — avoiding an ungoverned one-off that becomes a maintenance and security liability. Automatically declining all custom variants (A) is unnecessarily rigid when a legitimate need might exist; automatically granting exactly what's requested without evaluation (B) risks building unnecessary bespoke surface area without checking if existing capabilities suffice; granting undocumented, unsupported access to move fast (D) creates an ungoverned integration precisely of the kind that becomes technical debt and a security blind spot later."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A retail chain's loss-prevention team wants Claude to cross-reference point-of-sale transaction data with a third-party facial-recognition vendor used at store entrances to flag repeat shoplifting suspects. Several states where the chain operates have laws restricting or banning biometric data use for this purpose.",
    question: "What should the integration team do given this legal landscape?",
    options: [
      "Build a single nationwide integration that always includes the facial-recognition cross-reference, applying it uniformly regardless of store location",
      "Design the integration to be geographically configurable, enabling the facial-recognition cross-reference only in jurisdictions where it is legally permitted, with the feature off by default in restricted or ambiguous jurisdictions pending legal confirmation",
      "Enable the feature everywhere since enforcement of state biometric laws is inconsistent",
      "Cancel the entire loss-prevention integration project, including unrelated non-biometric features, due to the legal complexity in some states"
    ],
    correct: 1,
    explanation: "Given that legality varies by jurisdiction, a geographically configurable integration — defaulting to off where law is restrictive or unclear — lets the organization operate compliantly everywhere without either breaking the law in restricted states or abandoning the capability entirely where it's legal. A single always-on nationwide integration (A) would violate law in states with biometric restrictions; relying on inconsistent enforcement as a justification (C) is not a defensible compliance posture and exposes the company to real legal risk; canceling the entire project including unrelated features (D) is a disproportionate response when the actual legal issue is specific to the biometric cross-reference component."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A construction firm wants Claude to pull project schedule data from a widely used project-management SaaS tool and equipment-location data from a GPS-tracking vendor, combining both to flag scheduling conflicts. Both vendors offer webhooks, but the project-management tool's webhooks fire on every minor field edit, generating far more events than are actually useful for this use case.",
    question: "How should the integration handle the high-volume, low-relevance webhook stream from the project-management tool?",
    options: [
      "Process every webhook event exactly as it arrives, treating all field edits as equally significant to scheduling-conflict detection",
      "Filter incoming webhook events at the integration layer to act only on the specific field changes relevant to scheduling (e.g., start/end dates, task dependencies), discarding or lightly logging the rest to avoid unnecessary processing and noise",
      "Disable webhooks entirely and switch to manual refresh only, since the volume is inconvenient",
      "Request that the vendor stop sending webhooks for minor edits, and pause the integration until they agree"
    ],
    correct: 1,
    explanation: "Filtering at the integration layer to act only on scheduling-relevant fields is the direct fix for a high-volume, low-relevance event stream — it keeps the useful real-time signal (schedule and dependency changes) while discarding the noise that isn't relevant to the conflict-detection use case. Processing every event as equally significant (A) wastes processing capacity and could bury genuinely important changes in noise; disabling webhooks for manual refresh only (C) sacrifices the real-time benefit entirely over a filtering problem that has a straightforward solution; waiting on the vendor to change their webhook granularity (D) cedes control to a third party for a problem the integration team can solve on its own side."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A defense contractor is integrating Claude with an internal engineering-documents system. Some documents are export-controlled under ITAR and must never be accessible to non-U.S.-persons, including via an AI assistant's responses. The company's Claude deployment is used by a global engineering team, including non-U.S. persons.",
    question: "What integration design correctly prevents ITAR-controlled content from reaching non-U.S.-person users through the assistant?",
    options: [
      "Rely on a system-prompt instruction telling Claude not to share export-controlled information with non-U.S.-persons",
      "Enforce access control at the data layer: tag documents with export-control status, verify each user's citizenship/export-control status against the existing enterprise identity system, and filter which documents are ever retrievable into Claude's context based on the verified requester's status — before generation, not through instruction alone",
      "Give all engineering team members, regardless of citizenship status, equal access to simplify the integration and rely on employee honor-system compliance",
      "Restrict the assistant to U.S.-based data centers only, treating data residency as equivalent to export-control compliance"
    ],
    correct: 1,
    explanation: "ITAR compliance requires a hard access-control boundary enforced before controlled content ever reaches the model or the user — tagging documents, verifying requester status against an authoritative identity system, and filtering retrieval accordingly — because this is a legal requirement with serious civil and criminal penalties that cannot depend on the model choosing to follow an instruction. A system-prompt instruction alone (A) is not a reliable technical control for a federal export-control regulation; equal access with honor-system compliance (C) directly creates the unauthorized-disclosure risk ITAR exists to prevent; equating data-residency with export-control compliance (D) confuses two different legal concepts — ITAR restricts access based on the person's citizenship/status, not merely where the server is physically located."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A dental clinic chain wants Claude integrated with its practice-management software to help front-desk staff answer basic scheduling questions. The vendor offers an API but charges per-call fees that would make constant real-time polling for schedule changes prohibitively expensive at the chain's scale.",
    question: "What is a cost-effective integration pattern given the per-call pricing constraint?",
    options: [
      "Poll the API continuously for schedule changes regardless of the per-call cost, treating cost as a secondary concern to data freshness",
      "Use the vendor's webhook or change-notification feature if available to receive updates only when something actually changes, falling back to periodic (not continuous) polling at a sensible interval if webhooks aren't supported",
      "Never call the API at all and have staff manually check the practice-management software directly instead of through Claude",
      "Call the API once when the system is first set up and never again afterward"
    ],
    correct: 1,
    explanation: "Event-driven updates (webhooks) or a sensibly-spaced polling interval directly address per-call cost by only consuming API calls when there's actually new information, rather than paying for constant polling regardless of whether anything changed. Continuous polling regardless of cost (A) directly contradicts the stated cost constraint; avoiding the integration entirely (C) forfeits the efficiency benefit for front-desk staff; calling the API only once at setup (D) means the data becomes stale immediately and defeats the purpose of a live scheduling integration."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "An electric utility's outage-management system needs to integrate with Claude to help call-center agents give customers accurate outage restoration estimates. The outage system itself sources its estimates from a decades-old grid topology model that is known to be inaccurate for roughly 15% of rural service areas due to undocumented line reroutes over the years.",
    question: "How should the integration and resulting customer communication account for this known accuracy limitation in specific areas?",
    options: [
      "Present all restoration estimates with equal confidence regardless of location, since the outage system is the authoritative source",
      "Where the integration can identify that a customer's service area falls within the known lower-accuracy rural zones, have Claude communicate restoration estimates with appropriately adjusted confidence language, rather than presenting a precise time with the same certainty used for well-modeled areas",
      "Withhold all restoration estimates for every customer, urban and rural alike, until the grid topology model is fully corrected",
      "Round every restoration estimate to the same generic 'within 24 hours' regardless of what the system actually calculates"
    ],
    correct: 1,
    explanation: "Calibrating the confidence of communicated estimates to the known accuracy of the underlying model for a given area — rather than presenting uniform certainty everywhere — gives customers in the less-reliable rural zones appropriately hedged expectations without discarding the estimate's real value in well-modeled areas. Presenting uniform confidence everywhere (A) misrepresents a known, documented accuracy gap specific to rural areas; withholding all estimates everywhere (C) is a disproportionate response that punishes the 85% of accurately-modeled areas for a problem specific to a known subset; flattening every estimate to a generic time window (D) discards genuinely useful, more precise information for the majority of well-modeled service areas."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A wholesale distributor integrates Claude with an EDI (Electronic Data Interchange) system used by its largest retail partners for purchase orders. EDI transactions use rigid, decades-old X12 formats that retail partners will not change, and any malformed EDI response sent back could result in automatic contract penalties per the partner agreements.",
    question: "What integration safeguard is most important given the financial penalty risk for malformed EDI responses?",
    options: [
      "Have Claude directly generate the outbound EDI X12 messages in free-form text based on its understanding of the format",
      "Generate outbound EDI messages through a dedicated, schema-validating EDI translation layer that enforces strict X12 compliance before transmission, with Claude supplying the business data/decision but never directly authoring the wire-format message itself",
      "Send EDI responses without validation to keep latency low, and address penalty disputes reactively if they occur",
      "Ask retail partners to relax their X12 format requirements to reduce the risk of malformed messages"
    ],
    correct: 1,
    explanation: "A dedicated, schema-validating EDI translation layer that enforces strict format compliance before transmission is the correct control for a rigid, penalty-bearing format — it separates the business decision (which Claude can inform) from the mechanical, standards-compliant message construction, which benefits from deterministic validation rather than model generation. Having Claude directly author free-form EDI messages (A) risks format errors precisely because natural-language generation isn't a reliable substitute for schema validation on a rigid legacy standard; skipping validation to save latency (C) directly exposes the company to the stated contract penalties; asking large retail partners to relax their EDI requirements (D) is unrealistic leverage for a wholesale distributor and not a technical fix within the team's control."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A video game publisher integrates Claude with a third-party analytics platform to summarize player engagement trends for the product team. The analytics platform's dashboard shows real-time numbers, but its underlying export API that Claude would query is documented as refreshing only once every four hours.",
    question: "What should the integration ensure Claude communicates to avoid misleading the product team?",
    options: [
      "Nothing extra is needed — since the dashboard shows real-time numbers, the API data can be presented the same way",
      "The integration should surface the data's actual as-of timestamp from the API (reflecting the four-hour refresh cycle) alongside any summary, so the product team understands the data may be up to four hours old rather than assuming it matches the real-time dashboard",
      "Claude should extrapolate current numbers from the four-hour-old data using a trend projection, and present the projection as the current figure",
      "The integration should refuse to summarize analytics data at all since the API isn't truly real-time"
    ],
    correct: 1,
    explanation: "Surfacing the actual as-of timestamp from the API being used gives the product team an accurate understanding of data freshness, preventing them from assuming API-sourced summaries match the dashboard's real-time view when they're actually up to four hours stale. Presenting it identically to real-time data (A) creates a misleading impression given the documented refresh lag; extrapolating a projected 'current' figure and presenting it as fact (C) fabricates precision the data doesn't support and could mislead decision-making more than honestly-labeled stale data would; refusing to summarize entirely (D) is a disproportionate response when transparent timestamping solves the actual problem."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A multinational bank's fraud operations team wants a Claude-based assistant integrated with transaction-monitoring systems across its US, EU, and Singapore entities. The EU entity operates under GDPR, which grants data subjects rights (like erasure) that may conflict with fraud-monitoring data retention requirements the US entity operates under.",
    question: "How should the integration architecture handle this conflict between data subject rights and fraud-monitoring retention needs across jurisdictions?",
    options: [
      "Apply the least restrictive of the two regimes globally, using US retention rules everywhere to simplify the architecture",
      "Apply the most restrictive of the two regimes globally, using GDPR erasure rules for all entities including the US, to avoid maintaining jurisdiction-specific logic",
      "Design the integration with jurisdiction-aware data handling, applying each region's actual legal requirements (including GDPR's specific exemptions for fraud prevention and legal-obligation retention where applicable) rather than picking one regime for all regions or assuming a blanket conflict exists",
      "Disable the fraud-monitoring integration for the EU entity entirely to avoid dealing with GDPR"
    ],
    correct: 2,
    explanation: "The correct approach is jurisdiction-aware handling that applies each region's actual legal framework — notably, GDPR itself contains specific exemptions and legal bases (such as legal obligation and legitimate interest for fraud prevention) that often permit necessary fraud-related retention, so the conflict is frequently narrower than assumed and requires careful legal analysis rather than a blanket global rule. Applying US rules globally (A) would violate GDPR requirements the EU entity is actually subject to; applying GDPR erasure rules globally including to the US entity (B) would likely violate US retention obligations the US entity is subject to and isn't necessary given GDPR's own fraud-related exemptions; disabling the integration for the EU entity entirely (D) is an overreaction that discards the capability where a compliant, jurisdiction-aware design is achievable."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A parcel delivery company's Claude-based dispatcher assistant needs live GPS location from delivery trucks (via a fleet-telematics vendor) and traffic conditions (via a separate mapping vendor) to suggest route adjustments. Both vendors occasionally have brief outages, but they are rarely down at the same time.",
    question: "How should the integration be designed to remain useful when only one of the two vendors is experiencing an outage?",
    options: [
      "Design the assistant so it requires both data sources to be available simultaneously, refusing to provide any route guidance if either one is down",
      "Design the assistant to degrade gracefully — continuing to provide useful guidance from whichever data source is available (e.g., traffic-based suggestions without live GPS, or GPS-based suggestions without live traffic) while clearly indicating which data is currently unavailable",
      "Cache a single day's worth of both data sources and always assume they are accurate, regardless of vendor status",
      "Switch dispatchers to a fully manual process the moment either vendor reports any issue, even a brief one"
    ],
    correct: 1,
    explanation: "Graceful degradation — using whichever source is available and clearly flagging what's missing — maximizes usefulness during the described scenario where outages are typically independent and brief, rather than making the whole system's availability the minimum of two independently unreliable dependencies. Requiring both sources simultaneously (A) creates unnecessary full outages whenever just one vendor has a brief issue, which the scenario says happens somewhat regularly; caching stale data and presenting it as current regardless of vendor status (C) risks giving dispatchers actively wrong information during real vendor outages; switching to a fully manual process for any brief issue (D) is a disproportionate response when partial automation from the healthy source remains valuable."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A staffing agency integrates Claude with a background-check vendor's API to help recruiters interpret results. The vendor's API returns a raw pass/fail flag plus free-text notes, but the notes field sometimes contains information about arrests without conviction, which several state 'ban the box' and fair-chance hiring laws restrict how and when employers may consider.",
    question: "What should the integration do with the notes field content given these legal restrictions?",
    options: [
      "Pass the notes field to Claude unfiltered and rely on it to independently decide what's legally permissible to surface to the recruiter, in every jurisdiction",
      "Apply jurisdiction-aware filtering at the integration layer to withhold legally restricted categories of information (such as non-conviction arrest records, depending on the applicable state law and timing in the hiring process) before the notes ever reach Claude or the recruiter",
      "Pass the full notes field to recruiters in all states, since the vendor's API already returned the information so it must be legally usable",
      "Remove the notes field entirely from all recruiter-facing output nationwide, regardless of what any given state's law actually permits"
    ],
    correct: 1,
    explanation: "Jurisdiction-aware filtering at the integration layer — informed by which specific state's fair-chance law applies and at what stage of hiring — correctly handles a legal restriction that varies by location and context, which is exactly the kind of nuanced, location-dependent compliance logic that belongs in deterministic integration code rather than model judgment alone. Passing the raw notes field and relying on the model to independently apply the correct law for every jurisdiction (A) is an unreliable compliance control for a legally consequential, jurisdiction-varying restriction; assuming vendor-returned data is automatically legally usable (C) confuses what a vendor can technically return with what employment law actually permits an employer to consider; blanket removal everywhere regardless of actual applicable law (D) may unnecessarily withhold legally usable information in states without such restrictions, reducing the tool's value where it isn't legally required."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A boutique hotel booking startup is deciding how to integrate Claude with a payment gateway. One option processes payments through the startup's own servers, requiring them to handle raw card data directly; another uses the gateway's hosted, PCI-compliant tokenization flow where card data never touches the startup's servers.",
    question: "From an integration risk-management perspective, which option should the startup prefer, and why?",
    options: [
      "Handle raw card data directly, since it gives the most control over the payment experience",
      "Use the gateway's hosted tokenization flow, since it keeps raw card data out of the startup's own systems entirely, substantially reducing PCI-DSS compliance scope and the security risk of a data breach involving payment card data",
      "It doesn't matter which is chosen, since both are ultimately processed by the same underlying payment network",
      "Handle raw card data directly but encrypt it before storage, treating encryption as equivalent to not touching the data at all"
    ],
    correct: 1,
    explanation: "Using the gateway's hosted tokenization flow keeps sensitive card data out of the startup's own systems entirely, which meaningfully reduces both PCI-DSS compliance scope and the blast radius of any potential breach — a well-established best practice for a small startup without a large dedicated security team. Handling raw card data directly for more control (A) significantly expands compliance obligations and breach risk for benefits that are usually marginal for a booking startup; assuming it doesn't matter because the same network processes it eventually (C) ignores that where and how card data is handled before reaching the network is exactly what determines compliance scope and breach risk; treating in-house encryption as equivalent to never handling the data at all (D) still leaves the startup in PCI scope for how it collects, transmits, and manages encryption keys for that data, which is a materially different risk profile than not touching it at all."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A television network integrates Claude with an ad-sales inventory system and a separate third-party audience-measurement (Nielsen-like) data provider to help ad-sales reps generate pitch decks. The audience-measurement vendor's contract restricts redistribution of raw ratings data outside the network's organization, including to external ad agencies the sales reps work with.",
    question: "How should the integration ensure ad-sales reps don't inadvertently violate this redistribution restriction when using Claude to build external-facing pitch materials?",
    options: [
      "Give Claude unrestricted access to raw ratings data and trust reps to manually strip out anything before sending materials externally",
      "Design the integration so Claude can use raw ratings data internally for analysis, but any output intended for external agency-facing materials is generated from pre-approved, aggregated, or licensed-for-external-use derivatives of the data rather than the raw feed, with the distinction enforced structurally rather than left to the rep's judgment",
      "Prohibit ad-sales reps from using Claude with any audience-measurement data at all, internal or external",
      "Allow full raw data in all pitch materials since ad agencies are considered part of the network's extended sales process"
    ],
    correct: 1,
    explanation: "Structurally separating internal-use raw data from externally-shareable, licensed-for-that-purpose derivatives — rather than relying on a rep to remember and correctly apply the redistribution restriction every time — is a more reliable control for a contractual data-use restriction with real commercial consequences if violated. Giving unrestricted raw access and trusting manual diligence (A) is exactly the kind of human-judgment-dependent control likely to fail under sales pressure and deadlines; banning all use of the data, even internally (C) is a disproportionate response that discards legitimate internal value; treating ad agencies as covered by internal use (D) directly contradicts the stated contractual restriction on redistribution outside the network's organization."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A regional airport authority wants Claude integrated with air traffic scheduling data from the FAA, ground operations data from its own systems, and gate-assignment data from individual airlines' separate systems — each airline maintains its own gate-assignment system with no standard interface.",
    question: "Given that each airline's gate-assignment system is genuinely different with no shared standard, what integration strategy is most practical?",
    options: [
      "Wait for all airlines to agree on and adopt a single shared gate-assignment data standard before building any integration",
      "Build individual, purpose-specific adapters for each airline's system as they're onboarded, behind a common internal interface, prioritizing airlines by operational volume or business value rather than attempting a single simultaneous integration with every airline",
      "Integrate only with the FAA and ground operations data, and exclude gate-assignment entirely since airline systems are too heterogeneous",
      "Require every airline to grant the airport authority direct database access to bypass building any adapters"
    ],
    correct: 1,
    explanation: "Prioritized, incremental adapter development behind a common internal interface is the practical response to genuine heterogeneity with no shared standard — it delivers value with the highest-priority airlines first rather than blocking on industry-wide standardization the airport authority doesn't control. Waiting for a shared standard across all airlines (A) is not within the airport authority's control and could delay the project indefinitely; excluding gate-assignment data entirely (C) discards a valuable and directly relevant data source over a solvable heterogeneity problem; demanding direct database access from every airline (D) is unrealistic given airlines' own security and operational boundaries, and isn't something an airport authority can typically require."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A biotech company integrates Claude with a laboratory information management system (LIMS) to help scientists query experiment results. The LIMS vendor is being acquired by a competitor, and the acquiring company has stated intent to sunset the current LIMS product within 18 months in favor of their own platform, which uses an entirely different data model.",
    question: "Given this announced but not-yet-executed sunset, what should the integration architecture prioritize now?",
    options: [
      "Continue building tightly coupled, LIMS-specific logic throughout the Claude integration, since the sunset is still 18 months away and not yet in effect",
      "Introduce an abstraction layer between Claude's tool interface and the LIMS-specific data model now, so that when migration to the new platform eventually happens, only the abstraction layer's implementation needs to change rather than logic scattered throughout the integration",
      "Immediately migrate to the acquiring company's new platform before it has even been finalized or made available, to get ahead of the sunset",
      "Stop all integration work with the LIMS entirely until the acquiring company clarifies its exact migration plan"
    ],
    correct: 1,
    explanation: "Introducing an abstraction layer now, ahead of the announced sunset, is a proactive way to limit future migration cost and risk — when the new platform eventually becomes available, only the abstraction's implementation needs to change rather than logic scattered across the whole integration. Continuing to build tightly coupled LIMS-specific logic (A) ignores a credible, announced future migration need and increases the eventual rework; migrating immediately to a platform that isn't yet finalized or available (C) isn't feasible and could mean building against a moving target; halting all integration work for 18 months (D) sacrifices a year and a half of scientist productivity over an architecture decision that can be addressed proactively instead."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A community credit union wants Claude integrated with a core banking platform used by many small financial institutions. The vendor offers a certified 'partner integration' program with security review, support SLAs, and a dedicated sandbox, versus building against the same APIs without going through the formal partner program.",
    question: "What is the primary advantage of going through the vendor's formal partner integration program for this use case?",
    options: [
      "It guarantees the integration will require less custom development work than an unofficial approach",
      "It provides structured support SLAs, a security review process, and a dedicated sandbox — governance and reliability benefits that matter for an integration touching core banking data, beyond what an informal, unsanctioned approach to the same APIs would provide",
      "It is required by federal law for any fintech integration with a core banking platform, with no exceptions",
      "It guarantees the vendor will never make breaking API changes for partner-program integrators"
    ],
    correct: 1,
    explanation: "For an integration touching core banking data, the formal partner program's structured support, security review, and dedicated sandbox provide real governance and reliability value that an unofficial approach to the same underlying APIs wouldn't offer, even if the technical API surface is similar. Claiming it guarantees less development work (A) overstates the benefit — the program provides support and governance structure, not necessarily less code to write; asserting it's a blanket federal legal requirement (C) isn't accurate as a general claim and shouldn't be presented as fact without verification; guaranteeing no breaking changes ever (D) overstates what any partner program typically promises, since most vendors still version and eventually deprecate APIs even for certified partners."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A regional airline's Claude-based assistant needs to check seat availability by calling the airline's own reservation system, which experiences predictable heavy load every day between 6-8 AM local time as connecting itineraries are recalculated overnight and results post in the morning.",
    question: "How should the integration be designed to handle this predictable, recurring load pattern?",
    options: [
      "Design the integration identically for all times of day, since predictable patterns don't require any special handling",
      "Apply more conservative timeouts, more aggressive caching of recent results, and possibly reduced non-essential query volume specifically during the known 6-8 AM heavy-load window, reverting to normal behavior outside that window",
      "Disable the assistant's seat-availability feature entirely between 6-8 AM every day",
      "Always query the reservation system with the shortest possible timeout, regardless of time of day, to fail fast uniformly"
    ],
    correct: 1,
    explanation: "Applying time-aware handling — more conservative timeouts, more caching, reduced non-essential load specifically during the known heavy-load window — directly matches engineering effort to a documented, predictable pattern rather than treating every hour identically. Uniform handling regardless of the known pattern (A) ignores useful, predictable information about when the dependency is most strained; disabling the feature entirely during that window (C) is a more drastic response than necessary when graceful, time-aware handling can likely keep the feature working, just more conservatively; using a uniformly short timeout at all times (D) would cause unnecessary failures during normal off-peak hours when the system is not under the described strain."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A pharmacy benefits manager integrates Claude with a third-party drug-interaction-checking API used by pharmacist call-center staff. The vendor's API terms explicitly state the service is 'for informational purposes only and not a substitute for professional clinical judgment,' and vendor uptime has occasionally dipped below 99% during regional outages.",
    question: "How should this disclaimer and reliability profile shape the integration's design and how Claude presents interaction-check results?",
    options: [
      "Present the vendor's interaction results as a final, authoritative determination that pharmacists should act on without further review",
      "Present interaction-check results as one input supporting the pharmacist's own clinical judgment, clearly indicate when the check could not be completed due to a vendor outage rather than implying a clean result, and avoid language suggesting the check is a substitute for the pharmacist's professional assessment",
      "Suppress the vendor's disclaimer language from ever reaching call-center staff so the tool feels more authoritative",
      "Stop using the interaction-checking API entirely given its stated limitations and occasional downtime"
    ],
    correct: 1,
    explanation: "Presenting results as decision support rather than a final determination, and being explicit when a check couldn't be completed rather than silently omitting it, correctly reflects both the vendor's own stated limitations and its documented reliability gaps — critical in a clinical context where a pharmacist needs to know whether 'no interaction found' means 'checked and clear' or 'check failed.' Presenting results as final and authoritative (A) contradicts the vendor's own terms and could encourage pharmacists to skip their own clinical judgment; suppressing the disclaimer (C) actively hides a materially important limitation from the professionals relying on the tool; abandoning the vendor entirely (D) is a disproportionate response to normal informational-use disclaimers and occasional outages that can be handled with transparent failure signaling instead."
  },
  {
    domain: 3,
    difficulty: 1,
    scenario: "A team is choosing between building a custom point-to-point integration and using an existing enterprise integration platform (iPaaS) the company already licenses for connecting Claude to a new third-party marketing tool.",
    question: "What is a key consideration in favor of using the already-licensed iPaaS platform rather than building a new custom point-to-point integration?",
    options: [
      "iPaaS platforms are always technically faster at runtime than any custom-built integration",
      "Using infrastructure the company already licenses and operationally supports (monitoring, credential management, logging) can reduce both build time and ongoing operational burden compared to standing up and maintaining an entirely separate custom integration",
      "iPaaS platforms eliminate the need for any security review of the resulting integration",
      "A custom point-to-point integration is always cheaper in total cost regardless of existing licensed infrastructure"
    ],
    correct: 1,
    explanation: "Reusing already-licensed, already-operationally-supported infrastructure — with existing monitoring, credential management, and logging patterns — typically reduces both initial build effort and long-term operational burden compared to standing up a new, separately-maintained custom integration from scratch. Claiming iPaaS is always technically faster at runtime (A) isn't a reliable general truth and depends on the specific platform and use case; assuming it eliminates the need for security review (C) is false — new data flows still need review regardless of the platform; asserting custom integration is always cheaper overall (D) ignores the ongoing maintenance costs of a separately-supported integration, which often exceed the reuse benefit of existing licensed infrastructure."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A used-car marketplace integrates Claude with a vehicle history report vendor (like Carfax) to answer buyer questions. The vendor's API pricing charges per lookup, and the marketplace's product team wants Claude to proactively pull a vehicle history report every time a buyer merely views a listing, not just when they ask about history.",
    question: "What integration concern should the architecture team raise about this proposed 'pull on every view' design?",
    options: [
      "None — proactively fetching data whenever possible always produces a better user experience regardless of cost",
      "The cost and API load scale with page views rather than actual buyer interest or intent, which could be substantially more expensive and higher-volume than fetching reports only when a buyer actually asks about vehicle history or takes a clear next step toward purchase",
      "The vendor's API would technically be unable to handle any additional call volume no matter how it's triggered",
      "Vehicle history data changes so frequently that pulling it on every view is the minimum necessary frequency to stay accurate"
    ],
    correct: 1,
    explanation: "Tying paid API calls to page views rather than actual buyer intent decouples cost from value: page views are typically much higher-volume than genuine purchase interest, so this design could generate substantial unnecessary vendor spend for reports many viewers never even look at. Assuming proactive fetching is always better regardless of cost (A) ignores a real, quantifiable cost tradeoff the architecture team should surface to the product team; asserting the vendor's API technically couldn't handle the load (C) isn't the core issue being described, which is about cost-to-value ratio, not technical capacity; claiming history data changes frequently enough to require per-view refresh (D) mischaracterizes vehicle history reports, which typically change only when new title, accident, or ownership events occur — not on the timescale of page views."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A metropolitan transit authority wants to integrate Claude with fare-payment systems from three previous vendor contracts still in limited operation (legacy card readers from a 2008 contract, a 2015 mobile app backend, and a 2022 open-loop contactless system), plus a fourth vendor's system being piloted for a future full replacement.",
    question: "What integration strategy best supports the transit authority's current multi-vendor reality while anticipating the eventual full replacement?",
    options: [
      "Build a fully custom, deeply coupled integration to each of the four systems independently, accepting that all four will eventually need to be rebuilt when the replacement is complete",
      "Build an abstraction layer representing common fare-payment operations (balance check, trip validation, refund) that each of the four systems implements as an adapter, so Claude's tool interface stays stable as vendors are added, piloted, or eventually retired behind the scenes",
      "Wait until the fourth vendor's pilot concludes and the full replacement is decided before building any integration with the current three systems",
      "Integrate only with the newest 2022 contactless system and treat the older two systems and the pilot as out of scope indefinitely"
    ],
    correct: 1,
    explanation: "A common abstraction layer over fare-payment operations, implemented per-system as adapters, is exactly suited to a multi-vendor environment in transition: it keeps Claude's interface stable while individual backend systems are added (the pilot), retired (the 2008 system eventually), or replaced, without requiring the whole integration to be rebuilt at each transition. Deeply coupled independent integrations for all four with the assumption of a full future rebuild (A) accepts unnecessary rework that the abstraction pattern avoids; waiting for the pilot and replacement decision before integrating anything (C) needlessly delays value for the three systems currently in active operation; integrating only the newest system and ignoring the other two active systems and the pilot (D) leaves riders using older payment methods without support, which is a real functional gap given the systems are explicitly still in operation."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A boutique law firm's IT contractor proposes integrating Claude directly with the firm's document management system using a personal API token generated under the contractor's own individual vendor account, since it was the fastest way to get a working demo running.",
    question: "What is the architectural concern with this approach as a long-term integration design, even though it works for a demo?",
    options: [
      "There is no meaningful concern; a working demo credential is functionally identical to a properly provisioned service credential for any purpose",
      "Tying the production integration to an individual contractor's personal account creates operational risk (the integration breaks if that person's account is disabled or they leave) and audit/governance gaps (activity isn't clearly attributable to the firm as an organizational actor), so a dedicated service account or application-level credential should replace it before production use",
      "The concern is purely about the contractor's personal privacy, not about the firm's systems",
      "Personal API tokens are always technically incompatible with production traffic volumes"
    ],
    correct: 1,
    explanation: "Using an individual's personal credential for a production integration creates real operational risk (account changes, offboarding, or personal account issues break the firm's integration) and governance gaps (actions taken through the integration aren't cleanly attributable to the firm as an organization) — a dedicated service account is standard practice specifically to avoid these problems before going to production. Dismissing the concern entirely (A) ignores well-documented operational and governance risks of this pattern; framing it as purely a personal privacy issue for the contractor (C) mischaracterizes the real risk, which is about the firm's operational continuity and auditability; claiming personal tokens are always technically incapable of production volume (D) isn't the actual issue — the problem is governance and continuity, not raw technical throughput."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A shipping container leasing company integrates Claude with an IoT tracking vendor whose sensors report container location and temperature. The vendor's data occasionally shows physically impossible values (a container 'teleporting' thousands of miles between two consecutive readings minutes apart) due to a known GPS glitch the vendor has not yet fixed.",
    question: "How should the integration layer handle this known category of physically implausible sensor readings?",
    options: [
      "Pass all sensor readings to Claude unfiltered, including physically impossible ones, and let it reason about which readings seem correct",
      "Add a validation rule in the integration layer that flags or discards readings implying physically impossible movement (e.g., speed exceeding plausible transport limits) before they reach Claude, and surfaces a distinct 'sensor anomaly' status when this occurs",
      "Discard all data from this vendor permanently since any known glitch makes the entire feed untrustworthy",
      "Have Claude automatically average an impossible reading with the previous plausible one to smooth over the anomaly"
    ],
    correct: 1,
    explanation: "Physical-plausibility validation is a deterministic, well-suited check for the integration layer — it reliably catches a known glitch pattern (impossible speed between readings) using a simple, explainable rule, and flagging it as an anomaly rather than silently dropping it preserves visibility into a vendor issue that should be tracked and eventually escalated. Passing all readings unfiltered and relying on the model to judge plausibility (A) is a weaker, less reliable control for a known, mechanically-detectable data quality issue; discarding the entire vendor feed permanently (C) is a disproportionate response to a specific, known glitch pattern that affects a subset of readings, not all of them; automatically averaging away anomalies (D) silently fabricates a plausible-looking but potentially incorrect value rather than surfacing the real uncertainty."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A theme park operator wants Claude integrated with a third-party queue-management system to tell guests current wait times via a mobile app. The vendor's API is well-documented and reliable, but the park's own legal team has not yet reviewed the vendor's data processing agreement for compliance with children's privacy law, since many park guests are minors.",
    question: "What should happen before this otherwise technically ready integration goes live?",
    options: [
      "Launch the integration immediately since the API itself is well-documented and reliable, and address legal review afterward if issues arise",
      "Hold production launch until legal review of the data processing agreement is complete, since technical readiness does not substitute for confirming compliance with applicable children's privacy law before guest data (including minors') begins flowing to the vendor",
      "Launch the integration but disable it specifically for any guest identified as a minor, without addressing the vendor agreement itself",
      "Skip legal review permanently on the assumption that a well-documented, reliable API implies compliant data handling"
    ],
    correct: 1,
    explanation: "Technical readiness and legal/compliance readiness are separate gates, and a pending review specifically concerning children's privacy law — a high-stakes, heavily regulated area — is a legitimate reason to hold launch regardless of how solid the API integration itself is. Launching immediately and addressing legal review afterward (A) risks the exact harm the review exists to prevent: real children's data flowing to a vendor before compliance is confirmed; disabling only for identified minors without resolving the underlying agreement (C) is a partial workaround that doesn't address whatever the actual compliance gap in the data processing agreement might be, and identifying which guests are minors reliably is itself nontrivial; assuming API quality implies legal compliance (D) conflates two unrelated dimensions — a well-built API can still be paired with a data processing agreement that doesn't meet a specific regulatory bar."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A specialty pharmacy integrates Claude with an insurance eligibility-verification clearinghouse. The clearinghouse's API has a documented 99.5% uptime SLA, but their support terms exclude any liability for downstream business impact of an outage, capping their responsibility at a service credit.",
    question: "Given this liability-limited SLA, what should the pharmacy's integration architecture account for?",
    options: [
      "Nothing beyond normal API integration, since a 99.5% uptime SLA is high enough that outage planning isn't necessary",
      "Build fallback handling for eligibility-verification outages (such as a manual verification workflow staff can fall back to, and clear in-app messaging when automated verification is unavailable), since the SLA's liability cap means the pharmacy — not the vendor — bears the operational consequences of any outage",
      "Refuse to do business with the clearinghouse until they remove the liability cap from their terms",
      "Assume the 99.5% SLA guarantees eligibility checks will never fail during business hours specifically"
    ],
    correct: 1,
    explanation: "Because the vendor's liability is capped regardless of the actual business impact, the pharmacy itself bears the operational risk of an outage and should build its own fallback (manual verification path, clear user-facing messaging) rather than assuming the SLA alone protects the business — 99.5% still permits meaningful outage time, and impact matters more than the raw percentage. Treating the SLA as sufficient with no additional planning (A) ignores that 99.5% still allows for real outage windows, and that the vendor explicitly disclaims responsibility for downstream impact; refusing to work with the clearinghouse over the liability cap (C) is likely unrealistic since liability caps are standard in most vendor SLAs across the industry; assuming the SLA guarantees no failures during business hours (D) misreads what an aggregate uptime percentage actually promises, since outages aren't necessarily distributed evenly and could concentrate during peak hours."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A city parking authority wants to integrate Claude with a third-party license-plate-recognition (LPR) vendor to help enforcement staff resolve disputed parking tickets. The vendor's system was designed for a different city with different plate formats, and roughly 3% of plate reads from this new city are misrecognized due to format differences the vendor hasn't fully adapted to.",
    question: "How should the integration handle this known, quantified recognition-error rate when presenting evidence for a disputed ticket?",
    options: [
      "Present LPR reads to enforcement staff as definitive proof of the ticketed plate with no accuracy caveat",
      "Present the LPR read along with its confidence/error context, and where available include the original captured image alongside the OCR-derived text so enforcement staff can visually verify the read rather than relying solely on the automated recognition, given the known 3% misread rate for this city's plate formats",
      "Discontinue use of the LPR vendor entirely because of the misread rate",
      "Automatically dismiss any ticket where the LPR read might be one of the misrecognized 3%, without any human review"
    ],
    correct: 1,
    explanation: "Surfacing the original image alongside the automated read gives enforcement staff a reliable way to verify contested tickets despite a known, quantified misread rate for this city's plate formats — pairing automation with human verification for a documented weak point in the pipeline. Presenting automated reads as definitive proof with no caveat (A) risks upholding tickets based on a known-flawed automated read in exactly the cases where it matters most (disputes); discontinuing the vendor entirely (C) is a disproportionate response to a specific, understood limitation (unadapted plate formats) that has a much less costly mitigation (human visual verification); automatically dismissing potentially-affected tickets with no review (D) forfeits legitimate tickets and isn't necessary when a human-verification fallback can resolve genuine disputes accurately."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A mid-sized manufacturer's ERP integration with Claude was originally scoped to only read production data, but over six months, several teams have quietly added write capabilities (updating inventory counts, adjusting purchase orders) without a formal architecture review of the expanded scope.",
    question: "What integration governance issue does this scenario illustrate, and what should the team do about it?",
    options: [
      "This is normal, healthy iteration and requires no special governance response since the features work as intended",
      "This illustrates uncontrolled scope creep in a sensitive integration — write access to core ERP data carries materially higher risk than read access — and the team should retroactively conduct the architecture and security review that should have gated each write capability before it shipped, formalizing a review gate for future scope changes",
      "The team should immediately revoke all write capabilities without evaluating whether they are currently providing legitimate business value",
      "The team should document the write capabilities after the fact purely for internal reference, with no actual review of whether they're appropriately scoped or secured"
    ],
    correct: 1,
    explanation: "Write access to core ERP data (inventory, purchase orders) is a materially higher-risk capability than read access, and adding it without formal review is a real governance failure — the correct fix is a retroactive review of what was actually shipped, plus establishing a forward-looking gate so future scope expansions get reviewed before, not after, they reach production. Treating this as normal, no-action-needed iteration (A) ignores that write access to financial/operational systems is exactly the kind of change that warrants review; immediately revoking everything without evaluation (C) risks disrupting legitimate business value without first understanding what's actually there and why; documenting without any actual review of scoping or security (D) doesn't address the underlying governance gap, it just formalizes the ungoverned state."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A national grocery chain's supply chain team wants Claude to autonomously place reorders with a produce distributor's ordering API when predicted stock runs low, without human approval, to reduce stockouts. The distributor's API has no built-in safeguard against duplicate submissions, and the chain's own network occasionally experiences brief connectivity blips that could cause a request to be resent.",
    question: "What integration-level safeguard is most important to add before enabling autonomous ordering given this failure mode?",
    options: [
      "Nothing additional is needed since duplicate orders, if they happen, can simply be returned later",
      "Implement idempotency at the integration layer — generating a unique request identifier per intended order that the distributor's system (or an intermediary layer) can use to detect and reject duplicate submissions of the same logical order, even if the request is technically resent due to a connectivity blip",
      "Disable autonomous ordering entirely and require human approval for every single reorder regardless of size or urgency",
      "Increase the network timeout so connectivity blips become less frequent, treating that as sufficient protection against duplicates"
    ],
    correct: 1,
    explanation: "Idempotency keys are the standard, correct fix for exactly this failure mode — a request that might be resent due to network issues needs a way for the receiving system to recognize and reject a duplicate of a request it already processed, which is essential before granting autonomous, unattended write access to a real ordering system. Assuming duplicates can just be returned later (A) ignores real costs: perishable produce likely can't simply be returned, and overordering has direct financial and waste impact; requiring human approval for every reorder (C) defeats the stated purpose of reducing stockouts through faster autonomous action, which may be an overcorrection when idempotency alone solves the actual risk; increasing network timeouts (D) reduces the frequency of the underlying connectivity issue but doesn't structurally prevent duplicate submission when a blip does occur, so it's a mitigation, not a real safeguard."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A ski resort chain wants Claude integrated with a lift-ticket sales platform and a separate season-pass platform acquired from two different companies years apart, each maintaining its own customer records with no shared customer ID. A guest asking about their season pass benefits while buying a day ticket needs both systems queried and reconciled in real time.",
    question: "What is the most reliable way to reconcile a guest's identity across these two unlinked systems for a real-time customer-facing interaction?",
    options: [
      "Have Claude guess which season-pass record belongs to the guest based on name matching alone, since building a formal identity-matching system would take too long",
      "Build a probabilistic or deterministic identity-matching service (using available shared attributes like email, phone, or a manual account-linking flow the guest can complete once) that resolves a single unified customer identity before Claude queries either system, rather than relying on ad hoc matching per conversation",
      "Require every guest to manually provide both their day-ticket confirmation number and season-pass number in every single interaction to avoid needing to build any matching logic",
      "Merge the two systems' full databases into one without any identity resolution logic, assuming the merge itself will naturally align matching customers"
    ],
    correct: 1,
    explanation: "A proper identity-matching service (using strong shared attributes or a one-time account-linking flow) resolves a unified identity reliably and reusably, avoiding the risk of a customer-facing tool acting on a wrong or ambiguous match. Ad hoc name-based guessing per conversation (A) risks matching the wrong guest, especially with common names, in a customer-facing context where getting it wrong has real consequences (wrong benefits applied); requiring guests to provide both identifiers every single time (C) pushes a solvable engineering problem onto the customer and creates unnecessary friction; a blind database merge with no matching logic (D) doesn't actually solve identity resolution and would likely create both false matches and missed matches depending on how the merge handles conflicting or absent keys."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A dental insurance company's IT team is debating whether to integrate Claude with a claims-adjudication vendor via that vendor's REST API or via a batch SFTP file exchange the vendor also offers, for the specific use case of a customer service agent looking up an individual claim's status in real time during a phone call.",
    question: "Which integration option better fits this specific use case, and why?",
    options: [
      "The batch SFTP file exchange, because file-based integration is inherently more secure than any API",
      "The REST API, because the use case requires looking up a specific individual claim's current status during a live phone call, which needs low-latency, on-demand access rather than data that's only as fresh as the last scheduled file transfer",
      "Either option is equally suitable since both ultimately expose the same underlying claims data",
      "The batch SFTP exchange, because it uses less vendor infrastructure and is therefore always the lower-risk choice"
    ],
    correct: 1,
    explanation: "The stated use case — a live phone call needing current status for one specific claim — is a textbook fit for a low-latency, on-demand REST API call rather than data whose freshness depends on the last scheduled batch transfer, which could be hours or a day old. Claiming file-based integration is inherently more secure than any API (A) is not a reliable general truth and depends on how each is actually implemented and secured; treating the two options as equally suitable (C) ignores the real freshness and latency difference that matters specifically for this real-time use case; asserting batch exchange is always lower risk due to using less infrastructure (D) overgeneralizes and ignores that the batch option would functionally fail the actual requirement of real-time individual claim lookup during a live call."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A cruise line's Claude-based concierge assistant integrates with onboard Wi-Fi-dependent systems (dining reservations, excursion booking) that must continue functioning when the ship loses satellite connectivity for extended stretches at sea, since all cloud-hosted backend integrations become unreachable during those outages.",
    question: "What integration architecture best supports continued core functionality during expected connectivity loss?",
    options: [
      "Design the assistant to depend entirely on real-time cloud connectivity for every function, informing guests the assistant is simply unavailable during connectivity outages",
      "Design a hybrid architecture where frequently needed, relatively static data (dining menus, excursion schedules, ship layout) is cached or replicated onboard for offline access, while functions genuinely requiring live connectivity (final booking confirmation, real-time system status) gracefully degrade or queue for sync once connectivity returns",
      "Require the cruise line to guarantee continuous satellite connectivity before any integration work begins, since intermittent connectivity is unacceptable for any onboard system",
      "Store all guest data exclusively onboard with no cloud integration at all, to eliminate any dependency on connectivity"
    ],
    correct: 1,
    explanation: "A hybrid architecture — caching relatively static, frequently needed data onboard for offline access while gracefully degrading or queuing genuinely connectivity-dependent actions — directly matches the described operational reality of predictable extended offline periods at sea, maximizing usefulness during outages without pretending offline write operations can be made fully real-time. Full dependency on cloud connectivity with no offline fallback (A) makes the assistant unusable for extended, predictable stretches of normal operation, which is a poor fit given how often this occurs at sea; demanding guaranteed continuous connectivity before starting (C) is not achievable given the physical realities of satellite connectivity at sea and blocks the project on an unattainable precondition; storing everything exclusively onboard with zero cloud integration (D) overcorrects and discards legitimate uses of cloud connectivity when it is available, such as real-time booking confirmations."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A furniture e-commerce company integrates Claude with a warehouse robotics vendor's order-fulfillment API to let customer service check where an order is in the physical fulfillment process. The vendor's API was designed for the vendor's own internal dashboard and returns internal robotics status codes (like 'AGV_QUEUE_7B') that mean nothing to a customer service agent or a customer.",
    question: "What should the integration layer do with these internal, vendor-specific status codes before they reach Claude or the end customer?",
    options: [
      "Pass the raw internal status codes through unchanged and let Claude generate a plausible-sounding customer explanation for whatever code it sees",
      "Map the vendor's internal status codes to a small set of clear, customer-appropriate fulfillment stages (e.g., 'being picked,' 'packed,' 'awaiting pickup') at the integration layer, so Claude works from meaningful business-level status rather than interpreting opaque internal codes",
      "Show customers the raw internal codes directly, since transparency about the exact system state is always preferable",
      "Withhold all fulfillment-status information from customers since the vendor's codes aren't customer-friendly"
    ],
    correct: 1,
    explanation: "Translating vendor-internal, engineering-facing status codes into a small set of meaningful business-level stages at the integration layer is standard practice — it ensures Claude reasons over accurate, well-defined categories rather than guessing at the meaning of an opaque code it has no reliable way to interpret correctly. Passing raw codes through and letting the model guess at an explanation (A) risks Claude fabricating a plausible-sounding but incorrect interpretation of a code it doesn't actually know the true meaning of; showing raw internal codes directly to customers (C) confuses opaque internal transparency with actual customer-facing clarity, which isn't the same thing and provides no real value; withholding all status information (D) is a disproportionate response when a straightforward mapping layer solves the actual problem."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A children's toy manufacturer integrates Claude with a retail partner's EDI-based purchase order system and, separately, with a direct-to-consumer Shopify storefront. Leadership wants a single, unified 'order intelligence' view but the two data sources have fundamentally different granularity — EDI orders are large pallet-level wholesale quantities, while Shopify orders are individual units to consumers.",
    question: "What is the most sound way to unify these two fundamentally different order granularities into one coherent view for leadership?",
    options: [
      "Force both data sources into an identical line-item schema by treating each pallet in a wholesale order as a single unit, matching Shopify's granularity",
      "Preserve each source's native granularity in the underlying data model, and build a reporting/aggregation layer that rolls both up to a common higher-level metric (e.g., total units shipped, revenue by channel) appropriate for the leadership view, rather than forcing incompatible line-item structures to match",
      "Only show leadership the Shopify data since it's more granular and detailed",
      "Only show leadership the EDI wholesale data since it represents larger revenue per order"
    ],
    correct: 1,
    explanation: "Preserving each source's true granularity while aggregating both to a common, meaningful higher-level metric (units, revenue, by channel) gives leadership an accurate unified view without corrupting either dataset's actual meaning — a pallet mislabeled as 'one unit' would badly distort wholesale volume, and forcing incompatible granularities to look the same misrepresents the underlying reality. Mislabeling pallets as single units to match Shopify's granularity (A) creates a false, understated picture of wholesale volume; showing only Shopify data (C) discards the (likely larger-revenue) wholesale channel entirely; showing only EDI wholesale data (D) discards the direct-to-consumer channel leadership presumably also wants visibility into — neither one-sided view achieves the unified picture leadership actually asked for."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A telecom's customer churn-prevention team wants Claude to trigger a retention offer through a third-party marketing automation platform whenever it detects strong churn signals in a support conversation. The marketing platform's API allows offers to be triggered but provides no mechanism to check whether a given customer has already received a retention offer in the past 30 days from a different channel (e.g., outbound call campaign).",
    question: "What integration gap does this scenario reveal, and what should the team do about it?",
    options: [
      "No gap exists; the marketing platform's API is sufficient since it can successfully trigger the offer",
      "The gap is a missing cross-channel offer-frequency check; the team should maintain their own system of record for recent offers issued to a customer (regardless of channel) and consult it before triggering a new offer through Claude, rather than relying solely on the marketing platform's per-channel view",
      "The team should trigger offers as frequently as churn signals appear, since more retention offers can only help reduce churn",
      "The team should stop using the marketing automation platform since it lacks this specific capability"
    ],
    correct: 1,
    explanation: "The described gap — no cross-channel visibility into recent offers — is a real integration design problem, and the correct fix is maintaining an internal system of record for recent offers across all channels that the Claude-triggered path checks before firing a new offer, since the marketing platform's own API can't provide that missing context. Assuming no gap exists because the API can technically trigger offers (A) ignores the real business risk of duplicate or excessive offers to the same customer within a short window; triggering offers as often as churn signals appear with no frequency check (C) risks customer annoyance, offer fatigue, and unnecessary discount cost from redundant offers; abandoning the marketing platform entirely (D) is a disproportionate response when the actual fix is adding a coordinating layer, not replacing a functioning platform."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A regional utility's customer billing integration with Claude needs to call a third-party address-validation service before finalizing a new service address in the billing system. The validation service occasionally rejects genuinely valid rural addresses due to sparse postal data in low-population areas.",
    question: "How should the integration handle validation rejections to avoid unfairly blocking legitimate rural customers?",
    options: [
      "Treat every validation-service rejection as final and block the address from being entered under any circumstances",
      "Treat a validation-service rejection as a flag for manual review rather than an automatic hard block, allowing a customer service rep to confirm and override for addresses the automated service can't verify due to known sparse-data limitations in rural areas",
      "Disable address validation entirely since it doesn't work well for rural customers",
      "Automatically accept any address a customer enters with no validation check of any kind, urban or rural"
    ],
    correct: 1,
    explanation: "Routing rejections to manual review rather than an automatic hard block lets a rep resolve the known weak point (sparse rural postal data) with human judgment, instead of either blindly trusting or blindly overriding the validation service. Treating every rejection as final (A) systematically disadvantages legitimate rural customers over a known, understood data-coverage gap; disabling validation entirely (C) discards a useful fraud/error check for the vast majority of addresses where it works correctly; accepting all addresses with no check at all (D) removes a control that catches genuine input errors, not just rural false positives."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A payroll processing company integrates Claude with a state unemployment-insurance filing portal on behalf of employer clients. The portal is a government system with no published API — the only access method is an automated browser-interaction script the company built against the portal's HTML forms, which breaks whenever the state redesigns the page layout, typically without notice.",
    question: "What integration risk management practice most directly addresses this state portal's unannounced-redesign risk?",
    options: [
      "Accept that breakage will happen and only fix the browser-automation script reactively once a client reports a failed filing",
      "Add automated monitoring that regularly validates the browser-automation script against the live portal (e.g., a scheduled synthetic filing-flow check) so layout-breaking changes are detected proactively, before they cause a client's real filing to fail silently",
      "Ask the state government to commit to a formal API and deprecation notice policy before continuing to offer this service",
      "Switch to having employer clients file manually themselves, removing Claude and the automation from the process entirely"
    ],
    correct: 1,
    explanation: "Scheduled synthetic checks that exercise the automation against the live portal catch unannounced layout breakage proactively, which matters because the alternative — discovering breakage when a real client filing fails — carries real regulatory and financial consequences for that employer. Waiting to react only after a client reports a failure (A) risks a missed unemployment filing deadline before anyone notices; demanding the state adopt a formal API and deprecation policy (C) is outside the company's control and not a near-term mitigation; reverting to fully manual filing (D) discards the automation's value entirely over a monitorable, mitigable risk."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A commercial fishing fleet operator integrates Claude with vessel-tracking transponder data (via a maritime vendor) for safety and dispatch, and with a fisheries-regulator reporting system for compliance filings. The two systems disagree on vessel position roughly 5% of the time due to different GPS sampling intervals, and the regulator's reporting system has zero tolerance for discrepancies once a filing is submitted.",
    question: "Given the regulator's zero-tolerance policy on discrepancies, how should the integration reconcile disagreements between the two position sources before a compliance filing is submitted?",
    options: [
      "Always submit the vendor tracking data to the regulator without comparison, since it updates more frequently",
      "Add a reconciliation step that compares both sources before submission, flags any material discrepancy for human review rather than auto-submitting, and only proceeds with an automated filing when the two sources agree within an acceptable tolerance",
      "Always submit whichever value was received most recently, regardless of source, to keep the filing timely",
      "Average the two position values automatically and submit the average as the filed position in every case"
    ],
    correct: 1,
    explanation: "Given a zero-tolerance regulatory consequence for discrepancies, a pre-submission reconciliation check that routes disagreements to human review — rather than auto-submitting a guess — is the correct control, since an incorrect automated filing to a regulator carries real compliance risk. Always trusting the vendor tracking feed regardless of the regulator system's own data (A) ignores that the discrepancy could originate from either source and doesn't verify anything before a zero-tolerance filing; submitting whichever value arrived most recently (C) is not a reasoned reconciliation and could submit an erroneous reading; auto-averaging in every case (D) can produce a filed position that doesn't correspond to either system's actual reading and may still be wrong, while also removing the case-by-case judgment a human reviewer could apply to determine which source is more likely correct."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A mid-market accounting firm wants to integrate Claude with QuickBooks Online for client bookkeeping questions. QuickBooks offers an official OAuth-based API with granular, scoped permissions (read-only reports, read-only transactions, or full read/write), and the firm's use case only requires reading transaction data to answer client questions — never modifying it.",
    question: "Which permission scope should the integration request from QuickBooks, and why?",
    options: [
      "Full read/write access, so the integration has flexibility to add features later without needing to reconfigure permissions",
      "Only the read-only transaction scope actually required for the current use case, following the principle of least privilege, and requesting broader scope later only if a genuine new use case requires it",
      "Read-only reports scope only, even though the use case requires reading individual transaction data, since reports are a similar category",
      "Whatever scope QuickBooks marks as 'recommended' by default in its developer portal, without evaluating it against the specific use case"
    ],
    correct: 1,
    explanation: "Requesting only the minimum scope actually needed — read-only transaction access — follows least privilege and limits the damage any credential compromise or bug could cause, since the integration genuinely never needs to write data. Requesting full read/write for future flexibility (A) grants unnecessary write access to client financial data now, in exchange for a convenience that can be added later if actually needed; requesting only the reports scope (C) doesn't match the stated need to read individual transaction data, which is a different, more granular data type than aggregate reports; blindly accepting whatever QuickBooks labels 'recommended' (D) outsources a security decision that should be based on the integration's actual, specific requirements."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A national blood donation nonprofit integrates Claude with a scheduling platform used by donation centers and, separately, with a laboratory testing partner's results system. A donor's eligibility to donate again depends on lab results that can take up to 72 hours to return, but the scheduling platform allows booking new appointments immediately with no awareness of pending lab holds.",
    question: "What integration change would best prevent a donor from being scheduled for a donation they are actually ineligible for due to a pending or adverse lab result?",
    options: [
      "Leave the two systems unconnected, since lab results and scheduling serve different operational purposes",
      "Integrate the lab-results system with the scheduling platform so pending holds and adverse results are checked against a donor's record at booking time, blocking or flagging appointments that conflict with an active eligibility hold",
      "Rely on donation center staff to manually remember and cross-check every donor's lab status against a separate report before each appointment",
      "Only check lab results after the donor already arrives for their appointment, canceling on-site if there's a conflict"
    ],
    correct: 1,
    explanation: "Connecting the two systems so eligibility holds are checked at booking time prevents the problem before it happens — a donor with a pending or adverse result simply can't book a conflicting appointment — which is both a better donor experience and a real safety control for blood donation. Leaving the systems unconnected (A) is precisely the gap causing the problem described and ignores a clear, addressable integration need; relying on manual staff cross-checking (C) is error-prone and doesn't scale across many donation centers and donors; checking only after arrival (D) wastes the donor's time and the center's resources by allowing the conflict to reach the appointment before catching it, when catching it at booking is straightforward to implement."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A last-mile delivery startup integrates Claude with two different route-optimization vendors as part of a planned A/B test to compare their performance, routing 50% of dispatch decisions through each vendor. Each vendor requires its own authentication, has its own request format, and returns results in different units (one in miles/minutes, the other in kilometers/seconds).",
    question: "What integration design best supports this A/B testing need while keeping the rest of the dispatch system vendor-agnostic?",
    options: [
      "Hardcode the A/B split and both vendors' specific formats directly into the core dispatch logic, since the test is temporary",
      "Build a common route-optimization interface with a vendor-specific adapter for each provider that normalizes units and response format, and implement the A/B routing logic as a thin layer that selects an adapter per request — keeping the core dispatch logic unaware of which vendor served a given request",
      "Convert one vendor's entire API to match the other vendor's format exactly, treating them as interchangeable without normalization",
      "Run the two vendors as two entirely separate, non-integrated dispatch systems for the duration of the test"
    ],
    correct: 1,
    explanation: "A common interface with per-vendor adapters and a thin routing layer is the correct pattern for an A/B test between interchangeable providers — it isolates each vendor's format and unit differences behind normalization, keeps core dispatch logic simple and vendor-agnostic, and makes it easy to drop one vendor or add a third later. Hardcoding both vendors' specifics into core logic (A) tightly couples temporary test logic into the system's core, making later cleanup and any future vendor changes harder than necessary; converting one vendor's API to match the other without genuine normalization (C) is likely to produce incorrect unit conversions or lost fidelity rather than a clean, correct normalization; running two fully separate, non-integrated systems (D) undermines the ability to compare results consistently and defeats the purpose of a controlled A/B test."
  },
  {
    domain: 3,
    difficulty: 4,
    scenario: "A defense-adjacent aerospace supplier integrates Claude with a parts-inventory system that must remain air-gapped from the internet for security classification reasons, while the Claude deployment itself runs in a cloud environment. Leadership wants inventory lookups available through the assistant regardless.",
    question: "What integration architecture correctly respects the air-gap requirement while still delivering the requested capability?",
    options: [
      "Create a one-time firewall exception connecting the air-gapped network to the cloud-hosted Claude deployment, treating it as an acceptable narrow exception to the air-gap policy",
      "Do not connect the air-gapped system to the cloud deployment directly; instead, replicate only the specific non-classified inventory data needed through an approved, audited one-way export process into a separate system that the cloud-hosted Claude deployment can query, preserving the air gap for the classified network itself",
      "Move the classified parts-inventory system into the same cloud environment as Claude to simplify the integration",
      "Grant the cloud-hosted Claude deployment inbound network access to the air-gapped environment whenever an inventory query needs answering, closing it immediately afterward"
    ],
    correct: 1,
    explanation: "Preserving the air gap while enabling the capability requires moving only the non-classified data needed, through an approved and audited one-way export process, into a separate system the cloud deployment can reach — the air-gapped network itself is never directly connected to anything external. A firewall exception connecting the air-gapped network to the cloud (A) directly defeats the purpose of an air gap, which exists specifically to prevent any network path between the classified environment and external systems; moving the classified system into the cloud (C) abandons the air-gap requirement entirely rather than respecting it; opening and closing inbound access on demand (D) still creates a real network connection to the air-gapped environment during each query, which is exactly what an air-gap policy is designed to prevent, regardless of how briefly the connection exists."
  },
  {
    domain: 3,
    difficulty: 2,
    scenario: "A regional theater company wants Claude integrated with a ticketing platform (Eventbrite-like) to answer patron questions about show times and seat availability. The ticketing platform offers a free public API with no authentication required for read-only availability data, since it's designed to be embedded in public websites.",
    question: "Given that this specific API is intentionally public and unauthenticated by the vendor's own design, what is the appropriate integration posture?",
    options: [
      "Refuse to use any unauthenticated API on principle, regardless of what the vendor's own design and intent for that endpoint actually is",
      "Use the public endpoint as intended for the read-only availability data it's designed to expose, while still applying normal engineering practices (error handling, reasonable request pacing) — treating 'no authentication required' as the vendor's deliberate design for this specific public-facing data, not as a security gap to compensate for",
      "Add a heavy custom authentication layer in front of the vendor's intentionally public endpoint before allowing the integration to be built",
      "Assume that because the endpoint requires no authentication, no error handling or engineering care is needed at all"
    ],
    correct: 1,
    explanation: "Recognizing that an intentionally public, unauthenticated endpoint for non-sensitive availability data is a deliberate vendor design choice — not a security flaw — lets the team use it as intended while still applying normal engineering hygiene like error handling and sensible request pacing. Refusing any unauthenticated API on principle (A) misapplies a security heuristic to a context where it doesn't fit — public read-only availability data isn't the kind of sensitive resource authentication requirements typically protect; adding a custom authentication layer in front of an intentionally open endpoint (C) is unnecessary engineering effort that doesn't match the actual risk of the data involved; assuming no engineering care is needed at all (D) ignores that error handling and pacing still matter for reliability, even for a low-risk, unauthenticated data source."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A national pharmacy chain integrates Claude with a controlled-substance inventory tracking system required by the DEA. The chain's regional IT teams have historically each maintained their own separate connection to this federally regulated system, with no consistent logging standard between regions.",
    question: "What integration governance step should precede any expansion of Claude's access to this federally regulated system nationwide?",
    options: [
      "Expand access region by region using each region's own existing, inconsistent connection and logging approach, since consistency can be addressed later",
      "Establish a single, consistent, compliant integration pattern and audit-logging standard for accessing the controlled-substance system before expanding Claude's access nationwide, replacing the inconsistent regional connections rather than building on top of them",
      "Grant nationwide access immediately since the underlying system is the same federally regulated platform regardless of which region connects to it",
      "Allow each region to continue maintaining its own separate approach indefinitely, since past inconsistency hasn't caused a known incident yet"
    ],
    correct: 1,
    explanation: "A federally regulated, DEA-relevant system with inconsistent regional logging standards has a real, existing governance gap that should be resolved with one consistent, compliant pattern before scaling Claude's access nationwide — expanding on top of inconsistent foundations multiplies the compliance risk rather than fixing it. Expanding using each region's existing inconsistent approach (A) scales an already-flawed foundation rather than fixing it first; assuming nationwide access is fine because it's the same underlying platform (C) ignores that the actual problem is inconsistent logging and connection practices, not the platform itself; treating the absence of a known incident so far as proof the inconsistency is acceptable (D) is a weak justification for a regulated system where the absence of a caught incident doesn't mean the compliance gap doesn't exist."
  },
  {
    domain: 3,
    difficulty: 3,
    scenario: "A solar energy installer integrates Claude with a utility interconnection-application portal required to bring new residential solar systems online. The portal is operated by dozens of different municipal utilities, each with its own separate, inconsistent web form and no shared API, and several utilities redesign their forms yearly with no advance notice.",
    question: "What integration strategy is most sustainable for the installer given this fragmented, inconsistent, and frequently-changing set of utility portals?",
    options: [
      "Build one rigid, generalized automation designed to work identically across every utility's form, accepting that it will frequently fail wherever a given utility's form structure differs from the assumed pattern",
      "Build a per-utility adapter behind a common internal interface for submitting interconnection applications, prioritized by installation volume, with automated monitoring to detect when a given utility's form changes so that specific adapter can be updated without affecting the others",
      "Require every municipal utility to adopt a standard API before offering any automated interconnection support",
      "Have installers manually complete every utility's form for every project, treating automation as infeasible given the fragmentation"
    ],
    correct: 1,
    explanation: "Per-utility adapters behind a common interface, prioritized by actual volume and monitored for breakage, directly matches a fragmented, inconsistent, frequently-changing set of independent third-party forms — issues with one utility's form are isolated to its adapter and don't affect the others, and monitoring catches unannounced redesigns proactively. A single rigid generalized automation (A) will break unpredictably across genuinely different form structures and offers no isolation when one utility changes its form; demanding a standard API from dozens of independent municipal utilities (C) is outside the installer's control and unrealistic as a precondition; fully manual completion for every project (D) discards automation's value entirely when a prioritized, incremental adapter strategy can deliver real efficiency for at least the highest-volume utilities."
  }
];
