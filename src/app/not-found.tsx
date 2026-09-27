import { ArrowLink } from "@/components/shared/ArrowLink";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="kicker text-stone">
        <span className="text-moss">404</span> — Page not found
      </p>
      <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-ink">
        This page doesn&apos;t exist <span className="font-serif italic">(yet?)</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
        The address may be mistyped, or the page moved while the portfolio grew.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ArrowLink href="/" variant="solid">
          Back to the start
        </ArrowLink>
        <ArrowLink href="/brands" variant="outline">
          Explore the brands
        </ArrowLink>
      </div>
    </section>
  );
}
