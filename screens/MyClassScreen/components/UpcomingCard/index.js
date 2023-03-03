import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../../class.module.scss'

const UpcomingCard = ({ indClass }) => {
  return (
    <>
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
          <Col className="space-for-card">
            <Image
              src="/starting-the-essay.jpeg"
              layout="responsive"
              height="65%"
              width="100%"
              alt="CLASS IMAGE"
              priority
              className={styles.cardImage}
            />
          </Col>
        </Row>
        <Row className={styles.cardCenter}>
          <Col
            style={{
              margin: '5px 15px',
            }}
          >
            <Row>
              <Col className={styles.live}>
                <span className={styles.smallButtonLeft}>LIVE CLASS</span>
              </Col>
              <Col className={styles.premiumButton}>
                <p className={styles.smallButtonRight}>
                  <span
                    style={{
                      marginRight: '5px',
                    }}
                  >
                    <Image
                      src="https://www.collegepass.org/static/media/BHolo.620492e7.jpeg"
                      className={styles.pholo}
                      height="15"
                      width="15"
                      alt="Prime Logo"
                    />
                  </span>
                  <span className="ml-0">PREMIUM +</span>
                </p>
              </Col>
            </Row>
            <Row className={styles.cardCenterText}>
              <Row>
                <Col className={styles.title}>
                  <h6>SAT MASTERCLASS MATH</h6>
                </Col>
              </Row>
              <Row>
                <Col className={styles.date}>
                  <h6>Thursday, January 13</h6>
                </Col>
              </Row>
              <Row>
                <Col className={styles.time}>
                  <h6>06:00 PM</h6>
                </Col>
              </Row>
              <Row>
                <Col className={styles.cardButton}>
                  <Button>NOTIFY ME</Button>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default UpcomingCard
