import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
//import Link from 'next/link'
import styles from '../NewLandingScreen/newLanding.module.scss'
import { useDispatch, useSelector } from 'react-redux'
//import useReactCountdown from '../../node_modules/use-react-countdown'
import moment from 'moment'
import { getEventDetails } from '../../actions/eventRegistrationActions'

const NewLandingScreen = ({ eventID }) => {
    const router = useRouter()
    // console.log("-----------------------------", eventID)
    const dispatch = useDispatch()
    const eventDetails = useSelector((state) => state.eventDetails.eventDetails)
    const auth = useSelector((state) => state.auth)
    const utc_add = auth.utc_offset ? auth.utc_offset : '+0530'
    const curTime = moment()
    const [isBrowser, setisBrowser] = useState(false)
    useEffect(() => {
        if (eventID) {
            dispatch(getEventDetails(eventID))
        }
    }, [eventID])

    const eventDate = moment
        .utc(eventDetails.DATE_TIME)
        .utcOffset(utc_add)
        .format('dddd, MMMM DD YYYY')
    // console.log(eventDate)
    const eventTime = moment
        .utc(
            eventDetails.DATE_TIME
                ? eventDetails.DATE_TIME
                : eventDetails.EVENT_DATE_TIME
                    ? eventDetails.EVENT_DATE_TIME
                    : eventDetails.DATE
        )
        .utcOffset(utc_add)
        .format('hh:mm A')
    /*let dateToEndCountdownAt = "July 22, 2022 00:00:00";

    const { days, hours, minutes, seconds } =
    useReactCountdown(dateToEndCountdownAt);*/
    const addCalendar = () => {

    }
    const useCountdown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();

        const [countDown, setCountDown] = useState(
            countDownDate - new Date().getTime()
        );

        useEffect(() => {
            const interval = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        }, [countDownDate]);

        return getReturnValues(countDown);
    };

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };
    const [days, hours, minutes, seconds] = useCountdown(eventDetails.DATE_TIME)
    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 15000)


    }, [])
    // console.log("render")
    if (process.browser) {
        //    setisBrowser(true)
    }
    return (
        <Fragment>
            <Container fluid style={{
                background: '#70acf1'
            }}>
                <Row className={styles.BannerNewLanding}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Row>
                            <Col className='p-0'>
                                <Image
                                    src="/thankyou-banner.jpg"
                                    alt="Banner Image"
                                    width={760}
                                    height={640}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Row>
                            <Col className={styles.bannerThank}>
                                <Row>
                                    <Col>
                                        <h1>Registration Successful!<br/>See you there</h1>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col>
                                        <p>CollegePass Livestream<strong>{eventDetails.NAME}</strong>&nbsp;&nbsp;<br />
                                            Join us online | {eventDate} | {eventTime} IST</p>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col className="d-flex">
                                        <h2>{days.toLocaleString('en-US', {
                                            minimumIntegerDigits: 2,
                                            useGrouping: false
                                        })}<span className={styles.sep}>:</span><br /><span>Days</span></h2>
                                        <h2>{hours.toLocaleString('en-US', {
                                            minimumIntegerDigits: 2,
                                            useGrouping: false
                                        })}<span className={styles.sep}>:</span><br /><span>Hours</span></h2>
                                        <h2>{minutes.toLocaleString('en-US', {
                                            minimumIntegerDigits: 2,
                                            useGrouping: false
                                        })}<span className={styles.sep}>:</span><br /><span>Minutes</span></h2>
                                        <h2>{seconds.toLocaleString('en-US', {
                                            minimumIntegerDigits: 1,
                                            useGrouping: false
                                        })}<span className={styles.sep} style={{
                                            visibility: 'hidden'
                                        }}>:</span><br /><span>Seconds</span></h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            href={`${eventDetails?.CALLENDER_LINK}`} target="_blank"
                                        >Add to calendar</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            {/*<Container fluid style={{
            background: '#ffffff',
            backgroundImage: 'url("background-image: url(https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/STAGING.png);")'
        }}>
            <Container>
                <Row>
                    <Col className={styles.whiteSection}>
                        <h2>
                            We're building the next generation of Google Ads to help you meet your customer objectives. Let's dive in.
                        </h2>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid style={{
            background: '#fff7e1'
        }}>
            <Container>
                <Row className={styles.yelloSection}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Image 
                            src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-2.jpg"
                            alt="Banner Image"
                            width={700}
                            height={570}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2>Grow your customer base</h2>
                        <p>
                            Find new customers in a world with 2.5B digital buyers… and in a region where new generations redefine what we watch and how we shop
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid style={{
            background: '#e2f6e9'
        }}>
            <Container>
                <Row className={styles.greenSection}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Image 
                            src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-3.jpg"
                            alt="Banner Image"
                            width={700}
                            height={570}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2>Increase your revenue</h2>
                        <p>
                            Increase your revenue in a time when consumers demand (and reward) personal, seamless and relevant experiences -- online, offline and in-app
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid style={{
            background: '#e7f0ff'
        }}>
            <Container>
                <Row className={styles.skyBlueSection}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Image 
                            src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-4.jpg"
                            alt="Banner Image"
                            width={700}
                            height={570}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2>Maximize your profit </h2>
                        <p>
                            Maximize your profits in an age when loyalty defines customer lifetime value and the complexity of data challenges your budgets to do more with less
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid style={{
            background: '#dff6e7'
        }}>
            <Container>
                <Row className={styles.greenSection}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Image 
                            src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-6.jpg"
                            alt="Banner Image"
                            width={700}
                            height={570}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2>Supercharge your expertise</h2>
                        <p>
                            Attend a full suite of on-demand, virtual breakout sessions built to help you achieve your business objectives
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid style={{
            background: '#fff7e1'
        }}>
            <Container>
                <Row className={styles.yelloSection}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <Image 
                            src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test5.jpg"
                            alt="Banner Image"
                            width={700}
                            height={570}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <h2>Future-proof your growth</h2>
                        <p>
                            Future-proof your growth in an environment that recognizes privacy as top of mind and makes new approaches to measurement critical
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>*/}
            {/*<Container fluid>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h2>Featured speakers</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-9.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Scott Beaumont</h3>
                                        <p>President, Asia Pacific, Google</p>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-8.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Jerry Dischler</h3>
                                        <p>VP/GM, Ads, Google</p>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-7.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Roma D Chobey</h3>
                                        <p>Senior Director, Digital First businesses, Google India </p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-9.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Scott Beaumont</h3>
                                        <p>President, Asia Pacific, Google</p>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-8.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Jerry Dischler</h3>
                                        <p>VP/GM, Ads, Google</p>
                                    </Col>
                                    <Col lg={4} md={4} sm={12} xs={12}>
                                        <Image 
                                        src="https://collegepass-event-banners.s3.ap-south-1.amazonaws.com/test-7.png"
                                        alt="Banner Image"
                                        width={300}
                                        height={300}
                                        />
                                        <h3>Roma D Chobey</h3>
                                        <p>Senior Director, Digital First businesses, Google India </p>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>*/}
        </Fragment>
    )
}

export default NewLandingScreen
