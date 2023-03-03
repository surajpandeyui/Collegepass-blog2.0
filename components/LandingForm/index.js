import React, {Fragment} from 'react'
import {Container, Row, Col, Button, Form, Accordion} from 'react-bootstrap'
import styles from '../../components/LandingForm/form.module.scss';

const LandingForm = () => {

	return (
		<Fragment>
			<Container className="pt-5 pb-5">
				<Row className={styles.landingForm}>
					<Col>
						<Row>
							<Col>
								<p style={{
									color: '#ffffff',
									opacity: '.8',
									fontSize: '16px',
									fontWeight: '500',
									letterSpacing: '0.03rem'
								}}>Get started with CollegePass</p>
								<p>Your path to an elite university is just a page away. Fill out the form below and an Academic<br/>
								Advisor will get in touch with you and show you how CollegePass can help you get into your<br/>
								dream school.</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<div className={styles.circle}></div>
										<Accordion.Header>I&apos;m a...</Accordion.Header>
										<Accordion.Body>
										<Row>
											<Col className={styles.selectStudent}>
												<Button>I&apos;m a Student</Button>
												<Button className={styles.selected}>I&apos;m a Parent</Button>
											</Col>
										</Row>
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
									<div className={styles.circle}></div>
										<Accordion.Header>I&apos;m interested in...</Accordion.Header>
										<Accordion.Body>
											<Row>
												<Col className={styles.interestedCollege}>
													<Row>
														<Col>
															<p>What area are you interested in getting the most<br/> assistance with?</p>
														</Col>
													</Row>
													<Row>
														<Col className="custom-d-flex">
															<Button>
																<i className="fa fa-university mb-3" aria-hidden="true" style={{fontSize: '30px'}}></i>
															College Admission Advising</Button>
															<Button><i className="fa fa-pencil-square-o mb-3" aria-hidden="true" style={{fontSize: '30px'}}></i>
															MS Admission Advising</Button>
														</Col>
													</Row>
													<Row>
														<Col className="custom-d-flex">
															<Button className={styles.selectedButton}>
																<i className="fa fa-cogs" aria-hidden="true" style={{fontSize: '30px'}}></i>
																IB/IGCSE Tutoring</Button>
																<Button><i className="fa fa-graduation-cap" aria-hidden="true" style={{fontSize: '30px'}}></i>
															AP/SAT Tutoring</Button>
														</Col>
													</Row>
													<Row>
														<Col>
															<Form>
																<Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
																	<Form.Label>What is your childs current school name?</Form.Label>
																	<Form.Control type="text" placeholder="Enter your child current school name" />
																</Form.Group>
															</Form>
														</Col>
													</Row>
												</Col>
											</Row>
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
									<div className={styles.circle}></div>
										<Accordion.Header>My contact info is...</Accordion.Header>
										<Accordion.Body>
											<Form>
												<Row>
													<Col className={styles.contactInfo}>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>First name</Form.Label>
															<Form.Control type="text" placeholder="Enter your first name" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>Last name</Form.Label>
															<Form.Control type="text" placeholder="Enter your last name" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>Email</Form.Label>
															<Form.Control type="email" placeholder="Enter your email" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>Phone number</Form.Label>
															<Form.Control type="number" placeholder="Enter your phone number" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>Parent email</Form.Label>
															<Form.Control type="email" placeholder="Enter your parents email" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicEmail">
															<Form.Label>Parent phone number</Form.Label>
															<Form.Control type="number" placeholder="Enter your parent phone number" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicPassword">
															<Form.Label>What city are you from?</Form.Label>
															<Form.Control type="text" placeholder="Enter your city" />
														</Form.Group>
														<Form.Group className="mb-3" controlId="formBasicCheckbox">
															<Form.Check type="radio" label="I agree to the privacy policy" />
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col className={styles.submitButton}>
														<Button variant="primary" type="submit">
															Submit
														</Button>
													</Col>
												</Row>
											</Form>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</Fragment>
	)
}

export default LandingForm