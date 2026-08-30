# Wiki Presentation Standard

Version: 1.1.0

Status:
Active Standard

---

## Purpose

This standard defines how authoritative Russow Institute Markdown should be presented for human reading while remaining durable, portable, searchable, and suitable for future derived visualization.

The objective is not decoration.

The objective is comprehension.

---

## Governing Principles

The repository remains the source of truth.

Markdown remains the authoritative knowledge format.

Presentation should make structure visible without obscuring substance.

Formatting should help readers answer:

- Where am I?
- What matters here?
- How is this organized?
- How does it connect?
- Where should I go next?

---

## Document Hierarchy

Every major document should contain exactly one H1 heading.

Use:

- H1 for the document title;
- H2 for major sections;
- H3 for subordinate sections;
- deeper headings only when the content genuinely requires them.

Do not use multiple H1 headings to simulate major sections.

---

## Metadata

Governed documents shall preserve required metadata such as Version and Status in the form required by repository governance.

Metadata belongs immediately below the document title unless another governing standard requires otherwise.

---

## Section Rhythm

Use normal Markdown horizontal rules between major conceptual divisions when a visible break materially improves orientation.

Preferred separator:

    ---

Do not use long lines of repeated hyphens as visual decoration.

Do not insert separators between every small subsection.

---

## Progressive Disclosure

Major documents should generally progress from orientation to depth.

Where appropriate, use:

1. Overview
2. Core Idea
3. Practical Meaning
4. Deeper Explanation
5. Evidence or Research
6. Related Concepts
7. Continue Reading

This standard extends, but does not replace, the Progressive Disclosure Standard.

---

## Prose

Prefer short, coherent paragraphs.

Avoid presenting ordinary prose as disconnected one-line fragments unless the fragment structure itself carries meaning.

Use whitespace deliberately.

The visual rhythm should make a document easy to scan without turning it into a collection of decorative boxes.

---

## Lists

Use bullet lists for grouped concepts.

Use numbered lists when sequence, priority, or order matters.

Use task lists for actual completion states.

Do not use lists merely to avoid writing clear prose.

---

## Tables

Use tables when comparison across consistent attributes is materially clearer than prose.

Do not force narrative material into tables.

---

## Quotations

Use blockquotes for:

- direct quotations;
- intentionally elevated governing statements;
- principles whose separation materially improves comprehension.

Do not use blockquotes as generic decoration.

---

## Admonitions

Admonitions may be used when semantic classification helps the reader.

Recommended uses include:

- Principle
- Evidence
- Observation
- Hypothesis
- Example
- Warning
- Research Status

Admonitions should remain uncommon enough that they retain meaning.

---

## Diagrams

Use native Markdown or text diagrams when the relationship is simple and remains clear in linear form.

Use a richer visual representation when spatial relationships materially improve understanding.

Strong visualization candidates include:

- system architecture;
- knowledge lineage;
- lifecycle flows;
- feedback loops;
- organizational relationships;
- research pipelines;
- framework relationships;
- multi-node causal systems.

---

## Excalidraw

Excalidraw is a derived visualization layer.

The authoritative concept must remain represented in repository Markdown.

A future Excalidraw workflow should be able to identify:

- nodes;
- relationships;
- sequence;
- hierarchy;
- feedback;
- evidence lineage;
- conceptual grouping.

Important architecture documents should therefore use explicit headings and relationship language rather than relying only on visual positioning.

When an Excalidraw artifact exists, it should reference its authoritative Markdown source.

The Markdown source should reference the derived visual when that visual is useful for orientation.

Excalidraw shall not become a competing repository of institutional knowledge.

---

## Relationship to OCP-004

OCP-004 establishes that Institute visualization remains derived from the authoritative Institute Architecture.

This standard extends that principle to the broader wiki.

---

## Related Knowledge

Major documents should follow the Knowledge Linking Standard where practical.

Important pages should not become dead ends.

Use Related Concepts, Related Research, Related Case Studies, Related Standards, and Continue Reading when those sections materially improve navigation.

---

## Accessibility

Presentation must preserve:

