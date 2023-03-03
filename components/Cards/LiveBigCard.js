import React, { Fragment, useState, useEffect } from 'react'
//import dynamic from 'next/dynamic'
import { Row, Col, Button } from 'react-bootstrap'
import styles from './card.module.scss'
import Image from 'next/image'
//import { Link } from 'next/link'

const LiveCard = ({
  imageSrc = 'https://collegepass.s3.ap-south-1.amazonaws.com/HarvardAdmits.jpg',
  alt = 'event name',
  eventTitle = '',
  eventDate = '',
  eventTime = '',
  topLeftText = 'Live',
  topRightText = 'Premium',
  cardButton,
  grades = "2,3,4,5"
}) => {

  const [grade, setGrade] = useState('Grades 8-12')
  useEffect(() => {
    // console.log(grades)
    let a = grades
    a = a.split(',').sort()
    let end = parseInt(a[a.length - 1]) + 7
    if(parseInt(a[a.length - 1]) >= 6)
      setGrade('Masters')
    else if(a.length == 1){
      setGrade('Grade '+(parseInt(a[0])+7).toString())
    }
    else
      setGrade('Grades '+(parseInt(a[0])+7).toString()+'-'+end.toString())
  }, [grades])
  // useEffect(() => {
  //   console.log(grade)
  // }, [grade])
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
        <Row className={styles.cardCenter}>
          <Col
            style={{
              margin: '5px 15px',
            }}
          >
            <Row>
              <Col className={styles.live}>
                <span className={styles.smallButtonLeft}>{topLeftText}</span>
              </Col>
              <Col className={styles.premiumButton}>
                <p className={styles.smallButtonRight}>
                  <span
                    style={{
                      marginRight: '5px',
                    }}
                  >
                    <Image
                      src="/BHolo.jpeg"
                      className={styles.pholo}
                      height="15"
                      width="15"
                      alt="Prime Logo"
                    />
                  </span>
                  <span className="ml-0">{topRightText}</span>
                </p>
              </Col>
            </Row>
            <Row className={styles.cardCenterText}>
              <Col>
              {/*<Row>
                <Col className={styles.title}>
                  <h6>{eventTitle}</h6>
                </Col>
              </Row>
              <Row>
                <Col className={styles.date}>
                  <h6>{eventDate}</h6>
                </Col>
              </Row>
              <Row>
                <Col className={styles.time}>
                  <h6>{eventTime}</h6>
                </Col>
              </Row>*/}
              <Row>
                <Col className={styles.cardButton}>{cardButton}</Col>
              </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Fragment>
  )
}

export default LiveCard
