# Joplin Manufacturer Advanced Candidate Dossiers
Version: 1.0.0

Status:
Complete Public-Evidence Dossiers — Human Qualification Pending

Method: `identify-imd-prospects` V1.1

As of: 2026-09-06

Governing discovery record:

`005-JOPLIN-MANUFACTURER-PROSPECT-DISCOVERY.md`

This document is the human-readable companion to:

`006-JOPLIN-MANUFACTURER-ADVANCED-CANDIDATE-DOSSIERS.json`

The JSON record contains the complete claim/source ledgers, reciprocal mappings, contradiction-search logs, limitations, current-boundary controls, and completion-gate fields.

> These profiles identify signals for human qualification. They do not diagnose an Institutional Memory failure, establish root cause, accuse an organization, or authorize outreach.

## Completion Gate

All three dossiers mechanically satisfy the V1.1 live-dossier completion controls implemented for this run: unique/material claims; permitted evidence labels; source/predicate provenance; complete source records with explicit preservation limitations; reciprocal claim/source mappings; four P-A-C-R statuses; Current Meaningful Operating Boundary Gate; two independent contradiction queries per candidate; limitations; tier rationale lineage; and human-review controls.

Source bytes were not locally frozen in this web-mediated run. Each source record therefore sets `local_filename` and `sha256` to null and explains the preservation limitation. This follows the previously validated live-pilot handling of web-mediated source acquisition; URL/issuer/locator/procedural-status traceability is retained.

## Candidate Results

| Candidate | Tier | P-A-C-R summary | Current boundary | Decisive constraint |
|---|---|---|---|---|
| Protein Solutions | **Moderate** | P SUPPORTED; A SUPPORTED; C PARTIAL; R PARTIAL | PASS | A long-running odor-related prospect signal, company awareness, stated odor-control measures, and later official odor concerns are supported, but later concerns do not establish a regulatory violation or prove failure of the stated controls. Corrective-action history and post-correction recurrence therefore remain partial rather than Strong-gate complete. |
| National Manufacturing Group — Joplin operation | **Weak** | P SUPPORTED; A SUPPORTED; C SUPPORTED; R NOT SUPPORTED | PASS | The 2024 Able Composites inspection establishes material same-site LOTO deficiencies and OSHA records completed abatement in 2025. National Manufacturing Group continues operating the same Joplin site. Two 2026 complaint inspections are open, however, and the public records do not establish comparable post-abatement LOTO recurrence. Inspection volume cannot substitute for recurrence. |
| Dyno Nobel — Carthage Plant | **Weak** | P SUPPORTED; A SUPPORTED; C SUPPORTED; R NOT SUPPORTED | PASS | The Carthage plant has rich public evidence of a material 2020 environmental problem, awareness, and extensive corrective obligations, but the strongest later evidence points toward successful correction and closure rather than comparable post-correction recurrence. Later OSHA events are separate occupational-safety lineages and cannot be used to manufacture environmental recurrence. |

## Protein Solutions

**Candidate ID:** `JMP-PS`
**Final analytical tier:** **Moderate**
**Current Meaningful Operating Boundary:** **PASS**
**Completion status:** **COMPLETE**

**Tier rationale:** A long-running odor-related prospect signal, company awareness, stated odor-control measures, and later official odor concerns are supported, but later concerns do not establish a regulatory violation or prove failure of the stated controls. Corrective-action history and post-correction recurrence therefore remain partial rather than Strong-gate complete.

**Proposed pilot boundary:** 3800 E 32nd Street production facility and its odor-mitigation / complaint-response controls

### P-A-C-R

