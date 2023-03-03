import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import styles from '../Testimonial/testimonial.module.scss';

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

const Testminial = () => {



    const [testimonialID, setTestimonialID] = useState(null)
    const [swiper, setSwiper] = useState(null)
    const [activeIndexSJS, setActiveIndexSJS] = useState(0)
    const wrapperRef = useRef(null)
    
    const handleShowVideo = (vimeoID) => {
        swiper !== undefined && swiper !== null && swiper.autoplay.stop()
        // console.log("handle show video", vimeoID)
        setTestimonialID(vimeoID)

    }

    
    const handleCloseVideo = () => {
        swiper !== undefined && swiper !== null && swiper.autoplay.start()
        setTestimonialID(null)

    }

    let slideData = [
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
            img: "/testimonial/priyanshu-got-admitted-to-purdue-georgia-tech-uiuc.png",
            m_img: "/testimonial/priyanshu-got-admitted-to-purdue-georgia-tech-uiuc-verticle-image.jpg",
            id: "https://player.vimeo.com/video/702325210?autoplay=1&h=9f95efb26a",
            alt: "Priyanshu started working with CollegePass team in 2020",
        },
        {
            img: "/testimonial/ansh-got-admitted-to-Rotman-School-of-Management-(UofT).jpg",
            m_img: "/testimonial/ansh-got-admitted-Rotman-School-of-Management-(UofT)-verticle-image.jpg",
            id: "https://player.vimeo.com/video/702324705?autoplay=1&h=56e0361755",
            alt: "Ansh started his journey with CollegePass in 2020 and has been admitted to his Dream college",
        },

        {
            img: '/testimonial/Khushi.png',
            m_img: '/testimonial/Khushi_m.png',
            id: 'https://player.vimeo.com/video/573945142?autoplay=1',
            alt: "Khushi has been admitted to the University of Warwick, University of Manchester, Kings College London, UCLA.",
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
        {
            img: '/testimonial/Krutibas.png',
            m_img: '/testimonial/Krutibas_m.png',
            id: 'https://player.vimeo.com/video/518969166?autoplay=1',
            alt: "Tanush and Tishya got into UIUC, Purdue University, UMass Amherst, Wisconsin Madison, etc.",
        },
        {
            img: '/testimonial/Dhruv.png',
            m_img: '/testimonial/Dhruv_m.png',
            id: 'https://player.vimeo.com/video/510641183?autoplay=1',
            alt: "Dhruv has been admitted to Wisconsin Madison, Ohio State, Stony Brook, Boston University, etc.",
        },
        {
            img: '/testimonial/Neeraj.png',
            m_img: '/testimonial/Neeraj_m.png',
            id: 'https://player.vimeo.com/video/520822820?autoplay=1',
            alt: "Niraj got admitted to his dream college, 'New York University.'",
        },
        {
            img: '/testimonial/Anishka.png',
            m_img: '/testimonial/Anishka_m.png',
            id: 'https://player.vimeo.com/video/535852056?autoplay=1',
            alt: "Anishka has been admitted to Carnegie Mellon, Georgia Tech, UC Berkeley, UC San Diego, etc.",
        },
        {
            img: '/testimonial/Raksha.png',
            m_img: '/testimonial/Raksha_m.png',
            id: 'https://player.vimeo.com/video/534512207?autoplay=1',
            alt: "Raksha has been admitted to Kelley School of Business, UMass Amherst, Indiana University, etc.",
        },
        {
            img: '/testimonial/jai_gupta_testimonial.jpg',
            m_img: '/testimonial/jai_gupta_m.jpg',
            id: 'https://player.vimeo.com/video/724966627?autoplay=1&h=93e9ad634a',
            alt: "Jai Gupta has admitted to UC Berkeley etc.",
        },
        {
            img: '/testimonial/ayan_testimonial.jpg',
            m_img: '/testimonial/ayan_m.jpg',
            id: 'https://player.vimeo.com/video/724959448?autoplay=1&h=20c9c484be',
            alt: "Ayan started working with collegePass in 2020 and has been admitted to UMass etc.",
        },

    ]
    useOutsideAlerter(wrapperRef, setTestimonialID)
    swiper !== undefined &&
		swiper !== null &&
		swiper.on('transitionEnd', function () {
			setActiveIndexSJS(swiper.realIndex)
		})
	useEffect(() => {
		swiper !== undefined &&
			swiper !== null &&
			swiper.autoplay !== undefined &&
			swiper.autoplay !== null &&
			swiper.autoplay.start()
	}, [swiper])
    return (
        <Fragment>
            <Container fluid style={{
                backgroundColor: '#191c22',
                borderTop: '1px solid #3f3f40',
                borderBottom: '1px solid #3f3f40'
            }}>
                <Container id={'testimonialLink'} className={styles.testimonialContainer + ' pb-5'}>
                    <Row>
                        <Col className={styles.testimonial}>
                            <Row>
                                <Col>
                                    <h2 className='text-center pt-5 pb-5'>WHAT STUDENTS & PARENTS ARE SAYING</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.testimonialForDesktop}>
                                    <Swiper
                                        nSwiper={setSwiper}
                                        slidesPerView={1}
                                        loopAdditionalSlides={30}
                                        loop={true}
                                        centeredSlides={true}
                                        autoHeight={true}
                                        lazy
                                        autoplay={{
                                            delay: 6000,
                                            disableOnInteraction: true,
                                        }}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={50}
                                    >

                                        {slideData.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Row>
                                                        <Col className={styles.testimonialImageSection}>
                                                            
                                                                <Image
                                                                    src={item.img}
                                                                    alt={item.alt}
                                                                    //alt="Picture of the Testimonial"
                                                                    width="800"
                                                                    height="450"
                                                                />
                                                            <div onClick={() => {
                                                                
                                                                handleShowVideo(item.id)
                                                           }}
                                                           >
                                                            <i className='fa fa-play' aria-hidden='true'></i>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </Col>
                                <Col className={styles.testimonialForMobile}>
                                    <Swiper
                                         nSwiper={setSwiper}
                                         slidesPerView={1}
                                         loopAdditionalSlides={30}
                                         loop={true}
                                         centeredSlides={true}
                                         autoHeight={true}
                                         lazy
                                         autoplay={{
                                             delay: 6000,
                                             disableOnInteraction: true,
                                         }}
                                         loopFillGroupWithBlank={true}
                                         pagination={{
                                             clickable: true,
                                         }}
                                         navigation={true}
                                         modules={[Navigation, Pagination, Scrollbar, A11y]}
                                         spaceBetween={50}
                                    >
                                        {slideData.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Row>
                                                        <Col className={styles.testimonialImageSection}>
                                                           
                                                                <Image
                                                                    src={item.m_img}
                                                                    alt={item.alt}
                                                                    //alt="Picture of the Testimonial"
                                                                    width="800"
                                                                    height="1350"
                                                                />
                                                            
                                                            <div onClick={() => {
                                                                handleShowVideo(item.id)
                                                            }}
                                                            >
                                                            <i className='fa fa-play' aria-hidden='true'></i>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

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
                </Container>
                

            </Container>
        </Fragment>
    )
}

export default Testminial
