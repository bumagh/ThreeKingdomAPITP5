# Feature Module Rules

## For Every New Module
When creating a new NestJS module, prefer this layout:

feature/
  feature.module.ts
  feature.controller.ts
  feature.service.ts
  dto/
    create-feature.dto.ts
    update-feature.dto.ts

## Expectations
- DTOs for all external inputs
- Swagger annotations for public endpoints
- Clear ownership checks for user-owned resources
- Transaction notes for write flows
- Tests for happy path and invalid input

## If Compatibility Is Required
- Create compatibility routes in controller layer
- Keep compatibility mapping logic isolated
- Do not pollute core domain methods with legacy transport quirks
