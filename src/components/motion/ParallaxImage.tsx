"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ImageRef } from "@/config/images";
import { RemoteImage } from "@/components/media/RemoteImage";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  image: ImageRef;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** hero: pinned offsets for full-viewport images; panel: enter/exit drift. */
  mode?: "hero" | "panel";
  /** Vertical drift as % of container height (kept under the scale overflow). */
  travel?: number;
  /** Base scale so the drifting image never reveals its edges. */
  baseScale?: number;
  overlayClassName?: string;
}

const OFFSETS = {
  hero: ["start start", "end start"],
  panel: ["start end", "end start"],
} as const;

/** Slow scroll parallax on a cover image, with an overlay slot. */
export function ParallaxImage({
  image,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  mode = "panel",
  travel = 8,
  baseScale = 1.18,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...OFFSETS[mode]],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? { scale: baseScale } : { y, scale: baseScale }}
      >
        <RemoteImage
          image={image}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
        />
      </motion.div>
      {overlayClassName ? (
        <div aria-hidden="true" className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
    </div>
  );
}
