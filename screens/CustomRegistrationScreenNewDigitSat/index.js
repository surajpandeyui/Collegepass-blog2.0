import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, NavItem } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../CustomRegistrationScreen/custom.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetails } from '../../actions/eventRegistrationActions'
import Link from 'next/link'
import moment from 'moment'
import EventRegistration from '../../components/Modal/EventRegistration'

const CustomRegistrationScreenNewDigitSat = ({ eventID }) => {
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
              <Col className={styles.eventBanner}>
                <Image
                  width={1280}
                  height={437}
                  layout="responsive"
                  quality={65}
                  src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/ivy_league_mumbai_4dec+(1).jpg"
                  alt="Event Banner"
                />
              </Col>
            </Row>
            {/* <Row className={styles.eventBannerText}>
              <Col>
                <Row>
                  <Col className="mt-3 pt-2">
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
                    <h1>THE IVY LEAGUE TOWNHALL</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>Sunday, Nov 06</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>04:00 PM</h6>
                  </Col>
                </Row>
              </Col>
            </Row> */}
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
                  <div>
                    <p>Hello Students & Parents,</p>
                    <p>CollegePass - A Singapore headquartered, college admissions and test prep company is hosting an Exclusive College Profile Building Session for students in Grade 10-11!</p>
                    <p>Venue: <span style={{
                      color: 'rgb(230, 168, 81)'
                    }}> Trident, BKC, Mumbai</span></p>
                    <p>During the Profile Building Session, the CollegePass team will take a closer look at the Application Process of the Ivy League and other highly selective universities in the US.</p>
                    <p>The CollegePass Profile Building Session would look at the following elements of a strong college profile:</p>
                    <p>1. What are Top US Universities looking for in their students?</p>
                    <p>2. Key Components of a Strong Profile Application</p>
                    <p>3. How to build a Personal College Admissions Plan</p>
                    <p>4. How to get Ivy Ready?</p>
                    <p>5. Is SAT Still relevant?</p>
                  </div>
                </Col>
              </Row>
                <Row>
                  <Col className={styles.customRegBtn}>
                    <Button onClick={handleShowRegModal}>Register</Button>
                  </Col>
                </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default CustomRegistrationScreenNewDigitSat