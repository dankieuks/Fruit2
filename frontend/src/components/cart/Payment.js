import React, { Fragment, useEffect } from "react";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
<<<<<<< HEAD
=======
// import StyleCheckoutQR from "./PaymentStyled";
>>>>>>> 2a2594f48c0b67a2e82cdd0c9c89dc5843287d4e

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
<<<<<<< HEAD

import axios from "axios";
=======
import moment from "moment";

import axios from "axios";
import { use } from "express/lib/application";
>>>>>>> 2a2594f48c0b67a2e82cdd0c9c89dc5843287d4e

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
<<<<<<< HEAD

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  // cart, ship info
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  console.log(orderInfo);
=======
  const today = moment();
  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  // cart, ship info
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
>>>>>>> 2a2594f48c0b67a2e82cdd0c9c89dc5843287d4e
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100), // total price
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true; // tìm kiếm các phần tử dựa trên id

    let res;
    try {
      const config = {
        // config header type
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config); // call api paymant process

      const clientSecret = res.data.client_secret; // client_secret json client

      console.log(clientSecret);

      if (!stripe || !elements) {
        // data input payment stripe
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        // Xác thực card info
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            // chi tiết thanh toán
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message); // return alert error
        document.querySelector("#pay_btn").disabled = false; // disabled btn
      } else {
        // Thanh toán có được xử lý hay không?
        if (result.paymentIntent.status === "succeeded") {
          // if success

          order.paymentInfo = {
            // payment with info cart, shipInfo
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order)); // call createOrder action

          history.push("/success"); // return page success
        } else {
          alert.error("Có một số vấn đề trong khi xử lý thanh toán");
        }
      }
    } catch (error) {
      // error server
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };
<<<<<<< HEAD

  return (
    <Fragment>
      <MetaData title={"Thông tin thẻ"} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Thông tin thẻ</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Số thẻ</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Hạn thẻ</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Số CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Thanh toán{" "}
              {` - ${(orderInfo && orderInfo.totalPrice).toLocaleString()}`}đ
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

=======
  const MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "3200368278483",
    ACCOUNT_NAME: "DO VAN CHUYEN",
  };
  const QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${orderInfo.totalPrice}&addInfo=DTBV${user._id}${orderInfo._id}&accountName=${MY_BANK.ACCOUNT_NAME}`;
  return (
    <div>
      <h3 className="title-checkqr">Thanh toán</h3>
      <div className="box">
        <p className="thanks">Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</p>
        <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
          <li className="woocommerce-order-overview__order order">
            Mã đơn hàng:{" "}
            <strong>
              DTBV{user._id}
              {orderInfo._id}
            </strong>
          </li>
          <li className="woocommerce-order-overview__date date">
            Ngày: <strong>{today.format("DD-MM-yyyy")}</strong>
          </li>
          <li className="woocommerce-order-overview__total total">
            Tổng cộng:{" "}
            <strong>
              <span className="woocommerce-Price-amount amount">
                <bdi>
                  {orderInfo.totalPrice}&nbsp;
                  <span className="woocommerce-Price-currencySymbol">₫</span>
                </bdi>
              </span>
            </strong>
          </li>
          <li className="woocommerce-order-overview__payment-method method">
            Phương thức thanh toán: <strong>Chuyển khoản</strong>
          </li>
        </ul>
        <div className="box-qr">
          <div className="titleqr">Mã QR chuyển khoản ngân hàng</div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <img style={{ width: "300px" }} src={QR} alt="" />
          </div>
          <table
            className="table table-bordered"
            style={{
              fontSize: "15px",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <tbody>
              <tr className="">
                <td className="text-right " style={{ textAlign: "right" }}>
                  <strong style={{ color: "black" }}>Tên tài khoản:</strong>
                </td>
                <td
                  className="text-left payment-instruction "
                  style={{ textAlign: "left" }}
                >
                  <div>
                    <span style={{ color: "black" }}>
                      {MY_BANK.ACCOUNT_NAME}
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="" style={{ background: "#FBFBFB" }}>
                <td className="text-right " style={{ textAlign: "right" }}>
                  <strong style={{ color: "black" }}>Số tài khoản:</strong>
                </td>
                <td
                  className="text-left payment-instruction "
                  style={{ textAlign: "left" }}
                >
                  <span style={{ color: "black" }}>{MY_BANK.ACCOUNT_NO}</span>
                </td>
              </tr>
              <tr>
                <td className="text-right " style={{ textAlign: "right" }}>
                  <strong style={{ color: "black" }}>Ngân hàng:</strong>
                </td>
                <td
                  className="text-left payment-instruction "
                  style={{ textAlign: "left" }}
                >
                  <div>
                    <span style={{ color: "black" }}>{MY_BANK.BANK_ID}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-right " style={{ textAlign: "right" }}>
                  <strong style={{ color: "black" }}>Số tiền:</strong>
                </td>
                <td
                  className="text-left payment-instruction "
                  style={{ textAlign: "left" }}
                >
                  <div ng-switch-when="vcb" className="ng-scope">
                    <span style={{ color: "black" }}>
                      {orderInfo.totalPrice} <sup>vnđ</sup>
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="">
                <td className="text-right " style={{ textAlign: "right" }}>
                  <strong style={{ color: "black" }}>Nội dung*:</strong>
                </td>
                <td
                  className="text-left payment-instruction "
                  style={{ textAlign: "left" }}
                >
                  <strong style={{ fontSize: "20px" }}>
                    DTBV{user._id}
                    {orderInfo._id}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <button className="btn-pay">Tôi đã thanh toán</button>
          </div>
        </div>
        {/* <section className="woocommerce-order-details">
          <h2 className="woocommerce-order-details__title">
            Chi tiết đơn hàng
          </h2>
          <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
            <thead>
              <tr>
                <th className="woocommerce-table__product-name product-name">
                  Sản phẩm
                </th>
                <th className="woocommerce-table__product-table product-total">
                  Tổng
                </th>
              </tr>
            </thead>
            <tbody>
              {listCart.map((item: any, index: any) => (
                <tr className="woocommerce-table__line-item order_item">
                  <td className="woocommerce-table__product-name product-name">
                    <Link
                      className="link"
                      to="https://store.masteranhduc.com/product/sach-truoc-binh-minh/"
                    >
                      {item.title}
                    </Link>{" "}
                    <strong className="product-quantity">
                      ×&nbsp;{item.quantity}
                    </strong>{" "}
                  </td>
                  <td className="woocommerce-table__product-total product-total">
                    <span className="woocommerce-Price-amount amount">
                      <bdi>
                        {item.price * item.quantity}&nbsp;
                        <span className="woocommerce-Price-currencySymbol">
                          ₫
                        </span>
                      </bdi>
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Phương thức thanh toán:</th>
                <td>Chuyển khoản</td>
              </tr>
              <tr>
                <th scope="row">Tổng cộng:</th>
                <td>
                  <span className="woocommerce-Price-amount amount">
                    {totalPrice}&nbsp;
                    <span className="woocommerce-Price-currencySymbol">₫</span>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </section> */}
      </div>
      <button className="btnDownloadQR">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 3H11V1H1V11H3V3Z" fill="white"></path>
            <path d="M11 11V5H5V11H11ZM7 7H9V9H7V7Z" fill="white"></path>
            <path d="M20.5 3H29V11H31V1H20.5V3Z" fill="white"></path>
            <path d="M27 11V5H21V11H27ZM23 7H25V9H23V7Z" fill="white"></path>
            <path d="M11 29H3V21H1V31H11V29Z" fill="white"></path>
            <path d="M11 21H5V27H11V21ZM9 25H7V23H9V25Z" fill="white"></path>
            <path d="M29 29H20.5V31H31V21H29V29Z" fill="white"></path>
            <path d="M17 19H25V23H27V17H17V19Z" fill="white"></path>
            <path d="M27 27V25H15V17H5V19H13V27H27Z" fill="white"></path>
            <path d="M13 5H15V11H13V5Z" fill="white"></path>
            <path d="M5 15H19V5H17V13H5V15Z" fill="white"></path>
            <path d="M21 13H27V15H21V13Z" fill="white"></path>
            <path d="M21 21H23V23H21V21Z" fill="white"></path>
            <path d="M17 21H19V23H17V21Z" fill="white"></path>
          </svg>
          <div style={{ marginLeft: "16px", textAlign: "left" }}>
            <span
              style={{
                display: "block",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              LƯU ẢNH QR
            </span>
            <span style={{ fontSize: "12px" }}>
              <i> Sau đó mở App ngân hàng quét QR chuyển khoản</i>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

>>>>>>> 2a2594f48c0b67a2e82cdd0c9c89dc5843287d4e
export default Payment;
