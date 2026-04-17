# Project Operating Rules

## Project Context
This repository is a backend project for a turn-based strategy game.
Primary stack:
- TypeScript
- NestJS
- Prisma
- PostgreSQL
- Redis
- WebSocket Gateway (Socket.IO)

The project may contain legacy compatibility routes that must remain usable.

## Global Priorities
1. Backward compatibility first
2. Runnable code over pseudo code
3. Small, modular, testable changes
4. Clear service boundaries
5. Security defaults on
6. Prefer maintainability over cleverness

## Output Rules
- When asked for code, return complete files whenever possible.
- Do not omit imports.
- Do not use placeholders like "existing code here".
- If changing architecture, explain impact first.
- Prefer markdown code blocks.
- Prefer minimal diffs if the user asks for patch-style updates.

## Backend Conventions
- Controllers handle transport only.
- Services handle business logic.
- Prisma/database access stays in service or repository layer.
- DTO validation is required for all external inputs.
- Write operations should define explicit transaction boundaries.
- Increment-style updates must use field allowlists.
- Sort/order fields must use allowlists.
- Do not place core business logic inside controllers.

## Compatibility Rules
- Preserve legacy response shape when requested:
  - `{ code, msg, data }`
- Preserve legacy route paths if the task is a migration/compatibility task.
- Keep old parameter names in compatibility controllers where needed.
- If a safer v2 design is proposed, keep v1 compatibility unless explicitly told to break it.

## Game Backend Rules
- Server authoritative design only.
- Client submits intent, never final state.
- Room/battle state should be serializable.
- Prefer pure functions for battle-related calculations.
- Keep real-time gateway code separated from HTTP business modules.

## Security Rules
- Never trust client-submitted ownership.
- Always validate resource ownership for characters, bags, goods, soldiers, and tasks.
- Avoid unsafe raw SQL unless absolutely necessary.
- Use bcrypt for password storage in new code.
- If legacy md5 compatibility is required, implement compatibility only as a migration bridge.

## Documentation Rules
- For new modules, include:
  - DTOs
  - Swagger decorators
  - error handling
  - test notes
- If assumptions are required, list them clearly.