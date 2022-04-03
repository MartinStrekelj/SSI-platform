import {
  NavigationBar,
  HeroSection,
  HowItWorksSection,
  PreviewOfWalletSection,
  Footer,
} from '../shared/components/landing'

export function LandingPage() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <HowItWorksSection />
      <PreviewOfWalletSection />
      <Footer />
    </>
  )
}

export default LandingPage
