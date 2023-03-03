import { useState } from 'react'
import Head from 'next/head'
import MsAdmissionsScreen from '../screens/MsAdmissionsScreen';
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
import LandingText from '../components/LandingText'
import CurriculamBox from '../components/CurriculamBox'
import BookingButton from '../components/BookingButton'
import CenterBanner from '../components/CenterBanner'
import LandingForm from '../components/LandingForm'
import Testimonial from '../components/Testimonial'
import Faq from '../components/Faq'
import LandingButtonModal from '../components/Modal/LandingButtonModal'

export default function UndergraduateAdmissions() {
  const [showLButton, setShowLButton] = useState(false)
  const handleShowLButton = () => setShowLButton(true)

  let title =
    'Personal Statement Editing | MS Admissions Advising | CollegePass'
  let description =
    'Personal Statement Editing by MS Admission Experts from the ivy League and Top US & UK Universities like UC Berkeley, Georgia Tech, MIT, University of Cambridge.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content="" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="" />
        <link
          rel="canonical"
          href="https://www.collegepass.org/ms-admissions"
        />
      </Head>
      <main className="bg-black">
        <MsAdmissionsScreen></MsAdmissionsScreen>
        {/* <Slider handleShowLButton={handleShowLButton}></Slider>
        <MarketBanner></MarketBanner>
        <Testimonial></Testimonial>
        <LandingText />
        <CurriculamBox />
        <BookingButton handleShowLButton={handleShowLButton} /> 
        {/* old form
        {/* <LandingForm></LandingForm>
        <Faq></Faq>
        <LandingButtonModal
          showLButton={showLButton}
          setShowLButton={setShowLButton}
        />
        <CenterBanner handleShowLButton={handleShowLButton} /> */}
      </main>
    </>
  )
}
