import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  /** Use on dark sections. */
  dark?: boolean;
  /** External links open in a new tab with rel=noreferrer. */
  external?: boolean;
  className?: string;
  arrow?: boolean;
}

const base =
  "group/link inline-flex items-center gap-2.5 text-sm font-medium transition-colors duration-300";

function classesFor(variant: ArrowLinkProps["variant"], dark: boolean): string {
  switch (variant) {
    case "solid":
      return cn(
        base,
        "rounded-full px-6 py-3",
        dark ? "bg-paper text-ink hover:bg-ivory" : "bg-ink text-paper hover:bg-charcoal",
      );
    case "outline":
      return cn(
        base,
        "rounded-full border px-6 py-3",
        dark
          ? "border-paper/30 text-paper hover:border-paper/70"
          : "border-ink/25 text-ink hover:border-ink",
      );
    default:
      return cn(
        base,
        "underline-offset-[6px] hover:underline",
        dark ? "text-paper decoration-brass/60" : "text-ink-soft decoration-brass/60 hover:text-ink",
      );
  }
}

/** Link/button with a directional arrow affordance — the site's single CTA primitive. */
export function ArrowLink({
  href,
  children,
  variant = "text",
  dark = false,
  external = false,
  className,
  arrow = true,
}: ArrowLinkProps) {
  const cls = cn(classesFor(variant, dark), className);
  const label = (
    <>
      <span>{children}</span>
      {arrow ? (
        external ? (
          <ArrowUpRightIcon className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        ) : (
          <ArrowRightIcon className="transition-transform duration-300 group-hover/link:translate-x-1" />
        )
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
