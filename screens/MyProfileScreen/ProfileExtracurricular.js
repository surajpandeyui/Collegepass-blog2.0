import {Row, Col, Form, Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import styles from '../MyProfileScreen/profile.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {
	getExtraCurricularSection,
	updateExtraCurricularSection,
} from '../../actions/profileActions'
import {loadAccess, loadUser} from '../../actions/authActions'
import moment from 'moment'

const ProfileExtracurricular = () => {
	const dispatch = useDispatch()
	const {extraCurricularData, loading} = useSelector(
		(state) => state.extraCurricularSection
	)

	const [selectedCountries, setCountries] = useState([])
	const [selectedCareer, setCareer] = useState([])

	useEffect(() => {
		dispatch(getExtraCurricularSection())
	}, [dispatch])

	/****************************Extra curricular start*********************************/
	const [extraCurricularActivities, setExtraCurricularActivities] = useState([
		{
			id: 1,
			name: '',
			month: '',
			year: '',
			award: '',
		},
	])

	const handleExtraCurricularActivitiesFieldChange = (e, i) => {
		const values = [...extraCurricularActivities]

		values[i][e.target.name] = e.target.value

		setExtraCurricularActivities(values)
	}

	const handleExtraCurricularActivitiesAdd = (i) => {
		const values = [...extraCurricularActivities]
		values.push({
			id: i + 1,
			name: '',
			month: '',
			year: '',
			award: '',
		})
		setExtraCurricularActivities(values)
	}

	const handleExtraCurricularActivitiesRemove = (i) => {
		const values = [...extraCurricularActivities]
		values.splice(i, 1)
		setExtraCurricularActivities(values)
	}

	/****************************Extra curricular end*********************************/

	/****************************Work experience start*********************************/
	const [workExperience, setWorkExperience] = useState([
		{
			id: 1,
			company_name: '',
			designation: '',
			job_desc: '',
			company_start_date: '',
			company_end_date: '',
			company_present: false,
		},
	])

	const handleWorkExperienceFieldsChange = (e, i) => {
		const values = [...workExperience]
		values[i][e.target.name] = e.target.value
		setWorkExperience(values)
	}

	const handleWorkExperienceAdd = (i) => {
		const values = [...workExperience]
		values.push({
			id: i + 1,
			company_name: '',
			designation: '',
			job_desc: '',
			company_start_date: '',
			company_end_date: '',
			company_present: false,
		})
		setWorkExperience(values)
	}

	const handleWorkExperienceRemove = (i) => {
		const values = [...workExperience]
		values.splice(i, 1)
		setWorkExperience(values)
	}
	/****************************Work experience start*********************************/

	/****************************Projects/Summer School start*********************************/
	const [projects, setProjects] = useState([
		{
			id: 1,
			project_name: '',
			project_month: '',
			project_year: '',
			project_award: '',
		},
	])

	const handleProjectsFieldsChange = (e, i) => {
		const values = [...projects]
		values[i][e.target.name] = e.target.value
		setProjects(values)
	}

	const handleProjectsAdd = (i) => {
		const values = [...projects]
		values.push({
			id: i + 1,
			project_name: '',
			project_month: '',
			project_year: '',
			project_award: '',
		})
		setProjects(values)
	}

	const handleProjectsRemove = (i) => {
		const values = [...projects]
		values.splice(i, 1)
		setProjects(values)
	}
	/****************************Projects/Summer School end*********************************/

	/****************************Honor/Awards/Scholarship start*********************************/
	const [awards, setAwards] = useState([
		{
			id: 1,
			honor_name: '',
			honor_date: '',
		},
	])

	const handleAwardsFieldsChange = (e, i) => {
		const values = [...awards]
		values[i][e.target.name] = e.target.value
		setAwards(values)
	}

	const handleAwardsAdd = (i) => {
		const values = [...awards]
		values.push({
			id: i + 1,
			honor_name: '',
			honor_date: '',
		})
		setAwards(values)
	}

	const handleAwardsRemove = (i) => {
		const values = [...awards]
		values.splice(i, 1)
		setAwards(values)
	}
	/****************************Honor/Awards/Scholarship end*********************************/

	/****************************Community start*********************************/
	const [communityService, setCommunityService] = useState([
		{
			id: 1,
			community_name: '',
			community_objective: '',
			community_start_date: '',
			community_end_date: '',
			community_present: false,
		},
	])

	const handleCommunityServiceFieldsChange = (e, i) => {
		const values = [...communityService]
		values[i][e.target.name] = e.target.value
		setCommunityService(values)
	}

	const handleCommunityServiceAdd = (i) => {
		const values = [...communityService]
		values.push({
			id: i + 1,
			community_name: '',
			community_objective: '',
			community_start_date: '',
			community_end_date: '',
			community_present: false,
		})
		setCommunityService(values)
	}

	const handleCommunityServiceRemove = (i) => {
		const values = [...communityService]
		values.splice(i, 1)
		setCommunityService(values)
	}
	/****************************Skills, Language Proficient, Hobbies start*********************************/
	const [formData, setFormData] = useState({
		skills: '',
		languages: '',
		hobbies: '',
	})
	const {skills, languages, hobbies} = formData

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	/****************************Skills, Language Proficient, Hobbies end*********************************/

	useEffect(() => {
		if (extraCurricularData?.interestedCountry) {
			const userCountries = []
			for (let single_data of extraCurricularData.interestedCountry) {
				userCountries.push(single_data.TAG_ID)
			}
			setCountries(userCountries)
		}

		if (extraCurricularData?.interestedCareer) {
			const userCareer = []
			for (let single_data of extraCurricularData.interestedCareer) {
				userCareer.push(single_data.TAG_ID)
			}
			setCareer(userCareer)
		}

		if (extraCurricularData?.ExtraUserTable) {
			setFormData({
				skills: extraCurricularData.ExtraUserTable[0].SKILLS
					? extraCurricularData.ExtraUserTable[0].SKILLS
					: '',
				languages: extraCurricularData.ExtraUserTable[0].LANGUAGE_KNOWN
					? extraCurricularData.ExtraUserTable[0].LANGUAGE_KNOWN
					: '',
				hobbies: extraCurricularData.ExtraUserTable[0].HOBBIES
					? extraCurricularData.ExtraUserTable[0].HOBBIES
					: '',
			})

			if (extraCurricularData?.extraCirricular) {
				let extraCurricular = []
				for (let single_data of extraCurricularData.extraCirricular) {
					extraCurricular.push({
						id: single_data.ID ? single_data.ID : 0,
						name: single_data.CIRRICULAR_NAME
							? single_data.CIRRICULAR_NAME
							: '',
						month: single_data.CIRRICULAR_MONTH
							? single_data.CIRRICULAR_MONTH
							: '',
						year: single_data.CIRRICULAR_YEAR
							? single_data.CIRRICULAR_YEAR
							: '',
						award: single_data.CIRRICULAR_AWARD
							? single_data.CIRRICULAR_AWARD
							: '',
					})
				}
				setExtraCurricularActivities(extraCurricular)
			}

			if (extraCurricularData?.workExperience) {
				let workExperience = []
				for (let single_data of extraCurricularData.workData) {
					workExperience.push({
						id: single_data.ID ? single_data.ID : 0,
						company_name: single_data.WORK_NAME ? single_data.WORK_NAME : 0,
						designation: single_data.WORK_DESIGNATION
							? single_data.WORK_DESIGNATION
							: 0,
						job_desc: single_data.WORK_DESC ? single_data.WORK_DESC : 0,
						company_start_date: single_data.WORK_START_DATE
							? moment(single_data.WORK_START_DATE).format('YYYY-MM-DD')
							: 0,
						company_end_date: single_data.WORK_END_DATE
							? moment(single_data.WORK_END_DATE).format('YYYY-MM-DD')
							: 0,
						company_present: single_data.PRESENT_JOB ? true : false,
					})
				}
				setWorkExperience(workExperience)
			}

			if (extraCurricularData?.projectData) {
				let projectData = []
				for (let single_data of extraCurricularData.projectData) {
					projectData.push({
						id: single_data.ID ? single_data.ID : 0,
						project_name: single_data.PROJECT_NAME
							? single_data.PROJECT_NAME
							: 0,
						project_month: single_data.PROJECT_MONTH
							? single_data.PROJECT_MONTH
							: 0,
						project_year: single_data.PROJECT_YEAR
							? single_data.PROJECT_YEAR
							: 0,
						project_award: single_data.PROJECT_AWARD
							? single_data.PROJECT_AWARD
							: 0,
					})
				}
				setProjects(projectData)
			}

			if (extraCurricularData?.awardData) {
				let awardData = []
				for (let single_data of extraCurricularData.awardData) {
					awardData.push({
						id: single_data.ID ? single_data.ID : 0,
						honor_name: single_data.AWARD ? single_data.AWARD : 0,
						honor_date: single_data.DATE_RECEIVED
							? moment(single_data.DATE_RECEIVED).format('YYYY-MM-DD')
							: 0,
					})
				}
				setAwards(awardData)
			}

			if (extraCurricularData?.communityData) {
				let communityData = []
				for (let single_data of extraCurricularData.communityData) {
					communityData.push({
						id: single_data.ID ? single_data.ID : 0,
						community_name: single_data.COMMUNITY_NAME
							? single_data.COMMUNITY_NAME
							: 0,
						community_objective: single_data.COMMUNITY_OBJECTIVE
							? single_data.COMMUNITY_OBJECTIVE
							: 0,
						community_start_date: single_data.COMMUNITY_START_DATE
							? moment(single_data.COMMUNITY_START_DATE).format('YYYY-MM-DD')
							: 0,
						community_end_date: single_data.COMMUNITY_END_DATE
							? moment(single_data.COMMUNITY_END_DATE).format('YYYY-MM-DD')
							: 0,
						community_present: single_data.PRESENT_COMMUNITY ? true : false,
					})
				}
				setCommunityService(communityData)
			}
		}
	}, [extraCurricularData])

	const onSubmit = (e) => {
		e.preventDefault()
		let body = {
			user_email: localStorage.user,
			extra_cirricular: extraCurricularActivities,
			work_data: workExperience,
			project_data: projects,
			award_data: awards,
			community_data: communityService,
			skills: skills,
			language: languages,
			hobbies: hobbies,
			intrested_country: selectedCountries.join(','),
			intrested_career: selectedCareer.join(','),
		}

		dispatch(updateExtraCurricularSection(body))
		dispatch(loadUser())
		dispatch(loadAccess())
	}

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	let monthsComponent = months.map((month, i) => {
		return (
			<option key={i + 1} value={i}>
				{month}
			</option>
		)
	})

	let yearsComponent = []
	for (var year = 2020; year >= 1990; year--) {
		yearsComponent.push(
			<option key={year} value={year}>
				{year}
			</option>
		)
	}

	return (
		<Row>
			<Col className={styles.myProfile}>
				<Row>
					<Col>
						<Row>
							<Col>
								{extraCurricularActivities.map((field, index) => {
									return (
										<Row key={index}>
											<Col lg={4} md={4} sm={12} xs={12}>
												<p>Extra Curricular Activities</p>
											</Col>
											<Col lg={8} md={8} sm={12} xs={12}>
												<Row>
													<Col
														style={{
															marginTop: '-15px',
														}}
													>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																onChange={(e) =>
																	handleExtraCurricularActivitiesFieldChange(
																		e,
																		index
																	)
																}
																name='name'
																value={field.name || ''}
																placeholder='Name'
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group as={Col} controlId='formGridState'>
															<Form.Select
																onChange={(e) =>
																	handleExtraCurricularActivitiesFieldChange(
																		e,
																		index
																	)
																}
																value={field.month || ''}
																name='month'
															>
																<option value={''}>Month</option>
																{monthsComponent}
															</Form.Select>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group as={Col} controlId='formGridState'>
															<Form.Select
																onChange={(e) =>
																	handleExtraCurricularActivitiesFieldChange(
																		e,
																		index
																	)
																}
																value={field.year || ''}
																name='year'
															>
																<option value={''}>Year</option>
																{yearsComponent}
															</Form.Select>
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col lg={9} md={9} sm={12} xs={12}>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='award'
																onChange={(e) =>
																	handleExtraCurricularActivitiesFieldChange(
																		e,
																		index
																	)
																}
																value={field.award || ''}
																placeholder='Award if any'
															/>
														</Form.Group>
													</Col>
													{index === extraCurricularActivities.length - 1 && (
														<Col lg={3} md={3} sm={12} xs={12}>
															<Button
																onClick={() => {
																	handleExtraCurricularActivitiesAdd(index)
																}}
															>
																<i
																	className='fa fa-plus'
																	aria-hidden='true'
																></i>
															</Button>
															<Button
																onClick={() =>
																	handleExtraCurricularActivitiesRemove(index)
																}
															>
																<i
																	className='fa fa-minus-circle'
																	aria-hidden='true'
																></i>
															</Button>
														</Col>
													)}
												</Row>
											</Col>
										</Row>
									)
								})}
							</Col>
						</Row>
						{workExperience.map((field, index) => {
							return (
								<Row key={index}>
									<Col lg={4} md={4} sm={12} xs={12}>
										<p>Work Experience / Internship</p>
									</Col>
									<Col lg={8} md={8} sm={12} xs={12}>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														name='company_name'
														onChange={(e) =>
															handleWorkExperienceFieldsChange(e, index)
														}
														value={field.company_name}
														placeholder='Company name'
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														name='designation'
														onChange={(e) =>
															handleWorkExperienceFieldsChange(e, index)
														}
														value={field.designation}
														placeholder='Job designation'
													/>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														name='job_desc'
														onChange={(e) =>
															handleWorkExperienceFieldsChange(e, index)
														}
														value={field.job_desc}
														placeholder='Job description'
													/>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='date'
														name='company_start_date'
														onChange={(e) =>
															handleWorkExperienceFieldsChange(e, index)
														}
														value={field.company_start_date}
														placeholder='Start date'
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='date'
														name='company_end_date'
														onChange={(e) =>
															handleWorkExperienceFieldsChange(e, index)
														}
														value={field.company_end_date}
														placeholder='End date'
													/>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col lg={9} md={9} sm={12} xs={12}>
												<Form.Group
													as={Row}
													className='mb-3'
													controlId='formHorizontalCheck'
												>
													<Col sm={{span: 10, offset: 2}}>
														<Form.Check
															name='company_present'
															onChange={(e) =>
																handleWorkExperienceFieldsChange(e, index)
															}
															value={field.company_present || false}
															label='Present'
														/>
													</Col>
												</Form.Group>
											</Col>
											{index === workExperience.length - 1 && (
												<Col lg={3} md={3} sm={12} xs={12}>
													<Button
														onClick={() => handleWorkExperienceAdd(index)}
													>
														<i className='fa fa-plus' aria-hidden='true'></i>
													</Button>
													<Button
														onClick={() => handleWorkExperienceRemove(index)}
													>
														<i
															className='fa fa-minus-circle'
															aria-hidden='true'
														></i>
													</Button>
												</Col>
											)}
										</Row>
									</Col>
								</Row>
							)
						})}
						<Row>
							<Col>
								{projects.map((field, index) => {
									return (
										<Row key={index}>
											<Col lg={4} md={4} sm={12} xs={12}>
												<p>Projects/Summer School</p>
											</Col>
											<Col lg={8} md={8} sm={12} xs={12}>
												<Row>
													<Col
														style={{
															marginTop: '-15px',
														}}
													>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='project_name'
																value={field.project_name}
																onChange={(e) =>
																	handleProjectsFieldsChange(e, index)
																}
																placeholder='Name'
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group as={Col} controlId='formGridState'>
															<Form.Select
																name='project_month'
																value={field.project_month}
																onChange={(e) =>
																	handleProjectsFieldsChange(e, index)
																}
															>
																<option value={''}>Month</option>
																{monthsComponent}
															</Form.Select>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group as={Col} controlId='formGridState'>
															<Form.Select
																name='project_year'
																value={field.project_year}
																onChange={(e) =>
																	handleProjectsFieldsChange(e, index)
																}
															>
																<option value={''}>Year</option>
																{yearsComponent}
															</Form.Select>
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col lg={9} md={9} sm={12} xs={12}>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='project_award'
																value={field.project_award}
																onChange={(e) =>
																	handleProjectsFieldsChange(e, index)
																}
																placeholder='Award if any'
															/>
														</Form.Group>
													</Col>
													{index === projects.length - 1 && (
														<Col lg={3} md={3} sm={12} xs={12}>
															<Button onClick={() => handleProjectsAdd(index)}>
																<i
																	className='fa fa-plus'
																	aria-hidden='true'
																></i>
															</Button>
															<Button
																onClick={() => handleProjectsRemove(index)}
															>
																<i
																	className='fa fa-minus-circle'
																	aria-hidden='true'
																></i>
															</Button>
														</Col>
													)}
												</Row>
											</Col>
										</Row>
									)
								})}
							</Col>
						</Row>
						<Row>
							<Col>
								{awards.map((field, index) => {
									return (
										<Row key={index}>
											<Col lg={4} md={4} sm={12} xs={12}>
												<p>Honor/Awards/Schlorship</p>
											</Col>
											<Col lg={8} md={8} sm={12} xs={12}>
												<Row>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='honor_name'
																value={field.honor_name}
																onChange={(e) =>
																	handleAwardsFieldsChange(e, index)
																}
																placeholder='Name'
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='date'
																name='honor_date'
																value={field.honor_date}
																onChange={(e) =>
																	handleAwardsFieldsChange(e, index)
																}
																placeholder='Date'
															/>
														</Form.Group>
													</Col>
													{index === awards.length - 1 && (
														<Col>
															<Form.Group as={Col} controlId='formGridState'>
																<Button onClick={() => handleAwardsAdd(index)}>
																	<i
																		className='fa fa-plus'
																		aria-hidden='true'
																	></i>
																</Button>
																<Button
																	onClick={() => handleAwardsRemove(index)}
																>
																	<i
																		className='fa fa-minus-circle'
																		aria-hidden='true'
																	></i>
																</Button>
															</Form.Group>
														</Col>
													)}
												</Row>
											</Col>
										</Row>
									)
								})}
							</Col>
						</Row>
						<Row>
							<Col>
								{communityService.map((field, index) => {
									return (
										<Row key={index}>
											<Col lg={4} md={4} sm={12} xs={12}>
												<p>Community Service</p>
											</Col>
											<Col lg={8} md={8} sm={12} xs={12}>
												<Row>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='community_name'
																value={field.community_name}
																onChange={(e) =>
																	handleCommunityServiceFieldsChange(e, index)
																}
																placeholder='Name'
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='text'
																name='community_objective'
																value={field.community_objective}
																onChange={(e) =>
																	handleCommunityServiceFieldsChange(e, index)
																}
																placeholder='Objective'
															/>
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='date'
																name='community_start_date'
																value={field.community_start_date}
																onChange={(e) =>
																	handleCommunityServiceFieldsChange(e, index)
																}
																placeholder='Start date'
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group
															className='mb-3'
															controlId='formBasicEmail'
														>
															<Form.Control
																type='date'
																name='community_end_date'
																value={field.community_end_date}
																onChange={(e) =>
																	handleCommunityServiceFieldsChange(e, index)
																}
																placeholder='End date'
															/>
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col lg={9} md={9} sm={12} xs={12}>
														<Form.Group
															as={Row}
															className='mb-3'
															controlId='formHorizontalCheck'
														>
															<Col sm={{span: 10, offset: 2}}>
																<Form.Check
																	name='community_present'
																	value={field.community_present}
																	onChange={(e) =>
																		handleCommunityServiceFieldsChange(e, index)
																	}
																	label='Present'
																/>
															</Col>
														</Form.Group>
													</Col>
													{index === communityService.length - 1 && (
														<Col lg={3} md={3} sm={12} xs={12}>
															<Button
																onClick={() => handleCommunityServiceAdd(index)}
															>
																<i
																	className='fa fa-plus'
																	aria-hidden='true'
																></i>
															</Button>
															<Button
																onClick={() =>
																	handleCommunityServiceRemove(index)
																}
															>
																<i
																	className='fa fa-minus-circle'
																	aria-hidden='true'
																></i>
															</Button>
														</Col>
													)}
												</Row>
											</Col>
										</Row>
									)
								})}
							</Col>
						</Row>
						<Row>
							<Col>
								<Row>
									<Col lg={4} md={4} sm={12} xs={12}>
										<p>Skills*</p>
									</Col>
									<Col lg={8} md={8} sm={12} xs={12}>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														onChange={onChange}
														name='skills'
														value={skills}
														placeholder='Skill1, Skill2, Skill3'
													/>
												</Form.Group>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<Row>
									<Col lg={4} md={4} sm={12} xs={12}>
										<p>Language Proficient*</p>
									</Col>
									<Col lg={8} md={8} sm={12} xs={12}>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														name='languages'
														onChange={onChange}
														value={languages}
														placeholder='language1, language2, language3'
													/>
												</Form.Group>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<Row>
									<Col lg={4} md={4} sm={12} xs={12}>
										<p>Hobbies*</p>
									</Col>
									<Col lg={8} md={8} sm={12} xs={12}>
										<Row>
											<Col>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Control
														type='text'
														name='hobbies'
														onChange={onChange}
														value={hobbies}
														placeholder='Hobbies1, Hobbies2, Hobbies3'
													/>
												</Form.Group>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col className={styles.saveProfile}>
								<Button onClick={onSubmit}>Save</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default ProfileExtracurricular
