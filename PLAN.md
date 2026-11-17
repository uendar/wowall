# Wowall – Project Plan and Work Guide

Free wallpaper website. Visitors browse wallpapers, then use two buttons per wallpaper: **Download for phone** and **Download for computer**. Payments and ads come in later phases.

> Rename the site in `lib/site.ts` (currently "Wowall").

---

## 1. Goal and rules

- Build and launch for **$0** using free plans only.
- Free downloads first. Ads and payments come later.
- Only publish images you own or have the licence to redistribute commercially. No fan art, logos, characters or celebrity images.

## 2. Stack (all free)

| Need | Tool | Notes |
|---|---|---|
| Website | Next.js (static export) + Tailwind CSS | No server to pay for |
| Code | GitHub | Cloudflare builds from it |
| Hosting | Cloudflare Pages (free) | Allows commercial use. Do not use Vercel free for a monetized site |
| Image storage | Cloudflare R2 (free tier) | 10 GB free, no download fees |
| Image resizing | `sharp` script on your computer | `npm run process` |
| Catalog | `data/wallpapers.json` | No database needed yet |
| Fonts | Bricolage Grotesque + Instrument Sans | Bundled via npm |

## 3. Project structure

```
app/                 pages (home, /w/[slug])
components/          Browse, Card, DownloadButtons
lib/site.ts          site name
lib/wallpapers.ts    reads JSON, builds image URLs
data/wallpapers.json wallpaper list (title, category, tags)
masters/             your original images (kept on your computer, not in Git)
public/wallpapers/   generated files (not in Git)
scripts/             process.mjs, make-samples.mjs, upload-r2.sh, postbuild.mjs
```

## 4. Current status

- [x] Next.js project with new design (home gallery with Phone/Computer switch, wallpaper page with laptop + phone mockups)
- [x] Two download buttons per wallpaper (phone 1440×3200, computer 3840×2160)
- [x] Resize script (`npm run process`)
- [x] R2 upload script (`npm run upload`)
- [x] 6 demo wallpapers (placeholders)
- [ ] Runs locally on your Mac
- [ ] Pushed to GitHub
- [ ] Deployed on Cloudflare Pages
- [ ] R2 bucket created, images uploaded
- [ ] Real wallpapers added

## 5. Next step: get it running in VS Code (do this first)

1. Open VS Code → **File → Open Folder** → `Desktop/Wallpaper App`.
2. Open the terminal (**Terminal → New Terminal**) and run:
   ```bash
   npm install
   npm run process
   npm run dev
   ```
3. Open http://localhost:3000. Check:
   - The Phone / Computer switch changes the grid shape.
   - A wallpaper page shows the laptop and phone mockups.
   - Both download buttons save a file.
4. If something fails, copy the exact error and send it to Claude.

## 6. Add your own wallpapers

1. Create two versions of each wallpaper:
   - Portrait for phones, at least **2160×3840**: `my-name-portrait.jpg`
   - Landscape for computers, at least **3840×2160**: `my-name-landscape.jpg`
2. Put both files in `masters/`. Use lowercase names with dashes.
3. Optional: add the title and category in `masters/meta.json`:
   ```json
   { "my-name": { "title": "My Name", "category": "Nature" } }
   ```
4. Run `npm run process`. This creates the phone file, computer file and previews in `public/wallpapers/` and updates `data/wallpapers.json`.
5. Edit `data/wallpapers.json` to add `tags` (used by search).
6. To remove the demo wallpapers: delete their entries from `data/wallpapers.json`, and their files in `masters/` and `public/wallpapers/`.

## 7. Put the code on GitHub

