"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const productController = require("../controller/product.controller");
const { adminAuthentication } = require("../auth/authUtils");
const router = express.Router();

router.post(
  "/product",
  adminAuthentication,
  asynchandler(productController.createNewProduct)
);

router.put(
  "/product/:id",
  adminAuthentication,
  asynchandler(productController.updateProduct)
);

router.get("/product", asynchandler(productController.getAllProducts));
router.get("/product/:id", asynchandler(productController.getProductdetail));

router.get(
  "/product-type/:type",
  asynchandler(productController.getProductType)
);

router.get(
  "/product-popular-type",
  asynchandler(productController.getPopularProductByType)
);
router.get(
  "/product-top-rate",
  asynchandler(productController.getTopRatedProduct)
);
router.get(
  "/product-quantity/:productId",
  asynchandler(productController.getProductQuantities)
);
router.get(
  "/product-size/:productId",
  asynchandler(productController.getProductSizes)
);
router.post(
  "/product-quantity/:productId",
  asynchandler(productController.createProductQuantities)
);
router.delete("/product/:id", asynchandler(productController.deleteProduct));
module.exports = router;
