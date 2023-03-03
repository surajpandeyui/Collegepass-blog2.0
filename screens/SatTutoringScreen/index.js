import React, {Fragment, useState} from 'react'
import {Container, Row, Col, Navbar, Nav, Button} from 'react-bootstrap'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import AppRating from '../../components/AppRating';
import LeverageProfileBuilder from '../../components/LeverageProfileBuilder';
import CustomLandingPage from '../../components/CustomLandingPage';
import NewTestimonialSat from '../../components/NewTestimonialSat';
import TeamUpSection from '../../components/TeamUpSection';
import Faq from '../../components/Faq';
import Review from '../../components/Review';
// import Link from 'next/link'
import LogoSlider from '../../components/LogoSlider';
// import Carousel from 'react-bootstrap/Carousel';
import styles from './sat-tutoring.module.scss'

const index = () => {

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact/2')
    }
    const testLink = ()=>{window.open('https://exams.collegepass.org/sat/welcome', '_blank')}

	return (
		<Fragment>
            <Container className={styles.satLandingPageMainSection} fluid>
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
                                                }}>1600</span>
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugSmallText}>
                                            <h3>Learn from the World’s Best SAT Tutors</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugButtonText}>
                                            <Button onClick={testLink}>Take A Free Diagnostic Test</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <NewTestimonialSat />
            <LogoSlider />
            <TeamUpSection choice={2} />
            <CustomLandingPage choice={2}/>
            <LeverageProfileBuilder choice={2}/>
            <AppRating />
            <Review />
            <Faq />
            
		</Fragment>
	)
}

export default index
