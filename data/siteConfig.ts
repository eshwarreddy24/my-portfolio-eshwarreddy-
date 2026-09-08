/**
 * Site configuration — the single place to edit personal details.
 * Update these values and the whole site (metadata, footer, contact,
 * structured data) follows automatically.
 */
export const siteConfig = {
  name: "Gali Eshwar Reddy",
  shortName: "Eshwar Reddy",
  headline:
    "Operations & Controls | Financial Analysis | Reconciliation | Process Improvement",
  role: "Operations & Controls Professional",
  location: "Bengaluru, Karnataka, India",
  email: "eshwarreddy.gali@outlook.com",

  /** Replace with your real public LinkedIn profile URL. */
  linkedin: "https://www.linkedin.com/in/PLACEHOLDER_TO_REPLACE",

  /** Resume PDF lives at /public/resume.pdf — just swap the file. */
  resume: "/resume.pdf",
  domain: "https://eshwarreddy.vercel.app",
  ogImage: "/opengraph-image",

  hero: {
    kicker: "Early-career Operations & Controls professional · Bengaluru",
    summary:
      "Early-career operations professional with experience in SAP MM-based reconciliation, financial and procurement workflows, statutory payment analysis, compliance reviews, Advanced Excel, and cross-functional stakeholder coordination at Airports Authority of India.",
    cta: {
      primary: { label: "View Experience", href: "#experience" },
      secondary: { label: "Explore Case Studies", href: "#case-studies" },
      resume: { label: "Download Resume", href: "/resume.pdf" },
      linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/PLACEHOLDER_TO_REPLACE" },
      contact: { label: "Contact", href: "#contact" },
    },
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],

  impactStats: [
    {
      icon: "file-check",
      value: 30,
      suffix: "+",
      label: "High-value invoices reconciled & validated monthly",
    },
    {
      icon: "users",
      value: 150,
      suffix: "+",
      label: "MSME & vendor partners supported through procurement workflows",
    },
    {
      icon: "database",
      value: null,
      suffix: "",
      label: "SAP MM — ME22N, MIGO & MIR7 exposure",
    },
    {
      icon: "sparkles",
      value: null,
      suffix: "",
      label: "Advanced Excel — dashboards, analytics & basic automation",
    },
  ] as const,

  certifications: [
    {
      title: "SAP Certified — Implementation Consultant, SAP Service Cloud Version 2",
      issuer: "SAP",
      note: "Supplementary credential — core positioning remains Operations & Controls.",
      primary: false,
    },
    {
      title: "Entrepreneurship Development",
      issuer: "AIC-SKU — supported by Atal Innovation Mission, NITI Aayog",
      note: "Programme completion in entrepreneurship development.",
      primary: true,
    },
  ],

  education: {
    degree: "Bachelor of Technology — Civil Engineering",
    institution: "Srinivasa Ramanujan Institute of Technology",
    location: "Anantapur, Andhra Pradesh",
    period: "Jan 2020 — May 2024",
    cgpa: "7.59 / 10",
    exposure: [
      "Data Analysis",
      "Project Management",
      "Advanced Excel projects",
      "SAP data / reporting",
      "Basic VBA automation",
    ],
  },

  footer: {
    blurb:
      "Operations & Controls | Financial Analysis | Reconciliation | Process Improvement",
  },
} as const;

export type SiteConfig = typeof siteConfig;