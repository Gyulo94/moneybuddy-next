"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  title?: string;
  menu?: string[];
  className?: string;
}

export default function ContentContainer({
  children,
  title,
  menu,
  className,
}: ContentContainerProps) {
  const [active, setActive] = useState(0);
  const [menuWidths, setMenuWidths] = useState<number[]>([]);
  const menuRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (menu && menuRefs.current.length > 0) {
      const widths = menuRefs.current.map((ref) => {
        if (ref) {
          return ref.offsetWidth;
        }
        return 0;
      });
      setMenuWidths(widths);
    }
  }, [menu]);

  return (
    <main>
      <div className={`mb-[32px] ${!menu && "border-b"}`}>
        <h2 className="inline-block text-md pt-3 pb-2 pl-6">{title}</h2>
        {menu && (
          <div className="relative flex border-b">
            {menu.map((item, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) menuRefs.current[index] = el;
                }}
                className="relative w-28 text-center pl-6 mr-6 py-2 flex-1 lg:flex-none cursor-pointer"
                onClick={() => setActive(index)}
              >
                <span>{item}</span>
              </span>
            ))}
            {/* Framer Motion을 사용한 border-b 애니메이션 */}
            {menuWidths.length > 0 && (
              <motion.div
                className="absolute bottom-0 h-[2px] bg-primary"
                layoutId="active-border"
                initial={false}
                animate={{
                  left:
                    menuWidths
                      .slice(0, active)
                      .reduce((acc, width) => acc + width, 0) +
                    active * 24,
                  width: menuWidths[active] + 24,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </div>
        )}
      </div>
      <main
        className={cn(
          "relative flex mx-auto w-full flex-wrap max-w-[1065px] p-3.5",
          className
        )}
      >
        {children}
      </main>
    </main>
  );
}
