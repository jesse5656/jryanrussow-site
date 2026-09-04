# Daily Operations

## Commercial Alignment Check

Before beginning substantial research, framework, or engineering work, ask:

> **How does today's work advance Research IP → Framework → Diagnostic →
> Commercial Validation?**

The answer does not need to produce immediate revenue.

It must, however, connect the work to a defined research, framework,
diagnostic, falsification, or commercialization requirement.

If that connection cannot be explained, reconsider whether the work is the
highest-value task.

Strategic reference:

[Institutional Memory — Commercialization Thesis](../../research-programs/001-institutional-memory/COMMERCIALIZATION-THESIS.md)

Version: 0.1.0

Status:
Active Reference

## Purpose

This handbook is the central reference for recurring commands, aliases, prompts, shortcuts, tools, and daily workflows used across the Russow Institute projects.

## Daily Orientation

When the larger purpose or structure of the work becomes unclear, review:

`docs/institute/INSTITUTE-ARCHITECTURE.md`

Use the Master Institute Map to answer:

- What are we building?
- How does research become mature knowledge?
- Where does the Canon fit?
- Where do curriculum and teaching fit?
- How do applied laboratories contribute?
- How does application feed new observations back into research?

The Institute Architecture provides strategic orientation.

The Operating Plan remains authoritative for the work that is active now.

------------------------------------------------------------------------------

## Folder Boundary

docs/operations/ = repository and project maintenance.

docs/workflows/ = knowledge and research workflows.

docs/handbook/ = daily researcher reference for aliases, tools, recurring prompts, commands, and shortcuts.

Do not move docs/workflows/ into docs/operations/ without an Architecture Change Proposal.

## Espanso Aliases

:startjr

Starts a Systems Architect Discipline session for:

~/Documents/Projects/jryanrussow-site

:startarchive

Starts a Midwest24 Archive session for:

~/Documents/Projects/midwest24-site

:startops

Starts a MIDWESTGuard Executive Operations session for:

~/Documents/Projects/mwg-ops-manual

:acp

Expands to Architecture Change Proposal instructions.

:ocp

Expands to Operational Change Proposal instructions.

:close

Expands to the standard session close.

## Configuration Location

Espanso alias file:

~/.config/espanso/match/russow-session-aliases.yml

## Common Espanso Commands

espanso status

espanso restart

espanso path

## Standard Session Close

For a completed session that does not require continuation:

Completed

Current Objective

Next Concrete Step

Deferred

When another ChatGPT conversation will continue active work, use the governed
HANDOFF and RESUME procedure in:

`docs/operations/researcher/CHATGPT-WORKFLOW.md`

Do not force unfinished repository work into a commit merely for chat
transition. Preserve actual staged, unstaged, untracked, interrupted, blocked,
and unresolved state when material.

------------------------------------------------------------------------------

## Quick Purpose

This is the primary day-to-day operating reference for work inside the Russow Institute.

Use this file when you need to remember:

- how to start a session;
- how to execute the Operating Plan;
- how to use Repository Context Resolution;
- how to use Governance Enforcement;
- when an ACP or OCP is required;
- where aliases and recurring commands are documented;
- how to close or transition a session.

------------------------------------------------------------------------------

## Repository Governance

Repository governance procedures, ACP/OCP workflow, protected files, Git
guardrails, validation scripts, and automation standards are documented in:

docs/handbook/06-REPOSITORY-GOVERNANCE.md

------------------------------------------------------------------------------

## Repository Change Workflow

All work intended to modify a governed repository follows this sequence:

Intent to Change Repository

↓

Repository Context Resolution

↓

Engineering, Research, or Operational Work

↓

Governance Enforcement

↓

Commit

Before beginning repository changes, run:

```bash
python3 scripts/platform/repository_context.py
```

Before committing governed changes, stage the intended files and run:

```bash
python3 scripts/governance/governance_engine.py --staged
```

Protected changes require an approved Architecture Change Proposal (ACP) or Operational Change Proposal (OCP) whose declared scope covers the changed files.

Repository Context Resolution provides applicable context.

Governance Enforcement applies deterministic, machine-verifiable policy.

Neither capability replaces architectural judgment or human decision-making.

Canonical procedure:

`docs/operations/REPOSITORY-CHANGE-WORKFLOW.md`

# General Runbook

## Purpose

This runbook provides repeatable procedures for:

- capturing a complete webpage in Google Chrome;
- accessing the TrueNAS shell locally or remotely;
- collecting a read-only TrueNAS storage and Apps audit;
- saving diagnostic output to a timestamped file for review or support.
  
  ## Safety Classification
  
  The procedures on this page are **read-only**. They do not create, modify, or delete pools, datasets, applications, containers, or Docker volumes.
  Diagnostic reports should still be treated as internal infrastructure information because they can reveal pool names, dataset names, installed applications, mountpoints, and storage organization.

---

## 1. Capture a Full Webpage in Google Chrome

Use this procedure when a browser page is longer than the visible screen and the entire page needs to be preserved in one image.

### Procedure

1. Open the webpage in Google Chrome.
2. Open Chrome Developer Tools:
   
   ```text
   Ctrl+Shift+I
   ```
3. Open the Developer Tools command menu:
   
   ```text
   Ctrl+Shift+P
   ```
4. Type:
   
   ```text
   Capture full size screenshot
   ```
5. Select **Capture full size screenshot**.
6. Chrome saves the resulting PNG file in the browser's configured download location.
   
   ### Notes
