import DashboardBudgetChart from "@/components/dashboard/chart/dashboard-budget-chart";
import DashboardCategoryChart from "@/components/dashboard/chart/dashboard-category-chart";
import DashboardDailySpendingChart from "@/components/dashboard/chart/dashboard-daily-spending-chart";
import DashboardMethodsPayment from "@/components/dashboard/chart/dashboard-methods-payment";
import { DashboardReportWeeklyChart } from "@/components/dashboard/chart/dashboard-report-weekly-chart";
import ContentsContainer from "@/components/shared/contents-container";

export default function DashboardPage() {
  return (
    <ContentsContainer title="대시보드">
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
    </ContentsContainer>
  );
}
