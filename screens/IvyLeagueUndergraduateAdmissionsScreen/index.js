import React, {Fragment, useState} from 'react'
import {Container, Row, Col, Navbar, Nav, Button} from 'react-bootstrap'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import AppRating from '../../components/AppRating';
import LeverageProfileBuilder from '../../components/LeverageProfileBuilder';
import CustomLandingPage from '../../components/CustomLandingPage';
import NewTestimonialIvy from '../../components/NewTestimonialIvy';
import TeamUpSection from '../../components/TeamUpSection';
import Faq from '../../components/Faq';
import Review from '../../components/Review';
// import Link from 'next/link'
import LogoSlider from '../../components/LogoSlider';
// import Carousel from 'react-bootstrap/Carousel';
import styles from './ivy-league.module.scss'

const index = () => {

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact/1')
    }

	return (
		<Fragment>
            <Container className={styles.ivyLandingPageMainSection} fluid>
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
                                                }}>The Ivy League</span>
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugSmallText}>
                                            <h3>One-on-One Personalised Admissions Advising for Grade 9-12 Students</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.ugButtonText}>
                                            <Button onClick={redirect}>Book Your Free Consultation</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <NewTestimonialIvy />
            <LogoSlider />
            <TeamUpSection choice={1} />
            <CustomLandingPage choice={1}/>
            <LeverageProfileBuilder choice={1}/>
            <AppRating />
            <Review />
            <Faq />
		</Fragment>
	)
}

export default index
