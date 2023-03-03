import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
//import Image from 'next/image'
import LandingButtonModal from '../../components/Modal/LandingButtonModal'
import styles from '../BookingButton/booking.module.scss'
import { useRouter } from 'next/router'

const BookingButton = () => {
  const { asPath } = useRouter()

  const [showLButton, setShowLButton] = useState(false)
  const handleShowLButton = () => setShowLButton(true)
  const handleCloseLButton = () => setShowLButton(false)
  return (
    <Fragment>
      <Container fluid className="pt-5 pb-5 bg-white">
        <Container>
          <Row className={styles.booking}>
            <Col className="pb-5 pt-3">
              <Row>
                <Col className="text-center">
                  <Row>
                    <Col>
                      <p
                        style={{
                          fontWeight: '600',
                          letterSpacing: '0.03rem',
                          fontSize: '20px',
                        }}
                      >
                        Access our live class
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button onClick={handleShowLButton}>
                        <i className="fa fa-calendar" aria-hidden="true" />
                        {'     '}
                        Book your free consultation
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

export default BookingButton