import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/shared/PageHeader";
import { analyticsConfig, isAnalyticsEnabled } from "@/config/analytics";
import { pageMetadata } from "@/config/seo";
import { siteConfig, siteDomain } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${siteConfig.name} handles information on ${siteDomain}.`,
  path: "/privacy",
});

/**
 * The analytics paragraph describes only what actually runs — it is driven by
 * src/config/analytics.ts, so enabling or disabling a provider updates this
 * page automatically. We never claim certifications or legal compliance that
 * haven't been verified.
 */
function analyticsBody(): string {
  if (!isAnalyticsEnabled()) {
    return "This website currently runs no analytics, no advertising trackers, and no third-party cookies. If that ever changes, this page will say exactly what is collected before it goes live.";
  }
  const providerName =
    analyticsConfig.provider === "plausible"
      ? "Plausible Analytics"
      : analyticsConfig.provider === "umami"
        ? "Umami"
        : "an analytics provider";
  return `This website measures aggregate, anonymous usage through ${providerName}. The measurement is cookieless: it does not set cookies, does not build individual profiles, and does not attempt to identify visitors. Only page views and broad referrer/device context are counted.`;
}

const sections = [
  {
    title: "Basic operation",
    body: "Browsing this site works without an account and without giving us any personal information. The site sets no cookies of its own, so there is nothing to consent to just by reading.",
  },
  {
    title: "Contact form",
    body: "If you use the contact form, we receive what you type: your name, email, optional company, chosen reason, and message — used solely to read and reply to your message. Submissions are stored securely in our managed database (Supabase) and are reachable only by us. The form also sends your browser's user-agent string, kept alongside the message to help recognize spam bursts.",
  },
  {
    title: "Spam protection",
    body: "The contact form uses a hidden honeypot field and a basic request rate limit to deter automated abuse. Rate limiting reads your IP address transiently to count requests; IP addresses are not stored with submissions and never leave the rate limiter.",
  },
  {
    title: "Email",
    body: "If you email us directly, we receive whatever your email client sends — typically your address and name. We use it only to reply, and we don't add you to any list.",
  },
  {
    title: "Analytics",
    body: analyticsBody(),
  },
  {
    title: "External sites",
    body: `Pages on ${siteDomain} link to external websites — including our ventures' own sites when they launch. Those sites have their own policies, which apply there.`,
  },
  {
    title: "Changes",
    body: "This page describes the site as it exists today. A fuller policy will be published here as CAELMONT's services expand.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title={
          <>
            Privacy,
            <br />
            <span className="font-serif italic">kept simple.</span>
          </>
        }
        lead={`How ${siteConfig.name} handles information on ${siteDomain}.`}
      />

      <section className="shell pb-24 md:pb-32">
        <div className="border-t border-ink/10">
          {sections.map((section, i) => (
            <Reveal
              key={section.title}
              className="grid gap-4 border-b border-ink/10 py-10 md:grid-cols-12 md:py-12"
            >
              <p className="kicker text-stone md:col-span-4">
                <span className="text-moss">{String(i + 1).padStart(2, "0")}</span> —{" "}
                {section.title}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:col-span-8">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-sm text-stone">
          Questions about this page? Write to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink underline decoration-brass/50 underline-offset-4"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
