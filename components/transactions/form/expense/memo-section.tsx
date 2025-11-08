import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExpenseFormSchema } from "@/lib/validations";
import { File } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
}

export default function MemoSection({ form }: Props) {
  return (
    <div className="relative w-full mb-3">
      <span className="absolute top-1 text-gray-500">
        <File className="size-6" />
      </span>
      <div className="ml-10">
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="mb-3"
                  type="text"
                  placeholder="메모"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
