"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  ReceiptTextIcon,
} from "lucide-react";
import Link from "next/link";

export default function NavMain() {
  const { setOpenMobile } = useSidebar();
  const NAV_ITEMS = [
    {
      label: "대시보드",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      label: "수입/지출 내역",
      href: `/transactions`,
      icon: ReceiptTextIcon,
    },
    {
      label: "캘린더",
      href: "/calendars",
      icon: CalendarIcon,
    },
    {
      label: "카드/계좌",
      href: "/accounts",
      icon: CreditCardIcon,
    },
    // {
    //   label: "카테고리/태그",
    //   href: "/categories",
    //   icon: TagIcon,
    // },
    // {
    //   label: "설정",
    //   href: "/settings",
    //   icon: SettingsIcon,
    // },
  ];
  return (
    <>
      <SidebarGroup className="mt-5">
        <SidebarMenu className="space-y-3">
          {NAV_ITEMS.map((nav) => (
            <SidebarMenuItem
              key={nav.label}
              className="text-muted-foreground dark:text-secondary-foreground"
            >
              <SidebarMenuButton
                asChild
                tooltip={nav.label}
                className="px-2 py-1.5"
              >
                <Link href={nav.href} onClick={() => setOpenMobile(false)}>
                  <nav.icon className="mr-2 size-4" />
                  {nav.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
