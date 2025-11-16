import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.sortalgo.space/sitemap.xml",
    host: "https://www.sortalgo.space",
  };
}
