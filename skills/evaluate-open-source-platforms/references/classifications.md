# Exact Classification Vocabulary

## Required-capability implementation class

Use exactly one primary classification per required capability:

- `NATIVE_OPEN_SOURCE` — ships in the relevant open-source product.
- `CONFIGURABLE_OPEN_SOURCE` — included open-source tooling can configure the capability.
- `OPEN_SOURCE_EXTENSION` — a separate open-source extension provides the capability.
- `CUSTOM_OPEN_SOURCE_BUILD` — the organization must build and maintain it using an open-source toolchain.
- `EXTERNAL_INTEGRATION` — another system appropriately owns the capability.
- `PROPRIETARY_PAID_DEPENDENCY` — required proprietary licensed software is necessary.
- `MISSING` — the candidate cannot currently provide the capability.
- `UNKNOWN` — evidence is insufficient.

`UNKNOWN` is not a pass.

## Portability class

- `PORTABLE_NATIVE` — complete meaningful export/recovery is proven.
- `PORTABLE_WITH_TRANSFORM` — meaning can be preserved with a documented transformation.
- `DATABASE_RECOVERABLE` — meaning can be reconstructed from a documented accessible database/schema and files.
- `PARTIAL_EXPORT` — material information is lost.
- `PROPRIETARY_FORMAT` — meaning depends on proprietary tooling or inaccessible format.
- `UNKNOWN` — exit behavior is unproven.

## Evaluation decision

Return exactly one:

- `ACCEPT_CANDIDATE`
- `CONDITIONAL`
- `DEFER`
- `REJECT`
- `REASSESS_CURRENT_PLATFORM`

## Health severity

- `INFO`
- `WATCH`
- `REVIEW`
- `CRITICAL`

## Hard-failure defaults

Normally return `REJECT`, or `REASSESS_CURRENT_PLATFORM` for an installed platform, when any required condition is established:

- a required capability depends on unapproved proprietary software;
- complete material business data cannot be recovered;
- material relationships are lost on exit;
- backups cannot be restored;
- API/export access requires an unacceptable paid tier;
- custom business logic cannot be independently retained;
- required components are abandoned without an acceptable maintained path;
- routine maintenance violates the stated operating constraint;
- critical security exposure lacks an acceptable remediation path.
