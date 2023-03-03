import React, { Fragment } from 'react';

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './termsIndia.module.scss'

const TermsIndiaScreen = () => {
	
	let title = 'Terms Of Use | CollegePass';
	let description = 'CollegePass Terms and Conditions';
	return (
		<Fragment>
			<Helmet>
				<link rel='canonical' href='https://www.collegepass.org/terms' />
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
                    <Container className={styles.termsIndia}>
                        <Row className='pt-5 mt-5'>
                            <Col className="pt-3 pb-2">
                                <h2 className='text-center pb-3 black-color'>
                                    TERMS OF USE
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pb-5">
                                <p>
									We, Empagnie Education Pvt Ltd (hereinafter referred to as
									“Company,” “us,” “we” or “our”), believe in our mission of
									making High-Quality College Admission Advice, Standardised
									Test Preparation accessible to High Schoolers worldwide at the
									click of a button!
								</p>
								<p>
									All information is provided to all users (hereinafter referred
									to as “you”) who wish to gain more knowledge about the
									Company’s offerings through its website
									www.collegepass.org(the “Website”). The Website is a platform
									that facilitates online education and college admission
									guidance for students through videos/live online sessions and
									may also include any written material, blogs, audios, or any
									other mode of communication used by the Company. The use of
									our Website is subject to the terms and conditions set forward
									in these terms of use (hereinafter referred to as “Terms of
									Use”).
								</p>
								<p>
									Please read the following terms of use carefully. by accessing
									any part of our website or using or registering on our
									website, you or any other user acknowledge that you have read,
									understood, and agree to be legally bound by all the terms and
									conditions listed herein. In case you do not agree to these
									terms of service, kindly exit this page and do not access or
									use this website any further.
								</p>
								<p>
									In addition to these terms of use, by using the website, you
									also acknowledge that you have read, understood, and agree to
									be bound by our privacy policy available at{' '}
									<a href='/privacy' target='_blank'>
										“Privacy Policy”.
									</a>
								</p>
								<p>
									<strong>Scope, Updates, and Applicability:</strong> The
									Company may, in its sole discretion, amend the Terms of Use
									and communicate the same to you via email or by posting on any
									part of the Website. The Company recommends that you review
									these Terms of Use prior to each use of the Website and by
									continuing to access and use the Website, you agree to any
									such modifications as well. As such, you are responsible for
									reviewing and should update yourself with any such
									modifications. In addition, when using particular services or
									features on our Website, you will be subject to any policies
									applicable to such services or features that may be posted
									from time to time, including but not limited to the Privacy
									Policy as noted herein. All such guidelines or policies are
									hereby incorporated by reference into these Terms of Use and
									may be read as part and parcel of these Terms of Use.
								</p>
								<p>
									<strong>Modifications to the Website:</strong> Any feature of
									part of the feature of the Website may be modified or deleted
									and may be temporarily or permanently suspended at any time,
									with or without prior notice. The Company shall not be liable
									to you or any third party for any modification, suspension, or
									discontinuance of the Website.
								</p>
								<p>
									<strong>Use of the Website:</strong> You may, at present or in
									the future, be required to establish an account in order to
									use the Website and avail the advantage of certain features.
									If so, you agree to provide true, accurate, current, and
									complete information about yourself as prompted by the Website
									as permitted, maintain and promptly update such information.
									If you provide any information that is false, inaccurate, or
									outdated, the Company has reasonable grounds to suspect that
									such information is false, inaccurate, or outdated, and the
									Company has the right to suspend or terminate your account.
									You are responsible for maintaining the confidentiality of
									your password and account and are fully responsible for all
									activities that occur under your account. Since, Confidential
									Information may include the unique account identification
									number (ID) and/or password, either chosen by you or generated
									or auto-generated by the Website as a part of standard
									security procedures, you should not disclose the same to any
									third parties. If so disclosed to any third party/ies, the
									same shall be at your sole risks and costs. The Company
									reserves the right to disable any identification code and/or
									password or reset it to ensure the safety of your identity or
									safety of its systems. Your account is supposed to be privy to
									you and you hereby undertake that you shall protect it at all
									times. You agree to immediately notify us of any unauthorized
									use of your password or account or any other breach of
									security. You agree to be responsible for all charges
									resulting from the use of your account via the Website,
									including charges resulting from unauthorized use of your
									account.
								</p>
								<p>
									<strong>Lawful Purpose:</strong> You agree to use the Website
									only for lawful purposes and that you are responsible for your
									use of and communications and content you may post via the
									Website (if and when applicable). You agree not to post,
									transmit or distribute any unlawful, infringing, threatening,
									harassing, defamatory, vulgar, obscene, profane, indecent,
									offensive, hateful, or otherwise objectionable material of any
									kind, including any material that encourages criminal conduct
									or conduct that would give rise to civil liability, infringes
									upon others’ intellectual property rights, impersonates any
									individual or entity, or otherwise violates any applicable
									law. Further, you shall not upload to the Website any content
									or files that belong to another person and to which you do not
									have any right to bullies, intimidates or harasses any other
									user, or is harassing, defamatory, comprising of abusing,
									sexually explicit, hateful or racially, ethnically
									objectionable, violative of other person’s privacy or which
									otherwise violates any other legal rights or any person or
									entity. You also shall not upload to the Website (if allowed)
									that is sexist, racist, offensive on the grounds of religion,
									nationality, or demographic group, or promotes discrimination
									based on race, caste, sex, religion, citizenship, disability,
									sexual orientation or age or infringes any patent, trademark,
									trade secret, copyright, right of privacy or publicity or
									other proprietary or intellectual property rights of any
									person or entity. No other information which is not accurate
									or based solely on rumour or hearsay or relates to a minor
									without consent of a parent or guardian, or otherwise unlawful
									in any respect shall be uploaded or posted to the Website.
								</p>
								<p>
									<strong>Permitted Use and Monitoring:</strong> The Company
									reserves the right to monitor all users’ IP addresses, data,
									and user information, including personal information to
									prevent a breach of this condition and if needed, to report
									any unlawful event to the concerned legal and executive
									authorities. You also agree that you shall not hack into or
									bypass the authorized and legal ways to enter the Website and
									download, share, copy, save, edit or use the information for
									any reason whatsoever. You also agree that you shall not
									unless separately paid for to the Company, create multiple
									users accounts through automation or by misrepresentation or
									shall create multiple logins, or transmit any viruses,
									Trojans, computer codes, or other destructive material, store
									illegal material or data, use the service or content to invade
									others privacy, cause annoyance, inconvenience or harass any
									other person and cause needless anxiety or discomfort or any
									unpleasant experience to others. You agree not to use the
									Website in any manner that interferes with its normal
									operation or with any other user’s use of the Website.
								</p>
								<p>
									<strong>Restrictions on Use:</strong> You also hereby agree
									and acknowledge that you may not do any of the following while
									accessing or using the Website: (i) hack, bypass or test the
									vulnerability of any system or network or breach or circumvent
									any security or authentication measures; (ii) access or search
									or attempt to access or search the Website by any means other
									than through our currently available, published interfaces
									that are provided by the Company; (iii) forge any TCP/IP
									packet header or any part of the header information in any
									email or posting, or in any way use the Website to send
									altered, deceptive or false source-identifying information;
									(iv) interfere with, or disrupt, the access of any user, host
									or network, including, without limitation, sending a virus,
									overloading, flooding, spamming, mail-bombing the Website, or
									otherwise creating an undue burden on the Website. You may not
									use manual or automated software, devices, or other processes
									to “crawl,” “scrape,” or “spider” any page of the Website and
									shall not decompile, reverse engineer, or otherwise attempt to
									obtain the source code of any part of the Website. You further
									agree that you will not access the Website by any means except
									through the interface provided by the Website for access to
									the Website. Creating or maintaining any link from another
									application to any page at the Website without the prior
									authorization of the Company is prohibited and shall make you
									liable for the same. Any permitted links to the Website must
									comply with all applicable laws, rules, and regulations.
								</p>
								<p>
									<strong>Intellectual Property Protection:</strong> Protection:
									You acknowledge that all materials on the Website, including,
									but not limited to the website design, textual information,
									graphic designs, sounds, moving images, videos, pictures,
									methodologies, processes, programs, proprietary materials,
									techniques, strategies, and other similar information and the
									unique presentation thereof (collectively hereinafter referred
									to as the “Information”), is the exclusive property of the
									Company and/or its co-owners, licensors, and is subject to
									and/or protected by applicable trademarks, copyright, and
									other global intellectual property laws and legal rights. All
									rights to Information not expressly granted in this Terms of
									Use are reserved to their respective copyright owners. The
									Company, if needed, authorizes you to only view, download,
									and/or print the Information only for personal and
									non-commercial use and nothing else whatsoever and does not
									provide you any license or any other right whatsoever. You
									hereby understand and acknowledge that your use of the Website
									is solely and exclusively under the limited license granted
									herein and you shall not claim any right, title, or interest
									under this Terms of Use. All trademarks, domain names,
									slogans, and logos are either the property of the Company or
									their respective owners. All rights, not expressly granted
									herein by the Company to you are fully reserved by the
									Company, its advertisers, and licensors. You understand and
									undertake that you may not copy, download, reproduce,
									distribute, perform, republish display, post, transmit, create
									derivative works, or otherwise use any of the Information in
									any form or by any means, without the prior written
									authorization of the Company or the respective owners. The
									trademarks (hereinafter referred to as the “Trademarks”)
									contained or described on the Website are the sole property of
									the Company and/or its respective owners or licensors and may
									not be copied, altered, or otherwise used without the prior
									written authorization of the Company and/or its respective
									owners or licensors. You understand its respective owners or
									shall be entitled to enforce their legal rights in cases of
									any breach without prejudice. You understand that some of the
									Trademarks that you may see on the Website may not be owned by
									the Company, and are the property of their respective
									trademark holders. The Company or the Website does not claim
									to be affiliated to these brands and disclaim any affiliation,
									sponsorship, or endorsement with or by the same.
								</p>
								<p>
									The Admissions Consulting Services are intended for individual
									use only. Broadcasting/sharing/disclosing/uploading/publishing
									the material, information, techniques, or strategies through
									any media, including but not limited to the internet,
									television, handheld devices, and other devices, is not
									permitted and is a breach of the intellectual property rights
									of the company. You understand and acknowledge that you shall
									not copy/reverse engineer/modify/reproduce any
									material/information provided to you. We reserve the right to
									initiate legal proceedings in case of such a breach of the
									terms of this Clause. Third-Party Content: The Company may
									provide repost with permission or provide links to third-party
									websites or content over which the Company has no control, and
									some of the content appearing on the Website, or made
									available to you in connection with the services may be
									sourced from external sources (“Third Party Content”). The
									provision of Third Party Content to you is for general
									informational purposes only and does not amount to an
									endorsement or recommendation of these sites by the Company.
									The Company does not exercise any control or supervision over
									Third Party Content. The Company shall not be responsible for
									the content or accuracy of or for the opinions expressed in
									these third-party websites as these websites are not
									investigated, monitored, or checked for accuracy or
									completeness by the Company. It is suggested that before
									accessing any of these websites and the content therein, you
									should go through their terms of use and privacy policy. If
									you do not consent to their policies, kindly do not use any
									information or services provided by them. Confidentiality: In
									connection with your use of the Website, you may receive
									confidential and/or personal information of the Company that
									includes any non-public information, written or oral, relating
									to the Company, its partners or affiliates, or if applicable
									other users. You hereby agree to safeguard and keep all
									confidential information to yourself, agree to only use it for
									your permitted use of the Website, and not disclose it to any
									third party.
								</p>
								<p>
									<strong>Privacy Policy:</strong> Use of the Website is subject
									to the terms of the Privacy Policy, which is hereby
									incorporated into and made a part of these Terms of Use and is
									not repeated herein for the sake of brevity. Please carefully
									review our Privacy Policy. By using or accessing Websites, you
									agree to be bound by the terms of our Privacy Policy as well.
								</p>
								<p>
									<strong>Refund:</strong> You understand that the Company
									offers a free trial and demonstration for its college
									admission advising and tutoring services to its users in order
									to assist them in comprehensively evaluating the
									products/services available.
								</p>
								<p>
									We do not explicitly or implicitly guarantee, assure or
									represent that; you will secure admission(s) at the targeted
									overseas/domestic graduate/ undergraduate college(s) &
									university(s), as the same would ultimately depend on the
									strength of your candidature and the policy of the concerned
									graduate/undergraduate institution. We will solely assist you
									as guides/coaches in your application process. Also we, at no
									point, guarantee your success in any test that you might have
									to take for admission to a graduate/undergraduate institution
									worldwide.
								</p>
								<p>
									As a policy, we do not designate any particular member of our
									team to each Client, as we have experts who will guide you
									through the various stages. Senior Consultant(s) will step in
									for the key stages of the process. All members of our team are
									professional and well qualified to serve your requirements. We
									reserve the right to change any
									mentors/guides/coaches/consultants from time to time without
									assigning any reasons or providing any notice.
								</p>
								<p>
									If you opt for any of the products/services provided on a paid
									basis, you understand that no money paid to the Company shall
									be refundable at any point in time even if none or part of the
									services have been availed.
								</p>
								<p>
									If due to a Force Majeure Event (as defined hereinbelow), we
									have to discontinue a certain service that you had availed as
									a part of your package; we are under no obligation to refund
									the fee that you had paid for that particular service or
									provide any additional service or professional support in lieu
									of the service discontinued. ‘Force Majeure Event’ is an event
									that is beyond our control, making the performance of our
									obligations/services inadvisable, commercially impracticable,
									illegal, or impossible.
								</p>
								<p>
									Deferring Services: If you engage our consulting services for
									one application season, but then decide to defer the services
									to the next application season, additional charges may be
									applicable. Services will be deferred to only one application
									season (for example, Fall 2019 can be deferred only to either
									Spring 2020 or Fall 2020). The gap between the deferred
									seasons should be a maximum of one year (for example, Fall
									2019 can be deferred maximum to Fall 2020 only).
								</p>
								<p>
									The decision of deferring the service has to be informed to us
									by you either before at least 3 (three) months prior to the
									earliest deadline for the targeted programs (in the
									application season for which you engaged us), whichever is
									earlier.
								</p>
								<p>
									Discontinuation/Termination of Services: You may choose to
									discontinue access and usage of the Website and other services
									at any time. Upon discontinuance of use/termination for any
									reason, the Company may delete all data/information from the
									Website. However, all your rights and obligations shall
									continue to be in force even after your discontinuation of the
									use of our Website. We reserve the right to extend, cancel,
									discontinue, prematurely withdraw, or modify any of the
									services at our discretion.
								</p>
								<p>
									You, at all times, are required to maintain the sanctity of
									our professional relationship. Any misbehavior would be held
									in contempt, and there would be repercussions for the same,
									which could include discontinuation of services effective
									immediately and/or initiating appropriate legal action. For a
									productive relationship between us, you are requested to
									strictly adhere to all the guidelines and schedules as
									prescribed by us regarding communications, document
									submissions, and other miscellaneous activities.
								</p>
								<p>
									You shall use your best efforts to complete suggested tasks on
									time and share the documents and other related material
									requested by us within the prescribed timelines. Delays could
									adversely impact prospective admissions.
								</p>
								<p>
									You agree that you would be solely responsible for writing the
									essays if you have signed up for the Admission Consulting
									Services or Essay Editing services and related documents to
									ensure originality of the content and to comply with the
									ethical guidelines of the colleges and universities worldwide.
									Our role here would be to support you with an appropriate
									strategy, to review your documents, and to guide you in the
									right direction during the entire process. We will not write
									essays/application-related documents under any circumstances.
									You represent and warrant that you have not plagiarized or
									inappropriately used any content or material, including but
									not limited to application documents, essays, resumes, etc.
									provided to our team. Any deviation from this will result in
									the immediate cancellation of services with no refund.
								</p>
								<p>
									Indemnification: You agree to indemnify, defend and hold
									harmless the Company users against all claims, appeals, causes
									of action, casualty, expenses, damages, and costs; emerging or
									arising from or relating to your use of Website, any activity
									related to your account by you or any other person permitted
									by you, any Content that you submit to, post on or transmit
									through the Website, your breach of these Terms of Use, your
									infringement or violation of any rights of another, or
									termination of your access to Website. We reserve the right to
									assume, at our own expense, the exclusive defense and control
									of any such claim or action and all negotiations for
									settlement or compromise, and you agree to fully cooperate
									with us in the defense of any such claim, action, settlement
									or compromise negotiations, as requested by us.
								</p>
								<p>
									No Liability: The company shall not under any circumstances be
									liable for any damages of any kind arising out of, in
									connection with or relating to, the use of or inability to use
									the website, including any liability: (i) as a publisher of
									information; (ii) for any incorrect or inaccurate information;
									(iii) for any unauthorized access to or disclosure of your
									transmissions or data; or (iv) for statements or conduct of
									any third party on or via the website. this is a comprehensive
									limitation of liability that applies to all damages of any
									kind, including any direct, indirect, special, incidental, or
									consequential damages, whether based on breach of contract,
									breach of warranty, tort (including negligence), product
									liability, or otherwise, even if an individual advises the
									company parties of the possibility of such damages. the
									limitations of liability set forth herein are fundamental
									elements of the basis of the bargain between the company and
									you. the products, information, and services offered on and
									through the website would not be provided to you without such
									limitations. notwithstanding the foregoing, the sole and
									entire maximum liability of the company parties for any
									reason, and your sole and exclusive remedy for any cause or
									claim whatsoever shall be limited to the charges paid by you
									directly to the company.
								</p>
								<p>
									Disclaimer: The Company makes no representations or
									warranties, expressed or implied, regarding the use of the
									Website by you or for the use or interpretation of any
									information stored on, generated by, or received through the
									Website. All general information provided by the Company shall
									not replace the customized professional services provided by
									the Company or by industry experts. The Website, services, and
									other materials are provided by the Company with reasonable
									skill and care but on an “as is” and “as available” basis. All
									warranties whether express, implied, statutory, or otherwise,
									including without limitation any implied warranties as to
									non-infringement, correspondence with description,
									merchantability, or fitness for a particular purpose are
									excluded to the fullest extent permitted by law. The Company
									strongly encourages you not to take the information provided
									on its Website as a substitute for professional advice for
									college admission or through colleges or educational
									institutes themselves.
								</p>
								<p>
									Applicable Law and Jurisdiction: The laws of India shall
									govern these Terms of Use, as well as any disputes, whether in
									court or arbitration, which might arise between the Company
									and you. All disputes pertaining to the services shall be
									subject to local courts situated in New Delhi, India.
								</p>
								<p>
									Miscellaneous: These Terms of Use constitute the entire
									agreement between the Company and each user of the Website
									with respect to the subject matter of these Terms of Use. If
									any provision of these Terms of Use is deemed unlawful, void,
									or for any reason unenforceable by a court of competent
									jurisdiction, the validity, and enforceability of any
									remaining provisions will not be affected.
								</p>
								<p>
									You may not assign any of your rights or delegate any of your
									obligations under these Terms of Use. The failure of Website
									users to insist upon strict adherence to any term of these
									Terms of Use shall not constitute a waiver of such term and
									shall not be considered a waiver or limit that party’s right
									thereafter to insist upon strict adherence to that term or any
									other term contained in these Terms of Use. You may not assign
									your obligations or rights hereunder to another entity or
									individual. We may transfer, assign, or delegate these Terms
									of Use and its rights and obligations without your consent. We
									shall have no liability to you hereunder if we are prevented
									from or delay in performing our obligations, or from carrying
									on our business, by acts, events, omissions or accidents
									beyond our reasonable control, including, without limitation,
									strikes, lock-outs or, failure of a utility service or
									transport or telecommunications network, Act of God, war,
									riots, civil commotion, malicious damage, compliance with any
									law or governmental order, rule, regulation or direction,
									accident, breakdown of plant or machinery, fire, flood or
									storm. No agency, partnership, joint venture, or employment is
									created as a result of these Terms of Use and you do not have
									any authority of any kind to bind us in any respect
									whatsoever.
								</p>
								<p>
									No action arising out of these Terms of Use or your use of the
									Website, regardless of form or the basis of the claim, may be
									brought by you more than six (6) months after the cause of
									action has arisen (or if multiple causes, from the date the
									first such cause arose). You hereby waive any rights that you
									may have under any applicable law of limitations.
								</p>
								<p>
									Support: If you have any questions or queries relating to
									these Terms of Use, or wish to report any violation of these
									Terms of Use, you may contact us at{' '}
									<a
										href='mailto:support@collegepass.org'
										target='_blank'
										rel='noopener noreferrer'
									>
										support@collegepass.org
									</a>
								</p>
                            </Col>
                        </Row>
                    </Container>
                </Container>
			</Fragment>
		</Fragment>
	);
};

TermsIndiaScreen.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(TermsIndiaScreen);
