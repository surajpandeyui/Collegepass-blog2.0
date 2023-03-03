import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import Autosuggest from 'react-autosuggest'
import { APIgetAllCities, APIeventRegistrationNew, APISendOTP, APIVerifyOtp, APIGetUserByPhone } from '../../config/API'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Select from 'react-select';
import { loadUser } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import styles from './modal.module.scss';
// import PhoneInput from "react-phone-input-2";
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import OtpInput from 'react-otp-input';
import dynamic from 'next/dynamic'
const AlertModal = dynamic(() => import('./AlertModal'))
// import { useInsertionEffect } from 'react'
// import { setAlert } from '../../actions/alertActions'
// import NewLandingScreen from '../../screens/NewLandingScreen';

const EventRegistration = ({ show = false, handleClose, eventDetails }) => {

  const [userType, setuserType] = useState('student')


  const dispatch = useDispatch()
  useEffect(() => {
    // console.log("Registration")

  }, [])
  // Imagine you have a list of languages that you'd like to autosuggest.
  // console.log("=====>",eventDetails)
  const router = useRouter()

  const [showAlert, setAlert] = useState(false)
  const [alertColor, seAlertColor] = useState('success')
  const [alertHeader, setAlertHeader] = useState('Successfully submitted')
  const [alertBody, setAlertBody] = useState('Your query has been successfully submitted')
  const [allCities, setAllCities] = useState([])
  const [currentField, setCurrentField] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitClicked, setsubmitClicked] = useState(false)
  const [submitted, setsubmitted] = useState(false)
  const [message, setmessage] = useState('')
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [isVerified, setisVerified] = useState(true) // false (default)
  const [showResendButton, setShowResendButton] = useState(false)
  const [isVerifying, setisVerifying] = useState(false)
  const [counter, setCounter] = useState(null)
  const [OTP, setOTP] = useState('')
  const [value, setValue] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [otpError, setOtpError] = useState('')
	const [phoneNumberError, setPhoneNumberError] = useState('')
  const [emailDisabled, setEmailDisabled] = useState(false)
  const [phoneDisabled, setPhoneDisabled] = useState(false)
  const [formDetails, setFormDetails] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    grade: '',
    curriculum: '',
    school_name: '',
    COI: '',
    city: '',
    userType: 'student',
    firstName2: '',
    lastName2: '',
    city: '',
    phone2: ''
  })
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


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

  useEffect(() => {
    // setisVerified(false)
    if(formDetails.phoneNumber?.length>2)
    if(parsePhoneNumber(formDetails.phoneNumber)?.country=="IN"){
			if (formDetails.phoneNumber.length - parsePhoneNumber(formDetails.phoneNumber)?.countryCallingCode.length > 10) {
				setButtonDisabled(false)
			  }
			  else
				setButtonDisabled(true)
		}
		else{
			if (formDetails.phoneNumber.length - parsePhoneNumber(formDetails.phoneNumber)?.countryCallingCode.length > 8) {
				setButtonDisabled(false)
			  }
			  else
				setButtonDisabled(true)
		}
  }, [formDetails.phoneNumber])

  // useEffect(() => {
    // console.log("submitClicked")
    // console.log(formDetails)
  // }, [submitClicked])
  // useEffect(() => {
    // console.log("changess", formDetails)

  // }, [formDetails])

  useEffect(() => {
    setFormDetails({ ...formDetails, COI: selectedOption?.map(val => val.value) })
  }, [selectedOption])

  useEffect(() => {
    if (userType) {
      setFormDetails({ ...formDetails, userType: userType })
    }
  }, [userType])

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


  const getAllProfileData = async(phone)=>{
    // console.log("calling profile data")
    const userDetailsByPhone = await axios.post( `${APIGetUserByPhone}` ,{
      phone:phone.substr(phone.length - 10)
    })
    // console.log("userDetailsByPhone",userDetailsByPhone)
    if(userDetailsByPhone?.data?.message)
    {
      // console.log("inside if")
      const temp = userDetailsByPhone?.data?.message?.userDetails
      const usercountries = userDetailsByPhone?.data?.message?.userInterest.map(item => String(item.TAG_ID))
      formDetails.COI= usercountries
      temp.CITY?formDetails.city= temp.CITY:null
      temp.CURRICULUM?formDetails.curriculum= curriculum.find(val => val.value.toString() == temp.CURRICULUM.toString()):null
      temp.EMAIL?formDetails.email= temp.EMAIL:null
      setEmailDisabled(true)
      // setPhoneDisabled(true)
      temp.FIRSTNAME2?formDetails.firstName2= temp.FIRSTNAME2:null
      temp.GRADE?formDetails.grade= grades.find(val => val.value.toString() == temp.GRADE.toString()):null
      temp.LASTNAME?formDetails.lastName= temp.LASTNAME:null
      temp.LASTNAME2?formDetails.lastName2= temp.LASTNAME2:null
      temp.FIRSTNAME?formDetails.name= temp.FIRSTNAME:null
      temp.PHONENUMBER2?formDetails.phone2= temp.PHONENUMBER2:null
      temp.SCHOOL?formDetails.school_name= temp.SCHOOL:null
      temp.USERTYPE?formDetails.userType= temp.USERTYPE == 1? 'student':'parent':null
      setSelectedOption(countries?.filter((item) => {
        if (usercountries.includes(String(item.value)))
          return (item)
      }
      ))
      setValue(findCityName(parseInt(temp.CITY)))
    }
  }
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
          `${APIVerifyOtp}${OTP}/${formDetails.phoneNumber}`,
          config
        );
        // console.log(otp_result)
        if (otp_result.data.status == true) {
          // console.log("retrieving all data")
          getAllProfileData(formDetails.phoneNumber)
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
          setAlertHeader('Wrong!')
          setAlertBody('Woring OTP. Please enter  the correct OTP')
        }
      }
      catch (err) {
        // setAlert(true)
        setOtpError('Some error occured. Please try again after some time')
        seAlertColor('danger')
        setAlertHeader('Oh snap! You got an error!')
        setAlertBody('Something Went Wrong. Please try Again')
      }
    }
    else {
      setisVerifying(false)
      // setAlert(true)
      setOtpError('Please enter an OTP')
      seAlertColor('danger')
      setAlertHeader('Empty!')
      setAlertBody('Please enter an OTP')
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
          `${APISendOTP}${phone}/${via}/null`,
        config
      );
      // console.log('result sendotp', localStorage.user)

      if (otp_result.status === 200 && !otp_result.data.verified) {

        setCounter(30);
        setShowVerifyOTP(true)
        setCounter(30);
        handleShow2()
        setPhoneNumberError('')

      }
      // else if(otp_result.status === 200 && otp_result.data.verified)
      // {
      // 	// setShowVerifyOTP(true)
      // 	setisVerifying(false)
      //   alert("Phone number already in Use!! Please login with your phone number or use another number");
      // } 
      else if (otp_result.status === 200 && otp_result.data.verified && otp_result.data.correct_user) {
        
        setShowVerifyOTP(true)
        setisVerifying(false)
        setisVerified(true)
        setPhoneNumberError('')
        // seAlertColor('danger')
        // setAlertHeader('Phone number already in Use!!')
        // setAlertBody('Please login with your correct phone number or use another number')
      }
      else if (otp_result.status === 200 && otp_result.data.verified && !otp_result.data.correct_user) {
        setShowVerifyOTP(false)
        setisVerifying(false)
        setisVerified(false)
        // setAlert(true)
        setPhoneNumberError('Phone number already in use')
        seAlertColor('danger')
        setAlertHeader('Phone number already in Use!!')
        setAlertBody('Please login with your correct phone number or use another number')
      }
      else {
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
      //   setAlertBody('Something Went Wrong. Please try Again');
      // }


      if(error?.response?.data?.errors)
				setPhoneNumberError(error?.response?.data?.errors[0]?.msg)
			else
			setPhoneNumberError('Something Went Wrong. Please try Again')
    }
  };





  const onClickOTPSMS = async (e) => {
    // console.log("clicked")
    if (showResendButton)
      setShowResendButton(false)
    var error_check = formDetails.phoneNumber == null || formDetails.phoneNumber == '' || formDetails.phoneNumber == undefined || formDetails.phoneNumber == [];

    if (error_check === false) {
      sendOTP(formDetails.phoneNumber, "sms");
    }
  };
  //----------------------------------OTP functions end-----------------------------------------
  useEffect(() => {
    const getAllCities = async () => {
      const result = await axios.get(APIgetAllCities)
      setAllCities(result.data.cities)
    }
    getAllCities()
  }, [])
  useEffect(() => {

    // console.log("this is", value)
    if (value) {
      // console.log("changing value", findCityID(value))
      setFormDetails({ ...formDetails, city: findCityID(value)?.id })
    }
  }, [value])
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


  const onChangeForm = (e) => {
    // console.log(e.target.value)
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    // console.log(formDetails)
  }
  const [showSuccess, setShowSuccess] = useState(false)
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    // console.log("console.log", auth)
    if (auth.userDetails !== null && auth.userDetails !== undefined && auth.countries && auth.countries !== undefined) {
      const ids = auth?.countries?.map(item => String(item.TAG_ID))
      setFormDetails({
        ...formDetails,
        name:
          auth.userDetails.FIRSTNAME !== undefined
            ? auth.userDetails?.FIRSTNAME
            : '',
        phoneNumber: auth.userDetails.PHONENUMBER,
        grade: grades.find(item => item.value == auth.userDetails.GRADE),
        curriculum: curriculum.find(item => item.value == auth.userDetails.CURRICULUM),
        email: auth.user ? auth.user : '',
        school_name: auth.userDetails?.SCHOOL,
        city: parseInt(auth.userDetails?.CITY),
        lastName: auth.userDetails.LASTNAME !== undefined
          ? auth.userDetails?.LASTNAME
          : '',
        firstName2: auth.userDetails.FIRSTNAME2 !== undefined
          ? `${auth.userDetails?.FIRSTNAME2}`
          : '',
        lastName2: auth.userDetails.LASTNAME2 !== undefined
          ? `${auth.userDetails?.LASTNAME2}`
          : '',
        phone2: auth.userDetails.PHONENUMBER2,
        COI: auth.countries.map(item => String(item.TAG_ID))


      })
      auth.user?setEmailDisabled(true):null
      setSelectedOption(countries?.filter((item) => {
        if (ids.includes(String(item.value)))
          return (item)
      }
      ))
      setValue(findCityName(parseInt(auth.userDetails.CITY)))
    }
  }, [auth])


  const isNullish = (target) => {
    for (var member in target) {
      if (target[member] == null || target[member] == '' || target[member] == undefined || target[member] == [])
        return true;
    }
    return false;
  }

  const onSubmitEventRegistration = async () => {
    setsubmitted(true)
    setsubmitClicked(true)

    if(!isVerified)
    {
      setsubmitted(false)
      setPhoneNumberError('Please verify your phone number')
      // setmessage('Please verify phone number')
        // setShowSuccess(true)
      return 
    }
    if (isNullish(formDetails)) {
      setsubmitted(false)
    }
    if (formDetails.phone2 == formDetails.phoneNumber) {
			return
		}
    try {
      if (formDetails.email && formDetails.name && formDetails.grade && formDetails.phoneNumber && formDetails.curriculum &&
        formDetails.school_name && formDetails.city) {
        let apiBody = {
          email: formDetails.email,
          eventID: eventDetails.ID,
          eventName: eventDetails.NAME,
          firstName: formDetails.name,
          lastName: formDetails.lastName,
          grade: formDetails.grade?.value,
          countryCode: parsePhoneNumber(formDetails.phoneNumber).countryCallingCode,
          phone: formDetails.phoneNumber,
          city: formDetails.city,
          school_name: formDetails.school_name,
          curriculum: formDetails.curriculum?.value,
          countriesOfInterest: formDetails.COI,
          firstName2: formDetails.firstName2,
          lastName2: formDetails.lastName2,
          userType: formDetails.userType,
          phone2: formDetails.phone2
        }

        // console.log('apiBody', apiBody)
        setsubmitted(true)
        // return
        const registerEventDetails = await axios.post(APIeventRegistrationNew, apiBody)
        // console.log(registerEventDetails)
        if (registerEventDetails.data.statusCode === 200) {
          handleClose()
          dispatch(loadUser())
          setShowSuccess(false)
          router.push(`/event-registration-success/${eventDetails.ZOOMID}`)

        }
        else {
          setsubmitted(false)
        }
      }
      else {
        setsubmitted(false)
        setShowSuccess(false)
        setmessage('Please fill the entire form')
        setShowSuccess(true)
        // console.log("Data not  filled")
      }
    }
    catch (err) {
      // console.log(err)
      setShowSuccess(false)
      setmessage('Something went wrong')
      setShowSuccess(true)
      setsubmitted(false)
    }
  }
  return (


    <div>
      <Modal show={show} onHide={handleClose} className="reg-form-modal mandatory">
        <Modal.Header closeButton>
          <Modal.Title>Event Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-0'>
          <Row className="sidemodal">
            <Col className={styles.regModalFormNew}>
              <Row>
                <Col className={styles.studentParent}>
                  <p>I'm a...</p>
                  <Button className={userType === 'student' ? styles.student : styles.parent} onClick={() => { setuserType('student') }}>Student</Button>
                  <Button className={userType === 'parent' ? styles.student : styles.parent} onClick={() => { setuserType('parent') }}>Parent</Button>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <Form className="mandatory-form">
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-4" controlId="formBasicName">
                          <Form.Control
                            onFocus={() => { currentField < 1 ? setCurrentField(1) : null }}
                            className={submitClicked || currentField > 1 ? formDetails.name != "" && formDetails.name != undefined ? null : styles.requiredCss : null}
                            // onChange={(e) => { setformDetails({ ...formDetails, school: e.target.value }) }} 
                            type="text"
                            placeholder={"Enter your first name"}

                            name="name"
                            value={formDetails.name}
                            onChange={onChangeForm}
                            style={submitClicked ? formDetails.name != '' ? null : { border: '1px solid red' } : null}
                          // style={{border: '1px solid red'}}

                          // required
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
                        <Form.Group className="mb-4" controlId="formBasicPhone">
                          <Form.Control
                            onFocus={() => { currentField < 2 ? setCurrentField(2) : null }}
                            className={submitClicked || currentField > 2 ? formDetails.lastName != "" && formDetails.lastName != undefined ? null : styles.requiredCss : null}
                            type="text"
                            placeholder={"Enter your last name"}
                            value={formDetails.lastName}
                            name="lastName"
                            onChange={onChangeForm}
                            style={submitClicked ? formDetails.lastName != '' ? null : { border: '1px solid red' } : null}
                          // required
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
                    <Row>
                      <Col>
                        <Form.Group className="mb-4" controlId="formBasicPhone" >
                          <Form.Control
                          disabled = {emailDisabled}
                            placeholder='Enter your email'
                            onFocus={() => { currentField < 3 ? setCurrentField(3) : null }}
                            className={submitClicked || currentField > 3 ? formDetails.email != "" && formDetails.email != undefined ? null : styles.requiredCss : null}
                            type="email"
                            name="email"
                            value={formDetails.email}
                            onChange={onChangeForm}
                            style={submitClicked ? formDetails.email != '' ? null : { border: '1px solid red' } : null}

                          />
                          {submitClicked || currentField > 3 ? formDetails.name != "" && formDetails.name != undefined ? null :
                            <><Form.Text className="text-muted custom-text-alrt" style={{
                              color: 'red!important',
                              letterSpacing: '0.03rem'
                            }}>
                              <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                            </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group
                          // className="mb-4 mt-3" 
                          controlId="formBasicEmail"
                          onFocus={() => { currentField < 4 ? setCurrentField(4) : null }} className={phoneNumberError != '' || submitClicked || currentField > 4 ? (formDetails.phoneNumber != "" && formDetails.phoneNumber != undefined) && phoneNumberError == '' ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-4"}>
                          {/* <Form.Control onChange={(e) => { setformDetails({ ...formDetails, phone: e.target.value }) }} type="text" placeholder="Phone" /> */}
                          <PhoneInput
                          disabled = {phoneDisabled}
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
                        {phoneNumberError != '' || submitClicked || currentField > 4 ? (formDetails.phoneNumber != "" && formDetails.phoneNumber != undefined) && phoneNumberError == '' ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> {phoneNumberError !=''?phoneNumberError:'This field is required'}
                          </Form.Text></> : null}
                      </Col>
                      {/* <Col lg={6} md={6} sm={12} xs={12}> */}
                        {/* onClick={onClickOTPSMS} */}
                        {/* <div */}
                         {/* className={submitClicked || currentField > 4 ? formDetails.phoneNumber != "" && formDetails.phoneNumber != undefined ? "mb-3" : "mb-3 " : "mb-4"}> */}
                        {/* {!showVerifyOTP ? <Button className={styles.verifyOtp} disabled={buttonDisabled} onClick={() => { onClickOTPSMS() }}>Get OTP</Button> : */}
                          {/* isVerified ? <p className={styles.verifiedTickMark} style={{
                            // color: "green",
                            // paddingTop: '4%',
                            // fontSize: '20px',
                            // fontWeight: '600',
                            // letterSpacing: '0.03rem'
                          // }}>Otp verified <i className="fa fa-check-circle" aria-hidden="true"></i></p> :
                            // show2 ? <Spinner animation="border" role="status" style={{ color: "green" }} disabled></Spinner> : <Button className={styles.verifyOtp} onClick={() => { onClickOTPSMS() }}>Verify with OTP</Button>
                        // }
                        {/* </div> */}
                      {/* </Col> */}
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
																		color: '#ff3031',
																		padding: '10px 0px 0px 0px',
																		opacity: '10'
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
                              <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">{
                                isVerifying ? <Spinner animation="border" role="status" disabled></Spinner> :
                                  <Button onClick={() => { verifyOTP() }}>Verify & Proceed</Button>
                              }
                              </Form.Group>
                            </Col>
                          </Row>
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className={submitClicked || currentField > 5 ? formDetails.grade != '' && formDetails.grade != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-4"} controlId="formBasicPhone">
                          <Select
                            // style={customStyles}
                            onFocus={() => { currentField < 5 ? setCurrentField(5) : null }}
                            // defaultValue={formDetails.grade}
                            value={formDetails.grade}
                            name="grade"
                            onChange={(val) => { setFormDetails({ ...formDetails, grade: val }) }}
                            options={grades}
                            placeholder={userType === 'parent' ? "Select student's grade/year" : "Select your grade/year"}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 5 ? formDetails.grade != "" && formDetails.grade != undefined ? null :
                          <><Form.Text className="text-muted custom-text-alrt diff-class" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                          </Form.Text></> : null}
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className={submitClicked || currentField > 6 ? formDetails.curriculum != '' && formDetails.curriculum != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-4"}>
                          {/* <Form.Select
                          className="mb-4"
                          aria-label="Default select example"
                          // disabled={auth.isAuthenticated}
                          name="curriculum"
                          value={formDetails.curriculum}
                          onChange={onChangeForm}
                          style={submitClicked?formDetails.curriculum != '' && formDetails.curriculum != undefined? null:{border: '1px solid red'}:null}
                        // required
                        >
                          <option>Select Curriculum</option>
                          <option value="1">IGCSE</option>
                          <option value="2">IB</option>
                          <option value="3">CBSE</option>
                          <option value="4">ICSE</option>
                          <option value="5">STATE BOARD</option>
                          <option value="6">CAIE</option>
                          <option value="7">UNDERGRADUATE/DEGREE</option>
                        </Form.Select> */}
                          <Select
                            // style={customStyles}
                            onFocus={() => { currentField < 6 ? setCurrentField(6) : null }}
                            // defaultValue={formDetails.curriculum}
                            value={formDetails.curriculum}
                            name="curriculum"
                            onChange={(val) => { setFormDetails({ ...formDetails, curriculum: val }) }}
                            options={curriculum}
                            placeholder={userType === 'parent' ? "Select student's curriculum" : "Select your curriculum"}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 6 ? formDetails.curriculum != "" && formDetails.curriculum != undefined ? null :
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
                        <Form.Group
                        
                        onFocus={() => { currentField < 7 ? setCurrentField(7) : null }}
                        className={submitClicked || currentField > 7 ? formDetails.city != "" && formDetails.city != undefined ? "mb-4" : styles.requiredCss : "mb-4"}
                      >
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
                        </Form.Group>
                        
                      {submitClicked || currentField > 7 ? formDetails.city != "" && formDetails.city != undefined ? null :
                        <><Form.Text className="text-muted custom-text-alrt" style={{
                          color: 'red!important',
                          letterSpacing: '0.03rem'
                        }}>
                          <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                        </Form.Text></> : null}
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-4" controlId="formBasicName">
                          <Form.Control
                            onFocus={() => { currentField < 8 ? setCurrentField(8) : null }}
                            className={submitClicked || currentField > 8 ? formDetails.school_name != "" && formDetails.school_name != undefined ? null : styles.requiredCss : null}
                            type="text"
                            placeholder={userType === 'parent' ? "Enter your student's school name" : "Enter your school name"}
                            name="school_name"
                            value={formDetails.school_name}
                            onChange={onChangeForm}
                            style={submitClicked ? formDetails.school_name != '' && formDetails.school_name != undefined ? null : { border: '1px solid red' } : null}
                          // required
                          />
                          {submitClicked || currentField > 8 ?
                            formDetails.school_name != "" && formDetails.school_name != undefined ? null :
                              <><Form.Text className="text-muted custom-text-alrt" style={{
                                color: 'red!important',
                                letterSpacing: '0.03rem'
                              }}>
                                <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                              </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {/*<Select
                        onChange={setSelectedOption}
                        options={options}
                        isMulti
                        placeholder = "Countries of interest"
                        className="mb-3"
                      >
                      </Select>*/}
                        <Form.Group
                          className={submitClicked || currentField > 9 ? formDetails.COI != [] && formDetails.COI != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-4"}>

                          <Select
                            onFocus={() => { currentField < 9 ? setCurrentField(9) : null }}
                            // defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={countries}
                            isMulti={true}
                            placeholder={'Countries of interest'}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 9 ?
                          formDetails.COI != [] && formDetails.COI != undefined ? null :
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            onFocus={() => { currentField < 10 ? setCurrentField(10) : null }}
                            className={submitClicked || currentField > 10 ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null : styles.requiredCss : null}
                            onChange={(e) => { setFormDetails({ ...formDetails, firstName2: e.target.value }) }}
                            type="text"
                            placeholder={userType === 'parent' ? "Student name" : "Parent name"}
                            value={formDetails.firstName2} />
                          {submitClicked || currentField > 10 ?
                            formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null :
                              <><Form.Text className="text-muted custom-text-alrt" style={{
                                color: 'red!important',
                                letterSpacing: '0.03rem'
                              }}>
                                <i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
                              </Form.Text></> : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group
                          //  className="mb-3"
                          controlId="formBasicEmail"
                          onFocus={() => { currentField < 11 ? setCurrentField(11) : null }}
                          className={submitClicked || currentField > 11 ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null) ? "mb-3" : styles.requiredCss : "mb-3"}
                        >
                          {/* <Form.Control
                        style={submitClicked?formDetails.lastName2 != '' ? null:{border: '1px solid red'}:null} 
                        onChange={(e) => { setFormDetails({ ...formDetails, lastName2: e.target.value }) }} type="text" placeholder={userType === 'parent' ? "Student Phone" : "Parent Phone"} /> */}
                          <PhoneInput
                            inputProps={{
                              name: "phone2",
                              required: true,
                              autoFocus: true,
                            }}
                            defaultCountry="IN"
                            countries={['IN', 'HK', 'US', 'GB', 'NZ']}
                            onChange={(e) => { setFormDetails({ ...formDetails, phone2: e }) }}
                            value={formDetails.phone2
                            }
                            placeholder={userType === 'parent' ? "Student phone" : "Parent phone"}
                          // containerClass={phoneNumberError}
                          />
                        </Form.Group>
                        {submitClicked || currentField > 11 ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null)? null :
                          <><Form.Text className="text-muted custom-text-alrt" style={{
                            color: 'red!important',
                            letterSpacing: '0.03rem'
                          }}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i> 
                            {(formDetails.phone2 == formDetails.phoneNumber && formDetails.phone2 != '' && formDetails.phone2 != null) ?" Student's and parent's phone cannot be the same" :' This field is required'}
                          </Form.Text></> : null}
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control type="text" placeholder="Student Name" />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control type="text" placeholder="Student phone" />
                        </Form.Group> 
                      </Col>
                    </Row> */}



                    <br />

                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="width-100 text-center"
                      >
                        {/* <p className='sp-loadbar sp'></p> */}
                        {

                          submitted ? <><Button variant="primary" className="ml-2"

                            style={{
                              marginLeft: '10px',
                              width: '100px',
                              background: '#c83232',
                              border: 'none',
                              float: 'right',
                            }}
                            disabled><Spinner animation="border" /></Button></> : <><Button
                              className={styles.proceedRegistration}
                              variant="primary"
                              onClick={() => {
                                onSubmitEventRegistration()
                              }}>
                              Submit
                            </Button></>
                        }
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* <Modal
        show={showSuccess}
        onHide={() => {
          setShowSuccess(false)
        }}
        className="mandatory"
      >
        <Row className="sidemodal">
          <Col
            style={{
              padding: '25px',
            }}
          >
            <Row>
              <Col className="width-100 text-center">
                <Image
                  src="https://www.collegepass.org/static/media/BHolo.620492e7.jpeg"
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
                    fontWeight: '700',
                    lineHeight: '1.25',
                    fontSize: '1.4rem',
                    color: '#c83232',
                  }}
                >
                  {`Successfully Registered for the event - ${eventDetails.NAME}!`}
                </h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal> */}

      <Modal
        show={showSuccess}
        onHide={() => {
          setShowSuccess(false)
        }}
        className="mandatory"
      >
        <Row className="sidemodal">
          <Col
            style={{
              padding: '15px',
              textAlign: 'center'
            }}
          >
            <p style={{
              letterSpacing: '0.03rem',
              fontSize: '22px',
              fontWeight: '600',
              color: '#c83232',
              marginBottom: '0'
            }}>{message}</p>
          </Col>
        </Row>
      </Modal>
      <AlertModal show={showAlert} title={alertHeader} message={alertBody} type={alertColor} />
    </div>

  )
}

export default EventRegistration
