import {
	STORE_USER_MOVEMENT_REQUEST,
	STORE_USER_MOVEMENT_SUCCESS,
	STORE_USER_MOVEMENT_FAILURE,
} from '../constants/storeUserConstants'

const initialStateUserMovement = {
	loading: false,
	data: null,
	error: null,
	success: null,
}

export const storeUserMovementReducer = (
	state = initialStateUserMovement,
	action
) => {
	switch (action.type) {
		case STORE_USER_MOVEMENT_REQUEST:
			return {...state, loading: true, data: {}}
		case STORE_USER_MOVEMENT_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				success: action.payload.success,
			}
		case STORE_USER_MOVEMENT_FAILURE:
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
