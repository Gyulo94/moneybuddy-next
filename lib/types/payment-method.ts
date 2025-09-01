import { Session } from "next-auth";
import { Account, Issuer } from ".";

export type PaymentMethod = {
  id: string;

  account: Account;

  user: Session["user"];

  name: string;

  logo: string;

  methodType: MethodType;

  issuer: Issuer;

  cardNumber: string;

  createdAt: Date;

  updatedAt: Date;
};

export type MethodType = "신용" | "체크" | "현금";
