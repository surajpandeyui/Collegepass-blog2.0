import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import Image from 'next/image'

const QR = ({showLinkModal, handleCloseLinkModal }) => {

//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const handleCloseLinkModal = () => setShowLinkModal(false);
//   const handleShowLinkModal = () => setShowLinkModal(true);
// console.log()
  return (
    <Fragment>
     
      {/*   Get link  */}

            <Modal
                    show={showLinkModal}
                    onHide={handleCloseLinkModal}
                    backdrop="static"
                    keyboard={false}
                    className="get-link-cp"
                >
                    <Modal.Header closeButton style={{
                        borderBottom: '0'
                    }}>
                    </Modal.Header>
                    <Modal.Body>
                    <Row>
                        <Col lg={7} ms={7} sm={12} xs={12}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            {/*<h1>enter your phone number<br/> to get the link via SMS</h1>*/}
                                            <h1>Learn from the best college counsellors.</h1>
                                            {/*<p>alternatively, <a href="">scan QR code</a></p>*/}
                                            <p className='visibility-hidden'>alternatively, <a href="">send SMS</a></p>
                                        </Col>
                                    </Row>
                                    {/*<Row>
                                        <Col>
                                            <InputGroup className="mb-3 mt-4" style={{
                                                borderRadius: '30px'
                                            }}>
                                                <Form.Control
                                                placeholder="+91 9876543210"
                                                aria-label="phone"
                                                aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2">
                                                    <Button>
                                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                    </Button>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Row>*/}
                                    <Row>
                                        <Col>
                                            <ul>
                                                <li>Open your phone camera and point it at the QR code.</li>
                                                <li>Alternatively, download any QR code scanner to scan.</li>
                                                <li>Click on the link generated to download CollegePass</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex pt-5">
                                            <div className='app-icon-ps'>
                                                <Image
                                                    width="28"
                                                    height="28"
                                                    src="/play-store-logo.png"
                                                    alt="play store icon"
                                                />
                                            </div>
                                            <div className='app-icon-aa'>
                                                <Image
                                                    width="28"
                                                    height="28"
                                                    src="/apple-store-logo.png"
                                                    alt="apple icon"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>      
                        </Col>
                        <Col lg={5} ms={5} sm={12} xs={12}>
                            <Row>
                                <Col>
                                    <Image
                                        width="300"
                                        height="300"
                                        src="/qr-code.png"
                                        alt="apple icon"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Modal.Body>
                </Modal>

                {/*   Get link End  */}

    </Fragment>
  )
}

export default QR
