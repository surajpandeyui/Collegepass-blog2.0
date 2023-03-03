import Head from 'next/head'
import {Container, Row, Col} from 'react-bootstrap'
import Image from 'next/image'
import styles from './error.module.scss';

export default function Custom404() {
	return (
    <>
      <Head>
				<title>CollegePass - Error</title>
			</Head>
      <main>
        <Container fluid className="bg-black">
          <Container>
            <Row className="pt-5 pb-4 white-color text-center">
              <Col className="pt-4 pb-5">
                <Row>
                  <Col className={styles.error}>
                  <h1>4 <span><Image
                      width='95'
                      height='95'
                      src='/holo.png'
                      alt='Holo'
                      className="bounce"
                    /></span> 4</h1>
                    <h2>page not found</h2>
                  <p>Sorry, the page you&apos;re looking for cannot be accessed</p>
                  <h5 className="pb-3 pt-2">Picasso&apos;s first word was &quot;pencil&quot;</h5>
                  <p>Picasso&apos;s first word was &quot;piz,&quot; short of &quot;lápizv the Spanish word for &quot;pencil.&quot; His father Ruiz, an artist and art professor, gave him a formal education in art starting from the age of 7. By 13, Ruiz vowed to give up painting as he felt that Pablo had surpassed him.</p>
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