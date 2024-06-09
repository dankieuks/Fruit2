import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder, clearErrors } from "../../actions/orderActions";

import { useSelector, useDispatch } from "react-redux";
import {
  processPaymentMomo,
  processPaymentZalo,
} from "../../actions/paymentActions";

const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100000 ? 0 : 10000;

  const totalPrice = itemsPrice + shippingPrice;

  const formatToNumber = (amount) => {
    return Number(amount.toFixed(0));
  };

  const processToPayment = (paymentMethod) => {
    const orderInfo = {
      itemsPrice: formatToNumber(itemsPrice),
      shippingPrice: formatToNumber(shippingPrice),
      totalPrice: formatToNumber(totalPrice),
      paymentMethod,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    if (paymentMethod === "momo") {
      dispatch(
        processPaymentMomo(orderInfo, cartItems, shippingInfo, createOrder)
      );
    } else if (paymentMethod === "zalopay") {
      dispatch(
        processPaymentZalo(orderInfo, cartItems, shippingInfo, createOrder)
      );
    } else if (paymentMethod === "cod") {
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
      history.push("/success");
    } else {
      history.push("/payment");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Xác nhận hóa đơn"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Thông tin vận chuyển</h4>
          <p>
            <b>Tên khách hàng:</b> {user && user.name}
          </p>
          <p>
            <b>Số điện thoại:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Địa chỉ:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Các mặt hàng trong giỏ hàng của bạn:</h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x {item.price.toLocaleString()}đ ={" "}
                      <b>{(item.quantity * item.price).toLocaleString()}đ</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Tổng giá trị đơn hàng</h4>
            <hr />
            <p>
              Thành tiền:{" "}
              <span className="order-summary-values">
                {itemsPrice.toLocaleString()}đ
              </span>
            </p>
            <p>
              Phí vận chuyển:{" "}
              <span className="order-summary-values">
                {shippingPrice.toLocaleString()}đ
              </span>
            </p>

            <hr />
            <p>
              Tổng tiền:{" "}
              <span className="order-summary-values">
                {totalPrice.toLocaleString()}đ
              </span>
            </p>
            <hr />
            <button
              id="momo_btn"
              className="btn btn-primary btn-block"
              onClick={() => processToPayment("momo")}
            >
              Thanh toán qua MoMo
            </button>
            <button
              id="vnpay_btn"
              className="btn btn-primary btn-block"
              onClick={() => processToPayment("vnpay")}
            >
              Thanh toán qua VNPay
            </button>
            <button
              id="zalopay_btn"
              className="btn btn-primary btn-block"
              onClick={() => processToPayment("zalopay")}
            >
              Thanh toán qua ZaloPay
            </button>
            <button
              id="cod_btn"
              className="btn btn-primary btn-block"
              onClick={() => processToPayment("cod")}
            >
              Thanh toán khi nhận hàng (COD)
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
