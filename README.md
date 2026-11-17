# Wowall 

Free wallpaper site. Static Next.js export on Cloudflare Pages. Images in Cloudflare R2. No database: data is `data/wallpapers.json`.

## Run locally
    npm install
    npm run dev            # http://localhost:3000

## Add wallpapers
1. Put two files per wallpaper in `masters/`:
   `my-name-portrait.jpg` (at least 2160x3840) and `my-name-landscape.jpg` (at least 3840x2160).
   Optional: set title/category in `masters/meta.json`, or edit `data/wallpapers.json` afterwards.
2. `npm run process`  -> creates phone/computer files and previews in `public/wallpapers/`, updates the JSON.
3. `R2_BUCKET=your-bucket npm run upload`  -> uploads them to R2 (first run: `npx wrangler login`).
4. Commit and push `data/wallpapers.json`. Cloudflare Pages rebuilds the site.

## Set up R2 storage (once, free tier 10 GB)
1. Cloudflare dashboard -> R2 -> Create bucket (e.g. `wowall-media`).
2. Bucket -> Settings -> Public access -> enable the r2.dev address (later: connect your own domain).
3. Bucket -> Settings -> CORS policy, add:
   [{"AllowedOrigins":["*"],"AllowedMethods":["GET","HEAD"],"AllowedHeaders":["*"],"MaxAgeSeconds":86400}]
   (replace * with your site address once you have it). Needed for the one-tap download buttons.
4. Pages project -> Settings -> Environment variables: NEXT_PUBLIC_MEDIA_URL = the r2.dev address (no trailing slash).

## Deploy on Cloudflare Pages
Build command `npm run build`, output directory `out`, env NODE_VERSION=22.
