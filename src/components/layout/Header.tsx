"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        menuOpen
          ? "border-b border-ink/10 bg-paper"
          : scrolled
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" aria-label="CAELMONT — home" className="group inline-flex items-center gap-2.5">
          <Mark className="h-7 w-7 text-ink transition-transform duration-700 group-hover:rotate-[24deg]" />
          <span className="font-display text-[0.8rem] font-semibold tracking-[0.3em] text-ink">
            CAELMONT
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-sm transition-colors duration-300",
                isActive(item.href) ? "text-ink" : "text-stone hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
              isActive("/contact") ? "bg-moss text-paper" : "bg-ink text-paper hover:bg-charcoal",
            )}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-300",
              menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute h-px w-6 bg-ink transition-transform duration-300",
              menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 top-16 z-30 flex flex-col bg-paper px-5 pb-10 pt-6 transition-all duration-500 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...siteConfig.nav, { label: "Contact", href: "/contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b border-ink/10 py-5 font-display text-2xl tracking-tight transition-all duration-500",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                isActive(item.href) ? "text-ink" : "text-ink-soft",
              )}
              style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <p className="kicker text-stone">Reach us</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 inline-block break-words text-sm text-ink-soft underline decoration-brass/50 underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </header>
  );
}
