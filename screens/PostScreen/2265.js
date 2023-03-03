import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'

const index = () => {
  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
          {/* <Row>
            <Col style={{
                paddingBottom: '5%',
                paddingTop: '5%',
                paddingLeft: '10%',
                paddingRight: '35%',
                textAlign: 'justify',
                }}>
              <Row>
                <Col>
                    <h1 style={{
                        marginTop: '0',
                        marginBottom: '20px',
                        wordWrap: 'break-word',
                        fontSize: '41px',
                        lineHeight: '50px',
                        fontWeight: '600',
                    }}>Choosing The Right University – Study Abroad Counseling</h1>
                </Col>
              </Row>
              <Row>
                <Col style={{
                    marginBottom: '20px',
                }}>
                    <Image
                        src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                        alt="Small Blog"
                        width={750}
                        height={556}
                    />
                </Col>
              </Row>
              <Row>
                <Col>
                <p>College life is an experience whose memories last a lifetime, especially because college is perhaps the only time between youth and adult life. You can live a pseudo suspended life, with as much time for play, as for extracurricular activities. As one steps into the professional sphere, an adult rues the lack of work-life balance, making college life even more memorable.</p>
                <p>Everyone has some memories of school: were you the wallflower, the cheerleader, the class brute, or at the receiving end of sniggers from the backbench, all because you did not do your homework? At school, we develop personalities, in relation to others, likes and dislikes, where there’s a lesser chance of actually having a voice in choosing the institution. As pre-adults, the luxury of choice means you have the freedom to choose the environment that will best encourage your growth as a student, individual, and, eventually, professional.</p>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Button style={{
                            background: '#000000',
                            padding: '9px 12px',
                            borderRadius: '50px',
                            border: '1px solid #000000',
                            marginTop: '20px'
                        }}>Book Your Free Strategy Session</Button>
                    </Col>
                </Row>
            </Col>
          </Row> */}

          <p>
            The University of California is ranked among the world’s best for
            its innovation, pioneering research, and discovery. It has ten
            campuses, with nine offering both undergraduate and graduate
            education. These nine main campuses are
          </p>

          <ul style={{ color: '#e7e7e7' }}>
            <li>UC Berkeley,</li>
            <li>UC Los Angeles,</li>
            <li>UC Davis,</li>
            <li>UC San Diego,</li>
            <li>UC Santa Barbara,</li>
            <li>UC Irvine,</li>
            <li>UC Merced,</li>
            <li>UC Santa Cruz,</li>
            <li>UC Riverside.</li>
          </ul>

          <p>UC San Francisco is a professional and a graduate school only.</p>

          <p>
            The University of California opened its doors in 1869 with just 10
            faculty members and 40 students. Today, the UC system has more than
            280,000 students and 227,000 faculty and staff, with 2.0 million
            alumni living and working around the world. *
          </p>

          <p>
            According to the data, the university of California admitted fewer
            out-of-state and international students for fall 2022. These trends
            varied across the nine campuses. The Berkeley and Los Angeles
            campuses accepted more Californians compared to 2021.
            Out-of-the-state applicants admitted across the system were 22,798,
            a 19% drop from last year. The international freshman applicants
            admitted were 17,531, which is 12% less than in 2021.
          </p>

          <h4>UNIVERSITY OF CALIFORNIA: APPLICATION PROCESS</h4>

          <p>
            <strong>EDUCATION SYSTEM REQUIREMENTS FOR INDIAN STUDENTS</strong> –
            Applicants must finish the 10th and 12th CBSE examination or state
            board, with average marks being above 70 and not below 60. Under the
            test scores tab, report your marks and subjects on the International
            Exam page of the application.
          </p>

          <p>
            <strong>ACT/SAT REQUIREMENTS</strong> – The University of California
            does not consider ACT or SAT scores when making admissions
            decisions. If you want to submit test scores, they can be used as an
            alternative procedure for attaining minimum requirements for course
            placement or eligibility after you enroll.
          </p>

          <p>
            <strong>ENGLISH PROFICIENCY REQUIREMENTS</strong> – Your TOEFL score
            on the internet-based test must be at least 87; for the paper and
            pencil test, at least 560 is required. IELTS overall band score
            should at least be 7.0. The DET test scores should be 120 or higher.
          </p>

          <p>
            <strong>LETTER OF RECOMMENDATION</strong> – The University of
            California does not require letters of recommendation for the
            application. However, some majors and campuses may require LORs as a
            supplemental application review.
          </p>

          <p>
            <strong>PERSONAL INSIGHTS </strong>– University of California
            application requires an applicant to answer 4 personal insight
            questions, with each prompt being within the 350-word limit range.
            An applicant must decide which of the four prompts they plan on
            answering out of the eight. The prompts you choose must highlight
            your skills, creativity, and experiences.
          </p>

          <p>
            <strong>FINANCIAL AID</strong> – International students are not
            eligible for student loans, and very few scholarships are available.
            Costs for attending school during the summer and living expenses are
            not a part of the cost of attendance.
          </p>

          <p>
            Join us live on <strong>September 18, Sunday at 9:30 PM</strong>,
            and learn how to successfully apply to the{' '}
            <strong>University of California</strong>. The session shall be
            hosted by <strong>Martin Walsh</strong>, Former Assistant Dean of
            Admissions, <strong>Stanford</strong>!
          </p>

          <p>* https://www.universityofcalifornia.edu/about-us</p>

          <hr style={{ backgroundColor: '#e4e4e4', color: '#e4e4e4' }} />

          <div style={{ height: '20px' }} aria-hidden="true"></div>

          <div>
            <a
              href="https://www.collegepass.org/registration/87122937844"
              style={{ color: '#ffffff' }}
              target="_blank"
              rel="noreferrer noopener"
            >
              Book Your Free Seat
            </a>
          </div>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index
