# Vitrine de Projetos - UFC Itapajé

Plataforma para catalogar, divulgar e gerenciar projetos, produções, professores e iniciativas vinculadas ao Campus da UFC em Itapajé.

O repositório reúne uma aplicação web em React e uma API em ASP.NET Core, com suporte a execução local e via Docker.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Principais funcionalidades](#principais-funcionalidades)
- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Getting started](#getting-started)
- [Configuração de ambiente](#configuração-de-ambiente)
- [Executando localmente](#executando-localmente)
- [Executando com Docker](#executando-com-docker)
- [Scripts úteis](#scripts-úteis)
- [API](#api)
- [Qualidade e testes](#qualidade-e-testes)
- [Troubleshooting](#troubleshooting)
- [Fluxo de contribuição](#fluxo-de-contribuição)
- [Colaboradores](#colaboradores)

## Sobre o projeto

A Vitrine de Projetos tem como objetivo compartilhar e divulgar os projetos desenvolvidos no Campus da UFC em Itapajé. A aplicação organiza informações institucionais e acadêmicas em uma interface pública, além de oferecer áreas administrativas para cadastro e manutenção dos conteúdos.

Entre os conteúdos previstos estão:

- Projetos de pesquisa, extensão e inovação.
- Trabalhos produzidos por projeto.
- Professores e áreas de atuação.
- Produção científica e produção técnica.
- Minicursos, editais, startups, agenda e portal de egressos.

## Principais funcionalidades

- Listagem e detalhamento de projetos.
- Cadastro, edição e remoção de projetos pelo gerenciador.
- Cadastro de trabalhos vinculados a projetos.
- Listagem e manutenção de professores.
- Upload de imagens para entidades cadastráveis.
- Páginas públicas para divulgação de iniciativas do campus.
- Interface administrativa protegida por perfil de usuário.

## Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- Storybook
- Vitest

### Backend

- ASP.NET Core
- .NET 10
- Entity Framework Core
- PostgreSQL
- FluentValidation
- OpenAPI

### Infraestrutura

- Docker
- Docker Compose
- Nginx para servir o frontend em container

## Estrutura do repositório

```text
.
├── backend/
│   └── VitrineAPI/
│       ├── VitrineAPI.slnx
│       └── VitrineAPI/
│           ├── Database/
│           ├── Features/
│           ├── Migrations/
│           ├── Program.cs
│           └── VitrineAPI.csproj
├── vitrine/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── store/
│   │   └── types/
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

Para executar o projeto localmente, instale:

- Node.js 22 ou superior.
- pnpm.
- .NET SDK 10.
- PostgreSQL.
- Docker e Docker Compose, caso prefira executar em containers.

## Getting started

Clone o repositório:

```bash
git clone https://github.com/nti-ufc-itapaje/vitrine_de_projetos.git
cd vitrine_de_projetos
```

Instale as dependências do frontend:

```bash
cd vitrine
pnpm install
```

Restaure as dependências do backend:

```bash
cd ../backend/VitrineAPI
dotnet restore
```

Configure as variáveis de ambiente antes de iniciar a aplicação.

## Configuração de ambiente

### Backend

O backend usa a connection string `DefaultConnection`.

Para desenvolvimento local, configure-a em `backend/VitrineAPI/VitrineAPI/appsettings.json`, via User Secrets ou por variável de ambiente:

```bash
ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=vitrine;Username=postgres;Password=postgres"
```

Para Docker Compose na raiz, crie um arquivo `.env` com:

```env
CONNECTION_STRING=Host=host.docker.internal;Port=5432;Database=vitrine;Username=postgres;Password=postgres
```

Ajuste host, porta, usuário e senha conforme o seu PostgreSQL.

### Frontend

O frontend consome a API a partir de `VITE_API_BASE_URL`.

Crie ou atualize `vitrine/.env`:

```env
VITE_API_BASE_URL=http://localhost:5026/api
```

Há também variáveis relacionadas ao Supabase para upload/armazenamento de imagens, quando essa integração estiver em uso:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_BUCKET=
```

Não versione arquivos `.env` com credenciais reais.

## Executando localmente

### Backend

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet run
```

Por padrão, a API fica disponível em:

```text
http://localhost:5026
```

Base da API:

```text
http://localhost:5026/api
```

### Frontend

Em outro terminal:

```bash
cd vitrine
pnpm dev
```

Por padrão, o Vite disponibiliza a aplicação em:

```text
http://localhost:5173
```

## Executando com Docker

Na raiz do repositório, após configurar o arquivo `.env`:

```bash
docker compose up --build
```

Serviços expostos:

| Serviço | URL |
| --- | --- |
| Frontend | `http://localhost:3000` |
| Backend | `http://localhost:5000` |

Para parar os containers:

```bash
docker compose down
```

## Scripts úteis

### Frontend

Execute dentro de `vitrine/`.

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento do Vite. |
| `pnpm build` | Executa typecheck e gera build de produção. |
| `pnpm lint` | Executa o ESLint. |
| `pnpm preview` | Serve localmente o build de produção. |
| `pnpm storybook` | Inicia o Storybook em modo desenvolvimento. |
| `pnpm build-storybook` | Gera build estático do Storybook. |

### Backend

Execute dentro de `backend/VitrineAPI/VitrineAPI/`.

| Comando | Descrição |
| --- | --- |
| `dotnet restore` | Restaura pacotes NuGet. |
| `dotnet build` | Compila a API. |
| `dotnet run` | Inicia a API localmente. |
| `dotnet ef database update` | Aplica migrations no banco configurado. |

## API

A documentação detalhada dos endpoints está em:

- [backend/VitrineAPI/VitrineAPI/ENDPOINTS.md](backend/VitrineAPI/VitrineAPI/ENDPOINTS.md)

Principais grupos de endpoints:

| Recurso | Endpoints |
| --- | --- |
| Projetos | `GET /api/projects`, `POST /api/projects`, `GET /api/projects/{id}`, `PUT /api/projects/{id}`, `DELETE /api/projects/{id}` |
| Trabalhos produzidos | `GET /api/projects/{projectId}/worksdone`, `POST /api/projects/{projectId}/worksdone`, `GET /api/worksdone/{id}` |
| Professores | `GET /api/teachers`, `POST /api/teachers`, `GET /api/teachers/{id}`, `PUT /api/teachers/{id}`, `DELETE /api/teachers/{id}` |
| Uploads | `POST /api/upload/{entity}/image` |

Em ambiente de desenvolvimento, o OpenAPI é mapeado pela aplicação ASP.NET Core.

## Qualidade e testes

### Frontend

O projeto possui dependências de Vitest, Playwright e Storybook, mas o `package.json` atual ainda não expõe um script `test`.

Comandos disponíveis hoje:

```bash
cd vitrine
pnpm lint
pnpm build
pnpm build-storybook
```

### Backend

No estado atual do repositório, não há projeto de testes automatizados versionado para a API. Use ao menos:

```bash
cd backend/VitrineAPI/VitrineAPI
dotnet build
```

## Troubleshooting

### A API não conecta no banco

Verifique se a connection string está configurada e se o PostgreSQL está acessível. Em Docker, confirme se o host usado na variável `CONNECTION_STRING` é alcançável a partir do container.

### O frontend não encontra a API

Confira `VITE_API_BASE_URL` em `vitrine/.env`. Para execução local padrão, use:

```env
VITE_API_BASE_URL=http://localhost:5026/api
```

### Erro de CORS

O backend libera as origens locais do Vite, incluindo `http://localhost:5173` e `http://localhost:5174`. Se usar outra porta, atualize a política de CORS em `backend/VitrineAPI/VitrineAPI/Program.cs`.

### Porta ocupada

Altere a porta do Vite com:

```bash
pnpm dev -- --port 5174
```

Ou ajuste os mapeamentos de porta no `docker-compose.yml`.

## Fluxo de contribuição

1. Atualize sua branch base:

   ```bash
   git fetch origin
   git switch main
   git pull origin main
   ```

2. Crie uma branch para sua alteração:

   ```bash
   git switch -c feat/nome-da-alteracao
   ```

3. Faça commits pequenos e descritivos:

   ```bash
   git commit -m "feat(frontend): adiciona listagem de projetos"
   ```

4. Antes de abrir PR, execute as validações disponíveis:

   ```bash
   cd vitrine
   pnpm lint
   pnpm build
   ```

   ```bash
   cd ../backend/VitrineAPI/VitrineAPI
   dotnet build
   ```

5. Abra um Pull Request descrevendo:

- Contexto da mudança.
- Principais arquivos alterados.
- Como validar.
- Prints ou evidências, quando houver alteração visual.

## Colaboradores

Agradecemos às pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/levyrodrigues23" title="José Levy">
        <img src="https://avatars.githubusercontent.com/u/131412804?v=4" width="100px;" alt="Foto de José Levy no GitHub"/><br>
        <sub>
          <b>José Levy - Frontend</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KauaRoss" title="Kauã Rossi">
        <img src="https://avatars.githubusercontent.com/u/81786058?v=4" width="100px;" alt="Foto de Kauã Rossi no GitHub"/><br>
        <sub>
          <b>Kauã Rossi - Backend</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Pablo Caio">
        <img src="https://avatars.githubusercontent.com/u/175988310?v=4" width="100px;" alt="Foto de Pablo Caio no GitHub"/><br>
        <sub>
          <b>Pablo Caio - Backend</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/suellen-candido" title="Suellen Cândido">
        <img src="https://avatars.githubusercontent.com/u/88504054?v=4" width="100px;" alt="Foto de Suellen Cândido no GitHub"/><br>
        <sub>
          <b>Suellen Cândido - Frontend</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Licença

Este projeto é mantido pelo NTI da UFC Itapajé. Caso uma licença formal seja definida, este README deve ser atualizado com o arquivo e os termos correspondentes.
