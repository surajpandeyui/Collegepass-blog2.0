import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap'
// import Faq from '../../components/Faq';
// import Review from '../../components/Review';
import Select from 'react-select'
import { APIReferFriend } from '../../config/API'
import styles from '../ReferScreen/refer.module.scss'

const ReferScreen = () => {
  const [show, setShow] = useState(false)
  const [currentField, setCurrentField] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [counter, setCounter] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter()

  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    phone: '',
    friendName: '',
    friendEmail: '',
    friendPhone: '',
    comment: '',
  })

  const [submitClicked, setsubmitClicked] = useState(false)
  const [submitted, setsubmitted] = useState(false)

  const onChangeForm = (e) => {
    if (
      (e.target.name == 'phone' || e.target.name == 'friendPhone') &&
      (e.target.value.length > 10 || isNaN(+e.target.value))
    ) {
      return
    }
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const checkEmail = (email) => {
    // if (email
    // 	.toLowerCase()
    // 	.match(
    // 		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // 	)) {
    // 	setFormDetails({ ...formDetails, email: email })
    // }
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const isNullish = (target) => {
    for (var member in target) {
      if (
        (target[member] == null ||
          target[member] == '' ||
          target[member] == undefined ||
          target[member] == []) &&
        member != 'comment'
      ) {
        return true
      }
    }
    return false
  }
  const onSubmit = async () => {
    setsubmitClicked(true)
    setIsSubmitted(false)
    setIsSubmitting(true)

    if (isNullish(formDetails)) {
      setsubmitClicked(false)
      setIsSubmitting(false)
      return
    }
    if (
      formDetails.phone == formDetails.friendPhone ||
      formDetails.email == formDetails.friendEmail ||
      !checkEmail(formDetails.email) ||
      !checkEmail(formDetails.friendEmail) ||
      formDetails.phone.length !== 10 ||
      formDetails.friendPhone.length !== 10
    ) {
      return
    }
    try {
      if (
        formDetails.email &&
        formDetails.name &&
        formDetails.phone &&
        formDetails.friendName &&
        formDetails.friendEmail &&
        formDetails.friendPhone &&
        selectedService.value
      ) {
        let apiBody = {
          email: formDetails.email,
          name: formDetails.name,
          phone: formDetails.phone,
          friendName: formDetails.friendName,
          friendEmail: formDetails.friendEmail,
          friendPhone: formDetails.friendPhone,
          service: selectedService.value,
          comment: formDetails.comment || '',
        }

        const result = await axios.post(APIReferFriend, apiBody, {
          headers: {
            'content-type': 'application/json',
          },
        })
        if (result.status === 200) {
          setIsSubmitting(false)
          setSuccessMessage("Successfully Submitted.")
          // router.push('/')
        } else {
          setErrorMessage(result.data.message)
          setIsSubmitting(false)
        }
        // console.log('apiBody', apiBody)
        // return
        // const registerEventDetails = await axios.post(
        //   APIeventRegistrationNew,
        //   apiBody
        // )
        // console.log(registerEventDetails)
        // if (registerEventDetails.data.statusCode === 200) {
        //   handleClose()
        //   dispatch(loadUser())
        //   setShowSuccess(false)
        //   router.push(`/event-registration-success/${eventDetails.ZOOMID}`)
        // } else {
        //   setsubmitted(false)
        // }
      } else {
        setIsSubmitting(false)
        // setsubmitted(false)
        // setShowSuccess(false)
        // setmessage('Please fill the entire form')
        // setShowSuccess(true)
        console.log('Data not  filled')
      }
    } catch (err) {
      setIsSubmitting(false)
      setErrorMessage(err.message || 'Something went wrong')
      console.log('Error', err)
    }
  }

  let options = [
    {
      value: 'Undergraduate Admissions Advising',
      label: 'Undergraduate Admissions Advising',
    },
    {
      value: 'MS Admissions Advising',
      label: 'MS Admissions Advising',
    },
    {
      value: 'MBA Essay Editing',
      label: 'MBA Essay Editing',
    },
    {
      value: 'SAT Tutoring',
      label: 'SAT Tutoring',
    },
    {
      value: 'IB Tutoring',
      label: 'IB Tutoring',
    },
  ]

  return (
    <Fragment>
      <Container
        className={styles.refBannerDesktop}
        fluid
        style={{
          background:
            'url(https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/Referral_page_banner_rev3.png) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '450px',
          position: 'relative',
        }}
      >
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </Container>

      <Container
        className={styles.refBannerMobile}
        fluid
        style={{
          background: 'url(/collegepass_referral_mobile.png) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '450px',
          position: 'relative',
        }}
      >
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        className={styles.referMainContainer}
        style={{
          backgroundColor: '#101010',
          color: '#ffffff',
          backgroundImage: 'url(/referral_bg_img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <Container>
          <Row>
            <Col
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={styles.referralFormSection}
            >
              <Row>
                <Col>
                  <h1>Student Referral Program</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Get up to INR 10,000 with every successful referral.</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Refer Friends Now!</p>
                </Col>
              </Row>
              <Row>
                <Col className={styles.referForm}>
                  <Row>
                    <Col>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Your Full Name"
                              onFocus={() => {
                                currentField < 1 ? setCurrentField(1) : null
                              }}
                              name="name"
                              value={formDetails.name}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 1
                                  ? formDetails.name != ''
                                    ? null
                                    : { border: '1px solid red' }
                                  : null
                              }
                            />
                            {submitClicked || currentField > 1 ? (
                              formDetails.name != '' &&
                              formDetails.name != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="email"
                              placeholder="Your Email"
                              onFocus={() => {
                                currentField < 2 ? setCurrentField(2) : null
                              }}
                              name="email"
                              value={formDetails.email}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 2
                                  ? !formDetails.email ||
                                    !(
                                      formDetails.email &&
                                      checkEmail(formDetails.email)
                                    )
                                    ? { border: '1px solid red' }
                                    : null
                                  : null
                              }
                            />
                            {submitClicked || currentField > 2 ? (
                              formDetails.email != '' &&
                              formDetails.email != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                            {(submitClicked || currentField > 2) &&
                            formDetails.email &&
                            !checkEmail(formDetails.email) ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Enter valid email
                                </Form.Text>
                              </>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Your Phone Number"
                              onFocus={() => {
                                currentField < 3 ? setCurrentField(3) : null
                              }}
                              name="phone"
                              value={formDetails.phone}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 3
                                  ? !formDetails.phone ||
                                    (formDetails.phone &&
                                      formDetails.phone.length !== 10)
                                    ? { border: '1px solid red' }
                                    : null
                                  : null
                              }
                            />
                            {submitClicked || currentField > 3 ? (
                              formDetails.phone != '' &&
                              formDetails.phone != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                            {(submitClicked || currentField > 3) &&
                            formDetails.phone &&
                            formDetails.phone.length !== 10 ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Phone number should have 10 digits
                                </Form.Text>
                              </>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Friend's Name"
                              onFocus={() => {
                                currentField < 4 ? setCurrentField(4) : null
                              }}
                              name="friendName"
                              value={formDetails.friendName}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 4
                                  ? formDetails.friendName != ''
                                    ? null
                                    : { border: '1px solid red' }
                                  : null
                              }
                            />
                            {submitClicked || currentField > 4 ? (
                              formDetails.friendName != '' &&
                              formDetails.friendName != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="email"
                              placeholder="Friend's Email"
                              onFocus={() => {
                                currentField < 5 ? setCurrentField(5) : null
                              }}
                              name="friendEmail"
                              value={formDetails.friendEmail}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 5
                                  ? !formDetails.friendEmail ||
                                    (formDetails.email &&
                                      formDetails.friendEmail ==
                                        formDetails.email) ||
                                    !(
                                      formDetails.friendEmail &&
                                      checkEmail(formDetails.friendEmail)
                                    )
                                    ? { border: '1px solid red' }
                                    : null
                                  : null
                              }
                            />
                            {submitClicked || currentField > 5 ? (
                              formDetails.friendEmail != '' &&
                              formDetails.friendEmail != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                            {(submitClicked || currentField > 5) &&
                            formDetails.friendEmail &&
                            !checkEmail(formDetails.friendEmail) ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Enter valid email
                                </Form.Text>
                              </>
                            ) : null}
                            {formDetails.email &&
                            formDetails.friendEmail == formDetails.email ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Friend's email cannot be the same as your
                                </Form.Text>
                              </>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Form.Group
                            className="mb-4"
                            controlId="formBasicEmail"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Friend's Phone Number"
                              onFocus={() => {
                                currentField < 6 ? setCurrentField(6) : null
                              }}
                              name="friendPhone"
                              value={formDetails.friendPhone}
                              onChange={onChangeForm}
                              style={
                                submitClicked || currentField > 6
                                  ? !formDetails.friendPhone ||
                                    (formDetails.phone &&
                                      formDetails.friendPhone ==
                                        formDetails.phone) ||
                                    (formDetails.friendPhone &&
                                      formDetails.friendPhone.length !== 10)
                                    ? { border: '1px solid red' }
                                    : null
                                  : null
                              }
                            />
                            {submitClicked || currentField > 6 ? (
                              formDetails.friendPhone != '' &&
                              formDetails.friendPhone != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                            {formDetails.phone &&
                            formDetails.friendPhone == formDetails.phone ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Friend's phone cannot be the same as your
                                </Form.Text>
                              </>
                            ) : null}
                            {(submitClicked || currentField > 6) &&
                            formDetails.friendPhone &&
                            formDetails.friendPhone.length !== 10 ? (
                              <>
                                <Form.Text
                                  className="text-muted custom-text-alrt"
                                  style={{
                                    color: 'red!important',
                                    letterSpacing: '0.03rem',
                                  }}
                                >
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>{' '}
                                  Phone number should have 10 digits
                                </Form.Text>
                              </>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Form.Group className="mb-4">
                            <Select
                              onFocus={() => {
                                currentField < 7 ? setCurrentField(7) : null
                              }}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  background: '#323644',
                                  border:
                                    submitClicked || currentField > 7
                                      ? !selectedService
                                        ? '1px red solid!important'
                                        : '1px #323644 solid!important'
                                      : '1px #323644 solid!important',
                                  color: 'black',
                                  boxShadow: 'none',
                                }),
                              }}
                              name="service"
                              value={selectedService}
                              placeholder="Service You're Referring For"
                              onChange={setSelectedService}
                              options={options}
                              style={
                                submitClicked || currentField > 7
                                  ? !selectedService
                                    ? { border: '1px solid red' }
                                    : null
                                  : null
                              }
                            ></Select>
                            {submitClicked || currentField > 7 ? (
                              selectedService != '' &&
                              selectedService != undefined ? null : (
                                <>
                                  <Form.Text
                                    className="text-muted custom-text-alrt"
                                    style={{
                                      color: 'red!important',
                                      letterSpacing: '0.03rem',
                                    }}
                                  >
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>{' '}
                                    This field is required
                                  </Form.Text>
                                </>
                              )
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Comments"
                            style={{ color: '#ffffff7a' }}
                          >
                            <Form.Control
                              as="textarea"
                              onFocus={() => {
                                currentField < 8 ? setCurrentField(8) : null
                              }}
                              value={formDetails.comment}
                              name="comment"
                              onChange={onChangeForm}
                              placeholder="Additional Comments (Optional)"
                              style={{ height: '100px' }}
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="">
                      {isSubmitting ? (
                        <Button className={styles.contactSubmit}>
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </Button>
                      ) : (
                        <>
                          <Button onClick={onSubmit}>Refer Now</Button>
                          {errorMessage ? (
                            <Form.Text
                              className="text-muted custom-text-alrt"
                              style={{
                                color: 'red!important',
                                letterSpacing: '0.03rem',
                                display: 'block',
                              }}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                              {errorMessage}
                            </Form.Text>
                          ) : null}
                          {successMessage ? (
                            <Form.Text
                              className="custom-text-alrt" 
                              style={{
                                color: 'green',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                letterSpacing: '0.03rem',
                                display: 'block',
                              }}
                            >
                              <i
                                className="fa fa-check-circle-o"
                                aria-hidden="true"
                              ></i>{" "}
                              {successMessage}
                            </Form.Text>
                          ) : null}
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}></Col>
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        style={{
          padding: '80px 0px 120px 0px',
          borderBottom: '1px solid',
        }}
      >
        <Container>
          <Row>
            <Col className={styles.referProgram}>
              <Row>
                <Col>
                  <Row>
                    <Col className={styles.referheading}>
                      <h2>HOW THE COLLEGEPASS REFERRAL PROGRAM WORKS ?</h2>
                      <p>Start earning rewards in 4 easy steps</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                      style={{
                        height: '215px',
                      }}
                    >
                      <Row>
                        <Col className={styles.referPlan}>
                          <Image
                            width={50}
                            height={50}
                            src="/form.png"
                            alt="Refer"
                          />
                          <p className="pt-2">Fill the above form</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                      style={{
                        height: '215px',
                      }}
                    >
                      <Row>
                        <Col className={styles.referPlan}>
                          <Image
                            width={50}
                            height={50}
                            src="/cp_team.png"
                            alt="Refer"
                          />
                          <p className="pt-2">
                            CollegePass team will reach out to the referred
                            person
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                      style={{
                        height: '215px',
                      }}
                    >
                      <Row>
                        <Col className={styles.referPlan}>
                          <Image
                            width={50}
                            height={50}
                            src="/sign_up.png"
                            alt="Refer"
                          />
                          <p className="pt-2">
                            Referred user signs up for the respective service
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      xs={12}
                      style={{
                        height: '215px',
                      }}
                    >
                      <Row>
                        <Col className={styles.referPlan}>
                          <Image
                            width={50}
                            height={50}
                            src="/earn.png"
                            alt="Refer"
                          />
                          <p className="pt-2">Sit back and earn rewards</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>

      {/*
      <Faq />
      
      <Button variant="primary" onClick={handleShow}>
        Launch modal
      </Button>

      <Modal show={show} onHide={handleClose} className="refer-modal">
        <Modal.Body>
          <Row>
            <Col className={styles.referModalheading}>
              <h2>
                Refer your friends for Citi credit cards and earn rewards!<br/>
                Register with us and start referring!
              </h2>
            </Col>
          </Row>
          <Row className={styles.referModalButton}>
            <Col>
              <Button>Already registered</Button>
              <Button>New here</Button>
            </Col>
          </Row>
          <Row>
            <Col className={styles.referModalContButton}>
              <Button>Continue</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>*/}
    </Fragment>
  )
}

export default ReferScreen
