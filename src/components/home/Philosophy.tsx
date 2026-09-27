import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { images } from "@/config/images";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-paper md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-8 select-none font-display text-[26vw] font-semibold leading-none tracking-tight text-paper/[0.035]"
      >
        CAELMONT
      </div>

      <div className="shell relative grid gap-14 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal>
            <p className="kicker text-fog">
              <span className="text-fern">03</span> — Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-tight">
              Software should{" "}
              <span className="font-serif italic text-fern">solve a real problem</span>{" "}
              for a real person. Everything else is decoration.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-fog">
              CAELMONT exists because useful software doesn&apos;t need to be loud. We
              build small companies around problems we understand — tools that help
              someone sell better, work smoother, or create freely without giving
              something up. If a product can&apos;t explain its purpose in one
              sentence, it doesn&apos;t ship.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10">
              <ArrowLink href="/approach" dark>
                Read our approach
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="self-center md:col-span-5">
          <Reveal delay={0.1}>
            <ParallaxImage
              image={images.editorial}
              sizes="(min-width: 768px) 38vw, 100vw"
              className="aspect-[4/5] w-full"
              overlayClassName="bg-night/10"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-fog/70">
              A room to think in — and to build from.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
