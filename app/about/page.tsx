import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About - ${SITE_NAME}`,
  description: `${SITE_NAME} is a free wallpaper site. Pick phone or computer and download the right size in one tap.`,
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <PageShell title="About" intro={`${SITE_NAME} is a free wallpaper site with one idea: the right size for your screen, in one tap.`}>
      <p>
        Most wallpaper sites give you one image and leave you to crop it. Here, every wallpaper comes in two versions,
        made on purpose: a tall one for phones and a wide one for computers.
      </p>

      <h2>What you get</h2>
      <ul>
        <li><strong>Phone:</strong> 1440 × 3200 px, portrait.</li>
        <li><strong>Computer:</strong> 3840 × 2160 px, 4K widescreen.</li>
        <li>No account, no sign-up, no watermark.</li>
        <li>New wallpapers added regularly.</li>
      </ul>

      <h2>How to use a wallpaper</h2>
      <p>
        Open a wallpaper, choose <em>Download for phone</em> or <em>Download for computer</em>, then set the saved
        image as your background in your device settings.
      </p>

      <h2>Using the images</h2>
      <p>
        Wallpapers are free for personal use on your own devices. Please don&apos;t resell or redistribute them.
        If you think an image on this site should not be here, see the <Link href="/contact/">contact page</Link> and
        we will look at it promptly.
      </p>
    </PageShell>
  );
}
