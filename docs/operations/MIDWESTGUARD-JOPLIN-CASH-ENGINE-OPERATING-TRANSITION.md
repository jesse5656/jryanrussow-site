# MIDWESTGuard Joplin Cash-Engine Operating Transition

Version: 1.5.1

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
| Lead generation | Public website contact or inspection-request form, public phone/email, or another source inquiry | Jesse Russow receives public-email evidence, manually enters observable leads in OFBiz, and reconciles them; website receipt notification remains unassigned | Public email is received in Jesse’s Google-hosted mailbox. The website `/api/lead` Worker has a durable D1 ledger but its queue delivery remains configured for the retired EspoCRM bridge. Phone system is UNKNOWN. | Maintain a source inventory and reconcile each accessible source record to OFBiz by close of the operating day | Per-source received count; Gmail receipt timestamp or other source ledger plus OFBiz Lead source, source detail and created time | A source record has no corresponding OFBiz Lead by close of the operating day, or a website receipt could reach retired EspoCRM | PARTIAL: public email has an accountable, observable receipt path; no active source record has yet occurred and the website route is not safe for operation | PROCESS | This transition authorizes current-state capture and manual OFBiz entry only; it does not authorize routing, integration or software change |
| Lead receipt / intake | An observable source notification or source-ledger item | Jesse Russow for public-email receipt, manual OFBiz entry and daily reconciliation; website notification owner remains UNRESOLVED | OFBiz for the accepted CRM Lead after normal manual entry | Create one OFBiz Lead, retain source identity/detail where available, and reconcile it to the source record | Gmail receipt metadata or another source ledger compared to OFBiz Lead source, detail and created time | An accessible receipt lacks an OFBiz Lead by close of the operating day; duplicate or ambiguous correlation is an exception | READY FOR PUBLIC EMAIL: the first real receipt is needed to run the daily correlation. Website intake remains blocked on retired-Espo routing risk. | PROCESS | Current manual procedure; no routing change |
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

## Current-state capture — 2026-09-23

This capture distinguishes a publicly available inquiry surface from an active,
reconcilable lead source. No inquiry was submitted, no source routing changed,
and no CRM, EspoCRM, communications-provider or website implementation changed.

| Potential source | Classification | First receipt event | Accountable receipt owner | OFBiz entry / reconciliation owner | Source-side evidence available now | Finding |
| --- | --- | --- | --- | --- | --- | --- |
| Website contact form | AVAILABLE BUT NOT ACTIVE | Visitor submits the public `/api/lead` form | UNRESOLVED: the verified public boundary forwards to a consumer whose notification and ownership are unknown | Jesse Russow once a source receipt is observable | Public form and endpoint are verified; accessible submission ledger, consumer log and receipt notification are UNKNOWN | The form can receive an inquiry, but its source-side record cannot yet be reconciled to OFBiz |
| Website inspection-request form | AVAILABLE BUT NOT ACTIVE | Visitor submits the public `/api/lead` appointment form | UNRESOLVED | Jesse Russow once a source receipt is observable | Public appointment form and endpoint are verified; accessible submission ledger, consumer log and receipt notification are UNKNOWN | This is a second public surface using the same unverified downstream receipt boundary |
| Public telephone | AVAILABLE BUT NOT ACTIVE | Call is answered, missed, or leaves a message | UNRESOLVED | Jesse Russow once a source record is accessible | Public telephone surface is verified; call, missed-call and voicemail records are UNKNOWN | No current call-log owner or reconciliation evidence is established |
| Public email | AVAILABLE BUT NOT ACTIVE | Email arrives at the public address | UNRESOLVED | Jesse Russow once a source record is accessible | Public email surface is verified; inbox ownership and accessible reconciliation record are UNKNOWN | No current inbox owner or reconciliation evidence is established |
| Facebook / Meta, Google Business Profile, referrals, repeat customers, other paid or organic sources | UNKNOWN | UNKNOWN | UNRESOLVED | UNRESOLVED | No current operating evidence | Repository taxonomy and future-ingress material do not prove a live source |
| Door knocking / canvassing | HISTORICAL | Historical program evidence only | Not current | Not current | Historical operational records | Not evidence of a current Joplin lead source |

### Receipt-to-OFBiz control finding

