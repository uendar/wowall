"use client";
import { useEffect, useState } from "react";

type Kind = "phone" | "computer";
type Props = { slug: string; phoneUrl: string; computerUrl: string };

const Icon = ({ kind }: { kind: Kind }) =>
  kind === "phone" ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M8 20h8M12 16.5V20" /></svg>
  );

export default function DownloadButtons({ slug, phoneUrl, computerUrl }: Props) {
  const [likely, setLikely] = useState<Kind>("computer");
  const [state, setState] = useState<Partial<Record<Kind, "busy" | "done">>>({});

  useEffect(() => {
    setLikely(window.matchMedia("(max-width: 768px)").matches ? "phone" : "computer");
  }, []);

  // Fetch the file and save it, so it downloads even when images live on another address (R2).
  async function save(kind: Kind, url: string) {
    setState((s) => ({ ...s, [kind]: "busy" }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const blobUrl = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${slug}-${kind}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
      setState((s) => ({ ...s, [kind]: "done" }));
    } catch {
      window.open(url, "_blank", "noopener"); // fallback: open the image, then save it manually
      setState((s) => ({ ...s, [kind]: undefined }));
    }
  }

  const btn = (kind: Kind, url: string, size: string) => {
    const on = likely === kind;
    const st = state[kind];
    return (
      <button
        key={kind}
        onClick={() => save(kind, url)}
        disabled={st === "busy"}
        className={`group flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-70 disabled:hover:translate-y-0 ${
          on
            ? "border-accent bg-accent text-white shadow-[0_10px_24px_-12px_rgba(43,75,255,0.7)] hover:border-ink hover:bg-ink hover:shadow-[0_16px_32px_-14px_rgba(20,26,23,0.65)]"
            : "border-ink/20 bg-surface hover:border-ink hover:bg-ink hover:text-white hover:shadow-[0_16px_32px_-14px_rgba(20,26,23,0.5)]"
        }`}
      >
        <Icon kind={kind} />
        <span className="flex-1">
          <span className="block font-medium">{st === "busy" ? "Preparing download" : st === "done" ? "Saved. Download again" : `Download for ${kind}`}</span>
          <span className={`block text-sm transition ${on ? "text-white/75" : "text-muted group-hover:text-white/70"}`}>{size}</span>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 opacity-60 transition duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
          <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
        </svg>
      </button>
    );
  };

  return (
    <div className="space-y-3" aria-live="polite">
      {likely === "phone" ? (
        <>{btn("phone", phoneUrl, "1440 × 3200 px")}{btn("computer", computerUrl, "3840 × 2160 px, 4K")}</>
      ) : (
        <>{btn("computer", computerUrl, "3840 × 2160 px, 4K")}{btn("phone", phoneUrl, "1440 × 3200 px")}</>
      )}
    </div>
  );
}
