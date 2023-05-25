import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  APIAddComment,
  APIAddLike,
  APIBlogvisited,
  APIDeleteLike,
  APIGetBlog,
  APIGetBlogs,
  APIGetBlogsByCategory,
  APIGetCommentsByPostID,
} from '../../config/API'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

const index = ({ blog }) => {
  const [post, setPost] = useState()
  const [extraPosts, setExtraPosts] = useState([])

  ///////////////////////// calculating spent time /////////////////////////////////
  const [visitStartTime, setVisitStartTime] = useState(null)
  const [isPageVisible, setIsPageVisible] = useState(true)

  const [dynamicLink, setDynamicLink] = useState('')

  const createDynamicLink = async (post) => {
    const apiKey = 'AIzaSyBvXx4zkclbjWdJ7t4nVvhq9e-NMYeLIls' // Replace with your Firebase project's API key

    const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`
    const response = await axios.post(url, {
      dynamicLinkInfo: {
        domainUriPrefix: 'https://link.collegepass.org',
        link: `https://www.collegepass.org/links?TYPE=BLOG&SOURCE_ID=${post.POST_ID}`, // Add your parameters here
        // other parameters as needed
        androidInfo: {
          androidPackageName: 'com.collegepass',
        },
        iosInfo: {
          iosBundleId: 'org.collegePass',
        },
        socialMetaTagInfo: {
          socialTitle: `${
            post.TITLE ? post.TITLE + ' | A CollgePass Blog' : 'Blog'
          }`,
          socialDescription:
            'CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!',
          socialImageLink: post.IMAGE_BANNER_V1,
        },
      },
    })

    setDynamicLink(response.data.shortLink)
  }

  useEffect(() => {
    post && createDynamicLink(post)
  }, [post])

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      setIsPageVisible(false)
    } else {
      setIsPageVisible(true)
    }
  }

  const handleUnload = async () => {
    if (!isPageVisible && visitStartTime) {
      const timeSpentSeconds = Math.round((Date.now() - visitStartTime) / 1000)

      const data = {
        blogId: post.POST_ID,
        startTime: new Date(visitStartTime).toISOString(),
        endTime: new Date().toISOString(),
        timeSpentSeconds: timeSpentSeconds,
      }

      const result = await axios.post(APIBlogvisited, data)

      if (result.status === 201) {
        console.log('successfully inserted record')
      }
      setVisitStartTime(null)
    }
  }

  useEffect(() => {
    setVisitStartTime(Date.now())

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      if (visitStartTime) {
        const timeSpentSeconds = Math.round(
          (Date.now() - visitStartTime) / 1000
        )

        const data = {
          blogId: post.POST_ID,
          startTime: new Date(visitStartTime).toISOString(),
          endTime: new Date().toISOString(),
          timeSpentSeconds: timeSpentSeconds,
        }

        axios
          .post(APIBlogvisited, data)
          .then(
            (data) =>
              data.status === 201 && console.log('Successfully inserted record')
          )
      }

      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [post])

  //////////////////////////////////////////////////////////////////////////////////

  const [isLiked, setIsliked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  // const [seoTitle, setSeoTitle] = useState('')

  const getPost = async (id) => {
    try {
      const response = await axios.get(`${APIGetBlog}${id}?userId=${userId}`)
      // console.log('Data --------->', response.data.data)
      setPost(response.data.data)
      setIsliked(!!response.data.data.isLiked)
      setTotalLikes(response.data.data.LIKE_COUNT)
      // setSeoTitle(response.data.data.TITLE)
      // const commentsResult = await axios.get(`${APIGetCommentsByPostID}${id}`)
      // setComments(commentsResult.data.data)
      // console.log('data ---------->', commentsResult.data.data)
    } catch (err) {}
  }
  const getPostsByCategory = async () => {
    const categories = post.CATEGORIES.includes(',')
      ? post.CATEGORIES.split(',')
      : [post.CATEGORIES]

    const result = []

    if (post.BLOG_CATEGORIES && categories.length) {
      for (let c of categories) {
        const limit = 3 - result.length
        // while (result.length < 3) {
        const blogs = await axios.get(
          `${APIGetBlogsByCategory}${limit}/${c.replace('/', '%2F')}/${
            post.POST_ID
          }`
        )
        if (blogs.data.data.length) {
          result.push(
            ...blogs.data.data.filter((item) => {
              if (result.length) {
                for (let i of result) {
                  if (i.POST_ID === item.POST_ID) {
                    return false
                  }
                }
                return true
              } else {
                return true
              }
            })
          )
        }
        // If the length of the result is already greater than or equal to 3, break the loop
        if (result.length >= 3) {
          break
        }
        // }
      }

      // If the length of the result is still less than 3, make another request to a different API
      if (result.length < 3) {
        const additionalBlogs = await axios.get(`${APIGetBlogs}1`)
        result.push(
          ...additionalBlogs.data.data
            .filter((item) => {
              if (result.length) {
                for (let i of result) {
                  if (i.POST_ID === item.POST_ID) {
                    return false
                  }
                }
                return true
              } else {
                return true
              }
            })
            .slice(0, 3 - result.length)
        )
      }
    }
    setExtraPosts(result)
  }

  const [userId, setUserId] = useState('')

  useEffect(() => {
    post && getPostsByCategory()
  }, [post])
  useEffect(() => {
    userId && blog && getPost(blog.POST_ID)
  }, [blog, userId])

  // useEffect(() => {
  //   blog && setPost(blog)
  // }, [blog])

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')

    if (!storedUserId) {
      const generatedUserId = uuidv4()
      localStorage.setItem('userId', generatedUserId)
      setUserId(generatedUserId)
    } else {
      setUserId(storedUserId)
    }
  }, [])

  if (!post) {
    return <div></div>
  }

  const router = useRouter()

  const handleClick = (category) => {
    // Call the function in the home page
    // ...

    // Navigate to the home page with the state
    router.push({
      pathname: '/',
      query: { triggerCategory: category, uuid: uuidv4() },
    })
  }

  const updateCategories = (categories) => {
    return !categories.replace(/,/g, ', ').includes(', ') ? (
      <a
        onClick={(e) => {
          e.stopPropagation()
          handleClick(categories)
        }}
        style={{ cursor: 'pointer' }}
      >
        {categories}
      </a>
    ) : (
      categories
        .replace(/,/g, ', ')
        .split(', ')
        .map((item, idx) => (
          <Fragment>
            {idx === 0 ? (
              <a
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(item)
                }}
                style={{ cursor: 'pointer' }}
              >
                {item}
              </a>
            ) : (
              <a
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(item)
                }}
                style={{ cursor: 'pointer' }}
              >
                {item}
              </a>
            )}
          </Fragment>
        ))
    )
  }

  const onLike = async () => {
    try {
      setIsliked(true)
      setTotalLikes((prev) => prev + 1)
      const result = await axios.post(APIAddLike, {
        user_id: userId,
        blog_id: post.POST_ID,
      })
    } catch (err) {
      console.log('Error', err)
    }
  }

  const ondislike = async () => {
    try {
      setIsliked(false)
      setTotalLikes((prev) => prev - 1)
      const result = await axios.delete(APIDeleteLike, {
        data: {
          user_id: userId,
          blog_id: post.POST_ID,
        },
      })
    } catch (err) {
      console.log('Error', err)
    }
  }

  return (
    <Fragment>
      <Container fluid className="bg-black">
        <Container className={styles.postWrap}>
          <Row className={styles.textWrap}>
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
                <Col
                  className={styles.postImg}
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <Image
                    src={post.POST_IMAGE_BANNER}
                    alt="Small Blog"
                    width={750}
                    height={556}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.likeShare}>
                  <p className="date-post-top">
                    {moment(post.ADDED_TIME).format('MMMM DD, YYYY')}
                  </p>

                  {isLiked ? (
                    <p
                      onClick={() => ondislike()}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa fa-heart" aria-hidden="true"></i>{' '}
                      {totalLikes}
                    </p>
                  ) : (
                    <p onClick={() => onLike()} style={{ cursor: 'pointer' }}>
                      <i className="fa fa-heart-o" aria-hidden="true"></i>{' '}
                      {totalLikes}
                    </p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col
                  dangerouslySetInnerHTML={{ __html: post.CONTENT }}
                  className="post-css-mob"
                ></Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <Col className="share-icon-post">
                      <h5
                        style={{
                          fontWeight: '600',
                          color: '#ffffff',
                          paddingTop: '30px',
                          letterSpacing: '0.03rem',
                        }}
                      >
                        Share if you found this blog useful!
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.socialPost}>
                      <p>
                        {/* <FacebookShareButton url={`${window.location.href}`}> */}
                        <FacebookShareButton url={`${dynamicLink}`}>
                          <i
                            className="fa fa-facebook-official"
                            aria-hidden="true"
                            style={{
                              color: 'rgb(66 107 192)',
                            }}
                          ></i>
                        </FacebookShareButton>
                      </p>
                      {/* <p>
                        <i
                          className="fa fa-instagram"
                          aria-hidden="true"
                          style={{
                            color: '#d62976',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            const url = `instagram://library?AssetPath=https://collegepass.org`
                            window.location.href = url
                          }}
                        ></i>
                      </p> */}
                      {/* <p>
                        <TwitterShareButton url={`${window.location.href}`}>
                          <i
                            className="fa fa-twitter-square"
                            aria-hidden="true"
                            style={{
                              color: '#00acee ',
                            }}
                          ></i>
                        </TwitterShareButton>
                      </p> */}
                      {/*<p>
                        <i
                          className="fa fa-youtube-play"
                          aria-hidden="true"
                          style={{
                            color: '#FF0000',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if(/Android/i.test(navigator.userAgent)) {
                              // If accessing from an Android device, open the YouTube app using the intent:// URL scheme
                              window.location.href = `intent://www.youtube.com/@CollegePass#Intent;scheme=https;package=com.google.android.youtube;end;`;
                            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                              // If accessing from an iOS device, open the YouTube app using the vnd.youtube:// URL scheme
                              window.location.href = `vnd.youtube://www.youtube.com/@CollegePass`;
                            } else {
                              // If accessing from a desktop device, open the URL in a new tab
                              window.open(`https://www.youtube.com/@CollegePass`, '_blank');
                            }
                          }}
                        ></i>
                        </p>*/}
                      <p>
                        {/* <LinkedinShareButton url={`${window.location.href}`}> */}
                        <LinkedinShareButton url={`${dynamicLink}`}>
                          <i
                            className="fa fa-linkedin-square"
                            aria-hidden="true"
                            style={{
                              color: 'rgb(9 106 204)',
                            }}
                          ></i>
                        </LinkedinShareButton>
                      </p>

                      <p>
                        {/* <WhatsappShareButton url={`${window.location.href}`}> */}
                        <WhatsappShareButton url={`${dynamicLink}`}>
                          <i
                            className="fa fa-whatsapp"
                            aria-hidden="true"
                            style={{
                              // color: 'rgb(10, 102, 194)',
                              color: '#03c003',
                            }}
                          ></i>
                        </WhatsappShareButton>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className={styles.postSide}>
              <Row
                style={{
                  position: 'sticky',
                  top: '50px',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '50px',
                  border: '1px solid #313131',
                  padding: '27px 30px',
                  margin: '10px',
                  borderRadius: '25px',
                  backgroundColor: '#000000',
                  backgroundImage:
                    'linear-gradient(to top right, #000000, #111011)',
                }}
              >
                <Col className="pb-3">
                  <h3 className={styles.postSidebarHeading}>Related Posts</h3>
                </Col>
                {extraPosts.map((item, index) => {
                  return (
                    <Link href={`/post/${item.POST_ID}`}>
                      <Row className="pb-3" key={index}>
                        <Col
                          style={{
                            borderBottom: '1px solid rgb(255 255 255 / 25%)',
                            paddingBottom: '15px',
                            paddingLeft: '0px',
                          }}
                        >
                          <h5 className={styles.postSidebarPost}>
                            {item.TITLE}
                          </h5>
                          <Image
                            src={item.IMAGE_BANNER_V2}
                            alt="Small Blog"
                            className="related-img"
                            width={161}
                            height={93}
                          />
                          <span className="post-cat-date">
                            <p style={{ display: 'flex', flexWrap: 'wrap' }}>
                              {updateCategories(item.CATEGORIES)}
                            </p>
                            <p className="only-date">
                              <a href="#">
                                {moment(item.ADDED_TIME).format('MMMM D, YYYY')}
                              </a>

                              <span
                                style={{
                                  fontSize: '14px',
                                  letterSpacing: '0.06rem',
                                  border: 'none',
                                  padding: '3px 5px',
                                  margin: '0px 10px 10px 0px',
                                  borderRadius: '10px',
                                  background: 'none',
                                  color: '#ffffffc2',
                                  marginLeft: '10px',
                                }}
                              >
                                {(item.READ_TIME ? item.READ_TIME : 12) +
                                  ' min read'}
                              </span>
                            </p>
                          </span>
                        </Col>
                      </Row>
                    </Link>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
