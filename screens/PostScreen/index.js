import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import {
  APIAddComment,
  APIGetBlog,
  APIGetBlogs,
  APIGetBlogsByCategory,
} from '../../config/API'
import moment from 'moment'
import Link from 'next/link'

const index = ({ id }) => {
  const [post, setPost] = useState()
  const [extraPosts, setExtraPosts] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [commentError, setCommentError] = useState('')

  const [registered, setRegistered] = useState(false)
  const [user, setUser] = useState(null)

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
    } catch (err) {}
  }
  const getPostsByCategory = async () => {
    const categories = post.BLOG_CATEGORIES.split(',')
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    // validate form fields
    let valid = true

    // check if user is already registered
    const user = JSON.parse(localStorage.getItem('user'))
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
        localStorage.setItem('user', JSON.stringify(userData))
        const user = JSON.parse(localStorage.getItem('user'))

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
      })
      if (response.status === 201) {
        // localStorage.setItem('userDetails', JSON.stringify({ name, email }))
        setComment('')
        setEmail('')
        setName('')
        // setShowCommentBox(true)
        const user = JSON.parse(localStorage.getItem('user'))

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
          <Row>
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
                      marginTop: '0',
                      marginBottom: '20px',
                      wordWrap: 'break-word',
                      fontSize: '41px',
                      lineHeight: '50px',
                      fontWeight: '600',
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
                <Col
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
                <Col className="pt-5 pb-5">
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
                    <Button onClick={handleSubmit}>Post Comment</Button>
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
              <Row style={{
                        position: 'sticky',
                        top: '80px',
                        background: 'rgb(246 246 246)',
                        padding: '20px',
                        width: '100%',
                        height: 'auto',
                        marginBottom: '50px',
                        borderRadius: '5px'
                      }}>
                <Col className="pb-3">
                  <h3>Popular Posts</h3>
                </Col>
                {extraPosts.map((item, index) => {
                  return (
                    <Link href={`/post/${item.POST_ID}`}>
                      <Row className="pb-3" key={index}>
                        <Col>
                          <h5>{item.TITLE}</h5>
                          <Image
                            src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                            alt="Small Blog"
                            width={130}
                            height={96}
                          />
                          <span className="d-flex">
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
