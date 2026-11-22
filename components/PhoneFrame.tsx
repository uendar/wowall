// Two generic phone shapes, drawn in CSS (no logos): an iPhone-style phone and a Samsung-style phone.
// Corner radii are percentages so the shape stays in proportion at any size. Width comes from className.
export type PhoneVariant = "iphone" | "samsung";

const SHAPE = {
  // Rounder corners, wider bezel, pill-shaped camera island, side buttons on both edges.
  iphone: { outer: "rounded-[16%/7.7%] p-[2.8%]", screen: "rounded-[14%/6.5%]" },
  // Squarer corners, slimmer bezel, small punch-hole camera, one button on the right edge.
  samsung: { outer: "rounded-[10%/4.8%] p-[2.2%]", screen: "rounded-[8.2%/3.8%]" },
} as const;

export default function PhoneFrame({ src, alt = "", variant, className = "" }: { src: string; alt?: string; variant: PhoneVariant; className?: string }) {
  const s = SHAPE[variant];
  return (
    <div className={`relative bg-ink shadow-[0_30px_60px_-20px_rgba(20,26,23,0.6)] ring-1 ring-white/15 ${s.outer} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`aspect-[9/19.5] w-full object-cover ${s.screen}`} />

      {variant === "iphone" ? (
        <>
          <span aria-hidden className="absolute left-1/2 top-[2.4%] h-[2.3%] w-[28%] -translate-x-1/2 rounded-full bg-black" />
          <span aria-hidden className="absolute -left-[1.4%] top-[14%] h-[4%] w-[1.6%] rounded-l-sm bg-ink" />
          <span aria-hidden className="absolute -left-[1.4%] top-[20%] h-[7%] w-[1.6%] rounded-l-sm bg-ink" />
          <span aria-hidden className="absolute -right-[1.4%] top-[22%] h-[10%] w-[1.6%] rounded-r-sm bg-ink" />
        </>
      ) : (
        <>
          <span aria-hidden className="absolute left-1/2 top-[2.6%] aspect-square w-[4.6%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
          <span aria-hidden className="absolute -right-[1.4%] top-[16%] h-[5%] w-[1.6%] rounded-r-sm bg-ink" />
          <span aria-hidden className="absolute -right-[1.4%] top-[24%] h-[9%] w-[1.6%] rounded-r-sm bg-ink" />
        </>
      )}
    </div>
  );
}
