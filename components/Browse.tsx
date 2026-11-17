"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
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

  const grid = mode === "phone" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16">
        <h1 className="rise font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
          Wallpapers cut to fit your screen.
        </h1>
        <p className="rise mt-6 max-w-xl text-lg text-muted" style={{ animationDelay: "120ms" }}>
          Choose phone or computer, then download the right size in one tap. All free.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
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
          <label className="sr-only" htmlFor="q">Search wallpapers</label>
          <input
            id="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full max-w-[16rem] rounded-full border border-line bg-surface px-5 py-3 text-[15px] outline-none placeholder:text-muted focus:border-accent"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex gap-6 overflow-x-auto border-b border-line text-[15px]">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`-mb-px shrink-0 border-b-2 pb-3 transition ${cat === c ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>
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
