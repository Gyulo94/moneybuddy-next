"use client";

import { Button } from "@/components/ui/button";
import { retryVerificationMail } from "@/lib/actions/auth.actions";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function VerificationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log("session", session);

  useEffect(() => {
    if (session?.user?.isEmailVerified) {
      redirect("/check");
    }
  }, [session, router]);

  async function retrySendMail() {
    const email = session?.user?.email || "";
    const token = session?.user?.verifyToken || "";
    const response = await retryVerificationMail(email, token);

    if (response.status === "success") {
      toast.success(response.message);
    } else if (response.status === "error") {
      toast.error(response.message);
      router.push("/check");
    } else {
      toast.error("이메일 재전송에 실패했습니다. 다시 시도해주세요.");
    }
  }
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-5">이메일 인증을 완료해주세요.</h1>
      <p>
        회원가입을 통해 가입하신 이메일로 이메일 인증 메일이 전송되었습니다.
        메일이 전송되지 않은 경우, 아래의 "재전송"버튼을 눌러주세요.
      </p>
      <Button className="mt-5 cursor-pointer" onClick={retrySendMail}>
        재전송
      </Button>
    </div>
  );
}
