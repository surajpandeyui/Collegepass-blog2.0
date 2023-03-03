import React, {Fragment} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
//import Image from 'next/image'
import Link from 'next/link'
import styles from '../LandingFaq/faq.module.scss';

const LandingFaq = () => {

	return (
		<Fragment>
			<Container fluid className="pt-5 pb-5 bg-white">
                <Container className="pt-2 pb-2">
                    <Row className={styles.lFaq}>
                        <Col>
                            <Row>
                                <Col>
                                    <h1 style={{
                                        color: '#000000',
                                        fontSize: '1.5rem',
                                        lineHeight: '2rem',
                                        letterSpacing: '.0125rem'
                                    }}>Frequently Asked Questions (FAQs)</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pt-3 pb-3">
                                    <h5 style={{
                                        fontSize: '1.125rem',
                                        letterSpacing: '0.03px',
                                        color: '#5a7184'
                                    }}>What is CollegePass?</h5>
                                    <p>CollegePass has been founded to help students and parents access high quality, reliable college/university admissions advice and test preparation at the click of a button.</p>
                                    <Link href="https://calendly.com/collegepass">Book A Free CollegePass Consultation.</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pt-3 pb-3">
                                    <h5 style={{
                                        fontSize: '1.125rem',
                                        letterSpacing: '0.03px',
                                        color: '#5a7184'
                                    }}>Does CollegePass offer College Admissions Advice?</h5>
                                    <p>Students & Parents can learn about applying and getting admitted to the World&apos;s Best Colleges via CollegePass Live Sessions and Video Lessons round the year. CollegePass hosts 100+ Live Online Session with Expert College Advisors.</p>
                                    <p>Students applying to highly selective universities can also sign up Personalised Admissions Advising by Internationally Trained College Admission Experts.</p>
                                    <Link href="https://calendly.com/collegepass">Book A Free Personal Consultation.</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>   
			</Container>
		</Fragment>
	)
}

export default LandingFaq