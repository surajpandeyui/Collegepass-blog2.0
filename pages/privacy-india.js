import Head from 'next/head'
import PrivacyIndiaScreen from '../screens/PrivacyIndiaScreen'

export default function privacyIndia() {

	let title = 'Privacy Policy | CollegePass';
	let description = 'CollegePass Privacy Policy';
	
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
				<link rel="canonical" href="https://www.collegepass.org/privacy-india" />
			</Head>

			<main>
				<PrivacyIndiaScreen></PrivacyIndiaScreen>
			</main>
		</>
	)
}
