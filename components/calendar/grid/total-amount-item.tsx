import type { MouseEventHandler } from "react";

interface Props {
  amount: number;
  type: "INCOME" | "EXPENSE";
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function TotalAmountItem({ amount, type, onClick }: Props) {
  const isIncome = type === "INCOME";
  const displayAmount = isIncome
    ? `+${amount.toLocaleString()}`
    : `${amount.toLocaleString()}`;

  return (
    <div
      onClick={onClick}
      className={`text-[9px] sm:text-xs lg:text-sm font-medium px-0.5 py-0.5 sm:px-1 sm:py-0.5 rounded cursor-pointer transition-colors truncate flex-1 sm:flex-none text-center sm:text-left ${
        isIncome
          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
      }`}
      title={displayAmount}
    >
      {displayAmount}
    </div>
  );
}
