# Web app

The frontend app lives in:

```text
vitrine/
```

It is a React application built with Vite and TypeScript.

## Public pages

The public site includes pages for:

- home and institutional content;
- projects by category;
- project details;
- teachers;
- entrepreneurship;
- startups;
- editais;
- agenda;
- minicourses;
- technical and scientific production;
- egress portal.

Route-level pages live in:

```text
vitrine/src/pages
```

## Services

API calls are centralized in:

```text
vitrine/src/services
```

The shared Axios instance is defined in:

```text
vitrine/src/services/api.ts
```

By default it reads:

```text
VITE_API_BASE_URL
```

and falls back to:

```text
http://localhost:5026/api
```

## Hooks

Hooks coordinate data fetching and feature state. They live in:

```text
vitrine/src/hooks
```

When adding a new data flow, prefer keeping API calls in services and letting hooks orchestrate loading, error and success states.

## Components

Reusable components are grouped in:

```text
vitrine/src/components
```

Prefer existing UI and layout components before creating new visual patterns.

## SEO and metadata

Each public page sets its own title, description and Open Graph tags with the `useSeo` hook:

```text
vitrine/src/hooks/seo
```

Call it once near the top of a page component with a `title` and, when relevant, a `description`. Authenticated routes (login, admin, gerenciador) and the 404 page pass `noIndex: true`. Static fallbacks for the pre-hydration state live in `vitrine/index.html`.

`robots.txt` and `sitemap.xml` are generated from an explicit list of public routes in:

```text
vitrine/scripts/generate-seo-files.mjs
```

It runs automatically before `pnpm build` and can be run manually with `pnpm generate:seo`. When a public route is added or removed, update the `PUBLIC_ROUTES` list in that script. The site domain comes from `VITE_SITE_URL`; without it, a placeholder domain is used.

## Project search

Project search (used by the Home hero and by the header/mobile menu) shares one Fuse.js-based hook:

```text
vitrine/src/hooks/search
```

New search entry points should reuse `useProjectSearchSuggestions` instead of adding another Fuse.js instance.
