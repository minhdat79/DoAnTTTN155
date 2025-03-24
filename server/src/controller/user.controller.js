"use strict";

const { SuccessResponse, CREATED } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
  getUserInfo = async (req, res, next) => {
    new SuccessResponse({
      data: await UserService.getUserInfo(req.user),
    }).send(res);
  };
  updateProfile = async (req, res, next) => {
    new SuccessResponse({
      data: await UserService.updateProfile(req.body, req.user),
    }).send(res);
  };
  getAllUser = async (req, res, next) => {
    new SuccessResponse({
      data: await UserService.getAllUser(req.query),
    }).send(res);
  };
  deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    new SuccessResponse({
      data: await UserService.deleteUser(userId),
    }).send(res);
  };
  createUser = async (req, res, next) => {
    new CREATED({
      data: await UserService.createUser(req.body),
    }).send(res);
  };
  updateUser = async (req, res, next) => {
    const { userId } = req.params;
    new SuccessResponse({
      data: await UserService.updateUser(userId, req.body),
    }).send(res);
  };
}
module.exports = new UserController();
