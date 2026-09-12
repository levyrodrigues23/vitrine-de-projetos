import { useQuery } from "@tanstack/react-query";
import { listEgressos } from "../../services/egress.service";
import { queryKeys } from "../../services/query-keys";

// Dados ainda mockados em services/egress.service.ts (ver issue #51).
export function useEgressos() {
  const query = useQuery({
    queryKey: queryKeys.egress,
    queryFn: listEgressos,
  });

  return {
    egressos: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
