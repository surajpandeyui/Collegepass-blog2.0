import {
	GET_UPCOMING_LIVE_CLASSES_REQUEST,
	GET_UPCOMING_LIVE_CLASSES_SUCCESS,
	GET_UPCOMING_LIVE_CLASSES_FAILURE,
} from '../constants/liveClassesConstants'

const initialStateLiveClasses = {
	loading: false,
	upcomingLiveClasses: [],
	error: null,
	success: null,
}

export const getUpcomingLiveClassesReducer = (
	state = initialStateLiveClasses,
	action
) => {
	switch (action.type) {
		case GET_UPCOMING_LIVE_CLASSES_REQUEST:
			return {...state, loading: true, upcomingLiveClasses: []}
		case GET_UPCOMING_LIVE_CLASSES_SUCCESS:
			return {
				...state,
				loading: false,
				upcomingLiveClasses: action.payload.upcomingLiveClasses,
				success: action.payload.success,
				error: null,
			}
		case GET_UPCOMING_LIVE_CLASSES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				success: null,
			}

		default:
			return state
	}
}
