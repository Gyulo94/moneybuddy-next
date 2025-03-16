"use client";
import { veryfiyEmail } from "@/lib/actions/auth.actions";
import emailVerifying from "@/public/images/emailVerifying.png";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function token() {
  const { data: session, status, update } = useSession();
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  if (session?.user?.isEmailVerified === true) {
    router.push("/check");
    return;
  }
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await veryfiyEmail(token);
        if (response.status === "success") {
          toast.success(response.message);
          setTimeout(() => {
            signOut();
          }, 3000);
        } else {
          toast.error("이메일 인증에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        toast.error("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    verify();
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <div className="relative max-w-[600px] mb-5 object-contain">
        <Image
          src={emailVerifying}
          width={0}
          height={0}
          className="mx-auto"
          alt="emailVerifying"
        />
      </div>
      <h2 className="mt-5 text-3xl font-bold">
        이메일 인증을 하고 있습니다. 잠시만 기다려 주세요.
      </h2>
    </div>
  );
}
