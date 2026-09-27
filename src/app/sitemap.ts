import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: "monthly" | "weekly" }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/brands", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/approach", priority: 0.7, changeFrequency: "monthly" },
    { path: "/updates", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
