import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from './streams.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SliderCard from '../../components/Cards/LiveBigCard'
import VideoBigCard from '../../components/Cards/VideoBigCard'
import axios from 'axios'
import { APIgetRegEvents } from '../../config/API'
import moment from 'moment'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const QRRedirect = dynamic(()=>import('../../components/Modal/MobileRedirectQR'),{
  ssr: false,
}) 

const MobileRedirect = dynamic(()=>import('../../components/Modal/MobileRedirect'),{
  ssr: false,
}) 

const MyStreamsScreen = ({
  upcomingLiveStreams = [],
  recordedLiveStreams = [],
}) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false

  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => {
    // console.log("showing")
  setShowQR(true)}

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)


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
  }, [])

  const [searchString, setSearchString] = useState('')

  if (searchString.length > 0) {
    recordedLiveStreams = recordedLiveStreams.filter((recordedStream) => {
      return recordedStream.ARCHIVE_NAME.toUpperCase().includes(
        searchString.toUpperCase()
      )
    })
  }

  return (
    <Fragment>
      <Container fluid className="bg-black pb-5">
        <Container>
          <Row>
            <Col className="my-class">
              <Row>
                <Col className="text-center pt-5 pb-5">
                  <h2>UPCOMING LIVE STREAMS</h2>
                </Col>
              </Row>
              <Row className = {styles.cardSliderForDesktop}>
                {upcomingLiveStreams.map((event) => {
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
                        router.push(`/registration/${event?.ZOOMID}`)
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
                          router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )
                  }
                  if(event.ID==820)
                  {
                    event.s3_image="/tempBanners/event-820.jpg"
                  }
                  if(event.ID==810)
                  {
                    event.s3_image="/tempBanners/event-810.jpg"
                  }
                  if(event.ID==825)
                  {
                    event.s3_image="/tempBanners/event-825.jpg"
                  }
                  if(event.ID==821)
                  {
                    event.s3_image="/tempBanners/event-821.jpg"
                  }
                  if(event.ID==811)
                  {
                    event.s3_image="/tempBanners/event-811.jpg"
                  }
                  if(event.ID==823)
                  {
                    event.s3_image="/tempBanners/event-823.jpg"
                  }
                  if(event.ID==822)
                  {
                    event.s3_image="/tempBanners/event-822.jpg"
                  }
                  // console.log("===============>",event.GRADES)
                  return (
                    <SliderCard
                      imageSrc={event.s3_image}
                      alt={event.NAME}
                      eventTitle={event.NAME}
                      eventDate={eventDate}
                      eventTime={eventTime}
                      topLeftText={topLeftText}
                      topRightText={topRightText}
                      cardButton={cardButton}
                      grades = {event.GRADES}
                    />
                  )
                })}
              </Row>
              
              {/* for mobile */}
              <Row className = {styles.cardSliderForMobile}>
                {upcomingLiveStreams.map((event) => {
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
                        router.push(`/registration/${event?.ZOOMID}`)
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
                          router.push(`/registration/${event?.ZOOMID}`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )
                  }
                  if(event.ID==820)
                  {
                    event.s3_image="/tempBanners/event-820.jpg"
                  }
                  if(event.ID==810)
                  {
                    event.s3_image="/tempBanners/event-810.jpg"
                  }
                  if(event.ID==825)
                  {
                    event.s3_image="/tempBanners/event-825.jpg"
                  }
                  if(event.ID==821)
                  {
                    event.s3_image="/tempBanners/event-821.jpg"
                  }
                  if(event.ID==811)
                  {
                    event.s3_image="/tempBanners/event-811.jpg"
                  }
                  if(event.ID==823)
                  {
                    event.s3_image="/tempBanners/event-823.jpg"
                  }
                  if(event.ID==822)
                  {
                    event.s3_image="/tempBanners/event-822.jpg"
                  }
                  return (
                    <SliderCard
                      imageSrc={event.s3_image}
                      alt={event.NAME}
                      eventTitle={event.NAME}
                      eventDate={eventDate}
                      eventTime={eventTime}
                      topLeftText={topLeftText}
                      topRightText={topRightText}
                      cardButton={cardButton}
                    />
                  )
                })}
              </Row>

              <Row>
                <Col className="text-center pt-5 pb-5">
                  <Row>
                    <Col>
                      <h2>PREVIOUS LIVE STREAMS </h2>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col className={styles.search}>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            placeholder="Search"
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className = {styles.cardSliderForDesktop}>
                {recordedLiveStreams.map((recordedStream) => {
                  let playURL = `/play-video/${recordedStream.VIMEO_ID}/${recordedStream.ARCHIVE_NAME}`
                  playURL = playURL.replace(/\?/g, '%3F')
                  playURL = `${playURL}?sourcetype=vimeo`

                  const eventDate = moment
                    .utc(recordedStream.EVENT_DATE_TIME)
                    .utcOffset(utc_add)
                    .format('dddd, MMMM DD')

                  let playButton = (
                    <Button
                      onClick={() => {
                        router.push('/pricing')
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
                          router.push('/pricing')
                        }}
                      >
                        
                        WATCH
                      </Button>
                    )
                  }

                  return (
                    <VideoBigCard
                      imageSrc={recordedStream.s3_image}
                      alt={recordedStream.ARCHIVE_NAME}
                      eventTitle={recordedStream.ARCHIVE_NAME}
                      eventDate={eventDate}
                      cardButton={playButton}
                      topLeftText={'VIDEO'}
                      topRightText={'Plus'}
                    />
                  )
                })}
              </Row>

              {/* For Mobile */}
              
              <Row className={styles.cardSliderForMobile}>
                {recordedLiveStreams.map((recordedStream) => {
                  let playURL = `/play-video/${recordedStream.VIMEO_ID}/${recordedStream.ARCHIVE_NAME}`
                  playURL = playURL.replace(/\?/g, '%3F')
                  playURL = `${playURL}?sourcetype=vimeo`

                  const eventDate = moment
                    .utc(recordedStream.EVENT_DATE_TIME)
                    .utcOffset(utc_add)
                    .format('dddd, MMMM DD')

                  let playButton = (
                    <Button
                      onClick={() => {
                        router.push('/pricing')
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
                          router.push('/pricing')
                        }}
                      >
                        WATCH
                      </Button>
                    )
                  }

                  return (
                    <VideoBigCard
                      imageSrc={recordedStream.s3_image}
                      alt={recordedStream.ARCHIVE_NAME}
                      eventTitle={recordedStream.ARCHIVE_NAME}
                      eventDate={eventDate}
                      cardButton={playButton}
                      topLeftText={'VIDEO'}
                      topRightText={'Plus'}
                    />
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <QRRedirect showLinkModal={showQR} handleCloseLinkModal={handleCloseShowQR} />
      <MobileRedirect showLinkModal={showMobileRedirect} handleCloseLinkModal={handleCloseMobileRedirect} />

    </Fragment>
  )
}

export default MyStreamsScreen
