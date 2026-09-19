import type { ManagerContribution } from "../types/manager.types";

// MOCK: o backend ainda não associa um projeto ao gerenciador que o cadastrou
// (ver issue #13). Mapeia o id de cada MANAGER_USERS (constants/admin-users.ts)
// para os projetos que, nesta demonstração, ele teria adicionado. Quando o
// backend expuser essa relação, isto deixa de ser necessário.
export const MOCK_MANAGER_CONTRIBUTIONS: Record<string, ManagerContribution[]> = {
  "2": [
    { projectId: "mock-1", projectTitle: "Sistema de Gestão Acadêmica" },
    { projectId: "mock-2", projectTitle: "App de Mobilidade Urbana" },
  ],
  "3": [
    { projectId: "mock-3", projectTitle: "Programa de Extensão Comunitária" },
  ],
  "4": [
    { projectId: "mock-4", projectTitle: "Iniciação Científica em IA" },
    { projectId: "mock-5", projectTitle: "Laboratório de Dados Abertos" },
  ],
};
