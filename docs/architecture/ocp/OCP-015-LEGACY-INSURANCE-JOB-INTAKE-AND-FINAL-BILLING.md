# OCP-015 — Legacy Insurance Job Intake and Final Billing

Version: 1.1.0

Status:
Approved — bounded production implementation authority

Type:
Operational Change Proposal

Authority:
Repository owner direction on 2026-09-30 that the customer folders in
`MWG Arkansas/New Customers` are existing Jobs awaiting final insurance bills,
followed by explicit instruction to continue implementation.

## Decision

Midwest24 Core Enterprise / Apache OFBiz shall provide a bounded production
intake and insurance-final-billing queue for the eleven existing MIDWESTGuard
Arkansas Job folders. These records are not new leads and are not required to
pass through a synthetic or false signed-contract conversion. They enter as
legacy Job intake candidates, retain their existing business Job references,
and are promoted to native OFBiz `PROJECT` Jobs only after their canonical
Customer, Contact and Property identities are verified.

The first evidence-rich billing wave is Jobs `9376`, `9377`, `9378` and `9379`.
The remaining seven folders enter the same intake queue with explicit missing-
evidence conditions. No record may be represented as ready to bill merely
because a Drive folder exists.

## Authority boundaries

OFBiz becomes the operational authority for the Job intake record, billing
readiness, final-invoice record, carrier-submission evidence and collection
state created under this proposal. Google Drive remains the current document-
byte authority. OFBiz stores controlled references and content hashes, not
copies of customer documents.

The native OFBiz `Invoice` model is reused for an approved final customer
invoice. The contractual customer remains the invoice debtor unless verified
contract evidence establishes a different liable party. An insurance carrier
is a submission recipient and claim participant; sending a bill package to a
carrier does not silently make the carrier the customer or debtor.

This proposal does not authorize automated email, provider API integration,
claim negotiation, adjustment of contract amounts, release of privileged
material, or an unreviewed external submission. Each final bill requires an
accountable human review and an explicit send action after the ready gate.

## Source inventory

The governed source is the direct child-folder inventory of
`MWG Arkansas/New Customers` observed read-only on 2026-09-30. It contains
eleven Job folders. Source folder titles and document contents are production
data and shall not be copied into source control. Runtime intake evidence shall
record the provider (`GOOGLE_DRIVE`), opaque folder ID, observed title hash,
observation timestamp and immutable manifest hash.

The committed repository may contain de-identified fixtures only. Production
customer names, addresses, telephone numbers, email addresses, claim numbers,
policy numbers, invoice documents, checks and carrier correspondence are
prohibited from Git history and build images.

## Native and owned model

Reuse:

- native `Party`, `Person` and `PartyGroup` for Customer and Contact identity;
- native `Facility` for Property identity;
- native `WorkEffort` with type `PROJECT` for a promoted Job;
- existing `M24ProductionJobContext`, `M24JobPartyLink` and human Job number
  semantics where a production Job is promoted;
- native `Invoice` and `InvoiceItem` for the reviewed final customer invoice;
- existing Document Services references for controlled document/version
  identity where available.

Add the minimum owned records necessary for missing operational semantics:

- a legacy Job intake record, unique by source provider and opaque source
  folder ID;
- a billing case linked to the intake record and, after promotion, exactly one
  native Job;
- immutable billing status events;
- document/evidence references for scope, contract, completion, invoice,
  supplements, warranty and carrier submission;
- one idempotent operation receipt per intake, promotion, transition and
  submission-recording request.

The owned billing case shall not duplicate invoice lines, payment applications,
customer identities, Property identity, Job identity or document bytes.

## Billing lifecycle

Billing state is independent of the production Job lifecycle. It uses native
`StatusItem` rows under an owned billing status type and the following IDs:

1. `M24_BILL_DISCOVERY` — folder observed; required identity or evidence is
   incomplete;
2. `M24_BILL_CLOSEOUT` — Job identity is verified but production/punch-list or
   completion evidence remains open;
3. `M24_BILL_REVIEW` — final invoice and carrier package are being reconciled;
4. `M24_BILL_READY` — accountable reviewer approved the exact customer invoice
   and carrier-submission package;
5. `M24_BILL_SENT` — package transmission occurred and immutable send evidence
   was recorded;
6. `M24_BILL_ACK` — carrier receipt or claim-file acknowledgement was recorded;
7. `M24_BILL_PARTIAL` — a partial payment or unresolved balance exists;
8. `M24_BILL_PAID` — verified payments satisfy the approved final invoice;
9. `M24_BILL_BLOCKED` — an explicit exception prevents progress.

No transition may be skipped or reversed. Corrections are new attributable
events. A blocked case may resume only to the state supported by corrected
evidence, with the reason and actor retained.

## Readiness gates

