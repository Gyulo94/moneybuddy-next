export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  subCategories?: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
};
