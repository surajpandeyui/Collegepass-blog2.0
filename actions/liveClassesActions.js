import axios from "axios";
import {
  GET_UPCOMING_LIVE_CLASSES_REQUEST,
  GET_UPCOMING_LIVE_CLASSES_SUCCESS,
  GET_UPCOMING_LIVE_CLASSES_FAILURE,
} from "../constants/liveClassesConstants";
import { APIgetLiveClass } from "../config/API";

export const getUpcomingLiveClasses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_UPCOMING_LIVE_CLASSES_REQUEST });
    const result = await axios.get(APIgetLiveClass);
    dispatch({
      type: GET_UPCOMING_LIVE_CLASSES_SUCCESS,
      payload: {
        upcomingLiveClasses: result.data.data,
        success: "Succesfully retrieved upcoming live classes",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_UPCOMING_LIVE_CLASSES_FAILURE,
      payload: { error: "Unable to get upcoming live classes" },
    });
  }
};
