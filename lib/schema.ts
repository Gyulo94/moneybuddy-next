import { z } from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        category?: string[];
        subCategory?: string[];
        amount?: string[];
        tags?: string[];
        date?: string[];
        time?: string[];
        description?: string[];
        memo?: string[];
        method?: string[];
        type?: string[];
      };
      status?: string;
      message?: string;
      data?: z.infer<typeof LoginFormSchema>;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "이름은 2글자 이상이어야 합니다.",
      })
      .trim(),
    email: z.string().email({ message: "이메일 형식이 아닙니다." }).trim(),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "비밀번호는 알파벳이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

export const findPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "비밀번호는 알파벳이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

export const insertExpenseFormSchema = z.object({
  categoryId: z.string().min(1, { message: "1차 카테고리를 선택해주세요." }),
  subCategoryId: z.string().min(1, { message: "2차 카테고리를 선택해주세요." }),
  amount: z.number().min(1, { message: "금액을 입력해주세요." }),
  tags: z.array(z.string()).min(1, { message: "태그를 선택해주세요." }),
  date: z.string().min(1, { message: "날짜를 선택해주세요." }),
  time: z.string().min(1, { message: "시간을 입력해주세요." }),
  description: z.string().min(1, { message: "내용을 입력해주세요." }),
  memo: z.string().optional(),
  type: z.literal("EXPENSE"),
  method: z.string().min(1, { message: "결제수단을 선택해주세요." }),
  userId: z.string(),
});
