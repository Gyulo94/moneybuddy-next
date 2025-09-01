import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPaymentMethod, findPaymentMethodsByUserId } from "../actions";

export function useFindPaymentMethodsByUserId() {
  const query = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: findPaymentMethodsByUserId,
    retry: false,
  });
  return query;
}

export function useCreatePaymentMethod() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
