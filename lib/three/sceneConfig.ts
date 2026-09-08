export interface NodeConfig {
  label: string;
  position: [number, number, number];
  kind: "center" | "satellite";
}

export const SATELLITE_LABELS = [
  "SAP MM",
  "Reconciliation",
  "Excel",
  "Controls",
  "Risk",
  "Procurement",
  "Payments",
  "Analytics",
  "Automation",
] as const;

/** Places the center node plus labelled satellites in a loose front arc. */
export function buildNetworkNodes(mobile: boolean): NodeConfig[] {
  const n = SATELLITE_LABELS.length;
  const radius = mobile ? 2.55 : 3.9;

  const nodes: NodeConfig[] = [
    { label: "OPERATIONS & CONTROLS", position: [0, 0, 0], kind: "center" },
  ];

  SATELLITE_LABELS.forEach((label, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5;
    const angle = -Math.PI * 0.62 + t * Math.PI * 1.24;
    const x = Math.cos(angle) * radius * 1.25;
    const y = Math.sin(angle * 1.6) * radius * 0.42;
    const z = Math.sin(angle * 2.1) * radius * 0.45;
    nodes.push({ label, position: [x, y, z], kind: "satellite" });
  });

  return nodes;
}

export function getParticleCount(mobile: boolean): number {
  return mobile ? 110 : 300;
}

/** World-space sprite heights for labels. */
export const LABEL_HEIGHT = { center: 0.58, satellite: 0.4 } as const;