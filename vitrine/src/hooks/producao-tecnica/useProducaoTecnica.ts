import { useQuery } from "@tanstack/react-query";
import { listProducaoTecnica } from "../../services/producaoTecnica.service";
import { queryKeys } from "../../services/query-keys";

export function useProducaoTecnica() {
  const query = useQuery({
    queryKey: queryKeys.producaoTecnica,
    queryFn: listProducaoTecnica,
  });

  return {
    items: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
