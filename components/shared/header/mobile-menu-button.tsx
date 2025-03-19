import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../sidebar";

export function MobileMenuButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-8 w-8 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
