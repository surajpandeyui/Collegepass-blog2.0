import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../BlogScreen/blog.module.scss'
import moment from 'moment/moment'

const index = ({ popular }) => {
  console.log('Popular', popular)

  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState()

  const [selectedCategory, setSelectedCategory] = useState('')

  const [categoryPage, setCategoryPage] = useState(1)

  const [searchString, setSearchString] = useState('')

  // useEffect(() => {
  //   setBlogs(blogPosts)
  // }, [blogPosts])
  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios.get(`${APIGetBlogs}${page}`)
  //     console.log('Response ------->', response.data.data)
  //     setBlogs(response.data.data)
  //   } catch (err) {
  //     console.log('Error -------------->', err)
  //   }
  // }
  // const fetchTotalPosts = async () => {
  //   try {
  //     const response = await axios.get(APIGetTotalBlogsCount)
  //     setTotalPosts(response.data.data.COUNT)
  //     console.log('Total Length ---------->', response.data.data.COUNT)
  //   } catch (err) {
  //     console.log('Error -------------->', err)
  //   }
  // }
  // useEffect(() => {
  //   fetchTotalPosts()
  // }, [])

  // useEffect(() => {
  //   !searchString && !selectedCategory && fetchPosts(page)
  // }, [page, searchString, selectedCategory])

  if (!popular.length) {
    return <div></div>
  }

  function getElementsByTagName(node, tag) {
    let elements = []
    if (node.nodeName === tag) {
      elements.push(node)
    }
    if (node.childNodes) {
      node.childNodes.forEach((childNode) => {
        elements = elements.concat(getElementsByTagName(childNode, tag))
      })
    }
    return elements
  }

  const getText = (content) => {
    if (!content || typeof content !== 'string') {
      return ''
    }

    const document = parse(content)

    const elementsWithText = ['p']
    let text = ''
    let count = 0

    elementsWithText.forEach((tag) => {
      const elements = getElementsByTagName(document, tag)
      for (let i = 0; i < elements.length; i++) {
        const elementText = elements[i].childNodes[0].value.trim()
        if (elementText) {
          text += elementText + ' '
          count += elementText.length
          if (count >= 193) {
            break
          }
        }
      }
      if (count >= 193) {
        return
      }
    })

    if (text.length >= 193) {
      text = text.slice(0, 193) + '...'
    }

    return text
  }

  const [hasMoreBlogs, setHasMoreBlogs] = useState(false)
  const getPostsByCategory = async (c, limit) => {
    try {
      const result = []
      categoryPage === 1 && setIsLoading(true)

      const blogs = await axios.get(
        `${APIGetBlogsByCategory}${limit}/${c.replace(
          '/',
          '%2F'
        )}/0?page_no=${categoryPage}`
      )
      if (blogs.data.data.length) {
        result.push(...blogs.data.data)
      }

      categoryPage === 1 && setIsLoading(false)

      setBlogs((prev) => (categoryPage > 1 ? [...prev, ...result] : result))
      console.log('DAta ->', blogs.data)
      setHasMoreBlogs(!!blogs.data.hasMore)
    } catch (err) {
      console.log('Error -->', err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    selectedCategory && getPostsByCategory(selectedCategory, 8)
  }, [selectedCategory])

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    let cancel
    setIsLoading(true)
    // const timerId = setTimeout(() => {
    if (searchString) {
      axios
        .get(APIGetBlogsByName + searchString, {
          cancelToken: new axios.CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
          }),
        })
        .then((response) => {
          setBlogs(response.data.data)
          setIsLoading(false)
          setSelectedCategory(null)
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            // Request was canceled
            console.log('Request canceled: ', error.message)
          } else {
            console.log(error)
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }
    // else {
    //   axios
    //     .get(APIGetBlogsByName + searchString)
    //     .then((resp) => setData(resp.data.data))
    //     .catch((error) => {
    //       if (axios.isCancel(error)) {
    //         // Request was canceled
    //         console.log('Request canceled: ', error.message)
    //       } else {
    //         console.log(error)
    //         setIsLoading(false)
    //       }
    //     })
    // }
    // }, 1000)
    return () => {
      // clearTimeout(timerId)
      if (cancel) {
        cancel('Request canceled by user')
      }
    }
  }, [searchString])
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
                      <h3>Popular Articles</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Carousel>
                        {popular && popular.length
                          ? popular.map((item, idx) => {
                              return (
                                <Link href={`/post/${item.POST_ID}`}>
                                  <Carousel.Item key={idx}>
                                    <Row>
                                      <Col className={styles.blogSliderWrap}>
                                        <Row className={styles.sliderWidth}>
                                          <Col lg={4} md={4} sm={12} xs={12}>
                                            <Row>
                                              <Col
                                                className={styles.blogSliderImg}
                                              >
                                                <Image
                                                  src={
                                                    item.DISPLAY_IMAGE_BANNER
                                                  }
                                                  alt="Small Blog"
                                                  width={605}
                                                  height={700}
                                                />
                                              </Col>
                                            </Row>
                                          </Col>
                                          <Col lg={8} md={8} sm={12} xs={12}>
                                            <Row>
                                              <Col
                                                className={
                                                  styles.blogSliderTextSection
                                                }
                                              >
                                                <Row>
                                                  <Col
                                                    className={
                                                      styles.SliderHeading
                                                    }
                                                  >
                                                    <h3>
                                                      {/* Harvard Returns in the Fall */}
                                                      {item.TITLE}
                                                    </h3>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col
                                                    className={
                                                      styles.SliderDescription
                                                    }
                                                  >
                                                    <p>
                                                      {getText(item.CONTENT)}
                                                    </p>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col
                                                    className={
                                                      styles.SliderCategory
                                                    }
                                                  >
                                                    {/* <p>Latest</p>
                                                <p>Masters</p>
                                                <p>Visa</p> */}
                                                    {updateCategories(
                                                      item.CATEGORIES
                                                    )}
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col
                                                    className={
                                                      styles.SliderDate
                                                    }
                                                  >
                                                    {/* <p>March 16, 2023</p> */}
                                                    {moment(
                                                      item.CREATED_AT
                                                    ).format('MMMM D, YYYY')}
                                                    <p>12 min read</p>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Carousel.Item>
                                </Link>
                              )
                            })
                          : null}
                        <Carousel.Item>
                          <Row>
                            <Col className={styles.blogSliderWrap}>
                              <Row className={styles.sliderWidth}>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                  <Row>
                                    <Col className={styles.blogSliderImg}>
                                      <Image
                                        src="/harvard_returns_front.png"
                                        alt="Small Blog"
                                        width={605}
                                        height={700}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col
                                      className={styles.blogSliderTextSection}
                                    >
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Harvard Returns in the Fall</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col
                                          className={styles.SliderDescription}
                                        >
                                          <p>
                                            College life is an experience whose
                                            memories last a lifetime, especially
                                            because college is perhaps the only
                                            time between youth and adult life.
                                            You can live a pseudo suspended
                                            life, with as much time for play, as
                                            for extracurricular activities. As
                                            one steps into the professional
                                            sphere, an adult rues the lack of
                                            work-life balance, making college
                                            life even more memorable.
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest</p>
                                          <p>Masters</p>
                                          <p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>March 16, 2023</p>
                                          <p>12 min read</p>
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
                                    <Col className={styles.blogSliderImg}>
                                      <Image
                                        src="/harvard_returns_front.png"
                                        alt="Small Blog"
                                        width={605}
                                        height={700}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col
                                      className={styles.blogSliderTextSection}
                                    >
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Harvard Returns in the Fall</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col
                                          className={styles.SliderDescription}
                                        >
                                          <p>
                                            College life is an experience whose
                                            memories last a lifetime, especially
                                            because college is perhaps the only
                                            time between youth and adult life.
                                            You can live a pseudo suspended
                                            life, with as much time for play, as
                                            for extracurricular activities. As
                                            one steps into the professional
                                            sphere, an adult rues the lack of
                                            work-life balance, making college
                                            life even more memorable.
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest Popular</p>
                                          <p>Masters</p>
                                          <p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>March 16, 2023</p>
                                          <p>12 min read</p>
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
                                    <Col className={styles.blogSliderImg}>
                                      <Image
                                        src="/harvard_returns_front.png"
                                        alt="Small Blog"
                                        width={605}
                                        height={700}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                  <Row>
                                    <Col
                                      className={styles.blogSliderTextSection}
                                    >
                                      <Row>
                                        <Col className={styles.SliderHeading}>
                                          <h3>Harvard Returns in the Fall</h3>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col
                                          className={styles.SliderDescription}
                                        >
                                          <p>
                                            College life is an experience whose
                                            memories last a lifetime, especially
                                            because college is perhaps the only
                                            time between youth and adult life.
                                            You can live a pseudo suspended
                                            life, with as much time for play, as
                                            for extracurricular activities. As
                                            one steps into the professional
                                            sphere, an adult rues the lack of
                                            work-life balance, making college
                                            life even more memorable.
                                          </p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderCategory}>
                                          <p>Latest Popular</p>
                                          <p>Masters</p>
                                          <p>Visa</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={styles.SliderDate}>
                                          <p>March 16, 2023</p>
                                          <p>12 min read</p>
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
                    <Col lg={2} md={2} sm={12} xs={12}></Col>
                    <Col lg={10} md={10} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <h2>Blogs</h2>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
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
                    <Col
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      className={styles.browseCategory}
                    >
                      <Row>
                        <Col className={styles.catSectionShort}>
                          <p className={styles.hideOnMob}>Browse Categories</p>
                          <p>
                            <a className={styles.SelectedCategory}>Popular</a>
                          </p>
                          <p>
                            <a>Latest</a>
                          </p>
                          <p>
                            <a>US</a>
                          </p>
                          <p>
                            <a>UK</a>
                          </p>
                          <p>
                            <a>Canada</a>
                          </p>
                          <p>
                            <a>Undergraduate</a>
                          </p>
                          <p>
                            <a>SAT/ACT</a>
                          </p>
                          <p>
                            <a>Visa</a>
                          </p>
                          <p>
                            <a>Masters</a>
                          </p>
                          <p>
                            <a>Ivy League</a>
                          </p>
                          <p>
                            <a>Application Components</a>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={10}
                      md={10}
                      sm={12}
                      xs={12}
                      className={styles.blogSections}
                    >
                      <Row className={styles.blogCardWrap}>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col className={styles.blogTile}>
                              <Row>
                                <Col>
                                  <Image
                                    src="/harvard_returns_post.png"
                                    alt="Small Blog"
                                    width={750}
                                    height={436}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>Harvard Returns in the Fall</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>
                                    College life is an experience whose memories
                                    last a lifetime, especially because college
                                    is perhaps the only time between youth and
                                    adult life.
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p>
                                  <p>Masters</p>
                                  <p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>March 16, 2023</p>
                                  <p className={styles.minRead}>12 min read</p>
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
                                  <Image
                                    src="/UC's_post.png"
                                    alt="Small Blog"
                                    width={750}
                                    height={436}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>
                                    How to Get Into the University of California
                                  </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>
                                    College life is an experience whose memories
                                    last a lifetime, especially because college
                                    is perhaps the only time between youth and
                                    adult life.
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p>
                                  <p>Masters</p>
                                  <p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>March 16, 2023</p>
                                  <p className={styles.minRead}>12 min read</p>
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
                                  <Image
                                    src="/stanford.png"
                                    alt="Small Blog"
                                    width={750}
                                    height={436}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>How to Get Into Stanford</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className={styles.tileDes}>
                                    College life is an experience whose memories
                                    last a lifetime, especially because college
                                    is perhaps the only time between youth and
                                    adult life.
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p>
                                  <p>Masters</p>
                                  <p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>March 16, 2023</p>
                                  <p className={styles.minRead}>12 min read</p>
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
                                  <Image
                                    src="/waterloo_post.png"
                                    alt="Small Blog"
                                    width={750}
                                    height={436}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>How to Get Into Waterloo</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p>
                                    College life is an experience whose memories
                                    last a lifetime, especially because college
                                    is perhaps the only time between youth and
                                    adult life.
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.blogCatCard}>
                                  <p>Latest</p>
                                  <p>Masters</p>
                                  <p>Visa</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col className={styles.tileCardDate}>
                                  <p>March 16, 2023</p>
                                  <p className={styles.minRead}>12 min read</p>
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
