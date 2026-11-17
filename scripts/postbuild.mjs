// When images are served from R2, don't ship the big image folder with the site.
import fs from "node:fs";
if (process.env.NEXT_PUBLIC_MEDIA_URL) {
  fs.rmSync("out/wallpapers", { recursive: true, force: true });
  console.log("Removed out/wallpapers (images are served from", process.env.NEXT_PUBLIC_MEDIA_URL + ")");
}
