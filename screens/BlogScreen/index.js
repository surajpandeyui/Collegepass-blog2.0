import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
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
import Link from 'next/link'

const index = ({
  popular = [],
  latest = [],
  ivyLeague = [],
  essays = [],
  uk = [],
  canada = [],
  extracurricular = [],
  blogPosts = [],
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

  const [selectedCategory, setSelectedCategory] = useState('')

  const [categoryPage, setCategoryPage] = useState(1)

  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    setBlogs(blogPosts)
  }, [blogPosts])
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
    !searchString && !selectedCategory && fetchPosts(page)
  }, [page, searchString, selectedCategory])

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
    const timerId = setTimeout(() => {
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
    }, 1000)
    return () => {
      clearTimeout(timerId)
      if (cancel) {
        cancel('Request canceled by user')
      }
    }
  }, [searchString])

  useEffect(() => {
    categoryPage > 1 && getPostsByCategory(selectedCategory, 8)
  }, [categoryPage])

  const categoryHandler = (category) => {
    setSelectedCategory(category)
    setCategoryPage(1)
    setSearchString('')
  }

  console.log('Search String ===?', searchString)
  const options = [
    'Popular',
    'Undergraduate',
    'Stanford',
    'LOR',
    'Latest',
    'Extracurricular',
    'Visa',
    'Essay',
    'US',
    'UK',
    'SAT/ACT',
    'Ivy League',
    'Canada',
    'LGBTQ+',
  ]

  const handleClickTop = () => {
    // Set the state here
    const scrollToTop = () => {
      // const currentPosition = window.pageYOffset
      // if (currentPosition > 0) {
      //   window.requestAnimationFrame(scrollToTop)
      // window.scrollTo(0, currentPosition - currentPosition / 2)
      window.scrollTo(0, 0)
      // }
    }
    scrollToTop()
  }

  return (
    <Fragment>
      <Container fluid className="bg-black">
        <Container>
          <Row className={styles.textWrap}>
            <Col className={styles.blogWrap}>
              <Row>
                <Col className={styles.headerSearch}>
                  <p
                    style={{
                      textAlign: 'center',
                      overflowX: 'visible!important',
                    }}
                  >
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className={`me-2 ${styles.desktopInput}`}
                        aria-label="Search"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                      />
                    </Form>

                    <Form>
                      <Typeahead
                        options={options}
                        placeholder="Search"
                        className={`${styles.typeahead} ${
                          searchString &&
                          !options.filter((value) =>
                            value
                              .toLowerCase()
                              .includes(searchString.toLowerCase())
                          ).length &&
                          styles.typeaheadNone
                        }`}
                        aria-label="Search"
                        // selected={searchString ? [searchString] : []}
                        // defaultInputValue={searchString}
                        onChange={(value) => setSearchString(value[0])}
                        emptyLabel=""
                        // defaultSelected={options.slice(0, 1)}
                        id="selections-example"
                        labelKey="name"
                        onInputChange={(text, e) => {
                          console.log(text, e)
                          const value = text
                          setSearchString(`${e.target.defaultValue}`)
                        }}
                        // filterBy={['label']}

                        // dropup
                      />
                    </Form>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={styles.headerCategory}>
                  <Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav>
                      <Nav.Link
                        className={
                          selectedCategory === 'Latest'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Latest')}
                      >
                        Latest
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Popular'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Popular')}
                      >
                        Popular
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'US'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('US')}
                      >
                        US
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'UK'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('UK')}
                      >
                        UK
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Canada'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Canada')}
                      >
                        Canada
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Undergraduate'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Undergraduate')}
                      >
                        Undergraduate
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'SAT/ACT'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('SAT/ACT')}
                      >
                        SAT/ACT
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Visa'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Visa')}
                      >
                        Visa
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Application Components'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() =>
                          categoryHandler('Application Components')
                        }
                      >
                        Application Components
                      </Nav.Link>
                      <Nav.Link
                        className={
                          selectedCategory === 'Masters'
                            ? styles.selectedCategory
                            : null
                        }
                        href="#"
                        onClick={() => categoryHandler('Masters')}
                      >
                        Masters
                      </Nav.Link>

                      <NavDropdown
                        title="Other Categories"
                        id="basic-nav-dropdown"
                      >
                        {/* <NavDropdown.Item
                          className={
                            selectedCategory === 'Essay'
                              ? styles.selectedCategory
                              : null
                          }
                          href="#"
                          onClick={() => categoryHandler('Essay')}
                        >
                          Essay
                        </NavDropdown.Item> */}

                        <NavDropdown.Item
                          className={
                            selectedCategory === 'Ivy League'
                              ? styles.selectedCategory
                              : null
                          }
                          href="#"
                          onClick={() => categoryHandler('Ivy League')}
                        >
                          Ivy League+
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item
                          className={
                            selectedCategory === 'LGBTQ+'
                              ? styles.selectedCategory
                              : null
                          }
                          href="#"
                          onClick={() => categoryHandler('LGBTQ+')}
                        >
                          LGBTQ+
                        </NavDropdown.Item> */}
                      </NavDropdown>
                    </Nav>
                  </Navbar>
                </Col>
              </Row>
              {isLoading ? (
                <h1
                  style={{
                    letterSpacing: '0.03rem',
                    color: '#ffffff',
                    fontSize: '24px',
                  }}
                >
                  Loading ...
                </h1>
              ) : (
                <Row>
                  {selectedCategory || searchString ? (
                    <Row>
                      <Col style={{ paddingBottom: '5%' }}>
                        <Row>
                          {!searchString ? (
                            <Col>
                              <h2 className={styles.mainHeading}>
                                {selectedCategory}
                              </h2>
                            </Col>
                          ) : null}
                        </Row>
                        <Row className={styles.readMoreSection}>
                          {!blogs.length ? (
                            <h1
                              style={{
                                letterSpacing: '0.03rem',
                                color: '#ffffff',
                                fontSize: '24px',
                              }}
                            >
                              No Blogs Found...
                            </h1>
                          ) : (
                            blogs.map((item, index) => {
                              const text = getText(item.CONTENT)
                              return (
                                <Link href={`/post/${item.POST_ID}`}>
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Link>
                              )
                            })
                          )}
                        </Row>
                      </Col>
                      {!searchString && hasMoreBlogs ? (
                        <Row>
                          <Col className="text-center pt-3 pb-3">
                            <Button
                              style={{
                                borderRadius: '40px',
                                fontSize: '16px',
                                letterSpacing: '0.05rem',
                                background: '#ffffff',
                                border: '1px solid #ffffff',
                                color: '#000000',
                                padding: '7px 20px',
                                // display: `${
                                //   totalPosts == blogs.length && 'none'
                                // }`,
                              }}
                              onClick={
                                () => setCategoryPage((prev) => prev + 1)
                                // : setPage((prev) => prev + 1)
                              }
                            >
                              {'Load More'}
                            </Button>
                          </Col>
                        </Row>
                      ) : null}
                    </Row>
                  ) : (
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
                                  className="image-hover-zoom"
                                  style={{
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                  }}
                                >
                                  <Col
                                    className="inner perticular-top"
                                    style={{
                                      backgroundImage: `url('${popular[0].DISPLAY_IMAGE_BANNER}')`,
                                    }}
                                  ></Col>
                                </Row>
                              </Col>
                              <Col lg={6} md={6} sm={12} xs={12}>
                                <Row>
                                  <Col
                                    style={{
                                      paddingTop: '15%',
                                      paddingBottom: '15%',
                                    }}
                                  >
                                    <h1 className={styles.heading1}>
                                      {popular[0].TITLE.substring(0, 26) +
                                        '...'}
                                    </h1>
                                    <p
                                      className={styles.description}
                                      dangerouslySetInnerHTML={{
                                        __html: getText(popular[0].CONTENT),
                                      }}
                                    >
                                      {/* The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering both undergraduate and
                                graduate education.... */}
                                    </p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        <span style={{ paddingRight: '20px' }}>
                                          {!popular[0].CATEGORIES.replaceAll(
                                            ',',
                                            ', '
                                          ).includes(', ')
                                            ? popular[0].CATEGORIES
                                            : popular[0].CATEGORIES.replaceAll(
                                                ',',
                                                ', '
                                              )
                                                .split(', ')
                                                .map((item, idx) => (
                                                  <span
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      setSelectedCategory(item)
                                                      handleClickTop()
                                                    }}
                                                  >
                                                    {`${
                                                      idx === 0 ? '' : ', '
                                                    }${item}`}
                                                  </span>
                                                ))}
                                        </span>
                                      </span>
                                    </p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {moment(popular[0].CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                      <span
                                        style={{
                                          color: '#ffffff',
                                        }}
                                      >
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
                                            {item.TITLE.length >= 30
                                              ? item.TITLE.substring(0, 26) +
                                                '...'
                                              : item.TITLE}
                                          </h3>
                                          <p className={styles.descriptionDate}>
                                            <span
                                              style={{ paddingRight: '20px' }}
                                            >
                                              {!item.CATEGORIES.replaceAll(
                                                ',',
                                                ', '
                                              ).includes(', ')
                                                ? item.CATEGORIES
                                                : item.CATEGORIES.replaceAll(
                                                    ',',
                                                    ', '
                                                  )
                                                    .split(', ')
                                                    .map((item, idx) => (
                                                      <span
                                                        onClick={(e) => {
                                                          e.stopPropagation()
                                                          setSelectedCategory(
                                                            item
                                                          )
                                                          handleClickTop()
                                                        }}
                                                      >
                                                        {`${
                                                          idx === 0 ? '' : ', '
                                                        }${item}`}
                                                      </span>
                                                    ))}
                                            </span>
                                          </p>
                                          <p className={styles.descriptionDate}>
                                            <span
                                              style={{ paddingRight: '20px' }}
                                            >
                                              {moment(item.CREATED_AT).format(
                                                'MMMM D, YYYY'
                                              )}
                                            </span>
                                            <span
                                              style={{
                                                color: '#ffffff',
                                              }}
                                            >
                                              <i className="fa fa-eye"></i>
                                              {item.VISITOR_COUNT}
                                            </span>
                                          </p>
                                        </span>
                                        <span
                                          className={styles.smallImage}
                                          style={{
                                            display: 'inline-block',
                                            maxWidth: '136px!important',
                                            maxHeight: '96px!important',
                                            borderRadius: '15px',
                                            overflow: 'hidden',
                                            minWidth: '136px!important',
                                            minHeight: '96px!important',
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: 'absolute',
                                              top: 0,
                                              left: 0,
                                              bottom: 0,
                                              right: 0,
                                            }}
                                          >
                                            <Image
                                              src={item.DISPLAY_IMAGE_BANNER}
                                              alt="Small Blog"
                                              layout="fill"
                                              objectFit="cover"
                                              objectPosition="center"
                                            />
                                          </div>
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
                              <h2 className={styles.mainHeading}>
                                Latest Blogs
                              </h2>
                            </Col>
                          </Row>
                          <Row>
                            {latest.slice(0, 4).map((item, index) => {
                              const text = getText(item.CONTENT)
                              return (
                                <Link href={`/post/${item.POST_ID}`}>
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                              <h4 className={styles.popular}>
                                Application Components
                              </h4>
                              {extracurricular
                                .slice(1, 4)
                                .map((item, index) => {
                                  return (
                                    <Link href={`/post/${item.POST_ID}`}>
                                      <Row key={index}>
                                        <Col className={styles.popDev}>
                                          <span
                                            className={styles.smallImage}
                                            style={{
                                              display: 'inline-block',
                                              maxWidth: '136px!important',
                                              maxHeight: '96px!important',
                                              position: 'relative',
                                              borderRadius: '15px',
                                              overflow: 'hidden',
                                              minWidth: '136px!important',
                                              minHeight: '96px!important',
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                              }}
                                            >
                                              <Image
                                                src={item.DISPLAY_IMAGE_BANNER}
                                                alt="Small Blog"
                                                layout="fill"
                                                objectFit="cover"
                                                objectPosition="center"
                                              />
                                            </div>
                                          </span>

                                          <span className={styles.popTextLeft}>
                                            <h3 className={styles.heading3}>
                                              {item.TITLE.length >= 30
                                                ? item.TITLE.substring(0, 26) +
                                                  '...'
                                                : item.TITLE}
                                            </h3>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span>
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>{' '}
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </span>
                                        </Col>
                                      </Row>
                                    </Link>
                                  )
                                })}
                            </Col>
                          </Row>
                        </Col>
                        <Link href={`/post/${extracurricular[0].POST_ID}`}>
                          <Col lg={7} md={7} sm={12} xs={12}>
                            <Row>
                              <Col lg={6} md={6} sm={12} xs={12}>
                                <Row
                                  className="image-hover-zoom"
                                  style={{
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    paddingTop: '20px',
                                  }}
                                >
                                  <Col
                                    className="inner perticular-top"
                                    style={{
                                      backgroundImage: `url('${extracurricular[0].DISPLAY_IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '450px',
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
                                    }}
                                  >
                                    <h1 className={styles.heading1}>
                                      {extracurricular[0].TITLE.substring(
                                        0,
                                        26
                                      ) + '...'}
                                    </h1>
                                    <p
                                      className={styles.description}
                                      dangerouslySetInnerHTML={{
                                        __html: getText(
                                          extracurricular[0].CONTENT
                                        ),
                                      }}
                                    ></p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {extracurricular[0].CATEGORIES}
                                      </span>
                                    </p>
                                    <p className={styles.descriptionDate}>
                                      <span>
                                        {moment(
                                          extracurricular[0].CREATED_AT
                                        ).format('MMMM D, YYYY')}
                                      </span>{' '}
                                      <span
                                        style={{
                                          color: '#ffffff',
                                        }}
                                      >
                                        <i className="fa fa-eye"></i>
                                        {extracurricular[0].VISITOR_COUNT}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Link>
                      </Row>

                      <Row>
                        <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                          <Row>
                            <Col>
                              <h2 className={styles.mainHeading}>Read more</h2>
                            </Col>
                          </Row>
                          <Row className={styles.readMoreSection}>
                            {blogs.map((item, index) => {
                              const text = getText(item.CONTENT)
                              return (
                                // <Fragment>
                                <Link href={`/post/${item.POST_ID}`}>
                                  <Col
                                    lg={3}
                                    md={3}
                                    sm={12}
                                    xs={12}
                                    key={index}
                                  >
                                    <Row className={styles.mobileSection}>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row className="image-hover-zoom">
                                          <Col
                                            className="inner"
                                            style={{
                                              backgroundImage: `url('${item.DISPLAY_IMAGE_BANNER}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                              height: '410px',
                                              margin: '10px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                            }}
                                          ></Col>
                                        </Row>
                                      </Col>
                                      <Col lg={12} md={12} sm={6} xs={6}>
                                        <Row>
                                          <Col>
                                            {['top'].map((placement) => (
                                              <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip
                                                    id={`tooltip-${placement}`}
                                                  >
                                                    <h3
                                                      className={
                                                        styles.heading3
                                                      }
                                                    >
                                                      {item.TITLE}
                                                    </h3>
                                                  </Tooltip>
                                                }
                                              >
                                                <h3 className={styles.heading3}>
                                                  {item.TITLE.length >= 30
                                                    ? item.TITLE.substring(
                                                        0,
                                                        24
                                                      ) + '...'
                                                    : item.TITLE}
                                                </h3>
                                              </OverlayTrigger>
                                            ))}
                                            <p
                                              className={styles.description}
                                              dangerouslySetInnerHTML={{
                                                __html: text,
                                              }}
                                            ></p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {!item.CATEGORIES.replaceAll(
                                                  ',',
                                                  ', '
                                                ).includes(', ')
                                                  ? item.CATEGORIES
                                                  : item.CATEGORIES.replaceAll(
                                                      ',',
                                                      ', '
                                                    )
                                                      .split(', ')
                                                      .map((item, idx) => (
                                                        <span
                                                          onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(
                                                              item
                                                            )
                                                            handleClickTop()
                                                          }}
                                                        >
                                                          {`${
                                                            idx === 0
                                                              ? ''
                                                              : ', '
                                                          }${item}`}
                                                        </span>
                                                      ))}
                                              </span>
                                            </p>
                                            <p
                                              className={styles.descriptionDate}
                                            >
                                              <span
                                                style={{ paddingRight: '20px' }}
                                              >
                                                {moment(item.CREATED_AT).format(
                                                  'MMMM D, YYYY'
                                                )}
                                              </span>
                                              <span
                                                style={{
                                                  color: '#ffffff',
                                                }}
                                              >
                                                <i className="fa fa-eye"></i>
                                                {item.VISITOR_COUNT}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
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
                                  background: '#ffffff',
                                  border: '1px solid #ffffff',
                                  color: '#000000',
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
                  )}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
