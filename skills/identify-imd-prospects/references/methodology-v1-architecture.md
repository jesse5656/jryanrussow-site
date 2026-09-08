# Institutional Memory Diagnostic Prospect Intelligence

## Skill Architecture Specification — Draft 0.1

**Status:** Proposed architecture; not an executable skill  
**Owner:** The Russow Institute  
**Decision boundary:** Identify and prioritize organizations for human qualification. Never diagnose an organization from public evidence.

## Method-control legend

Every element of this specification is labeled:

- **[A] Architecture:** a structural design choice for the skill.
- **[H] Hypothesis:** a belief about what may predict commercial or diagnostic fit.
- **[R] Operational rule:** a mandatory execution constraint.
- **[V] Validate:** a proposition or threshold that must be tested before it becomes stable methodology.

An item may carry more than one label. Architecture and rules remain fixed within a skill version. Hypotheses may guide research but cannot be reported as facts. Validation findings change the method only through an explicit versioned revision.

## 1. Skill purpose

- **[A][R]** Produce evidence-grounded candidate profiles and ranked prospect lists for possible Institutional Memory Diagnostic (IMD) engagements.
- **[A][R]** Screen for a publicly observable pattern: **problem → organizational awareness → response/corrective action → recurrence or persistence**.
- **[A][R]** Evaluate whether one meaningful organizational problem appears plausibly boundable within the pilot commercial boundary: about $10,000, one system/site/unit/process, about 75 records, up to 8 interviews, 3–4 weeks, and no more than 70 Institute labor hours.
- **[R]** Do not diagnose institutional-memory failure, determine root cause, assign blame, or make allegations.
- **[H][V]** Organizations exhibiting the complete four-part pattern are more likely than signal-only organizations to be strong IMD prospects.

### Non-goals

- Sales outreach, contact enrichment, or messaging.
- Legal, regulatory, safety, investment, or reputational judgment.
- Comprehensive due diligence.
- Diagnosis or consulting recommendations.
- Automated rejection of prospects based solely on absent public evidence.

## 2. Inputs

### Required

- **[A]** Research scope: geography, sector(s), time window, and desired list size.
- **[A]** Pilot commercial boundary, supplied above as the default baseline.
- **[A]** Research date (“as of” date).
- **[A]** Any exclusions, conflicts, existing relationships, or prohibited sectors.

### Optional

- Named organizations or a discovery universe.
- Preferred public source systems.
- Minimum/maximum organization size or revenue proxy.
- Known buyer roles or relationship pathways.
- Sector-specific definitions of incident, recurrence, corrective action, and meaningful business unit.
- Time/research budget per candidate.

### Input defaults requiring validation

- **[H][V]** Initial lookback: five years, extended when earlier events establish awareness or recurrence.
- **[H][V]** Initial discovery should favor sectors with rich public records and meaningful recurring operational problems.
- **[R]** Missing optional inputs must be disclosed as assumptions; they may not be silently invented.

## 3. Outputs

### Primary outputs

- **[A]** A candidate dossier using the schema in section 19.
- **[A]** A ranked prospect list using the schema in section 20.
- **[A]** A source register that maps every material factual claim to its source.
- **[A]** A human-qualification question set focused on unresolved fit, scope, evidence, sponsor, urgency, and economics.

### Required output characteristics

- **[R]** Separate **PUBLIC FACT**, **REASONABLE INFERENCE**, **HYPOTHESIS**, and **UNKNOWN / REQUIRES HUMAN QUALIFICATION**.
- **[R]** Use neutral language such as “public evidence indicates,” “may be consistent with,” and “requires qualification.”
- **[R]** Show contradictory evidence and material search limitations.
- **[R]** Assign a tier, not a pseudo-precise numeric score.
- **[R]** Include the explicit disclaimer: “This profile identifies signals for human qualification; it does not diagnose an Institutional Memory failure or establish root cause.”

