"use client";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";
import { IncomeFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import AccountSection from "./account-section";
import CategorySection from "./category-section";
import DateSection from "./date-section";
import DescriptionAmountSection from "./description-amount-section";
import MemoSection from "./memo-section";
import TagSection from "./tag-section";

interface Props {
  defaultValues?: z.infer<typeof IncomeFormSchema>;
  onSubmit: (data: z.infer<typeof IncomeFormSchema>) => void;
}

export default function IncomeForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<z.infer<typeof IncomeFormSchema>>({
    resolver: zodResolver(IncomeFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) form.reset(defaultValues);
  }, [defaultValues, form]);

  useEffect(() => {
    const getMessages = (
      errors: FieldErrors<z.infer<typeof IncomeFormSchema>>
    ): string[] => {
      return Object.values(errors || {})
        .flatMap((errorItem) => {
          if (typeof errorItem === "string") {
            return [errorItem];
          }
          if (
            errorItem &&
            typeof errorItem === "object" &&
            "message" in errorItem &&
            typeof errorItem.message === "string"
          ) {
            return [errorItem.message];
          }
          return getMessages(
            errorItem as FieldErrors<z.infer<typeof IncomeFormSchema>>
          );
        })
        .filter(Boolean);
    };

    const messages = getMessages(form.formState.errors);
    messages.forEach((m) => toast.error(m));
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col justify-center items-end">
          <CategorySection form={form} />
          <DescriptionAmountSection form={form} />
          <AccountSection form={form} />
          <DateSection form={form} />
          <TagSection form={form} />
          <MemoSection form={form} />
        </div>
        <SubmitButton>확인</SubmitButton>
      </form>
    </Form>
  );
}
