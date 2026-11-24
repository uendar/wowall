// Turns master files into website files.
// Input:  masters/<slug>-portrait.jpg  and  masters/<slug>-landscape.jpg   (+ optional masters/meta.json)
// Output: public/wallpapers/<slug>/{phone.jpg, computer.jpg, thumb-*.webp, preview-*.webp}
//         data/wallpapers.json
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PHONE = { w: 1440, h: 3200 };
const COMPUTER = { w: 3840, h: 2160 };
const MASTERS = "masters";
const OUT = "public/wallpapers";
const DATA = "data/wallpapers.json";

const meta = fs.existsSync(`${MASTERS}/meta.json`) ? JSON.parse(fs.readFileSync(`${MASTERS}/meta.json`, "utf8")) : {};
const stored = fs.existsSync(DATA) ? JSON.parse(fs.readFileSync(DATA, "utf8")) : { categories: [], wallpapers: [] };
const categories = [...(stored.categories ?? [])];
const bySlug = new Map((stored.wallpapers ?? []).map((w) => [w.slug, w]));

const files = fs.readdirSync(MASTERS);
const slugs = [...new Set(files.filter((f) => /-(portrait|landscape)\.(jpe?g|png)$/i.test(f)).map((f) => f.replace(/-(portrait|landscape)\.\w+$/i, "")))];

const find = (slug, kind) => files.find((f) => new RegExp(`^${slug}-${kind}\\.(jpe?g|png)$`, "i").test(f));
const titleCase = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

for (const slug of slugs) {
  const p = find(slug, "portrait");
  const l = find(slug, "landscape");
  if (!p || !l) { console.warn(`Skipping ${slug}: needs both a -portrait and a -landscape file`); continue; }
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  await sharp(path.join(MASTERS, p)).resize(PHONE.w, PHONE.h, { fit: "cover" }).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(dir, "phone.jpg"));
  await sharp(path.join(MASTERS, l)).resize(COMPUTER.w, COMPUTER.h, { fit: "cover" }).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(dir, "computer.jpg"));
  await sharp(path.join(MASTERS, p)).resize(400, 800, { fit: "cover" }).webp({ quality: 75 }).toFile(path.join(dir, "thumb-portrait.webp"));
  await sharp(path.join(MASTERS, l)).resize(800, 450, { fit: "cover" }).webp({ quality: 75 }).toFile(path.join(dir, "thumb-landscape.webp"));
  await sharp(path.join(MASTERS, p)).resize(800, 1600, { fit: "cover" }).webp({ quality: 80 }).toFile(path.join(dir, "preview-portrait.webp"));
  await sharp(path.join(MASTERS, l)).resize(1600, 900, { fit: "cover" }).webp({ quality: 80 }).toFile(path.join(dir, "preview-landscape.webp"));
  const prev = bySlug.get(slug) ?? {};
  const m = meta[slug] ?? {};
  bySlug.set(slug, {
    slug,
    title: prev.title ?? m.title ?? titleCase(slug),
    category: prev.category ?? m.category ?? "Landscape",
    tags: prev.tags ?? m.tags ?? [],
    addedAt: prev.addedAt ?? new Date().toISOString().slice(0, 10),
  });
  console.log(`Processed ${slug}`);
}
for (const w of bySlug.values()) {
  if (!categories.some((c) => c.toLowerCase() === w.category.toLowerCase())) categories.push(w.category);
}
const list = [...bySlug.values()].sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.slug.localeCompare(b.slug));
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(DATA, JSON.stringify({ categories, wallpapers: list }, null, 2) + "\n");
console.log(`wallpapers.json now has ${list.length} wallpapers`);
