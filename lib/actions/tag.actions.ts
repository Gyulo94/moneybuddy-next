"use server";

import axios from "axios";
import { auth } from "../auth";
import { SERVER_URL } from "../constants";

export async function TagFindByUserId() {
  const session = await auth();
  const userId = session?.user.id;
  const token = session?.serverTokens.access_token!;
  const response = await axios.get(`${SERVER_URL}/tag/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 500) {
    return { error: response.data.error };
  }
  return response.data;
}
