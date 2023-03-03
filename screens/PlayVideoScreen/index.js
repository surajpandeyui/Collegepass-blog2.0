import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import styles from '../PlayVideoScreen/playvideo.module.scss'

const PlayVideoScreen = ({ title = 'COLLEGEPASS VIDEO', videoID = '' }) => {
  const videoUrl = `https://player.vimeo.com/video/${videoID}`
  return (
    <Container fluid className="bg-black pt-5 pb-5 white-color">
      <Container>
        <Row>
          <Col className={styles.playVideo}>
            <Row>
              <Col>
                <h2 className="text-center pt-4 pb-4">{title}</h2>
              </Col>
            </Row>
            <Row>
              <Col className="m-auto text-center">
                <iframe
                  src={videoUrl}
                  width="800"
                  height="564"
                  frameBorder="0"
                  id="sing_vd"
                  allow="autoplay; fullscreen"
                  title="video"
                  allowFullScreen
                />
                {/* <video width='700' autoPlay loop muted playsInline>
									<source src={videoUrl} type='video/mp4' />
								</video> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default PlayVideoScreen
