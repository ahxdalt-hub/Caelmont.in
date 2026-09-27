import { VentureDetail } from "@/components/brands/VentureDetail";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHeader } from "@/components/shared/PageHeader";
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

      <FinalCta />
    </>
  );
}
