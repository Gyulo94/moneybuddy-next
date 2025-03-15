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
import { passwordChangeMail } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export function FindPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await passwordChangeMail(email);
    if (response.status === "success") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">비밀번호 찾기</CardTitle>
          <CardDescription>가입하신 이메일을 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <SubmitButton>메일 전송</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
