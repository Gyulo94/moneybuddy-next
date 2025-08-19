"use client";

import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { ThemeToggle } from "./theme-toggle";
import UserMenu from "./user-menu";

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
        <UserMenu />
      </div>
    </nav>
  );
}
