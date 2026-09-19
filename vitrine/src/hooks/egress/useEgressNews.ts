import { useQuery } from "@tanstack/react-query";
import { listEgressNews } from "../../services/egressNews.service";
import { queryKeys } from "../../services/query-keys";

export function useEgressNews() {
  const query = useQuery({
    queryKey: queryKeys.egressNews,
    queryFn: listEgressNews,
  });

  return {
    news: query.data ?? [],
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refresh: query.refetch,
  };
}
