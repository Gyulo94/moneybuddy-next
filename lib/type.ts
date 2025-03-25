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
