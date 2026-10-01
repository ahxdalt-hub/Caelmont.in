import type { Metadata } from "next";
import { siteConfig } from "./site";
import { ogImage } from "./images";

interface PageMetaInput {
  title?: string;
  /**
   * Full, already-branded title used verbatim for the `<title>` element and the
   * social cards, bypassing the layout's `%s — CAELMONT` title template. Only the
   * home page needs it: its title does not follow the "Page — CAELMONT" pattern.
   */
  absoluteTitle?: string;
  description?: string;
  /** Route path beginning with "/" ("" for home). */
  path?: string;
  /** Absolute image URL for Open Graph / Twitter cards. */
  image?: string;
}

/**
 * Shared metadata builder so every page ships canonical + OG/Twitter tags.
 *
 * `title` is spread in only when the page supplies one. Returning
 * `title: undefined` from a page's `metadata` is not the same as omitting it —
 * it overrides the layout's `title.default` and strips the `<title>` element
 * from the document, so a page that means to inherit the layout's title must
 * leave the key out entirely.
 *
 * A page that names itself with `title` gets the layout's `%s — CAELMONT`
 * template and its matching social title. `absoluteTitle` bypasses the template
 * and is used verbatim for both the `<title>` element and the social cards — the
 * home page, whose title does not follow the "Page — CAELMONT" pattern.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path = "",
  image,
}: PageMetaInput = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    absoluteTitle ??
    (title ? `${title} — ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`);
  const desc = description ?? siteConfig.description;
  const img = image ?? ogImage.src;

  return {
    ...(absoluteTitle
      ? { title: { absolute: absoluteTitle } }
      : title
        ? { title }
        : {}),
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
