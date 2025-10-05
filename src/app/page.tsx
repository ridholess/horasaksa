import Navigation from '@components/Navigation'
import Hero from '@components/sections/Hero'
import OverviewHistory from '@components/sections/OverviewHistory'
import HandsOn from '@components/sections/HandsOn'
import Cta from '@components/sections/Cta'
import Footer from '@components/sections/Footer'

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      <OverviewHistory />
      <HandsOn />
      <Cta />
      <Footer />
    </div>
  )
}
