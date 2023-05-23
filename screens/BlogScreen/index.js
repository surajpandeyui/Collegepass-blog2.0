import React, { Fragment, useEffect, useRef, useState } from 'react'
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
  APIGetCategoryCount,
  APIGetTotalBlogsCount,
} from '../../config/API'

const index = ({ popular, latest, totalCount }) => {
  console.log('Popular', latest)
  console.log('Popular', totalCount)

  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState()
  const [isHome, setIsHome] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [categoryPage, setCategoryPage] = useState(1)

  useEffect(() => {
    ;(totalCount || selectedCategory === 'Latest') &&
      isHome &&
      setTotalPages(Math.ceil(totalCount / 4))
  }, [totalCount, selectedCategory])

  console.log('totalPages', totalPages)
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        // `${APIGetBlogs}${page > 1 ? page : categoryPage}`
        `${APIGetBlogs}${!selectedCategory ? page : categoryPage}`
      )
      console.log('Response ------->', response.data.data)
      // return response.data.data
      setBlogs(response.data.data)
    } catch (err) {
      console.log('Error -------------->', err)
    }
  }

  useEffect(() => {
    latest && latest.length && setBlogs(latest)
  }, [latest])

  useEffect(() => {
    // ;(page > 1 || categoryPage > 1) &&
    isHome && fetchPosts()
  }, [page, categoryPage, isHome])

  const [searchString, setSearchString] = useState('')

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

  const myElementRef = useRef(null)

  const handleClick = () => {
    // Focus on the element when clicked
    myElementRef.current.scrollIntoView({ behavior: 'smooth' })
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

  const getCategoriesByPage = async () => {
    try {
      let result = []
      if (selectedCategory === 'Latest') return
      // page === 1 &&
      setIsLoading(true)

      searchString && setSearchString('')
      const blgs = await axios.get(
        `${APIGetBlogsByCategory}4/${selectedCategory.replace(
          '/',
          '%2F'
        )}/0?page_no=${categoryPage}`
      )
      if (blgs.data.data.length) {
        // result = [...blogs]
        result.push(...blgs.data.data)
      }

      // page === 1 &&

      setBlogs((prev) => [...prev, ...result])
      setIsLoading(false)
      console.log('DAta ->', blgs.data)
    } catch (err) {
      console.log('Err', err)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    categoryPage > 1 && getCategoriesByPage()
  }, [categoryPage])
  // const [hasMoreBlogs, setHasMoreBlogs] = useState(false)
  const getPostsByCategory = async (c, limit) => {
    try {
      let result = []
      // page === 1 &&
      if (c === 'Latest') {
        setIsHome(true)
        setBlogs(latest)
        setCategoryPage(1)
        setPage(1)
        searchString && setSearchString('')
      } else {
        setIsHome(false)

        setCategoryPage(1)
        setPage(1)
        setIsLoading(true)

        searchString && setSearchString('')
        const blgs = await axios.get(
          `${APIGetBlogsByCategory}${limit}/${c.replace(
            '/',
            '%2F'
          )}/0?page_no=1`
        )
        if (blgs.data.data.length) {
          result.push(...blgs.data.data)
        }
        const pages = await axios.get(
          `${APIGetCategoryCount}/${c.replace('/', '%2F')}/0`
        )

        console.log('pages', pages.data)
        setTotalPages(Math.ceil(pages.data.count / 4))

        // page === 1 &&

        setBlogs(result)
        // setTotalPages(result && result.length ? Math.floor(result.length / 4) : 1)
        setIsLoading(false)
        console.log('DAta ->', blogs.data)
        // setHasMoreBlogs(!!blogs.data.hasMore)
      }
    } catch (err) {
      console.log('Error -->', err)
      setIsLoading(false)
    }
  }

  console.log('CAtegoryPages--->', categoryPage)
  const updateCategories = (categories) => {
    return !categories.replace(/,/g, ', ').includes(', ') ? (
      <p onClick={handleClick} style={{ cursor: 'pointer' }}>
        {categories}
      </p>
    ) : (
      categories
        .replace(/,/g, ', ')
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
              <p onClick={handleClick} style={{ cursor: 'pointer' }}>
                {item}
              </p>
            ) : (
              <p onClick={handleClick} style={{ cursor: 'pointer' }}>
                {item}
              </p>
            )}
          </span>
        ))
    )
  }

  useEffect(() => {
    selectedCategory && getPostsByCategory(selectedCategory, 4)
  }, [selectedCategory])

  useEffect(() => {
    let cancel
    setIsLoading(true)
    // const timerId = setTimeout(() => {
    if (searchString) {
      searchString.length >= 3 &&
        axios
          .get(APIGetBlogsByName + searchString, {
            cancelToken: new axios.CancelToken(function executor(c) {
              // An executor function receives a cancel function as a parameter
              cancel = c
            }),
          })
          .then((response) => {
            setIsHome(false)
            setBlogs(response.data.data)
            setPage(1)

            setTotalPages(
              response.data.data && response.data.data.length
                ? Math.ceil(response.data.data.length / 4)
                : 1
            )
            console.log(
              'TotalPages from UseEffect',
              Math.ceil(response.data.data.length / 4)
            )
            setCategoryPage(1)
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
      setIsHome(true)
      setBlogs(latest)
      console.log('totalPages from search else', Math.ceil(totalCount / 4))
      setTotalPages(Math.ceil(totalCount / 4))
      // setTotalPages(20)
      setPage(1)

      setIsLoading(false)
    }

    return () => {
      // clearTimeout(timerId)
      if (cancel) {
        cancel('Request canceled by user')
      }
    }
  }, [searchString])

  // function Pagination() {
  // const [currentPage, setCurrentPage] = useState(1);

  // const generatePagination = () => {
  //   // const totalPages = 20
  //   const maxDisplayedPages = 10 // Maximum number of pages to display

  //   let paginationHTML = []

  //   // Calculate start and end page numbers based on current page
  //   let startPage
  //   let endPage

  //   if (totalPages <= maxDisplayedPages) {
  //     // Display all pages if the total number of pages is less than or equal to the maximum displayed pages
  //     startPage = 1
  //     endPage = totalPages
  //   } else if (page <= 6) {
  //     // Display pages 1 to 10 if the current page is less than or equal to 6
  //     startPage = 1
  //     endPage = maxDisplayedPages
  //   } else if (page >= totalPages - 5) {
  //     // Display the last 10 pages if the current page is within the last 5 pages
  //     startPage = totalPages - maxDisplayedPages + 1
  //     endPage = totalPages
  //   } else {
  //     // Display the current page with a range of 5 pages before and after
  //     startPage = page - 4
  //     endPage = page + 5
  //   }

  //   // Add previous page link
  //   if (page > 1) {
  //     paginationHTML.push(
  //       <a
  //         key="prevPage"
  //         // href="#"
  //         onClick={() => {
  //           handleClick()
  //           setPage(page - 1)
  //         }}
  //       >
  //         &laquo;
  //       </a>
  //     )
  //   } else {
  //     paginationHTML.push(
  //       <span key="prevPage" className="disabled">
  //         &laquo;
  //       </span>
  //     )
  //   }

  //   // Add page links between startPage and endPage
  //   for (let i = startPage; i <= endPage; i++) {
  //     paginationHTML.push(
  //       <a
  //         key={i}
  //         // href="#"
  //         className={page === i ? 'active' : ''}
  //         onClick={() => {
  //           handleClick()
  //           setPage(i)
  //         }}
  //       >
  //         {i}
  //       </a>
  //     )
  //   }

  //   // Add ellipsis (...) if there are more pages after the displayed range
  //   if (endPage < totalPages) {
  //     paginationHTML.push(
  //       <span key="ellipsis" className="ellipsis">
  //         ...
  //       </span>
  //     )
  //   }

  //   // Add next page link
  //   if (page < totalPages) {
  //     paginationHTML.push(
  //       <a
  //         key="nextPage"
  //         // href="#"
  //         onClick={() => {
  //           handleClick()
  //           setPage(page + 1)
  //         }}
  //       >
  //         &raquo;
  //       </a>
  //     )
  //   } else {
  //     paginationHTML.push(
  //       <span key="nextPage" className="disabled">
  //         &raquo;
  //       </span>
  //     )
  //   }

  //   return paginationHTML
  // }
  const generatePagination = () => {
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
    } else if (page >= totalPages - 6) {
      // Display the last 10 pages if the current page is within the last 6 pages
      startPage = totalPages - maxDisplayedPages + 1
      endPage = totalPages
    } else {
      // Display the current page with a range that increases by one on each side
      startPage = page - 4
      endPage = page + 5
    }

    // Add previous page link
    if (page > 1) {
      paginationHTML.push(
        <a
          key="prevPage"
          // href="#"
          onClick={() => {
            handleClick()
            setPage(page - 1)
          }}
        >
          &laquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <a key="prevPage" className="disabled">
          &laquo;
        </a>
      )
    }

    // Add first page link
    if (startPage > 1) {
      paginationHTML.push(
        <a
          key="firstPage"
          // href="#"
          onClick={() => {
            handleClick()
            setPage(1)
          }}
        >
          1
        </a>
      )

      if (startPage > 2) {
        paginationHTML.push(
          <a key="ellipsisBefore" className="ellipsis">
            ...
          </a>
        )
      }
    }

    // Add page links between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML.push(
        <a
          key={i}
          // href="#"
          className={page === i ? 'active' : ''}
          onClick={() => {
            handleClick()
            setPage(i)
          }}
        >
          {i}
        </a>
      )
    }

    // Add last page link
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML.push(
          <a key="ellipsisAfter" className="ellipsis">
            ...
          </a>
        )
      }

      paginationHTML.push(
        <a
          key="lastPage"
          // href="#"
          onClick={() => {
            handleClick()
            setPage(totalPages)
          }}
        >
          {totalPages}
        </a>
      )
    }

    // Add next page link
    if (page < totalPages) {
      paginationHTML.push(
        <a
          key="nextPage"
          // href="#"
          onClick={() => {
            handleClick()
            setPage(page + 1)
          }}
        >
          &raquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <a key="nextPage" className="disabled">
          &raquo;
        </a>
      )
    }

    return paginationHTML
  }

  console.log('blogposts', blogs.length)
  console.log('Totalpages', totalPages)

  // const generatePaginationForCategory = () => {
  //   // const totalPages = 20
  //   const maxDisplayedPages = 10 // Maximum number of pages to display

  //   let paginationHTML = []

  //   // Calculate start and end page numbers based on current page
  //   let startPage
  //   let endPage

  //   if (totalPages <= maxDisplayedPages) {
  //     // Display all pages if the total number of pages is less than or equal to the maximum displayed pages
  //     startPage = 1
  //     endPage = totalPages
  //   } else if (categoryPage <= 6) {
  //     // Display pages 1 to 10 if the current page is less than or equal to 6
  //     startPage = 1
  //     endPage = maxDisplayedPages
  //   } else if (categoryPage >= totalPages - 5) {
  //     // Display the last 10 pages if the current page is within the last 5 pages
  //     startPage = totalPages - maxDisplayedPages + 1
  //     endPage = totalPages
  //   } else {
  //     // Display the current page with a range of 5 pages before and after
  //     startPage = categoryPage - 4
  //     endPage = categoryPage + 5
  //   }

  //   // Add previous page link
  //   if (categoryPage > 1) {
  //     paginationHTML.push(
  //       <a
  //         key="prevPage"
  //         // href="#"
  //         onClick={() => setCategoryPage(categoryPage - 1)}
  //       >
  //         &laquo;
  //       </a>
  //     )
  //   } else {
  //     paginationHTML.push(
  //       <span key="prevPage" className="disabled">
  //         &laquo;
  //       </span>
  //     )
  //   }

  //   // Add page links between startPage and endPage
  //   for (let i = startPage; i <= endPage; i++) {
  //     paginationHTML.push(
  //       <a
  //         key={i}
  //         // href="#"
  //         className={categoryPage === i ? 'active' : ''}
  //         onClick={() => {
  //           handleClick()
  //           setCategoryPage(i)
  //         }}
  //       >
  //         {i}
  //       </a>
  //     )
  //   }

  //   // Add ellipsis (...) if there are more pages after the displayed range
  //   if (endPage < totalPages) {
  //     paginationHTML.push(
  //       <span key="ellipsis" className="ellipsis">
  //         ...
  //       </span>
  //     )
  //   }

  //   // Add next page link
  //   if (categoryPage < totalPages) {
  //     paginationHTML.push(
  //       <a
  //         key="nextPage"
  //         // href="#"
  //         onClick={() => {
  //           handleClick()
  //           setCategoryPage(categoryPage + 1)
  //         }}
  //       >
  //         &raquo;
  //       </a>
  //     )
  //   } else {
  //     paginationHTML.push(
  //       <span key="nextPage" className="disabled">
  //         &raquo;
  //       </span>
  //     )
  //   }

  //   return paginationHTML
  // }
  // return paginationHTML;
  // };

  const generatePaginationForCategory = () => {
    const maxDisplayedPages = 10 // Maximum number of pages to display

    let paginationHTML = []

    // Calculate start and end page numbers based on current page
    let startPage
    let endPage

    if (totalPages <= maxDisplayedPages) {
      // Display all pages if the total number of pages is less than or equal to the maximum displayed pages
      startPage = 1
      endPage = totalPages
    } else if (categoryPage <= 6) {
      // Display pages 1 to 10 if the current categoryPage is less than or equal to 6
      startPage = 1
      endPage = maxDisplayedPages
    } else if (categoryPage >= totalPages - 6) {
      // Display the last 10 pages if the current categoryPage is within the last 6 pages
      startPage = totalPages - maxDisplayedPages + 1
      endPage = totalPages
    } else {
      // Display the current categoryPage with a range that increases by one on each side
      startPage = categoryPage - 4
      endPage = categoryPage + 5
    }

    // Add previous categoryPage link
    if (categoryPage > 1) {
      paginationHTML.push(
        <a
          key="prevPage"
          // href="#"
          onClick={() => {
            handleClick()
            setPage(categoryPage - 1)
          }}
        >
          &laquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <a key="prevPage" className="disabled">
          &laquo;
        </a>
      )
    }

    // Add first categoryPage link
    if (startPage > 1) {
      paginationHTML.push(
        <a
          key="firstPage"
          // href="#"
          onClick={() => {
            handleClick()
            setCategoryPage(1)
          }}
        >
          1
        </a>
      )

      if (startPage > 2) {
        paginationHTML.push(
          <a key="ellipsisBefore" className="ellipsis">
            ...
          </a>
        )
      }
    }

    // Add categoryPage links between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML.push(
        <a
          key={i}
          // href="#"
          className={categoryPage === i ? 'active' : ''}
          onClick={() => {
            handleClick()
            setCategoryPage(i)
          }}
        >
          {i}
        </a>
      )
    }

    // Add last categoryPage link
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML.push(
          <a key="ellipsisAfter" className="ellipsis">
            ...
          </a>
        )
      }

      paginationHTML.push(
        <a
          key="lastPage"
          // href="#"
          onClick={() => {
            handleClick()
            setCategoryPage(totalPages)
          }}
        >
          {totalPages}
        </a>
      )
    }

    // Add next categoryPage link
    if (categoryPage < totalPages) {
      paginationHTML.push(
        <a
          key="nextPage"
          // href="#"
          onClick={() => {
            handleClick()
            setCategoryPage(categoryPage + 1)
          }}
        >
          &raquo;
        </a>
      )
    } else {
      paginationHTML.push(
        <a key="nextPage" className="disabled">
          &raquo;
        </a>
      )
    }

    return paginationHTML
  }

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
                                                  src={item.IMAGE_BANNER_V1}
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
                                                    <p>{moment(
                                                      item.ADDED_TIME
                                                    ).format('MMMM D, YYYY')}</p>
                                                    <p>
                                                      {item.READ_TIME
                                                        ? item.READ_TIME
                                                        : 12 + ' min read'}
                                                    </p>
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
                          <h2 ref={myElementRef}>
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                              handleClick()
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
                          : (isHome
                              ? blogs
                              : blogs.slice(
                                  (selectedCategory
                                    ? categoryPage - 1
                                    : page - 1) * 4,
                                  (selectedCategory
                                    ? categoryPage - 1
                                    : page - 1) *
                                    4 +
                                    4
                                )
                            ).map((item, idx) => {
                              return (
                                <Col lg={6} md={6} sm={12} xs={12} key={idx}>
                                  <Link href={`/post/${item.POST_ID}`}>
                                    <Row style={{ cursor: 'pointer' }}>
                                      <Col className={styles.blogTile}>
                                        <Row>
                                          <Col>
                                            <Image
                                              src={item.IMAGE_BANNER_V2}
                                              alt="Small Blog"
                                              width={750}  //302
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
                                            <p>{moment(item.ADDED_TIME).format(
                                              'MMMM D, YYYY'
                                            )}</p>
                                            <p className={styles.minRead}>
                                              {item.READ_TIME
                                                ? item.READ_TIME
                                                : 12 + ' min read'}
                                            </p>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Link>
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
                              {totalPages > 1
                                ? selectedCategory
                                  ? generatePaginationForCategory()
                                  : generatePagination()
                                : null}
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
