"use client";
/* eslint-disable @next/next/no-img-element -- remote images with prebuilt srcset; Next's optimizer is disabled for Cloudflare Workers (see next.config.ts) */
import { useState } from "react";
import type { ImageRef } from "@/config/images";
import { cn } from "@/lib/utils";

interface RemoteImageProps {
  image: ImageRef;
  /** CSS sizes hint matching the rendered slot, e.g. "(min-width: 768px) 56vw, 100vw". */
  sizes?: string;
  className?: string;
  /** Above-the-fold images should set this to skip lazy loading. */
  priority?: boolean;
}

/**
 * Plain <img> with a prebuilt responsive srcSet.
 *
 * Next.js image optimization is disabled for this deployment (Cloudflare
 * Workers via @opennextjs/cloudflare) — responsive sizing and modern formats
 * are handled by the remote image URLs themselves (see src/config/images.ts).
 *
 * If the remote image fails to load, a quiet tonal placeholder takes its
 * place — the layout keeps its shape and no broken-image chrome is shown.
 * An optional `focal` (object-position) from the config decides which part
 * of the image stays in frame.
 */
export function RemoteImage({
  image,
  sizes = "100vw",
  className,
  priority = false,
}: RemoteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn(
          "h-full w-full bg-gradient-to-br from-charcoal via-stone/40 to-charcoal",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={image.src}
      srcSet={image.srcSet || undefined}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      style={image.focal ? { objectPosition: image.focal } : undefined}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
