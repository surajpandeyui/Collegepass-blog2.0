import axios from "axios";
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
} from "../constants/getCityStateCountryArrayConstants";
import {
  APIGetCountry,
  APIGetStateByCountryIDinside,
  APIGetCityByStateIDinside,
  APIGetStateByCountryIDhundret,
} from "../config/API";

export const getCountryArray = () => async (dispatch) => {
  dispatch({ type: GET_COUNTRY_ARRAY_REQUEST });
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    const res = await axios.get(APIGetCountry, config);

    dispatch({
      type: GET_COUNTRY_ARRAY_SUCCESS,
      payload: {
        countryArray: res.data.data,
        success: "Successfully retrived country array",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_COUNTRY_ARRAY_FAILURE,
      payload: { error: "Unable to retrieve country array" },
    });
  }
};

export const getStateArrayByCountryIDInside =
  (countryInside) => async (dispatch) => {
    dispatch({ type: GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_REQUEST });
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const res = await axios.get(
        `${APIGetStateByCountryIDinside}${countryInside}`,
        config
      );

      dispatch({
        type: GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_SUCCESS,
        payload: {
          stateArray: res.data.data,
          success: "Successfully retrived state array",
        },
      });
    } catch (err) {
      dispatch({
        type: GET_STATE_ARRAY_BY_COUNTRYID_INSIDE_FAILURE,
        payload: { error: "Unable to retrieve state array" },
      });
    }
  };

export const getCityArrayByStateIDInside =
  (stateInside) => async (dispatch) => {
    dispatch({ type: GET_CITY_ARRAY_BY_STATEID_INSIDE_REQUEST });
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const res = await axios.get(
        `${APIGetCityByStateIDinside}${stateInside}`,
        config
      );

      dispatch({
        type: GET_CITY_ARRAY_BY_STATEID_INSIDE_SUCCESS,
        payload: {
          cityArray: res.data.data,
          success: "Successfully retrived state array",
        },
      });
    } catch (err) {
      dispatch({
        type: GET_CITY_ARRAY_BY_STATEID_INSIDE_FAILURE,
        payload: { error: "Unable to retrieve state array" },
      });
    }
  };

export const getStateArrayByCountryIDHundret = () => async (dispatch) => {
  dispatch({ type: GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_REQUEST });
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    const res = await axios.get(`${APIGetStateByCountryIDhundret}`, config);

    dispatch({
      type: GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_SUCCESS,
      payload: {
        stateArray: res.data.data,
        success: "Successfully retrived state array",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_STATE_ARRAY_BY_COUNTRYID_HUNDRET_FAILURE,
      payload: { error: "Unable to retrieve state array" },
    });
  }
};
