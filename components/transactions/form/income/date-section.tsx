import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IncomeFormSchema } from "@/lib/validations";
import { format } from "date-fns/format";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";
import { DatePicker } from "../../../ui/date-picker";

interface Props {
  form: UseFormReturn<z.infer<typeof IncomeFormSchema>>;
}

export default function DateSection({ form }: Props) {
  const [dateValue, setDateValue] = useState<Date | null>(null);

  useEffect(() => {
    if (dateValue) {
      form.setValue("date", format(dateValue, "yyyy-MM-dd"));
    }
  }, [dateValue, form]);
  return (
    <div className="relative flex items-center w-full mb-3">
      <span className="absolute top-1 text-gray-500">
        <Calendar className="size-6" />
      </span>
      <div className="ml-10">
        <FormField
          control={form.control}
          name={"date"}
          render={({ field }) => (
            <DatePicker
              setDateValue={setDateValue}
              value={new Date(field.value)}
            />
          )}
        />
      </div>
      <span className="ml-2">
        <Clock className="size-6 text-gray-500" />
      </span>
      <div className="ml-2 w-full">
        <FormField
          control={form.control}
          name={"time"}
          render={({ field }) => (
            <Input
              type="text"
              placeholder={`ex) ${format(new Date(), "HH:mm")}`}
              {...field}
            />
          )}
        />
        <FormMessage />
      </div>
    </div>
  );
}
