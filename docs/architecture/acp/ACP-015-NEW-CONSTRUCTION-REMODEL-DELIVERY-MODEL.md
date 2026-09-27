# ACP-015 — New Construction and Remodel Delivery Model

Version: 1.0.0

Status: Approved

Type: Architecture Change Proposal and bounded private implementation contract

Authority: Systems Architect Discipline

Proposed: 2026-09-26

Approved: 2026-09-26

## Purpose

Define the first shared Midwest24 Core Enterprise vocabulary and bounded delivery
model for residential new construction and remodel work. The model starts from
the supplied residential construction checklist. It does not approve production
implementation, alter the approved Roof/Siding production lifecycle, or assert
that the checklist is a complete construction schedule, permit plan, code
standard, estimate, or contractual scope.

## Why a separate proposal is required

ACP-013 currently governs the bounded production path from an accepted contract
to one Job with Roof and Siding Work Orders. New construction and remodel work
adds a multi-phase, multi-trade delivery graph. It needs explicit terms,
dependencies, ownership, acceptance and change-control rules before it can be
implemented or used for live work.

This proposal extends the Enterprise delivery model; it does not reopen CRM
authority, accounting, Document Services, communications, or existing Job and
Work Order identity.

## Governing vocabulary

| Term | Meaning | Governing representation |
| --- | --- | --- |
| **Commercial contract** | The accepted customer agreement that authorizes delivery scope. | Existing accepted-contract evidence and document-reference boundary. It is not replaced by a Job. |
| **Job** | One accountable customer delivery engagement. A roof replacement, remodel, or new home may each be a Job. | Existing native `WorkEffort(PROJECT)`. The immutable native ID is canonical; a human Job number is a business key only. |
| **Phase** | A named, bounded portion of Job delivery used to organize dependencies, accountable completion and reporting. It is not a lifecycle state. | Native `WorkEffort(PHASE)` directly under the Job `WorkEffort(PROJECT)`. |
| **Work package** | One planned unit of scope within a Phase, such as `Install wall framing` or `Install plumbing rough-ins`. It has an accountable party/trade, prerequisites and acceptance evidence. | An immutable catalog entry plus a Job-specific instance. A selected executable package materializes one native child `WorkEffort(TASK)`. |
| **Work Order** | An assignable, executable trade instruction. | Native `WorkEffort(TASK)` directly under its Phase, with existing Midwest24-owned trade semantics, assignment, scoped authorization, receipts and immutable history. |
| **Stage / status** | The controlled lifecycle state of a Job, Phase, work package or Work Order. | Deterministic status IDs and permitted transitions. A status is never used as a substitute for phase membership or scope. |
| **Gate / milestone** | An evidence-backed condition that must pass before a dependent work package can begin or a phase can close. | Owned validation/evidence rule linked to the applicable Job, Phase or Work Order. It is not an assumed calendar date. |
| **Change order** | A separately approved change to accepted scope, price, schedule or work-package graph. | Deferred. No scope or dependency may be silently rewritten after acceptance. |

## Pinned native-model finding

The committed OFBiz baseline at
`03d5941e490c55780aad4cca6e47bbe2c1fad3b5` remains the required
implementation baseline. Its pinned Apache OFBiz 24.09.07 source includes:

- `WorkEffortType(PROJECT)`;
- `WorkEffortType(PHASE)`, described upstream as `Project Phase`; and
- `WorkEffortType(TASK)`.

Source: `.build/source/apache-ofbiz-24.09.07/applications/workeffort/data/WorkEffortTypeData.xml`.

The approved physical graph for this private slice is therefore:

```text
Job WorkEffort(PROJECT)
  └─ Phase WorkEffort(PHASE)
       └─ Work Order WorkEffort(TASK)
```

The existing direct `PROJECT → TASK` production Roof/Siding graph remains
valid and unchanged. This slice proves the nested graph in an isolated private
runtime only. It must not rewrite existing Jobs or change the production
handoff path.

## Authority and boundaries

- OFBiz remains authoritative for the Job, its phase/work-package graph, executable
  Work Orders, assignments, status history, authorization and delivery evidence
  after accepted-contract handoff.
- Customer, Contact, Property, Lead, Opportunity, Task and Meeting remain the
  existing OFBiz CRM identities and relationships.
