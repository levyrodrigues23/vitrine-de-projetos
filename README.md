# vitrine-de-projetos

Monorepo da Vitrine de Projetos da UFC Itapajé. O repositório hospeda o site público do campus, uma área administrativa para gerenciadores e a API HTTP que sustenta os fluxos de projetos, professores, trabalhos produzidos, uploads e páginas institucionais.

## Where to go next

- [Domain glossary](docs/domain-glossary.md) - termos usados no sistema, como Projeto, Trabalho Produzido, Professor e Gerenciador.
- [Architecture](docs/architecture.md) - visão lógica do frontend, backend, banco e fluxos principais.
- [Workflow](docs/workflow.md) - fluxo de branch, commits, PRs, validação e revisão.

## Topic guides

- [API](docs/api.md) - estrutura da API, endpoints principais, banco, migrations e uploads.
- [Web app](docs/web-app.md) - aplicação React pública, rotas, serviços, hooks e dados.
- [Admin app](docs/admin-app.md) - área autenticada, permissões e telas de cadastro.
- [Styling](docs/styling.md) - padrões de interface, Tailwind, componentes e cuidados visuais.
- [Testing and quality](docs/testing-and-quality.md) - comandos disponíveis, estado atual dos testes e validações recomendadas.
- [Environment](docs/environment.md) - variáveis, portas, execução local e Docker.

## Quickstart

```bash
git clone https://github.com/nti-ufc-itapaje/vitrine_de_projetos.git
cd vitrine_de_projetos

cd vitrine
pnpm install
pnpm dev
```

Em outro terminal, inicie a API:

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet restore
dotnet run
```

URLs padrão:

- Frontend: `http://localhost:5173`
- API: `http://localhost:5026/api`
- Frontend via Docker: `http://localhost:3000`
- Backend via Docker: `http://localhost:5000`

See [docs/environment.md](docs/environment.md) for the full local setup, including database and Docker.

## Repository map

```text
.
+-- backend/
|   +-- VitrineAPI/
|       +-- VitrineAPI.slnx
|       +-- VitrineAPI/
|           +-- Database/
|           +-- Features/
|           +-- Migrations/
|           +-- Program.cs
|           +-- VitrineAPI.csproj
+-- docs/
+-- vitrine/
|   +-- src/
|   |   +-- components/
|   |   +-- hooks/
|   |   +-- pages/
|   |   +-- routes/
|   |   +-- services/
|   |   +-- types/
|   +-- package.json
|   +-- vite.config.ts
+-- docker-compose.yml
```

## Stack

- Frontend: React, TypeScript, Vite, React Router, TanStack Query, React Hook Form, Zod, Axios, Tailwind CSS and Storybook.
- Backend: ASP.NET Core, .NET 10, Entity Framework Core, PostgreSQL, FluentValidation and OpenAPI.
- Infra: Docker, Docker Compose and Nginx for the frontend container.

## Project status

The project is under active development. Some dependencies and testing tools are already installed, but not every workflow is fully wired yet. Check [docs/testing-and-quality.md](docs/testing-and-quality.md) before relying on automated validation.

## Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/levyrodrigues23" title="José Levy">
        <img src="https://avatars.githubusercontent.com/u/131412804?v=4" width="100px;" alt="Foto de José Levy no GitHub"/><br>
        <sub><b>José Levy - Frontend</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KauaRoss" title="Kauã Rossi">
        <img src="https://avatars.githubusercontent.com/u/81786058?v=4" width="100px;" alt="Foto de Kauã Rossi no GitHub"/><br>
        <sub><b>Kauã Rossi - Backend</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Pablo Caio">
        <img src="https://avatars.githubusercontent.com/u/175988310?v=4" width="100px;" alt="Foto de Pablo Caio no GitHub"/><br>
        <sub><b>Pablo Caio - Backend</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/suellen-candido" title="Suellen Cândido">
        <img src="https://avatars.githubusercontent.com/u/88504054?v=4" width="100px;" alt="Foto de Suellen Cândido no GitHub"/><br>
        <sub><b>Suellen Cândido - Frontend</b></sub>
      </a>
    </td>
  </tr>
</table>

## License

This repository does not currently declare a formal license. Add a `LICENSE` file before distributing or reusing the project outside the intended institutional context.
