import z from "zod/v3";

export const AccountTypeSchema = z.enum(["계좌", "현금"], {
  errorMap: () => ({ message: "계좌 유형을 선택하세요." }),
});

export const AccountFormSchema = z
  .object({
    name: z.string().min(1, "계좌 이름을 입력하세요.").trim(),
    accountType: AccountTypeSchema,
    initialBalance: z.number().min(0, "초기 잔액은 0 이상이어야 합니다."),
    logo: z.string().trim().optional(),
    bankName: z.string().trim().optional(),
    accountNumber: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "계좌") {
      if (!data.logo) {
        ctx.addIssue({
          path: ["logo"],
          code: z.ZodIssueCode.custom,
          message: "은행 로고를 선택하세요.",
        });
      }
      if (!data.bankName || data.bankName.length < 2) {
        ctx.addIssue({
          path: ["bankName"],
          code: z.ZodIssueCode.custom,
          message: "은행 이름을 선택하세요.",
        });
      }
      if (!data.accountNumber || !/^[0-9]{4}$/.test(data.accountNumber)) {
        ctx.addIssue({
          path: ["accountNumber"],
          code: z.ZodIssueCode.custom,
          message: "계좌 번호 뒷 4자리를 정확히 입력하세요.",
        });
      }
    }
  });
