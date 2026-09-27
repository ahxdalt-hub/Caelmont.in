import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/config/seo";
import { updates } from "@/config/updates";

export const metadata = pageMetadata({
  title: "Updates",
  description:
    "Company updates from CAELMONT — launches, milestones, and notes from building, published as they happen.",
  path: "/updates",
});

export default function UpdatesPage() {
  return (
    <>
      <PageHeader
        kicker="Updates"
        title={
          <>
            Company
            <br />
            <span className="font-serif italic">updates.</span>
          </>
        }
        lead="Milestones, launches, and notes from CAELMONT — published here as things ship. Nothing curated, nothing inflated."
      />

      <section className="border-t border-ink/10 bg-ivory py-20 md:py-28">
        <div className="shell">
          {updates.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="kicker text-stone">Archive</p>
                <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  Nothing published — <span className="font-serif italic">yet.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-stone">
                  CAELMONT is heads-down building. When there&apos;s news worth
                  sharing — launches, milestones, notes from the workshop — it will
                  appear here first.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <ArrowLink href="/brands" variant="solid">
                    See what we&apos;re building
                  </ArrowLink>
                  <ArrowLink href="/contact" variant="outline">
                    Ask a question
                  </ArrowLink>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="divide-y divide-ink/10">
              {updates.map((update) => (
                <li key={update.slug} className="py-8">
                  <article>
                    <p className="kicker text-stone">{update.date}</p>
                    <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink">
                      {update.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone">
                      {update.excerpt}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
