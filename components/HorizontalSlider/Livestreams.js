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
import { loadUser } from '../../actions/authActions'
import styles from './horizontalSlider.module.scss'
import SliderCard from '../Cards/LiveCard'
import axios from 'axios'
import { APIgetRegEvents, APIeventRegistration } from '../../config/API'
import dynamic from 'next/dynamic'

const LoginModal = dynamic(() => import('../Modal/LoginModal'))
const EventRegistration = dynamic(() => import('../Modal/EventRegistration'), {
  ssr: false,
})
const QRRedirect = dynamic(() => import('../Modal/MobileRedirectQR'), {
  ssr: false,
})

const MobileRedirect = dynamic(() => import('../Modal/MobileRedirect'), {
  ssr: false,
})

// import VideoCard from '../Cards/VideoCard'

// there is a separate view for phones and for desktop
const Livestreams = ({ events = [] }) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const timezone = auth.timezone ? auth.timezone : 'Asia/Kolkata'
  const curTime = moment()
  let isEnableButton = false

  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => setShowQR(true)

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)

  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [showRegModal, setShowRegModal] = useState(false)
  const [isClicked, setisClicked] = useState(false)
  const handleCloseRegModal = () => setShowRegModal(false)
  const [formDetails, setFormDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    grade: '',
    curriculum: '',
    school_name: '',
    COI: '',
    city: '',
  })

  const autoSubmit = async () => {
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
      city: formDetails.city ? formDetails.city : cityDetails.id,
      school_name: formDetails.school_name,
      curriculum: formDetails.curriculum,
      countriesOfInterest: formDetails.COI,
    }
    // console.log('apiBody', apiBody)
    // setsubmitted(true)
    const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
    // console.log(registerEventDetails)
    if (registerEventDetails.data.statusCode === 200) {
      // handleClose()
      router.push(`/event-registration-success/${eventDetails.ZOOMID}`)
      // setShowSuccess(false)
    } else {
      setShowRegModal(true)
    }
  }
  useEffect(() => {
    if (isClicked) {
      if (
        formDetails.email != '' &&
        formDetails.name != '' &&
        formDetails.grade != '' &&
        formDetails.phoneNumber != '' &&
        formDetails.curriculum != '' &&
        formDetails.school_name != '' &&
        formDetails.city != '' &&
        formDetails.email &&
        formDetails.name &&
        formDetails.grade &&
        formDetails.phoneNumber &&
        formDetails.curriculum &&
        formDetails.school_name &&
        formDetails.city
      ) {
        // console.log("Auto submitting")
        autoSubmit()
      } else {
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
    if (!auth.isAuthenticated) {
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
      email: auth.user ? auth.user : '',
      school_name: auth.userDetails?.SCHOOL,
      city: parseInt(auth.userDetails?.CITY),
    })
    // if(!(formDetails.email != '' && formDetails.name != '' && formDetails.grade != '' && formDetails.phoneNumber != '' && formDetails.curriculum != '' &&
    //   formDetails.school_name != '' && formDetails.city != '' && formDetails.email && formDetails.name && formDetails.grade && formDetails.phoneNumber && formDetails.curriculum &&
    //   formDetails.school_name && cityDetails))
    //   {
    //     setShowRegModal(true)
    //   }

    // setShowRegModal(true)
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
      // console.log("regEvents",regEvents)
    }
    // console.log("regAuth",auth)
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
                <h2
                  className="text-left  pb-0"
                  style={{
                    marginLeft: '1%',
                  }}
                >
                  Live Streams
                </h2>
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
                    console.log('Event causing issue -------->', event)
                    // LOOP FOR EACH EVENT
                    // console.log(event)
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
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                    let liveStatus =
                      curTime.isSameOrAfter(
                        event_date_time.subtract(10, 'minute').format()
                      ) &&
                      curTime.isBefore(
                        event_date_time.add(30, 'minute').format()
                      )
                    //  let liveStatus = curTime.isBetween(enableTime, stopTime)
                    //   console.log(event.NAME)
                    //   console.log("curr time",curTime)
                    //   console.log("event time",event_date_time)
                    //  console.log("start time",enableTime)
                    //  console.log("end time",event_date_time.add(50, 'minute').format())

                    isEnableButton = curTime.isBetween(enableTime, stopTime)
                    let isOver = curTime.isAfter(stopTime)

                    let alreadyRegistered = false

                    if (registeredEvents?.length > 0) {
                      alreadyRegistered = registeredEvents?.find((regEve) => {
                        return regEve.ZOOMID === event.ZOOMID
                      })
                    }

                    let cardButton = (
                      <Button
                        disabled={alreadyRegistered}
                        onClick={() => {
                          // handleShowShowQR()
                          handleShowRegModal(event)
                          // router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )

                    //account trial = true means there are on free tier
                    //account trial = false means they have exhausted free tier
                    if (isEnableButton === true && !auth.isAuthenticated) {
                      cardButton = (
                        <Button
                          onClick={() => {
                            handleShowShowQR()
                            // handleShowLogin()
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else {
                      if (
                        isEnableButton === true &&
                        (auth.accountTrial === true ||
                          auth.userDetails?.ISPREMIUM >= event.PREMIUM_LEVEL)
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
                        auth.userDetails.ISPREMIUM < event.PREMIUM_LEVEL
                      ) {
                        //if event is starting in 15 min and user is not prime nor within free trial tier
                        cardButton = (
                          <Button
                            onClick={(e) => {
                              handleShowShowQR()
                              // router.push(`/pricing`)
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
                              // handleShowShowQR()
                              handleShowRegModal(event)
                            }}
                          >
                            {isOver
                              ? 'RECODING WILL BE AVAILABLE IN FEW DAYS'
                              : alreadyRegistered
                              ? 'REGISTERED'
                              : 'REGISTER'}
                          </Button>
                        )
                      }
                    }
                    if (event.ID == 820) {
                      event.s3_image = '/tempBanners/event-820.jpg'
                    }
                    if (event.ID == 810) {
                      event.s3_image = '/tempBanners/event-810.jpg'
                    }
                    if (event.ID == 825) {
                      event.s3_image = '/tempBanners/event-825.jpg'
                    }
                    if (event.ID == 821) {
                      event.s3_image = '/tempBanners/event-821.jpg'
                    }
                    if (event.ID == 811) {
                      event.s3_image = '/tempBanners/event-811.jpg'
                    }
                    if (event.ID == 823) {
                      event.s3_image = '/tempBanners/event-823.jpg'
                    }
                    if (event.ID == 822) {
                      event.s3_image = '/tempBanners/event-822.jpg'
                    }

                    // console.log("card button",liveStatus)
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          eventid={event.ID}
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={
                            event.NAME.length > 50
                              ? `${event.NAME.slice(0, 50)}...`
                              : event.NAME
                          }
                          eventDate={eventDate}
                          eventTime={eventTime + ' ' + timezone}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={cardButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={liveStatus}
                          premiumLevel={event.PREMIUM_LEVEL}
                          userid={auth.userDetails.ID}
                          grades={event.GRADES}
                          showLogin={handleShowLogin}
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
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                    let liveStatus =
                      curTime.isSameOrAfter(
                        event_date_time.subtract(10, 'minute')
                      ) && curTime.isBefore(event_date_time.add(30, 'minute'))

                    let isOver = curTime.isAfter(stopTime)

                    isEnableButton = curTime.isBetween(enableTime, stopTime)
                    let alreadyRegistered = false

                    if (registeredEvents?.length > 0) {
                      alreadyRegistered = registeredEvents?.find((regEve) => {
                        return regEve.ZOOMID === event.ZOOMID
                      })
                    }

                    let cardButton = (
                      <Button
                        disabled={alreadyRegistered}
                        onClick={() => {
                          // handleShowMobileRedirect()
                          handleShowRegModal(event)
                          // router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )

                    //account trial = true means there are on free tier
                    //account trial = false means they have exhausted free tier
                    if (isEnableButton === true && !auth.isAuthenticated) {
                      cardButton = (
                        <Button
                          onClick={() => {
                            handleShowMobileRedirect()
                            // handleShowLogin()
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    } else {
                      if (
                        isEnableButton === true &&
                        (auth.accountTrial === true ||
                          auth.userDetails?.ISPREMIUM >= event.PREMIUM_LEVEL)
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
                        auth.userDetails?.ISPREMIUM < event.PREMIUM_LEVEL
                      ) {
                        //if event is starting in 15 min and user is not prime nor within free trial tier
                        cardButton = (
                          <Button
                            onClick={(e) => {
                              handleShowMobileRedirect()
                              // router.push(`/pricing`)
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
                              // handleShowMobileRedirect()
                              // router.push(`/registration/${event?.ZOOMID}`)
                              handleShowRegModal(event)
                            }}
                          >
                            {isOver
                              ? 'RECODING WILL BE AVAILABLE IN FEW DAYS'
                              : alreadyRegistered
                              ? 'REGISTERED'
                              : 'REGISTER'}
                          </Button>
                        )
                      }
                    }
                    if (event.ID == 820) {
                      event.s3_image = '/tempBanners/event-820.jpg'
                    }
                    if (event.ID == 810) {
                      event.s3_image = '/tempBanners/event-810.jpg'
                    }
                    if (event.ID == 825) {
                      event.s3_image = '/tempBanners/event-825.jpg'
                    }
                    if (event.ID == 821) {
                      event.s3_image = '/tempBanners/event-821.jpg'
                    }
                    if (event.ID == 811) {
                      event.s3_image = '/tempBanners/event-811.jpg'
                    }
                    if (event.ID == 823) {
                      event.s3_image = '/tempBanners/event-823.jpg'
                    }
                    if (event.ID == 822) {
                      event.s3_image = '/tempBanners/event-822.jpg'
                    }
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          eventid={event.ID}
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={
                            event.NAME.length > 50
                              ? `${event.NAME.slice(0, 50)}...`
                              : event.NAME
                          }
                          eventDate={eventDate}
                          eventTime={eventTime + ' ' + timezone}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={cardButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={liveStatus}
                          premiumLevel={event.PREMIUM_LEVEL}
                          userid={auth.userDetails.ID}
                          grades={event.GRADES}
                          showLogin={handleShowLogin}
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
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
      <EventRegistration
        show={showRegModal}
        handleClose={handleCloseRegModal}
        eventDetails={eventDetails}
      />
      <QRRedirect
        showLinkModal={showQR}
        handleCloseLinkModal={handleCloseShowQR}
      />
      <MobileRedirect
        showLinkModal={showMobileRedirect}
        handleCloseLinkModal={handleCloseMobileRedirect}
      />
    </Fragment>
  )
}

export default Livestreams
