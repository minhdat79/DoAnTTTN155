"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/success.response");
const ProductService = require("../services/product.service");

class ProductController {
  createNewProduct = async (req, res, next) => {
    new CREATED({
      data: await ProductService.createNewProduct(req.body),
    }).send(res);
  };
  updateProduct = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await ProductService.updateProduct(id, req.body),
    }).send(res);
  };
  deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await ProductService.deleteProduct(id),
    }).send(res);
  };
  getAllProducts = async (req, res, next) => {
    new SuccessResponse({
      data: await ProductService.getAllProducts(req.query),
    }).send(res);
  };
  getProductdetail = async (req, res, next) => {
    const { id } = req.params;
    new SuccessResponse({
      data: await ProductService.getProductDetail(id),
    }).send(res);
  };
  getPopularProductByType = async (req, res, next) => {
    const type = req.params.type;
    const query = req.query;
    new SuccessResponse({
      data: await ProductService.getPopularProductByType(type, query),
    }).send(res);
  };
  getProductType = async (req, res, next) => {
    const type = req.params.type;
    const query = req.query;
    new SuccessResponse({
      data: await ProductService.getProductType(type, query),
    }).send(res);
  };
  getTopRatedProduct = async (req, res, next) => {
    new SuccessResponse({
      data: await ProductService.getTopRatedProduct(),
    }).send(res);
  };
  getProductQuantities = async (req, res, next) => {
    const { productId } = req.params;
    new SuccessResponse({
      data: await ProductService.getProductQuantities(productId),
    }).send(res);
  };
  getProductSizes = async (req, res, next) => {
    const { productId } = req.params;
    new SuccessResponse({
      data: await ProductService.getProductSizes(productId),
    }).send(res);
  };
  createProductQuantities = async (req, res, next) => {
    const { productId } = req.params;
    new CREATED({
      data: await ProductService.createProductQuantities(productId, req.body),
    }).send(res);
  };
}
module.exports = new ProductController();
