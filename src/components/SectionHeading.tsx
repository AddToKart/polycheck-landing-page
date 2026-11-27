import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  children?: ReactNode;
  /** For headings that sit on the deep maroon band. */
  onBand?: boolean;
}

export default function SectionHeading({ label, title, children, onBand = false }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 md:mb-14 max-w-2xl">
      <span className="label mb-5">{label}</span>
      <h2 className={`font-lora font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-[-0.015em] ${onBand ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {children ? (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${onBand ? "text-white/85" : "text-muted"}`}>{children}</p>
      ) : null}
    </Reveal>
  );
}
