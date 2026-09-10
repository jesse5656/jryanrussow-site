# ACP-010 — Repository Artifact Access and Authority Resolution Architecture

Version: 1.1.0

Status:
Approved

Type:
Architecture Change Proposal

------------------------------------------------------------------------------

## Purpose

Authorize a read-only institutional capability for discovering, reviewing,
rendering, and interpreting artifacts distributed across governed repositories
without creating a competing source of institutional authority.

------------------------------------------------------------------------------

## Current State

The Russow Institute preserves institutional memory across multiple repositories
with distinct responsibilities.

The existing MkDocs Wiki provides curated institutional publication and
navigation, but it is intentionally not a raw browser for every repository
artifact.

Repository Context Resolution, governed by ACP-002, resolves repository context
for governed change workflows.

There is no governed cross-repository human interface for broadly locating and
reviewing reader-authorized artifacts while making their exact Git identity,
authority, lifecycle, provenance, representation, and editability visible.

------------------------------------------------------------------------------

## Problem

Finding a repository artifact does not establish whether it is:

- governing;
- authoritative;
- implementation;
- evidence;
- generated;
- validated;
- released;
- historical;
- superseded;
- appropriate to edit;
- safe to render.

A cross-repository artifact interface must therefore expose source and authority
relationships without becoming another source of truth or duplicating existing
Repository Context Resolution logic.

------------------------------------------------------------------------------

## Proposed Architecture

Authorize V1 of:

```text
Governed repositories
        ↓
Read-only repository adapters
        ↓
Metadata normalization
        ↓
Artifact-level Authority Resolver
        ↓
Rebuildable Artifact Index
        ↓
Read-only Artifact API
        ↓
Repository Artifact Explorer
```

Derived-preview workers may provide safe previews for supported rich files.
The same read-only Artifact API may later support separately governed AI
consumers.
## Repository Context Resolution Boundary
ACP-002 remains authoritative for Repository Context Resolution.
ACP-010 does not replace or duplicate Repository Context Resolution.
Repository Context Resolution remains responsible for resolving repository-level
change context, including applicable governance and repository state.
The Artifact Authority Resolver shall consume existing deterministic repository
context and authority primitives where applicable and add only artifact-level
resolution needed for:
- exact source identity;
- artifact authority;
- lifecycle;
- artifact role;
- provenance;
- supersession;
- representation lineage;
- trust for reading;
- suitability for editing;
- authority conflict;
- unresolved authority.
A separate implementation shall not recreate repository-status, governance-status,
Operating Plan, or equivalent Repository Context Resolution logic.
## Wiki Boundary
The Institutional Wiki remains the curated publication surface.
The Repository Artifact Explorer is a separate internal discovery and inspection
surface.
The Wiki shall not automatically expose every indexed repository artifact.
The Explorer may link to curated Wiki pages, and Wiki pages may link to deeper
artifact provenance or history in the Explorer.
## Source-of-Truth Boundary
Governed repository files and Git objects remain authoritative.
The following are derived and non-authoritative:
- artifact indexes;
- normalized metadata;
- extracted text;
- search indexes;
- derived relationship graphs;
- rendered previews;
- duplicate groupings;
- authority-resolution output.
The complete index shall be rebuildable from configured repository sources.
## Authority Dimensions
V1 shall maintain independent dimensions for:
### Authority
- GOVERNING
- AUTHORITATIVE
- IMPLEMENTATION
- EVIDENCE
- EXTERNAL_SOURCE
- UNKNOWN
- AUTHORITY_CONFLICT
### Lifecycle
- DRAFT
- CANDIDATE
- VALIDATED
- RELEASE
- ACTIVE
- HISTORICAL
- SUPERSEDED
- RETIRED
- UNKNOWN
### Artifact Role
- SOURCE
- GENERATED_COPY
- VALIDATION_RUNTIME
- RELEASE_PACKAGE
- MANIFEST
- REPORT
- IMPLEMENTATION
- DERIVED_PREVIEW
- EXTERNAL_EVIDENCE
- UNKNOWN
### Exposure
- PUBLIC
- INTERNAL
- RESTRICTED
- NEVER_RENDER
Exact machine representations shall be defined in versioned implementation
schemas after architecture approval.
## Authority Resolution Requirements
V1 shall:
1. resolve exact repository, path, ref, commit, and blob identity where available;
2. establish repository responsibility before artifact inference;
3. prefer explicit governed authority evidence over heuristics;
4. treat hashes as evidence of byte identity, not authority;
5. return UNKNOWN when evidence is insufficient;
6. return AUTHORITY_CONFLICT when competing authority cannot be deterministically
   resolved;
7. distinguish trust for reading from suitability for editing;
8. never promote a surviving generated, validation, release, or historical copy
   merely because its expected source is missing;
