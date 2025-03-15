import { auth } from "@/lib/auth";
import { FindPasswordAndChangeForm } from "./find-password-and-change-form";

export default async function LoginPage() {
  const session = await auth();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FindPasswordAndChangeForm />
      </div>
    </div>
  );
}
