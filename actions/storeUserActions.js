import axios from "axios";
import {
  STORE_USER_MOVEMENT_REQUEST,
  STORE_USER_MOVEMENT_SUCCESS,
  STORE_USER_MOVEMENT_FAILURE,
} from "../constants/storeUserConstants";
import { APIstoreUserMoment } from "../config/API";

export const storeUserMovement = () => async (dispatch) => {
  let body = {
    user_email: localStorage.user,
    page: [
      { page: window.location.href },
      { date: new Date().toLocaleString() },
    ],
  };

  dispatch({ type: STORE_USER_MOVEMENT_REQUEST });

  try {
    const res = await axios.post(APIstoreUserMoment, body);
    dispatch({
      type: STORE_USER_MOVEMENT_SUCCESS,
      payload: {
        data: res.data.data,
        success: "Succesfully stored user movement",
      },
    });
  } catch (err) {
    dispatch({
      type: STORE_USER_MOVEMENT_FAILURE,
      payload: { error: "Unable to store user movement" },
    });
  }
};