- readable contrast;
- readable line length;
- clear heading hierarchy;
- keyboard-accessible navigation;
- descriptive link text;
- semantic Markdown;
- usable mobile presentation.

Meaning shall not depend solely on color.

---

## Styling Boundary

The Russow Institute wiki shall use wiki-specific styling.

The public jryanrussow.com stylesheet is not the Institute wiki stylesheet.

Wiki styles shall target MkDocs Material structures specifically and shall not be coupled to the public marketing website.

---

## Migration

Existing documents shall not be blindly reformatted.

Migration should be deterministic where possible.

Before corpus-wide migration:

1. define the transformation;
2. test representative documents;
3. build MkDocs;
4. inspect the rendered result;
5. confirm meaning was preserved;
6. then automate only the transformations that are safe.

---

## Visual Presentation Grammar

The Institute wiki shall use a restrained visual grammar that communicates
meaning through consistent presentation rather than decoration.

Presentation elements must remain subordinate to the knowledge itself.

### Document Identity

Major governed documents should make their identity immediately apparent.

The opening region should communicate, where applicable:

- document title;
- version;
- status;
- document type;
- research program;
- governing relationship.

Metadata remains authoritative Markdown content.

CSS may improve its visual presentation, but meaning shall not depend on CSS.

### Governing Principles

A governing principle may be visually elevated when separating it from
surrounding prose materially improves comprehension.

Use a blockquote or semantically appropriate admonition.

Do not create decorative callout boxes merely to make a page appear more
designed.

### Research Status

Research drafts, hypotheses, incomplete evidence, and provisional conclusions
should use semantic admonitions when the status materially affects how the
reader should interpret the content.

Recommended labels include:

- Research Status
- Evidence
- Observation
- Hypothesis
- Warning

### Questions

Research questions should remain explicit and scannable.

Numbered lists are preferred when questions form a defined investigation set.

### Related Knowledge

Related-document sections should provide navigational value rather than simply
displaying filenames.

Use descriptive Markdown links when the target exists in the repository.

Important documents should provide a clear path forward through sections such
as:

- Related Concepts
- Related Research
- Related Case Studies
- Related Standards
- Continue Reading

### Document Rhythm

Major conceptual sections should have sufficient whitespace to remain visually
distinct.

Horizontal rules may separate major conceptual regions but should not appear
between every heading.

Heading hierarchy, whitespace, and typography should perform most of the
organizational work.

### Visual Restraint

The Institute presentation should avoid:

- excessive cards;
- excessive borders;
- decorative gradients;
- unnecessary icons;
- dashboard-like presentation of ordinary prose;
- color used without semantic purpose;
- visual effects that compete with reading.

The desired character is institutional rather than promotional.

---

## Diagram Classification

Diagrams shall be classified before presentation technology is selected.

### Class I — Linear Relationship

Examples:

- simple sequences;
- short pipelines;
- one-direction processes;
- small hierarchies.

These may remain native Markdown or text diagrams when they remain immediately
understandable.

### Class II — Structured System

Examples:

- branching architecture;
- multi-node relationships;
- organizational systems;
- knowledge flows;
- research pipelines.

These are strong candidates for derived Excalidraw visualization.

### Class III — Dynamic System

Examples:

- feedback loops;
- causal systems;
- recursive processes;
- systems with multiple interacting pathways.

These should normally receive a derived Excalidraw visualization when spatial
representation materially improves understanding.

### Source Authority

Regardless of diagram class, authoritative meaning remains in Markdown.

A visualization may clarify the source.

It may not replace the source.

---

## Excalidraw Artifact Standard

Derived Excalidraw artifacts shall live under:

    docs/assets/excalidraw/

Where practical, artifact paths should mirror the authoritative knowledge
domain.

Example:

    docs/assets/excalidraw/institute/institute-architecture.excalidraw

Rendered exports intended for MkDocs may live under:

    docs/assets/images/diagrams/

The authoritative Markdown source shall identify the derived visualization
when one exists.

The Excalidraw artifact shall identify its authoritative Markdown source in
its associated repository documentation or metadata workflow.

Excalidraw artifacts shall not contain authoritative concepts that are absent
from the governing Markdown.

