import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import moment from 'moment'
import {
  APIGetBlogs,
  APIGetBlogsByCategory,
  APIGetTotalBlogsCount,
} from '../../config/API'
import Link from 'next/link'

const index = ({
  popular = [],
  latest = [],
  ivyLeague = [],
  essays = [],
  uk = [],
  canada = [],
  extracurricular = [],
}) => {
  console.log('Data', popular)
  console.log('Data', latest)
  console.log('Data', ivyLeague)
  console.log('Data', essays)
  console.log('Data', canada)
  console.log('Data', uk)
  console.log('Data', extracurricular)

  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState()

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${APIGetBlogs}${page}`)
      console.log('Response ------->', response.data.data)
      setBlogs(response.data.data)
    } catch (err) {
      console.log('Error -------------->', err)
    }
  }
  const fetchTotalPosts = async () => {
    try {
      const response = await axios.get(APIGetTotalBlogsCount)
      setTotalPosts(response.data.data.COUNT)
      console.log('Total Length ---------->', response.data.data.COUNT)
    } catch (err) {
      console.log('Error -------------->', err)
    }
  }
  useEffect(() => {
    fetchTotalPosts()
  }, [])

  useEffect(() => {
    fetchPosts(page)
  }, [page])

  if (!popular.length) {
    return <div></div>
  }
  const html = popular[0].CONTENT
  let text = ''
  let paragraphs = html.match(/<p>.*?<\/p>/g) // ["<p>This is the first paragraph.</p>", "<p>This is the second paragraph.</p>", "<p>This is the third paragraph.</p>"]
  for (let i = 0; i < paragraphs.length; i++) {
    let paragraphText = paragraphs[i].replace(/<\/?p>/g, '') // "This is the first paragraph."
    if (text.length + paragraphText.length <= 200) {
      text += paragraphText
    } else {
      break
    }
  }
  if (text.length < 200) {
    if (paragraphs.length > 1) {
      text += paragraphs[1].replace(/<\/?p>/g, '').slice(0, 200 - text.length) // Add the first 100 - text.length characters of the second paragraph
      text += '...'
    }
  } else {
    text += '...'
  }

  const getText = (content) => {
    const html = content
    let text = ''
    let paragraphs = html.match(/<p>.*?<\/p>/g) // ["<p>This is the first paragraph.</p>", "<p>This is the second paragraph.</p>", "<p>This is the third paragraph.</p>"]\

    for (let i = 0; i < paragraphs.length; i++) {
      let paragraphText = paragraphs[i].replace(/<\/?p>/g, '') // "This is the first paragraph."
      if (text.length + paragraphText.length <= 200) {
        text += paragraphText
      } else {
        break
      }
    }
    if (text.length < 200) {
      if (paragraphs.length > 1) {
        text += paragraphs[1].replace(/<\/?p>/g, '').slice(0, 200 - text.length) // Add the first 100 - text.length characters of the second paragraph
        text += '...'
      }
    } else {
      text += '...'
    }
    return text
  }

  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
          <Row className={styles.textWrap}>
            <Col className={styles.blogWrap}>
              <Row>
                <Col
                  className={styles.blogBanner}
                  style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                  }}
                >
                  <Row>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Link href={`/post/${latest[0].POST_ID}`}>
                        <Row>
                          <Col lg={6} md={6} sm={12} xs={12}>
                            <Row
                              style={{
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <Col
                                style={{
                                  backgroundImage: `url('${popular[0].DISPLAY_IMAGE_BANNER}')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  height: '425px',
                                  borderRadius: '15px',
                                  cursor: 'pointer',
                                }}
                              ></Col>
                            </Row>
                          </Col>
                          <Col lg={6} md={6} sm={12} xs={12}>
                            <Row>
                              <Col
                                style={{
                                  paddingTop: '15%',
                                  paddingLeft: '0',
                                  paddingRight: '0',
                                }}
                              >
                                <h1 className={styles.heading1}>
                                  {popular[0].TITLE}
                                </h1>
                                <p className={styles.description}>
                                  {/* The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering both undergraduate and
                                graduate education.... */}
                                  {text}
                                </p>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    {popular[0].CATEGORIES}
                                  </span>
                                  <span style={{ paddingRight: '20px' }}>
                                    {moment(popular[0].CREATED_AT).format(
                                      'MMMM D, YYYY'
                                    )}
                                  </span>
                                  <span>
                                    <i className="fa fa-eye"></i>
                                    {popular[0].VISITOR_COUNT}
                                  </span>
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Link>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSection}>
                          <h4 className={styles.popular}>Popular Blog</h4>
                          {popular.slice(1, 4).map((item, index) => {
                            return (
                              <Link href={`/post/${item.POST_ID}`}>
                                <Row key={index}>
                                  <Col className={styles.popDev}>
                                    <span className={styles.popTextRight}>
                                      <h3 className={styles.heading3}>
                                        {item.TITLE}
                                      </h3>
                                      <p className={styles.descriptionDate}>
                                        <span style={{ paddingRight: '20px' }}>
                                          {item.CATEGORIES}
                                        </span>
                                        <span style={{ paddingRight: '20px' }}>
                                          {moment(item.CREATED_AT).format(
                                            'MMMM D, YYYY'
                                          )}
                                        </span>
                                        <span>
                                          <i className="fa fa-eye"></i>
                                          {item.VISITOR_COUNT}
                                        </span>
                                      </p>
                                    </span>
                                    <span className={styles.smallImage}>
                                      <Image
                                        src={item.DISPLAY_IMAGE_BANNER}
                                        alt="Small Blog"
                                        width={130}
                                        height={96}
                                      />
                                    </span>
                                  </Col>
                                </Row>
                              </Link>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Latest Blogs</h2>
                        </Col>
                      </Row>
                      <Row>
                        {latest.slice(0, 4).map((item, index) => {
                          const text = getText(item.CONTENT)
                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                cursor: 'pointer',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Ivy League</h2>
                        </Col>
                      </Row>
                      <Row>
                        {ivyLeague.map((item, index) => {
                          const text = getText(item.CONTENT)
                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                cursor: 'pointer',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Essays</h2>
                        </Col>
                      </Row>
                      <Row>
                        {essays.map((item, index) => {
                          const text = getText(item.CONTENT)
                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                cursor: 'pointer',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>UK</h2>
                        </Col>
                      </Row>
                      <Row>
                        {uk.map((item, index) => {
                          const text = getText(item.CONTENT)
                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                cursor: 'pointer',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Canada</h2>
                        </Col>
                      </Row>
                      <Row>
                        {canada.map((item, index) => {
                          const text = getText(item.CONTENT)

                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                cursor: 'pointer',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}{' '}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSectionSec}>
                          <h4 className={styles.popular}>Application Components</h4>
                          {extracurricular.slice(1, 4).map((item, index) => {
                            return (
                              <Row key={index}>
                                <Col className={styles.popDev}>
                                  <span className={styles.smallImage}>
                                    <Image
                                      src={item.DISPLAY_IMAGE_BANNER}
                                      alt="Small Blog"
                                      width={130}
                                      height={96}
                                    />
                                  </span>
                                  <span className={styles.popTextLeft}>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>{' '}
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </span>
                                </Col>
                              </Row>
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row
                            style={{
                              paddingLeft: '20px',
                              paddingRight: '20px',
                            }}
                          >
                            <Col
                              style={{
                                backgroundImage: `url('${extracurricular[0].DISPLAY_IMAGE_BANNER}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                borderRadius: '15px',
                                cursor: 'pointer',
                              }}
                            ></Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                paddingTop: '15%',
                                paddingLeft: '0',
                                paddingRight: '0',
                              }}
                            >
                              <h1 className={styles.heading1}>
                                {extracurricular[0].TITLE}
                              </h1>
                              <p className={styles.description}>
                                {getText(extracurricular[0].CONTENT)}
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  {extracurricular[0].CATEGORIES}
                                </span>
                                <span>
                                  {moment(extracurricular[0].CREATED_AT).format(
                                    'MMMM D, YYYY'
                                  )}
                                </span>{' '}
                                <span>
                                  <i className="fa fa-eye"></i>
                                  {extracurricular[0].VISITOR_COUNT}
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Read more</h2>
                        </Col>
                      </Row>
                      <Row>
                        {blogs.map((item, index) => {
                          const text = getText(item.CONTENT)
                          return (
                            // <Fragment>
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '15px',
                                      cursor: 'pointer',
                                      
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span>
                                        <i className="fa fa-eye"></i>
                                        {item.VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                            // </Fragment>
                          )
                        })}
                      </Row>
                      <Row>
                        <Col className="text-center pt-3 pb-3">
                          <Button
                            style={{
                              borderRadius: '40px',
                              fontSize: '16px',
                              letterSpacing: '0.05rem',
                              background: '#000000',
                              border: '1px solid #000000',
                              padding: '7px 20px',
                              // display: `${
                              //   totalPosts == blogs.length && 'none'
                              // }`,
                            }}
                            onClick={() =>
                              totalPosts == blogs.length
                                ? setPage((prev) => prev - 1)
                                : setPage((prev) => prev + 1)
                            }
                          >
                            {totalPosts == blogs.length
                              ? 'Load Less'
                              : 'Load More'}
                          </Button>
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
