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

const initialStateEducationData = {
	loading: false,
	educationData: {},
	error: null,
	success: null,
}

const initialStateUpdateEducationSection = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

const initialStateExtraCurricularData = {
	loading: false,
	extraCurricularData: {},
	error: null,
	success: null,
}

const initialStateUpdateExtraCurricularSection = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

const initialStateDeleteUserEntries = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

const initialStatePersonalData = {
	loading: false,
	personalData: {},
	error: null,
	success: null,
}

const initialStateUpdatePersonalSection = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

export const getEducationSectionReducer = (
	state = initialStateEducationData,
	action
) => {
	switch (action.type) {
		case GET_EDUCATION_SECTION_REQUEST:
			return {...state, loading: true, educationData: {}}
		case GET_EDUCATION_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				educationData: action.payload.educationData,
				success: action.payload.success,
			}
		case GET_EDUCATION_SECTION_FAILURE:
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

export const updateEducationSectionReducer = (
	state = initialStateUpdateEducationSection,
	action
) => {
	switch (action.type) {
		case UPDATE_EDUCATION_SECTION_REQUEST:
			return {...state, loading: true, data: {}}
		case UPDATE_EDUCATION_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case UPDATE_EDUCATION_SECTION_FAILURE:
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

export const getExtraCurricularSectionReducer = (
	state = initialStateExtraCurricularData,
	action
) => {
	switch (action.type) {
		case GET_EXTRACURRICULAR_SECTION_REQUEST:
			return {...state, loading: true, extraCurricularData: {}}
		case GET_EXTRACURRICULAR_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				extraCurricularData: action.payload.extraCurricularData,
				success: action.payload.success,
			}
		case GET_EXTRACURRICULAR_SECTION_FAILURE:
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

export const updateExtraCurricularSectionReducer = (
	state = initialStateUpdateExtraCurricularSection,
	action
) => {
	switch (action.type) {
		case UPDATE_EXTRACURRICULAR_SECTION_REQUEST:
			return {...state, loading: true, data: {}}
		case UPDATE_EXTRACURRICULAR_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case UPDATE_EXTRACURRICULAR_SECTION_FAILURE:
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

export const deleteUserEntriesReducer = (
	state = initialStateDeleteUserEntries,
	action
) => {
	switch (action.type) {
		case DELETE_USER_ENTRIES_REQUEST:
			return {...state, loading: true, data: {}}
		case DELETE_USER_ENTRIES_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case DELETE_USER_ENTRIES_FAILURE:
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

export const getPersonalSectionReducer = (
	state = initialStatePersonalData,
	action
) => {
	switch (action.type) {
		case GET_PERSONAL_SECTION_REQUEST:
			return {...state, loading: true, personalData: {}}
		case GET_PERSONAL_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				personalData: action.payload.personalData,
				success: action.payload.success,
			}
		case GET_PERSONAL_SECTION_FAILURE:
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

export const updatePersonalSectionReducer = (
	state = initialStateUpdatePersonalSection,
	action
) => {
	switch (action.type) {
		case UPDATE_PERSONAL_SECTION_REQUEST:
			return {...state, loading: true, data: {}}
		case UPDATE_PERSONAL_SECTION_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case UPDATE_PERSONAL_SECTION_FAILURE:
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
