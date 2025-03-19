"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";

export function LogoutButton({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>로그아웃</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <p className="text-xl">정말로 로그아웃 하시겠습니까?</p>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className=" cursor-pointer"
            >
              닫기
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="ghost"
            className="bg-[#dc3545] hover:bg-[#dc3546dc] text-white hover:text-white dark:text-primary dark:hover:text-primary cursor-pointer"
            onClick={() => signOut()}
          >
            로그아웃
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
