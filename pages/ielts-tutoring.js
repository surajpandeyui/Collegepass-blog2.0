import { useState } from 'react'
import Head from 'next/head'
import IeltsTutoringScrren from '../screens/IeltsTutoringScrren';
import Slider from '../components/HeroSlider/Slider'
import MarketBanner from '../components/MarketBanner'
import LandingText from '../components/LandingText'
import CurriculamBox from '../components/CurriculamBox'
import BookingButton from '../components/BookingButton'
import CenterBanner from '../components/CenterBanner'
import Testimonial from '../components/Testimonial'
import Faq from '../components/Faq'

export default function Ielts() {
  let title = 'IELTS Online Live Classes | Best IELTS Preparation | CollegePass'
  let description =
    'IELTS Online Live Classes - Enrol today for CollegePass IELTS MasterClass that offers Live Classes, Experienced Teachers, Video Lessons to prepare for the IELTS exam.'

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
          href="https://www.collegepass.org/ielts-tutoring"
        />
      </Head>
      <main className="bg-black">
        <IeltsTutoringScrren></IeltsTutoringScrren>
         {/* <Slider></Slider>
        <MarketBanner></MarketBanner>
        <Testimonial></Testimonial>
        <LandingText />
        <CurriculamBox />
        <Faq></Faq>
       <BookingButton />
        <CenterBanner />
        {/* old form 
        {/* <LandingForm></LandingForm> */}
      </main>
    </>
  )
}
