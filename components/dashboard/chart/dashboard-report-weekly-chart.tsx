"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateChartData = () => {
  const data = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = date.getDate();
    const expense = Math.floor(Math.random() * 200000) + 50000; // 무작위 지출 금액 생성
    data.push({ day: `${day}일`, expense });
  }

  return data;
};

const chartData = generateChartData();

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardReportWeeklyChart() {
  return (
    <Card>
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
            data={chartData}
            margin={{
              left: -15,
              right: 15,
            }}
            height={300} // 차트 높이 조절
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
              tickFormatter={(value) =>
                `${value === 0 ? "0" : (value / 10000).toLocaleString()}만원`
              }
              interval={"equidistantPreserveStart"}
              domain={[0, "dataMax"]}
              ticks={[0, 100000, 200000, 300000, 400000, 500000]} // 2개씩만 보여주도록 설정
              tick={{ fontSize: 10 }}
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
