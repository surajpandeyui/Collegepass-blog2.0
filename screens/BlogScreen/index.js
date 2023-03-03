import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white'>
        <Container>
          <Row>
            <Col style={{
              paddingBottom: '5%',
              paddingTop: '5%',
              paddingLeft: '0',
              paddingRight: '0'
            }}>
              <Row>
                <Col className={styles.blogBanner} style={{
                  paddingLeft: '0',
                  paddingRight: '0'
                }}>
                  <Row>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row style={{
                            paddingLeft: '20px',
                            paddingRight: '20px'
                          }}>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              borderRadius: '5px'
                            }}>
                             
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              paddingTop: '15%',
                              paddingLeft: '0',
                              paddingRight: '0'
                            }}>
                              <h1 className={styles.heading1}>
                                How to get into the University of California
                              </h1>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering both undergraduate and graduate education....</p>
                              <p className={styles.descriptionDate}>
                                <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSection}>
                            <h4 className={styles.popular}>Popular Blog</h4>
                            <Row>
                              <Col className={styles.popDev}>
                                <span className={styles.popTextRight}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                                <span className={styles.smallImage}>
                                  <Image
                                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                    alt="Small Blog"
                                    width={130}
                                    height={96}
                                />
                                </span>
                              </Col>
                            </Row>

                            <Row>
                              <Col className={styles.popDev}>
                                <span className={styles.popTextRight}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                                <span className={styles.smallImage}>
                                  <Image
                                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                    alt="Small Blog"
                                    width={130}
                                    height={96}
                                />
                                </span>
                              </Col>
                            </Row>

                            <Row>
                              <Col className={styles.popDev}>
                                <span className={styles.popTextRight}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                                <span className={styles.smallImage}>
                                  <Image
                                    src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                    alt="Small Blog"
                                    width={130}
                                    height={96}
                                />
                                </span>
                              </Col>
                            </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col style={{paddingTop: '5%', paddingBottom: '5%'}}>
                      <Row>
                        <Col><h2 className={styles.mainHeading}>Latest Blogs</h2></Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              margin: '10px',
                              borderRadius: '5px'
                            }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{paddingBottom: '5%'}}>
                      <Row>
                        <Col><h2 className={styles.mainHeading}>Ivy League</h2></Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              margin: '10px',
                              borderRadius: '5px'
                            }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSection}>
                            <h4 className={styles.popular}>Popular Blog</h4>
                            <Row>
                              <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                    height={96}
                              />
                              </span>
                                <span className={styles.popTextLeft}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                              </Col>
                            </Row>

                            <Row>
                              <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                    height={96}
                              />
                              </span>
                                <span className={styles.popTextLeft}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                              </Col>
                            </Row>

                            <Row>
                              <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                    height={96}
                              />
                              </span>
                                <span className={styles.popTextLeft}>
                                  <h3 className={styles.heading3}>How to get into the University of California</h3>
                                  <p className={styles.descriptionDate}>
                                    <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                  </p>
                                </span>
                              </Col>
                            </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row style={{
                            paddingLeft: '20px',
                            paddingRight: '20px'
                          }}>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              borderRadius: '5px'
                            }}>
                             
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              paddingTop: '15%',
                              paddingLeft: '0',
                              paddingRight: '0'
                            }}>
                              <h1 className={styles.heading1}>
                                How to get into the University of California
                              </h1>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering both undergraduate and graduate education....</p>
                              <p className={styles.descriptionDate}>
                                <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{paddingTop: '5%', paddingBottom: '5%'}}>
                      <Row>
                        <Col><h2 className={styles.mainHeading}>Read more</h2></Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              margin: '10px',
                              borderRadius: '5px'
                            }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                              backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '425px',
                              margin: '10px',
                              borderRadius: '5px'
                            }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col style={{
                                backgroundImage: "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px'
                              }}>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>How to get into the University of California</h3>
                              <p className={styles.description}>The University of California is ranked among the world’s best for its innovation, pioneering research, and discovery. It has ten campuses, with nine offering...</p>
                                <p className={styles.descriptionDate}>
                                  <span style={{paddingRight: '20px'}}>Undergraduate</span><span>September 15, 2022</span>
                                </p>
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
