import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
//import Link from 'next/link'
// import {useState} from 'react'
import Autosuggest from 'react-autosuggest'
import { APIEssayEvent, APIgetAllCities } from '../../config/API'
import axios from 'axios'
import styles from '../IvyEssayWritingContestScreen/ivyContest.module.scss'

const index = () => {
    const [city, setcity] = useState()
    const [formData, setFormdata] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        grade: '',
        curriculum: '',
        school: '',
        city: '',
        essay: ''

    })

    //--------------------------------autosuggest-----------------------------------
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
    }

    //---------------------------------------------------------------------------

    const [completed, setcompleted] = useState(false)
    const [completedText, setcompletedText] = useState('')
    const [loading, setloading] = useState(false)


    useEffect(() => {
        // console.log(formData)
        // console.log(value)
    }, [formData])
    const updateData = (key, value) => {
        // console.log("updating", key, value)
        setFormdata({ ...formData, [key]: value })
    }
    useEffect(()=>{
        // console.log("settting city",value)
        setcity(findCityID(value))
        const city = findCityID(value)
        setFormdata({...formData,city:city?.id?city.id:''})
    },[value])
    const sendData = async (e) => {
        console.log(value)
        
        e.preventDefault()
        // e.stopPropagation();
        try {
            // if(formData.email,firstName,formData.grade,formData.phoneNumber,formData.curriculum,
            //     formData.school_name)
            //   {
            //     let apiBody = {
            //       email: formData.email,
            //       firstName: formData.firstName,
            //       lastName: formData.lastName,
            //       grade: formData.grade,
            //       phone: formData.phoneNumber,
            //       city: formData.city,
            //       school_name: formData.school,
            //       curriculum: formData.curriculum,
            //       countriesOfInterest : ''
            //     }

            //     console.log('apiBody', apiBody)
            //     const registerEventDetails = await axios.post(APIeventRegistration, apiBody)
            //     console.log(registerEventDetails)
            //     if (registerEventDetails.data.statusCode === 200) {
            //       handleClose()
            //       router.push(`/event-registration-success/${eventDetails.ZOOMID}`)
            //       // setShowSuccess(true)
            //     }
            // }
           
            // console.log(formData)
            if (formData.firstname != '' &&
                formData.lastname != '' &&
                formData.email != '' &&
                formData.phonenumber != '' &&
                formData.grade != '' &&
                formData.curriculum != '' &&
                formData.school != '' &&
                formData.essay != '' &&
                formData.grade != 0 &&
                formData.curriculum != 0 &&
                formData.city != ''
            ) {
                setloading(true)
                let result = await axios.post(APIEssayEvent, { formData })
                if (result.data.status) {
                    setloading(false)
                    if (result.data.message == 'Data stored') {
                        setcompletedText('SUCCESSFULLY REGISTERED')
                        setFormdata({
                            firstname: '',
                            lastname: '',
                            email: '',
                            phonenumber: '',
                            grade: '',
                            curriculum: '',
                            school: '',
                            city: '',
                            essay: ''

                        })
                    }
                    else {
                        setcompletedText('ALREADY ATTEMPTED')
                    }

                    setcompleted(true)
                }
                else {
                    setloading(true)
                }

                // console.log("result", result)


            }

        } catch (error) {

        }

        return false
    }
    return (
        <Fragment>

            <Container fluid style={{
                backgroundImage: 'url(/essay_contest_page_banner.jpg)',
                padding: '20px 0px',
                backgroundPosition: 'center center',
                backgroundSize: 'cover'
            }}>
                <Container className='white-color text-center mt-5 pt-5 pb-5'>
                    <Row>
                        <Col>
                            <p>
                                <Image
                                    width="190"
                                    height="140"
                                    src="/White-logo.png"
                                    alt="Logo"
                                />
                            </p>
                            <h1 style={{
                                fontSize: '75px',
                                fontWeight: '600',
                                letterSpacing: '0.03rem'
                            }}>Ivy Essay Writing Contest</h1>
                            <p style={{
                                letterSpacing: '0.03rem',
                                fontSize: '20px'
                            }}>Worried about your CommonApp essay not being up to the mark? Let our Expert Editors be the judge of that!<br />
                                Inviting all 11th and 12th Grade students to participate in the biggest online Ivy Essay Writing Contest by CollegePass.</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {/*<Container fluid style={{
                padding: '45px 0px',
                background: '#272c34',
                borderTop: '1px solid #3f3f40',
                borderBottom: '1px solid #3f3f40',
                marginBottom: '45px'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ivyDesc}>
                            <Row>
                                <Col className='text-center'>
                                    <h2></h2>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>*/}

            <Container fluid>
                <Container>
                    <Row>
                        <Col className={styles.ivyAbout}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                            <h2>What is the contest about?</h2>
                                            <p>We want to help you don your writers' hat as early as possible and motivate you to turn your essays into future accepted ones.</p>
                                            <p>Each month you will receive a prompt from the Common Application and Top Colleges in the US! You will have 10 days to submit the essay our team will select the essay that has Ivy League potential!</p>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className='text-center'>
                                            <Image
                                                width="500"
                                                height="300"
                                                src="/contest_about.jpg"
                                                alt="Landing page Side Image"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container fluid style={{
                backgroundSize: 'cover',
                backgroundImage: 'url("/bg-center-ivy.png")'
                // background: '#111111',
                // borderTop: '1px solid #3f3f40',
                // borderBottom: '1px solid #3f3f40',
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ivyForYou}>
                            <Row style={{
                                flexDirection: 'row-reverse'
                            }}>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                            <h2>What's in it for you?</h2>
                                            <p>You start your process earlier, which puts you ahead of your peers!</p>
                                            <p>If your submission is selected, you will receive recognition from CollegePass and a cash reward consisting of INR 8,000/- and a free CollegePass Plus subscription worth INR 999/- where you can access Live Ivy League events and Masterclasses hosted by international education experts!</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className='text-center'>
                                            <Image
                                                width="500"
                                                height="300"
                                                src="/What's_in_it_for_you.jpg"
                                                alt="Landing page Side Image"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container fluid style={{
                borderBottom: '1px solid #3f3f40',
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ivyParticipate}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                            <h2>How can you participate?</h2>
                                            <p>Easy! All you have to do is fill out this submission form and enroll free of cost before the 30th of July. The winner shall be announced in the first week of August 2022.</p>

                                            <h5>Rules</h5>
                                            <p>The only rule is to be ORIGINAL.</p>

                                            <h5>Prompt</h5>
                                            <p>The lessons we take from obstacles we encounter can be fundamental to later success. How did it affect you, and what did you learn from the experience? (CommonApp 2022)</p>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className='text-center'>
                                            <Image
                                                width="500"
                                                height="300"
                                                src="/participate.jpg"
                                                alt="Landing page Side Image"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container fluid>
                <Container>
                    <Form onSubmit={(e) => { sendData(e) }}>
                        <Row>
                            <Col className={styles.ivyForm}>
                                <h2 className='pb-3'>Register Now</h2>
                                <Row>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="text" value={formData.firstname} placeholder="First name" onChange={(e) => { updateData('firstname', e.target.value) }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="text" value={formData.lastname} placeholder="Last name" onChange={(e) => { updateData('lastname', e.target.value) }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="email" value={formData.email} placeholder="Email" onChange={(e) => { updateData('email', e.target.value) }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="text" value={formData.phonenumber} placeholder="Phone number" onChange={(e) => { updateData('phonenumber', e.target.value) }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Select
                                                        required={true}
                                                        value={formData.grade}
                                                        onChange={(e) => { updateData('grade', parseInt(e.target.value)) }}
                                                    >

                                                        <option value="">Grade</option>
                                                        <option value="1">Grade 8</option>
                                                        <option value="2">Grade 9</option>
                                                        <option value="3">Grade 10</option>
                                                        <option value="4">Grade 11</option>
                                                        <option value="5">Grade 12</option>
                                                        <option value="6">Undergraduate</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Select required
                                                        value={formData.curriculum}
                                                        onChange={(e) => { updateData('curriculum', parseInt(e.target.value)) }}
                                                    >
                                                        <option value="">Curriculum</option>
                                                        <option value="1">IGCSE</option>
                                                        <option value="2">IB</option>
                                                        <option value="3">CBSE</option>
                                                        <option value="4">ICSE</option>
                                                        <option value="5">STATE BOARD</option>
                                                        <option value="6">CAIE</option>
                                                        <option value="7">UNDERGRADUATE/ DEGREE</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="text" value={formData.school} placeholder="School" onChange={(e) => { updateData('school', e.target.value) }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <Row>
                                            <Col>
                                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control required type="text" placeholder="City" value={formData.city} onChange={(e) => { updateData('city', e.target.value) }} />
                                                </Form.Group> */}
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control required as="textarea" rows={4} placeholder="Write your essay here (word limit 300 words)" value={formData.essay} onChange={(e) => { updateData('essay', e.target.value) }} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type="submit" disabled={loading}>CONFIRM</Button>
                                        {loading && <p className={styles.ivyRegisteredLoading}>
                                            <Image
                                                width="130"
                                                height="30"
                                                src="/Loading_2.gif"
                                                alt="Landing page Side Image"
                                            />
                                        </p>}
                                        {completed && <p className={styles.ivyRegistered}>{completedText}</p>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>
        </Fragment>
    )
}

export default index
