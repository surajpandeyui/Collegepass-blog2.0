import Head from 'next/head'
import PostScreen from '../screens/PostScreen';

export default function AboutUs() {
	return (
		<>
			<Head>
				<title>CollegePass - Blog</title>
				<title>Blog | CollegePass</title>
				<meta name="description" content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide! " />
				<meta itemprop="name" content="About Us | CollegePass" />
				<meta itemprop="description" content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!" />
				<meta itemprop="image" content="" />
				<meta property="og:url" content="https://www.collegepass.org/terms" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="About Us | CollegePass" />
				<meta property="og:description" content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!" />
				<meta property="og:image" content="" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="About Us | CollegePass" />
				<meta name="twitter:description" content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!" />
				<meta name="twitter:image" content="" />
				<link rel="canonical" href="https://www.collegepass.org/about" />
			</Head>

			<main className="bg-black">
				<PostScreen></PostScreen>
			</main>
		</>
	)
}
