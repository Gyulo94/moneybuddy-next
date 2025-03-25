import Sidebar from "@/components/shared/sidebar";
import { DeleteButton } from "@/components/transactions/delete-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="hidden min-w-[240px] flex-col lg:flex">
          <Sidebar />
        </div>
        <main className="flex w-full flex-col">{children}</main>
      </div>
      <DeleteButton />
    </>
  );
}
