import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAccount, findAccountsByUserId } from "../actions";

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
