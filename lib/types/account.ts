import { Session } from "next-auth";

export type Account = {
  id: string;

  user: Session["user"];

  name: string;

  logo: string;

  accountType: AccountType;

  currentBalance: number;

  initialBalance: number;

  bankName: string;

  accountNumber: string;

  createdAt: Date;

  updatedAt: Date;
};

export type AccountType = "계좌" | "현금";
