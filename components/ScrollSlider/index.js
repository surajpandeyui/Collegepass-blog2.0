import React, {Fragment, useEffect, useState, useRef} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import useOnScreen from "../../Hooks/UseOnScreen";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import styles from './scroll-slider.module.scss';

const ScrollSlider = () => {

    const [index, setindex] = useState(0)
    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();
    const fourthRef = useRef();
    const firstSliderRefValue = useOnScreen(firstRef);
    const secondSliderRefValue = useOnScreen(secondRef);
    const thirdSliderRefValue = useOnScreen(thirdRef);
    const fourthSliderRefValue = useOnScreen(fourthRef);
    useEffect(() => {
          if(firstSliderRefValue)
          setindex(0)
          else if(secondSliderRefValue)
          setindex(1)
          else if(thirdSliderRefValue)
          setindex(2)
          else if(fourthSliderRefValue)
          setindex(3)
          else
          setindex(0)
      }, [firstSliderRefValue,secondSliderRefValue,thirdSliderRefValue,fourthSliderRefValue])

    
	return (
		<Fragment>
			<Container fluid className={styles.scrollTextToMoveImage} style={{
                    backgroundImage: 'url("/hero-bg.png")',
                    backgroundSize: 'cover'
                }}
            >
                <Container className={styles.ScrollSectionForDesktop}>
                    <Row>
                        <Col className={styles.ugMobilSilderSection}>
                            <Row >
                                <Col lg={6} md={6} sm={12} xs={12} className={styles.ugMobileTextSectionWrap}>
                                    <Row className={styles.ugMobilrSilderTextSection}  ref={firstRef}>
                                        <Col>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                            <p>Attend college admissions Livestreams, and get answers to all the key questions about the admissions process of the world’s most prestigious colleges!</p>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugMobilrSilderTextSection} ref={secondRef}>
                                        <Col>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Exclusive Masterclasses by Harvard, Stanford, Columbia, Oxbridge Students & Graduates</h2>
                                            <p>View masterclasses and gain an inside perspective on how to explore the right fit and pitch your application successfully!</p>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugMobilrSilderTextSection} ref={thirdRef}>
                                        <Col>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Access College Admission Tools to simplify your application journey</h2>
                                            <p>Calculate GPA, Compare Colleges,  Calculate cost of attendance, & Calculate your chances of getting  in, and  a lot more with CollegePass+</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12} className={styles.ugMobileSilderMobileWrap}>
                                    <Row style={{
                                        position: 'sticky',
                                        top: '80px',
                                        width: '345px',
                                        height: '660px',
                                        boxShadow: 'rgb(228 228 229 / 57%) 0px -5px 6px 0px inset, rgb(0 0 0 / 24%) 4px 6px 11px 1px inset',
                                        borderRadius: '46px',
                                        padding: '16px 14px',
                                        margin: 'auto'
                                    }}>
                                        <Col className={styles.ugMobilrSilderMobileSection}>
                                            <Carousel activeIndex={index}>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/mobile-section_1.jpg"
                                                    width="500"
                                                    height="917"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/mobile-section_2.jpg"
                                                    width="500"
                                                    height="917"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/Chance_Calculator_img.jpg"
                                                    width="500"
                                                    height="917"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                            </Carousel>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Container className={styles.ScrollSectionForMobile}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.scrollSectionOnMobile}>
                                    <Row>
                                        <Col className={styles.headingScrollSection}>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        width: '345px',
                                        height: '660px',
                                        boxShadow: 'rgb(228 228 229 / 57%) 0px -5px 6px 0px inset, rgb(0 0 0 / 24%) 4px 6px 11px 1px inset',
                                        borderRadius: '46px',
                                        padding: '16px 14px',
                                        margin: 'auto'
                                    }}>
                                        <Col className={styles.ugMobilrSilderMobileSection}>
                                            <Image
                                                src="/mobile-section_1.jpg"
                                                width="500"
                                                height="917"
                                                className={styles.ugMobSlider}
                                            /> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.discriptionScrollSection}>
                                            <p>Attend college admissions Livestreams, and get answers to all the key questions about the admissions process of the world’s most prestigious colleges!</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.scrollSectionOnMobile}>
                                    <Row>
                                        <Col className={styles.headingScrollSection}>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Exclusive Masterclasses by Harvard, Stanford, Columbia, Oxbridge Students & Graduates</h2>
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        width: '345px',
                                        height: '660px',
                                        boxShadow: 'rgb(228 228 229 / 57%) 0px -5px 6px 0px inset, rgb(0 0 0 / 24%) 4px 6px 11px 1px inset',
                                        borderRadius: '46px',
                                        padding: '16px 14px',
                                        margin: 'auto'
                                    }}>
                                        <Col className={styles.ugMobilrSilderMobileSection}>
                                            <Image
                                                src="/mobile-section_2.jpg"
                                                width="500"
                                                height="917"
                                                className={styles.ugMobSlider}
                                            /> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.discriptionScrollSection}>
                                            <p>View masterclasses and gain an inside perspective on how to explore the right fit and pitch your application successfully!</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.scrollSectionOnMobile}>
                                    <Row>
                                        <Col className={styles.headingScrollSection}>
                                            <h6>
                                                <Image
                                                    src="/logo/cp_text_logo.png"
                                                    width="230"
                                                    height="59"
                                                />
                                            </h6>
                                            <h2>Access College Admission Tools to simplify your application journey</h2>
                                        </Col>
                                    </Row>
                                    <Row style={{
                                        width: '345px',
                                        height: '660px',
                                        boxShadow: 'rgb(176 176 178 / 16%) 0px -5px 6px 0px inset, rgb(0 0 0 / 24%) 4px 6px 11px 1px inset',
                                        borderRadius: '46px',
                                        padding: '16px 14px',
                                        margin: 'auto'
                                    }}>
                                        <Col className={styles.ugMobilrSilderMobileSection}>
                                            <Image
                                                src="/Chance_Calculator_img.jpg"
                                                width="500"
                                                height="917"
                                                className={styles.ugMobSlider}
                                            /> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.discriptionScrollSection}>
                                            <p>Calculate GPA, Compare Colleges,  Calculate cost of attendance, & Calculate your chances of getting  in, and  a lot more with CollegePass+</p>
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

export default ScrollSlider