import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, A11y } from 'swiper'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'next/link'
import styles from './horizontalSlider.module.scss'
import SliderCard from '../Cards/LiveTrack'
import axios from 'axios'
import { APIgetRegEvents } from '../../config/API'
// import VideoCard from '../Cards/VideoCard'
import dynamic from 'next/dynamic'
const LoginModal = dynamic(() => import('../Modal/LoginModal'))
const EventRegistration = dynamic(()=>import('../Modal/EventRegistration'),{
  ssr: false,
}) 
const QRRedirect = dynamic(()=>import('../Modal/MobileRedirectQR'),{
  ssr: false,
}) 

const MobileRedirect = dynamic(()=>import('../Modal/MobileRedirect'),{
  ssr: false,
}) 
// there is a separate view for phones and for desktop
const Oxbridge = ({ events = [], recordedOxbridge = [] }) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)
  // console.log("oxyyy", recordedOxbridge)
  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false

  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)

  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => setShowQR(true)

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)

  const [showRegModal, setShowRegModal] = useState(false)
  const handleCloseRegModal = () => setShowRegModal(false)

  const [registeredEvents, setRegisteredEvents] = useState([])
  
  const [isClicked, setisClicked] = useState(false)
  const [formDetails,setFormDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    grade: '',
    curriculum: '',
    school_name: '',
    COI:'',
    city:''
  })

  const autoSubmit = async ()=>{
    
    let [firstName, ...secondName] = formDetails.name.split(' ')
    secondName = secondName.join(' ')
    let apiBody = {
      email: formDetails.email,
      eventID: eventDetails.ID,
      eventName: eventDetails.NAME,
      firstName: firstName,
      lastName: secondName,
      grade: formDetails.grade,
      countryCode: '',
      phone: formDetails.phoneNumber,
      city: formDetails.city?formDetails.city:cityDetails.id,
      school_name: formDetails.school_name,
      curriculum: formDetails.curriculum,
      countriesOfInterest : formDetails.COI
    }
    // console.log('apiBody', apiBody)
    // setsubmitted(true)
    const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
    // console.log(registerEventDetails)
      if (registerEventDetails.data.statusCode === 200) {
        // handleClose()
        router.push(`/event-registration-success/${eventDetails.ZOOMID}`)
      // setShowSuccess(false)
    }
    else{
      setShowRegModal(true)
    }
  }
  useEffect(() => {
    if(isClicked)
    {
      if(formDetails.email != '' && formDetails.name != '' && formDetails.grade != '' && formDetails.phoneNumber != '' && formDetails.curriculum != '' &&
      formDetails.school_name != '' && formDetails.city != '' && formDetails.email && formDetails.name && formDetails.grade && formDetails.phoneNumber && formDetails.curriculum &&
      formDetails.school_name && formDetails.city)
      {
        // console.log("Auto submitting")
        autoSubmit()
      }
      else{
        setShowRegModal(true)
      }
    }
    
      // else{
      //   // seteventDetails(event)
        
      // }
  }, [formDetails])
  const handleShowRegModal = (event) => {
    setisClicked(true)
    seteventDetails(event)
    if(!auth.isAuthenticated)
    {
      // seteventDetails(event)
      setShowRegModal(true)
    }
    setFormDetails({
      name:
        auth.userDetails.FIRSTNAME !== undefined
          ? `${auth.userDetails?.FIRSTNAME} ${auth?.userDetails?.LASTNAME}`
          : '',
      phoneNumber: auth.userDetails.PHONENUMBER,
      grade: auth.userDetails.GRADE,
      curriculum: auth.userDetails?.CURRICULUM,
      email: auth.user?auth.user:'',
      school_name: auth.userDetails?.SCHOOL,
      city: parseInt(auth.userDetails?.CITY)
      
    })
  }
  const [eventDetails, seteventDetails] = useState(false)

  useEffect(() => {
    const getRegEvents = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
      const regEvents = await axios.get(
        `${APIgetRegEvents}${auth.userDetails.ID}`,
        config
      )
      setRegisteredEvents(regEvents.data.events)
    }
    if (auth.userDetails.ID) {
      getRegEvents()
    }
  }, [auth])

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col className="upcoming-live pb-0">
            <Row>
              <Col>
                <h2 className="text-left pb-0" style={{
                  marginLeft: '1%'
                }}>Oxbridge Track</h2>
              </Col>
            </Row>
            <Row>
              <Col className={styles.cardSliderForDesktop}>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={20}
                  slidesPerView={4.1}
                  navigation
                  //pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                >
                  {events.map((event, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    let topLeftText = 'Live Stream'
                    let topRightText = 'Plus'

                    const eventDate = moment
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    const eventTime = moment
                      .utc(
                        event.DATE_TIME
                          ? event.DATE_TIME
                          : event.EVENT_DATE_TIME
                            ? event.EVENT_DATE_TIME
                            : event.DATE
                      )
                      .utcOffset(utc_add)
                      .format('hh:mm A')

                    const enableTime = moment
                      .utc(event.DATE_TIME)
                      .subtract(15, 'minute')
                      .format()

                    const stopTime = moment
                      .utc(event.DATE_TIME)
                      .add(2, 'h')
                      .format()

                    const event_date_time = moment
                      .utc(event.DATE_TIME).utcOffset(utc_add)
                    let liveStatus = curTime.isSameOrAfter(event_date_time.subtract(10, 'minute')) && curTime.isBefore(event_date_time.add(30, 'minute'))

                    isEnableButton = curTime.isBetween(enableTime, stopTime)
                    let alreadyRegistered = false
                    let isOver = curTime.isAfter(stopTime)
                      

                    if (registeredEvents?.length > 0) {
                      alreadyRegistered = registeredEvents?.find((regEve) => {
                        return regEve.ZOOMID === event.ZOOMID
                      })
                    }

                    let cardButton = (
                      <Button
                        disabled={alreadyRegistered}
                        onClick={() => {
                          handleShowRegModal(event)
                          // router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )

                    //account trial = true means there are on free tier
                    //account trial = false means they have exhausted free tier
                    if (
                      isEnableButton === true &&
                      (auth.accountTrial === true ||
                        auth.userDetails?.ISPREMIUM >= 2)
                    ) {
                      //if event is starting in 15 min and user is prime+
                      cardButton = (
                        <Button
                          onClick={() => {
                            handleShowShowQR()
                            // router.push(`/live/${event?.ZOOMID}`)
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else if (
                      isEnableButton === true &&
                      auth.userDetails.ISPREMIUM <= 1
                    ) {
                      //if event is starting in 15 min and user is not prime nor within free trial tier
                      cardButton = (
                        <Button
                          onClick={(e) => {
                            handleShowShowQR()
                            // router.push('/pricing')
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else {
                      //default Button, when the stream is not started

                      // check if event.ID is present in

                      cardButton = (
                        <Button
                          disabled={alreadyRegistered || isOver}
                          onClick={() => {
                            handleShowRegModal(event)
                            // router.push(`/registration/${event?.ZOOMID}`)
                          }}
                        >
                           {isOver ? 'RECODING WILL BE AVAILABLE IN FEW DAYS' : alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                        </Button>
                      )
                    }

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                         eventid={event.ID}
                         userid={auth.userDetails.ID}
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={event.NAME.length > 50 ? `${event.NAME.slice(0, 50)}...` : event.NAME}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={cardButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={liveStatus}
                          premiumLevel={event.PREMIUM_LEVEL}
                          showLogin = {handleShowLogin}
                        />
                      </SwiperSlide>
                    )
                  })}
                  {recordedOxbridge.map((event, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    let topLeftText = 'Video Lesson'
                    let topRightText = 'Plus'

                    let playURL = `/play-video/${event.VIMEO_ID}/${event.ARCHIVE_NAME}`
                    playURL = playURL.replace(/\?/g, '%3F')
                    playURL = `${playURL}?sourcetype=vimeo`

                    const eventDate = moment
                      .utc(event.EVENT_DATE_TIME)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    let playButton = (
                      <Button
                        onClick={() => {
                          auth.isAuthenticated !== true
                            ? handleShowLogin()
                            : router.push('/pricing')
                        }}
                      >
                        WATCH
                      </Button>
                    )

                    if (auth.userDetails?.ISPREMIUM >= 2) {
                      playButton = (
                        <Button
                          onClick={() => {
                            handleShowShowQR()
                            // router.push(playURL)
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    } else {
                      playButton = (
                        <Button
                          onClick={() => {
                            auth.isAuthenticated !== true
                              ? handleShowLogin()
                              : router.push('/pricing')
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    }

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                        eventid={event.ID}
                        userid={auth.userDetails.ID}
                          imageSrc={event.s3_image}
                          alt={event.ARCHIVE_NAME}
                          eventTitle={event.ARCHIVE_NAME}
                          eventDate={eventDate}
                          eventTime={' '}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={playButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={false}
                          premiumLevel={event.PREMIUM_LEVEL}
                          showLogin = {handleShowLogin}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Col>

              {/* LOGIC FOR MOBILE - AS SLIDER NEEDS TO BE REDUCED */}
              <Col className={styles.cardSliderForMobile}>
                <Swiper
                  modules={[Pagination, A11y]}
                  spaceBetween={50}
                  slidesPerView={1.3}
                  //pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                >
                  {events.map((event, idx) => {
                    let topLeftText = 'Live Stream'
                    let topRightText = 'Plus'

                    const eventDate = moment
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    const eventTime = moment
                      .utc(
                        event.DATE_TIME
                          ? event.DATE_TIME
                          : event.EVENT_DATE_TIME
                            ? event.EVENT_DATE_TIME
                            : event.DATE
                      )
                      .utcOffset(utc_add)
                      .format('hh:mm A')

                    const enableTime = moment
                      .utc(event.DATE_TIME)
                      .subtract(15, 'minute')
                      .format()

                    const stopTime = moment
                      .utc(event.DATE_TIME)
                      .add(2, 'h')
                      .format()
                    
                      const event_date_time = moment
                      .utc(event.DATE_TIME).utcOffset(utc_add)
                      let liveStatus = curTime.isSameOrAfter(event_date_time.subtract(10, 'minute')) && curTime.isBefore(event_date_time.add(30, 'minute'))
                    
                    isEnableButton = curTime.isBetween(enableTime, stopTime)
                    let alreadyRegistered = false
                    let isOver = curTime.isAfter(stopTime)
                      

                    if (registeredEvents?.length > 0) {
                      alreadyRegistered = registeredEvents?.find((regEve) => {
                        return regEve.ZOOMID === event.ZOOMID
                      })
                    }

                    let cardButton = (
                      <Button
                        disabled={alreadyRegistered}
                        onClick={() => {
                          handleShowRegModal(event)
                          // router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )

                    //account trial = true means there are on free tier
                    //account trial = false means they have exhausted free tier
                    if (
                      isEnableButton === true &&
                      (auth.accountTrial === true ||
                        auth.userDetails?.ISPREMIUM >= 2)
                    ) {
                      //if event is starting in 15 min and user is prime+
                      cardButton = (
                        <Button
                          onClick={() => {
                            handleShowMobileRedirect()
                            // router.push(`/live/${event?.ZOOMID}`)
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else if (
                      isEnableButton === true &&
                      auth.userDetails.ISPREMIUM <= 1
                    ) {
                      //if event is starting in 15 min and user is not prime nor within free trial tier
                      cardButton = (
                        <Button
                          onClick={(e) => {
                            handleShowShowQR()
                            // router.push('/pricing')
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else {
                      //default Button, when the stream is not started

                      // check if event.ID is present in

                      cardButton = (
                        <Button
                          disabled={alreadyRegistered || isOver}
                          onClick={() => {
                            handleShowRegModal(event)
                            // router.push(`/registration/${event?.ZOOMID}`)
                          }}
                        >
                          {isOver ? 'RECODING WILL BE AVAILABLE IN FEW DAYS' : alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                        </Button>
                      )
                    }

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                         eventid={event.ID}
                         userid={auth.userDetails.ID}
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={event.NAME.length > 50 ? `${event.NAME.slice(0, 50)}...` : event.NAME}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={cardButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={liveStatus}
                          premiumLevel={event.PREMIUM_LEVEL}
                          showLogin = {handleShowLogin}
                        />
                      </SwiperSlide>
                    )
                  })}
                  {recordedOxbridge.map((event, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    let topLeftText = 'Video Lesson'
                    let topRightText = 'Plus'

                    let playURL = `/play-video/${event.VIMEO_ID}/${event.ARCHIVE_NAME}`
                    playURL = playURL.replace(/\?/g, '%3F')
                    playURL = `${playURL}?sourcetype=vimeo`

                    const eventDate = moment
                      .utc(event.EVENT_DATE_TIME)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    let playButton = (
                      <Button
                        onClick={() => {
                          auth.isAuthenticated !== true
                            ? handleShowLogin()
                            : router.push('/pricing')
                        }}
                      >
                        WATCH
                      </Button>
                    )

                    if (auth.userDetails?.ISPREMIUM >= 2) {
                      playButton = (
                        <Button
                          onClick={() => {
                            handleShowMobileRedirect()
                            // router.push(playURL)
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    } else {
                      playButton = (
                        <Button
                          onClick={() => {
                            auth.isAuthenticated !== true
                              ? handleShowLogin()
                              : router.push('/pricing')
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    }

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                         eventid={event.ID}
                         userid={auth.userDetails.ID}
                          imageSrc={event.s3_image}
                          alt={event.ARCHIVE_NAME}
                          eventTitle={event.ARCHIVE_NAME}
                          eventDate={eventDate}
                          eventTime={''}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={playButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={false}
                          premiumLevel={event.PREMIUM_LEVEL}
                          showLogin = {handleShowLogin}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        onSubmitLogin={handleCloseLogin}
      />
      <EventRegistration
        show={showRegModal}
        handleClose={handleCloseRegModal}
        eventDetails={eventDetails}
      />
      <QRRedirect showLinkModal={showQR} handleCloseLinkModal={handleCloseShowQR} />
      <MobileRedirect showLinkModal={showMobileRedirect} handleCloseLinkModal={handleCloseMobileRedirect} />
    </Fragment>
  )
}

export default Oxbridge