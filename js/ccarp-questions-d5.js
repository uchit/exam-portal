// CCAR-P Domain 5 — Governance, Safety & Risk Management (14% weight).
// Schema: { domain, difficulty (1-5), scenario, question, options[4], correct (index into options), explanation }
export const QUESTIONS_D5 = [
  {
    domain: 5,
    difficulty: 4,
    scenario: "An architecture review board is evaluating a Claude-based system that will autonomously approve or deny small business loan applications up to $25,000, with human review only for larger amounts. Internal audit has flagged that the system's decision rationale is not currently logged in a form regulators could review.",
    question: "What should the architecture team prioritize before this system can go to production?",
    options: [
      "Add a post-hoc summary report generated weekly, since real-time logging would slow down decision throughput",
      "Require the system to emit a structured, auditable rationale alongside every decision, capturing which inputs drove the outcome, before any autonomous approval is enabled in production",
      "Keep the current design but add a disclaimer in the loan terms noting decisions are AI-assisted",
      "Lower the autonomous approval threshold to $5,000 so fewer decisions need justification"
    ],
    correct: 1,
    explanation: "For a system making real financial decisions, auditability has to be built into the decision path itself, not summarized after the fact — a weekly report or a disclaimer gives regulators nothing to actually review. Lowering the threshold (D) reduces exposure but doesn't fix the underlying governance gap: the system remains unauditable at whatever threshold it operates."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A regional hospital network is piloting Claude to draft differential diagnosis suggestions that appear in a physician's chart view during patient visits. The vendor's marketing materials describe the tool as 'highly accurate,' and some clinicians have started accepting suggestions without reviewing the underlying reasoning.",
    question: "What governance control most directly addresses the risk emerging in this rollout?",
    options: [
      "Require the interface to display the model's supporting evidence and require an explicit clinician acknowledgment before the suggestion can be added to the chart",
      "Restrict the tool to only the most experienced physicians, who are less likely to over-rely on it",
      "Remove the accuracy claim from vendor marketing materials to reduce liability",
      "Increase the frequency of model retraining to improve suggestion accuracy"
    ],
    correct: 0,
    explanation: "The core risk here is automation bias — clinicians rubber-stamping suggestions rather than exercising independent judgment — which is a human-oversight design problem, not an accuracy problem. Forcing engagement with the rationale before acceptance preserves meaningful human review. Restricting to senior physicians doesn't scale and doesn't fix the interaction pattern; retraining improves the model but does nothing to change how clinicians use it."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A consumer lender uses Claude to summarize applicant financial documents and generate a recommended credit tier. An internal fairness audit finds that applicants from certain zip codes receive systematically lower recommended tiers even after controlling for income and credit history.",
    question: "What is the most appropriate governance response?",
    options: [
      "Suspend the zip-code-correlated feature inputs, conduct a disparate-impact review with legal and compliance, and hold the system out of production until the disparity is explained or resolved",
      "Add a note to the loan officer interface flagging that the tool may have geographic bias, and let officers adjust manually",
      "Retrain the model on a larger dataset without changing the input features, since more data typically reduces bias",
      "Keep the system running since income and credit history were already controlled for, indicating the disparity is likely coincidental"
    ],
    correct: 0,
    explanation: "A statistically significant disparity correlated with a protected-adjacent proxy variable after controlling for legitimate factors is a serious fairness and legal risk that requires halting production use pending a formal review, not a workaround. A UI disclaimer shifts responsibility onto individual loan officers without fixing the systemic issue, and more data alone doesn't remove a biased input signal. Dismissing the finding as coincidental ignores the audit's own controls."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An insurance carrier is designing risk tiers for a Claude-based claims processing system. Low-dollar auto glass claims would be fully autonomous; claims involving injury or above $50,000 would require human adjuster sign-off.",
    question: "Which additional design element is essential to this risk-tiering approach?",
    options: [
      "A mechanism that automatically escalates a claim to a human adjuster if the autonomous system detects ambiguity, inconsistency, or signs of potential fraud, regardless of dollar amount",
      "A quarterly report to leadership summarizing total claims volume processed autonomously",
      "A public-facing statement that low-dollar claims are handled by AI to build customer trust",
      "A fixed dollar threshold with no exceptions, so the system's behavior is fully predictable for auditors"
    ],
    correct: 0,
    explanation: "Dollar amount alone is an incomplete proxy for risk; a claim can be small in value but carry fraud or complexity signals that warrant human review regardless of amount. Without an ambiguity/fraud escalation path, low-value edge cases with real risk will be processed autonomously anyway. A quarterly report and a marketing statement don't change the actual risk controls, and a rigid threshold with no exceptions removes exactly the flexibility needed to catch those edge cases."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "An e-commerce company allows its Claude-based support agent to issue refunds autonomously for orders under $30. A product manager wants to raise the autonomous refund limit to $500 to reduce support team workload, citing the low error rate seen so far.",
    question: "What should the team do before approving the increase?",
    options: [
      "Approve the increase immediately, since a low observed error rate at the current limit is a reliable predictor of performance at higher amounts",
      "Reject any increase permanently, since refund autonomy is inherently too risky at any dollar level",
      "Run a staged increase with a lower interim cap, monitor error and fraud rates at each stage, and only proceed to $500 if metrics hold, with a documented approval from finance or risk",
      "Increase the limit but only for customers with an account history longer than one year"
    ],
    correct: 2,
    explanation: "A low error rate at $30 says little about behavior at $500 — the risk profile changes with the financial stakes and likely attracts different fraud patterns. A staged rollout with monitoring and a proper approval gate manages that uncertainty responsibly. Approving immediately extrapolates from insufficient evidence; blanket rejection is excessive given the tool has a track record; and an account-age carve-out doesn't address the core question of whether higher-value refunds should be autonomous at all."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A B2B SaaS company's platform team lets any engineer push changes to the production system prompt used by their customer-facing Claude assistant, deploying directly via a shared config file with no review step.",
    question: "What is the most important governance gap to close first?",
    options: [
      "Require all system prompt changes to go through a version-controlled review and approval process before deployment, similar to a code change gate",
      "Restrict system prompt edits to the CEO to ensure accountability",
      "Add a comment field to the config file so engineers can explain their reasoning after deploying",
      "Increase the frequency of full model evaluations to catch prompt-related issues after the fact"
    ],
    correct: 0,
    explanation: "Uncontrolled changes to a production system prompt are effectively uncontrolled changes to how the assistant behaves with real customers, and they need the same change-management discipline as code: review, approval, and traceability before deployment. Routing all changes through one executive doesn't scale and isn't really about competence review. Post-hoc comments and periodic evaluations are detective controls that only catch problems after customers have already been affected."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A manufacturing plant uses a Claude-based system to analyze sensor data and recommend maintenance actions on production equipment. The system currently can autonomously schedule a shutdown for routine maintenance windows, and engineers are proposing it also be allowed to trigger emergency stops on suspected equipment failure.",
    question: "What is the key governance consideration in expanding the system's autonomy to emergency stops?",
    options: [
      "Emergency stops carry higher physical-safety and production-loss stakes than scheduled maintenance, so the expansion should undergo a separate risk assessment with fail-safe design (bias toward stopping, not continuing) rather than being treated as a natural extension of existing scheduling autonomy",
      "Since the system already handles maintenance scheduling reliably, extending it to emergency stops is a low-risk, incremental change",
      "The expansion should be approved as long as the system logs which sensor reading triggered the stop",
      "Emergency stop authority should be granted only during night shifts when fewer engineers are on site"
    ],
    correct: 0,
    explanation: "Scheduled maintenance and emergency stops are not equivalent risk categories — an emergency stop has direct safety and production implications and a different failure cost profile (a false negative could mean injury; a false positive means lost production, which is the safer failure mode to bias toward). Treating it as a routine extension understates the stakes. Logging alone is a detective control, not a safeguard, and restricting to night shifts doesn't address the underlying risk, it just changes who's around to catch a mistake."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A state government agency wants to use Claude to help determine eligibility for a public assistance program, replacing a manual review process that currently has a multi-week backlog. Advocacy groups have raised concerns about accountability if the system wrongly denies benefits to eligible residents.",
    question: "What governance design best balances the agency's efficiency goal with its accountability obligations?",
    options: [
      "Use Claude to pre-screen and prioritize applications with a recommended determination, but require a human caseworker to review and issue the final decision, with a clear, accessible appeal path for applicants",
      "Fully automate eligibility determinations to eliminate the backlog, publishing an FAQ explaining how the system works",
      "Keep the manual process entirely, treating any AI involvement in benefits determinations as unacceptably risky",
      "Automate approvals only, routing all potential denials to human review"
    ],
    correct: 0,
    explanation: "For decisions with significant impact on individuals' welfare and legal entitlements, a human-in-the-loop with a genuine, accessible appeal mechanism is the appropriate control — it captures the efficiency gain from AI-assisted triage while preserving accountability for the actual determination. Full automation removes accountability entirely despite the FAQ. Abandoning AI assistance entirely sacrifices a legitimate efficiency gain unnecessarily. Automating only approvals sounds protective but still autonomously denies eligible people no benefit of human review, which is where the harm advocacy groups are worried about actually occurs."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A corporate legal department uses Claude to review vendor contracts and flag non-standard clauses. Outside counsel has asked why the tool sometimes flags a clause as high-risk without any accompanying explanation of which contract language or precedent drove that assessment.",
    question: "What governance requirement should the legal department add to the tool's use?",
    options: [
      "Require every flagged clause to include a brief explanation citing the specific language and the standard or precedent it deviates from, so reviewers can evaluate the reasoning rather than accept the label at face value",
      "Remove the risk flagging feature entirely and have the tool only summarize contracts",
      "Require outside counsel to independently re-review every contract regardless of what the tool flags, making the tool's output effectively advisory only",
      "Instruct the tool to only flag clauses above a certain length, since longer clauses are more likely to be genuinely non-standard"
    ],
    correct: 0,
    explanation: "Explainability is essential when a tool's output influences legal risk judgments — an unexplained 'high-risk' label can't be responsibly acted on or defended later. Requiring a cited rationale lets reviewers exercise real judgment. Removing the flagging feature discards useful capability instead of fixing the transparency gap; requiring full independent re-review of every contract defeats the purpose of using the tool at all; and flagging by clause length is an arbitrary proxy unrelated to actual risk."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A logistics company's supply chain team is evaluating a third-party vendor that embeds a Claude-based system to auto-generate customs declarations for international shipments. The vendor has declined to share details about how the system was validated or what data it was trained on.",
    question: "What should the procurement and risk team require before signing the contract?",
    options: [
      "Proceed with the contract since customs declarations are a low-risk administrative task",
      "Require the vendor to provide validation evidence, error-rate data, and a defined liability and incident-response arrangement for declaration errors as a condition of the contract, escalating to alternative vendors if they refuse",
      "Sign the contract but require the vendor to indemnify the company only for declarations over $1 million in shipment value",
      "Ask the internal engineering team to independently reverse-engineer the vendor's system before deciding"
    ],
    correct: 1,
    explanation: "Customs declaration errors carry real regulatory and financial exposure, so third-party AI risk management requires vendors to provide evidence of validation and clear accountability for errors before onboarding — a vendor's refusal to provide any of this is itself a red flag. Assuming the task is low-risk misjudges the actual regulatory exposure. A value-based indemnification carve-out leaves most shipments unprotected, and reverse-engineering a vendor's proprietary system is neither practical nor a substitute for proper vendor due diligence."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A media company uses Claude to pre-screen user comments on news articles for policy violations, automatically hiding comments that score above a certain toxicity threshold. Editorial staff have noticed borderline cases are sometimes hidden without any way for the commenter to understand why.",
    question: "What is the most appropriate improvement to the moderation workflow?",
    options: [
      "Lower the toxicity threshold so fewer comments are hidden",
      "Provide commenters with a clear, specific reason when a comment is hidden and a straightforward path to request human review",
      "Remove automated moderation and have all comments reviewed manually",
      "Hide the toxicity score from editorial staff so they can't second-guess the system"
    ],
    correct: 1,
    explanation: "The gap here is transparency and recourse, not the threshold setting itself — users need to understand why content was actioned and have a way to contest it, which is a core responsible-use and escalation design principle. Simply lowering the threshold doesn't address the lack of explanation for borderline cases and may just shift which comments are affected. Removing automation entirely is a disproportionate response to a fixable transparency gap, and hiding the score from staff would reduce their ability to oversee the system, not improve it."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A telecom provider's customer service team uses Claude to handle billing inquiries, which requires the assistant to access customers' account details, including partial payment card numbers and service addresses. A new engineer proposes logging full conversation transcripts, including these details, to a shared analytics dashboard visible to the entire customer experience department.",
    question: "What governance control should be applied to this proposal?",
    options: [
      "Approve the dashboard as proposed, since full transcripts are useful for training and quality review",
      "Apply data minimization and redaction of sensitive fields before transcripts reach any broad-access dashboard, and restrict full-transcript access to a limited set of roles with a legitimate need and audit logging",
      "Block all transcript logging to eliminate any privacy risk",
      "Allow the dashboard but require department-wide training on data handling instead of restricting access"
    ],
    correct: 1,
    explanation: "Broad, unrestricted access to conversations containing sensitive account and payment data violates basic data minimization and least-privilege principles; the fix is to redact sensitive fields for general access and restrict full access to roles with genuine need, with logging for accountability. Approving broad access as-is ignores the exposure; blocking all logging sacrifices legitimate quality and training use cases unnecessarily; and training alone doesn't limit who can actually see sensitive data, it only asks people to be careful with access they shouldn't have."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A regional utility is exploring whether a Claude-based system can autonomously adjust load-balancing parameters on the power grid in response to real-time demand signals, a task currently performed by human grid operators following strict protocols. A failure could cause cascading outages affecting hundreds of thousands of customers.",
    question: "What governance stance should the utility's risk committee take on this proposal?",
    options: [
      "Approve full autonomy since real-time response speed is critical and human operators cannot react as fast as an automated system",
      "Reject any AI involvement in grid operations to avoid the risk entirely",
      "Limit the system to generating recommended adjustments within pre-validated safe operating bounds for human operator confirmation, and only consider narrow, extensively validated autonomous authority for specific well-understood scenarios with hard safety interlocks, after extensive simulation and staged real-world trials",
      "Grant full autonomy but require a human operator to review a log of all adjustments at the end of each shift"
    ],
    correct: 2,
    explanation: "Critical infrastructure with cascading-failure potential demands the most conservative risk tiering: recommendation-with-confirmation as the default, with autonomous authority earned only for narrow, exhaustively validated scenarios behind hard safety interlocks, not granted wholesale for speed. Full autonomy trades catastrophic tail risk for marginal latency gains and ignores that many safety-critical scenarios don't require sub-second reaction. Rejecting AI involvement entirely forfeits legitimate decision-support value. End-of-shift review is a purely after-the-fact control that does nothing to prevent a cascading outage in the moment."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A university is piloting Claude to assist with scoring short-answer exam responses at scale, with the goal of reducing grading turnaround from weeks to days. A faculty senate committee is concerned about consistency and appeal rights for students who believe they were scored unfairly.",
    question: "What governance framework should the university adopt for this pilot?",
    options: [
      "Publish the AI-assisted grading rubric and methodology to students, maintain human faculty review of a statistically meaningful sample of scores each term, and guarantee a human re-grade for any formally appealed score",
      "Deploy the system without disclosure to avoid students gaming the grading criteria",
      "Use the system for grading but withhold appeal rights for AI-assisted assessments, since accepting appeals would undermine confidence in the tool",
      "Require every single score to be independently re-graded by a human before being released, which effectively removes any efficiency benefit but eliminates fairness concerns"
    ],
    correct: 0,
    explanation: "Transparency about methodology, ongoing sampled human oversight, and a guaranteed human path for contested scores together preserve fairness and accountability while still capturing most of the efficiency gain. Hiding the tool's use from students undermines trust and is difficult to justify if discovered. Denying appeal rights specifically for AI-assisted scores creates a two-tier fairness problem that invites legitimate grievance. Re-grading every score by hand defeats the purpose of the pilot rather than managing the risk proportionately."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A property management company wants to use Claude to screen rental applicants by summarizing eviction history, credit reports, and income verification into a recommended accept/decline. A fair housing attorney reviewing the proposal notes that some inputs, like certain address history patterns, can act as proxies for protected characteristics.",
    question: "What should the company do before deploying this tool?",
    options: [
      "Deploy the tool as planned since none of the inputs are explicitly protected characteristics like race or religion",
      "Conduct a proxy-discrimination review of all input features with fair housing counsel, remove or adjust features shown to correlate with protected characteristics without legitimate justification, and test outcomes for disparate impact before and after deployment",
      "Deploy the tool but require a property manager to manually re-decide every decline, leaving accepts fully automated",
      "Avoid the legal question by having the tool only summarize documents without generating any recommendation"
    ],
    correct: 1,
    explanation: "Facially neutral inputs can still function as illegal proxies for protected characteristics, so the correct control is a proactive proxy-discrimination review paired with disparate-impact testing before deployment, not just checking for explicitly named protected fields. Deploying because no field is explicitly protected ignores exactly the risk counsel flagged. Manually re-deciding only declines still leaves a biased accept pattern completely unreviewed. Removing the recommendation and only summarizing avoids the immediate legal question but doesn't actually solve it if the underlying data and eventual human decisions are still influenced by the same biased inputs."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "An HR technology company markets a Claude-based tool that screens resumes and ranks candidates for corporate clients. One client's internal audit finds the tool consistently ranks candidates from a specific set of universities lower, despite comparable qualifications, and asks the vendor to explain.",
    question: "What is the appropriate governance response from the vendor?",
    options: [
      "Explain that ranking differences are expected variation and no further action is needed since the tool doesn't use race, gender, or age as inputs",
      "Conduct a bias audit examining whether the university-based pattern correlates with protected characteristics or produces disparate impact, and remediate the ranking logic or inputs if it does, before continuing to offer the ranking feature to that client",
      "Advise the client to stop looking at ranking output and instead review every resume manually, which defeats the purpose of offering the product",
      "Quietly adjust the ranking weights without informing the client, to avoid a difficult conversation about the audit finding"
    ],
    correct: 1,
    explanation: "A consistent, unexplained scoring pattern tied to a proxy variable like university requires a formal bias audit to determine whether it produces disparate impact on protected groups, followed by remediation if so — this is standard governance for automated employment decision tools. Dismissing it because no protected characteristic is a direct input ignores well-established proxy discrimination risk. Telling the client to abandon the feature doesn't fix the vendor's product for other clients, and silently adjusting weights without disclosure undermines the transparency the client's audit was specifically trying to establish."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A regional non-profit is building a Claude-based assistant to help donors get answers about how their contributions are used. The assistant will have access to a database containing donor names, contact information, and giving history.",
    question: "What is the minimum governance step the non-profit should take before launch?",
    options: [
      "Launch without restriction since donor data is not considered as sensitive as medical or financial records",
      "Define what donor data the assistant may access and disclose, apply access controls and encryption consistent with the organization's broader data privacy policy, and confirm the design doesn't expose one donor's information to another donor's query",
      "Only require donors to agree to a broad terms-of-service update before launch",
      "Anonymize all donor names in the underlying database, which removes any need for further data governance review"
    ],
    correct: 1,
    explanation: "Donor giving history and contact information are still meaningful personal data, and cross-donor exposure is a real risk in any assistant with database access, so scoping access, applying standard protections, and specifically testing for query leakage across records are the baseline governance steps. Treating the data as inherently low sensitivity understates the risk. A terms-of-service update alone doesn't provide technical protection. Anonymizing names doesn't fully de-identify the data if giving history and contact details remain linkable, so it isn't a substitute for proper access controls."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A wealth management firm uses Claude to draft personalized investment commentary that advisors send to clients. Compliance has noticed some drafts include language that could be read as a specific performance guarantee, which is prohibited by industry rules the firm must follow.",
    question: "What governance control best addresses this risk?",
    options: [
      "Require every draft to pass through an automated compliance-language filter and a human compliance reviewer before it can be sent to a client, with the system prompt updated to explicitly prohibit guarantee-like language",
      "Instruct advisors verbally to double-check drafts themselves, without any system-level change",
      "Discontinue use of the tool for any client-facing commentary going forward",
      "Add a general disclaimer at the bottom of every communication stating that past performance doesn't guarantee future results"
    ],
    correct: 0,
    explanation: "Given the tool is generating regulated communications, a layered control — constraining the model's behavior at the prompt level plus a mandatory automated and human compliance check before anything reaches a client — directly addresses the risk of prohibited language reaching clients. Relying only on advisors' informal diligence is unreliable and unenforceable. Discontinuing the tool entirely discards its value over a fixable control gap. A generic disclaimer doesn't cure specific guarantee-like language elsewhere in the same communication and wouldn't satisfy compliance requirements on its own."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A hospital system uses Claude to process patient intake forms and populate the electronic health record. An engineer notices that free-text fields sometimes contain sensitive information, such as details about a patient's immigration status or substance use history, that gets passed through to downstream systems with broader access than the original form had.",
    question: "What should the hospital's governance team require?",
    options: [
      "Require the tool to identify and appropriately restrict access to sensitive categories of information as it structures intake data, aligning downstream access controls with the sensitivity of the extracted content rather than defaulting to broad access",
      "Stop capturing free-text fields altogether to eliminate the risk of sensitive disclosures",
      "Allow the current flow to continue since the information was already in the original patient-submitted form",
      "Require patients to manually flag any sensitive information themselves before submitting the form"
    ],
    correct: 0,
    explanation: "The risk isn't that sensitive data exists, it's that structuring the data widened its access footprint beyond what the original narrower form had — the fix is ensuring downstream access controls track the sensitivity of extracted content. Eliminating free-text fields sacrifices clinically useful information to avoid a solvable problem. Arguing the data was already present ignores that the actual harm is the expanded access scope, and asking patients to self-flag sensitive content is unreliable and shifts a system design responsibility onto individuals who may not know what counts as sensitive."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "An insurance company is designing risk tiers for a new Claude-based underwriting assistant. Life insurance applications above a certain coverage amount, or involving applicants with complex medical histories, would traditionally require senior underwriter review.",
    question: "How should the company set the boundary for autonomous versus human-reviewed underwriting decisions?",
    options: [
      "Base the tier boundary on financial exposure and case complexity, keeping high coverage amounts and applicants with complex or ambiguous medical histories in human-reviewed tiers regardless of how well the model performs on routine cases",
      "Base the tier boundary purely on the model's measured accuracy on a historical test set, moving any case type where accuracy exceeds 95% into the autonomous tier",
      "Allow full autonomy for all applications to maximize processing speed, since underwriting delays hurt customer satisfaction",
      "Require senior underwriter review for every application regardless of complexity, since underwriting is inherently high-stakes"
    ],
    correct: 0,
    explanation: "Risk tiering for high-stakes financial decisions should be anchored to exposure and complexity, not just aggregate model accuracy — a 95% accuracy figure can still mask systematic failure on the specific complex cases that most need judgment, and a wrong decision on a high-coverage complex case carries outsized cost. Using accuracy alone as the sole gate risks moving exactly the wrong cases into autonomy. Full autonomy for speed ignores exposure entirely. Requiring human review of every case discards the legitimate efficiency benefit for genuinely routine, low-complexity applications."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An online retailer uses Claude to set promotional discount prices in real time based on inventory levels and demand signals. A journalist has published an article suggesting the pricing algorithm charges different prices to customers based on their location and device type, alleging exploitative pricing practices.",
    question: "What should the retailer's risk and governance team do first?",
    options: [
      "Issue a public statement denying differential pricing without first verifying what the system is actually doing",
      "Audit the pricing system's actual behavior against the specific inputs used, distinguish legitimate demand-based pricing from patterns that could be seen as exploitative or discriminatory, and prepare a substantiated, transparent response before engaging publicly",
      "Immediately disable dynamic pricing company-wide without investigating, to avoid further reputational damage",
      "Direct the communications team to focus messaging on the benefits of dynamic pricing for customers, without addressing the specific allegation"
    ],
    correct: 1,
    explanation: "Before any public response, governance requires actually verifying what the system is doing against the allegation — the reputational risk here is real regardless of whether the article is fully accurate, and responding without facts risks a worse outcome if the claim is later substantiated. Denying without verification risks a credibility-destroying reversal. Shutting the system off entirely is a disproportionate reaction before the facts are known. Deflecting to general messaging without addressing the specific allegation looks evasive and doesn't resolve the underlying question of whether a real problem exists."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A mid-size SaaS company wants to give employees broad access to an internal Claude-based assistant that can query production customer data to answer support and analytics questions. Currently there is no formal policy governing who can use the assistant for what purposes.",
    question: "What should the company establish first?",
    options: [
      "A responsible-use policy defining approved use cases, data access boundaries by role, and prohibited uses, paired with access provisioning tied to that policy, before broad rollout",
      "A single company-wide announcement encouraging responsible use, trusting employees to self-regulate",
      "Unrestricted access for all employees, since internal tools are lower risk than customer-facing ones",
      "Access limited only to the engineering team, since they are best equipped to use the tool correctly"
    ],
    correct: 0,
    explanation: "Before granting broad access to a tool that can query production customer data, an organization needs a defined responsible-use policy with role-based access boundaries and enforcement through actual provisioning — not just guidance. A general announcement relies entirely on voluntary compliance with no enforcement mechanism. Unrestricted access ignores that internal tools touching customer data still carry real privacy and misuse risk. Restricting to engineering alone doesn't reflect actual business need and isn't really a policy, just an arbitrary access limitation."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A factory's quality control system uses Claude to analyze images of finished products and flag defects for rework. Line supervisors want to give the system authority to autonomously halt the production line when defect rates spike above a threshold, rather than just alerting a human.",
    question: "What governance consideration should determine whether this authority is granted?",
    options: [
      "Whether halting the line autonomously creates greater downside than a brief delay in human response, weighed against the cost of continuing to produce defective units, with a clearly defined and tested threshold and an easy human override",
      "Whether the system has ever incorrectly flagged a defect in testing, since any false positive disqualifies it from receiving this authority",
      "Whether supervisors are available around the clock to react to alerts within a few minutes",
      "Whether the factory has cameras with sufficiently high image resolution"
    ],
    correct: 0,
    explanation: "The right framework weighs the asymmetric costs of the two failure modes — a false halt costs some production time, while continuing to produce defective units at scale can cost far more — and grants autonomy only with a validated threshold and a fast override. Disqualifying the system for any historical false positive is an unreasonably strict bar that no real-world system would clear, and it ignores that the real question is cost tradeoff, not perfection. Supervisor availability and camera resolution are relevant engineering details but don't answer the governance question of whether autonomous stop authority is the right design."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A state agency deployed a Claude-based chatbot to answer citizen questions about unemployment benefits. During a period of high call volume, the chatbot began confidently providing incorrect eligibility guidance that was later traced to an unreviewed update pushed to its knowledge base three days earlier.",
    question: "What incident response governance gap does this scenario reveal?",
    options: [
      "There is no requirement to review and validate knowledge base updates before they affect production guidance, and no monitoring in place to detect a shift in the chatbot's accuracy",
      "The agency should not have used a chatbot for unemployment benefits guidance under any circumstances",
      "The call volume spike itself was the root cause and should be addressed through additional staffing",
      "The chatbot needs a more advanced model to avoid making this kind of error in the future"
    ],
    correct: 0,
    explanation: "The actual failure chain was an unreviewed content update reaching production, combined with no monitoring that would have caught degraded answer accuracy before it affected large numbers of citizens — both are change-management and monitoring gaps, not model capability issues. Concluding the chatbot should never have been used is an overcorrection that ignores the specific, fixable root cause. Blaming call volume misdiagnoses the actual trigger, which was the bad update, not the traffic. A more advanced model wouldn't fix a governance failure where incorrect information was never caught before or after deployment."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A law firm uses Claude to assist with e-discovery, identifying documents that may be subject to attorney-client privilege before producing files to opposing counsel. A partner is concerned about the consequences of the tool missing a privileged document.",
    question: "What control should the firm implement to manage this risk?",
    options: [
      "Rely on the tool's output as final, since manual privilege review at this document volume is not practical",
      "Use the tool to prioritize and pre-screen documents, but require a qualified attorney to review and confirm every document flagged as non-privileged before production, especially documents near the classification boundary",
      "Produce all documents to opposing counsel and rely on a clawback agreement to retrieve any privileged material sent by mistake",
      "Have the tool flag documents as privileged or not, and only require attorney review for documents flagged as privileged"
    ],
    correct: 1,
    explanation: "Because a missed privileged document is a serious and difficult-to-reverse harm, the correct control keeps a qualified attorney in the loop specifically on non-privileged determinations, where an error causes actual disclosure, and pays particular attention to borderline cases. Treating the tool's output as final removes human oversight from exactly the highest-consequence decision. Producing everything and relying on clawback treats a preventable error as an acceptable and easily reversible one, which it often isn't in practice. Reviewing only documents flagged as privileged inverts the risk — it leaves the actual error path, documents wrongly flagged as non-privileged, completely unchecked."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A freight logistics company uses Claude to optimize delivery routes in real time, including decisions about which routes to prioritize during severe weather. During a recent storm, the system routed several trucks through an area with reported road closures because its map data hadn't been updated.",
    question: "What governance improvement most directly addresses the failure mode in this incident?",
    options: [
      "Require the routing system to flag decisions made using data older than a defined freshness threshold, and require human dispatcher confirmation for any route through a flagged high-risk condition like severe weather",
      "Discontinue automated routing entirely and revert to fully manual dispatch",
      "Increase the frequency of driver safety training on severe weather driving",
      "Add a general disclaimer to drivers that routes may not reflect current road conditions"
    ],
    correct: 0,
    explanation: "The root cause was the system acting confidently on stale data in a safety-relevant condition without any freshness check or human confirmation — the fix is a data-currency safeguard paired with mandatory human confirmation specifically for high-risk conditions like active severe weather. Reverting to fully manual dispatch discards the tool's value to fix a specific, addressable gap. Driver training doesn't address that the system, not the driver, made the flawed routing decision. A generic disclaimer doesn't change the system's behavior and just shifts risk onto drivers without giving them better information."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A streaming media company uses Claude to generate personalized content recommendations. A researcher publishes findings that the recommendation system disproportionately promotes sensational or polarizing content because that content correlates with higher engagement in the training signal.",
    question: "What is the appropriate governance response for the company's trust and safety team?",
    options: [
      "Dismiss the findings since maximizing engagement is the system's intended business objective",
      "Evaluate whether engagement-only optimization is creating reputational and societal risk disproportionate to its business benefit, and consider incorporating content-quality or diversity constraints into the recommendation objective, with executive and board visibility into the tradeoff",
      "Quietly adjust the recommendation algorithm without any internal escalation or documentation, to avoid drawing further attention",
      "Respond only with a public relations statement addressing the researcher's methodology, without examining the system's actual behavior"
    ],
    correct: 1,
    explanation: "This is a case where a system is technically achieving its stated objective but creating real reputational exposure, and that tradeoff needs deliberate evaluation with visibility at the level that can weigh business and reputational risk, not a purely technical fix or a communications-only response. Dismissing it because engagement is the stated goal ignores that goals can produce unacceptable side effects at scale. Making silent changes without escalation or documentation fails basic governance transparency. Responding only through PR without examining the actual system behavior treats a substance problem as if it were only a perception problem."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A telecom's call center uses Claude to transcribe and summarize customer service calls for quality assurance. A compliance officer points out that certain jurisdictions where the company operates require specific consent language before a call can be recorded and processed by an automated system, and current call scripts don't include it.",
    question: "What should the company do?",
    options: [
      "Continue operations as-is since the recording itself, not the AI processing, is what triggers consent requirements",
      "Update call scripts to include the jurisdiction-appropriate consent language before recording begins, and restrict automated transcription and summarization to calls where valid consent was captured",
      "Add consent language only to written terms of service, since verbal disclosure during the call would slow down call handling",
      "Pause the automated summarization feature only in jurisdictions with the strictest requirements, while continuing elsewhere without changes"
    ],
    correct: 1,
    explanation: "The compliant approach is to actually update the call flow so proper consent is captured before recording and processing begins, and to gate the AI features on that consent being present. Assuming AI processing doesn't trigger the requirement contradicts what the compliance officer specifically flagged. Burying consent in written terms of service doesn't satisfy a requirement for consent language delivered on the call itself. Pausing only in the strictest jurisdictions leaves the company non-compliant everywhere else the requirement still applies, just less visibly."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A regional utility uses Claude to help draft mandatory incident reports to a safety regulator following equipment malfunctions. An engineer discovers that a recent report, generated with AI assistance and reviewed only for grammar, omitted a contributing factor that appeared in the underlying incident data.",
    question: "What governance control should the utility add to this reporting process?",
    options: [
      "Require a subject matter expert to substantively review AI-drafted regulatory reports against the underlying incident data for completeness and accuracy, not just for grammar and tone, before submission",
      "Discontinue AI assistance for regulatory reports entirely, since the omission shows the tool cannot be trusted for this purpose",
      "Add a standard disclaimer to submitted reports noting that portions were AI-generated",
      "Require the engineer who filed the original incident data to co-sign the report without changing the review process itself"
    ],
    correct: 0,
    explanation: "The gap is that review only checked grammar and tone, not substantive completeness against the source data — for mandatory regulatory filings, review needs to verify the content itself, which a subject matter expert is positioned to do. Discontinuing AI assistance entirely is an overreaction to a fixable review-process gap rather than a fundamental tool limitation. A disclaimer doesn't fix the underlying completeness problem or satisfy the regulator's need for an accurate report. Adding a co-signature without changing what's actually reviewed doesn't add any real substantive check."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "An online learning platform uses Claude to provide personalized tutoring feedback to students, including detailed data about each student's mistakes, pace, and areas of struggle. A parent group asks how long this data is retained and who can access it.",
    question: "What should the platform's data governance policy specify?",
    options: [
      "Data should be retained indefinitely by default, since more historical data improves personalization over time",
      "A defined retention period tied to legitimate educational purposes, clear role-based access limits, and a documented basis for any third-party sharing, communicated transparently to parents and students",
      "Only the requirement that data be stored on encrypted servers, since encryption addresses any retention or access concerns",
      "No formal policy is needed as long as the platform's terms of service mention data collection in general terms"
    ],
    correct: 1,
    explanation: "Sound data privacy governance for student data requires an explicit retention period grounded in actual educational purpose, clear limits on who can access it, transparency about any third-party sharing, and clear communication to the people whose data it is — encryption and vague terms-of-service language don't answer any of those questions. Indefinite retention by default is inconsistent with data minimization principles. Encryption addresses confidentiality in transit or at rest but says nothing about how long data is kept or who has access to it once decrypted. General terms-of-service language doesn't meet the specificity that data subjects and regulators typically expect for retention and access practices."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A residential property management company uses Claude to draft responses to tenant maintenance complaints and automatically dispatch a work order. Some complaints describe conditions that could constitute a habitability violation with legal implications, but the system currently treats all complaints the same way.",
    question: "What change should the company make to its escalation design?",
    options: [
      "Have the system detect language patterns indicating potential habitability or safety issues and route those specific complaints to a property manager for human review and legal consultation, rather than fully automated dispatch",
      "Continue automated handling for all complaints, since a work order is generated in every case regardless of severity",
      "Require every tenant complaint of any kind to be handled entirely by a human property manager",
      "Add a standard response template acknowledging all complaints, without changing how work orders are dispatched"
    ],
    correct: 0,
    explanation: "Complaints signaling a potential habitability or safety violation carry legal exposure that a routine work order doesn't address, so those specific cases need to be identified and escalated to a human with appropriate context, while routine complaints can remain automated. Treating all complaints identically ignores that legal risk differs meaningfully by complaint type. Requiring full human handling of every complaint discards the legitimate efficiency benefit for the many complaints that genuinely are routine. A response template addresses tone but not the substantive escalation gap."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A large employer is considering using a Claude-based system to flag employees for performance improvement plans based on productivity metrics, with a design that would let managers finalize a termination recommendation directly from the tool's flag without additional review steps.",
    question: "What is the most significant governance concern with this proposed design, and what should be required instead?",
    options: [
      "The design collapses an automated productivity signal directly into an employment termination decision without independent human judgment, documentation of alternative explanations, or a bias review of the underlying metrics; a mandatory multi-factor human review process, informed by but not driven solely by the tool's flag, should be required before any termination decision",
      "The design is acceptable as long as the productivity metrics used are objective and not self-reported by the employee",
      "The main concern is that managers may not trust the tool's recommendations, so the priority should be improving manager confidence in the flag through additional training",
      "The design should be approved with the addition of a standard termination notice template referencing the productivity data"
    ],
    correct: 0,
    explanation: "Termination has severe, hard-to-reverse consequences for an individual, and productivity metrics alone routinely miss context, are vulnerable to measurement bias, and shouldn't function as a direct pipeline to a termination decision without independent human judgment, documented consideration of alternative explanations, and scrutiny of the underlying metrics for bias. Calling metric objectivity sufficient ignores that even 'objective' metrics can encode bias or miss legitimate context. Framing the issue as manager trust misdiagnoses the actual risk, which is inadequate process, not insufficient confidence in the tool. A notice template addresses documentation formality, not the substantive lack of independent review this design is missing."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A local non-profit uses Claude to help draft background check summaries for prospective volunteers who will work directly with children. The organization wants to fully automate the accept/decline decision to speed up onboarding.",
    question: "What governance principle should guide the organization's decision?",
    options: [
      "Full automation is appropriate since background check criteria are typically clear-cut rules",
      "Given the vulnerable population involved and the consequences of a wrong decision, a qualified staff member should make the final accept/decline determination, using the tool to summarize and organize information rather than to decide autonomously",
      "The organization should discontinue background checks altogether if a human must review every case, since that removes the intended efficiency gain",
      "Automation is appropriate for volunteers under a certain number of hours per week, since their exposure to children is more limited"
    ],
    correct: 1,
    explanation: "When decisions involve the safety of a vulnerable population, the appropriate design uses the tool to support and accelerate a human decision rather than to make the decision autonomously — the stakes of an erroneous decline or, worse, an erroneous accept, are too high to fully delegate. Assuming clear-cut rules make full automation safe overlooks that background check records often require judgment about ambiguous or dated information. Discontinuing checks entirely misunderstands the tradeoff; a human-reviewed but AI-assisted process still delivers meaningful speed gains. Carving out an hours-based exception ignores that any direct contact with children carries real risk regardless of hours."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A bank's risk management team is preparing a quarterly report to the board on its Claude-based systems used across lending, fraud detection, and customer service. The current draft report simply lists the number of AI systems in production with a green status indicator for each.",
    question: "What should the risk team add to make this board reporting adequate for effective oversight?",
    options: [
      "Nothing; a simple status list is sufficient since the board is not expected to understand technical details",
      "For each system, a plain-language summary of what decisions it influences, its risk tier, key performance and fairness metrics with trends, any incidents or near-misses since the last report, and outstanding governance actions",
      "A single overall risk score for the entire AI program, combining all systems into one number so the board can assess the program at a glance",
      "A live technical dashboard link so board members can review raw system logs themselves during the meeting"
    ],
    correct: 1,
    explanation: "Effective board-level risk reporting needs enough substance for the board to exercise real oversight: what's at stake for each system, how risk is being tiered and managed, trend data, and any incidents — a green-light list gives the appearance of oversight without the substance. Assuming the board doesn't need this detail undermines their actual governance responsibility. A single blended score across dissimilar systems (lending, fraud, customer service) obscures more than it reveals since it treats very different risk profiles as fungible. Handing board members raw logs replaces synthesized reporting with an unusable amount of raw data that doesn't support decision-making in a board setting."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A behavioral health provider is piloting a Claude-based chat tool that offers support to patients between therapy sessions. During testing, the tool handled a message describing passive suicidal ideation by offering generic coping suggestions rather than escalating to a crisis protocol.",
    question: "What governance requirement is most critical before this tool can be used with real patients?",
    options: [
      "A validated, reliably triggered escalation protocol that routes any message indicating self-harm or crisis risk to a human clinician or crisis line immediately, tested extensively against realistic and varied phrasings before any patient-facing deployment",
      "A disclaimer in the app stating that the tool is not a substitute for professional care, added to the terms of service",
      "A feature allowing patients to manually request to speak to a human, without changing how the tool responds by default",
      "Restricting use of the tool to daytime hours when clinical staff are more likely to be available"
    ],
    correct: 0,
    explanation: "For a tool interacting with patients on sensitive mental health topics, reliable, well-tested crisis escalation is the non-negotiable safety control — a missed or generic response to indicators of self-harm risk is a severe, potentially life-threatening failure mode that must be addressed before any real patient uses the tool. A terms-of-service disclaimer doesn't change the tool's actual behavior in a crisis. Relying on the patient to manually ask for a human assumes the exact judgment and initiative that may be most impaired during a crisis. Restricting to daytime hours doesn't address the core detection and escalation failure and simply narrows, without closing, the window of risk."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An insurance company uses Claude to help set individualized premium adjustments based on updated risk data. Some customers have complained that their premiums increased with no clear explanation, and customer service representatives say they don't have access to the specific factors driving the change.",
    question: "What governance improvement should the company make?",
    options: [
      "Provide customer service representatives with a clear, specific breakdown of the factors driving each premium change, and disclose the primary drivers to customers in adjustment notices, consistent with applicable disclosure requirements",
      "Discontinue the practice of individualized premium adjustments and return to a flat rate structure for all customers",
      "Instruct customer service representatives to tell customers the adjustment is due to 'standard actuarial review' regardless of the actual cause",
      "Make the underlying pricing model fully open-source and public so any customer can inspect it directly"
    ],
    correct: 0,
    explanation: "The core issue is a lack of explainability reaching both frontline staff and customers, so equipping representatives with the actual drivers and disclosing them appropriately to customers addresses the real gap while preserving individualized pricing. Abandoning individualized pricing entirely is a disproportionate response to a transparency problem, not a pricing methodology problem. Giving representatives a generic, inaccurate explanation to repeat is a compliance and trust risk in its own right. Open-sourcing the full pricing model publicly is unnecessary and could create competitive and gaming risks well beyond what's needed to fix customer-facing transparency."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A mid-size e-commerce company gives its Claude-based inventory assistant the ability to autonomously place reorders with suppliers when stock falls below a threshold. A finance director asks what spending controls exist on this capability.",
    question: "What control should be in place for this use case?",
    options: [
      "No specific control is needed since restocking inventory is a routine, low-risk operational task",
      "A defined autonomous spending cap per order and per time period, with orders above the cap routed for human approval, plus monitoring for unusual ordering patterns",
      "Require the finance director to personally approve every reorder regardless of size",
      "Remove supplier ordering capability from the assistant entirely and revert to a fully manual process"
    ],
    correct: 1,
    explanation: "Even a routine operational task involving real spending needs a bounded autonomy design: caps that route larger or unusual orders for approval, combined with anomaly monitoring, balance efficiency against financial risk. Treating it as needing no control ignores that an error or manipulation of the reorder logic could cause significant unplanned spend. Requiring the finance director's personal approval for every order eliminates the efficiency benefit and doesn't scale. Reverting to a fully manual process abandons the capability rather than governing it proportionately."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A software company allows employees to connect third-party plugins to its internal Claude-based assistant, including a code-execution plugin and a plugin that can send emails on the employee's behalf. Currently, any employee can enable any available plugin without approval.",
    question: "What governance control is most needed here?",
    options: [
      "A tiered approval process for plugin access based on the plugin's capability and risk (e.g., read-only tools approved broadly, code execution and outbound communication tools requiring security review and role-based restriction)",
      "A blanket ban on all third-party plugins to eliminate risk",
      "A requirement that employees read a terms-of-use document before enabling any plugin, with no other restriction",
      "Allow all plugins but require IT to be copied on all outbound emails sent through the email plugin"
    ],
    correct: 0,
    explanation: "Not all plugins carry the same risk — code execution and unsupervised outbound communication have materially higher potential for harm than a read-only lookup tool, so access should be tiered and reviewed according to actual capability and risk rather than treated uniformly. A blanket ban forfeits legitimate productivity value from lower-risk plugins. A terms-of-use acknowledgment with no technical restriction provides no real control over what high-risk plugins can actually do. Copying IT on outbound emails is a narrow, after-the-fact partial mitigation for only one plugin's risk and does nothing about code execution or the broader approval gap."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A manufacturing plant is expanding the autonomous authority of its robotic safety system, which uses Claude to interpret sensor input and decide whether to slow, pause, or fully shut down a robotic arm near human workers. The engineering team wants to remove a previous requirement for redundant sensor confirmation, arguing it slows response time.",
    question: "What should the safety governance review conclude?",
    options: [
      "Approve the change, since faster response time reduces the chance of an incident occurring in the first place",
      "Reject removing redundant sensor confirmation for a safety-critical system interacting with human workers; the marginal latency savings do not justify the increased risk of an undetected sensor failure or false reading going unchecked in a system that can cause physical harm",
      "Approve the change only during hours when fewer workers are present on the floor",
      "Approve the change but require the plant to purchase additional liability insurance"
    ],
    correct: 1,
    explanation: "For a system with direct physical safety consequences, redundancy is a defense against a single faulty sensor reading causing a bad decision, and the safety value of that redundancy typically outweighs a small latency improvement — removing it increases the chance of an undetected failure directly harming a worker. Approving for speed ignores that faster wrong decisions are still wrong decisions in a safety-critical context. Restricting to lower-occupancy hours doesn't address the underlying reliability degradation, it only reduces exposure. Buying more insurance addresses financial consequences after an incident, not preventing the incident itself, which is the actual governance objective."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A city government's public-facing Claude-based chatbot, intended to answer questions about municipal services, was found by a local reporter to have confidently provided inaccurate information about voter registration deadlines during an election cycle.",
    question: "What governance response should the city prioritize?",
    options: [
      "Issue a correction, conduct a review of what other high-stakes topics the chatbot handles (elections, benefits, legal deadlines) and apply extra validation, human review, or restriction to those topics specifically, and establish faster incident response for future factual errors on sensitive topics",
      "Take no action since the chatbot is only one of several information channels the city provides",
      "Shut down all city digital services, including unrelated ones, out of an abundance of caution",
      "Add a general disclaimer that information may be inaccurate, without changing anything about how election-related questions are handled"
    ],
    correct: 0,
    explanation: "Errors on topics like voter registration deadlines carry outsized civic consequences, so the response needs to both correct the immediate error and identify other high-stakes topic areas warranting tighter validation or restriction, plus a faster path to catch and correct future errors. Taking no action ignores real harm from misinformation on a time-sensitive civic matter. Shutting down unrelated digital services is a wildly disproportionate response that doesn't target the actual problem. A generic disclaimer doesn't reduce the likelihood of the error recurring or address the specific high-stakes topic that caused the incident."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A legal services startup markets a Claude-based tool that generates draft wills and basic estate planning documents directly for consumers, with no attorney involved in the process. A consumer protection regulator has opened an inquiry into whether the product constitutes unauthorized practice of law in several jurisdictions.",
    question: "What governance issue should the startup's leadership have addressed before launch?",
    options: [
      "Whether the product's use of AI made the documents fast enough to generate to be commercially viable",
      "Whether generating legally binding personal documents without attorney involvement, oversight, or jurisdiction-specific review created regulatory and consumer-harm exposure that required either attorney-in-the-loop review or a clearly scoped, jurisdiction-validated legal disclaimer and product design from the outset",
      "Whether the underlying model was the most cost-effective option compared to competitors",
      "Whether the documents were stored securely after generation"
    ],
    correct: 1,
    explanation: "The fundamental governance question before launch was whether fully autonomous generation of binding legal documents, without any attorney review and without accounting for jurisdiction-specific legal requirements, exposed both consumers and the company to serious harm and regulatory risk — that needed to be resolved through either human legal review in the workflow or careful, validated scoping of the product, not addressed after a regulator opened an inquiry. Generation speed and vendor cost comparisons are commercial considerations, not the governance issue at the heart of the regulatory inquiry. Document storage security is a legitimate but separate concern from the unauthorized-practice-of-law exposure that's actually driving this inquiry."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A trucking company equips vehicles with a Claude-based system that analyzes in-cab camera footage to detect drowsy or distracted driving and alert dispatch. Drivers' union representatives have raised concerns about how this footage and the resulting behavioral assessments are used beyond the immediate safety purpose.",
    question: "What governance step should the company take to address this concern responsibly?",
    options: [
      "Continue using the footage however management sees fit, since safety monitoring is a legitimate business interest that overrides individual privacy concerns",
      "Define and document a clear, limited purpose for the footage and its analysis (safety alerting), restrict retention and secondary use (e.g., performance reviews, disciplinary action unrelated to safety) unless separately justified and disclosed, and communicate this scope to drivers",
      "Discontinue the safety monitoring system entirely in response to the concern",
      "Give drivers the ability to disable the camera system at their own discretion during shifts"
    ],
    correct: 1,
    explanation: "Purpose limitation is the core governance principle here: monitoring introduced for safety shouldn't silently expand into other uses like general performance evaluation without separate justification and disclosure — defining and communicating that scope directly addresses the union's concern while preserving the legitimate safety function. Treating safety interest as an unlimited license for any use ignores real privacy and trust concerns. Discontinuing the system entirely sacrifices a genuine safety benefit to avoid a governance problem that has a more targeted fix. Letting drivers disable the system at will defeats its safety purpose rather than addressing the actual data-use concern raised."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A journalism outlet uses Claude to assist reporters with fact-checking claims in draft articles before publication. An editor discovers that a reporter published a story where an AI-flagged fact-check discrepancy was overridden and the original, incorrect claim ran anyway, without any record of why.",
    question: "What governance control should the outlet add to its editorial workflow?",
    options: [
      "Discontinue AI-assisted fact-checking since it clearly failed to prevent the error",
      "Require that any decision to publish content despite an AI-flagged discrepancy be documented with the reason and reviewed by a senior editor before publication",
      "Require the AI tool to automatically block publication of any flagged claim, removing human discretion from the decision entirely",
      "Add a retroactive corrections process only, without changing the pre-publication workflow"
    ],
    correct: 1,
    explanation: "The failure here isn't that the tool missed the error, it caught it — the failure is that a human override happened with no accountability trail and no additional review. Requiring documentation and senior editor sign-off for any override preserves editorial judgment while adding real accountability. Discontinuing the tool blames the wrong part of the process, since the tool worked correctly. Removing human discretion entirely goes too far in the other direction and isn't appropriate for editorial judgment calls, which sometimes legitimately involve nuance the tool can't capture. A corrections process addresses harm after publication but does nothing to prevent the same override pattern from recurring."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A telecommunications company's fraud detection system, powered by Claude, can autonomously suspend a customer's account when it detects patterns consistent with SIM-swap fraud. Customer complaints have risen about legitimate customers being locked out of their accounts, sometimes during emergencies, with no fast way to reach a human.",
    question: "What governance improvement should the company make?",
    options: [
      "Disable the autonomous suspension capability entirely, since any false positive is unacceptable in a service this critical",
      "Keep the system as-is, since account suspension is a necessary and effective anti-fraud measure",
      "Maintain autonomous suspension for genuinely high-confidence fraud signals, but require a rapid, clearly accessible human-reachable reinstatement path with an expedited verification process, and monitor and tune the false-positive rate over time",
      "Require law enforcement notification before any account can be suspended"
    ],
    correct: 2,
    explanation: "The right balance keeps the legitimate fraud-prevention value of autonomous suspension for strong signals while fixing the actual harm being reported: no fast way back in for wrongly suspended legitimate customers, especially during emergencies. Disabling the capability entirely sacrifices real fraud protection to fix a recourse problem that has a more targeted solution. Leaving it unchanged ignores a real customer-harm pattern that's already generating complaints. Requiring law enforcement notification before any suspension would be operationally unworkable and doesn't address the actual gap, which is reinstatement speed for wrongly flagged customers."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "An energy company is updating its change management policy for AI systems that control critical infrastructure components. Currently, updates to the Claude-based monitoring and control system are deployed by the vendor directly to production with the company notified only after the fact.",
    question: "What should the updated policy require?",
    options: [
      "Continue post-hoc notification, since the vendor has deep technical expertise and is best positioned to decide when updates are safe",
      "Require the vendor to submit proposed changes for the company's technical and risk review, including testing in a non-production environment representative of actual operating conditions, with explicit company approval required before any change reaches the production system",
      "Require notification within 24 hours of deployment instead of the current unspecified timeframe, without changing the approval process itself",
      "Terminate the vendor relationship and build the monitoring and control system in-house"
    ],
    correct: 1,
    explanation: "For a system controlling critical infrastructure, changes need a formal pre-deployment gate — validated testing plus explicit customer approval before production deployment — regardless of vendor expertise, because the operator, not the vendor, bears the consequences of an infrastructure failure. Continuing post-hoc notification leaves the company with no ability to prevent a bad change before it causes harm. Simply tightening the notification timeframe still leaves approval entirely with the vendor and doesn't add a real gate. Terminating the vendor relationship is a drastic, costly overcorrection when the actual fix is a governance process change, not a vendor change."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A university admissions office is considering using a Claude-based tool to flag application essays that show signs of being AI-generated, with a flagged essay resulting in automatic disqualification of the application.",
    question: "What is the primary governance risk with this proposed design?",
    options: [
      "AI-generated-text detection is known to be unreliable and can produce false positives, especially for non-native English speakers and certain writing styles, so automatic disqualification based solely on a flag risks serious, hard-to-appeal harm to legitimate applicants",
      "The tool might be too slow to process the volume of applications during peak admissions season",
      "The tool may not be able to detect AI-generated essays written using older AI models",
      "Using the tool creates additional server costs that should be budgeted for separately"
    ],
    correct: 0,
    explanation: "The central governance risk is a known-unreliable detection signal being wired directly into an automatic, high-stakes, difficult-to-reverse consequence — a false positive could unfairly disqualify a legitimate applicant, and certain writing patterns are known to trigger false flags disproportionately. Processing speed and detection coverage against older models are legitimate operational questions but far less consequential than the fairness and due-process risk of automatic disqualification. Server cost is an unrelated budgeting consideration, not a governance risk."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A property management company's Claude-based assistant handles tenant complaints, including some that involve accusations against other tenants or staff, such as harassment claims. The assistant currently responds to all complaint types with the same automated acknowledgment and ticketing workflow.",
    question: "What change should be made to how sensitive complaints are handled?",
    options: [
      "Treat all complaints identically to avoid the appearance of favoritism between complaint types",
      "Detect complaints involving allegations against individuals, such as harassment, and route them immediately to a human staff member trained to handle sensitive personnel or interpersonal matters, rather than standard automated ticketing",
      "Require tenants to submit sensitive complaints via a separate paper form instead of the digital system",
      "Automatically forward all complaints, sensitive or not, to the company's legal department"
    ],
    correct: 1,
    explanation: "Complaints alleging harassment or misconduct against specific individuals carry legal and interpersonal sensitivity that a routine automated ticketing workflow isn't equipped to handle appropriately, so they should be identified and escalated to a trained human. Treating all complaints identically ignores meaningfully different risk and handling needs. Forcing sensitive complaints onto paper forms creates an access barrier and doesn't guarantee appropriate handling once received. Forwarding every complaint to legal, sensitive or not, is inefficient and misallocates legal review to routine matters that don't need it."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A large retailer's internal audit team discovers that an employee used the company's Claude-based assistant, which had been granted broad internal document access for legitimate work purposes, to search for and read confidential compensation data about coworkers unrelated to their job duties.",
    question: "What governance gap does this incident primarily reveal?",
    options: [
      "The assistant's underlying model needs to be replaced with a more advanced version",
      "Access to the assistant was not properly scoped to the specific data an individual employee's role required, and there was no monitoring in place to detect anomalous or out-of-scope query patterns",
      "The employee should be the only party held accountable, with no changes needed to the system's access design",
      "The assistant needs a stronger content filter to block profanity and offensive language in its outputs"
    ],
    correct: 1,
    explanation: "This is a classic least-privilege failure: the assistant had broader data access than the employee's role required, and there was no anomaly monitoring to catch clearly out-of-scope querying behavior — both are access governance gaps, not model capability issues. Replacing the underlying model wouldn't address an access control problem. Treating this as solely an individual accountability issue ignores that the system design itself enabled the misuse and needs to change regardless of one incident. A content filter for offensive language is unrelated to the actual failure, which was inappropriate data access, not inappropriate output content."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A non-profit that coordinates disaster relief wants to share beneficiary data, including names, locations, and needs assessments, with partner organizations through a Claude-based coordination tool to avoid duplicate aid delivery. Some partner organizations operate in regions where data about certain populations could create serious safety risks if it fell into the wrong hands.",
    question: "What governance step is essential before enabling this data sharing?",
    options: [
      "Share full beneficiary data with all partners uniformly, since duplicate aid delivery is itself a serious operational failure that data sharing would solve",
      "Conduct a data sensitivity and partner risk assessment, sharing only the minimum data necessary for coordination (e.g., de-identified or aggregated indicators where possible) with each partner based on their specific need and the security risk in their operating context",
      "Avoid sharing any beneficiary data with any partner, accepting the risk of duplicate aid delivery as the lesser harm",
      "Require every partner organization to sign a general confidentiality agreement, with no other change to what data is shared or with whom"
    ],
    correct: 1,
    explanation: "In a high-risk operating environment, the correct approach is data minimization calibrated to actual coordination need and partner-specific risk, sharing identifying details only where genuinely necessary and using de-identified or aggregated data elsewhere — a blanket approach in either direction (share everything or share nothing) fails to account for real variation in both need and risk. Sharing full data uniformly ignores that identifying certain populations could create serious physical safety risk in some contexts. Refusing to share anything sacrifices a legitimate and important coordination benefit. A confidentiality agreement alone doesn't reduce what data is exposed if a partner's systems are compromised or their staff misuse it."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A regional bank's risk committee is considering expanding the scope of a Claude-based system used for internal stress testing analysis, moving from advisory support for the risk modeling team to generating figures that could go directly into regulatory stress test submissions with only light review.",
    question: "What should the risk committee require before approving this expansion?",
    options: [
      "Approve the expansion since the system has performed well in its advisory role so far",
      "A formal risk assessment specific to the new use case, including independent validation of the system's outputs against known stress test scenarios, clearly defined roles for substantive (not just light) human review given the regulatory consequences of submission errors, and a documented model risk management sign-off consistent with how the bank governs other quantitative models used in regulatory submissions",
      "Approve the expansion but require the system to flag any output it is not confident about",
      "Deny the expansion permanently, since regulatory submissions should never involve AI-generated content"
    ],
    correct: 1,
    explanation: "Moving from advisory use to directly informing regulatory submissions is a substantial change in stakes that warrants treatment consistent with the bank's existing model risk management framework for other quantitative models feeding regulatory filings — independent validation and substantive human review, not just performance history in a lower-stakes role. Approving based on past advisory performance conflates two different risk contexts. A self-reported confidence flag from the system isn't a substitute for independent validation, since a poorly calibrated system could be confidently wrong. A permanent blanket denial forecloses a legitimate efficiency gain that can be captured safely with the right controls in place."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A hospital deploys a Claude-based ambient scribe that listens to patient visits and drafts clinical notes for physician review. A physician signs off on a note without noticing the tool mischaracterized a medication dosage discussed during the visit, and the error is later found in the permanent medical record.",
    question: "What governance improvement addresses the root cause of this incident?",
    options: [
      "Discontinue use of the ambient scribe tool, since it introduced an error into a medical record",
      "Require the tool to highlight specific clinical details it extracted with lower confidence, such as dosages and medication names, for focused physician attention during review, rather than presenting the full note as uniformly reliable",
      "Require the tool to no longer draft any content related to medications, leaving that section entirely blank for the physician to complete",
      "Add a general disclaimer to the medical record noting that portions were AI-assisted, without changing anything about the review process"
    ],
    correct: 1,
    explanation: "The physician review step existed but failed because the note presented all extracted content with equal apparent reliability, making it easy to miss a critical error in a dense note — surfacing lower-confidence, high-stakes details like dosages for focused attention directly targets that failure mode. Discontinuing the tool discards its documented value in reducing documentation burden over one fixable interaction design issue. Leaving medication sections blank removes the tool's benefit for exactly the content type most useful to draft accurately, and doesn't scale as a general answer to every category of clinical error risk. A disclaimer doesn't change what the physician actually sees or catches during review."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An insurance company's catastrophe response team wants to let a Claude-based system autonomously issue expedited payouts to policyholders in a declared disaster area, up to a set dollar amount, to speed up relief compared to the normal claims process.",
    question: "What safeguard is essential to include in this design?",
    options: [
      "No safeguard is necessary beyond the dollar cap, since speed is the primary goal during a declared disaster",
      "A post-payout reconciliation and fraud-pattern monitoring process, since expedited disaster-driven payouts are historically a common target for fraud, combined with a clear dollar cap and simplified but real identity and policy verification before payout",
      "Require every expedited payout to go through the normal multi-week claims process regardless of the disaster declaration",
      "Limit expedited payouts to policyholders who call in rather than those who submit claims digitally"
    ],
    correct: 1,
    explanation: "Disaster response speed is a legitimate goal, but expedited, less-scrutinized payout processes are a well-known fraud target, so the design needs real (if simplified) verification up front plus fraud-pattern monitoring and reconciliation after the fact, alongside the dollar cap. A dollar cap alone doesn't prevent fraudulent claims within that cap or catch a pattern of many small fraudulent claims. Reverting to the normal multi-week process defeats the entire purpose of expedited relief for a disaster-affected population who need help quickly. Restricting to phone-in claims doesn't meaningfully address fraud risk and just creates an arbitrary access barrier for digitally-submitted, otherwise legitimate claims."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An online marketplace uses Claude to detect and automatically delist products suspected of being counterfeit. A legitimate small business seller's products were delisted after being flagged, causing significant revenue loss during the appeal process, which took three weeks.",
    question: "What governance improvement should the marketplace prioritize?",
    options: [
      "Increase the flagging threshold so fewer products are delisted overall, accepting more counterfeit listings will remain live as a tradeoff",
      "Implement an expedited review path for sellers with strong account history and no prior violations, and set a defined maximum turnaround time for appeals given the direct revenue impact of a delisting on legitimate sellers",
      "Eliminate the automated delisting capability and require human review before every delisting decision, regardless of confidence level",
      "Require sellers to pay a fee to expedite their appeal review"
    ],
    correct: 1,
    explanation: "The specific harm here is an appeal process too slow to prevent real financial damage to a wrongly-flagged legitimate seller — the fix is a faster, risk-informed appeal path (weighted by account history) with a defined maximum turnaround, not a blunt change to detection sensitivity. Loosening the flagging threshold trades one problem (wrongful delisting) for another (more counterfeit goods staying live) without fixing the appeal speed issue. Requiring human review of every delisting removes the efficiency benefit of automated detection for the large volume of high-confidence, correctly-flagged counterfeit cases. Charging a fee to expedite appeals unfairly disadvantages exactly the small sellers most harmed by a wrongful delisting and doesn't belong in a good-faith appeals process."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A SaaS company wants to use customer support conversations processed by its Claude-based assistant to further fine-tune and improve the assistant's performance. The company's current terms of service make no mention of this potential use of conversation data.",
    question: "What should the company do before using this data for model improvement?",
    options: [
      "Proceed using the data as-is, since it was already collected as part of normal customer support operations",
      "Update terms of service and obtain appropriate consent or provide a clear opt-out disclosed to customers before using their conversation data for model improvement purposes, and apply data minimization or de-identification where feasible",
      "Use only conversations from customers who have not explicitly complained about the support experience",
      "Proceed with model improvement but restrict the practice to enterprise customers only, since they have signed more detailed contracts"
    ],
    correct: 1,
    explanation: "Using customer conversation data for a new purpose beyond the original support interaction requires transparent disclosure and appropriate consent or opt-out mechanisms — data collected for one purpose doesn't automatically carry authorization for a materially different use. Proceeding without any disclosure ignores that reasonable customers wouldn't have expected their support conversations to train a model. Filtering by complaint status is an arbitrary and irrelevant proxy for consent. Restricting to enterprise customers assumes their existing contracts already cover this use, which isn't established just because the contracts are more detailed — the actual disclosure and consent question still needs to be addressed directly."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A financial services firm is designing its incident response plan for AI system failures. The current draft only defines a process for technical outages, such as the assistant becoming unavailable, and does not address scenarios where the system is available but producing systematically incorrect or biased outputs.",
    question: "What gap should be corrected in the incident response plan?",
    options: [
      "No gap exists, since availability outages are historically the most common type of technical incident",
      "The plan should be expanded to define detection mechanisms, escalation paths, and remediation steps for 'silent' failures, such as systematic inaccuracy or bias, which are often harder to detect than outages but can cause greater cumulative harm before anyone notices",
      "The plan should focus exclusively on bias-related incidents going forward, since those carry greater regulatory risk than outages",
      "The plan is adequate as long as customer complaints are being tracked, since complaints will surface any quality issues"
    ],
    correct: 1,
    explanation: "A system that's technically 'up' but silently producing wrong or biased outputs can accumulate harm across many decisions before it's ever noticed, often for longer than an obvious outage, so incident response needs explicit detection and escalation paths for this failure mode, not just availability monitoring. Assuming outages are the main concern because they're common historically ignores that silent failures may simply be underreported, not rare. Narrowing focus exclusively to bias incidents would create a new blind spot for outages and other systematic errors. Relying on customer complaints as the detection mechanism is unreliable, since many affected customers won't recognize or report a subtle systematic error."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A national retail chain's legal department wants a documented framework for determining which new proposed uses of its Claude-based systems require formal risk assessment before launch, versus which can proceed under existing approved patterns. Currently, each new use case is evaluated informally on a case-by-case basis with no consistent standard.",
    question: "What is the best approach to designing this framework?",
    options: [
      "Require every single proposed use case, regardless of similarity to prior approved uses, to undergo a full formal risk assessment, to ensure maximum consistency",
      "Define a risk-tiering framework based on factors such as decision autonomy level, potential for harm, data sensitivity, and regulatory exposure, with clear criteria for when a new use case can rely on a prior approved pattern versus requiring fresh assessment, reviewed periodically as the system landscape evolves",
      "Allow business units to self-certify their own use cases as low risk without any centralized review or criteria",
      "Require formal risk assessment only for use cases that involve customer-facing interactions, treating all internal use cases as automatically low risk"
    ],
    correct: 1,
    explanation: "A defensible, scalable framework defines objective risk factors and clear criteria for when a new use case can reasonably be treated as similar to an already-assessed pattern versus needing its own review, and revisits that framework as the system portfolio changes. Requiring full assessment for every use case regardless of similarity is not scalable and wastes review capacity on genuinely low-risk, repetitive cases. Allowing self-certification without any centralized criteria or oversight defeats the purpose of having a consistent framework at all. Assuming all internal use cases are automatically low risk ignores that internal tools can still involve sensitive data, consequential decisions, and real harm, as several other scenarios in this domain illustrate."
  },
  {
    domain: 5,
    difficulty: 5,
    scenario: "A metropolitan police department is evaluating a Claude-based system that would analyze crime report data and generate a ranked list of individuals for proactive investigative attention, intended to help allocate limited detective resources. Historical crime data reflects decades of documented disparities in enforcement intensity across neighborhoods.",
    question: "What should the department's oversight body conclude about this proposal?",
    options: [
      "Approve the system, since data-driven resource allocation is inherently more objective than detective intuition alone",
      "Reject the specific use of the system to generate ranked lists of individuals for investigative attention, given that training on historically disparate enforcement data risks encoding and amplifying that disparity into supposedly neutral, high-consequence outputs targeting specific people; if the system is used at all, it should be limited to aggregate resource-planning insights with independent bias testing and legal review, not individual targeting",
      "Approve the system but require it to exclude neighborhood as an explicit input field",
      "Approve the system on a trial basis in a single precinct to gather more performance data before deciding"
    ],
    correct: 1,
    explanation: "Generating ranked lists of individuals for investigative attention from data reflecting historical enforcement disparities creates a serious risk of a feedback loop that appears data-driven while actually perpetuating and legitimizing biased outcomes against specific people — a fundamentally different and far higher-stakes use than aggregate planning. Approving on the premise that data is inherently more objective ignores that the data itself encodes the disparity in question. Removing neighborhood as an explicit field doesn't stop proxy variables like address history or associated individuals from carrying the same signal. A single-precinct trial still exposes real individuals in that precinct to the same fundamental risk while producing limited additional insight into whether the core problem is fixable."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A telecom provider uses a Claude-based system to detect network outages and automatically reroute traffic and prioritize repair crew dispatch. During a recent large-scale outage, the system deprioritized restoring service to a hospital's data connection in favor of a larger number of affected residential customers, based purely on customer count.",
    question: "What governance change should the company make to its outage response logic?",
    options: [
      "Leave the prioritization logic unchanged, since restoring service to the greatest number of customers is a reasonable general principle",
      "Incorporate a maintained criticality classification (e.g., hospitals, emergency services, other essential infrastructure) into the prioritization logic so that public-safety-critical connections are weighted appropriately rather than ranked purely by customer count, with human network operations oversight for major outage events",
      "Require every outage response decision to be made manually by a human, eliminating automated prioritization entirely",
      "Add hospitals to a monitoring list that generates an alert after service has already been restored to confirm outcomes"
    ],
    correct: 1,
    explanation: "Pure customer-count prioritization ignores that some connections, like hospitals, carry public-safety consequences disproportionate to the number of individual customers affected — the fix is building a maintained criticality classification into the logic itself, with human oversight for major events where judgment calls matter most. Leaving the logic unchanged repeats a demonstrated real-world failure. Eliminating automation entirely during major outages, when speed matters most, sacrifices the tool's core value instead of fixing a specific weighting flaw. An after-the-fact alert doesn't help restore service faster to a critical connection; it only confirms the failure occurred."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A residential real estate management firm wants its Claude-based leasing assistant to autonomously approve lease agreements for qualified applicants without any human involvement, arguing that qualification criteria (income, credit score, rental history) are straightforward and objective.",
    question: "What governance consideration should give the firm pause before full automation?",
    options: [
      "None; if the criteria are truly objective and consistently applied, full autonomy is appropriate and should be approved without further review",
      "Edge cases such as applicants with non-traditional income documentation, credit history affected by identity theft, or reasonable accommodation requests related to disability may not fit cleanly into automated criteria, and a fully autonomous process with no human escalation path risks unlawful denial or failure to accommodate such applicants",
      "The firm should avoid automation because leasing decisions are inherently too subjective to ever be assisted by AI",
      "Full autonomy is fine as long as approved applicants are notified that a Claude-based system was used in their approval"
    ],
    correct: 1,
    explanation: "Even seemingly objective criteria break down for real applicants with non-traditional circumstances, and a leasing process with no escalation path for those cases risks unlawful denial or a failure to provide a legally required accommodation — the design needs a human review path for exactly these edge cases, not full automation with no exceptions. Claiming criteria are objective enough for unconditional full autonomy overlooks how often real applications don't fit the clean case. Rejecting automation altogether discards a legitimate efficiency gain for the substantial majority of straightforward, clean applications. A notification-only disclosure doesn't provide any actual recourse for an applicant wrongly denied by rigid automated criteria."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A non-profit foundation uses Claude to help score and rank grant applications from community organizations based on the strength of their proposals. A board member notices that organizations using more sophisticated, professionally polished grant-writing consistently score higher, regardless of the underlying strength of the proposed program.",
    question: "What governance issue does this observation raise, and what should the foundation do?",
    options: [
      "No issue; well-written proposals should be rewarded since strong writing indicates strong organizational capacity",
      "The scoring may be conflating writing polish with program merit, systematically disadvantaging smaller or under-resourced organizations that lack access to professional grant writers; the foundation should review and recalibrate scoring criteria to focus on substantive program factors and consider a review step that controls for writing quality as a factor",
      "The foundation should stop using the tool for grant scoring altogether and revert entirely to unstructured manual review with no defined criteria",
      "The foundation should require all applicants to use the same AI tool to draft their proposals, so that writing quality is equalized across applicants"
    ],
    correct: 1,
    explanation: "If proposal scoring rewards writing polish over program substance, it systematically favors well-resourced organizations rather than accurately identifying the strongest programs, which undermines the foundation's actual mission-driven allocation goal — the fix is recalibrating criteria toward substance and controlling for writing quality specifically. Treating writing polish as a valid proxy for organizational capacity ignores that access to professional grant writers correlates more with resources than program quality. Reverting to entirely unstructured manual review removes any consistency without necessarily fixing the underlying bias, since human reviewers are also susceptible to being swayed by polish. Requiring a specific AI tool for all applicants raises separate access and fairness issues and doesn't address whether the foundation's own scoring criteria are measuring the right thing."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A bank's anti-money-laundering team uses Claude to triage transaction alerts, generating a risk score and recommended disposition (clear, escalate, file a suspicious activity report) for each alert. A new policy proposal would let alerts scored as low-risk be automatically cleared without any analyst review, to address a large investigative backlog.",
    question: "What should the bank's compliance function require before adopting this policy?",
    options: [
      "Approve automatic clearing for low-risk alerts immediately, since clearing the backlog is an urgent operational priority",
      "Require independent validation of the scoring model's accuracy specifically on historically true-positive cases within the proposed low-risk band, ongoing quality-control sampling of auto-cleared alerts, and regulatory consultation given that automated clearance in this domain is a significant control change with compliance-program-wide implications",
      "Reject any automation of alert disposition, requiring full manual analyst review of every alert regardless of backlog size",
      "Approve automatic clearing but only for alerts generated during business hours"
    ],
    correct: 1,
    explanation: "Automating the clearance of financial crime alerts without any review is a material change to a bank's compliance control environment, so it requires rigorous, evidence-based validation specifically on cases most likely to be missed, plus ongoing sampling and regulatory engagement, given the severe consequences of missing genuine suspicious activity. Approving immediately to address a backlog trades urgency for insufficiently validated risk. Rejecting any automation entirely fails to address a genuine operational problem when properly validated automation could safely handle a meaningful share of true low-risk alerts. Restricting to business hours is an arbitrary distinction unrelated to the actual risk of a scoring model's accuracy."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "An insurance company's Claude-based fraud detection system flags a rising number of legitimate claimants as suspected fraud, requiring them to submit extensive additional documentation and delaying their payouts by weeks. The fraud team argues the high flag rate is acceptable because it has also caught more actual fraud than the previous system.",
    question: "What is the flaw in the fraud team's reasoning, and what should the company do?",
    options: [
      "There is no flaw; catching more fraud is the primary objective and some inconvenience to legitimate claimants is an acceptable tradeoff with no further action needed",
      "Evaluating the system purely on fraud caught ignores the real cost imposed on the much larger number of legitimate claimants wrongly delayed; the company should measure and report both the true-positive and false-positive rates together, and tune the system or its review workflow to reduce unnecessary friction for legitimate claimants without materially reducing fraud detection",
      "The company should lower the flagging threshold further, since catching more fraud is unambiguously the right direction regardless of the effect on legitimate claimants",
      "The company should discontinue automated fraud detection entirely and rely solely on manual investigator judgment"
    ],
    correct: 1,
    explanation: "A fraud detection system's value has to be judged against both what it catches and what it wrongly flags — reporting only the true-positive improvement without the false-positive cost gives an incomplete and misleading picture of the system's actual performance and customer impact. Accepting the tradeoff as-is without measuring the other side ignores a real and mounting cost to legitimate customers. Lowering the threshold further would likely increase false positives even more, worsening the exact problem raised. Discontinuing automated detection entirely discards its real fraud-catching value instead of tuning it to a better balance."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A SaaS company's customer-facing Claude assistant was updated to a new model version last week. Since the update, customer satisfaction scores for assistant interactions have dropped noticeably, but the team has no formal process to revert to the prior version and is instead trying to fix the issue through prompt adjustments while the new version stays in production.",
    question: "What governance gap does this situation reveal?",
    options: [
      "The company needs a more advanced model, since satisfaction scores dropped after the update",
      "The company lacks a defined model change management process that includes a rollback capability and clear criteria for when a regression triggers reverting to a known-good prior version rather than attempting in-production fixes",
      "The drop in satisfaction scores is likely unrelated to the model update and should be investigated as a separate issue before any action is taken",
      "The company should permanently avoid updating model versions in the future to prevent this from happening again"
    ],
    correct: 1,
    explanation: "A responsible model change management process includes a rollback path and predefined criteria for when a post-deployment regression warrants reverting rather than attempting incremental fixes while customers continue experiencing degraded service — the absence of that capability here is the actual governance gap. Concluding the company needs an even more advanced model doesn't address the missing process, and assumes without evidence that model quality is the specific problem rather than, for instance, a prompt-model interaction issue. Dismissing the correlation without investigation ignores a fairly direct timeline signal. Permanently avoiding all future updates forfeits legitimate improvements out of an overcorrection rather than building a proper change management process."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A manufacturing company uses Claude to analyze supplier data, financial filings, and news reports to generate a risk score for each supplier, which procurement staff use to decide whether to expand or reduce orders. A supplier flagged as high-risk contests the score, saying the assessment relied on an outdated news report about a resolved issue.",
    question: "What should the procurement team's process include to handle this kind of dispute?",
    options: [
      "No process is needed since suppliers are expected to accept risk scores without contesting them",
      "A defined process for suppliers to contest a risk score with supporting evidence, a human review of the specific factors driving the score, and a mechanism to ensure the underlying data sources are reasonably current before being used in scoring",
      "Automatically lower the risk score of any supplier that formally contests it, to maintain good vendor relationships",
      "Discontinue use of external news and financial data sources entirely, relying only on internal order history for supplier risk scoring"
    ],
    correct: 1,
    explanation: "A legitimate dispute process needs a way for suppliers to present evidence, a human review of the specific factors behind the score, and reasonable data-currency checks so outdated information doesn't unfairly and persistently affect a supplier's standing. Assuming suppliers should have no recourse ignores that automated scores drawing on public data can genuinely be wrong or stale. Automatically lowering any contested score regardless of merit removes any real accuracy check and invites gaming. Eliminating external data sources entirely discards genuinely useful risk signals to avoid a data-freshness problem that has a more targeted fix."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A company's internal Claude-based assistant is being considered as an intake channel for employee whistleblower reports, including allegations of financial misconduct or harassment by senior leaders. A proposal would have the assistant auto-categorize and auto-close reports it assesses as low-credibility without any human review.",
    question: "What is the central governance flaw in this proposal?",
    options: [
      "Whistleblower reports, especially those involving senior leadership or financial misconduct, carry legal and ethical stakes where an automated system's credibility assessment could wrongly suppress a legitimate report with no human ever reviewing it, undermining the integrity of the reporting channel itself and creating legal exposure",
      "The proposal is sound as long as the assistant logs every report it processes, regardless of whether a human reviews it",
      "The main concern is that the assistant may take too long to process each report compared to a dedicated hotline",
      "The proposal should be approved because it would reduce the workload on the compliance and ethics team"
    ],
    correct: 0,
    explanation: "A whistleblower channel exists specifically to surface reports that powerful or well-positioned wrongdoers might otherwise be able to suppress, so having an automated system unilaterally and permanently close reports it deems low-credibility, with no human ever seeing them, defeats the purpose of the channel and creates serious legal and integrity risk if a legitimate report is auto-closed. Logging alone doesn't provide any actual review or recourse if a report is wrongly dismissed. Processing speed is a minor operational concern next to the risk of silently suppressing legitimate misconduct reports. Workload reduction is a real benefit but doesn't justify removing human review from the specific step where the highest-stakes errors would occur."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A university is piloting a Claude-based remote exam proctoring tool that analyzes webcam video and browser activity to flag potential cheating, with flagged students required to appear before an academic integrity board. Some students have reported that normal behaviors, such as looking away to think or living in a noisy shared household, triggered flags.",
    question: "What governance improvement should the university prioritize?",
    options: [
      "Discontinue remote proctoring entirely, since any flagging errors are unacceptable in an academic context",
      "Provide students with disclosure of what behaviors the system flags and why before the exam, ensure flagged cases include the underlying evidence for board review rather than just a binary flag, and give students a clear opportunity to explain contextual factors before any finding of misconduct",
      "Increase the sensitivity of the flagging system so that no potential cheating incident goes undetected, even if it increases the false flag rate further",
      "Require flagged students to accept a reduced-grade penalty automatically, without a hearing, to save the integrity board's time"
    ],
    correct: 1,
    explanation: "Because flagged behaviors can plausibly reflect normal, innocent circumstances, the governance fix is transparency about what triggers flags, giving the review board the actual underlying evidence rather than a bare flag, and ensuring students get a genuine opportunity to explain context before any consequence — that preserves the tool's usefulness while protecting due process. Discontinuing the tool entirely is a disproportionate response when a fairer review process could resolve the actual complaint. Increasing sensitivity further would worsen the exact problem being reported. Imposing an automatic penalty without a hearing removes the due process protection that's most needed here."
  },
  {
    domain: 5,
    difficulty: 3,
    scenario: "A media production company gives its marketing team access to a Claude-based tool capable of generating synthetic video and voice content for promotional campaigns. There is currently no internal policy governing when synthetic media featuring recognizable public figures or the likeness of real employees can be created or published.",
    question: "What should the company establish before this capability is used further?",
    options: [
      "A responsible-use policy defining what synthetic media content is permitted, requiring documented consent for any likeness of a real identifiable person, clear labeling of synthetic content where appropriate, and legal review before publication of any content involving public figures",
      "No policy is needed as long as the content is intended for internal review only before any public release",
      "A policy restricting synthetic media generation to the legal department only, without addressing what content is actually permissible",
      "A general disclaimer added to the company website stating that some marketing content may be AI-generated, without any other change to the creation or approval process"
    ],
    correct: 0,
    explanation: "Synthetic media featuring real identifiable people, especially public figures, carries defamation, right-of-publicity, and reputational risk that requires a clear responsible-use policy covering consent, labeling, and legal review before anything is published. Assuming internal-only intent removes the risk ignores that content created for internal review often ends up being published or leaked. Restricting the tool to legal staff without defining permissible content just relocates who can generate risky content without actually reducing the risk. A general website disclaimer doesn't address consent, likeness rights, or the need for review before specific pieces of content are published."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "A litigation law firm is testing a Claude-based tool that recommends litigation strategy, including which arguments to emphasize and settlement value estimates, for use by associates on active cases. A senior partner is concerned that junior associates may defer to the tool's recommendations without applying independent legal judgment, particularly on novel or high-value matters.",
    question: "What governance control should the firm implement?",
    options: [
      "Ban junior associates from using the tool entirely, restricting it to partners only",
      "Require the tool's strategy recommendations to include the reasoning and precedent behind them, mandate a senior attorney review and sign-off on any strategy or settlement position before it is presented to a client or filed, and provide training on the tool's known limitations, particularly for novel matters where precedent is thin",
      "Allow unrestricted use by associates at all levels, since senior partners already review final client-facing work products for other reasons",
      "Remove settlement value estimation from the tool's capabilities entirely, while keeping the argument recommendation feature unrestricted"
    ],
    correct: 1,
    explanation: "The real risk is automation bias among associates on strategically important, high-value decisions, so the fix is requiring transparent reasoning, mandatory senior review specifically for strategy and settlement positions, and targeted training on where the tool is least reliable, such as novel matters with thin precedent. Banning junior associates from the tool entirely forfeits a legitimate research and drafting aid for routine matters. Assuming existing final-review practices already cover this risk ignores that the partner's specific concern is associates' independent judgment being shaped upstream of that review, not just the final work product. Removing settlement estimation but leaving strategy recommendations unrestricted addresses only part of the concern and leaves argument-strategy deference unaddressed."
  },
  {
    domain: 5,
    difficulty: 2,
    scenario: "A utility company uses Claude to analyze usage patterns and automatically generate demand forecasts that feed into tiered billing rate calculations for commercial customers. A customer disputes a bill, claiming the forecast used in their tier calculation was based on an anomalous usage spike caused by a temporary equipment malfunction rather than normal consumption.",
    question: "What governance improvement should the utility make to its billing process?",
    options: [
      "Deny the dispute as a matter of policy, since the forecast was generated using the customer's own actual metered data",
      "Establish a defined dispute and correction process that allows customers to flag anomalous data for human review, with a documented method to identify and exclude clear data anomalies from forecasts before they affect billing tier calculations",
      "Discontinue automated demand forecasting for billing purposes entirely and calculate all commercial rates manually",
      "Automatically approve any dispute a customer raises without requiring supporting evidence, to avoid customer service escalations"
    ],
    correct: 1,
    explanation: "Automated forecasts that feed directly into billing need both an anomaly-detection step to avoid clearly unrepresentative data driving a bill, and a genuine human-reviewed dispute process for cases the automated check misses. Denying disputes just because the underlying data was technically the customer's own metered readings ignores that the data can still be non-representative due to a known malfunction. Reverting to fully manual calculation for all commercial customers discards a legitimate efficiency gain to fix a narrower, addressable data-quality issue. Automatically approving any dispute without evidence invites abuse and removes any real verification from the billing process."
  },
  {
    domain: 5,
    difficulty: 4,
    scenario: "An immigration services agency is piloting Claude to pre-screen visa application documents for completeness and consistency, generating a recommendation to approve, request more information, or deny. Applicants have no visibility into why a particular recommendation was made, and current design would allow low-complexity denials to be finalized without a caseworker reviewing the underlying reasoning.",
    question: "What should the agency require before expanding this pilot?",
    options: [
      "Require every denial recommendation, regardless of perceived complexity, to be reviewed by a qualified caseworker who examines the system's stated reasoning against the actual application before any denial is finalized, and provide applicants with a meaningful explanation of the basis for any adverse decision",
      "Proceed with the design as planned, since low-complexity cases are, by definition, unlikely to involve reviewer disagreement",
      "Require review only for approval recommendations, since applicants are unlikely to appeal a favorable outcome",
      "Allow the pilot to expand but limit the system's role to translating documents, removing any recommendation feature, which would eliminate the need for any further governance discussion"
    ],
    correct: 0,
    explanation: "A denial has severe, often life-altering consequences for an applicant, so no denial should be finalized without meaningful human review of the actual reasoning, and applicants are owed a real explanation of an adverse decision — labeling a case 'low-complexity' in advance doesn't guarantee the recommendation itself is correct. Proceeding with automated low-complexity denials assumes exactly the reliability that hasn't been established. Reviewing only approvals leaves denials, the decisions with the most serious consequences, completely unchecked. Reducing the system to translation-only sidesteps the governance question rather than resolving it, and abandons a review recommendation feature that could have real value if properly governed."
  }
];