---

## Standard Outcome

A well-presented Institute document should feel:

- calm;
- structured;
- readable;
- authoritative;
- navigable;
- evidence-aware;
- visually coherent.

The presentation should disappear behind the knowledge.

---

## Current Publication Governance

The Institutional Knowledge Publication System defined below is the active
presentation direction for the Russow Institute.

Presentation Pilot v3 is retained as implementation history only.

Pilot v3 demonstrated technical feasibility but was not approved as the final
institutional presentation system.

The governing implementation sequence is defined by the v4 approval gate in
this standard and by OCP-006.

No corpus-wide migration is authorized until the v4 publication system passes
its flagship, research, governance, and responsive validation gates.

---

## Institutional Knowledge Publication System

### Purpose

The Russow Institute wiki shall function as an institutional knowledge
publication system rather than merely as a rendered documentation repository.

The publication layer exists to make authoritative Markdown easier to
understand without changing the authority of the underlying knowledge.

The repository remains the source of truth.

Markdown remains authoritative.

Presentation remains subordinate to knowledge.

### Design Doctrine

The presentation system shall communicate:

- precision;
- permanence;
- hierarchy;
- authority;
- provenance;
- traceability;
- maturity;
- restraint.

Visual distinction shall communicate meaning.

Decoration without semantic purpose shall be avoided.

The system shall not manufacture importance through visual excess.

It shall make the actual structure and authority of the knowledge visible.

## Knowledge Classes

The publication system shall visually distinguish materially different classes
of knowledge.

At minimum, the system shall support:

### Canon

Represents the current authoritative understanding of the discipline.

Canon shall be visually distinct from research drafts, hypotheses, operational
documents, and commentary.

### Research

Represents active investigation, evidence development, analysis, and findings.

Research presentation shall make maturity and evidentiary status visible.

### Evidence

Represents material supporting or challenging a finding, hypothesis, framework,
or Canon proposition.

Evidence shall remain distinguishable from interpretation.

### Primary Sources

Primary sources shall be identifiable as source material rather than Institute
interpretation.

### Case Studies

Case studies shall expose their research program, question, evidence status,
findings status, and relationship to broader Institute knowledge.

### Hypotheses

Hypotheses shall never be visually indistinguishable from established findings
or Canon.

### Standards

Standards shall communicate normative authority and applicability.

### Governance and Operations

Operating plans, ACPs, OCPs, procedures, and related governance artifacts shall
be recognizable as institutional control documents.

### Derived Visualizations

Excalidraw and other visual artifacts are derived representations.

They may clarify authoritative Markdown.

They may not silently redefine it.

## Universal Document Anatomy

Governed documents should support a consistent publication anatomy where
applicable.

### 1. Institutional Context

The reader should be able to identify the body of knowledge or institution to
which the document belongs.

### 2. Document Identity

The document should expose the metadata necessary to understand its role.

Applicable fields may include:

- document ID;
- document type;
- title;
- authority;
- status;
- maturity;
- version;
- effective date;
- revision date;
- research program;
- Canon relationship;
- source classification.

Not every document requires every field.

Metadata shall be semantically justified rather than mechanically duplicated.

### 3. Executive Orientation

Complex documents should provide enough orientation for a qualified reader to
understand:

- what the document is;
- why it exists;
- what question or problem it addresses;
- where it sits in the larger system.

### 4. Main Knowledge Body

Long-form content shall prioritize readability.

Ordinary prose should use a controlled reading measure.

### 5. Spatial Knowledge Region

Diagrams, evidence matrices, timelines, large tables, system maps, and similar
artifacts may use substantially more horizontal space than prose.

The publication system shall not constrain spatial knowledge to the same width
as paragraphs when doing so reduces comprehension.

### 6. Provenance and Lineage

Important knowledge should expose where it came from and what it affects.

### 7. Related Knowledge

Documents should expose meaningful relationships without degenerating into an
undifferentiated repository file listing.

## Epistemic Presentation

The visual system shall make epistemic state legible.

A reader should be able to distinguish, where applicable:

