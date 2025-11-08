"use client";

import { useOpenTransactionDialogStore } from "@/lib/stores";
import { Button } from "../ui/button";

export default function TransactionButton() {
  const { onOpen } = useOpenTransactionDialogStore();
  return (
    <div
      className="absolute -right-1 -top-3 md:-right-3 md:-top-3"
      onClick={() => onOpen(null)}
    >
      <Button className="relative rounded-full p-0 size-8 text-2xl md:size-10 md:text-3xl font-extralight text-center cursor-pointer">
        <p className="absolute inset-0 flex items-center justify-center md:-top-1">
          +
        </p>
      </Button>
    </div>
  );
}
