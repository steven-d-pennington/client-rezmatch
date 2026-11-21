import type { Metadata } from "next";
import type { ReactNode } from "react";
import { launched, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
  // Nothing is indexable until factory.json says the site is launched.
  robots: launched ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-canvas font-body text-ink">{children}</body>
    </html>
  );
}
