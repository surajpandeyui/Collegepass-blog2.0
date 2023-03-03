import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, A11y } from 'swiper'
import { useSelector } from 'react-redux'
import moment from 'moment'

import styles from './horizontalSlider.module.scss'
import SliderCard from '../Cards/VideoCard'
// import VideoCard from '../Cards/VideoCard'

// there is a separate view for phones and for desktop
const HorizontalSlider = ({
  sliderTitle = 'Horizontal Slider',
  events = [],
}) => {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)
  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'

  return (
    <Fragment>
      <Container fluid>
        <Row className="video-card">
          <Col className="upcoming-live pb-0">
            <Row>
              <Col>
                <h2 className="text-left pb-2">{sliderTitle}</h2>
              </Col>
            </Row>
            <Row>
              <Col className={styles.cardSliderForDesktop}>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={15}
                  slidesPerView={4.1}
                  navigation
                  //pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                >
                  {events.map((event, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    let topLeftText = 'Video'
                    let topRightText = 'Basic'
                    let cardButton = (
                      <Button
                        onClick={() => {
                          router.push(
                            `/play-video/${event?.URL}/${event?.NAME}?sourcetype=vimeo`
                          )
                        }}
                      >
                        WATCH
                      </Button>
                    )
                    if (event.SOURCE === 2) {
                      //youtube component to be called
                      cardButton = (
                        <Button
                          onClick={() => {
                            router.push(
                              `/play-video/${event?.URL}/${event?.NAME}?sourcetype=youtube`
                            )
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    }
                    if(auth.userDetails?.ISPREMIUM <= 1 ||  !auth.userDetails?.ISPREMIUM)
                    {
                      cardButton = (
                        <Button
                          onClick={() => {
                            router.push(
                              `/pricing`
                            )
                          }}
                        >
                          WATCH
                        </Button>
                      )
                    }
                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={event.NAME}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          cardButton={cardButton}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={event.is_live}
                          premiumLevel = {event.PREMIUM_LEVEL}
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
                    const eventDate = moment
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                      .format('dddd, MMMM DD')

                    const eventTime = moment
                      .utc(event.DATE_TIME)
                      .utcOffset(utc_add)
                      .format('hh:mm A')

                    // logic to be used to push to play video or to be pushed to zoom component
                    let urlToRedirect = '/'
                    let buttonText = 'JOIN NOW'
                    let topLeftText = 'Live Stream'
                    let topRightText = 'Plus'

                    return (
                      <SwiperSlide key={idx}>
                        <SliderCard
                          imageSrc={event.s3_image}
                          alt={event.NAME}
                          eventTitle={event.NAME}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          buttonText={buttonText}
                          onClickCard={(e) => {
                            e.preventDefault()
                            router.push(urlToRedirect)
                          }}
                          topLeftText={topLeftText}
                          topRightText={topRightText}
                          eventDescription={event.DESC}
                          eventVideo={event.VIDEO_URL}
                          liveStatus={event.is_live}
                          premiumLevel = {event.PREMIUM_LEVEL}
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
    </Fragment>
  )
}

export default HorizontalSlider
