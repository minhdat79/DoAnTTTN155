"use strict";

const { default: mongoose } = require("mongoose");
const {
  NotFoundError,
  conflictRequestError,
  ForbiddenError,
} = require("../core/error.response");
const { Brand } = require("../models/brand.model");
const { Review } = require("../models/review.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

class ReviewService {
  static createNewReview = async (data, user) => {
    const { product: productId, rating, comment, orderId } = data;
    const { userId } = user;

    // Kiểm tra xem user đã để lại review cho sản phẩm này chưa
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    4;
    const exitOrder = await Order.findById(orderId);
    if (existingReview && !exitOrder) {
      throw new conflictRequestError(
        "You have already left a review for this product."
      );
    }

    // Kiểm tra xem user đã mua sản phẩm này chưa
    const checkPurchase = await Order.findOne({
      user: new mongoose.Types.ObjectId(userId),
      "cart.product": { $in: [productId] },
      status: "delivered",
      _id: orderId,
    });

    if (!checkPurchase) {
      throw new ForbiddenError("Without purchase you cannot leave a review.");
    }

    // Tạo một review mới
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    await review.save();

    // Thêm review vào sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found.");
    }
    product.reviews.push(review._id);
    await product.save();

    await Order.updateOne(
      {
        _id: orderId,
        "cart.product": productId,
      },
      {
        $set: { isRating: false },
      }
    );
    // Thêm review vào user
    const userRecord = await User.findById(userId);
    if (!userRecord) {
      throw new NotFoundError("User not found.");
    }
    userRecord.reviews.push(review._id);
    await userRecord.save();

    return {
      message: "Review successfully created.",
      review,
    };
  };

  static deleteReview = async (productId) => {
    const result = await Review.deleteMany({ productId: productId });
    if (result.deletedCount === 0)
      throw new NotFoundError("Product reviews not found");
    return "All reviews deleted for the product";
  };
}
module.exports = ReviewService;
