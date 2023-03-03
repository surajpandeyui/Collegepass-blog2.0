import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import Link from 'next/link'
import styles from './review.module.scss'
import Image from 'next/image'
//import Testimonial from '../../components/Testimonial'

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

const index = () => {

  const [testimonialID, setTestimonialID] = useState(null)

  const handleShowVideo = (vimeoID) => {
    // console.log("handle show video", vimeoID)
    setTestimonialID(vimeoID)
  }

  const handleCloseVideo = () => {
    setTestimonialID(null)
  }

  let slideData = [
    {
      img: "/testimonial/aiden-dutta.jpg",
      m_img: "/Verticle-success-stories/aiden_dutta.jpg",
      id: "https://player.vimeo.com/video/671414452?autoplay=1&h=09f6c79088",
      alt: "Aiden got admitted to his dream college, 'The University of Pennsylvania.'",
    },
    {
      img: '/testimonial/Anishka.png',
      m_img: '/Verticle-success-stories/anishka_bompelli.jpg',
      id: 'https://player.vimeo.com/video/535852056?autoplay=1',
      alt: "Anishka has been admitted to Carnegie Mellon, Georgia Tech, UC Berkeley, UC San Diego, etc.",
    },
    {
      img: "/testimonial/ansh-got-admitted-to-Rotman-School-of-Management-(UofT).jpg",
      m_img: "/Verticle-success-stories/ansh_gupta.jpg",
      id: "https://player.vimeo.com/video/702324705?autoplay=1&h=56e0361755",
      alt: "Ansh started his journey with CollegePass in 2020 and has been admitted to his Dream college",
    },
    {
      img: '/testimonial/pankhuri-image-landscape.jpg',
      m_img: '/Verticle-success-stories/pankhuri.jpg',
      id: 'https://player.vimeo.com/video/689536463?autoplay=1&h=a97cecb20a',
      alt: "Pankhuri started her journey with collegePass",
    },
    {
      img: '/testimonial/Khushi.png',
      m_img: '/Verticle-success-stories/khushi.jpg',
      id: 'https://player.vimeo.com/video/573945142?autoplay=1',
      alt: "Khushi has been admitted to the University of Warwick, University of Manchester, Kings College London, UCLA.",
    },
    {
      img: '/testimonial/Krutibas.png',
      m_img: '/Verticle-success-stories/khushi_sampat.jpg',
      id: 'https://player.vimeo.com/video/518969166?autoplay=1',
      alt: "Tanush and Tishya got into UIUC, Purdue University, UMass Amherst, Wisconsin Madison, etc.",
    },
    {
      img: '/testimonial/Neeraj.png',
      m_img: '/Verticle-success-stories/neeraj_nair.jpg',
      id: 'https://player.vimeo.com/video/520822820?autoplay=1',
      alt: "Niraj got admitted to his dream college, 'New York University.'",
    },
    {
      img: '/testimonial/Dhruv.png',
      m_img: '/Verticle-success-stories/dhruv_venkataraman.jpg',
      id: 'https://player.vimeo.com/video/510641183?autoplay=1',
      alt: "Dhruv has been admitted to Wisconsin Madison, Ohio State, Stony Brook, Boston University, etc.",
    },

    {
      img: '/testimonial/Pratibha.png',
      m_img: '/Verticle-success-stories/pratibha_nair.jpg',
      id: 'https://player.vimeo.com/video/541041438?autoplay=1',
      alt: "Pratibha's son Niraj got admitted to his dream college, 'New York University.'",
    },

    {
      img: "/testimonial/priyanshu-got-admitted-to-purdue-georgia-tech-uiuc.png",
      m_img: "/Verticle-success-stories/priyanka_mehta.jpg",
      id: "https://player.vimeo.com/video/702325210?autoplay=1&h=9f95efb26a",
      alt: "Priyanshu started working with CollegePass team in 2020",
    },
    {
      img: '/Verticle-success-stories/sheeja_cassius.jpg',
      m_img: '/testimonial/Sheeja_m.png',
      id: 'https://player.vimeo.com/video/507858570?autoplay=1',
      alt: "Tulsi has been admitted to the University of Toronto, UBC, UC Berkeley, Kings College London and more.",
    },
    {
      img: '/testimonial/Raksha.png',
      m_img: '/Verticle-success-stories/raksha_mk.jpg',
      id: 'https://player.vimeo.com/video/534512207?autoplay=1',
      alt: "Raksha has been admitted to Kelley School of Business, UMass Amherst, Indiana University, etc.",
    },

  ]

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col className={styles.reviewBannerDetails}>
            <Row className={styles.reviewBannerText}>
              <Col>
                <Row>
                  <Col>
                    <h1 style={{
                      paddingBottom: '5px'
                    }}>CollegePass Success Stories</h1>
                    <Image
                      src="/Google_review-header-menu.png"
                      width="384"
                      height="43"
                      className={styles.reviewGoogleImg}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Container fluid>
          <Container>
            <Row>
              <Col>
                <h2 style={{
                  textAlign: 'center',
                  paddingBottom: '50px',
                  paddingTop: '60px'
                }}>WHAT STUDENTS & PARENTS ARE SAYING</h2>

                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/671414452?autoplay=1&h=09f6c79088")
                        }}>
                        <Image
                          src="/Verticle-success-stories/aiden_dutta.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/535852056?autoplay=1")
                        }}>

                        <Image
                          src="/Verticle-success-stories/anishka_bompelli.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/702324705?autoplay=1&h=56e0361755")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/ansh_gupta.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/689536463?autoplay=1&h=a97cecb20a")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/pankhuri.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/573945142?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/khushi_sampat.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/518969166?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/krutibas_biswal.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/520822820?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/neeraj_nair.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/510641183?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/dhruv_venkataraman.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/541041438?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/pratibha_nair.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/702325210?autoplay=1&h=9f95efb26a")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/priyanka_mehta.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/507858570?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/sheeja_cassius.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                          handleShowVideo("https://player.vimeo.com/video/534512207?autoplay=1")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/raksha_mk.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>*/}
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                    <Row>
                      <Col className={styles.imageSectionH}
                        // onClick={() => {
                        //   handleShowVideo("https://player.vimeo.com/video/534512207?autoplay=1")
                        // }}
                      >
                        <Image
                          src="/Verticle-success-stories/kushal_jayakumar.jpg"
                          width="360"
                          height="533"
                        />
                        {/*<Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>*/}
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>*/}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSectionH}
                        // onClick={() => {
                        //   handleShowVideo("https://player.vimeo.com/video/534512207?autoplay=1")
                        // }}
                      >
                        <Image
                          src="/Verticle-success-stories/Akshat_kaushik.jpg"
                          width="360"
                          height="533"
                        />
                        {/*<Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>*/}
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>*/}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSectionH}
                        // onClick={() => {
                        //   handleShowVideo("https://player.vimeo.com/video/534512207?autoplay=1")
                        // }}
                      >
                        <Image
                          src="/Verticle-success-stories/Nivedha_chandramouli.jpg"
                          width="360"
                          height="533"
                        />
                        {/*<Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>*/}
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>*/}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSectionH}
                        // onClick={() => {
                        //   handleShowVideo("https://player.vimeo.com/video/534512207?autoplay=1")
                        // }}
                      >
                        <Image
                          src="/Verticle-success-stories/ayan_sapru.jpg"
                          width="360"
                          height="533"
                        />
                        {/*<Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>*/}
                        <Row>
                          <Col>
                            {/*<p>
                                <strong>Aiden Dutta<br/></strong>
                                University of Pennsylvania
                              </p>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>*/}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>


                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                  <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                           handleShowVideo("https://player.vimeo.com/video/724959448?autoplay=1&h=20c9c484be")
                         }}
                      >
                        <Image
                          src="/Verticle-success-stories/ayan_sapru.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                        handleShowVideo("https://player.vimeo.com/video/724966627?autoplay=1&h=93e9ad634a")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/jai_gupta.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                        handleShowVideo("https://player.vimeo.com/video/723972502?autoplay=1&h=7db735fb73")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/keshav_bansal.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                        handleShowVideo("https://player.vimeo.com/video/760305594?autoplay=1&h=05db22d2e8")
                        }}
                      >
                        <Image
                          src="/Verticle-success-stories/rinka_testimonial.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col className={styles.reviewTestimonialCards}>
                  <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                           handleShowVideo("https://player.vimeo.com/video/760318518?autoplay=1&h=20e9034ce3")
                         }}
                      >
                        <Image
                          src="/Verticle-success-stories/moumita_testimonial.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                           handleShowVideo("https://player.vimeo.com/video/781899305?autoplay=1&h=9cc5a19433")
                         }}
                      >
                        <Image
                          src="/Verticle-success-stories/anicia.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col className={styles.imageSection}
                        onClick={() => {
                           handleShowVideo("https://player.vimeo.com/video/785355673?autoplay=1&h=a3c917544d")
                         }}
                      >
                        <Image
                          src="/Verticle-success-stories/moumita_dalal.jpg"
                          width="360"
                          height="533"
                        />
                        <Row>
                          <Col className={styles.middleReview}>
                            <p className={styles.text}>Hear about our<br /> student's journey</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className={styles.playBtnReview}>
                              <Image
                                src="/play-button-cp.svg"
                                width="44"
                                height="44"
                              />
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          {testimonialID !== undefined && testimonialID !== null && (
            <>
              <div className={styles.testimonialReviewModal + ' ' + styles.fadeIn}>
                <div className={styles.testimonialModalcontainer}>
                  <div className={styles.closeIcon} onClick={() => handleCloseVideo()}>
                    <i className="fa fa-times"></i>
                  </div>
                  <iframe

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
              <div className={styles.testimonialModalbg + ' ' + styles.fadeIn}></div>
            </>
          )}
        </Container>
        <Container className="mt-3 pt-3 pb-5">
          <Row className={styles.lFaq}>
            <Col>
              {/*<Row>
                <Col>
                  <h1
                    style={{
                      color: '#ffffff',
                      lineHeight: '2rem',
                      letterSpacing: '0.03rem',
                      marginTop: '60px',
                      marginBottom: 20,
                      fontSize: '28px',
                      fontWeight: '600'
                    }}
                  >
                    READ OUR STUDENT AND PARENT REVIEWS
                  </h1>
                </Col>
              </Row>*/}
              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    It’s been a great journey with CollegePass for my older daughter who is now at UC Berkeley… there were unknowns , so many unexpected(s) which we do /did not anticipate or do /did not have the bandwidth or knowledge/experience to handle or work around … As much as the child was doing and giving her best was on the top of things there is always some space that needs support beyond school acads achievements and parenting.. , CollegePass was a more than personified entity that held hands and walked us through, with support in every possible way for the child and parents.. CollegePass does more than guide , they also show students & make them believe that they can do much more.It doesn’t stop there ,… they see the student through and make it happen ! Thank you CollegePass .. look forward to continuing this journey with my younger one… thank you always ..
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/Sheeja_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Sheeja C
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    I'd like to thank the CollegePass team, particularly Ms. Bushnin and Ms. Shaurya, for assisting my son Arnav Jha in constructing his profile. Their advice and encouragement were quite beneficial. My son will apply to many elite universities for the fall 2023 session. Collegepass assists with the essay writing process and also gives thorough information on how to prepare for internships, research, and international contests. Unless they recommend it, these insights are not available to parents. Thank you once more for your prompt assistance and direction. Regards, Aparna Jha
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/Aparna_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Aparna Jha
                  </h5>
                </Col>
              </Row>


              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    CollegePass had a markable impact on every aspect of my application, from my SATs to my essays and extra-curriculars. Above all what I loved most about my experience with CollegePass was that instead of pressuring me into creating this Unrepresentative picture of myself on my application (which I believe is a common fear) they helped me find ways to push myself in the fields I was passionate about, and by the end of the process I was able to look at my application and was able to proudly say it was the best representation of who I was, my passions, achievements, character and ambitions.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/Kabir_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    
                    Kabir Hinduja
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    My experience with the college pass team has been a very positive one as I felt their constant support and guidance from day one and I believe this has helped me get into my dream college.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/ayan_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    
                    Ayan
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    Choosing CollegePass as my counselor for getting me through the college application process was one of the best decisions I’ve made. Balancing school work and going through the rigorous application process,  would’ve been extremely difficult without guidance. The weekly meetings with Aakash And Jahnavi, where we were working on a schedule with timelines helped me stay focused on smaller defined goals to be accomplished without getting overwhelmed with the whole process.<br/>The tools that were provided to me to shortlist colleges and classify them as reach and safety helped me to prioritize and narrow down a list of universities that would be the best fit for me.<br/>I am so thankful to Aakash and Jahnavi for all their support in guiding me to get admissions into my top choice of college, University Of Wisconsin, Madison as a direct admit into the business school. It was very comforting to know that help was a phone call away.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/Nivedha_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Nivedha Chandramouli
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    The process of applying to college was confusing to me. Sadly, my school counselors were of no help to me, and my parents meant well but weren't experts. This left me feeling overwhelmed and worried that I wouldn't stand out. The entire process of getting started was complicated for me, but CollegePass guided me step by step. My counselors made the process so much easier and helped me submit an application that I would not have been able to do on my own. They assisted me in choosing schools that would maximize my chances of acceptance. My timelines were also planned out by them and they stayed on top of me to get things done. We worked through several drafts of my Common App personal statement until it felt like it represented me. Each application I submitted presented me in the best possible light. CollegePass opened the doors to so many opportunities for me. They are the most qualified tutors and mentors, and CollegePass had the information I needed. It was amazing how they became so involved; they give you such peace of mind.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/kushal_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Kushal Jayakumar
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    Collegepass efficaciously aids in a high-school student's admission experience by shedding a ray of insight into university selection and offering unwavering support for all its academic components.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/dhruvan_shah_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Dhruwan S Shah
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    COLLEGEPASS turned out to be a major game changer in my US admissions process- it was basically a huge help in covering everything right from my extracurriculars to my essay. I started out as attending their SAT lectures, further attending their one-on-one lectures as to improve the score. The staff were extremely helpful and provided necessary insights at every milestone of the journey. CollegePass certainly helped me in everything, right from providing me the mandatory essay reminders(which I used to procrastinate a lot) to deadlines and important dates to remember. I was contacted a lot by various US admission counsellors, but CollegePass, by instinct, was different. I had not expected high levels of reminders and completions- along with a little bit of motivation to complete everything. Thus, this institution really helped me overcome any hurdle presented in my way and score good colleges with enough scholarships based on merit. Thank you.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/rutwik_nanal_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Rutwik Nanal
                  </h5>
                </Col>
              </Row>

              <Row className={styles.borderBottom}>
                <Col className="pt-3 pb-1">
                  <p
                    style={{
                      color: '#ffffff',
                      opacity: '0.6',
                    }}
                  >
                    CollegePass has helped me at every step of my application process. From suggesting in expanding my extracurriculars to constructive advice on my personal statement, their support has helped me in improving the quality of my application a lot. It was an amazing experience working with them.
                  </p>
                  <p className={styles.star}>
                    <Image
                      src="/5-stars.svg"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <p className={styles.reviewImage}>
                    <Image
                      src="/testimonial-thumb/ray_review.png"
                      width="100"
                      height="100"
                      style={{
                        marginTop: '-30px'
                      }} />
                  </p>
                  <h5
                    style={{
                      fontSize: '1.125rem',
                      letterSpacing: '0.03px',
                      color: '#ffffff',
                      opacity: '0.8',
                    }}
                  >
                    Ray Das
                  </h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>


    </Fragment>
  )
}

export default index