- observation;
- primary source;
- evidence;
- hypothesis;
- finding;
- framework;
- principle;
- standard;
- Canon.

These states shall not be differentiated merely by arbitrary color.

Labels, structure, typography, provenance, and restrained semantic treatments
should work together.

## Provenance Model

The long-term publication system should support visible knowledge lineage.

A canonical lineage model is:

`Observation → Primary Source → Evidence → Finding → Framework → Canon`

Not every knowledge artifact must pass through every state.

The purpose of the model is traceability, not bureaucracy.

A reader should ultimately be able to determine:

1. what is being asserted;
2. what supports the assertion;
3. where the supporting material originated;
4. how mature the conclusion is;
5. what knowledge depends upon it;
6. how the understanding changed over time.

## Typography

Typography is part of the information architecture.

The system shall establish deliberate distinction among:

- institutional identity;
- document title;
- document metadata;
- section headings;
- subsection headings;
- body prose;
- definitions;
- principles;
- evidence;
- captions;
- citations;
- annotations;
- status information.

Typography shall remain restrained.

The objective is hierarchy and readability, not visual novelty.

## Navigation Architecture

Repository organization and reader navigation are related but not identical
problems.

The publication system should organize reader navigation around intellectual
domains such as:

- Discipline;
- Canon;
- Research;
- Evidence;
- Case Studies;
- Field Research;
- Institute;
- Standards;
- Governance.

Persistent navigation shall not become a raw reproduction of every repository
file and heading.

Navigation should answer:

- Where am I?
- What body of knowledge am I in?
- What is this document related to?
- Where should I go next?

## Visualization Architecture

Spatial relationships should be visualized when visualization materially
improves comprehension.

Excalidraw is an approved derived-visualization mechanism.

Every governed derived visualization should identify:

- its authoritative Markdown source;
- its visualization class;
- whether it is explanatory or normative;
- its relationship to the source;
- its revision state where appropriate.

Possible visualization classes include:

- system architecture;
- knowledge lifecycle;
- knowledge lineage;
- process;
- chronology;
- organizational relationship;
- evidence relationship;
- decision model.

The authoritative Markdown must remain understandable without requiring the
derived visualization to define hidden knowledge.

## Flagship Publication Standard

The first v4 flagship is Institute Architecture.

Approval requires more than correct rendering.

The page must demonstrate:

- immediate institutional identity;
- clear document authority;
- publication-grade hierarchy;
- readable long-form prose;
- effective use of desktop space;
- first-class system visualization;
- clear governing principles;
- visible knowledge relationships;
- restrained visual language;
- coherent navigation;
- explicit visualization lineage;
- responsive usability.

The page should withstand presentation to a research board, executive team,
institutional partner, professional advisor, investor, or diligence reviewer
without appearing to be an unfinished developer documentation site.

## Research Publication Standard

NASA Challenger shall serve as the research-publication validation case.

The template should make immediately legible:

- research program;
- research question;
- status;
- evidence state;
- findings state;
- related concepts;
- source lineage;
- current limitations.

A research draft must never visually imply a level of certainty that the
underlying evidence does not support.

## Governance Publication Standard

The Systems Architect Discipline Operating Plan shall serve as the governance
and operations validation case.

The template should make immediately legible:

- authority;
- status;
- version;
- current objective;
- execution rules;
- priority;
- completion criteria.

Operational documents should appear controlled and authoritative without being
confused with Canon or research publications.

## Responsive Standard

Desktop presentation shall use available space intelligently.

Mobile presentation shall preserve:

- hierarchy;
- readability;
- semantic distinctions;
- navigation;
- provenance.

Wide spatial artifacts may adapt, scroll, or use alternate responsive
presentation where necessary.

Responsive behavior shall not silently remove knowledge.

## Restraint Standard

The Russow Institute presentation system shall avoid:

- gratuitous gradients;
- decorative animation;
- excessive card layouts;
- arbitrary color coding;
- dashboard aesthetics applied to scholarship;
- oversized marketing typography;
- visual treatments that imply unsupported certainty;
- ornamental complexity.

The visual language should age well.

## Approval Gate

Pilot v3 is retained as a successful technical prototype.

