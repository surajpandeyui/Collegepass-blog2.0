import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from '../../components/LandingText/landingText.module.scss'

const LandingText = () => {
  const { asPath } = useRouter()

  let landingText = null

  if (asPath === '/sat-tutoring') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Score a 1500+ on the SAT
        </h2>
        <p className="white-color">
          CollegePass students have scored 1500+ on the SAT across all Test
          Dates since 2019
          <br />
        </p>
      </Col>
    )
  } else if (asPath === '/ib-tutoring') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          What Does It Take To Get A Perfect 45!
        </h2>
        <p className="white-color">
          CollegePass students have scored 6/7s consistently across IBDP
          Subjects since 2020
        </p>
      </Col>
    )
  } else if (asPath === '/ielts-tutoring') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Score a 7+ Band on The IELTS
        </h2>
        <p className="white-color">
          CollegePass students have scored 7+ on the IELTS across Test Dates
          since 2020
          <br />
        </p>
      </Col>
    )
  } else if (asPath === '/ap-calculus-tutoring') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Score a 5 on the Advanced Placement Exams
        </h2>
        <p className="white-color">
          CollegePass students have scored 5 consistently in AP Exams across
          Test Dates since 2020
        </p>
      </Col>
    )
  } else if (asPath === '/ivy-league-undergraduate-admissions') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Build A Stellar College Profile
        </h2>
        <p className="white-color">
          We believe world-class admissions advising using technology & research
          in a customised manner is the key to making a personal college coach a
          reality for every student.
          <br />
        </p>
      </Col>
    )
  } else if (asPath === '/ms-admissions') {
    landingText = (
      <Col className="text-center">
        <h2
          style={{
            fontFamily: "'Lato', Helvetica, Arial, sans-serif",
            fontWeight: '700',
            lineHeight: '1.25',
            fontSize: '1.5rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Craft a Winning MS/MBA Application
        </h2>
        <p className="white-color">
          We believe world-class admissions advising using technology & research
          in a customised manner is the key to making a personal college coach a
          reality for every student.
          <br />
        </p>
      </Col>
    )
  }

  return (
    <Fragment>
      <Container fluid className="mt-4 pt-3 pb-3 bg-balck">
        <Container>
          <Row className={styles.landingText}>
            <Col>
              <Row>{landingText}</Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default LandingText