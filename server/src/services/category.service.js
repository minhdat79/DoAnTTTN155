"use strict";

const { default: mongoose } = require("mongoose");
const { NotFoundError } = require("../core/error.response");
const { paginate } = require("../utils/paginate");
const { Category } = require("../models/category.model");

class CategoryService {
  static createNewCategory = async (data) => {
    const category = await Category.create(data);
    return category;
  };

  static getAllCategories = async ({
    limit = 10,
    page = 1,
    filters = { status: "active" },
    options,
    ...query
  }) => {
    let categories = await paginate({
      model: Category,
      limit: +limit,
      page: +page,
      filters,
      options,
      populate: ["products"],
    });
    return categories;
  };

  static deleteCategory = async (id) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { status: "inActive" },
        { new: true }
      );

      if (!updatedCategory) {
        throw new NotFoundError("Category not found");
      }

      return updatedCategory;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  };

  static updateCategory = async (id, payload) => {
    const isExist = await Category.findOne({ _id: id });

    if (!isExist) {
      throw new NotFoundError("Category not found!");
    }

    const result = await Category.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
}

module.exports = CategoryService;
