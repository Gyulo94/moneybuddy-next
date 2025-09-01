"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreatePaymentMethod } from "@/lib/query";
import { useCreatePaymentMethodDialogStore } from "@/lib/stores";
import { MethodType } from "@/lib/types";
import { PaymentMethodFormSchema } from "@/lib/validations";
import z from "zod/v3";
import { PaymentMethodForm } from "./payment-method-form";

export default function CreatePaymentMethodDialog() {
  const { isOpen, onClose } = useCreatePaymentMethodDialogStore();
  const { mutate: createPaymentMethod } = useCreatePaymentMethod();
  const defaultValues = {
    name: "",
    methodType: "신용" as MethodType,
    accountId: "",
    issuerId: "",
    cardNumber: "",
  };

  function onSubmit(values: z.infer<typeof PaymentMethodFormSchema>) {
    createPaymentMethod(values, {
      onSuccess: onClose,
    });
    // console.log("create ", values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>결제수단 추가</DialogTitle>
          <DialogDescription>결제수단 정보를 입력하세요.</DialogDescription>
        </DialogHeader>
        <PaymentMethodForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
