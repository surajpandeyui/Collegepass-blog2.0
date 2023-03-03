import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, NavItem } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../CustomRegistrationScreen/custom.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetails } from '../../actions/eventRegistrationActions'
import Link from 'next/link'
import moment from 'moment'
import EventRegistration from '../../components/Modal/EventRegistration'

const CustomRegistrationScreenHyderbad = ({ eventID }) => {
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
        <Row className={styles.videoSliderForDesktop}>
          <Col className={styles.eventBannerDetails}>
            <Row>
              <Col className={styles.eventBanner} style={{
                padding: '0'
              }}>
                <Image
                  width={1280}
                  height={437}
                  layout="responsive"
                  quality={100}
                  src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/CollegePass_headers_19_feb_pe.png"
                  alt="Event Banner"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.videoSliderForMobile}>
          <Col className={styles.eventBannerDetails}>
            <Row>
              <Col className={styles.eventBanner} style={{
                padding: '0'
              }}>
                <Image
                  width={375}
                  height={540}
                  layout="responsive"
                  quality={100}
                  src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/hyd_event-app_19_feb_pe.png"
                  alt="Event Banner"
                />
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
                  <div>
                    <p>Hello Parents,</p>
                    <p>If your child is in Grade 11, you have less than ten (10) months to go! The Early Applications are due on Nov 1, 2023. </p>
                    <p>You must start now to ensure you can craft a compelling narrative!</p>
                    <p>Join us as we host "The Ivy League Admissions Workshop" on Sunday, Feb 19.</p>
                    <p>Venue: <span style={{
                      color: 'rgb(230, 168, 81)'
                    }}>The Trident, HITEC City, Hyderabad</span><br/>
                    Day & Date: <span style={{
                      color: 'rgb(230, 168, 81)'
                    }}>Sunday, Feb 19</span><br/>
                    Timing: <span style={{
                      color: 'rgb(230, 168, 81)'
                    }}>5.00pm onwards</span></p>
                    <p><span style={{
                      color: 'rgb(230, 168, 81)'
                    }}>The Exclusive US Admissions Workshop will walk you through key steps to putting together a super strong college profile:</span></p>
                    <p>1. What are Top US Universities looking for in their students?</p>
                    <p>2. Key Components of a Strong Profile Application</p>
                    <p>3. How to build a Personal College Admissions Plan</p>
                    <p>4. How to get Ivy Ready</p>
                    <p>5. Should I take the New SAT or not?</p>
                    <br/>
                    <p>*Parents must attend the workshop along with the student.</p>
                    <p>Reserve Your Seat Now!</p>
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

export default CustomRegistrationScreenHyderbad