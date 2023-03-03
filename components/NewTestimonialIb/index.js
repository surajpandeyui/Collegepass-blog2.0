import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'react-bootstrap/Carousel';
// import Link from 'next/link'
import styles from '../NewTestimonialIb/n-testimonial-ib.module.scss'


function useOutsideAlerter(ref, setTestimonialID) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTestimonialID(null)

            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

const NewTestimonialIb = () => {

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact/3')
    }

    const [testimonialID, setTestimonialID] = useState(null)
    const wrapperRef = useRef(null)
    const handleShowVideo = (vimeoID) => {
        // swiper !== undefined && swiper !== null && swiper.autoplay.stop()
        // console.log("handle show video", vimeoID)
        setTestimonialID(vimeoID)

    }
    const handleCloseVideo = () => {
        swiper !== undefined && swiper !== null && swiper.autoplay.start()
        setTestimonialID(null)

    }

    useOutsideAlerter(wrapperRef, setTestimonialID)
    
    let slideData = [
        {
            img: '/testimonial/pankhuri-image-landscape.jpg',
            m_img: '/testimonial/pankhuri_m.jpg',
            id: 'https://player.vimeo.com/video/740682757?autoplay=1&h=5cb497a217',
            alt: "Pankhuri started her journey with collegePass",
        },
        {
            img: '/testimonial/pankhuri-image-landscape.jpg',
            m_img: '/testimonial/pankhuri_m.jpg',
            id: 'https://player.vimeo.com/video/689536463?autoplay=1&h=a97cecb20a',
            alt: "Pankhuri started her journey with collegePass",
        },
        {
            img: "/testimonial/aiden-dutta.jpg",
            m_img: "/testimonial/aiden-dutta_m.jpg",
            id: "https://player.vimeo.com/video/671414452?autoplay=1&h=09f6c79088",
            alt: "Aiden got admitted to his dream college, 'The University of Pennsylvania.'",
        },
        {
            img: '/testimonial/Sheeja.png',
            m_img: '/testimonial/Sheeja_m.png',
            id: 'https://player.vimeo.com/video/507858570?autoplay=1',
            alt: "Tulsi has been admitted to the University of Toronto, UBC, UC Berkeley, Kings College London and more.",
        },
        {
            img: '/testimonial/Pratibha.png',
            m_img: '/testimonial/Pratibha_m.png',
            id: 'https://player.vimeo.com/video/541041438?autoplay=1',
            alt: "Pratibha's son Niraj got admitted to his dream college, 'New York University.'",
        },

    ]
    return (
        <Fragment>
            <Container className="smallTestimonial" fluid style={{
                backgroundColor: 'rgb(238, 47, 76)',
                color: 'rgb(248, 248, 248)',
                backgroundImage: 'url("/testimonial/testimonials_banner_img.jpg")',
                backgroundSize: 'cover'
            }}>
                <Carousel interval={null}>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col>
                                                    <h2>LEARN FROM THE WORLD'S BEST
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>CollegePass students have consistently scored <br/>7s & 6s across IBDP subjects!</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={redirect}>
                                                        Book Your Free Consultation
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col className={styles.ugtestiVideoThumb}>
                                                    <Row>
                                                        <Col className={styles.ugVideoThumb}>
                                                            <Image
                                                                src="/testimonial-thumb/sat_ib_tiles_image.jpg"
                                                                width="500"
                                                                height="300"
                                                            //className={}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className={styles.ugVideoIcon}>
                                                            <div onClick={() => {
                                                                handleShowVideo(slideData[0].id)
                                                            }}
                                                            >
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col>
                                                    <h2>Aiden Is Headed To The Ivy League
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>CollegePass Student Aiden will be attending UPenn this fall with a scholarship of USD 160,000.</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={redirect}>
                                                        Book Your Free Consultation
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col className={styles.ugtestiVideoThumb}>
                                                    <Row>
                                                        <Col className={styles.ugVideoThumb}>
                                                            <Image
                                                                src="/1.jpg"
                                                                width="500"
                                                                height="300"
                                                            //className={}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className={styles.ugVideoIcon}>
                                                            <div onClick={() => {
                                                                handleShowVideo(slideData[1].id)
                                                            }}
                                                            >
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col>
                                                    <h2>Pankhuri Is Headed To Stanford
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>CollegePass Student Pankhuri will attend Stanford University this fall to study data science.</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={redirect}>
                                                        Book Your Free Consultation
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col className={styles.ugtestiVideoThumb}>
                                                    <Row>
                                                        <Col className={styles.ugVideoThumb}>
                                                            <Image
                                                                src="/2.jpg"
                                                                width="500"
                                                                height="300"
                                                            //className={}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className={styles.ugVideoIcon}>
                                                            <div onClick={() => {
                                                                handleShowVideo(slideData[2].id)
                                                            }}
                                                            >
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col>
                                                    <h2>Pratibha's son Niraj goes to NYU!
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>CollegePass student Niraj has also been awarded a Scholarship of USD 160,000</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={redirect}>
                                                        Book Your Free Consultation
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col className={styles.ugtestiVideoThumb}>
                                                    <Row>
                                                        <Col className={styles.ugVideoThumb}>
                                                            <Image
                                                                src="/4.jpg"
                                                                width="500"
                                                                height="300"
                                                            //className={}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className={styles.ugVideoIcon}>
                                                            <div onClick={() => {
                                                                handleShowVideo(slideData[3].id)
                                                            }}
                                                            >
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col>
                                                    <h2>Sheeja's daughter Tulsi goes to Berkeley!
                                                    </h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <h3>Tulsi received multiple admission offers from Top Universities: UCLA, UToronto, UBC, UCL & more.</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={redirect}>
                                                        Book Your Free Consultation
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12}>
                                            <Row>
                                                <Col className={styles.ugtestiVideoThumb}>
                                                    <Row>
                                                        <Col className={styles.ugVideoThumb}>
                                                            <Image
                                                                src="/3.jpg"
                                                                width="500"
                                                                height="300"
                                                            //className={}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className={styles.ugVideoIcon}>
                                                            <div onClick={() => {
                                                                handleShowVideo(slideData[4].id)
                                                            }}
                                                            >
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                </Carousel>
            </Container>
            {testimonialID !== undefined && testimonialID !== null && (
                                <>
                                <div className={styles.testimonialModal+' '+styles.fadeIn}>
                                    <div className={styles.testimonialModalcontainer}>
                                        <div className={styles.closeIcon} onClick={() => handleCloseVideo()}>
                                            <i className="fa fa-times"></i>
                                        </div>
                                        <iframe
                                            ref={wrapperRef}
                                            src={`${testimonialID}`}
                                            width='900'
                                            height='430'
                                            frameBorder='0'
                                            id='sing_vd'
                                            allow='autoplay; fullscreen'
                                            title='video'
                                            allowFullScreen
                                            allowtransparency='true'
                                        />
                                    </div>
                                </div>
                                <div className={styles.testimonialModalbg+' '+ styles.fadeIn}></div>
                            </>
                            )}
        </Fragment>
    )
}

export default NewTestimonialIb
