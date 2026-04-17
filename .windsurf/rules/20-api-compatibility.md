---
trigger: manual
description: Use this when implementing or refactoring legacy-compatible APIs.
---

- Preserve original route paths unless explicitly told otherwise.
- Preserve request field names if old clients rely on them.
- Preserve response shape and key names.
- If the old API is unsafe, keep compatibility at transport layer but fix validation and ownership checks internally.
- Prefer a compatibility controller/adaptor layer rather than mixing legacy quirks into domain services.
- If proposing a new v2 route, do not remove v1 compatibility without explicit approval.
- When returning paginated data for legacy APIs, preserve limit/page semantics.

> 用法：在 Cascade 里输入 `@20-api-compatibility`。
