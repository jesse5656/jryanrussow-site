# Authority Resolution Contract V1

Version: 1.0.0

Status:
Approved

Governed By:
ACP-010 — Repository Artifact Access and Authority Resolution Architecture

## Purpose

Define the deterministic contract for resolving artifact-level authority,
lifecycle, provenance, representation, reading trust, and editing suitability
without replacing repository authority or Repository Context Resolution.

## Architectural Boundary

ACP-002 remains authoritative for Repository Context Resolution.

Repository Context Resolution resolves repository-level change context,
applicable governance, repository identity, Git state, and related deterministic
repository context.

The Artifact Authority Resolver consumes those primitives where applicable and
adds artifact-level resolution only.

It shall not independently recreate:

- repository-status resolution;
- Operating Plan resolution;
- ACP/OCP status resolution;
- repository governance discovery;
- repository change-context logic.

## Inputs

A resolution request should provide or resolve, where available:

- repository identity;
- repository authority profile;
- path;
- ref;
- commit identity;
- blob identity;
- content hash;
- media type;
- artifact metadata;
- repository-native authority declarations;
- approved governance references;
- manifests;
- registries;
- release records;
- provenance relationships;
- representation relationships;
- supersession relationships.

Missing information remains unknown rather than inferred as fact.

## Resolution Order

The resolver shall:

1. establish exact repository, path, ref, commit, and blob identity;
2. resolve repository responsibility from the governed repository profile;
3. consume existing Repository Context Resolution output where applicable;
4. evaluate explicit repository-native authority declarations;
5. evaluate approved ACP/OCP, policy, registry, manifest, release, and lineage evidence;
6. classify authority, lifecycle, artifact role, and exposure independently;
7. resolve provenance, representation, governing, and supersession relationships;
8. use hashes only as evidence of byte identity;
9. search known competing authority claims;
10. return a deterministic resolution status and supporting evidence.

## Authority Classification

Allowed authority classifications are:

- GOVERNING
- AUTHORITATIVE
- IMPLEMENTATION
- EVIDENCE
- EXTERNAL_SOURCE
- UNKNOWN
- AUTHORITY_CONFLICT

## Lifecycle Classification

Allowed lifecycle classifications are:

- DRAFT
- CANDIDATE
- VALIDATED
- RELEASE
- ACTIVE
- HISTORICAL
- SUPERSEDED
- RETIRED
- UNKNOWN

## Artifact Role Classification

Allowed artifact roles are:

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

## Exposure Classification

Allowed exposure classifications are:

- PUBLIC
- INTERNAL
- RESTRICTED
- NEVER_RENDER

Public GitHub visibility does not by itself establish PUBLIC institutional
exposure.

## Resolution Status

The resolver may return:

- AUTHORITATIVE_EDITABLE_SOURCE
- GOVERNING_SOURCE
- IMPLEMENTATION_OF_EXTERNAL_AUTHORITY
- GENERATED_REPRESENTATION
- IMMUTABLE_RELEASE
- VALIDATION_EVIDENCE
- HISTORICAL_SOURCE
- SUPERSEDED_SOURCE
- AUTHORITY_CONFLICT
- UNKNOWN

## Reading and Editing

Reading trust and editing suitability are separate determinations.

An artifact may be trustworthy evidence for reading while being inappropriate
to edit.

Editing suitability shall be one of:

- EDITABLE_AUTHORITY
- NOT_EDITABLE
- UNKNOWN

Reading trust shall be one of:

- TRUSTED
- LIMITED
- UNKNOWN

## Unknown and Conflict Rules

Missing metadata shall not be silently inferred.

When evidence is insufficient, return UNKNOWN.

When materially competing authority claims cannot be deterministically
resolved, return AUTHORITY_CONFLICT.

A surviving generated, validation, release, installed, historical, or duplicate
copy shall never be promoted merely because an expected source is unavailable.

## Hash Rule

Hash equality proves byte identity only.

It does not establish:

- authority;
- ownership;
- lifecycle;
- editability;
- redundancy;
- supersession.

## Derived Representation Rule

Derived previews, extracted text, normalized metadata, indexes, and rendered
representations are non-authoritative.

Every derived representation shall retain enough source identity to resolve its
originating repository artifact.

## Required Resolution Evidence

Nontrivial resolver output shall preserve machine-readable evidence describing:

- which authority sources were consulted;
- which relationships were established;
- which evidence controlled the result;
- unresolved facts;
- detected conflicts.

## Consumer Consistency

Human Explorer and future governed AI consumers shall receive authority
resolution through the same Artifact API contract.

A consumer shall not independently reinterpret artifact authority.

## Mutation Boundary

V1 is read-only.

The resolver shall not:

- edit repository content;
- alter governance status;
- promote artifacts;
- resolve conflicts by mutation;
- change exposure classifications;
- create authority.

## Approval

Approved by the governing Systems Architect Discipline session on 2026-09-10.
