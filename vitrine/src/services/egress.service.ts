import { MOCK_EGRESSOS } from "../constants/egressos.mock";
import type { Egresso } from "../types/egress.types";

// MOCK: ainda não existe endpoint real para egressos (ver issue #51).
// Quando o backend estiver pronto, troque o corpo destas funções por
// chamadas via `api`, mantendo as mesmas assinaturas para que o hook em
// hooks/egress não precise mudar.

export async function listEgressos(): Promise<Egresso[]> {
  return Promise.resolve(MOCK_EGRESSOS);
}

export async function getEgressoById(id: string): Promise<Egresso | null> {
  return Promise.resolve(MOCK_EGRESSOS.find((egresso) => egresso.id === id) ?? null);
}
