import { Container, Row, Col, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import styles from '../PlanScreen/plan.module.scss'
import { useRouter } from 'next/router'

const PlanScreen = () => {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('basic')

  const onClickPlanHandler = (plan) => {
    setSelectedPlan(plan)
  }
  return (
    <Container fluid className="bg-black pt-5 pb-5 mt-5 white-color">
      <Container className="mt-5 mb-5 pt-3">
        <Row>
          <Col className={styles.plans}>
            <Row>
              <Col>
                <Row className={styles.planHeader}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col className={styles.planHeading}>
                        <h3>CollegePass Annual College Counseling Plans</h3>
                        {/* <span>
                          All membership plans come with a 30-day satisfaction
                          guarantee.
                        </span> */}
                        <hr className={styles.planHeadingBorder} />
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row className={styles.selected}>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                            // className={styles.selectedclr}
                          >
                            <h5>Basic</h5>
                            <Button onClick={() => onClickPlanHandler('basic')}>
                              {selectedPlan === 'basic' ? 'SELECTED' : 'SELECT'}
                            </Button>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <h5>Plus</h5>
                            <Button onClick={() => onClickPlanHandler('plus')}>
                              {selectedPlan === 'plus' ? 'SELECTED' : 'SELECT'}
                            </Button>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <h5>Premium</h5>
                            <Button
                              onClick={() => onClickPlanHandler('premium')}
                            >
                              {selectedPlan === 'premium'
                                ? 'SELECTED'
                                : 'SELECT'}
                            </Button>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <h5>Premium +</h5>
                            <Button
                              onClick={() => onClickPlanHandler('premium-plus')}
                            >
                              {selectedPlan === 'premium-plus'
                                ? 'SELECTED'
                                : 'SELECT'}
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>Annual Fee</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>FREE </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>₹999</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>₹9,999</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>₹99,999 onwards</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>Access to All Video Lessons</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>
                          Access to All College Admissions Livestreams
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        style={{
                          paddingTop: '10px',
                          paddingLeft: '0px',
                        }}
                      >
                        <span className="pt-5">
                          Access to Ivy League/Oxbridge Track
                          <br />
                          <span
                            className="pb-4"
                            style={{
                              fontSize: '15px',
                              opacity: '0.8',
                              letterSpacing: '0.03rem',
                            }}
                          >
                            A Series of Live Sessions to prepare you for the Ivy
                            League & Oxbridge
                          </span>
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>Access to Live Online IELTS Classes</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>Access to Live Online SAT Classes</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>
                          Access to Live Online AP Calculus AB/BC Classes
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.planSepBorder}>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <Row>
                      <Col
                        className="pt-4 pb-4"
                        style={{
                          paddingLeft: '0px',
                        }}
                      >
                        <span>
                          One-on-One College Admissions Counseling by Admission
                          Experts
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <Row>
                      <Col className="text-center">
                        <Row>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>No</span>
                          </Col>
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            className="pt-4 pb-4"
                          >
                            <span>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-5 pt-5">
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className={styles.planFooter}
                  >
                    <Button
                      onClick={() => {
                        router.push('/wh-checkout')
                      }}
                    >
                      Continue
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default PlanScreen
