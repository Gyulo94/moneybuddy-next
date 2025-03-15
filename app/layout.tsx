import Provider from "@/components/shared/provider";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: `%s | Money Buddy`,
    default: APP_NAME as string,
  },
  description: APP_DESCRIPTION,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
