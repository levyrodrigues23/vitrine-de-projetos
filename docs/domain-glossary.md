# Domain glossary

This guide defines the main terms used across the Vitrine de Projetos codebase.

## Project

An institutional initiative registered in the system. Projects are grouped by category, currently including research, extension and innovation.

Common fields:

- `title`
- `category`
- `description`
- `imageUrl`

## Work done

A concrete output associated with a project. A project can have multiple works done, such as systems, reports, prototypes, publications or other deliverables.

In the backend this domain appears as `WorksDone`.

## Teacher

A professor registered in the platform. Teachers can appear in public pages and administrative screens, with fields such as name, area, academic degree and image.

## Gerenciador

An authenticated user responsible for creating and maintaining content in the admin area. The frontend currently represents this role alongside `admin`.

## Admin

A higher-permission user that can access administrative routes and management screens.

## Public site

The public-facing React app used by visitors to explore projects, teachers, production pages, agenda, startups, minicourses and the egress portal.

## Admin app

The authenticated part of the React app used to add and update content. It lives in the same frontend application as the public site.

## Upload

The backend exposes a generic upload endpoint for entities such as projects, works done and teachers. Uploaded files are served as static files by the API.
