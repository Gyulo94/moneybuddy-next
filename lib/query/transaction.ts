import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod/v3";
import {
  createExpense,
  createIncome,
  findTransactionById,
  findTransactionsByMonth,
  updateExpense,
  updateIncome,
} from "../actions";
import { ExpenseFormSchema, IncomeFormSchema } from "../validations";

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

export function useFindTransactionById(id?: string) {
  const query = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => findTransactionById(id),
    enabled: !!id,
  });
  return query;
}

export function useUpdateExpense(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof ExpenseFormSchema>) =>
      updateExpense(values, id),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", id] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
  return mutation;
}

export function useUpdateIncome(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof IncomeFormSchema>) =>
      updateIncome(values, id),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", id] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
  return mutation;
}
