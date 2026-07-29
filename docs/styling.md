# Styling

The frontend uses Tailwind CSS with shared UI and layout components.

## Principles

- Prefer existing components and variants before creating new styles.
- Keep public pages visually consistent with the institutional identity.
- Keep admin pages dense, predictable and task-focused.
- Avoid changing layout and copy in the same PR unless the change is intentionally editorial.

## Component usage

Reusable components live in:

```text
vitrine/src/components
```

Common component groups:

- `layout/` for page structure.
- `ui/` for generic visual primitives.
- `features/` for domain-specific cards and widgets.

## Forms

Use existing form components for:

- labels;
- validation errors;
- select fields;
- text inputs;
- textareas;
- choice grids;
- checkboxes.

## Copy and accessibility

- Keep visible text in Portuguese with correct accents.
- Use descriptive `alt` text for meaningful images.
- Avoid exposing internal enum values directly when a human label is expected.
- Verify mobile wrapping for long titles and button labels.
