"use strict";
//
const { model, Schema, default: mongoose } = require("mongoose");
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
    roles: {
      type: [String],
      enum: ["ADMIN", "USER"],
      default: ["USER"],
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = {
  User: model(DOCUMENT_NAME, userSchema),
};
