import PhoneFrame from "@/components/PhoneFrame";

// One wallpaper on three screens, in a row: a laptop on the left, then a Samsung-style and an
// iPhone-style phone on the right. All three stand on the same baseline.
export default function DeviceScene({ landscape, portrait, title }: { landscape: string; portrait: string; title?: string }) {
  return (
    <div className="flex items-end gap-[4%]">
      <div className="w-[62%] shrink-0">
        <div className="rounded-[12px] bg-black p-[1.4%] shadow-[0_30px_60px_-30px_rgba(20,26,23,0.55)] ring-[1.5px] ring-[#8d948f]/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={landscape} alt={title ? `${title} on a computer screen` : ""} className="block aspect-video w-full rounded-[6px] object-cover" />
        </div>
        <div className="mx-[-4%] h-2.5 rounded-b-[12px] bg-line sm:h-3" />
      </div>
      <div className="flex flex-1 items-end gap-[10%]">
        <PhoneFrame variant="samsung" src={portrait} className="flex-1" />
        <PhoneFrame variant="iphone" src={portrait} alt={title ? `${title} on a phone screen` : ""} className="flex-1" />
      </div>
    </div>
  );
}
