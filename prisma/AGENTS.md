# Prisma and Database Rules

## Database Priority
- PostgreSQL-first design
- Explicit indexes for hot paths
- Prefer normalized schema over comma-separated fields
- Avoid anti-patterns that weaken consistency

## Prisma Schema Rules
- Use explicit relation fields
- Name relations clearly when there are multiple links
- Prefer enums for stable state fields where appropriate
- Keep schema readable and grouped by domain

## Migration Rules
- Do not drop columns casually
- Document breaking migrations
- Prefer additive migrations when compatibility matters
- If renaming legacy concepts, preserve compatibility in application layer

## Safety
- Avoid raw SQL unless Prisma cannot express the query well
- If raw SQL is used, parameterize it
- Add notes for any data migration risks

## Legacy Migration Guidance
- Support temporary compatibility for md5 login if required
- Replace comma-separated RBAC fields with proper join tables
- Rename problematic legacy table/field names in DB layer, preserve old semantics in API layer
