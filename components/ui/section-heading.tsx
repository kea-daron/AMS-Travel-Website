import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Optional trailing element (a "view all" link), right-aligned on desktop. */
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  action,
}: Props) {
  const isLight = tone === "light";
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
            isLight ? "text-brand-200" : "text-brand-600"
          }`}
        >
          <span
            className={`h-px w-6 ${isLight ? "bg-brand-300/60" : "bg-brand-400"}`}
          />
          {eyebrow}
        </span>
        <h2
          className={`mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            isLight ? "text-white" : "text-sand-900"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${
              isLight ? "text-white/70" : "text-sand-600"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
