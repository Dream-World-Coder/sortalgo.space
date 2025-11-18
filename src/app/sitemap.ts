import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

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

  // read content/chapters file names & remove .md
  const chaptersDir = path.join(process.cwd(), "content", "chapters");

  const chapterSlugs: string[] = fs
    .readdirSync(chaptersDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const chapterRoutes: MetadataRoute.Sitemap = chapterSlugs.map((slug) => ({
    url: `${baseUrl}/chapters/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  return [...staticRoutes, ...chapterRoutes];
}
