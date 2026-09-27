export interface Principle {
  index: string;
  /** Short one-word label shown as a small brass kicker next to the title. */
  tag: string;
  title: string;
  body: string;
  /** One concrete sentence on what the principle looks like in daily work. */
  practice: string;
}

/** The six operating principles, shown on /approach and previewed on the home page. */
export const principles: Principle[] = [
  {
    index: "01",
    tag: "Restraint",
    title: "Useful over noisy",
    body: "If a feature doesn't help someone get real work done, it doesn't ship. We would rather build calm, dependable software that earns its place than chase attention with features nobody asked for.",
    practice:
      "Every proposed feature has to justify the space it takes on the screen — and most requests quietly become a \u201cno\u201d.",
  },
  {
    index: "02",
    tag: "Scope",
    title: "Focused products",
    body: "Each venture does one thing well. Narrow scope isn't a limitation — it's how a small independent company builds software that actually holds up in daily use.",
    practice:
      "One problem, one product. Adjacent good ideas go on the backlog, not into the codebase.",
  },
  {
    index: "03",
    tag: "Judgment",
    title: "Technology with purpose",
    body: "AI, automation, local compute — the technology is chosen after the problem, never before. A tool should be as sophisticated as the job requires, and no more.",
    practice:
      "The stack is the smallest one that does the job — AI appears only where it genuinely earns its runtime.",
  },
  {
    index: "04",
    tag: "Conviction",
    title: "Independent thinking",
    body: "We build on our own convictions about how work should flow, not on whatever the market is shouting about this quarter. Independence is the point, not the constraint.",
    practice:
      "No investor roadmap and no quarterly narrative — we ship when the work is ready, not when the calendar says so.",
  },
  {
    index: "05",
    tag: "Legibility",
    title: "Simple systems",
    body: "The best system is the one people keep using. We favor small, legible building blocks that compound over time instead of clever machines that collapse under their own weight.",
    practice:
      "A new user should be able to trace how the product works — small, explainable parts over clever machinery.",
  },
  {
    index: "06",
    tag: "Iteration",
    title: "Continuous improvement",
    body: "Every CAELMONT venture is a work in progress by design. Ship, watch, refine — honest iteration beats a perfect launch plan.",
    practice:
      "Launch is a milestone, not a finish line — each venture refines on its own schedule against real usage.",
  },
];