## 4. Required public data-source categories

The researcher must search categories relevant to the candidate; “not applicable” and “searched, none found” are distinct.

1. **Primary government and regulator records** — inspection/citation databases, enforcement orders, consent decrees, recalls, permits, environmental records, licensing findings, public audit reports.
2. **Company-controlled primary sources** — filings, annual reports, investor presentations, press releases, safety/quality reports, policies, leadership statements, corrective-action claims, acquisition announcements.
3. **Court and adjudicative records** — only where publicly accessible, materially relevant, and clearly characterized as allegation, finding, settlement, or disposition.
4. **Accreditation, certification, and oversight records** — audit summaries, accreditation actions, inspector-general or legislative oversight materials.
5. **Operational and technical records** — reliability reports, outage records, recall notices, service-status histories, procurement/board materials, meeting minutes, maintenance disclosures.
6. **Credible journalism and trade press** — corroboration, chronology, interviews, local reporting, and context.
7. **Structured complaint and review data** — government complaint databases or sufficiently patterned customer/employee reports; never treat anecdotal reviews as established fact.
8. **Organizational structure and commercial proxies** — official sites, filings, locations, workforce/revenue estimates, contracts, acquisitions, sponsor roles.
9. **Contradictory and exculpatory sources** — closure letters, corrected findings, improving trends, successful verification, independent awards/certifications, divestiture, site closure, or evidence that events are unrelated.

**[R]** Search primary sources first when discoverable. Secondary sources may locate or contextualize primary records but must not silently replace them.

## 5. Evidence hierarchy

Evidence strength and claim type are separate. A high-quality source can support only what it actually states.

| Level | Evidence | Typical use |
|---|---|---|
| E1 | Final official finding, filed company disclosure, official event/recall record, final audit | Establish event, awareness, response, disposition |
| E2 | Direct company statement, official meeting record, adjudicated record, accredited oversight report | Establish acknowledgement, action, organizational context |
| E3 | Credible journalism/trade reporting with named sources or documents | Chronology, corroboration, discovery |
| E4 | Structured complaint/review pattern, reputable third-party dataset | Generate or support a hypothesis with caveats |
| E5 | Anonymous claims, isolated reviews, search snippets, unsourced aggregations | Leads only; not material evidence |

Rules:

- **[R]** No material claim may rely only on E5.
- **[R]** Allegations, citations, settlements, and final findings must be distinguished.
- **[R]** Search-result snippets are navigation aids, not sources.
- **[R]** Two articles repeating the same underlying record are one evidentiary lineage, not independent corroboration.
- **[H][V]** Strong candidates will usually have E1/E2 evidence for at least the problem, awareness, or corrective-action elements and independent evidence of recurrence.

## 6. Search strategy

### Stage 0 — Scope and definitions

1. Record inputs, assumptions, exclusions, research date, and budget.
2. Define sector-specific event units and what would count as recurrence.
3. Establish organization/site/entity aliases and ownership changes.

### Stage 1 — Broad discovery

1. Search official databases and credible reporting for repeat-problem signals.
2. Construct a preliminary event list by date, site/unit, problem type, and source.
3. Drop obvious mismatches early: isolated event, no organizational boundary, no plausible buyer, or evident inability to support a $10,000 engagement.

### Stage 2 — Pattern reconstruction

Search separately for:

1. Initial problem/event.
2. Evidence of organizational awareness.
3. Stated or documented response/corrective action.
4. Later recurrence or persistence of the same or meaningfully related problem.

**[R]** Do not label events recurrent until comparability is established across problem type, operating mechanism, relevant boundary, and chronology.

### Stage 3 — Fit and boundability

1. Identify one candidate problem and one plausible site/unit/process boundary.
2. Estimate—not assert—whether internal records and interviewees likely exist.
3. Identify likely sponsor roles and an urgency trigger.
4. Test whether the pilot boundary appears commercially plausible.

