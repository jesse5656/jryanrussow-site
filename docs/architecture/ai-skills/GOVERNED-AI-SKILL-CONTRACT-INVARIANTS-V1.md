# Governed AI Skill Contract Invariants V1

Version: 1.0.0

Status:
Frozen

Authority:
Systems Architect Discipline

Governing Architecture:
ACP-008 — Governed AI Skill Packaging, Registry, and Deployment

---

## Purpose

Define deterministic semantic invariants that cannot be expressed completely
or safely through JSON Schema structure alone.

These invariants are part of the frozen V1 contract set.

---

## Registry Invariants

1. `entry_id` shall be unique across the registry.
2. `(skill_name, version)` shall be unique across the registry.
3. Each registered entry shall represent a validated production release.
4. A registry entry shall not manufacture missing ownership, validation, or
   artifact identity.
5. `supported_runtimes` shall contain no duplicate `runtime_class`.
6. A runtime with `support_status = SUPPORTED` requires a non-null
   `adapter_id`.
7. `deployment_targets` shall contain no duplicate `target_id`.
8. The registry is an index and deployment-control record, not a source of
   Skill behavior.

---

## Release Invariants

1. A release binds one canonical Skill name and semantic version to one owning
   repository commit.
2. A release requires `VALIDATED_PRODUCTION`.
3. `supported_runtimes` shall contain no duplicate `runtime_class`.
4. A runtime with `support_status = SUPPORTED` requires a non-null
   `adapter_id`.
5. The production artifact SHA-256 shall be immutable for that release ID.
6. `rollback_predecessor`, when present, identifies a specific prior version,
   repository commit, and artifact SHA-256.
7. Release identity shall never be inferred from an installed runtime copy.

---

## Registry-to-Release Invariants

For a registry entry and its referenced release, all of these shall agree:

- Skill name;
- version;
- owning repository identity;
- owning repository commit;
- production artifact SHA-256;
- production validation status.

A mismatch is a contract failure.

---

## Deployment Transaction Invariants

1. `transaction_result` records what happened to the transaction.
2. `resulting_deployment_status` records the resulting observed/recorded
   deployment state.
3. These two facts shall never be conflated.
4. A blocked transaction shall result in `BLOCKED`.
5. `DRIFT_DETECTED` transaction result shall result in
   `DRIFT_DETECTED` deployment state.
6. Successful `ROLLBACK` shall result in `ROLLED_BACK`.
7. Successful `UNINSTALL` shall result in `NOT_DEPLOYED`.
8. Successful `DEPLOY` shall result in either `DEPLOYED_VERIFIED` or
   `DEPLOYED_UNVERIFIED`.
9. A `DEPLOYED_VERIFIED` state shall not contain failed, unknown, or not-run
   required verification checks.
10. `predecessor.version` and `predecessor.release_id` shall either both be
    null or both be non-null.
11. If rollback availability is `AVAILABLE`, rollback target version and
    release ID shall both be non-null.
12. If rollback availability is `UNAVAILABLE` or `NOT_APPLICABLE`, rollback
    target version and release ID shall both be null.
13. If drift status is `DRIFT_DETECTED`, `detected_at` shall be non-null.
14. Direct runtime edits are drift; they do not become repository authority.
15. Date-time fields shall be validated as canonical RFC 3339 values with an
    explicit deterministic checker. JSON Schema format annotations alone are
    not sufficient deployment-integrity evidence.

---

## Dependency and Adapter Invariants

1. Duplicate dependency IDs are invalid within a single release.
2. A deployment transaction requires a concrete adapter ID and adapter
   version.
3. A runtime marked `SUPPORTED` requires an adapter identity.
4. `PLANNED`, `UNSUPPORTED`, and `UNKNOWN` do not authorize deployment.
5. Runtime support metadata shall not silently select a vendor or framework.

---

## Failure Integrity

Failure, blocked, drift, human-review, rollback-required, and unknown states
shall never be converted to `PASS` merely to complete a registry or deployment
record.

Missing authoritative facts remain missing.

---

## Security

Contract validation shall reject operational claims that require inventing
secret values.

Passwords, API tokens, private keys, bearer tokens, and credential material
are never valid registry or release identity fields.

---

## Change Control

A material change to these invariants requires a new governed contract version
and appropriate regression validation.
