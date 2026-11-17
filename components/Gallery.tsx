"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Wallpaper } from "@/lib/wallpapers";

export default function Gallery({ items, categories }: { items: Wallpaper[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(
      (w) =>
        (cat === "All" || w.category === cat) &&
        (!needle || w.title.toLowerCase().includes(needle) || w.tags.some((t) => t.toLowerCase().includes(needle))),
    );
  }, [items, q, cat]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search wallpapers"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-sm ${cat === c ? "bg-indigo-600 text-white" : "border border-white/15 text-white/80 hover:bg-white/10"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="text-white/60">No wallpapers match.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((w) => (
            <li key={w.slug}>
              <Link href={`/w/${w.slug}/`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/wallpapers/${w.slug}/thumb-portrait.webp`} alt={`${w.title} wallpaper`} loading="lazy" className="aspect-[1/2] w-full object-cover transition group-hover:scale-105" />
                <div className="p-3">
                  <p className="font-medium">{w.title}</p>
                  <p className="text-xs text-white/60">{w.category}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
