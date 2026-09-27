import { cn } from "@/lib/utils";

/** CAELMONT brand mark — a broken circle with a brass point. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <g transform="rotate(35 32 32)">
        <circle
          cx="32"
          cy="32"
          r="15"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="70 25"
        />
      </g>
      <circle cx="47.5" cy="16.5" r="4.5" fill="var(--color-brass)" />
    </svg>
  );
}
