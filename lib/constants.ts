import {
  Calendar,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  Tag,
} from "lucide-react";

export const SERVER_URL = process.env.SERVER_URL;
export const APP_NAME = process.env.APP_NAME;
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;

export const SIDEBAR = {
  CATEGORY: [
    {
      title: "대시보드",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "수입 / 지출 내역",
      href: "/dashboard/transactions",
      icon: ReceiptText,
    },
    {
      title: "카드 / 계좌",
      href: "/dashboard/cards-accounts",
      icon: CreditCard,
    },
    {
      title: "카테고리 / 태그",
      href: "/dashboard/category-tag",
      icon: Tag,
    },
    {
      title: "달력",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
  ],
  REPORT: {
    title: "보고서",
    icon: ClipboardList,
    items: [
      {
        title: "주간",
        href: "/dashboard/reports/weekly",
      },
      {
        title: "월간",
        href: "/dashboard/reports/monthly",
      },
      {
        title: "연간",
        href: "/dashboard/reports/yearly",
      },
      {
        title: "분류별",
        href: "/dashboard/reports/categories",
      },
    ],
  },
};
