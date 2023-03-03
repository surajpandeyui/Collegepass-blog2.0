import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './card.module.scss'
import Image from 'next/image'

const VideoCard = ({
  imageSrc = 'https://collegepass.s3.ap-south-1.amazonaws.com/HarvardAdmits.jpg',
  alt = 'event name',
  eventTitle = 'APPLYING TO UTORONTO',
  cardButton,
  topLeftText = { topLeftText },
  topRightText = { topRightText },
  eventDescription='',
  eventVideo=null
}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Col className={styles.showImage} onClick={handleShow}>
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
              <i className="fa fa-play" aria-hidden="true"></i>
              <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              {['top'].map((placement) => (
                <OverlayTrigger
                  key={placement}
                  placement={placement}
                  overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                    Info
                    </Tooltip>
                  }
                >
                  <i className="fa fa-angle-down" aria-hidden="true" ></i>
                </OverlayTrigger>
              ))}

            </Col>
          </Row>
          <Row className="p-0">
            <Col className={styles.cardDes}>
              <h6>Description</h6>
              <p>Get accepted to The Ivy League with the CollegePass..</p>
            </Col>
          </Row>
        </Row>
      </Col>

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
              <Row className={styles.videoTextLessonsModal}>
                <Col lg={8} md={8} sm={12} xs={12}>
                  <Row>
                    <Col>
                      <h1>{eventTitle}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.seriesModalButtonI}>
                      {/* <Button
                      onClick={() => {
                        // showVideo(seriesWithEp.episodes[0].vimeoId, seriesWithEp.episodes[0].TITLE)
                      }}
                      ><i className="fa fa-play" aria-hidden="true"></i> Play</Button> */}
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


        <Modal.Body style={{
          paddingLeft: '45px',
          paddingRight: '45px',
          backgroundImage: 'linear-gradient(0deg, #08070899, #333333)',
          backgroundColor: '#00000040',
          marginTop: '-20px'
        }}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col>
                  <h5>Description</h5>
                  <div className={styles.discriptionScrollVid} dangerouslySetInnerHTML={{
                    __html: eventDescription,
                  }}></div>
                </Col>
              </Row>
            </Col>
          </Row>

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

export default VideoCard