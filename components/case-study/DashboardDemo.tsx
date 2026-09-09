"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icons";

interface FictionalRecord {
  id: string;
  vendor: string;
  poStatus: "Open" | "Closed";
  value: number;
  stage: "Validated" | "In Review" | "Clarification" | "Pending Docs";
  pendingDays: number;
  paymentStatus: "Paid" | "In Progress" | "Pending";
  exception: string | null;
}

/** Entirely fictional records — labels show this clearly. */
const records: FictionalRecord[] = [
  { id: "INV-2025-041", vendor: "Meridian Electricals", poStatus: "Open", value: 482000, stage: "Validated", pendingDays: 3, paymentStatus: "Paid", exception: null },
  { id: "INV-2025-046", vendor: "Transcon Builders", poStatus: "Closed", value: 125500, stage: "Validated", pendingDays: 6, paymentStatus: "Paid", exception: null },
  { id: "INV-2025-052", vendor: "Kaveri Hydraulics", poStatus: "Open", value: 260000, stage: "In Review", pendingDays: 12, paymentStatus: "In Progress", exception: "Rate mismatch" },
  { id: "INV-2025-055", vendor: "Orbit Steel Works", poStatus: "Open", value: 845000, stage: "Clarification", pendingDays: 21, paymentStatus: "Pending", exception: "Docs missing" },
  { id: "INV-2025-058", vendor: "Nimbus Plumbing Co.", poStatus: "Closed", value: 96000, stage: "Validated", pendingDays: 2, paymentStatus: "Paid", exception: null },
  { id: "INV-2025-061", vendor: "Surya Cement Traders", poStatus: "Open", value: 310000, stage: "Pending Docs", pendingDays: 34, paymentStatus: "Pending", exception: "PO reference mismatch" },
  { id: "INV-2025-063", vendor: "Apex Lift Services", poStatus: "Open", value: 198000, stage: "In Review", pendingDays: 9, paymentStatus: "In Progress", exception: null },
  { id: "INV-2025-067", vendor: "Vertex Fire Solutions", poStatus: "Closed", value: 74500, stage: "Validated", pendingDays: 5, paymentStatus: "Paid", exception: null },
  { id: "INV-2025-069", vendor: "Nova Paints & Coatings", poStatus: "Open", value: 152000, stage: "Clarification", pendingDays: 17, paymentStatus: "Pending", exception: "Quantity variance" },
  { id: "INV-2025-072", vendor: "Delta Fabrication", poStatus: "Open", value: 435000, stage: "Validated", pendingDays: 8, paymentStatus: "In Progress", exception: null },
  { id: "INV-2025-074", vendor: "Zen HVAC Systems", poStatus: "Open", value: 288500, stage: "In Review", pendingDays: 15, paymentStatus: "Pending", exception: "Duplicate reference" },
  { id: "INV-2025-078", vendor: "TrueLine Security", poStatus: "Open", value: 167000, stage: "Pending Docs", pendingDays: 26, paymentStatus: "Pending", exception: "Docs missing" },
];

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function bucketOf(days: number): number {
  if (days <= 7) return 0;
  if (days <= 15) return 1;
  if (days <= 30) return 2;
  return 3;
}

const BUCKET_LABELS = ["0–7 days", "8–15 days", "16–30 days", "30+ days"];

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>}
    </div>
  );
}

