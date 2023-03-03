import axios from 'axios'
import {
  STORE_USER_SOURCE_REQUEST,
  STORE_USER_SOURCE_SUCCESS,
  STORE_USER_SOURCE_FAILURE,
  GET_EVENT_DETAILS_REQUEST,
  GET_EVENT_DETAILS_SUCCESS,
  GET_EVENT_DETAILS_FAILURE,
  GET_CIRRICULAM_REQUEST,
  GET_CIRRICULAM_SUCCESS,
  GET_CIRRICULAM_FAILURE,
  GET_UPCOMING_EVENT_DETAILS_REQUEST,
  GET_UPCOMING_EVENT_DETAILS_SUCCESS,
  GET_UPCOMING_EVENT_DETAILS_FAILURE,
  GET_USER_EVENT_DETAILS_REQUEST,
  GET_USER_EVENT_DETAILS_SUCCESS,
  GET_USER_EVENT_DETAILS_FAILURE,
  STORE_EVENT_REGISTRATION_REQUEST,
  STORE_EVENT_REGISTRATION_SUCCESS,
  STORE_EVENT_REGISTRATION_FAILURE,
} from '../constants/eventRegistrationConstants'
import {
  APIgetEventDetails,
  APIGetCirriculam,
  APIstoreUserSource,
  APIgetUpcomingEventDetails,
  APIgetUserEventDetails,
  APIstoreEventregistration,
} from '../config/API'
import { setAlert } from './alertActions'

export const storeUserSource =
  (userSource, event_title) => async (dispatch) => {
    dispatch({ type: STORE_USER_SOURCE_REQUEST })

    try {
      var event_detail = 'Event Registration:' + event_title

      let body = {
        user_email: localStorage.user ? localStorage.user : null,
        source: userSource,
        event_details: event_detail ? event_detail : '',
        page_visited: window.location.href,
      }
      const res = await axios.post(APIstoreUserSource, body)

      dispatch({
        type: STORE_USER_SOURCE_SUCCESS,
        payload: {
          data: res.data.data,
          success: 'Succesfully stored user source',
        },
      })
    } catch (error) {
      dispatch({
        type: STORE_USER_SOURCE_FAILURE,
        payload: { error: 'Unable to store user source' },
      })
    }
  }

export const getEventDetails = (event) => async (dispatch) => {
  dispatch({ type: GET_EVENT_DETAILS_REQUEST })
  try {
    
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    let res = await axios.get(`${APIgetEventDetails}${event}`, config)

    dispatch({
      type: GET_EVENT_DETAILS_SUCCESS,
      payload: {
        eventDetails: res.data.data[0],
        success: 'Successfully retrived event details',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_EVENT_DETAILS_FAILURE,
      payload: { error: 'Unable to retrieve event details' },
    })
  }
}

export const getCirriculam = () => async (dispatch) => {
  dispatch({ type: GET_CIRRICULAM_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.get(APIGetCirriculam, config)

    dispatch({
      type: GET_CIRRICULAM_SUCCESS,
      payload: {
        cirriculam: res.data.data,
        success: 'Successfully retrived cirriculam',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_CIRRICULAM_FAILURE,
      payload: { error: 'Unable to retrieve cirriculam' },
    })
  }
}

export const getUpcomingEventDetails = (event_id) => async (dispatch) => {
  dispatch({ type: GET_UPCOMING_EVENT_DETAILS_REQUEST })
  try {
    const res = await axios.get(`${APIgetUpcomingEventDetails}${event_id}`)

    dispatch({
      type: GET_UPCOMING_EVENT_DETAILS_SUCCESS,
      payload: {
        upcomingEventDetails: res.data.data,
        success: 'Successfully retrived upcoming event details',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_UPCOMING_EVENT_DETAILS_FAILURE,
      payload: { error: 'Unable to retrieve upcoming event details' },
    })
  }
}

export const getUserEventDetails = () => async (dispatch) => {
  dispatch({ type: GET_USER_EVENT_DETAILS_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }

    const res = await axios.get(
      `${APIgetUserEventDetails}${localStorage.user}`,
      config
    )

    dispatch({
      type: GET_USER_EVENT_DETAILS_SUCCESS,
      payload: {
        userEventDetails: res.data,
        success: 'Successfully retrived user event details',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_USER_EVENT_DETAILS_FAILURE,
      payload: { error: 'Unable to retrieve user event details' },
    })
  }
}

export const storeEventRegistration =
  (formData, interested_country, event_id, event_title) => async (dispatch) => {
    dispatch({ type: STORE_EVENT_REGISTRATION_REQUEST })
    try {
      const config = {
        headers: {
          //Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.post(
        APIstoreEventregistration,
        {
          EMAIL: formData.emailId,
          parentEmail: formData.parentEmail,
          fname: formData.fname,
          lname: formData.lname,
          phone: formData.phone,
          parentPhone: formData.parentPhone,
          grade: formData.GRADE,
          countryChoices: interested_country,
          curriculum: formData.GRADE === '6' ? '7' : formData.curriculum,
          source: formData.hearing_source,
          school: formData.schooName,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          event_id: event_id,
          event_name: event_title,
        },
        config
      )

      dispatch({
        type: STORE_EVENT_REGISTRATION_SUCCESS,
        payload: {
          data: res.data.data,
          success: 'Successfully stored event registration',
        },
      })
    } catch (err) {
      dispatch({
        type: STORE_EVENT_REGISTRATION_FAILURE,
        payload: {
          error:
            err.response.status === 409
              ? 'Already Registered'
              : 'Unable to store event registration',
        },
      })
    }
  }
