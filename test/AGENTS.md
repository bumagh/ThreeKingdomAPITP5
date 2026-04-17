# Testing Rules

## General
- Prefer E2E tests for core flows
- Keep fixtures minimal and reusable
- Make tests readable and deterministic

## Must-Test Areas
- auth login/register
- legacy response compatibility
- character creation
- bag/goods ownership checks
- increment update allowlists
- ranking order allowlists
- chat gateway authentication
- transaction-sensitive flows

## Test Style
- One test file per module or feature flow
- Cover:
  - happy path
  - invalid input
  - unauthorized access
  - ownership violation
  - conflict cases

## Naming
- Use behavior-driven descriptions
- Prefer explicit scenario names over vague titles
