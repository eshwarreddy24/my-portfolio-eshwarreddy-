import ScrollReveal from "@/components/motion/ScrollReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <ScrollReveal
      direction="fade"
      className={centered ? "text-center" : ""}
    >
      <p
        className={`font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent ${
          centered ? "flex items-center justify-center gap-3" : "flex items-center gap-3"
        }`}
      >
        <span aria-hidden="true" className="eyebrow-rule" />
        {eyebrow}
        {centered && <span aria-hidden="true" className="eyebrow-rule" />}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-ink-soft ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}