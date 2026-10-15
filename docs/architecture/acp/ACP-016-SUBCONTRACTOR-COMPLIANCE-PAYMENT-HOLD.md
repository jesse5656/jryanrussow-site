# ACP-016 — Subcontractor Compliance and Payment-Review Hold

Version: 1.0.0

Status: Approved for bounded implementation

Type: Operational ERP extension and implementation contract

Authority: Systems Architect Discipline

Approved: 2026-09-29

## Decision

Midwest24 Core Enterprise/OFBiz may maintain a subcontractor onboarding and
compliance record, then place a payment request into `COMPLIANCE_REVIEW_HOLD`
only when that request conflicts with an applicable missing, unapproved, rejected,
or expired requirement. The hold is a visible review state; it preserves the
subcontractor, Job, Work Order, invoice/request and prior evidence. It does not
erase, misclassify, release, pay, post, or otherwise alter a legal payment
obligation. Only an accountable finance/compliance reviewer may resolve a hold,
with an attributable reason and immutable history.

The owner reports that the Missouri subcontractor agreement has received legal
review. This contract governs Enterprise workflow and evidence handling; it does
not independently determine legal enforceability, tax treatment, worker
classification, insurance coverage, or payment obligations.

## Scope

The first production-capable slice covers a subcontractor organization and its
Job/Work Order payment-review prerequisites:

1. executed current Midwest24 Missouri subcontractor agreement;
2. current IRS Form W-9 stored only as a protected Document Services artifact;
3. general-liability certificate/evidence;
4. workers' compensation coverage evidence or an attributable reviewed exemption
   path; and
5. commercial-auto evidence when the assigned scope uses a motor vehicle.

OFBiz owns the compliance decision, its effective/expiry dates, reviewer,
subcontractor/Job/Work Order relationship, and payment-review state. Document
Services owns document bytes, versions, signature artifacts, access controls and
retention. OFBiz stores only document/version/evidence references and hashes
where available.

## Subcontractor onboarding lifecycle

Each subcontractor has one current operational onboarding state, plus immutable
state history:

- `DRAFT`: identity is being prepared; no assignment or payment-review approval;
- `PENDING_COMPLIANCE`: required evidence is incomplete or awaiting review;
- `APPROVED_FOR_ASSIGNMENT`: all assignment-critical requirements are approved
  and effective;
- `RESTRICTED`: a requirement has expired, been rejected, or a reviewer has
  placed an attributable restriction; no new scoped assignment may be made;
- `INACTIVE`: no new assignment or payment-review approval; historical records
  remain visible to authorized reviewers.

A transition is attributable and never rewrites the prior state. Expiry changes
an approved contractor to `RESTRICTED` automatically. It does not cancel work
already performed, delete evidence, or decide whether an accrued payable must
be paid. That is why payment has its own review gate.

## Required records and states

Each required item has a deterministic type, document reference, version/hash
where available, submitted date, effective date, expiration date when applicable,
reviewer, decision date, and immutable decision history.

Permitted current states are:

- `MISSING`;
- `PENDING_REVIEW`;
- `APPROVED`;
- `EXPIRED`;
- `REJECTED`; and
- `NOT_APPLICABLE`, only for commercial auto and only with attributable scope
  reason and reviewer decision.

An `APPROVED` item becomes `EXPIRED` automatically at its recorded expiration
boundary. The original evidence and approval history remain intact. A new
submission is required to regain approval.

## Payment-review gate

For a payment request that names a subcontractor and Job/Work Order, Enterprise
must evaluate the requirements that applied to that scope and payment period, and
record the result. It must enter `COMPLIANCE_REVIEW_HOLD` if an applicable item
is `MISSING`, `PENDING_REVIEW`, `REJECTED`, or `EXPIRED`; the result must name
the non-compliant categories without exposing W-9 values or document content.

The implementation must distinguish an onboarding restriction from an accrued
payable: `RESTRICTED` prevents a new assignment and triggers review, but it is
not an automatic refusal to pay completed, accepted work. A reviewer records
whether the request is cleared, held pending evidence, or requires a documented
exception/escalation under the approved payment policy.

The gate must be idempotent, scoped to the named subcontractor and work,
re-evaluable after new evidence or expiry, and fail closed if the compliance
record cannot be read. A compliance decision for one subcontractor does not
approve another; a Job/Work Order restriction does not authorize another Job.

An authorized reviewer may resolve a hold only after reevaluation passes or after
recording a governed manual exception reason. The first implementation records a
review outcome only. It does not create invoices, release payments, post to the
general ledger, replace accounting authority, process payroll, calculate tax,
or integrate a bank/payment processor.

## Authorization and privacy

- A subcontractor may submit documents only through a later separately authorized
  intake path; this slice does not add a public portal.
- Authorized coordinators may see high-level compliance state needed to schedule
  or assign work, but not W-9 content or protected insurance-document content.
- Compliance reviewers may submit/review evidence and resolve holds.
- Finance reviewers may create/review the payment-review request and see hold
  reasons, but document access remains separately authorized by Document Services.
- No role receives generic Document Services administration or unrestricted
  supplier finance authority through this slice.

## Required acceptance

Implementation must prove, using controlled non-production records before any
broader rollout:

1. a named subcontractor progresses deterministically through `DRAFT`,
   `PENDING_COMPLIANCE`, `APPROVED_FOR_ASSIGNMENT`, `RESTRICTED` and `INACTIVE`
   as supported by attributable evidence and decisions;
2. only `APPROVED_FOR_ASSIGNMENT` allows a new scoped crew/Work Order assignment;
3. all required categories create deterministic requirements for a named
   subcontractor and scoped work;
4. a complete approved set passes review without disclosing protected content;
5. each missing, rejected and expired applicable category creates a visible review hold;
6. an accrued-work payment request is not silently refused solely because the
   contractor later becomes `RESTRICTED`; it requires attributable review;
7. commercial auto can be `NOT_APPLICABLE` only with attributable approved scope
   reason;
8. an expiry transition invalidates a prior approval without overwriting history;
9. exact replay is inert and altered replay conflicts;
10. an unauthorized coordinator/crew cannot approve evidence, clear a hold, or
    view protected W-9 values;
11. a reviewer cannot apply one subcontractor’s evidence to another;
12. restart persistence and independent reconstruction preserve onboarding status,
    evidence references, reviewer attribution and hold result; and
13. no invoice, payment, ledger, tax, payroll, bank, or raw-document byte is
    created by these tests.

## Explicit exclusions

This contract does not authorize automated W-9 collection, public contractor
portal access, contractor classification determination, insurance coverage
verification by insurer API, procurement, purchase orders, payable invoice
creation, payment release, AP posting, banking, payroll, retainage, lien-waiver
workflow, accounting authority, or modification of customer payment processing.
Those require later bounded authority.

## Implementation handoff

Extend the existing Midwest24 Enterprise controlled-form and Job/Work Order
model. Add only the subcontractor onboarding, compliance requirement/evidence,
assignment restriction and payment-review-hold records, least-privilege services,
deterministic UI state and acceptance harness required above. Reuse Document Services references; do not duplicate document bytes or
store tax identifiers in OFBiz. Preserve unrelated implementation work. Show the
precise diff and targeted validation before any commit or live deployment.
