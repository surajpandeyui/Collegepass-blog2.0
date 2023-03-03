import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AfterLoginHeader from './AfterLoginHeader'
import BeforeLoginHeader from './BeforeLoginHeader'
import { loadUser } from '../../actions/authActions'

const index = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadUser())
  }, [])
  if (auth.token === null || auth.token === undefined) {
    return <BeforeLoginHeader />
  }
  return <AfterLoginHeader />
}

export default index
