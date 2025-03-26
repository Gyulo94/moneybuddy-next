"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilterStore } from "@/lib/store";
import { Transaction } from "@/lib/type";
import { TransactionsDateChart } from "./transactions-date-chart";
export function IncomeExpenseFilter({ data }: { data: Transaction[] }) {
  const { showExpense, showIncome, toggleExpense, toggleIncome } =
    useFilterStore();

  console.log("data", data);

  // 총 지출 및 수입 계산
  const totalExpense = data
    .flatMap((t) => t.details)
    .filter((detail) => detail.type === "EXPENSE")
    .reduce((sum, detail) => sum + detail.amount, 0);

  const totalIncome = data
    .flatMap((t) => t.details)
    .filter((detail) => detail.type === "INCOME")
    .reduce((sum, detail) => sum + detail.amount, 0);

  return (
    <Card className="w-full xl:w-[70%]">
      <CardContent className="w-full flex justify-end items-center">
        <div className="md:flex-1 mr-5">
          <div className="flex flex-col items-start mb-5">
            <p className="text-sm text-gray-500 ml-7">지출</p>
            <div className="flex items-center gap-2 text-[#ff616a] text-lg">
              <Checkbox
                checked={showExpense}
                onCheckedChange={toggleExpense}
                color="#ff616a"
              />
              <p className="text-right">
                {new Intl.NumberFormat().format(totalExpense)} 원
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-500 ml-7">수입</p>
            <div className="flex items-center gap-2 text-[#4a74fb] text-lg">
              <Checkbox
                checked={showIncome}
                onCheckedChange={toggleIncome}
                color="#4a74fb"
              />
              <p className="w-full text-right">
                {new Intl.NumberFormat().format(totalIncome)} 원
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-2">
          <TransactionsDateChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
