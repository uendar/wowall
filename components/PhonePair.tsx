import PhoneFrame from "@/components/PhoneFrame";

// The same wallpaper on an iPhone-style phone (front) and a Samsung-style phone (behind, a little higher).
// Place inside a `relative` box; both phones sit at its bottom-right corner.
export default function PhonePair({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <>
      <PhoneFrame
        variant="samsung"
        src={src}
        className="absolute bottom-8 right-[21%] z-10 w-[18%] transition duration-300 group-hover:-translate-y-1 sm:bottom-11 sm:right-[20%]"
      />
      <PhoneFrame
        variant="iphone"
        src={src}
        alt={alt}
        className="absolute bottom-5 right-5 z-20 w-[18%] transition duration-300 group-hover:-translate-y-1.5 sm:bottom-7 sm:right-8"
      />
    </>
  );
}
