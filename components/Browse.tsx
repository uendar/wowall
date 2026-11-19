"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import CategoryPicker from "@/components/CategoryPicker";
import CategoryTiles from "@/components/CategoryTiles";
import FeaturedStage from "@/components/FeaturedStage";
import { SITE_NAME } from "@/lib/site";
import type { Wallpaper } from "@/lib/wallpapers";

type Mode = "phone" | "computer";

export default function Browse({ items, categories }: { items: Wallpaper[]; categories: string[] }) {
  const [mode, setMode] = useState<Mode>("phone");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mode") as Mode | null;
      setMode(saved ?? (window.matchMedia("(max-width: 768px)").matches ? "phone" : "computer"));
    } catch {
      /* ignore */
    }
  }, []);
  const pick = (m: Mode) => {
    setMode(m);
    try { localStorage.setItem("mode", m); } catch { /* ignore */ }
  };

  const shown = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter(
      (w) => (cat === "All" || w.category === cat) && (!n || w.title.toLowerCase().includes(n) || w.tags.some((t) => t.toLowerCase().includes(n))),
    );
  }, [items, cat, q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const w of items) m[w.category] = (m[w.category] ?? 0) + 1;
    return m;
  }, [items]);

  const featured = useMemo(() => items.slice(0, 4), [items]);

  const chooseCategory = (c: string) => {
    setCat(c);
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const grid = mode === "phone" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* Hero: the name, one sentence, and a wallpaper shown on both screens */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 sm:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <h1
            className="rise break-words font-display text-[clamp(2.6rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.045em]"
            style={{ fontVariationSettings: '"wght" 800, "wdth" 100' }}
          >
            {SITE_NAME}
          </h1>
          <p className="rise mt-6 max-w-md text-xl leading-snug text-ink/80" style={{ animationDelay: "120ms" }}>
            Wallpapers that fit your screen the first time. Pick a device, pick a mood, and download the exact size.
          </p>
          <dl className="rise mt-9 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6 text-sm" style={{ animationDelay: "240ms" }}>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="mt-1 font-medium">1440 × 3200</dd>
            </div>
            <div>
              <dt className="text-muted">Computer</dt>
              <dd className="mt-1 font-medium">3840 × 2160</dd>
            </div>
            <div>
              <dt className="text-muted">Cost</dt>
              <dd className="mt-1 font-medium">Free</dd>
            </div>
          </dl>
          <a
            href="#gallery"
            className="rise mt-9 inline-flex rounded-full bg-ink px-7 py-3.5 font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent"
            style={{ animationDelay: "320ms" }}
          >
            Browse wallpapers
          </a>
        </div>
        <div className="rise" style={{ animationDelay: "160ms" }}>
          <FeaturedStage items={featured} />
        </div>
      </section>

      {/* Browse by category */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
        <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight">Pick a mood</h2>
        <CategoryTiles items={items} categories={categories} counts={counts} value={cat} onPick={chooseCategory} />
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto w-full max-w-7xl scroll-mt-6 px-5 sm:px-8">
        <div className="rounded-[28px] bg-surface p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Device" className="inline-flex rounded-full bg-ink p-1.5 text-[15px]">
              {(["phone", "computer"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => pick(m)}
                  aria-pressed={mode === m}
                  className={`rounded-full px-6 py-2.5 font-medium capitalize transition ${mode === m ? "bg-surface text-ink" : "text-white/70 hover:text-white"}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div>
              <label className="sr-only" htmlFor="q">Search wallpapers</label>
              <input
                id="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search wallpapers"
                className="w-full min-w-[15rem] rounded-full border border-line bg-paper px-5 py-3 text-[15px] outline-none placeholder:text-muted focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-5">
            <CategoryPicker categories={categories} counts={counts} total={items.length} value={cat} onChange={setCat} />
          </div>
        </div>

        <p className="mb-6 mt-8 text-sm text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "wallpaper" : "wallpapers"}
          {cat !== "All" && <> in <span className="font-medium text-ink">{cat}</span></>}
        </p>
        {shown.length === 0 ? (
          <p className="py-16 text-muted">Nothing matches that search. Clear it or pick another category.</p>
        ) : (
          <ul className={`grid gap-x-5 gap-y-9 ${grid}`}>
            {shown.map((w) => (
              <li key={w.slug}><Card w={w} mode={mode} /></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
