export interface WorkflowStep {
  title: string;
  detail?: string;
}

export interface WorkflowDecision {
  question: string;
  yes: string;
  no: string;
  /** Render the decision block after this 0-based step index. */
  afterIndex: number;
}

export type DemoKind =
  | "reconciliation-workflow"
  | "statutory-calculator"
  | "budget-workflow"
  | "excel-dashboard";

export interface CaseStudy {
  slug: "reconciliation" | "statutory-analysis" | "budget-controls" | "excel-automation";
  title: string;
  subtitle: string;
  shortSummary: string;
  tags: string[];
  context: string[];
  role: string;
  approach: string[];
  workflow: {
    steps: WorkflowStep[];
    decision?: WorkflowDecision;
  };
  tools: string[];
  controls: string[];
  outcome: string[];
  learning: string;
  confidentiality: string;
  demo: DemoKind;
}

const confidentialityDefault =
  "Illustrative workflow based on professional experience. No confidential employer data is shown.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "reconciliation",
    title: "SAP MM Invoice Reconciliation & Control Workflow",
    subtitle: "Structured validation of procurement and invoice records",
    shortSummary:
      "How I reconcile and validate 30+ high-value invoices monthly — cross-checking purchase orders, goods receipts, and supporting records before records advance in the payment lifecycle.",
    tags: ["SAP MM", "Reconciliation", "Controls", "Excel"],
    context: [
      "Infrastructure and maintenance invoice workflows require accurate validation of procurement information and supporting records before further processing.",
      "Small discrepancies — quantity mismatches, rate differences, missing references — can stall or misdirect a payment workflow if they are not caught early.",
    ],
    role: "Reconciled and validated 30+ high-value invoices monthly using SAP MM transactions including ME22N, MIGO, and MIR7, maintaining audit-ready supporting documentation throughout.",
    approach: [
      "Extracted purchase-order information, goods-receipt records, and invoice data for each case.",
      "Cross-checked quantities, rates, taxes, and alignment with the original purchase order.",
      "Verified supporting documentation was complete, legible, and correctly referenced.",
      "Flagged discrepancies and routed them for clarification with the responsible stakeholders.",
      "Closed each case only when records were consistent, documented, and ready to advance.",
    ],
    workflow: {
      steps: [
        { title: "Purchase / PO Information", detail: "Baseline terms, rates, quantities" },
        { title: "Supporting Documentation", detail: "Records, references, approvals" },
        { title: "Goods / Invoice Records", detail: "Receipts and invoice line items" },
        { title: "Validation", detail: "Cross-check against the PO baseline" },
        { title: "Discrepancy Review", detail: "Compare, investigate, document" },
        { title: "Clarification", detail: "Coordinate with stakeholders" },
        { title: "Audit-Ready Record", detail: "Consistent, complete, traceable" },
      ],
      decision: {
        question: "Discrepancy identified?",
        yes: "Review / Clarify",
        no: "Proceed",
        afterIndex: 4,
      },
    },
    tools: ["SAP MM", "ME22N", "MIGO", "MIR7", "Excel"],
    controls: [
      "Reconciliation",
      "Accuracy",
      "Control discipline",
      "Exception identification",
      "Documentation",
      "Stakeholder coordination",
    ],
    outcome: [
      "Built a repeatable validation sequence that made review consistent rather than ad hoc.",
      "Improved visibility of pending items and exceptions across the monthly cycle.",
      "Enabled structured review of records before they advanced in the payment workflow.",
    ],
    learning:
      "Control is a sequence, not a single check. Writing down the order of validation — and knowing where to look for the exception — is what makes reconciliation reliable.",
    confidentiality: confidentialityDefault,
    demo: "reconciliation-workflow",
  },
  {
    slug: "statutory-analysis",
    title: "Land Management & Statutory Payment Analysis",
    subtitle: "Rules-based review of property and statutory obligations",
    shortSummary:
      "How I approach public-sector property and land-management cases — breaking liability into components, checking each calculation against records and applicable rules, and producing a reviewed liability.",
    tags: ["Statutory Analysis", "Excel", "Documentation Review"],
    context: [
      "Public-sector property and land-management cases involve financial and statutory obligations that must be computed and reviewed against records, documents, and applicable requirements.",
      "Each case can carry several components — property tax, licence fees, interest, penal charges, and damage charges — that must be calculated consistently and documented.",
    ],
    role: "Supported land-management and statutory payment case analysis: gathering records, identifying applicable rules, calculating or reviewing each charge component, and validating figures against supporting documentation.",
    approach: [
      "Assembled historical records, supporting documents, and payment information for each case.",
      "Identified which statutory components applied to the specific case.",
      "Calculated or re-computed each component — licence fees, interest, penalties, damage charges — using consistent rules.",
      "Validated results against records and requirements; flagged discrepancies.",
      "Summarized a reviewed liability with the basis for each figure.",
    ],
    workflow: {
      steps: [
        { title: "Records", detail: "Historical & supporting documents" },
        { title: "Applicable Rules", detail: "Rates, terms, requirements" },
        { title: "Calculations", detail: "Component-by-component computation" },
        { title: "Validation", detail: "Cross-check against records" },
        { title: "Reviewed Liability", detail: "Documented, defensible summary" },
      ],
    },
    tools: ["Excel", "Calculation Models", "Record Review", "Documentation Checks"],
    controls: [
      "Rules-based financial analysis",
      "Attention to detail",
      "Documentation review",
      "Statutory payment analysis",
      "Discrepancy identification",
    ],
    outcome: [
      "Enabled structured, component-by-component review instead of single-figure judgment.",
      "Helped identify inconsistencies between stated figures and supporting records.",
      "Supported accuracy of reviewed liabilities with documented bases.",
    ],
    learning:
      "Statutory analysis is discipline: the same component must be computed the same way every time, and the basis for every figure must be traceable to a record or a rule.",
    confidentiality:
      "The interactive example below uses entirely fictional values for demonstration. No confidential AAI or government information is displayed.",
    demo: "statutory-calculator",
  },
  {
    slug: "budget-controls",
    title: "Budget Verification & Technical Sanction Workflow",
    subtitle: "Approval-readiness controls for infrastructure estimates",
    shortSummary:
      "How I assisted senior engineers in reviewing estimates, calculations, budgets, and documentation so that infrastructure proposals were accurate, complete, and ready before approvals progressed.",
    tags: ["Budget Verification", "Approval Controls", "Estimates"],
    context: [
      "Before public-sector infrastructure estimates proceed, financial and technical checks confirm the proposal is accurate, complete, and supported by available budget.",
      "The workflow gates quality: errors found early are cheap; errors found after approval are expensive.",
    ],
    role: "Assisted senior engineers in reviewing estimates, financial and budget information, calculations, supporting documents, and workflow readiness before approvals progressed.",
    approach: [
      "Checked calculations within estimates for arithmetic and basis errors.",
      "Verified budget availability and alignment against the proposal value.",
      "Confirmed supporting documentation was complete and correctly referenced.",
      "Flagged incomplete or inconsistent submissions for correction before the workflow advanced.",
    ],
    workflow: {
      steps: [
        { title: "Estimate", detail: "Scope, quantities, rates" },
        { title: "Calculation Review", detail: "Arithmetic & basis checks" },
        { title: "Budget Verification", detail: "Availability & alignment" },
        { title: "Supporting Documentation", detail: "Completeness & references" },
        { title: "Technical Sanction", detail: "Technical scrutiny" },
        { title: "Approval", detail: "Gated decision" },
        { title: "Procurement / Execution", detail: "Controlled handover" },
      ],
    },
    tools: ["Estimate Review", "Excel", "Budget Records", "Documentation Checks"],
    controls: [
      "Accuracy",
      "Completeness",
      "Budget availability",
      "Required documentation",
      "Approval readiness",
      "Exception identification",
    ],
    outcome: [
      "Enabled structured review of approval readiness for estimates.",
      "Improved visibility of what was missing or inconsistent before the workflow progressed.",
      "Helped identify discrepancies early, when correction is least disruptive.",
    ],
    learning:
      "Approval workflows protect the organization's money. My role in the chain was to make sure nothing advanced that wasn't accurate, complete, and supported — the control discipline transfers directly to financial operations.",
    confidentiality: confidentialityDefault,
    demo: "budget-workflow",
  },
  {
    slug: "excel-automation",
    title: "Excel Operations Dashboard & Workflow Automation",
    subtitle: "Visibility, prioritization, and structured tracking",
    shortSummary:
      "How I used Advanced Excel — PivotTables, XLOOKUP, conditional formatting, and basic VBA — to turn invoice and payment tracking into a structured, visible operations dashboard.",
    tags: ["Advanced Excel", "Dashboards", "Automation", "MIS Reporting"],
    context: [
      "Tracking invoice lifecycles, payment status, and pending items across many vendors is only manageable when data is structured and visible.",
      "The goal was not just to record data, but to make status, ageing, and exceptions obvious at a glance.",
    ],
    role: "Built Excel-based tracking and basic workflow improvements for invoice lifecycles, payment status, pending items, process bottlenecks, and exceptions, using Advanced Excel techniques and basic VBA exposure.",
    approach: [
      "Designed a standard tracking structure with consistent fields and input validation.",
      "Built dashboards using PivotTables, XLOOKUP / VLOOKUP, and conditional formatting.",
      "Automated recurring formatting and reporting tasks with basic VBA macros.",
      "Summarized status, ageing, and exceptions for structured stakeholder review.",
    ],
    workflow: {
      steps: [
        { title: "Standardise Inputs", detail: "Consistent fields & validation" },
        { title: "Track Lifecycle", detail: "Invoice → processing → payment" },
        { title: "Analyse", detail: "PivotTables, ageing, exceptions" },
        { title: "Automate", detail: "Formatting & reporting with basic VBA" },
        { title: "Report", detail: "Dashboard for structured review" },
      ],
    },
    tools: [
      "Advanced Excel",
      "PivotTables",
      "VLOOKUP",
      "XLOOKUP",
      "Conditional Formatting",
      "Basic VBA exposure",
      "Dashboard reporting",
    ],
    controls: [
      "Data validation",
      "Exception visibility",
      "Process monitoring",
      "Structured reporting",
      "Prioritization of pending items",
    ],
    outcome: [
      "Improved visibility of invoice lifecycles and payment status.",
      "Supported prioritization of pending items and bottlenecks.",
      "Enabled structured review of exceptions rather than manual hunting.",
    ],
    learning:
      "The dashboard below is a demonstration of the same approach I use in tracking work: define the fields, validate the inputs, make status visible, and let the structure surface the exceptions.",
    confidentiality:
      "Sample dataset uses fictional values for demonstration purposes. No employer data is shown.",
    demo: "excel-dashboard",
  },
];