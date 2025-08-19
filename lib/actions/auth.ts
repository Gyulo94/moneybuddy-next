"use server";

import { signIn } from "@/auth";
import z from "zod/v3";
import { LoginFormSchema } from "../validations";

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const { email, password } = values;
  await signIn("credentials", {
    email,
    password,
    redirect: true,
  });
}
