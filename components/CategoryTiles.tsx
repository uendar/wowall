"use client";
import { files, type Wallpaper } from "@/lib/wallpapers";

type Props = { items: Wallpaper[]; categories: string[]; counts: Record<string, number>; value: string; onPick: (c: string) => void };

// Large image tiles, one per category. The cover is the newest wallpaper in that category.
export default function CategoryTiles({ items, categories, counts, value, onPick }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {categories.map((c) => {
        const cover = items.find((w) => w.category === c);
        const active = value === c;
        return (
          <li key={c}>
            <button
              onClick={() => onPick(active ? "All" : c)}
              aria-pressed={active}
              className={`group relative block aspect-[16/10] w-full overflow-hidden rounded-[22px] text-left outline-offset-4 transition duration-300 hover:-translate-y-0.5 ${active ? "ring-2 ring-ink ring-offset-4 ring-offset-paper" : ""}`}
            >
              {cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={files(cover.slug).thumbLandscape} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-5 bottom-4 flex items-end justify-between text-white">
                <span className="font-display text-2xl font-semibold tracking-tight">{c}</span>
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-sm tabular-nums backdrop-blur">{counts[c] ?? 0}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
