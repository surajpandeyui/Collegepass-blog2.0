import React, { Fragment, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap'
import styles from './cpplus.module.scss'
import Image from 'next/image'

const CollegepassPlusScreen = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <Fragment>
        <Container>
            <Row className="pt-5">
                <Col className="pt-5 pb-5 mt-5">
                    <Row style={{
                        margin: 'auto',
                        width: '940px',
                        backgroundColor: '#191c21',
                        border: '1px solid #3f3f40'
                    }}>
                        <Col lg={8} md={8} sm={12} xs={12} className="text-center pt-4">
                            <Row>
                                <Col>
                                    <Image
                                        src="/White-logo.png"
                                        height="100px"
                                        width="130px"
                                        alt=""
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-4">
                                <Col className={styles.plusHeading}>
                                    <h3>Upgrade to <span>CollegePass +</span></h3>
                                </Col>
                            </Row>
                            <Row className={styles.cpPoints}>
                                <Col className="white-color">
                                    <ul>
                                        <li>Enjoy Round the Year, Unlimited Access to College Counsling Sessions by International College Admission Expert</li>
                                        <li>Enjoy Unlimited Access to Ivy League & Oxbridge College Counsling Sessions and Video Lessons</li>
                                        <li>Enjoy Unlimited Access to IELTS Classes</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.cpButton}>
                                    <h3>INR 999 PER YEAR</h3>
                                    <Button>UPGRADE NOW</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <Row>
                                <Col className="p-0" style={{
                                    backgroundSize: 'cover',
                                    backgroundImage: 'url("/beach-1.jpg")',
                                    padding: '275px 150px!important'
                                }}>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} className="modal-plus">
                <Modal.Body className="p-0 closeButton">
                    <Row className="">
                        <Col className="p-0">
                            <Row style={{
                                margin: 'auto',
                                width: '940px',
                                backgroundColor: '#191c21',
                                border: '1px solid #3f3f40'
                            }}>
                                <Col lg={8} md={8} sm={12} xs={12} className="text-center pt-4">
                                    <Row>
                                        <Col>
                                            <Image
                                                src="/White-logo.png"
                                                height="100px"
                                                width="130px"
                                                alt=""
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="pb-4">
                                        <Col className={styles.plusHeading}>
                                            <h3>Upgrade to <span>CollegePass +</span></h3>
                                        </Col>
                                    </Row>
                                    <Row className={styles.cpPoints}>
                                        <Col className="white-color">
                                            <ul>
                                                <li>Enjoy Round the Year, Unlimited Access to College Counsling Sessions by International College Admission Expert</li>
                                                <li>Enjoy Unlimited Access to Ivy League & Oxbridge College Counsling Sessions and Video Lessons</li>
                                                <li>Enjoy Unlimited Access to IELTS Classes</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.cpButton}>
                                            <h3>INR 999 PER YEAR</h3>
                                            <Button>UPGRADE NOW</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <Row>
                                        <Col style={{
                                            backgroundSize: 'cover',
                                            backgroundImage: 'url("/beach-1.jpg")',
                                            padding: '275px 150px'
                                        }}>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Container>
    </Fragment>
  )
}

export default CollegepassPlusScreen
