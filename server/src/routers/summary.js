"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const { adminAuthentication } = require("../auth/authUtils");
const summaryController = require("../controller/summary.controller");

const router = express.Router();

router.get(
  "/summary/total",
  adminAuthentication,
  asynchandler(summaryController.getTotalSumary)
);
router.get(
  "/summary/user/:type",
  adminAuthentication,
  asynchandler(summaryController.getUserSummary)
);
router.get(
  "/summary/brand/:type",
  adminAuthentication,
  asynchandler(summaryController.getBrandSummary)
);
router.get(
  "/summary/product/:type",
  adminAuthentication,
  asynchandler(summaryController.getProductSummary)
);
router.get(
  "/summary/order/:type",
  adminAuthentication,
  asynchandler(summaryController.getOrderSummary)
);
module.exports = router;
