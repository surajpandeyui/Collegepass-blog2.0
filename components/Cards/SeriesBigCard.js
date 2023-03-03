import React, { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//import dynamic from 'next/dynamic'
import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './card.module.scss'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import {
  APIRateEvent,
  getSeriesWithEp,
} from '../../config/API'
import axios from 'axios'

//import { Link } from 'next/link'

const LiveCard = ({
  eventID = '',
  imageSrc = 'https://collegepass.s3.ap-south-1.amazonaws.com/HarvardAdmits.jpg',
  alt = 'event name',
  eventTitle = 'APPLYING TO UTORONTO',
  eventDate = 'Saturday, November 06',
  eventTime = '07:30 PM ',
  topLeftText = 'Live',
  topRightText = 'Premium',
  cardButton = null,
  eventDescription = '',
  eventVideo = null,
  liveStatus = null,
  premiumLevel = null,
  userid = '',
  grades = '',
  showRedirect = () => { }
}) => {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const [seriesWithEp, setseriesWithEp] = useState(null)
  const [show, setShow] = useState(false);
  const Clicked = () => {
    handleShow()
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = (id) => {
    // console.log("in hover")
    setIsHovered(id)
  };
  const onMouseLeave = () => {
    // console.log("out of hover")
    // setIsHovered(false)
  };

  const showVideo = (video, title, paid, series, episode) => {
    let playURL = `/play-series/${video}/${title.replace(/\//g, '%2F')}`
    playURL = playURL.replace(/\?/g, '%3F')
    playURL = `${playURL}?sourcetype=${series}vimeo${episode}`
    // console.log("detail==>", auth.userDetails, paid)
    if (auth.userDetails?.ISPREMIUM === undefined) {
      setShowLogin(true)
    }
    else if (auth.userDetails?.ISPREMIUM >= 2 || (auth.userDetails?.ISPREMIUM == 1 || auth.userDetails?.ISPREMIUM !== undefined) && !paid) {
      // router.push(playURL)
      window.open(playURL)
    }
    else {
      router.push('/pricing')
    }


  }

  useEffect(() => {
    if (show && eventID) {
      axios
        .post(getSeriesWithEp, { series: eventID })
        .then((e) => {
          // console.log(e.data.message)
          setseriesWithEp(e.data.message)
          setShow(true);
        })
        .catch((error) => {
          //   console.log(error)
        })
    }

  }, [show])
  return (
    <Fragment>
      <Col
        lg={6}
        md={6}
        sm={12}
        xs={12}
        style={{
          position: 'relative',
          margin: '15px 0px',
        }}
      >
        <Row>
          <Col className='p-0' onClick={() => { Clicked() }}>
            <Image
              src={imageSrc}
              layout="responsive"
              height="65%"
              width="100%"
              alt={alt}
              priority
              className={styles.cardImage}
            />
          </Col>
        </Row>
        <Row className={styles.cardCenterSeriesNew}>
          <Col className={styles.cardButton}>
            <Button
              onClick={() => {
                  showRedirect()
                  // showVideo(seriesWithEp.episodes[0].vimeoId, seriesWithEp.episodes[0].TITLE)
                }}
              ><i className="fa fa-play" aria-hidden="true"></i> Watch
            </Button>
          </Col>
          </Row>
      </Col>


      <Modal show={show} onHide={handleClose} className="series-modal">
        <Modal.Header closeButton style={{
          border: 'none'
        }}>
          {/* <p className={styles.plusForSeries}>Plus</p> */}
          <Modal.Title>
            <Container fluid>
              <Row>
                <Col style={{
                  padding: '0'
                }}>
                  {eventVideo ? <><video
                    width="100%"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src={eventVideo}
                      type="video/mp4"
                    />
                  </video></>
                    :
                    <Image
                      src={imageSrc}
                      className={styles.modalImg}
                      height="530"
                      width="900"
                      alt="Prime Logo"
                    />}
                </Col>
                <div className={styles.overlay}></div>
              </Row>
              <Row className={styles.videoTextSeriesModal}>
                <Col lg={8} md={8} sm={12} xs={12}>
                  {/* <Row>
                    <Col>
                      <h1>{eventTitle.slice(0, 90)}</h1>
                    </Col>
                  </Row> */}
                  <Row style={{
                    visibility: 'hidden'
                  }}>
                    <Col className={styles.modalDateTime}>
                      <h1>{eventDate}, {eventTime}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.seriesModalButtonI}>
                      <Button
                        onClick={() => {
                          showRedirect()
                          // let a = seriesWithEp.episodes[0].VIDEO
                          // let b = a.split("/")[4].split("?")
                          // a = b[1].split("=")[b[1].split("=").length - 1]
                          // showVideo(b[0] + "%3Fh=" + a, seriesWithEp.episodes[0].TITLE, seriesWithEp.episodes[0].IS_PAID, eventID, seriesWithEp.episodes[0].ID)
                        }}
                      ><i className="fa fa-play" aria-hidden="true"></i> Play</Button>
                      {/* {cardButton} */}
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
          marginTop: '-50px'
        }}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col>
                  <h5>Description</h5>
                  <p className={styles.discriptionScroll}>{eventDescription}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className='pt-4'>
            <Col className={styles.seriesEpisodesScroll}>
              <h2 className='pb-4'>Episodes</h2>
              {seriesWithEp &&
                seriesWithEp.episodes.map((episode, index) => {
                  return (
                    < >
                      <Row className={styles.selectedEpisodeSeries}
                        style={{ background: `${isHovering == episode.ID ? "#333" : ""}` }}
                        onMouseEnter={() => {
                          // console.log(isHovering)
                          onMouseEnter(episode.ID)
                        }}
                        onMouseLeave={() => onMouseLeave()}
                      >
                        {/*<Col lg={1} md={1} sm={12} xs={12}>
                          <Row>
                            <Col><h6>{index + 1}.</h6></Col>
                          </Row>
                        </Col>*/}
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col onClick={() => {
                              showRedirect()
                              // let a = episode.VIDEO
                              // let b = a.split("/")[4].split("?")
                              // a = b[1].split("=")[b[1].split("=").length - 1]
                              // showVideo(b[0] + "%3Fh=" + a, episode.TITLE, episode.IS_PAID, seriesWithEp.series.ID, episode.ID)
                            }}
                              style={{
                                marginBottom: '-20%'
                              }}>
                              <Image
                                width="300"
                                height="160"
                                src={episode.banner}
                                alt="logo"

                              />
                              <div className={styles.iconBox}>
                                <i className="fa fa-play"
                                  style={{ display: `${isHovering == episode.ID ? "inline-block" : "none"}` }}
                                ></i>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={9} md={9} sm={12} xs={12}>
                          <Row>
                            <Col>
                              <Row>
                                <Col lg={10} md={10} sm={12} xs={12}>
                                  <h5 className='width-100'>{episode.TITLE}</h5>
                                </Col>
                                <Col lg={2} md={2} sm={12} xs={12}>
                                  <h5 className='text-right width-100'>{episode.DURATION}m</h5>
                                </Col>
                              </Row>
                              {/*<span className='d-flex'>
                                <h5 className='width-100'>{episode.TITLE}</h5>
                                <h5 className='text-right width-100'>{episode.DURATION}m</h5>
                              </span>*/}
                              <p>{episode.DESCRIPTION.length > 120 ? episode.DESCRIPTION.slice(0, 120) + ". . ." : episode.DESCRIPTION}</p>
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
    </Fragment>
  )
}

export default LiveCard
