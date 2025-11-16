import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sortalgo.space";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chapters`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const chapterSlugs = [
    "selection-sort",
    "bubble-sort",
    "insertion-sort",
    "merge-sort",
    "quick-sort",
    "heap-sort",
    "complexity-analysis",
    "introduction",
  ];

  const chapterRoutes: MetadataRoute.Sitemap = chapterSlugs.map((slug) => ({
    url: `${baseUrl}/chapters/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  return [...staticRoutes, ...chapterRoutes];
}
