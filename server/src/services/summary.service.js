"use strict";

const { NotFoundError } = require("../core/error.response");
const { Brand } = require("../models/brand.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

class SummaryService {
  static getTotalSumary = async () => {
    const [countUser, countOrder, countProduct, countBrand] = await Promise.all(
      [
        User.countDocuments(),
        Order.countDocuments(),
        Product.countDocuments(),
        Brand.countDocuments(),
      ]
    );

    const items = [
      { title: "Tống số người dùng", count: countUser },
      { title: "Tổng số đơn hàng", count: countOrder },
      { title: "Tổng số sản phẩm", count: countProduct },
      { title: "Tổng số Nhãn hàng", count: countBrand },
    ];
    return items;
  };

  static getSummaryByType = async (model, type) => {
    const currentDate = new Date();

    let groupFormat;
    let startDate;
    let dateRange = [];

    if (type === "day") {
      startDate = new Date();
      startDate.setDate(currentDate.getDate() - 29); // 30 ngày gần nhất
      groupFormat = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };

      // Tạo danh sách 30 ngày gần nhất
      for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dateRange.push(date.toISOString().split("T")[0]); // Format YYYY-MM-DD
      }
    } else if (type === "month") {
      startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - 11); // 12 tháng gần nhất
      groupFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };

      // Tạo danh sách 12 tháng gần nhất
      for (let i = 0; i < 12; i++) {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        dateRange.push(date.toISOString().substring(0, 7)); // Format YYYY-MM
      }
    } else {
      throw new NotFoundError("Invalid type. Use 'day' or 'month'.");
    }

    const summary = await model.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Map kết quả vào khung ngày/tháng
    const result = dateRange.map((date) => {
      const found = summary.find((entry) => entry._id === date);
      return {
        time: date,
        count: found ? found.count : 0,
      };
    });

    return result;
  };

  static getUserSummary = async (type) => {
    return await this.getSummaryByType(User, type);
  };

  static getOrderSummary = async (type) => {
    return await this.getSummaryByType(Order, type);
  };

  static getProductSummary = async (type) => {
    return await this.getSummaryByType(Product, type);
  };

  static getBrandSummary = async (type) => {
    return await this.getSummaryByType(Brand, type);
  };
}

module.exports = { SummaryService };
