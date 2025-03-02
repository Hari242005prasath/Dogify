import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { BreedExplorer } from "@/components/breed-explorer"
import { BreedQuiz } from "@/components/breed-quiz"


export default function Home() {


  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureSection />
      <BreedExplorer />
      <BreedQuiz />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
  
    </div>
  )
}





