import { useFilterStore } from "@/lib/stores";
import { Checkbox } from "../../ui/checkbox";

export default function IncomeExpenseToggle() {
  const { showExpense, showIncome, toggleIncome, toggleExpense } =
    useFilterStore();

  return (
    <div className="mb-4 flex items-center justify-start gap-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="income"
          checked={showIncome}
          onCheckedChange={toggleIncome}
          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-400 dark:data-[state=checked]:border-blue-400"
        />
        <label
          htmlFor="income"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          수입
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="expense"
          checked={showExpense}
          onCheckedChange={toggleExpense}
          className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 dark:data-[state=checked]:bg-red-400 dark:data-[state=checked]:border-red-400"
        />
        <label
          htmlFor="expense"
          className="text-sm font-medium text-red-600 dark:text-red-400 cursor-pointer"
        >
          지출
        </label>
      </div>
    </div>
  );
}
