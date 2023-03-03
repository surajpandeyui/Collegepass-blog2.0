import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './faq.module.scss'

const Faq = () => {

  return (
    <Fragment>
      <Container fluid style={{
        backgroundColor: 'rgb(36, 36, 36)'
        }}>
        <Container>
            <Row>
                <Col className={styles.ugAboutCp}>
                    <Row className="pb-5">
                        <Col>
                            <h6>What is CollegePass?</h6>
                            <p>CollegePass is a Global College Admissions Company with students in 28 countries! CollegePass students come from 1200+ schools and have been admitted to the Top 100 Universities globally.</p>
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h6>How does CollegePass help students & parents?</h6>
                            <p>CollegePass provides One - on - One College Admissions Advising, Essay /SOP Editing and Tutoring Services to students. Students can also learn online from the World’s best college admissions advisors by downloading: CollegePass+ - An Exclusive Self Paced,  Online College Admissions Platform.</p>
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h6>Does CollegePass provide guaranteed admissions to colleges?</h6>
                            <p>CollegePass teams up with students and parents applying to the world’s most selective colleges. 99.5% of students have received admission offers from their target colleges list.  Every CollegePass student has received a minimum of 3 admission offers in 2022.</p>
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h6>Is CollegePass available free of cost?</h6>
                            <p>Students can access a variety of college admissions content for free forever on CollegePass+. For Unlimited, Annual Access students & parents can subscribe to CollegePass+ for <span style={{
                                color: 'rgb(227 204 128)',
                                fontWeight: '600'
                            }}>INR 999/USD 15</span> Per Year.<br/>
                            Public/Govt. School students can get free unlimited access to CollegePass+. Drop us a line at <span style={{
                                color: 'rgb(227 204 128)',
                                fontWeight: '600'
                            }}>support@collegepass.org.</span><br/>
                            CollegePass Admissions Advising & Tutoring Services are available for a fee. Book Your Consultation to talk to a CollegePass Admissions Expert!</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </Container>


    </Fragment>
  )
}

export default Faq
