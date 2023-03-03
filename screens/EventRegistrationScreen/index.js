import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, NavItem } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../EventRegistrationScreen/event.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetails } from '../../actions/eventRegistrationActions'
import Link from 'next/link'
import moment from 'moment'
import EventRegistration from '../../components/Modal/EventRegistration'

const EventRegistrationScreen = ({ eventID }) => {
  const dispatch = useDispatch()
  const eventDetails = useSelector((state) => state.eventDetails.eventDetails)
  const auth = useSelector((state) => state.auth)
  const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
  const curTime = moment()

  useEffect(() => {
    if (eventID) {
      dispatch(getEventDetails(eventID))
    }
  }, [eventID])

  const [showRegModal, setShowRegModal] = useState(false)
  const handleCloseRegModal = () => setShowRegModal(false)
  const handleShowRegModal = () => setShowRegModal(true)

  const eventDate = moment
    .utc(eventDetails.DATE_TIME)
    .utcOffset(utc_add)
    .format('dddd, MMMM DD')

  const eventTime = moment
    .utc(
      eventDetails.DATE_TIME
        ? eventDetails.DATE_TIME
        : eventDetails.EVENT_DATE_TIME
        ? eventDetails.EVENT_DATE_TIME
        : eventDetails.DATE
    )
    .utcOffset(utc_add)
    .format('hh:mm A')

  return (
    <Fragment>
      <EventRegistration
        show={showRegModal}
        handleClose={handleCloseRegModal}
        eventDetails={eventDetails}
      />
      <Container fluid className="bg-black pb-5">
        <Row>
          <Col className={styles.eventBannerDetails}>
            <Row>
            <Col className={styles.eventBanner} style={{
                paddingRight: '0',
                paddingLeft: '0'
              }}>
                {eventDetails?.IMAGE_URL && <Image
                  width={1280}
                  height={437}
                  layout="responsive"
                  quality={65}
                  src={eventDetails?.IMAGE_URL?eventDetails?.IMAGE_URL:null
                    // eventDetails
                    //   ? eventDetails.s3_image
                    //     ? eventDetails.s3_image
                    //     : 'https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/cornellEvent27.jpg'
                    //   : 'https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/cornellEvent27.jpg'
                  }
                  alt="Event Banner"
                />}
              </Col>
            </Row>
          </Col>
        </Row>
        <Container>
          <Row className={styles.eventDesc}>
            <Col>
              <Row>
                <Col>
                  <h2
                    style={{
                      color: '#e6a851',
                      margin: '15px 0px',
                    }}
                  >
                    EVENT DESCRIPTION
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: eventDetails?.DESC,
                    }}
                  ></div>
                </Col>
              </Row>
              <Row className={styles.eventBannerText}>
              <Col>
                {/*<Row>
                  <Col className="mt-4 pt-2">
                    <Image
                      width="55"
                      height="50"
                      src="/white-holo-n-background.png"
                      alt="White Holo"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1>{eventDetails?.NAME}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>{eventDate}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>{eventTime} Asia/Kolkata</h6>
                  </Col>
                </Row>*/}
                <Row>
                  <Col>
                    {/* <Link href={`/registration-success/${eventID}`}> */}
                    <Button onClick={handleShowRegModal}>Register</Button>
                    {/* </Link> */}
                  </Col>
                </Row>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default EventRegistrationScreen
