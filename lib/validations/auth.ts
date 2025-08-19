import z from "zod/v3";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "이메일을 입력하세요.",
    })
    .trim(),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }).trim(),
});
