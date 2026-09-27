export interface ImageRef {
  /** Default src (mid-size width). */
  src: string;
  /** Prebuilt responsive srcSet — widths baked into the remote URLs. */
  srcSet: string;
  /** Meaningful alt text, required for every image. */
  alt: string;
  /**
   * Optional CSS object-position (e.g. "50% 30%") controlling which part of
   * the image stays in frame when it's cropped by its container.
   */
  focal?: string;
  /**
   * Optional tonal hint for consumers that stack text on the image:
   * "dark" means the image is light enough to need a dark scrim, "light"
   * the reverse. Informational — components apply their own overlays.
   */
  overlay?: "light" | "dark";
}

interface UnsplashOptions {
  widths?: number[];
  focal?: string;
  overlay?: "light" | "dark";
}

const UNSPLASH = "https://images.unsplash.com";

/**
 * Builds an ImageRef from an Unsplash photo id with responsive widths baked
 * into the URL params. All site imagery lives here so any image can be
 * swapped later by changing one entry.
 */
function unsplash(id: string, alt: string, options: UnsplashOptions = {}): ImageRef {
  const widths = options.widths ?? [600, 900, 1400, 1800];
  const url = (w: number) => `${UNSPLASH}/${id}?q=80&w=${w}&auto=format&fit=crop`;
  const mid = widths[Math.min(2, widths.length - 1)];
  return {
    src: url(mid),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    alt,
    focal: options.focal,
    overlay: options.overlay,
  };
}

export const images = {
  /** Hero atmosphere — bright architectural geometry, warm editorial feel. */
  hero: unsplash(
    "photo-1493397212122-2b85dda8106b",
    "The curved white lattice facade of a modern building against a clear sky",
    { widths: [900, 1400, 2000, 2600], overlay: "dark" },
  ),
  /** Editorial / philosophy imagery — light, calm, a room to think in. */
  editorial: unsplash(
    "photo-1524758631624-e2822e304c36",
    "A bright office lounge with green armchairs and wooden shelving",
    { widths: [600, 900, 1200, 1600] },
  ),
  /**
   * Closing atmosphere — the desk where the work happens, shot at an angle.
   * Rendered at low opacity behind the footer so the end of the page reads as a
   * designed warm surface instead of a flat black block. Decorative only: it is
   * marked aria-hidden and given an empty alt at the render site.
   */
  ending: unsplash(
    "photo-1487017159836-4e23ece2e4cf",
    "A laptop and mouse on a warm walnut desk beside a dark chair",
    { widths: [900, 1400, 2000, 2400], overlay: "dark" },
  ),
  ventures: {
    /**
     * Business systems · software — the product itself, running. Veyra's card
     * has to read as software at a glance, so this is a dashboard screen rather
     * than a meeting room: revenue, active users, and audience — the numbers a
     * client-growth system exists to move. Deliberately brand-free, so no other
     * company's product appears on the page.
     */
    veyra: unsplash(
      "photo-1686061594225-3e92c0cd51b0",
      "A business dashboard on screen showing total revenue and active users by country",
    ),
    prosventa: unsplash(
      "photo-1460925895917-afdab827c52f",
      "A laptop on a wooden desk showing an analytics dashboard",
    ),
    /**
     * Local AI software — the retouch workflow Pixora keeps on-device: an image
     * being edited in a photo editor, with the adjustments panel visible.
     */
    pixora: unsplash(
      "photo-1735197340092-2bd08342f1f7",
      "Photo-editing software open on a laptop, a hand pointing at the image being retouched",
    ),
    /**
     * AI · business automation — a friendly 3D robot agent at work on a laptop,
     * matching the venture's conceptual visual language (single agent focused
     * on tasks).
     */
    "ai-business-agents": unsplash(
      "photo-1684369175833-4b445ad6bfb5",
      "A friendly white-and-blue 3D robot working at a laptop with an AI badge",
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
