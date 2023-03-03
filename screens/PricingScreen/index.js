import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, ButtonGroup, ToggleButton } from 'react-bootstrap'
import Link from 'next/link'
import Faq from '../../components/Faq';
import styles from './pricing.module.scss'
import { useSelector } from 'react-redux'
import RegisterModal from '../../components/Modal/RegisterModal'

const index = () => { 
  const auth = useSelector((state) => state.auth)
  const [selected, setselected] = useState('1')
  const [showRegister, setShowRegister] = useState(false)
  const handleCloseRegister = () => setShowRegister(false)
  const handleShowRegister = () => {
    setShowRegister(true)
  }

  const [programSelected, setProgramSelected] = useState(1)

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: `Undergraduate</br>Admissions`, value: '1', },
    { name: `MS/MBA</br>Admissions`, value: '2' },
  ];

  useEffect(() => {
    // console.log('auth')
    if(auth.isAuthenticated)
    {
      // console.log("authed")
      if(auth.userDetails.ISPREMIUM){
        // console.log("is authed",auth.userDetails.ISPREMIUM)
        setselected(auth.userDetails.ISPREMIUM.toString())
      }
      
    }
    
  }, [auth])

  return (
    <Fragment>
      <Container fluid>
        <Container className={styles.pricingMainSection}>
          <Row>
            <Col className={styles.pricing}>
              <Row>
                <Col className={styles.priceHeading}>
                  <span className="pricing-custom-drop">
                    <h1>Choose a plan</h1>
                    <p>Find the right solution for your needs.</p>
                    <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) =>
                          {setProgramSelected(e.currentTarget.value) 
                          setRadioValue(e.currentTarget.value)}}>
                            <div
                            dangerouslySetInnerHTML={{__html: radio.name}}
                            />
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                  </span>
                  
                </Col>
              </Row>
              {programSelected === '2' ? (
                <Row>
                  <Col className={styles.planBoxesMain}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    style={{
                      background: '#8080800f',
                    }}
                  >
                    <Row>
                      <Col
                        className={selected == '1'?styles.selectedPlanBox:styles.planBoxes}
                        onClick={()=>{setselected('1')}}
                        style={{
                          padding: '25px 32px',
                        }}
                        
                      >
                        <Row>
                          <Col className={styles.price}>
                            <h3>BASIC</h3>
                            {/* <p>Limited Access</p> */}
                            <h2>Free<br/>
                            <span style={{
                              visibility: 'hidden'
                            }}>hide</span>
                            </h2>
                            
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.priceButton}>
                            <Button
                              disabled={auth.isAuthenticated}
                              onClick={() => {
                                handleShowRegister()
                              }}
                            >
                              Sign Up
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.pricePoints}>
                            <ul className={styles.circleCheckmark}>
                              <li>1-Day Access to Live College Admissions Sessions</li>
                              <li>1-Day Access to Live Q&A with Admission Specialists</li>
                              <li>1-Day Access to Essay/SOP Writing Workshops</li>
                            </ul>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12} className={styles.planBoxesMain}>
                    <Row>
                      <Col
                        className={selected == '2'?styles.selectedPlanBox:styles.planBoxes}
                        onClick={()=>{setselected('2')}}
                      >
                        <Row>
                          <Col className={styles.price}>
                            <h3>PLUS</h3>

                            <h2>
                              {/* $150 <span>/year</span> */}
                              INR 999 <br/><span>per year</span>
                            </h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.priceButton}>
                            <Link href="/checkout/ms-plus/">
                              <Button
                                disabled={
                                  auth.userDetails.ISPREMIUM >= 2 ? true : false
                                }
                              >
                                {auth.userDetails.ISPREMIUM >= 2
                                  ? 'Subscribed'
                                  : 'Subscribe Now'}
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.pricePoints}>
                            <p>All the benefits of Basic and: </p>
                            <ul>
                              <li>Unlimited Access to Live College Admissions Sessions</li>
                              <li>Unlimited Access to Live Q&A with Admission Specialists</li>
                              <li>Unlimited Access to Essay/SOP Writing Workshops</li>
                              <li>One Complimentary Profile Assessment with an Admissions Advisor</li>
                            </ul>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col className={styles.planBoxesMain}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}>
                    <Row>
                      <Col
                        className={selected == '3'?styles.selectedPlanBox:styles.planBoxes}
                        onClick={()=>{setselected('3')}}
                      >
                        <Row>
                          <Col className={styles.price}>
                            <h3>PREMIUM +</h3>

                            <h2>
                              {/* $1500 <span>/year</span> */}
                              INR 149,999  <br/><span>onwards per year</span>
                            </h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.priceButton}>
                            <Link href="/contact/4">
                              <Button>Talk To An Advisor</Button>
                            </Link>
                          </Col>
                        </Row>
                        <Row>
                          <Col className={styles.pricePoints}>
                            <p>All the benefits of Plus and:</p>
                            <ul>
                              <li>One-on-One Admissions Advising by MS/MBA Global Admission Advisors</li>
                              <li>Personal Statement/Essay Editing by Internationally Trained Editors</li>
                            </ul>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Row>
                      <Col className={styles.planBoxesMain}
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{
                          background: '#8080800f',
                        }}
                      >
                        <Row>
                          <Col
                            className={selected == '1'?styles.selectedPlanBox:styles.planBoxes}
                            onClick={()=>{setselected('1')}}
                            style={{
                              padding: '25px 32px',
                            }}
                          >
                            <Row>
                              <Col className={styles.price}>
                                <h3>BASIC</h3>
                                {/* <p>Limited Access</p> */}
                                <h2>Free<br/>
                            <span style={{
                              visibility: 'hidden'
                            }}>hide</span></h2>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.priceButton}>
                                <Button
                                  disabled={auth.isAuthenticated}
                                  onClick={() => {
                                    handleShowRegister()
                                  }}
                                >
                                  Sign Up
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.pricePoints}>
                                <ul>
                                  <li>1-Day Access to The Ivy League/Oxbridge College Counselling Sessions</li>
                                  <li>1-Day Access to Live Global College Counselling Sessions</li>
                                  <li>1-Day Access to the Career Track</li>
                                  <li>1-Day Access to College Counselling Masterclasses</li>
                                </ul>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={3} md={3} sm={12} xs={12} className={styles.planBoxesMain}>
                        <Row>
                          <Col
                            className={selected == '2'?styles.selectedPlanBox:styles.planBoxes}
                            onClick={()=>{setselected('2')}}
                          >
                            <Row>
                              <Col className={styles.price}>
                                <h3>PLUS</h3>
                                {/* <p>Get to know CollegePass</p> */}
                                <h2>
                                  INR 999 <br/><span>per year</span>
                                </h2>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.priceButton}>
                                <Link href="/checkout/plus">
                                  <Button
                                    disabled={
                                      auth.userDetails.ISPREMIUM >= 2
                                        ? true
                                        : false
                                    }
                                  >
                                    {auth.userDetails.ISPREMIUM >= 2
                                      ? 'Subscribed'
                                      : 'Subscribe Now'}
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.pricePoints}>
                                <p>All the benefits of Basic and:</p>
                                <ul>
                                  <li>Unlimited Access to The Ivy League / Oxbridge College Counselling Sessions</li>
                                  <li>Unlimited Access to Global College Counselling Sessions</li>
                                  <li>Unlimited Access to The Career Track</li>
                                </ul>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col className={styles.planBoxesMain}
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{
                          background: '#8080800f',
                        }}
                      >
                        <Row>
                          <Col
                            className={selected == '3'?styles.selectedPlanBox:styles.planBoxes}
                            onClick={()=>{setselected('3')}}
                          >
                            <Row>
                              <Col className={styles.price}>
                                <h3>PREMIUM</h3>
                                {/* <p>Attend our online classes</p> */}
                                <h2>
                                  {/* $150 <span>/year</span> */}
                                  INR 69,000<br/> <span>per year</span>
                                </h2>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.priceButton}>
                                <Link href="/contact">
                                  <Button
                                    disabled={
                                      auth.userDetails.ISPREMIUM >= 3
                                        ? true
                                        : false
                                    }
                                  >
                                    {auth.userDetails.ISPREMIUM >= 3
                                      ? 'Subscribed'
                                      : 'Talk To An Advisor'}
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.pricePoints}>
                                <p>All the benefits of Plus and:</p>
                                <ul>
                                  <li>Unlimited Access to Live SAT Online Classes</li>
                                  {/*<li>Access to Live Online SAT Classes</li>*/}
                                  <li>Learn from Internationally Experienced SAT MasterTutors</li>
                                  <li>Access to SAT Workshops and Class Recordings</li>
                                  <li>100+ Hours of Tutoring Annually</li>
                                  <li>10+ Practice Tests</li>
                                </ul>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={3} md={3} sm={12} xs={12} className={styles.planBoxesMain}>
                        <Row>
                          <Col
                            className={selected == '4'?styles.selectedPlanBox:styles.planBoxes}
                            onClick={()=>{setselected('4')}}
                          >
                            <Row>
                              <Col className={styles.price}>
                                <h3>PREMIUM +</h3>
                                {/* <p>Acces our 1-1 Advising</p> */}
                                <h2>
                                  {/* $1500 <span>/year</span> */}
                                  COUNSELING <br/><span>services</span>
                                </h2>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.priceButton}>
                                <Link href="/contact">
                                  <Button>Talk To An Advisor</Button>
                                </Link>
                              </Col>
                            </Row>
                            <Row>
                              <Col className={styles.pricePoints}>
                                <p>All the benefits of Premium and:</p>
                                <ul>
                                  <li>One-on-One Admissions Advising for The Ivy League, Oxbridge & Other Top Ranked Colleges in the US, UK, Canada, Europe & Singapore!</li>
                                  <li>Ivy League Trained CollegePass Admission Advisors</li>
                                  <li>Access to CollegePass Profile Builder - An Advanced, Proprietary College Admissions Platform</li>
                                  <li>Comprehensive College Admissions Support</li>
                                </ul>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}{' '}
              <Row>
                <Col className="p-0 mt-5 mb-3">
                  <hr></hr>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Faq />
      </Container>
      <RegisterModal
        show={showRegister}
        handleClose={handleCloseRegister}
        onSubmitRegister={handleCloseRegister}
      />
    </Fragment>
  )
}

export default index