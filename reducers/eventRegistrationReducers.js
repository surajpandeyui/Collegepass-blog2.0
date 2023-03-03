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

const initialStateUserSource = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

const initialStateEventDetails = {
	loading: false,
	eventDetails: [],
	error: null,
	success: null,
}

const initialStateCirriculam = {
	loading: false,
	cirriculam: [],
	error: null,
	success: null,
}

const initialStateUpcomingEventDetails = {
	loading: false,
	upcomingEventDetails: [],
	error: null,
	success: null,
}

const initialStateUserEventDetails = {
	loading: false,
	userEventDetails: [],
	error: null,
	success: null,
}

const initialStateStoreEventRegistration = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

export const storeUserSourceReducer = (
	state = initialStateUserSource,
	action
) => {
	switch (action.type) {
		case STORE_USER_SOURCE_REQUEST:
			return {...state, loading: true, data: null}
		case STORE_USER_SOURCE_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case STORE_USER_SOURCE_FAILURE:
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

export const getEventDetailsReducer = (
	state = initialStateEventDetails,
	action
) => {
	switch (action.type) {
		case GET_EVENT_DETAILS_REQUEST:
			return {...state, loading: true, eventDetails: []}
		case GET_EVENT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				eventDetails: action.payload.eventDetails,
				success: action.payload.success,
			}
		case GET_EVENT_DETAILS_FAILURE:
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

export const getCirriculamReducer = (
	state = initialStateCirriculam,
	action
) => {
	switch (action.type) {
		case GET_CIRRICULAM_REQUEST:
			return {...state, loading: true, cirriculam: []}
		case GET_CIRRICULAM_SUCCESS:
			return {
				...state,
				loading: false,
				cirriculam: action.payload.cirriculam,
				success: action.payload.success,
			}
		case GET_CIRRICULAM_FAILURE:
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

export const getUpcomingEventDetailsReducer = (
	state = initialStateUpcomingEventDetails,
	action
) => {
	switch (action.type) {
		case GET_UPCOMING_EVENT_DETAILS_REQUEST:
			return {...state, loading: true, upcomingEventDetails: []}
		case GET_UPCOMING_EVENT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				upcomingEventDetails: action.payload.upcomingEventDetails,
				success: action.payload.success,
			}
		case GET_UPCOMING_EVENT_DETAILS_FAILURE:
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

export const getUserEventDetailsReducer = (
	state = initialStateUserEventDetails,
	action
) => {
	switch (action.type) {
		case GET_USER_EVENT_DETAILS_REQUEST:
			return {...state, loading: true, userEventDetails: []}
		case GET_USER_EVENT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				userEventDetails: action.payload.userEventDetails,
				success: action.payload.success,
			}
		case GET_USER_EVENT_DETAILS_FAILURE:
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

export const storeEventRegistrationReducer = (
	state = initialStateStoreEventRegistration,
	action
) => {
	switch (action.type) {
		case STORE_EVENT_REGISTRATION_REQUEST:
			return {...state, loading: true, data: null}
		case STORE_EVENT_REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case STORE_EVENT_REGISTRATION_FAILURE:
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
