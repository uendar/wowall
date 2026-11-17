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
        className={`flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-left transition disabled:opacity-70 ${on ? "bg-accent text-white hover:brightness-110" : "border border-ink/20 bg-surface hover:border-ink"}`}
      >
        <Icon kind={kind} />
        <span className="flex-1">
          <span className="block font-medium">{st === "busy" ? "Preparing download" : st === "done" ? "Saved. Download again" : `Download for ${kind}`}</span>
          <span className={`block text-sm ${on ? "text-white/75" : "text-muted"}`}>{size}</span>
        </span>
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
