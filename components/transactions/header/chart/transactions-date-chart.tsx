"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface Transaction {
  date: string;
  details: {
    type: "EXPENSE" | "INCOME";
    amount: number;
  }[];
}

export function TransactionsDateChart({ data }: { data?: Transaction[] }) {
  const KST_OFFSET = 9 * 60;

  const toKstDate = (d: Date) => {
    const kst = new Date(d.getTime() + KST_OFFSET * 60 * 1000);
    return format(kst, "yyyy-MM-dd");
  };

  const getLast7Days = () => {
    const days: string[] = [];
    const now = new Date();
    const kstNow = new Date(now.getTime() + KST_OFFSET * 60 * 1000);
    const base = new Date(
      Date.UTC(
        kstNow.getUTCFullYear(),
        kstNow.getUTCMonth(),
        kstNow.getUTCDate()
      )
    );
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setUTCDate(base.getUTCDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days.reverse();
  };

  const last7Days = getLast7Days();

  const parseDate = (dateString: string) => {
    const first = dateString.split(" ")[0];
    const parts = first.split("/");
    let year = new Date().getFullYear();
    let month = 1;
    let day = 1;
    if (parts.length >= 2) {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      if (parts.length === 3) year = parseInt(parts[2], 10);
    } else {
      const parsed = new Date(dateString);
      return toKstDate(parsed);
    }
    const utc = new Date(Date.UTC(year, month - 1, day));
    return toKstDate(utc);
  };

  const chartData = useMemo(() => {
    return last7Days.map((date) => {
      const isToday = date === toKstDate(new Date());

      const transactionsForDate = (data || []).find(
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
        day: isToday ? "오늘" : `${new Date(date).getUTCDate()}일`,
        expense: totalExpense,
        income: totalIncome,
      };
    });
  }, [data]);

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
    <ChartContainer config={chartConfig} className="h-[300px]">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDataOverflow={true}
          domain={[0, (dataMax: number) => Math.ceil(dataMax / 10000) * 10000]}
          tickFormatter={(value) =>
            value === 0 ? "0" : `${value / 10000}만원`
          }
          allowDecimals={false}
          padding={{ top: 20, bottom: 20 }}
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
