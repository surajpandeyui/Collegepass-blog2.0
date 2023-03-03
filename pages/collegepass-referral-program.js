import Head from 'next/head'
import ReferScreen from '../screens/ReferScreen';

export default function CollegepassReferralProgram() {
	return (
		<>
			<Head>
				<title>CollegePass Referral Program | Refer a Friend and Earn</title>
				<meta name="description" content="Help your friends get into their dream colleges in the US, UK, and Canada. Pass on the details and let them start their journey today with CollegePass." />
				<meta itemprop="name" content="About Us | CollegePass" />
				<meta itemprop="description" content="Help your friends get into their dream colleges in the US, UK, and Canada. Pass on the details and let them start their journey today with CollegePass." />
				<meta itemprop="image" content="" />
				<meta property="og:url" content="https://www.collegepass.org/terms" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="CollegePass Referral Program | Refer a Friend and Earn" />
				<meta property="og:description" content="Help your friends get into their dream colleges in the US, UK, and Canada. Pass on the details and let them start their journey today with CollegePass." />
				<meta property="og:image" content="" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="CollegePass Referral Program | Refer a Friend and Earn" />
				<meta name="twitter:description" content="Help your friends get into their dream colleges in the US, UK, and Canada. Pass on the details and let them start their journey today with CollegePass." />
				<meta name="twitter:image" content="" />
				<link rel="canonical" href="https://www.collegepass.org/about" />
			</Head>

			<main className="bg-black">
				<ReferScreen></ReferScreen>
			</main>
		</>
	)
}
