"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFindPaymentMethodById, useUpdatePaymentMethod } from "@/lib/query";
import { useEditPaymentMethodDialogStore } from "@/lib/stores";
import { MethodType, PaymentMethod } from "@/lib/types";
import { PaymentMethodFormSchema } from "@/lib/validations";
import z from "zod/v3";
import { PaymentMethodForm } from "./payment-method-form";

export default function EditPaymentMethodDialog() {
  const { isOpen, onClose, id } = useEditPaymentMethodDialogStore();
  const { data, isLoading } = useFindPaymentMethodById(id);
  const paymentMethod: PaymentMethod = data || {};
  const { mutate: updatePaymentMethod } = useUpdatePaymentMethod(id);

  const defaultValues = {
    name: paymentMethod.name,
    methodType: paymentMethod.methodType as MethodType,
    accountId: paymentMethod.account?.id,
    issuerId: paymentMethod.issuer?.id,
    cardNumber: paymentMethod.cardNumber,
  };

  function onSubmit(values: z.infer<typeof PaymentMethodFormSchema>) {
    updatePaymentMethod(values, {
      onSuccess: onClose,
    });
  }

  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>결제수단 수정</DialogTitle>
          <DialogDescription>결제수단 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <PaymentMethodForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
