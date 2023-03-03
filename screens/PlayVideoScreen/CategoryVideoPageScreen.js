
import {Container, Row, Col} from 'react-bootstrap'
import React from 'react'
import Image from "next/image";
import styles from '../PlayVideoScreen/playvideo.module.scss';


const PlayVideoScreen = () => {
	return (
        <Container fluid className="bg-black pt-5 pb-5 white-color">
            <Container>
                <Row>
                    <Col className={styles.playVideo}>
                        <Row>
                            <Col><h2 className="text-center pt-4 pb-4">SUPPLEMENTAL ESSAYS</h2></Col>
                        </Row>
                        <Row>
                            <Col className="m-auto text-center">
                                <video
                                    width='700'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source
                                        src='https://d2rxf0sof329tl.cloudfront.net/137+Content+Promo+Website+Loop+10secs+V2B.mp4'
                                        type='video/mp4'
                                    />
                                </video>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={styles.relatedVideo}>
                                <Row>
                                    <Col><h2 className="text-center pt-5 pb-5 mt-5">RELATED VIDEOS</h2></Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                    <Col className="text-center">
                                        <Image 
                                            src="/starting-the-essay.jpeg"
                                            alt="Related Video Thumb"
                                            width="500"
                                            height="300"
                                        />
                                        <p>THE APPLICATION ESSAY: STARTING THE ESSAY</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
	)
}

export default PlayVideoScreen
