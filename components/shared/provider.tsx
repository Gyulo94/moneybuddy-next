"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "../ui/theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ToastContainer />
      </ThemeProvider>
    </SessionProvider>
  );
}
