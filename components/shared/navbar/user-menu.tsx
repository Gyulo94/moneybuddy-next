"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user/user-avatar";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <Popover>
          <PopoverTrigger>
            <UserAvatar
              url={session?.user.image || DEFAULT_AVATAR}
              name={session?.user.name || ""}
              isTooltipEnabled={false}
              className="cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center gap-3">
            <div className="mb-4 w-full flex flex-col items-center justify-between">
              <UserAvatar
                url={session?.user.image || DEFAULT_AVATAR}
                name={session?.user.name || ""}
                isTooltipEnabled={false}
                className="size-22 mb-2"
              />
              <h2 className="text-lg font-semibold">{session?.user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {session?.user.email}
              </p>
            </div>
            <Separator />
            <Button
              variant={"ghost"}
              onClick={() => signOut()}
              className="w-full text-md text-destructive"
            >
              <LogOutIcon className="size-4" /> 로그아웃
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
