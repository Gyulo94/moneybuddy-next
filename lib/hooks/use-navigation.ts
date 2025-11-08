"use client";

import { useDateFilters } from "@/lib/hooks";
import { addMonths, subMonths } from "date-fns";
import { useState } from "react";

export function useTransactionNavigation(initialDate: Date) {
  const [{}, setFilter] = useDateFilters();
  const [value, setValue] = useState<Date>(initialDate);

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    let nextDate = value;
    if (action === "PREV") {
      nextDate = subMonths(value, 1);
    } else if (action === "NEXT") {
      nextDate = addMonths(value, 1);
    } else if (action === "TODAY") {
      nextDate = new Date();
    }
    setValue(nextDate);
    setFilter({ year: nextDate.getFullYear(), month: nextDate.getMonth() + 1 });
  };

  return { value, handleNavigate };
}

export const useCalendarNavigation = (initialDate: Date) => {
  const [{}, setFilter] = useDateFilters();

  const [displayDate, setDisplayDate] = useState<Date>(initialDate);

  const goToPrevMonth = () => {
    const next = subMonths(displayDate, 1);
    setFilter({ year: next.getFullYear(), month: next.getMonth() + 1 });
    setDisplayDate(next);
  };

  const goToNextMonth = () => {
    const next = addMonths(displayDate, 1);
    setFilter({ year: next.getFullYear(), month: next.getMonth() + 1 });
    setDisplayDate(next);
  };

  return { displayDate, goToPrevMonth, goToNextMonth };
};
