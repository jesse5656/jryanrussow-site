# Data-Portability and Exit Reconstruction Test

## Objective

Prove that the organization can preserve and reconstruct business meaning outside the running application.

## Representative dataset

Create, where applicable:
- organizations;
- people;
- locations/properties;
- parent/child records;
- many-to-many relationships;
- custom fields;
- workflow/state history;
- ownership/assignment;
- timestamps;
- comments/notes;
- documents;
- attachments;
- media references;
- financial relationships;
- custom business objects.

## Exit methods

Test all applicable:
- native export;
- API extraction;
- database dump;
- file-store recovery;
- configuration export;
- custom-code repository recovery.

## Reconstruction check

Independently verify:
- stable identifiers;
- relational links;
- object types;
- custom fields;
- state;
- history;
- provenance;
- file/attachment association;
- financial relationship integrity.

## Failure examples

Fail portability when:
- contacts and jobs export but their relationship is lost;
- attachments export as files with no durable record association;
- custom fields are dropped;
- history/audit state is omitted when materially required;
- export requires a proprietary tool after termination;
- the database is available but the schema/custom metadata needed to interpret it is not.

A CSV dump is not automatically portable.
