"use strict";
//
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Categories";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a category name"],
      maxLength: 100,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
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
  Category: model(DOCUMENT_NAME, categoriesSchema),
};
