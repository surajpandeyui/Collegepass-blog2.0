import React, {Fragment} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import styles from './marketBanner.module.scss'
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {Pagination, A11y} from 'swiper'

const MarketBanner = () => {
    const { asPath } = useRouter();

    let marketBanner = null;

    if (asPath === "/") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Learn from Ivy League Advisors</h3>
                    <p>Globally Experienced Admission Advisors from Berkeley, Columbia, UPenn, Cambridge & MIT</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Build a Stellar College Profile</h3>
                    <p>Get accepted to The Ivy League/Oxbridge with the CollegePass Profile Builder</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Write a Standout Essay</h3>
                    <p>Team up with Experienced, Internationally Trained Essay & Personal Statement Editors</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/ivy-league-undergraduate-admissions") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Learn from Ivy League Advisors</h3>
                    <p>Learn from Globally Experienced Counselors from Berkeley, MIT, UPenn, Stanford, Harvard, Columbia, Oxford & Cambridge</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Build a Stellar College Profile</h3>
                    <p>Get accepted to The Ivy League/Oxbridge with the CollegePass Case Method & Global Admissions Research.</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Unlimited Access to Counselors</h3>
                    <p>Learn round the year from College Admission Experts, Essay & Interview Specialists.</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/ms-admissions") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Learn from Ivy League Advisors</h3>
                    <p>Learn from Globally Experienced MS/MBA Advisors from Berkeley, Columbia, ISB, UPenn & MIT</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Build a Stellar Masters Profile</h3>
                    <p>Get accepted to your target MS/MBA Program with the CollegePass Case Method and Global Admissions Research</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Comprehensive Essay Editing</h3>
                    <p>Team up with Top Tier MS/MBA Essay Experts</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/sat-tutoring") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Top Ranked SAT Tutors</h3>
                    <p>Learn from Globally Experienced SAT Master Tutors</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">CollegePass Student Scores 1580</h3>
                    <p>Our students have consistently scored 1500+ since 2019</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Unlimited Access to Classes</h3>
                    <p>Learn round the year on weekdays & weekends</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/ib-tutoring") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Expert IB/IGCSE Master Tutors</h3>
                    <p>Learn from Global, Experienced IB/IGCSE Tutors</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Be Amongst IB/IGCSE Top Scorers</h3>
                    <p>Our Students have consistently scored 7/A/A*</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Personal Student Success Manager</h3>
                    <p>24*7 Personalised Support from a Dedicated Team</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/ielts-tutoring") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Expert IELTS Master Tutors</h3>
                    <p>Learn from Globally Experienced IELTS Experts</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Be Amongst IELTS Top Scorers</h3>
                    <p>Our Students have consistently scored a 7 - 7.5</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Personal Student Success Manager </h3>
                    <p>24*7 Personalised Support from a Dedicated Team</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/ap-calculus-tutoring") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Expert AP Master Tutors</h3>
                    <p>Learn from Globally Experienced AP Experts</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Be Amongst AP Top Scorers</h3>
                    <p>Our Students have consistently scored a 5</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Personal Student Success Manager</h3>
                    <p>24*7 Personalised Support from a Dedicated Team</p>
                </Col>
            </Row>
        );
    }

    else if (asPath === "/sat-contest") {
        marketBanner = (
            <Row className={styles.marketBanner}>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Top Ranked SAT Tutors</h3>
                    <p>Learn from Globally Experienced SAT Master Tutors</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">CollegePass Student Scores 1580</h3>
                    <p>Our students have consistently scored 1500+ since 2019</p>
                </Col>
                <Col className={styles.contentCol}>
                    <h3 className="pt-3">Unlimited Access to Classes</h3>
                    <p>Learn round the year on weekdays & weekends</p>
                </Col>
            </Row>
        );
    }


	return (
		<Fragment>
            <Container fluid className="bg-black mb-4">
                <Container fluid className={styles.marketBannerForDesktop}>
                    {marketBanner}
                </Container>
                <Container className={styles.marketBannerForMobile}>
                    <Swiper
                        modules={[Pagination, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        loop={true}
                        >
                        <SwiperSlide>
                            <Row className={styles.marketBanner}>
                                <Col className={styles.contentCol}>
                                    <h3 className="pt-3">Learn from Ivy League Advisors</h3>
                                    <p>Globally Experienced Admission Advisors from Berkeley, Columbia, UPenn, Cambridge & MIT</p>
                                </Col>
                            </Row>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Row className={styles.marketBanner}>
                                <Col className={styles.contentCol}>
                                    <h3 className="pt-3">Build a Stellar College Profile</h3>
                                    <p>Get accepted to The Ivy League/Oxbridge with the CollegePass Profile Builder</p>
                                </Col>
                            </Row>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Row className={styles.marketBanner}>
                                <Col className={styles.contentCol}>
                                    <h3 className="pt-3">Write a Standout Essay</h3>
                                    <p>Team up with Experienced, Internationally Trained Essay & Personal Statement Editors</p>
                                </Col>
                            </Row>
                        </SwiperSlide>
                    </Swiper>
                </Container>
            </Container>
		</Fragment>
	)
}

export default MarketBanner
