import { MOCK_PRODUCAO_TECNICA } from "../constants/producao-tecnica.mock";
import type { ProducaoTecnica } from "../types/producaoTecnica.types";

// MOCK: ainda não existe endpoint real para produção técnica (ver issue #50).
// Quando o backend estiver pronto, troque o corpo desta função por uma
// chamada via `api`, mantendo a mesma assinatura para que o hook não
// precise mudar.
export async function listProducaoTecnica(): Promise<ProducaoTecnica[]> {
  return Promise.resolve(MOCK_PRODUCAO_TECNICA);
}
