import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* FONT LOADING START */}
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap'
					/>
					<link
						rel='stylesheet'
						href='https://collegepass.org/css/fonts/gilroy-bold.woff2'
					/>
					<link
						rel='stylesheet'
						href='https://collegepass.org/css/fonts/gilroy-bold.woff'
					/>
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap'
						rel='stylesheet'
					/>
					<script
						async
						src='https://use.fontawesome.com/561e849f4c.js'
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
