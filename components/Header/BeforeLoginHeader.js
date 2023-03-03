import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import Offcanvas from 'react-bootstrap/Offcanvas';
//import Link from 'next/link'
import styles from './header.module.scss'
import dynamic from 'next/dynamic'
//import { isAndroid, isIOS, isMobile } from 'react-device-detect'
const LoginModal = dynamic(() => import('../Modal/LoginModal'))
// import  LoginModal from '../Modal/LoginModal'


const BeforeLoginHeader = () => {
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)

  return (
    <Fragment>
      <Container fluid className='bg-black'>
          <Container className="pt-3 pb-3">
              <Row>
                  <Col className={styles.ugHeader}>
                    <Row>
                        <Col className='for-mobile-menu'>
                            <Navbar bg="black" expand={"sm, md, lg, xl, xxl"}>
                                <Container className='p-0'>
                                    <Navbar.Brand href="/">
                                        <p className={styles.ugLogo}>
                                            <Image
                                            src="/logo/cp_text_logo.png"
                                            alt="Text Logo"
                                            width="180"
                                            height="52"
                                            className={styles.footerLogo}
                                            />
                                        </p>
                                    </Navbar.Brand>
                                    <Navbar.Toggle />
                                    <Navbar.Offcanvas placement="end">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title className='visibility-hidden'>
                                                CollegePass
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <Nav className="justify-content-end flex-grow-1">
                                                <Nav.Link href="/collegepass-plus" id="" style={{
                                                    marginRight: '2rem'
                                                }}>CollegePass+</Nav.Link>
                                                <Nav.Link href="/ivy-league-undergraduate-admissions" id="" style={{
                                                    marginRight: '2rem'
                                                }}>Undergraduate Admissions</Nav.Link>
                                                <Nav.Link href="/ms-admissions" id="" style={{
                                                    marginRight: '2rem'
                                                }}>MS/MBA Admissions</Nav.Link>
                                                <Nav.Link href="/sat-tutoring" id="" style={{
                                                    marginRight: '2rem'
                                                }}>SAT Tutoring</Nav.Link>
                                                <Nav.Link href="/ib-tutoring" id="" style={{
                                                    marginRight: '2rem'
                                                }}>IB/IGCSE Tutoring</Nav.Link>
                                                <Nav.Link href="" id="login" onClick={()=>{handleShowLogin()}}>
                                                    <p className={styles.Login}>Login</p></Nav.Link>
                                                </Nav>
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='for-desktop-menu'>
                            <Navbar bg="black" expand="lg">
                                <Container className='p-0'>
                                    <Navbar.Brand href="/">
                                        <p className={styles.ugLogo}>
                                            <Image
                                            src="/logo/cp_text_logo.png"
                                            alt="Text Logo"
                                            width="180"
                                            height="52"
                                            className={styles.footerLogo}
                                            />
                                        </p>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="ms-auto">
                                            <Nav.Link href="/collegepass-plus" id="ug-menu-adm-adv" style={{
                                                marginRight: '2rem'
                                            }}>CollegePass+</Nav.Link>
                                                <NavDropdown title="Admissions Advising" id="basic-nav-dropdown" renderMenuOnMount={true}>
                                                    <NavDropdown.Item href="/ivy-league-undergraduate-admissions">UNDERGRADUATE ADMISSIONS</NavDropdown.Item>
                                                    <NavDropdown.Item href="/ms-admissions">
                                                        MS/MBA ADMISSIONS
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                                <NavDropdown title="Test Prep" id="basic-nav-dropdown" renderMenuOnMount={true}>
                                                    <NavDropdown.Item href="/sat-tutoring">SAT Tutoring</NavDropdown.Item>
                                                    <NavDropdown.Item href="/ib-tutoring">
                                                        IB/IGCSE Tutoring
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                                <Nav.Link href="" id="ug-menu-adm-adv" onClick={()=>{handleShowLogin()}}>
                                                    <p className={styles.Login}>Login</p></Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>
                  </Col>
              </Row>
          </Container>
      </Container>
      <Container fluid className={styles.headerStripNew}>
        <Row>
            <Col className={styles.ugStrip}>
                <p>Every CollegePass student has received a minimum of 3 admission offers in 2022.<a href="/success-stories">Success stories <i className="fa fa-external-link" aria-hidden="true"></i></a></p>
            </Col>
        </Row>
    </Container>
    <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </Fragment>
  )
}

export default BeforeLoginHeader
