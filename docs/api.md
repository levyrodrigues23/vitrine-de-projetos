# API

The backend is an ASP.NET Core API located at:

```text
backend/VitrineAPI/VitrineAPI
```

Local base URL:

```text
http://localhost:5026/api
```

Docker base URL:

```text
http://localhost:5000/api
```

## Main domains

| Domain | Route family |
| --- | --- |
| Projects | `/api/projects` |
| Works done | `/api/projects/{projectId}/worksdone` and `/api/worksdone/{id}` |
| Teachers | `/api/teachers` |
| Uploads | `/api/upload/{entity}/image` |

For endpoint details, see:

- [../backend/VitrineAPI/VitrineAPI/ENDPOINTS.md](../backend/VitrineAPI/VitrineAPI/ENDPOINTS.md)

## Feature-folder pattern

Backend features are grouped by domain:

```text
Features/
├── Projects/
│   ├── Endpoints/
│   └── Shared/
├── Teachers/
│   ├── Endpoints/
│   └── Shared/
├── Upload/
│   └── Endpoints/
└── WorksDone/
    ├── Endpoints/
    └── Shared/
```

Each feature usually contains:

- endpoint/controller classes;
- request DTOs;
- response DTOs;
- validators;
- handler classes.

## Database

The API uses Entity Framework Core with PostgreSQL. The connection string is read from:

```text
ConnectionStrings:DefaultConnection
```

Apply migrations with:

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet ef database update
```

## Uploads

Uploads are served as static files by the backend. The upload endpoint accepts entity-specific image uploads for supported entities such as projects, works done and teachers.

Keep upload behavior aligned between:

- backend endpoint validation;
- frontend service methods;
- form fields that send image files.