```bash
git add .
git commit -m "Initial wallpaper site"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Create the empty repository on github.com first. Do not commit `masters/` or `public/wallpapers/` (already in `.gitignore`).

## 8. Set up R2 image storage (once)

1. Cloudflare dashboard → **R2** → **Create bucket** (e.g. `wowall-media`). It may ask for a payment card to enable R2; you are not charged inside the free tier.
2. Bucket → **Settings → Public access** → enable the `r2.dev` address (later connect your own domain).
3. Bucket → **Settings → CORS policy** → add:
   ```json
   [{"AllowedOrigins":["*"],"AllowedMethods":["GET","HEAD"],"AllowedHeaders":["*"],"MaxAgeSeconds":86400}]
   ```
   The download buttons need this. Replace `*` with your site address once you have it.
4. Log in once: `npx wrangler login`
5. Upload images:
   ```bash
   R2_BUCKET=wowall-media npm run upload
   ```
6. Local test with R2 images: create `.env.local` containing
   ```
   NEXT_PUBLIC_MEDIA_URL=https://pub-xxxxxxxx.r2.dev
   ```
   and restart `npm run dev`.

## 9. Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose your repo.
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`
   - Environment variables: `NODE_VERSION` = `22`, `NEXT_PUBLIC_MEDIA_URL` = your R2 public address (no trailing slash)
3. Deploy. You get a free `yourproject.pages.dev` address. Every `git push` redeploys.

## 10. Roadmap

| Phase | Weeks | Work | Cost |
|---|---|---|---|
| 0 Setup | 1 | Choose niche and brand name. Accounts ready. Create first 30–50 wallpapers. Confirm image rights | $0 |
| 1 Build | 2–4 | Site runs locally, deployed to Pages, R2 connected | $0 |
| 2 Fill and polish | 5–6 | 150+ wallpapers. About, Privacy, Contact pages. Sitemap, SEO titles, analytics | $0 |
| 3 Traffic | 7–10 | Daily Pinterest pins, short videos, themed collections, submit sitemap to Google Search Console | $0 |
| 4 Domain and ads | 11–14 | Buy your own domain (about $10–15 per year, estimate). Cookie banner. Apply to Google AdSense (needs a domain you own). One or two ad slots | Domain only |
| 5 Payments | 15+ | Paid packs / 4K / subscription with a Merchant-of-Record checkout (Lemon Squeezy or Paddle: about 5% + $0.50 per sale). Free buttons stay | Fees per sale |

## 11. Task checklist (work through in order)

**This week**
- [ ] Run the site locally (section 5)
- [ ] Decide niche and final site name
- [ ] Push to GitHub (section 7)
- [ ] Create R2 bucket and upload demo images (section 8)
- [ ] Deploy on Cloudflare Pages (section 9)
- [ ] Download a wallpaper on your real phone and laptop from the live site

**Next**
- [ ] Create 30 real wallpapers (portrait + landscape each) and process them
- [ ] Remove demo wallpapers
- [ ] Add About, Privacy, Contact pages (ask Claude to build them)
- [ ] Add sitemap, robots.txt and page metadata
- [ ] Add free analytics (Cloudflare Web Analytics) and Google Search Console
- [ ] Open Pinterest account and post the first pins

**Later**
- [ ] Buy domain, connect to Pages and R2
- [ ] Cookie consent banner, AdSense application
- [ ] Payments for premium packs

## 12. Daily workflow

```bash
npm run dev        # work locally
npm run process    # after adding images to masters/
R2_BUCKET=wowall-media npm run upload   # after processing
git add . && git commit -m "Add wallpapers" && git push   # deploys the site
```

## 13. Costs

- Now through Phase 3: **$0** (stay inside free limits: R2 10 GB ≈ about 1,500 wallpapers at roughly 6 MB each, my estimate).
- Phase 4: domain only.
- Phase 5: payment fees only when you sell.
- Free plans can change. Re-check Cloudflare limits every few months and keep your master files backed up.

## 14. Risks

| Risk | What to do |
|---|---|
| Image copyright | Use only your own or properly licensed images. Keep a record of each image's source |
| AdSense needs your own domain | A `pages.dev` address does not qualify. Buy a domain before applying |
| Low traffic early | Focus on one niche, post on Pinterest daily, publish steadily |
| Privacy law (GDPR) | Privacy policy and cookie banner before ads go live |
| Free-plan limits | Watch usage, keep backups |

## 15. Ask Claude next (copy and paste)

- "Build the About, Privacy and Contact pages for Wowall and add them to the footer."
- "Add sitemap.xml, robots.txt and Open Graph images for each wallpaper."
- "Help me connect the R2 bucket and test the download buttons."
- "Add Cloudflare Web Analytics and a cookie consent banner."
