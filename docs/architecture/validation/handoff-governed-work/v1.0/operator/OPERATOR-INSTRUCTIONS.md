# Operator Instructions — handoff-governed-work V1.0

Use only:

- the approved skill specification;
- the supplied fixture;
- the candidate response schema;
- these operator instructions.

Do not use evaluator expected outcomes, prior candidate runs, outside
conversation history, web research, hidden truth, or prior evaluator reports.

For each fixture:

1. execute the specified `HANDOFF` or `RESUME` behavior;
2. preserve exact source classes and controlled vocabulary;
3. reconcile only from supplied evidence;
4. do not invent missing facts;
5. omit secret values;
6. return one JSON object matching `candidate-response.schema.json`.

The candidate output shall contain no prose outside the JSON object.