### Stage 4 — Contradiction search

Run explicit searches for correction, closure, improvement, verification, declining event rates, ownership/site changes, unrelated causes, and countervailing performance.

### Stage 5 — Synthesis

1. Build the claim-evidence ledger.
2. Classify every statement.
3. Apply sufficiency gates and tier rules.
4. Draft qualification questions.
5. Run a final accusation/diagnosis, provenance, contradiction, and entity-resolution check.

### Research stopping rule

- **[A][R]** Stop when the tier is stable under the evidence found, every material claim has provenance, contradiction search is complete, and remaining unknowns require nonpublic human qualification.
- **[R]** If the assigned tier could readily change with one obvious unsearched primary source, research is incomplete.
- **[H][V]** Pilot research budget: roughly 30–60 minutes for discovery and 90–180 minutes for a full dossier.

## 7. Candidate signal taxonomy

### Core pattern signals

- P: repeated or persistent material problem.
- A: documented prior organizational awareness.
- C: documented response or corrective action.
- R: recurrence/persistence after the response.

### Supporting signals

- Regulatory: recurring citations, findings, consent obligations, repeat audit issues.
- Safety: repeated incidents, near misses, injury patterns, shutdowns.
- Quality/service: recalls, defects, rework, service failures, complaint patterns.
- Environmental: repeat releases, permit violations, remediation recurrence.
- Reliability/maintenance: recurring outages, breakdowns, deferred maintenance indicators.
- Governance/control: repeat exceptions, unclosed actions, verification failures.
- Change/complexity: rapid growth, acquisitions, fragmentation, distributed sites, leadership transition.
- Commercial trigger: active enforcement, renewal, integration, customer loss, board attention, insurer pressure, expansion, new leader.

### Alternative-explanation signals

- High exposure volume makes event counts unsurprising.
- Events occur at unrelated sites, products, or acquired entities.
- Regulation or reporting rules changed.
- A single legacy event generated multiple administrative records.
- Organization exited or sold the affected operation.
- Corrective action was independently verified and recurrence predates it.
- Later event is superficially similar but operationally different.
- Public reporting increased while underlying performance improved.

**[R]** Supporting signals cannot substitute for the core pattern. Complexity alone is not evidence of a knowledge-to-action problem.

## 8. Qualification criteria

Each dimension receives a structured judgment: **Supported**, **Partially supported**, **Not supported**, or **Unknown**, plus evidence citations and rationale. This is not an additive score.

| Dimension | Qualification question |
|---|---|
| Problem fit | Is the issue materially connected to decision availability, escalation, action, execution, verification, reassessment, or control? |
| Recurrence | Are there at least two comparable events or documented persistence over time? |
| Prior awareness | Is there evidence the organization knew or reasonably had formal notice before the later event? |
| Corrective-action history | Is a response, commitment, remediation, or action plan documented? |
| Recurrence after correction | Did a comparable problem occur or persist after enough time for the response to operate? |
| Evidence richness | Is there sufficient reliable public evidence to reconstruct a cautious chronology? |
| Organizational complexity | Are handoffs, sites, functions, acquisitions, shifts, or hierarchy relevant to the problem? |
| Meaningful boundability | Can one problem be isolated to one useful site/unit/system/process? |
| Likely internal evidence | Are relevant records likely to exist, without claiming access or completeness? |
| Economic fit | Is the organization plausibly able and willing to fund about $10,000? |
| Buyer/sponsor | Is a role—not necessarily a named person—identifiable with authority and incentive? |
| Urgency/trigger | Is there a current event or decision window that could support action? |
| Follow-on potential | Could validated findings plausibly lead to remediation work, without inflating the pilot? |
| Qualification unknowns | What facts must a human establish before outreach, proposal, or acceptance? |

**[H][V]** The most discriminating dimensions are recurrence after correction, meaningful boundability, evidence richness, sponsor, and urgency.