The approved manual process remains: when a website lead is received and made
observable to Jesse Russow, Jesse manually creates the authoritative OFBiz Lead.
OFBiz can retain the Lead source, source detail and created time as the
CRM-side correlation evidence. The current capture does **not** establish an
accessible source-side list, notification owner, stable source identifier, or
current lead volume for any public surface.

The committed transition calls for a daily source-to-receipt check. That is the
required cadence **after** a source-side ledger or inbox/call log is identified;
it cannot yet be executed or used to prove completeness. Current tools and
manual entry are therefore insufficient to close this handoff on process alone.
The demonstrated gap is governance/operational access: identify the accountable
owner and identifier-minimized, source-side evidence for each source that is
actually active. It is not evidence that a software, integration, routing or
website change is required.

### Failure modes and current controls

| Failure mode | Affected source | Control state | Current response |
| --- | --- | --- | --- |
| Consumer notification is missed or unavailable | Website forms | UNCONTROLLED | Establish consumer ownership and an accessible source-side ledger before claiming reconciliation |
| Manual OFBiz entry is forgotten or late | Any observable source | PARTIALLY CONTROLLED | Jesse records the Lead when received; daily reconciliation becomes available only after source evidence is accessible |
| Duplicate manual entry | Any observable source | PARTIALLY CONTROLLED | Compare source identity/detail and receipt time where available; treat ambiguity as an exception |
| Source identifier is unavailable | Website forms, phone, email | UNCONTROLLED | Capture the actual source record and its stable identifier or document that none exists |
| A source cannot be accessed during reconciliation | Any source | UNCONTROLLED | Escalate to the accountable source owner; do not infer that zero leads were received |

### Next bounded current-state action

Jesse Russow identifies the accountable owner and obtains an
identifier-minimized source-side record for each source that is actually active
for one operating day. The record must permit a daily comparison to OFBiz Lead
source, source detail and created time, with missing or duplicate correlations
recorded as exceptions. This is discovery and operating capture only; it does
not authorize a public-route, automation, provider, CRM-authority or EspoCRM
change.

## Active-source discovery — 2026-09-24

This read-only operating-day discovery found **no source with evidence sufficient
to classify it ACTIVE**. It did not submit a public form, read any lead payload,
create or amend an OFBiz Lead, or change a route, configuration, service, CRM
authority or EspoCRM state.

| Candidate source | Classification | Current evidence basis | Source-side receipt surface / owner | Identifier-minimized operating-day record | OFBiz reconciliation | Daily control | Gap classification / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Website contact form | AVAILABLE BUT NOT ACTIVE | The public `/api/lead` form is available. The live `mwg-n8n` service has zero active workflows, zero registered webhooks and zero execution records; it is not a current receipt service. | No accessible receipt ledger or accountable consumer owner is established. | None: no active source event was proven. This is not a claim of zero submissions. | NOT EXECUTABLE: no source record exists to compare to OFBiz. | NOT EXECUTABLE | OPERATING ACCESS: identify the owner and accessible record for the actual POST receipt path. |
| Website inspection-request form | AVAILABLE BUT NOT ACTIVE | The public appointment form uses `/api/lead` and shares the same unverified downstream receipt boundary. | No accessible receipt ledger or accountable consumer owner is established. | None: no active source event was proven. | NOT EXECUTABLE | NOT EXECUTABLE | OPERATING ACCESS: identify the owner and accessible record for the actual POST receipt path. |
| Public telephone | AVAILABLE BUT NOT ACTIVE | Public telephone surface is present; no call, missed-call, voicemail or handset ledger was available. | UNRESOLVED | None: no active source event was proven. | NOT EXECUTABLE | NOT EXECUTABLE | OPERATING ACCESS: identify the call-record system and accountable receipt owner. |
| Public email | AVAILABLE BUT NOT ACTIVE | Public email surface is present; no inbox ownership or message-receipt ledger was established. | UNRESOLVED | None: no active source event was proven. | NOT EXECUTABLE | NOT EXECUTABLE | OPERATING ACCESS: identify the accountable inbox owner and identifier-minimized daily receipt record. |
| Facebook / Meta, Google Business Profile, referrals, repeat customers, other paid or organic sources | UNKNOWN | No current lead-generating event or current operational traffic was available. | UNRESOLVED | None | NOT EXPECTED: no active source record was established. | NOT EXECUTABLE | GOVERNANCE: identify whether the source is in current operation before assigning a control. |
| Door knocking / canvassing | HISTORICAL | Historical program evidence only. | Not current | Not applicable | NOT EXPECTED | Not applicable | NONE for current capture. |