Promotion from intake to a native Job requires exactly one verified canonical
Customer, Contact and Property; an existing business Job reference or a newly
assigned controlled reference; and an accountable owner. Existing Jobs may be
imported without manufacturing a new Opportunity or signed-contract event, but
their historical provenance must state `LEGACY_ARKANSAS_JOB_INTAKE`.

Legacy promotion is an import snapshot rather than a production lifecycle
transition. The promoted native `PROJECT` begins at `M24_PRD_JOB_ACTIVE`, with
no fabricated Opportunity, Lead, signed-contract event, Work Order or completed
production transition. The immutable import event records the existing business
Job reference, source manifest hash, canonical Customer, Contact and Property,
accountable coordinator, human actor, disabled internal executor and provenance
`LEGACY_ARKANSAS_JOB_INTAKE`. Trade Work Orders are added only from verified
scope and current production state; promotion never guesses them from folder
names. Billing remains at `M24_BILL_DISCOVERY` until the human reviewer advances
it through the independently governed billing lifecycle.

`M24_BILL_READY` requires:

- verified Job, Customer and Property identity;
- insurer and claim reference when insurance is involved;
- verified contract/scope authority;
- completion date and completion evidence for billed work;
- all known supplements and approved changes reconciled;
- punch-list disposition;
- final customer invoice with exact amount and currency;
- previous payments and outstanding balance reconciled;
- recoverable-depreciation amount recorded when applicable;
- warranty/closeout evidence or an attributable not-applicable decision;
- named human reviewer and approval timestamp.

Jobs `9378` and `9379` remain at `M24_BILL_CLOSEOUT` until their recorded open
production items are resolved. Empty or insufficient folders remain at
`M24_BILL_DISCOVERY`.

`M24_BILL_SENT` requires the immutable final invoice version, package manifest
hash, destination evidence, sending actor and timestamp. Recording a send must
never itself transmit email or call a carrier API. External transmission is a
separately reviewed human action until a later integration contract exists.

## Replay, ambiguity and failure

The key `(sourceProvider, sourceFolderId)` is unique. Exact replay returns the
same intake and billing-case IDs with no duplicate Party, Facility, Job,
Invoice, evidence or event. The same request key with a materially different
normalized payload returns an explicit conflict with zero effect.

No matching result leaves the intake in discovery. Multiple Customer,
Property, Job, claim or invoice candidates produce an ambiguity exception;
implementation must never select an arbitrary candidate or create a duplicate
as fallback. A failed promotion or transition rolls back its entire bounded
transaction while preserving completed upstream intake evidence.

## Authorization

- an authenticated finance/recovery operator may review intake and prepare a
  billing case;
- a production coordinator may record completion and closeout evidence for
  Jobs within their existing scope;
- only an explicitly authorized finance reviewer may approve
  `M24_BILL_READY`, create the final invoice or record submission/payment;
- production crew identities, noninteractive workers and synthetic `M24P_*`
  identities have no billing authority;
- no role receives generic OFBiz accounting administration through this
  proposal.

## Acceptance

Private deterministic acceptance shall prove:

- all eleven de-identified source fixtures enter exactly once;
- the four first-wave fixtures preserve business Job references 9376–9379;
- identity-complete intake promotes to one native Job without a fabricated
  Opportunity conversion;
- incomplete and ambiguous intake remains blocked without duplicates;
- production lifecycle and billing lifecycle remain independent;
- invoice debtor and carrier recipient semantics remain distinct;
- ready gate rejects missing completion, amount, payment reconciliation,
  supplement, reviewer or package evidence;
- exact replay is inert and altered replay conflicts;
- concurrent intake produces one result;
- restart and independent reconstruction preserve the graph and chronology;
- semantic tampering with amount, debtor, claim, evidence, state or actor is
  detected;
- source control and build artifacts contain no production customer data,
  credentials or document bytes.

Production activation shall begin with a read-only manifest of the eleven real
folders, then create intake cases. Promotion, invoice creation and carrier-send
recording proceed per Job only when that Job's readiness gate passes.

## Rollback

Before activation, preserve the current OFBiz database and application image.
If intake activation fails, remove only the newly created intake/billing rows
identified by the activation receipt and verify the pre-state. Once a native
Invoice, submission event or payment application exists, rollback is a
governed correcting transaction; financial records are never deleted or
silently rewritten.

## Exclusions

This proposal does not authorize automatic carrier communication, claim
settlement authority, autonomous amount changes, payment capture, bank access,
QuickBooks authority transfer, general-ledger cutover, tax decisions, public
document access, production Drive mutation, document deletion, or bulk export.

## Approval

Approved for bounded implementation by the repository owner's 2026-09-30
classification of the Arkansas customer folders as Jobs awaiting final
insurance bills and the subsequent instruction to continue. Commit, push,
production deployment and any external transmission retain their ordinary
separate execution and review boundaries.
