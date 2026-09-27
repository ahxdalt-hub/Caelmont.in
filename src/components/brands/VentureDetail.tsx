import type { ReactNode } from "react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { StatusPill } from "@/components/shared/StatusPill";
import { isWebsiteAvailable, type Venture } from "@/config/ventures";
import { cn } from "@/lib/utils";

interface VentureDetailProps {
  venture: Venture;
  index: string;
  /** Mirror the layout for editorial rhythm. */
  flip?: boolean;
}

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="kicker text-stone">{title}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-charcoal">{children}</div>
    </div>
  );
}

/** Full editorial block for one venture, used on /brands. */
export function VentureDetail({ venture, index, flip = false }: VentureDetailProps) {
  return (
    <article id={venture.slug} className="scroll-mt-24">
      <div className="border-t border-ink/10">
        <div className="shell grid gap-12 py-20 md:grid-cols-12 md:gap-14 md:py-28">
          {/* Identity + image — pinned on desktop so the visuals hold while
              the details scroll past. */}
          <div
            className={cn(
              "relative md:col-span-5 md:sticky md:top-24 md:self-start",
              flip && "md:order-2",
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-0 hidden select-none font-display text-[6.5rem] font-medium leading-none tracking-tight text-ink/[0.06] md:block"
            >
              {index}
            </span>
            <Reveal>
              <p className="kicker text-stone">
                <span className="text-moss">{index}</span> — {venture.category}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              {/* xl not md: PROSVENTA at text-6xl overflows its 5-col track
                  between 768–1023px — a brand name must never clip. */}
              <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink xl:text-6xl">
                {venture.name}
              </h2>
            </Reveal>
            {venture.nameNote ? (
              <Reveal delay={0.08}>
                <p className="mt-3 max-w-sm text-xs leading-relaxed text-stone">
                  {venture.nameNote}
                </p>
              </Reveal>
            ) : null}
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-sm font-serif text-xl italic leading-snug text-ink">
                {venture.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-6">
                <StatusPill status={venture.status} label={venture.statusLabel} />
              </div>
            </Reveal>
            <Reveal delay={0.18} className="mt-10">
              <div className="group">
                <ParallaxImage
                  image={venture.image}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <div className={cn("md:col-span-7", flip && "md:order-1")}>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12">
              <Reveal>
                <Detail title="What it is">{venture.summary}</Detail>
              </Reveal>
              <Reveal delay={0.06}>
                <Detail title="The problem">{venture.problem}</Detail>
              </Reveal>
              <Reveal delay={0.1}>
                <Detail title="Who it's for">{venture.audience}</Detail>
              </Reveal>
              <Reveal delay={0.14}>
                <Detail title="The approach">{venture.approach}</Detail>
              </Reveal>
            </div>

            <Reveal delay={0.16} className="mt-12">
              <div className="border-t border-ink/10 pt-8">
                <h3 className="kicker text-stone">Confirmed capabilities</h3>
                {venture.capabilities.length > 0 ? (
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-12">
                    {venture.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-3 text-sm font-medium leading-relaxed text-charcoal"
                      >
                        {/* Aligned to the first text line, not centered — a
                            centered dot drifts on two-line capabilities. */}
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss"
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-[15px] leading-relaxed text-stone">
                    {venture.capabilitiesNote}
                  </p>
                )}
              </div>
            </Reveal>

            {venture.product ? (
              <Reveal delay={0.2} className="mt-8">
                <div className="border-t border-ink/10 pt-8">
                  <h3 className="kicker text-stone">Current product</h3>
                  <p className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                    {venture.product.name}
                  </p>
                  {venture.product.note ? (
                    <p className="mt-1 text-sm text-stone">{venture.product.note}</p>
                  ) : null}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.24} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                {isWebsiteAvailable(venture) ? (
                  <ArrowLink href={venture.websiteUrl!} external variant="solid">
                    Visit {venture.name}
                  </ArrowLink>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-stone"
                  >
                    {venture.websiteLabel}
                  </span>
                )}
                <ArrowLink href="/updates" variant="text">
                  Follow progress
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}
