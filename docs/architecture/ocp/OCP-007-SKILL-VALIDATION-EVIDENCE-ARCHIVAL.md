# OCP-007 — Skill Validation Evidence Archival

Version: 1.0.0

Status:
Proposed

Type:
Operational Change Proposal

## Purpose

Define the recurring procedure for preserving Russow Institute
skill-development and validation evidence after a version reaches a frozen
validation milestone.

## Scope

This procedure applies to:

- regression operator packages;
- evaluator-only packages;
- control bundles;
- raw operator outputs;
- completed-run bundles;
- evaluator reports;
- regression reports;
- acceptance/adjudication records;
- manifests;
- checksums;
- and related provenance.

## Procedure

### 1. Freeze

Identify the exact accepted development and validation corpus.

Do not modify frozen artifacts during archival.

### 2. Inventory

Create or verify a complete inventory containing:

- filename;
- relative location;
- byte size;
- evidence class;
- validation role.

### 3. Verify Integrity

Compute SHA-256 over original bytes.

Where a prior accepted checksum exists, the archival copy must match it.

A mismatch stops archival.

### 4. Preserve Separation

Maintain operator, evaluator, control, completed-run, and report boundaries.

Evaluator-only or control material shall not be copied into the installed
skill's normal operating references.

### 5. Archive by Copy

Transfer accepted evidence by copy rather than destructive move.

Do not delete the staging source during the initial archival transaction.

### 6. Verify Destination

After transfer, recompute SHA-256 at the destination and compare it with the
frozen source checksum.

Archival fails if source and destination bytes differ.

### 7. Create Repository Validation Record

Create the canonical repository validation record under the architecture
defined by the governing ACP.

Record:

- skill;
- version;
- validation state;
- validation date;
- exact artifact names;
- SHA-256;
- evidence classes;
- physical storage locations;
- installed-skill revision/provenance;
- governing repository revision when known.

### 8. Publication Boundary

Readable operator-safe validation reports may be indexed in repository
documentation.

Evaluator-only truth, control fixtures, expected outcomes, and equivalent
materials shall not be exposed through ordinary wiki/navigation without an
explicit reason and review.

### 9. Validate Repository

Before commit:

- inspect git diff;
- confirm unrelated work remains untouched;
- validate links and manifests;
- validate structured files;
- run applicable governance checks;
- run applicable repository tests.

### 10. Commit

Commit only files belonging to the approved validation-evidence change.

Do not use broad staging commands when unrelated repository changes exist.

### 11. Preserve Staging Until Verified

Temporary staging evidence may be retired only after:

- destination hashes pass;
- repository provenance is committed;
- required backup/replication exists;
- and deletion is separately approved.

## Immutability Rule

Frozen validation evidence is append-only.

Correction requires either:

- a new validation version; or
- an explicit addendum that preserves the original evidence.

## Naming Rule

Use the skill's canonical name and semantic version.

Example:

identify-imd-prospects/v1.1/

Do not silently replace a prior version directory.

## Completion Gate

The archival workflow is complete only when a future reviewer can determine:

1. what version was validated;
2. what evidence constituted validation;
3. which evidence was operator-visible;
4. which evidence was evaluator/control-only;
5. what result was reached;
6. the exact frozen artifact hashes;
7. where the preserved bytes reside;
8. and which implementation revision the validation applies to.
