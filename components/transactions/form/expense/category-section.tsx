import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { useExpenseCategoryStore } from "@/lib/stores";
import { Category } from "@/lib/types";
import { ExpenseFormSchema } from "@/lib/validations";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
}

export default function CategorySection({ form }: Props) {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
  } = useExpenseCategoryStore();

  useEffect(() => {
    form.setValue("categoryId", selectedCategory?.id ?? "");
    form.setValue("subCategoryId", selectedSubCategory?.id ?? "");
  }, [selectedCategory, selectedSubCategory, form.setValue]);

  useEffect(() => {
    if (
      selectedSubCategory &&
      !selectedCategory?.subCategories?.some(
        (sc) => sc.id === selectedSubCategory.id
      )
    ) {
      setSelectedSubCategory(null);
    }
  }, [selectedCategory, selectedSubCategory, setSelectedSubCategory]);

  useEffect(() => {
    if (form.formState?.isSubmitSuccessful) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      form.setValue("categoryId", "");
      form.setValue("subCategoryId", "");
    }
  }, [
    form.formState?.isSubmitSuccessful,
    form,
    setSelectedCategory,
    setSelectedSubCategory,
  ]);

  return (
    <div className="relative w-full mb-3">
      <div
        className="absolute top-1 w-6 h-6 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: selectedCategory?.color ?? "",
        }}
      >
        <span className="text-sm">{selectedCategory?.icon ?? ""}</span>
      </div>
      <div className="ml-10">
        <Select
          value={selectedCategory?.id || ""}
          name="categoryId"
          onValueChange={(value) =>
            setSelectedCategory(
              EXPENSE_CATEGORIES.find((cat) => cat.id === value) ?? null
            )
          }
        >
          <SelectTrigger className="w-full mb-3">
            <SelectValue placeholder="1차 카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {EXPENSE_CATEGORIES.map((category: Category) => (
                <SelectItem
                  key={category.id}
                  value={category.id || ""}
                  className="cursor-pointer"
                >
                  {category.icon!} {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedSubCategory?.id || ""}
          name="subCategoryId"
          onValueChange={(value) => {
            setSelectedSubCategory(
              selectedCategory?.subCategories?.find((sc) => sc.id === value) ??
                null
            );
          }}
          disabled={!selectedCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="2차 카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectedCategory?.subCategories?.map((subCategory) => (
                <SelectItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
