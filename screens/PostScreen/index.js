import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import { APIGetBlog } from '../../config/API'

const index = ({ id }) => {
  const [post, setPost] = useState()
  const getPost = async (id) => {
    try {
      const response = await axios.get(`${APIGetBlog}${id}`)
      console.log('Data --------->', response.data.data)
      setPost(response.data.data)
    } catch (err) {}
  }
  useEffect(() => {
    id && getPost(id)
  }, [id])

  if (!post) {
    return <div></div>
  }
  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
          <Row>
            <Col
              style={{
                paddingBottom: '5%',
                paddingTop: '5%',
                paddingLeft: '10%',
                paddingRight: '35%',
                textAlign: 'justify',
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
                <Col dangerouslySetInnerHTML={{ _html: post.CONTENT }}></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
