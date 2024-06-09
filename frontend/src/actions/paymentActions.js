import axios from "axios";

// MoMo Payment Action
export const processPaymentMomo =
  (orderInfo, cartItems, shippingInfo, createOrder) => async (dispatch) => {
    try {
      const { data, status } = await axios.post(
        "/api/v1/paymentMomo",
        orderInfo
      );

      dispatch({
        type: "MOMO_PAYMENT_SUCCESS",
        payload: data,
      });

      // Redirect to MoMo payment URL
      window.location.href = data.payUrl;
      if (status === 200) {
        const order = {
          orderItems: cartItems,
          shippingInfo,
          itemsPrice: orderInfo.itemsPrice,
          shippingPrice: orderInfo.shippingPrice,
          totalPrice: orderInfo.totalPrice,
          paymentMethod: "COD",
          paymentInfo: {
            id: "COD",
            status: "Not Paid",
          },
        };

        dispatch(createOrder(order));
      }
    } catch (error) {
      dispatch({
        type: "MOMO_PAYMENT_FAIL",
        payload: error.response.data.message,
      });
    }
  };
export const processPaymentZalo =
  (orderInfo, cartItems, shippingInfo, createOrder) => async (dispatch) => {
    try {
      const { data, status } = await axios.post("/api/v1/zaloPay", orderInfo);

      dispatch({
        type: "ZALO_PAYMENT_SUCCESS",
        payload: data,
      });

      // Redirect to MoMo payment URL
      window.location.href = data.order_url;
      if (status === 200) {
        const order = {
          orderItems: cartItems,
          shippingInfo,
          itemsPrice: orderInfo.itemsPrice,
          shippingPrice: orderInfo.shippingPrice,
          totalPrice: orderInfo.totalPrice,
          paymentMethod: "COD",
          paymentInfo: {
            id: "COD",
            status: "Not Paid",
          },
        };

        dispatch(createOrder(order));
      }
    } catch (error) {
      dispatch({
        type: "ZALO_PAYMENT_FAIL",
        payload: error.response.data.message,
      });
    }
  };
