import React, { Fragment, useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Image from 'next/image'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/authActions'
import styles from './header.module.scss'
import UserMandatoryField from '../../screens/UserMandatoryField'

const AfterLoginHeader = () => {
  const disptach = useDispatch()

  const auth = useSelector((state) => state.auth)

  const onLogoutHandler = () => {
    disptach(logout())
  }
  let allowAdvisingPanel = false
  let isPremiumPlus = false
  // if (auth.userDetails.ISPREMIUM == 4) {
  if (auth.userDetails.ISPREMIUM == 3) {
    allowAdvisingPanel = true
  }
  if (auth.userDetails.ISPREMIUM == 4) {
    allowAdvisingPanel = true
    isPremiumPlus = true
  }
  if (auth.isParent === 1 || auth.isParent === '1') {
    allowAdvisingPanel = true
  }

  return (
    <Fragment>
      <Container fluid className="bg-black">
        <Container className="pt-3 pb-3">
          <Row>
            <Col className={styles.ugHeader}>
              <Row>
                <Col className="for-mobile-menu">
                  <Navbar bg="black" expand={'sm, md, lg, xl, xxl'}>
                    <Container className="p-0">
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
                          <Offcanvas.Title className="visibility-hidden">
                            CollegePass
                          </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Nav className="justify-content-end flex-grow-1">
                            <Nav.Link
                              href=""
                              id=""
                              className="welcome-drop-new"
                            >
                              WELCOME, {auth.userDetails.FIRSTNAME}
                            </Nav.Link>
                            {/* {
                              isPremiumPlus && (
                                <Nav.Link
                                  href=""
                                  id="ug-menu-adm-adv"
                                  onClick={() => {
                                    window.open(
                                      `http://advisor.collegepass.org/landing/${localStorage.token}`
                                    )
                                  }}
                                >
                                  My Profile Builder
                                </Nav.Link>
                              )
                              // : (
                              //   null
                              //   // <Nav.Link href="/ivy-league-undergraduate-admissions" id="ug-menu-adm-adv">My Profile Builder</Nav.Link>
                              // )
                            } */}
                            <Nav.Link
                              href="/collegepass-plus"
                              id=""
                              style={{
                                marginRight: '2rem',
                              }}
                            >
                              CollegePass+
                            </Nav.Link>
                            <Nav.Link
                              href="/ivy-league-undergraduate-admissions"
                              id=""
                              style={{
                                marginRight: '2rem',
                              }}
                            >
                              Undergraduate Admissions
                            </Nav.Link>
                            <Nav.Link
                              href="/ms-admissions"
                              id=""
                              style={{
                                marginRight: '2rem',
                              }}
                            >
                              MS/MBA Admissions
                            </Nav.Link>
                            <Nav.Link
                              href="/sat-tutoring"
                              id=""
                              style={{
                                marginRight: '2rem',
                              }}
                            >
                              SAT Tutoring
                            </Nav.Link>
                            <Nav.Link
                              href="/ib-tutoring"
                              id=""
                              style={{
                                marginRight: '2rem',
                              }}
                            >
                              IB/IGCSE Tutoring
                            </Nav.Link>
                            {/* <Nav.Link href="/livestream" id="ug-menu-adm-adv">My Live Streams</Nav.Link>
                                            <Nav.Link href="/masterclass" id="ug-menu-adm-adv">My Masterclasses</Nav.Link>
                                            {allowAdvisingPanel && ( <Nav.Link href="/liveclass" id="ug-menu-adm-adv">My Classes</Nav.Link>)}
                                            <Nav.Link href="/account" id="ug-menu-adm-adv">My Account</Nav.Link>
                                            <Nav.Link id="logout-mob" onClick={onLogoutHandler}>Sign out</Nav.Link> */}
                          </Nav>
                        </Offcanvas.Body>
                      </Navbar.Offcanvas>
                    </Container>
                  </Navbar>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Navbar bg="black" expand="lg">
                    <Container className="p-0">
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
                          <Nav.Link
                            href="/collegepass-plus"
                            id="ug-menu-adm-adv"
                            style={{
                              marginRight: '2rem',
                            }}
                          >
                            CollegePass+
                          </Nav.Link>
                          <NavDropdown
                            title="Admissions Advising"
                            id="basic-nav-dropdown"
                            renderMenuOnMount={true}
                          >
                            <NavDropdown.Item href="/ivy-league-undergraduate-admissions">
                              Undergraduate Admissions
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/ms-admissions">
                              MS/MBA Admissions
                            </NavDropdown.Item>
                          </NavDropdown>
                          <NavDropdown
                            title="Test Prep"
                            id="basic-nav-dropdown"
                            renderMenuOnMount={true}
                          >
                            <NavDropdown.Item href="/sat-tutoring">
                              SAT Tutoring
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/ib-tutoring">
                              IB/IGCSE Tutoring
                            </NavDropdown.Item>
                          </NavDropdown>
                          <span className="after-login-mobile-menu">
                            {
                              isPremiumPlus ? (
                                <Nav.Link
                                  href=""
                                  id="ug-menu-adm-adv"
                                  onClick={() => {
                                    window.open(
                                      `http://advisor.collegepass.org/landing/${localStorage.token}`
                                    )
                                  }}
                                >
                                  My Profile Builder
                                </Nav.Link>
                              ) : null
                              // <Nav.Link href="/ivy-league-undergraduate-admissions" id="ug-menu-adm-adv">My Profile Builder</Nav.Link>
                            }
                            <Nav.Link href="/livestream" id="ug-menu-adm-adv">
                              My Live Streams
                            </Nav.Link>
                            <Nav.Link href="/masterclass" id="ug-menu-adm-adv">
                              My Masterclasses
                            </Nav.Link>
                            {allowAdvisingPanel ? (
                              <Nav.Link href="/liveclass" id="ug-menu-adm-adv">
                                My Classes
                              </Nav.Link>
                            ) : null}

                            <Nav.Link href="/account" id="ug-menu-adm-adv">
                              My Account
                            </Nav.Link>
                            <Nav.Link
                              id="ug-menu-adm-adv"
                              onClick={onLogoutHandler}
                            >
                              Sign out
                            </Nav.Link>
                          </span>

                          <Nav.Link href="" id="ug-menu-adm-adv">
                            <span className="header-icon mb-0">
                              <Image
                                width="32"
                                height="32"
                                src="/avatar_icon.png"
                                alt="Holo"
                                className={styles.ugFooterHolo}
                              />
                            </span>
                          </Nav.Link>
                          {/*<Nav.Link href="" id="ug-menu-adm-adv">
                                              <Image
                                                src="/person_icon_rev.png"
                                                alt="Profile Icon Header"
                                                width={24}
                                                height={24}
                                              />
                                          </Nav.Link>*/}
                          <NavDropdown
                            title=""
                            className="custom-dropdown-for-profile-icon"
                            id="icon-dropdone-af-l"
                            renderMenuOnMount={true}
                          >
                            <NavDropdown.Item className="button disable">
                              <div className={styles.welcomeNameIcon}>
                                <Image
                                  width="32"
                                  height="32"
                                  src="/avatar_icon.png"
                                  alt="Holo"
                                  className={styles.ugFooterHolo}
                                />{' '}
                                <span
                                  style={{
                                    position: 'absolute',
                                    top: '6%',
                                    marginLeft: '2%',
                                  }}
                                >
                                  {auth.userDetails.FIRSTNAME}
                                </span>
                              </div>
                            </NavDropdown.Item>
                            {isPremiumPlus ? (
                              <NavDropdown.Item
                                onClick={() => {
                                  window.open(
                                    `http://advisor.collegepass.org/landing/${localStorage.token}`
                                  )
                                }}
                              >
                                My Profile Builder
                              </NavDropdown.Item>
                            ) : null}
                            <NavDropdown.Item href="/livestream">
                              My Live Streams
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/masterclass">
                              My Masterclasses
                            </NavDropdown.Item>
                            {allowAdvisingPanel ? (
                              <NavDropdown.Item href="/liveclass">
                                My Classes
                              </NavDropdown.Item>
                            ) : null}
                            <NavDropdown.Item href="/account">
                              My Account
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={onLogoutHandler}>
                              <p
                                className="mb-0 text-center"
                                style={{
                                  color: '#FFE55C',
                                }}
                              >
                                Sign out
                              </p>
                            </NavDropdown.Item>
                          </NavDropdown>
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
            <p>
              Every CollegePass student has received a minimum of 3 admission
              offers in 2023.
              <a href="https://collegepass.org/success-stories" target="_blank">
                Success stories{' '}
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
      <UserMandatoryField />
    </Fragment>
  )
}

export default AfterLoginHeader
