---
name: govern-ai-skill-packaging-and-deployment
description: Govern repository-first AI Skill discovery, packaging, registration, deployment, verification, rollback, and audit while preserving authoritative repository ownership, validated production identity, deterministic integrity, runtime-adapter boundaries, human authority, and secret exclusion.
---

# Govern AI Skill Packaging and Deployment

Use this Skill when work concerns the governed lifecycle of another AI Skill:

- discovering its authoritative ownership and production identity;
- packaging a validated production release;
- registering a version-specific release;
- deploying through a supported runtime adapter;
- verifying an installation;
- auditing repository, registry, and runtime state;
- or rolling back to an explicitly approved predecessor.

This Skill governs the release/deployment process.

It does not become the source of the business or engineering policy contained
inside the Skill being managed.

## Governing Principle

Repository authority precedes runtime installation.

A ChatGPT registration, local Agent Skills directory, AI Worker Node
filesystem, container image, runtime database, deployment record, registry
entry, or conversational statement does not supersede the authoritative owning
repository.

Every governed Skill has exactly one authoritative owning repository.

If that ownership cannot be established, do not invent it.

## Frozen References

Use the bundled references as the V1 contract:

- `references/skill-specification.md`
- `references/contract-freeze.json`
- `references/vocabulary.json`
- `references/registry-schema.json`
- `references/release-schema.json`
- `references/deployment-record-schema.json`
- `references/contract-invariants.md`
- `references/deterministic-validator.py`

Do not silently alter their vocabulary or semantics.

## Modes

Operate in exactly one primary mode for a bounded transaction:

- `DISCOVER`
- `PACKAGE`
- `REGISTER`
- `DEPLOY`
- `VERIFY`
- `ROLLBACK`
- `AUDIT`

A request may lead to a different exact next action, but do not pretend that a
later transaction has already occurred.

For example:

- AUDIT may recommend DEPLOY;
- DISCOVER may recommend ownership resolution;
- VERIFY may determine that no deployment is required;
- a blocked DEPLOY may recommend satisfying a dependency.

Do not collapse those separate transactions into false success.

# Universal Preflight

Before changing deployment or registration state, establish as much of the
following as the evidence supports:

1. canonical Skill name;
2. semantic version;
3. authoritative owning repository;
4. exact owning repository commit;
5. validated production status;
6. production baseline or equivalent provenance;
7. production artifact location;
8. production artifact SHA-256;
9. target runtime class;
10. runtime support status;
11. approved adapter identity;
12. required dependencies;
13. current deployment state where relevant;
14. predecessor/rollback identity where relevant;
15. applicable human authorization.

Unknown facts remain unknown.

Do not manufacture missing values merely to complete a schema or registry
entry.

# Authority Order

When evidence conflicts, use this order:

1. applicable constitutional and governance authority;
2. approved Skill specification and production decision in the owning
   repository;
3. owning-repository production baseline and versioned release metadata;
4. enterprise registry;
5. verified deployment record;
6. observed runtime installation;
7. conversational claims.

A lower source may provide evidence.

It may not silently override a higher source.

# Deterministic Before AI

Use deterministic checks whenever the fact can be computed or compared.

Examples include:

- SHA-256;
- exact file inventory;
- repository commit identity;
- semantic-version comparison;
- schema validation;
- dependency presence/version;
- registry/release identity comparison;
- installed-byte comparison;
- adapter identity;
- deployment command exit status;
- smoke-test exit/result where deterministic;
- rollback artifact identity.

When the repository-owned deterministic validator is available, use it for
registry, release, and deployment-record validation.

In a standalone runtime package, the included validator is a frozen reference.
Do not claim that it was executed unless it was actually executed.

AI reasoning may interpret ambiguous evidence, explain conflicts, prioritize
safe next actions, and identify likely governance issues.

AI reasoning shall not convert an inference into authoritative deployment
identity.

# Production Eligibility

A source tree or package is not automatically production.

Production registration or deployment requires evidence of validated
production authority.

If source/package bytes exist but production validation authority is absent,
use a blocked result such as:

- `BLOCKED_MISSING_AUTHORITY`; or
- `BLOCKED_GOVERNANCE`

as appropriate to the evidence.

Never invent a production validation decision.

# Artifact Integrity

Production artifact identity is immutable for a specific release.

If expected and observed SHA-256 values differ:

- stop;
- use `BLOCKED_HASH_MISMATCH`;
- do not register the mismatched artifact;
- do not deploy it;
- do not rewrite the approved baseline merely to make the artifact pass.

A later, intentionally changed artifact requires a new governed release
identity.

# Registry Boundary

