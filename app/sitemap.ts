import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { caseStudies } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const studyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteConfig.domain}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.domain,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...studyRoutes,
  ];
}