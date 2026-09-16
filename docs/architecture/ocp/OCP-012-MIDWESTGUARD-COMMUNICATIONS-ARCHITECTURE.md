# OCP-012 — MIDWESTGuard Communications Architecture

Version: 1.1.0

Status: Approved

Type: Operational Change Proposal

Authority: Systems Architect Discipline

Approved: 2026-09-15

Scope: Communications ownership and migration-compatible CRM context. No connector deployment, provider migration, live CRM cutover or production-data migration.

## Purpose

Define the current and target ownership boundaries for MIDWESTGuard customer
communications, including website chat, telephone, future human handoff,
after-hours follow-up, CRM context and migration away from EspoCRM.

The objective is to avoid creating competing customer-communication systems while
preserving the existing net2phone telephone-number portfolio.

## Architectural Ownership

### net2phone

net2phone is the planned telephony and communications transport layer.

Expected responsibilities may include, subject to capability validation:

- telephone-number ownership and routing;
- inbound and outbound calling;
- voicemail;
- call-event and call-history integration;
- SMS or messaging where supported and authorized;
- future click-to-call or callback orchestration;
- business-hours and after-hours telephony routing.

net2phone is not the customer system of record.

### Midwest24 Core Command and CRM authority

Midwest24 Core Command is the durable CRM-facing product surface. EspoCRM is its
current implementation and operational CRM bridge, not the permanent CRM system
of record.

Until a capability-specific cutover, EspoCRM may remain authoritative for:

- Lead and Contact identity;
- communication history associated with customer records;
- office follow-up queues;
- ownership and assignment;
- human-requested chat escalation;
- next-business-day follow-up;
- sales qualification;
- customer-facing communication context and summaries.

After a governed capability cutover, the same Command-facing functions use
Midwest24 Core Enterprise as the authoritative CRM context. Channel and user
interfaces must not require permanent EspoCRM dependency.

### MIDWESTGuard Website and Chat Assistant

The public website and chatbot are customer-facing intake surfaces.

They may:

- answer bounded questions;
- collect minimal lead information;
- identify roofing need;
- capture financing interest;
- offer telephone contact;
- allow a visitor to request a human;
- preserve a session for later follow-up.

They must not create a second independent CRM or bypass the governed public-intake
boundary.

### Midwest24 Core Enterprise / Apache OFBiz

Midwest24 Core Enterprise, implemented by Apache OFBiz and the governed
Midwest24-owned extension, is the strategic target for authoritative CRM context
and downstream ERP/operational execution.

Target domains include:

- Leads, Customers, Contacts, Properties and Opportunities;
- CRM activity, follow-up, lineage and communication context;

- jobs and production;
- work orders;
- purchasing;
- materials and inventory;
- subcontractor operations;
- billing and operational accounting integrations;
- other downstream business-process execution.

net2phone remains call transport and channel routing. Website/chat, email and
other providers remain their channel surfaces/transports. Enterprise stores the
governed business context after cutover; it does not replace those transports.

## Human Handoff Model

The current bridge model is:

Website visitor
→ chatbot
→ EspoCRM Lead / communication session
→ office employee when human assistance is requested.

The approved target model after the applicable cutover is:

Website / chat / email / net2phone event
→ bounded channel adapter
→ Enterprise authoritative Lead / Contact / activity / communication context
→ Command-facing employee workspace.

During business hours:

- an available office employee may be notified or assigned;
- the customer may request a call or future real-time handoff;
- the session remains associated with the authoritative Lead or Contact in the
  current system during transition and in Enterprise after cutover.

After hours:

- human takeover is unavailable;
- the customer is informed that the office is closed;
- the session or a bounded summary is preserved;
- the interaction enters a next-business-day follow-up queue;
- an office employee can resume or call the customer the following business period.

No design should imply live human availability when no employee is actually
available.

## Communications Session States

A future implementation should evaluate states such as:

- Bot Active
- Human Requested
- Waiting for Agent
- Assigned
- Human Active
- After Hours Queue
- Follow-up Required
- Closed

The exact Enterprise activity/session model and each EspoCRM transition require
separate bounded implementation and cutover contracts.

## Telephone Number Portfolio

Existing net2phone telephone numbers are assets and should be preserved.

Future planning may classify numbers by:

- primary company number;
- geography;
- business unit;
- marketing source;
- campaign;
- tracking purpose;
- future expansion.

Current 417-region numbers and future-use 719-region numbers should not be moved,
ported, reassigned, or retired solely to simplify CRM integration.

## Provider-Preservation Rule

MIDWESTGuard must not replace net2phone merely because another telephone provider
has a native connector for EspoCRM, OFBiz or another CRM.

