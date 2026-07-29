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
