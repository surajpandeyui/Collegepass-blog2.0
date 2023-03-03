import axios from "axios";
import {
  GET_VIDEO_LESSONS_REQUEST,
  GET_VIDEO_LESSONS_SUCCESS,
  GET_VIDEO_LESSONS_FAILURE,
} from "../constants/videoLessonsConstants";
import { APIgetUserTrackList } from "../config/API";

export const getVideoLessons = () => async (dispatch) => {
  dispatch({ type: GET_VIDEO_LESSONS_REQUEST });
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    const res = await axios.get(
      `${APIgetUserTrackList}${localStorage.user}/all`,
      config
    );

    dispatch({
      type: GET_VIDEO_LESSONS_SUCCESS,
      payload: {
        videoLessons: res.data.data,
        success: "Successfully retrieved video lessons",
      },
    });
  } catch (err) {
    dispatch({
      type: GET_VIDEO_LESSONS_FAILURE,
      payload: { error: "Unable to retrieve video lessons" },
    });
  }
};
