import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from '../CurriculamBox/curriculam.module.scss'

const CurriculamBox = () => {
  const { asPath } = useRouter()

  let CurriculamBox = null

  if (asPath === '/ivy-league-undergraduate-admissions') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create Your Free Account
                    </h3>
                    <ul>
                      <li>Enter Your Academic Information</li>
                      <li>Select Your Preferred Major/Career of Interest</li>
                      <li>Select Your Target Countries</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Customized Career & College Admissions Plan
                    </h3>
                    <ul>
                      <li>Access to the Proprietary College Profile Builder</li>
                      <li>Live Online College Admissions Strategy Sessions</li>
                      <li>Live Online Test Prep Sessions</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Personalized, One on One Admissions Advising
                    </h3>
                    <ul>
                      <li>
                        Team up with Ivy League Trained College Counselors
                      </li>
                      <li>Comprehensive Essay Brainstorming & Editing</li>
                      <li>Interview Preparation</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ms-admissions') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create Your Free Account
                    </h3>
                    <ul>
                      <li>Enter Your Academic & Work Information</li>
                      <li>Select Your Preferred Major/Career of Interest</li>
                      <li>Select Your Target Countries</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Customized Career & College Admissions Plan
                    </h3>
                    <ul>
                      <li>Access to the Proprietary College Profile Builder</li>
                      <li>Live Online College Admissions Strategy Sessions</li>
                      <li>Live Online Test Prep Sessions</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Personalized, One on One Admissions Advising
                    </h3>
                    <ul>
                      <li>
                        Team up with Ivy League Trained Admission Advisors
                      </li>
                      <li>Comprehensive SOP Brainstorming & Editing</li>
                      <li>Interview Preparation</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/sat-tutoring') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create your Profile in 30 seconds
                    </h3>
                    <ul>
                      <li>Tell Us What Grade You’re In</li>
                      <li>Indicate Your Careers Of Interest</li>
                      <li>Countries Targeted</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      View Your Prep Schedule
                    </h3>
                    <ul>
                      <li>Expert-led Live Classes</li>
                      <li>Weekly Assignments</li>
                      <li>12 Practice Test Papers + Review</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Learn At Your Own Pace
                    </h3>
                    <ul>
                      <li>Access to Lesson Recordings</li>
                      <li>Weekday/Weekend Schedules</li>
                      <li>Dedicated Support Team</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ib-tutoring') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create your Profile in 30 seconds
                    </h3>
                    <ul>
                      <li>Tell Us What Grade You’re In</li>
                      <li>Indicate Your Careers Of Interest</li>
                      <li>Countries Targeted</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      View Your Prep Schedule
                    </h3>
                    <ul>
                      <li>Expert-led Live Classes</li>
                      <li>Weekly Assignments</li>
                      <li>12 Practice Test Papers + Review</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Learn At Your Own Pace
                    </h3>
                    <ul>
                      <li>Access to Lesson Recordings</li>
                      <li>Weekday/Weekend Schedules</li>
                      <li>Dedicated Support Team</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ielts-tutoring') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create your Profile in 30 seconds
                    </h3>
                    <ul>
                      <li>Tell us what Grade you’re in</li>
                      <li>Indicate your Careers of Interest</li>
                      <li>Countries Targeted</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      View Your Prep Schedule
                    </h3>
                    <ul>
                      <li>Expert-led Live Classes</li>
                      <li>Weekly Assignments</li>
                      <li>12 Practice Test Papers + Review</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Learn At Your Own Pace
                    </h3>
                    <ul>
                      <li>Access to Lesson Recordings</li>
                      <li>Weekday/Weekend Schedules</li>
                      <li>Dedicated Support Team</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ap-calculus-tutoring') {
    CurriculamBox = (
      <Col className="text-center">
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Create your Profile in 30 seconds
                    </h3>
                    <ul>
                      <li>Tell us what Grade you’re in</li>
                      <li>Indicate your Careers of Interest</li>
                      <li>Countries Targeted</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-map-o"
                      aria-hidden="true"
                      style={{
                        background: '#b88851',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      View Your Prep Schedule
                    </h3>
                    <ul>
                      <li>Expert-led Live Classes</li>
                      <li>Weekly Assignments</li>
                      <li>12 Practice Test Papers + Review</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.currBox}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <i
                      className="fa fa-graduation-cap"
                      aria-hidden="true"
                      style={{
                        background: '#000000',
                      }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '5px 0px 10px 0px',
                      }}
                    >
                      Learn At Your Own Pace
                    </h3>
                    <ul>
                      <li>Access to Lesson Recordings</li>
                      <li>Weekday/Weekend Schedules</li>
                      <li>Dedicated Support Team</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

  return (
    <Fragment>
      <Container fluid className="pt-3 pb-2 bg-black">
        <Container>
          <Row className={styles.curriculam}>
            <Col>
              <Row>{CurriculamBox}</Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default CurriculamBox