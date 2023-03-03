import React from 'react'
import Image from 'next/image'

function Loading() {
	return (
		<div className='full'>
			<div className='LoaderClass'>
				<Image
					src='/golden-logo-removebg.png'
					alt='CollegePass Loader'
					width={70}
					height={70}
				/>
			</div>
		</div>
	)
}

export default Loading
