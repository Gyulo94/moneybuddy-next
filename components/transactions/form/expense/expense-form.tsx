"use client";

import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";
import { ExpenseFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import CategorySection from "./category-section";
import DateSection from "./date-section";
import DescriptionAmountSection from "./description-amount-section";
import MemoSection from "./memo-section";
import PaymentOptionSection from "./payment-option-section";
import TagSection from "./tag-section";

interface Props {
  defaultValues?: z.infer<typeof ExpenseFormSchema>;
  onSubmit: (valuses: z.infer<typeof ExpenseFormSchema>) => void;
}

export default function ExpenseForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<z.infer<typeof ExpenseFormSchema>>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const getMessages = (
      errors: FieldErrors<z.infer<typeof ExpenseFormSchema>>
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
            errorItem as FieldErrors<z.infer<typeof ExpenseFormSchema>>
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
          <PaymentOptionSection form={form} />
          <DateSection form={form} />
          <TagSection form={form} />
          <MemoSection form={form} />
        </div>
        <SubmitButton>확인</SubmitButton>
      </form>
    </Form>
  );
}
