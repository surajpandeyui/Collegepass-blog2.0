import {
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  CLEAR_ACCESS,
  CLEAR_PROFILE,
  CLEAR_TIMEZONEDATA,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  SET_ACCESS,
  SET_TIMEZONEDATA,
} from '../constants/authConstants'

import axios from 'axios'
import {
  APITimeZoneData,
  APIgetUserAccessLevel,
  APIgetUserAccessLevelNew,
  APIgetUserDetailByToken,
  APIlogin,
  APIregister,
  APIthirdPartyUserAuthentication,
  APIgetMandatoryFields,
  APIUserDetails,
  APIOTPlogin,
} from '../config/API'

import { LOGIN_ERROR_MSG } from '../config/errorMessages'
import { LOGIN_SOCIAL_ERROR_MSG } from '../config/errorMessages'
import { setAlert } from './alertActions'

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    //TOKEN is Present in local storage
    // console.log("loading user")

    dispatch({ type: LOAD_USER_REQUEST })

    try {
      // call the authentication service to get user email
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
      const result = await axios.get(APIgetUserDetailByToken, config)
      // console.log('result', result)

      const userDetails = await axios.get(
        `${APIUserDetails}${result.data.email}`,
        config
      )

      if (result.data.success === 0) {
        dispatch({
          type: LOAD_USER_FAILURE,
        })
      } else {
        let res = {
          isAuthenticated: true,
          loading: false,
          email: result.email,
          userDetails: userDetails.data.data[0],
          countries: userDetails.data.countryChoice
        }
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: res,
        })
        dispatch(loadAccess())
      }
    } catch (err) {
      // if any error occurs while performing axios request
      dispatch({
        type: LOAD_USER_FAILURE,
      })
    }
    // if user is not present in redux
  } else {
    //TOKEN is NOT Present in local storage
    dispatch({
      type: LOAD_USER_FAILURE,
    })
  }
}

//REGISTER USER
export const register =
  (email, password, redirectUrl = '/') =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    dispatch({ type: REGISTER_REQUEST })

    try {
      const res = await axios.post(
        APIregister,
        {
          EMAIL: email,
          PASSWORD: password,
        },
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      dispatch(loadAccess())

      //dispatch(setAlert(succReg, 'info'));

      window.location = redirectUrl
    } catch (err) {
      dispatch(setAlert(LOGIN_ERROR_MSG, 'danger'))

      dispatch({
        type: REGISTER_FAILURE,
      })
    }
  }

//LOGIN USER
export const login =
  (email, password, redirectUrl = '/') =>
  async (dispatch) => {
    // // console.log(redirectUrl)

    dispatch({ type: LOGIN_REQUEST })
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post(
        APIlogin,
        {
          EMAIL: email,
          PASSWORD: password,
        },
        config
      )

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })

      dispatch(loadAccess())
      dispatch(loadUser())
      // dispatch(removeRedirectToTest())

      // if (redirectUrl !== '/') {
      // 	// console.log('inside redirect url end')
      // 	window.location.href = `https://exams.collegepass.org/landing/${res.data.token}`
      // }
    } catch (err) {
      dispatch(setAlert(LOGIN_ERROR_MSG, 'danger'))
      dispatch({
        type: LOGIN_FAILURE,
      })
      //}
    }
  }

//OTP LOGIN USER
export const loginOTP =
  (phone, otp, redirectUrl = '/') =>
  async (dispatch) => {
    

    dispatch({ type: LOGIN_REQUEST })
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // console.log("OTP  login",phone,otp)
      const res = await axios.post(
        APIOTPlogin,
        {
          phone: phone,
          otp: otp,
        },
        config
      )
      
      if(res.data.status)
      {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
  
        dispatch(loadAccess())
        dispatch(loadUser())
      }
      
      else 
      {
        throw("err")
      }
      // dispatch(removeRedirectToTest())

      // if (redirectUrl !== '/') {
      // 	// console.log('inside redirect url end')
      // 	window.location.href = `https://exams.collegepass.org/landing/${res.data.token}`
      // }
    } catch (err) {
      dispatch(setAlert(LOGIN_ERROR_MSG, 'danger'))
      dispatch({
        type: LOGIN_FAILURE,
      })
      //}
    }
  }

//Social login
export const socialLogin = (email, source) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(
      APIthirdPartyUserAuthentication,
      {
        EMAIL: email,
        SOURCE: source,
      },
      config
    )
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadAccess())
    dispatch(loadUser())
  } catch (err) {
    dispatch(setAlert(LOGIN_SOCIAL_ERROR_MSG, 'danger'))

    dispatch({
      type: LOGIN_FAILURE,
    })
  }
}

//Load User
export const loadAccess = () => async (dispatch) => {
  if (localStorage.user && localStorage.token) {
    //TOKEN is Present in local storage
    // console.log("loading access")
    try {
      // call the authentication service to get user email
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
      const result = await axios.get(
        `${APIgetUserAccessLevelNew}${localStorage.user}`,
        config
      )

      // console.log('FREE TRIAL STATUS', result.data.UserFreeTrailStatus)

      let res = {
        premiumLevel: result.data.premium_level,
        accountTrial: result.data.UserFreeTrailStatus,
        profileCompleted: result.data.profileCompleted,
        // plan_type: result.data.plan_type,
        // subscriptionId: result.data.subscriptionId,
        // subscription_status: result.data.subscription_status,
        expiry_date: result.data.expiry_date,
        mandatoryFieldStatus: result.data.mandatoryFieldStatus,
        prime_add_ons: result.data.prime_add_ons,
        isParent: result.data.isParent,
      }
      dispatch({
        type: SET_ACCESS,
        payload: res,
      })
    } catch (err) {
      // if any error occurs while performing axios request

      dispatch({
        type: CLEAR_ACCESS,
      })
    }

    // if user is not present in redux
  } else {
    //TOKEN is NOT Present in local storage
    dispatch({
      type: CLEAR_ACCESS,
    })
  }
}

export const getTimeZoneData = () => async (dispatch) => {
  try {
    // call the authentication service to get user email
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const result = await axios.get(APITimeZoneData, config)

    // // console.log('result from actions', result.data.location_data.utc_offset)
    let res = {
      timezone: result.data.location_data.timezone,
      utc_offset: result.data.location_data.utc_offset,
      currency: result.data.location_data.currency,
    }
    dispatch({
      type: SET_TIMEZONEDATA,
      payload: res,
    })
  } catch (err) {
    // if any error occurs while performing axios request
    dispatch({
      type: CLEAR_TIMEZONEDATA,
    })
  }
}

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  })
  dispatch({
    type: LOGOUT,
  })

  window.location.reload(false)
  window.location.replace('/')
}
