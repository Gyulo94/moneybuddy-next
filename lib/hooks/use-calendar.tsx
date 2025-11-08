import { useMemo } from "react";

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
}

interface GenerateCalendarProps {
  year: number;
  month: number;
  onDayClick?: (year: number, month: number, day: number) => void;
}

export function useGenerateCalendar({
  year,
  month,
  onDayClick,
}: GenerateCalendarProps) {
  const generateCalendar = useMemo(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    const calendarDays: CalendarDay[] = [];

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      calendarDays.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isToday:
          today.getMonth() === prevMonth &&
          today.getDate() === day &&
          today.getFullYear() === prevYear,
        isSunday: date.getDay() === 0,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      calendarDays.push({
        day,
        month,
        year,
        isCurrentMonth: true,
        isToday:
          today.getMonth() === month &&
          today.getDate() === day &&
          today.getFullYear() === year,
        isSunday: date.getDay() === 0,
      });
    }

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const remainingDays = 42 - calendarDays.length;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      calendarDays.push({
        day,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday:
          today.getMonth() === nextMonth &&
          today.getDate() === day &&
          today.getFullYear() === nextYear,
        isSunday: date.getDay() === 0,
      });
    }

    const calendarWeeks: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    return { calendarWeeks, calendarDays };
  }, [year, month]);

  const handleDayClick = (
    yearParam: number,
    monthParam: number,
    dayParam: number
  ) => {
    if (onDayClick) {
      onDayClick(yearParam, monthParam, dayParam);
    }
  };

  return {
    ...generateCalendar,
    handleDayClick,
  };
}

export type { CalendarDay };
