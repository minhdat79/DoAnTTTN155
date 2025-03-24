"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
  createNewOrder = async (req, res, next) => {
    new CREATED({
      data: await OrderService.createNewOrder(req.body, req.user),
    }).send(res);
  };
  updateStatus = async (req, res, next) => {
    const { orderId } = req.params;
    new SuccessResponse({
      data: await OrderService.updateStatus(orderId, req.body, req.user),
    }).send(res);
  };
  getOrderByUser = async (req, res, next) => {
    new SuccessResponse({
      data: await OrderService.getOrderByUser(req.user),
    }).send(res);
  };
  getAllOrder = async (req, res, next) => {
    new SuccessResponse({
      data: await OrderService.getAllOrder(req.query),
    }).send(res);
  };
  adminUpdateStatus = async (req, res, next) => {
    const { orderId } = req.params;
    new SuccessResponse({
      data: await OrderService.adminUpdateStatus(orderId, req.body),
    }).send(res);
  };
}
module.exports = new OrderController();
