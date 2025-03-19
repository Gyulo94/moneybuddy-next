import { cn } from "@/lib/utils";

interface ContentsContainerProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}
export default function ContentsContainer({
  children,
  title,
  className,
}: ContentsContainerProps) {
  return (
    <main>
      <div className="border-b mb-[32px]">
        <h2 className=" inline-block text-md pt-3 pb-2 pl-6">{title}</h2>
      </div>
      <main
        className={cn(
          "flex mx-auto w-full flex-wrap max-w-[1065px] p-3.5",
          className
        )}
      >
        {children}
      </main>
    </main>
  );
}
