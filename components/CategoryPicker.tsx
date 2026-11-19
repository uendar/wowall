"use client";

type Props = {
  categories: string[];
  counts: Record<string, number>;
  total: number;
  value: string;
  onChange: (c: string) => void;
};

// Each category gets its own stable colour dot, derived from its name.
const dot = (name: string) => {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return `hsl(${h} 70% 55%)`;
};

export default function CategoryPicker({ categories, counts, total, value, onChange }: Props) {
  const all = ["All", ...categories];
  const count = (c: string) => (c === "All" ? total : counts[c] ?? 0);

  return (
    <div>
      {/* Phones: a dropdown */}
      <div className="relative sm:hidden">
        <label htmlFor="cat" className="sr-only">Category</label>
        <span
          aria-hidden
          className="pointer-events-none absolute left-5 top-1/2 size-2.5 -translate-y-1/2 rounded-full"
          style={{ background: value === "All" ? "var(--color-ink)" : dot(value) }}
        />
        <select
          id="cat"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-full border border-line bg-surface py-3.5 pl-11 pr-12 text-[15px] font-medium outline-none focus:border-accent"
        >
          {all.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : c} ({count(c)})</option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>

      {/* Tablets and computers: pill chips */}
      <div role="group" aria-label="Category" className="hidden flex-wrap gap-2.5 sm:flex">
        {all.map((c) => {
          const active = value === c;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              aria-pressed={active}
              className={`group inline-flex items-center gap-2.5 rounded-full border py-2.5 pl-4 pr-3.5 text-[15px] font-medium transition duration-200 hover:-translate-y-0.5 ${
                active
                  ? "border-ink bg-ink text-white shadow-[0_8px_20px_-8px_rgba(20,26,23,0.6)]"
                  : "border-line bg-surface text-ink hover:border-ink/40"
              }`}
            >
              <span
                aria-hidden
                className="size-2.5 rounded-full transition group-hover:scale-125"
                style={{ background: c === "All" ? (active ? "#fff" : "var(--color-ink)") : dot(c) }}
              />
              {c}
              <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${active ? "bg-white/20 text-white" : "bg-paper text-muted"}`}>
                {count(c)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