- **Problem — SUPPORTED:** Public records support a material historical odor-related problem signal around the Joplin plant, including prior DNR violations described in an official city study, litigation/settlement allegations, and later DNR odor concerns. (`P-C3, P-C4, P-C5, P-C6`)
- **Awareness — SUPPORTED:** Protein Solutions publicly acknowledged odor accusations in 2018 and stated that it used odor-mitigation equipment and best practices. (`P-C2`)
- **Corrective Action — PARTIAL:** The company states that it uses state-of-the-art odor-mitigation equipment and best practices, but the public record reviewed does not independently establish a specific completed corrective-action program tied to the historical complaint lineage. (`P-C2, P-C10`)
- **Recurrence/Persistence After Action — PARTIAL:** Official DNR odor concerns occurred in 2024 and 2025 after the company's 2018 mitigation statement, but a 2025 investigation observed no odor-regulation violation and the public evidence does not establish that later concerns were verified recurrence caused by the plant. (`P-C4, P-C5, P-C7`)

### Strongest counterevidence / limitation

- Later community odor reports may reflect episodic conditions or other industrial sources rather than failure of Protein Solutions' stated odor controls. **Resolution:** unresolved; the 2025 DNR investigation observed no violation and the complainant acknowledged other industrial sources.
- The company's mitigation controls may have been effective enough to prevent a regulatory violation even though odor concerns continued to be reported. **Resolution:** supported as a plausible counterexplanation, not proven.

### Independent contradiction queries

- **P-D1 — current entity/site continuity**
  Query: `"Protein Solutions" Joplin current operations 3800 E 32nd Street 2026`
  Result: Current company page and a 2026 OSHA inspection support continued operation at 3800 E 32nd Street; no closure/sale result located.
  Tier effect: Current Meaningful Operating Boundary Gate remains PASS.
- **P-D2 — post-mitigation odor recurrence / successful control**
  Query: `"Protein Solutions" Joplin odor 2025 "No violations" 10 CSR 10-6.165`
  Result: Missouri DNR concern 61898 documents a 2025 odor complaint naming Protein Solutions as suspected source but states that no violation of the odor rule was observed at the investigation.
  Tier effect: Prevents treating later complaint activity as verified Strong-gate recurrence; supports Moderate rather than Strong.

### Human qualification questions

- What specific corrective actions, engineering changes, maintenance standards, and effectiveness checks followed the historical odor complaints and settlement?
- Do internal complaint and monitoring records show comparable odor recurrence after those actions, and how was source attribution verified?
- Can one current plant sponsor provide a bounded record set and interviews for the approximately-$10,000 pilot?

### Source ledger

