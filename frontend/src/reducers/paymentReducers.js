import {
  PAYMENT_MOMO_REQUEST,
  PAYMENT_MOMO_SUCCESS,
  PAYMENT_MOMO_FAIL,
} from "../constants/paymentConstants";

export const paymentMomoReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_MOMO_REQUEST:
      return {
        loading: true,
      };
    case PAYMENT_MOMO_SUCCESS:
      return {
        loading: false,
        success: true,
        payUrl: action.payload.payUrl,
      };
    case PAYMENT_MOMO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
