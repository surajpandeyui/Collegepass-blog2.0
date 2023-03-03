import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../LeverageProfileBuilder/leverage.module.scss'

const Leverage = ({ choice }) => {
  const router = useRouter()
  const redirect = () => {
    choice
      ? router.push('/contact/' + choice.toString())
      : router.push('/contact')
  }

  return (
    <Fragment>
      <Container
        fluid
        style={{
          backgroundColor: 'rgb(90, 30, 203)',
          color: 'rgb(248, 248, 248)',
          backgroundImage: 'url("box-bg/profile_builder_bg.jpg")',
          backgroundSize: 'cover',
        }}
      >
        <Container>
          <Row>
            <Col className={styles.AidenSection}>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row>
                    <Col className={styles.profileBuilderImg}>
                      <Image
                        src="/profile_builder-image.png"
                        width="700"
                        height="500"
                        //className={}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className={styles.levTextSection}
                >
                  <Row>
                    <Col>
                      <h2>
                        BUILD YOUR PROFILE WITH COLLEGEPASS PROFILE BUILDER
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>
                        CollegePass Profile Builder is an Advanced College
                        Admissions Platform developed based on a study of 100+
                        Ivy League/UK/Canada Case Studies!
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button onClick={redirect}>
                        Book Your Free Consultation
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default Leverage
