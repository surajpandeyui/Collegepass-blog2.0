import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import styles from '../PlayVideoScreen/playvideo.module.scss'

const PlayVideoScreen = ({ title = 'COLLEGEPASS VIDEO', videoID = '' }) => {
  const videoUrl =
    'https://www.youtube.com/embed/' + videoID + '?rel=0&amp;enablejsapi=1'

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
                  width="1200"
                  height="564"
                  src={videoUrl}
                  frameBorder="0"
                  showinfo="0"
                  id="widget2"
                  title="collegepass"
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
