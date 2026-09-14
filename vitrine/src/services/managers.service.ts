import { MANAGER_USERS } from "../constants/admin-users";
import { MOCK_MANAGER_CONTRIBUTIONS } from "../constants/manager-activity.mock";
import type { ManagerWithActivity } from "../types/manager.types";

// MOCK: ainda não existe endpoint real de usuários/gerenciadores no backend
// (ver issue #13). Quando o backend estiver pronto, troque o corpo desta
// função por uma chamada via `api`, mantendo a mesma assinatura para que o
// hook em hooks/admin não precise mudar.
export async function listManagers(): Promise<ManagerWithActivity[]> {
  const managers: ManagerWithActivity[] = MANAGER_USERS.map((manager) => ({
    ...manager,
    contributions: MOCK_MANAGER_CONTRIBUTIONS[manager.id] ?? [],
  }));

  return Promise.resolve(managers);
}