export default function DashboardDemo() {
  const reduced = useReducedMotion();

  const metrics = useMemo(() => {
    const total = records.length;
    const processed = records.filter((r) => r.paymentStatus !== "Pending").length;
    const pending = total - processed;
    const exceptions = records.filter((r) => r.exception !== null).length;
    const avgAgeing = Math.round(records.reduce((s, r) => s + r.pendingDays, 0) / total);
    return { total, processed, pending, exceptions, avgAgeing };
  }, []);

  const buckets = useMemo(() => {
    const counts = [0, 0, 0, 0];
    records.forEach((r) => (counts[bucketOf(r.pendingDays)] += 1));
    return counts.map((count, i) => ({ label: BUCKET_LABELS[i], count }));
  }, []);

  const paymentSplit = useMemo(() => {
    const paid = records.filter((r) => r.paymentStatus === "Paid").length;
    const inProgress = records.filter((r) => r.paymentStatus === "In Progress").length;
    const pending = records.filter((r) => r.paymentStatus === "Pending").length;
    return { paid, inProgress, pending };
  }, []);

  const exceptionSplit = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => {
      if (r.exception) map.set(r.exception, (map.get(r.exception) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const maxBucket = Math.max(...buckets.map((b) => b.count));
  const donutR = 56;
  const donutC = 2 * Math.PI * donutR;
  const processedFrac = metrics.processed / metrics.total;

  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-deep">
        Fictional dashboard demonstration
      </p>

      {/* KPI cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <KpiCard label="Total items" value={String(metrics.total)} sub="records tracked" />
        <KpiCard label="Processed" value={String(metrics.processed)} sub="paid / in progress" />
        <KpiCard label="Pending" value={String(metrics.pending)} sub="awaiting action" />
        <KpiCard label="Exceptions" value={String(metrics.exceptions)} sub="flagged for review" />
        <KpiCard label="Avg ageing" value={`${metrics.avgAgeing} d`} sub="mean pending days" />
      </div>

      {/* Charts */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {/* Ageing distribution */}
        <div className="rounded-xl border border-line bg-card p-5">
          <h4 className="text-sm font-semibold text-ink">Invoice ageing</h4>
          <div className="mt-4 space-y-3">
            {buckets.map((bucket, i) => (
              <div key={bucket.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-soft">{bucket.label}</span>
                  <span className="font-mono tabular-nums text-ink-faint">{bucket.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line/70">
                  <motion.div
                    initial={reduced ? { width: `${(bucket.count / maxBucket) * 100}%` } : { width: 0 }}
                    whileInView={{ width: `${(bucket.count / maxBucket) * 100}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                    className={`h-full rounded-full ${i === 3 ? "bg-ink" : "bg-accent"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing status donut */}
        <div className="rounded-xl border border-line bg-card p-5">
          <h4 className="text-sm font-semibold text-ink">Processing status</h4>
          <div className="mt-2 flex items-center gap-5">
            <svg width="132" height="132" viewBox="0 0 132 132" role="img" aria-label={`${metrics.processed} processed, ${metrics.pending} pending`}>
              <circle cx="66" cy="66" r={donutR} fill="none" className="stroke-line/40" strokeWidth="20" />
              <motion.circle
                cx="66"
                cy="66"
                r={donutR}
                fill="none"
                className="stroke-accent"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={donutC}
                initial={reduced ? { strokeDashoffset: donutC * (1 - processedFrac) } : { strokeDashoffset: donutC }}
                whileInView={{ strokeDashoffset: donutC * (1 - processedFrac) }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                transform="rotate(-90 66 66)"
              />
              <text x="66" y="61" textAnchor="middle" className="fill-ink font-mono" fontSize="16" fontWeight="600">
                {metrics.processed}
              </text>
              <text x="66" y="78" textAnchor="middle" fill="rgb(16 22 47 / 0.47)" fontSize="9">
                of {metrics.total} processed
              </text>
            </svg>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-ink-soft">
                <span className="size-2.5 rounded-full bg-accent" /> Processed ({metrics.processed})
              </p>
              <p className="flex items-center gap-2 text-ink-soft">
                <span className="size-2.5 rounded-full bg-line-strong" /> Pending ({metrics.pending})
              </p>
            </div>
          </div>
        </div>

        {/* Payment status + exceptions */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-line bg-card p-5">
            <h4 className="text-sm font-semibold text-ink">Payment status</h4>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              <motion.span
                initial={reduced ? { width: "0%" } : { width: "0%" }}
                whileInView={{ width: `${(paymentSplit.paid / metrics.total) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-ink"
              />
              <motion.span
                initial={reduced ? { width: "0%" } : { width: "0%" }}
                whileInView={{ width: `${(paymentSplit.inProgress / metrics.total) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="bg-accent"
              />
              <motion.span
                initial={reduced ? { width: "0%" } : { width: "0%" }}
                whileInView={{ width: `${(paymentSplit.pending / metrics.total) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="bg-line-strong"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-ink" /> Paid ({paymentSplit.paid})</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" /> In progress ({paymentSplit.inProgress})</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-line-strong" /> Pending ({paymentSplit.pending})</span>
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-line bg-card p-5">
            <h4 className="text-sm font-semibold text-ink">Exception distribution</h4>
            <ul className="mt-3 space-y-1.5">
              {exceptionSplit.map(([label, count]) => (
                <li key={label} className="flex items-center justify-between gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <Icon name="alert-triangle" className="size-3.5 text-accent" />
                    {label}
                  </span>
                  <span className="font-mono tabular-nums text-ink-faint">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Records table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-card">
        <table className="w-full min-w-[860px] text-sm">
          <caption className="sr-only">Fictional invoice tracking records</caption>
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              {["Invoice ID", "Vendor", "PO Status", "Invoice Value", "Processing Stage", "Pending Days", "Payment Status", "Exception", "Ageing"].map((col) => (
                <th key={col} scope="col" className="px-4 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-ink-faint">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {records.map((record) => (
              <tr key={record.id} className="transition-colors hover:bg-accent-soft/40">
                <td className="px-4 py-3 font-mono text-xs text-ink">{record.id}</td>
                <td className="px-4 py-3 text-ink-soft">{record.vendor}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[0.68rem] ${record.poStatus === "Open" ? "bg-accent-soft text-accent-deep" : "bg-line/60 text-ink-faint"}`}>
                    {record.poStatus}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-ink">{formatINR(record.value)}</td>
                <td className="px-4 py-3 text-ink-soft">{record.stage}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-ink-soft">{record.pendingDays}</td>
                <td className="px-4 py-3 text-ink-soft">{record.paymentStatus}</td>
                <td className="px-4 py-3">
                  {record.exception ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-xs text-accent-deep">
                      {record.exception}
                    </span>
                  ) : (
                    <span className="text-ink-faint">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-ink-faint">{BUCKET_LABELS[bucketOf(record.pendingDays)]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 flex items-start gap-2 border-l-2 border-accent/40 pl-3 font-mono text-xs leading-relaxed text-ink-faint">
        <Icon name="alert-triangle" className="mt-0.5 size-3.5 shrink-0 text-accent" />
        Sample dataset uses fictional values for demonstration purposes. Actual
        experience includes Excel-based tracking and basic workflow automation —
        not this specific data.
      </p>
    </div>
  );
}