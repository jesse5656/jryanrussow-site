# IMD Prospect Intelligence — Validation and Failure Design

General architecture-level validation and failure controls only. Actual frozen case identities, expected results, evaluator guidance, and answer-key material are excluded from runtime.

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
