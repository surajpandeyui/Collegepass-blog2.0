import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import styles from '../Review/review.module.scss';

function useOutsideAlerter(ref, setTestimonialID) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTestimonialID(null)

            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

const Review = () => {

    const [testimonialID, setTestimonialID] = useState(null)
    const [swiper, setSwiper] = useState(null)
    const [activeIndexSJS, setActiveIndexSJS] = useState(0)
    const wrapperRef = useRef(null)

    let slideData = [
        {
            review:"It’s been a great journey with CollegePass for my older daughter who is now at UC Berkeley… there were unknowns , so many unexpected(s) which we do /did not anticipate or do /did not have the bandwidth or knowledge/experience to handle or work around … As much as the child was doing and giving her best was on the top of things there is always some space that needs support beyond school acads achievements and parenting.. , CollegePass was a more than personified entity that held hands and walked us through, with support in every possible way for the child and parents.. CollegePass does more than guide , they also show students & make them believe that they can do much more.It doesn’t stop there ,… they see the student through and make it happen ! Thank you CollegePass .. look forward to continuing this journey with my younger one… thank you always ..",
            // stars:"star",
            name: "Sheeja C",
            college: ""
        },
        {
            review:"I'd like to thank the CollegePass team, particularly Ms. Bushnin and Ms. Shaurya, for assisting my son Arnav Jha in constructing his profile. Their advice and encouragement were quite beneficial. My son will apply to many elite universities for the fall 2023 session. Collegepass assists with the essay writing process and also gives thorough information on how to prepare for internships, research, and international contests. Unless they recommend it, these insights are not available to parents. Thank you once more for your prompt assistance and direction. Regards, Aparna Jha",
            // stars:"star",
            name: "Aparna Jha",
            college: ""
        },
        {
            review:"CollegePass had a markable impact on every aspect of my application, from my SATs to my essays and extra-curriculars. Above all what I loved most about my experience with CollegePass was that instead of pressuring me into creating this Unrepresentative picture of myself on my application (which I believe is a common fear) they helped me find ways to push myself in the fields I was passionate about, and by the end of the process I was able to look at my application and was able to proudly say it was the best representation of who I was, my passions, achievements, character and ambitions.",
            // stars:"star",
            name: "Kabir Hinduja",
            college: ""
        },
        {
            review:"My experience with the college pass team has been a very positive one as I felt their constant support and guidance from day one and I believe this has helped me get into my dream college.",
            // stars:"star",
            name: "Ayan",
            college: ""
        },
        {
            review:"Choosing CollegePass as my counselor for getting me through the college application process was one of the best decisions I’ve made. Balancing school work and going through the rigorous application process,  would’ve been extremely difficult without guidance. The weekly meetings with Aakash And Jahnavi, where we were working on a schedule with timelines helped me stay focused on smaller defined goals to be accomplished without getting overwhelmed with the whole process. The tools that were provided to me to shortlist colleges and classify them as reach and safety helped me to prioritize and narrow down a list of universities that would be the best fit for me. I am so thankful to Aakash and Jahnavi for all their support in guiding me to get admissions into my top choice of college, University Of Wisconsin, Madison as a direct admit into the business school. It was very comforting to know that help was a phone call away.",
            // stars:"star",
            name: "Nivedha Chandramouli",
            college: ""
        },
        {
            review:"The process of applying to college was confusing to me. Sadly, my school counselors were of no help to me, and my parents meant well but weren't experts. This left me feeling overwhelmed and worried that I wouldn't stand out. The entire process of getting started was complicated for me, but CollegePass guided me step by step. My counselors made the process so much easier and helped me submit an application that I would not have been able to do on my own. They assisted me in choosing schools that would maximize my chances of acceptance. My timelines were also planned out by them and they stayed on top of me to get things done. We worked through several drafts of my Common App personal statement until it felt like it represented me. Each application I submitted presented me in the best possible light. CollegePass opened the doors to so many opportunities for me. They are the most qualified tutors and mentors, and CollegePass had the information I needed. It was amazing how they became so involved; they give you such peace of mind.",
            // stars:"star",
            name: "Kushal Jayakumar",
            college: ""
        },
        {
            review:"Collegepass efficaciously aids in a high-school student's admission experience by shedding a ray of insight into university selection and offering unwavering support for all its academic components.",
            // stars:"star",
            name: "Dhruwan S Shah",
            college: ""
        },
        {
            review:"COLLEGEPASS turned out to be a major game changer in my US admissions process- it was basically a huge help in covering everything right from my extracurriculars to my essay. I started out as attending their SAT lectures, further attending their one-on-one lectures as to improve the score. The staff were extremely helpful and provided necessary insights at every milestone of the journey. CollegePass certainly helped me in everything, right from providing me the mandatory essay reminders(which I used to procrastinate a lot) to deadlines and important dates to remember. I was contacted a lot by various US admission counsellors, but CollegePass, by instinct, was different. I had not expected high levels of reminders and completions- along with a little bit of motivation to complete everything. Thus, this institution really helped me overcome any hurdle presented in my way and score good colleges with enough scholarships based on merit. Thank you.",
            // stars:"star",
            name: "Rutwik Nanal",
            college: ""
        },

    ]
    useOutsideAlerter(wrapperRef, setTestimonialID)
    swiper !== undefined &&
		swiper !== null &&
		swiper.on('transitionEnd', function () {
			setActiveIndexSJS(swiper.realIndex)
		})
	useEffect(() => {
		swiper !== undefined &&
			swiper !== null &&
			swiper.autoplay !== undefined &&
			swiper.autoplay !== null &&
			swiper.autoplay.start()
	}, [swiper])
    return (
        <Fragment>
            <Container fluid style={{
                backgroundColor: '#000000',
                paddingBottom: '120px'
            }}>
                <Container id="testimonialLink">
                    <Row id="review-section">
                        <Col className={styles.review}>
                            <Row>
                                <Col className='text-center'>
                                     {/*<h2 className='text-center pt-5 pb-4'>Read Our Student And Parent Reviews</h2>
                                    <Image 
                                    src="/Google_review-header-menu.png"
                                    width="340"
                                    height="40"
                                    className={styles.reviewGoogleImg}
                                    />
                                  <p className='text-center' style={{
                                        opacity: '0.8',
                                        color: '#ead637',
                                        fontSize: '17px',
                                        letterSpacing: '0.04rem',
                                        fontWeight: '600',
                                    }}>CollegePass averages 4.9 out of 5 stars</p>*/}
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.testimonialForDesktop}>
                                    <Swiper
                                        nSwiper={setSwiper}
                                        slidesPerView={3}
                                        //loopAdditionalSlides={30}
                                        loop={true}
                                        //centeredSlides={true}
                                        //autoHeight={true}
                                        lazy
                                        autoplay={{
                                            delay: 6000,
                                            disableOnInteraction: true,
                                        }}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={10}
                                    >

                                        {slideData.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Row>
                                                        <Col className={styles.reviewTextSection}>
                                                            <p>{item.review && item.review.length < 70 ? item.review : item.review.slice(0,200)+""}<a href='/success-stories' style={{
                                                                color: '#ead637',
                                                                paddingLeft: '5px'
                                                            }}>Read more</a></p>
                                                            <Image 
                                                            src="/5-stars.svg"
                                                            width="100"
                                                            height="100"
                                                            style={{
                                                                marginTop: '-30px'
                                                            }} />
                                                            {/*<p>{item.stars}</p>*/}
                                                            <h6>{item.name}</h6>
                                                            <h4>{item.college}</h4>
                                                        </Col>
                                                    </Row>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </Col>
                                <Col className={styles.testimonialForMobile}>
                                    <Swiper
                                         nSwiper={setSwiper}
                                         slidesPerView={1}
                                         //loopAdditionalSlides={30}
                                         loop={true}
                                         //centeredSlides={true}
                                         //autoHeight={true}
                                         lazy
                                         autoplay={{
                                             delay: 6000,
                                             disableOnInteraction: true,
                                         }}
                                         loopFillGroupWithBlank={true}
                                         pagination={{
                                             clickable: true,
                                         }}
                                         navigation={true}
                                         modules={[Navigation, Pagination, Scrollbar, A11y]}
                                         spaceBetween={50}
                                    >
                                        {slideData.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Row>
                                                        <Col className={styles.reviewTextSection}>
                                                            <p>{item.review && item.review.length < 70 ? item.review : item.review.slice(0,200)+""}<a href='/success-stories' style={{
                                                                color: '#ead637',
                                                                paddingLeft: '5px'
                                                            }}>Read more</a></p>
                                                            <Image 
                                                            src="/5-stars.svg"
                                                            width="100"
                                                            height="100"
                                                            style={{
                                                                marginTop: '-30px'
                                                            }} />
                                                            {/*<p>{item.stars}</p>*/}
                                                            <h6>{item.name}</h6>
                                                            <h4>{item.college}</h4>
                                                        </Col>
                                                    </Row>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fragment>
    )
}

export default Review
