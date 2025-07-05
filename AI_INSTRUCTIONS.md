# AI Instructions and Guidelines for aws-cross-account-iam

## General Guidelines
- All changes should maintain compatibility with both the CLI and website interfaces.
- Keep the code modular: core logic for policy validation/generation should be shared between CLI and website (move to a shared module if needed).
- Write clear, concise commit messages and update documentation for any user-facing changes.
- Ensure all new features are covered by tests (add test scripts as needed).
- Follow the existing code style and formatting (use `npm run lint` and `npm run format`).
- For website UI, keep the interface simple and user-friendly.
- For CLI, ensure all options are documented in the README and have helpful descriptions.

## Adding Features
- Add new CLI commands or website features only if they align with the project goals (see README).
- Update both CLI and website if a feature is relevant to both.
- Update the README and example usage for any new features.

## AI/Automation
- When using AI to generate code, always review and test the output.
- Prefer explicit, readable code over clever but obscure solutions.
- Document any non-obvious logic or design decisions in code comments or this file.

## Testing
- Add or update tests for all new features and bug fixes.
- Use mock data for IAM policies in tests.

## Documentation
- Keep all documentation up to date with code changes.
- Add code comments for complex logic.

---
This file is intended for both human and AI contributors. Please read before making changes.
