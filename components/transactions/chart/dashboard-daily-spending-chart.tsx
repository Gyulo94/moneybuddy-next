"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const goalAmount = 1000000; // 목표 금액 100만원
const spentAmount = 596155; // 지출 금액 596,155원
const daysSpent = 5; // 지출한 일수
const daysInMonth = 30; // 한 달의 일수 (예시로 30일 사용)
const goalDailyBudget = Math.floor(goalAmount / daysInMonth); // 목표 하루 예산 (소수점 제거)
const spentDailyAverage = Math.floor(spentAmount / daysSpent); // 하루 평균 지출 금액
let utilizationRate = (spentDailyAverage / goalDailyBudget) * 100; // 소진율 계산

// 지출 금액이 목표 금액보다 높으면 100%로 설정
if (utilizationRate > 100) {
  utilizationRate = 100;
}

const endAngle = 180 - (utilizationRate / 100) * 180;
const status = spentDailyAverage > goalDailyBudget ? "위험" : "양호";
const barColor = status === "위험" ? "#dc3545" : "#37cc33";

const chartData = [{ name: "today", amount: utilizationRate, fill: barColor }];
const chartConfig = {
  mobile: {
    label: "desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardDailySpendingChart() {
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