| ID | Issuer | Source | Level | Procedural status | Claims |
|---|---|---|---|---|---|
| `P-S1` | Protein Solutions | [Protein Solutions — Joplin landing page](https://www.proteinsolutionsjoplin.com/) | E2 | company-controlled current statement | P-C1 |
| `P-S2` | Protein Solutions | [Letter to friends, family and neighbors](https://www.proteinsolutionsjoplin.com/wp-content/uploads/2018/09/20180823_3DCS_Letter_To_The_City_R2.pdf) | E2 | company-controlled public statement | P-C2, P-C7 |
| `P-S3` | Top Class Actions | [Protein Solutions Industrial Plant Class Action Settlement](https://topclassactions.com/lawsuit-settlements/closed-settlements/protein-solutions-industrial-plant-class-action-settlement/) | E3 | secondary litigation/settlement reporting | P-C3 |
| `P-S4` | Missouri Department of Natural Resources | [Monthly Air Pollution Control Program Summary Report — Feb. 16 to Mar. 15, 2024](https://dnr.mo.gov/sites/dnr/files/vfc/2024/04/main/2024-04-25-mo-air-conservation-commission-concern-report.pdf) | E1 | official concern investigation record | P-C4, P-C7 |
| `P-S5` | Missouri Department of Natural Resources | [Monthly Air Pollution Control Program Summary Report — concerns through June 15, 2025](https://oembed-dnr.mo.gov/sites/dnr/files/vfc/2025/07/main/2025-07-31-mo-air-conservation-commission-concern-report.pdf) | E1 | official concern investigation record | P-C5, P-C7 |
| `P-S6` | City of Joplin / redevelopment study record | [32nd Street Place Redevelopment Area Blight Study](https://www.joplinmo.org/AgendaCenter/ViewFile/Item/6810?fileID=37787) | E2 | official local-government study statement | P-C6 |
| `P-S7` | U.S. Occupational Safety and Health Administration | [Inspection 1912858.015 — Protein Solutions](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1912858.015) | E1 | OPEN inspection; no adverse finding inferred | P-C11 |

Full source provenance, lineage, access limitations, claim ledger, qualification dimensions, timelines, and reciprocal mappings are in the JSON companion.

## National Manufacturing Group — Joplin operation

**Candidate ID:** `JMP-NMG`
**Final analytical tier:** **Weak**
**Current Meaningful Operating Boundary:** **PASS**
**Completion status:** **COMPLETE**

**Tier rationale:** The 2024 Able Composites inspection establishes material same-site LOTO deficiencies and OSHA records completed abatement in 2025. National Manufacturing Group continues operating the same Joplin site. Two 2026 complaint inspections are open, however, and the public records do not establish comparable post-abatement LOTO recurrence. Inspection volume cannot substitute for recurrence.

**Proposed pilot boundary:** 1000 South Schifferdecker manufacturing operation and its LOTO/energy-control program

### P-A-C-R

- **Problem — SUPPORTED:** OSHA's closed 2024 Able Composites inspection documented four current serious violations, including machine-specific and periodic-review LOTO deficiencies at the Joplin site. (`N-C3, N-C4, N-C5`)
- **Awareness — SUPPORTED:** OSHA citations, informal settlement/final order, and abatement records establish organizational notice of the cited LOTO deficiencies. (`N-C4, N-C5`)
- **Corrective Action — SUPPORTED:** OSHA records abatement completed on February 18, 2025 for the two cited LOTO items. (`N-C4, N-C5`)
- **Recurrence/Persistence After Action — NOT SUPPORTED:** Two 2026 OSHA complaint inspections exist at the same site, but both remain open and the public records reviewed do not establish LOTO citations or hazard comparability with the 2024 deficiencies. (`N-C6, N-C7, N-C8`)

### Strongest counterevidence / limitation

- The 2024 LOTO deficiencies may have been successfully corrected by the documented February 2025 abatements. **Resolution:** public evidence supports abatement; effectiveness beyond the cited items is unknown.
- The 2026 OSHA complaints may concern different health/safety hazards and may be unrelated to the prior LOTO program. **Resolution:** unresolved while inspections remain open; current records do not establish comparability.

### Independent contradiction queries

- **N-D1 — entity/site continuity after Able acquisition**
  Query: `"National Manufacturing Group" Joplin 1000 South Schifferdecker current 2026`
  Result: Current company location information and 2026 OSHA records support continuing National Manufacturing Group operations at the Joplin site.
  Tier effect: Current Meaningful Operating Boundary Gate remains PASS.
- **N-D2 — post-abatement LOTO recurrence / hazard comparability**
  Query: `"National Manufacturing Group" Joplin OSHA 1870763 1901846 lockout tagout citation`
  Result: The 2026 records are open complaint inspections at the same address; the reviewed pages do not establish a repeat LOTO citation or comparable post-abatement hazardous-energy-control failure.
  Tier effect: Prevents treating the 2026 inspection count as recurrence; caps the dossier at Weak on current public evidence.

### Human qualification questions

- What evidence verifies that the 2025 LOTO abatements were implemented and remained effective across the affected and comparable equipment?
- Do either 2026 OSHA matters involve hazardous-energy control, or are they materially different lineages?
- Can the plant provide current LOTO procedures, annual periodic-inspection records, training, CAPA and audit records within a bounded pilot?

### Source ledger

| ID | Issuer | Source | Level | Procedural status | Claims |
|---|---|---|---|---|---|
| `N-S1` | National Manufacturing Group | [National Composites Acquires Able Manufacturing & Assembly, Joplin, MO](https://nationalmanufacturing.group/2021/07/30/national-composites-acquires-able-manufacturing-assembly-joplin-mo/) | E2 | company-controlled acquisition announcement | N-C1 |
| `N-S2` | National Manufacturing Group | [National Composites Locations — Joplin, MO](https://nationalmanufacturing.group/nc-locations/) | E2 | company-controlled current statement | N-C2 |
| `N-S3` | U.S. Occupational Safety and Health Administration | [Inspection 1768493.015 — Able Composites LLC](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1768493.015) | E1 | CLOSED inspection; settled current violation data | N-C3 |
| `N-S4` | U.S. Occupational Safety and Health Administration | [Violation 01002 — Inspection 1768493.015](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01002&id=1768493.015) | E1 | Serious citation; informal settlement; final order; abatement completed | N-C4 |
| `N-S5` | U.S. Occupational Safety and Health Administration | [Violation 01003 — Inspection 1768493.015](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01003&id=1768493.015) | E1 | Serious citation; informal settlement; final order; abatement completed | N-C5 |
| `N-S6` | U.S. Occupational Safety and Health Administration | [Inspection 1870763.015 — National Manufacturing Group](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1870763.015) | E1 | OPEN inspection; no final finding inferred | N-C6, N-C8 |
| `N-S7` | U.S. Occupational Safety and Health Administration | [Inspection 1901846.015 — National Manufacturing Group](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1901846.015) | E1 | OPEN inspection; no final finding inferred | N-C6, N-C8 |

Full source provenance, lineage, access limitations, claim ledger, qualification dimensions, timelines, and reciprocal mappings are in the JSON companion.

## Dyno Nobel — Carthage Plant

**Candidate ID:** `JMP-DN`
**Final analytical tier:** **Weak**
**Current Meaningful Operating Boundary:** **PASS**
**Completion status:** **COMPLETE**

**Tier rationale:** The Carthage plant has rich public evidence of a material 2020 environmental problem, awareness, and extensive corrective obligations, but the strongest later evidence points toward successful correction and closure rather than comparable post-correction recurrence. Later OSHA events are separate occupational-safety lineages and cannot be used to manufacture environmental recurrence.

**Proposed pilot boundary:** Carthage plant environmental management, wastewater, stormwater, hazardous-waste and related corrective-control systems

### P-A-C-R

- **Problem — SUPPORTED:** EPA's 2020 Missouri settlement records alleged material CWA/RCRA violations at the Carthage facility. (`D-C1`)
- **Awareness — SUPPORTED:** The federal settlement/consent decree and required injunctive relief establish formal organizational awareness of the alleged environmental deficiencies. (`D-C1, D-C2`)
- **Corrective Action — SUPPORTED:** The consent decree required substantial Carthage pollution-control changes, and company reports later state that remaining requirements were completed and the decree was resolved/terminated. (`D-C2, D-C4, D-C5`)
- **Recurrence/Persistence After Action — NOT SUPPORTED:** No comparable post-correction Carthage CWA/RCRA recurrence was established in the reviewed public evidence; company reports instead cite ISO 14001 audit performance, completion of remaining decree requirements, and 2025 decree termination. Later OSHA matters concern separate occupational-safety lineages. (`D-C3, D-C5, D-C7, D-C8, D-C9, D-C10`)

### Strongest counterevidence / limitation

- The 2020 environmental deficiencies may have been successfully corrected under the consent decree rather than persisting as an organizational learning failure. **Resolution:** strongly supported by available correction/closure evidence; private effectiveness details remain outside the public dossier.
- Later OSHA events represent distinct occupational-safety lineages and do not establish recurrence of the environmental problem. **Resolution:** supported; no public evidence establishes cross-lineage comparability.

### Independent contradiction queries

- **D-D1 — current Carthage operating-boundary continuity**
  Query: `"Dyno Nobel" Carthage Missouri MO0002402 permit 2026`
  Result: Missouri DNR lists operating wastewater permit MO0002402 for the Carthage Plant effective April 1, 2026 through March 31, 2031.
  Tier effect: Current Meaningful Operating Boundary Gate remains PASS.
- **D-D2 — environmental post-correction persistence and successful closure**
  Query: `"Dyno Nobel" Carthage consent decree terminated resolved 2025 2026`
  Result: Company reports show completion of the remaining Carthage decree requirement, ISO 14001 audit performance, and April 2025 resolution; independent legal reporting states the court granted termination after stipulated requirements/compliance reports were satisfied.
  Tier effect: Counterevidence defeats a persistence-based environmental Strong/Moderate theory on current public evidence and supports Weak.

### Human qualification questions

- Is there a current recurring environmental, process-safety, audit, or corrective-action problem at Carthage that survived or arose after the completed consent-decree controls?
- What internal effectiveness reviews, recurrence histories, ISO audit records, CAPA records, and permit-monitoring exceptions exist after the decree closure?
- Can a current plant sponsor identify one bounded problem and provide the necessary records/interviews without turning the engagement into compliance certification?

### Source ledger

| ID | Issuer | Source | Level | Procedural status | Claims |
|---|---|---|---|---|---|
| `D-S1` | U.S. Environmental Protection Agency | [Dyno Nobel Inc. Missouri Information Sheet](https://www.epa.gov/enforcement/dyno-nobel-inc-missouri-information-sheet) | E1 | federal settlement information sheet; allegations and consent-decree obligations distinguished | D-C1, D-C2, D-C9 |
| `D-S2` | Dyno Nobel / Incitec Pivot Limited | [2024 Sustainability Report](https://www.dynonobel.com/globalassets/corporate-shared-assets/sustainability/reports/sustainability-reports/2024-sustainability-reports/2024-ipl-sustainability-report.pdf) | E2 | company-controlled sustainability disclosure | D-C3, D-C4, D-C10 |
| `D-S3` | Dyno Nobel | [Annual Report 2025](https://investors.dynonobel.com.au/static-files/cb193974-5ca9-4872-a684-1200bab031ef) | E2 | company annual-report disclosure | D-C5, D-C10 |
| `D-S4` | Vinson & Elkins LLP via JD Supra | [Government Enforcement Semi-annual Roundup — September 2025](https://www.jdsupra.com/legalnews/government-enforcement-semi-annual-9865426/) | E3 | secondary legal reporting of court action | D-C5, D-C10 |
| `D-S5` | Missouri Department of Natural Resources | [Site-specific Wastewater Permits — Dyno Nobel Inc.-Carthage Plant](https://dnr.mo.gov/water/business-industry-other-entities/permits-certifications/issued/site-specific-wastewater) | E1 | Operating permit registry | D-C6 |
| `D-S6` | U.S. Occupational Safety and Health Administration | [Inspection 1459787.015 — Dyno Nobel Inc.](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1459787.015) | E1 | CLOSED inspection | D-C7, D-C9 |
| `D-S7` | U.S. Occupational Safety and Health Administration | [Violation 01002 — Inspection 1459787.015](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01002&id=1459787.015) | E1 | settled OSHA citation; abatement completed | D-C7, D-C9 |
| `D-S8` | U.S. Occupational Safety and Health Administration | [Inspection 1560853.015 — Dyno Nobel Inc.](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1560853.015) | E1 | CLOSED inspection; informal settlement | D-C8, D-C9 |

Full source provenance, lineage, access limitations, claim ledger, qualification dimensions, timelines, and reciprocal mappings are in the JSON companion.

## Comparative Ranking Gate

**Not executed in this artifact.** The governed discovery record required complete dossiers first. The next governed step is to run the separate comparative-ranking gate using only these completed dossiers, followed by human qualification review before any prospect is selected or contacted.

## Human Review Boundary

No organization is selected or outreach-ready. A later human review must decide whether any candidate is worth qualification and whether the approximately-$10,000 pilot can be bounded, evidenced, sponsored, and economically accepted.
