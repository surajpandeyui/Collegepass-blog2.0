import {
  GET_VIDEO_LESSONS_REQUEST,
  GET_VIDEO_LESSONS_SUCCESS,
  GET_VIDEO_LESSONS_FAILURE,
} from '../constants/videoLessonsConstants'

const initialStateVideoLessons = {
  loading: false,
  videoLessons: [],
  error: null,
  success: null,
}

export const getVideoLessonsReducer = (
  state = initialStateVideoLessons,
  action
) => {
  switch (action.type) {
    case GET_VIDEO_LESSONS_REQUEST:
      return { ...state, loading: true, videoLessons: [] }
    case GET_VIDEO_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        videoLessons: action.payload.videoLessons,
        success: action.payload.success,
        error: null,
      }
    case GET_VIDEO_LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        success: null,
        error: action.payload.error,
      }
    default:
      return state
  }
}
