import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, PRIVACY_UPDATED, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE_NAME}`,
  description: `How ${SITE_NAME} handles your data: no accounts, no sign-up, and only the technical data needed to serve the site.`,
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy" intro={`Last updated: ${PRIVACY_UPDATED}`}>
      <p>
        {SITE_NAME} is a free wallpaper site. We keep data collection to a minimum. This page explains what happens
        when you visit.
      </p>

      <h2>What we collect</h2>
      <p>
        We don&apos;t ask for an account, name, or email to browse or download. We don&apos;t run a sign-up form or a
        comment system.
      </p>

      <h2>What our hosting provider sees</h2>
      <p>
        The site and its images are served through Cloudflare. Like any web host, Cloudflare processes technical
        data when you load a page or an image, such as your IP address, browser type, and the page you requested,
        to deliver the site and protect it from abuse.
      </p>

      <h2>What is stored on your device</h2>
      <p>
        The site remembers your choice between Phone and Computer in your browser&apos;s local storage, so it opens
        the way you left it. This stays on your device and is not sent to us. You can clear it in your browser settings.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Cloudflare Web Analytics to count visits and see which pages and wallpapers are popular. Cloudflare
        describes this service as privacy-first: it does not use cookies or local storage for analytics and does
        not track you across other sites. It reports basic information such as pages viewed, referring site,
        country, browser, and device type.
      </p>

      <h2>Advertising</h2>
      <p>
        We may show ads in the future. If we do, we will update this page first and, where the law requires it,
        ask for your consent before any advertising or tracking cookies are used.
      </p>

      <h2>Sharing</h2>
      <p>We don&apos;t sell your personal data. We share it only with the service providers needed to run the site.</p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to ask what data we hold about you or to ask us to delete
        it. Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also the{" "}
        <Link href="/contact/">contact page</Link>.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, we will update the date at the top of this page.</p>
    </PageShell>
  );
}
