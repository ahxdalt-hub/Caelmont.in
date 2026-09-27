/** Shared easing — a soft, expensive-feeling glide used across site motion. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fixed "viewport margin" for whileInView reveals: elements start animating
 * a little before they enter the viewport for a calmer feel.
 */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -72px 0px" } as const;
