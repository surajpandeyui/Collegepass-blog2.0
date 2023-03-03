import axios from 'axios'
import {
  GET_EDUCATION_SECTION_REQUEST,
  GET_EDUCATION_SECTION_SUCCESS,
  GET_EDUCATION_SECTION_FAILURE,
  UPDATE_EDUCATION_SECTION_REQUEST,
  UPDATE_EDUCATION_SECTION_SUCCESS,
  UPDATE_EDUCATION_SECTION_FAILURE,
  GET_EXTRACURRICULAR_SECTION_REQUEST,
  GET_EXTRACURRICULAR_SECTION_SUCCESS,
  GET_EXTRACURRICULAR_SECTION_FAILURE,
  UPDATE_EXTRACURRICULAR_SECTION_REQUEST,
  UPDATE_EXTRACURRICULAR_SECTION_SUCCESS,
  UPDATE_EXTRACURRICULAR_SECTION_FAILURE,
  DELETE_USER_ENTRIES_REQUEST,
  DELETE_USER_ENTRIES_SUCCESS,
  DELETE_USER_ENTRIES_FAILURE,
  GET_PERSONAL_SECTION_REQUEST,
  GET_PERSONAL_SECTION_SUCCESS,
  GET_PERSONAL_SECTION_FAILURE,
  UPDATE_PERSONAL_SECTION_REQUEST,
  UPDATE_PERSONAL_SECTION_SUCCESS,
  UPDATE_PERSONAL_SECTION_FAILURE,
} from '../constants/profileConstants'
import {
  APIgetEducationSection,
  APIupdateEducationSection,
  APigetExtraSection,
  APIupdateExtraSection,
  APIdeleteUserEntries,
  APIgetPersonalSection,
  APIupdatePersonalSection,
} from '../config/API'
import {
  succEdu,
  succCurri,
  succDel,
  succPersonal,
} from '../config/successMessages'
import { error } from '../config/errorMessages'
import { setAlert } from './alertActions'
import { loadAccess, loadUser } from './authActions'

// const config = {
//   headers: { Authorization: `Bearer ${localStorage.token}` },
// };

export const getEducationSection = () => async (dispatch) => {
  dispatch({ type: GET_EDUCATION_SECTION_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.get(
      `${APIgetEducationSection}${localStorage.user}`,
      config
    )

    dispatch({
      type: GET_EDUCATION_SECTION_SUCCESS,
      payload: {
        educationData: res.data,
        success: 'Successfully retrieved profile education data',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_EDUCATION_SECTION_FAILURE,
      payload: { error: 'Unable to retrieve profile education data' },
    })
  }
}

export const updateEducationSection = (body) => async (dispatch) => {
  dispatch({ type: UPDATE_EDUCATION_SECTION_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.post(APIupdateEducationSection, body, config)
    dispatch({
      type: UPDATE_EDUCATION_SECTION_SUCCESS,
      payload: {
        data: res.data.data,
        success: 'Successfully updated education section',
      },
    })
    dispatch(setAlert(succEdu, 'success'))
  } catch (err) {
    dispatch({
      type: UPDATE_EDUCATION_SECTION_FAILURE,
      payload: { error: 'Unable to update education section' },
    })
  }
}

export const getExtraCurricularSection = () => async (dispatch) => {
  dispatch({ type: GET_EXTRACURRICULAR_SECTION_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.get(
      `${APigetExtraSection}${localStorage.user}`,
      config
    )

    dispatch({
      type: GET_EXTRACURRICULAR_SECTION_SUCCESS,
      payload: {
        extraCurricularData: res.data,
        success: 'Successfully retrieved profile extra curricular data',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_EXTRACURRICULAR_SECTION_FAILURE,
      payload: { error: 'Unable to retrieve profile extra curricular data' },
    })
  }
}

export const updateExtraCurricularSection = (body) => async (dispatch) => {
  dispatch({ type: UPDATE_EXTRACURRICULAR_SECTION_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.post(APIupdateExtraSection, body, config)
    dispatch({
      type: UPDATE_EXTRACURRICULAR_SECTION_SUCCESS,
      payload: {
        data: res.data.data,
        success: 'Successfully updated extra curricular section',
      },
    })
    dispatch(setAlert(succCurri, 'success'))
  } catch (err) {
    dispatch({
      type: UPDATE_EXTRACURRICULAR_SECTION_FAILURE,
      payload: { error: 'Unable to update extra curricular section' },
    })
  }
}

export const deleteUserEntries = (body) => async (dispatch) => {
  dispatch({ type: DELETE_USER_ENTRIES_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.post(APIdeleteUserEntries, body, config)
    dispatch({
      type: DELETE_USER_ENTRIES_SUCCESS,
      payload: {
        data: res.data,
        success: 'Successfully deleted user entry',
      },
    })
    if ((res.data.status = 200)) {
      dispatch(setAlert(succDel, 'info'))
      //   window.location.reload();
    } else {
      dispatch(setAlert(error, 'danger'))
    }
  } catch (err) {
    dispatch({
      type: DELETE_USER_ENTRIES_FAILURE,
      payload: { error: 'Unable to delete user entry' },
    })
  }
}

export const getPersonalSection = () => async (dispatch) => {
  dispatch({
    type: GET_PERSONAL_SECTION_REQUEST,
  })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.get(
      `${APIgetPersonalSection}${localStorage.user}`,
      config
    )

    dispatch({
      type: GET_PERSONAL_SECTION_SUCCESS,
      payload: {
        personalData: res.data,
        success: 'Successfully retrieved profile personal data',
      },
    })
  } catch (err) {
    dispatch({
      type: GET_PERSONAL_SECTION_FAILURE,
      payload: { error: 'Unable to retrieve profile personal data' },
    })
  }
}

export const updatePersonalSection = (body) => async (dispatch) => {
  dispatch({ type: UPDATE_PERSONAL_SECTION_REQUEST })
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
    const res = await axios.post(APIupdatePersonalSection, body, config)
    dispatch({
      type: UPDATE_PERSONAL_SECTION_SUCCESS,
      payload: {
        data: res.data.data,
        success: 'Successfully updated personal section',
      },
    })
    dispatch(setAlert(succPersonal, 'success'))
  } catch (err) {
    dispatch({
      type: UPDATE_PERSONAL_SECTION_FAILURE,
      payload: { error: 'Unable to update personal section' },
    })
    dispatch(loadUser())
    dispatch(loadAccess())
  }
}
