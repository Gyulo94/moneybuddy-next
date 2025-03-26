"use server";

import axios from "axios";
import { auth } from "../auth";
import { SERVER_URL } from "../constants";
import { FormState, insertExpenseFormSchema } from "../schema";

export async function InsertExpense(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  const token = session?.serverTokens.access_token!;
  const userId = session?.user.id!;

  const validationFields = insertExpenseFormSchema.safeParse({
    categoryId: formData.get("categoryId"),
    subCategoryId: formData.get("subCategoryId"),
    amount: Number(formData.get("amount")),
    tags: formData.getAll("tags[]"),
    date: formData.get("date"),
    time: formData.get("time"),
    description: formData.get("description"),
    type: "EXPENSE",
    memo: formData.get("memo"),
    method: formData.get("method"),
    userId,
  });

  if (!validationFields.success) {
    return { error: validationFields.error.flatten().fieldErrors };
  }

  const response = await axios.post(
    `${SERVER_URL}/transaction`,
    validationFields.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 400) {
    return { error: response.data.error };
  }
  return {
    status: "success",
    message: "지출 내역 등록 성공!",
  };
}

export async function TransactionFindByType(type: "EXPENSE" | "INCOME") {
  const session = await auth();
  const token = session?.serverTokens.access_token!;
  const userId = session?.user.id!;

  const response = await axios.get(`${SERVER_URL}/transaction/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      type,
    },
  });
  return response.data;
}