The enterprise registry is an index and deployment-control surface.

It is not a second editable source of Skill behavior.

Registry entries shall remain version-specific.

When a new validated version exists:

- preserve the historical prior version identity;
- create the new version-specific identity;
- do not rewrite an older release into the newer version.

Do not move owning-repository authority into the registry.

# Runtime Support Boundary

A runtime may be:

- `SUPPORTED`
- `PLANNED`
- `UNSUPPORTED`
- `UNKNOWN`

Only `SUPPORTED` authorizes deployment, and a supported runtime requires an
approved adapter identity.

`PLANNED`, `UNSUPPORTED`, and `UNKNOWN` do not authorize deployment.

If the requested target is unsupported or its adapter does not exist, use:

`BLOCKED_UNSUPPORTED_RUNTIME`

Do not invent a runtime adapter.

# Dependency Gate

Required dependencies are deterministic prerequisites.

If a required dependency is missing or fails its required version constraint:

- stop deployment;
- use `BLOCKED_DEPENDENCY`;
- set the resulting deployment state to `BLOCKED`;
- identify the exact dependency that must be satisfied;
- do not report deployment success.

# Transaction Result Versus Deployment State

These are different facts.

The transaction result describes what happened to the attempted operation.

The resulting deployment status describes the resulting recorded/observed
deployment state.

Do not conflate them.

Examples:

- blocked prerequisite:
  - result: `BLOCKED_DEPENDENCY`
  - deployment state: `BLOCKED`

- direct runtime edit:
  - result: `DRIFT_DETECTED`
  - deployment state: `DRIFT_DETECTED`

- successful deployment with full verification:
  - result: `PASS`
  - deployment state: `DEPLOYED_VERIFIED`

- failed installation:
  - result: `FAIL`
  - never `DEPLOYED_VERIFIED`

- successful rollback:
  - result: `PASS`
  - deployment state: `ROLLED_BACK`

# No False Success

Never record `PASS` solely because:

- a copy command was attempted;
- some files were written;
- a runtime directory exists;
- an AI model says the operation probably worked;
- a package was generated;
- a registration was requested.

A partially completed installation whose installation command failed is a
failed transaction.

Do not hide partial state.

Required verification must support any claim of `DEPLOYED_VERIFIED`.

# Direct Runtime Editing

Installed runtime copies are derived deployments.

If installed bytes differ from the approved release because of a direct edit:

- identify drift;
- use `DRIFT_DETECTED`;
- do not promote the runtime copy into repository authority;
- do not call it verified production.

The safe next action is normally to:

- restore/redeploy the approved release; or
- return the desired behavior change to the owning repository for governed
  modification and validation.

# Rollback

Rollback requires a specific approved target.

The rollback target must identify the applicable prior:

- version;
- release identity;
- repository/production provenance;
- artifact identity.

Do not reconstruct a supposed predecessor from memory and label it as the
approved release.

If the predecessor identity is known but its exact approved artifact cannot be
retrieved, stop.

Use an appropriate result such as:

- `BLOCKED_MISSING_ARTIFACT`; or
- `ROLLBACK_REQUIRED`

without falsely claiming rollback success.

Successful production rollback requires applicable human authorization and
post-rollback identity verification.

# Human Authority

Do not fabricate human approval.

Human decision or approval is required when governance assigns it, including
material unresolved cases such as:

- conflicting authoritative ownership claims;
- production release approval;
- consequential production deployment;
- destructive replacement;
- production rollback;
- material security/governance exceptions.

When two repositories both assert unresolved authority over the same canonical
Skill, do not choose one arbitrarily.

Use `HUMAN_REVIEW` or the applicable missing-authority block and require
governed resolution.

# Secrets

Never place secret values into:

- Skill registries;
- release metadata;
- deployment records;
- production baselines;
- generated manifests;
- normal findings.

Secret examples include:

- passwords;
- API keys;
- bearer tokens;
- private keys;
- session secrets;
- database credentials.

If a request asks you to persist supplied secret material in governed Skill
metadata:

- do not repeat the secret in the response;
- do not store it;
- use `BLOCKED_GOVERNANCE` or `HUMAN_REVIEW` as warranted;
- require an approved external credential-reference mechanism.

Do not invent such a mechanism if none is established.

# AI Worker Node Boundary

The AI Worker Node is a deployment target and compute service.

It is not the Skill system of record.

Do not:

- edit canonical Skill source on the Worker Node;
- treat Worker Node filesystem state as authoritative;
- invent a Worker Node adapter before it is governed;
- require Worker Node availability for current repository preservation and
  packaging.

