"use strict";
//
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Brand";
const COLLECTION_NAME = "Brands";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      maxLength: 100,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand address"],
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = {
  Brand: model(DOCUMENT_NAME, brandSchema),
};
