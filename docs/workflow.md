# Workflow

This guide describes the expected development flow for changes in this repository.

## Branches

Start from an updated base branch:

```bash
git fetch origin
git switch main
git pull origin main
```

Create a scoped branch:

```bash
git switch -c feat/short-description
```

Recommended prefixes:

- `feat/` for features.
- `fix/` for bug fixes.
- `docs/` for documentation.
- `test/` for tests.
- `refactor/` for internal changes without behavior changes.

## Commits

Prefer small commits with clear scope:

```bash
git commit -m "feat(frontend): adiciona listagem de projetos"
git commit -m "fix(api): valida categoria de projeto"
git commit -m "docs: atualiza guia de ambiente"
```

## Pull requests

A good PR description should include:

- Context: why the change exists.
- Changes: what was changed.
- Scope: what was intentionally not changed.
- Validation: commands run and their result.
- Visual evidence: screenshots or screen recordings for UI changes.

## Validation checklist

Run what applies to your change:

```bash
cd vitrine
pnpm lint
pnpm build
```

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet build
```

If a command fails because of an unrelated issue already present in the base branch, document the failure in the PR instead of hiding it.

## Review conventions

- Keep business logic changes separate from documentation or formatting changes.
- Avoid changing API contracts without updating frontend services and documentation.
- For visual changes, review desktop and mobile states.
- For forms, test valid data, invalid data, loading state and error state.
