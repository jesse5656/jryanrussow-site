# Implementation handoff — approved OCP-014 private scope

Implementation repository: /home/jesse/Documents/Projects/mwg-ofbiz

Use as evidence only:
- plugins/midwest24-enterprise/src/main/groovy/JobFormRegister.groovy
- plugins/midwest24-enterprise/entitydef/job-form-register-entitymodel.xml
- plugins/midwest24-enterprise/servicedef/job-form-register-services.xml

Do not reuse the candidate unchanged. Before implementation, review:
- permission/actor checks;
- immutable history, currently absent from the candidate register model;
- Work Order scope instead of Job-only scope;
- NOT_APPLICABLE reason enforcement;
- gate enforcement at exactly the listed transitions;
- idempotent request receipts and altered-replay conflict;
- transaction rollback and restart persistence;
- no document-byte storage.

Approved bounded implementation files:
- one new entity model/service definition for readiness register and append-only history;
- one bounded Groovy service implementation;
- one private UI/controller surface only if required by acceptance;
- one secret-free private acceptance record.

Do not modify ProductionOperations lifecycle semantics except for the narrowest
validated readiness-gate call at the approved transitions. Do not modify CRM,
accounting, communications, website, or subcontractor-compliance behavior.

Acceptance runtime: new isolated private candidate only; no live OFBiz,
legacy POC, EspoCRM, website, Cloudflare, n8n, provider, or production data.
