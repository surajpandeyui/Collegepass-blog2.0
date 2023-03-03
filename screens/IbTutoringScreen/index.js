import React, {Fragment} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import AppRating from '../../components/AppRating';
import LeverageProfileBuilder from '../../components/LeverageProfileBuilder';
import CustomLandingPage from '../../components/CustomLandingPage';
import NewTestimonialIb from '../../components/NewTestimonialIb';
import TeamUpSection from '../../components/TeamUpSection';
import Faq from '../../components/Faq';
import Review from '../../components/Review';
// import Link from 'next/link'
import LogoSlider from '../../components/LogoSlider';
// import Carousel from 'react-bootstrap/Carousel';
import styles from './ib-tutoring.module.scss'

const index = () => {

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact/3')
    }

	return (
		<Fragment>
            <Container className={styles.ibLandingPageMainSection} fluid>
                <Container>
                    <Row>
                        <Col className={styles.ivyLandingPage}>
                            <Row>
                                <Col className={styles.ugTextBanner}>
                                    <Row>
                                        <Col className={styles.ugBigText}>
                                            <h1>
                                            Your Path To<br/> <span style={{
                                                    color: 'rgb(227 204 128)'
                                                }}>A Top IB Score</span>
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugSmallText}>
                                            <h3>Learn from the World’s Best IB Tutors</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugButtonText}>
                                            <Button onClick={redirect}>Book Your Free Consultation</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                {/*<Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className={styles.headingIb}>
                                            <h1>Your Path To <br/>42/42</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugSmallText}>
                                            <h3>Learn from the World’s Best IB Tutors</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugButtonText}>
                                            <Button>Book Your Free Consultation</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                        <video
                                                width="700"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                >
                                                    <source
                                                    src="https://d2rxf0sof329tl.cloudfront.net/133+IB+Tutoring+Preview.mp4"
                                                    type="video/mp4"
                                                />
                                            </video>
                                        </Col>
                                    </Row>
                                </Col>*/}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <NewTestimonialIb />
            <LogoSlider />
            <TeamUpSection choice={3}/>
            <CustomLandingPage choice={3} />
            <LeverageProfileBuilder choice={3} />
            <AppRating />
            <Review />
            <Faq />
            
		</Fragment>
	)
}

export default index
