"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAccount } from "@/lib/query";
import { useCreateAccountDialogStore } from "@/lib/stores";
import { AccountType } from "@/lib/types";
import { AccountFormSchema } from "@/lib/validations";
import z from "zod/v3";
import { AccountForm } from "./account-form";

export default function CreateAccountDialog() {
  const { isOpen, onClose } = useCreateAccountDialogStore();
  const { mutate: createAccount } = useCreateAccount();
  const defaultValues = {
    name: "",
    logo: "",
    accountType: "계좌" as AccountType,
    initialBalance: 0,
    bankName: "",
    accountNumber: "",
  };

  function onSubmit(values: z.infer<typeof AccountFormSchema>) {
    createAccount(values, {
      onSuccess: onClose,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>계좌 / 현금지갑 추가</DialogTitle>
          <DialogDescription>
            계좌 또는 현금지갑 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <AccountForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
