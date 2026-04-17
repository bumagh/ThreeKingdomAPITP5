# add-prisma-model

Goal:
Add a Prisma model and wire it into a NestJS backend safely.

Steps:
1. Ask for model purpose and main fields if missing.
2. Propose:
   - Prisma model
   - indexes
   - unique constraints
   - relations
3. Generate:
   - schema update
   - migration notes
   - service methods
   - DTOs if needed
4. Consider ownership and query hot paths.
5. Avoid unsafe destructive changes unless explicitly approved.
6. If this is a legacy migration model, add old->new mapping notes.

Output format:
1. Schema design notes
2. Prisma schema block
3. Related service/DTO files
4. Migration notes
5. Suggested tests