### Read-only receipt-boundary evidence

The running `mwg-n8n` instance is a service, not current lead-receipt evidence:
it has zero active workflows, zero registered webhooks and zero execution
records. It does not identify an active MIDWESTGuard lead-receipt workflow.
A non-mutating `HEAD` request to the documented
`automation.midwestguard.net/webhook` path returned `404`; this does not test a
POST submission and must not be treated as a delivery failure, but it provides
no accessible receipt ledger or owner. No customer data, credential, workflow
payload, email, call record or application log content was read or retained.

No source was classified ACTIVE, so no identifier-minimized source record could
be captured and no corresponding OFBiz Lead can be classified MATCHED,
MISSING_IN_OFBIZ or AMBIGUOUS. This is not evidence that no leads exist; it is
evidence that the current operating record does not identify a source-side
receipt system from which the daily reconciliation can be run.

## Receipt ownership and observability discovery — 2026-09-24

This discovery was read-only. It did not submit a form, send email, place a
call, read mailbox, call, voicemail or lead contents, change a provider,
activate a workflow, or create an OFBiz Lead.

| Available channel | Verified receipt destination / path | Receipt owner and Jesse access | Reconciliation evidence | Probe classification | Current result / next action |
| --- | --- | --- | --- | --- | --- |
| Website contact form | Native browser `POST` to `https://www.midwestguard.net/api/lead`; the endpoint advertises `Allow: POST`. The current receiver beyond that route is not established. | UNKNOWN / UNKNOWN | UNOBSERVABLE: n8n has no active workflow, webhook or execution; local tunnel and proxy metadata contain no `automation.midwestguard.net` route. No current D1, Queue, R2, email or webhook receipt is proven. | NOT SAFE TO PROBE — destination is not proven safe and cannot be shown independent of retired EspoCRM. | Identify the current POST receiver, its accountable owner and an accessible receipt ledger before any submission. |
| Website inspection-request form | Native browser `POST` to the same `https://www.midwestguard.net/api/lead` route. | UNKNOWN / UNKNOWN | UNOBSERVABLE: shares the unverified contact-form receiver. | NOT SAFE TO PROBE — destination is not proven safe. | Resolve the shared website receiver before treating either form as operable. |
| Public email | `contact@midwestguard.net` is the public address. Domain MX records identify Google-hosted mail, but not the mailbox, owner or access holder. | UNKNOWN / UNKNOWN | UNKNOWN: no inbox, forwarding rule or timestamped receipt ledger was accessed. | NOT SAFE TO PROBE — mailbox ownership, Jesse access and safe handling of a probe are not proven. | Identify the accountable mailbox owner and provide an identifier-minimized one-day inbox receipt record. |
| Public telephone | The public MIDWESTGuard telephone number is available from the site. Provider, receiving user/device, missed-call path and voicemail path are not established. | UNKNOWN / UNKNOWN | UNKNOWN: no call, missed-call or voicemail log was available. | NOT SAFE TO PROBE — provider, owner, log access and uncontrolled-action boundary are not proven. | Identify the phone provider, accountable receipt owner and accessible timestamped call log. |
| Meta | Public Facebook presence is linked from the site; no account, campaign, lead-center or message-receipt evidence was available. | UNKNOWN / UNKNOWN | UNKNOWN | UNKNOWN | Establish whether this is a current lead source before selecting a receipt control. |
| Google Business Profile | The site exposes a Google Maps listing; no Business Profile management, message, call or request receipt evidence was available. | UNKNOWN / UNKNOWN | UNKNOWN | UNKNOWN | Establish whether this is a current lead source before selecting a receipt control. |
| Referrals / repeat customers | No current documented receipt mechanism was found. | UNKNOWN / UNKNOWN | UNKNOWN | UNKNOWN | Retain UNKNOWN until a current receipt mechanism is identified. |

### Website receipt-path finding

The public forms declare ordinary POST submission to `/api/lead`; no browser-side
interception was evidenced in the page markup. The live route exists and permits
POST, but its receipt destination is not observable from the current operating
access. `mwg-n8n` cannot be that receipt surface: it has zero active workflows,
zero registered webhooks and zero execution records. Local Cloudflare tunnel and
Nginx Proxy Manager metadata do not identify a route for the documented
`automation.midwestguard.net` hostname. This does not prove that a POST fails or
that it reaches retired EspoCRM; it proves neither result can be safely assumed.
The approved D1/R2/Queue architecture remains a target architecture, not
current receipt evidence.

