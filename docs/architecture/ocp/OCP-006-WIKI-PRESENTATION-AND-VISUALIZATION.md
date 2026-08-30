# OCP-006 — Wiki Presentation and Visualization

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

---

## Purpose

Improve the readability, visual hierarchy, and navigability of the Russow Institute wiki without changing the underlying knowledge architecture or creating a competing source of truth.

---

## Current State

The repository contains a substantial Markdown knowledge corpus served through MkDocs Material.

Existing standards govern clarity, progressive disclosure, knowledge linking, and Institute orientation.

The repository does not yet define a consistent visual presentation grammar for Markdown documents.

The corpus therefore contains inconsistent heading hierarchy, long separator lines, sparse use of semantic presentation elements, and diagrams expressed primarily as plain text.

---

## Approved Operational Change

The repository shall establish a Wiki Presentation Standard governing:

1. document hierarchy;
2. metadata presentation;
3. section rhythm;
4. typography and readable line length;
5. lists, tables, quotations, and admonitions;
6. diagrams and visual relationships;
7. related-document navigation;
8. accessibility;
9. Excalidraw derivation;
10. deterministic migration of existing Markdown.

MkDocs shall receive a wiki-specific stylesheet independent from the public jryanrussow.com stylesheet.

A limited pilot shall be applied before any corpus-wide migration.

---

## Pilot Scope

The pilot shall apply to three representative document types:

- Institute architecture:
  docs/institute/INSTITUTE-ARCHITECTURE.md

- Operational plan:
  docs/discipline/OPERATING-PLAN.md

- Research case study:
  docs/research-programs/001-institutional-memory/case-studies/001-NASA-CHALLENGER.md

---

## Excalidraw Boundary

Markdown remains authoritative.

Excalidraw is a derived visualization layer.

Excalidraw shall be used when spatial relationships, systems, flows, hierarchies, or feedback loops communicate meaning materially better than linear text.

An Excalidraw diagram shall not become the only location where authoritative knowledge exists.

Where a visual representation is generated from a repository document, the source Markdown document remains the governing source.

This preserves the boundary established by OCP-004.

---

## Pilot V2 Presentation Grammar

The approved pilot shall additionally validate a reusable presentation grammar
for:

- document identity and metadata;
- governing principles;
- research status;
- research questions;
- related knowledge;
- document rhythm;
- diagram classification;
- derived Excalidraw artifacts.

The pilot shall distinguish between linear diagrams that remain effective in
Markdown and system diagrams whose meaning is materially improved by spatial
visualization.

The Institute Architecture Master Institute Map is classified as a strong
candidate for derived Excalidraw visualization.

No Excalidraw artifact becomes authoritative through this classification.

---

## Migration Boundary

This OCP does not authorize automatic reformatting of the entire Markdown corpus.

The pilot must first demonstrate:

- improved readability;
- preserved meaning;
- successful MkDocs rendering;
- stable navigation;
- compatibility with future Excalidraw visualization.

Corpus-wide normalization requires a separate reviewed migration step after the pilot is accepted.

---

## Scope

- docs/architecture/ocp/OCP-006-WIKI-PRESENTATION-AND-VISUALIZATION.md
- docs/standards/WIKI-PRESENTATION-STANDARD.md
- docs/assets/stylesheets/wiki.css
- mkdocs.yml
- docs/institute/INSTITUTE-ARCHITECTURE.md
- docs/discipline/OPERATING-PLAN.md
- docs/research-programs/001-institutional-memory/case-studies/001-NASA-CHALLENGER.md

---

## Governance Boundary

This change affects presentation and readability.

It does not redesign:

- the Russow Institute;
- the Systems Architect Discipline;
- the Canon;
- the knowledge lifecycle;
- the knowledge lineage;
- the current research program;
- the current operating objective.

---

## Approval

Approved by the governing Systems Architect Discipline session.

---

## Pilot V4 — Institutional Knowledge Publication System

### Decision

Presentation Pilot v3 is technically successful but visually rejected as the
final institutional presentation standard.

The pilot demonstrated that the repository can support:

- structured document identity;
- semantic status and principle treatments;
- operational objective treatments;
- visualization lineage;
- constrained navigation;
- wider diagram and table presentation;
- strict MkDocs validation;
- repository governance validation.

