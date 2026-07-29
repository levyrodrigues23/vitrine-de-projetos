# Environment

This guide covers local setup, environment variables and Docker.

## Requirements

- Node.js 22 or newer.
- pnpm.
- .NET SDK 10.
- PostgreSQL.
- Docker and Docker Compose, if running containers.

## Frontend variables

Create or update:

```text
vitrine/.env
```

Recommended local value:

```env
VITE_API_BASE_URL=http://localhost:5026/api
```

Optional Supabase-related variables may also be present when image storage integration is used:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_BUCKET=
```

Do not commit real secrets.

## Backend variables

The backend reads:

```text
ConnectionStrings:DefaultConnection
```

Example local connection string:

```bash
ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=vitrine;Username=postgres;Password=postgres"
```

For root Docker Compose, create:

```text
.env
```

with:

```env
CONNECTION_STRING=Host=host.docker.internal;Port=5432;Database=vitrine;Username=postgres;Password=postgres
```

Adjust the host and credentials to your environment.

## Local run

Start the API:

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet run
```

Start the frontend:

```bash
cd vitrine
pnpm dev
```

## Docker run

From the repository root:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

## Ports

| Service | Local | Docker |
| --- | --- | --- |
| Frontend | `http://localhost:5173` | `http://localhost:3000` |
| Backend | `http://localhost:5026` | `http://localhost:5000` |

## CORS

The backend currently allows local Vite origins such as:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5174`

If the frontend runs on another port, update the CORS policy in:

```text
backend/VitrineAPI/VitrineAPI/Program.cs
```
