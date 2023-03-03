import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import Autosuggest from 'react-autosuggest'
import { APIgetAllCities, APIeventRegistration } from '../../config/API'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import PhoneInput from "react-phone-input-2";

const EventSuccess = () => {
  const dispatch = useDispatch()

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

  const [value, setValue] = useState('')
  const [suggestion, setSuggestion] = useState([])

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
    placeholder: 'Enter your City',
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

  const [formDetails, setFormDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    grade: '',
    curriculum: '',
  })
  const onChangeForm = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }
  //   console.log('EVENT DETAILS', eventDetails)

  const onSubmitEventRegistration = async () => {
    let [firstName, ...secondName] = formDetails.name.split(' ')
    secondName = secondName.join(' ')

    let cityDetails = findCityID(value)

    let apiBody = {
      email: formDetails.email,
      eventID: eventDetails.ID,
      eventName: eventDetails.NAME,
      firstName: firstName,
      lastName: secondName,
      grade: formDetails.grade,
      countryCode: '',
      phone: formDetails.phoneNumber,
      city: cityDetails.id,
    }

    // console.log('apiBody', apiBody)
    const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
    // console.log(registerEventDetails)
    if (registerEventDetails.data.statusCode === 200) {
      handleClose()
      setShowSuccess(true)
    }
  }

  const [showSuccess, setShowSuccess] = useState(false)

  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if (auth.userDetails !== null && auth.userDetails !== undefined) {
      setFormDetails({
        name:
          auth.userDetails.FIRSTNAME !== undefined
            ? `${auth.userDetails?.FIRSTNAME}${auth?.userDetails?.LASTNAME}`
            : null,
        phoneNumber: auth.userDetails.PHONENUMBER,
        grade: auth.userDetails.GRADE,
        curriculum: auth.userDetails?.CURRICULUM,
        email: auth.user,
      })

      setValue(findCityName(auth.userDetails.CITY))
    }
  }, [auth])

  return (
    <Fragment>
      <Container fluid className="bg-black pt-5 pb-5 mt-5">
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
                  Complete your event registration
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
                  }}
                >
                  {/* (Get relevant college admission livestream alerts) */}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4">
                <Form className="mandatory-form">
                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicName">
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={formDetails.name}
                          onChange={onChangeForm}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicPhone">
                        <Form.Control
                          type="tel"
                          placeholder="Enter your phone number"
                          name="phoneNumber"
                          value={formDetails.phoneNumber}
                          onChange={onChangeForm}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicPhone">
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formDetails.email}
                          onChange={onChangeForm}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Select
                        aria-label="Default select example"
                        // disabled={auth.isAuthenticated}
                        name="grade"
                        value={formDetails.grade}
                        onChange={onChangeForm}
                      >
                        <option>Select Grade</option>
                        <option value="1">Grade 8</option>
                        <option value="2">Grade 9</option>
                        <option value="3">Grade 10</option>
                        <option value="4">Grade 11</option>
                        <option value="5">Grade 12</option>
                        <option value="6">Undergraduate</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <Form.Select
                        aria-label="Default select example"
                        // disabled={auth.isAuthenticated}
                        name="curriculum"
                        value={formDetails.curriculum}
                        onChange={onChangeForm}
                      >
                        <option>Select Curriculum</option>
                        <option value="1">IGCSE</option>
                        <option value="2">IB</option>
                        <option value="3">CBSE</option>
                        <option value="4">ICSE</option>
                        <option value="5">STATE BOARD</option>
                        <option value="6">CAIE</option>
                        <option value="7">UNDERGRADUATE/ DEGREE</option>
                      </Form.Select>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
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
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="width-100 text-center"
                    >
                      <Button
                        variant="primary"
                        onClick={() => {
                          onSubmitEventRegistration()
                        }}
                        className="ml-2"
                        style={{
                          marginLeft: '10px',
                          width: '100px',
                          background: '#c83232',
                          border: 'none',
                          float: 'right',
                        }}
                      >
                        Proceed
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default EventSuccess
//check
