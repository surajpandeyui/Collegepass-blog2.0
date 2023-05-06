import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link'
import styles from '../BlogScreen/blog.module.scss'

const index = () => {
  return (
    <Fragment>
      <Container fluid>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h3><i className="fa fa-file-text" aria-hidden="true"></i> Trending articles</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Carousel>
                        <Carousel.Item>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/hero_artical-image.png" />
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col>Text</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/hero_artical-image.png" />
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col>Text</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/hero_artical-image.png" />
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col>Text</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Carousel.Item>
                      </Carousel>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
