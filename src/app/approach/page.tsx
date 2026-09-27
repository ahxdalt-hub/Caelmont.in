import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/shared/PageHeader";
import { principles } from "@/config/approach";
import { pageMetadata } from "@/config/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Approach",
  description:
    "How CAELMONT builds: useful over noisy, focused products, technology with purpose, independent thinking, simple systems, continuous improvement.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
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

      <section className="shell pb-24 md:pb-32">
        <div className="border-t border-ink/10">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.index}
              className={cn("border-b border-ink/10 py-12 md:py-16", i % 2 === 1 && "md:pl-[8.333%]")}
            >
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-2">
                  <p className="font-display text-sm font-semibold tracking-[0.2em] text-moss">
                    {principle.index}
                  </p>
                </div>
                <div className="md:col-span-10">
                  <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {principle.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
                    {principle.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
