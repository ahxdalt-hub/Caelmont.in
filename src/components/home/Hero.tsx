"use client";

import { motion, useReducedMotion } from "motion/react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { images } from "@/config/images";
import { siteConfig, siteDomain } from "@/config/site";
import { EASE } from "@/lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-paper">
      <ParallaxImage
        image={images.hero}
        priority
        mode="hero"
        travel={10}
        baseScale={1.25}
        sizes="100vw"
        fill
        overlayClassName="bg-gradient-to-t from-night via-night/45 to-night/10"
      />

      <motion.div
        variants={container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        className="shell relative z-10 pb-14 pt-44 md:pb-20"
      >
        <motion.p variants={item} className="kicker flex items-center gap-3 text-fog">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
          Independent technology company
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-[clamp(3.25rem,10.5vw,9rem)] font-medium leading-[0.95] tracking-[-0.02em]"
        >
          CAELMONT
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <p className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] italic leading-snug">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-fog md:text-base">
              CAELMONT builds focused software businesses around useful technology
              and real-world problems — each one shipped as its own brand, each one
              built to earn its keep.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-3.5 md:col-span-5 md:justify-end">
            <ArrowLink href="/brands" variant="solid" dark>
              Explore our brands
            </ArrowLink>
            <ArrowLink href="/about" variant="outline" dark>
              About CAELMONT
            </ArrowLink>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-fog/70"
        >
          <span>{siteDomain}</span>
          <span className="hidden sm:inline">Four ventures · one company</span>
          <span className="flex items-center gap-3">
            Scroll
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-paper/20">
              <motion.span
                className="absolute inset-x-0 top-0 block h-3 bg-paper/80"
                animate={reduceMotion ? undefined : { y: [-12, 32] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
