# Midwest24 subcontractor compliance workflow

Midwest24 Core Enterprise now provides a controlled subcontractor onboarding and
compliance page. It records document references and review decisions in OFBiz;
protected document bytes remain in Document Services.

Open the page after signing in to Enterprise:

[Subcontractor compliance](https://enterprise.midwest24.com/enterprise-poc/control/subcontractor-compliance)

## Daily workflow

1. Confirm the subcontractor organization and operator login in Party Manager.
2. Open **Subcontractor compliance** from the Enterprise dashboard.
3. Link the operator login to the subcontractor Party ID.
4. Start onboarding. The initial state is `DRAFT`.
5. Record references for the executed agreement, W-9, general liability,
   workers' compensation, and commercial auto when the assigned work requires a
   vehicle.
6. Keep the record in `PENDING_COMPLIANCE` while evidence is being reviewed.
7. Move it to `APPROVED_FOR_ASSIGNMENT` only after all applicable evidence is
   current and approved.
8. Assign Work Orders through the normal Jobs workflow. The assignment gate
   checks the current onboarding and evidence state.
9. Run **Payment compliance review** before a payment request is considered.

The page accepts only Document Services references. Do not paste W-9,
insurance, or agreement contents into OFBiz.

## Statuses and holds

`DRAFT` means identity preparation has started. `PENDING_COMPLIANCE` means
review is incomplete. `APPROVED_FOR_ASSIGNMENT` allows a new assignment when
all required evidence is effective. `RESTRICTED` and `INACTIVE` prevent new
assignments while preserving history.

Missing, pending, rejected, or expired applicable evidence produces a
`COMPLIANCE_REVIEW_HOLD`. Commercial auto may be `NOT_APPLICABLE` only with an
attributable reason when a vehicle is not required. The review feature records
a hold or clear result; it does not create, approve, release, or send a payment
and does not post accounting transactions.

## Role boundary

Compliance reviewers record evidence and onboarding decisions. Finance
reviewers run payment compliance review. Job coordinators can assign work but
cannot approve evidence or clear holds. Crew users cannot administer
compliance. All decisions are attributable and retained as immutable history.

## Implementation reference

The approved contract is
[ACP-016 — Subcontractor Compliance and Payment-Review Hold](acp/ACP-016-SUBCONTRACTOR-COMPLIANCE-PAYMENT-HOLD.md).
The implementation and private acceptance record remain in the
`mwg-ofbiz` repository under `docs/ACP-016-SUBCONTRACTOR-COMPLIANCE-IMPLEMENTATION.md`.
