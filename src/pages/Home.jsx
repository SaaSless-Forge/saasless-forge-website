import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyUsSection />
      <SocialProofSection />
      <CTASection />
    </>
  )
}
