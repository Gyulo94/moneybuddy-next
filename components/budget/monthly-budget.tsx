"use client";
import { Button } from "@/components/ui/button";
import { useDateFilters } from "@/lib/hooks";
import { useFindBudget } from "@/lib/query";
import { useCreateBudgetDialogStore } from "@/lib/stores";

export default function MonthlyBudget() {
  const { onOpen } = useCreateBudgetDialogStore();
  const [{ year, month }] = useDateFilters();
  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ?? new Date().getMonth() + 1;
  const { data, isLoading } = useFindBudget(safeYear, safeMonth);

  const formatAmount = (value: number) => {
    if (value >= 10000) {
      const tenThousandWon = value / 10000;
      return `${parseFloat(tenThousandWon.toFixed(2))} 만원`;
    }
    return `${value.toLocaleString()} 원`;
  };
  return (
    <div className="border-b p-4">
      <div className="flex justify-between items-center text-muted-foreground">
        {data ? (
          <p>
            월 예산:{" "}
            <span className="ml-3 font-semibold">
              {formatAmount(data.amount)}
            </span>
          </p>
        ) : isLoading ? (
          <p>월 예산을 가져오는 중입니다.</p>
        ) : (
          <p>월 예산을 등록해주세요.</p>
        )}
        <Button variant={"ghost"} size={"icon"} onClick={onOpen}>
          ✏️
        </Button>
      </div>
    </div>
  );
}
