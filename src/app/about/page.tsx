import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { FounderProfile } from "@/components/shared/FounderProfile";
import { PageHeader } from "@/components/shared/PageHeader";
import { images } from "@/config/images";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { venturesInOrder } from "@/config/ventures";

export const metadata = pageMetadata({
  title: "About",
  description:
    "CAELMONT is an independent technology company building focused software products and ventures. Learn what we do and why we build this way.",
  path: "/about",
});

const beliefs = [
  "A portfolio, not a platform — every venture stands on its own.",
  "Products built around real problems, not around trends.",
  "One company, several brands — one standard of quality.",
  "Independent by design — answerable to the work itself.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title={
          <>
            Independent,
            <br />
            <span className="font-serif italic">on purpose.</span>
          </>
        }
        lead={siteConfig.description}
      />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker text-stone">
                <span className="text-moss">01</span> — What CAELMONT is
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-soft">
                <p>
                  CAELMONT is an independent technology company — not one big
                  platform, but a small portfolio of software ventures. Each one is
                  formed around a specific problem and operated as its own brand,
                  with its own product and its own audience.
                </p>
                <p>
                  The model is simple: find a problem worth solving, build the
                  smallest serious product that solves it, then keep refining it
                  until it earns its keep. Some ventures ship quickly; others take
                  the time they need. All of them are built to outlast the trend
                  cycle.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {beliefs.map((line, i) => (
                  <li key={line} className="bg-paper p-5">
                    <p className="font-display text-xs font-semibold tracking-[0.18em] text-moss">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{line}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-bleed interlude — a lone ridge above the fog, carrying the page's
          thesis. Slow scroll parallax behind a night-toned scrim. The image is
          decorative: aria-hidden, empty alt. */}
      <section aria-label="What we hold to" className="relative">
        <div className="relative flex min-h-[58vh] items-end overflow-hidden bg-night text-paper md:min-h-[72vh]">
          <ParallaxImage
            image={{ ...images.aboutBackdrop, alt: "" }}
            sizes="100vw"
            fill
            mode="panel"
            travel={12}
            className="opacity-90"
            overlayClassName="bg-gradient-to-t from-night via-night/30 to-night/60"
          />
          <div className="shell relative z-10 pb-16 pt-44 md:pb-24 md:pt-56">
            <Reveal>
              <p className="kicker flex items-center gap-3 text-fog">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
                The standard
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                Every venture is built to{" "}
                <span className="font-serif italic text-brass">outlast</span> the
                trend cycle.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-ivory py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker text-stone">
                <span className="text-moss">02</span> — Why it exists
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.8vw,3rem)] font-medium leading-[1.1] tracking-tight text-ink">
                Most software is built to win markets. We build it to{" "}
                <span className="font-serif italic">remove friction</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-ink-soft">
                <p>
                  Between the bloated all-in-one suites and the weekend experiments
                  lies a gap: focused tools, built seriously, that do exactly what
                  they promise. Every CAELMONT venture lives in that gap.
                </p>
                <p>
                  Independence keeps that honest. There&apos;s no investor deck to
                  feed and no quarterly narrative to serve — a product either works
                  for the people using it, or we keep working on it until it does.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {venturesInOrder().map((venture) => (
                  <Link
                    key={venture.slug}
                    href={`/brands#${venture.slug}`}
                    className="group inline-flex items-baseline gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-moss" />
                    <span className="font-display font-medium tracking-tight">
                      {venture.name}
                    </span>
                    <span className="text-stone">{venture.statusLabel}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="founder" className="shell scroll-mt-24 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker text-stone">
                <span className="text-moss">03</span> — The founder
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <FounderProfile variant="full" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-stone">
                The founder&apos;s name, background, and links will be published
                here, along with the story of how CAELMONT&apos;s ventures came to
                be. Until then, the work speaks first.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
