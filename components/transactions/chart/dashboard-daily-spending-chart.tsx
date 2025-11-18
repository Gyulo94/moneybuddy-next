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
  const currentDate = getCurrentDate({ year, month });

  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ?? new Date().getMonth() + 1;

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

  const spentAmount = useMemo(() => {
    if (!transactionsByDate) return 0;
    let totalExpense = 0;
    transactionsByDate.forEach((transactionByDate: TransactionByDate) => {
      transactionByDate.details.forEach((detail: TransactionDetail) => {
        if (detail.type === "EXPENSE") {
          totalExpense += detail.amount;
        }
      });
    });
    return totalExpense;
  }, [transactionsByDate]);

  const daysInMonth = new Date(safeYear, safeMonth, 0).getDate();
  const today = new Date();

  const daysPassedInMonth = useMemo(() => {
    if (year === today.getFullYear() && month === today.getMonth() + 1) {
      return today.getDate();
    } else if (
      safeYear < today.getFullYear() ||
      (safeYear === today.getFullYear() && safeMonth < today.getMonth() + 1)
    ) {
      return daysInMonth;
    }
    return 1;
  }, [year, month, daysInMonth, today]);

  if (isBudgetLoading || isTransactionsLoading) {
    return (
      <Card className="flex flex-col py-6">
        <CardContent>로딩 중...</CardContent>
      </Card>
    );
  }
  if (isBudgetError || isTransactionsError) {
    return (
      <Card className="flex flex-col py-6">
        <CardContent>데이터 로드 중 에러가 발생했습니다.</CardContent>
      </Card>
    );
  }

  if (budgetAmount === 0 || transactionsByDate === null) {
    return (
      <Card className="flex flex-col py-6">
        <CardContent>
          일일 지출 상태를 확인하려면 월 예산을 설정해주세요.
        </CardContent>
      </Card>
    );
  }

  const goalDailyBudget = Math.floor(budgetAmount / daysInMonth);

  const spentDailyAverage =
    daysPassedInMonth === 0 ? 0 : Math.floor(spentAmount / daysPassedInMonth);

  let utilizationRate = (spentDailyAverage / goalDailyBudget) * 100;

  const chartDisplayRate = Math.min(utilizationRate, 100);

  const status = spentDailyAverage > goalDailyBudget ? "위험" : "양호";
  const barColor = status === "위험" ? "#dc3545" : "#37cc33";

  const chartData = [
    { name: "today", amount: chartDisplayRate, fill: barColor },
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
                          {spentDailyAverage.toLocaleString()}원
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
