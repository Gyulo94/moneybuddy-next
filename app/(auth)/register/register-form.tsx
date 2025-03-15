"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { emailDuplicationCheck, register } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, action] = useActionState(register, undefined);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onClickEmailCheck = async () => {
    if (!email) {
      toast.warning("이메일을 입력해주세요.");
      return;
    }
    const response = await emailDuplicationCheck(email);
    if (response.status === "success") {
      setIsEmailChecked(true);
      toast.success("사용 가능한 이메일입니다.");
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailChecked) {
      toast.warning("이메일 중복 확인을 해주세요.");
      return;
    }
    startTransition(() => action(new FormData(event.currentTarget)));
  };

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
          <CardTitle className="text-2xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <div className="flex justify-center items-center gap-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className={`${state?.error?.email ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailChecked(false);
                    }}
                  />
                  <Button
                    variant={"outline"}
                    type="button"
                    className="cursor-pointer"
                    onClick={onClickEmailCheck}
                  >
                    중복확인
                  </Button>
                </div>
              </div>
              {state?.error?.email && (
                <p className="text-sm text-red-500">{state.error.email}</p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  className={`${state?.error?.name ? "border-red-500" : ""}`}
                  type="text"
                />
              </div>
              {state?.error?.name && (
                <p className="text-red-500 text-sm">{state.error.name}</p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  className={`${
                    state?.error?.password ? "border-red-500" : ""
                  }`}
                  type="password"
                />
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
              <SubmitButton>회원가입</SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              계정이 이미 있나요?{" "}
              <Link href={"/login"} className="underline underline-offset-4">
                로그인
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
