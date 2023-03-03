import React, { useState } from "react";
import {Container, Row, Col, Modal, Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import Image from 'next/image'
import styles from './modal.module.scss';


const ModalScreen = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const [showModal3, setShowModal3] = useState(false);
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  const [showModal4, setShowModal4] = useState(false);
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);

  const [showModal5, setShowModal5] = useState(false);
  const handleCloseModal5 = () => setShowModal5(false);
  const handleShowModal5 = () => setShowModal5(true);

  const [showModalUpgradeClass, setShowModalUpgradeClass] = useState(false);
  const handleCloseModalUpgradeClass = () => setShowModalUpgradeClass(false);
  const handleShowModalUpgradeClass = () => setShowModalUpgradeClass(true);

  const [showModalUpgradeLivestream, setShowModalUpgradeLivestream] = useState(false);
  const handleCloseModalUpgradeLivestream = () => setShowModalUpgradeLivestream(false);
  const handleShowModalUpgradeLivestream = () => setShowModalUpgradeLivestream(true);


	return (
        <Container fluid className="bg-black pt-5 pb-5 mt-5">
            <Container>
                <Row>
                    <Col className={styles.modalCp}>
                        <Button variant="primary" onClick={handleShow}>
                            modal-1
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="p-0">
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Image
                                                    width='600'
                                                    height='311'
                                                    src='/for-modal.jpg'
                                                    alt='Holo'
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="p-4">
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>2021 POPUPS MART RECAP</p>
                                                <h1 style={{
                                                    fontSize: '40px',
                                                    lineHeight: '2.5rem',
                                                    letterSpacing: '0.03rem'
                                                }}>The Year In Review!<br/>Let's look back at what <br/> We achived together<br/> with you. </h1>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.modalButtons}>
                                                <Button className="mr-2">Read now</Button><Button className="ml-2">Later</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className={styles.modalCp}>
                        <Button variant="primary" onClick={handleShowModal2}>
                            modal-2
                        </Button>

                        <Modal show={showModal2} onHide={handleCloseModal2} className="newModal">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="p-0">
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col lg={5} md={5} sm={12} xs={12} style={{
                                                backgroundImage: "url('/for-modal.jpg')",
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center center'
                                            }}>
                                               
                                            </Col>
                                            <Col lg={7} md={7} sm={12} xs={12} style={{
                                                padding: '30px 40px 30px 30px'
                                            }}>
                                                <Row>
                                                    <Col className="text-center">
                                                        <h1 style={{
                                                            color: '#000000',
                                                            fontWeight: '800',
                                                            fontSize: '40px',
                                                            marginBottom: '15px'
                                                        }}>Summer Sale</h1>
                                                        <p style={{
                                                            fontWeight: '600',
                                                            fontSize: '16px',
                                                            marginBottom: '20px'
                                                        }}>Where we should send <br/>your 30% off?</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                <Form.Control type="password" placeholder="Full Name" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Control type="email" placeholder="Enter your e-mail" />
                                                            </Form.Group>
                                                            <Button variant="primary" type="submit" style={{
                                                                width: '100%',
                                                                marginTop: '20px',
                                                                marginRight: '15px',
                                                                background: '#a02928',
                                                                border: 'none'
                                                            }}>
                                                                GET MY 30% OFF
                                                            </Button>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className={styles.modalCp}>
                        <Button variant="primary" onClick={handleShowModal3}>
                            modal-3
                        </Button>

                        <Modal show={showModal3} onHide={handleCloseModal3} className="newModal">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="p-0">
                                <Row style={{
                                    padding: '10px 30px'
                                }}>
                                    <Col className="">
                                        <Row>
                                            <Col className="text-center pt-3 pb-3">
                                                <i className="fa fa-check" aria-hidden="true" style={{
                                                    fontSize: '25px'
                                                }}></i>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <h1>BE THE FIRST TO KNOW</h1>
                                                <p>about our latest products and exclusive offers.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Form.Group as={Col} controlId="formGridState">
                                                            <Form.Label>Shopping Preference</Form.Label>
                                                            <Form.Select aria-label="Default select example">
                                                                <option>Gender</option>
                                                                <option value="1">Male</option>
                                                                <option value="2">Female</option>
                                                                <option value="3">Other</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Date of Birth</Form.Label>
                                                            <Form.Control type="date" placeholder="Enter email" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.modalButtons}>
                                                <Row>
                                                    <Col>
                                                        <Button className="width-100">NO THANKS</Button>
                                                    </Col>
                                                    <Col>
                                                        <Button className="width-100">SIGN UP</Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center pt-4 pb-2">
                                                <p style={{
                                                    fontSize: '12px'
                                                }}>By signing up, you agree to Nike's <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a></p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className={styles.modalCp}>
                        <Button variant="primary" onClick={handleShowModal4}>
                            modal-4
                        </Button>

                        <Modal show={showModal4} onHide={handleCloseModal4} className="bg-img-modal">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="p-0">
                                <Row style={{
                                        padding: '10px 30px'
                                    }}>
                                    <Col className="" style={{
                                        padding: '13% 10%',
                                        background: 'linear-gradient(to bottom, #f6cc08 0%, rgb(147 114 5) 100%)'
                                    }}>
                                        <Row>
                                            <Col>
                                                <Row style={{
                                                    backgroundImage: "url('mallard.jpg')",
                                                    backgroundPosition: 'left',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}>
                                                    <Col lg={2} md={2} sm={12} xs={12}></Col>
                                                    <Col lg={10} md={10} sm={12} xs={12} className="p-5" style={{
                                                        marginLeft: '30%'
                                                    }}>
                                                        <Row>
                                                            <Col>
                                                                <h2 className="mt-3 mb-4" style={{
                                                                   color: '#f6cc08' 
                                                                }}>Get the inside scoop.</h2>
                                                                <p className="white-color">Got a sweet tooth? We have got you coverd with <br/>the latest deals on sweets & treats. </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="mb-4 mt-5">
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="youremail@email.com"
                                                                    aria-label="email"
                                                                    aria-describedby="basic-addon2"
                                                                    />
                                                                    <InputGroup.Text id="basic-addon2" style={{
                                                                        background: 'linear-gradient(rgb(160, 41, 40) 0%, rgb(229 42 40) 100%)',
                                                                        border: 'rgb(255 2 0)',
                                                                        color: '#ffffff'
                                                                    }}>Subscribe</InputGroup.Text>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className={styles.modalCp}>
                        <Button variant="primary" onClick={handleShowModal5}>
                            modal-5
                        </Button>

                        <Modal show={showModal5} onHide={handleCloseModal5} className="top-img-modal">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="p-0">
                                <Row style={{
                                        padding: '10px 30px',
                                        borderRight: '40px solid #a02928'
                                    }}>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Image
                                                    width='480'
                                                    height='180'
                                                    src='/group-profile.jpg'
                                                    alt='Holo'
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <h2 className="black-color pt-3">Be an Ecommerce Expert</h2>
                                                <p className="pb-3">With fresh insights, tips and news from our ecommerce business<br/> team in a FREE weekly newsletter.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control type="email" placeholder="Enter your email" />
                                                </Form.Group>
                                                <Button variant="primary" type="submit" className="width-100 mt-2 mb-3" style={{
                                                    background: '#a02928',
                                                    border: '1px solid #a02928'
                                                }}>
                                                    KEEP ME IN THE LOOP
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                
                <Row className="mt-5">
                    <Col className={styles.modalUpgradeClass}>
                        <Button variant="primary" onClick={handleShowModalUpgradeClass}>
                            Upgrade to Plus
                        </Button>

                        <Modal show={showModalUpgradeClass} onHide={handleCloseModalUpgradeClass} className="upgrade-class">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="mt-4 pt-5 pb-4 pl-5 pr-4">
                                <Row>
                                    <Col className={styles.upgradeImg}>
                                        <Row>
                                            <Col className="text-center">
                                                <Image
                                                    width='450'
                                                    height='450'
                                                    src='/matthew.png'
                                                    alt='Matthew K'
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center pt-2">
                                                <h6 style={{color: 'rgb(255 3 0)'}}>MATTHEW K</h6>
                                                <h6>SAT MASTERTUTOR</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className={styles.upgradeText}>
                                        <Row>
                                            <Col>
                                                <p>UPGRADE TO COLLEGEPASS PREMIUM</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h2 className="black-color">Enjoy Unlimited Access to<br/> SAT & AP Live Online<br/> Classes </h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{
                                                backgroundImage: 'url("/rotate-icon.png")',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '170px 220px',
                                                backgroundPosition: 'top right',
                                                backgroundOrigin: 'content-box',
                                                paddingRight: '15%'
                                            }}>
                                                <Row>
                                                    <Col>
                                                        <p style={{
                                                            paddingTop: '15%'
                                                        }}>INR 9999 / ANNUALLY</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button>UPGRADE NOW </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className={styles.modalUpgradeLivestream}>
                        <Button variant="primary" onClick={handleShowModalUpgradeLivestream}>
                            Upgrade to Livestream
                        </Button>

                        <Modal show={showModalUpgradeLivestream} onHide={handleCloseModalUpgradeLivestream} className="upgrade-class">
                            {/*<Modal.Header closeButton className="p-0 for-modal-cross">
                            </Modal.Header>*/}
                            <Modal.Body className="mt-4 mb-4 pt-5 pb-5 pl-5 pr-4">
                                <Row>
                                    <Col className={styles.upgradeImg}>
                                        <Row>
                                            <Col className="text-center">
                                                <Image
                                                    width='450'
                                                    height='450'
                                                    src='/livestream.png'
                                                    alt='Matthew K'
                                                />
                                            </Col>
                                        </Row>
                                        {/*<Row>
                                            <Col className="text-center pt-2">
                                                <h6 style={{color: 'rgb(255 3 0)'}}>MATTHEW K</h6>
                                                <h6>SAT MASTERTUTOR</h6>
                                            </Col>
                                        </Row>*/}
                                    </Col>
                                    <Col className={styles.upgradeText}>
                                        <Row>
                                            <Col>
                                                <p>UPGRADE TO COLLEGEPASS PLUS</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h2 className="black-color">Enjoy Unlimited Access to<br/> College Admissions<br/> Livestreams </h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{
                                                backgroundImage: 'url("/rotate-icon.png")',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '170px 220px',
                                                backgroundPosition: 'top right',
                                                backgroundOrigin: 'content-box',
                                                paddingRight: '15%'
                                            }}>
                                                <Row>
                                                    <Col>
                                                        <p style={{
                                                            paddingTop: '15%'
                                                        }}>INR 999 / ANNUALLY</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button>UPGRADE NOW </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                            </Modal.Body>
                            
                        </Modal>
                    </Col>
                </Row>


            </Container>
        </Container>
	)
}

export default ModalScreen
