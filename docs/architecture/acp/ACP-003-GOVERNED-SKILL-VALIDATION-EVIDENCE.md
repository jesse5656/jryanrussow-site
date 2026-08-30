# ACP-003 — Governed Skill Validation Evidence Architecture

Version: 1.0.0

Status:
Proposed

Type:
Architecture Change Proposal

## Problem

The Russow Institute develops executable skills and methodologies using
controlled development packages, blind operator materials, evaluator-only
materials, regression controls, independent evaluation, acceptance records,
and cryptographic manifests.

These artifacts are institutional evidence of how a methodology or skill
version was validated.

The repository does not currently define a permanent architecture for this
class of evidence.

Research evidence and skill-validation evidence serve different purposes and
must not be silently combined.

Installed skill references must also remain free from evaluator-only truth,
expected fixture outcomes, hidden control information, and other materials
that could contaminate future blind validation.

## Current State

Research Program evidence is preserved within research-program evidence and
source directories.

Operational build output may exist temporarily under output directories.

Skill-development and regression evidence has been preserved during individual
development efforts, but there is no Institute-wide canonical architecture
governing:

- validation lineage;
- frozen regression evidence;
- operator/evaluator separation;
- binary validation packages;
- long-term retention;
- checksum requirements;
- release linkage;
- or archival location.

The identify-imd-prospects V1.1 regression corpus is currently preserved
outside repositories pending this decision.

## Architectural Principle

Skill-validation evidence is a distinct institutional evidence class.

It is not:

- primary research evidence;
- ordinary operational output;
- installed-skill runtime reference material;
- or temporary chat/session material.

The governing repository owns the validation record and provenance.

Large, sealed, evaluator-only, control, or otherwise sensitive validation
artifacts may be physically stored outside ordinary Git when required to
preserve access boundaries or avoid unnecessary repository growth.

## Proposed Architecture

For a research-program-specific skill or methodology, the canonical
repository namespace shall be:

docs/research-programs/<program>/<product-or-methodology>/validation/<skill>/<version>/

The repository validation record shall contain, as applicable:

- README.md;
- VALIDATION-RECORD.md;
- ARTIFACT-MANIFEST.md;
- SHA256SUMS.txt;
- artifact-locations.json;
- readable operator-safe regression reports.

The validation record is canonical institutional memory.

Binary or controlled artifacts may live in a separately governed evidence
store and shall be referenced by:

- exact filename;
- evidence class;
- SHA-256;
- byte size;
- immutable version identifier;
- storage location;
- and access classification.

## Evidence Classes

Validation evidence shall preserve at least these distinct classes where they
exist:

### Operator

Material intentionally available to the operator performing blind or
controlled execution.

### Evaluator

Material reserved for independent evaluation.

Evaluator-only truth, expected outcomes, answer keys, or equivalent material
shall not be placed in installed-skill operating references.

### Control

Frozen fixtures, control bundles, hidden comparison material, or other
validation-control assets.

### Completed Run

Raw operator output, completed-run bundles, adjudication records, and other
execution evidence produced during the accepted regression.

### Reports

Readable regression, evaluation, acceptance, and adjudication records.

## Immutability

Once a validation version is frozen or accepted:

- original artifacts are append-only;
- existing frozen artifacts shall not be rewritten;
- archives shall not be recompressed and represented as the same artifact;
- checksums shall not be replaced to conceal changed bytes;
- corrections require a new version or explicit addendum;
- prior accepted evidence remains preserved.

## Cryptographic Integrity

SHA-256 is the minimum integrity mechanism.

Every retained substantive artifact shall be represented in a checksum or
artifact manifest.

Manifests shall preserve enough information to identify:

- artifact name;
- relative or governed storage path;
- evidence class;
- byte size;
- SHA-256;
- skill or methodology version;
- validation role;
- validation state.

## Skill and Revision Linkage

Every accepted validation record shall identify:

- skill name;
- semantic version;
- installed-skill source revision when available;
- installation provenance when available;
- validation method/version;
- regression result;
- governing repository revision that records acceptance.

The installed skill may contain a validation provenance pointer.

It shall not contain evaluator-only truth or hidden fixture outcomes as normal
operating reference material.

## Git Boundary

Ordinary Git shall contain the durable human-readable validation record,
manifests, checksums, provenance, and safe reports.

Binary validation archives do not automatically belong in Git.

Git LFS shall not be introduced solely for validation evidence without a
separate architecture decision governing LFS availability, backup, recovery,
retention, and access.

Evaluator-only and control artifacts shall not be published through ordinary
documentation navigation merely because their metadata is indexed in Git.

## Research Evidence Boundary

Research evidence supports empirical or analytical claims.

Validation evidence establishes what methodology or skill version was tested,
how it was tested, and what validation result was reached.

These evidence classes shall remain distinguishable.

## Retention

Accepted validation evidence shall be retained for the lifetime of the
methodology/skill lineage unless a later approved retention standard requires
longer preservation.

Superseding a version does not authorize deletion of its accepted validation
record.

## Trade-offs

This architecture introduces a two-layer model:

1. Git-governed institutional records and provenance.
2. Controlled immutable byte storage for artifacts that should not reside in
   ordinary Git.

This adds manifest and storage-management requirements but preserves
traceability, limits fixture leakage, and avoids forcing all binary evidence
into repository history.

## Recommendation

Approve this architecture and establish a recurring operational procedure for
skill-validation evidence archival.
