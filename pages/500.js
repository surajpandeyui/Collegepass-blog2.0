import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import styles from './error.module.scss'

export default function Custom500() {
  return (
    <>
      <Head>
				<title>CollegePass - Error</title>
			</Head>
      <main>
        <Container fluid className="bg-black">
          <Container>
            <Row className="pt-5 mt-5 white-color text-center">
              <Col className="pt-4 pb-4">
                <Row>
                  <Col className={styles.error}>
                    <h1>
                      5{' '}
                      <span>
                        <Image
                          width="100"
                          height="100"
                          src="/holo.png"
                          alt="Holo"
                          className="bounce"
                        />
                      </span>{' '}
                      <span>
                        <Image
                          width="100"
                          height="100"
                          src="/holo.png"
                          alt="Holo"
                          className="bounce"
                        />
                      </span>
                    </h1>
                    <h2>Error!</h2>
                    <p>Oops, something went wrong !</p>
                    <p>
                      {' '}
                      Please contact us at support@collegepass.org incase of any
                      queries
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>
    </>
  )
}
