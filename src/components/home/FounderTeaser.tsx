import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { FounderProfile } from "@/components/shared/FounderProfile";

export function FounderTeaser() {
  return (
    <section className="border-t border-ink/10 bg-ivory py-24 md:py-32">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="kicker text-stone">
              <span className="text-moss">05</span> — The person behind it
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <FounderProfile variant="full" />
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.06}>
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight text-ink">
              Built by a founder, not a committee.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-stone">
              <p>
                CAELMONT is an independent company in the most literal sense — the
                products are conceived, built, and maintained by the people who
                answer for them. No layers, no hand-offs, no roadmap written by
                committee.
              </p>
              <p>
                That closeness is deliberate: it keeps the distance between an idea
                and a shipped product short, and it keeps every venture honest about
                who it&apos;s for.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18} className="mt-8">
            <ArrowLink href="/about#founder">About the founder</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
