export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  subCategories?: {
    id: string;
    name: string;
  }[];
};

export type Tag = {
  id: string;
  name: string;
};

export type Transaction = {
  date: string;
  totalAmount: number;
  details: {
    id: number;
    time: string;
    type: "EXPENSE" | "INCOME";
    color: string;
    icon: string;
    category: string;
    subCategory: string;
    description: string;
    amount: number;
    tags: string[];
    memo: string;
  }[];
};
