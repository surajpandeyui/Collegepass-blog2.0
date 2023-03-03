import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner, Modal, Alert, Toast } from 'react-bootstrap';
import styles from './contact.module.scss'
import Select from 'react-select'
import Accordion from 'react-bootstrap/Accordion';
// import PhoneInput from "react-phone-input-2";
import 'react-phone-number-input/style.css'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
// import parsePhoneNumber from 'react-phone-number-input/parsePhoneNumber'
import OtpInput from 'react-otp-input';
import Image from 'next/image'
import Autosuggest from 'react-autosuggest'
import { APIgetAllCities, APISendOTP, APIVerifyOtp, APIcaptureContactUsDetails } from '../../config/API'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import Router from 'next/router'
// import 'react-phone-input-2/lib/style.css'
// import { valueTernary } from "react-select/dist/declarations/src/utils";
const LoginModal = dynamic(() => import('../../components/Modal/LoginModal'))
const AlertModal = dynamic(() => import('../../components/Modal/AlertModal'))

const ContactScreen = ({ choice }) => {


	// title = { alertTitle } message = { alertMessage } type = { alertType }
	//alert states
	// const [alert, setAlert] = useState(false)
	const [showAlert, setAlert] = useState(false)
	const [alertColor, seAlertColor] = useState('success')
	const [alertHeader, setAlertHeader] = useState('Successfully submitted')
	const [alertBody, setAlertBody] = useState('Your query has been successfully submitted')
	const [showAlertSuccess, setShowAlertSuccess] = useState(false)
	const [otpError, setOtpError] = useState('')
	const handleCloseAlertSuccess = () => setShowAlertSuccess(false);
	const handleShowAlertSuccess = () => setShowAlertSuccess(true);

	const [showAlertError, setShowAlertError] = useState(false)
	const handleCloseAlertError = () => setShowAlertError(false);
	const handleShowAlertError = () => setShowAlertError(true);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [showLogin, setShowLogin] = useState(false)
	const handleCloseLogin = () => setShowLogin(false)
	const handleShowLogin = () => setShowLogin(true)
	const auth = useSelector((state) => state.auth)


	//consts
	const css = { border: '1px solid rgb(227 204 128)' }
	// const requiredCss = {
	// 	border: '2px solid #FF3031 ! important',
	// 		background: '#FFF1F4 ! important'
	// 	}
	const options = [
		{ value: '3', label: 'USA' },
		{ value: '2', label: 'UK' },
		{ value: '4', label: 'Canada' },
		{ value: '9', label: 'Australia/New Zealand' },
		{ value: '6', label: 'Singapore' },
		{ value: '11', label: 'Hong Kong' },
		{ value: '73', label: 'Other' }
	];
	const options2 = [
		{ value: '1', label: 'Grade 8' },
		{ value: '2', label: 'Grade 9' },
		{ value: '3', label: 'Grade 10' },
		{ value: '4', label: 'Grade 11' },
		{ value: '5', label: 'Grade 12' },
		{ value: '8', label: 'In College' },
		{ value: '9', label: 'Graduated' },
		{ value: '7', label: 'Others' }
	];
	const WorkExp = [
		{ value: "Less than 2 years", label: "Less than 2 years" },
		{ value: "2-5 years", label: "2-5 years" },
		{ value: "6 - 8 years", label: "6 - 8 years" },
		{ value: "9 - 12 years", label: "9 - 12 years" }
	]

	const TargetMba = [
		{ value: "2023", label: "2023" },
		{ value: "2024", label: "2024" }
	]

	const interests = ['Undergraduate Admissions Advising', 'Sat tutoring', 'Curriculum Tutoring', 'MS Admissions Advising', 'MBA Essay Editing']

	//  States




	const [workExp, setWorkExp] = useState(null)
	const [targetMba, setTargetMba] = useState(null)
	const [userType, setuserType] = useState('student')
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedGrade, setSelectedGrade] = useState(null)
	const [value, setValue] = useState('')
	const [suggestion, setSuggestion] = useState([])
	const [alertText, setAlertText] = useState(false)
	const [interest, setInterest] = useState({ id: 1, title: 'Undergraduate Admissions Advising' })
	const [showVerifyOTP, setShowVerifyOTP] = useState(false)
	const [showResendButton, setShowResendButton] = useState(false)
	const [counter, setCounter] = useState(null)
	const [isVerified, setisVerified] = useState(true) // false(default)
	const [isVerifying, setisVerifying] = useState(false)
	const [OTP, setOTP] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitClicked, setsubmitClicked] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isMsUser, setIsMsUser] = useState(false)
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [currentField, setCurrentField] = useState(0)
	const [phoneNumberError, setPhoneNumberError] = useState('')

	// const [showPhoneNumberError, setShowPhoneNumberError] = useState()
	const [formDetails, setformDetails] = useState({
		userType: 'student',
		school: '',
		grade: '',
		countries: [],
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		city: '',
		firstName2: '',
		lastName2: '',
		phone2: '',
		interest: 'Undergraduate Admissions Advising',
		enquiry: '',
		// workExp: '',
		// TargetMba: ''
	})

	/*useEffect(() => {
		console.log("Alert clicked",showAlert)
		if (showAlert){
			console.log('setting timeout')
			setTimeout(() => {
				setAlert(false)
			}, 5000)
		}
	}, [showAlert])*/
	useEffect(() => {
		if (choice && choice >= 1 && choice <= 5) {
			setInterest({ id: parseInt(choice), title: interests[parseInt(choice) - 1] })
		}
	}, [choice])


	// UseEffects
	useEffect(() => {
		// setisVerified(false)
		if (formDetails.phone?.length > 2)
			if (parsePhoneNumber(formDetails.phone)?.country == "IN") {
				if (formDetails.phone.length - parsePhoneNumber(formDetails.phone)?.countryCallingCode.length > 10) {
					setButtonDisabled(false)
				}
				else
					setButtonDisabled(true)
			}
			else {
				if (formDetails.phone.length - parsePhoneNumber(formDetails.phone)?.countryCallingCode.length > 8) {
					setButtonDisabled(false)
				}
				else
					setButtonDisabled(true)
			}
		else {
			setButtonDisabled(true)
		}


	}, [formDetails.phone])

	useEffect(() => {
		if (interest.id >= 4) {
			setIsMsUser(true)
		}
		else {
			setIsMsUser(false)
		}
	}, [interest])

	// useEffect(() => {
	// 	console.log("submit clicked", submitClicked)
	// }, [submitClicked])
	useEffect(() => {
		console.log(formDetails)
	}, [formDetails])

	useEffect(() => {
		setformDetails({ ...formDetails, grade: selectedGrade?.value })
	}, [selectedGrade])

	useEffect(() => {
		if (userType) {
			setformDetails({ ...formDetails, userType: userType })
		}
	}, [userType])


	useEffect(() => {
		if (interest) {
			setformDetails({ ...formDetails, interest: interest.title })
		}
	}, [interest])

	useEffect(() => {
		if (value) {
			setformDetails({ ...formDetails, city: findCityID(value)?.id })
		}
	}, [value])

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

	useEffect(() => {
		setformDetails({ ...formDetails, countries: selectedOption?.map(val => val.value) })
	}, [selectedOption])
	//Auto suggests
	const [allCities, setAllCities] = useState([])
	useEffect(() => {
		const getAllCities = async () => {
			const result = await axios.get(APIgetAllCities)
			setAllCities(result.data.cities)
		}
		getAllCities()
	}, [])

	// const checkNotFilled = ()=>{
	// 	if()
	// }



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
		// console.log(cityDetails)
		if (cityDetails !== null && cityDetails !== undefined) {
			return cityDetails.name
		} else {
			return ''
		}
	}
	//Autosuggest ends-------------------------------------------------
	//functions
	const checkEmail = (email) => {
		if (email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)) {
			setformDetails({ ...formDetails, email: email })
		}
	}

	const isNullish = (target) => {
		for (var member in target) {
			if ((target[member] == null || target[member] == '' || target[member] == undefined || target[member] == []) && member != 'lastName2' && member != 'enquiry') {
				if ((member == 'firstName2' || member == 'lastName2') && isMsUser) {
					return false
				}
				else
					return true;
			}

		}
		return false;
	}

	const formatData = () => {
		return ({ ...formDetails, countries: formDetails.countries.join(","), })
	}

	const submit = async (e) => {
		e.preventDefault()
		setsubmitClicked(true)
		setIsSubmitting(true)
		// console.log(isNullish(formDetails))

		if (isNullish(formDetails)) {
			setIsSubmitting(false)
			setAlertText(true)
			// console.log("nullish")
			/*setTimeout(() => {
				setAlertText(false)
			}, 5000)*/
			return
		}
		else if (formDetails.phone2 == formDetails.phone) {
			setIsSubmitting(false)
			setAlertText(true)
			return
		}
		else if (!isVerified) {
			// setAlert(true)
			setPhoneNumberError('Please verify your phone number')
			seAlertColor('warning')
			setAlertHeader('Phone number not Verified')
			setAlertBody('Please verify your phone number with OTP')
			setIsSubmitting(false)
			return
		}
		else {

			const body = formatData()
			// body.phone = parsePhoneNumber(formDetails.phone).nationalNumber
			body['countryCode'] = parsePhoneNumber(formDetails.phone).countryCallingCode
			// console.log(body)
			setIsSubmitting(true)
			const result = await axios.post(
				APIcaptureContactUsDetails,
				body
			);
			if (result.data.statusCode == 200) {
				setIsSubmitting(false)
				setIsSubmitted(true)
				let currentPath = window.location.pathname;
				// window.location.replace(currentPath + "/submit")
				Router.push(currentPath + "/submit")
			}
			else {
				setIsSubmitting(false)
			}
			// console.log("formatted", body)
			// console.log("not null")
		}
	}




	const verifyOTP = async () => {
		setisVerifying(true)
		if (OTP != '' && OTP) {

			const config = {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			};
			try {
				// console.log("sending request", `${APIVerifyOtp}${OTP}/+${formDetails.phone}`)
				const otp_result = await axios.get(
					`${APIVerifyOtp}${OTP}/${formDetails.phone}`,
					config
				);
				// console.log(otp_result)
				if (otp_result.data.status == true) {
					setisVerifying(false)
					setisVerified(true)
					handleClose()
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
				setisVerifying(false)
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
			setAlertHeader('Thats the wrong one!')
			setAlertBody('Please enter the correct OTP')
		}

	}

	const sendOTP = async (phone, via) => {
		const config = {
			headers: { Authorization: `Bearer ${localStorage.token}` },
		};
		try {
			const otp_result = await axios.get(
				localStorage.user ? `${APISendOTP}${phone}/${via}/${localStorage.user}` :
					`${APISendOTP}${phone}/${via}/null`,
				config
			);
			// console.log('result sendotp', otp_result)
			// console.log(otp_result)
			// if (otp_result.status === 200 && !otp_result.data.verified) {
			// 	setCounter(30);
			// 	setShowVerifyOTP(true)
			// 	setCounter(30);
			// 	handleShow()
			// }
			// else if (otp_result.status === 200 && otp_result.data.verified) {
			// 	setShowVerifyOTP(true)
			// 	setisVerifying(false)
			// 	setisVerified(true)
			// }

			if (otp_result.status === 200 && otp_result.data.verified && otp_result.data.correct_user) {
				setShowVerifyOTP(true)
				setisVerifying(false)
				setisVerified(true)
				setPhoneNumberError('')
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
			else if (otp_result.status === 200 && !otp_result.data.verified && !otp_result.data.correct_user) {
				// setisVerified(true)
				setPhoneNumberError('')
				setCounter(30);
				setShowVerifyOTP(true)
				setCounter(30);
				handleShow()
			}
			else {
				// setAlert(true)
				// setOtpError('Something Went Wrong. Please try Again')
				setPhoneNumberError('Something Went Wrong. Please try Again')
				seAlertColor('danger')
				setAlertHeader('Oh snap! You got an error!')
				setAlertBody('Something Went Wrong. Please try Again')
			}
		} catch (error) {
			// console.log(error.response.data.errors[0].msg)
			// setAlert(true)
			// setOtpError('Something Went Wrong. Please try Again')
			// setPhoneNumberError('Something Went Wrong. Please try Again')
			// seAlertColor('danger')
			// setAlertHeader('Oh snap! You got an error!')
			// setAlertBody('Something Went Wrong. Please try Again')
			if (error?.response?.data?.errors)
				setPhoneNumberError(error?.response?.data?.errors[0]?.msg)
			else
				setPhoneNumberError('Something Went Wrong. Please try Again')
			// if (error.response.status === 400) {
			// 	// setAlert(true)
			// 	setPhoneNumberError('Please login with your correct phone number or use another number')
			// 	seAlertColor('danger')
			// 	setAlertHeader('Phone number already in Use!!')
			// 	setAlertBody('Please login with your correct phone number or use another number')
			// } else {
			// 	// setAlert(true)
			// 	setPhoneNumberError('Something Went Wrong. Please try Again')
			// 	seAlertColor('danger')
			// 	setAlertHeader('Oh snap! You got an error!')
			// 	setAlertBody('Something Went Wrong. Please try Again')
			// }
		}
	};





	const onClickOTPSMS = async (e) => {
		if (e)
			e.preventDefault();
		// handleShow()
		// e.preventDefault();

		// // console.log(selectedCountries);

		// // console.log(selectedCountries.length);
		if (showResendButton)
			setShowResendButton(false)
		var error_check = formDetails.phone == null || formDetails.phone == '' || formDetails.phone == undefined || formDetails.phone == [];

		if (error_check === false) {
			sendOTP(formDetails.phone, "sms");
		}
		else {
			// setAlert(true)
			seAlertColor('warning')
			setAlertHeader('Please Enter Mobile Number')
			setAlertBody('No mobile number found')
		}
	};

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			border: '2px solid pink',
			color: state.isSelected ? 'green' : 'white',
			padding: 20,
		}),
		control: () => ({
			// none of react-select's styles are passed to <Control />
			width: 200,
		}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';

			return { ...provided, opacity, transition };
		}
	}

	return (
		<Fragment>
			{/* {alert && <Alert variant={alertColor} onClose={() => setAlert(false)} dismissible>
				<Alert.Heading>{alertHeader}</Alert.Heading>
				<p>
					{alertBody}
				</p>
			</Alert>
			} */}

			<Container fluid style={{
				backgroundColor: '#101010',
				color: '#ffffff',
				backgroundColor: '#101010',
				color: '#ffffff',
				backgroundImage: "url('/Contact_Us_Page_BG.jpg')",
				backgroundSize: 'cover',
				backgroundPosition: 'bottom'
			}}>
				<Container>
					<Row>
						<Col lg={6} md={8} sm={12} xs={12} className={styles.contactNew}>
							<Row>
								<Col className={styles.cHeading}>
									<h1>Contact Us</h1>
									{!auth.isAuthenticated && <p style={{
										fontSize: '20px'
									}}>Already a CollegePass user? <a href="#" onClick={() => { handleShowLogin() }} style={{
										color: 'rgb(227 204 128)'
									}}>Log In</a></p>}
									<p>Your path to the Ivy League/Oxbridge and other top colleges globally. Fill out the form below and a CollegePass Admissions Advisor will get in touch with you soon and show you how CollegePass can help you get into your dream college.</p>
								</Col>
							</Row>
							<Row>
								<Col className={styles.studentParent}>
									<p>I'm a...</p>
									<span>
										<Button className={userType === 'student' ? styles.student : styles.parent} onClick={() => { setuserType('student') }}>Student</Button>
										<Button className={userType === 'parent' ? styles.student : styles.parent} onClick={() => { setuserType('parent') }}>Parent</Button>
									</span>
								</Col>
							</Row>
							<Row>
								<Col className={styles.interestIN}>
									<h6 className={styles.title}>I'm interested in...</h6>
									<div className="d-flex">
										<p className={interest.id === 1 ? styles.selectedBorder : null}
											// style={interest.id === 1 ? css : null}
											onClick={() => { setInterest({ ...interest, id: 1, title: 'Undergraduate Admissions Advising' }) }}
										>
											<Image
												width="150"
												height="150"
												src="/contact-us-icons/Undergraduate Admissions Advising_00000.jpg"
												alt="White Holo"
											/>
										</p>
										<p
											className={interest.id === 2 ? styles.selectedBorder : null}
											// style={interest.id === 2 ? css : null}
											onClick={() => { setInterest({ ...interest, id: 2, title: 'Sat tutoring' }) }}
										>
											<Image
												width="150"
												height="150"
												src="/contact-us-icons/SAT Tutoring_00000.jpg"
												alt="White Holo"
											/>
										</p>
										<p
											className={interest.id === 3 ? styles.selectedBorder : null}
											// style={interest.id === 3 ? css : null}
											onClick={() => { setInterest({ ...interest, id: 3, title: 'Curriculum Tutoring' }) }}
										>
											<Image

												width="150"
												height="150"
												src="/contact-us-icons/Curriculum Tutoring_00000.jpg"
												alt="White Holo"
											/>
										</p>
									</div>
									<div className="d-flex">
										<p
											className={interest.id === 4 ? styles.selectedBorder : null}
											// style={interest.id === 4 ? css : null}
											onClick={() => { setInterest({ ...interest, id: 4, title: 'MS Admissions Advising' }) }}
										>
											<Image

												width="150"
												height="150"
												src="/contact-us-icons/MS Admissions Advising_00000.png"
												alt="White Holo"
											/>
										</p>
										<p
											className={interest.id === 5 ? styles.selectedBorder : null}
											onClick={() => { setInterest({ ...interest, id: 5, title: 'MBA Essay Editing' }) }}
										>
											<Image

												width="150"
												height="150"
												src="/contact-us-icons/MBA Essay Editing_00000.jpg"
												alt="White Holo"
											/>
										</p>
										<p className="visibility-hidden"
											onClick={() => { setInterest({ ...interest, id: 5, title: 'MBA Essay Editing' }) }}
										>
											<Image

												width="150"
												height="150"
												src="/contact-us-icons/MBA Essay Editing_00000.jpg"
												alt="White Holo"
											/>
										</p>
									</div>
									<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
										<Form.Control required onFocus={() => { currentField < 1 ? setCurrentField(1) : null }} className={submitClicked || currentField > 1 ? formDetails.school != "" && formDetails.school != undefined ? null : styles.requiredCss : null} onChange={(e) => { setformDetails({ ...formDetails, school: e.target.value }) }} type="text" placeholder={userType === 'parent' ? "Enter your child's school/college name" : "Enter your school/college name"} />
										{submitClicked || currentField > 1 ? formDetails.school != "" && formDetails.school != undefined ? null :
											<><Form.Text className="text-muted custom-text-alrt" style={{
												color: 'red!important',
												letterSpacing: '0.03rem'
											}}>
												<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
											</Form.Text></> : null}
									</Form.Group>
									{
									// interest?.id >= 4 
									true ? <><Form.Group controlId="formBasicEmail" onChange={(e) => { setformDetails({ ...formDetails, grade: e.target.value }) }} className={submitClicked || currentField > 2 ? formDetails.grade != "" && formDetails.grade != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-3"}>
										<Select
											onFocus={() => { currentField < 2 ? setCurrentField(2) : null }}
											style={customStyles}
											defaultValue={selectedGrade}
											onChange={setSelectedGrade}
											options={options2}
											placeholder={userType === 'parent' ? "Select your student's grade/year" : "Select your grade/year"}
										/>
										</Form.Group>
										{submitClicked || currentField > 2 ? formDetails.grade != "" && formDetails.grade != undefined ? null :
											<><Form.Text className="text-muted custom-text-alrt diff-class" style={{
												color: 'red!important',
												letterSpacing: '0.03rem'
											}}>
												<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
											</Form.Text></> : null}</>
										:
										<><Form.Group controlId="formBasicEmail" onChange={(e) => { setformDetails({ ...formDetails, workExp: e.target.value }) }} className={submitClicked || currentField > 2 ? formDetails.grade != "" && formDetails.grade != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-3"}>
											<Select
												onFocus={() => { currentField < 2 ? setCurrentField(2) : null }}
												style={customStyles}
												defaultValue={selectedGrade}
												onChange={setSelectedGrade}
												options={options2}
												placeholder={userType === 'parent' ? "Select your student's grade/year" : "Select your grade/year"}
											/>
											</Form.Group>
											{submitClicked || currentField > 2 ? formDetails.grade != "" && formDetails.grade != undefined ? null :
												<><Form.Text className="text-muted custom-text-alrt diff-class" style={{
													color: 'red!important',
													letterSpacing: '0.03rem'
												}}>
													<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
												</Form.Text></> : null}
										</>
									}

									<Form.Group controlId="formBasicEmail" className={submitClicked || currentField > 3 ? formDetails.countries != [] && formDetails.countries != undefined ? "mb-3" : "mb-3 " + styles.requiredCss : "mb-3"}>
										<Select
											onFocus={() => { currentField < 3 ? setCurrentField(3) : null }}
											style={customStyles}
											defaultValue={selectedOption}
											onChange={setSelectedOption}
											options={options}
											isMulti={true}
											placeholder={'Countries of interest'}
										/>
									</Form.Group>
									{submitClicked || currentField > 3 ? formDetails.countries != "" && formDetails.countries != undefined ? null :
										<><Form.Text className="text-muted custom-text-alrt diff-class" style={{
											color: 'red!important',
											letterSpacing: '0.03rem'
										}}>
											<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
										</Form.Text></> : null}

									<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
										<Form.Control type="text" placeholder="What are you enquiring about? (Optional)" onChange={(e) => { setformDetails({ ...formDetails, enquiry: e.target.value }) }} />
									</Form.Group>


									{/* <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
										<Form.Control type="text" placeholder="Enter your child's school name" />
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Control type="text" placeholder="Enters your child's grade/year" />
									</Form.Group> */}
								</Col>
							</Row>
							<Row>
								<Col className={styles.contactDetailsNew}>
									<Accordion defaultActiveKey="1">
										<Accordion.Item eventKey="0">
											<Accordion.Header> My contact info is...</Accordion.Header>
											<Accordion.Body>
												<Row>
													<Col lg={6} md={6} sm={12} xs={12}>
														<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
															<Form.Control onFocus={() => { currentField < 4 ? setCurrentField(4) : null }} className={submitClicked || currentField > 4 ? formDetails.firstName != "" && formDetails.firstName != undefined ? null : styles.requiredCss : null} onChange={(e) => { setformDetails({ ...formDetails, firstName: e.target.value }) }} type="text" placeholder="First name" />
															{submitClicked || currentField > 4 ? formDetails.firstName != "" && formDetails.firstName != undefined ? null :
																<><Form.Text className="text-muted custom-text-alrt" style={{
																	color: 'red!important',
																	letterSpacing: '0.03rem'
																}}>
																	<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
																</Form.Text></> : null}
														</Form.Group>
													</Col>
													<Col lg={6} md={6} sm={12} xs={12}>
														<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
															<Form.Control onFocus={() => { currentField < 5 ? setCurrentField(5) : null }} className={submitClicked || currentField > 5 ? formDetails.lastName != "" && formDetails.lastName != undefined ? null : styles.requiredCss : null} onChange={(e) => { setformDetails({ ...formDetails, lastName: e.target.value }) }} type="text" placeholder="Last name" />
															{submitClicked || currentField > 5 ? formDetails.lastName != "" && formDetails.lastName != undefined ? null :
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
													<Col lg={12} md={12} sm={12} xs={12}>
														<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
															<Form.Control onFocus={() => { currentField < 6 ? setCurrentField(6) : null }} className={submitClicked || currentField > 6 ? formDetails.email != "" && formDetails.email != undefined ? null : styles.requiredCss : null} onChange={(e) => { checkEmail(e.target.value) }} type="email" placeholder="Email" />
															{submitClicked || currentField > 6 ? formDetails.email != "" && formDetails.email != undefined ? null :
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
														<Form.Group controlId="formBasicEmail" onFocus={() => { currentField < 7 ? setCurrentField(7) : null }} className={phoneNumberError != '' || submitClicked || currentField > 7 ? (formDetails.phone != "" && formDetails.phone != undefined) && phoneNumberError == '' ? "mb-3 mt-3" : "mb-3 mt-3 " + styles.requiredCss : "mb-3 mt-3"}>
															{/* <Form.Control onChange={(e) => { setformDetails({ ...formDetails, phone: e.target.value }) }} type="text" placeholder="Phone" /> */}
															<PhoneInput
																inputProps={{
																	name: "phone",
																	required: true,
																	autoFocus: true,
																}}
																// onCountryChange={(country) => { console.log(country) }}
																defaultCountry="IN"
																placeholder="Phone"
																// onlyCountries={['in', 'us', 'uk']}
																onChange={(e) => { setformDetails({ ...formDetails, phone: e }) }}
																value={formDetails.phone}
															// containerClass={phoneNumberError}
															/>
														</Form.Group>
														{phoneNumberError != '' || submitClicked || currentField > 7 ? (formDetails.phone != "" && formDetails.phone != undefined) && phoneNumberError == '' ? null :
															<><Form.Text className="text-muted custom-text-alrt diff-class" style={{
																color: 'red!important',
																letterSpacing: '0.03rem'
															}}>
																<i className="fa fa-info-circle" aria-hidden="true"></i> {phoneNumberError ? phoneNumberError : 'This field is required'}
															</Form.Text></> : null}
														{/* <PhoneInput defaultCountry="no" excludeCountries={["us", "ca"]} /> */}
													</Col>
													{/* <Col lg={6} md={6} sm={12} xs={12} className="text-left"> */}
														{/* onClick={onClickOTPSMS} */}
														{/* {!showVerifyOTP ? <Button className={styles.verifyOtp} disabled={buttonDisabled} onClick={() => { onClickOTPSMS() }}>Get OTP</Button> : */}
															{/* isVerified ? <p className={styles.verifiedTickMark} style={{ */}
																{/* color: "green", color: 'green', */}
																{/* paddingTop: '7%', */}
																{/* fontSize: '20px', */}
																{/* fontWeight: '600', */}
																{/* letterSpacing: '0.03rem' */}
															{/* }}>Otp verified <i className="fa fa-check-circle" aria-hidden="true"></i></p> : */}
																{/* show ? <Spinner animation="border" role="status" disabled style={{ */}
																	{/* marginTop: '10%' */}
																{/* }}></Spinner> : <Button className={styles.verifyOtp} onClick={() => { onClickOTPSMS() }}>Verify with OTP</Button> */}
														{/* } */}
													{/* </Col> */}
													<Modal show={show} onHide={handleClose} className="otp-verify-modal">

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
																	{/* <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
																		<Form.Control onChange={(e) => { setOTP(e.target.value) }} type="text" placeholder="OTP" />
																	</Form.Group> 
																	<Form.Group className="mb-1 mt-1" controlId="formBasicEmail">
																		<p style={{
																			color: '#000000'
																		}}>OTP SENT</p>
																	</Form.Group>*/}
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
													<Col>
														<Form.Group controlId="formBasicEmail" onFocus={() => { currentField < 8 ? setCurrentField(8) : null }} className={submitClicked || currentField > 8 ? formDetails.city != "" && formDetails.city != undefined ? "mb-3 mt-3" : "mb-3 mt-3 " + styles.requiredCss : "mb-3 mt-3"}>
															{/* <Form.Control type="text" placeholder="City" /> */}
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
														{submitClicked || currentField > 8 ? formDetails.city != "" && formDetails.city != undefined ? null :
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
														<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
															<Form.Control onFocus={() => { currentField < 9 ? setCurrentField(9) : null }}
																className={(submitClicked || currentField > 9) && !isMsUser ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null : styles.requiredCss : null}
																onChange={(e) => { setformDetails({ ...formDetails, firstName2: e.target.value }) }}
																type="text"
																placeholder={(userType === 'parent' ? "Student name" : "Parent name") + (interest.id >= 4 ? " (Optional)" : '')} />
															{(submitClicked || currentField > 9) && !isMsUser ? formDetails.firstName2 != "" && formDetails.firstName2 != undefined ? null :
																<><Form.Text className="text-muted custom-text-alrt" style={{
																	color: 'red!important',
																	letterSpacing: '0.03rem'
																}}>
																	<i className="fa fa-info-circle" aria-hidden="true"></i> This field is required
																</Form.Text></> : null}
														</Form.Group>
													</Col>
													<Col lg={6} md={6} sm={12} xs={12}>
														<Form.Group controlId="formBasicEmail" onFocus={() => { currentField < 10 ? setCurrentField(10) : null }} className={(submitClicked || currentField > 10) && !isMsUser ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phone && formDetails.phone2 != '' && formDetails.phone2 != null) ? "mb-3 mt-3" : "mb-3 mt-3 " + styles.requiredCss : "mb-3 mt-3"}>															{/* <Form.Control onChange={(e) => { setformDetails({ ...formDetails, phone: e.target.value }) }} type="text" placeholder="Phone" /> */}
															<PhoneInput
																inputProps={{
																	name: "phone",
																	required: true,
																	autoFocus: true,
																}}
																defaultCountry="IN"
																placeholder={(userType === 'parent' ? "Student phone" : "Parent phone") + (interest.id >= 4 ? " (Optional)" : '')}
																// onlyCountries={['in', 'us', 'uk']}
																onChange={(e) => { setformDetails({ ...formDetails, phone2: e }) }}
																value={formDetails.phone2}
															// containerClass={phoneNumberError}
															/>
														</Form.Group>
														{(submitClicked || currentField > 10) && !isMsUser ? (formDetails.phone2 != "" && formDetails.phone2 != undefined) && (formDetails.phone2 != formDetails.phone && formDetails.phone2 != '' && formDetails.phone2 != null) ? null :
															<><Form.Text className="text-muted custom-text-alrt diff-class" style={{
																color: 'red!important',
																letterSpacing: '0.03rem'
															}}>
																<i className="fa fa-info-circle" aria-hidden="true"></i>
																{(formDetails.phone2 == formDetails.phone && formDetails.phone2 != '' && formDetails.phone2 != null) ? " Child's and parent's phone cannot be the same" : ' This field is required'}
															</Form.Text></> : null}
													</Col>
												</Row>
												{/* <Row>
												<Col>
													<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
														<Form.Control type="text" placeholder="Student Name" />
													</Form.Group>
												</Col>
												<Col>
													<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
														<Form.Control type="text" placeholder="Student phone" />
													</Form.Group>
												</Col>
											</Row> */}
												<Row>
													<Col className="pl-0">{
														isSubmitting ? <Button className={styles.contactSubmit}><Spinner animation="border" role="status">
														<span className="visually-hidden">Loading...</span>
													</Spinner></Button> :
															isSubmitted ? <Button className={styles.contactSubmit}><Spinner animation="border" role="status">
															<span className="visually-hidden">Loading...</span>
														</Spinner></Button> :
															// <p style={{
															// 	borderRadius: '4px',
															// 	padding: '5px 15px',
															// 	fontWeight: '600',
															// 	fontSize: '20px',
															// 	letterSpacing: '0.04rem',
															// 	color: 'green',
															// 	margin: '10px 0px 25px 0px',
															// 	width: '100%'
															// }}>Form successfully submitted. A CollegePass Advisor will be in touch within 48 hours!</p> :
																<Button className={styles.contactSubmit} onClick={(e) => { submit(e) }}>Submit</Button>
													}


													</Col>
													{/* {alertText ? <p style={{
														borderRadius: '4px',
														padding: '5px 15px',
														fontWeight: '600',
														fontSize: '20px',
														letterSpacing: '0.04rem',
														background: '#a4ff66',
														color: '#000000',
														marginLeft: '15px',
														width: '80%'
													}}>Enter all data</p> : <p></p>} */}
												</Row>

											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</Col>
							</Row>
						</Col>
						<Col lg={6} md={4} sm={12} xs={12}></Col>
					</Row>
				</Container>
			</Container>
			<LoginModal show={showLogin} handleClose={handleCloseLogin} />
			<AlertModal show={showAlert} title={alertHeader} message={alertBody} type={alertColor} />



			{/* <Modal show={showAlertSuccess} className={styles.alertModalSuccess} onHide={handleCloseAlertSuccess}>
				<Modal.Body>
					<Row>
						<Col lg={2} md={2} sm={2} xs={2}>
							<Row>
								<Col className={styles.alertIcon}>
									<Image
										width={50}
										height={50}
										src="/success_icon.png"
										alt="Success"
									/>
								</Col>
							</Row>
						</Col>
						<Col lg={8} md={8} sm={8} xs={8} style={{
							paddingBottom: '2%',
							borderRight: '1px solid #abb6bb',
							paddingTop: '2%'
						}}>
							<Row>
								<Col className={styles.alertText}>
									<h3>Success</h3>
									<p className="mb-0">Your account has been saved hn,mbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
								</Col>
							</Row>
						</Col>
						<Col lg={2} md={2} sm={2} xs={2} className="cursor-pointer">
							<Row>
								<Col className={styles.alertCloseBtn}>
									<p className="mb-0" onClick={handleCloseAlertSuccess}>CLOSE</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>

			<Modal show={showAlertError} className={styles.alertModalError} onHide={handleCloseAlertError}>
				<Modal.Body>
					<Row>
						<Col lg={2} md={2} sm={2} xs={2}>
							<Row>
								<Col className={styles.alertIcon}>
									<Image
										width={50}
										height={50}
										src="/error_icon.png"
										alt="Success"
									/>
								</Col>
							</Row>
						</Col>
						<Col lg={8} md={8} sm={8} xs={8} style={{
							paddingBottom: '2%',
							borderRight: '1px solid #abb6bb',
							paddingTop: '2%'
						}}>
							<Row>
								<Col className={styles.alertText}>
									<h3>Error</h3>
									<p className="mb-0">Your email address is invalid</p>
								</Col>
							</Row>
						</Col>
						<Col lg={2} md={2} sm={2} xs={2} className="cursor-pointer">
							<Row>
								<Col className={styles.alertCloseBtn}>
									<p className="mb-0" onClick={handleCloseAlertError}>CLOSE</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</Modal.Body>
			</Modal> */}


			{/*<Container fluid className='bg-black pb-5'>
				<Row>
					<Col className={styles.eventBannerDetails}>
						<Row className={styles.eventBannerText}>
							<Col>
								<Row>
									<Col>
										<h1>Contact Us</h1>
									</Col>
								</Row>
								<Row>
									<Col>
										<h6>Have a question? We’re happy to help!</h6>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
				<Container>
                    <Row>
                        <Col className={styles.contactDetails}>
                            <Row>
                                <Col><h6>EMAIL US</h6></Col>
                            </Row>
                            <Row>
                                <Col><Link href="">support@collegepass.org</Link></Col>
                            </Row>
                            <Row>
                                <Col><p>Empagnie PTE Limited, 3 Shenton Way, #10-05,<br/>Shenton House, Singapore, 068805</p></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.contactMainHeading}>
                            <Row>
                                <Col><h2>Have a question?</h2></Col>
                            </Row>
                            <Row>
                                <Col><p>Send us a message and we&apos;ll get back to you shortly.</p></Col>
                            </Row>
                        </Col>
                    </Row>
					<Row className={styles.eventForm}>
						<Col>
							<h2
								style={{
									color: '#e6a851',
									textAlign: 'center',
									marginBottom: '30px',
                                    marginTop: '45px'
								}}
							>
								REGISTRATION
							</h2>
							<Form>
								<Row>
									<Col>
										<Form.Group className='mb-3' controlId='formBasicEmail'>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Enter First Name'
												name='fname'
												//value={formData.fname}
												//onChange={onChangeHandler}
												required
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group className='mb-3' controlId='formBasicPassword'>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Enter Last Name'
												name='lname'
												//value={formData.lname}
												//onChange={onChangeHandler}
												required
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Group className='mb-3' controlId='formBasicEmail'>
											<Form.Label>Email</Form.Label>
											<Form.Control
												type='email'
												placeholder='Enter email'
												name='emailId'
												//value={formData.emailId}
												//onChange={onChangeHandler}
												required
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group className='mb-3' controlId='formBasicPassword'>
											<Form.Label>Phone Number</Form.Label>
											<Form.Control
												type='tel'
												placeholder='Enter Phone'
												name='phone'
												//value={formData.phone}
												//onChange={onChangeHandler}
												required
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row className="pt-5 pb-3">
									<Col>
                                        <h5 style={{
                                            color: '#ffffff',
                                            padding: '15px 0px',
                                            lineHeight: '1.45',
                                            fontSize: '1.1875rem',
                                            letterSpacing: '1px',
                                            opacity: '0.8'
                                        }}>Which of the following best describes why you are reaching out?*</h5>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="radio" label="I am not currently a CollegePass student and would like to know more about your services" />
                                            <Form.Check type="radio" label="I am currently a CollegePass student and would like to access Customer Support" />
                                            <Form.Check type="radio" label="I am a school representative and want to associate" />
                                            <Form.Check type="radio" label="Other" />
                                        </Form.Group>
									</Col>
								</Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Leave a message!*</Form.Label>
                                            <Form.Control as="textarea"	placeholder='Text Here...' rows={5} />
                                        </Form.Group>
                                    </Col>
                                </Row>
								<Row>
									<Col className='text-center mt-3'>
										<Button type='submit'>Submit</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</Container>
			</Container>*/}
		</Fragment>
	)
}

export default ContactScreen