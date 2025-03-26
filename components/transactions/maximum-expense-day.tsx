import { Transaction } from "@/lib/type";
import { Card, CardContent } from "../ui/card";

export default function MaximunExpenseDay({ data }: { data: Transaction[] }) {
  // 현재 월을 동적으로 가져오기
  const currentMonth = new Date().getMonth();

  // 현재 월의 데이터를 필터링
  const currentMonthData = data.filter((transaction) => {
    const date = new Date(transaction.date);
    return date.getMonth() === currentMonth; // 현재 월과 일치하는 데이터만 필터링
  });

  // 날짜별 지출 금액 집계
  const expenseByDay: { [key: string]: number } = {};
  currentMonthData.forEach((transaction) => {
    const date = transaction.date;
    const totalExpense = transaction.details
      .filter((detail) => detail.type === "EXPENSE")
      .reduce((sum, detail) => sum + detail.amount, 0);

    if (!expenseByDay[date]) {
      expenseByDay[date] = 0;
    }
    expenseByDay[date] += totalExpense;
  });

  // 최대 지출일 계산
  const maxExpenseDay = Object.keys(expenseByDay).reduce((maxDay, currentDay) =>
    expenseByDay[currentDay] > expenseByDay[maxDay] ? currentDay : maxDay
  );

  // 최대 지출일에서 "일"만 추출
  const maxExpenseDayFormatted = new Date(maxExpenseDay).getDate();

  // 일 평균 지출 계산
  const totalDays = Object.keys(expenseByDay).length;
  const totalExpense = Object.values(expenseByDay).reduce(
    (sum, expense) => sum + expense,
    0
  );
  const averageExpense =
    totalDays > 0 ? Math.floor(totalExpense / totalDays) : 0;

  return (
    <Card className="hidden lg:block w-[30%] h-full ml-5">
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
