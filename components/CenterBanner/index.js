import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
//import Image from 'next/image'
import LandingButtonModal from '../../components/Modal/LandingButtonModal'
import styles from '../BookingButton/booking.module.scss'
import { useRouter } from 'next/router'

const CenterBanner = () => {
  const { asPath } = useRouter()

  const [showLButton, setShowLButton] = useState(false)
  const handleShowLButton = () => setShowLButton(true)
  const handleCloseLButton = () => setShowLButton(false)

  let titleText = 'Access The CollegePass Profile Builder'
  let titleLowerBaner = 'Get personalised help from the best in the world'

  if (asPath === '/ivy-league-undergraduate-admissions') {
    titleText = 'Access The CollegePass Profile Builder'
    titleLowerBaner = 'Get personalised help from the best in the world'
  }
  if (asPath === '/ms-admissions') {
    titleText = 'Join Your Dream University'
    titleLowerBaner = 'Get personalised help from the best in the world'
  }

  if (asPath === '/sat-tutoring') {
    titleText = 'Access The CollegePass Profile Builder'
    titleLowerBaner = 'Get personalised help from the best in the world'
  }

  if (asPath === '/ielts-tutoring') {
    titleText = 'Join Your Dream University'
    titleLowerBaner = 'Get personalised help from the best in the world'
  }
  if (asPath === '/ap-calculus-tutoring') {
    titleText = 'Build A Stellar College Profile'
    titleLowerBaner = 'Get personalised help from the best in the world'
  }

  return (
    <Fragment>
      <Container
        fluid
        className="pt-5 pb-5 bg-white"
        style={{
          backgroundPosition: 'left',
          backgroundImage: 'url(/landingPageBanner/footer1.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Container className="pt-2 pb-2">
          <Row className={styles.booking}>
            <Col>
              <Row>
                <Col lg={7} md={7} sm={12} xs={12}></Col>
                <Col lg={5} md={5} sm={12} xs={12}>
                  <Row>
                    <Col>
                      <h3
                        style={{
                          fontWeight: '600',
                          fontSize: '30px',
                          lineHeight: '1.3',
                          color: '#fff',
                          marginBottom: '20px',
                        }}
                      >
                        {titleText}
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p
                        style={{
                          fontSize: '20px',
                          lineHeight: '1.3',
                          color: '#fff',
                          paddingBottom: '30px',
                        }}
                      >
                        {titleLowerBaner}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button onClick={handleShowLButton}>
                        <i className="fa fa-calendar" aria-hidden="true" />
                        {'     '}
                        Book Your Free Consultation
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <LandingButtonModal
        show={showLButton}
        handleClose={handleCloseLButton}
        pageName={asPath}
      />
    </Fragment>
  )
}

export default CenterBanner
