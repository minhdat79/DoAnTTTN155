"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "FineTune";
const COLLECTION_NAME = "FineTunes";

const FineTuneModelSchema = new Schema(
  {
    objId: { type: String },
    modelId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, FineTuneModelSchema);