A provider migration requires evidence of a material technical, operational,
financial, reliability, or compliance blocker that cannot reasonably be solved by
a bounded net2phone integration.

## Integration Principle

Prefer bounded, replay-safe channel adapters that can serve the current EspoCRM
bridge and then Enterprise CRM context without duplicating communications truth.

Potential future integration capabilities include:

- inbound caller identification against Leads and Contacts;
- call-history association;
- missed-call follow-up;
- voicemail-triggered follow-up;
- office notification;
- click-to-call;
- callback requests;
- SMS association where supported;
- after-hours queueing;
- communications response-time measurement.

No capability is assumed available until validated against the actual net2phone
account and product entitlements.

## Research Gate — Net2phone Capability & Integration Assessment

Before implementation, complete a bounded assessment of the actual MIDWESTGuard
net2phone account.

The assessment must determine:

1. Current account/product tier and enabled capabilities.
2. Telephone-number inventory and current routing purpose.
3. API authentication methods actually available to the account.
4. Available API resources.
5. Available webhook/event subscriptions.
6. Incoming-call events.
7. Answered/completed-call events.
8. Missed-call events.
9. Voicemail events and metadata.
10. Call-detail/history access.
11. SMS or messaging capability and restrictions.
12. Click-to-call or outbound-call initiation capability.
13. Call routing and forwarding controls.
14. Business-hours and after-hours routing capability.
15. Rate limits and reliability constraints.
16. Data-retention and privacy boundaries.
17. Current EspoCRM bridge requirements and transition constraints.
18. Enterprise CRM-context contract and whether an owned adapter or another
    bounded integration surface is appropriate.

The assessment must distinguish:

- capabilities documented by net2phone;
- capabilities enabled for the MIDWESTGuard account;
- capabilities merely possible in theory;
- capabilities requiring additional licensing or activation.

## Implementation Sequence

### Phase 1 — Communications Foundation

- inventory and classify telephone numbers;
- document current call routing;
- preserve existing production service;
- identify office-hours and after-hours behavior;
- perform the Net2phone Capability & Integration Assessment.

### Phase 2 — Current-Bridge Communications Integration

Evaluate bounded integration against current EspoCRM operations while preserving
an implementation-independent event contract for Enterprise migration:

- caller matching;
- call-history association;
- missed-call follow-up;
- voicemail follow-up;
- click-to-call;
- employee assignment and notification.

Do not create a new permanent dependency on EspoCRM.

### Phase 3 — Chat and Human Handoff

Extend the website chatbot so:

- a visitor can request a person;
- business-hours availability is represented accurately;
- after-hours sessions enter a next-business-day queue;
- the Lead and chat/session context remain associated with the current CRM
  authority and can move to Enterprise through the governed migration contract.

### Phase 4 — Unified Communications

Only after prior phases validate operational value, evaluate unified handling of:

- website chat;
- telephone;
- missed calls;
- voicemail;
- SMS where supported;
- campaign/source telephone numbers;
- response-time and conversion metrics.

## Non-Goals

This architecture does not authorize:

- replacing net2phone;
- implementing a telephone provider migration;
- reimplementing net2phone or another channel transport inside Enterprise;
- transferring a communications capability before its migration/cutover gate;
- deploying live-agent chat;
- exposing CRM or telephony credentials in the browser;
- storing unrestricted chat transcripts directly in Lead descriptions;
- automating outbound marketing consent;
- changing existing telephone routing.

## Decision

Adopt the following long-term ownership model:

**net2phone = communications transport**

**Midwest24 Core Command = CRM-facing communications workspace**

**MIDWESTGuard website/chatbot = customer-facing intake and conversation surface**

**Midwest24 Core Enterprise / Apache OFBiz = target authoritative CRM context and downstream ERP/operational execution**

**EspoCRM = current transitional CRM bridge until capability-specific cutover**

Implementation remains gated by the Net2phone Capability & Integration Assessment
and subsequent governed authorization.

## Product Naming Cross-Reference

Terminology supplement, 2026-09-11: [ACP-011](../acp/ACP-011-MIDWEST24-CORE-PRODUCT-IDENTITY-AND-SYSTEM-NAMING.md).

Midwest24 Core Command names the durable CRM/front-office product surface,
currently implemented with EspoCRM. Midwest24 Core Enterprise names the unified
target CRM/ERP authority, implemented by Apache OFBiz and the governed owned
extension. After cutover, Command may remain the role-focused CRM surface backed
by Enterprise authority. Product identity is independent of the software package.

This decision does not authorize a connector, automation, production migration,
provider change or capability cutover.
