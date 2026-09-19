import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMinicourse,
  type CreateMinicoursePayload,
} from "../../services/minicourse.service";
import { queryKeys } from "../../services/query-keys";
import type { Minicourse } from "../../types/minicourse.types";

type CreateMinicourseResult =
  | { success: true; data: Minicourse }
  | { success: false; error: string };

export function useCreateMinicourse() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateMinicoursePayload) => createMinicourse(payload),
    onSuccess: async (minicourse) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.minicourses });
      queryClient.setQueryData(
        queryKeys.minicourseDetail(minicourse.id),
        minicourse,
      );
    },
  });

  const execute = async (
    payload: CreateMinicoursePayload,
  ): Promise<CreateMinicourseResult> => {
    try {
      const data = await mutation.mutateAsync(payload);
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar minicurso";
      return { success: false, error: errorMessage };
    }
  };

  return {
    execute,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
}
