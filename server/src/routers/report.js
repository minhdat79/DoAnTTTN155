"use strict";
const express = require("express");
const { asynchandler } = require("../helpers/asynchandler");
const brandController = require("../controller/brand.controller");
const { adminAuthentication, authentication } = require("../auth/authUtils");
const reportController = require("../controller/report.controller");
const router = express.Router();

router.post(
  "/report",
  authentication,
  asynchandler(reportController.createNewReport)
);
router.get(
  "/report",
  adminAuthentication,
  asynchandler(reportController.getAllReport)
);
router.put(
  "/report/:reportId",
  adminAuthentication,
  asynchandler(reportController.replyReport)
);
module.exports = router;
