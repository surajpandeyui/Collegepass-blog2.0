import React, { Fragment, useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import styles from './paymentConfirmation.module.scss'
import { useRouter } from 'next/router'
import { createOrderURL, paymentSuccessURL } from '../../config/API'
import { apiKey, image, color } from '../../config/planContent'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CouponScreen = ({ planType }) => {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const [email, setEmail] = useState(auth.email)
  const [showEmail, setShowEmail] = useState(true)

  const [formDetails, setFormDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    grade: '',
  })
  const [showFormDetails, setShowFormDetails] = useState(false)
  const [showFormButton, setShowFormButton] = useState(false)

  // const [prefBatchSAT, setPrefBatchSAT] = useState(null)
  // const [prefBatchIETLS, setPrefBatchIELTS] = useState(null)
  // const [showPrefBatch, setShowPrefBatch] = useState(false)
  // const [showPrefButton, setShowPrefButton] = useState(false)

  const [couponCode, setCouponCode] = useState('')
  const [showCouponCode, setShowCouponCode] = useState(false)
  const [couponCodeSubmitted, setCouponCodeSubmitted] = useState(false)
  const [couponCodeText, setCouponCodeText] = useState(null)
  const [couponCodeDetails, setCouponCodeDetails] = useState(null)

  const [showAmtButton, setShowAmtButton] = useState(false)
  const [amountToBePaid, setAmountToBePaid] = useState(0)

  const onClickEmailButton = () => {
    setShowEmail(false)
    setShowFormDetails(true)
    setShowFormButton(true)
  }

  const onClickDetailsButton = () => {
    setShowFormButton(false)
    setShowAmtButton(true)
    // setShowPrefBatch(true)
    setShowCouponCode(true)
    setShowCouponCode(false)
    // setShowPrefButton(true)
  }

  const onClickBatchButton = () => {
    // setShowPrefButton(false)
    setShowCouponCode(true)
  }

  const onClickCouponButton = async () => {
    setCouponCodeSubmitted(true)

    const couponCodeResponse = await axios.get(
      `https://api.collegepass.org/api/v2/promo/name/${couponCode}?userID=${'8524'}`
    )

    if (couponCodeResponse.data.status === true) {
      setCouponCodeText(`${couponCode} - coupon code applied`)
      setCouponCodeDetails(couponCodeResponse.data.promoDetails)
    } else {
      setCouponCodeText(couponCodeResponse.data.promoDetails)
    }
  }

  const onCouponCodeClicked = () => {
    //call the api
    router.push('/thanks')
  }

  const payRazorPay = async () => {
    let body = {
      amount: amountToBePaid,
      currency: 'INR',
      plan_id: 'CP_PRIME_YEAR_NATIONAL',
    }

    createOrder(body, 'CollegePass Plus')
  }

  const createOrder = async (body, planDetail) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      }

      const res = await axios.post(createOrderURL, body, config)

      paymentSubmitHandler(
        body.amount,
        body.currency,
        planDetail,
        // body.plan_id,
        res.data.data.id
      )
    } catch (err) {
      // console.log(err)
      null
    }
  }

  const paymentSubmitHandler = (amt, currency, planDetail, ordID) => {
    let options = {
      key: apiKey,
      amount: amt * 100,
      currency: currency,
      description: planDetail,
      image: image,
      order_id: ordID,
      handler: function (response) {
        handlePaymentResponse(response, planID, ordID, null)
        // console.log('PAYMENT', response)
      },
      prefill: {
        email: localStorage.user,
      },
      theme: {
        color: color,
      },
    }
    let rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePaymentResponse = async (response, plan, ordID, subID) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      }

      const bodySuccess = {
        payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
          ? response.razorpay_signature
          : null,
        user_email: localStorage.user,
        razorpay_subscription_id: subID ? subID : null,
        order_id: ordID ? ordID : null,
        plan: plan,
      }

      const res = await axios.post(paymentSuccessURL, bodySuccess, config)

      if (res.status !== 200) {
        return
      } else {
        // loadUser()
        // loadAccess()
        // setIsRedirect(true)
      }
    } catch (err) {
      // console.log(err)
      null
    }
  }

  useEffect(() => {
    if (planType === 'plus') {
      setAmountToBePaid(999)
    }
    if (planType === 'premium') {
      setAmountToBePaid(9999)
    }
    if (auth.user !== null) {
      setEmail(auth.user)
      setShowEmail(false)
      setShowFormDetails(true)
      // setShowPrefBatch(true)
      setShowCouponCode(false)
      setShowAmtButton(true)
    }
    if (auth.userDetails !== null && auth.userDetails !== undefined) {
      setFormDetails({
        firstName: auth.userDetails.FIRSTNAME,
        lastName: auth.userDetails.LASTNAME,
        phoneNumber: auth.userDetails.PHONENUMBER,
        grade: auth.userDetails.GRADE,
      })
    }
  }, [auth, planType])

  const onChangeForm = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <Container fluid className="bg-black mt-5 pt-5 pb-5">
        <Row>
          <Col className={styles.coupon}>
            <Row>
              <Col className="text-center mt-5 mb-4">
                <h2>A few more steps and you're all set to go!</h2>
              </Col>
            </Row>
            <Row className={styles.couponWidth}>
              <Col>
                {!auth.isAuthenticated && (
                  <Row className={styles.couponBgGray}>
                    <Col>
                      <p>Enter your email to continue</p>
                      <Row>
                        <Col className="mt-2 mb-2">
                          <InputGroup className="mb-3">
                            <FormControl
                              disabled={!showEmail}
                              placeholder="Enter your email"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{
                                borderRadius: '3px',
                              }}
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      {showEmail && (
                        <Row>
                          <Col className="mt-3">
                            <Button onClick={onClickEmailButton}>
                              Proceed
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                )}

                {!auth.isAuthenticated && showFormDetails && (
                  <Row className={styles.couponBgGray}>
                    <Col>
                      <p>Enter your details</p>
                      <Row>
                        <Col className="mt-2 mb-2">
                          <InputGroup className="mb-3">
                            <FormControl
                              disabled={auth.isAuthenticated}
                              name="firstName"
                              value={formDetails.firstName}
                              onChange={onChangeForm}
                              placeholder="Enter your first name"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              style={{
                                borderRadius: '3px',
                              }}
                            />
                          </InputGroup>
                        </Col>
                        <Col className="mt-2 mb-2">
                          <InputGroup className="mb-3">
                            <FormControl
                              disabled={auth.isAuthenticated}
                              name="lastName"
                              value={formDetails.lastName}
                              onChange={onChangeForm}
                              placeholder="Enter your last name"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              style={{
                                borderRadius: '3px',
                              }}
                            />
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="mt-2 mb-2">
                          <InputGroup className="mb-3">
                            <FormControl
                              disabled={auth.isAuthenticated}
                              name="phoneNumber"
                              value={formDetails.phoneNumber}
                              onChange={onChangeForm}
                              placeholder="Enter your phone number"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              style={{
                                borderRadius: '3px',
                              }}
                            />
                          </InputGroup>
                        </Col>
                        <Col className="mt-2 mb-2">
                          <Form.Select
                            disabled={auth.isAuthenticated}
                            name="grade"
                            value={formDetails.grade}
                            onChange={onChangeForm}
                            aria-label="Default select example"
                          >
                            <option>Select Grade</option>
                            <option value="1">Grade 9</option>
                            <option value="2">Grade 10</option>
                            <option value="3">Grade 11</option>
                            <option value="4">Grade 12</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      {showFormButton && (
                        <Row>
                          <Col className="mt-3">
                            <Button onClick={onClickDetailsButton}>
                              Proceed
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                )}

                {/* {showPrefBatch ? (
                  planType === 'premium' ? (
                    <Row className={styles.couponBgGray}>
                      <Col>
                        <p>Enter your preferred batch</p>

                        <Row>
                          <Col className="mt-2 mb-2">
                            <Col className="mt-2 mb-2">
                              <Form.Select
                                aria-label="Default select example"
                                value={prefBatchSAT}
                                onChange={(e) => {
                                  setPrefBatchSAT(e.target.value)
                                }}
                              >
                                <option>Select your SAT batch</option>
                                <option value="1">SAT - Weekdays</option>
                                <option value="4">SAT - Saturdays</option>
                              </Form.Select>
                            </Col>
                          </Col>
                          <Col className="mt-2 mb-2">
                            <Col className="mt-2 mb-2">
                              <Form.Select
                                aria-label="Default select example"
                                value={prefBatchIETLS}
                                onChange={(e) => {
                                  setPrefBatchIELTS(e.target.value)
                                }}
                              >
                                <option>Select your IELTS batch</option>
                                <option value="11">IELTS BATCH -1</option>
                              </Form.Select>
                            </Col>
                          </Col>
                        </Row>
                        {showPrefButton && (
                          <Row>
                            <Col className="mt-3">
                              <Button onClick={onClickBatchButton}>
                                Proceed
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  ) : null
                ) : null} */}

                {showAmtButton && (
                  <Row className={styles.couponBgGray}>
                    <Col>
                      {showCouponCode && (
                        <Row>
                          <Col>
                            <p className="mb-2">Coupon code</p>
                            <InputGroup className="mb-3">
                              <FormControl
                                placeholder="Coupon code"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                style={{ border: 'none', padding: 'none' }}
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                              />
                            </InputGroup>
                            <Button
                              style={{ marginTop: 20, marginBottom: 20 }}
                              variant="outline-secondary"
                              id="button-addon2"
                              onClick={onClickCouponButton}
                            >
                              Apply Coupon
                            </Button>

                            {couponCodeSubmitted && <p> {couponCodeText}</p>}
                          </Col>
                        </Row>
                      )}

                      <Row className="pt-2 pb-2">
                        <Col className="text-right">
                          {couponCodeDetails === null ? (
                            <Button
                              className="text-center"
                              onClick={payRazorPay}
                            >
                              PAY INR {amountToBePaid}
                            </Button>
                          ) : (
                            <Button onClick={onCouponCodeClicked}>
                              {`GET ${couponCodeDetails.ACCESS_DURATION} DAYS FREE `}
                            </Button>
                          )}
                        </Col>
                        <Col>
                          <p
                            className="text-left cursor-pointer mb-0 mt-1"
                            onClick={() => {
                              setShowCouponCode(true)
                            }}
                          >
                            Apply Coupon
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default CouponScreen
