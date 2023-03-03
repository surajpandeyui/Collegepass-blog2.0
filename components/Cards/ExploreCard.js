import React, { Fragment } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import styles from './card.module.scss'
//import Image from 'next/image'

const ExploreCard = () => {

  return (
    <Fragment>
      <Col>
        <Row className={styles.explore}>
          <Col>
            <Row className={styles.exploreClass}>
              <Col lg={6} md={6} sm={12} xs={12} style={{
                  padding: '24px'
              }}>
                  <Row>
                      <Col className="cursor-pointer" style={{
                          background: '#272c34',
                          margin: '0',
                          padding: '25%'
                      }}>
                        <h5 className="white-color text-center" style={{
                            lineHeight: '1.5rem',
                            letterSpacing: '0.03rem'
                        }}>Explore<br/> All Classes</h5>
                      </Col>
                  </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Fragment>
  )
}

export default ExploreCard