## 9. Ranking/tiering method

### Non-compensatory gates

A candidate cannot be **Strong** unless all are true:

1. A material, comparable recurring/persistent problem is supported.
2. Prior awareness is supported.
3. A response/corrective action is supported.
4. Later recurrence/persistence after the response is supported or, during initial validation only, strongly but explicitly inferred from chronology.
5. One meaningful pilot boundary is plausible.
6. Public evidence is rich enough for a defensible chronology.
7. Economic fit and a sponsor role are at least plausible.
8. No unresolved contradiction defeats the core pattern.

### Tiers

- **Strong Candidate:** Passes every Strong gate; most remaining uncertainty concerns private mechanism, access, buyer readiness, and engagement logistics.
- **Moderate Candidate:** Material problem and recurrence are supported, but one or more of awareness, corrective action, post-correction recurrence, sponsor, urgency, or boundability is partial/unknown. Worth human qualification if the missing fact is realistically obtainable.
- **Weak Candidate:** Some relevant signals exist, but the core pattern is incomplete, fit is marginal, the issue is difficult to bound, economics are doubtful, or alternative explanations dominate.
- **Insufficient Evidence:** Evidence cannot support a responsible fit judgment, entity/event linkage is unreliable, or essential sources are inaccessible.

### Ranking within tiers

- **[A][R]** Use explicit tie-breakers, in order: completeness of P-A-C-R pattern; evidence quality/independence; boundability; urgency; sponsor identifiability; economic fit; likely evidence access; follow-on potential.
- **[R]** Do not turn tie-breakers into hidden points.
- **[R]** A “Strong” tier means strong candidate for qualification, not confirmed buyer, confirmed IMD need, or organizational failure.
- **[V]** After pilot testing, assess whether the tiers produce useful separation and acceptable reviewer agreement.

## 10. Uncertainty treatment

Every material statement must be one of:

- **PUBLIC FACT:** Directly supported by cited public evidence, with source language and procedural status accurately represented.
- **REASONABLE INFERENCE:** A limited conclusion that follows from multiple facts and states its reasoning; it must remain defeasible.
- **HYPOTHESIS:** A possible explanation or IMD-relevance proposition to test with humans/private evidence.
- **UNKNOWN / REQUIRES HUMAN QUALIFICATION:** Material information not established publicly.

Rules:

- **[R]** Use the least assertive category warranted.
- **[R]** Absence of public evidence means unknown, not absence of awareness, action, records, sponsor, or capability.
- **[R]** Never combine categories in a paragraph in a way that obscures which claim has which status.
- **[R]** Include confidence only as qualitative evidence confidence—high/moderate/low—and explain the basis. It is not probability.

## 11. Contradictory-evidence handling

- **[R]** Create a contradiction log containing search performed, evidence found, affected claim, and resolution.
- **[R]** Include the strongest counterevidence in the dossier, not merely a note that contrary evidence was searched.
- **[R]** Reconcile dates, entities, sites, and event definitions before deciding evidence conflicts.
- **[R]** If counterevidence defeats recurrence, awareness, post-correction timing, or entity continuity, downgrade the tier.
- **[R]** If conflict cannot be resolved, mark the claim disputed/unknown and route to human review.
- **[H][V]** A standardized “disconfirming queries” checklist will reduce confirmation bias and false positives.

## 12. Source-provenance requirements

Every material public fact must carry:

- Source ID.
- Title.
- Publisher/issuing body.
- Source category and evidence level.
- Publication/filing date.
- Event/effective date, if different.
- Direct URL or stable record identifier.
- Access date.
- Exact page/section/table/record locator where available.
- Short excerpt or faithful evidence note.
- Entity/site/unit to which it applies.
- Claim IDs supported.
- Procedural status: allegation, citation, proposed/final finding, settlement, closure, company claim, independently verified result, etc.
- Archive/permalink when lawful and practical.

