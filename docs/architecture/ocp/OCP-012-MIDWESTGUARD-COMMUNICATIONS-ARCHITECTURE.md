# OCP-012 — MIDWESTGuard Communications Architecture

## Status

Proposed long-term architecture direction.

This record authorizes planning and bounded research only. It does not authorize
deployment of a net2phone connector, live-agent chat, SMS automation, telephony
automation, or Apache OFBiz communications functionality.

## Purpose

Define the long-term ownership boundaries for MIDWESTGuard customer communications,
including website chat, telephone, future human handoff, after-hours follow-up, and
CRM integration.

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

### EspoCRM

EspoCRM is the planned customer, Lead, Contact, and communications system of record.

Expected responsibilities include:

- Lead and Contact identity;
- communication history associated with customer records;
- office follow-up queues;
- ownership and assignment;
- human-requested chat escalation;
- next-business-day follow-up;
- sales qualification;
- customer-facing communication context and summaries.

Chat or telephone activity should reconcile to EspoCRM when technically and
operationally appropriate.

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

### Apache OFBiz

Apache OFBiz is reserved for downstream ERP and operational execution.

Expected domains include:

- jobs and production;
- work orders;
- purchasing;
- materials and inventory;
- subcontractor operations;
- billing and operational accounting integrations;
- other downstream business-process execution.

Live customer chat, call routing, and front-office communication queues are not
OFBiz responsibilities unless a future governed decision explicitly changes this
boundary.

## Human Handoff Model

The target communications model is:

Website visitor
→ chatbot
→ EspoCRM Lead / communication session
→ office employee when human assistance is requested.

During business hours:

- an available office employee may be notified or assigned;
- the customer may request a call or future real-time handoff;
- the session remains associated with the Lead or Contact.

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

The exact EspoCRM entity model is not authorized by this record and requires a
separate implementation decision.

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
has a native EspoCRM connector.

A provider migration requires evidence of a material technical, operational,
financial, reliability, or compliance blocker that cannot reasonably be solved by
a bounded net2phone integration.

## Integration Principle

Prefer a bounded integration between net2phone and EspoCRM over a duplicate
communications platform.

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
17. EspoCRM integration requirements.
18. Whether a custom EspoCRM extension, middleware adapter, or another bounded
    integration surface is the appropriate implementation mechanism.

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

### Phase 2 — EspoCRM Communications Integration

Evaluate bounded integration for:

- caller matching;
- call-history association;
- missed-call follow-up;
- voicemail follow-up;
- click-to-call;
- employee assignment and notification.

### Phase 3 — Chat and Human Handoff

Extend the website chatbot so:

- a visitor can request a person;
- business-hours availability is represented accurately;
- after-hours sessions enter a next-business-day queue;
- the Lead and chat/session context remain associated in EspoCRM.

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
- building communications inside OFBiz;
- deploying live-agent chat;
- exposing CRM or telephony credentials in the browser;
- storing unrestricted chat transcripts directly in Lead descriptions;
- automating outbound marketing consent;
- changing existing telephone routing.

## Decision

Adopt the following long-term ownership model:

**net2phone = communications transport**

**EspoCRM = customer and communications system of record**

**MIDWESTGuard website/chatbot = customer-facing intake and conversation surface**

**Apache OFBiz = downstream ERP and operational execution**

Implementation remains gated by the Net2phone Capability & Integration Assessment
and subsequent governed authorization.

## Product Naming Cross-Reference

Terminology supplement, 2026-09-11: [ACP-011](../acp/ACP-011-MIDWEST24-CORE-PRODUCT-IDENTITY-AND-SYSTEM-NAMING.md).

Midwest24 Core Command names the CRM/front-office capability currently
implemented with EspoCRM. Midwest24 Core Enterprise names the ERP capability,
with Apache OFBiz as a candidate. This terminology does not approve the proposed
communications direction or authorize connectors, automation, or deployment.

Implementation names and the original decision status remain unchanged.
