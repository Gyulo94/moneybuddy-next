import { format, startOfMonth } from "date-fns";
import { parseAsInteger, useQueryStates } from "nuqs";

export function useDateFilters() {
  return useQueryStates({
    year: parseAsInteger,
    month: parseAsInteger,
  });
}

export function getCurrentDate({
  year,
  month,
  day,
}: {
  year: number | null;
  month: number | null;
  day?: number | null;
}) {
  const now = new Date();
  const yearVal = year ?? now.getFullYear();
  const monthVal = month ?? now.getMonth() + 1;
  const dayVal = day ?? now.getDate();
  const initialDate = startOfMonth(
    new Date(Number(yearVal), Number(monthVal) - 1, Number(dayVal))
  );

  return format(initialDate, "yyyy-MM-dd");
}
