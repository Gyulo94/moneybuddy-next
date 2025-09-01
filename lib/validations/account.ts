import z from "zod/v3";

export const AccountTypeSchema = z.enum(["계좌", "현금"], {
  errorMap: () => ({ message: "계좌 유형을 선택하세요." }),
});

export const AccountFormSchema = z.object({
  name: z.string().min(1, "계좌 이름을 입력하세요.").trim(),
  accountType: AccountTypeSchema,
  initialBalance: z.number().min(0, "초기 잔액은 0 이상이어야 합니다."),
  bankId: z.string().min(1, { message: "은행을 선택하세요." }).trim(),
  accountNumber: z
    .string()
    .min(1, { message: "계좌번호 뒷 4자리를 정확히 입력하세요." })
    .trim(),
});
