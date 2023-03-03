import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './team-up-section.module.scss'

const TeamUp = ({ choice }) => {
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
          backgroundColor: 'rgb(26, 97, 233)',
          color: 'rgb(248, 248, 248)',
          backgroundImage: 'url("box-bg/advisors_banner_img.jpg")',
          backgroundSize: 'cover',
        }}
      >
        <Container className={styles.teamUpSection}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12} className="p-0">
              <Row>
                <Col className={styles.advisorSection}>
                  <Image
                    src="/advisors_laptop_img_rev.png"
                    width="700"
                    height="394"
                    layout="responsive"
                    className="img-responsive"
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col className={styles.AidenSection}>
                  <Row>
                    <Col>
                      <h2>
                        TEAM UP WITH IVY LEAGUE-TRAINED ADMISSION ADVISORS
                      </h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>
                        CollegePass Admission Advisors have undergone
                        specialized college counseling training at Top US
                        Universities: Columbia University and UC Berkeley.
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

export default TeamUp
