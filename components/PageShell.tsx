import Link from "next/link";
import type { ReactNode } from "react";

// Shared layout for text pages (About, Privacy, Contact).
export default function PageShell({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-8 sm:px-8">
      <Link href="/" className="text-sm text-muted hover:text-ink">&larr; All wallpapers</Link>
      <h1 className="rise mt-8 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1] tracking-[-0.03em]">{title}</h1>
      {intro && <p className="rise mt-5 max-w-xl text-lg text-muted" style={{ animationDelay: "100ms" }}>{intro}</p>}
      <div className="mt-10 space-y-5 text-[17px] leading-relaxed [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1">
        {children}
      </div>
    </main>
  );
}
