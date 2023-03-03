import {
	HANDLE_PAYMENT_RESPONSE_REQUEST,
	HANDLE_PAYMENT_RESPONSE_SUCCESS,
	HANDLE_PAYMENT_RESPONSE_FAILURE,
	SUBMIT_PAYMENT_REQUEST,
	SUBMIT_PAYMENT_SUCCESS,
	SUBMIT_PAYMENT_FAILURE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
} from '../constants/paymentConstants'

const initialStateHandlePaymentResponse = {
	loading: false,
	paymentResponse: null,
	isRedirect: false,
	error: null,
	success: null,
}

const initialStateSubmitPayment = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

const initialStateCreateOrder = {
	loading: false,
	orderDetails: null,
	error: null,
	success: null,
}

export const handlePaymentResponseReducer = (
	state = initialStateHandlePaymentResponse,
	action
) => {
	switch (action.type) {
		case HANDLE_PAYMENT_RESPONSE_REQUEST:
			return {...state, loading: true, paymentResponse: null}
		case HANDLE_PAYMENT_RESPONSE_SUCCESS:
			return {
				...state,
				loading: false,
				paymentResponse: action.payload.paymentResponse,
				isRedirect: true,
				success: action.payload.success,
			}
		case HANDLE_PAYMENT_RESPONSE_FAILURE:
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

export const submitPaymentReducer = (
	state = initialStateSubmitPayment,
	action
) => {
	switch (action.type) {
		case SUBMIT_PAYMENT_REQUEST:
			return {...state, loading: true, data: {}}
		case SUBMIT_PAYMENT_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case SUBMIT_PAYMENT_FAILURE:
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

export const createOrderReducer = (state = initialStateCreateOrder, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {...state, loading: true, orderDetails: {}}
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				orderDetails: action.payload.orderDetails,
				success: action.payload.success,
			}
		case CREATE_ORDER_FAILURE:
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
