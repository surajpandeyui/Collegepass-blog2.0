import React, { Fragment, useState, useEffect } from 'react'
//import dynamic from 'next/dynamic'
import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './card.module.scss'
import Image from 'next/image'
import { APIRateEvent } from '../../config/API'
import axios from 'axios'

//import { Link } from 'next/link'

const LiveCard = ({
  eventid = '',
  imageSrc = 'https://collegepass.s3.ap-south-1.amazonaws.com/HarvardAdmits.jpg',
  alt = 'event name',
  eventTitle = 'APPLYING TO UTORONTO',
  eventDate = 'Saturday, November 06',
  eventTime = '07:30 PM ',
  topLeftText = 'Live',
  topRightText = 'Premium',
  cardButton,
  eventDescription = '',
  eventVideo = null,
  liveStatus = null,
  premiumLevel = null,
  userid = '',
  showLogin = null
}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [like, setlike] = useState('fa fa-thumbs-o-up')
  const [dislike, setdislike] = useState('fa fa-thumbs-o-down')
  const [heart, setheart] = useState('fa fa-heart-o')
  const [registerButton, setregisterButton] = useState('fa fa-plus')
  if (process.browser) {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
  }

  useEffect(() => {
    if (cardButton) {
      if (cardButton.props.children == "REGISTERED") {
        setregisterButton('fa fa-check')
      }
      else if (cardButton.props.children == "JOIN NOW") {
        setregisterButton('fa fa-play')
      }
      else if (cardButton.props.children == "REGISTER") {
        setregisterButton('fa fa-plus')
      }
      else if (cardButton.props.children == "WATCH") {
        setregisterButton('fa fa-play')
      }
      else {
        setregisterButton('fa fa-plus')
      }

    }
  }, [cardButton])

  const rateEvent = async (event, rate, user) => {
    if(!user)
    {
      showLogin()
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
      // hideoptions()
    }
    // console.log("rated successfully")
  }

  return (
    <Fragment>
      <Col className={styles.showImage} >
        <Row>
          <Col className='p-0' onClick={handleShow}>
            <Image
              src={imageSrc}
              layout="responsive"
              height="65%"
              width="100%"
              alt={alt}
              priority
              className={styles.cardImage}
            />
            {liveStatus == 1 && <p className={styles.live}>live</p>}
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
                      {cardButton.props.children}
                    </Tooltip>
                  }
                ><i className={registerButton} onClick={cardButton.props.children == "REGISTERED" ? null :
                cardButton.props.onClick} disabled aria-hidden="true"></i></OverlayTrigger>
                ))}
              {/*<i className="fa fa-check" aria-hidden="true"></i>*/}
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
                ><i className={like} aria-hidden="true" onClick={() => { rateEvent(eventid, 1, userid) }}></i></OverlayTrigger>
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
                ><i className={dislike} aria-hidden="true" onClick={() => { rateEvent(eventid, 2, userid) }}></i></OverlayTrigger>
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
                ><i className={heart} aria-hidden="true" onClick={() => { rateEvent(eventid, 3, userid) }}></i></OverlayTrigger>
                ))}
              </div>
            </Col>
          </Row>
          {/* <Row className="p-0">
            <Col className={styles.cardDes}>
              <div className={styles.discriptionScroll} dangerouslySetInnerHTML={{
                      __html: eventDescription.slice(0,90)+"...",
                    }}></div>
            </Col>
          </Row> */}
        </Row>
      </Col>

      <Modal show={show} onHide={handleClose} className="series-modal">
        <Modal.Header closeButton style={{
          border: 'none'
        }}>
          <Modal.Title>
            {premiumLevel > 1 && <p className={styles.plusForSeries}>{premiumLevel == 2 ? "PLUS" : premiumLevel == 3 ? "PREMIUM" : "PREMIUM PLUS"}</p>}

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
              <Row className={styles.videoTextTrackModal}>
                <Col lg={8} md={8} sm={12} xs={12}>
                  {/* <Row>
                    <Col className={styles.modalTitle}>
                      <h1>{eventTitle.slice(0, 90)}</h1>
                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col className={styles.modalDateTime}>
                      <h1>{eventDate}, {eventTime}</h1>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className={styles.seriesModalButtonI}>
                      {/* <Button
                      onClick={() => {
                        // showVideo(seriesWithEp.episodes[0].vimeoId, seriesWithEp.episodes[0].TITLE)
                      }}
                      ><i className="fa fa-play" aria-hidden="true"></i> Play</Button> */}
                      <p className={styles.time} style={{
                        visibility: 'hidden'
                      }}>{eventTime}</p>
                      {cardButton}
                    </Col>
                  </Row>
                </Col>
                <Col lg={2} md={2} sm={12} xs={12}></Col>
                <Col lg={2} md={2} sm={12} xs={12}></Col>
              </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>


        <Modal.Body
          className={styles.seriesModalBody}>
          {<Row>
            <Col lg={12} md={12} sm={12} xs={12}>
            <Row>
                <Col className={styles.newSeriesModalForMobile}>
                <p className={styles.time} style={{
                  visibility: 'hidden'
                }}>{eventTime}</p>
                  {cardButton}
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Description</h5>
                  <div className={styles.discriptionScrollTrack} dangerouslySetInnerHTML={{
                    __html: eventDescription,
                  }}></div>

                </Col>
              </Row>
            </Col>
          </Row>}


          <Row className='pt-4'>
            {/*<Col>
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

            </Col>*/}
          </Row>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default LiveCard
