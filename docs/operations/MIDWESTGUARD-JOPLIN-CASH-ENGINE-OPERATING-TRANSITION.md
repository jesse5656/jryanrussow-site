# MIDWESTGuard Joplin Cash-Engine Operating Transition

Version: 1.0.0

Status: Active operating transition

Authority: Systems Architect Discipline Operating Plan

Date: 2026-09-23
**Scope:** Current Joplin metro lead-to-cash operation. This record identifies
current authority, accountable ownership, evidence and the first operating gap;
it does not authorize a new ERP architecture or downstream authority change.

## Authority and boundary

OFBiz is authoritative for new MIDWESTGuard CRM records: Customer, Contact,
Property, Lead, Opportunity, Task and Meeting/follow-up. EspoCRM is retired as
CRM authority, stopped, and preserved with its protected recovery point. A
website lead is manually entered by Jesse Russow into OFBiz until a separately
governed intake adapter is accepted. No record is dual-written.

The existing Enterprise Job, Work Order and finance implementations are
synthetic/private evidence. They are not current production authority for job
execution, billing, receivables, collections or cash visibility.

## Current authority matrix

| Handoff | Trigger / input | Accountable owner | Current authoritative system | Required action | Measure / evidence | Failure or escalation | Status / gap | Gap type | Remediation authority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Lead generation | Demand source produces an inquiry | UNRESOLVED | UNRESOLVED | Maintain source inventory and daily source-to-receipt reconciliation | Leads received per day; no committed evidence source yet | Any source cannot be reconciled to a receipt | BLOCKED: source, owner and cadence not recorded | GOVERNANCE | This transition authorizes current-state capture only |
| Lead receipt / intake | Website, phone or other inquiry | Jesse Russow for the documented website path; other sources UNRESOLVED | OFBiz for the accepted CRM Lead after manual entry | Record each received website lead once in OFBiz | Daily receipt count and OFBiz Lead history | Received inquiry lacks an OFBiz Lead by end of operating day | PARTIAL: website process is manual; other routes unverified | PROCESS | Current manual procedure; no routing change |
| Lead qualification | New OFBiz Lead | Jesse Russow, initial operational CRM user | OFBiz | Qualify and record outcome | Qualification status/history and aging | Lead has no documented qualification outcome | READY: CRM capability accepted; cadence not yet governed | PROCESS | Current CRM process |
| Outbound follow-up | Qualified or pending Lead | Jesse Russow, initial operational CRM user | OFBiz | Create and update follow-up Task | Follow-up aging and next-action date | Required follow-up lacks a current Task/action | READY: CRM capability accepted; communication channel remains separate | PROCESS | Current CRM process |
| Inspection scheduling | Qualified Lead requires inspection | Jesse Russow, initial operational CRM user | OFBiz | Schedule inspection Meeting | Appointment-set rate and Meeting status | Appointment not scheduled or assigned | READY: CRM capability accepted | NONE | None |
| Inspection completion | Scheduled inspection | Jesse Russow, initial operational CRM user | OFBiz | Record held/not-held outcome | Inspection completion rate and Meeting history | Scheduled inspection has no outcome | READY: CRM capability accepted | PROCESS | Current CRM process |
| Estimate preparation | Completed inspection / Opportunity | Jesse Russow, initial operational CRM user | OFBiz for Opportunity state | Move the Opportunity into estimating with next action | Estimate turnaround aging and Opportunity history | Opportunity remains without estimate action | READY at CRM-state boundary | PROCESS | Current CRM process |
| Estimate delivery | Prepared estimate | UNRESOLVED | UNRESOLVED | Deliver estimate through the current approved channel and record the result | Delivered-estimate count; evidence source UNRESOLVED | Estimate cannot be shown delivered | BLOCKED: delivery channel and evidence are not recorded | GOVERNANCE | Requires current-state capture; no communications integration implied |
| Estimate follow-up | Delivered estimate | Jesse Russow, initial operational CRM user | OFBiz for follow-up state | Record follow-up action and outcome | Follow-up aging and Opportunity history | Delivered estimate lacks follow-up | PARTIAL: CRM state accepted; delivery prerequisite unrecorded | PROCESS | Current CRM process after delivery is known |
| Contract conversion | Accepted estimate / signed contract | Jesse Russow, initial operational CRM user | OFBiz CRM signed-contract boundary | Record the accepted-contract boundary | Signed-contract count and Opportunity history | Acceptance cannot be linked to a production handoff | PARTIAL: boundary accepted; production mechanism not authorized | PROCESS | Separate production boundary required |
| Production handoff | Signed-contract boundary | UNRESOLVED | UNRESOLVED | Hand off accepted work to the actual production system | Handoff count and elapsed time | Signed contract has no accountable receiving owner/system | BLOCKED: current system and owner not recorded | GOVERNANCE | Requires operating-current-state determination |
| Job / Work Order tracking | Production handoff accepted | UNRESOLVED | UNRESOLVED | Track work through completion in the actual system | Open-job/WIP aging | Job status cannot be determined | BLOCKED: synthetic OFBiz evidence is not production authority | GOVERNANCE | Separate authority required |
| Billing / invoicing | Completed billable work | UNRESOLVED | UNRESOLVED | Issue and record invoice in the actual system | Invoiced dollars and invoice aging | Completed work lacks invoice evidence | BLOCKED: current system unrecorded | GOVERNANCE | Current-system determination required |
| Receivables | Issued invoice | UNRESOLVED | UNRESOLVED | Maintain receivable status | AR aging | Receivable cannot be aged | BLOCKED: current system unrecorded | GOVERNANCE | Current-system determination required |
| Collections | Aged receivable | UNRESOLVED | UNRESOLVED | Execute documented collection follow-up | Collection activity and recovered dollars | Aged receivable has no escalation | BLOCKED: owner, cadence and evidence unrecorded | GOVERNANCE | Current-system determination required |
| Cash visibility | Posted payment / bank activity | UNRESOLVED | UNRESOLVED | Produce current cash-received view | Cash received and period cash visibility | Cash receipt cannot be reconciled to operating view | BLOCKED: authoritative source unrecorded | GOVERNANCE | Current-system determination required |

## Measures

Leading measures are leads received, qualification aging, follow-up aging,
appointment-set rate, inspection completion rate, estimate turnaround,
estimate-follow-up aging and signed-contract count. Financial outcome measures
are invoiced dollars, AR aging, collections recovered and cash received. A
measure remains `UNRESOLVED` until its current authoritative source is recorded.

## First blocking handoff

**Lead generation to lead receipt** is the first blocking handoff. The committed
record does not identify the current live lead sources, accountable owner,
reconciliation cadence or evidence source. This is a **GOVERNANCE / PROCESS**
gap, not a software finding.

## Next authorized action

Jesse Russow performs a bounded current-state capture for each live Joplin lead
source and records: source, accountable owner, daily receipt count, OFBiz Lead
correlation method, evidence location and escalation when a source is not
reconciled. This action changes no website route, CRM authority, communications
provider, production system, accounting system or Espo state. Once recorded,
governance selects the next demonstrated handoff gap.

## Deferred boundaries

Automated website intake, Cloudflare D1/R2/Queue delivery, communications
integration, production Job/Work Order authority, accounting, billing,
receivables, collections and cash-visibility software require separate
repository authority when and if the current-state evidence demonstrates the
need.
