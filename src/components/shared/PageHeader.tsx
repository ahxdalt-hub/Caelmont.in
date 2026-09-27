import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  lead?: string;
  dark?: boolean;
  className?: string;
}

/** Editorial page header: kicker, oversized display title, lead paragraph. */
export function PageHeader({ kicker, title, lead, dark = false, className }: PageHeaderProps) {
  return (
    <section className={cn("shell pb-14 pt-36 md:pb-20 md:pt-48", dark && "bg-night text-paper", className)}>
      <Reveal>
        <p className={cn("kicker flex items-center gap-3", dark ? "text-fog" : "text-stone")}>
          <span
            aria-hidden="true"
            className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-brass" : "bg-moss")}
          />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em]">
          {title}
        </h1>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-7 max-w-2xl text-base leading-relaxed md:text-lg",
              dark ? "text-fog" : "text-stone",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
