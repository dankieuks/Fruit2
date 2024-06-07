import axios from "axios";

// MoMo Payment Action
export const processPaymentMomo = (orderInfo) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/v1/paymentMomo", orderInfo);

    dispatch({
      type: "MOMO_PAYMENT_SUCCESS",
      payload: data,
    });

    // Redirect to MoMo payment URL
    window.location.href = data.payUrl;
  } catch (error) {
    dispatch({
      type: "MOMO_PAYMENT_FAIL",
      payload: error.response.data.message,
    });
  }
};
