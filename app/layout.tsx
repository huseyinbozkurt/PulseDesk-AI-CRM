import type { ReactNode } from "react";
import type { Metadata } from "next";
import { FloatingAboutLink } from "@/components/floating-about-link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseDesk AI CRM",
  description: "A simple AI-assisted CRM and productivity dashboard built with Next.js and TypeScript."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FloatingAboutLink />
        {children}
      </body>
    </html>
  );
}
