"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFindAccountById, useUpdateAccount } from "@/lib/query";
import { useEditAccountDialogStore } from "@/lib/stores";
import { Account, AccountType } from "@/lib/types";
import { AccountFormSchema } from "@/lib/validations";
import z from "zod/v3";
import { AccountForm } from "./account-form";

export default function EditAccountDialog() {
  const { isOpen, onClose, id } = useEditAccountDialogStore();
  console.log("id", id);

  const { data, isLoading } = useFindAccountById(id);
  const account: Account = data || {};

  const { mutate: updateAccount } = useUpdateAccount(id);
  const defaultValues = {
    name: account.name,
    logo: account.logo,
    accountType: account.accountType as AccountType,
    initialBalance: account.currentBalance,
    bankName: account.bankName,
    accountNumber: account.accountNumber,
  };

  function onSubmit(values: z.infer<typeof AccountFormSchema>) {
    updateAccount(values, {
      onSuccess: onClose,
    });
  }

  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>계좌 / 현금지갑 수정</DialogTitle>
          <DialogDescription>
            계좌 또는 현금지갑 정보를 수정하세요.
          </DialogDescription>
        </DialogHeader>
        <AccountForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
