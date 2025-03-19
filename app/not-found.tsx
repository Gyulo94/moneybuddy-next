"use client";
import { Button } from "@/components/ui/button";
import animationData from "@/public/lottie/404.json";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="z-50 flex flex-col justify-center items-center max-w-md mx-auto h-[calc(100vh-56px)]">
      <Lottie animationData={animationData} loop />

      <h1 className="text-2xl font-bold mt-10">페이지를 찾을 수 없습니다.</h1>

      <Button type="button" className="mt-10" onClick={() => router.back()}>
        뒤로 가기
      </Button>
    </main>
  );
}
