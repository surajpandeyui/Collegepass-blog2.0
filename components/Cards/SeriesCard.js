import React, { Fragment, useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//import dynamic from 'next/dynamic'
import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './card.module.scss'
import Image from 'next/image'
//import { Link } from 'next/link'
import axios from 'axios'
import { getSeriesWithEp, APIRateEvent } from '../../config/API'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const LoginModal = dynamic(() => import('../Modal/LoginModal'))

const LiveCard = ({
  imageSrc = 'https://collegepass.s3.ap-south-1.amazonaws.com/HarvardAdmits.jpg',
  alt = 'event name',
  eventTitle = 'APPLYING TO UTORONTO',
  eventDate = 'Saturday, November 06',
  eventTime = '07:30 PM ',
  topLeftText = 'Live',
  topRightText = 'Premium',
  // cardButton,
  eventDescription = '',
  eventVideo = null,
  eventID = null,
  episodeVideo = '',
  episodeTitle = '',
  episodeIsPaid = '',
  episodeID = '',
  userid = '',
  showRedirect = ()=>{}

}) => {
  const auth = useSelector((state) => state.auth)
  const [seriesWithEp, setseriesWithEp] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showRating, setShowRating] = useState('none')
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)
  const [like, setlike] = useState('fa fa-thumbs-o-up')
  const [dislike, setdislike] = useState('fa fa-thumbs-o-down')
  const [heart, setheart] = useState('fa fa-heart-o')
  const [registerButton, setregisterButton] = useState('fa fa-plus')
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = (id) => {
    // console.log("in hover")
    setIsHovered(id)
  };
  const router = useRouter()
  const onMouseLeave = () => {
    // console.log("out of hover")
    // setIsHovered(false)
  };
  const showoptions = () => {
    // console.log("showing")
    setShowRating('flex')
  }
  const hideoptions = () => {
    // console.log("hiding")
    setShowRating('none')
  }

  // if (process.browser) {
  //   const config = {
  //     headers: { Authorization: `Bearer ${localStorage.token}` },
  //   }
  // }
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

  const rateEvent = async (event, rate, user) => {
    if(!user)
    {
      handleShowLogin()
      return
    }
    // console.log("clicked")
    if (rate == 1) {
      setlike('fa fa-thumbs-up')
      setdislike('fa fa-thumbs-o-down')
      setheart('fa fa-heart-o')
    }

    if (rate == 2) {
      setlike('fa fa-thumbs-o-up')
      setdislike('fa fa-thumbs-down')
      setheart('fa fa-heart-o')
    }
    if (rate == 3) {
      setlike('fa fa-thumbs-o-up')
      setdislike('fa fa-thumbs-o-down')
      setheart('fa fa-heart')
    }
    const response = await axios.post(APIRateEvent, { eventID: event, rating: rate, userID: user }, config)
    if (response.status) {
      // console.log("hiding")
      hideoptions()
    }
    // console.log("rated successfully")
  }

  const playButton = (video, title, paid, series, episode) => {
    if (paid) {
      handleShow()
    }
    else {
      let a = video
      let b = a.split("/")[4].split("?")
      a = b[1].split("=")[b[1].split("=").length - 1]
      showVideo(b[0] + "%3Fh=" + a, title, paid, series, episode)
    }

  }
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

  return (
    <Fragment>
      <Col className={styles.showImage} >
        <Row>
          <Col className='p-0'>
            <Image
              src={imageSrc}
              layout="responsive"
              height="65%"
              width="100%"
              alt={alt}
              priority
              className={styles.cardImage}
              onClick={handleShow}
            />
          </Col>
        </Row>
        <Row>
          <Col className={styles.cardBottomIconShadowEffect} onClick={handleShow}>
          </Col>
        </Row>
        <Row className={styles.cardBottomIcon}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
            {['top'].map((placement) => (
                <OverlayTrigger
                  key={placement}
                  placement={placement}
                  className={styles.seriesTooltip}
                  overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                      Play
                    </Tooltip>
                  }
                ><i className="fa fa-play" aria-hidden="true" onClick={()=>{
                  showRedirect()
                  // playButton(episodeVideo, episodeTitle, episodeIsPaid, eventID, episodeID )
                }}></i></OverlayTrigger>
                ))}
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className='likes-icons'>
                {['top'].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    placement={placement}
                    className={styles.seriesTooltip}
                    overlay={
                      <Tooltip id={`tooltip-${placement}`}>
                        I Like This
                      </Tooltip>
                    }
                  ><i className={like} aria-hidden="true" onClick={() => { rateEvent(eventID, 1, userid) }}></i></OverlayTrigger>
                  ))}
                  {['top'].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    placement={placement}
                    className={styles.seriesTooltip}
                    overlay={
                      <Tooltip id={`tooltip-${placement}`}>
                        Not For Me
                      </Tooltip>
                    }
                  ><i className={dislike} aria-hidden="true" onClick={() => { rateEvent(eventID, 2, userid) }}></i></OverlayTrigger>
                  ))}
                  {['top'].map((placement) => (
                  <OverlayTrigger
                    key={placement}
                    placement={placement}
                    className={styles.seriesTooltip}
                    overlay={
                      <Tooltip id={`tooltip-${placement}`}>
                        Love This !
                      </Tooltip>
                    }
                  ><i className={heart} aria-hidden="true" onClick={() => { rateEvent(eventID, 3, userid) }}></i></OverlayTrigger>
                  ))}
              </div>
            </Col>
          </Row>
          {/*<Row className="p-0">
            <Col className={styles.cardDes}>
              <h6>{eventTitle.length > 25 ? eventTitle.slice(0, 25)+"..." : eventTitle}</h6>
             <p className={styles.discriptionScroll}>{eventDescription.slice(0, 90)}...</p>
            </Col>
          </Row>*/}
        </Row>
      </Col>

      <Modal show={show} onHide={handleClose} className="series-modal pl-0">
        <Modal.Header closeButton style={{
          border: 'none'
        }}>
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
                    <p className={styles.time} style={{
                        visibility: 'hidden'
                      }}>{eventTime}</p>
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


        <Modal.Body className={styles.seriesModalBody}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col className={styles.newSeriesModalForMobile}>
                  <p className={styles.time} style={{
                        visibility: 'hidden'
                      }}>{eventTime}</p>
                  <Button
                        onClick={() => {
                          showRedirect()
                          // let a = seriesWithEp.episodes[0].VIDEO
                          // let b = a.split("/")[4].split("?")
                          // a = b[1].split("=")[b[1].split("=").length - 1]
                          // showVideo(b[0] + "%3Fh=" + a, seriesWithEp.episodes[0].TITLE, seriesWithEp.episodes[0].IS_PAID, eventID, seriesWithEp.episodes[0].ID)
                        }}
                      ><i className="fa fa-play" aria-hidden="true"></i> Play</Button>
                </Col>
              </Row>
              <Row>
                <Col className={styles.seriesEpisodesModalForMobile}>
                  <Tabs
                      defaultActiveKey="description"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="description" title="Description">
                        <p className={styles.discriptionScroll}>{eventDescription}</p>
                      </Tab>
                      <Tab eventKey="episodes" title="Episodes">
                        <Row>
                          <Col className={styles.seriesEpisodesScroll}>
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
                                      <Col>
                                        <Row>
                                          <Col lg={6} md={6} sm={6} xs={6}>
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
                                          <Col lg={6} md={6} sm={6} xs={6}>
                                            <Row>
                                              <Col>
                                                <Row>
                                                  <Col lg={10} md={10} sm={12} xs={12}>
                                                    <h5 className='width-100'>{episode.TITLE}</h5>
                                                  </Col>
                                                  <Col lg={2} md={2} sm={12} xs={12} className={styles.seriesDuration}>
                                                    <h5 className='width-100'>{episode.DURATION}m</h5>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
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
                      </Tab>
                    </Tabs>
                </Col>
              </Row>
              <Row>
                <Col className={styles.seriesEpisodesModalForDesktop}>
                  <h5>Description</h5>
                  <p className={styles.discriptionScroll}>{eventDescription}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className={styles.seriesEpisodesModalForDesktop}>
            <Col className={styles.seriesEpisodesScroll}>
              <h2 className='pb-0 pt-4'>Episodes</h2>
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
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </Fragment>
  )
}

export default LiveCard
