"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const orderController = require("../controller/order.Controller");
const { authentication, adminAuthentication } = require("../auth/authUtils");
const router = express.Router();

router.post(
  "/order",
  authentication,
  asynchandler(orderController.createNewOrder)
);
router.put(
  "/order-status/:orderId",
  authentication,
  asynchandler(orderController.updateStatus)
);
router.get(
  "/order",
  authentication,
  asynchandler(orderController.getOrderByUser)
);
router.get(
  "/order/all",
  adminAuthentication,
  asynchandler(orderController.getAllOrder)
);
router.put(
  "/admin/order-status/:orderId",
  adminAuthentication,
  asynchandler(orderController.adminUpdateStatus)
);
module.exports = router;
