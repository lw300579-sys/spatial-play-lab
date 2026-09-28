import type { MetadataRoute } from "next";
import { flagshipCaseStudies } from "@/data/case-studies";

const HOME_UPDATED_AT = new Date("2026-09-26T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://ari-swerdlow.vercel.app";

  return [
    {
      url: root,
      lastModified: HOME_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...flagshipCaseStudies.map((caseStudy) => ({
      url: `${root}/work/${caseStudy.slug}`,
      lastModified: new Date(`${caseStudy.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${root}/evidence`,
      lastModified: HOME_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${root}/privacy`,
      lastModified: HOME_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
