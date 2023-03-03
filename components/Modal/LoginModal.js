import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Row, Col, Form, Button, Spinner, InputGroup } from 'react-bootstrap'
// import Link from 'next/link'
import Image from 'next/image'
// import CloseButton from 'react-bootstrap/CloseButton';
import RegisterModal from './RegisterModal'
import ResetPassword from './ResetPassword'
import styles from './modal.module.scss'
import { loadUser, loadAccess, login, loginOTP } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import OtpInput from 'react-otp-input';
import dynamic from 'next/dynamic'
const AlertModal = dynamic(() => import('./AlertModal'))
import axios from 'axios'
import { APILoginSendOtp, APIVerifyOtp, APIlogin, APIOTPlogin } from '../../config/API'
// import FacebookLogin from 'react-facebook-login'
// import GoogleLogin from 'react-google-login'

const LoginModal = ({ show, handleClose }) => {
  const loginLoading = useSelector((state) => state.auth.loading)

  const [showAlert, setAlert] = useState(false)
	const [alertColor, seAlertColor] = useState('success')
	const [alertHeader, setAlertHeader] = useState('Successfully submitted')
	const [alertBody, setAlertBody] = useState('Your query has been successfully submitted')
  // const [alert, setAlert] = useState(false)
  const [validated, setValidated] = useState(false)
  const [type, setType] = useState(1)
  const [OTP, setOTP] = useState('')
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [showResendButton, setShowResendButton] = useState(false)
  const [counter, setCounter] = useState(null)
  const [errorText, setErrorText] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [isVerified, setisVerified] = useState(false)
  // const [isVerifying, setisVerifying] = useState(false)
  const [otpRequested, setOtpRequested] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [phone, setPhone] = useState(null)

  const [showRegister, setShowRegister] = useState(false)
  const handleCloseRegister = () => setShowRegister(false)
  const handleShowRegister = () => {
    setShowRegister(true)
    handleClose()
  }
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setOtpRequested(false)
    setShow2(false)
  };

  const handleShow2 = () => setShow2(true);
  const [showForgotPwd, setForgotPwd] = useState(false)
  const handleCloseForgetPwd = () => setForgotPwd(false)
  const handleShowforgetPwd = () => {
    setForgotPwd(true)
    handleClose()
  }

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
		// console.log("Alert clicked",showAlert)
		if (showAlert){
			// console.log('setting timeout')
			setTimeout(() => {
				setAlert(false)
			}, 5000)
		}
	}, [showAlert])
  useEffect(() => {
    // console.log("counter is", counter)
    if (counter === 0) {
      // console.log("it is zeo")
      setShowResendButton(true)
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
   {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post(
        APIlogin,
        {
          EMAIL: email,
          PASSWORD: password,
        },
        config
      )
      // console.log(res)
      if(res.data.status){
        dispatch(login(email, password))
        if (alert.length === 0) {
          handleClose()
          setLoading(false)
        }
      }
      else{
        setAlert(true)
        setErrorText('Invalid Credentials')
      }
      // 
      
      
      
    }
    setValidated(true)
  }
  const responseFacebook = (response) => {
    let source = 'FACEBOOK'
    dispatch(socialLogin(response.email, source))
    handleClose()
  }

  const responseGoogleSuccess = (response) => {
    let source = 'GOOGLE'

    dispatch(socialLogin(response.profileObj.email, source))
    handleClose()
  }
  const responseGoogleFailure = (response) => {
    let source = 'GOOGLE'
    if (response?.profileObj?.email) {
      dispatch(socialLogin(response?.profileObj?.email, source))
    }
  }

  useEffect(() => {
    setErrorText(null)
    
    if(phone?.length>2){
      // console.log(parsePhoneNumber(phone))
    if(parsePhoneNumber(phone)?.country=="IN"){
			if (phone.length - parsePhoneNumber(phone)?.countryCallingCode.length > 10) {
				setButtonDisabled(false)
			  }
			  else
				setButtonDisabled(true)
		}
		else{
			if (phone.length - parsePhoneNumber(phone)?.countryCallingCode.length > 8) {
				setButtonDisabled(false)
			  }
			  else
				setButtonDisabled(true)
		}
  }
  else{
    setButtonDisabled(true)
  }
  }, [phone])


  const verifyOTP = async () => {
    // console.log("verufy clicked")
    // setisVerifying(true)
    if (OTP != '' && OTP) {

      const config = {
        headers: { 'Content-Type': 'application/json', },
      };
      dispatch({ type: 'LOGIN_REQUEST' })
      try {
  
        // console.log("OTP  login",phone,OTP)
        const res = await axios.post(
          APIOTPlogin,
          {
            phone: phone,
            otp: OTP,
          },
          config
        )

        if(res.data.status)
      {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data,
        })
  
        dispatch(loadAccess())
        dispatch(loadUser())
      }
      else {
        // setisVerifying(fal/se)
        dispatch({ type: 'LOGIN_FAILURE' })
        setAlert(true)
        setErrorText('Please enter the correct OTP')
      }
        // dispatch({
        //   type: LOGIN_SUCCESS,
        //   payload: res.data,
        // })
  
        // dispatch(loadAccess())
        // dispatch(loadUser())
        // dispatch(loginOTP(phone, OTP))
        // if (alert.length === 0) {
        //   // setisVerifying(false)
        //   setValidated(true)
        //   // setisVerified(true)
        //   handleClose2()
        //   handleClose()
        // }
        // console.log(otp_result)
        // if (otp_result.data.status == true) {
        // 	setisVerifying(false)
        //   dispatch(loginOTP(phone, OTP))
        //   setValidated(true)
        // 	// setisVerified(true)
        // 	handleClose2()
        //   handleClose()
        // 	// alert("otpverifird")
        // }
        // else {
        //   // setisVerifying(false)
        //   setAlert(true)
        //   // seAlertColor('danger')
        //   // setAlertHeader('Thats the wrong one!')
        //   // setAlertBody('Please enter the correct OTP')
        // }
      }
      catch (err) {
        dispatch({ type: 'LOGIN_FAILURE' })
        // console.log(err)
        // setisVerifying(false)
        setAlert(true)
        setErrorText('Some error occured. Please try again')
      }
    }
    else {
      // dispatch({ type: 'LOGIN_FAILURE' })
      // setisVerifying(false)
      setAlert(true)
        setErrorText('Please enter the otp')
    }

  }
  const sendOTP = async (phone, via) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    try {

      setOtpRequested(true)
      const otp_result = await axios.get(
        localStorage.user ? `${APILoginSendOtp}${phone}/${via}` :
          `${APILoginSendOtp}${phone}/${via}`,
        config
      );
      // console.log('result sendotp', otp_result)

      if (otp_result.status === 200) {
        // setsendOTPBtnDisable(true);

        // setdisableClass("otp-disable");

        setCounter(30);

        // setdisableOTPCounter("block");
        setShowVerifyOTP(true)
        setCounter(30);
        handleShow2()
        // setdisableOTPBlock("block");
      }
    } catch (error) {

      setOtpRequested(false)
      let err = error.response.data
      if (err?.errors?.length>0 || err?.message) {
        setAlert(true)
        setErrorText(err?.message?err.message:err?.errors[0]?.msg)
        
      } else {
        setAlert(true)
        setErrorText('Some error occured. Please try again')
      }
    }
  };





  const onClickOTPSMS = async (e) => {
    if (e)
      e.preventDefault();
    if (showResendButton)
      setShowResendButton(false)
    var error_check = phone == null || phone == '' || phone == undefined || phone == [];

    if (error_check === false) {
      sendOTP(phone, "sms");
    }
    else {
      null
      // console.log('Please Enter Mobile Number')
    }
  };


  return (
    <Fragment>
      <Row>
        <Col className="login-modal">
          <Modal show={show} onHide={handleClose} className={styles.loginModal}>
            <Modal.Header closeButton className="border-bottom-none" style={{
              paddingLeft: '5%'
            }}>
              {/*<CloseButton />*/}
              <Row className="width-100">
                <Col
                  className="text-center">
                  <Row>
                    <Col className={styles.loginHolo}>
                      <Image
                        src="/logo/b-holo.png"
                        alt="Text Logo"
                        width="70"
                        height="59"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.titleModal}>
                      <h4>Sign in to CollegePass</h4>
                      {/* <h6>You will be signed in to CollegePass Plus and CollegePass Premium</h6> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col className={styles.wrapModalContent}>
                  <Form noValidate validated={validated} onSubmit={onSubmit}
                  >
                    <Row>
                      <Col>{

                        type === 1 ?
                          <>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={onChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter a valid email
                              </Form.Control.Feedback>
                              {/* <Button className={styles.btnInInput}>
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                              </Button> */}
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChange}
                                pattern=".{6,}"
                              />
                              <Form.Control.Feedback type="invalid">
                                Password should be atleast 6 characters long
                              </Form.Control.Feedback>
                              {/* <p className={styles.loadingInInput}>
                                <Image
                                  src="/tenor.gif"
                                  alt="Text Logo"
                                  width="30"
                                  height="30"
                                />
                              </p> */}
                            </Form.Group>
                          </>

                          :

                          // <>
                          show2 ? <><Row>
                            <Col className="text-center pt-2 pb-4">
                              <h4 style={{
                                color: '#000000'
                              }}>OTP Verification</h4>
                              {/* //<p>Enter the OTP sent to {formDetails.phone}</p> */}
                            </Col>
                          </Row>
                            <Row>
                              <Col className="opt-fields-custom-lib">
                                <OtpInput
                                  value={OTP}
                                  onChange={(v) => {
                                    // console.log(v)
                                    setOTP(v)
                                  }}
                                  numInputs={6}
                                  separator={<span>-</span>}
                                  className="opt-fields-custom"
                                />
                                {showResendButton && <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                  <span style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'center'
                                  }}><p>Didn't receive OTP?</p><a href="#" onClick={(e) => {
                                    onClickOTPSMS(e)
                                    return false
                                  }} style={{
                                    paddingLeft: '5px'
                                  }}>Resend OTP</a></span>
                                </Form.Group>}
                                <Form.Group className="mb-1 mt-1" controlId="formBasicEmail">
                                  {!showResendButton && <p className="mb-0">
                                    {" "}
                                    {counter} sec{" "}
                                  </p>}
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="text-center">
                                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">{
                                  loginLoading ? <Spinner animation="border" role="status" disabled></Spinner> :
                                    <Button onClick={() => { verifyOTP() }} style={{
                                      fontSize: '18px',
                                      padding: '12px 30px',
                                      borderRadius: '12px',
                                      background: '#0071e3',
                                      border: '1px solid #0071e3',
                                      color: '#fff',
                                      fontWeight: '600',
                                      margin: '15px 0 5px',
                                      width: '100%',
                                      letterSpacing: '.04rem'
                                    }}>Verify & Proceed</Button>
                                }
                                </Form.Group>
                              </Col>
                            </Row></> : <><Form.Group className="mb-3" controlId="formBasicEmail">
                              <PhoneInput
                                inputProps={{
                                  name: "phone",
                                  required: true,
                                  autoFocus: true,
                                }}
                                defaultCountry="IN"
                                placeholder="Phone"
                                // countries={['IN']}
                                // onlyCountries={['in', 'us', 'uk']}
                                onChange={(e) => { setPhone(e) }}
                                value={phone}
                              // containerClass={phoneNumberError}
                              />
                            </Form.Group></>
                      }
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                          <p style={{ color: 'red', textAlign: 'center' }}>{errorText}</p>
                        </Col>
                      </Row>
                    <Row>
                      <Col className="">
                        {type === 1 ? 
                        // loading ? <Button className={styles.loginButton} disabled={true}>
                        //   <Spinner animation="border" role="status">
                        //     <span className="visually-hidden">Loading...</span>
                        //   </Spinner>
                        // </Button> : 
                        <Button className={styles.loginButton} type="submit">
                          Login
                        </Button> :

                          <>{!showVerifyOTP ? <Button className={styles.loginButton} disabled={buttonDisabled} onClick={() => { onClickOTPSMS() }}>Get OTP</Button> :
                            otpRequested ? null : <Button className={styles.loginButton} onClick={() => { onClickOTPSMS() }}>Get OTP</Button>
                          }</>

                        }
                      </Col>
                    </Row>
                    {/*<Row>
                      <Col>
                      <p style={{
                        textAlign: 'center',
                        marginBottom: '0',
                        paddingTop: '5%'
                      }}>OR</p>
                      </Col>
                    </Row>*/}
                    <Row>
                      <Col className="text-center mb-0">
                        {type === 1 ? <>
                          {/* <p
                            className="cursor-pointer"
                            style={{
                              fontSize: '17px',
                              textDecoration: 'none',
                              color: '#06c',
                              paddingTop: '65px',
                              letterSpacing: '0.04rem',
                              cursor: 'pointer'
                            }}
                          > */}
                           {/* <a href="" onClick={(e) => {
                              e.preventDefault()
                              setType(2)
                            }}
                              style={{
                                color: 'rgb(0, 102, 204)'
                              }}> Login using phone number</a> */}
                          {/* </p> */}
                        </> :
                          <> <p
                            className="cursor-pointer"
                            style={{
                              fontSize: '17px',
                              textDecoration: 'none',
                              color: '#06c',
                              paddingTop: '30px',
                              letterSpacing: '0.04rem'
                            }}
                          >
                            <a href="" onClick={(e) => {
                              e.preventDefault()
                              setType(1)
                            }} style={{
                              color: '#06c',
                            }}>Login using email</a>
                          </p></>}

                      </Col>
                    </Row>
                    {/*<Row>
                      <Col className="text-center">
                       
                      </Col>
                    </Row>*/}
                    {/*<Row>
                      <Col className="text-center mt-1">
                        <p style={{
                          marginBottom: '0'
                        }}>
                          Need an account?
                        </p>
                        <span
                            className="cursor-pointer"
                            
                            style={{
                              color: '#127fd1',
                              fontSize: '18px',
                              fontWeight: '600',
                              letterSpacing: '0.04rem'
                            }}
                          >
                            {' '}
                            Sign up
                          </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className={styles.modalPrivacy}>
                          By logging in, you agree to our{' '}
                          <Link href="/privacy">Privacy Policy</Link> and{' '}
                          <Link href="/terms">Terms</Link> of Service
                        </p>
                      </Col>
                    </Row>*/}
                    <Row>
                      <Col className='logn-modal-join-today pb-4'>
                        <p onClick={handleShowRegister} style={{
                          fontSize: '17px',
                          textDecoration: 'none',
                          color: '#06c',
                          paddingTop: '0px',
                          letterSpacing: '0.04rem',
                          cursor: 'pointer'
                        }}>
                          Create a CollegePass account
                        </p>
                        <p
                          className="cursor-pointer"
                          style={{
                            fontSize: '18px',
                            textDecoration: 'none',
                            color: '#808080',
                            paddingTop: '15px',
                            letterSpacing: '0.04rem'
                          }}
                          onClick={handleShowforgetPwd}
                        >
                          Reset Password

                        </p>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            {/*<Modal.Footer className='d-block'>
              <Row>
                <Col className='logn-modal-join-today'>
                  <Button variant="secondary" onClick={handleShowRegister}>
                    Not a CollegePass User? Sign Up!
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>*/}
          </Modal>
        </Col>
      </Row>

      <RegisterModal
        show={showRegister}
        handleClose={handleCloseRegister}
        onSubmitRegister={handleCloseRegister}
      />
      <ResetPassword show={showForgotPwd} handleClose={handleCloseForgetPwd} />

      {/* <AlertModal show={showAlert} title={alertHeader} message={alertBody} type={alertColor} /> */}
    </Fragment>
  )
}

export default LoginModal
