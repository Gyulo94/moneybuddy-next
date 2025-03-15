"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={"w-full cursor-pointer"}
      aria-disabled={pending}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
}
