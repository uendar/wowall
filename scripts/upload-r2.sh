#!/usr/bin/env bash
# Uploads public/wallpapers/** to your Cloudflare R2 bucket.
# Usage: R2_BUCKET=my-bucket npm run upload      (first run: npx wrangler login)
set -euo pipefail
: "${R2_BUCKET:?Set R2_BUCKET, e.g. R2_BUCKET=wowall-media npm run upload}"
cd public
find wallpapers -type f | while read -r f; do
  case "$f" in
    *.jpg) type="image/jpeg" ;;
    *.webp) type="image/webp" ;;
    *) continue ;;
  esac
  echo "Uploading $f"
  npx wrangler r2 object put "$R2_BUCKET/$f" --file "$f" --content-type "$type" --remote
done
echo "Done."
