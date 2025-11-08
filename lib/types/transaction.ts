import { Category, SubCategory, Tag } from ".";

export type TransactionDetail = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  date: string;
  time: string;
  category: Category;
  subCategory?: SubCategory;
  description: string;
  tags: Tag[];
  memo?: string;
};

export type Transaction = {
  date: string;
  details: TransactionDetail[];
};
