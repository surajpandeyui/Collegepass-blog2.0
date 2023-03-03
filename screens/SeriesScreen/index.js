import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
//import Link from 'next/link'
import Image from 'next/image'
import styles from '../SeriesScreen/series.module.scss'
import axios from 'axios'
import { Carousel } from '@trendyol-js/react-carousel';
import { getSeries, getSeriesWithEp } from '../../config/API'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const index = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const router = useRouter()
  const [series, setseries] = useState([])
  const [seriesWithEp, setseriesWithEp] = useState(null)
  const auth = useSelector((state) => state.auth)
  // console.log("data")
  const handleShow = (id) => {
    
    axios
      .post(getSeriesWithEp, { series: 706 })
      .then((e) => {
        console.log(e.data.message)
        setseriesWithEp(e.data.message)
        setShow(true);
      })
      .catch((error) => {
        //   console.log(error)
      })

  }
  useEffect(() => {
    const getRegEvents = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      }

      axios
        .get(getSeries)
        .then((e) => {
          console.log(e.data.message)
          setseries(e.data.message)

        })
        .catch((error) => {
          //   console.log(error)
        })

      // setRegisteredEvents(regEvents.data.events)
    }
    // if (auth.userDetails.ID) {
    //   console.log("got id")
    //   getRegEvents()

    // }
    getRegEvents()
  }, [])
  const showVideo = (video, title) => {
    let playURL = `/play-video/${video}/${title.replace(/\//g, '%2F')}`
    playURL = playURL.replace(/\?/g, '%3F')
    playURL = `${playURL}?sourcetype=vimeo`
    if (auth.userDetails) {
      if (auth.userDetails?.ISPREMIUM >= 2) {
        router.push(playURL)
      }
      else {
        router.push('/pricing')
      }
    }

  }
  const carousel = series.map((ser, index) => {
    return (<>

      <Col>
        <Row className={styles.showImage}>
          <Col>
            <Row>
              <Col>
                <Image
                  width="290"
                  height="150"
                  src={ser.banner}
                  alt="logo"
                />
              </Col>
            </Row>
            <Row className={styles.cardBottomIcon}>
              <Col lg={9} md={9} sm={12} xs={12}>
                <i className="fa fa-play" aria-hidden="true"></i>
                <i className="fa fa-check" aria-hidden="true"></i>
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
              </Col>
              <Col lg={3} md={3} sm={12} xs={12}>
                <i className="fa fa-angle-down" aria-hidden="true" onClick={() => { handleShow(ser.ID) }}></i>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

    </>)
  })
  return (
    <Fragment>
      <Container fluid className={styles.seriesMain}>
        <Row>
          <Col>
            {/* <iframe class="iframe" src="https://player.vimeo.com/video/507858570?autoplay=1" width="100%" height="430" frameborder="0" webkitallowfullscreen   mozallowfullscreen allowfullscreen></iframe> */}
            <video
              width="100%"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://player.vimeo.com/progressive_redirect/playback/709950482/rendition/540p/file.mp4?loc=external&signature=cdde35bfdbe8b1e02d3c407bcc597c0c2c58fc46b019147823d4aa023da69ed6"
                type="video/mp4"
              />
            </video>
          </Col>
          <div className={styles.overlay}></div>
        </Row>
        <Row className={styles.videoText}>
          <Col lg={8} md={8} sm={12} xs={12}>
            <Row>
              <Col>
                <Image
                  width="290"
                  height="150"
                  src="/golden-logo-removebg.png"
                  alt="logo"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>{series.length > 0 ? series[0].Title : null}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>
                  {series.length > 0 ? series[0].description : null}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button><i className="fa fa-play" aria-hidden="true"></i> Play</Button>
                <Button><i className="fa fa-info-circle" aria-hidden="true"></i> More Info</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={2} sm={12} xs={12}></Col>
          <Col lg={2} md={2} sm={12} xs={12}></Col>
        </Row>

        <Row className={styles.hoverBannerCard} style={{
          marginTop: '-7%'
        }}>
          <Col> 
            <Row style={{
              paddingLeft: '4.5%'
            }}>
              <Col><h3>Popular on CollegePass</h3></Col>
            </Row>
            <Row>
              <Col className={styles.cardSliderForDesktop}>
                <Swiper
                  className={styles.swiperHeight}
                  modules={[Navigation, A11y]}
                  spaceBetween={2}
                  slidesPerView={6}
                  navigation
                  pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                  
                >
                  {series.map((ser, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    return (
                      <SwiperSlide key={idx}>
                        <Col>
                          <Row className={styles.showImage}>
                            <Col>
                              <Row>
                                <Col>
                                  <Image
                                    width="290"
                                    height="150"
                                    src={ser.banner}
                                    alt="logo"
                                  />
                                </Col>
                              </Row>
                              <Row className={styles.cardBottomIcon}>
                                <Col lg={9} md={9} sm={12} xs={12}>
                                  <i className="fa fa-play" aria-hidden="true"></i>
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </Col>
                                <Col lg={3} md={3} sm={12} xs={12}>
                                  <i className="fa fa-angle-down" aria-hidden="true" onClick={() => { handleShow(ser.ID) }}></i>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container fluid style={{
        zIndex: '-9',
        marginTop: '-60px'
      }}>
        <Row className={styles.hoverBannerCard}>
          <Col> 
            <Row style={{
              paddingLeft: '4.5%'
            }}>
              <Col><h3>Trending Now</h3></Col>
            </Row>
            <Row>
              <Col className={styles.cardSliderForDesktop}>
                <Swiper
                  className={styles.swiperHeight}
                  modules={[Navigation, A11y]}
                  spaceBetween={5}
                  slidesPerView={7}
                  navigation
                  pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                  
                >
                  {series.map((ser, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    return (
                      <SwiperSlide key={idx}>
                        <Col>
                          <Row className={styles.showImage}>
                            <Col>
                              <Row>
                                <Col>
                                  <Image
                                    width="290"
                                    height="150"
                                    src={ser.banner}
                                    alt="logo"
                                  />
                                </Col>
                              </Row>
                              <Row className={styles.cardBottomIcon}>
                                <Col lg={9} md={9} sm={12} xs={12}>
                                  <i className="fa fa-play" aria-hidden="true"></i>
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </Col>
                                <Col lg={3} md={3} sm={12} xs={12}>
                                  <i className="fa fa-angle-down" aria-hidden="true" onClick={() => { handleShow(ser.ID) }}></i>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className={styles.hoverBannerCard} style={{
          marginTop: '-60px'
        }}>
          <Col> 
            <Row style={{
              paddingLeft: '4.5%'
            }}>
              <Col><h3>New Releases</h3></Col>
            </Row>
            <Row>
              <Col className={styles.cardSliderForDesktop}>
                <Swiper
                  className={styles.swiperHeight}
                  modules={[Navigation, A11y]}
                  spaceBetween={5}
                  slidesPerView={7}
                  navigation
                  pagination={{ clickable: true }}
                  //scrollbar={{draggable: true}}
                  loop={true}
                  
                >
                  {series.map((ser, idx) => {
                    // LOOP FOR EACH EVENT

                    // logic to be used to push to play video or to be pushed to zoom component

                    return (
                      <SwiperSlide key={idx}>
                        <Col>
                          <Row className={styles.showImage}>
                            <Col>
                              <Row>
                                <Col>
                                  <Image
                                    width="290"
                                    height="150"
                                    src={ser.banner}
                                    alt="logo"
                                  />
                                </Col>
                              </Row>
                              <Row className={styles.cardBottomIcon}>
                                <Col lg={9} md={9} sm={12} xs={12}>
                                  <i className="fa fa-play" aria-hidden="true"></i>
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </Col>
                                <Col lg={3} md={3} sm={12} xs={12}>
                                  <i className="fa fa-angle-down" aria-hidden="true" onClick={() => { handleShow(ser.ID) }}></i>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} className="series-modal">
        <Modal.Header closeButton style={{
          border: 'none'
        }}>
          <Modal.Title>
            <Container fluid>
              <Row>
                <Col style={{
                  padding: '0'
                }}>
                  <video
                    width="100%"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src="https://player.vimeo.com/progressive_redirect/playback/709950482/rendition/540p/file.mp4?loc=external&signature=cdde35bfdbe8b1e02d3c407bcc597c0c2c58fc46b019147823d4aa023da69ed6"
                      type="video/mp4"
                    />
                  </video>
                </Col>
                <div className={styles.overlay}></div>
              </Row>
              <Row className={styles.videoTextSeriesModal}>
                <Col lg={8} md={8} sm={12} xs={12}>
                  <Row>
                    <Col>
                      <h1>{seriesWithEp && seriesWithEp.series.Title}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.seriesModalButtonI}>
                      <Button
                      onClick={() => {
                        showVideo(seriesWithEp.episodes[0].vimeoId, seriesWithEp.episodes[0].TITLE)
                      }}
                      ><i className="fa fa-play" aria-hidden="true"></i> Play</Button>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    </Col>
                  </Row>
                </Col>
                <Col lg={2} md={2} sm={12} xs={12}></Col>
                <Col lg={2} md={2} sm={12} xs={12}></Col>
              </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>


        <Modal.Body style={{
            paddingLeft: '45px',
            paddingRight: '45px',
            backgroundImage: 'linear-gradient(0deg, #08070899, #333333)',
            backgroundColor: '#00000040',
            marginTop: '-20px'
          }}>
          <Row>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Row>
                <Col>
                  <h5>Description</h5>
                  <p>{seriesWithEp && seriesWithEp.series.description}</p>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <Row>
                <Col>
                  <h5>Some Other Details</h5>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className='pt-4'>
            <Col>
              <h2 className='pb-4'>Episodes</h2>
              {seriesWithEp &&
                seriesWithEp.episodes.map((episode, index) => {
                  return (
                    < >
                      <Row className={styles.selectedEpisodeSeries}>
                        <Col lg={1} md={1} sm={12} xs={12}>
                          <Row>
                            <Col><h6>{index + 1}.</h6></Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col>
                              <Image
                                width="290"
                                height="150"
                                src={episode.banner}
                                alt="logo"
                                onClick={() => {
                                  showVideo(episode.vimeoId, episode.TITLE)
                                }}
                              />
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={12}>
                          <Row>
                            <Col>
                              <span className='d-flex'><h5 className='width-100'>{episode.TITLE}</h5><h5 className='text-right width-100'>60m</h5></span>
                              <p>{episode.DESCRIPTION.slice(0, 230)}</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>)
                })
              }

            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      
    </Fragment >
  )
}

export default index
