import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { principles } from "@/config/approach";

export function ApproachPreview() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="04"
          kicker="Approach"
          title="Principles over process."
          description="A short set of rules that every CAELMONT venture is held to — from the first sketch to the thousandth user."
        />
        <Reveal delay={0.15} className="pb-1">
          <ArrowLink href="/approach">How we build</ArrowLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3">
        {principles.slice(0, 3).map((principle, i) => (
          <Reveal
            key={principle.index}
            delay={0.08 * i}
            className="bg-paper p-8 transition-colors duration-500 hover:bg-ivory"
          >
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-moss">
              {principle.index}
            </p>
            <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink">
              {principle.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone">{principle.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