### Operability and probe decision

No channel meets the conditions for a controlled receipt probe. In particular,
no available channel has a known receipt owner, Jesse-accessible source record,
or a proven boundary excluding retired EspoCRM and uncontrolled downstream
actions. No controlled probe was performed; no source receipt, OFBiz Lead or
reconciliation result was created.

The first operable receipt channel is **NONE**. The next operating action is not
software work: Jesse Russow identifies the accountable owner and access holder
for the website receiver, business inbox and business phone, then obtains one
identifier-minimized operating-day source record from the first channel shown to
be active. Only then may governance assess a controlled probe and daily
source-to-OFBiz reconciliation.


## Read-only source ownership and access resolution — 2026-09-24

This update used read-only account, deployment and aggregate-ledger evidence. It
made no route, Worker, mailbox, telephone, CRM, EspoCRM, n8n or provider change;
it sent no email, submitted no form and placed no call. It supersedes the
otherwise-unresolved receipt-path conclusions above where direct current-state
evidence is now available.

| Candidate source | Current classification | Receipt destination and human owner | Jesse access and durable evidence | Reconciliation readiness | Probe decision | Residual gap / next action |
| --- | --- | --- | --- | --- | --- | --- |
| Public email | AVAILABLE BUT NOT ACTIVE; **OPERABLE RECEIPT PATH** | `contact@midwestguard.net` is delivered to the Google-hosted MIDWESTGuard mailbox accessed as `jesse@midwestguard.net`. Jesse Russow is the demonstrated receiving-account access holder and receipt owner. Whether `contact@` is a user mailbox, alias, group or forwarding address is not exposed by this read-only mailbox view. | A read-only search of the Jesse mailbox returned messages addressed to the public address. Gmail supplies a durable, timestamped receipt ledger. No message content or customer identifiers were retained. | READY: on the first real receipt, compare the Gmail receipt timestamp/source detail to the manually created OFBiz Lead on the same operating day. | **PROBE REQUIRES EXPLICIT APPROVAL** because a synthetic email is an external communication. | PROCESS: wait for the first real public-email receipt; then execute and record the daily reconciliation. |
| Website contact form | AVAILABLE BUT NOT ACTIVE; receipt ledger observable but **NOT OPERABLE** | Native `POST /api/lead` is handled by the deployed `midwestguard-site` Cloudflare Worker, version `46aec87c-5893-4caa-ba88-cc05656a6961`, authored through the current Jesse account. The Worker writes the `midwestguard-public-intake` D1 ledger and enqueues delivery work. Operational notification ownership is not established. | Jesse’s current Cloudflare account has read-only aggregate access to the D1 ledger. It contains timestamped `website_form` lead receipt rows; no payload, customer identifier or content was read. | NOT READY: the public receipt can be enumerated, but its configured downstream delivery is not safe under the retired-Espo boundary. | **NOT SAFE TO PROBE**. No POST is authorized while the legacy delivery configuration remains. | CONFIGURATION: separately govern disposition of the retired-Espo delivery route before operating the website form as a CRM receipt path. |
| Website inspection-request form | AVAILABLE BUT NOT ACTIVE; receipt ledger observable but **NOT OPERABLE** | Shares the same `/api/lead` Worker, D1 ledger and delivery queue as the contact form. | Same as website contact form. | NOT READY for the same retired-Espo route risk. | **NOT SAFE TO PROBE**. | CONFIGURATION: same separately governed route-disposition decision. |
| Public telephone `(417) 850-4663` | AVAILABLE BUT NOT ACTIVE | Provider, current destination user/device, missed-call owner and voicemail owner remain UNKNOWN. The Jesse mailbox has historical call-log and voicemail labels, including historic call metadata, but that does not establish the current provider or routing for the published number. | Jesse can read the historical Gmail ledger; no current provider ledger tied to the published number was proven. | NOT READY. | **NOT SAFE TO PROBE**. | OPERATING ACCESS: identify the current provider account, destination and timestamped call/missed-call ledger without changing telephone configuration. |
| Meta / Facebook | UNKNOWN | Public presence only; no management account or receipt ledger was accessible. | No current evidence. | NOT READY. | UNKNOWN. | UNKNOWN: establish whether it is a current lead source before selecting a control. |
| Google Business Profile | UNKNOWN | Public Maps presence only; no management account or receipt ledger was accessible. | No current evidence. | NOT READY. | UNKNOWN. | UNKNOWN: establish whether it is a current lead source before selecting a control. |
| Referrals / repeat customers | UNKNOWN | No current documented receipt mechanism. | No current evidence. | NOT READY. | UNKNOWN. | UNKNOWN: identify the actual current receipt mechanism if this becomes an active source. |

