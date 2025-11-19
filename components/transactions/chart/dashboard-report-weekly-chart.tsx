"use client";
import {
  getDate, // date-fns subDays 임포트
  isSameMonth, // date-fns format 임포트
  subDays,
} from "date-fns";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDateFilters } from "@/lib/hooks";
import { getCurrentDate } from "@/lib/hooks/use-filter";
import { useFindTransactionsByMonth } from "@/lib/query";
import { TransactionByDate, TransactionDetail } from "@/lib/types";

interface WeeklyChartData {
  day: string; // "X일"
  expense: number;
}

const chartConfig = {
  expense: {
    label: "지출",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardReportWeeklyChart() {
  const [{ year, month }] = useDateFilters();
  const currentDateParam = getCurrentDate({ year, month });
  const {
    data: TransactionsByDateData,
    isLoading,
    isError,
  } = useFindTransactionsByMonth(currentDateParam);

  const weeklyExpenseChartData: WeeklyChartData[] = useMemo(() => {
    if (!TransactionsByDateData) return [];

    const selectedMonthFirstDay = new Date(
      year ?? new Date().getFullYear(),
      (month ?? new Date().getMonth() + 1) - 1,
      1
    );
    const endDate = new Date(
      selectedMonthFirstDay.getFullYear(),
      selectedMonthFirstDay.getMonth() + 1,
      0
    );

    const todayInSelectedMonth = new Date(
      year ?? new Date().getFullYear(),
      (month ?? new Date().getMonth() + 1) - 1,
      new Date().getDate()
    );
    if (!isSameMonth(todayInSelectedMonth, selectedMonthFirstDay)) {
      todayInSelectedMonth.setDate(endDate.getDate());
    }

    const weekMap: Record<string, number> = {};
    const dateRange: Date[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(todayInSelectedMonth, i);
      dateRange.push(date);
      weekMap[`${getDate(date)}일`] = 0;
    }

    TransactionsByDateData.forEach((transactionByDate: TransactionByDate) => {
      const dayOfMonth = parseInt(
        transactionByDate.date.split("/")[1]?.split(" ")[0] || "0",
        10
      );
      const dayKey = `${dayOfMonth}일`;
      if (weekMap.hasOwnProperty(dayKey)) {
        let dailyExpense = 0;
        transactionByDate.details.forEach((detail: TransactionDetail) => {
          if (detail.type === "EXPENSE") {
            dailyExpense += detail.amount;
          }
        });
        weekMap[dayKey] = dailyExpense;
      }
    });

    return dateRange.map((date) => {
      const dayKey = `${getDate(date)}일`;
      return {
        day: dayKey,
        expense: weekMap[dayKey] || 0,
      };
    });
  }, [TransactionsByDateData, year, month]);

  if (isLoading)
    return (
      <Card className="py-6">
        <CardContent>로딩 중...</CardContent>
      </Card>
    );
  if (isError)
    return (
      <Card className="py-6">
        <CardContent>데이터를 불러오는 중 에러가 발생했습니다.</CardContent>
      </Card>
    );

  if (!TransactionsByDateData || TransactionsByDateData.length === 0) {
    return (
      <Card className="py-6">
        <CardContent>해당 월의 거래 내역이 없습니다.</CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-6">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>주간 지출 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[150px]"
        >
          <LineChart
            accessibilityLayer
            data={weeklyExpenseChartData}
            margin={{
              left: -15,
              right: 15,
            }}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              interval={"preserveEnd"}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDataOverflow={true}
              domain={[
                0,
                (dataMax: number) => {
                  if (dataMax === 0) return 1;
                  return Math.ceil(dataMax / 10000) * 10000;
                },
              ]}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 10000}만원`
              }
              allowDecimals={false}
              padding={{ top: 20, bottom: 20 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="expense"
              type="linear"
              stroke="#f87171"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
