import { useState } from 'react'
import Head from 'next/head'
import IbTutoringScreen from '../screens/IbTutoringScreen';
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
// import LandingForm from '../components/LandingForm'
import CurriculamBox from '../components/CurriculamBox'
import Testminial from '../components/Testimonial'
import LandingText from '../components/LandingText'
import BookingButton from '../components/BookingButton'
import CenterBanner from '../components/CenterBanner'
import Faq from '../components/Faq'

export default function SatTutoring() {
  let title = 'IB/AP Expert Tutors | One-on-One Tutoring | CollegePass'
  let description =
    'Learn from Experienced IB/IGCSE Tutors who have registered an average of 2-3 Point Improvements. CollegePass IB Tutors are the best globally, being alumni of top universities globally.'

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
        <link rel="canonical" href="https://www.collegepass.org/ib-tutoring" />
      </Head>
      <main className="bg-black">
        <IbTutoringScreen></IbTutoringScreen>
        {/* <Slider></Slider>
        <MarketBanner></MarketBanner>
        <Testminial></Testminial>
        <LandingText />
        <CurriculamBox />
        <Faq></Faq>
        <BookingButton />
        <CenterBanner /> */}
      </main>
    </>
  )
}
