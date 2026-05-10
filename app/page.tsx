import HeroSection from './_components/HeroSection'
import GetStartedSection from './_components/GetStartedSection'
import ProblemSection from './_components/ProblemSection'
import HowSection from './_components/HowSection'
import DifferenceSection from './_components/DifferenceSection'
import PricingSection from './_components/PricingSection'
import BottomCtaSection from './_components/BottomCtaSection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <GetStartedSection />
        <ProblemSection />
        <HowSection />
        <DifferenceSection />
        <PricingSection />
        <BottomCtaSection />
      </main>
      <Footer />
    </>
  )
}
