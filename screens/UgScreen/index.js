import React, {Fragment, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRouter } from 'next/router'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import ScrollSlider from '../../components/ScrollSlider';
import AppRating from '../../components/AppRating';
import Faq from '../../components/Faq';
import LeverageProfileBuilder from '../../components/LeverageProfileBuilder';
import TeamUpSection from '../../components/TeamUpSection';
import Review from '../../components/Review';
import NewTestimonial from '../../components/NewTestimonial';
// import BackgroundBanner from '../../components/BackgroundBanner';
import Image from 'next/image'
import LogoSlider from '../../components/LogoSlider';
import styles from './ug-admissions.module.scss';
// import OtpInput from "react-otp-input";
import Script from 'next/script'


const index = () => {

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact')
    }

    
  const [showLinkModal, setShowLinkModal] = useState(false);
  const handleCloseLinkModal = () => setShowLinkModal(false);
  const handleShowLinkModal = () => setShowLinkModal(true);
    
	return (
		<Fragment>
            <Container className={styles.dreamCollegeBanner} fluid> {/* style={{
                backgroundImage: 'url(/join_your_dream_college_bg_banner.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
                }}*/}
                <Container>
                    <Row>
                        <Col className={styles.ugTextBanner}>
                            <Row>
                                <Col className={styles.ugBigText}>
                                    {/*<Image
                                        src="/Join-your-dream-college-1400-400.jpg"
                                        width="1400"
                                        height="400"
                                    />*/}
                                    <h1>
                                        Join Your<br/>
                                         <span style={{
                                            color: 'rgb(227 204 128)'
                                        }}>Dream College</span>
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.ugSmallText}>
                                    <h3>in the US, UK, Canada, Singapore, Europe & Australia.</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.ugButtonText}>
                                    <Button onClick={redirect}>Book Your Free Consultation</Button> {/*onClick={handleShowLinkModal}*/}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <NewTestimonial />
            <LogoSlider />
            <TeamUpSection />
            <LeverageProfileBuilder />
            <ScrollSlider />
           
            <AppRating />
            <Review />
            <Faq />

            {/*   Get link  */}

                <Modal
                    show={showLinkModal}
                    onHide={handleCloseLinkModal}
                    backdrop="static"
                    keyboard={false}
                    className="get-link-cp"
                >
                    <Modal.Header closeButton style={{
                        borderBottom: '0'
                    }}>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col lg={7} ms={7} sm={12} xs={12}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h1>enter your phone number<br/> to get the link via SMS</h1>
                                            <p>alternatively, <a href="">scan QR code</a></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <InputGroup className="mb-3" style={{
                                                borderRadius: '30px'
                                            }}>
                                                <Form.Control
                                                placeholder="+91 9876543210"
                                                aria-label="phone"
                                                aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2">
                                                    <Button>
                                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                    </Button>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex pt-5">
                                            <div>
                                                <Image
                                                    width="28"
                                                    height="28"
                                                    src="/play-store-logo.png"
                                                    alt="play store icon"
                                                />
                                            </div>
                                            <div>
                                                <Image
                                                    width="28"
                                                    height="28"
                                                    src="/apple-store-logo.png"
                                                    alt="apple icon"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>      
                        </Col>
                        <Col lg={5} ms={5} sm={12} xs={12}>
                            <Row>
                                <Col>
                                    <Image
                                        width="300"
                                        height="300"
                                        src="/download-qr.png"
                                        alt="apple icon"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Modal.Body>
                </Modal>
		</Fragment>
	)
}

export default index
