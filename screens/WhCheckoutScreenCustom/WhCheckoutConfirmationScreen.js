import React, { Fragment } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styles from './wh-checkout.module.scss'

const WhCheckoutConfirmationScreen = () => {
  return (
    <Fragment>
      <Container fluid className="bg-black">
        <Container>
          <Row className="pt-4">
            <Col className="mt-5 pt-5 pb-4">
              <Row className={styles.bgImagewh}>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className={styles.whImageSec}
                >
                  <Row>
                    <Col>
                      <h3>
                        We are mission-driven,
                        <br /> not money-driven
                      </h3>
                      <hr />
                      <p>
                        CollegePass is a mission-driven organization. We offer a
                        no-questions asked money-back guarantee for all valid
                        credits remaining in your account as of the date the
                        refund is requested. Additional terms & conditions
                        apply.
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={styles.whFormSec}>
                  <Row>
                    <Col>
                      <Row>
                        <Col className={styles.whHeading}>
                          <h3 className="text-center">
                            CODING PAYMENT REQUEST
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.whDetailReq}>
                          <Row>
                            <Col
                              lg={5}
                              md={5}
                              sm={5}
                              xs={5}
                              className="text-left"
                            >
                              <p>Child name</p>
                            </Col>
                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              xs={7}
                              className="text-left"
                            >
                              <p>AB</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={5}
                              md={5}
                              sm={5}
                              xs={5}
                              className="text-left"
                            >
                              <p>Email</p>
                            </Col>
                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              xs={7}
                              className="text-left"
                            >
                              <p>ab.p@collegepass.org</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={5}
                              md={5}
                              sm={5}
                              xs={5}
                              className="text-left"
                            >
                              <p>Payment for</p>
                            </Col>
                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              xs={7}
                              className="text-left"
                            >
                              <p
                                style={{
                                  fontWeight: '600',
                                }}
                              >
                                ADVANCED Standard 48 Classes
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={5}
                              md={5}
                              sm={5}
                              xs={5}
                              className="text-left"
                            >
                              <p className="mb-0">Grade</p>
                            </Col>
                            <Col
                              lg={7}
                              md={7}
                              sm={7}
                              xs={7}
                              className="text-left"
                            >
                              <p className="mb-0">4</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.whPaymentDetail}>
                          <Row>
                            <Col>
                              <h5
                                style={{
                                  color: 'rgb(93, 93, 93)',
                                  fontSize: '12px',
                                  textTransform: 'uppercase',
                                  marginTop: '5px',
                                }}
                              >
                                PAYMENT DETAILS
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{
                                borderRadius: '5px',
                                border: '1px solid rgb(222, 222, 222)',
                                padding: '12px 16px',
                                marginLeft: '15px',
                                marginRight: '15px',
                              }}
                            >
                              <Row>
                                <Col
                                  className="text-left"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>ADVANCED Standard 48 Classes</p>
                                </Col>
                                <Col
                                  className="text-right"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>₹ 45,799</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-left">
                                  <InputGroup className="mb-3">
                                    <FormControl
                                      placeholder="Enter Coupon Code"
                                      aria-label="Enter Coupon Code"
                                      aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                      Apply
                                    </InputGroup.Text>
                                  </InputGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-left">
                                  <p
                                    style={{
                                      fontSize: '14px',
                                      color: '#000000',
                                      fontWeight: '600',
                                      color: '#d29a4c',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    Special discount applied{' '}
                                    <a
                                      href=""
                                      style={{
                                        color: '#c93432',
                                      }}
                                    >
                                      Change
                                    </a>
                                  </p>
                                </Col>
                                <Col className="text-right">
                                  <p>- ₹ 4800</p>
                                </Col>
                              </Row>
                              <Row
                                style={{
                                  borderTop: '1px solid #cccccc',
                                  paddingTop: '20px',
                                }}
                              >
                                <Col
                                  className="text-left"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>Order Total</p>
                                </Col>
                                <Col
                                  className="text-right"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>₹ 40,999</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row>
                        <Col className={styles.whProceedButton}>
                          <Row>
                            <Col className={styles.beingPaid}>
                              <Button className="width-100 mb-2">
                                <span>Being paid now:</span> ₹ 40999
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col className={styles.proceedPaid}>
                              <Button className="width-100 mt-2">
                                <i
                                  className="fa fa-lock"
                                  aria-hidden="true"
                                ></i>{' '}
                                Pay Securely
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
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

export default WhCheckoutConfirmationScreen
