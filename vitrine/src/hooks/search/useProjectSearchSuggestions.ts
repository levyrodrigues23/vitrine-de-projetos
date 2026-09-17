import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Project } from "../../types/project.types";

export interface UseProjectSearchSuggestionsOptions {
  limit?: number;
  debounceMs?: number;
}

export interface ProjectSearchSuggestions {
  /** Sugestões (debounced) para o valor atual de `query`. */
  suggestions: Project[];
  /** Busca imediata, sem debounce — útil para submit/melhor correspondência. */
  search: (value: string, limit?: number) => Project[];
}

/**
 * Busca projetos com Fuse.js a partir de uma query controlada pelo chamador,
 * com debounce. Compartilhada entre a Hero da Home e o menu (mobile/desktop)
 * para evitar duas implementações de busca divergentes.
 */
export function useProjectSearchSuggestions(
  items: Project[],
  query: string,
  { limit = 6, debounceMs = 250 }: UseProjectSearchSuggestionsOptions = {},
): ProjectSearchSuggestions {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description"],
        threshold: 0.4,
      }),
    [items],
  );

  const search = (value: string, searchLimit = limit): Project[] => {
    const trimmed = value.trim();
    if (!trimmed) return [];
    return (fuse.search(trimmed, { limit: searchLimit }) as Fuse.FuseResult<Project>[]).map(
      (result) => result.item,
    );
  };

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => window.clearTimeout(timeoutId);
  }, [query, debounceMs]);

  const suggestions = useMemo(
    () => search(debouncedQuery, limit),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedQuery, fuse, limit],
  );

  return { suggestions, search };
}
