import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../BackgroundBanner/background-banner.module.scss';

const BackgroundBanner = () => {

  return (
    <Fragment>
        <Container fluid>
                <Row>
                    <Col className={styles.ugBgBanner} style={{
                        backgroundImage: "url('./Bg_Banner.jpg')"
                    }}>
                    </Col>
                </Row>
            </Container>
    </Fragment>
  )
}

export default BackgroundBanner