- The accepted contract and version/hash evidence remain the contract-execution
  reference until ACP-012 Document Services is separately operationalized.
- The checklist is an initial planning catalog only. Actual structural, permit,
  inspection, engineering, code, subcontract, schedule, safety, material,
  price, payment, lien, warranty and legal requirements must be established per
  Job through separately authorized operating processes.
- No phase, work package or Work Order authorizes a worker to perform work
  outside an accepted scope, valid permit/inspection prerequisite, object scope
  or assigned trade authority.

## Initial phase catalog

The following catalog is transcribed from the supplied
`new_residential_construction_checklist.tsv`. It is intended as the first
new-construction template and a candidate starting point for remodel templates.
It is not a universal or mandatory sequence.

| Phase ID | Phase | Initial work packages | Default accountable trade/party |
| --- | --- | --- | --- |
| `M24_PHASE_PRECON` | Pre-Construction | Obtain permits and approvals; Site preparation; Excavation and grading | Contractor |
| `M24_PHASE_FOUNDATION` | Foundation | Install footings; Pour foundation; Install foundation drainage; Backfill around foundation | Contractor |
| `M24_PHASE_FRAMING` | Framing | Install floor framing; Install wall framing; Install roof framing; Install exterior sheathing | Framer |
| `M24_PHASE_EXTERIOR` | Exterior | Install roofing material; Install windows and doors; Install exterior siding | Roofer / Contractor |
| `M24_PHASE_SYSTEMS` | Systems | Install plumbing rough-ins; Install electrical rough-ins; Install HVAC rough-ins; Install plumbing fixtures; Install electrical fixtures; Install HVAC fixtures | Plumber / Electrician / HVAC Contractor |
| `M24_PHASE_INTERIOR` | Interior | Install insulation; Install drywall; Tape and finish drywall; Prime and paint walls; Install interior trim; Install interior doors; Install flooring; Install cabinets and countertops | Insulation Contractor / Drywaller / Painter / Carpenter / Flooring Installer / Cabinet Installer |
| `M24_PHASE_FINAL` | Final Stages | Install appliances; Final inspection; Final cleanup; Landscaping | Contractor / Inspector / Landscaper |

## Dependency model

The phase catalog is a dependency graph, not a single fixed linear sequence.

The following minimum dependency assumptions require explicit confirmation in
each template and Job:

- permits/approvals, site preparation and excavation/grading precede the
  applicable foundation work;
- footings, foundation, drainage and backfill follow their verified
  foundation/inspection dependencies;
- framing depends on the applicable foundation completion;
- roof framing and exterior sheathing precede the applicable roofing and
  weather-enclosure work;
- rough plumbing, electrical and HVAC work must be explicitly ordered with
  framing, enclosure, insulation and drywall; this proposal does not assume the
  TSV row order is construction sequencing;
- fixture work depends on its associated rough-in and any required finish
  prerequisite;
- final inspection, cleanup and landscaping require the applicable prior scope
  and evidence, but do not by themselves close a Job;
- any missing, contradictory or Job-specific dependency is a visible planning
  exception. It cannot be inferred from a phase name.

A future template must state each prerequisite as a typed dependency, a required
gate, or an explicit `NOT_APPLICABLE` decision with attributable reason.

## Lifecycle design boundary

The approved production statuses remain controlling for the existing bounded
Roof and Siding Work Orders:

- Roof: `M24_PRD_ROOF_READY → M24_PRD_ROOF_SCHED → M24_PRD_ROOF_INSTALL → M24_PRD_ROOF_CHECK → M24_PRD_ROOF_DONE`
- Siding: `M24_PRD_SIDE_READY → M24_PRD_SIDE_SCHED → M24_PRD_SIDE_INSTALL → M24_PRD_SIDE_DONE`

This proposal does not assign status IDs, transition owners, or a production
lifecycle to other phases or trades. Each future trade package must define its
own permitted transition matrix, owner, required evidence, denial behavior,
replay behavior and rollback boundary before it becomes executable.

A Phase may be `NOT_STARTED`, `ACTIVE`, `BLOCKED`, `COMPLETE`, or
`NOT_APPLICABLE` only after the physical model and deterministic production
status identifiers are approved. Those names are conceptual labels here, not
approved OFBiz status IDs.

