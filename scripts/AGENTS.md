# Script Rules

## General
- Prefer idempotent scripts where possible
- Print clear logs
- Fail loudly on unsafe states
- Accept env-based configuration

## Migration Scripts
- Add dry-run mode if possible
- Document source/target mapping
- Validate input before write
- Separate transform logic from execution logic

## Safety
- Never assume ownership or existence silently
- Avoid destructive commands without explicit confirmation
