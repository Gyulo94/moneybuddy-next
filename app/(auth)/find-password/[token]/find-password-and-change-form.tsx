"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { findPassword } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import type React from "react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function FindPasswordAndChangeForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const token = useParams<{ token: string }>().token;
  const [state, action] = useActionState(findPassword, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      router.push("/login");
    }
  }, [state]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">비밀번호 찾기</CardTitle>
          <CardDescription>새로운 비밀번호를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <Input type="hidden" name="token" value={token} />
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" name="password" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`${
                    state?.error?.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              {state?.error?.password && (
                <div className="text-sm text-red-500">
                  <ul>
                    {state.error.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {state?.error?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {state.error.confirmPassword}
                </p>
              )}
              <SubmitButton>비밀번호 변경</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
