import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.scss'
import Script from 'next/script'

const Footer = () => {
  return (
    <Fragment>
      <Container
        fluid
        style={{
          backgroundColor: 'rgb(22, 21, 23)',
          color: 'rgb(255, 255, 255)',
        }}
      >
        <Container>
          <Row>
            <Col className={styles.ugTopFooter}>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row className={styles.ugFooterLogoHolo}>
                    <Col>
                      <Image
                        width="45"
                        height="45"
                        src="/holo.png"
                        alt="Holo"
                        className={styles.ugFooterHolo}
                      />
                      <Image
                        src="/logo/cp_text_logo.png"
                        alt="Text Logo"
                        width="150"
                        height="43"
                        className={styles.ugFooterLogo}
                      />
                    </Col>
                  </Row>
                  {/*<Row className={styles.ugbrandFooter}>
                                <Col>
                                    <Image
                                        width="405"
                                        height="67"
                                        src="/security-logos.jpg"
                                        alt="Holo"
                                        className={styles.ugFooterBrand}
                                    />
                                </Col>
                            </Row>*/}
                  <Row className={styles.ugLogosSectionTextTop}>
                    <Col>
                      <h6>Global Admissions Advising Platform</h6>
                    </Col>
                  </Row>
                  <Row className={styles.ugLogosSectionTextBottom}>
                    <Col>
                      <p>
                        Learn how CollegePass can help you get into the Top
                        Colleges/Universities in the USA, UK, Canada and other
                        countries.
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row className={styles.ugFooterMenu}>
                    <Col className={styles.footerAboutList}>
                      <p>Explore</p>
                      <ul>
                        <li>
                          <a
                            href="https://collegepass.org/pricing"
                            target="_blank"
                          >
                            Pricing
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://collegepass.org/success-stories"
                            target="_blank"
                          >
                            Success Stories
                          </a>
                        </li>
                        <li>
                          <a href="/sitemap.xml">Sitemap</a>
                        </li>
                      </ul>
                    </Col>
                    <Col>
                      <p>About</p>
                      <ul>
                        <li>
                          <a
                            href="https://collegepass.org/about"
                            target="_blank"
                          >
                            About Us
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://collegepass.org/contact"
                            target="_blank"
                          >
                            Contact Us
                          </a>
                        </li>

                        <li><a href="https://blog.collegepass.org/">Blog</a></li>
                      </ul>
                    </Col>
                  </Row>
                  <Row className={styles.ugFooterMenu}>
                    <Col className={styles.footerSocialMedia}>
                      <p>Social</p>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/CollegePassOne?s=09"
                            target="_blank"
                          >
                            Twitter
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/_collegepass/"
                            target="_blank"
                          >
                            Instagram
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.facebook.com/CollegePassPremiere/"
                            target="_blank"
                          >
                            Facebook
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/company/collegepass/"
                            target="_blank"
                          >
                            LinkedIn
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/c/CollegePass"
                            target="_blank"
                          >
                            YouTube
                          </a>
                        </li>
                      </ul>
                    </Col>
                    <Col>
                      <p>Download</p>
                      <ul>
                        <li>
                          <a
                            href="https://apple.co/3M1IDuT"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width="420"
                              height="124"
                              src="/Apple_Icon 02_01.png"
                              alt="Holo"
                              className={styles.ugFooterBrand}
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://bit.ly/3trJ3m3"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width="420"
                              height="124"
                              src="/Google_Play_Icon 02_01.png"
                              alt="Holo"
                              className={styles.ugFooterBrand}
                            />
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        style={{
          backgroundColor: 'rgb(22, 21, 23)',
          color: 'rgb(255, 255, 255)',
        }}
      >
        <Container>
          <Row>
            <Col className={styles.ugBottomFooter}>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row>
                    <Col className={styles.ugCopyRight}>
                      <p>Copyright © 2021-22 Empagnie PTE Limited.</p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row>
                    <Col className={styles.ugCopyRight}>
                      <Row>
                        <Col className={styles.ugCopyRightR}>
                          <a href="/privacy">Privacy policy</a>
                          <a
                            href="/terms"
                            style={{
                              border: 'none',
                            }}
                          >
                            Terms and conditions
                          </a>
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

export default Footer
