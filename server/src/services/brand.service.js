"use strict";

const { default: mongoose } = require("mongoose");
const { NotFoundError } = require("../core/error.response");
const { Brand } = require("../models/brand.model");
const { paginate } = require("../utils/paginate");

class BrandService {
  static createNewBrand = async (data) => {
    const brand = await Brand.create(data);
    return brand;
  };
  static getAllBrand = async ({
    limit = 10,
    page = 1,
    filters = { status: "active" },
    options,
    ...query
  }) => {
    let orders = await paginate({
      model: Brand,
      limit: +limit,
      page: +page,
      filters,
      options,
      populate: ["products"],
    });
    return orders;
  };
  static deleteBrand = async (id) => {
    try {
      const updatedBrand = await Brand.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { status: "inActive" },
        { new: true }
      );

      if (!updatedBrand) {
        throw new NotFoundError("Brand not found");
      }

      return updatedBrand;
    } catch (error) {
      throw new Error(`Error updating brand: ${error.message}`);
    }
  };

  static updateBrand = async (id, payload) => {
    const isExist = await Brand.findOne({ _id: id });

    if (!isExist) {
      throw new NotFoundError("Brand not found !");
    }

    const result = await Brand.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
}
module.exports = BrandService;
