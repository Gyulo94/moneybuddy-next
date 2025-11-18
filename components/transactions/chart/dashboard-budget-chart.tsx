"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { getCurrentDate, useDateFilters } from "@/lib/hooks";
import { useFindBudget, useFindTransactionsByMonth } from "@/lib/query";
import { TransactionByDate, TransactionDetail } from "@/lib/types";
import { useMemo } from "react";

const chartConfig = {
  amount: {
    label: "금액",
  },
} satisfies ChartConfig;

export default function DashboardBudgetChart() {
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });

  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ?? new Date().getMonth() + 1;
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = useFindBudget(safeYear, safeMonth);
  const {
    data: transactionsByDate,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useFindTransactionsByMonth(currentDate);
  const budgetAmount = budgetData?.amount ?? 0;

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

  if (!budgetData) {
    return (
      <Card className="flex flex-col py-6">
        <CardContent>월 예산이 등록되지 않았습니다.</CardContent>
      </Card>
    );
  }

  const utilizationRate =
    budgetAmount === 0 ? 0 : Math.floor((spentAmount / budgetAmount) * 100);
  const barColor = utilizationRate > 100 ? "#dc3545" : "#37cc33";

  const chartData = [
    { name: "소진율", amount: utilizationRate, fill: barColor },
  ];

  const endAngle = 90 + (Math.min(utilizationRate, 100) / 100) * -360;
  return (
    <Card className="flex flex-col py-6">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>예산 소진율</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[200px] h-[150px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={70}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[75, 65]}
            />
            <RadialBar dataKey="amount" background cornerRadius={0} />
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
                          y={viewBox.cy}
                          className=" text-4xl font-bold"
                          style={{ fill: barColor }}
                        >
                          {utilizationRate}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          예산: {budgetAmount.toLocaleString()}원
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
