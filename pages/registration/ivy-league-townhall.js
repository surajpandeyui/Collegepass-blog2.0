import Head from 'next/head'
import CustomRegistrationScreen from '../../screens/CustomRegistrationScreen'

import { useRouter } from 'next/router'

export default function CustomRegistration() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>The Ivy League Townhall - The St. Regis Hotel, Worli, Mumbai</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="description"
          content="CollegePass team will take a closer look at the Application Process of the Ivy League and other highly selective universities in the US."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.collegepass.org/about" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://collegepass.s3.ap-south-1.amazonaws.com/social-media.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://collegepass.s3.ap-south-1.amazonaws.com/social-media.jpg"></meta>
      </Head>
      <main>
        <CustomRegistrationScreen
         eventID={87586674175}
        ></CustomRegistrationScreen>
      </main>
    </>
  )
}