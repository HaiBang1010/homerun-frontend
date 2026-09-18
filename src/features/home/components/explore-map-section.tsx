import { BrandButton } from "@/components/brand-button";
import { Reveal } from "@/components/reveal";

/**
 * "Khám Phá Xung Quanh" — Figma node 14470:1946.
 * Backdrop is a 527-vector illustration exported as one SVG (node 14615:5916),
 * placed at y=96 and clipped by the 240 frame.
 *
 * Mobile uses `min-h`: the subtitle wraps and the button would touch the next section.
 */
export function ExploreMapSection() {
  return (
    <section className="relative min-h-52 overflow-hidden bg-neutral-100 md:h-60">
      <img
        src="/images/home/explore-map.svg"
        alt=""
        aria-hidden
        width={1440}
        height={400}
        className="pointer-events-none absolute top-24 left-0 h-100 w-full max-w-none object-cover"
      />

      <div className="container-hr relative flex h-full flex-col items-center gap-6 pt-10 pb-10 md:pb-0">
        <Reveal className="flex max-w-190.75 flex-col gap-2 text-center">
          <h2 className="type-h2 font-semibold tracking-[-0.225px] text-neutral-800">
            Khám Phá Xung Quanh
          </h2>
          <p className="type-large font-semibold text-neutral-400">
            Địa điểm ít biết, không có trên Google Maps.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <BrandButton variant="dark" className="w-58 max-w-full text-white">
            Xem bản đồ cư dân
          </BrandButton>
        </Reveal>
      </div>
    </section>
  );
}
