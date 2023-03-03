import React, { Fragment, useState } from 'react'
import { Modal, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import styles from './modal.module.scss'
import Image from 'next/image'
import { APIresetUserPassword } from '../../config/API'
import axios from 'axios'

const ChangePassword = ({ show, handleClose }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [alert, setAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const onSubmitChangePassword = async () => {
    if (password === confirmPassword) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
          },
        }
        const body = {
          user_email: localStorage.user,
          new_pass: password,
        }

        const result = await axios.post(APIresetUserPassword, body, config)

        if ((result.data.status = 200)) {
          setShowAlert(true)
          setAlert('Succesfully changed your password')
        } else {
          setShowAlert(true)
          setAlert(
            'Unable to change your password please contact support@collegepass.org'
          )
        }
      } catch (err) {
        // console.log(err)
        setShowAlert(true)
        setAlert('Oops something went wrong contact support@collegepass.org')
      }
    } else {
      setShowAlert(true)
      setAlert('Your passwords dont match, please check')
    }
  }
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} className={styles.loginModal}>
        <Modal.Header closeButton className="border-bottom-none">
          <Row className="width-100">
            <Col
              className="text-center"
              style={{
                marginLeft: '2%',
              }}
            >
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
                  <h4>Create New Password</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className='reset-pass-wrap'>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Enter your new password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Confirm your password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={onSubmitChangePassword}
                      className={styles.loginButton}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  {showAlert ? (
                    <Alert
                      variant="danger"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      <p>{alert}</p>
                    </Alert>
                  ) : null}
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default ChangePassword
