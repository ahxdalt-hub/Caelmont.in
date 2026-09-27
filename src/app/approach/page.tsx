import { FinalCta } from "@/components/home/FinalCta";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { PageHeader } from "@/components/shared/PageHeader";
import { principles } from "@/config/approach";
import { images } from "@/config/images";
import { pageMetadata } from "@/config/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Approach",
  description:
    "How CAELMONT builds: useful over noisy, focused products, technology with purpose, independent thinking, simple systems, continuous improvement.",
  path: "/approach",
});

/** Three facts that frame the principles before they're listed. */
const facts = [
  {
    value: "06",
    label: "Principles",
    note: "Short enough to remember. Strict enough to bite.",
  },
  {
    value: "01",
    label: "Filter",
    note: "Every feature, release, and rewrite has to pass through it.",
  },
  {
    value: "00",
    label: "Hype features",
    note: "If it doesn't help real work, it doesn't go out the door.",
  },
];

/** What the principles translate to, from the user's side of the screen. */
const forYou = [
  {
    title: "Fewer features, held to a higher bar",
    body: "What's on the screen is what survived the filter. You'll spend your time working, not turning things off.",
  },
  {
    title: "No surprise pivots",
    body: "Direction comes from conviction and real usage — not from whatever the industry is loudly rebranding itself around this quarter.",
  },
  {
    title: "Quiet, steady updates",
    body: "Releases arrive when they're ready and make the product visibly better — honest iteration over a perfect launch plan.",
  },
];

export default function ApproachPage() {
  return (
    <>
      {/* One composed surface: the whole page shares a single faint parallax
          backdrop — a warm sand dune tonally matched to the paper/sand
          palette, kept deliberately subtle so the copy holds focus. The page
          is tall, so the travel is deliberately small: enough to feel alive,
          never enough to reveal the image edges at its base scale.
          Decorative: aria-hidden, empty alt. */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <ParallaxImage
            image={{ ...images.approachBackdrop, alt: "" }}
            sizes="100vw"
            fill
            travel={3}
            className="opacity-[0.12]"
            overlayClassName="bg-gradient-to-b from-paper/90 via-paper/60 to-paper/90"
          />
        </div>

        <div className="relative z-10">
          <PageHeader
            kicker="Approach"
            title={
              <>
                How CAELMONT
                <br />
                <span className="font-serif italic">builds.</span>
              </>
            }
            lead="Every CAELMONT venture is held to the same short set of principles. They aren't posters on a wall — they're the filter each product decision has to pass."
          />

          {/* Framing strip — the numbers behind the idea, before the list. */}
          <section aria-label="The filter in numbers" className="shell pb-16 md:pb-20">
            <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3">
              {facts.map((fact, i) => (
                <Reveal
                  key={fact.label}
                  delay={0.08 * i}
                  className="bg-paper/80 p-6 backdrop-blur-[2px] md:p-8"
                >
                  <p className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
                    {fact.value}
                  </p>
                  <p className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-moss">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{fact.note}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* The six principles — one hairline ledger, each row revealing on
              scroll with a ghost numeral, a brass tag, and an "in practice"
              line that turns the idea into a concrete behaviour. */}
          <section aria-label="The six principles" className="shell pb-24 md:pb-32">
            <div className="border-t border-ink/10">
              {principles.map((principle, i) => (
                <Reveal
                  key={principle.index}
                  className={cn(
                    "border-b border-ink/10 transition-colors duration-500 hover:bg-ivory/60",
                    i % 2 === 1 && "md:pl-[8.333%]",
                  )}
                >
                  <div className="grid gap-4 py-12 md:grid-cols-12 md:gap-10 md:py-16">
                    <div className="md:col-span-2">
                      <p
                        aria-hidden="true"
                        className="font-display text-5xl font-medium leading-none tracking-tight text-ink/10 md:text-6xl"
                      >
                        {principle.index}
                      </p>
                      <p className="sr-only">Principle {principle.index}</p>
                    </div>
                    <div className="md:col-span-10">
                      <p className="kicker flex items-center gap-2.5 text-brass">
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
                        {principle.tag}
                      </p>
                      <h2 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.08] tracking-tight text-ink">
                        {principle.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
                        {principle.body}
                      </p>
                      <p className="mt-5 max-w-2xl border-l-2 border-moss/30 pl-4 font-serif text-base italic leading-relaxed text-moss md:text-lg">
                        In practice: {principle.practice}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Full-bleed interlude — the quiet forest light at full strength, the
          page's single visual exhale, with a slow scroll parallax and a
          night-toned scrim. Decorative: aria-hidden, empty alt. */}
      <section aria-label="The bar we hold" className="relative">
        <div className="relative flex min-h-[56vh] items-end overflow-hidden bg-night text-paper md:min-h-[68vh]">
          <ParallaxImage
            image={{ ...images.approachInterlude, alt: "" }}
            sizes="100vw"
            fill
            mode="panel"
            travel={12}
            className="opacity-90"
            overlayClassName="bg-gradient-to-t from-night via-night/50 to-night/70"
          />
          <div className="shell relative z-10 pb-16 pt-44 md:pb-24 md:pt-56">
            <Reveal>
              <p className="kicker flex items-center gap-3 text-fog">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
                The bar
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                We&apos;d rather ship one tool people{" "}
                <span className="font-serif italic text-brass">keep using</span> than
                ten they try once.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Landing the idea — the same principles, read from the user's side. */}
      <section className="border-b border-ink/10 bg-ivory py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker text-stone">
                <span className="text-moss">What this means</span> — for you
              </p>
              <h2 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-tight text-ink">
                Six principles, read from{" "}
                <span className="font-serif italic">your side</span> of the screen.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {forYou.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={0.08 * i}
                  className="bg-ivory p-6 transition-colors duration-500 hover:bg-paper md:p-7"
                >
                  <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <ArrowLink href="/brands">See it in the ventures</ArrowLink>
                <ArrowLink href="/updates">Follow the iteration</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
