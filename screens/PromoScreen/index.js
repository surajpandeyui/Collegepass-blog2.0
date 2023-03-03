import React, {Fragment} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../PromoScreen/promo.module.scss'

const PromoScreen = () => {
	return (
		<Fragment>
			<Fragment>
				<Container fluid className="bg-black pt-5 pb-5 text-center">
					<Container className={styles.promo}>
						<Row className='pt-5 mt-5'>
							<Col className={styles.promoWidth}>
								<Row>
                                    <Col className="text-right">
                                        <span><Link href="/">×</Link></span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Image 
                                            src="/holo-gold.png"
                                            alt="Holo"
                                            width={50}
                                            height={50}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h1>YOUR PATH TO<br/>THE IVY LEAGUE</h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>One on One, Personalised<br/>College Admissions Advising</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Unlimited Access to Advisors</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button>Book Your Free Consultation</Button>
                                    </Col>
                                </Row>
							</Col>
						</Row>
					</Container>
				</Container>
			</Fragment>
		</Fragment>
	)
}

export default PromoScreen
