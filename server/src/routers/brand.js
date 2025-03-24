"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const brandController = require("../controller/brand.controller");
const { adminAuthentication } = require("../auth/authUtils");
const router = express.Router();

router.post(
  "/brand",
  adminAuthentication,
  asynchandler(brandController.createNewBrand)
);

router.put(
  "/brand/:id",
  adminAuthentication,
  asynchandler(brandController.updateBrand)
);

router.get("/brand", asynchandler(brandController.getALlbrand));

router.delete(
  "/brand/:id",
  adminAuthentication,
  asynchandler(brandController.deleteBrand)
);

module.exports = router;