### Website receiver and retired-Espo routing risk

The deployed public receiver is now established as the `midwestguard-site`
Cloudflare Worker, not `mwg-n8n`. Its bound D1 database is
`midwestguard-public-intake`; read-only aggregate inspection confirms
`website_form` lead rows with durable receipt timestamps and delivery states.
The deployed delivery Worker is a queue/scheduled consumer at version
`706e4a31-6761-4168-bd76-8b5cce10656e` and has an `MWG_ESPO_API_KEY` secret,
D1 and queue bindings. Its declared configuration retains
`MWG_ESPO_BASE_URL = https://command.midwest24.com`, and its delivery adapter
contains the legacy Espo create path. The D1 aggregate records use the
`espocrm_bridge` downstream designation.

Therefore the classification is **ESPO DELIVERY PATH STILL CONFIGURED**. This
does not assert that a particular historical receipt created an Espo record, and
no delivery was exercised in this discovery. It does establish that the website
path cannot be treated as a safe current CRM receipt path while EspoCRM is
retired. The required next step for that path is a separately governed routing
or configuration decision; this transition authorizes no change.

### Public-email operating control

The public email path is the first operable receipt channel. Its current control
is intentionally manual and single-authority:

1. A message addressed to `contact@midwestguard.net` appears in Jesse Russow’s
   accessible MIDWESTGuard Gmail mailbox.
2. Jesse records the minimal source detail and timestamp needed to reconcile the
   receipt, then manually creates the authoritative OFBiz Lead.
3. By close of that operating day, Jesse compares the Gmail receipt to OFBiz
   Lead source, detail and created time and records `MATCHED`,
   `MISSING_IN_OFBIZ`, `AMBIGUOUS` or a duplicate exception.
4. No receipt is entered into EspoCRM and no automatic routing is enabled.

No real current public-email lead was encountered during this read-only
resolution, so the control is ready but its first daily reconciliation has not
yet been performed.

## Measures

Leading measures are leads received, qualification aging, follow-up aging,
appointment-set rate, inspection completion rate, estimate turnaround,
estimate-follow-up aging and signed-contract count. Financial outcome measures
are invoiced dollars, AR aging, collections recovered and cash received. A
measure remains `UNRESOLVED` until its current authoritative source is recorded.

## First blocking handoff

**Lead generation to lead receipt** is now ready for the public-email path: Jesse
Russow has an accessible, timestamped source ledger and is the accountable
receipt, OFBiz-entry and reconciliation owner. It remains unproven in operation
until the first real public-email receipt is reconciled to its OFBiz Lead. The
website forms remain unavailable for safe operation because an EspoCRM delivery
path is still configured; the public phone provider and current call ledger
remain unresolved. This is a bounded **PROCESS** readiness state for email, with
a separate **CONFIGURATION** defect for the website route and an
**OPERATING-ACCESS** gap for phone—not a software finding.

## Next authorized action

Use the next real message addressed to `contact@midwestguard.net` as the first
identifier-minimized operating-day receipt. Jesse Russow manually creates its
authoritative OFBiz Lead and completes the same-day Gmail-to-OFBiz
reconciliation, recording any missing, duplicate or ambiguous correlation as an
exception. No synthetic email is authorized without explicit approval. The
website delivery route requires separate governance before use because it remains
configured for retired EspoCRM; the public phone requires current provider and
ledger ownership discovery. No route, CRM authority, communications provider,
production system, accounting system or Espo state changes here.

## Deferred boundaries

Automated website intake, Cloudflare D1/R2/Queue delivery, communications
integration, production Job/Work Order authority, accounting, billing,
receivables, collections and cash-visibility software require separate
repository authority when and if the current-state evidence demonstrates the
need.

