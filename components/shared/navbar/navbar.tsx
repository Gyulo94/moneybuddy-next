import NavTitle from "./nav-title";
import { ThemeToggle } from "./theme-toggle";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <nav className="container mx-auto w-full flex items-center justify-between p-4">
      <NavTitle />

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserMenu />
      </div>
    </nav>
  );
}
