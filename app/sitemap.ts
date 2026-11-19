import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { wallpapers } from "@/lib/wallpapers";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["about", "privacy", "contact"].map((p) => ({
    url: `${SITE_URL}/${p}/`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));
  const newest = wallpapers.map((w) => w.addedAt).sort().at(-1);
  return [
    { url: `${SITE_URL}/`, lastModified: newest, changeFrequency: "weekly", priority: 1 },
    ...wallpapers.map((w) => ({
      url: `${SITE_URL}/w/${w.slug}/`,
      lastModified: w.addedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...pages,
  ];
}
