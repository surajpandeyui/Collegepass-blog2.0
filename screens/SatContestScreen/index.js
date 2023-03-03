import React, { Fragment } from 'react'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'
import Slider from '../../components/HeroSlider/Slider';
import MarketBanner from '../../components/MarketBanner';
import Testimonial from '../../components/Testimonial';
//import Image from 'next/image'
//import Link from 'next/link';
import styles from '../SatContestScreen/satcontest.module.scss'

const SatContestScreen = () => {
    return (
        <Fragment>
            <Fragment>
                <Slider />
                <MarketBanner></MarketBanner>
                <Container fluid className="bg-black text-center pt-4 pb-4">
                    <Container className={styles.SatContest}>
                        <Row className={styles.tableSatContest}>
                            <Col>
                                <Table striped bordered hover variant="dark">
                                    <tbody>
                                        <tr>
                                            <th>Test Date</th>
                                            <td>Sunday, 5th September 2021</td>
                                        </tr>
                                        <tr>
                                            <th>Test Time</th>
                                            <td>3 PM to 6 PM (IST)</td>
                                        </tr>
                                        <tr>
                                            <th>Test Duration</th>
                                            <td>180 Minutes</td>
                                        </tr>
                                        <tr>
                                            <th>Test Mode</th>
                                            <td>Online</td>
                                        </tr>
                                        <tr>
                                            <th>Eligibility</th>
                                            <td>Class 9-11 Students</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className={styles.formSatContest}>
                            <Col>
                                <h2 className="pt-2 pb-2 text-center">REGISTRATION</h2>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter first name" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter last name" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="number" placeholder="Phone" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>School Year</Form.Label>
                                                <Form.Select defaultValue="Choose...">
                                                    <option>Choose...</option>
                                                    <option>Grade 12</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>Please List Your Curriculum</Form.Label>
                                                <Form.Select defaultValue="Choose...">
                                                    <option>Select Curriculum</option>
                                                    <option></option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Name of the school</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name of the school" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select defaultValue="Choose...">
                                                    <option>India</option>
                                                    <option>Australia</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>State</Form.Label>
                                                <Form.Select defaultValue="Choose...">
                                                    <option>Utter Pradesh</option>
                                                    <option>Maharastra</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>City</Form.Label>
                                                <Form.Select defaultValue="Choose...">
                                                    <option>varanasi</option>
                                                    <option>Allahabad</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>By registering for this event, I confirm the creation of my free CollegePass account and I approve the information shared above to be used for the same.</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="I accept the Terms of Services and have read the Privacy Policy." />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center pt-3 pb-3">
                                            <Button>REGISTER</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Testimonial />
            </Fragment>
        </Fragment>
    )
}

export default SatContestScreen
