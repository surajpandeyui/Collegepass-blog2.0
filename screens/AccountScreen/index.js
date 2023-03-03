import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

import styles from '../AccountScreen/account.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import ChangePassword from '../../components/Modal/ChangePassword'

const AccountScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const [premiumPlan, setPremiumPlan] = useState('Basic')
  const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' }

  const [showChangePwd, setShowChangePwd] = useState(false)
  const handleCloseChangePwd = () => setShowChangePwd(false)
  const handleShowChangePwd = () => {
    setShowChangePwd(true)
  }

  useEffect(() => {
    setPremiumPlan(auth.userDetails.ISPREMIUM===4?'Premium Plus':auth.userDetails.ISPREMIUM===3?'Premium':auth.userDetails.ISPREMIUM===2?'Plus'
    :'BASIC')
    // console.log(auth.userDetails.ISPREMIUM)
  }, [auth])

  return (
    <Fragment>
      <Container fluid className="bg-black pb-5">
        <Container>
          <Row className={styles.accountWrap}>
            <Col className={styles.account}>
              <Row className="pt-5">
                <Col>
                  <h1>Account</h1>
                </Col>
              </Row>
              <hr />
              <Row className="pt-5 pb-5">
                <Col>
                  <Row>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <h2>MEMBERSHIP & BILLING</h2>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <p style={{
                        fontWeight: '600'
                      }}>
                        {typeof window !== 'undefined'
                          ? localStorage.user
                          : null}
                      </p>
                      <p style={{
                        fontWeight: '400',
                        opacity: '0.8'
                      }}>Password: ******</p>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12} className="text-right">
                      <a href="#" onClick={handleShowChangePwd} style={{
                        textTransform: 'capitalize',
                        fontSize: '1.2em',
                        letterSpacing: '0.05rem',
                        color: '#FFE55C'
                      }} className="account-change-pass-link">
                        Change Password
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row className="pt-5 pb-5">
                <Col>
                  <Row>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <h2>PLAN DETAILS</h2>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                      <p style={{
                          fontWeight: '600'
                        }}>{premiumPlan}</p>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12} className='text-right'>
                    {premiumPlan === 'Basic' ? (
                        <Link href="/pricing"><a href="" style={{
                        textTransform: 'capitalize',
                        fontSize: '1.2em',
                        letterSpacing: '0.05rem',
                        color: '#FFE55C'
                      }}>Upgrade</a>
                        </Link>
                      ) : (
                        <p className='text-right account-change-pass-link' style={{
                          fontWeight: '600'
                        }} >
                          Expires On :{' '}
                          {new Date(auth.expiry_date).toLocaleDateString(
                            'en-US',
                            DATE_OPTIONS
                          )}
                        </p>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
            </Col>
          </Row>
        </Container>
      </Container>
      <ChangePassword show={showChangePwd} handleClose={handleCloseChangePwd} />
    </Fragment>
  )
}

export default AccountScreen
