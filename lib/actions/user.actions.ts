"use server";

import { auth } from "../auth";
import { SERVER_URL } from "../constants";

export async function getProfile(email: string) {
  const session = await auth();
  const response = await fetch(`${SERVER_URL}/user/me/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application",
      authorization: `Bearer ${session?.serverTokens.access_token}`,
    },
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  console.log(response.statusText);

  throw new Error("fetch failed");
}
