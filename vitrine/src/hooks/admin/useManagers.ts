import { useQuery } from "@tanstack/react-query";
import { listManagers } from "../../services/managers.service";
import { queryKeys } from "../../services/query-keys";

// Dados ainda mockados em services/managers.service.ts (ver issue #13).
export function useManagers() {
  const query = useQuery({
    queryKey: queryKeys.managers,
    queryFn: listManagers,
  });

  return {
    managers: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
