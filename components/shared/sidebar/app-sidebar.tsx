import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { findBudget } from "@/lib/actions";
import { LOGO } from "@/lib/constants";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import MonthlyBudget from "../../budget/monthly-budget";
import NavMain from "./nav-main";

interface Props {
  searchParams?: Promise<{ year?: string; month?: string } | undefined>;
}

export async function AppSidebar({ searchParams }: Props) {
  const params = searchParams ? (await searchParams) ?? {} : {};
  const year = params.year ? Number(params.year) : new Date().getFullYear();
  const month = params.month ? Number(params.month) : new Date().getMonth() + 1;

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["budget", { year, month }],
      queryFn: () => findBudget(year, month),
    }),
  ]);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background border-b">
        <div className="flex items-center p-2.5">
          <Avatar>
            <AvatarImage src={LOGO} alt={LOGO} />
          </Avatar>
          <SidebarGroupLabel>
            <span className="text-xl font-bold dark:text-white">
              MONEY BODDY
            </span>
          </SidebarGroupLabel>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <MonthlyBudget />
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
