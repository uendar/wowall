import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/instrument-sans";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Free HD and 4K wallpapers for phone and computer`,
  description: "Browse wallpapers and download the exact size for your phone or your computer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">{SITE_NAME}</Link>
          <nav className="flex gap-6 text-sm text-muted">
            <Link href="/" className="hover:text-ink">Browse</Link>
          </nav>
        </header>
        {children}
        <footer className="mx-auto mt-24 w-full max-w-7xl border-t border-line px-5 py-8 text-sm text-muted sm:px-8">
          Free for personal use. Please don&apos;t resell or redistribute.
        </footer>
      </body>
    </html>
  );
}
