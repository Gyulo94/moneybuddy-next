import { Session } from "next-auth";
import { Bank } from "./bank";

export type Account = {
  id: string;

  user: Session["user"];

  name: string;

  accountType: AccountType;

  currentBalance: number;

  initialBalance: number;

  bank?: Bank;

  accountNumber: string;

  createdAt: Date;

  updatedAt: Date;
};

export type AccountType = "계좌" | "현금";
