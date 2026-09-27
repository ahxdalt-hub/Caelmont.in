import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

const facts = [
  { value: "04", label: "Ventures in the portfolio" },
  { value: "03", label: "In active development" },
  { value: "01", label: "In early exploration" },
];

export function Intro() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="kicker text-stone">
              <span className="text-moss">01</span> — Who we are
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone">
              {siteConfig.positioning}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(1.8rem,3.8vw,3.1rem)] font-medium leading-[1.12] tracking-tight text-ink">
              We build <span className="font-serif italic">focused</span> software
              businesses — each one a brand of its own, each one solving a problem
              worth solving.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone">
              Instead of one sprawling platform, CAELMONT grows a small portfolio of
              ventures: practical software that helps people work, sell, and create
              with less friction. Every product is developed in-house and operated
              independently — with its own name, its own audience, and its own
              website when it&apos;s ready for one.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <Reveal key={fact.value} delay={0.08 * i} className="bg-paper p-6">
                <p className="font-display text-3xl font-medium tracking-tight text-ink">
                  {fact.value}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-stone">
                  {fact.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
