import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import { APIGetBlog } from '../../config/API'

const index = ({ id }) => {
  const [post, setPost] = useState()
  const getPost = async (id) => {
    try {
      const response = await axios.get(`${APIGetBlog}${id}`)
      console.log('Data --------->', response.data.data)
      setPost(response.data.data)
    } catch (err) {}
  }
  useEffect(() => {
    id && getPost(id)
  }, [id])

  if (!post) {
    return <div></div>
  }
  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
          <Row>
            <Col
              lg={8}
              md={8}
              sm={12}
              xs={12}
              style={{
                paddingBottom: '5%',
                paddingTop: '5%',
              }}
            >
              <Row>
                <Col>
                  <h1
                    style={{
                      marginTop: '0',
                      marginBottom: '20px',
                      wordWrap: 'break-word',
                      fontSize: '41px',
                      lineHeight: '50px',
                      fontWeight: '600',
                    }}
                  >
                    {post.TITLE}
                  </h1>
                  {/* <h1 style={{
                        marginTop: '0',
                        marginBottom: '20px',
                        wordWrap: 'break-word',
                        fontSize: '41px',
                        lineHeight: '50px',
                        fontWeight: '600',
                    }}>Choosing The Right University – Study Abroad Counseling</h1> */}
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <Image
                    src={post.IMAGE_BANNER}
                    alt="Small Blog"
                    width={750}
                    height={556}
                  />
                </Col>
              </Row>
              <Row>
                <Col dangerouslySetInnerHTML={{ __html: post.CONTENT }}></Col>
              </Row>

              <Row>
                <Col className="pt-5 pb-5">
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Comment..."
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="pt-3">
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="name" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col className="pt-3">
                    <Button>Post Comment</Button>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={12}
              xs={12}
              className={styles.postSide}
              style={{
                paddingBottom: '5%',
                paddingTop: '5%',
                paddingLeft: '5%',
              }}
            >
              <Row>
                <Col className="pb-3">
                  <h3>Popular Posts</h3>
                </Col>
              </Row>
              <Row className="pb-3">
                <Col>
                  <h5>How to get into the University of California</h5>
                  <Image
                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                    alt="Small Blog"
                    width={130}
                    height={96}
                  />
                  <span className="d-flex">
                    <p
                      style={{
                        paddingRight: '8px',
                      }}
                    >
                      <a href="#">Undergraduate</a>
                    </p>
                    <p
                      style={{
                        paddingLeft: '8px',
                      }}
                    >
                      <a href="#">September 15, 2022</a>
                    </p>
                  </span>
                </Col>
              </Row>

              <Row className="pb-3">
                <Col>
                  <h5>How to get into the University of California</h5>
                  <Image
                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                    alt="Small Blog"
                    width={130}
                    height={96}
                  />
                  <span className="d-flex">
                    <p
                      style={{
                        paddingRight: '8px',
                      }}
                    >
                      <a href="#">Undergraduate</a>
                    </p>
                    <p
                      style={{
                        paddingLeft: '8px',
                      }}
                    >
                      <a href="#">September 15, 2022</a>
                    </p>
                  </span>
                </Col>
              </Row>

              <Row className="pb-3">
                <Col>
                  <h5>How to get into the University of California</h5>
                  <Image
                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                    alt="Small Blog"
                    width={130}
                    height={96}
                  />
                  <span className="d-flex">
                    <p
                      style={{
                        paddingRight: '8px',
                      }}
                    >
                      <a href="#">Undergraduate</a>
                    </p>
                    <p
                      style={{
                        paddingLeft: '8px',
                      }}
                    >
                      <a href="#">September 15, 2022</a>
                    </p>
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
