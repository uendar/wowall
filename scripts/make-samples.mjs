// Creates demo master images so you can test the pipeline. Replace with your own art later.
import sharp from "sharp";
import fs from "node:fs";

const palettes = [
  ["midnight-gradient", "Midnight Gradient", "Abstract", ["#0f2027", "#2c5364"]],
  ["sunset-haze", "Sunset Haze", "Abstract", ["#ff7e5f", "#6a3093"]],
  ["forest-mist", "Forest Mist", "Nature", ["#134e5e", "#71b280"]],
  ["amoled-ember", "AMOLED Ember", "Minimal Dark", ["#000000", "#7a1f1f"]],
  ["ocean-deep", "Ocean Deep", "Nature", ["#0a2342", "#2ca6a4"]],
  ["lavender-fade", "Lavender Fade", "Minimal Light", ["#e0c3fc", "#8ec5fc"]],
];
fs.mkdirSync("masters", { recursive: true });
const svg = (w, h, [a, b], seed) => {
  const m = Math.min(w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${m * 0.06}"/></filter></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<g filter="url(#b)">
<circle cx="${w * (0.25 + seed * 0.12)}" cy="${h * 0.3}" r="${m * 0.32}" fill="${b}" fill-opacity="0.85"/>
<circle cx="${w * 0.75}" cy="${h * (0.65 + seed * 0.05)}" r="${m * 0.28}" fill="#ffffff" fill-opacity="0.35"/>
<circle cx="${w * 0.5}" cy="${h * 0.85}" r="${m * 0.22}" fill="${a}" fill-opacity="0.9"/>
</g></svg>`;
};
let i = 0;
for (const [slug, , , colors] of palettes) {
  i++;
  await sharp(Buffer.from(svg(2160, 3840, colors, i % 3))).jpeg({ quality: 92 }).toFile(`masters/${slug}-portrait.jpg`);
  await sharp(Buffer.from(svg(3840, 2160, colors, i % 3))).jpeg({ quality: 92 }).toFile(`masters/${slug}-landscape.jpg`);
}
// Starter metadata so titles and categories are set for the demo files.
const meta = Object.fromEntries(palettes.map(([slug, title, category]) => [slug, { title, category }]));
fs.writeFileSync("masters/meta.json", JSON.stringify(meta, null, 2));
console.log(`Created ${palettes.length} demo wallpapers in masters/`);
