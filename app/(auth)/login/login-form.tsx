"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { checkOauth, validateLoginForm } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import GoogleLoginButton from "./google-login-button";
import KakaoLoginButton from "./kakao-login-button";

interface State {
  message?: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, setState] = useState<State>({});
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    // console.log("formdata", formData);
    const validationResult = await validateLoginForm(formData);

    if (validationResult?.error) {
      setState(validationResult);
      return;
    }

    const email = validationResult?.data?.email;
    const password = validationResult?.data?.password;

    if (!email) {
      setState({ message: "이메일을 입력하세요." });
      return;
    }
    const oauthCheck = await checkOauth(email);
    // console.log("oauthCheck", oauthCheck);

    if (oauthCheck.status === "error") {
      toast.error(oauthCheck.message);
      return;
    }

    if (oauthCheck.status === "success") {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.status === 401) {
        setState({
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }

      if (result?.status === 200) {
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" name="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                  <a
                    href="/find-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <Input id="password" type="password" name="password" />
              </div>
              {state?.message && (
                <p className="text-sm text-red-500 text-center">
                  {state.message}
                </p>
              )}
              <SubmitButton>로그인</SubmitButton>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  소셜 로그인
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <KakaoLoginButton />
                <GoogleLoginButton />
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              계정이 없나요?{" "}
              <a href="/register" className="underline underline-offset-4">
                회원가입
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
