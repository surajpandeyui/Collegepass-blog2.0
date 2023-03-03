import Link from 'next/link'
import React, { Fragment, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetails } from '../../actions/eventRegistrationActions'
import styles from '../EventRegistrationScreen/event.module.scss'

const EventSuccess = ({ eventID }) => {
  const dispatch = useDispatch()
  const eventDetails = useSelector((state) => state.eventDetails.eventDetails)

  useEffect(() => {
    if (eventID) {
      dispatch(getEventDetails(eventID))
    }
  }, [eventID])
  return (
    <Fragment>
      <Container fluid className="bg-black pt-5 pb-5 mt-5">
        <Row className="text-center mt-5">
          <Col className={styles.eventSuccess}>
            <Row>
              <Col>
                <h2>Registration Success!</h2>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4 mb-4">
                <a href={`${eventDetails?.CALLENDER_LINK}`} target="_blank">
                  <Button>ADD TO CALENDAR</Button>
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  You will receive a confirmation email with your CollegePass
                  login credentials to attend the online event.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>Share:</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default EventSuccess
//check
