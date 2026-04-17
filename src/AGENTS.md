# Source Code Conventions

## NestJS Structure
Use clear module boundaries:
- module
- controller
- service
- dto
- guards/decorators if needed

Recommended per feature:
- `xxx.module.ts`
- `xxx.controller.ts`
- `xxx.service.ts`
- `dto/`

## Controller Rules
- Keep controllers thin.
- Controllers should:
  - receive request
  - validate input
  - call service
  - shape response
- No business logic in controllers.

## Service Rules
- Services should contain business logic only.
- Split large services into domain-specific helpers if needed.
- Prefer pure helper functions for reusable calculations.

## Response Rules
- If this route is a legacy-compatible route, keep response shape stable.
- Otherwise prefer a consistent project-wide response wrapper.

## Swagger Rules
- Add Swagger decorators to public APIs.
- Include parameter descriptions and response descriptions for non-trivial routes.

## Error Handling
- Use explicit exceptions.
- Distinguish validation, authorization, not-found, and conflict cases.
- Keep error messages readable and stable.

## Naming
- Prefer descriptive names over abbreviations.
- Use plural feature folders where appropriate.
- Avoid generic names like `utilService`, `commonService`, `helperController`.

## Refactor Guidance
When refactoring:
- preserve behavior first
- then improve naming/structure
- then propose v2 cleanup
