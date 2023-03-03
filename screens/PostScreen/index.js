import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white'>
        <Container>
          <Row>
            <Col lg={8} md={8} sm={12} xs={12} style={{
                paddingBottom: '5%',
                paddingTop: '5%'
                }}>
              <Row>
                <Col>
                    <h1 style={{
                        marginTop: '0',
                        marginBottom: '20px',
                        wordWrap: 'break-word',
                        fontSize: '41px',
                        lineHeight: '50px',
                        fontWeight: '600',
                    }}>Choosing The Right University – Study Abroad Counseling</h1>
                </Col>
              </Row>
              <Row>
                <Col style={{
                    marginBottom: '20px',
                }}>
                    <Image
                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                        alt="Small Blog"
                        width={750}
                        height={556}
                    />
                </Col>
              </Row>
              <Row>
                <Col>
                <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p>
                <p>Everyone has some memories of school: were you the wallflower, the cheerleader, the class brute, or at the receiving end of sniggers from the backbench, all because you did not do your homework? At school, we develop personalities, in relation to others, likes and dislikes, where there’s a lesser chance of actually having a voice in choosing the institution. As pre-adults, the luxury of choice means you have the freedom to choose the environment that will best encourage your growth as a student, individual, and, eventually, professional.</p>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Button style={{
                            background: '#000000',
                            padding: '9px 12px',
                            borderRadius: '50px',
                            border: '1px solid #000000',
                            marginTop: '20px'
                        }}>Book Your Free Strategy Session</Button>
                    </Col>
                </Row>
                <Row>
                  <Col className='pt-5 pb-5'>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as="textarea" rows={3}  placeholder="Comment..." />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='pt-3'>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="name" />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col className='pt-3'>
                        <Button>Post Comment</Button>
                      </Col>
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12} className={styles.postSide} style={{
                  paddingBottom: '5%',
                  paddingTop: '5%',
                  paddingLeft: '5%'
                  }}>
                <Row>
                  <Col className="pb-3">
                    <h3>Popular Posts</h3>
                  </Col>
                </Row>
                <Row className='pb-3'>
                  <Col>
                    <h5>How to get into the University of California</h5>
                    <Image
                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                        alt="Small Blog"
                        width={130}
                        height={96}
                    />
                    <span className='d-flex'>
                      <p style={{
                        paddingRight: '8px'
                      }}><a href="#">Undergraduate</a></p>
                      <p style={{
                        paddingLeft: '8px'
                      }}><a href="#">September 15, 2022</a></p>
                    </span>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col>
                    <h5>How to get into the University of California</h5>
                    <Image
                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                        alt="Small Blog"
                        width={130}
                        height={96}
                    />
                    <span className='d-flex'>
                      <p style={{
                        paddingRight: '8px'
                      }}><a href="#">Undergraduate</a></p>
                      <p style={{
                        paddingLeft: '8px'
                      }}><a href="#">September 15, 2022</a></p>
                    </span>
                  </Col>
                </Row>

                <Row className='pb-3'>
                  <Col>
                    <h5>How to get into the University of California</h5>
                    <Image
                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                        alt="Small Blog"
                        width={130}
                        height={96}
                    />
                    <span className='d-flex'>
                      <p style={{
                        paddingRight: '8px'
                      }}><a href="#">Undergraduate</a></p>
                      <p style={{
                        paddingLeft: '8px'
                      }}><a href="#">September 15, 2022</a></p>
                    </span>
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
