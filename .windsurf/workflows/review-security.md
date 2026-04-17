# review-security

Goal:
Review a module or change set for common backend security and safety issues.

Checklist:
1. DTO validation present?
2. Auth/authz boundary correct?
3. Ownership checks enforced?
4. Increment-field allowlist present?
5. Sort/order allowlist present?
6. Transaction boundaries defined?
7. Raw SQL usage safe?
8. Sensitive errors exposed?
9. Legacy compatibility weakening safety?
10. Missing tests for permission/ownership failure?

Output format:
1. Findings summary
2. Risk list by severity
3. Concrete fixes
4. Optional patch suggestions
