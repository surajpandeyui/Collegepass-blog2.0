import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import NewTestimonial from '../../components/NewTestimonial'
import Faq from '../../components/Faq'
import styles from '../AboutUsScreen/about.module.scss'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white'>
        <Container>
          <Row>
            <Col className={styles.aboutMainNew}>
              <Row>
                <Col>
                  <h1>About CollegePass</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide! CollegePass provides personalized support in every aspect of the journey to their dream college — from university selection strategy, test prep, and personal statement/essay support to extracurricular strategy and interview practice.</p>
                  <p>CollegePass's tutors and admission advisors are the best globally, being students at, or graduates from, UPenn, Harvard, Stanford, Columbia, MIT, Oxford, Cambridge, and more. CollegePass's admission advisors are trained to leverage CollegePass Case Method and research conducted by the Global Research Team.<br/> We believe world-class admissions advising and test preparation delivered in a personalized way using technology & research is the key to making a personal college coach a reality for every high schooler.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      {/*<Container fluid className={styles.aboutMain}>
      <Row>
					<Col className={styles.eventBannerDetails}>
						<Row className={styles.eventBannerText}>
							<Col>
								<Row>
									<Col>
										<h1>About Us</h1>
									</Col>
								</Row>
								{/*<Row>
									<Col>
										<h6>Have a question? We’re happy to help!</h6>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
        <Row>
          <Col className={styles.topSection}>
            <h2>JOIN YOUR DREAM COLLEGE</h2>
            <p>CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!<br/>
            CollegePass provides personalized support in every aspect of the journey to their dream college — from university selection strategy,<br/>
             test prep, and personal statement/essay support to extracurricular strategy and interview practice.</p>
          </Col>
        </Row>
        <Container>
          <Row className={styles.aboutCenterWidth}>
            <Col>
              <Row>
                <Col>
                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12} className="pt-3">
                      <Row>
                        <Col>
                          <h3>Why CollegePass Is Unique</h3>
                          <p>CollegePass's tutors and admission advisors are the best globally, being students at, or graduates from, UPenn, Harvard, Stanford, Columbia, MIT, Oxford, Cambridge, and more. CollegePass's admission advisors are trained to leverage CollegePass Case Method and research conducted by the Global Research Team.</p>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <h3>OUR MISSION</h3>
                          <p>We believe world-class admissions advising and test preparation delivered in a personalized way using technology & research is the key to making a personal college coach a reality for every high schooler.</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <Link href="/contact"><Button>Talk to an advisor</Button></Link>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <iframe
                        src="https://player.vimeo.com/video/688826838?autoplay=1&amp;h=ce65be4465 "
                        width="1000"
                        frameBorder="0"
                        id="sing_vd"
                        allow="autoplay; fullscreen"
                        title="video"
                        allowFullScreen
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
            {/*<Col>
              <Row>
                <Col>
                  <h2 className="black-color pt-3 pb-3">
                    Join Your Dream College
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    CollegePass is a global college preparation platform helping
                    high schoolers apply to their dream colleges worldwide!
                  </p>
                  <p>
                    CollegePass provides personalized support in every aspect of
                    the journey to their dream college — from{' '}
                    <strong>university selection strategy, test prep, </strong>
                    and{' '}
                    <strong>
                      personal statement/essay support to extracurricular
                      strategy
                    </strong>{' '}
                    and <strong>interview practice.</strong>
                  </p>
                  <p>
                    CollegePass&apos;s tutors and admission advisors are the
                    best globally, being students at, or graduates from,{' '}
                    <strong>
                      UPenn, Harvard, Stanford, Columbia, MIT, Oxford,
                      Cambridge,
                    </strong>{' '}
                    and more. CollegePass&apos;s admission advisors are trained
                    to leverage <strong>CollegePass Case Method</strong> and
                    research conducted by the Global Research Team.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className={styles.missionStudentLink}>
                    <Col className="text-center">
                      <p className="mb-0 mt-3">
                        <a>
                            Our Mission{' '}
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                              style={{ fontSize: '12px', fontWeight: '200' }}
                            ></i>
                        </a>
                      </p>
                    </Col>
                    <Col className="text-center">
                      <p className="mb-0 mt-3">
                        <a>
                            What Students are Saying{' '}
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                              style={{ fontSize: '12px', fontWeight: '200' }}
                            ></i>
                        </a>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row id="missionStatement">
                <Col>
                  <iframe
                    src="https://player.vimeo.com/video/409699040"
                    width="1000"
                    frameBorder="0"
                    id="sing_vd"
                    allow="autoplay; fullscreen"
                    title="video"
                    allowFullScreen
                  />
                </Col>
              </Row>
              <Row id="ourMission">
                <Col>
                  <h2 className="black-color pt-2 pb-3">Our Mission</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    We believe world-class admissions advising and test
                    preparation delivered in a personalized way using technology
                    & research is the key to making a personal college coach a
                    reality for every high schooler.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col id="studentTestimonial"></Col>
              </Row>
            </Col>
      </Container>
      <NewTestimonial />
      <Container fluid className={styles.aboutFooterSection}>
        <Container>
          <Row>
            <Col>
              <h2>Learn how CollegePass can help you<br/>
get into the Top Colleges/Universities in<br/>
the USA, UK, Canada and other countries.</h2>
              <Link href="/contact"><Button>Talk to an advisor</Button></Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Faq></Faq>
      <Container fluid className={styles.aboutBottomStripe}>
        <Container>
          <Row>
            <Col>
              <Link href="https://calendly.com/collegepass"><Button>Book Your Free Consultation</Button></Link>
            </Col>
          </Row>
        </Container>
      </Container>*/}
    </Fragment>
  )
}

export default index
