# OCP-013 — MIDWESTGuard Joplin Cash-Engine Operating Transition

Version: 1.0.0

Status: Approved

Type: Operational Change Proposal

Authority: Systems Architect Discipline

Approved: 2026-09-23

Scope:

- `docs/architecture/ocp/OCP-013-MIDWESTGUARD-JOPLIN-CASH-ENGINE-OPERATING-TRANSITION.md`
- `docs/discipline/OPERATING-PLAN.md`
- `docs/operations/MIDWESTGUARD-JOPLIN-CASH-ENGINE-OPERATING-TRANSITION.md`

## Purpose

Close the completed CRM-cutover framing in the Operating Plan and establish the
current MIDWESTGuard Joplin lead-to-cash operating chain. The transition records
current authority, accountable human ownership, measures, evidence, failure
conditions and the first demonstrated gap without inventing systems or approving
new application architecture.

## Approved decision

OFBiz is authoritative for new CRM records. EspoCRM remains retired, stopped and
preserved with its recovery point. The Joplin cash-engine objective now proceeds
from its current operating chain rather than treating CRM completion as pending.

The first blocking handoff is lead generation to lead receipt: committed records
do not identify every current lead source, accountable owner, reconciliation
cadence or evidence source. Jesse Russow is authorized to capture those current
facts. The capture changes no website route, CRM authority, communications
provider, production system, accounting system or Espo state.

## Boundary

This proposal does not authorize automated website intake, Cloudflare D1/R2/Queue
delivery, communications integration, production Job/Work Order authority,
accounting, billing, receivables, collections, cash-visibility software, or any
new authority transfer. Those changes require separate repository authority if
current-state evidence demonstrates a need.

## Acceptance

The transition is complete when the Operating Plan accurately reflects the
closed CRM cutover, the operating matrix identifies known and unresolved
handoffs without assumption, and the next action is limited to the authorized
current-state capture.
