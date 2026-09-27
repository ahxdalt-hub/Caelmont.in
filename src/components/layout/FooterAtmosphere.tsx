"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { RemoteImage } from "@/components/media/RemoteImage";
import { images } from "@/config/images";

/** useLayoutEffect warns during SSR — only use it in the browser. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Single background image behind the whole closing band (final CTA + footer).
 *
 * The image lives inside the footer but stretches upward to cover a
 * `.closing-cta` section when one directly precedes it, so the pair reads as
 * one continuous surface instead of two stacked copies of the same photo.
 * Decorative only: aria-hidden with an empty alt via the render site.
 */
export function FooterAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const cta = document.querySelector<HTMLElement>(
        "#main > :last-child.closing-cta",
      );
      const height = cta ? Math.ceil(cta.getBoundingClientRect().height) : 0;
      el.style.top = height > 0 ? `-${height}px` : "0px";
    };

    sync();

    const main = document.getElementById("main");
    const observer =
      typeof ResizeObserver !== "undefined" && main
        ? new ResizeObserver(sync)
        : null;
    observer?.observe(main as HTMLElement);
    window.addEventListener("resize", sync);
    document.fonts?.ready.then(sync).catch(() => undefined);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ top: 0 }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
    >
      <RemoteImage
        image={images.ending}
        sizes="100vw"
        className="h-full w-full object-cover opacity-35 filter brightness-110 contrast-105"
      />
      {/* Solid at the top edge (seam-free against whatever precedes the CTA),
          lightest in the middle so the photo reads, darker at the base for
          footer-text contrast. */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night/45 to-night/70" />
    </div>
  );
}
