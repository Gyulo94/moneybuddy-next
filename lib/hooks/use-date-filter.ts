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
}: {
  year: number | null;
  month: number | null;
}) {
  const now = new Date();
  const yearVal = year ?? now.getFullYear();
  const monthVal = month ?? now.getMonth() + 1;
  const initialDate = startOfMonth(
    new Date(Number(yearVal), Number(monthVal) - 1, 1)
  );
  return format(initialDate, "yyyy-MM-dd");
}