A Job closes only when the accepted scope is either complete with required
evidence or formally changed/cancelled by separately governed authority. A
completed Work Order alone does not prove a whole Phase or Job complete.

## New construction and remodel relationship

New construction and remodel work use the same Job → Phase → Work package →
Work Order model.

- A **new-construction template** may begin with site, foundation and framing
  phases.
- A **remodel template** begins from the selected accepted scope and includes
  only applicable phases/work packages.
- `NOT_APPLICABLE` must be explicit and attributable. A remodel must not
  inherit excavation, foundation, or any other package merely because it exists
  in the residential template.
- Existing Roof/Siding work remains a selected trade package within the
  applicable Job/Phase; it is not recast as a separate Job model.

## Approved private implementation slice — Exterior Roof/Siding

### Scope and catalog

Approve one isolated private slice named **New Construction and Remodel Slice 1
— Exterior Roof/Siding Phase**.

The slice publishes immutable catalog version `M24_NC_RM_EXT_V1`. It contains
exactly one phase and two executable work packages:

| Catalog key | Kind | Label | Default trade |
| --- | --- | --- | --- |
| `M24_PHASE_EXTERIOR` | Phase | Exterior | N/A |
| `M24_WP_EXT_ROOF` | Work package | Install roofing material | Roof |
| `M24_WP_EXT_SIDING` | Work package | Install exterior siding | Siding |

The catalog version, its complete normalized JSON representation, SHA-256, issuer
and publication time are immutable. A correction creates a new catalog version;
it never mutates an accepted version or a Job instance created from it.

Implementation may introduce only the following owned planning records, with
physical field names refined as needed without changing this identity:

- `M24DeliveryCatalogVersion`: canonical catalog version, immutable normalized
  payload/hash and publication evidence;
- `M24DeliveryCatalogNode`: a phase or work-package node keyed within one
  catalog version;
- `M24DeliveryDependency`: typed dependency or gate required by one catalog
  node;
- `M24DeliveryJobNode`: immutable catalog-to-Job/Phase/Work-Order instance
  binding, including applicability decision and source catalog hash; and
- `M24DeliveryGateEvidence`: attributable evidence that a required gate passed
  or was rejected.

No generic project template engine, cost model, schedule engine or change-order
model is approved.

### Applicability and dependency rules

Every catalog phase and work package selected for a Job must have exactly one
recorded applicability decision:

- `APPLICABLE`: the node may be materialized only after its dependencies and
  gates pass;
- `NOT_APPLICABLE`: requires an attributable, non-empty reason and creates no
  Phase, Work Order, assignment, lifecycle event or silent substitute; or
- `OUT_OF_SCOPE`: the node is absent from the selected bounded catalog and
  creates no Job state.

The first private fixture must record a Foundation phase as
`NOT_APPLICABLE` with a synthetic scope reason, proving the rule without
claiming that foundation work is irrelevant to real new construction.

The initial typed relationship is:

```text
M24_GATE_EXTERIOR_READY --GATE_REQUIRED--> M24_PHASE_EXTERIOR
M24_PHASE_EXTERIOR --CONTAINS--> M24_WP_EXT_ROOF
M24_PHASE_EXTERIOR --CONTAINS--> M24_WP_EXT_SIDING
```

`M24_GATE_EXTERIOR_READY` represents verified predecessor framing/enclosure
readiness in the private fixture. It is a metadata/evidence gate, not a claim
that the slice implements Framing. Missing, rejected, contradictory or
unattributed gate evidence blocks Phase and Task materialization. The first
slice does not infer dependency satisfaction from task order, name, status or
human assertion.

### Native graph and lifecycle

A successful private materialization creates exactly:

```text
one Job(PROJECT)
  → one Exterior Phase(PHASE)
      → one Roof Work Order(TASK)
      → one Siding Work Order(TASK)
```

Both Tasks are linked to their catalog nodes and the containing Phase. They
reuse, without copying or changing, the committed production lifecycle from
`03d5941e490c55780aad4cca6e47bbe2c1fad3b5`:

