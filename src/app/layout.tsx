import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Next Template Starter",
  description: "A starting point for Next.js projects"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
