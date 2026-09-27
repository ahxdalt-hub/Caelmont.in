import Link from "next/link";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatusPill } from "@/components/shared/StatusPill";
import { ventures, type Venture } from "@/config/ventures";
import { cn } from "@/lib/utils";

export function FeaturedVentures() {
  return (
    <section className="border-y border-ink/10 bg-ivory py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="02"
            kicker="Ventures"
            title="What we're building."
            description="A small portfolio of independent brands — each venture is developed separately, with its own product, its own audience, and its own roadmap."
          />
          <Reveal delay={0.15} className="pb-1">
            <ArrowLink href="/brands">All brands</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {ventures.map((venture, i) => (
            <VenturePanel
              key={venture.slug}
              venture={venture}
              flip={i % 2 === 1}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenturePanel({
  venture,
  flip,
  index,
}: {
  venture: Venture;
  flip: boolean;
  index: string;
}) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
      <Reveal className={cn("md:col-span-7", flip && "md:order-2")}>
        <Link
          href={`/brands#${venture.slug}`}
          className="group block overflow-hidden"
          aria-label={`${venture.name} — ${venture.category}`}
        >
          <ParallaxImage
            image={venture.image}
            sizes="(min-width: 768px) 56vw, 100vw"
            className="aspect-[16/11] w-full"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </Link>
      </Reveal>

      <div className={cn("md:col-span-5", flip && "md:order-1")}>
        <Reveal>
          <p className="kicker text-stone">
            <span className="text-moss">{index}</span> — {venture.category}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            <Link
              href={`/brands#${venture.slug}`}
              className="transition-colors hover:text-moss"
            >
              {venture.name}
            </Link>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 font-serif text-lg italic text-ink-soft">{venture.tagline}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">{venture.summary}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusPill status={venture.status} label={venture.statusLabel} />
            {venture.product ? (
              <span className="text-xs uppercase tracking-[0.14em] text-stone">
                {venture.product.name}
              </span>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={0.22} className="mt-7">
          <ArrowLink href={`/brands#${venture.slug}`}>Explore {venture.name}</ArrowLink>
        </Reveal>
      </div>
    </article>
  );
}
