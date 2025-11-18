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

const goalAmount = 1000000; // 목표 금액 100만원
const spentAmount = 596155; // 지출 금액 596,155원
const utilizationRate = Math.floor((spentAmount / goalAmount) * 100); // 소진율 계산
const barColor = utilizationRate > 100 ? "#dc3545" : "#37cc33";
const chartData = [{ name: "소진율", amount: utilizationRate, fill: barColor }];

const chartConfig = {
  visitors: {
    label: "amount",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardBudgetChart() {
  const endAngle = 90 + (utilizationRate / 100) * -360;
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
                          예산: {goalAmount.toLocaleString()}원
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
