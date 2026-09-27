import type { MetadataRoute } from "next";
import { flagshipCaseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://ari-swerdlow.vercel.app";

  return [
    {
      url: root,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...flagshipCaseStudies.map((caseStudy) => ({
      url: `${root}/work/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
