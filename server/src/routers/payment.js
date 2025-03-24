"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const { authentication } = require("../auth/authUtils");
const router = express.Router();
const paymentController = require("../controller/payment.controller");
router.post(
  "/payment",
  authentication,
  asynchandler(paymentController.payment)
);

module.exports = router;
