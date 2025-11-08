"use server";

import { auth } from "@/auth";
import axios from "axios";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import { ExpenseFormSchema, IncomeFormSchema } from "../validations";

export async function createExpense(values: z.infer<typeof ExpenseFormSchema>) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(
      `${SERVER_URL}/transaction/expense/create`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function createIncome(values: z.infer<typeof IncomeFormSchema>) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(
      `${SERVER_URL}/transaction/income/create`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findTransactionsByMonth(currentDate: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/transaction/monthly`, {
      params: { currentDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
