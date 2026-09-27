import { images, type ImageRef } from "./images";

export type VentureStatus = "in-development" | "coming-soon";

export interface Venture {
  /** Stable identifier — equal to the URL slug and the /brands anchor id. */
  id: string;
  /** URL slug — also used as the /brands anchor id. */
  slug: string;
  /** Brand name as shown publicly. */
  name: string;
  /** One-line category descriptor. */
  category: string;
  /** Short editorial tagline. */
  tagline: string;
  /** What the venture is. */
  summary: string;
  /** The real-world problem it addresses. */
  problem: string;
  /** Who it's for. */
  audience: string;
  /** How it tackles the problem. */
  approach: string;
  /** Capabilities only as far as they are actually confirmed — no invention. */
  capabilities: string[];
  /** Shown instead of the list when capabilities aren't settled yet. */
  capabilitiesNote?: string;
  /** The concrete product, if one is defined. */
  product?: { name: string; note?: string };
  status: VentureStatus;
  statusLabel: string;
  /** null = no site exists yet (never invent a URL). */
  websiteUrl: string | null;
  /** Label shown where the website link would be. */
  websiteLabel: string;
  /** Note about the working title, when the name is descriptive only. */
  nameNote?: string;
  /** Whether the venture is highlighted in shorter, featured listings. */
  featured: boolean;
  /** Display order (ascending) across every venture listing. */
  order: number;
  image: ImageRef;
}

/** A venture has a live product website exactly when a URL is configured. */
export function isWebsiteAvailable(venture: Venture): boolean {
  return venture.websiteUrl !== null && venture.websiteUrl.trim().length > 0;
}

/** All ventures in their configured display order. */
export function venturesInOrder(): Venture[] {
  return [...ventures].sort((a, b) => a.order - b.order);
}

/** Featured ventures (home page etc.), in display order. */
export function featuredVentures(): Venture[] {
  return venturesInOrder().filter((venture) => venture.featured);
}

export const ventures: Venture[] = [
  {
    id: "veyra",
    slug: "veyra",
    name: "VEYRA",
    category: "Business systems · software",
    tagline: "Client growth systems for independent businesses.",
    summary:
      "A practical software business helping freelancers, consultants, service businesses, and small agencies build better client acquisition, sales, and operational systems.",
    problem:
      "Independent businesses lose momentum in the gaps between tools — leads go cold, follow-ups slip, and operations end up scattered across spreadsheets. Most software assumes a sales team that a solo operator simply doesn't have.",
    audience:
      "Freelancers, consultants, service businesses, and small agencies that run client work end to end.",
    approach:
      "Veyra starts from how independent operators actually work, then builds the system around them — practical workflows for winning clients and running the business, one step at a time.",
    capabilities: [
      "Client acquisition systems",
      "Sales & follow-up workflows",
      "Operational systems for service businesses",
    ],
    product: {
      name: "Veyra Client Growth System",
      note: "Currently in development.",
    },
    status: "in-development",
    statusLabel: "In development",
    websiteUrl: null,
    websiteLabel: "Product website — coming soon",
    featured: true,
    order: 1,
    image: images.ventures.veyra,
  },
  {
    id: "prosventa",
    slug: "prosventa",
    name: "PROSVENTA",
    category: "B2B sales intelligence SaaS",
    tagline: "Find the right prospects — and know what to do next.",
    summary:
      "A sales intelligence platform designed to help businesses discover, research, qualify, and act on high-potential B2B prospects.",
    problem:
      "Outbound is brutal for small teams: prospect lists go stale, research eats entire days, and qualification turns into guesswork. The signals that matter exist — but they're scattered across sources nobody has time to stitch together.",
    audience:
      "Sales teams, agencies, and B2B founders running outbound without a research department.",
    approach:
      "Prosventa compresses the whole research loop — prospect intelligence, ICP scoring, buying signals, recommendations, and automation — into a single workflow that ends with action, not another dashboard.",
    capabilities: [
      "Prospect intelligence",
      "ICP scoring",
      "Buying-signal detection",
      "Recommendations & automation",
    ],
    status: "in-development",
    statusLabel: "In development",
    websiteUrl: null,
    websiteLabel: "Product website — coming soon",
    featured: true,
    order: 2,
    image: images.ventures.prosventa,
  },
  {
    id: "pixora",
    slug: "pixora",
    name: "PIXORA",
    category: "Local AI software",
    tagline: "Better images. Zero uploads.",
    summary:
      "A privacy-focused desktop application for enhancing and upscaling images locally — without requiring users to upload their files to a cloud service.",
    problem:
      "Most AI image tools work by shipping your photos to someone else's servers. For client work, personal archives, and anything sensitive, that's a non-starter — quality shouldn't cost you custody of your own files.",
    audience:
      "Photographers, designers, and anyone who wants stronger images without giving up control of their files.",
    approach:
      "Pixora runs enhancement and upscaling entirely on your machine. Images stay where they belong — on your device — while quality improves where you can see it.",
    capabilities: [
      "On-device image enhancement",
      "Local upscaling — no cloud uploads",
      "Privacy-first architecture",
    ],
    status: "in-development",
    statusLabel: "In development",
    websiteUrl: null,
    websiteLabel: "Product website — coming soon",
    featured: true,
    order: 3,
    image: images.ventures.pixora,
  },
  {
    id: "ai-business-agents",
    slug: "ai-business-agents",
    name: "AI Business Agents",
    category: "AI · business automation SaaS",
    tagline: "Automation for repeatable business work.",
    summary:
      "A planned SaaS focused on AI agents that can handle repeatable business workflows and coordinate automated tasks across business operations.",
    problem:
      "A lot of operational work is repeatable by nature — the same handoffs, updates, and coordination, week after week. Rigid automation breaks the moment a task needs judgment, and hiring for it doesn't scale.",
    audience:
      "Small teams and operators who want dependable automation across everyday business processes.",
    approach:
      "In early exploration. The concept centres on agents designed around specific, repeatable workflows — coordinating automated tasks with clear boundaries across business operations.",
    capabilities: [],
    capabilitiesNote:
      "Capabilities will be documented here as the concept takes shape.",
    status: "coming-soon",
    statusLabel: "Coming soon",
    websiteUrl: null,
    websiteLabel: "Product website — coming soon",
    nameNote:
      "\u201CAI Business Agents\u201D is a descriptive working title — a brand name will be introduced when the venture is formalized.",
    featured: false,
    order: 4,
    image: images.ventures["ai-business-agents"],
  },
];

export function getVenture(slug: string): Venture | undefined {
  return ventures.find((venture) => venture.slug === slug);
}
