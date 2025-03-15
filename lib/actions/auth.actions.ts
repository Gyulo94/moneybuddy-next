"use server";

import { SERVER_URL } from "@/lib/constants";
import {
  findPasswordFormSchema,
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "../schema";

export const register = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationFields.success) {
    return { error: validationFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validationFields.data;

  const response = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return {
      message: response.statusText,
    };
  }
  const data = await response.json();
  return data;
};

export async function validateLoginForm(
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  return { data: validationFields.data };
}

export async function emailDuplicationCheck(email: string) {
  const response = await fetch(`${SERVER_URL}/auth/email-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();

  return result;
}

export async function veryfiyEmail(token: string) {
  const response = await fetch(`${SERVER_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  // console.log("data", data);

  return data;
}

export async function retryVerificationMail(email: string, token: string) {
  const response = await fetch(`${SERVER_URL}/auth/resend-verification-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });
  const data = await response.json();
  return data;
}

export async function passwordChangeMail(email: string) {
  const response = await fetch(`${SERVER_URL}/auth/find-password-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data;
}

export const findPassword = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validationFields = findPasswordFormSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    token: formData.get("token"),
  });

  // console.log("validationFields", validationFields);

  if (!validationFields.success) {
    return { error: validationFields.error.flatten().fieldErrors };
  }

  const { password, token } = validationFields.data;

  const response = await fetch(`${SERVER_URL}/auth/find-password`, {
    method: "POST",
    body: JSON.stringify({ password, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return {
      message: response.statusText,
    };
  }
  const data = await response.json();
  return data;
};

export async function checkOauth(email: string) {
  const response = await fetch(`${SERVER_URL}/auth/check-oauth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();
  console.log("result", result);

  const { isOauth, oauthDate } = result;
  if (isOauth === "kakao") {
    return {
      status: "error",
      message: `${oauthDate}에 카카오로 가입한 계정입니다. 카카오로 로그인해주세요.`,
    };
  }
  if (isOauth === "google") {
    return {
      status: "error",
      message: `${oauthDate}에 구글로 가입한 계정입니다. 구글로 로그인해주세요.`,
    };
  }
  return { status: "success" };
}
