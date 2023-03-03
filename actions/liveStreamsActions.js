import axios from "axios";
import {
  GET_UPCOMING_LIVE_STREAMS_REQUEST,
  GET_UPCOMING_LIVE_STREAMS_SUCCESS,
  GET_UPCOMING_LIVE_STREAMS_FAILURE,
  GET_PREVIOUS_LIVE_STREAMS_REQUEST,
  GET_PREVIOUS_LIVE_STREAMS_SUCCESS,
  GET_PREVIOUS_LIVE_STREAMS_FAILURE,
} from "../constants/liveStreamsConstants";
import { APIgetLiveSession, APIgetArchiveStream } from "../config/API";

export const getUpcomingLiveStreams = () => async (dispatch) => {
  try {
    dispatch({ type: GET_UPCOMING_LIVE_STREAMS_REQUEST });
    const result = await axios.get(APIgetLiveSession);
    dispatch({
      type: GET_UPCOMING_LIVE_STREAMS_SUCCESS,
      payload: {
        upcomingLiveStreams: result.data.data,
        success: "Succesfully retrieved upcoming live streams",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_UPCOMING_LIVE_STREAMS_FAILURE,
      payload: { error: "Unable to get upcoming live streams" },
    });
  }
};

export const getPreviousLiveStreams = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PREVIOUS_LIVE_STREAMS_REQUEST });
    const result = await axios.get(APIgetArchiveStream);
    dispatch({
      type: GET_PREVIOUS_LIVE_STREAMS_SUCCESS,
      payload: {
        previousLiveStreams: result.data.data,
        success: "Succesfully retrieved previous live streams",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_PREVIOUS_LIVE_STREAMS_FAILURE,
      payload: { error: "Unable to get previous live streams" },
    });
  }
};
