import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './privacyIndia.module.scss'

const PrivacyIndiaScreen = () => {
	
	let title = 'Privacy Policy | CollegePass';
	let description = 'CollegePass Privacy Policy';
	return (
		<Fragment>
			<Helmet>
				<link rel='canonical' href='https://www.collegepass.org/privacy' />
				<title>{title}</title>
				<meta name='description' content={description} />

				<meta itemprop='name' content={title} />
				<meta itemprop='description' content={description} />
				<meta itemprop='image' content='' />

				<meta property='og:url' content='https://www.collegepass.org/terms' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:image' content='' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={title} />
				<meta name='twitter:description' content={description} />
				<meta name='twitter:image' content='' />
			</Helmet>

			<Fragment>
            <Container
				fluid
				style={{
					background: '#fff',
				}}
			>
                <Container className={styles.privacyIndia}>
                    <Row className='pt-5 mt-5'>
                        <Col className="pt-3 pb-2">
                            <h2 className='text-center pb-3 black-color'>
                                PRIVACY POLICY
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pb-5">
                            <p>
                                Empagnie Education Pvt. Ltd. (hereinafter referred to as
                                “Company”, “us”, “we” or “our”) believes in connecting
                                students to colleges and different careers by leveraging AI
                                (artificial intelligence) and via a pool of knowledge provided
                                by expert contributors worldwide. All information is provided
                                to users (hereinafter referred to as “you”) who wish to gain
                                more knowledge about the Company’s offerings, through its
                                website www.collegepass.org (the “Website”). The Website is a
                                platform that facilitates online education and career guidance
                                for students through videos and may also include any written
                                material, blogs, audios, or any other mode of communication
                                used by the Company. We also believe in respecting and
                                protecting your privacy with the highest standards and keeping
                                that in mind, we have listed our privacy policy (hereinafter
                                referred to as the “Privacy Policy”) below.
                            </p>
                            <p>
                                <strong>Important Notice:</strong>
                            </p>
                            <p>
                                Kindly read this privacy policy carefully. by using the
                                website, you acknowledge that you have read, understood, and
                                agree to be bound to all terms and conditions of this privacy
                                policy. if you do not agree to such terms, exit our website
                                now and do not access or use our website any further.
                            </p>
                            <p>
                                This Privacy Policy is a legally binding electronic agreement
                                formed under the Information Technology Act, 2000 and the
                                Rules made thereunder and the amended provisions pertaining to
                                electronic documents/records in various statutes as amended by
                                the Information Technology Act, 2000.
                            </p>
                            <p>
                                <strong>Our Commitment:</strong>
                            </p>
                            <p>
                                We respect your privacy and are committed to protecting the
                                privacy of all personal information we obtain from you through
                                the Website. This Privacy Policy is created to inform you
                                about how the Website collects, uses, and shares your personal
                                information, and inform you about our general rules on the
                                management of privacy. We are available to address any
                                questions and concerns that you may have regarding this
                                Privacy Policy. Please contact us at support@collegepass.org.
                                Please note that we may modify this Privacy Policy from time
                                to time to bring about certain changes. As such, you are
                                requested to review this Privacy Policy regularly and to see
                                when it was last updated. If we make any changes to this
                                Privacy Policy, we may notify you on this webpage, via email,
                                or by means of notice through the Website. Your continued use
                                of the Website is deemed to be an acceptance of this Privacy
                                Policy and any changes thereto. You can visit the Website and
                                browse without having to provide Personal Information. During
                                your visit to the Website, you remain anonymous, and at no
                                time can we identify you unless you provide any Personal
                                Information to us (for example, to download documents) or have
                                an account on the Website and log on with your Account
                                Information.
                            </p>
                            <p>
                                <strong>Types and Uses of collected information:</strong>
                            </p>
                            <p>
                                We receive and collect information when we provide our
                                services. Sometimes, we may also disclose to third parties
                                certain personal information including, name, email, phone
                                number, and other information that we collect, including but
                                not limited to educational information, as you access and use
                                the Website, including device information, location, network
                                carrier, etc. The Website may also collect Personally
                                Identifiable Information about you i.e. the information that
                                identifies your personal identity. Personally, Identifiable
                                Information includes: (a) “Contact Data” (for example - your
                                name, address, city, state, zip code and email address), (b)
                                “Financial Data” (such as your credit card number, bank
                                information, expiration date, and verification code) (only if
                                applicable), and (iii) “Demographic Data” (for example - your
                                Zip code / PIN Code, gender, etc), or (d) “Educational Data”
                                (for example – the name of your school, degree, educational
                                qualifications, work experience, etc.). When you access the
                                Website by creating an account, we may ask you to provide
                                certain information about yourself. Please note that some of
                                the information we ask you to provide may be identified as
                                mandatory and some identified as voluntary. If you do not
                                provide the mandatory information for a particular purpose,
                                you will not be permitted to engage with the Website. Once
                                asked and received correctly, the Website may not ask you
                                again for the information above if such are already stored
                                with us. We may also use Personally Identifiable Information
                                to solve any disputes, perform administrative actions, contact
                                you, enforce our agreements with you, including our Terms of
                                Use and this Privacy Policy, comply with applicable law, and
                                cooperate with law enforcement activities.
                            </p>
                            <p>
                                The Company may also collect Non-Personally Identifiable
                                Information that means the of information may include things
                                like the Uniform Resource Locator (commonly known as URL) of
                                the web sites that you accessed before visiting our Website,
                                the URL of the website you visit after leaving our Website,
                                browser information such as what type and version of the
                                browser you are using, your Internet Protocol address
                                (commonly known as IP address), or general and/or aggregated
                                location data that does constitute Personally Identifiable
                                Information. The Website, and/or our authorized Trusted Third
                                Parties, may automatically collect this information when you
                                visit or use the Website through the use of electronic tools
                                like Cookies and web-beacons or Pixel tags, as described below
                                in this Privacy Policy.
                            </p>
                            <p>
                                <strong>Types and Uses of collected information:</strong>
                            </p>
                            <p>
                                We will keep your Personal Information only for as long as we
                                are required to by law or as is necessary for the purposes for
                                which it was collected. Your Personal Information may be used
                                for one or more of the following purposes:
                            </p>
                            <p>
                                a) to facilitate your use and personalize your experience of
                                the use of the Website.
                            </p>
                            <p>
                                b) to record, support and facilitate the services and
                                activities you select.
                            </p>
                            <p>
                                c) to respond to your inquiries or fulfill your requests for
                                information about our services.
                            </p>
                            <p>
                                d) to provide you with information about our services and to
                                send you information and materials from the Company.
                            </p>
                            <p>
                                e) to send you important information regarding the Website,
                                our Terms and Conditions, and Policies and/or other general
                                business information.
                            </p>
                            <p>
                                f) to help you address problems with the Website, including
                                addressing any technical or use-based problems.
                            </p>
                            <p>g) to improve the content of the Website. </p>
                            <p>
                                h) to help detect and prevent identity theft, fraud, and other
                                potentially illegal acts and protect the integrity of the
                                Website.
                            </p>
                            <p>
                                i) to provide information to law enforcement agencies or in
                                connection with an investigation on matters related to public
                                safety.
                            </p>
                            <p>j) to resolve disputes and troubleshoot problems.</p>
                            <p>k) in connection with any investigation or complaint.</p>
                            <p>
                                l) to provide you with relevant information or services that
                                you request from us or which we feel may interest you based on
                                previous interactions, where you have consented to be
                                contacted.
                            </p>
                            <p>
                                The Company may use Non-Personally Identifiable Information to
                                troubleshoot, administer the Website, analyze trends, gather
                                demographic information, create internal quality standards,
                                generate data analysis reports, comply with applicable law,
                                and cooperate with law enforcement activities, if applicable.
                                We may also share this information with our authorized Trusted
                                Third Parties to measure the overall effectiveness of our
                                products and services.
                            </p>
                            <p>
                                <strong>Release:</strong>
                            </p>
                            <p>
                                We will not sell or share your Personally Identifiable
                                Information with other parties except as provided below:
                            </p>
                            <p>
                                <strong>a. Remarketing:</strong> Remarketing is an effective
                                way for our Company to connect with various people, based upon
                                your past interactions with our Website. To put this into
                                effect, the Company may hire vendors such as marketing
                                companies or individuals to perform remarketing services. As a
                                result, third-party vendors, including Google™, may show the
                                Company’s products’ or services’ advertisements on the
                                Internet. Third-party vendors may use cookies to serve
                                advertisements based on a user’s prior visits to the Website.
                                Users may opt-out of Google™’s use of cookies by visiting the
                                Google™ advertising opt-out page at{' '}
                                <a
                                    href='https://policies.google.com/technologies/ads'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    http://www.google.com/privacy_ads.html.
                                </a>
                            </p>
                            <p>
                                <strong>b. Acquisition:</strong> The Company may also merge
                                with or be acquired by another company. In case any of this
                                happens, the successor company shall acquire the information
                                we presently maintain, including Personally Identifiable
                                Information, which will still remain subject to this Privacy
                                Policy.
                            </p>
                            <p>
                                <strong>c. Legal Compliance:</strong> The Company reserves the
                                right to disclose your Personally Identifiable Information as
                                required by law and when we believe that disclosure is
                                necessary to protect our rights and/or comply with a court
                                order or legal process served on us, enforce or apply this
                                Privacy Policy, Terms of Use or other agreements or protect
                                the rights, property or safety of the Website.
                            </p>
                            <p>
                                <strong>c. Legal Compliance:</strong> The Company reserves the
                                right to disclose your Personally Identifiable Information as
                                required by law and when we believe that disclosure is
                                necessary to protect our rights and/or comply with a court
                                order or legal process served on us, enforce or apply this
                                Privacy Policy, Terms of Use or other agreements or protect
                                the rights, property or safety of the Website.
                            </p>
                            <p>
                                <strong>Advertising:</strong> The Company or any of our
                                advertising partners may deliver advertisements appearing on
                                the Website to you. The Company may also use third-party
                                service providers to serve advertisements when you use the
                                Website. These providers may use Non-Personally Identifiable
                                Information about your visits and use of the Website, and
                                visits to other websites or locations in order to provide,
                                through the use of network tags, advertisements about goods
                                and services that may be of interest to you. Our advertising
                                partners may set cookies as well, which will allow the
                                advertising partners to recognize your computer each time they
                                send you an advertisement. This way, they may also compile
                                information about where you, or others who are using your
                                computer or device, saw their advertisements and determine
                                which advertisements are clicked. This information shall allow
                                an advertising partner to deliver targeted advertisements that
                                they believe will be of most interest to you. The Company does
                                not have access to or control of the cookies that may be
                                placed by the third-party advertising servers of advertisement
                                partners. This Privacy Policy covers the use of cookies by the
                                Company and does not cover the use of cookies by any of its
                                advertisers.
                            </p>
                            <p>
                                <strong>Third Party Websites:</strong> The Website may
                                maintain links to other websites and if you choose to visit
                                other websites, the Company shall not be responsible for the
                                privacy policies or content of those other websites, and it is
                                your responsibility to review the privacy policies and terms
                                of use of those websites to confirm that you understand and
                                agree with their practices and policies.
                            </p>
                            <p>
                                <strong>Data Tracking and Cookies:</strong> To enhance your
                                experience of using the Website, we may store cookies on your
                                computer or other similar devices through which you access the
                                Website. Please be informed that a cookie is a small text file
                                that is stored on your computer or other mobile or tablet
                                device for record-keeping purposes that contains information
                                about you. The Company uses cookies to save you time while
                                using the Website, remind us who you are, and track and target
                                your interests in order to provide a customized experience.
                                Cookies also allow the Company to collect Non-Personally
                                Identifiable Information from you, like which pages you
                                visited, what links you clicked on, and how you used the
                                Website. We may use Trusted Third Parties to display
                                advertisements on our Website. They may also place separate
                                cookies on your computer or similar devices to which we have
                                no access to or control over. This Privacy Policy covers the
                                use of cookies by the Website only and does not cover the use
                                of cookies by any third party. You are hereby informed that
                                most of the browsers automatically accept cookies, however,
                                you may be able to modify your browser settings to decline
                                cookies. Kindly note that if you decline or delete these
                                cookies, some parts of the Website may not work properly.
                            </p>
                            <p>
                                if for any reason you believe that your privacy has been
                                breached through the use of our website, you may contact us
                                immediately at{' '}
                                <a
                                    href='mailto:support@collegepass.org'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    support@collegepass.org
                                </a>
                            </p>
                            <p>
                                Please note that all trade names, trademarks, logos, and
                                business identifiers that are listed in this Privacy Policy
                                but are not owned by the Company, are owned by their
                                respective owners. The Company claims no affiliation or
                                partnership to these trademarks or their owners and any
                                presumption of such affiliation, association, partnership, or
                                endorsement shall be entirely on your risk and costs.
                            </p>
                            <p>Last updated on Jan 21, 2022</p>
                        </Col>
                    </Row>
                </Container>
            </Container>  
			</Fragment>
		</Fragment>
	);
};

PrivacyIndiaScreen.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivacyIndiaScreen);
