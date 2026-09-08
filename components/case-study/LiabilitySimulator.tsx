"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icons";

interface Scenario {
  id: string;
  name: string;
  description: string;
  rows: Array<{ component: string; basis: string; amount: number }>;
}

/**
 * Entirely fictional scenarios. The interaction demonstrates HOW a
 * rules-based liability review is structured — not real case values.
 */
const scenarios: Scenario[] = [
  {
    id: "standard",
    name: "Standard licence case",
    description: "Base licence fee, all obligations current.",
    rows: [
      { component: "Licence Fee", basis: "Fictional annual licence rate × 12 months", amount: 240000 },
      { component: "Interest", basis: "Nil — payments current", amount: 0 },
      { component: "Penalty", basis: "Nil — no default", amount: 0 },
      { component: "Damage Charges", basis: "Nil — no recorded damage", amount: 0 },
    ],
  },
  {
    id: "delayed",
    name: "Delayed payment case",
    description: "Licence fee settled late; interest and penalty apply.",
    rows: [
      { component: "Licence Fee", basis: "Fictional annual licence rate × 12 months", amount: 240000 },
      { component: "Interest", basis: "Fictional 12% p.a. × 14 months on unpaid fee", amount: 33600 },
      { component: "Penalty", basis: "Fictional 10% of base licence fee", amount: 24000 },
      { component: "Damage Charges", basis: "Nil — no recorded damage", amount: 0 },
    ],
  },
  {
    id: "damage",
    name: "Damage + penalty case",
    description: "Recovered premises with recorded damage; charges computed.",
    rows: [
      { component: "Licence Fee", basis: "Fictional prorated licence fee (10 months)", amount: 185000 },
      { component: "Interest", basis: "Fictional 12% p.a. × 6.5 months", amount: 12450 },
      { component: "Penalty", basis: "Fictional 10% of base fee — delayed settlement", amount: 18500 },
      { component: "Damage Charges", basis: "Fictional assessed damage from inspection", amount: 26300 },
    ],
  },
];

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function LiabilitySimulator() {
  const [selected, setSelected] = useState<Scenario>(scenarios[0]);
  const reduced = useReducedMotion();
  const total = selected.rows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-deep">
        Interactive analysis — fictional data
      </p>

      {/* Scenario selector */}
      <div className="mt-5 grid gap-2 sm:grid-cols-3" role="group" aria-label="Select fictional scenario">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === selected.id;
          return (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(scenario)}
              className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? "border-accent bg-accent-soft shadow-card"
                  : "border-line bg-card hover:border-accent/40"
              }`}
            >
              <span className={`block text-sm font-semibold ${isActive ? "text-accent-deep" : "text-ink"}`}>
                {scenario.name}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-ink-faint">
                {scenario.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Liability table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-line bg-card">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Fictional statutory liability breakdown for the selected scenario
          </caption>
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              <th scope="col" className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                Component
              </th>
              <th scope="col" className="hidden px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint sm:table-cell">
                Basis (fictional)
              </th>
              <th scope="col" className="px-4 py-3 text-right font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {selected.rows.map((row, i) => (
              <motion.tr
                key={`${selected.id}-${row.component}`}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <td className="px-4 py-3 font-medium text-ink">{row.component}</td>
                <td className="hidden px-4 py-3 text-xs text-ink-faint sm:table-cell">{row.basis}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-ink-soft">
                  {row.amount === 0 ? "—" : formatINR(row.amount)}
                </td>
              </motion.tr>
            ))}
            <tr className="bg-accent-soft/60">
              <td className="px-4 py-3 font-semibold text-accent-deep" colSpan={2}>
                Total calculated liability
              </td>
              <td className="px-4 py-3 text-right font-mono text-base font-semibold tabular-nums text-accent-deep">
                {formatINR(total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Analytical flow */}
      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper px-4 py-3 font-mono text-xs text-ink-soft sm:text-sm">
        <span className="rounded bg-card px-2 py-1 border border-line">Records</span>
        <span className="text-accent">+</span>
        <span className="rounded bg-card px-2 py-1 border border-line">Applicable Rules</span>
        <span className="text-accent">+</span>
        <span className="rounded bg-card px-2 py-1 border border-line">Calculations</span>
        <span className="text-accent">+</span>
        <span className="rounded bg-card px-2 py-1 border border-line">Validation</span>
        <span className="text-accent">=</span>
        <span className="rounded bg-accent px-2 py-1 font-semibold text-white">Reviewed Liability</span>
      </div>

      <p className="mt-5 flex items-start gap-2 border-l-2 border-accent/40 pl-3 font-mono text-xs leading-relaxed text-ink-faint">
        <Icon name="alert-triangle" className="mt-0.5 size-3.5 shrink-0 text-accent" />
        Illustrative example using fictional data. No confidential AAI or
        government information is displayed.
      </p>
    </div>
  );
}