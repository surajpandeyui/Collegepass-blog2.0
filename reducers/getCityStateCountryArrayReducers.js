import {
	GET_COUNTRY_ARRAY_REQUEST,
	GET_COUNTRY_ARRAY_SUCCESS,
	GET_COUNTRY_ARRAY_FAILURE,
	GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_REQUEST,
	GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_SUCCESS,
	GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_FAILURE,
	GET_CITY_ARRAY_BY_STATEID_INSIDE_REQUEST,
	GET_CITY_ARRAY_BY_STATEID_INSIDE_SUCCESS,
	GET_CITY_ARRAY_BY_STATEID_INSIDE_FAILURE,
	GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_REQUEST,
	GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_SUCCESS,
	GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_FAILURE,
} from '../constants/getCityStateCountryArrayConstants'

const initialStateCountryArray = {
	loading: false,
	countryArray: [],
	error: null,
	success: null,
}

const initialStateStateArray = {
	loading: false,
	stateArray: [],
	error: null,
	success: null,
}

const initialStateCityArray = {
	loading: false,
	cityArray: [],
	error: null,
	success: null,
}

export const getCountryArrayReducer = (
	state = initialStateCountryArray,
	action
) => {
	switch (action.type) {
		case GET_COUNTRY_ARRAY_REQUEST:
			return {...state, loading: true, countryArray: []}
		case GET_COUNTRY_ARRAY_SUCCESS:
			return {
				...state,
				loading: false,
				countryArray: action.payload.countryArray,
				success: action.payload.success,
			}
		case GET_COUNTRY_ARRAY_FAILURE:
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

export const getStateArrayByCountryIDInsideReducer = (
	state = initialStateStateArray,
	action
) => {
	switch (action.type) {
		case GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_REQUEST:
			return {...state, loading: true, stateArray: []}
		case GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_SUCCESS:
			return {
				...state,
				loading: false,
				stateArray: action.payload.stateArray,
				success: action.payload.success,
			}
		case GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_FAILURE:
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

export const getCityArrayByStateIDInsideReducer = (
	state = initialStateCityArray,
	action
) => {
	switch (action.type) {
		case GET_CITY_ARRAY_BY_STATEID_INSIDE_REQUEST:
			return {...state, loading: true, cityArray: []}
		case GET_CITY_ARRAY_BY_STATEID_INSIDE_SUCCESS:
			return {
				...state,
				loading: false,
				cityArray: action.payload.cityArray,
				success: action.payload.success,
			}
		case GET_CITY_ARRAY_BY_STATEID_INSIDE_FAILURE:
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

export const getStateArrayByCountryIDHundretReducer = (
	state = initialStateStateArray,
	action
) => {
	switch (action.type) {
		case GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_REQUEST:
			return {...state, loading: true, stateArray: []}
		case GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_SUCCESS:
			return {
				...state,
				loading: false,
				stateArray: action.payload.stateArray,
				success: action.payload.success,
			}
		case GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_FAILURE:
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
