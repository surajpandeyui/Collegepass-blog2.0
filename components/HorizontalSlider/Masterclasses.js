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
import styles from './horizontalSlider.module.scss'
import SliderCard from '../Cards/SeriesCard'
import axios from 'axios'
import { getSeriesWithEp } from '../../config/API'
import dynamic from 'next/dynamic'
const QRRedirect = dynamic(()=>import('../Modal/MobileRedirectQR'),{
  ssr: false,
}) 

const MobileRedirect = dynamic(()=>import('../Modal/MobileRedirect'),{
  ssr: false,
}) 

// there is a separate view for phones and for desktop
const Masterclasses = ({ events = [] }) => {
  
  const router = useRouter()
  const auth = useSelector((state) => state.auth)
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)
  
  const [showQR, setShowQR] = useState(false)
  const handleCloseShowQR = () => setShowQR(false)
  const handleShowShowQR = () => setShowQR(true)

  const [showMobileRedirect, setMobileRedirect] = useState(false)
  const handleCloseMobileRedirect = () => setMobileRedirect(false)
  const handleShowMobileRedirect = () => setMobileRedirect(true)

const LoginModal = dynamic(() => import('../Modal/LoginModal'))
  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()
  let isEnableButton = false

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col className="upcoming-live pb-0">
            <Row>
              <Col>
                <h2 className="text-left pt-0 pb-0" style={{
                  marginLeft: '1%'
                }}>Masterclasses</h2>
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
                    // let playURL = `/play-video/${event.ZOOMID}/${event.NAME}`
                    // playURL = playURL.replace(/\?/g, '%3F')
                    // playURL = `${playURL}?sourcetype=youtube`

                    // isEnableButton = curTime.isBetween(enableTime, stopTime)
                    // let alreadyRegistered = false

                    // if (registeredEvents?.length > 0) {
                    //   alreadyRegistered = registeredEvents?.find((regEve) => {
                    //     return regEve.ZOOMID === event.ZOOMID
                    //   })
                    // }

                    // let cardButton = (
                    //   <Button
                    //     disabled={alreadyRegistered}
                    //     onClick={() => {
                    //       router.push(`/registration/${event?.ZOOMID}`)
                    //     }}
                    //   >
                    //     {alreadyRegistered ? 'REGISTERED' : 'REGISTER'}
                    //   </Button>
                    // )

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          imageSrc={event.banner}
                          alt={event.Title}
                          eventTitle={event.Title.length>50?`${event.Title.slice(0,40)}...`: event.Title}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          eventDescription = {event.description}
                          eventVideo = {event.Trailer}
                          eventID = {event.ID}
                          episodeVideo = {event.firstEpisode}
                          episodeTitle= {event.episodeTitle}
                          episodeIsPaid={event.episodePaid}
                          episodeID = {event.episodeID}
                          userid={auth.userDetails.ID}
                          showLogin = {handleShowLogin}
                          showRedirect = {handleShowShowQR}
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
                    // let playURL = `/play-video/${event.ZOOMID}/${event.NAME}`
                    // playURL = playURL.replace(/\?/g, '%3F')
                    // playURL = `${playURL}?sourcetype=youtube`

                    // isEnableButton = curTime.isBetween(enableTime, stopTime)
                    // let alreadyRegistered = false

                  
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          imageSrc={event.banner}
                          alt={event.Title}
                          eventTitle={event.Title.length>50?`${event.Title.slice(0,40)}...`: event.Title}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          eventDescription = {event.description}
                          eventVideo = {event.Trailer}
                          eventID = {event.ID}
                          episodeVideo = {event.firstEpisode}
                          episodeTitle= {event.episodeTitle}
                          episodeIsPaid={event.episodePaid}
                          episodeID = {event.episodeID}
                          showLogin = {handleShowLogin}
                          userid={auth.userDetails.ID}
                          showRedirect = {handleShowMobileRedirect}
                          // cardButton={cardButton}

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
      <QRRedirect showLinkModal={showQR} handleCloseLinkModal={handleCloseShowQR} />
      <MobileRedirect showLinkModal={showMobileRedirect} handleCloseLinkModal={handleCloseMobileRedirect} />
      
    </Fragment>
  )
}

export default Masterclasses
