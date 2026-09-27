import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { FooterAtmosphere } from "@/components/layout/FooterAtmosphere";
import { FounderProfile } from "@/components/shared/FounderProfile";
import { founderConfig } from "@/config/founder";
import { siteConfig, siteDomain } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocials = Object.values(founderConfig.socials).some(Boolean);

  return (
    <footer className="relative bg-night text-paper">
      {/* Single continuous background image — stretches up behind a preceding
          `.closing-cta` band so CTA + footer read as one surface. */}
      <FooterAtmosphere />

      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="CAELMONT — home">
              <Mark className="h-7 w-7 text-paper" />
              <span className="font-display text-[0.8rem] font-semibold tracking-[0.3em]">
                CAELMONT
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fog">
              {siteConfig.positioning} Each venture runs as its own brand — built
              independently, shipped when it&apos;s ready.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-block break-words text-sm text-paper underline decoration-brass/50 underline-offset-4 transition-colors hover:decoration-brass"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="kicker text-fog">Company</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper/85 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="kicker text-fog">Founder</h2>
            <FounderProfile variant="footer" className="mt-5" />
            {!hasSocials ? (
              <p className="mt-4 text-xs leading-relaxed text-fog/80">
                Profile links will appear here as they go live.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
            {/* Legal suffix stays unconfigured until the entity decision is
                made — never render an invented one. */}
            {siteConfig.legalSuffix ? `, ${siteConfig.legalSuffix}` : ""}
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
            {siteDomain} — {siteConfig.tagline}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            {siteConfig.legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
