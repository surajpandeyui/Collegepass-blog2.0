import React, { Fragment, useState } from 'react'
import { Modal, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import styles from './modal.module.scss'
import { register, socialLogin } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APIregistercheck } from '../../config/API'
// import dynamic from 'next/dynamic'
// import LoginModal from './LoginModal'
// import FacebookLogin from 'react-facebook-login'
// import GoogleLogin from 'react-google-login'
// const LoginModal = dynamic(() => import('./LoginModal'))

const RegisterModal = ({ show, handleClose, onSubmitRegister }) => {
  const alert = useSelector((state) => state.alert)

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => {
    setShowLogin(true)
    handleClose()
  }

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errorText, setErrorText] = useState(null)

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setLoading(false)
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      try {
        const res = await axios.post(
          APIregistercheck,
          {
            EMAIL: email,
            PASSWORD: password,
          },
          config
        )
        if (!res.data.status) {
          setErrorText(res.data.message)
        } else {
          console.log('Made it here')
          dispatch(register(email, password))
          if (!alert) {
            onSubmitRegister()
            setLoading(false)
          } else {
            console.log('Alert!', alert)
          }
        }
      } catch (err) {
        setErrorText(
          res.data.message || 'Something went wrong, please try again later'
        )
      }
    }
    setValidated(true)
  }

  const responseFacebook = (response) => {
    let source = 'FACEBOOK'
    dispatch(socialLogin(response.email, source))
    handleClose()
  }

  const responseGoogleSuccess = (response) => {
    let source = 'GOOGLE'
    dispatch(socialLogin(response?.profileObj?.email, source))
    handleClose()
  }
  const responseGoogleFailure = (response) => {
    let source = 'GOOGLE'
    if (response.profileObj.email) {
      dispatch(socialLogin(response?.profileObj?.email, source))
    }
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} className={styles.loginModal}>
        <Modal.Header
          closeButton
          className="border-bottom-none"
          style={{
            paddingLeft: '5%',
          }}
        >
          <Row className="width-100">
            <Col className="text-center">
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
                  <h4>Create a CollegePass account</h4>
                  {/*<h6>You will be signed in to CollegePass Plus and CollegePass Premium</h6>*/}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className={styles.wrapModalContent}>
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={onChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter a valid email
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                        pattern=".{6,}"
                      />
                      <Form.Control.Feedback type="invalid">
                        Password should be atleast 6 characters long
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {errorText}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center mb-5 pb-2">
                    <Button className={styles.loginButton} type="submit">
                      Create Account
                    </Button>
                  </Col>
                </Row>
                {/*<Row>
                  <Col className="text-center">
                    <p className={styles.modalPrivacy}>
                      By logging in, you agree to our{' '}
                      <Link href="/privacy">Privacy Policy</Link> and{' '}
                      <Link href="">Terms</Link> of Service
                    </p>
                  </Col>
                </Row>*/}
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        onSubmitLogin={handleCloseLogin}
      /> */}
    </Fragment>
  )
}

export default RegisterModal