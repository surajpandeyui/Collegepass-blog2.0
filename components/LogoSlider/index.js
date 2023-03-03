import React, {Fragment} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Image from 'next/image'
import styles from '../LogoSlider/logoSlider.module.scss';

const LogoSlider = () => {
    
	return (
		<Fragment>
			<Container fluid className="bg-white">
                <Container>
                    <Row className={styles.logoSlider}>
                        <Col className={styles.logoSliderheading}>
                            <h2 className="pt-5 pb-5" style={{
                                color: '#000000'
                            }}>COLLEGEPASS STUDENT RESULTS</h2>
                            <Row>
                                <Col className={styles.logoSliderimages}>
                                    <span className={styles.brandLogoDesktop}>
                                        <Image
                                            src="/universities_results.jpg"
                                            alt="Picture of the university Logo"
                                            width={2936}
                                            height={106}
                                        />
                                    </span>
                                    <span className={styles.brandLogoMobile}>
                                        <Image
                                            src="/universities_mobile.jpg"
                                            alt="Picture of the university Logo"
                                            width={586}
                                            height={370}
                                        />
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
			</Container>
		</Fragment>
	)
}

export default LogoSlider