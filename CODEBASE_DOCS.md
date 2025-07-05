# Codebase Documentation: aws-cross-account-iam

## Overview
This project provides tools to validate and generate AWS cross-account IAM policies via both a CLI and a Next.js web interface.

## Structure
- `cli/` — Node.js CLI tool (`index.js`) for validating and generating policies.
- `website/` — Next.js app for a web UI to the same functionality.
- `README.md` — Main usage, setup, and feature documentation.
- `AI_INSTRUCTIONS.md` — Guidelines for contributors (AI and human).

## CLI (`cli/index.js`)
- Uses `commander` for argument parsing.
- Commands:
  - `validate`: Validates two IAM policies (file path or JSON string).
  - `generate`: Generates policies for cross-account access given a resource and two account IDs.
- Output is currently mocked; real logic should be implemented in place of placeholders.

## Website (`website/pages/index.js`)
- React-based UI with two modes: Validate and Generate.
- Users can input policies or resource/account info and get results (mocked for now).
- Simple, single-page layout for ease of use.

## Adding Core Logic
- Shared logic for validation/generation should be moved to a common module (e.g., `shared/` directory) and imported by both CLI and website.

## Development
- See `README.md` for setup, build, and test instructions.
- Use `npm install` in both `cli` and `website` directories to install dependencies.

## Extending
- Add new CLI commands or website features as needed, following the guidelines in `AI_INSTRUCTIONS.md`.
- Keep documentation and tests up to date.

---
For more details, see the README and inline code comments.
