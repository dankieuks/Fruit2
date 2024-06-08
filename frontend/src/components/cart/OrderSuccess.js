import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    localStorage.removeItem("cartItems");

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.location = "/orders/me";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Fragment>
      <MetaData title={"Hoàn tất đặt hàng"} />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />
          <h2>Đơn hàng của bạn đã được đặt thành công!</h2>
          <p>Tự động chuyển hướng tới hóa đơn sau {countdown} giây...</p>
          <Link to="/orders/me">
            Nhấn vào đây nếu không tự động chuyển hướng
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
