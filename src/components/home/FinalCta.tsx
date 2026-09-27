import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { siteConfig } from "@/config/site";

/** Shared closing CTA band, reused on multiple pages (except /contact itself). */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <div className="shell py-24 md:py-36">
        <Reveal>
          <p className="kicker flex items-center gap-3 text-fog">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em]">
            Let&apos;s build something{" "}
            <span className="font-serif italic text-brass">useful</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-fog">
            Questions, ideas, partnerships — or just curiosity about what a venture
            is up to. We read everything and answer when it matters.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ArrowLink href="/contact" variant="solid" dark>
              Get in touch
            </ArrowLink>
            <ArrowLink
              href={`mailto:${siteConfig.email}`}
              external
              variant="outline"
              dark
              arrow={false}
            >
              {siteConfig.email}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
