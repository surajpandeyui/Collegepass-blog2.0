import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import styles from './landingform.module.scss'
import Router from 'next/router'


const SubmitScreen = () => {
    const onReturn = () => {
        Router.push('/')
    }

    return (
        <Fragment>
            <Container fluid style={{
                background: '#70acf1'
            }}>
                <Row className={styles.BannerNewLanding}>
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <Row>
                            <Col className='p-0'>
                                <Image
                                    src="/thankyou-banner.jpg"
                                    alt="Banner Image"
                                    width={600}
                                    height={533}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <Row>
                            <Col className={styles.bannerThank}>
                                <Row>
                                    <Col>
                                        <h1>Thank you for getting in touch!</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>We appreciate you contacting us. One of our Admissions Advisor will get in touch with you soon!</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={onReturn}>Return To Home</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SubmitScreen
