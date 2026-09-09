"use client";

/**
 * Decorative, fully static network graphic. Used as a graceful fallback
 * when WebGL is unavailable or when the user prefers reduced motion.
 * No animation, no JavaScript cost. Colors come from the same CSS variables
 * as the page, so it adapts to light/dark mode automatically.
 */
export default function StaticFallback() {
  const satellites: Array<[number, number, string]> = [
    [560, 150, "SAP MM"],
    [700, 230, "Reconciliation"],
    [760, 360, "Excel"],
    [700, 480, "Controls"],
    [560, 540, "Risk"],
    [420, 470, "Procurement"],
    [360, 340, "Payments"],
    [420, 200, "Analytics"],
    [500, 120, "Automation"],
  ];

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 900 640"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <defs>
        <radialGradient id="sf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(6 95 70)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="rgb(6 95 70)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="560" cy="345" r="150" fill="url(#sf-glow)" />

      {satellites.map(([x, y, label]) => (
        <g key={label}>
          <line
            x1="560"
            y1="345"
            x2={x}
            y2={y}
            stroke="rgb(6 95 70)"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <circle cx={x} cy={y} r="4.5" fill="rgb(6 95 70)" fillOpacity="0.55" />
          <text
            x={x}
            y={y - 14}
            textAnchor="middle"
            fontSize="13"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="600"
            fill="var(--ink)"
            fillOpacity="0.72"
          >
            {label}
          </text>
        </g>
      ))}

      <circle cx="560" cy="345" r="26" fill="#065f46" />
      <circle cx="560" cy="345" r="11" fill="var(--paper)" />
      <text
        x="560"
        y="312"
        textAnchor="middle"
        fontSize="13.5"
        fontWeight="700"
        letterSpacing="1.5"
        fill="var(--ink)"
      >
        OPERATIONS &amp; CONTROLS
      </text>
    </svg>
  );
}
