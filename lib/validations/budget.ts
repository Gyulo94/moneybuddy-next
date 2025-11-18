import { z } from "zod/v3";

export const BudgetFormSchema = z.object({
  amount: z.number().min(1, "월 예산은 최소 1만원 이상이어야 합니다."),
  year: z.number(),
  month: z.number(),
});
