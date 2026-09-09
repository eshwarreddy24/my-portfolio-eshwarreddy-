import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building,
  Calculator,
  ChartColumn,
  ChevronRight,
  CircleCheckBig,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  Fingerprint,
  Gauge,
  Globe,
  GraduationCap,
  Inbox,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Pause,
  Play,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  SunMedium,
  TrendingUp,
  TriangleAlert,
  Users,
  Workflow,
  X,
} from "lucide-react";

export const ICONS = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  award: Award,
  briefcase: Briefcase,
  building: Building,
  calculator: Calculator,
  "bar-chart": ChartColumn,
  "chevron-right": ChevronRight,
  "check-circle": CircleCheckBig,
  clock: Clock,
  database: Database,
  download: Download,
  external: ExternalLink,
  "file-check": FileCheck,
  "file-text": FileText,
  fingerprint: Fingerprint,
  gauge: Gauge,
  globe: Globe,
  "graduation-cap": GraduationCap,
  inbox: Inbox,
  landmark: Landmark,
  layers: Layers,
  linkedin: LinkedinGlyph,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  moon: MoonStar,
  pause: Pause,
  play: Play,
  refresh: RefreshCcw,
  scale: Scale,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  sun: SunMedium,
  trending: TrendingUp,
  "alert-triangle": TriangleAlert,
  users: Users,
  workflow: Workflow,
  x: X,
} as const;

/** Brand glyph — lucide v1 removed brand icons, so this is hand-rolled. */
function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className} aria-hidden="true" />;
}