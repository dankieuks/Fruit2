import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        {/* Footer Top */}
        <br />
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer about">
                  <div className="logo">
                    <a href="index.html">
                      <img src="/images/logo.png" alt="#" />
                    </a>
                  </div>
                  <p className="text">
                    Chào mừng bạn đến với Bách Hóa Store - Trải nghiệm mua sắm
                    trực tuyến hoàn hảo! Chúng tôi tự hào cung cấp dịch vụ hỗ
                    trợ 24/7, đồng thời mang đến những ưu đãi hấp dẫn và không
                    ngừng cập nhật sản phẩm mới. Hãy khám phá thế giới mua sắm
                    đa dạng và độc đáo tại trang web của chúng tôi ngay hôm nay.
                  </p>
                  <p className="text">
                    Cần hỗ trợ liên hệ với chúng tôi:{" "}
                    <span>
                      <a href="tel:0358751727">+84358751727</a>
                    </span>
                  </p>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Thông tin</h4>
                  <ul>
                    <li>Về chúng tôi</li>
                    <li>Điều khoản và điều kiện</li>
                    <li>Liên hệ với chúng tôi</li>
                    <li>Giúp đỡ</li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Dịch vụ khách hàng</h4>
                  <ul>
                    <li>Phương thức thanh toán</li>
                    <li>Hoàn tiền</li>
                    <li>Giao hàng</li>
                    <li>Điều khoản và bảo mật</li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer social">
                  <h4>Thông tin</h4>
                  {/* Single Widget */}
                  <div className="contact">
                    <ul>
                      <li>108 Trần Phú , Hà Đông , Hà Nội</li>
                      <li>Nhóm 4</li>
                      <li>nhom4@gmail.com</li>
                      <li>+84358751727</li>
                    </ul>
                  </div>
                  {/* End Single Widget */}
                  <ul></ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Top */}
        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="text-center">
                    <p>Copyright © 2024 By Nhóm 4 Bách Hóa</p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
