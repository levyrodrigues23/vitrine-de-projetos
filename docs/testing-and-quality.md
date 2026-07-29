# Testing and quality

This guide documents the current validation state of the project.

## Frontend

The frontend has dependencies for Vitest, Playwright and Storybook, but the current `package.json` does not expose a `test` script.

Available commands:

```bash
cd vitrine
pnpm lint
pnpm build
pnpm build-storybook
```

## Backend

The repository does not currently include a dedicated backend test project.

Available validation:

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet build
```

## Before opening a PR

Run the commands that match your change:

- frontend-only changes: `pnpm lint` and `pnpm build`;
- backend-only changes: `dotnet build`;
- documentation-only changes: `git diff --check`;
- visual changes: include screenshots or recordings.

## Known gap

Automated test coverage should be expanded. A future test setup should define:

- a frontend `test` script;
- Vitest setup files;
- React Testing Library for component tests;
- coverage reporting;
- backend unit or integration test projects.
