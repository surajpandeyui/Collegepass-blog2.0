
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap'
import React from 'react'
import styles from '../LandingFormScreen/landingform.module.scss';
import ProfilePersonalDetails from '../MyProfileScreen/ProfilePersonalDetails';
import ProfileEducationDetails from '../MyProfileScreen/ProfileEducationDetails';
import ProfileExtracurricular from '../MyProfileScreen/ProfileExtracurricular';



const MyProfileScreen = () => {
	return (
        <Container fluid className="bg-black pt-5 pb-5 mt-5 white-color my-profile">
            <Container>
                <Row>
                    <Col className={styles.myProfile}>
                        <Row>
                            <Col><h2 className="new-class-heading text-center pt-3 pb-3">My Profile</h2></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tabs
                                    defaultActiveKey="personal"
                                    transition={false}
                                    id="noanim-tab-example"
                                    >
                                    <Tab eventKey="personal" title="PERSONAL">
                                        <ProfilePersonalDetails />
                                    </Tab>
                                    <Tab eventKey="education" title="EDUCATION">
                                        <ProfileEducationDetails />
                                    </Tab>
                                    <Tab eventKey="extracurricular" title="EXTRACURRICULAR">
                                        <ProfileExtracurricular />
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
	)
}

export default MyProfileScreen
