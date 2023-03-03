import Head from 'next/head'
import PricingScreen from '../screens/PricingScreen'
import Script from 'next/script'

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Plans and Pricing | CollegePass</title>
        <meta name="description" content="Interested in a CollegePass Plus & Premium plan? From unlimited Access to Video Lessons to One - on - One College Admissions Advising by Ivy League Trained Admission Advisors. See what it costs." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.collegepass.org/pricing" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="" />
      </Head>
      <main className="bg-black">
        <PricingScreen></PricingScreen>
      </main>
      <footer>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </footer>
    </>
  )
}
