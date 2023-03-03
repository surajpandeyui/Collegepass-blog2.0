// import { useEffect, useState } from 'react'
import Head from 'next/head'
import HomeScreen from '../screens/HomeScreen'
// import AboutBanner from '../components/Footer/AboutBanner';

// import HomeAfterLogin from '../screens/HomeScreen/Home'
//sadsa
import Script from 'next/script'
import axios from 'axios'
import {
  APIgetLiveClass,
  APIgetLiveSession,
  APIgetMasterClass,
  APIgetIvyLeague,
  APIgetOxford,
  APIgetRecordedTypes,
  getSeries
} from '../config/API'
// import {useDispatch, useSelector} from 'react-redux'
// import {getUpcomingLiveClasses} from '../actions/liveClassesActions'
// import {
// 	getUpcomingLiveStreams,ls
// 	getPreviousLiveStreams,
// } from '../actions/liveStreamsActions'
// import {loadUser, loadAccess} from '../actions/authActions'
// import {getVideoLessons} from '../actions/videoLessonsActions'

export default function Home({
  upcomingLiveStreams = [],
  upcomingLiveClasses = [],
  upcomingMasterClass = [],
  upcomingIvyLeague = [],
  upcomingOxford = [],
  recordedOxbridge = [],
  recordedIvyLeague = [],
}) {
  
  // const dispatch = useDispatch()

  // const videoLessons = useSelector((state) => state.videoLessons.videoLessons)

  // const auth = useSelector((state) => state.auth)

  // useEffect(() => {
  // 	dispatch(loadUser())
  // 	dispatch(loadAccess())
  // 	dispatch(getUpcomingLiveClasses())
  // 	dispatch(getUpcomingLiveStreams())
  // 	dispatch(getPreviousLiveStreams())
  // 	dispatch(getVideoLessons())
  // }, [dispatch])

  // const upcomingLiveStreams = useSelector(
  // 	(state) => state.upcomingLiveStreams.upcomingLiveStreams
  // )
  // const upcomingLiveClasses = useSelector(
  // 	(state) => state.upcomingLiveClasses.upcomingLiveClasses
  // )

  return (
    <>
      <Head>
        <title>CollegePass | Get Into Your Dream College</title>
        <meta
          name="description"
          content="CollegePass is a Global College Preparation Platform helping high schoolers apply to their dream colleges worldwide! CollegePass provides personalized support in every aspect of the journey to their dream college — from university selection strategy, test prep, and personal statement/essay support to extracurricular strategy and interview practice."
        />
        <meta property="og:url" content="https://www.collegepass.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ivy League Admissions Counseling & Essay Editing | CollegePass" />
        <meta property="og:description" content="CollegePass is a Global College Preparation Platform helping students apply to their dream colleges worldwide!" />
        <meta property="og:image" content="https://collegepass.s3.ap-south-1.amazonaws.com/social-media.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="collegepass.org" />
        <meta property="twitter:url" content="https://www.collegepass.org/" />
        <meta name="twitter:title" content="Ivy League Admissions Counseling & Essay Editing | CollegePass" />
        <meta name="twitter:description" content="CollegePass is a Global College Preparation Platform helping students apply to their dream colleges worldwide!" />
        <meta name="twitter:image" content="https://collegepass.s3.ap-south-1.amazonaws.com/social-media.jpg"></meta>
        <link rel="canonical" href="https://www.collegepass.org/" />

      </Head>

<Script type="application/ld+json">
          {{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CollegePass",
            "url": "https://www.collegepass.org",
            "logo": "https://www.collegepass.org/static/media/holo.60fa826e.png",
            "sameAs": [
              "https://www.facebook.com/CollegePassPremiere",
              "https://www.instagram.com/_collegepass/",
              "https://www.youtube.com/channel/UCOnzfJbf0NPjrNa2cL8S1Lg",
              "https://www.linkedin.com/company/collegepass"
            ]
          }}
        </Script>
        <Script type="application/ld+json">
          {{
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "CollegePass",
            "url": "https://www.collegepass.org",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }}
        </Script>

      <main>
        <HomeScreen
          upcomingLiveClasses={upcomingLiveClasses}
          upcomingLiveStreams={upcomingLiveStreams}
          upcomingMasterClass={upcomingMasterClass}
          upcomingIvyLeague={upcomingIvyLeague}
          upcomingOxford={upcomingOxford}
          recordedIvyLeague={recordedIvyLeague}
          recordedOxbridge={recordedOxbridge}
        />
      </main>
    </>
  )
}

// export const getStaticProps = wrapper.getServerSideProps((store) => {
// 	return async () => {
// 		await store.dispatch(getUpcomingLiveStreams())
// 		await store.dispatch(getUpcomingLiveClasses())
// 		await store.dispatch(getPreviousLiveStreams())

// 		const upcomingLiveClasses =
// 			store.getState().upcomingLiveClasses.upcomingLiveClasses
// 		const upcomingLiveStreams =
// 			store.getState().upcomingLiveStreams.upcomingLiveStreams
// 		const previousLiveStreams =
// 			store.getState().previousLiveStreams.previousLiveStreams

// 		return {
// 			props: {upcomingLiveClasses, upcomingLiveStreams, previousLiveStreams},
// 			revalidate: 5,
// 		}
// 	}
// })

export async function getStaticProps() {
  const upcomingLiveClasses = await axios.get(APIgetLiveClass)
  const upcomingLiveStreams = await axios.get(APIgetLiveSession)
  const upcomingMasterClass = await axios.get(APIgetMasterClass)
  const upcomingIvyLeague = await axios.get(APIgetIvyLeague)
  const upcomingOxford = await axios.get(APIgetOxford)

  const recordedOxbridge = await axios.get(`${APIgetRecordedTypes}/24`)
  const recordedIvyLeague = await axios.get(`${APIgetRecordedTypes}/22`)
  const series = await axios.get(getSeries)
 
  
  return {
    props: {
      upcomingLiveClasses: upcomingLiveClasses.data.data,
      upcomingLiveStreams: upcomingLiveStreams.data.data.concat(upcomingMasterClass.data.data),
      upcomingMasterClass: series.data.message,
      upcomingIvyLeague: upcomingIvyLeague.data.data,
      upcomingOxford: upcomingOxford.data.data,
      recordedIvyLeague: recordedIvyLeague.data.data,
      recordedOxbridge: recordedOxbridge.data.data,
    }, // will be passed to the page component as props
    revalidate: 5,
  }
}
