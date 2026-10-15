# Midwest24 Rental Tenant Portal and Screening

## Decision

Midwest24 will provide a renter-facing portal that supports the path from
application to active lease. The applicant will create an account, complete the
application, authorize screening, upload supporting documents, receive a
decision, review and sign the lease, and configure rent payments without
re-entering approved application data.

The selected signing platform is **Documenso**. The selected tenant-screening
provider is **TransUnion Rental Screening**. The provider account, contract,
product access, and credentials remain unconfigured until they are established
outside source control.

For rental equipment, Midwest24 will support **ID.me** as an optional,
high-assurance, step-up identity-verification provider. ID.me is triggered by
equipment value, risk signals, renter history, or manual review; it is not a
universal requirement for residential applicants.

## Workflow

```text
Property / Unit invitation
  → Applicant account
  → Rental application
  → Screening disclosure and consent
  → TransUnion hosted or approved API flow
  → Review against versioned criteria
  → Approval or adverse action
  → Lease generated from approved application
  → Documenso signature envelope
  → Executed lease
  → Move-in and payment setup
```

The application is the source for the lease draft, subject to manager review.
Approved information must not be manually re-keyed into a second lease record.
The source application, criteria version, lease-template version, signer
events, and executed-document reference remain connected.

## Provider responsibilities

### Documenso

Documenso handles document envelopes, recipient roles, signature fields,
signature events, completed-document status, audit evidence, and the executed
lease workflow. Midwest24 should consume Documenso API and webhook events and
store provider IDs, status, document version, and integrity hashes.

### TransUnion

TransUnion handles the applicant-facing screening process and the applicable
credit, ResidentScore, eviction, criminal, identity, and rental-history data.
The integration must use TransUnion's approved rental-screening product and
contract, not an unrelated consumer or employment-screening product.

Midwest24 should store provider references, consent evidence, status, decision
inputs, dispute state, and adverse-action evidence. It should not store raw
Social Security numbers, bank credentials, or unrestricted copies of consumer
reports in ordinary CRM notes.

### ID.me for equipment rentals

ID.me may verify government identity documents, telecom signals, and liveness
or selfie matching through its business services and APIs. Midwest24 should
store only the verification result, level, provider reference, timestamps, and
decision reference. Raw identity documents, selfies, biometric data, and SSNs
must remain outside Midwest24 Core.

ID.me verification does not replace tenant screening, payment authorization,
insurance review, or the signed equipment-rental agreement. A failed or
unavailable provider state must allow manual review or an approved alternate
verification path rather than creating an automatic denial by itself.

The rental transaction evaluates the rule before checkout: commercial renters
require commercial high assurance; manual review, risk signals, or adverse
renter history require high assurance; equipment value at or above the
configured threshold requires high assurance; and transactions without a
trigger use standard controls. A supplied equipment value without a configured
threshold is a configuration error, not an automatic approval.

## Portal capabilities

Applicants and tenants should be able to:

- Accept an invitation for a specific property and unit.
- Create an account and verify contact information.
- Save and resume an application.
- Add co-applicants and guarantors.
- Submit rental history, employment, income, references, pets, and supporting
  documents.
- Authorize TransUnion screening through the approved provider flow.
- See application status and requests for missing information.
- Receive a decision or adverse-action notice.
- Review and sign the lease through Documenso.
- Set up rent payment after lease execution.
- Submit maintenance requests after active tenancy begins.

## Required safeguards

Screening criteria must be versioned, published to applicants before screening,
and applied consistently. If a consumer report influences a denial, higher
rent, higher deposit, co-signer requirement, or another unfavorable decision,
Midwest24 must issue and retain the required adverse-action notice and provider
information.

Application, screening, lease, payment, and maintenance records require
separate role and object-level access. Provider secrets must remain in the
deployment secret store. Webhook endpoints must use HTTPS, verify provider
signatures, validate event payloads, and be idempotent.

## Implementation state

| Capability | Decision | Current state |
|---|---|---|
| Tenant portal workflow | Approved | Workflow definition exists in the Midwest24 component |
| Documenso signing | Selected | Provider adapter and account configuration remain to be completed |
| TransUnion screening | Selected | Product contract, account, approved integration mode, and credentials remain to be completed |
| Lease generation from approved application | Approved | Must preserve application-to-lease provenance |
| Rent payment setup | In scope | Provider selection and authorization flow remain separate decisions |
| Adverse-action workflow | Required | Must be implemented before production screening |
| Equipment identity verification | Approved | ID.me step-up flow remains account and credential configuration work |

## Source references

- [Documenso documentation](https://docs.documenso.com/)
- [Documenso API reference](https://openapi.documenso.com/)
- [Apartments.com screening workflow](https://propertyhelp.apartments.com/article/24-how-to-use-apartments-apps-and-screening)
- [TransUnion SmartMove overview](https://www.transunion.com/product/smartmove)
- [ID.me identity verification](https://www.id.me/business/identity-verification)
- [ID.me APIs guide](https://docs.id.me/apis/overview)
- [ID.me privacy policy](https://www.id.me/privacy)
- [FTC guidance for landlords using consumer reports](https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-landlords-need-know)
- [CFPB adverse-action explanation](https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-my-rental-application-is-denied-because-of-a-tenant-screening-report-en-2105/)