**[R]** Preserve lineage: cite the underlying official record when an article derives from it.  
**[R]** Do not cite a source for a claim broader than the source supports.  
**[R]** Material inferences must cite all predicate facts.  
**[R]** Dates and entity names must be normalized without erasing the originals.

## 13. Human-review gates

Human approval is required:

1. Before labeling any candidate **Strong**.
2. Before adding a candidate to an outreach-ready list.
3. When allegations, litigation, fatalities, sensitive personal data, or major reputational implications are material.
4. When entity/site continuity or recurrence comparability is disputed.
5. When only E3/E4 evidence supports a core-pattern element.
6. Before using a named individual as buyer/sponsor.
7. Before changing tiers after new evidence.
8. Before accepting an engagement as fitting the pilot boundary.

Reviewer checklist:

- Can each core-pattern element be traced?
- Are fact, inference, hypothesis, and unknown visibly separated?
- Was contradictory evidence genuinely sought and fairly represented?
- Are events comparable and correctly ordered?
- Does the boundary describe one meaningful problem?
- Is language neutral and non-diagnostic?
- Are sponsor, economics, records, and follow-on potential stated as fit hypotheses where appropriate?

## 14. Prohibited conclusions

The skill must not conclude or imply:

- The organization “has” an Institutional Memory failure.
- Institutional memory caused an event, violation, injury, defect, or loss.
- A person or group is incompetent, negligent, dishonest, or blameworthy.
- A citation/allegation proves wrongdoing beyond its procedural status.
- Recurrence proves the prior corrective action was inadequate.
- Publicly absent documents, controls, knowledge, or actions do not exist.
- A named person will buy, sponsor, or cooperate.
- The IMD will solve the problem or generate a stated return.
- The organization is unsafe, unethical, badly managed, or legally liable.
- Different events share a root cause without evidence.

## 15. False-positive controls

- Require event comparability and entity/site continuity.
- Require chronology: correction must precede alleged post-correction recurrence.
- Normalize event counts for exposure where data permits.
- Separate repeated reporting about one event from multiple events.
- Treat mergers, divestitures, contractor control, and site ownership changes explicitly.
- Require primary evidence for core claims when reasonably available.
- Search for successful closure and improving trends.
- Apply Strong gates non-compensatorily.
- Cap the result at Moderate when a core pattern element rests only on weak/derivative evidence.
- Prefer “Insufficient Evidence” over forced classification.
- Require human review for adverse or sensitive cases.

## 16. False-negative risks

- Strong private evidence may have little public trace.
- Smaller/private organizations may lack public records but fit economically.
- Successful containment may hide repeated near misses.
- Different terminology may mask recurrence.
- Regulator coverage and disclosure vary by industry/state.
- Corrective actions may be confidential.
- Acquisitions/name changes may fragment the record.
- Improvements may coexist with a still-useful bounded problem.
- Sponsor urgency may be private.
- Search engines and databases may omit older/local records.

Mitigation:

- Use sector synonyms, entity aliases, local sources, and longer lookbacks.
- Permit a **Moderate—qualification-led** route for promising but evidence-poor private firms.
- Track source-coverage gaps separately from negative evidence.
- Test discovery on both public-record-rich and public-record-poor sectors.

## 17. Test cases

These are fixtures to build or select; expected behavior must be specified before running the skill.