If AI Worker Node support is only `PLANNED`, preserve the portable validated
release and defer deployment until a governed supported adapter exists.

# Mode Procedures

## DISCOVER

Determine from available evidence:

- whether the Skill already exists;
- canonical name;
- authoritative owning repository;
- current validated production version;
- release/provenance identity;
- known deployment targets;
- missing evidence;
- conflicts.

Do not create a duplicate Skill merely because one runtime cannot see an
existing installation.

A runtime installation alone does not establish repository ownership.

If ownership is unresolved or conflicting, stop before packaging or
registration.

## PACKAGE

Before packaging:

1. establish authoritative source;
2. establish exact target version;
3. establish production validation authority;
4. establish expected runtime inventory;
5. compare source bytes with the validated production identity;
6. exclude development-only and evaluator-only material;
7. create deterministic checksums.

The package contains runtime-required files only.

Do not silently rewrite validated bytes during packaging.

## REGISTER

Register only a validated production release.

Bind the version-specific entry to:

- canonical Skill name;
- semantic version;
- owning repository;
- exact owning commit;
- production artifact;
- artifact SHA-256;
- validation reference;
- production baseline;
- supported runtimes;
- dependencies;
- deployment targets;
- rollback predecessor where applicable.

Preserve prior version identities.

Unknown authority is a block, not a field to guess.

## DEPLOY

Before deployment verify:

1. production release is validated;
2. production artifact matches its SHA-256;
3. target runtime is `SUPPORTED`;
4. approved adapter exists;
5. required dependencies pass;
6. required human authorization exists;
7. deployment action can be performed without secret leakage.

After deployment:

1. verify inventory;
2. verify installed byte identity;
3. verify supported registration mechanism where applicable;
4. verify dependencies;
5. run the governed smoke test where available;
6. record transaction result separately from resulting deployment state.

If installation fails, record failure.

Do not upgrade failure into success.

## VERIFY

Compare observed runtime state against the approved release.

Verify as applicable:

- version;
- inventory;
- hashes;
- registration mechanism;
- dependencies;
- smoke-test result;
- deployment provenance.

If everything already matches the current approved production release, report
verification success and do not require redundant redeployment.

If a verified runtime is an older approved version, state that it is behind
current production without pretending that it is the current release.

## ROLLBACK

Establish:

- current deployed version;
- explicit predecessor;
- predecessor release ID;
- exact predecessor artifact;
- applicable authorization.

If the exact artifact is unavailable, stop.

After rollback, verify the installed predecessor identity before reporting
success.

## AUDIT

Compare:

- owning repository;
- validated production release;
- registry;
- deployment records;
- observed runtime installation.

Identify:

- runtime behind production;
- unregistered installation;
- missing release artifact;
- stale registry;
- hash mismatch;
- direct runtime edit;
- unsupported runtime;
- unresolved ownership;
- incomplete deployment provenance.

Do not invent missing deployment records.

An observed installation without provenance remains unverified/unknown until
reconciled against the repository release.

# Multiple Repositories

Different Skills may legitimately belong to different authoritative
repositories.

Inventory and registry work shall preserve those distinct ownership
boundaries.

Do not consolidate authority merely for convenience.

# Existing Skill Backfill

For existing validated Skills:

1. identify current owning-repository evidence;
2. identify validated version/provenance;
3. identify production package or runtime bytes;
4. identify existing installation locations;
5. compare hashes where possible;
6. identify missing portability artifacts;
7. repair only the missing portability layer through governed work.

Do not rewrite historical validation merely because a newer registry contract
exists.

# Result Vocabulary

Use only the frozen result vocabulary when structured results are required:

- `PASS`
- `FAIL`
- `BLOCKED_MISSING_AUTHORITY`
- `BLOCKED_MISSING_ARTIFACT`
- `BLOCKED_HASH_MISMATCH`
- `BLOCKED_UNSUPPORTED_RUNTIME`
- `BLOCKED_DEPENDENCY`
- `BLOCKED_GOVERNANCE`
- `DRIFT_DETECTED`
- `ROLLBACK_REQUIRED`
- `HUMAN_REVIEW`
- `UNKNOWN`

Failure, blocked, drift, human-review, rollback-required, and unknown states
shall not be rewritten as `PASS`.

# Response Structure

When the caller supplies a schema, follow it exactly.

Otherwise provide a compact structured result containing:

- mode;
- result;
- resulting deployment status when applicable;
- authority findings;
- deterministic checks performed or required;
- human-control requirement;
- material findings;
- exact next action.

Never claim that a deterministic check was performed if it was only inferred.

The exact next action should be the narrowest safe continuation supported by
the evidence.
