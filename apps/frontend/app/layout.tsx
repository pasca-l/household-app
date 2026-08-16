import type { Metadata } from "next";
import QueryProvider from "@/lib/tanstack/QueryProvider";
import AuthGuard from "@/utils/firebase/components/AuthGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "Household App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthGuard>{children}</AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
