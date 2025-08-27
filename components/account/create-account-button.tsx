"use client";

import { useCreateAccountDialogStore } from "@/lib/stores";
import { Plus } from "lucide-react";

interface Props {
  type: "account" | "paymentMethod";
}

export default function CreateAccountButton({ type }: Props) {
  const { onOpen: onAccountOpen } = useCreateAccountDialogStore();
  // const { onOpen: onPaymentMethodOpen } = useCreatePaymentMethodDialogStore();
  return (
    <button
      className="cursor-pointer bg-primary hover:bg-primary/90 absolute rounded-full p-2.5 right-0 -top-11.5 shadow-md"
      onClick={() => (type === "account" ? onAccountOpen() : undefined)}
    >
      <Plus className="text-white size-5" />
    </button>
  );
}
