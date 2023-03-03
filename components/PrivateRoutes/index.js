import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'

const PrivateRoute = ({component: Component, ...rest}) => {
	const router = useRouter()
	const auth = useSelector((state) => state.auth)
	const {token} = auth

	useEffect(() => {
		if (token === null || token === undefined) {
			router.push('/login')
		}
	}, [router, token])

	return <div {...rest} render={(props) => <Component {...props} />} />
}

export default PrivateRoute
