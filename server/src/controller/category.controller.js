"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const CategoryService = require("../services/category.service");

class CategorynController {
  createNewCategory = async (req, res, next) => {
    new CREATED({
      data: await CategoryService.createNewCategory(req.body),
    }).send(res);
  };
  deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await CategoryService.deleteCategory(id),
    }).send(res);
  };
  getAllCategories = async (req, res, next) => {
    new SuccessResponse({
      data: await CategoryService.getAllCategories(req.query),
    }).send(res);
  };
  updateCategory = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await CategoryService.updateCategory(id, req.body),
    }).send(res);
  };
}
module.exports = new CategorynController();
