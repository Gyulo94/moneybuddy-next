"use client";

import logoDark from "@/public/images/logo_dark.png";
import logoLight from "@/public/images/logo_light.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // console.log("theme", theme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative max-w-40 max-h-14">
      <Link href="/">
        <Image
          src={theme === "dark" ? logoDark : logoLight}
          width={0}
          height={0}
          alt="logo"
        />
      </Link>
    </div>
  );
}
