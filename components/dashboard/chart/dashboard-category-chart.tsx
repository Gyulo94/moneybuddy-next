"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  { category: "주거/통신", amount: 123456, fill: "var(--chart-1)" },
  { category: "식사", amount: 23456, fill: "var(--chart-2)" },
  { category: "카페/간식", amount: 78900, fill: "var(--chart-3)" },
  { category: "문화/예술", amount: 10000, fill: "var(--chart-4)" },
  { category: "여행/숙박", amount: 320000, fill: "var(--chart-5)" },
  { category: "게임", amount: 96843, fill: "#0dcaf0" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "주거/통신",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "식사",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "카페/간식",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "문화/예술",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "여행/숙박",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function DashboardCategoryChart() {
  const mostVisitors = React.useMemo(() => {
    return chartData.reduce(
      (max, curr) => (curr.amount > max.amount ? curr : max),
      chartData[0]
    );
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>분류별 지출</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row w-full lg:w-[680px] items-center pb-0 px-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square min-h-[420px] lg:w-[60%]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              startAngle={90}
              endAngle={-360}
              innerRadius={145}
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
                          {mostVisitors.category}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground text-xl"
                        >
                          {mostVisitors.amount.toLocaleString()}원
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
              {chartData.map((item) => (
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
