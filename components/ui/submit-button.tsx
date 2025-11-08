"use client";

import { Loader2 } from "lucide-react";
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
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