These capabilities are retained as implementation knowledge.

Pilot v3 is not approved for corpus-wide migration.

### Reason

The presentation remains recognizably a technical documentation system.

That standard is insufficient for the long-term role of the Russow Institute.

The Institute requires a publication system capable of presenting foundational
knowledge with the rigor expected of:

- a research institution;
- a standards body;
- a scholarly publication;
- an executive governance library;
- a durable institutional archive.

The objective is not decorative sophistication.

The objective is visible precision, permanence, hierarchy, provenance,
traceability, and epistemic clarity.

### New Presentation Model

The wiki presentation layer shall be developed as an:

**Institutional Knowledge Publication System**

The system shall preserve Markdown as the authoritative knowledge source while
providing a publication-grade presentation layer appropriate to the authority,
maturity, provenance, and function of each document.

### V4 Acceptance Standard

The v4 pilot shall be evaluated at public-company and institutional-publication
quality.

The presentation shall be suitable for review by audiences such as:

- researchers;
- educators;
- institutional leaders;
- executive leadership;
- boards;
- professional advisors;
- investors;
- diligence teams;
- future stewards of the discipline.

The presentation shall communicate seriousness through structure and evidence,
not through promotional language.

### Flagship Pilot

The primary v4 pilot document is:

`docs/institute/INSTITUTE-ARCHITECTURE.md`

This document is selected because it requires the publication system to handle:

- authoritative document identity;
- long-form explanatory prose;
- governing principles;
- institutional relationships;
- system architecture;
- feedback loops;
- knowledge lineage;
- diagrams;
- derived visualizations.

### Secondary Pilot Documents

After the Institute Architecture flagship is accepted, the system shall be
tested against:

1. NASA Challenger — research and evidence publication;
2. Systems Architect Discipline Operating Plan — governance and operations.

### Implementation Boundary

No corpus-wide presentation migration is authorized by this section.

No additional CSS iteration shall occur until the v4 publication specification
is accepted.

The next implementation stage shall be the Institute Architecture flagship
pilot.

---

## V4 Flagship Acceptance

### Decision

The Institute Architecture flagship is approved as the reference implementation
for the Institutional Knowledge Publication System.

The flagship passed both technical validation and visual review.

### Accepted Characteristics

The accepted flagship demonstrates:

- immediate institutional identity;
- explicit document authority;
- publication-grade title and metadata hierarchy;
- executive orientation before detailed content;
- controlled long-form reading measure;
- a spatial knowledge region distinct from ordinary prose;
- a first-class derived system visualization;
- preserved authoritative Markdown representation;
- explicit visualization lineage;
- linked authoritative supporting documents;
- semantic governing principles;
- structured institutional relationships;
- responsive layout constraints;
- disciplined use of whitespace;
- restrained institutional visual language.

### Visualization Decision

The Master Institute Map is approved as a derived publication artifact.

Its authoritative meaning remains represented in Markdown.

The visual artifact may improve comprehension but may not become the sole
location of architectural meaning.

### Layout Decision

Spatial artifacts may exceed the ordinary prose reading measure when needed for
comprehension.

They must remain within the actual publication content canvas and must not
collide with persistent navigation or the table of contents.

Viewport-wide breakout techniques that ignore the publication shell are not an
approved pattern.

### Reference Implementation

The reference flagship consists of:

- `docs/institute/INSTITUTE-ARCHITECTURE.md`
- `docs/assets/stylesheets/institute-flagship.css`
- `docs/assets/images/diagrams/institute-architecture.svg`

These files establish implementation precedent.

They do not authorize indiscriminate copying of page-specific presentation
rules to unrelated document classes.

### Gate Status

The v4 publication-system sequence is now:

1. approve publication specification — COMPLETE;
2. develop Institute Architecture flagship — COMPLETE;
3. visually review flagship — COMPLETE;
4. develop NASA Challenger research template — NEXT;
5. develop Operating Plan governance template;
6. validate responsive behavior;
7. approve publication system;
8. define corpus-wide migration;
9. migrate only after separate authorization.

No corpus-wide migration is authorized by this acceptance.
