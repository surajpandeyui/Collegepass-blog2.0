import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link'
import styles from '../BlogScreen/blog.module.scss'

const index = () => {
  return (
    <Fragment>
      <Container fluid>
        <Container>
          <Row>
            <Col className={styles.blog2Wrap}>
              <Row>
                <Col>
                  <Row className={styles.SliderHeadingTop}>
                    <Col>
                      <h3><i className="fa fa-newspaper-o" aria-hidden="true"></i> Trending articles</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Carousel>
                        <Carousel.Item>
                          <Row>
                            <Col className={styles.blogSliderWrap}>
                              <Row className={styles.sliderWidth}>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                  <Row>
                                    <Col>
                                      <img src="new-blog-images/hero_artical-image.png" />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col className={styles.blogSliderTextSection}>
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Choosing The Right University studey abroad counselling</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDescription}>
                                          <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest Popular</p><p>LGBTQ+</p><p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>12 mins read March 16, 2023</p>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Row>
                            <Col className={styles.blogSliderWrap}>
                            <Row className={styles.sliderWidth}>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                  <Row>
                                    <Col>
                                      <img src="new-blog-images/hero_artical-image.png" />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col className={styles.blogSliderTextSection}>
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Choosing The Right University studey abroad counselling</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDescription}>
                                          <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest Popular</p><p>LGBTQ+</p><p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>12 mins read March 16, 2023</p>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Row>
                            <Col className={styles.blogSliderWrap}>
                            <Row className={styles.sliderWidth}>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                  <Row>
                                    <Col>
                                      <img src="new-blog-images/hero_artical-image.png" />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col className={styles.blogSliderTextSection}>
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Choosing The Right University studey abroad counselling</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDescription}>
                                          <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest Popular</p><p>LGBTQ+</p><p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>12 mins read March 16, 2023</p>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
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
                <Col className={styles.blogMainSectionWrap}>
                  <Row className={styles.blogSearch}>
                    <Col lg={2} md={2} sm={12} xs={12}>
                    </Col>
                    <Col lg={10} md={10} sm={12} xs={12}>
                      <Row>
                        <Col>
                          <h2>Blogs</h2>
                        </Col>
                        <Col>
                          <Form>
                            <Form.Control
                              type="search"
                              placeholder="Search"
                              className="me-2"
                              aria-label="Search"
                            />
                          </Form>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={2} md={2} sm={3} xs={6} className={styles.browseCategory}>
                      <Row>
                        <Col className={styles.catSectionShort}>
                          <p>Browse Categories</p>
                          <p><a style={{
                            color: '#ffffff',
                            background: '#1b1b1b',
                            padding: '7px 13px',
                            borderRadius: '10px',
                          }}>Latest</a></p>
                          <p><a>Popular</a></p>
                          <p><a>US</a></p>
                          <p><a>UK</a></p>
                          <p><a>Canada</a></p>
                          <p><a>Undergraduate</a></p>
                          <p><a>SAT/ACT</a></p>
                          <p><a>Masters</a></p>
                          <p><a>Ivy League</a></p>
                          <p><a>Visa</a></p>
                          <p><a>Application Components</a></p>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={10} md={10} sm={3} xs={6} className={styles.blogSections}>
                      <Row className={styles.blogCardWrap}>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col className={styles.blogTile}>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/image_rot.png" />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>Choosing the Right University study abroad counselling</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life.</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p><p>LGBTQ+</p><p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>12 mins read March 16, 2023</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col className={styles.blogTile}>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/image_rot.png" />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>Choosing the Right University study abroad counselling</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life.</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p><p>LGBTQ+</p><p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>12 mins read March 16, 2023</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className={styles.blogCardWrap}>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col className={styles.blogTile}>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/image_rot.png" />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>Choosing the Right University study abroad counselling</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles.tileDes}>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life.</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                    <p>Latest</p><p>LGBTQ+</p><p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>12 mins read March 16, 2023</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col className={styles.blogTile}>
                              <Row>
                                <Col>
                                  <img src="new-blog-images/image_rot.png" />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>Choosing the Right University study abroad counselling</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life.</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p><p>LGBTQ+</p><p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>12 mins read March 16, 2023</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
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

export default index
