import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod/v3";
import {
  createPaymentMethod,
  deletePaymentMethod,
  findPaymentMethodById,
  findPaymentMethodsByUserId,
  updatePaymentMethod,
} from "../actions";
import { PaymentMethodFormSchema } from "../validations";

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

export function useFindPaymentMethodById(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["paymentMethod", { id }],
    queryFn: () => findPaymentMethodById(id),
    retry: false,
  });
  return query;
}

export function useUpdatePaymentMethod(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof PaymentMethodFormSchema>) =>
      updatePaymentMethod(values, id),
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethod", { id }] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id?: string) => deletePaymentMethod(id),
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
