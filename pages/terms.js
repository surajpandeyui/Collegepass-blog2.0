import Head from 'next/head'
import TermsScreen from '../screens/TermsScreen'

export default function terms() {

	let title = "Terms of Use | CollegePass";
  let description = "CollegePass Terms and Conditions";
  
	return (
		<>
			<Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content="" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="" />
        <link rel="canonical" href="https://www.collegepass.org/terms" />
			</Head>

			<main>
				<TermsScreen></TermsScreen>
			</main>
		</>
	)
}
