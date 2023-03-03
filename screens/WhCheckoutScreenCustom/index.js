import React, { Fragment, useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
//import Link from 'next/link'
import styles from './wh-checkout.module.scss'
import { useRouter } from 'next/router'
import {
  createOrderURL,
  APICaptureWithPromo,
  APICustomEventEmailCheck,
  APIgetLiveSession,
  APIeventRegistration
  // APIgetAllCities,
} from '../../config/API'
import { apiKey, image, color } from '../../config/planContent'
import axios from 'axios'
import { useSelector } from 'react-redux'

const whCheckoutScreen = ({ planType }) => {
  const auth = useSelector((state) => state.auth)
  // console.log(auth)
  const router = useRouter()

  const [courseAmount, setcourseAmount] = useState(0)
  const [amountToBePaid, setAmountToBePaid] = useState(0)
  const [event, setevent] = useState(null)

  useEffect(async () => {
    await axios.get(`${APIgetLiveSession}/790`)
      .then((res) => { setevent(res.data.EventData) })
  }, [])



  useEffect(() => {
    if (planType === 'plus') {
      setAmountToBePaid(999)
      setcourseAmount(999)
    }
    if (planType === 'premium') {
      setAmountToBePaid(49999)
      setcourseAmount(49999)
      // setAmountToBePaid(1)
    }
    if (planType === 'ms-plus') {
      setAmountToBePaid(999)
      setcourseAmount(999)
      // setAmountToBePaid(1)
    }

    if (Object.keys(auth.userDetails).length > 0 && auth.userDetails !== null && auth.userDetails !== undefined) {
      // console.log("I am here", auth);
      setFormDetails({
        firstName: auth.userDetails.FIRSTNAME,
        lastName: auth.userDetails.LASTNAME,
        phoneNumber: auth.userDetails.PHONENUMBER,
        grade: auth.userDetails.GRADE,
        curriculum: auth.userDetails?.CURRICULUM,
        parentsNumber: auth.userDetails?.PARENT_PHONE,
        email: auth.user,
      })
    }
    else if(Object.keys(auth.userDetails).length <= 0 && planType && planType === 'ms-plus' )
    {
      setFormDetails({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        grade: '',
        curriculum: '7',
        // city: '',
        parentsNumber: '',
      })
    }
  }, [auth, planType])

  
  const [formDetails, setFormDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    grade: '',
    curriculum: '',
    // city: '',
    parentsNumber: '',
  })

  
  

  const [couponCode, setCouponCode] = useState('')
  const [couponCodeSubmitted, setCouponCodeSubmitted] = useState(false)
  const [user, setuser] = useState(null)


  
  const checkUserType = async(email)=>{
    // console.log("checking user type")
    await axios.post(
      APICustomEventEmailCheck,
      {
        event: 790,
        email: email
      }
    )
      .then((res) => {
        // console.log(res)
        const data = res.data.data
        if (res.data.type === 2) {
          // setuserUpdated(false)
          // console.log("seretting form details")
          setFormDetails({
            ...formDetails,
            email: email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phone,
            grade: data.grade,
            curriculum: data.curriculum,
            // city: '',
            parentsNumber: '',
            id: data.id,
            city: data.city,
            school: data.school
          })
          setuser({
            email: email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phone,
            grade: data.grade,
            curriculum: data.curriculum,
            // city: '',
            parentsNumber: '',
            id: data.id
          })
          // console.log("returning true")
          return true
        }
        else if (res.data.type === 3 || res.data.type === 4) {
          if (res.data.status) {
            router.push(`/event-registration-success/${event.ZOOMID}`)
          }
        else if (res.data.type === 1)
        {
          // console.log("setting uuser as null")
          setuser(null)
        }
        }
      })
      .catch(err=>{
        // console.log("returning false")
        return false
      })

  }



  const onChangeForm = (e) => {
    // console.log(formDetails)
    // console.log(e.target.name, e.target.value)
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    if (e.target.name === 'email') {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        // console.log("is a valid email")
        checkUserType(e.target.value)
      }
      else {
        console.log("invalid email")
      }
    }
  }

  const [couponCodeText, setCouponCodeText] = useState(null)
  const [couponCodeDetails, setCouponCodeDetails] = useState(null)

  
  useEffect(() => {
    if(couponCodeDetails){
      if(couponCodeDetails.PROMO_TYPE === 'FLATDISCOUNT')
    {
      setAmountToBePaid(courseAmount-couponCodeDetails.DISCOUNT)
    }
    else if (couponCodeDetails.PROMO_TYPE === 'PERCENTAGEDISCOUNT')
    {
      setAmountToBePaid(courseAmount-(courseAmount * (couponCodeDetails.DISCOUNT/100))) 
    }
    else if (couponCodeDetails.PROMO_TYPE === 'DURATION'){
      setAmountToBePaid(courseAmount-courseAmount) 
    }
    }
    
    // console.log(couponCodeDetails)
    
  }, [couponCodeDetails])
  const onClickCouponButton = async () => {
    setCouponCodeSubmitted(true)
    if (couponCode.length > 0) {
      const couponCodeResponse = await axios.get(
        `https://api.collegepass.org/api/v2/promo/name/${couponCode}?userID=${auth.userDetails.ID}`
      )

      if (couponCodeResponse.data.status === true) {
        setCouponCodeText(`${couponCode} - coupon code applied`)
        setCouponCodeDetails(couponCodeResponse.data.promoDetails)
      } else {
        setCouponCodeText(couponCodeResponse.data.promoDetails)
      }
    } else {
      setCouponCodeText('Enter valid coupon')
    }
  }

  // console.log('couponCodeDetails', couponCodeDetails)

  const [errorMessage, setErrorMessage] = useState('')
  const payRazorPay = async () => {
    if(formDetails.firstName === '' || formDetails.lastName === '' ||
    formDetails.email === '' || formDetails.phoneNumber === '' || formDetails.grade === '' || formDetails.curriculum === '')
    {
      setErrorMessage('please fill all the data')
      return false
    }
    // console.log("paying")
    if (couponCodeDetails) {
      // if (auth.isAuthenticated !== true) {
      //   setErrorMessage('Please login/register to use promo code')
      // } else {
        if (couponCodeDetails.PROMO_TYPE === 'DURATION') {
          let bodyCapture = {
            rzpSubscriptionID: '',
            paymentID: '',
            rzpSignature: '',
            userID: auth.userDetails.ID,
            amount: '',
            orderID: '',
            premiumLevel: planType === 'premium' ? 3 : 2,
            planType: planType === 'ms-plus' ? 'plus' : planType,
            promoID: 1,
            promoCode: couponCodeDetails.NAME,
            batchDetails: [],
            planDuration: couponCodeDetails.ACCESS_DURATION,
            isCouponAlone: true,
            userID: user && user?.id? user.id:null,
            user: user ? user : formDetails ? formDetails: null
          }

          const updateBackendWithPromo = await axios.post(
            APICaptureWithPromo,
            bodyCapture
          )

          // console.log('updateBackendWithPromo', updateBackendWithPromo)
          if (updateBackendWithPromo.data.status === true) {
            
        let apiBody = {
          email: formDetails.email,
          eventID: event.ID,
          eventName: event.NAME,
          firstName: formDetails?.firstName ? formDetails.firstName : '',
          lastName: formDetails?.lastName ? formDetails.lastName : '',
          grade: formDetails?.grade ? formDetails.grade : null,
          countryCode: '',
          phone: formDetails?.phoneNumber ? formDetails.phoneNumber : null,
          city: formDetails?.city ? formDetails?.city : '',
          school_name: formDetails?.school ? formDetails.school : null,
          curriculum: formDetails?.curriculum ? formDetails.curriculum : null,
          countriesOfInterest: ''
          
        }

        // console.log('apiBody', apiBody)
        const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
        if (registerEventDetails.data.statusCode === 200) {
          router.push(`/event-registration-success/${event.ZOOMID}`)
        }
            // router.push('/payment-completed')
          }

          // router.push('/thanks')
        } else {
          let body = {
            amount: amountToBePaid,
            currency: 'INR',
            plan_id: 'CP_PRIME_YEAR_NATIONAL',
          }
          createOrder(body, 'CollegePass Plus')
        }
      // }
    } else {
      let body = {
        amount: amountToBePaid,
        currency: 'INR',
        plan_id: 'CP_PRIME_YEAR_NATIONAL',
      }

      createOrder(body, 'CollegePass Plus')
    }
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
        planType,
        res.data.data.id
      )
    } catch (err) {
      console.log(err)
    }
  }

  const paymentSubmitHandler = (amt, currency, planDetail, planID, ordID) => {
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
        //         razorpay_order_id: "order_IzAtWNq5g0i5Qr"
        // razorpay_payment_id: "pay_IzAtlTwBE2ph9u"
        // razorpay_signature: "d485ba3c8a6f4d44815ed3697f12b802f4
      },
      prefill: {
        email: formDetails.email,
        contact: formDetails.phoneNumber,
      },
      theme: {
        color: color,
      },
    }
    let rzp = new window.Razorpay(options)
    rzp.open()
  }
  const phoneAndGradeChange = planType === 'ms-plus' ? <> <Row>
      <Col>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Control
            type="number"
            placeholder="Enter your number"
            name="phoneNumber"
            // disabled={auth.isAuthenticated}
            value={formDetails.phoneNumber}
            onChange={onChangeForm}
          />
        </Form.Group>
      </Col>
      <Col>
      <Form.Select
            aria-label="Default select example"
            // disabled={auth.isAuthenticated}
            name="grade"
            value={formDetails.grade}
            onChange={onChangeForm}
          >
            <option> Select Education level</option>
            <option value="8">In college</option>
            <option value="6">Undergraduate</option>
          </Form.Select>
      </Col>
    </Row>
      {/* <Row className="mb-3">
        <Col>
   <Form.Select
     aria-label="Default select example"
     // disabled={auth.isAuthenticated}
     name="curriculum"
     value={formDetails.curriculum}
     onChange={onChangeForm}
   >
     <option>Select Curriculum</option>
     <option value="7" >
       UNDERGRADUATE/ DEGREE
     </option>
   </Form.Select>
 </Col>
        <Col>
          
        </Col>
      </Row> */}
      </>
      :
      <> <Row>
        <Col>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="number"
              placeholder="Enter your number"
              name="phoneNumber"
              // disabled={auth.isAuthenticated}
              value={formDetails.phoneNumber}
              onChange={onChangeForm}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="number"
              placeholder="Enter your parents number"
              name="parentsNumber"
              // disabled={auth.isAuthenticated}
              value={formDetails.parentsNumber}
              onChange={onChangeForm}
            />
          </Form.Group>
        </Col>
      </Row>
        <Row className="mb-3">
          <Col>
                                <Form.Select
                                  aria-label="Default select example"
                                  // disabled={auth.isAuthenticated}
                                  name="curriculum"
                                  value={formDetails.curriculum}
                                  onChange={onChangeForm}
                                >
                                  <option>Select Curriculum</option>
                                  <option value="1" >IGCSE</option>
                                  <option value="2" >IB</option>
                                  <option value="3" >CBSE</option>
                                  <option value="4" >ICSE</option>
                                  <option value="5" >STATE BOARD</option>
                                  <option value="6" >CAIE</option>
                                  <option value="7" >
                                    UNDERGRADUATE/ DEGREE
                                  </option>
                                </Form.Select>
                              </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              // disabled={auth.isAuthenticated}
              name="grade"
              value={formDetails.grade}
              onChange={onChangeForm}
            >
              <option> Select Grade</option>
              <option value="1">Grade 8</option>
              <option value="2">Grade 9</option>
              <option value="3">Grade 10</option>
              <option value="4">Grade 11</option>
              <option value="5">Grade 12</option>
              <option value="7">Others</option>
            </Form.Select>
          </Col>
        </Row></>
  
  const handlePaymentResponse = async (response, plan, ordID, subID) => {
    // console.log('STARTED HANDLE PAYMENT RESPONSE')
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      }

      let bodyCapture = {
        
        rzpSubscriptionID: '',
        paymentID: response.razorpay_payment_id,
        rzpSignature: response.razorpay_signature
          ? response.razorpay_signature
          : null,
        userID: auth?.userDetails
          ? auth.userDetails?.ID
            ? auth.userDetails?.ID
            : null
          : null,
        amount: amountToBePaid,
        orderID: ordID ? ordID : null,
        premiumLevel: planType === 'premium' ? 3 : 2,
        planType: planType === 'ms-plus' ? 'plus' : planType,
        promoID: couponCodeDetails?.ID ? couponCodeDetails?.ID : '',
        promoCode: couponCodeDetails?.NAME ? couponCodeDetails?.NAME : '',
        batchDetails: [],
        planDuration: couponCodeDetails?.ACCESS_DURATION
          ? couponCodeDetails?.ACCESS_DURATION
          : '365',
        isCouponAlone: false,
        userID: user && user?.id? user.id:null,
        user: user ? user : formDetails ? formDetails: null
      }

      // console.log('BODY CAPTURE', bodyCapture)

      const updateBackendWithPromo = await axios.post(
        APICaptureWithPromo,
        bodyCapture
      )

      // console.log('updateBackendWithPromo', updateBackendWithPromo)
      if (updateBackendWithPromo.data.status === true) {
       
        let apiBody = {
          email: formDetails.email,
          eventID: event.ID,
          eventName: event.NAME,
          firstName: formDetails?.firstName ? formDetails.firstName : '',
          lastName: formDetails?.lastName ? formDetails.lastName : '',
          grade: formDetails?.grade ? formDetails.grade : null,
          countryCode: '',
          phone: formDetails?.phoneNumber ? formDetails.phoneNumber : null,
          city: formDetails?.city ? formDetails?.city : '',
          school_name: formDetails?.school ? formDetails.school : null,
          curriculum: formDetails?.curriculum ? formDetails.curriculum : null,
          countriesOfInterest: ''
        }

        // console.log('apiBody', apiBody)
        const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
        if (registerEventDetails.data.statusCode === 200) {
          router.push(`/event-registration-success/${event.ZOOMID}`)
        }
        // router.push('/payment-completed')
      } else {
        router.push('/500')
      }

      // const bodySuccess = {
      //   payment_id: response.razorpay_payment_id,
      //   razorpay_signature: response.razorpay_signature
      //     ? response.razorpay_signature
      //     : null,
      //   user_email: localStorage.user,
      //   razorpay_subscription_id: subID ? subID : null,
      //   order_id: ordID ? ordID : null,
      //   plan: plan,
      // }

      // const res = await axios.post(paymentSuccessURL, bodySuccess, config)

      // if (res.status !== 200) {
      //   return
      // } else {
      //   // loadUser()
      //   // loadAccess()
      //   // setIsRedirect(true)
      // }
    } catch (err) {
      
      console.log(err)
    }
  }
  return (
    <Fragment>
      <Container fluid className="bg-black">
        <Container>
          <Row className="pt-4">
            <Col className="mt-5 pt-5 pb-4">
              <Row className={styles.bgImagewh}>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className={styles.whImageSec}
                >
                  <Row>
                    <Col>
                      <h3>
                        CollegePass {planType === 'ms-plus' ? 'PLUS' : planType?.toUpperCase()}
                        <br />
                      </h3>
                      <hr />
                      <p>
                        {planType?.toUpperCase() === 'PREMIUM' ? (
                          <ul>
                            <li>Access to Live Online IELTS Classes</li>
                            <li>Access to Live Online SAT Classes</li>
                            <li>
                              Access to Live Online AP Calculus AB/BC Classes
                            </li>
                            
                          </ul>
                        ) : planType?.toUpperCase() === 'MS-PLUS' ? (<ul>
                          <li>Access to Live Online IELTS Classes</li>
                          <li>Access to a Complimentary Profile Assessment</li>
                          <li>
                            Access to all College Admissions Livestreams
                          </li>
                          <li>
                            Access to all SOP/Personal Statement workshops
                          </li>
                        </ul>) : (
                          <ul>
                            <li>Access to Live Online IELTS Classes</li>
                            <li>Unlimited Access to The Career Track</li>
                            <li>
                              Unlimited Access to All College Admissions
                              Livestreams
                            </li>
                            <li>
                              Unlimited Access to The Ivy League/Oxbridge
                              Track
                            </li>
                          </ul>
                        )}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={styles.whFormSec}>
                  <Row>
                    <Col>
                      <Row>
                        <Col className={styles.whHeading}>
                          <h3 className="text-center mt-4 pt-2">
                            PAYMENT REQUEST FOR COLLEGEPASS{' '}
                            {planType === 'ms-plus' ? 'PLUS' : planType?.toUpperCase()}
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.whMainForm}>
                          <Form>
                            
                          <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    // disabled={auth.isAuthenticated}
                                    value={formDetails.email}
                                    onChange={onChangeForm}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    // disabled={auth.isAuthenticated}
                                    value={formDetails.firstName}
                                    onChange={onChangeForm}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    // disabled={auth.isAuthenticated}
                                    value={formDetails.lastName}
                                    onChange={onChangeForm}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            {phoneAndGradeChange}

                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.whPaymentDetail}>
                          <Row>
                            <Col>
                              <h5
                                style={{
                                  color: 'rgb(93, 93, 93)',
                                  fontSize: '12px',
                                  textTransform: 'uppercase',
                                  marginTop: '5px',
                                }}
                              >
                                PAYMENT DETAILS
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{
                                borderRadius: '5px',
                                border: '1px solid rgb(222, 222, 222)',
                                padding: '12px 16px',
                                marginLeft: '15px',
                                marginRight: '15px',
                              }}
                            >
                              <Row>
                                <Col
                                  className="text-left"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>COLLEGEPASS {planType === 'ms-plus' ? 'PLUS' : planType?.toUpperCase()}</p>
                                </Col>
                                <Col
                                  className="text-right"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>₹ {courseAmount}</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-left">
                                  <InputGroup className="mb-3">
                                    <FormControl
                                      placeholder="Enter Coupon Code"
                                      aria-label="Enter Coupon Code"
                                      aria-describedby="basic-addon2"
                                      value={couponCode}
                                      onChange={(e) =>
                                        setCouponCode(e.target.value)
                                      }
                                    />
                                    <InputGroup.Text
                                      id="basic-addon2"
                                      onClick={() => {
                                        onClickCouponButton()
                                      }}
                                    >
                                      Apply
                                    </InputGroup.Text>
                                  </InputGroup>
                                </Col>
                              </Row>
                              {couponCodeSubmitted ? (
                                <Row>
                                  <Col className="text-left">
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        color: '#000000',
                                        fontWeight: '600',
                                        color: '#d29a4c',
                                        letterSpacing: '0.03rem',
                                      }}
                                    >
                                      {couponCodeText}{' '}
                                      <span
                                        href=""
                                        style={{
                                          color: '#c93432',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                          setCouponCodeSubmitted(false)
                                          setCouponCodeDetails(null)
                                          if (planType === 'plus') {
                                            setAmountToBePaid(999)
                                          }
                                          if (planType === 'premium') {
                                            setAmountToBePaid(49999)
                                            // setAmountToBePaid(1)
                                          }
                                          if (planType === 'ms-plus') {
                                            setAmountToBePaid(999)
                                            // setAmountToBePaid(1)
                                          }
                                        }}
                                      >
                                        Remove
                                      </span>
                                    </p>
                                  </Col>
                                  {/* <Col className="text-right">
                                    <p>- ₹ 4800</p>
                                  </Col> */}
                                </Row>
                              ) : null}

                              <Row
                                style={{
                                  borderTop: '1px solid #cccccc',
                                  paddingTop: '20px',
                                }}
                              >
                                <Col
                                  className="text-left"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>Order Total</p>
                                </Col>
                                <Col
                                  className="text-right"
                                  style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                    fontWeight: '600',
                                  }}
                                >
                                  <p>₹ {amountToBePaid}</p>
                                  {/* {couponCodeDetails === null ? (
                                    <p>₹ {amountToBePaid}</p>
                                  ) : (
                                    <span>₹ 0</span>
                                  )}{' '} */}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.whProceedButton}>
                          <Row>
                            <Col className={styles.beingPaid}>
                              <Button className="width-100 mb-2">
                                {couponCodeDetails === null ? (
                                  <span>
                                    Being paid now: ₹ {amountToBePaid}
                                  </span>
                                ) : (
                                  couponCodeDetails.ACCESS_DURATION?
                                  <span>
                                    {`GET ${couponCodeDetails.ACCESS_DURATION} DAYS FREE `}
                                  </span>: <span>
                                    Being paid now: ₹ {amountToBePaid}
                                  </span>
                                )}
                                {/* <span>Being paid now:</span> ₹ 999 */}
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col className={styles.proceedPaid}>
                              <Button
                                onClick={payRazorPay}
                                className="width-100 mt-2"
                              >
                                Pay Now
                              </Button>
                            </Col>
                          </Row>
                          {errorMessage.length > 0 ? (
                            <div className="mt-2">
                              <h6
                                style={{
                                  color: '#c93432',
                                  textAlign: 'center',
                                }}
                              >
                                {errorMessage}
                              </h6>
                            </div>
                          ) : null}
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
    </Fragment>
  )
}

export default whCheckoutScreen
