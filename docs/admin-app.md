# Admin app

The admin area is part of the same React application as the public site.

## Roles

Current frontend roles include:

- `admin`
- `gerenciador`

Protected routing is handled by layout/route components in:

```text
vitrine/src/components/layout
vitrine/src/routes
```

## Main admin flows

The admin area includes screens for creating and managing:

- projects;
- works done;
- egresses;
- papers/articles;
- startups;
- technical production;
- teachers.

Most admin pages live in:

```text
vitrine/src/pages/gerenciador
```

## Forms

Forms generally use:

- React Hook Form for form state;
- Zod for validation;
- shared form components for inputs, selects, textareas and choice grids.

When changing forms, validate:

- required fields;
- invalid input;
- loading and submit states;
- success and error messages;
- payload shape sent to services.

## Auth note

Some auth behavior is currently represented on the client side for development/demo flows. Treat auth and role checks carefully before relying on them for production security.
