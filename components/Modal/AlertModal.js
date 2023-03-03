import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import styles from './modal.module.scss'
import Image from 'next/image'

const AlertModal = ({ show, title, message, type }) => {
    const [showalert, setShow] = useState(false)
  /*useEffect(() => {
     if(showalert)
     setTimeout (()=>{
        setShow(false)
     },5000)
     return clearTimeout()
  }, [showalert])*/

  useEffect(() => {
	setShow(show)
  }, [show])
  return (
    <Fragment>
      <Modal show={showalert} className={type == 'success'?styles.alertModalSuccess:styles.alertModalError} onHide={()=>{setShow(false)}}>
				<Modal.Body>
					<Row>
						<Col lg={2} md={2} sm={2} xs={2}>
							<Row>
								<Col className={styles.alertIcon}>
									<Image
										width={50}
										height={50}
										src={type == 'success'?"/success_icon.png":"/error_icon.png"}
										alt="Success"
									/>
								</Col>
							</Row>
						</Col>
						<Col lg={8} md={8} sm={10} xs={10} style={{
							paddingBottom: '2%',
							borderRight: '1px solid #abb6bb',
							paddingTop: '2%'
						}}>
							<Row>
								<Col className={styles.alertText}>
									<h3>{title}</h3>
									<p className="mb-0">{message}</p>
								</Col>
							</Row>
						</Col>
						<Col lg={2} md={2} sm={10} xs={10} className="cursor-pointer">
							<Row>
								<Col className={styles.alertCloseBtn}>
									<p className="mb-0" onClick={()=>{setShow(false)}}>CLOSE</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
    </Fragment>
  )
}

export default AlertModal
