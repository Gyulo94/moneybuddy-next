import { Transaction, TransactionDetail } from "@/lib/types";
import { Card, CardContent } from "../../ui/card";

export default function MaximunExpenseDay({ data }: { data?: Transaction[] }) {
  const safeData = data ?? [];
  const currentMonth = new Date().getMonth();

  const currentMonthData = safeData.filter((transaction) => {
    const date = new Date(transaction.date);
    return date.getMonth() === currentMonth;
  });

  // 날짜별 지출 금액 집계
  const expenseByDay: { [key: string]: number } = {};
  currentMonthData.forEach((transaction) => {
    const date = transaction.date;
    const totalExpense = transaction.details
      .filter((detail: TransactionDetail) => detail.type === "EXPENSE")
      .reduce(
        (sum: number, detail: TransactionDetail) => sum + detail.amount,
        0
      );

    if (!expenseByDay[date]) {
      expenseByDay[date] = 0;
    }
    expenseByDay[date] += totalExpense;
  });

  // 최대 지출일 계산
  const maxExpenseDay =
    Object.keys(expenseByDay).length > 0
      ? Object.keys(expenseByDay).reduce((maxDay, currentDay) =>
          expenseByDay[currentDay] > expenseByDay[maxDay] ? currentDay : maxDay
        )
      : null;

  // 최대 지출일에서 "일"만 추출
  const maxExpenseDayFormatted = maxExpenseDay
    ? new Date(maxExpenseDay).getDate()
    : 0;

  // 일 평균 지출 계산
  const totalDays = Object.keys(expenseByDay).length;
  const totalExpense = Object.values(expenseByDay).reduce(
    (sum: number, expense: number) => sum + expense,
    0
  );
  const averageExpense =
    totalDays > 0 ? Math.floor(totalExpense / totalDays) : 0;

  return (
    <Card className="hidden lg:block w-[30%] h-full ml-5 min-h-[300px] py-6">
      <CardContent className="w-full h-full flex flex-col justify-center">
        <h3 className="text-md text-gray-500">최대 지출일</h3>
        <p className="text-2xl leading-12 text-[#f14848] mb-5">
          {maxExpenseDayFormatted} 일
        </p>
        <h3 className="text-md text-gray-500">일 평균 지출</h3>
        <p className="text-2xl leading-12 text-[#f14848]">
          {new Intl.NumberFormat().format(averageExpense)} 원
        </p>
      </CardContent>
    </Card>
  );
}
