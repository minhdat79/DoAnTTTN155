"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const { adminAuthentication } = require("../auth/authUtils");
const categoryController = require("../controller/category.controller");
const router = express.Router();

router.post(
  "/category",
  adminAuthentication,
  asynchandler(categoryController.createNewCategory)
);

router.put(
  "/category/:id",
  adminAuthentication,
  asynchandler(categoryController.updateCategory)
);

router.get("/category", asynchandler(categoryController.getAllCategories));

router.delete(
  "/category/:id",
  adminAuthentication,
  asynchandler(categoryController.deleteCategory)
);

module.exports = router;
