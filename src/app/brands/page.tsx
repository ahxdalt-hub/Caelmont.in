import { VentureDetail } from "@/components/brands/VentureDetail";
import { FinalCta } from "@/components/home/FinalCta";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PageHeader } from "@/components/shared/PageHeader";
import { images } from "@/config/images";
import { pageMetadata } from "@/config/seo";
import { venturesInOrder } from "@/config/ventures";

export const metadata = pageMetadata({
  title: "Brands",
  description:
    "The CAELMONT portfolio — four independent ventures building practical business software, sales intelligence, local AI tools, and business automation.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <>
      {/* One composed surface: header and all four ventures share a single
          faint parallax backdrop. The page is very tall, so the travel is
          deliberately small — enough to feel alive, never enough to reveal
          the image edges at its base scale. No overflow-hidden here: it would
          become the sticky columns' scroll container and silently disable
          their pinning. Decorative backdrop: aria-hidden, empty alt. */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <ParallaxImage
            image={{ ...images.brandsBackdrop, alt: "" }}
            sizes="100vw"
            fill
            travel={3}
            className="opacity-[0.45]"
            imgClassName="scale-[1.03] blur-[4px]"
            overlayClassName="bg-gradient-to-b from-paper/80 via-paper/35 to-paper/80"
          />
        </div>
        <div className="relative z-10">
          <PageHeader
            kicker="The portfolio"
            title={
              <>
                Four ventures.
                <br />
                <span className="font-serif italic">One standard.</span>
              </>
            }
            lead="CAELMONT operates a small portfolio of independent software brands. Each venture is built and run separately — with its own product, its own audience, and its own website when the time comes."
          />

          {venturesInOrder().map((venture, i) => (
            <VentureDetail
              key={venture.slug}
              venture={venture}
              index={String(i + 1).padStart(2, "0")}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>

      <FinalCta />
    </>
  );
}
