import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
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
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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

  const handleSubmit = async (event, parent_comment_id = null) => {
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
      }
      console.log('Submitting form data:', { name, email, comment })
    }
  }

  if (!post) {
    return <div></div>
  }

  console.log('EXtra Content ------->', extraPosts)
  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
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
                  <h1
                    style={{
                      marginTop: '0px',
                      marginBottom: '20px',
                      overflowWrap: 'break-word',
                      fontSize: '32px',
                      color: '#000000',
                      fontFamily: '"Poppins",sans-serif',
                      fontWeight: '700',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.TITLE}
                  </h1>
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
                <Col className={styles.postImg}
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

              {comments.length
                ? comments.map((item, index) => {
                    const createdAtMoment = moment
                      .utc(item.CREATED_AT)
                      .add(5, 'hours')
                      .add(30, 'minutes')
                      .local()

                    // Calculate the time difference from the current time
                    const timeAgo = createdAtMoment.fromNow()
                    return (
                      <Row className="pt-5" key={index}>
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
                                  {item.AUTHOR_NAME}
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
                                {item.CONTENT}
                              </p>
                              <p
                                className={styles.commentReply}
                                onClick={handleShow}
                              >
                                Reply
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
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
                      }}>Hi, This is a dummy comment here..</p>
                      <p className={styles.commentReply} onClick={handleShow}>Reply</p>
                    </Col>
                  </Row>
                </Col> */}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Advisor Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Login</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>
              <Row>
                <Col style={{
                  border: 'solid 1px #ebebeb',
                  borderRadius: '10px',
                  padding: '30px',
                  marginTop: '45px',
                  background: 'rgba(246, 246, 246, 0.28)'
                }}>
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
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Comment..."
                          value={comment}
                          onChange={handleCommentChange}
                          isInvalid={!!commentError}
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
                        background: '#000000',
                        border: '1px solid #000000',
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
                  background: 'rgb(246 246 246 / 28%)',
                  padding: '20px 15px',
                  width: '100%',
                  height: 'auto',
                  marginBottom: '50px',
                  borderRadius: '10px',
                  border: 'solid 1px #ebebeb',
                }}
              >
                <Col className="pb-3">
                  <h3 className={styles.postSidebarHeading}>Popular Posts</h3>
                </Col>
                {extraPosts.map((item, index) => {
                  return (
                    <Link href={`/post/${item.POST_ID}`}>
                      <Row className="pb-3" key={index}>
                        <Col>
                          <h5 className={styles.postSidebarPost}>{item.TITLE}</h5>
                          <Image
                            src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                            alt="Small Blog"
                            width={130}
                            height={96}
                          />
                          <span className="d-flex post-cat-date">
                            <p
                              style={{
                                paddingRight: '8px',
                              }}
                            >
                              <a href="#">{item.CATEGORIES}</a>
                            </p>
                            <p
                              style={{
                                paddingLeft: '8px',
                              }}
                            >
                              <a href="#">
                                {moment(item.CREATED_AT).format('MMMM D, YYYY')}
                              </a>
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
