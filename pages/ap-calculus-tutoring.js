import { useState } from 'react'
import Head from 'next/head'
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
import LandingText from '../components/LandingText'
import CurriculamBox from '../components/CurriculamBox'
import BookingButton from '../components/BookingButton'
import CenterBanner from '../components/CenterBanner'
// import LandingForm from '../components/LandingForm'
import Testimonial from '../components/Testimonial'
import Faq from '../components/Faq'

export default function ApCalculus() {
  let title =
    'AP Calculus MasterClass | Live Online AP Calculus Coaching | CollegePass'
  let description =
    'AP Calculus live online MasterClasses at CollegePass from Expert AP Calculus Tutors. Score 5 on AP Calculus AB/BC'

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
          href="https://www.collegepass.org/ap-calculus-tutoring"
        />
      </Head>
      <main className="bg-black">
        <Slider></Slider>
        <MarketBanner></MarketBanner>
        <Testimonial></Testimonial>
        <LandingText />
        <CurriculamBox />
        {/* <BookingButton /> */}
        {/* <LandingForm></LandingForm> */}
        <Faq></Faq>
        <CenterBanner />
      </main>
    </>
  )
}
