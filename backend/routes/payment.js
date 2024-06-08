const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripApi,
  processPaymentMomo,
  paymentCallback,
  paymentStatus,
  zaloPay,
  callback,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapi").get(isAuthenticatedUser, sendStripApi);
router.route("/zaloPay").post(zaloPay);
router.route("/callbackzalo").post(callback);
router.route("/paymentMomo").post(processPaymentMomo);
router.route("/callback").post(paymentCallback);
router.route("/paymentStatus").post(paymentStatus);

module.exports = router;
