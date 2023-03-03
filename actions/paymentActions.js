import axios from "axios";
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
} from "../constants/paymentConstants";
import {
  APIstoreUserMoment,
  paymentSuccessURL,
  createOrderURL,
} from "../config/API";

export const handlePaymentResponse =
  (response, plan, ordID, subID) => async (dispatch) => {
    dispatch({ type: HANDLE_PAYMENT_RESPONSE_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const bodySuccess = {
        payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
          ? response.razorpay_signature
          : null,
        user_email: localStorage.user,
        razorpay_subscription_id: subID ? subID : null,
        order_id: ordID ? ordID : null,
        plan: plan,
      };

      const res = await axios.post(paymentSuccessURL, bodySuccess, config);
      // console.log(res.data);

      dispatch({
        type: HANDLE_PAYMENT_RESPONSE_SUCCESS,
        payload: {
          paymentResponse: res.data.data,
          success: "Succesfully handled payment response",
        },
      });
      dispatch(loadUser);
      dispatch(loadAccess);
    } catch (err) {
      dispatch({
        type: HANDLE_PAYMENT_RESPONSE_FAILURE,
        payload: {
          error: "Unable to handle payment response",
        },
      });
      dispatch(loadUser);
      dispatch(loadAccess);
    }
  };

export const submitPayment =
  (amt, currency, planDetail, planID, ordID) => async (dispatch) => {
    dispatch({ type: SUBMIT_PAYMENT_REQUEST });
    try {
      let options = {
        key: apiKey,
        amount: amt * 100,
        currency: currency,

        description: planDetail,
        image: image,
        order_id: ordID,
        handler: function (response) {
          dispatch(handlePaymentResponse(response, planID, ordID, null));
        },
        prefill: {
          email: localStorage.user,
        },
        theme: {
          color: color,
        },
      };
      let rzp = new window.Razorpay(options);
      rzp.open();

      dispatch({
        type: SUBMIT_PAYMENT_SUCCESS,
        payload: {
          success: "Successfully submitted payment",
        },
      });
    } catch (err) {
      dispatch({
        type: SUBMIT_PAYMENT_FAILURE,
        payload: {
          error: "Unable to submit payment",
        },
      });
    }
  };

export const createOrder = (body, planDetail) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };

    const res = await axios.post(createOrderURL, body, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: {
        orderDeatils: res.data.data,
        success: "Succesfully created order",
      },
    });

    dispatch(
      submitPayment(
        body.amount,
        body.currency,
        planDetail,
        body.plan_id,
        res.data.data.id
      )
    );
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: {
        error: "Unable to create order",
      },
    });
  }
};