1. **Canonical strong pattern:** official problem, documented awareness, corrective commitment, comparable later recurrence, clear plant/process boundary. Expected: Strong only after human gate.
2. **Repeated events, no awareness evidence:** multiple similar events but no documented prior notice or response. Expected: Moderate at most; awareness/action unknown.
3. **One event, heavy publicity:** many articles about one incident. Expected: Weak or Insufficient; no recurrence inflation.
4. **Successful correction:** initial finding and correction followed by independent closure and sustained improvement. Expected: downgrade; counterevidence prominent.
5. **False entity match:** same brand but different franchisee/subsidiary/site. Expected: no combined chronology without continuity evidence.
6. **Administrative duplication:** one violation represented by inspection, notice, settlement, and press release. Expected: one underlying event.
7. **High exposure:** event count rises while rate falls substantially. Expected: contextualized; no simple recurrence conclusion.
8. **Acquisition boundary:** later event occurs in acquired operation under different controls. Expected: continuity uncertain; human review.
9. **Private mid-market prospect:** trade reports show repeated failure, but few primary records; plausible sponsor and scope. Expected: Moderate—qualification-led, not Insufficient solely due to privacy.
10. **Too large to bound:** enterprise-wide, multi-causal pattern with no meaningful pilot unit. Expected: Weak despite rich evidence.
11. **Economically mismatched:** very small organization with low apparent capacity. Expected: Weak/unknown economics, even with pattern evidence.
12. **Sensitive allegations:** unresolved lawsuit/anonymous complaints only. Expected: E5 leads; Insufficient and no adverse conclusion.

### Validation measures

- Reviewer agreement on tiers and claim labels.
- Percentage of material claims with complete provenance.
- Contradictions found and their effect on tiers.
- False recurrence/entity-linkage rate.
- Research time per candidate.
- Share of Strong/Moderate candidates judged worth live human qualification.
- Share that can plausibly fit the pilot boundary after qualification.

**[V]** Initial acceptance targets should be set after a baseline run, not invented now.

## 18. Failure conditions

The skill must stop, downgrade, or report failure when:

- The organization or relevant entity cannot be resolved.
- Event records cannot be reliably deduplicated.
- Dates cannot establish awareness/action before recurrence.
- Material claims lack traceable sources.
- Required primary sources are inaccessible and secondary evidence is inadequate.
- Contradictory evidence was not searched.
- The researcher cannot separate fact from inference.
- The problem cannot be meaningfully bounded.
- Output would require diagnosis, blame, or an accusation.
- Research scope/time is insufficient for the requested confidence.
- A source restriction, paywall, robots rule, language limitation, or database failure materially biases the result.
- No human reviewer is available for a Strong or outreach-ready designation.

The output should name the failure, preserve completed evidence, and state the safest next action.

## 19. Output schema for one candidate

```yaml
candidate_id:
organization:
  legal_name:
  public_name:
  parent_or_owner:
  relevant_entity_site_unit:
  geography:
  sector:
research:
  as_of_date:
  researcher:
  scope:
  lookback:
  limitations: []
candidate_summary:
  tier:
  tier_rationale:
  disclaimer: "This profile identifies signals for human qualification; it does not diagnose an Institutional Memory failure or establish root cause."
proposed_pilot_boundary:
  principal_problem:
  system_site_unit_process:
  why_meaningful:
  fit_status: supported|partial|not_supported|unknown
core_pattern:
  problem:
    status: supported|partial|not_supported|unknown
    statement:
    claim_ids: []
  awareness:
    status:
    statement:
    claim_ids: []
  corrective_action:
    status:
    statement:
    claim_ids: []
  recurrence_or_persistence_after_action:
    status:
    statement:
    claim_ids: []
timeline:
  - date:
    event:
    entity_boundary:
    claim_ids: []
qualification:
  problem_fit: {status:, rationale:, claim_ids: []}
  recurrence: {status:, rationale:, claim_ids: []}
  prior_awareness: {status:, rationale:, claim_ids: []}
  corrective_action_history: {status:, rationale:, claim_ids: []}
  recurrence_after_correction: {status:, rationale:, claim_ids: []}
  evidence_richness: {status:, rationale:}
  organizational_complexity: {status:, rationale:, claim_ids: []}
  boundability: {status:, rationale:}
  likely_internal_evidence: {status:, rationale:, classification: hypothesis}
  economic_fit: {status:, rationale:, classification: hypothesis}
  buyer_or_sponsor:
    status:
    role:
    named_person: null
    rationale:
  urgency_trigger: {status:, rationale:, claim_ids: []}
  follow_on_potential: {status:, rationale:, classification: hypothesis}
claims:
  - claim_id:
    classification: public_fact|reasonable_inference|hypothesis|unknown
    statement:
    evidence_confidence: high|moderate|low
    predicate_claim_ids: []
    source_ids: []
contradictions:
  - counterclaim:
    source_ids: []
    affected_claim_ids: []
    resolution: resolved|unresolved|defeats_claim|narrows_claim
alternative_explanations: []
unknowns_and_human_questions:
  - unknown:
    why_material:
    qualification_question:
sources:
  - source_id:
    title:
    publisher:
    category:
    evidence_level: E1|E2|E3|E4|E5
    publication_date:
    event_date:
    url_or_record_id:
    accessed_date:
    locator:
    evidence_note:
    entity_site_unit:
    procedural_status:
    supports_claim_ids: []
    lineage:
human_review:
  required: true|false
  triggers: []
  reviewer:
  decision:
```