Pilot v3 is not approved as the final institutional presentation system.

Pilot v4 shall proceed in this order:

1. approve this specification;
2. develop the Institute Architecture flagship;
3. visually review the flagship;
4. develop the NASA Challenger research template;
5. develop the Operating Plan governance template;
6. validate responsive behavior;
7. approve the publication system;
8. define the corpus-wide migration;
9. migrate only after separate authorization.

No corpus-wide migration is authorized by this standard.

---

## Flagship-Derived Publication Rules

The Institute Architecture flagship establishes the first accepted reference
implementation of the Institutional Knowledge Publication System.

The following rules are generalized from that implementation.

### Institutional Opening

Foundational and governed documents should establish institutional context
before detailed content.

Where applicable, the opening region may contain:

1. institutional or knowledge-domain identity;
2. document title;
3. concise executive orientation;
4. controlled metadata;
5. authority or source declaration.

The opening region should help a qualified reader understand the document
before navigating into detail.

### Executive Orientation

Complex documents should orient the reader before requiring interpretation of
the full document.

Executive orientation should identify the minimum information necessary to
understand:

- scope;
- function;
- governing relationship;
- knowledge role.

Orientation is not an executive summary of every section.

Its purpose is structural comprehension.

### Reading Measure

Ordinary prose shall remain within a controlled reading measure.

The presentation system should not use the entire available desktop width for
normal paragraphs merely because the space exists.

### Spatial Knowledge Regions

System maps, evidence matrices, timelines, large relationship tables, and
similar spatial artifacts may use a wider measure than ordinary prose.

A spatial region shall:

- remain inside the actual publication content canvas;
- preserve separation from persistent navigation;
- preserve separation from the page table of contents;
- remain usable at supported responsive widths;
- provide an accessible textual or semantic counterpart when necessary.

Spatial artifacts shall not size themselves against the browser viewport when
doing so causes them to ignore the publication shell.

### Derived Visualization Presentation

A major derived visualization should include, where appropriate:

- descriptive alternative text;
- a figure identity or caption;
- its relationship to authoritative Markdown;
- access to the authoritative text representation;
- sufficient visual scale to communicate the intended system.

A derived diagram should appear as a publication artifact rather than as
decorative media.

### Authoritative Text Representation

Where a rich visualization is derived from an existing text diagram or explicit
relationship model, the authoritative textual representation may be preserved
in a disclosure element.

This provides:

- source transparency;
- portability;
- accessibility;
- auditability;
- resilience if the visualization layer changes.

The disclosure should not compete visually with the primary publication
artifact.

### Supporting Knowledge

References to authoritative related documents should normally be rendered as
usable links rather than raw repository paths or filenames.

Related knowledge should explain why the referenced document matters.

### Institutional Components

When a document describes multiple organizations, laboratories, systems, or
knowledge components, repeated free-standing fragments should be normalized
into coherent semantic structures such as:

- concise lists;
- relationship tables;
- clearly labeled institutional-function sections.

Presentation shall not change the underlying assertions.

### Relationship Tables

Tables are appropriate when multiple entities are being compared across the
same relationship dimension.

Relationship tables should remain concise and should not be used to force
ordinary narrative into tabular form.

### Governing Principles

Foundational and governing principles may receive restrained semantic emphasis.

The emphasis shall indicate authority or interpretive importance rather than
serve as decoration.

### Section Rhythm

Major sections require enough whitespace to remain distinct.

Excessive vertical gaps that fragment a document should be avoided.

The accepted flagship favors:

- deliberate section boundaries;
- controlled spacing;
- sparse horizontal rules;
- consistent heading rhythm.

### Publication Restraint

The accepted flagship demonstrates that institutional presentation does not
require:

- promotional hero sections;
- decorative animation;
- excessive cards;
- gradients;
- ornamental illustration;
- dashboard-style information density.

The publication should derive authority from clarity, structure, provenance,
and content.

### Reference vs Template

The Institute Architecture flagship is a reference implementation.

It is not a universal template.

Research documents, Canon documents, governance documents, standards, and
primary-source materials may require different publication anatomy while still
following the same governing principles.
