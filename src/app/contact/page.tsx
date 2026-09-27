import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with CAELMONT — questions, ideas, and partnerships. Reach us at ${siteConfig.email}.`,
  path: "/contact",
});

const topics = [
  "Partnership or collaboration",
  "Questions about a venture",
  "Press & media",
  "Feedback on a product",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Say
            <br />
            <span className="font-serif italic">hello.</span>
          </>
        }
        lead="Questions, ideas, partnerships — or curiosity about a venture. Email is the fastest way to reach CAELMONT, and the form below lands in the same place."
      />

      <section className="shell grid gap-14 pb-24 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-5">
          <Reveal>
            <p className="kicker text-stone">Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 block break-words font-display text-xl font-medium tracking-tight text-ink underline decoration-brass/50 underline-offset-8 transition-colors hover:decoration-brass md:text-2xl"
            >
              {siteConfig.email}
            </a>
            <p className="mt-3 text-sm text-stone">
              The current contact address for CAELMONT and all of its ventures.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-ink/10 pt-8">
              <p className="kicker text-stone">Good topics</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                {topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-moss" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
