import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/Card";
import DownloadButtons from "@/components/DownloadButtons";
import { files, getWallpaper, wallpapers } from "@/lib/wallpapers";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return wallpapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWallpaper(slug);
  if (!w) return {};
  return {
    title: `${w.title} wallpaper - free phone and 4K download`,
    description: `Download ${w.title} (${w.category}) free, sized for your phone or your computer.`,
  };
}

export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  const w = getWallpaper(slug);
  if (!w) notFound();
  const f = files(slug);
  const more = wallpapers.filter((x) => x.category === w.category && x.slug !== slug).slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <Link href="/" className="text-sm text-muted hover:text-ink">&larr; All wallpapers</Link>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        {/* Device stage */}
        <div className="rise relative rounded-[32px] bg-surface p-6 pb-14 sm:p-12 sm:pb-20">
          <div className="mx-auto w-[88%]">
            <div className="rounded-[14px] bg-ink p-[1.6%] shadow-[0_30px_60px_-30px_rgba(20,26,23,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.previewLandscape} alt={`${w.title} on a computer screen`} className="aspect-video w-full rounded-[7px] object-cover" />
            </div>
            <div className="mx-[-5%] h-3 rounded-b-[14px] bg-line" />
          </div>
          <div className="absolute bottom-6 right-6 w-[24%] rounded-[2.2rem] bg-ink p-[1.6%] shadow-[0_30px_60px_-20px_rgba(20,26,23,0.6)] sm:bottom-9 sm:right-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.previewPortrait} alt={`${w.title} on a phone screen`} className="aspect-[9/19] w-full rounded-[1.8rem] object-cover" />
          </div>
        </div>

        <div className="rise lg:pt-6" style={{ animationDelay: "120ms" }}>
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">{w.title}</h1>
          <p className="mt-3 text-muted">{w.category}{w.tags.length ? `, ${w.tags.join(", ")}` : ""}</p>
          <div className="mt-8"><DownloadButtons slug={slug} phoneUrl={f.phone} computerUrl={f.computer} /></div>
          <p className="mt-5 text-sm text-muted">Free for personal use. Saved as a high-quality JPEG.</p>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">More in {w.category}</h2>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {more.map((m) => (<li key={m.slug}><Card w={m} mode="phone" /></li>))}
          </ul>
        </section>
      )}
    </main>
  );
}
