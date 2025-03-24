"use strict";
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientName: String,
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        size: {
          type: String,
          require: true,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit", "draftVnpay", "vnpay"],
      default: "cash",
    },
    isRating: {
      type: Boolean,
      require: true,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = {
  Order: model(DOCUMENT_NAME, orderSchema),
};
