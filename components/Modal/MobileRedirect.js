import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import Image from 'next/image'

const MobileRedirect = ({showLinkModal, handleCloseLinkModal }) => {

//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const handleCloseLinkModal = () => setShowLinkModal(false);
//   const handleShowLinkModal = () => setShowLinkModal(true);
// console.log()
  return (
    <Fragment>
     
      {/*   Get link  */}

           
      <Modal show={showLinkModal} onHide={handleCloseLinkModal} className="App-modal-cp-mobile">
        <Modal.Header closeButton style={{
          borderBottom: '0'
        }}>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col><h2>Learn from the best<br/> college counsellors.</h2></Col>
              </Row>
              <Row>
                <Col className='app-button-mobile text-center'>
                  <Button href="https://link.collegepass.org/fJc4">Open App</Button>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex pt-3">
                    <div className='app-icon-ps'>
                        <Image
                            width="28"
                            height="28"
                            src="/play-store-logo.png"
                            alt="play store icon"
                        />
                    </div>
                    <div className='app-icon-aa'>
                        <Image
                            width="28"
                            height="28"
                            src="/apple-store-logo.png"
                            alt="apple icon"
                        />
                    </div>
                </Col>
            </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/*   Get link End  */}

    </Fragment>
  )
}

export default MobileRedirect
