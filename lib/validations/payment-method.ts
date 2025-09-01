import z from "zod/v3";

export const MethodTypeSchema = z.enum(["신용", "체크", "현금"], {
  errorMap: () => ({ message: "카드 유형을 선택하세요." }),
});

export const PaymentMethodFormSchema = z.object({
  name: z.string().min(1, "카드 이름을 입력하세요.").trim(),
  methodType: MethodTypeSchema,
  accountId: z.string().min(1, "연결할 계좌를 선택하세요.").trim(),
  issuerId: z.string().min(1, "발급사를 선택하세요.").trim(),
  cardNumber: z.string().trim().optional(),
});
