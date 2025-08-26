import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod/v3";
import {
  createAccount,
  findAccountById,
  findAccountsByUserId,
  updateAccount,
} from "../actions";
import { AccountFormSchema } from "../validations";

export function useFindAccountsByUserId() {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: findAccountsByUserId,
    retry: false,
  });
  return query;
}

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindAccountById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: () => findAccountById(id),
    retry: false,
  });
  return query;
}

export function useUpdateAccount(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof AccountFormSchema>) =>
      updateAccount(values, id),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
