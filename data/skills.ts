export interface SkillCategory {
  title: string;
  description: string;
  icon: "shield-check" | "file-check" | "bar-chart" | "layers" | "sparkles";
  skills: string[];
  wide?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Controls & Risk",
    description: "Validation discipline and operational risk awareness.",
    icon: "shield-check",
    skills: [
      "Reconciliation",
      "Quality & Compliance Checks",
      "Exception Identification",
      "Root Cause Analysis",
      "Issue Escalation",
      "Audit-Ready Documentation",
      "Operational Risk Awareness",
      "Control Validation",
      "Process Monitoring",
    ],
  },
  {
    title: "Financial Operations",
    description: "Financial workflow validation across the payment lifecycle.",
    icon: "file-check",
    skills: [
      "Invoice Validation",
      "Budget Verification",
      "Cost / Estimate Review",
      "Statutory Payment Analysis",
      "Procurement-to-Pay Exposure",
      "Payment Lifecycle Monitoring",
      "Quotation Analysis",
      "Procurement Controls",
    ],
  },
  {
    title: "Data & Analytics",
    description: "Structured analysis and reporting with spreadsheets.",
    icon: "bar-chart",
    skills: [
      "Advanced Excel",
      "PivotTables",
      "VLOOKUP",
      "MIS Reporting",
      "Dashboarding",
      "Data Validation",
      "Basic VBA",
    ],
  },
  {
    title: "Enterprise & Workflow Tools",
    description: "Systems used daily in regulated workflows.",
    icon: "layers",
    skills: [
      "SAP MM",
      "ME22N",
      "MIGO",
      "MIR7",
      "GeM Portal",
      "Government e-Office / EDMS",
      "ClickUp",
      "SharePoint",
      "Microsoft Teams",
      "PowerPoint",
    ],
    wide: true,
  },
  {
    title: "Automation & AI",
    description: "Practical productivity automation, not engineering.",
    icon: "sparkles",
    skills: [
      "Basic VBA Macro Automation",
      "Excel-Based Workflow Improvement",
      "Microsoft 365 Copilot",
      "AI-Assisted Research",
      "AI-Assisted Documentation",
      "Productivity Automation",
    ],
  },
];