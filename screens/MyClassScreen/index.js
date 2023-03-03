import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from './streams.module.scss'
import { useRouter } from 'next/router'
import SliderCard from '../../components/Cards/LiveBigCard'
import VideoBigCard from '../../components/Cards/VideoBigCard'
import axios from 'axios'
import { APIgetRegEvents } from '../../config/API'
import moment from 'moment'
import { useSelector } from 'react-redux'

const MyStreamsScreen = ({
  upcomingLiveStreams = [],
  recordedLiveStreams = [],
}) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false

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
      <Container fluid className="bg-black pt-2 pb-5">
        <Container>
          <Row>
            <Col className="my-class">
              <Row>
                <Col className="text-center pt-5 pb-5">
                  <h2>UPCOMING LIVE CLASSES</h2>
                </Col>
              </Row>
              <Row>
                {upcomingLiveStreams.map((event) => {
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
                        router.push(`/sat-tutoring`)
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
                        disabled={alreadyRegistered}
                        onClick={() => {
                          router.push(`/sat-tutoring`)
                        }}
                      >
                        {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                      </Button>
                    )
                  }
                  if(event.NAME.includes('SAT MASTERCLASS PRO'))
                  {
                    event.s3_image="/tempBanners/SAT MasterClass_00000.jpg"
                  }
                  if(event.NAME.includes('SAT Math'))
                  {
                    event.s3_image="/tempBanners/SAT Maths_00000.jpg"
                  }
                  if(event.NAME.includes('SAT English'))
                  {
                    event.s3_image="/tempBanners/SAT English_00000.jpg"
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
                      <h2>PREVIOUS LIVE CLASSES </h2>
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
              <Row>
                {recordedLiveStreams.map((recordedStream) => {
                  
                  let playURL = `/play-video/${recordedStream.VIMEO_ID}/${recordedStream.ARCHIVE_NAME.replace(/\//g,'%2F')}`
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
                          router.push(playURL)
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
                      topRightText={'PREMIUM'}
                    />
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default MyStreamsScreen
