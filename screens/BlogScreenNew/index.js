import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../BlogScreen/blog.module.scss'
// import Link from 'next/link'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white p-0'>
          <Row>
            <Col className='pt-3 pb-5'>
                <Row>
                    <Col lg={4} md={4} sm={12} xs={12}></Col>
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        </Form>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}></Col>
                </Row>
                <Row>
                    <Col className='pt-3'>
                        <img src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/oxbridge_1_april_banner.png" alt="How to Get Into Oxbridge" style={{
                            width: '100%'
                        }} />
                    </Col>
                </Row>
            </Col>
          </Row>
          <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h2 style={{
                                color: '#000000',
                                paddingBottom: '30px'
                            }}>Latest Blogs</h2>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        <Col className={styles.imgColumn}>
                            <Image
                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                alt="Small Blog"
                                width="750"
                                height="556"
                            />
                        </Col>
                        <Col className={styles.textColumn}>
                            <Row>
                                <Col><h1>Choosing The Right University - Study Abroad Counseling</h1></Col>
                            </Row>
                            <Row>
                                <Col><p>March 16, 2023</p></Col>
                            </Row>
                            <Row>
                                <Col><p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p></Col>
                            </Row>
                            <Row>
                                <Col><Button>Keep Reading</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        <Col>
                            <Image
                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/harvard_returns_post.png"
                                alt="Small Blog"
                                width="750"
                                height="556"
                            />
                        </Col>
                        <Col className={styles.textColumn}>
                            <Row>
                                <Col><h1>Harvard Returns In The Fall</h1></Col>
                            </Row>
                            <Row>
                                <Col><p>March 16, 2023</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Harvard's Faculty of Arts and Sciences plans to restart on-campus life this fall in full swing, holding in-person classes with total density. The news was announced by Edgerly family Dean Claudine Gay, laying out the details of the proposed return.</p></Col>
                            </Row>
                            <Row>
                                <Col><Button>Keep Reading</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        <Col>
                            <Image
                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/waterloo_post.png"
                                alt="Small Blog"
                                width="750"
                                height="556"
                            />
                        </Col>
                        <Col className={styles.textColumn}>
                            <Row>
                                <Col><h1>How to get into Waterloo</h1></Col>
                            </Row>
                            <Row>
                                <Col><p>March 16, 2023</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Waterloo is a school that helps you gain relevant experience for whatever you want to do in the future. North America's largest co-op program plus international exchanges, clubs, certificate programs, lab work, field studies, and hackathons are all examples of how Waterloo lets you explore your passions. *</p></Col>
                            </Row>
                            <Row>
                                <Col><Button>Keep Reading</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        <Col>
                            <Image
                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/stanford.png"
                                alt="Small Blog"
                                width="750"
                                height="556"
                            />
                        </Col>
                        <Col className={styles.textColumn}>
                            <Row>
                                <Col><h1>Applying to Stanford</h1></Col>
                            </Row>
                            <Row>
                                <Col><p>March 16, 2023</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Stanford is one of the most competitive schools in the country, known for its engineering department and sunny weather! In this post, I’ll walk you through the application process. Let’s start with some statistics about Stanford’s last application cycle to get a sense of what we’re up against:</p></Col>
                            </Row>
                            <Row>
                                <Col><Button>Keep Reading</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        <Col>
                            <Image
                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                alt="Small Blog"
                                width="750"
                                height="556"
                            />
                        </Col>
                        <Col className={styles.textColumn}>
                            <Row>
                                <Col><h1>Choosing The Right University - Study Abroad Counseling</h1></Col>
                            </Row>
                            <Row>
                                <Col><p>March 16, 2023</p></Col>
                            </Row>
                            <Row>
                                <Col><p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p></Col>
                            </Row>
                            <Row>
                                <Col><Button>Keep Reading</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col><h2 style={{
                                color: '#000000',
                                paddingBottom: '30px'
                            }}>Latest Post</h2></Col>
                    </Row>
                    <Row>
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <Row style={{
                                paddingBottom: '40px'
                            }}>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/choosing_the_right_uni_post.png"
                                                alt="Small Blog"
                                                width="750"
                                                height="556"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h2 style={{
                                                color: '#000000'
                                            }}>Choosing The Right University - Study Abroad Counseling</h2>
                                            <p>March 16, 2023</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            className={styles.postSide}>
                            <Row style={{
                                background: '#3b3b3b0d',
                                padding: '20px 15px',
                                width: '100%',
                                height: 'auto',
                                marginBottom: '50px',
                                borderRadius: '10px',
                                border: '1px solid rgb(235 235 235)',
                                marginLeft: '10%'
                            }}>
                                <Col className="pb-3">
                                 <h3 className={styles.postSidebarHeading}>Popular Posts</h3>
                                </Col>
                                <Row className="pb-3">
                                    <Col>
                                    <h5 className={styles.postSidebarPost}>
                                        How to get into the university of California
                                    </h5>
                                    <Image
                                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                        alt="Small Blog"
                                        width={130}
                                        height={96}
                                    />
                                    <span className="post-cat-date">
                                        <p>
                                        <a href="#">Undergraduate, Popular</a>
                                        </p>
                                        <p>
                                        <a href="#">
                                            March 16, 2023
                                        </a>
                                        </p>
                                    </span>
                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col>
                                    <h5 className={styles.postSidebarPost}>
                                    How to get into the university of California
                                    </h5>
                                    <Image
                                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                        alt="Small Blog"
                                        width={130}
                                        height={96}
                                    />
                                    <span className="post-cat-date">
                                        <p>
                                        <a href="#">Undergraduate, Popular</a>
                                        </p>
                                        <p>
                                        <a href="#">
                                        March 16, 2023
                                        </a>
                                        </p>
                                    </span>
                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col>
                                    <h5 className={styles.postSidebarPost}>
                                    How to get into the university of California
                                    </h5>
                                    <Image
                                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                        alt="Small Blog"
                                        width={130}
                                        height={96}
                                    />
                                    <span className="post-cat-date">
                                        <p>
                                        <a href="#">Undergraduate, Popular</a>
                                        </p>
                                        <p>
                                        <a href="#">
                                        March 16, 2023
                                        </a>
                                        </p>
                                    </span>
                                    </Col>
                                </Row>
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