## 20. Output schema for a ranked prospect list

```yaml
list_metadata:
  title:
  as_of_date:
  scope:
  sectors: []
  geography:
  lookback:
  discovery_method:
  exclusions: []
  limitations: []
  version:
tiering_method:
  strong_gates:
  within_tier_tiebreakers:
  disclaimer:
prospects:
  - rank:
    candidate_id:
    organization:
    relevant_boundary:
    candidate_problem:
    tier: strong|moderate|weak|insufficient_evidence
    core_pattern:
      problem:
      awareness:
      corrective_action:
      recurrence_after_action:
    strongest_public_signal:
    strongest_counterevidence:
    evidence_richness:
    boundability:
    economic_fit:
    sponsor_role:
    urgency_trigger:
    decisive_unknowns: []
    why_ranked_here:
    dossier_reference:
    human_review_status:
research_coverage:
  organizations_screened:
  dossiers_completed:
  source_categories_not_available: []
  unresolved_entity_matches: []
next_actions:
  qualification_priority: []
  additional_research: []
  do_not_advance: []
```

**[R]** Ranks compare prospects only within the stated research universe and date. They are not absolute market scores.

## Development sequence

### Step 1 — Approve architecture

- **Architecture:** Approve scope, core pattern, labels, gates, tiers, schemas, and human-review boundaries.
- **Hypothesis:** The four-part pattern and pilot-fit dimensions identify commercially useful prospects.
- **Operational rule:** Freeze the approved version before tests; log changes.
- **Validate:** Stakeholders interpret categories and tiers consistently.

### Step 2 — Build the minimum skill package

Proposed name: `identify-imd-prospects`.

- **Architecture:** A concise `SKILL.md`; `references/method.md`; `references/schemas.md`; `references/test-fixtures.md`; optionally one deterministic schema/lint script after manual testing proves need.
- **Hypothesis:** Progressive disclosure will keep execution consistent without overloading context.
- **Operational rule:** Do not add scripts or assets unless repeated execution demonstrates value.
- **Validate:** A fresh agent can locate and follow every mandatory rule.

### Step 3 — Create gold-standard fixtures

- **Architecture:** Use 3–5 deliberately varied candidates from the test cases, with frozen source packets and expected claim labels/tier ranges.
- **Hypothesis:** The fixtures cover the highest-risk errors: recurrence inflation, entity mismatch, confirmation bias, and diagnosis language.
- **Operational rule:** Define expected outcomes before execution.
- **Validate:** Independent runs reach materially consistent outputs.

### Step 4 — Run the first validation test

- **Architecture:** Compare one apparent positive candidate and one counterexample using the same scope and research budget.
- **Hypothesis:** The method elevates the complete P-A-C-R pattern and downgrades a publicity-heavy or successfully corrected case.
- **Operational rule:** No methodology changes mid-run; record friction and deviations.
- **Validate:** Provenance completeness, category accuracy, tier agreement, contradiction handling, time, and pilot boundability.