- Leave Developer Tools open until Chrome finishes creating the screenshot.
- Dynamic or continuously scrolling pages may not capture perfectly.
- Review the image before sharing it to ensure that passwords, tokens, personal information, or private URLs are not visible.

---

## 2. Access the TrueNAS Shell

Use either the TrueNAS web interface or an approved remote connection.

### From the TrueNAS web interface

1. Sign in to the TrueNAS administrative interface.
2. Open **System > Shell**.
3. Confirm that the prompt identifies the intended TrueNAS server before running commands.
   
   ### Through SSH or Tailscale
   
   Connect using the approved TrueNAS administrative account and the server's authorized hostname or IP address.
   Example pattern:
   
   ```bash
   ssh truenas_admin@TRUENAS_ADDRESS
   ```
   
   Replace `TRUENAS_ADDRESS` with the authorized LAN address, Tailscale address, or hostname.
   Do not place passwords, private keys, recovery codes, or access tokens directly in commands or captured screenshots.

---

## 3. Collect a TrueNAS Storage and Apps Audit

### When to use this audit

Run this audit before making storage decisions or when troubleshooting:

- TrueNAS application storage;
- dataset placement;
- available pool capacity;
- ZFS dataset properties;
- Docker storage consumption;
- whether application data belongs on `FastPool` or `IronWolfPool`;
- unexpected application deployment or storage behavior.
  
  ### What the audit collects
  
  The report includes:
- date and time of capture;
- pool capacity, allocation, fragmentation, and health;
- dataset usage, available capacity, compression ratio, and mountpoints;
- `FastPool/AppData` ACL, compression, and record-size properties;
- current TrueNAS Apps configuration;
- Docker image, container, volume, and build-cache usage;
- mounted filesystem capacity for `FastPool` and `IronWolfPool`.
  
  ### Run the audit
  
  Paste the entire block into the TrueNAS shell:
  
  ```bash
  audit_file="/tmp/truenas-storage-audit-$(date +%Y%m%d-%H%M%S).txt"
  {
  echo "===== TRUENAS STORAGE AND APPS AUDIT ====="
  date
  echo
  echo "===== ZFS POOL CAPACITY AND HEALTH ====="
  sudo zpool list
  echo
  echo "===== DATASET CAPACITY AND MOUNTPOINTS ====="
  sudo zfs list \
    -r \
    -d 4 \
    -t filesystem,volume \
    -o name,used,avail,refer,compressratio,mountpoint \
    FastPool IronWolfPool
  echo
  echo "===== APPDATA DATASET PROPERTIES ====="
  sudo zfs get \
    -r \
    -d 1 \
    acltype,aclmode,aclinherit,compression,recordsize \
    FastPool/AppData
  echo
  echo "===== TRUENAS APPS CONFIGURATION ====="
  sudo midclt call app.config
  echo
  echo "===== DOCKER STORAGE USAGE ====="
  sudo docker system df
  echo
  echo "===== FILESYSTEM CAPACITY ====="
  df -h /mnt/FastPool /mnt/IronWolfPool
  } 2>&1 | tee "$audit_file"
  echo
  echo "Audit saved to: $audit_file"
  ```
  
  The report appears in the terminal while also being saved to a timestamped file in `/tmp`.
  Example output path:
  
  ```text
  /tmp/truenas-storage-audit-20260814-081400.txt
  ```

---

## 4. Review or Retrieve the Audit Report

Use the exact file path printed by the audit command.

### Read the report interactively

```bash
less /tmp/truenas-storage-audit-YYYYMMDD-HHMMSS.txt
```

Useful `less` controls:

- `Space`: move forward one page;
- `b`: move backward one page;
- `/text`: search for text;
- `q`: exit.
  
  ### Print the report in the terminal
  
  ```bash
  cat /tmp/truenas-storage-audit-YYYYMMDD-HHMMSS.txt
  ```
  
  ### Confirm the report exists
  
  ```bash
  ls -lh /tmp/truenas-storage-audit-*.txt
  ```
  
  Files stored in `/tmp` are temporary. Copy or upload the report before rebooting the server or performing system cleanup.

---

## 5. Sharing and Redaction Review

Before uploading or sharing the report, review it for:

- pool and dataset names;
- installed application names;
- mountpoints and storage layout;
- internal IP addresses or hostnames;
- other infrastructure details that should remain private.
  The audit does not intentionally request application passwords or secrets. Nevertheless, treat the output as internal and inspect it before public distribution.

---

## 6. Troubleshooting

### A command reports `dataset does not exist`

Confirm the pool and dataset names:

```bash
sudo zpool list
sudo zfs list -o name,mountpoint
```

Update only the affected pool or dataset name in the audit block. Do not create or rename datasets merely to make the audit command succeed.

### Docker commands fail

Confirm that the account has administrative access and that `sudo` succeeds. Do not change Docker permissions or socket ownership as a shortcut.

### The report is too long for a browser or chat window

Use the timestamped file produced by `tee` instead of copying the terminal output manually.

### The shell session disconnects

Reconnect and check whether the report was created:

```bash
ls -lt /tmp/truenas-storage-audit-*.txt
```

Because the audit is read-only, it is safe to run it again if no complete report exists.
---

## Current Environment Reference

The audit block is currently tailored to these TrueNAS pools and datasets:
| Resource | Name or path |
| --- | --- |
| Fast application pool | `FastPool` |
| Redundant HDD pool | `IronWolfPool` |
| Application datasets | `FastPool/AppData` |
| Fast pool mountpoint | `/mnt/FastPool` |
| HDD pool mountpoint | `/mnt/IronWolfPool` |
If these names change, update this runbook before relying on the audit command.
