import { useState } from 'react'
import Head from 'next/head'
import IvyLeagueUndergraduateAdmissionsScreen from '../screens/IvyLeagueUndergraduateAdmissionsScreen';
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
import LandingText from '../components/LandingText'
import CurriculamBox from '../components/CurriculamBox'
import BookingButton from '../components/BookingButton'
import CenterBanner from '../components/CenterBanner'
import Testimonial from '../components/Testimonial'
import Faq from '../components/Faq'
import LandingButtonModal from '../components/Modal/LandingButtonModal'
import { useRouter } from 'next/router'

export default function UndergraduateAdmissions() {
  let title = 'Ivy League Admissions Counseling & Essay Editing | CollegePass'
  let description =
    "CollegePass's admission advisors are the best globally, being students at, or graduates from the Ivy League, UPenn, Harvard, Stanford, Columbia, MIT, Oxford, Cambridge, and more. CollegePass's admission advisors trained to leverage Case Methods and research conducted by the Global Research Team."

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
          href="https://www.collegepass.org/ivy-league-undergraduate-admissions"
        />
        
      </Head>
      <main className="bg-black">
        <IvyLeagueUndergraduateAdmissionsScreen></IvyLeagueUndergraduateAdmissionsScreen>
         {/* <Slider></Slider>
        <MarketBanner></MarketBanner>
        <Testimonial></Testimonial>
        <LandingText />
        <CurriculamBox />
       <BookingButton />
        {/* old form 
        {/* <LandingForm></LandingForm>
        <Faq></Faq>
        <CenterBanner /> */}
      </main>
    </>
  )
}
