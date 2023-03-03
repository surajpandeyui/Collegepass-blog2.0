import Head from 'next/head'
// import SeriesScreen from '../screens/SeriesScreen';
import HomeAfterLogin from '../screens/HomeScreen/HomeAfterLogin'
import axios from 'axios'
import {
  APIgetLiveClass,
  APIgetLiveSession,
  APIgetMasterClass,
  APIgetIvyLeague,
  APIgetOxford,
  APIgetRecordedTypes,
  getSeries,
} from '../config/API'

export default function Series({
  upcomingLiveStreams = [],
  upcomingLiveClasses = [],
  upcomingMasterClass = [],
  upcomingIvyLeague = [],
  upcomingOxford = [],
  recordedOxbridge = [],
  recordedIvyLeague = [],
}) {
  return (
    <>
      <Head>
        <title>Global College Counselling Sessions | CollegePass</title>
        <meta
          name="description"
          content="Global counseling sessions on the Ivy League, Oxbridge, and the Top US, UK, and Canadian universities."
        />
      </Head>
      <main className="bg-black">
        <HomeAfterLogin
          upcomingLiveClasses={upcomingLiveClasses}
          upcomingLiveStreams={upcomingLiveStreams}
          upcomingMasterClass={upcomingMasterClass}
          upcomingIvyLeague={upcomingIvyLeague}
          upcomingOxford={upcomingOxford}
          recordedIvyLeague={recordedIvyLeague}
          recordedOxbridge={recordedOxbridge}
        ></HomeAfterLogin>
      </main>
    </>
  )
}

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
      upcomingLiveStreams: upcomingLiveStreams.data.data.concat(
        upcomingMasterClass.data.data
      ),
      upcomingMasterClass: series.data.message,
      upcomingIvyLeague: upcomingIvyLeague.data.data,
      upcomingOxford: upcomingOxford.data.data,
      recordedIvyLeague: recordedIvyLeague.data.data,
      recordedOxbridge: recordedOxbridge.data.data,
    }, // will be passed to the page component as props
    revalidate: 5,
  }
}
