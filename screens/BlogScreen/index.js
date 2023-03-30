import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
// import styles from '../BlogScreen/blog.module.scss'
// import Link from 'next/link'

const index = () => {
  return (
    <Fragment>
      <Container fluid className='bg-white'>
        <Container>
          <Row>
            <Col className='pt-5 mt-5'>
                <Row>
                    <Col>
                        <p>test</p>
                        <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
