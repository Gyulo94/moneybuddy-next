import MonthlyCalendar from "@/components/calendar/calendar";
import { findTransactionsByMonth } from "@/lib/actions";
import { getCurrentDate } from "@/lib/hooks";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const year = params.year ? Number(params.year) : null;
  const month = params.month ? Number(params.month) : null;

  const currentDate = getCurrentDate({ year, month });
  const queryClient = await getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["transactions", currentDate],
      queryFn: () => findTransactionsByMonth(currentDate),
    }),
  ]);
  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <MonthlyCalendar />
    </HydrationBoundary>
  );
}
