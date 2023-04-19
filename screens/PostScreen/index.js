import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  APIAddComment,
  APIBlogvisited,
  APIGetBlog,
  APIGetBlogs,
  APIGetBlogsByCategory,
  APIGetCommentsByPostID,
} from '../../config/API'
import moment from 'moment'
import Link from 'next/link'

const index = ({ id }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setParentId(null)
    setShowReplyInput(false)
  }
  const handleShow = (id) => {
    if (!user) {
      setShow(true)
    } else {
      setParentId(id)
      setShowReplyInput(true)
    }
  }

  const [post, setPost] = useState()
  const [extraPosts, setExtraPosts] = useState([])
  const [comments, setComments] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [commentError, setCommentError] = useState('')

  const [registered, setRegistered] = useState(false)
  const [user, setUser] = useState(null)

  ///////////////////////// calculating spent time /////////////////////////////////
  const [visitStartTime, setVisitStartTime] = useState(null)
  const [isPageVisible, setIsPageVisible] = useState(true)

  const [showReplyInput, setShowReplyInput] = useState(false)
  const [commentReplyIndex, setCommentReplyIndex] = useState()
  const [parentId, setParentId] = useState()

  const [expandedReplyIndex, setExpandedReplyIndex] = useState(null)

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

  const handleNameChange = (event) => {
    setName(event.target.value)
    setNameError('')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setEmailError('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
    setCommentError('')
  }

  const getPost = async (id) => {
    try {
      const response = await axios.get(`${APIGetBlog}${id}`)
      console.log('Data --------->', response.data.data)
      setPost(response.data.data)
      const commentsResult = await axios.get(`${APIGetCommentsByPostID}${id}`)
      setComments(commentsResult.data.data)
      console.log('data ---------->', commentsResult.data.data)
    } catch (err) {}
  }
  const getPostsByCategory = async () => {
    const categories = post.CATEGORIES.split(',')
    const result = []

    if (post.BLOG_CATEGORIES && categories.length) {
      for (let c of categories) {
        const limit = 3 - result.length
        // while (result.length < 3) {
        const blogs = await axios.get(
          `${APIGetBlogsByCategory}${limit}/${c}/${post.POST_ID}`
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

  useEffect(() => {
    post && getPostsByCategory()
  }, [post])
  useEffect(() => {
    id && getPost(id)
  }, [id])

  useEffect(() => {
    const storedUser = localStorage.getItem('user_blog')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSubmit = async (event, parent_comment_id = null) => {
    try {
      event.preventDefault()

      // validate form fields
      let valid = true

      // check if user is already registered
      const user = JSON.parse(localStorage.getItem('user_blog'))
      let userData = {}
      if (user) {
        userData = { name: user.name, email: user.email }
        if (comment.trim() === '') {
          setCommentError('Comment is required')
          valid = false
        }
      } else {
        if (name.trim() === '') {
          setNameError('Name is required')
          valid = false
        }
        if (email.trim() === '') {
          setEmailError('Email is required')
          valid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setEmailError('Invalid email format')
          valid = false
        }
        if (comment.trim() === '') {
          setCommentError('Comment is required')
          valid = false
        }

        if (valid) {
          userData = { name, email }

          // save user data in local storage
          localStorage.setItem('user_blog', JSON.stringify(userData))
          const user = JSON.parse(localStorage.getItem('user_blog'))

          setUser(user)
        }
      }

      // submit form data if valid
      if (valid) {
        // submit form data to server
        const response = await axios.post(APIAddComment, {
          author_name: userData.name,
          author_email: userData.email,
          content: comment,
          source: 'WEB',
          post_id: id,
          parent_comment_id,
        })
        if (response.status === 201) {
          const commentsResult = await axios.get(
            `${APIGetCommentsByPostID}${id}`
          )

          setComments(commentsResult.data.data)
          console.log('data ---------->', commentsResult.data.data)
          // localStorage.setItem('userDetails', JSON.stringify({ name, email }))
          setComment('')
          setEmail('')
          setName('')
          // setShowCommentBox(true)
          const user = JSON.parse(localStorage.getItem('user_blog'))

          setUser(user)
        }
        console.log('Submitting form data:', { name, email, comment })
      }
    } catch (err) {
      console.error('Error ------->', err)
    }
  }

  const handleReplySubmit = async (event) => {
    event.preventDefault()

    // validate form fields
    let valid = true

    console.log('Made it here ----->')
    // check if user is already registered
    const user = JSON.parse(localStorage.getItem('user_blog'))
    let userData = {}
    if (user) {
      userData = { name: user.name, email: user.email }
    } else {
      valid = false
    }

    if (comment.trim() === '') {
      setCommentError('Comment is required')
      valid = false
    }

    if (valid) {
      console.log('Made it here V1----->')

      // userData = { name: user.name, email: user.email }
      // save user data in local storage
      localStorage.setItem('user_blog', JSON.stringify(userData))
      const user = JSON.parse(localStorage.getItem('user_blog'))

      setUser(user)
    }

    // submit form data if valid
    if (valid) {
      console.log('Made it here V1----->')

      // submit form data to server
      const response = await axios.post(APIAddComment, {
        author_name: userData.name,
        author_email: userData.email,
        content: comment,
        source: 'WEB',
        post_id: id,
        parent_comment_id: parentId,
      })
      if (response.status === 201) {
        const commentsResult = await axios.get(`${APIGetCommentsByPostID}${id}`)

        setComments(commentsResult.data.data)
        console.log('data ---------->', commentsResult.data.data)
        // localStorage.setItem('userDetails', JSON.stringify({ name, email }))
        setComment('')
        setEmail('')
        setName('')
        // setShowCommentBox(true)
        const user = JSON.parse(localStorage.getItem('user_blog'))

        setUser(user)
        handleClose()
      }
      console.log('Submitting form data:', { name, email, comment })
    }
  }
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault()

      // validate form fields
      let valid = true

      let userData = {}

      if (name.trim() === '') {
        setNameError('Name is required')
        valid = false
      }
      if (email.trim() === '') {
        setEmailError('Email is required')
        valid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError('Invalid email format')
        valid = false
      }

      if (valid) {
        userData = { name, email }

        // save user data in local storage
        localStorage.setItem('user_blog', JSON.stringify(userData))
        const user = JSON.parse(localStorage.getItem('user_blog'))

        setUser(user)
        setShowReplyInput(true)
      }
    } catch (err) {
      console.log('Error ---------->', err)
    }
  }
  if (!post) {
    return <div></div>
  }

  console.log('EXtra Content ------->', extraPosts)
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
                <Col>
                  {/*<h1
                    style={{
                      marginTop: '0px',
                      marginBottom: '20px',
                      overflowWrap: 'break-word',
                      fontSize: '32px',
                      color: '#ffffff',
                      fontFamily: '"Poppins",sans-serif',
                      fontWeight: '700',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.TITLE}
                  </h1>*/}
                  {/* <h1 style={{
                        marginTop: '0',
                        marginBottom: '20px',
                        wordWrap: 'break-word',
                        fontSize: '41px',
                        lineHeight: '50px',
                        fontWeight: '600',
                    }}>Choosing The Right University – Study Abroad Counseling</h1> */}
                </Col>
              </Row>
              <Row>
                <Col
                  className={styles.postImg}
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  <Image
                    src={post.IMAGE_BANNER}
                    alt="Small Blog"
                    width={750}
                    height={556}
                  />
                </Col>
              </Row>
              <Row>
                <Col dangerouslySetInnerHTML={{ __html: post.CONTENT }}></Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h5 style={{
                            fontWeight: '600',
                            color: '#ffffff',
                            paddingTop: '30px',
                            letterSpacing: '0.03rem'
                      }}>Found this article useful? Share it!</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.socialPost}>
                      <p>
                        <FacebookShareButton url={`${window.location.href}`}>
                          <i
                            className="fa fa-facebook-official"
                            aria-hidden="true"
                            style={{
                              color: '#3b5998',
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
                      <p>
                        <TwitterShareButton url={`${window.location.href}`}>
                          <i
                            className="fa fa-twitter-square"
                            aria-hidden="true"
                            style={{
                              color: '#00acee ',
                            }}
                          ></i>
                        </TwitterShareButton>
                      </p>
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
                        <LinkedinShareButton url={`${window.location.href}`}>
                          <i
                            className="fa fa-linkedin-square"
                            aria-hidden="true"
                            style={{
                              color: 'rgb(10, 102, 194)',
                            }}
                          ></i>
                        </LinkedinShareButton>
                      </p>

                      <p>
                        <WhatsappShareButton url={`${window.location.href}`}>
                          <i
                            className="fa fa-whatsapp"
                            aria-hidden="true"
                            style={{
                              // color: 'rgb(10, 102, 194)',
                              color: 'green',
                            }}
                          ></i>
                        </WhatsappShareButton>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {comments.length
                ? comments.map((cmt, commentIndex) => {
                    const createdAtMoment = moment
                      .utc(cmt.CREATED_AT)
                      .add(5, 'hours')
                      .add(30, 'minutes')
                      .local()
                    const timeAgo = createdAtMoment.fromNow()

                    return (
                      <React.Fragment key={commentIndex}>
                        <Row className="pt-5">
                          <Col>
                            <Row>
                              <Col>
                                <span style={{ display: 'inline-flex' }}>
                                  <p
                                    style={{
                                      fontWeight: '600',
                                      letterSpacing: '0.03rem',
                                      marginRight: '10px',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {cmt.AUTHOR_NAME}{' '}
                                    {cmt.isAdvisor && (
                                      <i
                                        class="fa fa-check-circle"
                                        aria-hidden="true"
                                        style={{ color: 'blue' }}
                                      ></i>
                                    )}
                                  </p>
                                  <p
                                    style={{
                                      fontWeight: '600',
                                      letterSpacing: '0.03rem',
                                      marginLeft: '10px',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {timeAgo}
                                  </p>
                                </span>
                                <p
                                  style={{
                                    fontWeight: '600',
                                    letterSpacing: '0.03rem',
                                    color: '#545454',
                                    fontSize: '14px',
                                  }}
                                >
                                  {cmt.CONTENT}
                                </p>
                                <p
                                  className={styles.commentReply}
                                  onClick={() => {
                                    setCommentReplyIndex(commentIndex)
                                    handleShow(cmt.COMMENT_ID)
                                  }}
                                  // onClick={() => {
                                  //   setShowReplyInput(!showReplyInput)
                                  //   setCommentReplyIndex(commentIndex)
                                  // }}
                                >
                                  Reply
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {showReplyInput && commentReplyIndex === commentIndex && (
                          <Form className="pt-3" onSubmit={handleReplySubmit}>
                            <Form.Group>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Write a reply..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                          </Form>
                        )}

                        {cmt.replies.length ? (
                          <Fragment>
                            {expandedReplyIndex === commentIndex ? (
                              <span
                                // style={{ pointerEvents: 'none' }}
                                onClick={(e) => {
                                  setExpandedReplyIndex(null)
                                }}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  color: '#0a56ec',
                                  fontSize: '13px',
                                  letterSpacing: '0.02rem',
                                }}
                              >
                                {`Hide ${cmt.replies.length} ${
                                  cmt.replies.length === 1 ? 'reply' : 'replies'
                                }`}
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  console.log('Should not make it here')
                                  setExpandedReplyIndex(commentIndex)
                                }}
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  color: '#0a56ec',
                                  fontSize: '13px',
                                  letterSpacing: '0.02rem',
                                }}
                              >
                                {`View ${cmt.replies.length} ${
                                  cmt.replies.length === 1 ? 'reply' : 'replies'
                                }`}
                              </span>
                            )}
                            {expandedReplyIndex === commentIndex
                              ? cmt.replies.map((reply, replyIndex) => {
                                  const replyCreatedAtMoment = moment
                                    .utc(reply.CREATED_AT)
                                    .add(5, 'hours')
                                    .add(30, 'minutes')
                                    .local()
                                  const replyTimeAgo =
                                    replyCreatedAtMoment.fromNow()

                                  return (
                                    <Row
                                      className="pt-3"
                                      key={`${commentIndex}-${replyIndex}`}
                                    >
                                      <Col>
                                        <Row>
                                          <Col>
                                            <span
                                              style={{
                                                display: 'inline-flex',
                                              }}
                                            >
                                              <p
                                                style={{
                                                  fontWeight: '600',
                                                  letterSpacing: '0.03rem',
                                                  marginRight: '10px',
                                                  fontSize: '12px',
                                                }}
                                              >
                                                {reply.AUTHOR_NAME}{' '}
                                                {cmt.isAdvisor && (
                                                  <i
                                                    class="fa fa-check-circle"
                                                    aria-hidden="true"
                                                    style={{ color: 'blue' }}
                                                  ></i>
                                                )}
                                              </p>
                                              <p
                                                style={{
                                                  fontWeight: '600',
                                                  letterSpacing: '0.03rem',
                                                  marginLeft: '10px',
                                                  fontSize: '12px',
                                                }}
                                              >
                                                {replyTimeAgo}
                                              </p>
                                            </span>
                                            <p
                                              style={{
                                                fontWeight: '600',
                                                letterSpacing: '0.03rem',
                                                color: '#545454',
                                                fontSize: '14px',
                                              }}
                                            >
                                              {reply.CONTENT}
                                            </p>
                                            {/* <p
                                          className={styles.commentReply}
                                          onClick={handleShow}
                                        >
                                          Reply
                                        </p> */}
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  )
                                })
                              : null}
                          </Fragment>
                        ) : null}
                      </React.Fragment>
                    )
                  })
                : null}

              {/* <Col>
                  <Row>
                    <Col>
                      <span style={{
                        display: 'inline-flex'
                      }}><p style={{
                        fontWeight: '600',
                        letterSpacing: '0.03rem',
                        marginRight: '10px',
                        fontSize: '12px',
                      }}>Advisor Name</p><p style={{
                        fontWeight: '600',
                        letterSpacing: '0.03rem',
                        marginLeft: '10px',
                        fontSize: '12px',
                      }}>1 month ago</p></span>
                      <p style={{
                        fontWeight: '600',
                        letterSpacing: '0.03rem',
                        color: '#545454',
                        fontSize: '14px'
                      }}>Hi, This is a dummy cmt here..</p>
                      <p className={styles.commentReply} onClick={handleShow}>Reply</p>
                    </Col>
                  </Row>
                </Col> */}

              {!user && (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      {/* <Col> */}
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={handleNameChange}
                          isInvalid={!!nameError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {nameError}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* </Col> */}
                      {/* <Col> */}
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput2"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={handleEmailChange}
                          isInvalid={!!emailError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {emailError}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {/* </Col> */}
                    </Row>
                    <Row>
                      <Button
                        onClick={handleFormSubmit}
                        style={{
                          borderRadius: '40px',
                          fontSize: '16px',
                          letterSpacing: '0.05rem',
                          background: '#000000',
                          border: '1px solid #000000',
                          padding: '7px 20px',
                        }}
                      >
                        Register
                      </Button>
                    </Row>
                  </Modal.Body>
                </Modal>
              )}
              <Row>
                <Col
                  style={{
                    background: '#272727',
                    border: '1px solid rgb(235 235 235 / 18%)',
                    borderRadius: '10px',
                    padding: '30px',
                    marginTop: '45px',
                  }}
                >
                  {!user && (
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={handleNameChange}
                            isInvalid={!!nameError}
                          />
                          <Form.Control.Feedback type="invalid">
                            {nameError}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput2"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={!!emailError}
                          />
                          <Form.Control.Feedback type="invalid">
                            {emailError}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label
                          style={{
                            color: '#ffffff',
                          }}
                        >
                          Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Comment..."
                          value={!showReplyInput ? comment : ''}
                          onChange={handleCommentChange}
                          isInvalid={!!commentError}
                          disabled={showReplyInput}
                        />
                        <Form.Control.Feedback type="invalid">
                          {commentError}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Col className="pt-3">
                    <Button
                      onClick={handleSubmit}
                      style={{
                        borderRadius: '40px',
                        fontSize: '16px',
                        letterSpacing: '0.05rem',
                        background: '#ffffff',
                        border: '1px solid #ffffff',
                        color: '#000000',
                        padding: '7px 20px',
                      }}
                    >
                      Post Comment
                    </Button>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={12}
              xs={12}
              className={styles.postSide}
              style={{
                paddingBottom: '5%',
                paddingTop: '5%',
                paddingLeft: '5%',
              }}
            >
              <Row
                style={{
                  position: 'sticky',
                  top: '50px',
                  background: '#272727',
                  padding: '20px 15px',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '50px',
                  borderRadius: '10px',
                  border: '1px solid rgb(235 235 235 / 18%)',
                }}
              >
                <Col className="pb-3">
                  <h3 className={styles.postSidebarHeading}>Popular Posts</h3>
                </Col>
                {extraPosts.map((item, index) => {
                  return (
                    <Link href={`/post/${item.POST_ID}`}>
                      <Row className="pb-3" key={index}>
                        <Col style={{
                          borderBottom: '1px solid rgb(255 255 255 / 25%)',
                          paddingBottom: '15px'
                        }}>
                          <h5 className={styles.postSidebarPost}>
                            {item.TITLE}
                          </h5>
                          <Image
                            src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                            alt="Small Blog"
                            width={130}
                            height={96}
                          />
                          <span className="post-cat-date">
                            <p>
                              <a href="#">{item.CATEGORIES}</a>
                            </p>
                            <p>
                              <a href="#">
                                {moment(item.CREATED_AT).format('MMMM D, YYYY')}
                              </a>

                              <span
                                style={{
                                  color: '#ffffff',
                                  fontSize: '12px',
                                  marginLeft: '10px'
                                }}
                              >
                                <i className="fa fa-eye" style={{
                                  paddingRight: '5px'
                                }}></i>
                                {item.VISITOR_COUNT}
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

/*import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Image from 'next/image'
import styles from '../BlogScreen/blog.module.scss'
import Link from 'next/link'

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
        <Row style={{
            width: '900px',
            margin: 'auto',
            textAlign: 'justify'
          }}>
          <Col>
            <Row>
              <Col>
                  <p>Every year brands and marketers build celebrations of all kinds into their content calendars.
For many companies, celebrations and cultural recognitions are a perfect platform for product launches and seasonal collections.</p>
<p>In the west, the winter holidays remain heavily commercialized, with projections for retail shopping to reach, on average, $1,455 US per consumer during the holidays, a healthy number cited by the 2022 Deloitte holiday retail survey. Although the holiday season is synonymous with spending in the west, it is not the only hot seller throughout the calendar year. Back-to-school and back-to-college spending in 2022 was expected to reach 37 billion and 74 billion in the US. That is approximately $864 US and $1,199 US per family, as reported by the National Retail Federation.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                    src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/stanford.png"
                    alt="Small Blog"
                    width="750"
                    height="556"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                  <p>Every year brands and marketers build celebrations of all kinds into their content calendars.
For many companies, celebrations and cultural recognitions are a perfect platform for product launches and seasonal collections.</p>
<p>In the west, the winter holidays remain heavily commercialized, with projections for retail shopping to reach, on average, $1,455 US per consumer during the holidays, a healthy number cited by the 2022 Deloitte holiday retail survey. Although the holiday season is synonymous with spending in the west, it is not the only hot seller throughout the calendar year. Back-to-school and back-to-college spending in 2022 was expected to reach 37 billion and 74 billion in the US. That is approximately $864 US and $1,199 US per family, as reported by the National Retail Federation.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                    src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/stanford.png"
                    alt="Small Blog"
                    width="750"
                    height="556"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                    src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/stanford.png"
                    alt="Small Blog"
                    width="750"
                    height="556"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                  <p>Every year brands and marketers build celebrations of all kinds into their content calendars.
For many companies, celebrations and cultural recognitions are a perfect platform for product launches and seasonal collections.</p>
<p>In the west, the winter holidays remain heavily commercialized, with projections for retail shopping to reach, on average, $1,455 US per consumer during the holidays, a healthy number cited by the 2022 Deloitte holiday retail survey. Although the holiday season is synonymous with spending in the west, it is not the only hot seller throughout the calendar year. Back-to-school and back-to-college spending in 2022 was expected to reach 37 billion and 74 billion in the US. That is approximately $864 US and $1,199 US per family, as reported by the National Retail Federation.</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              <h2 style={{
                color: '#000000',
                paddingTop: '60px'
              }}>Related Post</h2>
            </Col>
          </Row>
          <Row>
            <Col>
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
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index*/
