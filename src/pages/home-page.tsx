import { ExploreMapSection } from '@/features/home/components/explore-map-section'
import { FeaturedListingsSection } from '@/features/home/components/featured-listings-section'
import { HeroSection } from '@/features/home/components/hero-section'
import { PriceEstimatorSection } from '@/features/home/components/price-estimator-section'
import { RentalPlansSection } from '@/features/home/components/rental-plans-section'
import { WhyHomerunSection } from '@/features/home/components/why-homerun-section'

/** Homerun home page — Figma `final-homerun`, frames 14470:1676 / 8152 / 14019. */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyHomerunSection />
      <FeaturedListingsSection />
      <RentalPlansSection />
      <ExploreMapSection />
      <PriceEstimatorSection />
    </>
  )
}
