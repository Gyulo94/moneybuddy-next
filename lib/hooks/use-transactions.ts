"use client";

import { useCheckedItemsStore, useFilterStore } from "@/lib/stores";
import { Transaction, TransactionDetail } from "@/lib/types";
import { format, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useFindTransactionsByMonth } from "../query";
import { useDateFilters } from "./use-date-filter";

export function useFilteredTransactions(rawData: Transaction[] | undefined) {
  const { showExpense, showIncome } = useFilterStore();
  const [expandedDates, setExpandedDates] = useState<string[]>([]);

  const transactions: Transaction[] = (rawData ?? [])
    .map((transaction: Transaction) => ({
      ...transaction,
      details: transaction.details.filter((detail: TransactionDetail) => {
        if (detail.type === "EXPENSE" && !showExpense) return false;
        if (detail.type === "INCOME" && !showIncome) return false;
        return true;
      }),
    }))
    .filter((transaction: Transaction) => transaction.details.length > 0);

  useEffect(() => {
    setExpandedDates(
      (rawData ?? []).map((transaction: Transaction) => transaction.date)
    );
  }, [rawData]);

  const toggleDetails = (date: string) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return { transactions, expandedDates, toggleDetails };
}

export function useTransitionItemCheckbox() {
  const { checkedItems, setCheckedItems } = useCheckedItemsStore();

  const handleDateCheckboxChange = (details: TransactionDetail[]) => {
    const checkedRecord = checkedItems as Record<string, boolean>;
    const allChecked = details.every(
      (detail: TransactionDetail) => !!checkedRecord[detail.id]
    );
    const updatedCheckedItems: Record<string, boolean> = {
      ...(checkedRecord || {}),
    };

    details.forEach((detail: TransactionDetail) => {
      updatedCheckedItems[detail.id] = !allChecked;
    });

    setCheckedItems(updatedCheckedItems);
  };

  return { handleDateCheckboxChange };
}

export function useCalendarTransactionData() {
  const { showExpense, showIncome } = useFilterStore();
  const [{ year, month }] = useDateFilters();

  const safeYear = year ?? new Date().getFullYear();
  const safeMonth = month ? month - 1 : new Date().getMonth();

  const dateForQuery = useMemo(() => {
    return format(startOfMonth(new Date(safeYear, safeMonth, 1)), "yyyy-MM-dd");
  }, [safeYear, safeMonth]);

  const { data, isLoading, error } = useFindTransactionsByMonth(dateForQuery);

  const transactions: TransactionDetail[] = useMemo(() => {
    return (data ?? [])
      .flatMap((t: Transaction) => t.details)
      .filter((detail: TransactionDetail) => {
        if (detail.type === "EXPENSE" && !showExpense) return false;
        if (detail.type === "INCOME" && !showIncome) return false;
        return true;
      });
  }, [data, showExpense, showIncome]);

  // 날짜별 수입/지출 합계 계산
  const totalsByDate: Record<string, { income: number; expense: number }> =
    useMemo(() => {
      return transactions.reduce((acc, detail) => {
        const dateKey = detail.date;
        if (!acc[dateKey]) acc[dateKey] = { income: 0, expense: 0 };
        const amt = Number(detail.amount) || 0;
        if (detail.type === "INCOME") {
          acc[dateKey].income += Math.abs(amt);
        } else if (detail.type === "EXPENSE") {
          acc[dateKey].expense += -Math.abs(amt);
        }
        return acc;
      }, {} as Record<string, { income: number; expense: number }>);
    }, [transactions]);

  return {
    totalsByDate,
    isLoading,
    error,
    currentYear: safeYear,
    currentMonth: safeMonth,
  };
}
