---
trigger: always_on
description: Project architecture rules for NestJS + Prisma + PostgreSQL + Redis game backend.
---

- Use NestJS module boundaries clearly.
- Keep controllers thin and transport-focused.
- Keep services business-focused.
- Keep Prisma access in service/repository layer.
- Use DTO validation for all external inputs.
- Write operations must define explicit transaction boundaries.
- Increment updates must use field allowlists.
- Order/sort inputs must use allowlists.
- Preserve legacy route compatibility if the task is migration-related.
- Preserve legacy response shape `{ code, msg, data }` where compatibility is required.
- Separate HTTP APIs from WebSocket gateway logic.
- Prefer server-authoritative state management for game-related flows.
