import Navbar from "@/components/shared/navbar/navbar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: Promise<{ year?: string; month?: string }>;
}>) {
  return (
    <SidebarProvider>
      <div className="w-full flex bg-background h-full lg:h-screen">
        <AppSidebar searchParams={searchParams} />
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-center sticky top-0 z-40 border-b backdrop-blur-xs">
            <div className="ml-3">
              <SidebarTrigger />
            </div>
            <Navbar />
          </div>
          <div className="p-0 md:p-4 pt-2">
            <div className="px-2 w-full max-w-7xl mx-auto lg:px-0">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
