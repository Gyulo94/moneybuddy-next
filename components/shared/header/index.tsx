"use client";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { MobileMenuButton } from "./mobile-menu-button";
import { ModeToggle } from "./mode-toggle";
import UserButton from "./user-button";

export default function Header() {
  const pathname = usePathname();
  const noHeaderPaths = [
    "/login",
    "/register",
    "/find-password",
    "/verification",
    "/reset-password",
  ];
  const isNotAllowed = noHeaderPaths.some((path) => pathname.startsWith(path));
  if (isNotAllowed) {
    return null;
  }
  return (
    <header className="w-full h-14 border-b z-10">
      <div className="flex justify-between items-center px-5 lg:px-16 py-2">
        <div className="lg:hidden">
          <MobileMenuButton />
        </div>
        <Logo />
        <div className="lg:hidden">
          <UserButton />
        </div>
        <div className="hidden lg:flex justify-center items-center gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