- Roof: `M24_PRD_ROOF_READY → M24_PRD_ROOF_SCHED →
  M24_PRD_ROOF_INSTALL → M24_PRD_ROOF_CHECK → M24_PRD_ROOF_DONE`;
- Siding: `M24_PRD_SIDE_READY → M24_PRD_SIDE_SCHED →
  M24_PRD_SIDE_INSTALL → M24_PRD_SIDE_DONE`.

The first slice adds no Phase status IDs and no trade status IDs. It must adapt
the existing private operation path to resolve a Task's enclosing Phase and
Job deterministically, while leaving the committed direct-child production path
unchanged.

### Authorization and integrity

The private runtime must retain the existing coordinator/crew least-privilege
model. A user needs the existing object-scoped Roof or Siding action grant for
the selected Task. Catalog publication/materialization and gate recording use a
disabled noninteractive execution principal; ordinary crew users receive no
catalog, gate, configuration or cross-Job authority.

Every materialization and gate command has an opaque request ID and canonical
payload hash. Exact replay returns the same Phase/Task bindings and receipt.
Altered payload, catalog hash mismatch, duplicate active binding, unknown
catalog node, absent gate, invalid applicability, unauthorized actor, direct
`PROJECT → TASK` bypass, or any attempt to alter a published catalog must
fail before business mutation.

### Private acceptance

In a fresh isolated OFBiz 24.09.07 runtime, prove:

1. published `M24_NC_RM_EXT_V1` has a stable normalized hash and cannot be
   mutated;
2. a synthetic accepted Job materializes one native `PHASE` and two native
   `TASK` children only after attributed `M24_GATE_EXTERIOR_READY` evidence;
3. the task-to-phase-to-job graph, catalog version/hash, trade context and
   applicability decisions survive restart/recreation and independently
   reconstruct;
4. each Task follows the existing Roof/Siding allowed and denied transition
   matrix; Job completion remains governed by the existing production rule;
5. the same request replays inertly, concurrent identical requests produce one
   graph, and altered replay conflicts without mutation;
6. missing or failed gate, missing/incorrect catalog hash, direct-child bypass,
   duplicate node, invalid `NOT_APPLICABLE`, unauthorized publisher,
   coordinator, crew or guessed object ID all deny with no partial graph;
7. injected failure rolls back the native Phase/Tasks, owned bindings, gate
   evidence, receipts and events together;
8. the Foundation `NOT_APPLICABLE` fixture creates no native Phase, Task,
   assignment or lifecycle event;
9. normalized export independently reconstructs the full hierarchy and detects
   tampering with a parent, catalog hash, gate, applicability decision,
   dependency or trade binding; and
10. no live customer, production Job, LAN runtime, provider, website, document
    byte, accounting, procurement, inventory, scheduling/dispatch or
    communications state is accessed or changed.

## Explicit exclusions

This contract does not authorize:

- production creation of a new-construction or remodel Job;
- any OFBiz component, schema, catalog/template, Work Order, assignment, API,
  UI, status record or deployment beyond the isolated private Slice 1 scope
  explicitly approved above;
- a new WorkEffort type or change to the approved Roof/Siding production lifecycle;
- permit, inspection, code, engineering, safety, subcontract, payroll, lien,
  insurance or legal determinations;
- estimate, contract, change-order, procurement, inventory, billing,
  accounting, AR, collections, scheduling/dispatch, documents or warranty
  implementation; or
- alteration of current cash-engine, CRM, website or communications authority.

## Implementation handoff

Deploy Apache OFBiz may implement only **New Construction and Remodel Slice 1 —
Exterior Roof/Siding Phase** after this approved document is committed.

Start from baseline `03d5941e490c55780aad4cca6e47bbe2c1fad3b5`. Use a fresh isolated
private runtime. Add the catalog, binding, dependency and gate model described
above; materialize `PROJECT → PHASE → TASK`; reuse the committed Roof/Siding
lifecycle; and prove the complete private acceptance matrix. Do not change the
existing live production handoff, existing direct `PROJECT → TASK` path,
production configuration, real users, LAN, or any excluded capability.

Show the exact diff and validation evidence before any implementation commit or
deployment.

## Source

- User-supplied `new_residential_construction_checklist.tsv`, received
  2026-09-26. It supplies the initial phase, task and responsible-party catalog.
