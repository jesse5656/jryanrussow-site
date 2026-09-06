# OCP-010 — Automatic Command Output Handoff

Version: 1.0.0

Status:
Approved

Type:
Operational Change Proposal

Scope:

- `docs/operations/workspace/AI-COLLABORATION-STANDARD.md`

## Purpose

Establish a cross-repository collaboration protocol that automatically transfers
material command output from the operator workstation to a connected handoff
location readable by the AI assistant.

The objective is to eliminate repeated manual copying, pasting, uploading, and
reproduction of command output.

## Approved Decision

For nontrivial repository-associated command blocks whose output is needed for
subsequent analysis, validation, troubleshooting, or continuation:

1. combined stdout and stderr shall be captured to a timestamped transient
   output artifact;
2. the artifact shall be automatically transferred through the configured
   ChatGPT command-output handoff transport;
3. the operator shall not be required to paste command output into chat;
4. the operator shall not be required to manually upload the output artifact
   when the configured transport is functioning;
5. after command completion, the operator may simply instruct the assistant to
   continue;
6. the assistant shall retrieve the latest handoff artifact directly from the
   connected transport and continue from that evidence;
7. an existing adequate artifact shall be reused rather than rerunning a command
   solely to reproduce output.

## Current Transport

The current operator-workstation implementation is:

- local helper: `~/.local/bin/chatgpt-handoff`;
- local transient capture: `~/Downloads`;
- transport: Google Drive through the configured `rclone` Drive remote;
- Drive folder: `ChatGPT Command Handoff`;
- current-output object:
  `chatgpt-command-output-latest.txt`;
- metadata object:
  `chatgpt-command-output-metadata.json`.

The transport mechanism is implementation-specific and may be replaced without
changing the underlying collaboration requirement.

## Command Construction

Material command blocks should normally:

1. create a descriptive timestamped output file;
2. capture combined stdout and stderr using `tee` or equivalent;
3. avoid exposing secrets to captured output;
4. invoke:

   `chatgpt-handoff "$OUT" "<descriptive-label>"`

   after the command work completes successfully or after diagnostic output
   requiring analysis has been captured.

When practical, a failure path should also transfer the captured diagnostic
artifact before returning control to the operator.

## Security

Command-output artifacts shall not intentionally contain:

- passwords;
- application passwords;
- access tokens;
- refresh tokens;
- private keys;
- recovery codes;
- authentication cookies; or
- equivalent secrets.

Sensitive commands shall suppress, redact, or avoid emitting such values before
handoff.

## Durable Evidence

The handoff folder and `~/Downloads` are transient transport/staging locations.

When command output becomes durable validation evidence or institutional memory,
the appropriate final artifact shall be placed in the repository that owns it
under the Repository-First Output Placement rule.

## Fallback

Manual paste or manual file upload is a fallback only when the configured
automatic transport is unavailable or demonstrably failed.

The assistant shall not default to manual transfer while the automatic transport
is functioning.

## Non-Goals

This proposal does not:

- make transient handoff artifacts institutional memory;
- require every trivial shell command to produce a handoff;
- authorize secrets in output logs;
- require Git commits for transient diagnostic output;
- alter repository ownership; or
- replace repository-specific evidence-retention requirements.

## Authorized Change

Update:

`docs/operations/workspace/AI-COLLABORATION-STANDARD.md`

to add the Automatic Command Output Handoff rule and increment the version from
1.1.0 to 1.2.0.
