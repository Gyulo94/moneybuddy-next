import { Account, Category, PaymentMethod, SubCategory, Tag } from ".";

export type TransactionDetail = {
  id: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  method: "ACCOUNT" | "CARD";
  memo?: string;
  description?: string;
  transactionAt: Date;
  account?: Account;
  paymentMethod?: PaymentMethod;
  tags?: Tag[];
  time: string;
  date: string;
  category?: Category;
  subCategory?: SubCategory;
};

export type Transaction = {
  date: string;
  details: TransactionDetail[];
};

export type TransactionByDate = {
  date: string;
  totalAmount: number;
  details: TransactionDetail[];
};
