import React from 'react'
import styles from './home.module.scss'

import AfterLoginSlider from '../../components/HeroSlider/AfterLoginSlider'
import Livestreams from '../../components/HorizontalSlider/Livestreams'
import Liveclasses from '../../components/HorizontalSlider/Liveclasses'
import Masterclasses from '../../components/HorizontalSlider/Masterclasses'
import Faq from '../../components/Faq';
import AppRating from '../../components/AppRating';
// import IvyLeague from '../../components/HorizontalSlider/IvyLeague'
// import Oxbridge from '../../components/HorizontalSlider/Oxbridge'
// import HorizontalSlider from '../../components/HorizontalSlider'
// import Review from '../../components/Review';
import useOnScreen from "../../Hooks/UseOnScreen";
import dynamic from 'next/dynamic'
const IvyLeague = dynamic(() => import('../../components/HorizontalSlider/IvyLeague'))
const Oxbridge = dynamic(() => import('../../components/HorizontalSlider/Oxbridge'))
const HorizontalSlider = dynamic(() => import('../../components/HorizontalSlider'))
const Review = dynamic(() => import('../../components/Review'))
import loader_animated from "../../assets/Loader/loader_animated.svg";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getVideoLessons } from '../../actions/videoLessonsActions'

const HomeAfterLogin = (props) => {
  const HorizontalSliderRef = useRef();
  const HorizontalSliderRefValue = useOnScreen(HorizontalSliderRef);
  const [isHorizontalSliderRef, setHorizontalSliderRef] = useState(false);

  // const TrackRef = useRef();
  // const TrackRefValue = useOnScreen(TrackRef);
  // const [isTrackRef, setTrackRef] = useState(false);

  // const CampusRef = useRef();
  // const CampusRefValue = useOnScreen(CampusRef);
  // const [isCampusRef, setCampusRef] = useState(false);

  useEffect(() => {
    if (!isHorizontalSliderRef) {
      setHorizontalSliderRef(HorizontalSliderRefValue);
    }

  }, [HorizontalSliderRefValue])
  // useEffect(() => {
  //   if (!isTrackRef) {
  //     setTrackRef(TrackRefValue);
  //     console.log("trackk",isTrackRef)
  //   }

  // }, [TrackRefValue])
  // useEffect(() => {
  //   if (!isCampusRef) {
  //     setCampusRef(CampusRefValue);
  //     console.log("campus re set",isCampusRef)
  //   }

  // }, [CampusRefValue])
  const {
    upcomingLiveStreams,
    upcomingLiveClasses,
    upcomingMasterClass,
    upcomingIvyLeague,
    upcomingOxford,
    recordedIvyLeague,
    recordedOxbridge,
  } = props

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideoLessons())
  }, [])

  useEffect(() => {
    if (!isHorizontalSliderRef) {
      setHorizontalSliderRef(HorizontalSliderRefValue);
      // console.log(HorizontalSliderRefValue)
    }

  }, [HorizontalSliderRefValue])
  const videoLessons = useSelector((state) => state.videoLessons.videoLessons)

  //start login video slider population
  let videoSliderEvents = []
  upcomingLiveStreams.map((event) => {
    if (event.SHOW_HP === 1) {
      videoSliderEvents.push(event)
    }
    return event
  })
  upcomingMasterClass.map((event) => {
    if (event.show_hp === 1) {
      videoSliderEvents.push(event)
    }
    return event
  })

  // console.log("Videoslider===>",upcomingMasterClass)
  //end login video slider population

  let VideoLessonsComponent = null
  let TRACK = []
  let CAMPUS = []
  if (videoLessons !== undefined && videoLessons !== null) {
    {
      VideoLessonsComponent = videoLessons.map((item) => {
        return (
          <HorizontalSlider
            key={item[0].cat_id}
            events={item[2].video_list}
            sliderTitle={`VIDEO LESSONS - ${item[1].cat_name}`}
            isLive={false}
          />
        )
      })
      // videoLessons.forEach(item => {
      //   if(item[0].cat_id <= 10)
      //   {
      //     TRACK.push( <HorizontalSlider
      //             key={item[0].cat_id}
      //             events={item[2].video_list}
      //             sliderTitle={`VIDEO LESSONS - ${item[1].cat_name}`}
      //             isLive={false}
      //           />)
      //   }
      //   else if(item[0].cat_id > 10 && item[0].cat_id < 19)
      //   {
      //     CAMPUS.push( <HorizontalSlider
      //       key={item[0].cat_id}
      //       events={item[2].video_list}
      //       sliderTitle={`VIDEO LESSONS - ${item[1].cat_name}`}
      //       isLive={false}
      //     />)
      //   }
        
      // });
      
    }
  }

  return (
    <div className={styles.collegepass}>
      <AfterLoginSlider videoSliderEvents={videoSliderEvents} />
      <Livestreams events={upcomingLiveStreams} />
      <Masterclasses events={upcomingMasterClass} />
      <Liveclasses events={upcomingLiveClasses} />
      <IvyLeague
        events={upcomingIvyLeague}
        recordedIvyLeague={recordedIvyLeague}
      />
      <Oxbridge events={upcomingOxford} recordedOxbridge={recordedOxbridge} />

      {/* <div ref={HorizontalSliderRef}>
        {isHorizontalSliderRef && VideoLessonsComponent}
      </div> */}
      <AppRating />
      <Review />
      <Faq />
    </div>
  )
}

export default HomeAfterLogin
