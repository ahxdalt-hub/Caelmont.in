export interface FounderSocials {
  instagram: string | null;
  github: string | null;
  linkedin: string | null;
  x: string | null;
}

export type SocialPlatform = keyof FounderSocials;

/**
 * Founder profile — placeholders by design.
 *
 * Fill in the real name, biography, portrait URL, and social links here; the
 * FounderProfile component (and every other consumer) degrades gracefully
 * while any of these are empty. No invented name or bio is shipped.
 */
export const founderConfig = {
  name: "",
  role: "Founder",
  bio: "",
  /** Portrait image URL. Leave empty until a real photo exists (a monogram placeholder renders instead). */
  imageUrl: "",
  socials: {
    instagram: null,
    github: null,
    linkedin: null,
    x: null,
  } as FounderSocials,
};

export const socialLabels: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
};
