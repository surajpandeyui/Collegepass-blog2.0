import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import NewTestimonial from '../../components/NewTestimonial'
import Faq from '../../components/Faq'
import styles from '../AboutUsScreen/about.module.scss'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white'>
        <Container>
          <Row>
            <Col className={styles.aboutMainNew}>
              <Row>
                <Col>
                  <h1>About CollegePass</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide! CollegePass provides personalized support in every aspect of the journey to their dream college — from university selection strategy, test prep, and personal statement/essay support to extracurricular strategy and interview practice.</p>
                  <p>CollegePass's tutors and admission advisors are the best globally, being students at, or graduates from, UPenn, Harvard, Stanford, Columbia, MIT, Oxford, Cambridge, and more. CollegePass's admission advisors are trained to leverage CollegePass Case Method and research conducted by the Global Research Team.<br/> We believe world-class admissions advising and test preparation delivered in a personalized way using technology & research is the key to making a personal college coach a reality for every high schooler.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
