import React, {Fragment, useState} from 'react'
import {Container, Row, Col, Navbar, Nav, Button} from 'react-bootstrap'
import Image from 'next/image'
// import Link from 'next/link'
import LogoSlider from '../../components/LogoSlider';
import Carousel from 'react-bootstrap/Carousel';
import styles from './ielts.module.scss'

const index = () => {

	return (
		<Fragment>
			<Container fluid className='bg-black'>
                <Container className="pt-3 pb-3">
                    <Row>
                        <Col className={styles.ugHeader}>
                            <Navbar bg="black" expand="lg">
                                <Container>
                                    <Navbar.Brand href="#home">
                                        <p className={styles.ugHolo}>
                                            <Image
                                            width="45"
                                            height="45"
                                            src="/holo.png"
                                            alt="Holo"
                                            className={styles.headerHolo}
                                        />
                                        </p>
                                        <p className={styles.ugLogo}>
                                            <Image
                                            src="/chaseivy_logo.svg"
                                            alt="Text Logo"
                                            width="150"
                                            height="40"
                                            className={styles.footerLogo}
                                            />
                                        </p>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="ms-auto">
                                            <Nav.Link href="/ivy-league-undergraduate-admissions" id="ug-menu-adm-adv">CollegePass+</Nav.Link>
                                            <Nav.Link href="/ivy-league-undergraduate-admissions" id="ug-menu-adm-adv">Admissions Advising</Nav.Link>
                                            <Nav.Link href="/success-stories">Test Prep</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid style={{
                height: '72px',
                backgroundColor: 'rgb(15, 15, 15)'
            }}>
                <Row>
                    <Col className={styles.ugStrip}>
                        <p>Every CollegePass student has received a minimum of 3 admission offers in 2022.<a href="/success-stories">Success stories <i className="fa fa-external-link" aria-hidden="true"></i></a></p>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(15, 15, 15)',
                color: 'rgb(248, 248, 248)',
                position: 'relative',
                padding: '20px 200px 5px',
                overflow: 'hidden',
                backgroundImage: 'url(/hero-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'right bottom',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ugTextBanner}>
                            <Row>
                                <Col className={styles.ugBigText}>
                                    <Image
                                        src="/Join-your-dream-college-1400-400.jpg"
                                        width="1400"
                                        height="400"
                                    />
                                    {/*<h1>
                                        Join Your Dream<br/> College
                                    </h1>*/}
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.ugSmallText}>
                                    <h3>in the US, UK, Canada, Singapore, Europe, Australia, HK</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.ugButtonText}>
                                    <Button>Book Your Free Consultation</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {/*<Container fluid style={{
                backgroundImage: 'url("/video-bg.png")',
                backgroundColor: 'rgb(15, 15, 15)',
                height: '800px',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'right top',
            }}>
                    <Row>
                        <Col className={styles.ugMobileApp}>
                            <Image
                                src="/mob-1.png"
                                width="500"
                                height="1000"
                                className={styles.ugMobO}
                            /> 
                            <Image
                                src="/mob-2.png"
                                width="500"
                                height="1000"
                                className={styles.ugMobT}
                            /> 
                            <Image
                                src="/mob-3.png"
                                width="500"
                                height="1000"
                                className={styles.ugMobTh}
                            /> 
                            <Image
                                src="/mob-4.png"
                                width="500"
                                height="1000"
                                className={styles.ugMobF}
                            /> 
                            <Image
                                src="/mob-5.png"
                                width="500"
                                height="1000"
                                className={styles.ugMobFF}
                            /> 
                        </Col>
                    </Row>
            </Container>*/}
            <Container className="smallTestimonial" fluid style={{
                backgroundColor: 'rgb(238, 47, 76)',
                color: 'rgb(248, 248, 248)',
                backgroundImage: 'url("/red_banner.png")',
                backgroundSize: 'cover'
                 }}>
                    <Carousel>
                        <Carousel.Item>
                            <Container>
                                <Row>
                                    <Col className={styles.AidenSection}>
                                        <Row>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Row>
                                                    <Col>
                                                        <h2>Aiden is headed to The Ivy League
                                                        </h2>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <h3>CollegePass Student Aiden will be attending UPenn this fall & has been awarded a scholarship of USD 160,000.</h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button>
                                                            Book Your Free Consultation
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} xs={12}>
                                                <Row>
                                                    <Col className={styles.ugtestiVideoThumb}>
                                                        <Row>
                                                            <Col className={styles.ugVideoThumb}>
                                                                <Image
                                                                    src="/1.jpg"
                                                                    width="500"
                                                                    height="300"
                                                                    //className={}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className={styles.ugVideoIcon}>
                                                                <Image
                                                                    src="/play-button-cp.svg"
                                                                    width="46"
                                                                    height="46"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                    <Row>
                                        <Col className={styles.AidenSection}>
                                            <Row>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col>
                                                            <h2>Pankhuri is headed to Stanford
                                                            </h2>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h3>CollegePass Student Pankhuri will be attending Stanford this fall.</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Button>
                                                                Book Your Free Consultation
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col className={styles.ugtestiVideoThumb}>
                                                            <Row>
                                                                <Col className={styles.ugVideoThumb}>
                                                                    <Image
                                                                        src="/2.jpg"
                                                                        width="500"
                                                                        height="300"
                                                                        //className={}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className={styles.ugVideoIcon}>
                                                                    <Image
                                                                        src="/play-button-cp.svg"
                                                                        width="46"
                                                                        height="46"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Container>
                                    <Row>
                                        <Col className={styles.AidenSection}>
                                            <Row>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col>
                                                            <h2>Pratibha's son Niraj is headed to NYU
                                                            </h2>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h3>CollegePass Student Niraj has been admitted to his dream college NYU & has been awarded a scholarship of USD 160,000.</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Button>
                                                                Book Your Free Consultation
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col className={styles.ugtestiVideoThumb}>
                                                            <Row>
                                                                <Col className={styles.ugVideoThumb}>
                                                                    <Image
                                                                        src="/4.jpg"
                                                                        width="500"
                                                                        height="300"
                                                                        //className={}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className={styles.ugVideoIcon}>
                                                                    <Image
                                                                        src="/play-button-cp.svg"
                                                                        width="46"
                                                                        height="46"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Container>
                                    <Row>
                                        <Col className={styles.AidenSection}>
                                            <Row>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col>
                                                            <h2>Sheeja's daughter Tulsi is headed to UToronto
                                                            </h2>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <h3>CollegePass Student Tulsi has been admitted to his dream college UToronto.</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Button>
                                                                Book Your Free Consultation
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={6} md={6} sm={12} xs={12}>
                                                    <Row>
                                                        <Col className={styles.ugtestiVideoThumb}>
                                                            <Row>
                                                                <Col className={styles.ugVideoThumb}>
                                                                    <Image
                                                                        src="/3.jpg"
                                                                        width="500"
                                                                        height="300"
                                                                        //className={}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className={styles.ugVideoIcon}>
                                                                    <Image
                                                                        src="/play-button-cp.svg"
                                                                        width="46"
                                                                        height="46"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                        </Carousel>
            </Container>
            <Container fluid className='bg-black'>
                <Row>
                    <Col className={styles.ugBrands}>
                        <Row>
                            <Col>
                                <LogoSlider />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(26, 97, 233)',
                color: 'rgb(248, 248, 248)',
                backgroundImage: 'url("/blue_banner.png")',
                backgroundSize: 'cover'
                 }}>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.advisorSection}>
                                    <Image
                                        src="/ivy-advisors-lap.png"
                                        width="700"
                                        height="500"
                                        //className={}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col className={styles.AidenSection}>
                                    <Row>
                                        <Col>
                                            <h2>Team up with Ivy League Trained Admission Advisors
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3>CollegePass Admission Advisors have undergone specialised admissions advising training at Top US Universities: Columbia, UC Berkeley</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button>
                                                Book Your Free Consultation
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(33, 36, 38)',
                color: 'rgb(248, 248, 248)',
                minHeight: '100vh',
                position: 'relative',
                padding: '240px 200px 250px',
                backgroundImage: 'url("/hero-bg.png")',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ugMobilSilderSection}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12} className={styles.ugMobileTextSectionWrap}>
                                    <Row className={styles.ugMobilrSilderTextSection}>
                                        <Col>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                            <p>Attend college admissions Livestreams, view masterclasses and get answers to all the key questions about the admissions process</p>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugMobilrSilderTextSection}>
                                        <Col>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                            <p>Attend college admissions Livestreams, view masterclasses and get answers to all the key questions about the admissions process</p>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugMobilrSilderTextSection}>
                                        <Col>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                            <p>Attend college admissions Livestreams, view masterclasses and get answers to all the key questions about the admissions process</p>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugMobilrSilderTextSection}>
                                        <Col>
                                            <h2>Learn Online from<br/>
                                            the World’s Best<br/> College Admission Advisors</h2>
                                            <p>Attend college admissions Livestreams, view masterclasses and get answers to all the key questions about the admissions process</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12} className={styles.ugMobileSilderMobileWrap}>
                                    <Row style={{
                                        position: 'sticky',
                                        top: '80px',
                                        width: '350px',
                                        height: '660px',
                                        boxShadow: 'rgb(176 176 178 / 16%) 0px -5px 6px 0px inset, rgb(0 0 0 / 24%) 4px 6px 11px 1px inset',
                                        borderRadius: '46px',
                                        padding: '16px 14px',
                                        margin: 'auto'
                                    }}>
                                        <Col className={styles.ugMobilrSilderMobileSection}>
                                            <Carousel>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/mobile-section_1.jpg"
                                                    width="500"
                                                    height="1000"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/mobile-section_2.jpg"
                                                    width="500"
                                                    height="1000"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <Image
                                                    src="/mobile-section_1.jpg"
                                                    width="500"
                                                    height="1000"
                                                    className={styles.ugMobSlider}
                                                /> 
                                                </Carousel.Item>
                                                </Carousel>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid>
                <Row>
                    <Col className={styles.ugBgBanner} style={{
                        backgroundImage: "url('./Bg_Banner.jpg')"
                    }}>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(90, 30, 203)',
                color: 'rgb(248, 248, 248)',
                backgroundImage: 'url("/purple_banner.png")',
                backgroundSize: 'cover'
                 }}>
                <Container>
                    <Row>
                        <Col className={styles.AidenSection}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h2>Leverage CollegePass<br/> 
                                                Profile Builder
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3>CollegePass Profile Builder is an advanced, college admissions platform developed based on 100+ Ivy League/UK/Canada Success Case Studies</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button>
                                                Book Your Free Consultation
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col className={styles.profileBuilderImg}>
                                            <Image
                                            src="/profile_builder-image.png"
                                            width="700"
                                            height="500"
                                            //className={}
                                        />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {/*<Container fluid style={{
                backgroundColor: 'rgb(2, 119, 87)',
                color: 'rgb(248, 248, 248)',
                backgroundImage: 'url("/trust-bg.jpg")',
                backgroundSize: 'cover'
                 }}>
                <Container>
                    <Row>
                        <Col className={styles.BeginsSection}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <h2>Learn Online from<br/>the World’s Best<br/>College Admission Advisors</h2>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                            <p>Attend college admissions Livestreams, view masterclasses<br/>
                                                and get answers to all the key questions about the admissions process
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button>Download The App</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>*/}
            <Container fluid className='bg-black'/* style={{
                display: 'none'
            }}*/>
                <Container>
                    <Row>
                        <Col className={styles.ugAppSection}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col className='p-0'>
                                            <h2>4.9</h2>
                                        </Col>
                                        <Col className='p-0'>
                                            <h3>Google</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Image
                                                 src="/rating-ios.png"
                                                 width="200"
                                                 height="30"
                                                // className={}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h2>4.3</h2>
                                        </Col>
                                        <Col>
                                            <h3>Play<br/> Store</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Image
                                                 src="/rating-ios.png"
                                                 width="200"
                                                 height="30"
                                                // className={}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button href="https://bit.ly/3trJ3m3">Download The App</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h2>4.1</h2>
                                        </Col>
                                        <Col>
                                            <h3>App <br/>Store</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Image
                                                src="/rating-ios.png"
                                                width="200"
                                                height="30"
                                                // className={}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button href="https://apple.co/3M1IDuT">{/*<i className="fa fa-apple" aria-hidden="true"></i>*/} Download The App</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.ugTextTestimonial}>
                                    <Carousel>
                                        <Carousel.Item interval={2000}>
                                            <p>My experience with the college pass team has been a very positive one as I felt their constant support and guidance from day one and I believe this has helped me get into my dream college.</p>
                                        </Carousel.Item>
                                        <Carousel.Item interval={2000}>
                                            <p>Collegepass efficaciously aids in a high-school student's admission experience by shedding a ray of insight into university selection and offering unwavering support for all its academic components.</p>
                                        </Carousel.Item>
                                        <Carousel.Item interval={2000}>
                                            <p>CollegePass has helped me at every step of my application process. From suggesting in expanding my extracurriculars to constructive advice on my personal statement, their support has helped me in improving the quality of my application a lot. It was an amazing experience working with them.</p>
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(36, 36, 36)'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ugAboutCp}>
                            <Row className="pb-5">
                                <Col>
                                    <h6>About CollegePass</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col>
                                    <h6>How CollegePass helps students in their College Applications?</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col>
                                    <h6>What do students and their parents get while working with CollegePass?</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </Col>
                            </Row>
                            <Row className="pb-5">
                                <Col>
                                    <h6>How many universities has students from CollegePass?</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(22, 21, 23)',
                color: 'rgb(255, 255, 255)'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ugTopFooter}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row className={styles.ugFooterLogoHolo}>
                                        <Col>
                                            <Image
                                                width="45"
                                                height="45"
                                                src="/holo.png"
                                                alt="Holo"
                                                className={styles.ugFooterHolo}
                                            />
                                            <Image
                                                src="/chaseivy_logo.svg"
                                                alt="Text Logo"
                                                width="150"
                                                height="40"
                                                className={styles.ugFooterLogo}
                                            />
                                        </Col>
                                    </Row>
                                    {/*<Row className={styles.ugbrandFooter}>
                                        <Col>
                                            <Image
                                                width="405"
                                                height="67"
                                                src="/security-logos.jpg"
                                                alt="Holo"
                                                className={styles.ugFooterBrand}
                                            />
                                        </Col>
                                    </Row>*/}
                                    <Row className={styles.ugLogosSectionTextTop}>
                                        <Col>
                                            <h6>We believe world-class admissions advising</h6>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugLogosSectionTextBottom}>
                                        <Col>
                                            <p>LEARN HOW COLLEGEPASS CAN HELP YOU GET INTO THE TOP COLLEGES/UNIVERSITIES IN THE USA, UK, CANADA AND OTHER COUNTRIES.</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row className={styles.ugFooterMenu}>
                                        <Col style={{
                                            paddingRight: '30%'
                                        }}>
                                            <p>Explore</p>
                                            <ul>
                                                <li><a href="/pricing">Pricing</a></li>
                                                <li><a href="/success-stories">Success Stories</a></li>
                                                <li><a href="/sitemap.xml">Sitemap</a></li>
                                            </ul>
                                        </Col>
                                        <Col>
                                            <p>About</p>
                                            <ul>
                                                <li><a href="/about">About Us</a></li>
                                                <li><a href="/contact">Contact Us</a></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row className={styles.ugFooterMenu}>
                                        <Col style={{
                                            paddingRight: '30%'
                                        }}>
                                            <p>Social</p>
                                            <ul>
                                                <li><a href="https://twitter.com/CollegePassOne?s=09" target="_blank">Twitter</a></li>
                                                <li><a href="https://www.instagram.com/_collegepass/" target="_blank">Instagram</a></li>
                                                <li><a href="https://www.facebook.com/CollegePassPremiere/" target="_blank">Facebook</a></li>
                                                <li><a href="https://www.linkedin.com/company/collegepass/" target="_blank">LinkedIn</a></li>
                                            </ul>
                                        </Col>
                                        <Col>
                                            <p>Download</p>
                                                <ul>
                                                    <li>
                                                    <a href="https://apple.co/3M1IDuT" target="_blank" rel="noopener noreferrer">
                                                        <svg
                                                            width="136"
                                                            height="48"
                                                            viewBox="0 0 136 48"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-hidden="true"
                                                        >
                                                            <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="135"
                                                            height="47"
                                                            rx="7.5"
                                                            fill="black"
                                                            stroke="#949AA4"
                                                            ></rect>
                                                            <path
                                                            d="M26.3164 10C26.4891 11.5229 25.8558 13.0525 24.9162 14.1516C23.976 15.2514 22.4348 16.105 20.924 15.992C20.7183 14.4994 21.4804 12.9429 22.3519 11.9702C23.3231 10.8717 24.9614 10.0525 26.3164 10Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M31.9085 29.0709C31.7417 29.0055 28.3397 27.6724 28.3027 23.8131C28.2723 20.5914 30.9692 19.0081 31.2005 18.8724C31.2053 18.8696 31.2091 18.8673 31.2117 18.8658C29.63 16.6292 27.1669 16.3224 26.29 16.2868C25.0072 16.1613 23.7628 16.6354 22.7468 17.0225C22.102 17.2681 21.5492 17.4787 21.137 17.4787C20.6767 17.4787 20.108 17.2609 19.47 17.0165C18.6346 16.6966 17.6804 16.3311 16.6949 16.3494C14.4091 16.381 12.3041 17.6321 11.1258 19.6077C8.75359 23.5858 10.5201 29.4782 12.8315 32.707C13.9626 34.285 15.3109 36.0628 17.0807 35.9983C17.8726 35.968 18.4357 35.7364 19.0179 35.497C19.6897 35.2208 20.3869 34.9341 21.4904 34.9341C22.5448 34.9341 23.2113 35.2126 23.852 35.4803C24.4638 35.7359 25.0522 35.9818 25.9326 35.966C27.7665 35.933 28.9306 34.355 30.053 32.7715C31.3141 30.9899 31.8547 29.2643 31.9109 29.0848C31.9125 29.0797 31.9137 29.0759 31.9145 29.0733C31.9138 29.073 31.9117 29.0722 31.9085 29.0709Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M48.3882 32.2248H43.061L41.7817 36.2132H39.5254L44.5711 21.457H46.9154L51.9612 36.2132H49.6663L48.3882 32.2248ZM43.6128 30.3843H47.8354L45.7538 23.9114H45.6955L43.6128 30.3843Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M62.8578 30.8342C62.8578 34.1774 61.1631 36.3254 58.6056 36.3254C57.9577 36.3612 57.3134 36.2036 56.7464 35.8707C56.1795 35.5379 55.7127 35.0431 55.3997 34.4432H55.3513V39.7719H53.2598V25.4544H55.2843V27.2438H55.3227C55.6502 26.6467 56.1248 26.1545 56.6961 25.8196C57.2674 25.4847 57.914 25.3196 58.5671 25.3418C61.1532 25.3418 62.8578 27.5003 62.8578 30.8342ZM60.7081 30.8342C60.7081 28.6561 59.642 27.2241 58.0154 27.2241C56.4174 27.2241 55.3425 28.6862 55.3425 30.8342C55.3425 33.0019 56.4174 34.4536 58.0154 34.4536C59.642 34.4536 60.7081 33.0321 60.7081 30.8342Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M74.0727 30.8342C74.0727 34.1774 72.3779 36.3254 69.8204 36.3254C69.1726 36.3612 68.5283 36.2036 67.9613 35.8707C67.3943 35.5378 66.9276 35.0431 66.6145 34.4432H66.5661V39.7719H64.4746V25.4544H66.4991V27.2438H66.5375C66.865 26.6467 67.3396 26.1545 67.9109 25.8196C68.4822 25.4847 69.1288 25.3196 69.7819 25.3418C72.368 25.3418 74.0727 27.5002 74.0727 30.8342ZM71.9229 30.8342C71.9229 28.6561 70.8568 27.2241 69.2302 27.2241C67.6322 27.2241 66.5573 28.6862 66.5573 30.8342C66.5573 33.0019 67.6322 34.4536 69.2302 34.4536C70.8568 34.4536 71.9229 33.0321 71.9229 30.8342H71.9229Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M81.4847 32.1017C81.6397 33.5651 82.9861 34.5259 84.8259 34.5259C86.5887 34.5259 87.8571 33.565 87.8571 32.2456C87.8571 31.1002 87.0921 30.4144 85.2809 29.9444L83.4696 29.4837C80.9034 28.8292 79.712 27.562 79.712 25.5057C79.712 22.9597 81.8134 21.2109 84.7973 21.2109C87.7504 21.2109 89.7749 22.9597 89.843 25.5057H87.7317C87.6053 24.0331 86.4524 23.1442 84.7676 23.1442C83.0827 23.1442 81.9298 24.0436 81.9298 25.3526C81.9298 26.3958 82.6662 27.0097 84.4675 27.4796L86.0073 27.8788C88.8747 28.5948 90.0661 29.811 90.0661 31.9694C90.0661 34.73 87.9834 36.4591 84.6709 36.4591C81.5715 36.4591 79.4789 34.7707 79.3438 32.1016L81.4847 32.1017Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M94.579 22.9082V25.4542H96.5166V27.203H94.579V33.134C94.579 34.0554 94.967 34.4848 95.8187 34.4848C96.0488 34.4805 96.2784 34.4635 96.5067 34.4337V36.172C96.1238 36.2476 95.7346 36.2818 95.345 36.2741C93.2821 36.2741 92.4776 35.456 92.4776 33.3695V27.203H90.9961V25.4542H92.4776V22.9082H94.579Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M97.6387 30.8344C97.6387 27.4494 99.5268 25.3223 102.471 25.3223C105.425 25.3223 107.305 27.4493 107.305 30.8344C107.305 34.2287 105.435 36.3465 102.471 36.3465C99.5081 36.3465 97.6387 34.2286 97.6387 30.8344ZM105.174 30.8344C105.174 28.5123 104.166 27.1418 102.471 27.1418C100.776 27.1418 99.7697 28.5228 99.7697 30.8344C99.7697 33.1657 100.776 34.5257 102.471 34.5257C104.166 34.5257 105.174 33.1657 105.174 30.8344H105.174Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M109.031 25.4553H111.026V27.2864H111.074C111.209 26.7145 111.527 26.2091 111.973 25.8551C112.419 25.5012 112.968 25.3202 113.525 25.3427C113.766 25.3418 114.007 25.3694 114.242 25.4251V27.4907C113.938 27.3925 113.62 27.3474 113.302 27.3572C112.998 27.3442 112.695 27.4008 112.414 27.523C112.133 27.6453 111.88 27.8304 111.673 28.0655C111.466 28.3007 111.31 28.5803 111.215 28.8853C111.12 29.1903 111.088 29.5134 111.123 29.8324V36.2137H109.031L109.031 25.4553Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M123.883 33.0531C123.601 35.0061 121.8 36.3465 119.495 36.3465C116.531 36.3465 114.691 34.2495 114.691 30.8854C114.691 27.5109 116.541 25.3223 119.407 25.3223C122.227 25.3223 123.999 27.367 123.999 30.629V31.3856H116.803V31.519C116.769 31.915 116.816 32.3138 116.94 32.6891C117.064 33.0645 117.263 33.4076 117.522 33.6958C117.781 33.984 118.095 34.2107 118.444 34.3608C118.793 34.5109 119.168 34.581 119.544 34.5663C120.038 34.6152 120.534 34.4944 120.958 34.2217C121.382 33.9491 121.711 33.5392 121.897 33.0531L123.883 33.0531ZM116.813 29.8422H121.907C121.925 29.4862 121.874 29.1299 121.757 28.7958C121.639 28.4616 121.457 28.1568 121.222 27.9004C120.987 27.644 120.705 27.4416 120.393 27.3058C120.081 27.1701 119.745 27.104 119.407 27.1117C119.067 27.1095 118.729 27.1786 118.414 27.315C118.099 27.4513 117.812 27.6522 117.571 27.9061C117.33 28.1599 117.139 28.4617 117.008 28.794C116.878 29.1263 116.812 29.4826 116.813 29.8422V29.8422Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M43.3475 10.3489C43.786 10.3156 44.226 10.3856 44.6357 10.5536C45.0455 10.7217 45.4149 10.9837 45.7172 11.3207C46.0194 11.6578 46.2471 12.0614 46.3837 12.5026C46.5204 12.9438 46.5625 13.4115 46.5073 13.872C46.5073 16.1371 45.3478 17.4392 43.3475 17.4392H40.9219V10.3489H43.3475ZM41.9649 16.4365H43.231C43.5443 16.4563 43.8579 16.402 44.1488 16.2777C44.4398 16.1534 44.7009 15.9621 44.913 15.7179C45.1251 15.4736 45.283 15.1825 45.3751 14.8656C45.4673 14.5488 45.4913 14.2143 45.4456 13.8864C45.488 13.5598 45.4615 13.2274 45.368 12.9129C45.2744 12.5984 45.1161 12.3096 44.9045 12.0673C44.6928 11.825 44.433 11.6351 44.1437 11.5112C43.8544 11.3873 43.5427 11.3326 43.231 11.3508H41.9649V16.4365Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M47.6851 14.7617C47.6533 14.41 47.6914 14.0552 47.797 13.72C47.9026 13.3849 48.0734 13.0767 48.2984 12.8153C48.5234 12.5539 48.7977 12.345 49.1037 12.2021C49.4096 12.0592 49.7405 11.9854 50.075 11.9854C50.4096 11.9854 50.7404 12.0592 51.0464 12.2021C51.3523 12.345 51.6266 12.5539 51.8516 12.8153C52.0767 13.0767 52.2475 13.3849 52.3531 13.72C52.4587 14.0552 52.4968 14.41 52.4649 14.7617C52.4974 15.1137 52.4597 15.4689 52.3544 15.8047C52.2491 16.1404 52.0784 16.4491 51.8533 16.711C51.6282 16.9729 51.3537 17.1822 51.0475 17.3255C50.7412 17.4687 50.41 17.5427 50.075 17.5427C49.7401 17.5427 49.4088 17.4687 49.1026 17.3255C48.7963 17.1822 48.5218 16.9729 48.2967 16.711C48.0717 16.4491 47.901 16.1404 47.7956 15.8047C47.6903 15.4689 47.6527 15.1137 47.6851 14.7617ZM51.4362 14.7617C51.4362 13.6018 50.9427 12.9235 50.0767 12.9235C49.2073 12.9235 48.7183 13.6018 48.7183 14.7617C48.7183 15.9308 49.2074 16.6039 50.0767 16.6039C50.9427 16.6039 51.4362 15.9262 51.4362 14.7617H51.4362Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M58.819 17.4397H57.7815L56.7341 13.4988H56.655L55.612 17.4397H54.5844L53.1875 12.0889H54.2019L55.1097 16.1718H55.1845L56.2264 12.0889H57.1859L58.2278 16.1718H58.3069L59.2103 12.0889H60.2104L58.819 17.4397Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M61.3828 12.089H62.3456V12.939H62.4203C62.5471 12.6337 62.7609 12.3778 63.032 12.2069C63.3031 12.0361 63.6179 11.9587 63.9326 11.9857C64.1792 11.9662 64.4268 12.0054 64.6571 12.1006C64.8873 12.1958 65.0943 12.3444 65.2628 12.5356C65.4313 12.7267 65.5568 12.9554 65.6302 13.2047C65.7036 13.454 65.7229 13.7176 65.6867 13.9759V17.4398H64.6866V14.2411C64.6866 13.3812 64.3327 12.9536 63.593 12.9536C63.4256 12.9453 63.2585 12.9754 63.1031 13.0417C62.9477 13.1081 62.8078 13.2091 62.6928 13.3379C62.5779 13.4667 62.4907 13.6202 62.4372 13.7879C62.3837 13.9556 62.3652 14.1336 62.3829 14.3095V17.4398H61.3828L61.3828 12.089Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M67.2832 10H68.2833V17.4396H67.2832V10Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M69.6734 14.7618C69.6416 14.4101 69.6797 14.0553 69.7853 13.7201C69.8909 13.3849 70.0618 13.0767 70.2868 12.8153C70.5119 12.5539 70.7862 12.345 71.0921 12.2021C71.3981 12.0592 71.729 11.9854 72.0636 11.9854C72.3981 11.9854 72.729 12.0592 73.035 12.2021C73.341 12.345 73.6153 12.5539 73.8403 12.8153C74.0653 13.0767 74.2362 13.3849 74.3418 13.7201C74.4474 14.0553 74.4856 14.4101 74.4537 14.7618C74.4861 15.1138 74.4485 15.469 74.3431 15.8048C74.2377 16.1405 74.067 16.4492 73.8419 16.7111C73.6168 16.973 73.3423 17.1823 73.036 17.3256C72.7298 17.4688 72.3985 17.5428 72.0636 17.5428C71.7286 17.5428 71.3973 17.4688 71.0911 17.3256C70.7848 17.1823 70.5103 16.973 70.2852 16.7111C70.0601 16.4492 69.8894 16.1405 69.784 15.8048C69.6786 15.469 69.641 15.1138 69.6734 14.7618ZM73.4244 14.7618C73.4244 13.6019 72.931 12.9236 72.0649 12.9236C71.1956 12.9236 70.7065 13.6019 70.7065 14.7618C70.7065 15.9309 71.1956 16.604 72.0649 16.604C72.931 16.6039 73.4245 15.9263 73.4245 14.7618H73.4244Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M75.5059 15.9262C75.5059 14.963 76.1851 14.4078 77.3907 14.3289L78.7635 14.2453V13.7835C78.7635 13.2183 78.4096 12.8992 77.7259 12.8992C77.1676 12.8992 76.7808 13.1156 76.6698 13.4939H75.7015C75.8037 12.5749 76.6225 11.9854 77.7721 11.9854C79.0426 11.9854 79.7592 12.6532 79.7592 13.7835V17.4394H78.7964V16.6875H78.7173C78.5567 16.9572 78.3311 17.1771 78.0637 17.3247C77.7963 17.4723 77.4965 17.5423 77.1951 17.5276C76.9824 17.5509 76.7673 17.527 76.5639 17.4572C76.3605 17.3875 76.1731 17.2735 76.014 17.1226C75.8548 16.9717 75.7274 16.7873 75.6399 16.5813C75.5523 16.3752 75.5067 16.152 75.5059 15.9262ZM78.7635 15.469V15.0216L77.5259 15.1052C76.828 15.1545 76.5115 15.4052 76.5115 15.8769C76.5115 16.3585 76.9071 16.6387 77.4512 16.6387C77.6106 16.6557 77.7717 16.6387 77.9247 16.5887C78.0778 16.5387 78.2198 16.4567 78.3422 16.3476C78.4646 16.2384 78.565 16.1044 78.6374 15.9535C78.7097 15.8025 78.7526 15.6378 78.7635 15.469Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M81.0723 14.7619C81.0723 13.0711 81.8955 12 83.1759 12C83.4926 11.9846 83.8069 12.0647 84.0821 12.231C84.3573 12.3972 84.582 12.6427 84.7299 12.9388H84.8047V10H85.8048V17.4396H84.8464V16.5942H84.7673C84.6079 16.8883 84.3754 17.1307 84.0949 17.2953C83.8144 17.4599 83.4965 17.5403 83.1759 17.5278C81.8867 17.5278 81.0723 16.4567 81.0723 14.7619ZM82.1054 14.7619C82.1054 15.8968 82.6121 16.5797 83.4595 16.5797C84.3024 16.5797 84.8234 15.887 84.8234 14.7665C84.8234 13.6513 84.2969 12.9487 83.4595 12.9487C82.6175 12.9487 82.1054 13.6363 82.1054 14.7619H82.1054Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M89.9429 14.7617C89.9111 14.41 89.9492 14.0552 90.0548 13.72C90.1604 13.3849 90.3312 13.0767 90.5562 12.8153C90.7812 12.5539 91.0555 12.345 91.3615 12.2021C91.6674 12.0592 91.9983 11.9854 92.3328 11.9854C92.6674 11.9854 92.9983 12.0592 93.3042 12.2021C93.6102 12.345 93.8844 12.5539 94.1094 12.8153C94.3345 13.0767 94.5053 13.3849 94.6109 13.72C94.7165 14.0552 94.7546 14.41 94.7227 14.7617C94.7552 15.1137 94.7175 15.4689 94.6122 15.8047C94.5069 16.1404 94.3362 16.4491 94.1111 16.711C93.886 16.9729 93.6115 17.1822 93.3053 17.3255C92.999 17.4687 92.6678 17.5427 92.3328 17.5427C91.9979 17.5427 91.6666 17.4687 91.3604 17.3255C91.0541 17.1822 90.7796 16.9729 90.5546 16.711C90.3295 16.4491 90.1588 16.1404 90.0535 15.8047C89.9481 15.4689 89.9105 15.1137 89.9429 14.7617ZM93.694 14.7617C93.694 13.6018 93.2005 12.9235 92.3345 12.9235C91.4651 12.9235 90.9761 13.6018 90.9761 14.7617C90.9761 15.9308 91.4652 16.6039 92.3345 16.6039C93.2005 16.6039 93.694 15.9262 93.694 14.7617Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M96.0645 12.089H97.0272V12.939H97.102C97.2288 12.6337 97.4426 12.3778 97.7137 12.2069C97.9848 12.0361 98.2996 11.9587 98.6143 11.9857C98.8608 11.9662 99.1084 12.0054 99.3387 12.1006C99.569 12.1958 99.776 12.3444 99.9444 12.5356C100.113 12.7267 100.238 12.9554 100.312 13.2047C100.385 13.454 100.405 13.7176 100.368 13.9759V17.4398H99.3682V14.2411C99.3682 13.3812 99.0143 12.9536 98.2747 12.9536C98.1072 12.9453 97.9401 12.9754 97.7847 13.0417C97.6294 13.1081 97.4894 13.2091 97.3745 13.3379C97.2595 13.4667 97.1723 13.6202 97.1189 13.7879C97.0654 13.9556 97.0469 14.1336 97.0646 14.3095V17.4398H96.0645V12.089Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M106.021 10.7568V12.1134H107.119V13.0029H106.021V15.7543C106.021 16.3148 106.239 16.5602 106.737 16.5602C106.865 16.5598 106.992 16.5516 107.119 16.5358V17.4154C106.939 17.4494 106.757 17.4674 106.575 17.4694C105.462 17.4694 105.019 17.0563 105.019 16.0247V13.0028H104.215V12.1133H105.019V10.7568H106.021Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M108.486 10H109.478V12.9487H109.557C109.69 12.6405 109.909 12.3832 110.186 12.2116C110.462 12.0401 110.782 11.9628 111.102 11.9902C111.347 11.9761 111.593 12.0193 111.82 12.1168C112.048 12.2143 112.252 12.3636 112.419 12.5542C112.586 12.7447 112.711 12.9717 112.785 13.219C112.859 13.4664 112.88 13.7279 112.847 13.985V17.4396H111.846V14.2455C111.846 13.3908 111.469 12.958 110.763 12.958C110.591 12.9431 110.418 12.968 110.256 13.0311C110.094 13.0941 109.947 13.1937 109.826 13.3229C109.704 13.4521 109.611 13.6078 109.552 13.7791C109.494 13.9504 109.471 14.1331 109.487 14.3145V17.4396H108.486L108.486 10Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M118.68 15.9948C118.544 16.4838 118.249 16.9068 117.848 17.1898C117.446 17.4728 116.964 17.5977 116.484 17.5428C116.15 17.5521 115.818 17.4846 115.511 17.3449C115.205 17.2053 114.93 16.9968 114.708 16.734C114.485 16.4713 114.319 16.1604 114.221 15.8232C114.124 15.4859 114.097 15.1303 114.143 14.7809C114.098 14.4305 114.126 14.0741 114.223 13.7359C114.32 13.3976 114.485 13.0853 114.707 12.8203C114.928 12.5552 115.201 12.3435 115.507 12.1994C115.813 12.0554 116.144 11.9824 116.479 11.9854C117.889 11.9854 118.74 13.0026 118.74 14.6829V15.0513H115.162V15.1105C115.146 15.3069 115.169 15.5045 115.23 15.6908C115.291 15.8771 115.388 16.0478 115.515 16.1922C115.642 16.3365 115.797 16.4512 115.968 16.5289C116.14 16.6066 116.325 16.6456 116.511 16.6434C116.75 16.6737 116.993 16.6283 117.207 16.5127C117.422 16.3972 117.599 16.2169 117.717 15.9947L118.68 15.9948ZM115.161 14.2703H117.721C117.734 14.0908 117.711 13.9104 117.653 13.7408C117.596 13.5712 117.506 13.4162 117.388 13.2856C117.271 13.1551 117.129 13.0519 116.971 12.9828C116.814 12.9137 116.644 12.8801 116.474 12.8842C116.301 12.8819 116.129 12.9162 115.969 12.9851C115.809 13.0539 115.663 13.1559 115.541 13.2851C115.419 13.4143 115.322 13.568 115.257 13.7372C115.192 13.9064 115.159 14.0877 115.162 14.2703H115.161Z"
                                                            fill="white"
                                                            ></path>
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://bit.ly/3trJ3m3" target="_blank" rel="noopener noreferrer">
                                                        <svg
                                                            width="144"
                                                            height="48"
                                                            viewBox="0 0 144 48"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-hidden="true"
                                                        >
                                                            <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="143"
                                                            height="47"
                                                            rx="7.5"
                                                            fill="black"
                                                            stroke="#949AA4"
                                                            ></rect>
                                                            <path
                                                            d="M50.7441 13.4095C50.7441 14.2361 50.5374 14.9593 50.0208 15.4759C49.4009 16.0958 48.6777 16.4058 47.7478 16.4058C46.8179 16.4058 46.0947 16.0958 45.4748 15.4759C44.8549 14.856 44.5449 14.1328 44.5449 13.2029C44.5449 12.273 44.8549 11.5498 45.4748 10.9299C46.0947 10.31 46.8179 10 47.7478 10C48.1611 10 48.5744 10.1033 48.9877 10.31C49.4009 10.5166 49.7109 10.7232 49.9175 11.0332L49.4009 11.5498C48.9877 11.0332 48.4711 10.8266 47.7478 10.8266C47.1279 10.8266 46.508 11.0332 46.0947 11.5498C45.5781 11.9631 45.3715 12.583 45.3715 13.3062C45.3715 14.0295 45.5781 14.6494 46.0947 15.0626C46.6113 15.4759 47.1279 15.7859 47.7478 15.7859C48.4711 15.7859 48.9877 15.5792 49.5042 15.0626C49.8142 14.7527 50.0208 14.3394 50.0208 13.8228H47.7478V13.0996H50.7441C50.7441 13.0996 50.7441 13.3062 50.7441 13.4095Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M55.497 10.8268H52.7074V12.7898H55.2904V13.5131H52.7074V15.4761H55.497V16.3027H51.8809V10.1035H55.497V10.8268Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M58.9072 16.3027H58.0806V10.8268H56.3242V10.1035H60.6636V10.8268H58.9072V16.3027Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M63.6602 16.3027V10.1035H64.4867V16.3027H63.6602Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M67.999 16.3027H67.1725V10.8268H65.416V10.1035H69.6521V10.8268H67.8957V16.3027H67.999Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M77.8138 15.4759C77.1939 16.0958 76.4707 16.4058 75.5408 16.4058C74.6109 16.4058 73.8877 16.0958 73.2678 15.4759C72.6478 14.856 72.3379 14.1328 72.3379 13.2029C72.3379 12.273 72.6478 11.5498 73.2678 10.9299C73.8877 10.31 74.6109 10 75.5408 10C76.4707 10 77.1939 10.31 77.8138 10.9299C78.4337 11.5498 78.7437 12.273 78.7437 13.2029C78.7437 14.1328 78.4337 14.856 77.8138 15.4759ZM73.8877 14.9593C74.301 15.3726 74.9209 15.6826 75.5408 15.6826C76.1607 15.6826 76.7806 15.4759 77.1939 14.9593C77.6072 14.5461 77.9171 13.9261 77.9171 13.2029C77.9171 12.4797 77.7105 11.8597 77.1939 11.4465C76.7806 11.0332 76.1607 10.7232 75.5408 10.7232C74.9209 10.7232 74.301 10.9299 73.8877 11.4465C73.4744 11.8597 73.1644 12.4797 73.1644 13.2029C73.1644 13.9261 73.3711 14.5461 73.8877 14.9593Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M79.8789 16.3027V10.1035H80.8088L83.805 14.9595V13.7197V10.1035H84.6316V16.3027H83.805L80.6021 11.24V12.4799V16.3027H79.8789Z"
                                                            fill="white"
                                                            stroke="white"
                                                            stroke-width="0.281869"
                                                            stroke-miterlimit="10"
                                                            ></path>
                                                            <path
                                                            d="M72.1286 25.3951C69.649 25.3951 67.6859 27.2548 67.6859 29.8378C67.6859 32.3175 69.649 34.2805 72.1286 34.2805C74.6083 34.2805 76.5714 32.4208 76.5714 29.8378C76.5714 27.1515 74.6083 25.3951 72.1286 25.3951ZM72.1286 32.4208C70.7855 32.4208 69.649 31.2843 69.649 29.7345C69.649 28.1847 70.7855 27.0482 72.1286 27.0482C73.4718 27.0482 74.6083 28.0814 74.6083 29.7345C74.6083 31.2843 73.4718 32.4208 72.1286 32.4208ZM62.52 25.3951C60.0403 25.3951 58.0772 27.2548 58.0772 29.8378C58.0772 32.3175 60.0403 34.2805 62.52 34.2805C64.9996 34.2805 66.9627 32.4208 66.9627 29.8378C66.9627 27.1515 64.9996 25.3951 62.52 25.3951ZM62.52 32.4208C61.1768 32.4208 60.0403 31.2843 60.0403 29.7345C60.0403 28.1847 61.1768 27.0482 62.52 27.0482C63.8631 27.0482 64.9996 28.0814 64.9996 29.7345C64.9996 31.2843 63.8631 32.4208 62.52 32.4208ZM51.0515 26.7382V28.598H55.4942C55.3909 29.6312 54.9776 30.4577 54.461 30.9743C53.8411 31.5942 52.8079 32.3175 51.0515 32.3175C48.2619 32.3175 46.1955 30.1478 46.1955 27.3581C46.1955 24.5685 48.3652 22.3988 51.0515 22.3988C52.498 22.3988 53.6345 23.0187 54.461 23.742L55.8042 22.3988C54.6677 21.3656 53.2212 20.5391 51.1548 20.5391C47.4353 20.5391 44.2324 23.6386 44.2324 27.3581C44.2324 31.0776 47.4353 34.1772 51.1548 34.1772C53.2212 34.1772 54.6677 33.5573 55.9075 32.2142C57.1473 30.9743 57.5606 29.2179 57.5606 27.8747C57.5606 27.4615 57.5606 27.0482 57.4573 26.7382H51.0515ZM97.9585 28.1847C97.5452 27.1515 96.512 25.3951 94.239 25.3951C91.966 25.3951 90.1062 27.1515 90.1062 29.8378C90.1062 32.3175 91.966 34.2805 94.4456 34.2805C96.4087 34.2805 97.6485 33.0407 98.0618 32.3175L96.6153 31.2843C96.0987 32.0075 95.4788 32.5241 94.4456 32.5241C93.4124 32.5241 92.7925 32.1108 92.2759 31.181L98.1651 28.7013L97.9585 28.1847ZM91.966 29.6312C91.966 27.9781 93.3091 27.0482 94.239 27.0482C94.9622 27.0482 95.6855 27.4615 95.8921 27.9781L91.966 29.6312ZM87.11 33.8673H89.073V20.9523H87.11V33.8673ZM84.0104 26.3249C83.4938 25.8084 82.6672 25.2918 81.634 25.2918C79.4643 25.2918 77.3979 27.2548 77.3979 29.7345C77.3979 32.2142 79.361 34.0739 81.634 34.0739C82.6672 34.0739 83.4938 33.5573 83.9071 33.0407H84.0104V33.6606C84.0104 35.3137 83.0805 36.2436 81.634 36.2436C80.4975 36.2436 79.671 35.4171 79.4643 34.6938L77.8112 35.4171C78.3278 36.5536 79.5676 38 81.7373 38C84.0104 38 85.8701 36.6569 85.8701 33.454V25.6017H84.0104V26.3249ZM81.7373 32.4208C80.3942 32.4208 79.2577 31.2843 79.2577 29.7345C79.2577 28.1847 80.3942 27.0482 81.7373 27.0482C83.0805 27.0482 84.1137 28.1847 84.1137 29.7345C84.1137 31.2843 83.0805 32.4208 81.7373 32.4208ZM106.947 20.9523H102.298V33.8673H104.261V29.0112H106.947C109.117 29.0112 111.183 27.4615 111.183 24.9818C111.183 22.5021 109.117 20.9523 106.947 20.9523ZM107.051 27.1515H104.261V22.7088H107.051C108.497 22.7088 109.324 23.9486 109.324 24.8785C109.22 26.015 108.394 27.1515 107.051 27.1515ZM118.932 25.2918C117.486 25.2918 116.039 25.9117 115.523 27.2548L117.279 27.9781C117.692 27.2548 118.312 27.0482 119.036 27.0482C120.069 27.0482 120.999 27.6681 121.102 28.7013V28.8046C120.792 28.598 119.965 28.288 119.139 28.288C117.279 28.288 115.419 29.3212 115.419 31.181C115.419 32.9374 116.969 34.0739 118.622 34.0739C119.965 34.0739 120.585 33.454 121.102 32.8341H121.205V33.8673H123.065V28.9079C122.858 26.6349 121.102 25.2918 118.932 25.2918ZM118.726 32.4208C118.106 32.4208 117.176 32.1108 117.176 31.2843C117.176 30.2511 118.312 29.9411 119.242 29.9411C120.069 29.9411 120.482 30.1478 120.999 30.3544C120.792 31.5942 119.759 32.4208 118.726 32.4208ZM129.574 25.6017L127.405 31.181H127.301L125.028 25.6017H122.962L126.371 33.454L124.408 37.7934H126.371L131.641 25.6017H129.574ZM112.217 33.8673H114.18V20.9523H112.217V33.8673Z"
                                                            fill="white"
                                                            ></path>
                                                            <path
                                                            d="M12.5166 10.6191C12.2066 10.9291 12 11.4457 12 12.0656V34.8992C12 35.5191 12.2066 36.0357 12.5166 36.3457L12.6199 36.449L25.4315 23.6374V23.5341V23.4307L12.5166 10.6191Z"
                                                            fill="url(#paint0_linear)"
                                                            ></path>
                                                            <path
                                                            d="M29.6677 27.9775L25.4316 23.7414V23.5347V23.4314L29.6677 19.1953L29.771 19.2986L34.8337 22.1916C36.2802 23.0181 36.2802 24.3613 34.8337 25.1878L29.6677 27.9775Z"
                                                            fill="url(#paint1_linear)"
                                                            ></path>
                                                            <path
                                                            d="M29.77 27.8746L25.4305 23.5352L12.5156 36.4501C13.0322 36.9667 13.7555 36.9667 14.6853 36.5534L29.77 27.8746Z"
                                                            fill="url(#paint2_linear)"
                                                            ></path>
                                                            <path
                                                            d="M29.77 19.1954L14.6853 10.6199C13.7555 10.1033 13.0322 10.2066 12.5156 10.7232L25.4305 23.5348L29.77 19.1954Z"
                                                            fill="url(#paint3_linear)"
                                                            ></path>
                                                            <path
                                                            opacity="0.2"
                                                            d="M29.6686 27.7705L14.6873 36.2427C13.8607 36.7593 13.1375 36.656 12.6209 36.2427L12.5176 36.346L12.6209 36.4493C13.1375 36.8626 13.8607 36.9659 14.6873 36.4493L29.6686 27.7705Z"
                                                            fill="black"
                                                            ></path>
                                                            <path
                                                            opacity="0.12"
                                                            d="M12.5168 36.2433C12.2068 35.9334 12.1035 35.4168 12.1035 34.7969V34.9002C12.1035 35.5201 12.3102 36.0367 12.6201 36.3467V36.2433H12.5168Z"
                                                            fill="black"
                                                            ></path>
                                                            <path
                                                            opacity="0.12"
                                                            d="M34.832 24.8783L29.666 27.7712L29.7693 27.8746L34.832 24.9816C35.5552 24.5683 35.8652 24.0518 35.8652 23.5352C35.8652 24.0518 35.4519 24.465 34.832 24.8783Z"
                                                            fill="black"
                                                            ></path>
                                                            <path
                                                            opacity="0.25"
                                                            d="M14.6865 10.7231L34.8338 22.1916C35.4537 22.6048 35.867 23.0181 35.867 23.5347C35.867 23.0181 35.557 22.5015 34.8338 22.0882L14.6865 10.6198C13.24 9.79324 12.1035 10.5165 12.1035 12.1696V12.2729C12.1035 10.6198 13.24 9.89656 14.6865 10.7231Z"
                                                            fill="white"
                                                            ></path>
                                                            <defs>
                                                            <linearGradient
                                                                id="paint0_linear"
                                                                x1="24.2947"
                                                                y1="11.869"
                                                                x2="6.95523"
                                                                y2="29.2085"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop stop-color="#00A0FF"></stop>
                                                                <stop
                                                                offset="0.00657445"
                                                                stop-color="#00A1FF"
                                                                ></stop>
                                                                <stop offset="0.2601" stop-color="#00BEFF"></stop>
                                                                <stop offset="0.5122" stop-color="#00D2FF"></stop>
                                                                <stop offset="0.7604" stop-color="#00DFFF"></stop>
                                                                <stop offset="1" stop-color="#00E3FF"></stop>
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint1_linear"
                                                                x1="36.729"
                                                                y1="23.5362"
                                                                x2="11.7289"
                                                                y2="23.5362"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop stop-color="#FFE000"></stop>
                                                                <stop offset="0.4087" stop-color="#FFBD00"></stop>
                                                                <stop offset="0.7754" stop-color="#FFA500"></stop>
                                                                <stop offset="1" stop-color="#FF9C00"></stop>
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint2_linear"
                                                                x1="27.4215"
                                                                y1="25.9075"
                                                                x2="3.90779"
                                                                y2="49.4212"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop stop-color="#FF3A44"></stop>
                                                                <stop offset="1" stop-color="#C31162"></stop>
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint3_linear"
                                                                x1="9.30994"
                                                                y1="3.05301"
                                                                x2="19.8099"
                                                                y2="13.5528"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop stop-color="#32A071"></stop>
                                                                <stop offset="0.0685" stop-color="#2DA771"></stop>
                                                                <stop offset="0.4762" stop-color="#15CF74"></stop>
                                                                <stop offset="0.8009" stop-color="#06E775"></stop>
                                                                <stop offset="1" stop-color="#00F076"></stop>
                                                            </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid style={{
                backgroundColor: 'rgb(22, 21, 23)',
                color: 'rgb(255, 255, 255)'
            }}>
                <Container>
                    <Row>
                        <Col className={styles.ugBottomFooter}>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className={styles.ugCopyRight}>
                                            <p>copyright © 2021-22 Empagnie PTE Limited.</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                        <Col className={styles.ugCopyRight}>
                                            <Row>
                                                <Col className={styles.ugCopyRightR}>
                                                    <a href="/privacy">privacy policy</a>
                                                    <a href="/terms" style={{
                                                        border: 'none'
                                                    }}>terms and conditions</a>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
		</Fragment>
	)
}

export default index
