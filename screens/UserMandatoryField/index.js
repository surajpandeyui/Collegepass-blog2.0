import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../UserMandatoryField/mandatory.module.scss'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { APIgetAllCities, APICaptureMandatoryDetails, APISendOTP, APIVerifyOtp } from '../../config/API'
import axios from 'axios'
import { loadUser } from '../../actions/authActions'
import Select from 'react-select'
// import PhoneInput from "react-phone-input-2";

import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import dynamic from 'next/dynamic'
import OtpInput from 'react-otp-input';
const AlertModal = dynamic(() => import('../../components/Modal/AlertModal'))


const UserMandatoryField = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const grades = [
    { value: '1', label: 'Grade 8' },
    { value: '2', label: 'Grade 9' },
    { value: '3', label: 'Grade 10' },
    { value: '4', label: 'Grade 11' },
    { value: '5', label: 'Grade 12' },
    { value: '8', label: 'In College' },
    { value: '9', label: 'Graduated' },
    { value: '7', label: 'Others' }
  ];
  const curriculum = [
    { value: '1', label: 'IGCSE' },
    { value: '2', label: 'IB' },
    { value: '3', label: 'CBSE' },
    { value: '4', label: 'ICSE' },
    { value: '5', label: 'STATE BOARD' },
    { value: '6', label: 'CAIE' },
    { value: '7', label: 'UNDERGRADUATE/ DEGREE' }
  ];
  const countries = [
    { value: '3', label: 'USA' },
    { value: '2', label: 'UK' },
    { value: '4', label: 'Canada' },
    { value: '9', label: 'Australia/New Zealand' },
    { value: '6', label: 'Singapore' },
    { value: '11', label: 'Hong Kong' },
    { value: '73', label: 'Other' }
  ];


  const [showAlert, setAlert] = useState(false)
  const [alertColor, seAlertColor] = useState('success')
  const [alertHeader, setAlertHeader] = useState('Successfully submitted')
  const [alertBody, setAlertBody] = useState('Your query has been successfully submitted')
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [userType, setuserType] = useState('student')
  const [show, setShow] = useState(false)
  const [submitClicked, setsubmitClicked] = useState(false)
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [isVerified, setisVerified] = useState(true) // false (default)
  const [showResendButton, setShowResendButton] = useState(false)
  const [isVerifying, setisVerifying] = useState(false)
  const [state, setState] = useState(null)
  const [counter, setCounter] = useState(null)
  const [OTP, setOTP] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [currentField, setCurrentField] = useState(0)
  const [value, setValue] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [isSubmitting, setisSubmitting] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null);
  const [otpError, setOtpError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [emailDisabled, setEmailDisabled] = useState(false)
  const [formDetails, setFormDetails] = useState({
    city: '',
    countriesOfInterest: [],
    countryCode: "+91",
    curriculum: '',
    name: "",
    firstName2: "",
    grade: "",
    lastName: "",
    lastName2: "",
    phoneNumber: "",
    phone2: "",
    userEmail: "",
    userID: "",
    userType: "student"
  })

  // useEffect(() => {
  //   console.log("Alert clicked", showAlert)
  //   if (showAlert) {
  //     console.log('setting timeout')
  //     setTimeout(() => {
  //       setAlert(false)
  //     }, 5000)
  //   }
  // }, [showAlert])


  // useEffect(() => {
  //   // console.log(formDetails)
  // }, [formDetails])
  useEffect(() => {
    setFormDetails({ ...formDetails, countriesOfInterest: selectedOption?.map(val => val.value) })
  }, [selectedOption])
  useEffect(() => {
    // setisVerified(false)
    if (formDetails.phoneNumber?.length > 2)
      if (parsePhoneNumber(formDetails.phoneNumber)?.country == "IN") {
        if (formDetails.phoneNumber.length - parsePhoneNumber(formDetails.phoneNumber)?.countryCallingCode.length > 10) {
          setButtonDisabled(false)
        }
        else
          setButtonDisabled(true)
      }
      else {
        if (formDetails.phoneNumber.length - parsePhoneNumber(formDetails.phoneNumber)?.countryCallingCode.length > 8) {
          setButtonDisabled(false)
        }
        else
          setButtonDisabled(true)
      }
  }, [formDetails.phoneNumber])
  useEffect(() => {
    if (auth.userDetails) {
      setFormDetails({ ...formDetails, userID: auth.userDetails.ID })
      if (
        auth?.userDetails?.FIRSTNAME?.length < 1 ||
        auth?.userDetails?.FIRSTNAME === null
      ) {
        // redirect to mandatory details page
        if (show !== true) handleShow()
      }
    }
  }, [auth])
  useEffect(() => {

    // console.log("this is", value)
    if (value && findCityID(value)) {
      // console.log("changing value", findCityID(value))
      setFormDetails({ ...formDetails, city: findCityID(value)?.id, state: findCityID(value).state_id })
    }
  }, [value])
  //------------------------------OTP---------------------------------------
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



  //----------------------------------Prefill form--------------------------------------------
  useEffect(() => {
    // console.log("console.log", auth)

    if (auth.userDetails !== null && auth.userDetails !== undefined) {
      const ids = []
      if(auth.countries)
      auth?.countries?.map(item => String(item.TAG_ID))
      // console.log("-------->",auth.userDetails.FIRSTNAME)
      setFormDetails({
        ...formDetails,
        name:
          auth.userDetails.FIRSTNAME !== undefined
            ? auth.userDetails?.FIRSTNAME
            : '',
        phoneNumber: auth.userDetails.PHONENUMBER,
        grade: grades.find(item => item.value == auth.userDetails.GRADE),
        curriculum: curriculum.find(item => item.value == auth.userDetails.CURRICULUM),
        userEmail: auth.user ? auth.user : '',
        city: parseInt(auth.userDetails?.CITY),
        lastName: auth.userDetails.LASTNAME !== undefined
          ? auth.userDetails?.LASTNAME
          : '',
        firstName2: auth.userDetails.FIRSTNAME2 !== undefined
          ? auth.userDetails?.FIRSTNAME2
          : '',
        lastName2: auth.userDetails.LASTNAME2 !== undefined
          ? auth.userDetails?.LASTNAME2
          : '',
        phone2: auth.userDetails.PHONENUMBER2,
        userID: auth.userDetails.ID,
        countriesOfInterest: auth?.countries?auth?.countries?.map(item => String(item.TAG_ID)):[]
      })
      // setFormDetails({
      //   ...formDetails,
      //   countriesOfInterest: auth?.countries.map(item => String(item.TAG_ID))
      // })
      if(ids)
      setSelectedOption(countries?.filter((item) => {
        if (ids.includes(String(item.value)))
          return (item)
      }
      ))

      auth.user ? setEmailDisabled(true) : null
      setValue(findCityName(parseInt(auth.userDetails.CITY)))
    }

    // if (auth.countries && auth.countries !== undefined && false) {
    //   const ids = auth?.countries?.map(item => String(item.TAG_ID))

    //   setFormDetails({
    //     ...formDetails,
    //     countriesOfInterest: auth.countries.map(item => String(item.TAG_ID))
    //   })
    //   setSelectedOption(countries?.filter((item) => {
    //     if (ids.includes(String(item.value)))
    //       return (item)
    //   }
    //   ))
    // }

  }, [auth])
  //----------------------------------Prefill Ends--------------------------------------------


  //----------------------------------OTP functions---------------------------------------------
  const verifyOTP = async () => {
    setisVerifying(true)
    if (OTP != '' && OTP) {

      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      try {
        // console.log("sending request", `${APIVerifyOtp}${OTP}/+${formDetails.phoneNumber}`)
        const otp_result = await axios.get(
          `${APIVerifyOtp}${OTP}/+${formDetails.phoneNumber}`,
          config
        );
        // console.log(otp_result)
        if (otp_result.data.status == true) {
          setisVerifying(false)
          setisVerified(true)
          handleClose2()
          // alert("otpverifird")
        }
        else {
          setisVerifying(false)
          // setAlert(true)
          setOtpError('Please enter the correct OTP')
          seAlertColor('danger')
          setAlertHeader('Thats a wrong one!')
          setAlertBody('Please enter the correct OTP')
        }
      }
      catch (err) {
        // setAlert(true)
        setOtpError('Something Went Wrong. Please try Again')
        seAlertColor('danger')
        setAlertHeader('Oh snap! You got an error!')
        setAlertBody('Something Went Wrong. Please try Again')
      }
    }
    else {
      setisVerifying(false)
      // setAlert(true)
      setOtpError('Please enter the correct OTP')
      seAlertColor('danger')
      setAlertHeader('Thats a wrong one!')
      setAlertBody('Please enter the correct OTP')
    }

  }
  const sendOTP = async (phone, via) => {
    // console.log("sending otp")
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    try {
      const otp_result = await axios.get(
        localStorage.user ? `${APISendOTP}${phone}/${via}/${localStorage.user}` :
          `${APISendOTP}+${phone}/${via}/null`,
        config
      );
      // console.log('result sendotp', otp_result)

      if (otp_result.status === 200 && !otp_result.data.verified) {
        // setsendOTPBtnDisable(true);

        // setdisableClass("otp-disable");

        setCounter(30);

        // setdisableOTPCounter("block");
        setShowVerifyOTP(true)
        setCounter(30);
        handleShow2()
        setPhoneNumberError('')
        // setdisableOTPBlock("block");
      }

      else if (otp_result.status === 200 && otp_result.data.verified && otp_result.data.correct_user) {
        setShowVerifyOTP(true)
        setisVerifying(false)
        setisVerified(true)
      }
      else if (otp_result.status === 200 && otp_result.data.verified && !otp_result.data.correct_user) {
        setShowVerifyOTP(false)
        setisVerifying(false)
        setisVerified(false)
        // setAlert(true)
        setPhoneNumberError('Phone number already in use')
        seAlertColor('danger')
        setAlertHeader('Phone number already in use!!')
        setAlertBody('Please login with your correct phone number or use another number')
      } else {
        // setAlert(true)
        setPhoneNumberError('Something Went Wrong. Please try Again')
        seAlertColor('danger')
        setAlertHeader('Oh snap! You got an error!')
        setAlertBody('Something Went Wrong. Please try Again')
      }
    } catch (error) {
      // if (error.response.status === 400) {
      //   setAlert(true)
      //   seAlertColor('danger')
      //   setAlertHeader('Phone number already in Use!!')
      //   setAlertBody('Please login with your correct phone number or use another number')
      // } else {
      //   setAlert(true)
      //   seAlertColor('danger')
      //   setAlertHeader('Oh snap! You got an error!')
      //   setAlertBody('Something Went Wrong. Please try Again')
      // }
      if (error?.response?.data?.errors)
        setPhoneNumberError(error?.response?.data?.errors[0]?.msg)
      else
        setPhoneNumberError('Something Went Wrong. Please try Again')
    }
  };





  const onClickOTPSMS = async (e) => {
    // e.preventDefault();

    // // console.log(selectedCountries);

    // // console.log(selectedCountries.length);
    // console.log("clicked")
    if (showResendButton)
      setShowResendButton(false)
    var error_check = formDetails.phoneNumber == null || formDetails.phoneNumber == '' || formDetails.phoneNumber == undefined || formDetails.phoneNumber == [];

    if (error_check === false) {
      sendOTP(formDetails.phoneNumber, "sms");
    }
  };
  //----------------------------------OTP functions end-----------------------------------------

  const [allCities, setAllCities] = useState([])
  useEffect(() => {
    const getAllCities = async () => {
      const result = await axios.get(APIgetAllCities)
      setAllCities(result.data.cities)
    }
    getAllCities()
  }, [])

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : allCities.filter(
        (city) => city.name.toLowerCase().slice(0, inputLength) === inputValue
      )
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.name

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>



  const onChangeHandler = (event, { newValue }) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestion([])
  }

  const inputProps = {
    placeholder: 'Enter your city',
    value,
    onChange: onChangeHandler,
  }

  const findCityID = (value) => {
    return allCities.find((city) => {
      return city.name.toLowerCase() === value?.toLowerCase()
    })
  }

  const findCityName = (value) => {
    const cityDetails = allCities.find((city) => {
      return parseInt(city.id) === parseInt(value)
    })

    if (cityDetails !== null && cityDetails !== undefined) {
      return cityDetails.name
    } else {
      return ''
    }
  }

  // console.log('value', findCityID(value))


  const onChangeForm = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }
  //   console.log('EVENT DETAILS', eventDetails)
  const isNullish = (target) => {
    for (var member in target) {
      if ((target[member] == null || target[member] == '' || target[member] == undefined || target[member] == []) && member != 'lastName2') {

        return true;
      }

    }
    return false;
  }
  const onSubmitEventRegistration = async () => {
    // let cityDetails = findCity(formDetails.city.name)
    setsubmitClicked(true)
    // let apiBody = {
    //   email: formDetails.email,
    //   eventID: eventDetails.ID,
    //   eventName: eventDetails.NAME,
    //   firstName: firstName,
    //   lastName: secondName,
    //   grade: formDetails.grade,
    //   countryCode: '',
    //   phone: formDetails.phoneNumber,
    //   city: cityDetails.id,
    // }
    // console.log("----------------", formDetails)
    if (isNullish(formDetails)) {
      // setIsSubmitting(false)
      // setAlertText(true)
      /*setTimeout(() => {
        setAlertText(false)
      }, 5000)*/
      // setsubmitClicked(false)
      // console.log("nullish")
      return
    }
    if (formDetails.phone2 == formDetails.phoneNumber) {
			return
		}
    if (!isVerified) {
      // alert("please verify mobile")
      setPhoneNumberError('Please verify your phone number')
      return
    }


    // setsubmitClicked(true)
    let apiBody = {
      userType: userType,
      firstName: formDetails.name,
      lastName: formDetails.lastName,
      grade: formDetails.grade.value,
      phone: formDetails.phoneNumber,
      userID: auth.userDetails.ID,
      userEmail: formDetails.userEmail,
      city: formDetails.city,
      state: formDetails.state_id,
      curriculum: formDetails.curriculum.value,
      countriesOfInterest: formDetails.countriesOfInterest,
      firstName2: formDetails.firstName2,
      lastName2: '',
      phone2: formDetails.phone2,
      countryCode: parsePhoneNumber(formDetails.phoneNumber).countryCallingCode
    }
    // console.log(apiBody)

    //  return

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    // console.log('apiBody', apiBody)

    try {
      setisSubmitting(true)
      const registerEventDetails = await axios.post(
        `${APICaptureMandatoryDetails}New`,
        apiBody,
        config
      )
      // console.log(registerEventDetails)
      if (registerEventDetails.data.statusCode === 200) {
        dispatch(loadUser())
        handleClose()
      }
    } catch (err) {
      setisSubmitting(false)
      // console.log(err)
    }
  }

  // useEffect(() => {
  //   if (auth.userDetails !== null && auth.userDetails !== undefined) {
  //     setFormDetails({
  //       ...formDetails,
  //       name: auth.userDetails.FIRSTNAME,
  //       phoneNumber: auth.userDetails.PHONENUMBER,
  //       grade: auth.userDetails.GRADE,
  //       curriculum: auth.userDetails?.CURRICULUM,
  //       userEmail: auth.user,
  //       userID: auth.userDetails.ID
  //     })

  //     setValue(findCityName(auth.userDetails.CITY))
  //   }
  // }, [auth])

  return (
    <Fragment>
      <Fragment>
        <Modal show={show} onHide={handleClose} className={styles.userMandatoryForm}>
          <Row className="sidemodal">
            <Col>
              <Row>
                <Col className="width-100 text-center">
                  <Image
                    src="/holo.png"
                    alt="modal-holo"
                    width={50}
                    height={50}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="width-100 text-center">
                  <h1
                    style={{
                      lineHeight: '1.5',
                      color: '#ffffff',
                      fontSize: '26px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}
                  >
                    Personalize Your Journey
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col className="width-100 text-center">
                  <h5
                    style={{
                      fontWeight: '700',
                      fontSize: '1rem',
                      lineHeight: '1.25',
                      color: '#ffffff'
                    }}
                  >
                    (Get relevant college admission livestream alerts)
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <Form className="mandatory-form">
                    <Row className={styles.mendForm}>
                      <Col className={styles.studentParent}>
                        <p>I'm a...</p>
                        <span>
                          <Button className={userType === 'student' ? styles.student : styles.parent} onClick={() => { setuserType('student') }}>Student</Button>
                          <Button className={userType === 'parent' ? styles.student : styles.parent} onClick={() => { setuserType('parent') }}>Parent</Button>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-2" controlId="formBasicName"
                        // style={submitClicked ? formDetails.name != '' && formDetails.name != undefined && formDetails.name != null ? null : { border: '1px solid red' } : null}
                        >
                          <Form.Control
                            onFocus={() => { currentField < 1 ? setCurrentField(1) : null }}
                            className={submitClicked || currentField > 1 ? formDetails.name != "" && formDetails.name != undefined ? null : styles.requiredCss : null}
                            // onChange={(e) => { setformDetails({ ...formDetails, school: e.target.value }) }} 
                            type="text"
                            placeholder={"Enter your first name"}
                            // type="text"
                            // placeholder="Enter your first name"
                            name="name"
                            value={formDetails.name}
                            onChange={onChangeForm}
                          />
                          {submitClicked || currentField > 1 ? formDetails.name != "" && formDetails.name != undefined ? null :
                            <><Form.Text className="text-muted custom-text-alrt" style={{
                              color: 'red!important',
                              letterSpacing: '0.03rem'
                            }}>
                              <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                            </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-2" controlId="formBasicName"
                        // style={submitClicked ? formDetails.lastName != '' && formDetails.lastName != undefined && formDetails.lastName != null ? null : { border: '1px solid red' } : null}
                        >
                          <Form.Control
                            onFocus={() => { currentField < 2 ? setCurrentField(2) : null }}
                            className={submitClicked || currentField > 2 ? formDetails.lastName != "" && formDetails.lastName != undefined ? null : styles.requiredCss : null}
                            type="text"
                            placeholder={"Enter your last name"}
                            name="lastName"
                            value={formDetails.lastName}
                            onChange={onChangeForm}
                          />
                          {submitClicked || currentField > 2 ? formDetails.name != "" && formDetails.name != undefined ? null :
                            <><Form.Text className="text-muted custom-text-alrt" style={{
                              color: 'red!important',
                              letterSpacing: '0.03rem'
                            }}>
                              <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                            </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className={styles.userMendSec}>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group controlId="formBasicEmail" onFocus={() => { currentField < 3 ? setCurrentField(3) : null }} className={phoneNumberError != '' || submitClicked || currentField > 3 ? (formDetails.phoneNumber != "" && formDetails.phoneNumber != undefined) && phoneNumberError == '' ? "mb-3 mt-3" : "mb-3 mt-3 " + styles.requiredCss : "mb-4 mt-3"}>
                          {/* <Form.Control onChange={(e) => { setformDetails({ ...formDetails, phone: e.target.value }) }} type="text" placeholder="Phone" /> */}
                          <PhoneInput
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: true,
                            }}
                            defaultCountry="IN"
                            // onlyCountries={['in', 'us', 'uk']}
                            onChange={(e) => { setFormDetails({ ...formDetails, phoneNumber: e }) }}
                            value={formDetails.phoneNumber}
                            placeholder="Enter phone number"
                          // containerClass={phoneNumberError}
                          />
                        </Form.Group>
                        {phoneNumberError != '' || submitClicked || currentField > 3 ? (formDetails.phoneNumber != "" && formDetails.phoneNumber != undefined) && phoneNumberError == '' ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> {phoneNumberError != '' ? phoneNumberError : 'This field is required'}
                          </Form.Text></> : null}
                      </Col>
                      {/* <Col lg={6} md={6} sm={12} xs={12} className="text-left"> */}
                        {/* onClick={onClickOTPSMS} */}
                        {/* {!showVerifyOTP ? <Button className={styles.verifyOtp} disabled={buttonDisabled} onClick={() => { onClickOTPSMS() }}>Verify with OTP</Button> : */}
                          {/* isVerified ? <p className={styles.verifiedTickMark} style={{
                            // color: "green",
                            // paddingTop: '9%',
                            // fontSize: '20px',
                            // fontWeight: '600',
                            // letterSpacing: '0.03rem'
                          // }}>Otp verified <i className="fa fa-check-circle" aria-hidden="true"></i></p> :
                            // show2 ? <Spinner animation="border" role="status" style={{ color: "green" }} disabled></Spinner> : <Button className={styles.verifyOtp} disabled={buttonDisabled} onClick={() => { onClickOTPSMS() }}>Verify with OTP</Button>
                        // }
                      {/* </Col> */}
                    </Row>
                    <Modal show={show2} onHide={handleClose2} className="otp-verify-modal">
                      <Modal.Body>
                        <Row>
                          <Col className="text-center">
                            <Image
                              width={130}
                              height={130}
                              src="/Smartphone_otp.png"
                              alt="OTP Icon"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-center pt-5 pb-5">
                            <h4>OTP Verification</h4>
                            <p>Enter the OTP sent to {formDetails.phone}</p>
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
                            <p style={{
                              color: 'red',
                              opacity: '10',
                              marginTop: '10px'
                            }}>{otpError}</p>
                            {showResendButton && <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                              <span style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'center'
                              }}><p>Didn't receive OTP?</p><a href="#" onClick={(e) => {
                                onClickOTPSMS(e)
                                return false
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
                            <Form.Group className="mb-4" controlId="formBasicEmail">{
                              isVerifying ? <Spinner animation="border" role="status" disabled></Spinner> :
                                <Button onClick={() => { verifyOTP() }}>Verify & Proceed</Button>
                            }
                            </Form.Group>
                          </Col>
                        </Row>
                      </Modal.Body>
                    </Modal>
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <Form.Group controlId="formBasicEmail" className={submitClicked || currentField > 4 ? formDetails.grade != '' && formDetails.grade != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-4"}>
                          <Select
                            // style={customStyles}
                            onFocus={() => { currentField < 4 ? setCurrentField(4) : null }}
                            defaultValue={formDetails.grade}
                            onChange={(val) => { setFormDetails({ ...formDetails, grade: val }) }}
                            options={grades}
                            placeholder={userType === 'parent' ? "Select student's grade/year" : "Select your grade/year"}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 4 ? formDetails.grade != "" && formDetails.grade != undefined ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                          </Form.Text></> : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-4" controlId="formBasicPhone"
                        // style={submitClicked ? formDetails.email != '' && formDetails.email != undefined && formDetails.name != null ? null : { border: '1px solid red' } : null}
                        >
                          <Form.Control
                            disabled={emailDisabled}
                            onFocus={() => { currentField < 5 ? setCurrentField(5) : null }}
                            className={submitClicked || currentField > 5 ? formDetails.userEmail != "" && formDetails.userEmail != undefined ? null : styles.requiredCss : null}
                            type="email"
                            placeholder="Enter your email"
                            name="userEmail"
                            value={formDetails.userEmail}
                            onChange={onChangeForm}

                          />
                          {submitClicked || currentField > 5 ? formDetails.userEmail != "" && formDetails.userEmail != undefined ? null :
                            <><Form.Text className="text-muted custom-text-alrt" style={{
                              color: 'red!important',
                              letterSpacing: '0.03rem'
                            }}>
                              <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                            </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12} onFocus={() => { currentField < 6 ? setCurrentField(6) : null }} className={submitClicked || currentField > 6 ? formDetails.city != "" && formDetails.city != undefined ? "mb-4" : "mb-4" + styles.requiredCss : "mb-4"}>
                        <div>

                          <Autosuggest

                            suggestions={suggestion}
                            onSuggestionsFetchRequested={
                              onSuggestionsFetchRequested
                            }
                            onSuggestionsClearRequested={
                              onSuggestionsClearRequested
                            }
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                          />

                        </div>
                        {submitClicked || currentField > 6 ? formDetails.city != "" && formDetails.city != undefined ? null :
                          <><Form.Text className="text-muted custom-text-alrt" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                          </Form.Text></> : null}
                      </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail" className={submitClicked || currentField > 7 ? formDetails.countriesOfInterest != [] && formDetails.countriesOfInterest != undefined ? "mb-4" : "mb-4 " + styles.requiredCss : "mb-4"}>
                      <Select
                        onFocus={() => { currentField < 7 ? setCurrentField(7) : null }}
                        // style={customStyles}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={countries}
                        isMulti={true}
                        placeholder={'Countries of interest'}
                      />
                    </Form.Group>
                    {submitClicked || currentField > 7 ? formDetails.countriesOfInterest != [] && formDetails.countriesOfInterest != undefined ? null :
                      <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                        color: 'red!important',
                        letterSpacing: '0.03rem'
                      }}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                      </Form.Text></> : null}
                    <Row>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <Form.Group controlId="formBasicEmail" className={submitClicked || currentField > 8 ? formDetails.curriculum != '' && formDetails.curriculum != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-2"}>
                          <Select
                            // style={customStyles}
                            onFocus={() => { currentField < 8 ? setCurrentField(8) : null }}
                            defaultValue={formDetails.curriculum}
                            onChange={(val) => { setFormDetails({ ...formDetails, curriculum: val }) }}
                            options={curriculum}
                            placeholder={userType === 'parent' ? "Select student's curriculum" : "Select your curriculum"}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 8 ? formDetails.curriculum != "" && formDetails.curriculum != undefined ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                          </Form.Text></> : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                          <Form.Control
                            onFocus={() => { currentField < 9 ? setCurrentField(9) : null }}
                            className={submitClicked || currentField > 9 ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null : styles.requiredCss : null}

                            // style={submitClicked ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null : { border: '1px solid red ' } : null} 
                            onChange={(e) => { setFormDetails({ ...formDetails, firstName2: e.target.value }) }}
                            type="text"
                            value={formDetails.firstName2}
                            placeholder={userType === 'parent' ? "Student name" : "Parent name"} />
                          {submitClicked || currentField > 9 ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null :
                            <><Form.Text className="text-muted custom-text-alrt" style={{
                              color: 'red!important',
                              letterSpacing: '0.03rem'
                            }}>
                              <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                            </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formBasicEmail"
                          // style={submitClicked ? formDetails.phone2 != "" && formDetails.phone2 != undefined ? null : { border: '1px solid red ' } : null}
                          onFocus={() => { currentField < 10 ? setCurrentField(10) : null }}
                          className={submitClicked || currentField > 10 ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null) ? "mb-3 mt-3" : "mb-3 mt-3 " + styles.requiredCss : "mb-3 mt-3"}
                        >
                          {/* <Form.Control style={submitClicked ? formDetails.phone2 != "" && formDetails.phone2 != undefined ? null : { border: '1px solid red ' } : null} onChange={(e) => { setFormDetails({ ...formDetails, phone2: e.target.value }) }} type="text" placeholder={userType === 'parent' ? "Student Phone" : "Parent Phone"} /> */}
                          <PhoneInput
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: true,
                            }}
                            defaultCountry="IN"
                            placeholder={userType === 'parent' ? "Student phone" : "Parent phone"}
                            onChange={(e) => { setFormDetails({ ...formDetails, phone2: e }) }}
                            value={formDetails.phone2}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 10 ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null) ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                            {(formDetails.phone2 == formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null) ? " Student's and parent's phone cannot be the same" : ' This field is required'}
                          </Form.Text></> : null}
                      </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="width-100 text-center"
                      >
                        {isSubmitting ? <Spinner animation="border" role="status" disabled></Spinner> :
                          <Button
                            variant="primary"
                            onClick={onSubmitEventRegistration}
                            className={styles.regProceedButton}>
                            Proceed
                          </Button>
                        }
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
        <AlertModal show={showAlert} title={alertHeader} message={alertBody} type={alertColor} />
      </Fragment>
    </Fragment>
  )
}

export default UserMandatoryField
