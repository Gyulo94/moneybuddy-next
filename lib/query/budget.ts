import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBudget, findBudget } from "../actions";
import { Budget } from "../types";

export function useCreateBudget(year: number, month: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBudget,
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["budget", { year, month }],
      });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindBudget(year: number, month: number) {
  const query = useQuery<Budget>({
    queryKey: ["budget", { year, month }],
    queryFn: () => findBudget(year, month),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}
