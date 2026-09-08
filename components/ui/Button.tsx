import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icons";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg" | "sm";
  /** Renders an arrow / download / external icon on the right. */
  icon?: IconName | "none";
  /** Adds the HTML download attribute (used for the resume PDF). */
  download?: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep active:bg-accent-deep",
  secondary:
    "border border-line-strong bg-card text-ink hover:border-accent hover:text-accent-deep",
  ghost: "text-ink-soft hover:text-accent-deep underline-offset-4 hover:underline",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.95rem]",
};

export default function Button({
  href,
  children,
  variant = "secondary",
  size = "md",
  icon = "none" as IconName,
  download = false,
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          name={icon as IconName}
          className={`size-4 shrink-0 transition-transform duration-200 ${
            icon === "download"
              ? "group-hover:translate-y-0.5"
              : "group-hover:translate-x-0.5"
          }`}
        />
      )}
    </>
  );

  const isExternal = external || href.startsWith("http");
  const isAsset = href.startsWith("/resume");
  const isHash = href.startsWith("#");

  if (isExternal || isHash || isAsset) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(download ? { download: "Gali-Eshwar-Reddy-Resume.pdf" } : {})}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}