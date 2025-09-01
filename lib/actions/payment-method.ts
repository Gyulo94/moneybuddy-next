"use server";

import { auth } from "@/auth";
import axios from "axios";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import { PaymentMethodFormSchema } from "../validations";

export async function findPaymentMethodsByUserId() {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/payment-method/all`, {
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

export async function createPaymentMethod(
  values: z.infer<typeof PaymentMethodFormSchema>
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(
      `${SERVER_URL}/payment-method/create`,
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
