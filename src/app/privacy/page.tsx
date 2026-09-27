import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How CAELMONT handles information on caelmont.in.",
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: "Only what you choose to send us. If you email CAELMONT or use the contact form, we receive your message and the contact details you provide — used solely to read and reply to it. Nothing else.",
  },
  {
    title: "Tracking",
    body: "This website currently runs no analytics, no advertising trackers, and no third-party cookies.",
  },
  {
    title: "External sites",
    body: "Pages on caelmont.in link to external websites — including our ventures' own sites when they launch. Those sites have their own policies, which apply there.",
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
        lead={`How ${siteConfig.name} handles information on ${siteConfig.domain}.`}
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
