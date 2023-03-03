import { useState } from 'react'
import Head from 'next/head'
import SatTutoringScreen from '../screens/SatTutoringScreen';
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
// import LandingForm from '../components/LandingForm'
import CurriculamBox from '../components/CurriculamBox'
import Testminial from '../components/Testimonial'
import LandingText from '../components/LandingText'
import BookingButton from '../components/BookingButton'
import Faq from '../components/Faq'
import CenterBanner from '../components/CenterBanner'

export default function SatTutoring() {
  const [showLButton, setShowLButton] = useState(false)
  const handleShowLButton = () => setShowLButton(true)
  const handleCloseLButton = () => setShowLButton(false)

  return (
    <>
      <Head>
        <title>Beat The SAT | Score A Perfect 1600 | CollegePass</title>
        <meta name="description" content="Master the SAT with internationally trained SAT Master Tutors. CollegePass Students have consistently scored 1500+ on the SAT since 2020. " />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="" />
        <link rel="canonical" href="https://www.collegepass.org/sat-tutoring" />
      </Head>
      <main className="bg-black">
        <SatTutoringScreen></SatTutoringScreen>
         {/* <Slider handleShowLButton={handleShowLButton}></Slider>
        <MarketBanner></MarketBanner>
        <Testminial></Testminial>
        <LandingText />
        <CurriculamBox />
        <Faq></Faq>
       <BookingButton handleShowLButton={handleShowLButton} />
        <CenterBanner /> */}
      </main>
    </>
  )
}
