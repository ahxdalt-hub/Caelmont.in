import type { Metadata } from "next";
import { siteConfig } from "./site";
import { ogImage } from "./images";

interface PageMetaInput {
  title?: string;
  description?: string;
  /** Route path beginning with "/" ("" for home). */
  path?: string;
  /** Absolute image URL for Open Graph / Twitter cards. */
  image?: string;
}

/** Shared metadata builder so every page ships canonical + OG/Twitter tags. */
export function pageMetadata({ title, description, path = "", image }: PageMetaInput = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const desc = description ?? siteConfig.description;
  const img = image ?? ogImage.src;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [{ url: img, alt: ogImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [img],
    },
  };
}
