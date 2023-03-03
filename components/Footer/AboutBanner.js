import React, { Fragment } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./aboutbanner.module.scss";

const AboutBanner = () => {
  return (
    <Fragment>
        <Container className={styles.AboutBanner} fluid>
            <Container className="about-banner pl-0 pr-0">
                <Row className="ml-0 mr-0">
                    <Col>
                        <Row>
                            <Col lg={5} md={5} sm={12} xs={12} className={styles.textSetion}>
                                <Row>
                                    <Col>
                                        <h2 className="mb-4">JOIN YOUR DREAM COLLEGE<br/> WITH COLLEGEPASS</h2>
                                        <p className="mb-4">CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex mt-2">
                                        <a href="/contact" className={styles.footerAboutContact}>CONTACT US</a>
                                        <a href="/about" className={styles.footerAboutLearnMore}>Learn more <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={7} md={7} sm={12} xs={12} className="img-section" style={{
                                    textAlign: 'center'
                                }}>
                                <img src="https://collegepass.s3.ap-south-1.amazonaws.com/website_footer.jpeg" className="footer-banner-img" alt="Get Into Your Dream College" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    </Fragment>
  );
};

export default AboutBanner;