---
trigger: always_on
description: Security rules for ownership checks, input validation, and safe database operations.
---

- Validate all DTO inputs.
- Never trust client-submitted ownership or identity.
- Always verify ownership for character, bag, goods, soldier, and task resources.
- Avoid raw SQL unless necessary; parameterize queries if used.
- Use bcrypt for new password flows.
- If md5 compatibility exists, treat it as temporary migration support only.
- Add field allowlists for all increment-style update APIs.
- Add order/sort allowlists for ranking/list APIs.
- Prefer transactions for multi-step write flows.
- Do not expose sensitive internal error details to clients.
