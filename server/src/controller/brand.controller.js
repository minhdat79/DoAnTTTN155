"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const BrandService = require("../services/brand.service");

class BrandController {
  createNewBrand = async (req, res, next) => {
    new CREATED({
      data: await BrandService.createNewBrand(req.body),
    }).send(res);
  };
  deleteBrand = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await BrandService.deleteBrand(id),
    }).send(res);
  };
  getALlbrand = async (req, res, next) => {
    new SuccessResponse({
      data: await BrandService.getAllBrand(req.query),
    }).send(res);
  };
  updateBrand = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await BrandService.updateBrand(id, req.body),
    }).send(res);
  };
}
module.exports = new BrandController();
