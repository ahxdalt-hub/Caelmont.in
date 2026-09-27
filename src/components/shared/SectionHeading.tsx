import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
  className?: string;
}

/** Numbered kicker + display heading + optional lead, used across sections. */
export function SectionHeading({
  index,
  kicker,
  title,
  description,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className={cn("kicker flex items-center gap-3", dark ? "text-fog" : "text-stone")}>
          {index ? <span className={dark ? "text-fern" : "text-moss"}>{index}</span> : null}
          <span>{kicker}</span>
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed", dark ? "text-fog" : "text-stone")}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
