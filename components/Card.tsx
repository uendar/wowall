import Link from "next/link";
import { files, type Wallpaper } from "@/lib/wallpapers";

export default function Card({ w, mode }: { w: Wallpaper; mode: "phone" | "computer" }) {
  const f = files(w.slug);
  const phone = mode === "phone";
  return (
    <Link href={`/w/${w.slug}/`} className="group block">
      <div className={`overflow-hidden rounded-[20px] bg-line ${phone ? "aspect-[9/19]" : "aspect-video"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={phone ? f.thumbPortrait : f.thumbLandscape}
          alt={`${w.title} wallpaper`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-2.5 flex items-baseline justify-between gap-3 px-1">
        <p className="truncate text-[15px] font-medium">{w.title}</p>
        <p className="hidden shrink-0 text-xs text-muted sm:block">{w.category}</p>
      </div>
    </Link>
  );
}
