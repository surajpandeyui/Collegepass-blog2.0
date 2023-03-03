import React from 'react'
import { useSelector } from 'react-redux'
import HomeAfterLogin from './HomeAfterLogin'
import HomeBeforeLogin from './HomeBeforeLogin'

const index = ({
  upcomingLiveStreams,
  upcomingLiveClasses,
  upcomingMasterClass,
  upcomingIvyLeague,
  upcomingOxford,
  recordedIvyLeague,
  recordedOxbridge,
}) => {
  const auth = useSelector((state) => state.auth)
  if (auth.isAuthenticated) {
    return (
      <HomeAfterLogin
        upcomingLiveStreams={upcomingLiveStreams}
        upcomingLiveClasses={upcomingLiveClasses}
        upcomingMasterClass={upcomingMasterClass}
        upcomingIvyLeague={upcomingIvyLeague}
        upcomingOxford={upcomingOxford}
        recordedIvyLeague={recordedIvyLeague}
        recordedOxbridge={recordedOxbridge}
      />
    )
  } else {
    return (
      <HomeBeforeLogin
        // upcomingLiveStreams={upcomingLiveStreams}
        // upcomingLiveClasses={upcomingLiveClasses}
        // upcomingMasterClass={upcomingMasterClass}
        // upcomingIvyLeague={upcomingIvyLeague}
        // upcomingOxford={upcomingOxford}
        // recordedIvyLeague={recordedIvyLeague}
        // recordedOxbridge={recordedOxbridge}
      />
    )
  }
}

export default index
