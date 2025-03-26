"use client";
import ExpenseForm from "@/app/(dashboard)/transactions/expense-form";
import IncomeForm from "@/app/(dashboard)/transactions/income-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tag } from "@/lib/type";
import { useState } from "react";

interface AddTransactionsButtonProps {
  children: React.ReactNode;
  tags: Tag[];
}

export default function AddTransactionsButton({
  children,
  tags,
}: AddTransactionsButtonProps) {
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="absolute top-70 h-auto lg:top-100 pt-8 pb-6 px-6 max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">수입·지출 내역 추가</DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-between items-center">
          <h2>수입·지출 내역 추가</h2>
          <div className="flex gap-2 text-gray-500">
            <p
              className={`${
                expense && "text-black dark:text-white font-bold"
              } cursor-pointer`}
              onClick={() => {
                setIncome(false);
                setExpense(true);
              }}
            >
              지출
            </p>
            <p
              className={`${
                income && "text-black dark:text-white font-bold"
              } cursor-pointer`}
              onClick={() => {
                setIncome(true);
                setExpense(false);
              }}
            >
              수입
            </p>
          </div>
        </div>
        {expense && <ExpenseForm tags={tags} />}
        {income && <IncomeForm tags={tags} />}
      </DialogContent>
    </Dialog>
  );
}
