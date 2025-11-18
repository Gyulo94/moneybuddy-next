"use server";

import { auth } from "@/auth";
import axios from "axios";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import { BudgetFormSchema } from "../validations";

export async function createBudget(values: z.infer<typeof BudgetFormSchema>) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/budget/create`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findBudget(year: number, month: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/budget`, {
      params: { year, month },
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
