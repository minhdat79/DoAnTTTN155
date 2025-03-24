"use strict";
//
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Review";
const COLLECTION_NAME = "Reviews";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = {
  Review: model(DOCUMENT_NAME, reviewSchema),
};
