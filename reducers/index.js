import {combineReducers} from 'redux'

import authReducer from './authReducers'
import {alertReducer} from './alertReducers'
import {
	getUpcomingLiveStreamsReducer,
	getPreviousLiveStreamsReducer,
} from './liveStreamsReducers'
import {getUpcomingLiveClassesReducer} from './liveClassesReducers'
import {
	handlePaymentResponseReducer,
	submitPaymentReducer,
	createOrderReducer,
} from './paymentReducers'
import {storeUserMovementReducer} from './storeUserReducers'
import {
	storeUserSourceReducer,
	getEventDetailsReducer,
	getUpcomingEventDetailsReducer,
	getCirriculamReducer,
	getUserEventDetailsReducer,
	storeEventRegistrationReducer,
} from './eventRegistrationReducers'

import {
	getCountryArrayReducer,
	getStateArrayByCountryIDInsideReducer,
	getCityArrayByStateIDInsideReducer,
} from './getCityStateCountryArrayReducers'
import {
	deleteUserEntriesReducer,
	getEducationSectionReducer,
	getExtraCurricularSectionReducer,
	updateEducationSectionReducer,
	updateExtraCurricularSectionReducer,
	getPersonalSectionReducer,
	updatePersonalSectionReducer,
} from './profileReducers'
import {getVideoLessonsReducer} from './videoLessonsReducers'

const rootReducer = combineReducers({
	auth: authReducer,
	upcomingLiveStreams: getUpcomingLiveStreamsReducer,
	upcomingLiveClasses: getUpcomingLiveClassesReducer,
	alert: alertReducer,
	previousLiveStreams: getPreviousLiveStreamsReducer,
	storeUserMovement: storeUserMovementReducer,
	handlePaymentResponse: handlePaymentResponseReducer,
	submitPayment: submitPaymentReducer,
	createOrder: createOrderReducer,
	storeUserSource: storeUserSourceReducer,
	eventDetails: getEventDetailsReducer,
	upcomingEventDetails: getUpcomingEventDetailsReducer,
	countryArray: getCountryArrayReducer,
	cirriculam: getCirriculamReducer,
	stateArrayByCountryIDInside: getStateArrayByCountryIDInsideReducer,
	cityArrayByStateIDInside: getCityArrayByStateIDInsideReducer,
	userEventDetails: getUserEventDetailsReducer,
	storeEventRegistration: storeEventRegistrationReducer,
	educationSection: getEducationSectionReducer,
	updateEducationSection: updateEducationSectionReducer,
	extraCurricularSection: getExtraCurricularSectionReducer,
	updateExtraCurricularSection: updateExtraCurricularSectionReducer,
	deleteUserEntries: deleteUserEntriesReducer,
	personalSection: getPersonalSectionReducer,
	updatePersonalSection: updatePersonalSectionReducer,
	videoLessons: getVideoLessonsReducer,
})

export default rootReducer
