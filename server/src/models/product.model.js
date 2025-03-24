"use strict";
//
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [200, "Name is too large"],
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, "Product quantity can't be negative"],
    },
    description: {
      type: String,
      required: true,
    },
    sizes: [
      {
        size: { type: String, required: true },
        quantity: {
          type: Number,
          default: 0,
          min: [0, "Product quantity can't be negative"],
        },
        originPrice: {
          type: Number,
          required: true,
          min: [0, "Product price can't be negative"],
        },
      },
    ],
    enteredQuantity: [
      {
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          min: [0, "Product quantity can't be negative"],
        },
        note: String,
      },
    ],

    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock"],
      },
      default: "in-stock",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    productStatus: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
// Middleware pre-save
productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  } else {
    this.status = "in-stock";
  }

  next();
});
// Middleware pre-findOneAndUpdate
productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Cập nhật status
  if (update.quantity === 0) {
    update.status = "out-of-stock";
  } else if (update.quantity > 0) {
    update.status = "in-stock";
  }

  this.setUpdate(update);
  next();
});
// Middleware pre-save để cập nhật quantity bằng tổng quantity trong sizes
productSchema.pre("save", function (next) {
  // Tính tổng quantity trong sizes
  const totalQuantity = this.sizes.reduce(
    (total, size) => Number(total) + Number(size.quantity),
    0
  );

  // Cập nhật quantity của sản phẩm với tổng quantity
  this.quantity = totalQuantity;

  // Cập nhật status nếu quantity = 0
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  } else {
    this.status = "in-stock";
  }

  next();
});
// Middleware pre-findOneAndUpdate để cập nhật quantity khi cập nhật sản phẩm
productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Nếu có thay đổi trong sizes, tính lại quantity
  if (update.sizes) {
    const totalQuantity = update.sizes.reduce(
      (total, size) => Number(total) + Number(size.quantity),
      0
    );
    update.quantity = totalQuantity;
  }

  // Cập nhật status
  if (update.quantity === 0) {
    update.status = "out-of-stock";
  } else if (update.quantity > 0) {
    update.status = "in-stock";
  }

  this.setUpdate(update);
  next();
});

module.exports = {
  Product: model(DOCUMENT_NAME, productSchema),
};
