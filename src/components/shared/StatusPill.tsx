import type { VentureStatus } from "@/config/ventures";
import { cn } from "@/lib/utils";

const dotColor: Record<VentureStatus, { light: string; dark: string }> = {
  "in-development": { light: "bg-moss", dark: "bg-fern" },
  "coming-soon": { light: "bg-stone", dark: "bg-fog" },
};

interface StatusPillProps {
  status: VentureStatus;
  /** Override the default label derived from status. */
  label?: string;
  dark?: boolean;
  className?: string;
}

/** Small status badge for venture states. */
export function StatusPill({ status, label, dark = false, className }: StatusPillProps) {
  const defaultLabel = status === "in-development" ? "In development" : "Coming soon";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
        dark ? "border-paper/20 text-fog" : "border-ink/15 text-stone",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", dotColor[status][dark ? "dark" : "light"])}
      />
      {label ?? defaultLabel}
    </span>
  );
}
