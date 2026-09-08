import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

interface SeoPage {
  /** Page title (no suffix — template appends name). */
  title: string;
  description: string;
  /** Route path, e.g. "/case-studies/reconciliation". */
  path: string;
}

/**
 * Builds complete per-page metadata (canonical, OG, Twitter, robots)
 * from a single source of truth in siteConfig.
 */
export function buildMetadata({ title: pageTitle, description, path }: SeoPage): Metadata {
  return {
    title: pageTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: path,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [
        {
          url: `${siteConfig.domain}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Operations & Controls portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [`${siteConfig.domain}/opengraph-image`],
    },
  };
}

/**
 * JSON-LD Person structured data. Factual fields only — no employer
 * or financial-services affiliation is asserted.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.domain,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [siteConfig.linkedin],
  knowsAbout: [
    "Operations & Controls",
    "Reconciliation",
    "Financial Analysis",
    "Process Improvement",
    "SAP MM",
    "Procurement Controls",
    "Advanced Excel",
    "Statutory Payment Analysis",
  ],
};