import { MOCK_EGRESS_NEWS } from "../constants/egress-news.mock";
import type { EgressNews } from "../types/egressNews.types";

// MOCK: notícias de egressos ainda não têm entidade/endpoint no backend
// (ver issue #51). Troque o corpo desta função por uma chamada via `api`
// quando existir, mantendo a mesma assinatura.
export async function listEgressNews(): Promise<EgressNews[]> {
  return Promise.resolve(MOCK_EGRESS_NEWS);
}
