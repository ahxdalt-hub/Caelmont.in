export interface Principle {
  index: string;
  title: string;
  body: string;
}

/** The six operating principles, shown on /approach and previewed on the home page. */
export const principles: Principle[] = [
  {
    index: "01",
    title: "Useful over noisy",
    body: "If a feature doesn't help someone get real work done, it doesn't ship. We would rather build calm, dependable software that earns its place than chase attention with features nobody asked for.",
  },
  {
    index: "02",
    title: "Focused products",
    body: "Each venture does one thing well. Narrow scope isn't a limitation — it's how a small independent company builds software that actually holds up in daily use.",
  },
  {
    index: "03",
    title: "Technology with purpose",
    body: "AI, automation, local compute — the technology is chosen after the problem, never before. A tool should be as sophisticated as the job requires, and no more.",
  },
  {
    index: "04",
    title: "Independent thinking",
    body: "We build on our own convictions about how work should flow, not on whatever the market is shouting about this quarter. Independence is the point, not the constraint.",
  },
  {
    index: "05",
    title: "Simple systems",
    body: "The best system is the one people keep using. We favor small, legible building blocks that compound over time instead of clever machines that collapse under their own weight.",
  },
  {
    index: "06",
    title: "Continuous improvement",
    body: "Every CAELMONT venture is a work in progress by design. Ship, watch, refine — honest iteration beats a perfect launch plan.",
  },
];
