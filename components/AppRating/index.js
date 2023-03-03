import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import LandingButtonModal from '../../components/Modal/LandingButtonModal'
import styles from '../../components/AppRating/app-rating.module.scss'
import { useRouter } from 'next/router'

const AppRating = () => {

  return (
    <Fragment>
        <Container fluid className='bg-black'>
            <Container>
                <Row>
                    <Col className={styles.ugAppSection}>
                        <Row>
                            <Col lg={4} md={6} sm={12} xs={12} className={styles.googleRating}>
                                <Row>
                                    <Col className={styles.ratingPoint}>
                                        <Row>
                                            <Col className='d-inline-flex justify-content-center'>
                                                <h2>4.9</h2>
                                                <h3>Google</h3>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={styles.ratingPointImg}>
                                        <Image
                                            src="/Stars_4.9_img.png"
                                            width="200"
                                            height="30"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4} md={6} sm={12} xs={12} className={styles.playStoreSection}>
                                <Row>
                                    <Col className={styles.ratingPoint}>
                                        <Row>
                                            <Col className='d-inline-flex justify-content-center'>
                                                <h2>4.3</h2>
                                                <h3>Play<br/> Store</h3>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={styles.ratingPointImg}>
                                        <Image
                                            src="/Stars_4.3_img.png"
                                            width="200"
                                            height="30"
                                        // className={}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={styles.ratingPoint}>
                                        <Row>
                                            <Col className={styles.ratingAppButton}>
                                                <Button href="https://bit.ly/3trJ3m3">Download The App</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4} md={6} sm={12} xs={12} className={styles.appStoreSection}>
                                <Row>
                                    <Col className={styles.ratingPoint}>
                                        <Row>
                                            <Col className='d-inline-flex justify-content-center'>
                                                <h2>4.1</h2>
                                                <h3>App <br/>Store</h3>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={styles.ratingPointImg}>
                                        <Image
                                            src="/Stars_4.1_img.png"
                                            width="200"
                                            height="30"
                                            // className={}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={styles.ratingAppButton} style={{
                                        marginRight: '0%'
                                    }}>
                                        <Button href="https://apple.co/3M1IDuT">{/*<i className="fa fa-apple" aria-hidden="true"></i>*/} Download The App</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*<Row>
                            <Col className={styles.ugTextTestimonial}>
                                <Carousel>
                                    <Carousel.Item interval={2000}>
                                        <p>My experience with the college pass team has been a very positive one as I felt their constant support and guidance from day one and I believe this has helped me get into my dream college.</p>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <p>Collegepass efficaciously aids in a high-school student's admission experience by shedding a ray of insight into university selection and offering unwavering support for all its academic components.</p>
                                    </Carousel.Item>
                                    <Carousel.Item interval={2000}>
                                        <p>CollegePass has helped me at every step of my application process. From suggesting in expanding my extracurriculars to constructive advice on my personal statement, their support has helped me in improving the quality of my application a lot. It was an amazing experience working with them.</p>
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                        </Row>*/}
                    </Col>
                </Row>
            </Container>
        </Container>
    </Fragment>
  )
}

export default AppRating