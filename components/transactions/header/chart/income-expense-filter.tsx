"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilterStore } from "@/lib/stores";
import { Transaction } from "@/lib/types";
import { TransactionsDateChart } from "./transactions-date-chart";
export function IncomeExpenseFilter({ data }: { data?: Transaction[] }) {
  const { showExpense, showIncome, toggleExpense, toggleIncome } =
    useFilterStore();

  const totalAmount = data ?? [];

  const totalExpense = totalAmount
    .flatMap((t) => t.details)
    .filter((detail) => detail.type === "EXPENSE")
    .reduce((sum, detail) => sum + detail.amount, 0);

  const totalIncome = totalAmount
    .flatMap((t) => t.details)
    .filter((detail) => detail.type === "INCOME")
    .reduce((sum, detail) => sum + detail.amount, 0);

  return (
    <Card className="w-full xl:w-[70%]">
      <CardContent className="w-full flex md:justify-end items-center">
        <div className="w-full flex md:flex-col justify-between p-5 md:flex-1 md:mr-5">
          <div className="flex flex-col items-start md:mb-5">
            <p className="text-sm text-gray-500 text-center w-full md:text-left md:ml-7">
              지출
            </p>
            <div className="flex items-center gap-2 text-[#ff616a] text-lg">
              <Checkbox
                checked={showExpense}
                onCheckedChange={toggleExpense}
                className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 dark:data-[state=checked]:bg-red-400 dark:data-[state=checked]:border-red-400"
              />
              <p className="text-right">
                {new Intl.NumberFormat().format(totalExpense)} 원
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-500 text-center w-full md:text-left md:ml-7">
              수입
            </p>
            <div className="flex items-center gap-2 text-[#4a74fb] text-lg">
              <Checkbox
                checked={showIncome}
                onCheckedChange={toggleIncome}
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-400 dark:data-[state=checked]:border-blue-400"
              />
              <p className="w-full text-right">
                {new Intl.NumberFormat().format(totalIncome)} 원
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-2">
          <TransactionsDateChart data={data ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}
