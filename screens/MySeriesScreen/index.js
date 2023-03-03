import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from './streams.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SliderCard from '../../components/Cards/SeriesBigCard'
import VideoBigCard from '../../components/Cards/VideoBigCard'
import axios from 'axios'
import { APIgetRegEvents } from '../../config/API'
import moment from 'moment'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const QRRedirect = dynamic(() => import('../../components/Modal/MobileRedirectQR'), {
  ssr: false,
})

const MobileRedirect = dynamic(() => import('../../components/Modal/MobileRedirect'), {
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

  const [registeredEvents, setRegisteredEvents] = useState([])


  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => setShowQR(true)

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)

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
    // console.log(upcomingLiveStreams)
    upcomingLiveStreams = upcomingLiveStreams.filter((recordedStream) => {
      return recordedStream.Title.toUpperCase().includes(
        searchString.toUpperCase()
      )
    })
  }
  let cardButton = (
    <Button><i className="fa fa-play" aria-hidden="true"></i> Play</Button>
  )
  // console.log(upcomingLiveStreams)

  return (
    <Fragment>
      <Container fluid className="bg-black pb-5">
        <Container>
          <Row>
            <Col className="my-class">
              <Row>
                <Col className="text-center pt-5 pb-5">
                  <Row>
                    <Col>
                      <h2> MASTERCLASSES </h2>
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
              <Row className={styles.cardSliderForDesktop}>
                <Row>
                  {upcomingLiveStreams.map((event) => {



                    let topLeftText = 'Masterclass'
                    let topRightText = 'Plus'

                    const eventDate = moment
                      .utc(event.date)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    const eventTime = moment
                      .utc(
                        event.date
                          ? event.date
                          : event.EVENT_DATE_TIME
                            ? event.EVENT_DATE_TIME
                            : event.DATE
                      )
                      .utcOffset(utc_add)
                      .format('hh:mm A')

                    const enableTime = moment
                      .utc(event.date)
                      .subtract(15, 'minute')
                      .format()

                    const stopTime = moment
                      .utc(event.date)
                      .add(2, 'h')
                      .format()

                    return (
                      <SliderCard
                        imageSrc={event.banner}
                        alt={event.Title}
                        eventTitle={event.Title.length > 50 ? `${event.Title.slice(0, 40)}...` : event.Title}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        topLeftText={topLeftText}
                        topRightText={topRightText}
                        eventDescription={event.description}
                        eventVideo={event.Trailer}
                        eventID={event.ID}
                        episodeVideo={event.firstEpisode}
                        episodeTitle={event.episodeTitle}
                        episodeIsPaid={event.episodePaid}
                        episodeID={event.episodeID}
                        cardButton={cardButton}
                        showRedirect={handleShowShowQR}
                      />
                    )
                  })}
                </Row>
              </Row>

              {/* Mobile Account */}
              <Row className={styles.cardSliderForMobile}>
                <Row>
                  {upcomingLiveStreams.map((event) => {



                    let topLeftText = 'Masterclass'
                    let topRightText = 'Plus'

                    const eventDate = moment
                      .utc(event.date)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    const eventTime = moment
                      .utc(
                        event.date
                          ? event.date
                          : event.EVENT_DATE_TIME
                            ? event.EVENT_DATE_TIME
                            : event.DATE
                      )
                      .utcOffset(utc_add)
                      .format('hh:mm A')

                    const enableTime = moment
                      .utc(event.date)
                      .subtract(15, 'minute')
                      .format()

                    const stopTime = moment
                      .utc(event.date)
                      .add(2, 'h')
                      .format()

                    return (
                      <SliderCard
                        imageSrc={event.banner}
                        alt={event.Title}
                        eventTitle={event.Title.length > 50 ? `${event.Title.slice(0, 40)}...` : event.Title}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        topLeftText={topLeftText}
                        topRightText={topRightText}
                        eventDescription={event.description}
                        eventVideo={event.Trailer}
                        eventID={event.ID}
                        episodeVideo={event.firstEpisode}
                        episodeTitle={event.episodeTitle}
                        episodeIsPaid={event.episodePaid}
                        episodeID={event.episodeID}
                        cardButton={cardButton}
                        showRedirect={handleShowMobileRedirect}
                      />
                    )
                  })}
                </Row>
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
