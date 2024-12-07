import HeroSection from "./HeroSection"
import NavBar from "./NavBar"
import VideoDemo from "./VideoDemo"

const LandingPageLayout = () => {
  return (
    <div className="max-w-[1024px] mx-auto py-8 px-4 lg:px-0">
        <NavBar />
        <HeroSection />
        <VideoDemo />
    </div>
  )
}

export default LandingPageLayout
