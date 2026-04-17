---
trigger: glob
description: Apply DB and Prisma rules when editing schema, migrations, or backend source files.
globs:
  - prisma/**
  - src/**/*.ts
  - scripts/**/*.ts
---

- Prefer PostgreSQL-safe naming.
- Avoid reserved-word table names when designing schema.
- Use explicit indexes for hot paths.
- Normalize many-to-many relationships.
- Avoid comma-separated IDs in persistent storage.
- Document migration impact when changing schema.
- Prefer additive migrations over destructive changes in compatibility-sensitive projects.
- Keep Prisma models grouped and readable.