9. preserve reasoning and evidence behind nontrivial resolution outcomes.
## Repository Authority Profiles
Each indexed repository shall have a governed profile describing:
- repository identity;
- repository role;
- responsibilities it owns;
- responsibilities it implements but does not govern;
- external governing dependencies;
- responsibilities it does not own;
- native authority sources;
- default exposure.
Profiles shall reference repository-native authority rather than duplicate it.
## Initial V1 Repository Scope
Subject to approved repository profiles and access:
- jryanrussow-site
- mwg-ops-manual
- midwest24-site
- mwg-platform
- mwg-espocrm-customizations
- midwestguard-site
Additional repositories shall be configuration-driven.
## V1 Capabilities
V1 may provide:
- read-only repository adapters;
- approved repository profiles;
- rebuildable artifact indexing;
- lexical and structured search;
- artifact browsing;
- native rendering of safe text and image formats;
- derived previews for supported rich documents;
- exact Git source identity;
- authority/lifecycle/artifact-role presentation;
- reading-versus-editing suitability;
- governing, implementation, evidence, and supersession relationships;
- duplicate and representation awareness;
- reader-authorized historical Git retrieval;
- read-only Artifact API;
- Wiki ↔ Explorer links.
Semantic/vector search is not required for V1.
## Exposure and Security
The Explorer shall be internal by default.
V1 shall have no public Explorer routes unless separately authorized.
Public GitHub visibility does not establish institutional PUBLIC exposure.
Restricted or never-render material shall not leak through:
- search;
- snippets;
- facets;
- counts;
- extracted text;
- previews;
- archive inventories;
- historical retrieval;
- related-artifact displays;
- API responses;
- logs.
Derived previews inherit at least the source artifact's exposure restriction.
## Non-Goals
This ACP does not authorize:
- repository editing;
- document editing;
- approval workflows;
- repository consolidation;
- automatic redundancy remediation;
- automatic authority promotion;
- automatic authority-conflict resolution;
- semantic/vector AI search;
- public exposure of the repository estate;
- replacement of MkDocs;
- replacement of Git or GitHub;
- AI write access;
- automatic archival or deletion;
- implementation-repository creation before separate authorization.
## Implementation Ownership
If approved, governance and authority contracts remain owned by
jryanrussow-site.
The application should live in a separate implementation repository.
Working candidate name:
russow-artifact-explorer
Creation of that repository is authorized only by Amendment 1 below.
## Relationship to Existing Governance
This proposal:
- depends on ACP-002 for Repository Context Resolution and Governance Enforcement;
- preserves OCP-006 Wiki Presentation and Visualization;
- follows the Wiki Presentation Standard;
- follows the Progressive Disclosure Standard;
- follows the Knowledge Linking Standard;
- follows existing Traceability and Knowledge Lineage principles;
- follows OCP-009 Repository-First Output Placement;
- does not elevate Proposed ACP-003 or Proposed OCP-007 to approved authority;
- may remain compatible with those proposals if they are later approved.
## Required Post-Approval Contracts
If ACP-010 is approved, implementation preparation shall define:
1. Authority Resolution Contract V1;
2. Artifact Metadata Schema V1;
3. Repository Authority Profile Schema V1;
4. Initial Repository Registry.
Those artifacts shall reuse existing governed terminology and structures where
possible rather than establish parallel governance.
## V1 Acceptance Gates
Implementation shall not be considered complete until it demonstrates:
1. exact source identity for indexed artifacts;
2. cross-repository discovery;
3. readable native and derived representations;
4. deterministic authority comprehension;
5. source/generated/validation/release/history distinction;
6. reader-authorized historical access;
7. no restricted-content leakage through derived interfaces;
8. full index rebuildability;
9. identical authority resolution through human and API consumers;
10. no duplicated Repository Context Resolution logic.
## Trade-offs
Advantages:
- substantially easier institutional artifact discovery;
- visible authority and provenance;
- one shared read-only contract for human and future AI consumers;
- retention of repository-first institutional memory;
- no forced expansion of curated Wiki navigation.
Costs:
- additional internal application and index infrastructure;
- repository-profile maintenance;
- preview-worker security requirements;
- deterministic authority-resolution implementation complexity.
## Recommendation
Approve V1 architecture.
Do not authorize application implementation until the supporting contracts and
repository profiles have been prepared and reviewed under the approved
architecture.
## Approval
Approved by the governing Systems Architect Discipline session on 2026-09-10.
The original ACP-010 approval did not itself authorize implementation-repository
creation. Amendment 1 below separately authorizes the bounded repository
bootstrap while preserving the implementation gate.

------------------------------------------------------------------------------

## Amendment 1 — Implementation Repository Authorization

Version: 1.0.0

Status:
Approved

Approved:
2026-09-10

ACP-010 is amended to authorize creation and governance-only bootstrap of:

`jesse5656/russow-artifact-explorer`

The repository shall initially be:

- GitHub visibility: Private;
- institutional exposure: INTERNAL;
- implementation-only;
- read-only in V1 application behavior.

The implementation repository may own:

- Repository Artifact Explorer application implementation;
- Artifact API implementation;
- repository adapters;
- rebuildable artifact-index implementation;
- derived-preview implementation;
- user-interface implementation;
- implementation tests and validation.

It shall not own or redefine:

- enterprise governance;
- Repository Context Resolution;
- artifact authority rules;
- authority vocabulary;
- repository authority profiles;
- source-repository authority;
- ACP-010 contracts.

The controlling ACP-010 contract revision for bootstrap is:

`24b5d62afd45b92ccf965a888dc6ac0e67da7b1f`

The implementation repository shall reference that immutable revision rather
than copy the controlling contracts.

This amendment authorizes repository creation and governance-only bootstrap.

It does not yet authorize application implementation.

Application implementation remains blocked until:

1. the bootstrap repository is committed and published;
2. the implementation repository is registered in the governing repository;
3. cross-repository authority references are validated;
4. a bounded first implementation objective is separately authorized.

Approved by the governing Systems Architect Discipline session on 2026-09-10.
