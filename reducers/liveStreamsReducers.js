import {
	GET_UPCOMING_LIVE_STREAMS_REQUEST,
	GET_UPCOMING_LIVE_STREAMS_SUCCESS,
	GET_UPCOMING_LIVE_STREAMS_FAILURE,
	GET_PREVIOUS_LIVE_STREAMS_REQUEST,
	GET_PREVIOUS_LIVE_STREAMS_SUCCESS,
	GET_PREVIOUS_LIVE_STREAMS_FAILURE,
} from '../constants/liveStreamsConstants'

const initialStateLiveStreams = {
	loading: false,
	upcomingLiveStreams: [],
	error: null,
	success: null,
}

const initialStatePreviousLiveStreams = {
	loading: false,
	previousLiveStreams: [],
	error: null,
	success: null,
}

export const getUpcomingLiveStreamsReducer = (
	state = initialStateLiveStreams,
	action
) => {
	switch (action.type) {
		case GET_UPCOMING_LIVE_STREAMS_REQUEST:
			return {...state, loading: true, upcomingLiveStreams: []}
		case GET_UPCOMING_LIVE_STREAMS_SUCCESS:
			return {
				...state,
				loading: false,
				upcomingLiveStreams: action.payload.upcomingLiveStreams,
				success: action.payload.success,
				error: null,
			}
		case GET_UPCOMING_LIVE_STREAMS_FAILURE:
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

export const getPreviousLiveStreamsReducer = (
	state = initialStatePreviousLiveStreams,
	action
) => {
	switch (action.type) {
		case GET_PREVIOUS_LIVE_STREAMS_REQUEST:
			return {...state, loading: true, previousLiveStreams: []}
		case GET_PREVIOUS_LIVE_STREAMS_SUCCESS:
			return {
				...state,
				loading: false,
				previousLiveStreams: action.payload.previousLiveStreams,
				success: action.payload.success,
				error: null,
			}
		case GET_PREVIOUS_LIVE_STREAMS_FAILURE:
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
