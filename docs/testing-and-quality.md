# Testing and quality

This guide documents the current validation state of the project.

## Frontend

The frontend uses Storybook's Vitest addon (`@storybook/addon-vitest`) as its test runner: every `*.stories.ts(x)` file is executed as a test in a real headless Chromium instance via Playwright. There is no separate jsdom/React Testing Library setup — component behavior is tested through stories instead.

`.storybook/preview.ts` wraps every story in a `MemoryRouter` and a `QueryClientProvider` globally, so components using `useNavigate`, `useQuery`, etc. render without extra per-story setup. Only add a local decorator to a story file if it needs something beyond those two.

To add a real assertion (not just "does it render") to a story, give it a `play` function using `storybook/test`:

```ts
import { expect, fn, userEvent, within } from "storybook/test";

export const ClickInteraction: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
```

See `src/components/ui/button/button.stories.ts` for a working example.

Available commands:

```bash
cd vitrine
pnpm test            # runs every story as a test (Storybook + Vitest, headless Chromium)
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

- frontend-only changes: `pnpm test`, `pnpm lint` and `pnpm build`;
- backend-only changes: `dotnet build`;
- documentation-only changes: `git diff --check`;
- visual changes: include screenshots or recordings.

## Known gap

Automated test coverage should be expanded. Still missing:

- story-level interaction tests (`play` functions) for most components — only a couple exist today;
- coverage reporting;
- backend unit or integration test projects.
