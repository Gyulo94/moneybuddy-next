import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExpenseFormSchema } from "@/lib/validations";
import { CircleDollarSignIcon, StoreIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
}

export default function DescriptionAmountSection({ form }: Props) {
  return (
    <div className="relative w-full mb-3">
      <span className="absolute top-1 text-gray-500">
        <StoreIcon className="size-6" />
      </span>
      <span className="absolute top-13 text-gray-500">
        <CircleDollarSignIcon className="size-6" />
      </span>
      <div className="ml-10">
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <Input
              className="mb-3"
              type="text"
              placeholder="지출 내역을 입력하세요"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name={"amount"}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="지출 금액을 입력하세요"
              value={
                typeof field.value === "number"
                  ? field.value.toLocaleString()
                  : field.value
                  ? String(field.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                field.onChange(isNaN(Number(value)) ? 0 : Number(value));
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
