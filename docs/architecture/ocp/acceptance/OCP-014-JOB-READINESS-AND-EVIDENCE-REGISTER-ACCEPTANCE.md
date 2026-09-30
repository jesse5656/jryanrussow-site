# Private acceptance matrix — Job Readiness and Evidence Register

| ID | Assertion | Expected result |
|---|---|---|
| JR-01 | Canonical signed-contract Opportunity links to one native PROJECT Job | PASS; IDs and immutable context preserved |
| JR-02 | Selected Roof/Siding TASK Work Orders link to the Job | PASS; only selected trades present |
| JR-03 | Register initialization replay with same request key | Same register IDs; zero duplicates |
| JR-04 | Changed replay payload with same request key | Conflict; zero state effect |
| JR-05 | Required eight evidence keys materialize deterministically | Exactly one row per applicable requirement |
| JR-06 | Actor, timestamp, status, reason and evidence reference persist | PASS; no document bytes stored |
| JR-07 | Missing inspection/permit or safety evidence blocks Job ACCEPT→ACTIVE | DENIED; Job and history unchanged |
| JR-08 | Missing Roof/Siding readiness evidence blocks that trade READY→SCHED | DENIED; other trade unaffected |
| JR-09 | NOT_APPLICABLE with reason does not block its gate | PASS; reason retained |
| JR-10 | COMPLETE requires a non-empty evidence reference | Missing reference denied with zero effect |
| JR-11 | Trade crew can update only its own Work Order requirements | PASS; cross-trade update denied |
| JR-12 | Unassigned user and synthetic M24P_* principal are denied | DENIED; zero effect |
| JR-13 | Job ACTIVE→DONE before required closeout evidence | DENIED; Job unchanged |
| JR-14 | Complete daily report, photo, QA, punch list, warranty evidence | PASS; attributable history retained |
| JR-15 | Job ACTIVE→DONE after all applicable requirements complete | PASS; one transition event |
| JR-16 | Injected initialization/gate failure | Full transaction rollback |
| JR-17 | Application restart | Register, history, references and gates persist |
| JR-18 | Normalized reconstruction | Exact Job → selected Work Orders → register graph |
| JR-19 | Tampered evidence reference/status/history | Detected or rejected; no silent mutation |
| JR-20 | Scope boundary | No billing, AR, collections, payment, procurement, inventory, signing, routing, or live-system effect |
