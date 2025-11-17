import { FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INCOME_CATEGORIES } from "@/lib/constants";
import { useIncomeCategoryStore } from "@/lib/stores";
import { Category } from "@/lib/types";
import { IncomeFormSchema } from "@/lib/validations";
import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof IncomeFormSchema>>;
}

export default function CategorySection({ form }: Props) {
  const { selectedCategory, setSelectedCategory } = useIncomeCategoryStore();
  const watchedCategoryId = useWatch({
    control: form.control,
    name: "categoryId",
  }) as string | undefined;

  useEffect(() => {
    const cat =
      INCOME_CATEGORIES.find((c) => c.id === watchedCategoryId) ?? null;
    setSelectedCategory(cat);
  }, [watchedCategoryId, setSelectedCategory]);

  useEffect(() => {
    if (form.formState?.isSubmitSuccessful) {
      setSelectedCategory(null);
      form.setValue("categoryId", "");
    }
  }, [form.formState?.isSubmitSuccessful, form, setSelectedCategory]);
  return (
    <div className="relative w-full mb-3">
      <div
        className="absolute top-1 w-6 h-6 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: selectedCategory?.color,
        }}
      >
        <span className="text-sm">{selectedCategory?.icon}</span>
      </div>
      <div className="ml-10">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <Select
              value={field.value || selectedCategory?.id || ""}
              name="categoryId"
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCategory(
                  INCOME_CATEGORIES.find((cat) => cat.id === value) ?? null
                );
              }}
            >
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {INCOME_CATEGORIES.map((category: Category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id || ""}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
