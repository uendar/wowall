"use client";
import Link from "next/link";
import { useState } from "react";
import PhonePair from "@/components/PhonePair";
import { files, type Wallpaper } from "@/lib/wallpapers";

// The signature of the site: one wallpaper shown on a computer and a phone at the same time.
export default function FeaturedStage({ items }: { items: Wallpaper[] }) {
  const [i, setI] = useState(0);
  const w = items[i];
  if (!w) return null;
  const f = files(w.slug);

  return (
    <div>
      <Link href={`/w/${w.slug}/`} className="group relative block rounded-[32px] bg-surface p-6 pb-14 sm:p-10 sm:pb-16" aria-label={`Open ${w.title}`}>
        <div className="mx-auto w-[88%]">
          <div className="rounded-[14px] bg-ink p-[1.6%] shadow-[0_30px_60px_-30px_rgba(20,26,23,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={w.slug} src={f.previewLandscape} alt="" className="aspect-video w-full rounded-[7px] object-cover" />
          </div>
          <div className="mx-[-5%] h-3 rounded-b-[14px] bg-line" />
        </div>
        <PhonePair key={`${w.slug}-p`} src={f.previewPortrait} />
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="truncate font-medium">{w.title}</p>
          <p className="text-sm text-muted">{w.category}</p>
        </div>
        {items.length > 1 && (
          <div role="group" aria-label="Choose featured wallpaper" className="flex shrink-0 gap-2">
            {items.map((x, n) => (
              <button
                key={x.slug}
                onClick={() => setI(n)}
                aria-label={`Show ${x.title}`}
                aria-pressed={n === i}
                className={`size-11 overflow-hidden rounded-xl border-2 transition ${n === i ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={files(x.slug).thumbLandscape} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
