import React, { Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Row, Col, Button } from 'react-bootstrap'
import styles from './custom-landing-page.module.scss'
// import Link from 'next/link'

const CustomLanding = ({choice}) => {
    const { asPath } = useRouter()
    let sectionText = null

    const router = useRouter()
    const redirect = ()=>{
        router.push('/contact/'+choice.toString())
    }

    if (asPath === '/ivy-league-undergraduate-admissions') {
        sectionText = (
        <Col className={styles.IvyCustomSectionPer}>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.heading}>
                                    <h2>Comprehensive Admissions Advising</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <p>As a CollegePass student, your CollegePass Admissions Advisor will team with you to craft a winning application. Your advisors will guide you through the process, mentoring you across all aspects of the college application process.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <ul>
                                        <li>Your advisor will review your current grades/test scores and set targets that you can get behind.</li>
                                        <li>Your advisor will learn about your interests and review your extracurriculars and supercurriculars.</li>
                                        <li>Your advisor will learn about your preferences and create your college shortlist of reach and target universities.</li>
                                        <li>Post shortlisting, your advisor will work with you to set audacious academic and extracurricular/super curricular goals.</li>
                                        <li>Your advisors will also help you decide on art supplements, how to select recommenders, and design a waitlist strategy (if needed)</li>
                                        <li>The advisors and editors will provide comprehensive Essay Brainstorming and Editing support.</li>
                                        <li>Interview Preparation for the Ivys, Ivy Plus Schools, and Oxbridge is part of the comprehensive college admissions support available to CollegePass Students.</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className={styles.forDesktop}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col className={styles.LpIcons}>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Timeline_Management_01.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Timeline Management</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/University_Shortlisting_01.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>University Shortlisting </p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Academic_Strategy_00000.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Academic Strategy: GPA, Testing & more</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Extracurricular_Strategy.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Extracurricular Strategy: Selection & Goal Setting</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Supercurricular_Strategy.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Supercurricular Strategy: Selection & Goal Setting</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Recommeder_Selection.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Recommender Selection</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Early_Decison.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Early Decision/ REA Strategy</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Essay_Brainstorming_&_Editing.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Essay Brainstorming & Editing</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/University_Research_01.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>University Research & Alumni Connection</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Interview_Preparation.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Interview Preparation</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Art_Supplement_Strategy.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Art Supplement Strategy</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Waitlist_Strategy.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Waitlist Strategy</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.forMobile}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    } else if (asPath === '/ms-admissions') {
        sectionText = (
            <Col className={styles.IvyCustomSectionPer}>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.heading}>
                                    <h2>Comprehensive Admissions Advising</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <p>As a CollegePass student, your CollegePass Admissions Advisor will team with you to craft a winning application. Your advisors will guide you through the process, mentoring you across all aspects of the college application process.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <ul>
                                        <li>Your advisor will review your resume, grades, and work experience.</li>
                                        <li>Your advisor will learn about your interests and target universities/business schools.</li>
                                        <li>Your advisor will  your college shortlist of reach and target universities/business schools.</li>
                                        <li>Your advisors will also help you select recommenders.</li>
                                        <li>CollegePass Global Editors will provide comprehensive SOP/Essay Brainstorming and Editing support.</li>
                                        <li>Interview Preparation is part of the comprehensive college admissions support available to CollegePass Students.</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className={styles.forDesktop}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col className={styles.LpIcons}>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_University_Shortlisting.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>University/Business School Shortlisting</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_Recommender_Selection.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Recommender Selection</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_Application_Strategy.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Application Strategy & Round Selection</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_Essay_Brainstorming_and_Editing.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>SOP/Essay Brainstorming & Editing</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_University_Research_&_Alumni_Connection.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>University Research & Alumni Connection</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/ms_Interview_Preparation.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Interview Preparation</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.forMobile}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    } else if (asPath === '/sat-tutoring') {
        sectionText = (
            <Col className={styles.IvyCustomSectionPer}>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.heading}>
                                    <h2>Learn from the World’s Best SAT Tutors</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <p>As a CollegePass student, your SAT Tutor  will team with you to help you land a 1550+ score on the SAT. You will learn from the World’s Best Tutors with years of SAT tutoring experience.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <ul>
                                        <li>CollegePass SAT Students have consistently scored 1550+ across all SAT test dates for the last 3 years.</li>
                                        <li>Your Tutors/Advisors will begin by understanding your current strengths and weaknesses.</li>
                                        <li>Your Tutors will host comprehensive weekly tutoring sessions to ensure you stay ahead of the curve.</li>
                                        <li>Your Tutors will review the latest test papers to help you stay updated.</li>
                                        <li>You will take 10+ Full Length SAT Tests to ensure thorough practice followed by reviews.</li>
                                        <li>CollegePass Tutors have been chosen due to their stellar SAT Tutoring background and groundbreaking SAT results.</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className={styles.forDesktop}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col className={styles.LpIcons}>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/SAT_Diagnostic_to_identify_strengths_and_weaknesses.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>SAT Diagnostic to identify strengths and weaknesses</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Comprehensive_Weekly_Live_Classes.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Comprehensive, Weekly Live Classes</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Learn_from_the_World’s_Best_SAT_Tutors.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Learn from the World’s Best SAT Tutors</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/10_Comprehensive_SAT_Practice_Tests.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>10+ Comprehensive SAT Practice Tests</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Unlimited_Access_to_SAT_Strategy_Sessions.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Unlimited Access to SAT Strategy Sessions</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Complimentary_Access_to_CollegePass.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Complimentary Access to CollegePass+</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.forMobile}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    } else if (asPath === '/ib-tutoring') {
        sectionText = (
        <Col className={styles.IvyCustomSectionPer}>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={styles.heading}>
                                    <h2>Learn from the World’s Best IB Tutors</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <p>As a CollegePass student, your IB Tutor  will team with you to help you land a 42/42. You will learn from the World’s Best IB Tutors with years of IB tutoring experience.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles.DetailText}>
                                    <ul>
                                        <li>CollegePass IB Students have consistently scored 6/7s across all subjects in the last 1 Year.</li>
                                        <li>Your Tutors/Advisors will begin by understanding your current strengths and weaknesses</li>
                                        <li>Your Tutors will host comprehensive weekly tutoring sessions to ensure you stay ahead of the curve.</li>
                                        <li>CollegePass Tutors have been chosen due to their stellar IB Tutoring background and groundbreaking IB results.</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className={styles.forDesktop}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col className={styles.LpIcons}>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Top_Tier_IB_Tutors_from_Top_Universities.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Top Tier IB Tutors from Top Universities</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Personalised_One-on-One_Sessions.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Personalised, One-on-One Sessions</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.lpIconsRow}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Unlimited_Practice_followed_by_Review_Sessions.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Unlimited Practice followed by Review Sessions</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Row>
                                        <Col>
                                            <p className='mb-0'>
                                                <Image
                                                    src="/lp-icons/Complimentary_Access_to_CollegePass.png"
                                                    width="70"
                                                    height="70"
                                                />
                                            </p>
                                            <p>Complimentary Access to CollegePass+</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.forMobile}>
                                <Col className={styles.Btn}>
                                    <Button onClick={redirect}>
                                        Book Your Free Consultation
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    }
    
  return (
    <Fragment>
            <Container fluid style={{
                backgroundColor: '#101010'
                }}>
                <Container>
                    <Row>
                        {sectionText}
                    </Row>
                </Container>
            </Container>
    </Fragment>
  )
}

export default CustomLanding
