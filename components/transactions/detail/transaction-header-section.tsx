"use client";

import { useDateFilters } from "@/lib/hooks";
import { getCurrentDate } from "@/lib/hooks/use-filter";
import { useFindTransactionsByMonth } from "@/lib/query";
import { IncomeExpenseFilter } from "../header/chart/income-expense-filter";
import MaximunExpenseDay from "../header/maximum-expense-day";

export default function TransactionHeaderSection() {
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });
  const { data } = useFindTransactionsByMonth(currentDate);
  return (
    <div className="w-full mt-5 flex items-center justify-between mb-5">
      <IncomeExpenseFilter data={data} />
      <MaximunExpenseDay data={data} />
    </div>
  );
}
