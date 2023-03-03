import {
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  CLEAR_ACCESS,
  CLEAR_PROFILE,
  CLEAR_TIMEZONEDATA,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  SET_ACCESS,
  SET_TIMEZONEDATA,
} from '../constants/authConstants'

const TOKEN =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null
const USER = typeof window !== 'undefined' ? localStorage.getItem('user') : null

const initialState = {
  token: TOKEN,
  isAuthenticated: null,
  loading: false,
  user: USER,
  premiumLevel: 'Basic',
  accountTrial: null,
  profileCompleted: false,
  mandatoryFieldStatus: false,
  userDetails: {},
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_USER_REQUEST:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true }
    case SET_TIMEZONEDATA:
      return {
        ...state,
        timezone: payload.timezone,
        utc_offset: payload.utc_offset,
        currency: payload.currency,
      }
    case CLEAR_TIMEZONEDATA:
      return {
        ...state,
        timezone: 'Asia/Kolkata',
        utc_offset: '+0530',
        currency: 'INR',
      }
    case SET_ACCESS:
      return {
        ...state,
        premiumLevel: payload.premiumLevel,
        accountTrial: payload.accountTrial,
        // accountTrial: false,
        profileCompleted: payload.profileCompleted,
        // subscriptionId: payload.subscriptionId,
        // subscription_status: payload.subscription_status,
        // plan_type: payload.plan_type,
        expiry_date: payload.expiry_date,
        mandatory_field_status: payload.mandatoryFieldStatus,
        prime_add_ons: payload.prime_add_ons,
        isParent: payload.isParent,
      }
    case CLEAR_ACCESS:
      return {
        ...state,
        premiumLevel: 'Basic',
        // accountTrial: true,
        accountTrial: false,
        profileCompleted: false,
      }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        loading: payload.loading,
        user: localStorage.getItem('user'),
        userDetails: payload.userDetails,
        countries: payload.countries
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log("storing token")
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', payload.email)
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: payload.email,
      }
    case REGISTER_FAILURE:
    case LOAD_USER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        premiumLevel: 'Basic',
        // accountTrial: true,
        accountTrial: false,
        profileCompleted: false,
        // subscriptionId: null,
        // subscription_status: null,
        // plan_type: null,
        expiry_date: null,
      }
    default:
      return state
  }
}
