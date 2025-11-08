import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExpense,
  createIncome,
  findTransactionsByMonth,
} from "../actions";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useCreateIncome() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createIncome,
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindTransactionsByMonth(currentDate: string) {
  const query = useQuery({
    queryKey: ["transactions", currentDate],
    queryFn: () => findTransactionsByMonth(currentDate),
  });
  return query;
}
