import type { ComponentType } from "react";
import { founderConfig, socialLabels, type SocialPlatform } from "@/config/founder";
import { images } from "@/config/images";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/brand/icons";
import { RemoteImage } from "@/components/media/RemoteImage";
import { cn } from "@/lib/utils";

const socialIcons: Record<SocialPlatform, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

type SocialLink = { platform: SocialPlatform; href: string };

function collectSocials(): SocialLink[] {
  return (Object.keys(founderConfig.socials) as SocialPlatform[])
    .map((platform) => ({ platform, href: founderConfig.socials[platform]?.trim() ?? "" }))
    .filter((entry): entry is SocialLink => entry.href.length > 0);
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "C";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function SocialRow({
  socials,
  dark = false,
  className,
}: {
  socials: SocialLink[];
  dark?: boolean;
  className?: string;
}) {
  if (socials.length === 0) return null;
  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {socials.map(({ platform, href }) => {
        const Icon = socialIcons[platform];
        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${founderConfig.name || "CAELMONT founder"} on ${socialLabels[platform]}`}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
                dark
                  ? "border-paper/20 text-fog hover:border-paper/60 hover:text-paper"
                  : "border-ink/15 text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              <Icon className="h-[15px] w-[15px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

interface FounderProfileProps {
  /** full: large block for about/home; compact: inline; footer: dark, small. */
  variant?: "full" | "compact" | "footer";
  className?: string;
}

/**
 * Configurable founder profile. Renders gracefully when the name, photo, or
 * social links are still unconfigured — no invented content is ever shown.
 */
export function FounderProfile({ variant = "full", className }: FounderProfileProps) {
  const name = founderConfig.name.trim();
  const bio = founderConfig.bio.trim();
  const imageUrl = (founderConfig.imageUrl || images.founder.src).trim();
  const hasPhoto = imageUrl.length > 0;
  const socials = collectSocials();

  const displayName = name || "Founder";
  const subline = name ? founderConfig.role : "Full profile coming soon";

  const avatar = (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-ink/15 bg-charcoal text-paper",
        variant === "footer" ? "h-11 w-11" : variant === "compact" ? "h-16 w-16" : "h-24 w-24",
      )}
    >
      {hasPhoto ? (
        <RemoteImage
          image={{ src: imageUrl, srcSet: "", alt: images.founder.alt }}
          sizes="128px"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "flex h-full w-full items-center justify-center font-display font-medium tracking-tight",
            variant === "footer" ? "text-base" : variant === "compact" ? "text-xl" : "text-3xl",
          )}
        >
          {initialsFor(name)}
        </span>
      )}
    </div>
  );

  if (variant === "footer") {
    return (
      <div className={cn("flex items-center gap-3.5", className)}>
        {avatar}
        <div>
          <p className="font-display text-sm font-medium text-paper">{displayName}</p>
          <p className="text-xs text-fog">{subline}</p>
        </div>
        <SocialRow socials={socials} dark className="ml-2" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "compact" ? "flex items-center gap-5" : "flex flex-col gap-5 sm:flex-row sm:items-center",
        className,
      )}
    >
      {avatar}
      <div className="min-w-0">
        <p
          className={cn(
            "font-display font-medium tracking-tight text-ink",
            variant === "compact" ? "text-lg" : "text-2xl",
          )}
        >
          {displayName}
        </p>
        <p className="mt-0.5 text-sm text-stone">{subline}</p>
        {bio ? <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{bio}</p> : null}
        <SocialRow socials={socials} className="mt-4" />
      </div>
    </div>
  );
}
