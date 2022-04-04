import {
  NavigationBar,
  HeroSection,
  HowItWorksSection,
  PreviewOfWalletSection,
  Footer,
  HowToStartSection,
} from '../shared/components/landing'

export function LandingPage() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <HowItWorksSection />
      <HowToStartSection />
      {/* <PreviewOfWalletSection /> */}
      <Footer />
    </>
  )
}

export default LandingPage
