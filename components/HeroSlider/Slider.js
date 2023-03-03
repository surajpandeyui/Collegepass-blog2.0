import React, { Fragment, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import collegeNames from './utils/collegeNames'
import Typewriter from 'typewriter-effect'
import styles from './slider.module.scss'
import { useRouter } from 'next/router'
import LandingButtonModal from '../Modal/LandingButtonModal'
import RegisterModal from '../Modal/RegisterModal'
import { useSelector } from 'react-redux'
import LoginModal from '../Modal/LoginModal'

const Slider = () => {

  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)
  const auth = useSelector((state) => state.auth)
  const [showLButton, setShowLButton] = useState(false)
  const handleShowLButton = () => setShowLButton(true)
  const handleTestButton = () => window.open('https://exams.collegepass.org/sat/welcome', '_blank');

  const handleCloseLButton = () => setShowLButton(false)

  const [showRegister, setShowRegister] = useState(false)
  const handleCloseRegister = () => setShowRegister(false)
  const handleShowRegister = () => {
    setShowRegister(true)
  }

  const [email, setEmail] = useState('')

  const { asPath } = useRouter() //gives the current path displayed in the browser

  let videoSource = null
  let leftCol = null

  if (asPath === '/') {
    videoSource = (
      <source
        src="https://d2rxf0sof329tl.cloudfront.net/137+Content+Promo+Website+Loop+10secs+V2B.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              APPLYING TO <br />
              <Typewriter
                options={{
                  strings: collegeNames,
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <h5 className="">Ivy League Admissions Advising</h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              // value=''
            />
            <br />
            <button onClick={handleShowRegister} className="trigger1 mt-2">
              Create Your Free Account
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ivy-league-undergraduate-admissions') {
    videoSource = (
      <source
        src="https://collegepass.s3.ap-south-1.amazonaws.com/CP_Testimonial_admissions_page_720p.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              APPLYING TO <br />
              <Typewriter
                options={{
                  strings: collegeNames,
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <h4 className="pt-2 pb-2">
              One on One, Personalised
              <br />
              College Admissions Advising
            </h4>
            {/* <h5 className="pt-2 pb-2">Essay Editing in the US/UK</h5> */}
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button className="mt-2">
              <i className="fa fa-calendar" aria-hidden="true"></i> Book Your
              Free Consultation
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ms-admissions') {
    videoSource = <source src="https://collegepass-event-video-banners.s3.ap-south-1.amazonaws.com/collegepass_student_pankhuri's_journey_to_stanford!+(720p).mp4" type="video/mp4" />

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              APPLYING TO <br />
              <Typewriter
                options={{
                  strings: collegeNames,
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <h4 className="pt-2 pb-2">
              One on One, Personalised
              <br />
              Masters Admissions Advising
            </h4>
            {/* <h5 className="pt-2 pb-2">
              Personal Statement Editing in the US/UK
            </h5> */}
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button onClick={handleShowLButton} className="mt-2">
              <i className="fa fa-calendar" aria-hidden="true"></i> Book Your
              Free Consultation
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/sat-tutoring') {
    videoSource = (
      <source
        src="https://d2rxf0sof329tl.cloudfront.net/072+Beat+the+SAT+Preview.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              Score 1500+ <br />
              on the SAT
            </h1>
            <h4 className="pt-2 pb-2">
              Learn from Internationally, Experienced
              <br />
              SAT MasterTutors
            </h4>
            <h5 className="pt-2 pb-2">100+ Hours of Tutoring</h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            {auth && auth.isAuthenticated?
            <button onClick={handleTestButton} className="mt-2">
             TAKE A FREE DIAGNOSTIC TEST
          </button>:
            <button onClick={handleShowLogin} className="mt-2">
               TAKE A FREE DIAGNOSTIC TEST
            </button>
            
            }
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ib-tutoring') {
    videoSource = (
      <source
        src="https://d2rxf0sof329tl.cloudfront.net/133+IB+Tutoring+Preview.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              IB / IGCSE <br />
              Classes
            </h1>
            <h4 className="pt-2 pb-2">
              Learn from Top Rated,
              <br />
              Experienced IB/IGCSE Tutors
            </h4>
            <h5 className="pt-2 pb-2">One-on-One Tutoring</h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button onClick={handleShowLButton} className="mt-2">
              <i className="fa fa-calendar" aria-hidden="true"></i> Book a Free
              Trial Class
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/sat-contest') {
    videoSource = (
      <source
        src="https://d2rxf0sof329tl.cloudfront.net/133+IB+Tutoring+Preview.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>SAT Talent Hunt</h1>
            <h4 className="pt-2 pb-2">SAT Scholarships worth Rs. 65 lakhs!</h4>
            <h5 className="pt-2 pb-2">
              100% Scholarship for the Top 50 Scorers.
              <br />
              80% Scholarship for the next 100 High Scorers.
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button onClick={handleShowLButton} className="mt-2">
              Register Now
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ielts-tutoring') {
    videoSource = (
      <source
        src="https://collegepass-videos-banners.s3.ap-south-1.amazonaws.com/IELTS+Intro+720p.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              Score 7+ <br />
              Bands on IELTS
            </h1>
            <h4 className="pt-2 pb-2">
              Learn from Internationally Experienced Tutors
            </h4>
            <h5 className="pt-2 pb-2">Live Classes every Wednesday</h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button onClick={handleShowLButton} className="mt-2">
            <i className="fa fa-calendar" aria-hidden="true"></i> Book a Free Trial Class
            </button>
          </Col>
        </Row>
      </Col>
    )
  } else if (asPath === '/ap-calculus-tutoring') {
    videoSource = (
      <source
        src="https://collegepass-videos-banners.s3.ap-south-1.amazonaws.com/AP+Calculus+Intro+720p.mp4"
        type="video/mp4"
      />
    )

    leftCol = (
      <Col className={styles.sliderText}>
        <Row>
          <Col>
            <Image
              width="190"
              height="60"
              src="/golden-logo-removebg.png"
              alt="Slider Logo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>
              Score 5 on <br />
              Calculus AB/BC
            </h1>
            <h4 className="pt-2 pb-2">
              Learn from Internationally Experienced Tutors
            </h4>
            <h5 className="pt-2 pb-2">Live Classes every Thursday</h5>
          </Col>
        </Row>
        <Row>
          <Col className={styles.sliderForm}>
            <button onClick={handleShowLButton} className="mt-2">
            <i className="fa fa-calendar" aria-hidden="true"></i> Book a Free Trial Class
            </button>
          </Col>
        </Row>
      </Col>
    )
  }

  return (
    <Fragment>
      <Container fluid className="pt-5 bg-black">
        <Row>
          <Col className={styles.slider}>
            <Row className="">
              <Col lg={4} md={4} sm={12} xs={12}>
                <Row>{leftCol}</Row>
              </Col>
              <Col lg={8} md={8} sm={12} xs={12}>
                <Row>
                  <Col className={styles.sliderVideo}>
                    <Row>
                      <Col>
                        <video
                          width="400"
                          autoPlay
                          loop
                          muted
                          playsInline
                          //poster='./assets/VideoBanner.jpeg'
                        >
                          {videoSource}
                        </video>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <LandingButtonModal
        show={showLButton}
        handleClose={handleCloseLButton}
        pageName={asPath}
      />
      <RegisterModal
        show={showRegister}
        handleClose={handleCloseRegister}
        onSubmitRegister={handleCloseRegister}
        preDefEmail={email}
      ></RegisterModal>
       <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </Fragment>
  )
}

export default Slider