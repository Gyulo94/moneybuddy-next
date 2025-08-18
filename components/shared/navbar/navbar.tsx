"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user/user-avatar";
import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="container mx-auto w-full flex items-center justify-between p-4">
      <div>
        <h1 className="text-xl font-bold">홈</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant={"ghost"}>
          <Bell />
        </Button>
        <Popover>
          <PopoverTrigger>
            <UserAvatar
              url={
                "https://m.health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
              }
              name={"찰규"}
              isTooltipEnabled={false}
              className="cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center gap-3">
            <div className="mb-4 w-full flex flex-col items-center justify-between">
              <UserAvatar
                url={
                  "https://m.health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
                }
                name={"찰규"}
                isTooltipEnabled={false}
                className="size-22 mb-2"
              />
              <h2 className="text-lg font-semibold">{"찰규"}</h2>
              <p className="text-sm text-muted-foreground">
                {"찰규@example.com"}
              </p>
            </div>
            <Separator />
            <Button variant={"ghost"} className="w-full">
              로그아웃
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
