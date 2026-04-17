---
trigger: glob
description: Testing requirements for core backend modules and compatibility flows.
globs:
  - test/**
  - src/**/*.ts
---

- Add or update tests for meaningful behavior changes.
- Prefer E2E tests for login, character creation, goods updates, and compatibility routes.
- Test invalid input and authorization/ownership failures.
- Test increment update allowlists.
- Test ranking order allowlists.
- Test transaction-sensitive flows.
- Keep fixtures small and explicit.
