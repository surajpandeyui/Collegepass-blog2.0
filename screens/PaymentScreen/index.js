import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import styles from './payment.module.scss'
import Link from 'next/link'

const Completed = () => {
  return (
    <Fragment>
      <Container fluid className="bg-black pt-5 pb-5">
        <Row className="pt-5 pb-3 text-center">
          <Col className={styles.completedMain}>
            <Row>
              <Col>
                <i className="fa fa-check" aria-hidden="true"></i>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>
                  Payment successfully <br />
                  processed!
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Thank you for subscribing to CollegePass
                  {/* <span>
                    {' '}
                    <Image
                      src="https://www.collegepass.org/static/media/BHolo.620492e7.jpeg"
                      alt="Logo"
                      width={15}
                      height={15}
                      className={styles.completed}
                    />{' '}
                    PREMIUM
                  </span> */}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href="/">
                  <Button>Homepage</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Completed
