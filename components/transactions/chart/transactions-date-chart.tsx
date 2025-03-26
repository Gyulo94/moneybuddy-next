"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface Transaction {
  date: string;
  details: {
    type: "EXPENSE" | "INCOME";
    amount: number;
  }[];
}

export function TransactionsDateChart({ data }: { data: Transaction[] }) {
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // UTC 기준으로 시간 초기화
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setUTCDate(today.getUTCDate() - i); // UTC 기준으로 날짜 계산
      days.push(date.toISOString().split("T")[0]); // YYYY-MM-DD 형식
    }
    return days.reverse(); // 날짜를 과거 -> 현재 순으로 정렬
  };

  const last7Days = getLast7Days();

  console.log("last7Days:", last7Days); // 디버깅용

  const parseDate = (dateString: string) => {
    const [month, day] = dateString.split(" ")[0].split("/"); // "03/25 (화)" -> ["03", "25"]
    const year = new Date().getFullYear(); // 현재 연도
    const date = new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day))); // UTC 기준으로 날짜 생성
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  const chartData = useMemo(() => {
    return last7Days.map((date) => {
      const isToday =
        new Date(date).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0]; // 오늘 날짜인지 확인 (UTC 기준)

      const transactionsForDate = data.find(
        (transaction) => parseDate(transaction.date) === date
      );

      const totalExpense = transactionsForDate
        ? transactionsForDate.details
            .filter((detail) => detail.type === "EXPENSE")
            .reduce((sum, detail) => sum + detail.amount, 0)
        : 0;

      const totalIncome = transactionsForDate
        ? transactionsForDate.details
            .filter((detail) => detail.type === "INCOME")
            .reduce((sum, detail) => sum + detail.amount, 0)
        : 0;

      return {
        day: isToday
          ? "오늘" // 오늘 날짜는 "오늘"로 표시
          : `${new Date(date).getUTCDate()}일`, // 그 외 날짜는 "DD일"로 표시
        expense: totalExpense,
        income: totalIncome,
      };
    });
  }, [data]);
  // console.log("last7Days:", last7Days); // 디버깅용
  // console.log(
  //   "data:",
  //   data.map((d) => parseDate(d.date))
  // ); // 디버깅용

  const chartConfig = {
    expense: {
      label: "지출",
      color: "#ff616a",
    },
    income: {
      label: "수입",
      color: "#4a74fb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[280px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 10, // 위쪽 여백
          left: 10, // 왼쪽 여백
          right: 10, // 오른쪽 여백
          bottom: 10, // 아래쪽 여백
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 20, right: 20 }} // X축 안쪽 여백 추가
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDataOverflow={true}
          domain={[0, (dataMax: number) => Math.ceil(dataMax / 10000) * 10000]} // Y축 범위를 10,000 단위로 반올림
          tickFormatter={(value) =>
            value === 0 ? "0" : `${value / 10000}만원`
          }
          allowDecimals={false} // 소수점 제거
          padding={{ top: 20, bottom: 20 }} // Y축 안쪽 여백 추가
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="expense"
          type="linear"
          stroke="#ff616a"
          strokeWidth={2}
          dot={{
            fill: "#ff616a",
          }}
          activeDot={{
            r: 6,
          }}
        ></Line>
        <Line
          dataKey="income"
          type="linear"
          stroke="#4a74fb"
          strokeWidth={2}
          dot={{
            fill: "#4a74fb",
          }}
          activeDot={{
            r: 6,
          }}
        ></Line>
      </LineChart>
    </ChartContainer>
  );
}
