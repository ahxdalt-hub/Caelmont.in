"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  duration?: number;
  once?: boolean;
}

/** Scroll-triggered reveal. Renders statically when reduced motion is preferred. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.75,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: VIEWPORT_ONCE.margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
