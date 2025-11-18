import DashboardBudgetChart from "@/components/transactions/chart/dashboard-budget-chart";
import DashboardCategoryChart from "@/components/transactions/chart/dashboard-category-chart";
import DashboardDailySpendingChart from "@/components/transactions/chart/dashboard-daily-spending-chart";
import DashboardMethodsPayment from "@/components/transactions/chart/dashboard-methods-payment";
import DashboardReportWeeklyChart from "@/components/transactions/chart/dashboard-report-weekly-chart";
import { findBudget, findTransactionsByMonth } from "@/lib/actions";
import { getCurrentDate } from "@/lib/hooks";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  searchParams: Promise<{ year?: string; month?: string }>;
}

export default async function Dashboard({ searchParams }: Props) {
  const params = await searchParams;
  const year = params.year ? Number(params.year) : new Date().getFullYear();
  const month = params.month ? Number(params.month) : new Date().getMonth() + 1;

  const currentDate = getCurrentDate({ year, month });
  const queryClient = await getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["transactions", currentDate],
      queryFn: () => findTransactionsByMonth(currentDate),
    }),
    queryClient.prefetchQuery({
      queryKey: ["budget", { year, month }],
      queryFn: () => findBudget(year, month),
    }),
  ]);
  const state = dehydrate(queryClient);

  return (
    <div className="w-full min-h-[calc(100vh-103px)] flex items-center justify-center mt-3 lg:mt-0">
      <div className="size-full">
        <HydrationBoundary state={state}>
          <div className="flex flex-wrap gap-5 w-full">
            <div className="w-full lg:flex-3">
              <DashboardCategoryChart />
            </div>
            <div className="w-full lg:flex-2">
              <DashboardMethodsPayment />
            </div>
          </div>
          <div className="flex flex-wrap gap-5 w-full mt-5">
            <div className="w-full lg:flex-1">
              <DashboardBudgetChart />
            </div>
            <div className="w-full lg:flex-1">
              <DashboardDailySpendingChart />
            </div>
            <div className="w-full lg:flex-1">
              <DashboardReportWeeklyChart />
            </div>
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
}
