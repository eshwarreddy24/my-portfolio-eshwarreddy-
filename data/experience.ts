export interface ExperienceArea {
  title: string;
  icon: "file-check" | "shield-check" | "calculator" | "scale" | "users" | "bar-chart";
  points: string[];
}

export interface Experience {
  org: string;
  location: string;
  role: string;
  period: string;
  summary: string;
}

export const aaiExperience: Experience & { areas: ExperienceArea[] } = {
  org: "Airports Authority of India",
  location: "Bengaluru, Karnataka",
  role: "Graduate Apprentice — Civil Engineering Wing",
  period: "Sep 2025 — Present",
  summary:
    "Operational and financial-control responsibilities across SAP MM invoice validation, procurement administration, infrastructure estimates, budget verification, technical-sanction workflows, statutory payment analysis, tender and quotation reviews, documentation checks, and stakeholder coordination.",
  areas: [
    {
      title: "Financial Operations",
      icon: "file-check",
      points: [
        "Reconciled and validated 30+ high-value infrastructure and maintenance invoices monthly using SAP MM (ME22N, MIGO, MIR7).",
        "Cross-checked invoice line items against purchase orders, goods receipts, and supporting records.",
        "Maintained accurate, audit-ready supporting documentation throughout the workflow.",
      ],
    },
    {
      title: "Controls & Compliance",
      icon: "shield-check",
      points: [
        "Performed quality and compliance checks across quotations, tenders, invoices, financial calculations, and procurement documents.",
        "Flagged inconsistencies, exceptions, and missing records; coordinated clarifications with stakeholders.",
      ],
    },
    {
      title: "Budget & Approvals",
      icon: "calculator",
      points: [
        "Assisted senior engineers in reviewing infrastructure estimates, budgets, and technical-sanction documentation.",
        "Checked important calculations and documentation before approval workflows progressed.",
      ],
    },
    {
      title: "Statutory Analysis",
      icon: "scale",
      points: [
        "Supported analysis of land-management and statutory payment cases.",
        "Calculated and/or reviewed property tax, licence fees, interest, penal and damage charges, and other applicable statutory amounts against records and requirements.",
      ],
    },
    {
      title: "Vendor & Procurement Operations",
      icon: "users",
      points: [
        "Managed procurement administration and compliance screening for 150+ MSME / vendor partners via GeM and SAP MM.",
        "Supported tender workflows, quotation analysis, and commercial discussions.",
      ],
    },
    {
      title: "Data & Automation",
      icon: "bar-chart",
      points: [
        "Built Excel dashboards and basic workflow improvements for invoice lifecycles, payment status, pending items, bottlenecks, and exceptions.",
        "Prepared MIS-style reports supporting process monitoring and review.",
      ],
    },
  ],
};

export const organoExperience: Experience & { points: string[] } = {
  org: "Organo Eco Habitats Pvt Ltd",
  location: "Hyderabad, Telangana",
  role: "Graduate Engineer Trainee — Metaphor Interiors",
  period: "Nov 2024 — Jun 2025",
  summary:
    "Cross-functional project tracking and analysis role supporting design-to-delivery coordination across interior project teams.",
  points: [
    "Monitored cross-functional project milestones using ClickUp and identified workflow bottlenecks.",
    "Escalated timeline risks to senior leadership with structured status summaries.",
    "Coordinated multi-city stakeholder schedules, travel, accommodation, and site logistics.",
    "Analyzed project data using Advanced Excel to support decision-making.",
    "Co-authored a microclimate case study showing a 17°C surface-temperature reduction; presented findings in PowerPoint to senior leaders.",
  ],
};