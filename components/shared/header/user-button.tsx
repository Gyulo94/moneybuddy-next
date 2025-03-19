"use client";

import user from "@/public/images/user.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserButton() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={session?.user.image ? session.user.image : user}
          fill
          alt={"user"}
          className=" object-cover"
        />
      </div>
    </div>
  );
}
