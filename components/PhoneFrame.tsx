// A phone-shaped frame around a wallpaper: modern bezel, slightly rounded corners, and a camera island.
// Radii are percentages so the corners stay in proportion at any size. Width comes from the className.
export default function PhoneFrame({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`relative rounded-[14%/6.7%] bg-ink p-[3.2%] shadow-[0_30px_60px_-20px_rgba(20,26,23,0.6)] ring-1 ring-white/10 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="aspect-[9/19.5] w-full rounded-[11.5%/5.3%] object-cover" />
      <span aria-hidden className="absolute left-1/2 top-[2.6%] h-[2.4%] w-[27%] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}
