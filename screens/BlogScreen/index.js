import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../BlogScreen/blog.module.scss'
import axios from 'axios'
import moment from 'moment'
import { parse } from 'parse5'

import { Typeahead } from 'react-bootstrap-typeahead'
import Autocomplete from 'react-autocomplete'

import 'react-bootstrap-typeahead/css/Typeahead.css'

import {
  APIGetBlogs,
  APIGetBlogsByCategory,
  APIGetBlogsByName,
  APIGetTotalBlogsCount,
} from '../../config/API'

const index = ({ popular, latest }) => {
  console.log('Popular', latest)

  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState()

  useState(() => {
    latest && latest.length && setBlogs(latest)
  }, [latest])

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

  if (!latest.length) {
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
          if (count >= 175) {
            break
          }
        }
      }
      if (count >= 175) {
        return
      }
    })

    if (text.length >= 175) {
      text = text.slice(0, 175) + '...'
    }

    return text
  }

  // const [hasMoreBlogs, setHasMoreBlogs] = useState(false)
  const getPostsByCategory = async (c, limit) => {
    try {
      let result = []
      // page === 1 &&
      setIsLoading(true)

      searchString && setSearchString('')
      const blgs = await axios.get(
        `${APIGetBlogsByCategory}${limit}/${c.replace(
          '/',
          '%2F'
        )}/0?page_no=${page}`
      )
      if (blgs.data.data.length) {
        result = [...blogs]
        result.push(...blgs.data.data)
      }

      // page === 1 &&

      setBlogs((prev) => [...prev, ...result])
      setTotalPages(result && result.length ? Math.floor(result.length / 4) : 1)
      setIsLoading(false)
      console.log('DAta ->', blogs.data)
      // setHasMoreBlogs(!!blogs.data.hasMore)
    } catch (err) {
      console.log('Error -->', err)
      setIsLoading(false)
    }
  }

  const updateCategories = (categories) => {
    return !categories.replaceAll(',', ', ').includes(', ')
      ? categories
      : categories
          .replaceAll(',', ', ')
          .split(', ')
          .map((item, idx) => (
            <span
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCategory(item)
                // handleClickTop()
              }}
            >
              {idx === 0 ? (
                <p style={{ cursor: 'pointer' }}>{item}</p>
              ) : (
                <p style={{ cursor: 'pointer' }}>{item}</p>
              )}
            </span>
          ))
  }

  useEffect(() => {
    selectedCategory && getPostsByCategory(selectedCategory, 4)
  }, [selectedCategory])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    let cancel
    setIsLoading(true)
    // const timerId = setTimeout(() => {
    if (searchString) {
      // searchString.length >= 3 &&
      axios
        .get(APIGetBlogsByName + searchString, {
          cancelToken: new axios.CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c
          }),
        })
        .then((response) => {
          setBlogs(response.data.data)
          setTotalPages(
            response.data.data && response.data.data.length
              ? Math.floor(response.data.data.length / 4)
              : 1
          )
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
      setBlogs(latest)
      setIsLoading(false)
    }
    setPage(1)
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

  // function Pagination() {
  // const [currentPage, setCurrentPage] = useState(1);

  const generatePagination = () => {
    // const totalPages = 20
    const maxDisplayedPages = 10 // Maximum number of pages to display

    let paginationHTML = []

    // Calculate start and end page numbers based on current page
    let startPage
    let endPage

    if (totalPages <= maxDisplayedPages) {
      // Display all pages if the total number of pages is less than or equal to the maximum displayed pages
      startPage = 1
      endPage = totalPages
    } else if (page <= 6) {
      // Display pages 1 to 10 if the current page is less than or equal to 6
      startPage = 1
      endPage = maxDisplayedPages
    } else if (page >= totalPages - 5) {
      // Display the last 10 pages if the current page is within the last 5 pages
      startPage = totalPages - maxDisplayedPages + 1
      endPage = totalPages
    } else {
      // Display the current page with a range of 5 pages before and after
      startPage = page - 4
      endPage = page + 5
    }

    // Add previous page link
    if (page > 1) {
      paginationHTML.push(
        <a key="prevPage" href="#" onClick={() => setPage(page - 1)}>
          &laquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <span key="prevPage" className="disabled">
          &laquo;
        </span>
      )
    }

    // Add page links between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML.push(
        <a
          key={i}
          href="#"
          className={page === i ? 'active' : ''}
          onClick={() => setPage(i)}
        >
          {i}
        </a>
      )
    }

    // Add ellipsis (...) if there are more pages after the displayed range
    if (endPage < totalPages) {
      paginationHTML.push(
        <span key="ellipsis" className="ellipsis">
          ...
        </span>
      )
    }

    // Add next page link
    if (page < totalPages) {
      paginationHTML.push(
        <a key="nextPage" href="#" onClick={() => setPage(page + 1)}>
          &raquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <span key="nextPage" className="disabled">
          &raquo;
        </span>
      )
    }

    return paginationHTML
  }

  // return paginationHTML;
  // };

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
                          ? popular.slice(0, 3).map((item, idx) => {
                              return (
                                <Carousel.Item>
                                  <Link
                                    href={`/post/${item.POST_ID}`}
                                    key={idx}
                                  >
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
                                                    <p
                                                      dangerouslySetInnerHTML={{
                                                        __html: getText(
                                                          item.CONTENT
                                                        ),
                                                      }}
                                                    ></p>
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
                                  </Link>
                                </Carousel.Item>
                              )
                            })
                          : null}
                        {/* <Carousel.Item>
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
                        </Carousel.Item> */}
                      </Carousel>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col className={styles.blogMainSectionWrap} id="#1">
                  <Row className={styles.blogSearch}>
                    <Col lg={2} md={2} sm={12} xs={12}></Col>
                    <Col lg={10} md={10} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <h2>
                            {selectedCategory ? selectedCategory : 'Blogs'}
                          </h2>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Form>
                            <Form.Control
                              type="search"
                              placeholder="Search"
                              className="me-2"
                              aria-label="Search"
                              value={searchString}
                              onChange={(e) => setSearchString(e.target.value)}
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
                          <p
                            onClick={() => {
                              setSelectedCategory('Popular')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Popular'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Popular
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Latest')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Latest'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Latest
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('US')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'US'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              US
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('UK')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'UK'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              UK
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Canada')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Canada'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Canada
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Undergraduate')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Undergraduate'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Undergraduate
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('SAT/ACT')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'SAT/ACT'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              SAT/ACT
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Visa')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Visa'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Visa
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Masters')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Masters'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Masters
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Ivy League')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Ivy League'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Ivy League
                            </a>
                          </p>
                          <p
                            onClick={() => {
                              setSelectedCategory('Application Components')
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <a
                              className={
                                selectedCategory === 'Application Components'
                                  ? styles.SelectedCategory
                                  : ''
                              }
                            >
                              Application Components
                            </a>
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
                        {!isLoading && !blogs.length
                          ? 'No Blogs Found!'
                          : blogs
                              .slice((page - 1) * 4, (page - 1) * 4 + 4)
                              .map((item, idx) => {
                                return (
                                  <Col lg={6} md={6} sm={12} xs={12} key={idx}>
                                    <Row>
                                      <Col className={styles.blogTile}>
                                        <Row>
                                          <Col>
                                            <Image
                                              src={item.DISPLAY_IMAGE_BANNER}
                                              alt="Small Blog"
                                              width={750}
                                              height={436}
                                            />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <h3>
                                              {item.TITLE &&
                                              item.TITLE.length < 36
                                                ? item.TITLE
                                                : item.TITLE.substring(0, 36) +
                                                  '...'}
                                            </h3>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: getText(item.CONTENT),
                                              }}
                                            >
                                              {/* College life is an experience whose
                                            memories last a lifetime, especially
                                            because college is perhaps the only
                                            time between youth and adult life. */}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col className={styles.blogCatCard}>
                                            {/* <p>Latest</p>
                                          <p>Masters</p>
                                          <p>Visa</p> */}

                                            {updateCategories(item.CATEGORIES)}
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col className={styles.tileCardDate}>
                                            {/* <p>March 16, 2023</p> */}
                                            {moment(item.CREATED_AT).format(
                                              'MMMM D, YYYY'
                                            )}
                                            <p className={styles.minRead}>
                                              12 min read
                                            </p>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                )
                              })}
                        {/* <Col lg={6} md={6} sm={12} xs={12}>
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
                        </Col> */}
                      </Row>

                      {/* <Row className={styles.blogCardWrap}>
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
                      </Row> */}

                      <Row>
                        <Col>
                          <div className="blog-center">
                            <div className="blog-pagination">
                              {/* <a href="#">&laquo;</a>
                              <a href="#" class="active">
                                1
                              </a>
                              <a href="#">2</a>
                              <a href="#">&raquo;</a> */}
                              {/* <a id="prevPage" href="#">
                                &laquo;
                              </a>
                              <span id="paginationContainer"></span>
                              <a id="nextPage" href="#">
                                &raquo;
                              </a> */}
                              {totalPages > 1 && generatePagination()}
                            </div>
                          </div>
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
