"use strict";

const { badRequestError } = require("../core/error.response");
const { User } = require("../models/user.model");
const { paginate } = require("../utils/paginate");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class UserService {
  static getUserInfo = async (user) => {
    return await User.findById(user.userId).select({
      _id: 1,
      userName: 1,
      phone: 1,
      email: 1,
    });
  };
  static updateProfile = async (payload, user) => {
    return await User.findByIdAndUpdate(user.userId, payload, {
      new: true,
    }).lean();
  };
  static getAllUser = async ({
    limit = 10,
    page = 1,
    filters = { status: "active" },
    options,
    ...query
  }) => {
    let users = await paginate({
      model: User,
      limit: +limit,
      page: +page,
      filters,
      options,
      projection: [
        "email",
        "userName",
        "roles",
        "phone",
        "status",
        "createdAt",
      ],
    });
    return users;
  };
  static deleteUser = async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      { status: "inActive" },
      {
        new: true,
      }
    ).lean();
  };
  static createUser = async ({ userName, email, phone, password, roles }) => {
    const hodelUser = await User.findOne({ email }).lean();
    if (hodelUser) {
      throw new badRequestError("error user already rigisted");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      phone,
      password: passwordHash,
      roles: roles,
    });
    return {
      data: null,
    };
  };
  static updateUser = async (userId, payload) => {
    return await User.findByIdAndUpdate(userId, payload, {
      new: true,
    }).lean();
  };
}
module.exports = UserService;
