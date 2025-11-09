"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useFindTransactionById,
  useUpdateExpense,
  useUpdateIncome,
} from "@/lib/query";
import { useEditTransactionDialogStore } from "@/lib/stores";
import { ExpenseFormSchema, IncomeFormSchema } from "@/lib/validations";
import {} from "@/lib/validations/transaction";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import z from "zod/v3";
import ExpenseForm from "./expense/expense-form";
import IncomeForm from "./income/income-form";

export default function EditTransactionDialog() {
  const { id, isOpen, onClose } = useEditTransactionDialogStore();
  const { data, isLoading } = useFindTransactionById(id);
  const { mutate: updateExpense } = useUpdateExpense(id);
  const { mutate: updateIncome } = useUpdateIncome(id);

  const ExpenseDefaultValues: z.infer<typeof ExpenseFormSchema> = {
    categoryId: data?.category?.id || "",
    subCategoryId: data?.subCategory?.id || "",
    accountId: data?.account?.id || "",
    paymentMethodId: data?.paymentMethod?.id || "",
    amount: data?.amount || 0,
    tags: data?.tags || [],
    date: data?.date || format(new Date(), "yyyy-MM-dd"),
    time: data?.time || "",
    description: data?.description || "",
    method: data?.method || "",
    type: data?.type,
    memo: data?.memo || "",
  };

  const IncomeDefaultValues: z.infer<typeof IncomeFormSchema> = {
    categoryId: data?.category?.id || "",
    accountId: data?.account?.id || "",
    description: data?.description || "",
    amount: data?.amount || 0,
    date: data?.date || format(new Date(), "yyyy-MM-dd"),
    time: data?.time || "",
    type: data?.type,
    tags: data?.tags || [],
    memo: data?.memo || "",
  };
  function onExpenseSubmit(values: z.infer<typeof ExpenseFormSchema>) {
    console.log(values);
    updateExpense(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  function onIncomeSubmit(values: z.infer<typeof IncomeFormSchema>) {
    console.log(values);
    updateIncome(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute top-70 h-auto lg:top-100 pt-8 pb-6 px-6 max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">수입·지출 내역 수정</DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-between items-center">
          <h2>수입·지출 내역 수정</h2>
          <div className="flex gap-2 text-gray-500">
            <p
              className={`${
                data?.type === "EXPENSE" &&
                "text-black dark:text-white font-bold"
              } cursor-pointer`}
            >
              지출
            </p>
            <p
              className={`${
                data?.type === "INCOME" &&
                "text-black dark:text-white font-bold"
              } cursor-pointer`}
            >
              수입
            </p>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <Loader2 className="mx-auto animate-spin" />
          </div>
        ) : data?.type === "EXPENSE" ? (
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
