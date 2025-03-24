"use strict";
//
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Report";
const COLLECTION_NAME = "Reports";

const reportSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    reply: {
      title: {
        type: String,
        trim: true,
      },
      content: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = {
  Report: model(DOCUMENT_NAME, reportSchema),
};
