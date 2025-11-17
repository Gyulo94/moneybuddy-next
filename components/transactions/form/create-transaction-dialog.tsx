"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateExpense, useCreateIncome } from "@/lib/query";
import { useOpenTransactionDialogStore } from "@/lib/stores";
import { ExpenseFormSchema, IncomeFormSchema } from "@/lib/validations";
import {} from "@/lib/validations/transaction";
import { format } from "date-fns";
import { useState } from "react";
import z from "zod/v3";
import ExpenseForm from "./expense/expense-form";
import IncomeForm from "./income/income-form";

export default function CreateTransactionDialog() {
  const { date, isOpen, onClose } = useOpenTransactionDialogStore();
  const { mutate: createExpense } = useCreateExpense();
  const { mutate: createIncome } = useCreateIncome();
  const [isIncome, setIsIncome] = useState(false);

  const ExpenseDefaultValues: z.infer<typeof ExpenseFormSchema> = {
    categoryId: "",
    subCategoryId: "",
    accountId: "",
    paymentMethodId: "",
    amount: 0,
    tags: [],
    date: date || format(new Date(), "yyyy-MM-dd"),
    time: "",
    description: "",
    method: "",
    type: "EXPENSE",
    memo: "",
  };

  const IncomeDefaultValues: z.infer<typeof IncomeFormSchema> = {
    categoryId: "",
    accountId: "",
    description: "",
    amount: 0,
    date: date || format(new Date(), "yyyy-MM-dd"),
    time: "",
    type: "INCOME",
    tags: [],
    method: "ACCOUNT",
    memo: "",
  };

  function onExpenseSubmit(values: z.infer<typeof ExpenseFormSchema>) {
    console.log(values);
    createExpense(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  function onIncomeSubmit(values: z.infer<typeof IncomeFormSchema>) {
    console.log(values);
    createIncome(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute top-70 h-auto lg:top-100 pt-8 pb-6 px-6 max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">수입·지출 내역 추가</DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-between items-center">
          <h2>수입·지출 내역 추가</h2>
          <div className="flex gap-2 text-gray-500">
            <p
              className={`${
                !isIncome && "text-black dark:text-white font-bold"
              } cursor-pointer`}
              onClick={() => {
                setIsIncome(false);
              }}
            >
              지출
            </p>
            <p
              className={`${
                isIncome && "text-black dark:text-white font-bold"
              } cursor-pointer`}
              onClick={() => {
                setIsIncome(true);
              }}
            >
              수입
            </p>
          </div>
        </div>
        {!isIncome ? (
          <ExpenseForm
            defaultValues={ExpenseDefaultValues}
            onSubmit={onExpenseSubmit}
          />
        ) : (
          <IncomeForm
            defaultValues={IncomeDefaultValues}
            onSubmit={onIncomeSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