## Lead-generation asset and activation assessment — 2026-09-25

This assessment used existing repository material and read-only management views.
It did not publish a post, create an advertisement, spend money, send outreach,
change a profile, exercise a website form, alter CRM authority or change any
routing.

| Candidate | Asset and access finding | Current lead-receipt fit | Readiness / blocker |
| --- | --- | --- | --- |
| Google Business Profile — Joplin | Jesse Russow has management access to the verified MIDWESTGuard LLC Joplin profile. The profile shows current owner content, a current public website and telephone link, and Google-reported customer interactions whose reporting period was not exposed in the read-only view. The profile also reports that its ad is not set up. | Existing website and telephone CTAs remain unavailable for controlled intake: the website route retains retired-Espo delivery configuration and the telephone ledger/owner remains unresolved. The public-email path is the only accountable, timestamped receipt control. | **READY FOR A BOUNDED ORGANIC ACTIVATION WITH APPROVAL.** Publish one Joplin profile update that directs new inquiries solely to `contact@midwestguard.net`; request the prospect identify the Google Business Profile as the source. No spend, website change, form use, telephone change or booking-path use is included. |
| Meta / Facebook | The public MIDWESTGuard page is discoverable, but the available management session could not load Meta Business Manager because of a redirect-loop access failure. No managed ads account, campaign, billing, lead form, audience, creative inventory or receipt ledger was established. | No accountable, accessible receipt path is established. | **ACCESS BLOCKED / UNKNOWN.** Do not select until ordinary management access and receipt evidence are demonstrated. |
| Google Ads | The managed Joplin Business Profile reports that an ad is not set up. No active campaign, billing readiness or current spend was established. | No active paid lead source or reconciled paid-receipt path is established. | **CONFIGURATION AND BILLING REQUIRED.** Not the first activation. |
| Referrals / repeat customers | No current governed population, contact permission, outreach procedure or receipt mechanism was established. | No accountable source event can be reconciled. | **UNKNOWN.** Do not initiate outreach without separate current-state and approval evidence. |
| Public email | Jesse controls the timestamped receipt ledger at `contact@midwestguard.net`. | It is a safe receipt and reconciliation destination, but it does not itself generate demand. | **OPERABLE RECEIPT CONTROL; NOT A LEAD-GENERATION SOURCE.** |
| Website forms and public phone | Existing public assets remain visible. | Website delivery is unsafe under the retired-Espo boundary; phone provider, owner and call ledger are unresolved. | **EXCLUDED FROM ACTIVATION.** |

### First activation decision

**First source candidate:** the existing verified Joplin Google Business Profile.

**Activation class:** organic public communication; no software, integration,
paid campaign, routing or CRM change.

**Activation owner, receipt owner and reconciliation owner:** Jesse Russow.

**Proposed bounded activation requiring explicit approval:** publish one factual
Joplin Google Business Profile update that directs prospective customers to
`contact@midwestguard.net` as the sole intake path and requests a simple
Google-Business-Profile source marker in the email. Do not link to the website
form, telephone path, Calendly path or retired EspoCRM. Do not create or modify
an advertisement, campaign, profile setting, account setting or routing rule.

Once approved and published, the first operating measures are: leads generated
from the post, emails received with the source marker, corresponding OFBiz Leads,
missing or duplicate correlations, and email-receipt-to-OFBiz-entry latency. No
spend or cost-per-lead measure applies to this organic activation.

The profile is not classified as an active lead source until a real, source-marked
inquiry reaches the public email ledger and is reconciled to OFBiz.

### Activation evidence

On 2026-09-24 at `20:07:03-05:00`, Jesse Russow published one organic
MIDWESTGuard Joplin Google Business Profile update. Google returned post
identifier `1413422142827777745`. The update directs prospective customers only
to `contact@midwestguard.net` and asks them to include `Google Business Profile`
in the subject line. No paid campaign, profile-setting change, website-form use,
telephone CTA, Meta/Facebook action, routing change, CRM change or EspoCRM
activity occurred. Google offered a copy-to-other-profiles step after publication;
it was explicitly skipped.

The source is now **ACTIVE FOR MEASURED INQUIRY GENERATION**. The next control is
the first genuine source-marked email receipt, its normal manual OFBiz Lead entry
and same-day reconciliation. A missing, duplicate or ambiguous correlation is an
operating exception; no dual-write is permitted.
