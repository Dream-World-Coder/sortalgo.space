import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://sortalgo.space/sitemap.xml",
    host: "https://sortalgo.space",
  };
}
