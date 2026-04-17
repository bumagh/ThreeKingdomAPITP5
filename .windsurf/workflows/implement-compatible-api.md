# implement-compatible-api

Goal:
Implement a legacy-compatible API in NestJS while keeping internal code maintainable.

Steps:
1. Read the provided legacy API definition carefully.
2. Preserve:
   - route path
   - request field names
   - response shape
3. Create DTOs with validation.
4. Keep compatibility mapping in controller or adapter layer.
5. Keep business logic in service layer.
6. Add:
   - transaction boundaries
   - ownership checks
   - allowlists for increment fields
   - allowlists for order/sort fields
7. If a safer v2 design is useful, propose it separately without breaking v1.
8. Add e2e test cases for:
   - happy path
   - invalid input
   - unauthorized/forbidden
   - compatibility response shape

Output format:
1. Compatibility notes
2. File tree
3. Complete files
4. Test cases
5. Risks and assumptions
