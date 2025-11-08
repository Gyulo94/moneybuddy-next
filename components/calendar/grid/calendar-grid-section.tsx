import { useCalendarTransactionData, useGenerateCalendar } from "@/lib/hooks";
import { useFilterStore, useOpenTransactionDialogStore } from "@/lib/stores";
import { toast } from "sonner";
import TotalAmountItem from "./total-amount-item";

export default function CalendarGridSection() {
  const { showExpense, showIncome } = useFilterStore();
  const { onOpen } = useOpenTransactionDialogStore();
  const { totalsByDate, isLoading, error, currentMonth, currentYear } =
    useCalendarTransactionData();

  // 날짜 클릭 핸들러
  function onDayClick(year: number, month: number, day: number) {
    onOpen(`${year}-${month + 1}-${day}`);
  }

  // 수입 클릭 이벤트 핸들러 (컴포넌트 내부에서 정의)
  function handleIncomeClick(date: string, amount: number) {
    toast.info(`${date} 수입 총 ${amount.toLocaleString()}원`);
  }

  // 지출 클릭 이벤트 핸들러 (컴포넌트 내부에서 정의)
  function handleExpenseClick(date: string, amount: number) {
    toast.info(`${date} 지출 총 ${Math.abs(amount).toLocaleString()}원`);
  }

  const { calendarWeeks, handleDayClick } = useGenerateCalendar({
    year: currentYear,
    month: currentMonth,
    onDayClick,
  });
  return (
    <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
      {(calendarWeeks ?? []).map((week, weekIndex) => (
        <div className="flex w-full" key={`week-${weekIndex}`}>
          {(week ?? []).map(
            ({ year, month, day, isCurrentMonth, isToday, isSunday }) => {
              const dateString = `${year}-${String(month + 1).padStart(
                2,
                "0"
              )}-${String(day).padStart(2, "0")}`;
              const incomeTotal = totalsByDate[dateString]?.income ?? 0;
              const expenseTotal = totalsByDate[dateString]?.expense ?? 0;

              return (
                <div
                  key={`${year}-${month}-${day}`}
                  onClick={() => handleDayClick(year, month, day)}
                  className={`relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer lg:rounded-sm rounded-xs border font-medium transition-all hover:z-20 hover:border-primary/50 sm:-m-px sm:size-20 sm:border-2 lg:size-36 2xl:size-40`}
                >
                  <span
                    className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                      isToday ? "bg-primary font-semibold text-white" : ""
                    } ${
                      !isCurrentMonth
                        ? "text-slate-400 dark:text-slate-800"
                        : isSunday
                        ? "text-red-500 dark:text-red-400"
                        : "text-slate-800 dark:text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>

                  {/* 수입/지출 총합 표시 */}
                  {isCurrentMonth && (incomeTotal > 0 || expenseTotal < 0) && (
                    <div className="absolute bottom-0.5 left-0.5 right-0.5 sm:bottom-1 sm:left-1 sm:right-1 lg:bottom-2 lg:left-2 lg:right-2">
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        {showIncome && incomeTotal > 0 && (
                          <TotalAmountItem
                            amount={incomeTotal}
                            type="INCOME"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncomeClick(dateString, incomeTotal);
                            }}
                          />
                        )}

                        {showExpense && expenseTotal < 0 && (
                          <TotalAmountItem
                            amount={expenseTotal}
                            type="EXPENSE"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpenseClick(dateString, expenseTotal);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      ))}
    </div>
  );
}
