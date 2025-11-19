"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCurrentDate, useDateFilters } from "@/lib/hooks";
import { useFindBudget, useFindTransactionsByMonth } from "@/lib/query";
import { TransactionByDate, TransactionDetail } from "@/lib/types";
import { useMemo } from "react";

const chartConfig = {
  amount: {
    label: "금액",
  },
} satisfies ChartConfig;
export default function DashboardDailySpendingChart() {
  const [{ year, month }] = useDateFilters();

  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ?? new Date().getMonth() + 1;
  const safeDay = new Date().getDate();

  const currentDate = getCurrentDate({
    year: safeYear,
    month: safeMonth,
    day: safeDay,
  });

  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = useFindBudget(safeYear, safeMonth);
  const budgetAmount = budgetData?.amount ?? 0;

  const {
    data: transactionsByDate,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useFindTransactionsByMonth(currentDate);

  const todaySpentAmount = useMemo(() => {
    if (!transactionsByDate) return 0;

    const targetMMDD = `${safeMonth}/${safeDay}`;

    const todayData = transactionsByDate.find((dayData: TransactionByDate) => {
      return dayData.date.startsWith(targetMMDD);
    });

    if (!todayData) return 0;

    let totalExpense = 0;
    todayData.details.forEach((transaction: TransactionDetail) => {
      if (transaction.type === "EXPENSE") {
        totalExpense += transaction.amount;
      }
    });
    return totalExpense;
  }, [transactionsByDate, safeMonth, safeDay]);

  const daysInMonth = new Date(safeYear, safeMonth, 0).getDate();

  const goalDailyBudget =
    daysInMonth === 0 ? 0 : Math.floor(budgetAmount / daysInMonth);

  const utilizationRate =
    goalDailyBudget === 0 ? 0 : (todaySpentAmount / goalDailyBudget) * 100;

  const chartDisplayRate = Math.min(utilizationRate, 100);

  const status = todaySpentAmount > goalDailyBudget ? "위험" : "양호";
  const barColor = status === "위험" ? "#dc3545" : "#37cc33";

  if (isBudgetLoading || isTransactionsLoading) {
    return (
      <Card className="flex justify-center items-center h-[246px] py-6">
        <CardContent className="text-muted-foreground font-semibold">
          로딩 중...
        </CardContent>
      </Card>
    );
  }
  if (isBudgetError || isTransactionsError) {
    return (
      <Card className="flex justify-center items-center h-[246px] py-6">
        <CardContent className="text-muted-foreground font-semibold">
          데이터 로드 중 에러가 발생했습니다.
        </CardContent>
      </Card>
    );
  }

  if (budgetAmount === 0 || !budgetData) {
    return (
      <Card className="flex justify-center items-center h-[246px] py-6">
        <CardContent className="text-muted-foreground font-semibold">
          일일 지출 상태를 확인하려면 월 예산을 설정해주세요.
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { name: "오늘", amount: chartDisplayRate, fill: barColor },
  ];
  const endAngle = 180 - (chartDisplayRate / 100) * 180;

  return (
    <Card className="flex flex-col py-6">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>현재 하루 지출</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto h-[150px]">
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={130}
            cy={100}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className={` text-2xl font-bold`}
                          style={{ fill: barColor }}
                        >
                          {status}
                        </tspan>
                        <tspan
                          x={(viewBox.cx || 0) - 30}
                          y={(viewBox.cy || 0) + 7}
                          className="font-semibold"
                          style={{ fill: barColor }}
                        >
                          {todaySpentAmount.toLocaleString()}원
                        </tspan>
                        <tspan
                          x={(viewBox.cx || 0) + 15}
                          y={(viewBox.cy || 0) + 7}
                          dx="1em"
                          className="fill-muted-foreground"
                        >
                          / {goalDailyBudget.toLocaleString()}원
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="amount"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={0}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
