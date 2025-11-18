"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateBudget } from "@/lib/query";
import { useCreateBudgetDialogStore } from "@/lib/stores";
import { BudgetFormSchema } from "@/lib/validations";
import z from "zod/v3";
import BudgetForm from "./budget-form";

export default function CreateBudgetDialog() {
  const { isOpen, onClose } = useCreateBudgetDialogStore();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const { mutate: createBudget } = useCreateBudget(year, month);

  const defaultValues: z.infer<typeof BudgetFormSchema> = {
    amount: 0,
    year,
    month,
  };

  function onSubmit(values: z.infer<typeof BudgetFormSchema>) {
    createBudget(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute top-70 h-auto lg:top-100 pt-8 pb-6 px-6 max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>월 예산 추가 (단위: 원)</DialogTitle>
        </DialogHeader>
        <BudgetForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
