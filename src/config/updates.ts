export interface UpdateItem {
  slug: string;
  title: string;
  /** ISO date string (YYYY-MM-DD), rendered on the page. */
  date: string;
  excerpt: string;
}

/**
 * Company updates feed. Empty for now — publish items here as they happen
 * and the /updates page renders them automatically (with an elegant empty
 * state until then).
 */
export const updates: UpdateItem[] = [];
