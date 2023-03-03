import React, { Fragment, useState } from 'react'
import { Modal, Row, Col, Form, Button } from 'react-bootstrap'
import styles from './modal.module.scss'
import Image from 'next/image'
import axios from 'axios'

const ResetPassword = ({ show, handleClose }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [email, setEmail] = useState('')
  // console.log("called")
  function ValidateEmail(inputText) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      // alert("Valid email address!");
      // document.form1.text1.focus();
      return true;
    }
    else {
      setErrorText("You have entered an invalid email address!");
      return false;
    }
  }
  const sendResetEmail = async () => {
    if (email.length > 0) {
      if(ValidateEmail(email)){
        const resetPwd = await axios.get(
          `https://api.collegepass.org/api/v1/forgotPassword/${email}`
        )
        // console.log("called")
        // console.log(resetPwd)
        if (resetPwd.data.status) {
          handleClose()
          setShowSuccess(true)
        }
        else {
          // console.log(resetPwd)
          setErrorText(resetPwd.data.data)
        }
      }
    }
    else
    setErrorText("Please enter an email address")
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} className={styles.loginModal}>
        <Modal.Header closeButton className="border-bottom-none" style={{
          paddingLeft: '5%'
        }}>
          <Row className="width-100">
            <Col
              className="text-center">
              <Row>
                <Col className={styles.loginHolo}>
                  <Image
                    src="/logo/b-holo.png"
                    alt="Text Logo"
                    width="70"
                    height="59"
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.titleModal}>
                  <h4>Reset Password</h4>
                  {/*<h6>Enter your email address</h6>*/}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="pt-0 pb-5 mb-4">
          <Row>
            <Col className={styles.wrapModalContent}>
              <Form>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3 text-center"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        type="email"
                        required={true}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <p style={{
                  textAlign: 'center',
                  color: 'red',
                  marginTop: '-2%'
                }}>{errorText}</p>
                <Row>
                  <Col className='text-center'>
                    <Button
                      onClick={sendResetEmail}
                      className={styles.loginButton}
                    >
                      Send Email
                    </Button>
                  </Col>
                </Row>

                {/* <Row>
                  <Col className="text-center mt-2">
                    <p>
                      Remember your password?
                      <span
                        className="cursor-pointer"
                        style={{
                          color: '#4285f4',
                        }}
                      >
                        {' '}
                        Log in
                      </span>
                    </p>
                  </Col>
                </Row> */}
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal
        show={showSuccess}
        onHide={() => {
          setShowSuccess(false)
        }}
        className={styles.loginModal}
      >
        <Modal.Header closeButton className="border-bottom-none reset-pass-modal">
          <Row className="width-100">
            <Col
              className="text-center">
              <Row>
                <Col className={styles.titleModal}>
                  <h4>Email sent</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <p className='text-center' style={{
                  color: '#000000',
                  opacity: '0.8'
                }}>Password recovery link has been sent.</p>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default ResetPassword
