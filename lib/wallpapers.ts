import data from "@/data/wallpapers.json";

export type Wallpaper = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  addedAt: string;
};

export const wallpapers = data.wallpapers as Wallpaper[];
// All known categories live in data/wallpapers.json. Only those with at least one wallpaper are shown on the site.
export const allCategories = data.categories as string[];
export const categories = [...new Set([...allCategories, ...wallpapers.map((w) => w.category)])]
  .filter((c) => wallpapers.some((w) => w.category === c))
  .sort();
export const getWallpaper = (slug: string) => wallpapers.find((w) => w.slug === slug);

// Where images are served from. Empty = this site's /wallpapers folder (local dev).
// In production set NEXT_PUBLIC_MEDIA_URL to your Cloudflare R2 public address.
const MEDIA = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(/\/$/, "");

export const files = (slug: string) => {
  const base = `${MEDIA}/wallpapers/${slug}`;
  return {
    phone: `${base}/phone.jpg`,
    computer: `${base}/computer.jpg`,
    thumbPortrait: `${base}/thumb-portrait.webp`,
    thumbLandscape: `${base}/thumb-landscape.webp`,
    previewPortrait: `${base}/preview-portrait.webp`,
    previewLandscape: `${base}/preview-landscape.webp`,
  };
};
