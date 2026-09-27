export interface ImageRef {
  /** Default src (mid-size width). */
  src: string;
  /** Prebuilt responsive srcSet — widths baked into the remote URLs. */
  srcSet: string;
  /** Meaningful alt text, required for every image. */
  alt: string;
}

const UNSPLASH = "https://images.unsplash.com";

/**
 * Builds an ImageRef from an Unsplash photo id with responsive widths baked
 * into the URL params. All site imagery lives here so any image can be
 * swapped later by changing one entry.
 */
function unsplash(id: string, alt: string, widths: number[] = [600, 900, 1400, 1800]): ImageRef {
  const url = (w: number) => `${UNSPLASH}/${id}?q=80&w=${w}&auto=format&fit=crop`;
  const mid = widths[Math.min(2, widths.length - 1)];
  return {
    src: url(mid),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    alt,
  };
}

export const images = {
  /** Hero atmosphere — warm, architectural, editorial. */
  hero: unsplash(
    "photo-1493397212122-2b85dda8106b",
    "Warm evening light curving across a modern architectural facade",
    [900, 1400, 2000, 2600],
  ),
  /** Editorial / philosophy imagery — the workshop feel. */
  editorial: unsplash(
    "photo-1524758631624-e2822e304c36",
    "A tidy wooden desk with a laptop and notebook in soft natural light",
    [600, 900, 1200, 1600],
  ),
  /** Studio imagery — building, making, focus. */
  studio: unsplash(
    "photo-1531973576160-7125cd663d86",
    "A quiet studio office with people working late at their desks",
    [600, 900, 1200, 1600],
  ),
  /** Decorative texture — circuitry. */
  circuit: unsplash(
    "photo-1518770660439-4636190af475",
    "Macro photograph of a printed circuit board",
    [600, 900, 1400, 1800],
  ),
  ventures: {
    veyra: unsplash(
      "photo-1552664730-d307ca884978",
      "A small team mapping client work on a whiteboard during a planning session",
    ),
    prosventa: unsplash(
      "photo-1551288049-bebda4e38f71",
      "Sales analytics charts glowing on a dark dashboard screen",
    ),
    pixora: unsplash(
      "photo-1516035069371-29a1b244cc32",
      "A camera resting on a desk in low, moody light",
    ),
    "ai-business-agents": unsplash(
      "photo-1550751827-4bd374c3f58b",
      "Abstract network of connected points on a dark background",
    ),
  } satisfies Record<string, ImageRef>,
  /**
   * Founder portrait — intentionally empty until a real photo is configured.
   * The FounderProfile component renders an elegant monogram placeholder
   * while this is blank.
   */
  founder: {
    src: "",
    srcSet: "",
    alt: "Portrait of the CAELMONT founder",
  } satisfies ImageRef,
};

/** Open Graph / social share image. */
export const ogImage = images.hero;
