import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LOGO } from "@/lib/constants";
import NavMain from "./nav-main";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background">
        <div className="flex items-center">
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
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
