import React, { Fragment, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import styles from './video.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import moment from 'moment'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APIgetRegEvents,getSeriesWithEp,APIeventRegistration } from '../../config/API'
import { useRouter } from 'next/router'
import EventRegistration from '../Modal/EventRegistration'

import dynamic from 'next/dynamic'
const QRRedirect = dynamic(()=>import('../Modal/MobileRedirectQR'),{
  ssr: false,
}) 

const MobileRedirect = dynamic(()=>import('../Modal/MobileRedirect'),{
  ssr: false,
}) 

const AfterLoginSlider = ({ videoSliderEvents }) => {

  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false

  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => setShowQR(true)

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)

  const [registeredEvents, setRegisteredEvents] = useState([])
  const [showRegModal, setShowRegModal] = useState(false)
  const [seriesWithEp, setseriesWithEp] = useState()
  const [isClicked, setisClicked] = useState(false)
  const handleCloseRegModal = () => setShowRegModal(false)
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
    }
    if (auth.userDetails.ID) {
      getRegEvents()
    }
  }, [auth])
  const showVideo = (video, title, paid, series, episode) => {
    let playURL = `/play-series/${video}/${title.replace(/\//g, '%2F')}`
    playURL = playURL.replace(/\?/g, '%3F')
    playURL = `${playURL}?sourcetype=${series}vimeo${episode}`
    // console.log("detail==>", auth.userDetails, paid)
    if (auth.userDetails?.ISPREMIUM === undefined) {
      setShowLogin(true)
    }
    else if (auth.userDetails?.ISPREMIUM >= 2 || (auth.userDetails?.ISPREMIUM == 1 || auth.userDetails?.ISPREMIUM !== undefined) && !paid) {
      // router.push(playURL)
      window.open(playURL)
    }
    else {
      router.push('/pricing')
    }


  }
  const getSerieswithEpisode = (eventID) => {


    axios
      .post(getSeriesWithEp, { series: eventID })
      .then((e) => {
        // console.log(e.data.message)
        setseriesWithEp(e.data.message)
        setShow(true);
      })
      .catch((error) => {
        //   console.log(error)
      })



  }

  return (
    <Fragment>
      <EventRegistration
        show={showRegModal}
        handleClose={handleCloseRegModal}
        eventDetails={eventDetails}
      />
      <Container fluid className="video-slider-new">
        <Row>
          <Col className={styles.slider}>
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              /*pagination={{clickable: true}}*/
              loop={true}
              >
              {videoSliderEvents.map((event) => {
                // console.log("mappiing", event)

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

                isEnableButton = curTime.isBetween(enableTime, stopTime)
                let alreadyRegistered = false
                if (registeredEvents.length > 0) {
                  alreadyRegistered = registeredEvents.find((regEve) => {
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
                      disabled={alreadyRegistered}
                      onClick={() => {
                        handleShowRegModal(event)
                      }}
                    >
                      {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                    </Button>
                  )
                }
                if (event?.episodes && event.episodes > 0) {
                  // event['DATE_TIME'] = event.Date
                  // getSerieswithEpisode(event.ID)
                  return (

                    <SwiperSlide>
                      <Row className="">
                        <Col>
                          <Row>
                            <Col className={styles.eventVideoSlider}>
                              <Row>
                                <Col>
                                  <video
                                    width="400"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  //poster=""
                                  >
                                    <source
                                      src={event.Trailer}
                                      type="video/mp4"
                                    />
                                  </video>
                                </Col>
                              </Row>
                              <Row className={styles.videoText}>
                                <Col>
                                  <Row>
                                    <Col>
                                      <Image
                                        width="190"
                                        height="70"
                                        src="/golden-logo-removebg.png"
                                        alt="logo"
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h1>{event.Title}</h1>
                                    </Col>
                                  </Row>
                                  {/* <Row>
                                    <Col>
                                      <h5>
                                        {eventDate}, {eventTime}
                                      </h5>
                                    </Col>
                                  </Row> */}
                                  <Row>
                                    <Col><Button

                                      onClick={() => {
                                        
                                          let a = event.firstEpisode
                                          let b = a.split("/")[4].split("?")
                                          a = b[1].split("=")[b[1].split("=").length - 1]
                                          // showVideo(b[0] + "%3Fh=" + a, episode.TITLE, episode.IS_PAID, seriesWithEp.series.ID,episode.ID )
                                          
                                         showVideo(b[0] + "%3Fh=" + a, event.episodeTitle,event.episodePaid, event.ID,event.episodeID)
                                      }}
                                    >
                                      Play
                                    </Button></Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </SwiperSlide>
                  )
                }
                else {
                  return (

                    <SwiperSlide>
                      <Row className="">
                        <Col>
                          <Row>
                            <Col className={styles.eventVideoSlider}>
                              <Row className={styles.videoSliderForDesktop}>
                                <Col>
                                  {event.VIDEO_URL ? <video
                                    width="400"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  //poster=""
                                  >
                                    <source
                                      src={event.VIDEO_URL}
                                      type="video/mp4"
                                    />
                                  </video> : <img src={event.IMAGE_URL} alt={event.NAME}/>}
                                </Col>
                              </Row>
                              <Row className={styles.videoSliderForMobile}>
                                <Col>
                                  {event.MOBILE_VIDEO_URL ? <video
                                    width="400"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  //poster=""
                                  >
                                    <source
                                      src={event.MOBILE_VIDEO_URL}
                                      type="video/mp4"
                                    />
                                  </video> : <img src={event.PHONE_DESKTOP_BANNER} alt={event.NAME}/>}
                                </Col>
                              </Row>
                              <Row className={styles.videoText}>
                                <Col>
                                  <Row>
                                    <Col>{cardButton}</Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </SwiperSlide>
                  )
                }

              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
      <QRRedirect showLinkModal={showQR} handleCloseLinkModal={handleCloseShowQR} />
      <MobileRedirect showLinkModal={showMobileRedirect} handleCloseLinkModal={handleCloseMobileRedirect} />
      
    </Fragment>
  )
}

export default AfterLoginSlider
