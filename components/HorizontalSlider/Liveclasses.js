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
import SliderCard from '../Cards/LiveClass'
import axios from 'axios'
import { APIgetRegEvents } from '../../config/API'
import dynamic from 'next/dynamic'
const LoginModal = dynamic(() => import('../Modal/LoginModal'))
// import VideoCard from '../Cards/VideoCard'

// there is a separate view for phones and for desktop
const LiveClasses = ({ events = [] }) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false
  // let liveStatus = false
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)

  const [registeredEvents, setRegisteredEvents] = useState([])

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
                <h2 className="text-left pt-0 pb-0" style={{
                  marginLeft: '1%'
                }}>Live Classes</h2>
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
                    let pushLocation = '';
                    if (event.EVENT_TYPE === 'IELTS')
                      pushLocation = 'ielts-tutoring'
                    else if (event.EVENT_TYPE === 'AP')
                      pushLocation = '/ap-calculus-tutoring'
                    else if (event.EVENT_TYPE === 'CLASS')
                      pushLocation = '/sat-tutoring'

                    let topLeftText = 'Live class'
                    let topRightText = 'Premium'




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

                    let stopTime = moment
                      .utc(event.DATE_TIME)
                      .add(1, 'h')
                      .format()
                    if (moment.utc(event.DATE_TIME).utcOffset(utc_add).day() == 6) {
                      stopTime = moment
                        .utc(event.DATE_TIME)
                        .add(2, 'h')
                        .format()
                    }



                    const event_date_time = moment
                      .utc(event.DATE_TIME).utcOffset(utc_add)
                    isEnableButton = curTime.isBetween(enableTime, stopTime)

                    // eventTime

                    // console.log(curTime.isSameOrAfter(event_date_time))
                    // let liveStatus = datee.isSame(eventDate) && current.isSameOrAfter(eventTime) && current.isBefore(stopTime)
                    let liveStatus = curTime.isSameOrAfter(event_date_time.subtract(10, 'minute')) && curTime.isBefore(stopTime)
                    let alreadyRegistered = false
                    let isOver = curTime.isAfter(stopTime)
                    if (registeredEvents?.length > 0) {
                      alreadyRegistered = registeredEvents?.find((regEve) => {
                        return regEve.ZOOMID === event.ZOOMID
                      })
                    }

                    let cardButton = (
                      <Button
                        disabled={alreadyRegistered || isOver}
                        onClick={() => {
                          router.push(pushLocation)
                        }}
                      >
                        {isOver ? 'RECODING WILL BE AVAILABLE IN FEW DAYS' : alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )

                    //account trial = true means there are on free tier
                    //account trial = false means they have exhausted free tier
                    if (isEnableButton === true && !auth.isAuthenticated) {

                      cardButton = (
                        <Button
                          onClick={() => {
                            handleShowLogin()
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    }
                    else {
                      if (
                        isEnableButton === true &&
                        (auth.accountTrial === true ||
                          auth.userDetails?.ISPREMIUM >= 3)
                      ) {
                        //if event is starting in 15 min and user is prime+
                        cardButton = (
                          <Button
                            onClick={() => {
                              router.push(`/live/${event?.ZOOMID}`)
                            }}
                          >
                            JOIN NOW
                          </Button>
                        )
                      } else if (
                        isEnableButton === true &&
                        auth.userDetails.ISPREMIUM <= 2
                      ) {
                        //if event is starting in 15 min and user is not prime nor within free trial tier
                        cardButton = (
                          <Button
                            onClick={(e) => {
                              router.push(`/pricing`)
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
                              router.push(pushLocation)
                            }}
                          >
                            {isOver ? 'RECODING WILL BE AVAILABLE IN FEW DAYS' : alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                          </Button>
                        )
                      }
                    }
                    // console.log(event)
                    // if(event.NAME.includes('SAT MASTERCLASS PRO'))
                    // {
                    //   event.s3_image="/tempBanners/SAT MasterClass_00000.jpg"
                    // }
                    // if(event.NAME.includes('SAT Math'))
                    // {
                    //   event.s3_image="/tempBanners/SAT Maths_00000.jpg"
                    // }
                    // if(event.NAME.includes('SAT English'))
                    // {
                    //   event.s3_image="/tempBanners/SAT English_00000.jpg"
                    // }
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard

                          eventid={event.ID}
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
                          userid={auth.userDetails.ID}
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
                    let pushLocation = '';
                    if (event.EVENT_TYPE === 'IELTS')
                      pushLocation = 'ielts-tutoring'
                    else if (event.EVENT_TYPE === 'AP')
                      pushLocation = '/ap-calculus-tutoring'
                    else if (event.EVENT_TYPE === 'CLASS')
                      pushLocation = '/sat-tutoring'
                    let topLeftText = 'Live Class'
                    let topRightText = 'Premium'

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
                    let liveStatus = curTime.isSameOrAfter(event_date_time.subtract(10, 'minute')) && curTime.isBefore(stopTime)
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
                          router.push(pushLocation)
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
                            handleShowLogin()
                          }}
                        >
                          JOIN NOW
                        </Button>
                      )
                    }
                    else {
                      if (
                        isEnableButton === true &&
                        (auth.accountTrial === true ||
                          auth.userDetails?.ISPREMIUM >= 3)
                      ) {
                        //if event is starting in 15 min and user is prime+
                        cardButton = (
                          <Button
                            onClick={() => {
                              router.push(`/live/${event?.ZOOMID}`)
                            }}
                          >
                            JOIN NOW
                          </Button>
                        )
                      } else if (
                        isEnableButton === true &&
                        auth.userDetails.ISPREMIUM <= 2
                      ) {
                        //if event is starting in 15 min and user is not prime nor within free trial tier
                        cardButton = (
                          <Button
                            onClick={(e) => {
                              router.push(`/pricing`)
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
                              router.push(pushLocation)
                            }}
                          >
                            {isOver ? 'RECODING WILL BE AVAILABLE IN FEW DAYS' : alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                          </Button>
                        )
                      }
                    }
                    // if(event.NAME.includes('SAT MASTERCLASS PRO'))
                    // {
                    //   event.s3_image="/tempBanners/SAT MasterClass_00000.jpg"
                    // }
                    // if(event.NAME.includes('SAT Math'))
                    // {
                    //   event.s3_image="/tempBanners/SAT Maths_00000.jpg"
                    // }
                    // if(event.NAME.includes('SAT English'))
                    // {
                    //   event.s3_image="/tempBanners/SAT English_00000.jpg"
                    // }
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={event.NAME.length > 50 ? `${event.NAME.slice(0, 40)}...` : event.NAME}
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
                </Swiper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </Fragment>
  )
}

export default LiveClasses
