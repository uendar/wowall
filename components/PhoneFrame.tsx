// Two generic phone shapes, drawn in CSS (no logos): an iPhone-style phone and a Samsung-style phone.
// Thin bezels and a fine metal-coloured edge, like a real phone. Corner radii are percentages
// (horizontal / vertical) so the corners stay circular at any size. Width comes from className.
export type PhoneVariant = "iphone" | "samsung";

const SHAPE = {
  // Rounder corners, pill-shaped camera island.
  iphone: { outer: "rounded-[15%/7%] p-[1.8%]", screen: "rounded-[13.7%/6.3%]" },
  // Squarer corners, even slimmer bezel, small punch-hole camera.
  samsung: { outer: "rounded-[9%/4.2%] p-[1.4%]", screen: "rounded-[7.8%/3.6%]" },
} as const;

export default function PhoneFrame({ src, alt = "", variant, className = "" }: { src: string; alt?: string; variant: PhoneVariant; className?: string }) {
  const s = SHAPE[variant];
  return (
    <div className={`relative bg-black shadow-[0_24px_40px_-18px_rgba(20,26,23,0.55)] ring-[1.5px] ring-[#8d948f]/60 ${s.outer} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`block aspect-[9/19.5] w-full object-cover ${s.screen}`} />
      {variant === "iphone" ? (
        <span aria-hidden className="absolute left-1/2 top-[2.6%] h-[2.1%] w-[26%] -translate-x-1/2 rounded-full bg-black" />
      ) : (
        <span aria-hidden className="absolute left-1/2 top-[2.4%] aspect-square w-[4%] -translate-x-1/2 rounded-full bg-black" />
      )}
    </div>
  );
}
