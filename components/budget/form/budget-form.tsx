import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BudgetFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  defaultValues: z.infer<typeof BudgetFormSchema>;
  onSubmit: (values: z.infer<typeof BudgetFormSchema>) => void;
  onClose: () => void;
}

export default function BudgetForm({ defaultValues, onSubmit, onClose }: Props) {
  const form = useForm<z.infer<typeof BudgetFormSchema>>({
    resolver: zodResolver(BudgetFormSchema),
    defaultValues,
  });
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name={"amount"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="지출 금액을 입력하세요"
                  value={
                    typeof field.value === "number"
                      ? field.value.toLocaleString()
                      : field.value
                      ? String(field.value).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    field.onChange(isNaN(Number(value)) ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Button variant={"ghost"} onClick={onClose}>취소</Button>
          <Button type="submit" variant={"default"}>
            확인
          </Button>
        </div>
      </Form>
    </form>
  );
}
