import z from "zod/v3";

export const TagSchema = z.object({
  name: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
});

export const ExpenseFormSchema = z.object({
  categoryId: z.string().min(1, "카테고리를 선택하세요.").trim(),
  subCategoryId: z.string().optional(),
  accountId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  amount: z.number().min(0, "금액을 입력하세요."),
  tags: z.array(TagSchema).min(1, "태그를 선택하세요."),
  date: z.string().min(1, "유효한 날짜를 입력하세요."),
  time: z.string().min(1, "시간을 입력하세요."),
  description: z.string().min(1, "지출 내역을 입력하세요."),
  method: z.string().min(1, "결제 수단을 선택하세요."),
  type: z.string().min(1, "유형을 선택하세요."),
  memo: z.string().optional(),
});

export const IncomeFormSchema = z.object({
  categoryId: z.string().min(1, "카테고리를 선택하세요.").trim(),
  accountId: z.string().optional(),
  description: z.string().min(1, "수입 내역을 입력하세요."),
  amount: z.number().min(0, "금액을 입력하세요."),
  date: z.string().min(1, "유효한 날짜를 입력하세요."),
  time: z.string().min(1, "시간을 입력하세요."),
  method: z.string().min(1, "수단을 선택하세요."),
  tags: z.array(TagSchema).min(1, "태그를 선택하세요."),
  type: z.string().min(1, "유형을 선택하세요."),
  memo: z.string().optional(),
});
