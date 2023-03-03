import Head from 'next/head'
import ReviewScreen from '../screens/ReviewScreen';

export default function Review() {
	return (
		<>
			<Head>
				<title>CollegePass - Account</title>
				<title>Success Stories | CollegePass</title>
				<meta name="description" content="Students that work with CollegePass increases their chances of getting into the top US, UK, and Canadian universities by up to 200%. " />
				<meta itemprop="name" content="Success Stories | CollegePass" />
				<meta itemprop="description" content="Students that work with CollegePass increases their chances of getting into the top US, UK, and Canadian universities by up to 200%." />
				<meta itemprop="image" content="" />
				<meta property="og:url" content="https://www.collegepass.org/terms" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Success Stories | CollegePass" />
				<meta property="og:description" content="Students that work with CollegePass increases their chances of getting into the top US, UK, and Canadian universities by up to 200%." />
				<meta property="og:image" content="" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Success Stories | CollegePass" />
				<meta name="twitter:description" content="Students that work with CollegePass increases their chances of getting into the top US, UK, and Canadian universities by up to 200%." />
				<meta name="twitter:image" content="" />
				<link rel="canonical" href="https://www.collegepass.org/success-stories" />
			</Head>

			<main className="bg-black">
				<ReviewScreen></ReviewScreen>
			</main>
		</>
	)
}
