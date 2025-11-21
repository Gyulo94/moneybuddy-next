"use client";
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
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  totalExpense: {
    label: "총 지출",
  },
} satisfies ChartConfig;

interface DonutChartData {
  category: string;
  amount: number;
  fill: string;
}

export default function DashboardCategoryChart() {
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });
  const { data: transactionsByDate, isLoading } =
    useFindTransactionsByMonth(currentDate);

  const categoryExpenseForDonutChart: DonutChartData[] = useMemo(() => {
    if (!transactionsByDate) return [];

    const totalsAndColors: Record<string, { amount: number; color: string }> =
      {};

    transactionsByDate.forEach((transactionByDate: TransactionByDate) => {
      transactionByDate.details.forEach((detail: TransactionDetail) => {
        if (
          detail.type === "EXPENSE" &&
          detail.category?.name &&
          detail.category?.color
        ) {
          const categoryName = detail.category.name;
          const expenseAmount = detail.amount;
          const categoryColor = detail.category.color;

          if (!totalsAndColors[categoryName]) {
            totalsAndColors[categoryName] = { amount: 0, color: categoryColor };
          }
          totalsAndColors[categoryName].amount += expenseAmount;
        }
      });
    });

    return Object.entries(totalsAndColors).map(([categoryName, data]) => ({
      category: categoryName,
      amount: data.amount,
      fill: data.color,
    }));
  }, [transactionsByDate]);

  const mostExpensiveCategory = useMemo(() => {
    if (
      !categoryExpenseForDonutChart ||
      categoryExpenseForDonutChart.length === 0
    ) {
      return { category: "없음", amount: 0, fill: "gray" };
    }

    return categoryExpenseForDonutChart.reduce(
      (max, curr) => (curr.amount > max.amount ? curr : max),
      categoryExpenseForDonutChart[0]
    );
  }, [categoryExpenseForDonutChart]);

  if (isLoading) {
    return (
      <Card className="flex justify-center items-center h-[516px] py-6">
        <CardContent className="text-muted-foreground font-semibold">
          로딩 중...
        </CardContent>
      </Card>
    );
  }

  if (!transactionsByDate || transactionsByDate.length === 0) {
    return (
      <Card className="flex justify-center items-center h-[516px] py-6">
        <CardContent className="text-muted-foreground font-semibold">
          해당 월의 거래내역이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col py-6">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>분류별 지출</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row w-full lg:w-[680px] items-center pb-0 px-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square min-h-[400px] lg:min-h-[420px] lg:w-[60%]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoryExpenseForDonutChart}
              dataKey="amount"
              nameKey="category"
              startAngle={90}
              endAngle={-360}
              innerRadius={130}
              strokeWidth={5}
            >
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
                          y={(viewBox.cy || 0) - 30}
                          className="fill-muted-foreground text-md"
                        >
                          최대지출 카테고리
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {mostExpensiveCategory.category}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground text-xl"
                        >
                          {mostExpensiveCategory.amount.toLocaleString()}원
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="lg:float-left table px-8 w-full lg:w-[40%] lg:min-h-[400px]">
          <div className="table-cell align-middle">
            <ul>
              {categoryExpenseForDonutChart.map((item) => (
                <li
                  className="text-left text-gray-500 leading-7 text-sm"
                  key={item.category}
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></span>
                  <span className="pl-3 ">{item.category}</span>
                  <span className="float-right">
                    {item.amount.toLocaleString()}원
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