### Step 5 — Revise once, narrowly

- **Architecture:** Change only rules tied to observed failure.
- **Hypothesis:** Most initial errors will arise from event comparability, entity continuity, or ambiguous tier gates.
- **Operational rule:** Each revision includes reason, evidence, expected effect, and version.
- **Validate:** Re-run the original fixtures to detect regressions.

### Step 6 — Limited live pilot

- **Architecture:** Research a small universe—suggested 10–15 organizations in one public-record-rich sector—and advance only 3–5 dossiers.
- **Hypothesis:** Narrow-sector discovery improves comparability and speed.
- **Operational rule:** Human review precedes Strong designation and outreach.
- **Validate:** Human qualification yield, research hours, pilot-boundary fit, and usefulness to business development.

### Step 7 — Stabilize and install

- **Architecture:** Finalize lean skill files, metadata, and only proven resources.
- **Operational rule:** Validate package structure, forward-test with fresh context, install only after approval.
- **Validate:** A separate operator can reproduce the method without hidden coaching or methodology drift.

## A. Proposed skill architecture

A lean, evidence-led research skill built around a non-compensatory P-A-C-R pattern:

1. **`SKILL.md`** — trigger description, mandatory workflow, stopping rule, tier gates, safety language, and routing to references.
2. **`references/method.md`** — evidence hierarchy, signal taxonomy, search and contradiction protocols, qualification dimensions, false-positive controls, and failure conditions.
3. **`references/schemas.md`** — candidate dossier and ranked-list schemas.
4. **`references/test-fixtures.md`** — frozen cases, expected behaviors, and validation measures.
5. **No script initially.** Add a provenance/schema linter only if manual tests show repeated omissions.

The methodology is tiered rather than scored, versioned rather than silently adaptive, and human-gated before any Strong or outreach-ready designation.

## B. Open questions

1. Which sector and geography should the first validation target?
2. Is the initial deliverable intended for internal research only, or eventually for client-facing/business-development use?
3. Should “Strong” require public proof of recurrence after corrective action, or may a carefully labeled reasonable inference pass that gate during the pilot?
4. What organization size/revenue proxies define plausible $10,000 economic fit?
5. Are there sectors or organizations The Russow Institute must exclude for ethical, relationship, reputational, or competence reasons?
6. Who will serve as the human reviewer, and what authority constitutes approval to advance to outreach?
7. What is the maximum acceptable research time per screened organization and completed dossier?
8. Should named buyer identification remain outside v1, with only sponsor roles reported?

## C. First validation test

Use a two-case discriminating test in one sector and jurisdiction:

- **Case A:** An organization with official evidence for a material problem, prior awareness, a documented corrective response, and a comparable later recurrence.
- **Case B:** An organization with repeated publicity or multiple administrative records but only one underlying event, or with independently verified correction and no later recurrence.

Freeze the source packets first. Give the draft skill to a fresh operator without this architecture discussion. Require two candidate dossiers and a comparative ranked list. Evaluate claim classification, event deduplication, entity continuity, contradiction search, source lineage, tier outcome, pilot boundability, prohibited language, and elapsed time. The test passes only if Case A ranks above Case B for explicit reasons and neither is diagnosed.

## D. Exact next prompt I should give you

> I approve the Skill Architecture Specification for the Institutional Memory Diagnostic prospect-intelligence skill, subject to these changes: [insert changes, or write “none”]. Use the approved architecture to design the minimum validation package only: (1) select the first sector and geography, (2) define the two frozen test cases and source-packet requirements, (3) define expected outcomes and a validation rubric, and (4) propose the exact file structure for the future skill. Do not prospect broadly, do not create or install the executable skill, and stop for my approval before running the validation test.
