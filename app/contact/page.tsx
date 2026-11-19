import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact - ${SITE_NAME}`,
  description: `Get in touch with ${SITE_NAME}: feedback, wallpaper requests, or a copyright concern.`,
};

export default function Contact() {
  return (
    <PageShell title="Contact" intro="The fastest way to reach us is email.">
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-display text-2xl font-semibold">{CONTACT_EMAIL}</a>
      </p>

      <h2>What to write about</h2>
      <ul>
        <li>A bug, or a download that doesn&apos;t work. Tell us your device and browser.</li>
        <li>A wallpaper you would like to see.</li>
        <li>Business or partnership questions.</li>
      </ul>

      <h2>Copyright concerns</h2>
      <p>
        If you believe an image on {SITE_NAME} infringes your rights, email us the link to the wallpaper page and
        explain why. We will review it and remove the image if the claim is valid.
      </p>

      <p>We read every message. Replies may take a few days.</p>
    </PageShell>
  );
}
