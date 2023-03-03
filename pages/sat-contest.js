import Head from 'next/head'
import SatContestScreen from '../screens/SatContestScreen';

export default function SatContest() {

	let title = 'SAT Talent Hunt | CollegePass'
	let description =
		'SAT Scholarships worth Rs. 65 lakhs! 100% Scholarship for the Top 50 Scorers. 80% Scholarship for the next 100 High Scorers.'

	return (
		<>
			<Head>
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
			</Head>
			<main>
				<SatContestScreen></SatContestScreen>
			</main>
		</>
	)
}
