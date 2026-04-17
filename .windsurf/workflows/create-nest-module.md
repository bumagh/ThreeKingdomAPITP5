# create-nest-module

Goal:
Create a clean NestJS feature module with controller, service, dto, and test skeleton.

Steps:
1. Ask for the module name if missing.
2. Show the target file tree first.
3. Generate:
   - module file
   - controller file
   - service file
   - dto folder and basic DTOs
4. Add Swagger decorators for public endpoints.
5. Keep controllers thin.
6. Use DTO validation.
7. If the module is user-owned data, include ownership-check notes.
8. Add a minimal unit test or e2e skeleton.
9. Return complete files, not snippets.

Output format:
1. File tree
2. Complete files
3. Usage notes
4. Next suggested step
