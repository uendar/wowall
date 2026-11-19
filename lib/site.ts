export const SITE_NAME = "Wowall";

// Public address of the live site, no trailing slash. Used for the sitemap, canonical links and share previews.
// Change it when you buy a domain (or set NEXT_PUBLIC_SITE_URL in Cloudflare).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowallpaper.endar8.workers.dev").replace(/\/$/, "");

// Shown on the Contact and Privacy pages. Replace with the address you want the public to use.
export const CONTACT_EMAIL = "contact@wowall.example";

// Update this date whenever you change the Privacy page.
export const PRIVACY_UPDATED = "19 November 2026";
