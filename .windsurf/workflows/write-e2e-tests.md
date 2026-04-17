# write-e2e-tests

Goal:
Generate E2E tests for a backend feature with realistic coverage.

Steps:
1. Identify the target module/route/gateway.
2. Cover:
   - happy path
   - invalid input
   - auth failure
   - forbidden/ownership failure
   - compatibility response shape if applicable
3. Keep fixtures minimal.
4. Prefer readable setup over over-abstracted helpers.
5. Include test data assumptions explicitly.
6. If the flow is transaction-sensitive, add a consistency-focused test.
7. If the flow is a gateway flow, include auth and event payload tests.

Output format:
1. Test scope
2. Files created/updated
3. Complete test files
4. Required setup notes
